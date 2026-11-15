import { afterEach, describe, expect, it, vi } from 'vitest';
import { PreviewLoader } from '@/lib/comparison/previews';
import { comparisonProxy } from '@/lib/comparison/proxy';

const id = 'a'.repeat(64);
const queued = { id, state: 'downloading', error: null };
const ready = { id, state: 'ready', error: null, width: 384, height: 384, coverageFraction: .9 };
const image = () => new Response(new Uint8Array([137, 80, 78, 71, 13, 10, 26, 10]), { headers: { 'Content-Type': 'image/png' } });
afterEach(() => { vi.useRealTimers(); vi.unstubAllGlobals(); });

describe('sequential slideshow preview loading', () => {
  it('polls background preparation, downloads PNG and reuses a bounded browser cache', async () => {
    vi.useFakeTimers();
    const fetcher = vi.fn().mockResolvedValueOnce(Response.json(queued)).mockResolvedValueOnce(Response.json(ready)).mockResolvedValueOnce(image());
    const revoke = vi.fn();
    const loader = new PreviewLoader('search1', 'version1', fetcher, () => 'blob:preview', revoke);
    const progress = vi.fn();
    const request = loader.load('product1', new AbortController().signal, progress);
    await vi.advanceTimersByTimeAsync(1000);
    const result = await request;
    expect(result.url).toBe('blob:preview');
    expect(progress.mock.calls.map(([p]) => p.state)).toEqual(['downloading', 'ready']);
    expect(fetcher.mock.calls[0][0]).toBe('/api/comparison/searches/search1/previews');
    expect(JSON.parse(fetcher.mock.calls[0][1].body)).toEqual({ version: 'version1', productId: 'product1', retry: false });
    expect((await loader.load('product1', new AbortController().signal)).url).toBe('blob:preview');
    expect(fetcher).toHaveBeenCalledTimes(3);
    loader.dispose(); expect(revoke).toHaveBeenCalledWith('blob:preview');
  });

  it('rejects late responses after navigating to another image', async () => {
    let resolve!: (response: Response) => void;
    const fetcher = vi.fn(() => new Promise<Response>((r) => { resolve = r; }));
    const create = vi.fn();
    const loader = new PreviewLoader('search', 'version', fetcher, create);
    const controller = new AbortController();
    const result = loader.load('old-image', controller.signal);
    const assertion = expect(result).rejects.toMatchObject({ name: 'AbortError' });
    controller.abort(); resolve(Response.json(ready));
    await assertion;
    expect(fetcher).toHaveBeenCalledTimes(1); expect(create).not.toHaveBeenCalled();
  });

  it('reports image errors and sends explicit retry requests', async () => {
    const fetcher = vi.fn().mockResolvedValueOnce(Response.json({ id, state: 'error', error: 'Invalid FITS' }))
      .mockResolvedValueOnce(Response.json(ready)).mockResolvedValueOnce(image());
    const loader = new PreviewLoader('search', 'version', fetcher, () => 'blob:recovered', () => {});
    await expect(loader.load('image', new AbortController().signal)).rejects.toThrow('Invalid FITS');
    expect((await loader.load('image', new AbortController().signal, () => {}, true)).url).toBe('blob:recovered');
    expect(JSON.parse(fetcher.mock.calls[1][1].body).retry).toBe(true);
    loader.dispose();
  });

  it('evicts old blob URLs after six frames', async () => {
    const fetcher = vi.fn((url: RequestInfo | URL) => Promise.resolve(String(url).endsWith('/image') ? image() : Response.json(ready)));
    const revoke = vi.fn(); let index = 0;
    const loader = new PreviewLoader('search', 'version', fetcher, () => `blob:${index++}`, revoke);
    for (let n = 0; n < 8; n++) await loader.load(String(n), new AbortController().signal);
    expect(revoke.mock.calls.map(([url]) => url)).toEqual(['blob:0', 'blob:1']);
    loader.dispose(); expect(revoke).toHaveBeenCalledTimes(8);
  });
});

describe('same-origin preview API', () => {
  it('preserves binary PNG bytes and validates preview JSON', async () => {
    const fetcher = vi.fn().mockResolvedValueOnce(Response.json(queued, { status: 202 })).mockResolvedValueOnce(image());
    vi.stubGlobal('fetch', fetcher);
    const created = await comparisonProxy(new Request('http://localhost/api/comparison/searches/job/previews', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ version: 'v', productId: id }) }), 'searches/job/previews');
    expect(created.status).toBe(202);
    expect(JSON.parse(fetcher.mock.calls[0][1].body)).toEqual({ version: 'v', productId: id });
    const png = await comparisonProxy(new Request('http://localhost'), `previews/${id}/image`);
    expect(png.status).toBe(200); expect(png.headers.get('content-type')).toBe('image/png');
    expect([...new Uint8Array(await png.arrayBuffer())]).toEqual([137, 80, 78, 71, 13, 10, 26, 10]);
  });
  it('rejects arbitrary archive URLs, path traversal and malformed image content', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValueOnce(new Response('html', { headers: { 'Content-Type': 'image/png' } })));
    expect((await comparisonProxy(new Request('http://localhost', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{"url":"https://evil.test"}' }), 'searches/job/previews')).status).toBe(400);
    expect((await comparisonProxy(new Request('http://localhost'), 'previews/../../health/image')).status).toBe(400);
    expect((await comparisonProxy(new Request('http://localhost'), `previews/${id}/image`)).status).toBe(502);
  });
});
