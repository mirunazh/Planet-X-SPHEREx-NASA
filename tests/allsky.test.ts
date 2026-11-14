import { afterEach, describe, expect, it, vi } from 'vitest';
import { AllskyCache } from '@/components/sky/allsky';
import { textureBytes } from '@/components/sky/textureMemory';

afterEach(() => { vi.unstubAllGlobals(); vi.restoreAllMocks(); });

describe('preview retention while switching bands', () => {
  it('protects the displayed preview through more requests than the cache capacity', async () => {
    vi.resetModules();
    const { loadAllsky, pinAllsky } = await import('@/components/sky/allsky');
    vi.stubGlobal('fetch', vi.fn(async () => ({ ok: true, blob: async () => new Blob() })));
    vi.stubGlobal('createImageBitmap', vi.fn(async () => ({ width: 1728, height: 1856, close: vi.fn() })));
    pinAllsky(['visible']);
    const visible = await loadAllsky('visible');
    const disposed = vi.spyOn(visible.texture, 'dispose');
    for (let i = 0; i < 15; i++) {
      pinAllsky(['visible', `requested-${i}`]);
      await loadAllsky(`requested-${i}`);
    }
    expect(disposed).not.toHaveBeenCalled();
    expect(visible.bitmap.close).not.toHaveBeenCalled();
    expect(await loadAllsky('visible')).toBe(visible);
  });

  it('allows a failed preview download to be retried', async () => {
    vi.resetModules();
    const { loadAllsky, pinAllsky } = await import('@/components/sky/allsky');
    const fetch = vi.fn().mockRejectedValueOnce(new Error('offline')).mockResolvedValue({ ok: true, blob: async () => new Blob() });
    vi.stubGlobal('fetch', fetch);
    vi.stubGlobal('createImageBitmap', vi.fn(async () => ({ width: 1728, height: 1856, close: vi.fn() })));
    pinAllsky(['requested']);
    await expect(loadAllsky('requested')).rejects.toThrow('offline');
    await expect(loadAllsky('requested')).resolves.toHaveProperty('url', 'requested');
    expect(fetch).toHaveBeenCalledTimes(2);
  });
});

// Small injectable budgets make byte accounting and cancellation deterministic.
const previewBytes = textureBytes(16, 16, false);
const image = (width = 16) => ({ width, height: 16, close: vi.fn() });
const response = () => ({ ok: true, blob: async () => new Blob() });
const flush = async () => { for (let i = 0; i < 10; i++) await Promise.resolve(); };
function deferred<T>() {
  let resolve!: (value: T) => void;
  const promise = new Promise<T>((yes) => { resolve = yes; });
  return { promise, resolve };
}
function setup() {
  vi.stubGlobal('fetch', vi.fn(async () => response()));
  vi.stubGlobal('createImageBitmap', vi.fn(async () => image()));
}

describe('preview memory and request lifecycle', () => {
  it('uses decoded size, protects the displayed image, and evicts the least recently used unpinned image', async () => {
    setup();
    const cache = new AllskyCache(previewBytes * 3);
    cache.pin(['visible']);
    const visible = await cache.load('visible');
    const a = await cache.load('a');
    const b = await cache.load('b');
    const disposed = vi.spyOn(a.texture, 'dispose');
    vi.mocked(createImageBitmap).mockResolvedValueOnce(image(32) as unknown as ImageBitmap);
    await cache.load('large');
    expect(disposed).toHaveBeenCalledOnce(); expect(a.bitmap.close).toHaveBeenCalledOnce();
    expect(b.bitmap.close).toHaveBeenCalledOnce();
    expect(visible.bitmap.close).not.toHaveBeenCalled();
    expect(await cache.load('visible')).toBe(visible);
    expect(cache.memoryStats().bytes).toBe(previewBytes * 3);
    cache.clear();
    expect(visible.bitmap.close).toHaveBeenCalledOnce();
    expect(cache.memoryStats().bytes).toBe(0);
  });

  it('rejects an oversized replacement and closes its bitmap while preserving the displayed preview', async () => {
    setup();
    const cache = new AllskyCache(previewBytes);
    cache.pin(['visible']);
    const visible = await cache.load('visible');
    cache.pin(['visible', 'replacement']);
    const rejected = image(32);
    vi.mocked(createImageBitmap).mockResolvedValueOnce(rejected as unknown as ImageBitmap);
    await expect(cache.load('replacement')).rejects.toThrow('memory budget');
    expect(rejected.close).toHaveBeenCalledOnce();
    expect(visible.bitmap.close).not.toHaveBeenCalled();
    expect(cache.memoryStats().bytes).toBe(previewBytes);
  });

  it('aborts obsolete requests and never exceeds one active preview even if fetch ignores abort', async () => {
    setup();
    const cache = new AllskyCache(previewBytes * 3);
    const first = deferred<ReturnType<typeof response>>();
    vi.mocked(fetch).mockImplementationOnce(() => first.promise as Promise<Response>);
    cache.pin(['a']); const a = cache.load('a');
    const rejected = expect(a).rejects.toHaveProperty('name', 'AbortError');
    cache.pin(['b']); const b = cache.load('b');
    const bRejected = expect(b).rejects.toHaveProperty('name', 'AbortError');
    cache.pin(['c']); const c = cache.load('c');
    expect(vi.mocked(fetch).mock.calls[0][1]!.signal!.aborted).toBe(true);
    expect(fetch).toHaveBeenCalledTimes(1);
    first.resolve(response());
    await rejected; await bRejected; await c;
    expect(fetch).toHaveBeenCalledTimes(2);
    expect(createImageBitmap).toHaveBeenCalledTimes(1);
    expect(cache.memoryStats().inflight).toBe(0);
  });

  it('releases a decoder result after unmount and prevents stale completion from deleting a newer request for the same URL', async () => {
    setup();
    const cache = new AllskyCache(previewBytes * 2);
    const decoder = deferred<ReturnType<typeof image>>();
    vi.mocked(createImageBitmap).mockImplementationOnce(() => decoder.promise as Promise<ImageBitmap>);
    cache.pin(['same']); const old = cache.load('same');
    const rejected = expect(old).rejects.toHaveProperty('name', 'AbortError');
    await flush(); cache.clear();
    cache.pin(['same']); const fresh = cache.load('same');
    const stale = image(); decoder.resolve(stale);
    await rejected;
    const asset = await fresh;
    expect(stale.close).toHaveBeenCalledOnce();
    expect(asset.bitmap.close).not.toHaveBeenCalled();
    expect(await cache.load('same')).toBe(asset);
    expect(cache.memoryStats().bytes).toBe(previewBytes);
    cache.clear(); cache.clear();
    expect(asset.bitmap.close).toHaveBeenCalledOnce();
  });

  it('stays within budget over a long sequence of bands and frees every decoded image on clear', async () => {
    setup();
    const cache = new AllskyCache(previewBytes * 3);
    let previous: string | undefined;
    for (let i = 0; i < 150; i++) {
      const url = `band-${i}`;
      cache.pin([url, ...(previous ? [previous] : [])]);
      await cache.load(url);
      cache.pin([url]); previous = url;
      expect(cache.memoryStats().bytes).toBeLessThanOrEqual(previewBytes * 3);
    }
    cache.clear();
    for (const result of vi.mocked(createImageBitmap).mock.results) {
      expect((await result.value).close).toHaveBeenCalledOnce();
    }
    expect(cache.memoryStats()).toMatchObject({ bytes: 0, entries: 0, inflight: 0 });
  });
});

describe('adjacent-band preview preloading', () => {
  it('loads one neighboring band without changing foreground and reuses it on selection', async () => {
    setup();
    const cache = new AllskyCache(previewBytes * 3);
    cache.pin(['visible']);
    const visible = await cache.load('visible');
    cache.prefetch('neighbor', 'visible'); await flush();
    expect(fetch).toHaveBeenCalledTimes(2);
    cache.prefetch('neighbor', 'visible'); await flush();
    expect(fetch).toHaveBeenCalledTimes(2);
    cache.pin(['visible', 'neighbor']);
    const next = await cache.load('neighbor');
    expect(fetch).toHaveBeenCalledTimes(2);
    expect(next.url).toBe('neighbor');
    expect(visible.bitmap.close).not.toHaveBeenCalled();
    cache.clear();
  });

  it('cancels a background preview when a different foreground layer is requested', async () => {
    setup();
    const cache = new AllskyCache(previewBytes * 3);
    cache.pin(['visible']); await cache.load('visible');
    const background = deferred<ReturnType<typeof response>>();
    vi.mocked(fetch).mockImplementationOnce(() => background.promise as Promise<Response>);
    cache.prefetch('neighbor', 'visible');
    const signal = vi.mocked(fetch).mock.calls[1][1]!.signal!;
    cache.pin(['visible', 'requested']);
    const requested = cache.load('requested');
    expect(signal.aborted).toBe(true);
    expect(fetch).toHaveBeenCalledTimes(2);
    background.resolve(response());
    await requested;
    expect(vi.mocked(fetch).mock.lastCall?.[0]).toBe('requested');
    expect(createImageBitmap).toHaveBeenCalledTimes(2);
    cache.clear();
  });

  it('promotes the exact in-flight background preview without abort or a second request', async () => {
    setup();
    const cache = new AllskyCache(previewBytes * 3);
    cache.pin(['visible']); await cache.load('visible');
    const background = deferred<ReturnType<typeof response>>();
    vi.mocked(fetch).mockImplementationOnce(() => background.promise as Promise<Response>);
    cache.prefetch('neighbor', 'visible');
    cache.pin(['visible', 'neighbor']);
    const selected = cache.load('neighbor');
    expect(vi.mocked(fetch).mock.calls[1][1]!.signal!.aborted).toBe(false);
    background.resolve(response()); await selected;
    expect(fetch).toHaveBeenCalledTimes(2);
    cache.clear();
  });

  it('skips prefetch when resident images leave insufficient space and does not evict visited bands', async () => {
    setup();
    const cache = new AllskyCache(previewBytes * 2);
    cache.pin(['visible']);
    const visited = await cache.load('visited');
    await cache.load('visible');
    cache.prefetch('neighbor', 'visible'); await flush();
    expect(fetch).toHaveBeenCalledTimes(2);
    expect(visited.bitmap.close).not.toHaveBeenCalled();
    expect(cache.memoryStats().bytes).toBe(previewBytes * 2);
    cache.clear();
  });

  it('silently releases an unexpectedly large background decode without displacing the displayed image', async () => {
    setup();
    const cache = new AllskyCache(previewBytes * 2);
    cache.pin(['visible']); const visible = await cache.load('visible');
    const oversized = image(64);
    vi.mocked(createImageBitmap).mockResolvedValueOnce(oversized as unknown as ImageBitmap);
    cache.prefetch('neighbor', 'visible'); await flush();
    expect(oversized.close).toHaveBeenCalledOnce();
    expect(visible.bitmap.close).not.toHaveBeenCalled();
    expect(cache.memoryStats().bytes).toBe(previewBytes);
    const calls = vi.mocked(fetch).mock.calls.length;
    cache.prefetch('neighbor', 'visible'); await flush();
    expect(fetch).toHaveBeenCalledTimes(calls);
    cache.clear();
  });
});
