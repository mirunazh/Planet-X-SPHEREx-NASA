import { vecToRadec } from '@/lib/sky/coords';
import type { NavState } from '@/lib/store';
import { viewQuery } from '@/lib/urlState';

export interface Region { ra: number; dec: number; size: number }

export function initialCropSize(fov: number, aspect: number): number {
  const horizontal = 2 * Math.atan(Math.tan(fov * Math.PI / 360) * aspect) * 180 / Math.PI;
  return Math.max(0.5, Math.min(10, fov * 60, horizontal * 60));
}

export function cropPixels(size: number, fov: number, height: number): number {
  return Math.tan(size / 60 * Math.PI / 360) / Math.tan(fov * Math.PI / 360) * height;
}

export function parseRegion(params: URLSearchParams): Region | null {
  const values = ['ra', 'dec', 'size'].map((key) => {
    const value = params.get(key);
    return value?.trim() ? Number(value) : NaN;
  });
  const [ra, dec, size] = values;
  if (!values.every(Number.isFinite) || ra < 0 || ra >= 360 || dec < -90 || dec > 90 || size < 0.5 || size > 30) return null;
  return { ra, dec, size };
}

export function comparisonUrl(state: NavState, size: number): string {
  const { ra, dec } = vecToRadec(state.center);
  const params = new URLSearchParams({ ra: String(ra), dec: String(dec), size: String(size), return: viewQuery(state) });
  return `/compare?${params}`;
}

/** Only a known navigator query can be used as the return destination. */
export function navigatorUrl(params: URLSearchParams): string {
  const saved = new URLSearchParams(params.get('return') ?? '');
  const safe = new URLSearchParams();
  for (const key of ['ra', 'dec', 'mode', 'fov', 'survey', 'f']) {
    const value = saved.get(key);
    if (value !== null) safe.set(key, value);
  }
  return safe.size ? `/?${safe}` : '/';
}
