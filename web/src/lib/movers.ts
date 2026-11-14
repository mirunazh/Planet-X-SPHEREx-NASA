// "It moved" check: which known high-proper-motion object had its track pass the typed position.
// Catalogue: movers-pm500.json (SIMBAD, epoch 2000.0). Propagation as in pipeline/movers/NOTES.md:
// dRA_deg = pmRaCosDec * dt / 3.6e6 / cos(dec); dDec_deg = pmDec * dt / 3.6e6; separation by haversine.

import { compass, separationArcsec, type Compass } from './sky';
import { DATA_ROOT } from './data';

export interface MoverCatalogue {
  schema: 'movers/1';
  epoch: number;
  count: number;
  columns: string[];
  rows: [string, number, number, number, number, number | null, string | null, string | null][];
}

export interface Mover {
  name: string;
  ra: number;
  dec: number;
  pmRaCosDec: number;
  pmDec: number;
}

export interface MoverHit {
  mover: Mover;
  /** Year of closest approach to the typed position, within the search window. */
  year: number;
  /** Separation at that year, arcsec. */
  minSepArcsec: number;
  /** Where the object is at `now`. */
  nowRa: number;
  nowDec: number;
  /** Typed position to the object's position now. */
  nowSepArcsec: number;
  nowDirection: Compass;
}

export const SEARCH_RADIUS_ARCSEC = 15;
export const YEAR_MIN = 1990;
export const YEAR_MAX = 2027;

export function moversFromCatalogue(cat: MoverCatalogue): Mover[] {
  const i = (c: string) => cat.columns.indexOf(c);
  const [n, r, d, pr, pd] = ['name', 'ra', 'dec', 'pmRaCosDec', 'pmDec'].map(i);
  return cat.rows.map((row) => ({
    name: row[n] as string,
    ra: row[r] as number,
    dec: row[d] as number,
    pmRaCosDec: row[pr] as number,
    pmDec: row[pd] as number,
  }));
}

let cataloguePromise: Promise<Mover[]> | null = null;
export function loadMovers(): Promise<Mover[]> {
  if (!cataloguePromise) {
    cataloguePromise = fetch(`${DATA_ROOT}/movers-pm500.json`)
      .then((res) => {
        if (!res.ok) throw new Error(`movers-pm500.json: HTTP ${res.status}`);
        return res.json() as Promise<MoverCatalogue>;
      })
      .then(moversFromCatalogue);
    cataloguePromise.catch(() => (cataloguePromise = null));
  }
  return cataloguePromise;
}

export function positionAt(m: Mover, year: number): { ra: number; dec: number } {
  const dt = year - 2000;
  const dec = m.dec + (m.pmDec * dt) / 3.6e6;
  const ra = m.ra + (m.pmRaCosDec * dt) / 3.6e6 / Math.cos((m.dec * Math.PI) / 180);
  return { ra: ((ra % 360) + 360) % 360, dec };
}

/** Objects whose track between YEAR_MIN and YEAR_MAX passes within `radius` of (ra, dec), closest first. */
export function searchMovers(movers: Mover[], ra: number, dec: number, now: number, radius = SEARCH_RADIUS_ARCSEC): MoverHit[] {
  const cosDec = Math.cos((dec * Math.PI) / 180);
  const hits: MoverHit[] = [];
  for (const m of movers) {
    // Cheap reject: no object here moves more than ~11"/yr, so 37 yr of track stays within 0.15 deg.
    if (Math.abs(m.dec - dec) > 0.2) continue;
    const dRa = ((m.ra - ra + 540) % 360) - 180;
    if (Math.abs(dRa * cosDec) > 0.2) continue;
    // Closest approach of a straight track on the tangent plane, clamped to the window.
    const e0 = -dRa * cosDec * 3600; // typed position minus object at 2000, arcsec east
    const n0 = (dec - m.dec) * 3600;
    const ve = m.pmRaCosDec / 1000;
    const vn = m.pmDec / 1000;
    const v2 = ve * ve + vn * vn;
    const tBest = v2 > 0 ? 2000 + (e0 * ve + n0 * vn) / v2 : 2000;
    const year = Math.min(YEAR_MAX, Math.max(YEAR_MIN, tBest));
    const at = positionAt(m, year);
    const minSep = separationArcsec(ra, dec, at.ra, at.dec);
    if (minSep > radius) continue;
    const nowPos = positionAt(m, now);
    const east = ((nowPos.ra - ra + 540) % 360 - 180) * cosDec * 3600;
    const north = (nowPos.dec - dec) * 3600;
    hits.push({
      mover: m,
      year,
      minSepArcsec: minSep,
      nowRa: nowPos.ra,
      nowDec: nowPos.dec,
      nowSepArcsec: separationArcsec(ra, dec, nowPos.ra, nowPos.dec),
      nowDirection: compass(east, north),
    });
  }
  return hits.sort((a, b) => a.minSepArcsec - b.minSepArcsec);
}

/** True when the object has left the typed position: worth an "it moved" banner. */
export function hasMoved(hit: MoverHit): boolean {
  return hit.nowSepArcsec > SEARCH_RADIUS_ARCSEC;
}
