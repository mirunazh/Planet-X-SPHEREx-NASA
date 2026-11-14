/**
 * View model and camera maths for the two navigation modes.
 *
 * globe: the camera orbits outside the unit celestial sphere and looks at its
 *        centre (mirror-reversed sky, like a celestial globe).
 * sky:   the camera sits at the centre and looks out (true sky). A perspective
 *        camera at the centre of the sphere is a gnomonic (TAN) projection.
 *
 * The coordinate deduction itself is `pickSky`: the direction under a screen
 * point, converted to RA/Dec with vecToRadec.
 */
import {
  type Vec3,
  DEG,
  RAD,
  add,
  angularDistance,
  applyQuat,
  cross,
  dot,
  eqToWorld,
  normalize,
  quatFromUnitVectors,
  radecToVec,
  scale,
  sub,
  vecToRadec,
  worldToEq,
} from './coords';
import { ALLSKY_PIXEL_DEG, BASE_PIXEL_DEG, TILE_SIZE } from './hips';

export type Mode = 'globe' | 'sky';

export interface View {
  mode: Mode;
  /** Equatorial unit vector of the sky point at the centre of the screen. */
  center: Vec3;
  /** Vertical field of view in sky mode, degrees. */
  fov: number;
  /** Camera distance from the sphere centre in globe mode, in sphere radii. */
  distance: number;
}

export const GLOBE_FOV = 40;
/** Legacy globe limits, retained for coordinate compatibility tests. */
export const GLOBE_MIN_DISTANCE = 2.0;
export const GLOBE_MAX_DISTANCE = 8;
export const SKY_MIN_FOV = 0.05;
/** Panoramic navigation clamps at this field of view. */
export const SKY_MAX_FOV = 100;
export const LOCK_MAX_FOV = 1;
const MAX_ABS_DEC = 89.95;

export interface Basis {
  position: Vec3;
  forward: Vec3;
  right: Vec3;
  up: Vec3;
  fov: number;
}

/** Keeps the view centre away from the exact poles, where "north up" is undefined. */
export function clampCenter(center: Vec3): Vec3 {
  const { ra, dec } = vecToRadec(center);
  return Math.abs(dec) <= MAX_ABS_DEC ? normalize(center) : radecToVec(ra, Math.sign(dec) * MAX_ABS_DEC);
}

export function cameraBasis(view: View): Basis {
  const c = eqToWorld(normalize(view.center));
  const position: Vec3 = view.mode === 'sky' ? [0, 0, 0] : scale(c, view.distance);
  const forward: Vec3 = view.mode === 'sky' ? c : scale(c, -1);
  let hint: Vec3 = [0, 1, 0]; // celestial north in world space
  if (Math.abs(dot(forward, hint)) > 0.99999) hint = [0, 0, -1];
  const right = normalize(cross(forward, hint));
  const up = cross(right, forward);
  return { position, forward, right, up, fov: view.mode === 'sky' ? view.fov : GLOBE_FOV };
}

export function rayDirection(basis: Basis, aspect: number, ndcX: number, ndcY: number): Vec3 {
  const tv = Math.tan((basis.fov * DEG) / 2);
  const th = tv * aspect;
  return normalize(add(add(basis.forward, scale(basis.right, ndcX * th)), scale(basis.up, ndcY * tv)));
}

/** The coordinate deduction: equatorial direction under a screen point (NDC), or null if it misses the globe. */
export function pickSky(view: View, aspect: number, ndcX: number, ndcY: number): Vec3 | null {
  const basis = cameraBasis(view);
  const d = rayDirection(basis, aspect, ndcX, ndcY);
  if (view.mode === 'sky') return worldToEq(d);
  const o = basis.position;
  const b = dot(o, d);
  const c = dot(o, o) - 1;
  const disc = b * b - c;
  if (disc < 0) return null;
  const t = -b - Math.sqrt(disc);
  return worldToEq(normalize(add(o, scale(d, t))));
}

/** Projects an equatorial direction to NDC. Null when behind the camera or on the hidden far side of the globe. */
export function projectWithBasis(view: View, basis: Basis, aspect: number, p: Vec3): { x: number; y: number } | null {
  const w = eqToWorld(p);
  let rel: Vec3 = w;
  if (view.mode === 'globe') {
    if (dot(w, normalize(basis.position)) < 1 / view.distance) return null;
    rel = sub(w, basis.position);
  }
  const z = dot(rel, basis.forward);
  if (z <= 1e-12) return null;
  const tv = Math.tan((basis.fov * DEG) / 2);
  return { x: dot(rel, basis.right) / (z * tv * aspect), y: dot(rel, basis.up) / (z * tv) };
}

export function projectSky(view: View, aspect: number, p: Vec3) {
  return projectWithBasis(view, cameraBasis(view), aspect, p);
}

/** Vertical sky field of view (deg) seen at the centre of the globe from a given distance. */
export function equivalentSkyFov(distance: number): number {
  const a = (GLOBE_FOV / 2) * DEG;
  const s = distance * Math.sin(a);
  if (s >= 1) return 2 * Math.acos(1 / distance) * RAD;
  return 2 * (Math.asin(s) - a) * RAD;
}

/** Inverse of equivalentSkyFov. */
export function distanceForSkyFov(fov: number): number {
  const a = (GLOBE_FOV / 2) * DEG;
  return Math.sin(Math.min(Math.PI / 2, a + (fov / 2) * DEG)) / Math.sin(a);
}

/** Effective vertical field of view in either mode, degrees. */
export function effectiveFov(view: View): number {
  return view.mode === 'sky' ? view.fov : equivalentSkyFov(view.distance);
}

/** Angular size of one screen pixel at the centre of the view, in degrees. */
export function pixelScaleDeg(view: View, heightPx: number): number {
  if (view.mode === 'sky') return view.fov / heightPx;
  return ((view.distance - 1) * GLOBE_FOV) / heightPx;
}

/** Angular radius of the on-screen sky region around the view centre, in degrees. */
export function visibleRadiusDeg(view: View, aspect: number): number {
  const fov = view.mode === 'sky' ? view.fov : GLOBE_FOV;
  const tv = Math.tan((fov * DEG) / 2);
  const diag = Math.atan(Math.hypot(tv, tv * aspect));
  if (view.mode === 'sky') return diag * RAD;
  const horizon = Math.acos(1 / view.distance);
  const s = view.distance * Math.sin(diag);
  const beta = s < 1 ? Math.asin(s) - diag : horizon;
  return Math.min(beta, horizon) * RAD;
}

/**
 * HiPS order whose native pixel best matches a screen pixel of `scaleDeg`.
 * Returns null while the 64-px Allsky preview is still sharp enough.
 */
export function tileOrderFor(scaleDeg: number, maxOrder: number): number | null {
  if (scaleDeg >= ALLSKY_PIXEL_DEG / 1.25) return null;
  const need = Math.log2(BASE_PIXEL_DEG / (TILE_SIZE * scaleDeg));
  return Math.max(3, Math.min(maxOrder, Math.ceil(need)));
}

/**
 * Grab-the-sky: returns the view centre that puts `anchor` under the given screen
 * point. Each step rotates the view by the rotation taking the point currently
 * under the pointer onto the anchor. A few iterations absorb the north-up constraint.
 */
export function solveAnchor(view: View, aspect: number, ndcX: number, ndcY: number, anchor: Vec3): Vec3 {
  let center = view.center;
  for (let i = 0; i < 16; i++) {
    const current = pickSky({ ...view, center }, aspect, ndcX, ndcY);
    if (!current) break;
    if (angularDistance(current, anchor) < 1e-8) break;
    center = normalize(applyQuat(quatFromUnitVectors(normalize(current), normalize(anchor)), center));
  }
  return clampCenter(center);
}
