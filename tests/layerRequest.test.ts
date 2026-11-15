import { beforeEach, describe, expect, it, vi } from 'vitest';
import { LayerRequest } from '@/lib/sky/layerRequest';
import { type SkyLayer, layerKey, requestedLayer } from '@/lib/sky/layer';
import { useNav } from '@/lib/store';
import { canLock, lockTarget } from '@/lib/navigation';
import { SPHEREX_FRAMES } from '@/lib/sky/surveys';

function deferred<T>() {
  let resolve!: (value: T) => void;
  let reject!: (error: unknown) => void;
  const promise = new Promise<T>((yes, no) => { resolve = yes; reject = no; });
  return { promise, resolve, reject };
}

const a: SkyLayer = { surveyId: 'spherex', frame: 46 };
const b: SkyLayer = { surveyId: 'spherex', frame: 90 };
const c: SkyLayer = { surveyId: 'spherex', frame: 0 };
const flush = async () => { await Promise.resolve(); await Promise.resolve(); };

beforeEach(() => useNav.setState({ ...useNav.getInitialState(), anim: [] }));

function harness() {
  let requested = a;
  let revision = 0;
  let displayed: string | null = 'old image';
  let status = 'ready';
  const loads: ReturnType<typeof deferred<string>>[] = [];
  const commit = vi.fn((asset: string) => { displayed = asset; status = 'ready'; });
  const error = vi.fn(() => { status = 'error'; });
  const controller = new LayerRequest({
    requested: () => requested,
    revision: () => revision,
    load: () => { const load = deferred<string>(); loads.push(load); return load.promise; },
    loading: () => { status = 'loading'; }, commit, error,
  });
  return {
    controller, loads, commit, error,
    select: (layer: SkyLayer) => { requested = layer; revision++; controller.request(layer); },
    changeBeforeEffect: (layer: SkyLayer) => { requested = layer; revision++; },
    shown: () => displayed, status: () => status,
  };
}

describe('layer request ordering', () => {
  it('keeps the previous image until the replacement is available', async () => {
    const h = harness();
    h.select(b);
    expect(h.shown()).toBe('old image');
    expect(h.status()).toBe('loading');
    h.loads[0].resolve('band B');
    await flush();
    expect(h.shown()).toBe('band B');
    expect(h.status()).toBe('ready');
  });

  it('ignores successes and failures that arrive after the final selection', async () => {
    const h = harness();
    h.select(a); h.select(b); h.select(c);
    h.loads[2].resolve('SPHEREx frame 0');
    await flush();
    h.loads[0].resolve('band A');
    h.loads[1].reject(new Error('late failure'));
    await flush();
    expect(h.shown()).toBe('SPHEREx frame 0');
    expect(h.commit).toHaveBeenCalledTimes(1);
    expect(h.error).not.toHaveBeenCalled();
    expect(h.status()).toBe('ready');
  });

  it('checks selection synchronously before React effects have run', async () => {
    const h = harness();
    h.select(a);
    h.changeBeforeEffect(b);
    h.loads[0].resolve('A');
    await flush();
    expect(h.commit).not.toHaveBeenCalled();
  });

  it('rejects an older generation even after returning to the same band', async () => {
    const h = harness();
    h.select(a); h.select(b); h.select(a);
    h.loads[0].resolve('old A');
    h.loads[1].reject(new Error('old B'));
    await flush();
    expect(h.commit).not.toHaveBeenCalled();
    expect(h.error).not.toHaveBeenCalled();
    h.loads[2].resolve('current A');
    await flush();
    expect(h.shown()).toBe('current A');
  });

  it('ignores a stale failure after A → B → A before the next effect', async () => {
    const h = harness();
    h.select(a);
    h.changeBeforeEffect(b); h.changeBeforeEffect(a);
    h.loads[0].reject(new Error('stale A'));
    await flush();
    expect(h.error).not.toHaveBeenCalled();
  });

  it('retains the displayed image on error and permits retrying the same selection', async () => {
    const h = harness();
    h.select(b);
    h.loads[0].reject(new Error('network'));
    await flush();
    expect(h.status()).toBe('error');
    expect(h.shown()).toBe('old image');
    h.select(b);
    h.loads[1].resolve('retried B');
    await flush();
    expect(h.shown()).toBe('retried B');
    expect(h.status()).toBe('ready');
  });

  it('does not commit after unmount or cancellation', async () => {
    const h = harness();
    h.select(a);
    h.controller.cancel();
    h.loads[0].resolve('A');
    await flush();
    expect(h.commit).not.toHaveBeenCalled();
  });
});

describe('requested versus displayed state', () => {
  it('normalizes blank SPHEREx channels and preserves usable channels', () => {
    expect(requestedLayer({ surveyId: 'spherex', frame: 50 }).frame).toBe(49);
    expect(layerKey(requestedLayer({ surveyId: 'spherex', frame: 90 }))).toBe('spherex|90|');
  });

  it('keeps displayed metadata while a new selection loads and resets old locks', () => {
    useNav.setState({ displayedLayer: a, allskyStatus: 'ready', fov: 0.5 });
    lockTarget();
    expect(useNav.getState().locked).not.toBeNull();
    useNav.getState().setFrame(b.frame);
    expect(useNav.getState().displayedLayer).toEqual(a);
    expect(useNav.getState().allskyStatus).toBe('loading');
    expect(useNav.getState().locked).toBeNull();
    expect(canLock()).toBe(false);
    lockTarget();
    expect(useNav.getState().locked).toBeNull();
    useNav.setState({ displayedLayer: b, allskyStatus: 'ready' });
    lockTarget();
    expect(useNav.getState().locked?.layer.wavelengthUm).toBe(SPHEREX_FRAMES[b.frame].wavelengthUm);
  });

  it('does not lock an unloaded or failed image', () => {
    useNav.setState({ fov: 0.5 });
    expect(canLock()).toBe(false);
    useNav.setState({ displayedLayer: a, allskyStatus: 'error' });
    expect(canLock()).toBe(false);
    useNav.getState().retryLayer();
    expect(useNav.getState().allskyStatus).toBe('loading');
    expect(useNav.getState().layerRevision).toBe(1);
    expect(useNav.getState().displayedLayer).toEqual(a);
  });

  it('does not reload the same SPHEREx frame or accept an unsupported survey', () => {
    useNav.setState({ frame: 90, displayedLayer: b, allskyStatus: 'ready' });
    useNav.getState().setFrame(90);
    expect(useNav.getState().allskyStatus).toBe('ready');
    useNav.getState().setSurvey('unsupported' as never);
    expect(useNav.getState().surveyId).toBe('spherex');
    expect(useNav.getState().displayedLayer).toEqual(b);
  });
});
