import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { NextRequest } from 'next/server';

let GET: typeof import('@/app/api/resolve/route').GET;
const request = (name: string, client = 'test') => new NextRequest(`http://localhost/api/resolve?name=${encodeURIComponent(name)}`, { headers: { 'x-forwarded-for': client } });
const found = (ra = 10.68, dec = 41.27) => ({ ResultCode: 3, Preferred: { Name: 'M31', Position: { RA: ra, Dec: dec } } });
beforeEach(async () => {
  vi.resetModules();
  ({ GET } = await import('@/app/api/resolve/route'));
  vi.stubGlobal('fetch', vi.fn(async () => Response.json(found())));
  vi.spyOn(console, 'error').mockImplementation(() => {});
});
afterEach(() => { vi.unstubAllGlobals(); vi.restoreAllMocks(); });

describe('NED route stability', () => {
  it.each([{}, [], '', '   '])('falls back to the requested name when the upstream label is malformed (%j)', async (name) => {
    vi.mocked(fetch).mockResolvedValueOnce(Response.json({ ResultCode: 3, Preferred: { Name: name, Position: { RA: 10.68, Dec: 41.27 }, ObjType: { Value: {} } } }));
    const result = await GET(request('M31'));
    expect(result.status).toBe(200);
    expect(await result.json()).toMatchObject({ ok: true, name: 'M31', objectType: null });
  });
  it('rejects invalid input without contacting NED and caches valid positions', async () => {
    expect((await GET(request('<script>'))).status).toBe(400);
    expect(fetch).not.toHaveBeenCalled();
    const first = await GET(request('M31'));
    expect(first.status).toBe(200);
    expect(await first.json()).toMatchObject({ ok: true, ra: 10.68, dec: 41.27, source: 'NED' });
    expect((await GET(request('m31'))).status).toBe(200);
    expect(fetch).toHaveBeenCalledOnce();
  });

  it.each([[NaN, 0], [Infinity, 0], [360, 0], [-1, 0], [0, 91], [0, -91]])('does not cache an invalid upstream position (%s, %s)', async (ra, dec) => {
    // An upstream test double can also produce non-JSON finite numbers.
    vi.mocked(fetch).mockResolvedValueOnce({ ok: true, json: async () => found(ra, dec) } as Response);
    const failed = await GET(request('M31'));
    expect(failed.status).toBe(502);
    expect(failed.headers.get('cache-control')).toBe('no-store');
    expect((await GET(request('M31'))).status).toBe(200);
    expect(fetch).toHaveBeenCalledTimes(2);
  });

  it('returns actionable failures and recovers after upstream errors and timeouts', async () => {
    vi.mocked(fetch).mockResolvedValueOnce(new Response('', { status: 503 }));
    expect((await GET(request('M31'))).status).toBe(502);
    vi.mocked(fetch).mockRejectedValueOnce(new DOMException('Timeout', 'TimeoutError'));
    expect((await GET(request('M31'))).status).toBe(504);
    expect((await GET(request('M31'))).status).toBe(200);
    expect(fetch).toHaveBeenCalledTimes(3);
  });

  it('distinguishes ambiguous and absent objects, and rate limits with refill', async () => {
    vi.mocked(fetch).mockResolvedValueOnce(Response.json({ ResultCode: 1 }));
    expect(await (await GET(request('ambiguous'))).json()).toMatchObject({ ok: false, message: expect.stringContaining('ambiguous') });
    vi.mocked(fetch).mockResolvedValueOnce(Response.json({ ResultCode: 0 }));
    expect((await GET(request('absent'))).status).toBe(404);
    const now = Date.now();
    vi.spyOn(Date, 'now').mockReturnValue(now);
    // Distinct names, so each one costs a NED request (cached answers are free, see below).
    for (let i = 0; i < 20; i++) expect((await GET(request(`NGC ${i + 1}`, 'rate-client'))).status).toBe(200);
    const limited = await GET(request('NGC 999', 'rate-client'));
    expect(limited.status).toBe(429);
    expect(limited.headers.get('cache-control')).toBe('no-store');
    // A name already looked up is served from the cache even while the client is limited.
    expect((await GET(request('NGC 1', 'rate-client'))).status).toBe(200);
    vi.mocked(Date.now).mockReturnValue(now + 4000);
    expect((await GET(request('NGC 1000', 'rate-client'))).status).toBe(200);
  });

  it('keys clients on the hop the nearest proxy added, not on what the client sends', async () => {
    const now = Date.now();
    vi.spyOn(Date, 'now').mockReturnValue(now);
    // A client rotating its own left-most value still shares the proxy-added right-most hop.
    for (let i = 0; i < 20; i++) expect((await GET(request(`IC ${i + 1}`, `10.0.0.${i}, 198.51.100.9`))).status).toBe(200);
    expect((await GET(request('IC 999', '10.9.9.9, 198.51.100.9'))).status).toBe(429);
    expect((await GET(request('IC 998', '198.51.100.10'))).status).toBe(200);
  });
});
