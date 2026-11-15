import { afterEach, describe, expect, it, vi } from 'vitest';
import { comparisonProxy } from '@/lib/comparison/proxy';

afterEach(() => vi.unstubAllGlobals());
describe('comparison same-origin API', () => {
  it('defaults to SPHEREx and rejects other missions before contacting the service', async () => {
    const fetcher = vi.fn().mockResolvedValue(Response.json({ products: [], total: 0, status: 'empty', truncated: false, nextCursor: null, retrievedAt: '', warnings: [] }));
    vi.stubGlobal('fetch', fetcher);
    expect((await comparisonProxy(new Request('http://localhost/api/comparison/inventory'), 'inventory')).status).toBe(200);
    expect((fetcher.mock.calls[0][0] as URL).searchParams.get('mission')).toBe('spherex');
    for (const mission of ['wise', 'twomass', 'spitzer']) {
      const response = await comparisonProxy(new Request(`http://localhost/api/comparison/inventory?mission=${mission}`), 'inventory');
      expect(response.status).toBe(400);
      expect((await response.json()).detail).toContain('Only SPHEREx');
    }
    expect(fetcher).toHaveBeenCalledTimes(1);
  });
  it('only proxies allowlisted parameters to a fixed service', async () => {
    const fetcher = vi.fn().mockResolvedValue(Response.json({ products: [], total: 0, status: 'empty', truncated: false, nextCursor: null, retrievedAt: new Date().toISOString(), warnings: [] }));
    vi.stubGlobal('fetch', fetcher);
    const response = await comparisonProxy(new Request('http://localhost/api/comparison/inventory?ra=0&dec=90&size=10&mission=spherex'), 'inventory');
    expect(response.status).toBe(200);
    const url = fetcher.mock.calls[0][0] as URL;
    expect(url.pathname).toBe('/inventory');
    expect(url.searchParams.get('mission')).toBe('spherex');
    expect(response.headers.get('cache-control')).toBe('no-store');
    expect((await comparisonProxy(new Request('http://localhost/api/comparison/inventory?url=https://evil.test'), 'inventory')).status).toBe(400);
    expect(fetcher).toHaveBeenCalledTimes(1);
  });
  it('reports service failure with recovery and allows retry', async () => {
    const fetcher = vi.fn().mockRejectedValueOnce(new Error('offline')).mockRejectedValueOnce(new Error('offline')).mockResolvedValueOnce(Response.json({ ok: true }));
    vi.stubGlobal('fetch', fetcher);
    const request = new Request('http://localhost/api/comparison/health');
    const failure = await comparisonProxy(request, 'health');
    expect(failure.status).toBe(503);
    const detail = (await failure.json()).detail;
    expect(detail).not.toContain('Start Docker');
    expect(detail).toContain('weekly challenge');
    expect((await comparisonProxy(request, 'health')).status).toBe(200);
  });
  it('retries a read once when the connection drops, but never a timeout', async () => {
    const fetcher = vi.fn().mockRejectedValueOnce(new TypeError('other side closed')).mockResolvedValueOnce(Response.json({ ok: true }));
    vi.stubGlobal('fetch', fetcher);
    expect((await comparisonProxy(new Request('http://localhost/api/comparison/health'), 'health')).status).toBe(200);
    expect(fetcher).toHaveBeenCalledTimes(2);
    const slow = vi.fn().mockRejectedValue(new DOMException('timeout', 'TimeoutError'));
    vi.stubGlobal('fetch', slow);
    expect((await comparisonProxy(new Request('http://localhost/api/comparison/health'), 'health')).status).toBe(504);
    expect(slow).toHaveBeenCalledTimes(1);
  });
  it('distinguishes service timeouts and invalid responses from connection failures', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValueOnce(new DOMException('timeout', 'TimeoutError')).mockResolvedValueOnce(new Response('<html>upstream failed</html>', { status: 502, headers: { 'Content-Type': 'text/html' } })));
    const request = new Request('http://localhost/api/comparison/health');
    expect((await comparisonProxy(request, 'health')).status).toBe(504);
    const invalid = await comparisonProxy(request, 'health');
    expect(invalid.status).toBe(502);
    expect((await invalid.json()).detail).toContain('invalid response');
  });
  it('rejects malformed JSON and invalid inventory contracts', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValueOnce(new Response('{broken', { headers: { 'Content-Type': 'application/json' } })).mockResolvedValueOnce(Response.json({})).mockResolvedValueOnce(Response.json({ products: [null], total: 1, status: 'complete', truncated: false, nextCursor: null, retrievedAt: '', warnings: [] })));
    const request = new Request('http://localhost/api/comparison/inventory');
    for (let index = 0; index < 3; index++) expect((await comparisonProxy(request, 'inventory')).status).toBe(502);
  });
});

describe('background search API boundary', () => {
  const progress = { id: 'abc', state: 'queued', status: 'error', collections: [], updatedAt: '', verifiedAt: null, stale: false, version: null, total: 0, truncated: false, queueMs: null };
  const post = (body: string, headers: Record<string, string> = {}, forwardedFor = '203.0.113.1') =>
    new Request('http://localhost/api/comparison/searches', { method: 'POST', body, headers: { 'Content-Type': 'application/json', 'X-Forwarded-For': forwardedFor, ...headers } });
  it('proxies validated SPHEREx-only JSON creation and progress', async () => {
    const fetcher = vi.fn().mockImplementation(() => Promise.resolve(Response.json(progress, { status: 202 })));
    vi.stubGlobal('fetch', fetcher);
    const response = await comparisonProxy(post(JSON.stringify({ ra: 0, dec: 0, size: 10 })), 'searches');
    expect(response.status).toBe(202);
    expect(JSON.parse(fetcher.mock.calls[0][1].body)).toEqual({ ra: 0, dec: 0, size: 10, mission: 'spherex' });
    expect((await comparisonProxy(post('{bad'), 'searches')).status).toBe(400);
    expect((await comparisonProxy(post('{"mission":"wise"}'), 'searches')).status).toBe(400);
    expect((await comparisonProxy(new Request('http://localhost/api/comparison/searches/abc'), 'searches/abc')).status).toBe(202);
    expect((await comparisonProxy(new Request('http://localhost/api/comparison/searches/abc?url=evil'), 'searches/abc')).status).toBe(400);
  });
  it('refuses cross-site, non-JSON and oversized requests before reading them', async () => {
    const fetcher = vi.fn();
    vi.stubGlobal('fetch', fetcher);
    const valid = JSON.stringify({ ra: 0, dec: 0, size: 10 });
    expect((await comparisonProxy(post(valid, { 'Sec-Fetch-Site': 'cross-site' }), 'searches')).status).toBe(403);
    expect((await comparisonProxy(post(valid, { 'Content-Type': 'text/plain' }), 'searches')).status).toBe(415);
    expect((await comparisonProxy(post(JSON.stringify({ ra: 0, dec: 0, size: 10, band: 'x'.repeat(5000) })), 'searches')).status).toBe(413);
    expect(fetcher).not.toHaveBeenCalled();
  });
  it('limits how many new searches one client can start per minute', async () => {
    vi.stubGlobal('fetch', vi.fn().mockImplementation(() => Promise.resolve(Response.json(progress, { status: 202 }))));
    const statuses: number[] = [];
    for (let i = 0; i < 8; i++) statuses.push((await comparisonProxy(post(JSON.stringify({ ra: i, dec: 0, size: 10 }), {}, '198.51.100.7'), 'searches')).status);
    expect(statuses.filter((s) => s === 202)).toHaveLength(6);
    expect(statuses.slice(6)).toEqual([429, 429]);
    expect((await comparisonProxy(post(JSON.stringify({ ra: 1, dec: 1, size: 10 }), {}, '198.51.100.8'), 'searches')).status).toBe(202);
  });
  it('rejects malformed progress and traversal identifiers', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(Response.json({ id: 'abc' })));
    expect((await comparisonProxy(new Request('http://localhost'), 'searches/abc')).status).toBe(502);
    expect((await comparisonProxy(new Request('http://localhost'), 'searches/../health')).status).toBe(400);
  });
});
