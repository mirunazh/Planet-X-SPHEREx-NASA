import { angularDistance, radecToVec } from '@/lib/sky/coords';
import type { Region } from './region';
import type { ImageProduct } from './types';
import type { InventoryState } from './session';

export const NEARBY_RADII = [1, 2, 5] as const;

export function nearbySearchFilters(region: Region, filters: Record<string, string | number>, radius: number) {
  const values: Record<string, string | number> = { ...region, nearby_radius: radius };
  for (const [key, value] of Object.entries(filters)) {
    if (value !== '') values[key] = key === 'wave_min' || key === 'wave_max' ? Number(value) : value;
  }
  return values;
}

/** A failed, unfinished or stale archive query cannot establish that a region is empty. */
export function hasVerifiedEmptyRegion(state: InventoryState): boolean {
  return !state.loading && !state.error && !state.pendingVersion && !state.page?.products.length
    && !state.page?.stale && !state.progress?.stale
    && state.progress?.state === 'finished' && state.progress.status === 'empty';
}

/** Rank known image centres, never a guessed coordinate or the first date-sorted image. */
export function nearbyRegions(products: ImageProduct[], origin: Region, radius: number) {
  const direction = radecToVec(origin.ra, origin.dec);
  const ranked = products.flatMap((product) => {
    const center = product.center;
    if (!center || !Number.isFinite(center.ra) || center.ra < 0 || center.ra >= 360
      || !Number.isFinite(center.dec) || Math.abs(center.dec) > 90) return [];
    const distance = angularDistance(direction, radecToVec(center.ra, center.dec));
    return distance <= radius + 1e-9 ? [{ product, region: { ...center, size: origin.size }, distance }] : [];
  }).sort((a, b) => a.distance - b.distance || a.product.id.localeCompare(b.product.id));
  // Repeated exposures of almost the same centre should offer one destination, not many dates.
  return ranked.filter((item, index) => !ranked.slice(0, index).some((other) =>
    angularDistance(radecToVec(item.region.ra, item.region.dec), radecToVec(other.region.ra, other.region.dec)) < origin.size / 120)).slice(0, 3);
}

/** Keep the original navigator destination and label the new region with its actual coordinates. */
export function nearbyRegionUrl(params: URLSearchParams, region: Region, filters?: Record<string, string | number>): string {
  const query = new URLSearchParams(params);
  query.set('ra', String(region.ra));
  query.set('dec', String(region.dec));
  query.set('size', String(region.size));
  query.delete('name');
  query.delete('challenge');
  if (filters) {
    query.set('filters', '1');
    for (const [key, value] of Object.entries(filters)) {
      if (value === '') query.delete(key);
      else query.set(key, String(value));
    }
  }
  return `/compare?${query}`;
}
