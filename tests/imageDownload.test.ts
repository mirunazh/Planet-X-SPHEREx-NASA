import { afterEach, describe, expect, it, vi } from 'vitest';
import { downloadImage, IMAGE_TIMEOUT_MS } from '@/components/sky/imageDownload';

afterEach(() => { vi.useRealTimers(); vi.unstubAllGlobals(); vi.restoreAllMocks(); });

function untilAbort(signal: AbortSignal): Promise<never> {
  return new Promise((_, reject) => signal.addEventListener('abort', () => reject(signal.reason), { once: true }));
}

describe('image transfer recovery', () => {
  it('times out a stalled fetch and clears its timer', async () => {
    vi.useFakeTimers();
    vi.stubGlobal('fetch', vi.fn((_url, options) => untilAbort(options.signal)));
    const result = expect(downloadImage('tile', new AbortController().signal)).rejects.toThrow('timed out');
    await vi.advanceTimersByTimeAsync(IMAGE_TIMEOUT_MS);
    await result;
    expect(vi.getTimerCount()).toBe(0);
  });

  it('also bounds a stalled response body and leaves the owner eligible to retry', async () => {
    vi.useFakeTimers();
    vi.stubGlobal('fetch', vi.fn(async (_url, options) => ({ ok: true, status: 200, blob: () => untilAbort(options.signal) })));
    const owner = new AbortController();
    const result = expect(downloadImage('preview', owner.signal)).rejects.toThrow('timed out');
    await vi.advanceTimersByTimeAsync(IMAGE_TIMEOUT_MS);
    await result;
    expect(owner.signal.aborted).toBe(false);
    expect(vi.getTimerCount()).toBe(0);
  });

  it('forwards cancellation and ignores a late response from a fetch that ignores abort', async () => {
    let resolve!: (response: unknown) => void;
    const body = vi.fn();
    vi.stubGlobal('fetch', vi.fn(() => new Promise((yes) => { resolve = yes; })));
    const owner = new AbortController();
    const result = expect(downloadImage('old', owner.signal)).rejects.toHaveProperty('name', 'AbortError');
    owner.abort();
    expect(vi.mocked(fetch).mock.calls[0][1]!.signal!.aborted).toBe(true);
    resolve({ ok: true, blob: body });
    await result;
    expect(body).not.toHaveBeenCalled();
  });

  it('only treats a tile 404 as missing, and cleans up successful requests', async () => {
    vi.useFakeTimers();
    vi.stubGlobal('fetch', vi.fn(async () => ({ ok: false, status: 404 })));
    await expect(downloadImage('tile', new AbortController().signal, true)).resolves.toBeNull();
    await expect(downloadImage('preview', new AbortController().signal)).rejects.toThrow('HTTP 404');
    const blob = new Blob(['image']);
    vi.mocked(fetch).mockResolvedValueOnce({ ok: true, status: 200, blob: async () => blob } as Response);
    await expect(downloadImage('image', new AbortController().signal)).resolves.toBe(blob);
    expect(vi.getTimerCount()).toBe(0);
  });
});
