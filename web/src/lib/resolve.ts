// Turns a typed sky position into what the app should show: known movers that crossed it, and which
// static mission (if any) covers the position or the mover's position today.

import { dateToYear, loadIndex, loadManifest, type Manifest } from './data';
import { hasMoved, loadMovers, searchMovers, type MoverHit } from './movers';
import { insideGrid, skyToPixel } from './sky';

export function missionContaining(manifests: Manifest[], ra: number, dec: number): Manifest | null {
  return manifests.find((m) => insideGrid(m.grid, skyToPixel(m.grid, ra, dec))) ?? null;
}

export interface Resolution {
  ra: number;
  dec: number;
  hits: MoverHit[];
  /** The closest hit, when it has left the typed position. */
  moved: MoverHit | null;
  /** Mission showing the closest hit today (or the typed position when nothing moved). */
  mission: Manifest | null;
  /** Closest hit's name, with the mission's friendly name when a mission shows it ("WISE 0855-0714 (WISEA J0855...)"). */
  name: string | null;
}

let allManifests: Promise<Manifest[]> | null = null;
export function loadAllManifests(): Promise<Manifest[]> {
  if (!allManifests) {
    allManifests = loadIndex().then((ix) => Promise.all(ix.missions.map((m) => loadManifest(m.id))));
    allManifests.catch(() => (allManifests = null));
  }
  return allManifests;
}

export async function resolvePosition(ra: number, dec: number, now = dateToYear(new Date())): Promise<Resolution> {
  const [movers, manifests] = await Promise.all([loadMovers(), loadAllManifests()]);
  const hits = searchMovers(movers, ra, dec, now);
  const best = hits[0] ?? null;
  const showsBest = best ? missionContaining(manifests, best.nowRa, best.nowDec) : null;
  const mission = showsBest ?? missionContaining(manifests, ra, dec);
  const name = best ? (showsBest ? `${showsBest.name} (${best.mover.name})` : best.mover.name) : null;
  return { ra, dec, hits, moved: best && hasMoved(best) ? best : null, mission, name };
}

/** Fresh link to the watch page (no frame pinned, so it may autoplay), keeping a typed position as an overlay. */
export function watchHref(missionId: string | null, ra?: number, dec?: number): string {
  const p = new URLSearchParams();
  if (missionId) p.set('m', missionId);
  if (ra !== undefined && dec !== undefined) {
    p.set('ra', String(Number(ra.toFixed(6))));
    p.set('dec', String(Number(dec.toFixed(6))));
  }
  return `/watch?${p}`;
}
