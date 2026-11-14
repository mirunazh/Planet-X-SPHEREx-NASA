import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { TileStore } from '@/components/sky/TileStore';
import { textureBytes } from '@/components/sky/textureMemory';

const bytes = textureBytes(16, 16, true);
const response = () => ({ ok: true, status: 200, blob: async () => new Blob() });
const bitmap = (width = 16, height = 16) => ({ width, height, close: vi.fn() });
function deferred<T>() {
  let resolve!: (value: T) => void;
  const promise = new Promise<T>((yes) => { resolve = yes; });
  return { promise, resolve };
}
const flush = async () => { for (let i = 0; i < 10; i++) await Promise.resolve(); };
const request = (store: TileStore, key: string) => store.request(key, key, 0, 3, 0);
async function load(store: TileStore, key: string, wanted = [key]) {
  request(store, key); store.retain(new Set(wanted)); store.pump(); await flush();
}

beforeEach(() => {
  vi.stubGlobal('fetch', vi.fn(async () => response()));
  vi.stubGlobal('createImageBitmap', vi.fn(async () => bitmap()));
});
afterEach(() => { vi.unstubAllGlobals(); vi.restoreAllMocks(); });

describe('memory-budgeted tile cache', () => {
  it('recovers exhausted failures without reloading resident images or retrying 404s', async () => {
    const store = new TileStore(bytes * 4);
    await load(store, 'resident');
    let now = performance.now();
    vi.spyOn(performance, 'now').mockImplementation(() => now);
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    vi.mocked(fetch).mockRejectedValueOnce(new Error('offline'));
    await load(store, 'retry', ['resident', 'retry']);
    for (let attempt = 0; attempt < 2; attempt++) {
      now += 20_000;
      vi.mocked(fetch).mockRejectedValueOnce(new Error('offline'));
      await load(store, 'retry', ['resident', 'retry']);
    }
    expect(store.stats().failed).toBe(1);
    now += 20_000;
    await load(store, 'retry', ['resident', 'retry']);
    expect(fetch).toHaveBeenCalledTimes(4);
    vi.mocked(fetch).mockResolvedValueOnce({ ok: false, status: 404 } as Response);
    await load(store, 'missing', ['resident', 'retry', 'missing']);
    store.retryFailed(); await flush();
    expect(store.peek('retry')?.status).toBe('loaded');
    expect(store.peek('retry')?.attempts).toBe(1);
    expect(store.peek('resident')?.status).toBe('loaded');
    expect(store.peek('missing')?.status).toBe('missing');
    expect(fetch).toHaveBeenCalledTimes(6);
    store.retryFailed(); await flush();
    expect(fetch).toHaveBeenCalledTimes(6);
    store.clear();
  });

  it('retries only the displayed prefix and respects the existing concurrency limit', async () => {
    const store = new TileStore(bytes * 4, 1);
    vi.mocked(fetch).mockRejectedValueOnce(new Error('offline'));
    await load(store, 'a|1');
    vi.mocked(fetch).mockRejectedValueOnce(new Error('offline'));
    await load(store, 'b|1', ['a|1', 'b|1']);
    const pending = deferred<ReturnType<typeof response>>();
    vi.mocked(fetch).mockImplementationOnce(() => pending.promise as Promise<Response>);
    store.retryFailed('b|');
    store.retryFailed('b|');
    expect(fetch).toHaveBeenCalledTimes(3);
    expect(store.peek('a|1')?.status).toBe('error');
    expect(store.memoryStats().inflight).toBe(1);
    pending.resolve(response()); await flush();
    expect(store.peek('b|1')?.status).toBe('loaded');
    store.clear();
  });
  it('accounts for decoded pixels and every GPU mip level', () => {
    expect(textureBytes(4, 2, false)).toBe(64);
    expect(textureBytes(4, 2, true)).toBe(76);
    expect(textureBytes(1, 1, true)).toBe(8);
  });

  it('evicts by bytes and LRU, disposing the texture and bitmap exactly once', async () => {
    const store = new TileStore(bytes * 2);
    await load(store, 'a'); await load(store, 'b');
    const a = store.peek('a')!;
    const dispose = vi.spyOn(a.texture!, 'dispose');
    const close = a.bitmap!.close;
    await load(store, 'c');
    expect(store.peek('a')).toBeUndefined();
    expect(store.peek('b')?.status).toBe('loaded');
    expect(store.memoryStats().bytes).toBe(bytes * 2);
    expect(dispose).toHaveBeenCalledOnce(); expect(close).toHaveBeenCalledOnce();
    store.clear();
    expect(dispose).toHaveBeenCalledOnce(); expect(close).toHaveBeenCalledOnce();
    expect(store.memoryStats().bytes).toBe(0);
  });

  it('protects visible tiles and defers detail without a repeated-download loop', async () => {
    const store = new TileStore(bytes);
    await load(store, 'visible');
    const visible = store.peek('visible')!;
    const dispose = vi.spyOn(visible.texture!, 'dispose');
    request(store, 'next');
    store.retain(new Set(['next']), new Set(['visible'])); store.pump(); await flush();
    expect(store.peek('next')?.status).toBe('deferred');
    for (let i = 0; i < 20; i++) store.pump();
    expect(fetch).toHaveBeenCalledTimes(2);
    expect(store.memoryStats().bytes).toBe(bytes);
    expect(dispose).not.toHaveBeenCalled();
    store.retain(new Set(['next'])); store.pump(); await flush();
    expect(dispose).toHaveBeenCalledOnce();
    expect(store.peek('next')?.status).toBe('loaded');
  });

  it('reuses visited tiles without another download', async () => {
    const store = new TileStore(bytes * 3);
    await load(store, 'a'); await load(store, 'b'); await load(store, 'a');
    expect(fetch).toHaveBeenCalledTimes(2);
  });

  it('holds the concurrency limit even when aborted fetches ignore their signal', async () => {
    const store = new TileStore(bytes * 10, 2);
    const pending = Array.from({ length: 2 }, () => deferred<ReturnType<typeof response>>());
    vi.mocked(fetch).mockImplementationOnce(() => pending[0].promise as Promise<Response>)
      .mockImplementationOnce(() => pending[1].promise as Promise<Response>);
    request(store, 'a'); request(store, 'b'); request(store, 'c');
    store.retain(new Set(['a', 'b', 'c'])); store.pump();
    expect(fetch).toHaveBeenCalledTimes(2);
    const signals = vi.mocked(fetch).mock.calls.map((call) => call[1]!.signal!);
    store.retain(new Set(['c'])); store.pump();
    expect(signals.every((signal) => signal.aborted)).toBe(true);
    expect(fetch).toHaveBeenCalledTimes(2);
    pending[0].resolve(response()); await flush(); store.pump(); await flush();
    expect(fetch).toHaveBeenCalledTimes(3);
    expect(store.peek('c')?.status).toBe('loaded');
    expect(createImageBitmap).toHaveBeenCalledTimes(1);
    pending[1].resolve(response()); await flush();
    expect(store.memoryStats().inflight).toBe(0);
  });

  it('closes cancelled decodes without creating a cached texture or reviving an entry', async () => {
    const store = new TileStore(bytes * 2);
    const decoded = deferred<ReturnType<typeof bitmap>>();
    vi.mocked(createImageBitmap).mockImplementationOnce(() => decoded.promise as Promise<ImageBitmap>);
    request(store, 'a'); store.retain(new Set(['a'])); store.pump(); await flush();
    store.clear();
    const stale = bitmap(); decoded.resolve(stale); await flush();
    expect(stale.close).toHaveBeenCalledOnce();
    expect(store.memoryStats()).toMatchObject({ bytes: 0, entries: 0, inflight: 0 });
  });

  it('keeps memory bounded across mixed tile dimensions and long navigation', async () => {
    const store = new TileStore(bytes * 5);
    let i = 0;
    vi.mocked(createImageBitmap).mockImplementation(async () => bitmap(++i % 2 ? 16 : 32, 16) as unknown as ImageBitmap);
    for (let j = 0; j < 100; j++) {
      await load(store, `tile-${j}`);
      expect(store.memoryStats().bytes).toBeLessThanOrEqual(bytes * 5);
    }
    store.clear();
    expect(store.memoryStats().bytes).toBe(0);
    for (const result of vi.mocked(createImageBitmap).mock.results) {
      expect((await result.value).close).toHaveBeenCalledOnce();
    }
  });

  it('removes obsolete queues/errors while allowing ordinary download failures to retry', async () => {
    const store = new TileStore(bytes * 2);
    vi.mocked(fetch).mockRejectedValueOnce(new Error('offline'));
    await load(store, 'retry');
    expect(store.peek('retry')?.status).toBe('error');
    vi.spyOn(performance, 'now').mockReturnValue(performance.now() + 10000);
    await load(store, 'retry');
    expect(store.peek('retry')?.status).toBe('loaded');
    request(store, 'obsolete'); store.retain(new Set());
    expect(store.peek('obsolete')).toBeUndefined();
  });
});

describe('foreground and speculative tile scheduling', () => {
  it('loads centre before edge and starts background work only after foreground settles', async () => {
    const store = new TileStore(bytes * 32, 2);
    const centre = deferred<ReturnType<typeof response>>();
    const edge = deferred<ReturnType<typeof response>>();
    vi.mocked(fetch).mockImplementationOnce(() => centre.promise as Promise<Response>)
      .mockImplementationOnce(() => edge.promise as Promise<Response>);
    store.request('edge', 'edge', 1, 3, 0);
    store.request('halo', 'halo', 0, 3, 0, true);
    store.request('centre', 'centre', 0.1, 3, 0);
    store.retain(new Set(['edge', 'centre']), new Set(), new Set(['halo'])); store.pump();
    expect(vi.mocked(fetch).mock.calls.map(([url]) => url)).toEqual(['centre', 'edge']);
    centre.resolve(response()); await flush(); store.pump();
    expect(fetch).toHaveBeenCalledTimes(2);
    edge.resolve(response()); await flush(); store.pump(); await flush();
    expect(vi.mocked(fetch).mock.lastCall?.[0]).toBe('halo');
    expect(store.stats().loaded).toBe(2); // background work is absent from user status
  });

  it('aborts background work for a new view, keeps its slot until settled, and starts at most one background request', async () => {
    const store = new TileStore(bytes * 32, 6);
    const background = deferred<ReturnType<typeof response>>();
    vi.mocked(fetch).mockImplementationOnce(() => background.promise as Promise<Response>);
    store.request('old-halo', 'old-halo', 0, 3, 0, true);
    store.retain(new Set(), new Set(), new Set(['old-halo'])); store.pump();
    const signal = vi.mocked(fetch).mock.calls[0][1]!.signal!;
    store.request('visible', 'visible', 0, 3, 0);
    store.request('new-halo', 'new-halo', 0, 3, 0, true);
    store.retain(new Set(['visible']), new Set(), new Set(['new-halo'])); store.pump(); await flush();
    expect(signal.aborted).toBe(true);
    store.pump(); expect(fetch).toHaveBeenCalledTimes(2);
    background.resolve(response()); await flush(); store.pump(); await flush();
    expect(vi.mocked(fetch).mock.lastCall?.[0]).toBe('new-halo');
    expect(store.peek('old-halo')).toBeUndefined();
  });

  it('promotes an in-flight prefetch into foreground without abort or duplicate download', async () => {
    const store = new TileStore(bytes * 16);
    const pending = deferred<ReturnType<typeof response>>();
    vi.mocked(fetch).mockImplementationOnce(() => pending.promise as Promise<Response>);
    store.request('next', 'next', 0, 3, 0, true);
    store.retain(new Set(), new Set(), new Set(['next'])); store.pump();
    store.request('next', 'next', 0, 3, 0);
    store.retain(new Set(['next'])); store.pump();
    expect(vi.mocked(fetch).mock.calls[0][1]!.signal!.aborted).toBe(false);
    pending.resolve(response()); await flush();
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(store.stats().loaded).toBe(1);
  });

  it('never evicts visited tiles for prefetch and bounds speculative resident memory', async () => {
    const store = new TileStore(bytes * 8);
    await load(store, 'visited');
    const visited = store.peek('visited')!;
    const dispose = vi.spyOn(visited.texture!, 'dispose');
    for (const key of ['halo-a', 'halo-b']) store.request(key, key, 0, 3, 0, true);
    store.retain(new Set(), new Set(), new Set(['halo-a', 'halo-b'])); store.pump(); await flush();
    store.pump(); await flush();
    expect(store.peek('halo-a')?.status).toBe('loaded');
    expect(store.peek('halo-b')?.status).toBe('deferred');
    const calls = vi.mocked(fetch).mock.calls.length;
    for (let i = 0; i < 20; i++) store.pump();
    expect(fetch).toHaveBeenCalledTimes(calls);
    expect(dispose).not.toHaveBeenCalled();
    expect(store.memoryStats().bytes).toBe(bytes * 2);
    store.touch('halo-a', 0.25); // cached coarser tile used as a visible fallback
    expect(store.peek('halo-a')).toMatchObject({ speculative: false, priority: 0.25 });
    expect(store.stats().loaded).toBe(2);
    store.clear();
  });
});
