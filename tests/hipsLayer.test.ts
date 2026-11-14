import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import * as THREE from 'three';
import type { RootState } from '@react-three/fiber';
import { HipsLayer } from '@/components/sky/HipsLayer';
import { useNav } from '@/lib/store';
import { allskyUrl } from '@/lib/sky/hips';
import { SURVEYS } from '@/lib/sky/surveys';
import type { AllskyAsset } from '@/components/sky/allsky';
import { allskyCache } from '@/components/sky/allsky';
import { tileStore } from '@/components/sky/TileStore';
import { disposeAllskyGeometries } from '@/components/sky/geometry';

// Exercise the actual mesh renderer and effect dependencies without a GPU.
const hooks = vi.hoisted(() => ({
  index: 0,
  slots: [] as { value?: unknown; deps?: readonly unknown[]; cleanup?: () => void; effect?: () => (() => void) | void }[],
  effects: [] as (() => void)[],
  frame: undefined as ((state: RootState) => void) | undefined,
  load: vi.fn<(url: string) => Promise<AllskyAsset>>(),
  pins: vi.fn(),
  tiles: new Map<string, import('@/components/sky/TileStore').TileEntry>(),
  requestTile: vi.fn(),
  upload: vi.fn(),
}));

vi.mock('react', async (importOriginal) => ({
  ...await importOriginal<typeof import('react')>(),
  useMemo: (factory: () => unknown, deps: readonly unknown[]) => {
    const i = hooks.index++;
    const old = hooks.slots[i];
    if (!old || deps.some((dep, j) => dep !== old.deps?.[j])) hooks.slots[i] = { value: factory(), deps };
    return hooks.slots[i].value;
  },
  useRef: (value: unknown) => {
    const i = hooks.index++;
    hooks.slots[i] ??= { value: { current: value } };
    return hooks.slots[i].value;
  },
  useEffect: (effect: () => (() => void) | void, deps: readonly unknown[]) => {
    const i = hooks.index++;
    const old = hooks.slots[i];
    if (!old || deps.some((dep, j) => dep !== old.deps?.[j])) {
      hooks.effects.push(() => {
        old?.cleanup?.();
        hooks.slots[i] = { deps, effect, cleanup: effect() || undefined };
      });
    }
  },
}));
vi.mock('@/lib/store', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/lib/store')>();
  return { ...actual, useNav: Object.assign((selector: (state: ReturnType<typeof actual.useNav.getState>) => unknown) => selector(actual.useNav.getState()), actual.useNav) };
});
vi.mock('@react-three/fiber', () => ({ useFrame: (frame: (state: RootState) => void) => { hooks.frame = frame; } }));
vi.mock('@/components/sky/allsky', () => ({ loadAllsky: hooks.load, pinAllsky: hooks.pins, allskyCache: { clear: vi.fn(), prefetch: vi.fn() } }));
vi.mock('@/components/sky/geometry', () => ({
  buildTileGeometry: () => new THREE.BufferGeometry(),
  getAllskyGeometry: () => new THREE.BufferGeometry(),
  disposeAllskyGeometries: vi.fn(),
}));
vi.mock('@/components/sky/TileStore', () => ({ tileStore: {
  setNearest: vi.fn(), pump: vi.fn(), retain: vi.fn(), touch: vi.fn(), clear: vi.fn(),
  peek: (key: string) => hooks.tiles.get(key),
  request: hooks.requestTile,
} }));

function deferred() {
  let resolve!: (asset: AllskyAsset) => void;
  let reject!: (error: unknown) => void;
  const promise = new Promise<AllskyAsset>((yes, no) => { resolve = yes; reject = no; });
  return { promise, resolve, reject };
}

let loads: Map<string, ReturnType<typeof deferred>>;
let now: number;
const url = (frame: number) => allskyUrl(SURVEYS.spherex, frame);

function asset(url: string): AllskyAsset {
  const texture = new THREE.Texture();
  texture.name = url;
  return { url, texture, bitmap: {} as ImageBitmap, width: 1728, height: 1856 };
}

function render() {
  hooks.index = 0;
  const element = HipsLayer();
  for (const effect of hooks.effects.splice(0)) effect();
  return element.props.object as THREE.Group;
}

function draw(frames = 4, width = 1600, height = 900) {
  for (let i = 0; i < frames; i++) {
    now += 100;
    hooks.frame!({ size: { width, height }, viewport: { dpr: 1 }, gl: { initTexture: hooks.upload } } as unknown as RootState);
  }
}

function unmount() {
  for (const slot of hooks.slots) slot.cleanup?.();
  hooks.slots = [];
}

function replayEffects() {
  for (const slot of hooks.slots) slot.cleanup?.();
  for (const slot of hooks.slots) if (slot.effect) slot.cleanup = slot.effect() || undefined;
}

const flush = async () => { await Promise.resolve(); await Promise.resolve(); };
const maps = (group: THREE.Group) => group.children.map((child) => ((child as THREE.Mesh).material as THREE.MeshBasicMaterial).map!.name);

beforeEach(() => {
  useNav.setState({ ...useNav.getInitialState(), anim: [], fov: 1 });
  hooks.slots = []; hooks.effects = []; hooks.tiles.clear();
  hooks.load.mockReset(); hooks.pins.mockClear(); hooks.requestTile.mockReset();
  hooks.upload.mockClear(); vi.mocked(allskyCache.prefetch).mockClear();
  loads = new Map();
  hooks.load.mockImplementation((url) => {
    const load = deferred(); loads.set(url, load); return load.promise;
  });
  hooks.requestTile.mockImplementation((key: string, url: string, priority: number, order: number, ipix: number) => {
    if (hooks.tiles.has(key)) return;
    const texture = new THREE.Texture(); texture.name = key;
    hooks.tiles.set(key, { key, url, priority, order, ipix, texture, status: 'loaded', lastUsed: now, attempts: 1, retryAt: 0 });
  });
  now = 0;
  vi.spyOn(performance, 'now').mockImplementation(() => now);
  vi.spyOn(console, 'error').mockImplementation(() => {});
});

afterEach(() => { unmount(); vi.restoreAllMocks(); vi.unstubAllGlobals(); });

describe('HiPS band swaps', () => {
  it('gives the preview its own frame and uploads at most two centre-first detail textures per desktop frame', async () => {
    const group = render();
    loads.get(url(46))!.resolve(asset(url(46)));
    await flush(); draw(1);
    expect(group.children).toHaveLength(1);
    expect(hooks.upload).toHaveBeenCalledTimes(1);
    const expected = [...hooks.tiles.values()].sort((a, b) => a.priority - b.priority);
    draw(1);
    expect(group.children).toHaveLength(3);
    expect(hooks.upload.mock.calls.slice(1).map(([texture]) => texture.name)).toEqual(expected.slice(0, 2).map((e) => e.key));
    for (let i = 0; i < 5; i++) {
      const before = hooks.upload.mock.calls.length;
      draw(1);
      expect(hooks.upload.mock.calls.length - before).toBeLessThanOrEqual(2);
    }
  });

  it('limits compact-screen uploads and batches raw-pixel filter changes', async () => {
    const group = render();
    loads.get(url(46))!.resolve(asset(url(46)));
    await flush(); draw(1, 390, 844);
    expect(group.children).toHaveLength(1);
    for (let i = 0; i < 6; i++) {
      const before = hooks.upload.mock.calls.length;
      draw(1, 390, 844);
      expect(hooks.upload.mock.calls.length - before).toBeLessThanOrEqual(1);
    }
    useNav.getState().toggle('rawPixels'); render();
    for (let i = 0; i < 8; i++) {
      const before = hooks.upload.mock.calls.length;
      draw(1, 390, 844);
      expect(hooks.upload.mock.calls.length - before).toBeLessThanOrEqual(1);
    }
    for (const child of group.children as THREE.Mesh[]) {
      expect((child.material as THREE.MeshBasicMaterial).map!.magFilter).toBe(THREE.NearestFilter);
    }
  });

  it('preloads only after settling, limits halo requests, and never renders speculative tiles', async () => {
    const group = render();
    loads.get(url(46))!.resolve(asset(url(46)));
    await flush(); draw(4);
    expect(hooks.requestTile.mock.calls.some((args) => args[5] === true)).toBe(false);
    expect(vi.mocked(allskyCache.prefetch).mock.calls.some(([url]) => url !== null)).toBe(false);
    draw(6);
    const speculative = hooks.requestTile.mock.calls.filter((args) => args[5] === true);
    expect(speculative.length).toBeGreaterThan(0);
    expect(new Set(speculative.map(([key]) => key)).size).toBeLessThanOrEqual(6);
    const visible = new Set(maps(group));
    expect(speculative.every(([key]) => !visible.has(key))).toBe(true);
    expect(allskyCache.prefetch).toHaveBeenCalledWith(url(47), url(46));
    useNav.setState({ fov: 0.5 }); draw(1);
    expect(vi.mocked(allskyCache.prefetch).mock.lastCall).toEqual([null]);
  });

  it('does not prefetch when data saving is enabled or a new band is loading', async () => {
    vi.stubGlobal('navigator', { connection: { saveData: true } });
    render();
    loads.get(url(46))!.resolve(asset(url(46)));
    await flush(); draw(12);
    expect(hooks.requestTile.mock.calls.some((args) => args[5] === true)).toBe(false);
    expect(vi.mocked(allskyCache.prefetch).mock.calls.every(([url]) => url === null)).toBe(true);
    vi.stubGlobal('navigator', { connection: { saveData: false } });
    useNav.getState().setFrame(90); render(); draw(12);
    expect(hooks.requestTile.mock.calls.some((args) => args[5] === true)).toBe(false);
    expect(vi.mocked(allskyCache.prefetch).mock.calls.every(([url]) => url === null)).toBe(true);
  });
  it('survives StrictMode effect replay with the same refs and request controller', async () => {
    const group = render();
    const initial = loads.get(url(46))!;
    replayEffects();
    initial.resolve(asset(url(46)));
    await flush();
    expect(group.children).toHaveLength(0);
    loads.get(url(46))!.resolve(asset(url(46)));
    await flush(); draw();
    expect(group.children.length).toBeGreaterThan(1);
    replayEffects();
    expect(group.children).toHaveLength(0);
    expect(useNav.getState().displayedLayer).toBeNull();
    loads.get(url(46))!.resolve(asset(url(46)));
    await flush(); draw();
    expect(useNav.getState().allskyStatus).toBe('ready');
    expect(maps(group).every((name) => name === url(46) || name.startsWith('spherex|46|'))).toBe(true);
  });

  it('detaches obsolete meshes before releasing texture protection and clears resources on unmount', async () => {
    const group = render();
    loads.get(url(46))!.resolve(asset(url(46)));
    await flush(); draw();
    const oldTiles = group.children.filter((mesh) => (mesh as THREE.Mesh).renderOrder > 1) as THREE.Mesh[];
    expect(oldTiles.length).toBeGreaterThan(0);
    const disposals = oldTiles.map((mesh) => vi.spyOn(mesh.material as THREE.Material, 'dispose'));
    vi.mocked(tileStore.retain).mockImplementationOnce(() => {
      expect(oldTiles.every((mesh) => !group.children.includes(mesh))).toBe(true);
      expect(disposals.every((dispose) => dispose.mock.calls.length === 1)).toBe(true);
    });
    useNav.getState().setFrame(90); render();
    loads.get(url(90))!.resolve(asset(url(90)));
    await flush(); draw();
    const renderedKeys = maps(group).filter((key) => key.startsWith('spherex|90|'));
    expect(vi.mocked(tileStore.retain).mock.lastCall?.[1]).toEqual(new Set(renderedKeys));
    const clears = vi.mocked(tileStore.clear).mock.calls.length;
    const previews = vi.mocked(allskyCache.clear).mock.calls.length;
    const geometries = vi.mocked(disposeAllskyGeometries).mock.calls.length;
    unmount();
    expect(group.children).toHaveLength(0);
    expect(tileStore.clear).toHaveBeenCalledTimes(clears + 1);
    expect(allskyCache.clear).toHaveBeenCalledTimes(previews + 1);
    expect(disposeAllskyGeometries).toHaveBeenCalledTimes(geometries + 1);
  });

  it.each(['band', 'survey'])('settles after a batched A → B → A %s selection', async (kind) => {
    const group = render();
    loads.get(url(46))!.resolve(asset(url(46)));
    await flush();
    if (kind === 'band') {
      useNav.getState().setFrame(90); useNav.getState().setFrame(46);
    } else {
      useNav.getState().setSurvey('twomass'); useNav.getState().setSurvey('spherex');
    }
    render();
    loads.get(url(46))!.resolve(asset(url(46)));
    await flush();
    expect(useNav.getState().allskyStatus).toBe('ready');
    expect(maps(group)).toEqual([url(46)]);
  });

  it('preserves the complete old band while loading, then replaces the preview and all tiles together', async () => {
    const group = render();
    draw();
    expect(group.children).toHaveLength(0);
    loads.get(url(46))!.resolve(asset(url(46)));
    await flush(); draw();
    expect(group.children.length).toBeGreaterThan(1);
    expect(maps(group).every((name) => name === url(46) || name.startsWith('spherex|46|'))).toBe(true);
    const oldMeshes = [...group.children] as THREE.Mesh[];
    const disposal = oldMeshes.map((mesh) => vi.spyOn(mesh.material as THREE.Material, 'dispose'));
    useNav.getState().setFrame(90);
    render(); draw();
    expect(useNav.getState().displayedLayer?.frame).toBe(46);
    expect(maps(group).every((name) => name === url(46) || name.startsWith('spherex|46|'))).toBe(true);
    expect(disposal.every((dispose) => dispose.mock.calls.length === 0)).toBe(true);
    loads.get(url(90))!.resolve(asset(url(90)));
    await flush();
    expect(maps(group)).toEqual([url(90)]);
    expect(disposal.every((dispose) => dispose.mock.calls.length === 1)).toBe(true);
    draw();
    expect(maps(group).every((name) => name === url(90) || name.startsWith('spherex|90|'))).toBe(true);
    expect(useNav.getState().displayedLayer?.frame).toBe(90);
  });

  it('does not add old-band tiles when their downloads complete after the swap', async () => {
    const group = render();
    loads.get(url(46))!.resolve(asset(url(46)));
    await flush(); draw();
    const oldKeys = [...hooks.tiles.keys()];
    useNav.getState().setFrame(90); render();
    loads.get(url(90))!.resolve(asset(url(90)));
    await flush(); draw();
    for (const key of oldKeys) hooks.tiles.get(key)!.status = 'loaded';
    draw();
    expect(maps(group).every((name) => !name.startsWith('spherex|46|'))).toBe(true);
  });

  it('ignores an out-of-order preview and reports only the latest failure', async () => {
    const group = render();
    useNav.getState().setFrame(22); render();
    useNav.getState().setFrame(90); render();
    loads.get(url(90))!.resolve(asset(url(90)));
    await flush();
    loads.get(url(46))!.resolve(asset(url(46)));
    loads.get(url(22))!.reject(new Error('old failure'));
    await flush();
    expect(maps(group)).toEqual([url(90)]);
    expect(useNav.getState().allskyStatus).toBe('ready');
    expect(console.error).not.toHaveBeenCalled();
  });

  it('retains the visible image on failure and retries without changing selection', async () => {
    const group = render();
    loads.get(url(46))!.resolve(asset(url(46)));
    await flush();
    useNav.getState().setFrame(90); render();
    loads.get(url(90))!.reject(new Error('offline'));
    await flush();
    expect(maps(group)).toEqual([url(46)]);
    expect(useNav.getState().allskyStatus).toBe('error');
    useNav.getState().retryLayer(); render();
    loads.get(url(90))!.resolve(asset(url(90)));
    await flush();
    expect(maps(group)).toEqual([url(90)]);
    expect(useNav.getState().allskyStatus).toBe('ready');
  });

  it('does not repopulate meshes after unmount and tolerates effect replay', async () => {
    const group = render();
    const firstLoad = loads.get(url(46))!;
    unmount();
    firstLoad.resolve(asset(url(46)));
    await flush();
    expect(group.children).toHaveLength(0);
    expect(useNav.getState().displayedLayer).toBeNull();
    const replayed = render();
    loads.get(url(46))!.resolve(asset(url(46)));
    await flush(); draw();
    expect(replayed.children.length).toBeGreaterThan(0);
  });
});
