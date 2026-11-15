import { afterEach, expect, it, vi } from 'vitest';
import { PreviewLoader } from '@/lib/comparison/previews';
import { comparisonProxy } from '@/lib/comparison/proxy';
import { isWeeklyChallenge } from '@/lib/comparison/types';

const id = 'a'.repeat(64);
afterEach(() => vi.unstubAllGlobals());

it('loads a prepared challenge image without creating a search or downloading FITS', async () => {
  const fetcher = vi.fn().mockResolvedValueOnce(Response.json({ id, state: 'ready', error: null, width: 384, height: 384, coverageFraction: 1 }))
    .mockResolvedValueOnce(new Response(new Uint8Array([137,80,78,71,13,10,26,10]), { headers: { 'Content-Type': 'image/png' } }));
  const loader = new PreviewLoader('weekly-challenge', 'week', fetcher, () => 'blob:cached', () => {}, { product: id });
  expect((await loader.load('product', new AbortController().signal)).url).toBe('blob:cached');
  expect(fetcher.mock.calls.map(([url]) => url)).toEqual([`/api/comparison/challenge/previews/${id}`, `/api/comparison/challenge/previews/${id}/image`]);
  expect(fetcher.mock.calls.every(([, options]) => options.method === undefined)).toBe(true);
  loader.dispose();
});

it('validates challenge metadata and rejects malformed cache manifests', async () => {
  const challenge = { id: '2026-W46', title: 'M101', startsAt: '2026-11-09T00:00:00Z', endsAt: '2026-11-16T00:00:00Z',
    state: 'preparing', checkedAt: null, latestObservation: null, error: null, ready: 0, target: 12, found: 0, newThisWeek: 0,
    band: null, prompt: 'Look at this sky region', region: { ra: 210, dec: 54, size: 6 }, frames: [] };
  expect(isWeeklyChallenge(challenge)).toBe(true);
  expect(isWeeklyChallenge({ ...challenge, ready: 1 })).toBe(false);
  expect(isWeeklyChallenge({ ...challenge, region: { ra: 360, dec: 54, size: 6 } })).toBe(false);
  vi.stubGlobal('fetch', vi.fn().mockResolvedValueOnce(Response.json(challenge)).mockResolvedValueOnce(Response.json({ ...challenge, frames: [{}] })));
  expect((await comparisonProxy(new Request('http://localhost'), 'challenge')).status).toBe(200);
  expect((await comparisonProxy(new Request('http://localhost'), 'challenge')).status).toBe(502);
  expect((await comparisonProxy(new Request('http://localhost'), 'challenge/previews/../../health/image')).status).toBe(400);
});
