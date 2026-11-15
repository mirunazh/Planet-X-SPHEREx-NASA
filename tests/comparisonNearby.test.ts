import { describe, expect, it } from 'vitest';
import { hasVerifiedEmptyRegion, nearbyRegions, nearbyRegionUrl, nearbySearchFilters } from '@/lib/comparison/nearby';
import { isInventoryPage, type ImageProduct, type SearchProgress } from '@/lib/comparison/types';
import type { InventoryState } from '@/lib/comparison/session';

const product = (id: string, center: ImageProduct['center']): ImageProduct => ({ id, center, mission: 'spherex',
  collection: 'spherex_dr1', title: id, band: null, wavelengthMin: null, wavelengthMax: null,
  observedStart: null, observedEnd: null, kind: 'individual', coverage: 'intersects', footprint: null,
  sourceUrl: 'https://irsa.ipac.caltech.edu/SIA', accessUrl: 'https://irsa.ipac.caltech.edu/ibe/data/spherex/dr1/a.fits' });

describe('nearby comparison regions', () => {
  it('omits empty numeric filters and preserves applied date, wavelength and detector constraints', () => {
    expect(nearbySearchFilters({ ra: 1, dec: 2, size: 3 }, { band: '', wave_min: '', wave_max: '', start: '', end: '', kind: 'all' }, 1))
      .toEqual({ ra: 1, dec: 2, size: 3, nearby_radius: 1, kind: 'all' });
    expect(nearbySearchFilters({ ra: 1, dec: 2, size: 3 }, { band: 'SPHEREx-D3', wave_min: '1.6', wave_max: '2.4', start: '2026-01-01' }, 2))
      .toMatchObject({ band: 'SPHEREx-D3', wave_min: 1.6, wave_max: 2.4, start: '2026-01-01', nearby_radius: 2 });
  });

  it('offers nearby search only after verified empty coverage, never for the archive error state', () => {
    const progress: SearchProgress = { id: 'job', state: 'finished', status: 'empty', collections: [],
      updatedAt: '2026-11-15T00:00:00Z', verifiedAt: '2026-11-15T00:00:00Z', stale: false,
      version: 'v1', total: 0, truncated: false, queueMs: 0 };
    const state: InventoryState = { progress, page: null, error: null, loading: false, loadingPage: false, pendingVersion: null };
    expect(hasVerifiedEmptyRegion(state)).toBe(true);
    for (const patch of [{ loading: true }, { error: 'Archive HTTP 502' }, { pendingVersion: 'v2' }, { progress: null },
      ...(['error', 'partial'] as const).map((status) => ({ progress: { ...progress, status } })),
      ...(['queued', 'running', 'timed_out', 'interrupted'] as const).map((status) => ({ progress: { ...progress, state: status } })),
      { progress: { ...progress, stale: true } }]) {
      expect(hasVerifiedEmptyRegion({ ...state, ...patch })).toBe(false);
    }
  });

  it('chooses distance rather than date or response order, crossing RA zero', () => {
    const regions = nearbyRegions([product('far', { ra: 359.5, dec: 0 }), product('close', { ra: .01, dec: 0 }),
      product('unknown', null), product('outside', { ra: 3, dec: 0 })], { ra: 359.99, dec: 0, size: 1 }, 1);
    expect(regions.map((item) => item.product.id)).toEqual(['close', 'far']);
    expect(regions[0].distance).toBeCloseTo(.02);
    expect(regions[0].region.size).toBe(1);
  });

  it('handles poles and repeated exposures without offering duplicate destinations', () => {
    const regions = nearbyRegions([product('a', { ra: 0, dec: 89.9 }), product('b', { ra: 180, dec: 89.9 }),
      product('copy', { ra: 0, dec: 89.9001 })], { ra: 20, dec: 90, size: 1 }, 1);
    expect(regions).toHaveLength(2);
    for (const item of regions) expect(item.distance).toBeCloseTo(.1);
    expect(nearbyRegions([product('bad', { ra: NaN, dec: 0 })], { ra: 0, dec: 0, size: 1 }, 1)).toEqual([]);
  });

  it('preserves the original return destination and removes the old place name', () => {
    const url = nearbyRegionUrl(new URLSearchParams('ra=1&dec=2&size=3&name=M31&return=ra%3D1%26dec%3D2'), { ra: 4, dec: 5, size: 3 });
    const query = new URL(url, 'https://example.test').searchParams;
    expect(query.get('ra')).toBe('4');
    expect(query.get('dec')).toBe('5');
    expect(query.get('size')).toBe('3');
    expect(query.has('name')).toBe(false);
    expect(query.get('return')).toBe('ra=1&dec=2');
    const filtered = new URL(nearbyRegionUrl(new URLSearchParams('band=old&wave_max=3'), { ra: 4, dec: 5, size: 3 },
      { band: '', wave_min: '1.6', wave_max: '', start: '2026-01-01', kind: 'individual' }), 'https://example.test').searchParams;
    expect(filtered.get('filters')).toBe('1');
    expect(filtered.has('band')).toBe(false);
    expect(filtered.has('wave_max')).toBe(false);
    expect(filtered.get('wave_min')).toBe('1.6');
    expect(filtered.get('start')).toBe('2026-01-01');
    expect(filtered.get('kind')).toBe('individual');
  });

  it('rejects malformed image centres at the API boundary, accepting legacy metadata', () => {
    const page = (center: unknown) => ({ products: [{ ...product('a', null), center }], total: 1, nextCursor: null,
      status: 'complete', truncated: false, warnings: [], retrievedAt: '2026-11-15T00:00:00Z' });
    for (const center of [undefined, null, { ra: 0, dec: 90 }]) expect(isInventoryPage(page(center))).toBe(true);
    for (const center of ['bad', { ra: 360, dec: 0 }, { ra: 0, dec: 91 }, { ra: '1', dec: 0 }]) expect(isInventoryPage(page(center))).toBe(false);
  });
});
