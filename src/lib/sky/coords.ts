/**
 * Coordinate core: ICRS unit vectors, the three.js world mapping, and the
 * galactic and ecliptic frames. Pure functions, covered by tests/coords.test.ts.
 *
 * Equatorial unit vector convention (same as HEALPix):
 *   x → RA 0°, Dec 0°   y → RA 90°, Dec 0°   z → north celestial pole
 */
export type Vec3 = [number, number, number];
export type Quat = [number, number, number, number]; // x, y, z, w

export const DEG = Math.PI / 180;
export const RAD = 180 / Math.PI;

export const dot = (a: Vec3, b: Vec3): number => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
export const cross = (a: Vec3, b: Vec3): Vec3 => [
  a[1] * b[2] - a[2] * b[1],
  a[2] * b[0] - a[0] * b[2],
  a[0] * b[1] - a[1] * b[0],
];
export const add = (a: Vec3, b: Vec3): Vec3 => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
export const sub = (a: Vec3, b: Vec3): Vec3 => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
export const scale = (a: Vec3, s: number): Vec3 => [a[0] * s, a[1] * s, a[2] * s];
export const length = (a: Vec3): number => Math.hypot(a[0], a[1], a[2]);

export function normalize(a: Vec3): Vec3 {
  const l = length(a);
  return l > 0 ? [a[0] / l, a[1] / l, a[2] / l] : [1, 0, 0];
}

export function wrapRa(ra: number): number {
  const r = ra % 360;
  return r < 0 ? r + 360 : r;
}

export function radecToVec(raDeg: number, decDeg: number): Vec3 {
  const a = raDeg * DEG;
  const d = decDeg * DEG;
  const cd = Math.cos(d);
  return [cd * Math.cos(a), cd * Math.sin(a), Math.sin(d)];
}

export function vecToRadec(v: Vec3): { ra: number; dec: number } {
  const [x, y, z] = normalize(v);
  const ra = wrapRa(Math.atan2(y, x) * RAD);
  const dec = Math.asin(Math.max(-1, Math.min(1, z))) * RAD;
  return { ra: ra >= 360 ? 0 : ra, dec };
}

/** Angular distance between two directions, in degrees (stable for tiny and large angles). */
export function angularDistance(a: Vec3, b: Vec3): number {
  return Math.atan2(length(cross(a, b)), dot(a, b)) * RAD;
}

/** Equatorial vector → three.js world space (Y up, right-handed). A proper rotation. */
export const eqToWorld = (v: Vec3): Vec3 => [v[0], v[2], -v[1]];
/** three.js world space → equatorial vector. */
export const worldToEq = (w: Vec3): Vec3 => [w[0], -w[2], w[1]];

export function quatFromAxisAngle(axis: Vec3, angle: number): Quat {
  const [x, y, z] = normalize(axis);
  const s = Math.sin(angle / 2);
  return [x * s, y * s, z * s, Math.cos(angle / 2)];
}

/** Rotation that takes unit vector a onto unit vector b (same algorithm as three.js). */
export function quatFromUnitVectors(a: Vec3, b: Vec3): Quat {
  let r = dot(a, b) + 1;
  let x: number;
  let y: number;
  let z: number;
  if (r < 1e-10) {
    r = 0;
    if (Math.abs(a[0]) > Math.abs(a[2])) {
      x = -a[1];
      y = a[0];
      z = 0;
    } else {
      x = 0;
      y = -a[2];
      z = a[1];
    }
  } else {
    [x, y, z] = cross(a, b);
  }
  const n = Math.hypot(x, y, z, r);
  return [x / n, y / n, z / n, r / n];
}

export function applyQuat(q: Quat, v: Vec3): Vec3 {
  const [qx, qy, qz, qw] = q;
  const [x, y, z] = v;
  const ix = qw * x + qy * z - qz * y;
  const iy = qw * y + qz * x - qx * z;
  const iz = qw * z + qx * y - qy * x;
  const iw = -qx * x - qy * y - qz * z;
  return [
    ix * qw + iw * -qx + iy * -qz - iz * -qy,
    iy * qw + iw * -qy + iz * -qx - ix * -qz,
    iz * qw + iw * -qz + ix * -qy - iy * -qx,
  ];
}

/** Spherical linear interpolation between unit vectors. */
export function slerp(a: Vec3, b: Vec3, t: number): Vec3 {
  const d = Math.max(-1, Math.min(1, dot(a, b)));
  const omega = Math.acos(d);
  if (omega < 1e-10) return normalize(add(scale(a, 1 - t), scale(b, t)));
  if (Math.PI - omega < 1e-6) {
    const axis = normalize(Math.abs(a[0]) < 0.9 ? cross(a, [1, 0, 0]) : cross(a, [0, 1, 0]));
    return normalize(applyQuat(quatFromAxisAngle(axis, Math.PI * t), a));
  }
  const s = Math.sin(omega);
  return normalize(add(scale(a, Math.sin((1 - t) * omega) / s), scale(b, Math.sin(t * omega) / s)));
}

/**
 * ICRS → Galactic rotation matrix in the standard ICRS galactic frame.
 * Each row is a galactic axis expressed in ICRS.
 */
const ICRS_TO_GAL: readonly [Vec3, Vec3, Vec3] = [
  [-0.0548755604162154, -0.873437090234885, -0.4838350155487132],
  [0.4941094278755837, -0.4448296299600112, 0.7469822444972189],
  [-0.8676661490190047, -0.1980763734312015, 0.4559837761750669],
];

export function eqToGal(v: Vec3): Vec3 {
  return [dot(ICRS_TO_GAL[0], v), dot(ICRS_TO_GAL[1], v), dot(ICRS_TO_GAL[2], v)];
}

export function galToEq(g: Vec3): Vec3 {
  const [r0, r1, r2] = ICRS_TO_GAL;
  return [
    r0[0] * g[0] + r1[0] * g[1] + r2[0] * g[2],
    r0[1] * g[0] + r1[1] * g[1] + r2[1] * g[2],
    r0[2] * g[0] + r1[2] * g[1] + r2[2] * g[2],
  ];
}

export function radecToGalactic(ra: number, dec: number): { l: number; b: number } {
  const { ra: l, dec: b } = vecToRadec(eqToGal(radecToVec(ra, dec)));
  return { l, b };
}

export function galacticToRadec(l: number, b: number): { ra: number; dec: number } {
  return vecToRadec(galToEq(radecToVec(l, b)));
}

/** Mean obliquity of the ecliptic at J2000.0 (IAU 2006): 84381.406″. */
export const OBLIQUITY_DEG = 84381.406 / 3600;

export function eclToEq(e: Vec3): Vec3 {
  const c = Math.cos(OBLIQUITY_DEG * DEG);
  const s = Math.sin(OBLIQUITY_DEG * DEG);
  return [e[0], e[1] * c - e[2] * s, e[1] * s + e[2] * c];
}

export type GreatCircle = 'equator' | 'ecliptic' | 'galactic';

/** Points along a reference great circle, as equatorial unit vectors. */
export function greatCircle(kind: GreatCircle, steps = 360): Vec3[] {
  const points: Vec3[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * 2 * Math.PI;
    const p: Vec3 = [Math.cos(t), Math.sin(t), 0];
    points.push(kind === 'equator' ? p : kind === 'ecliptic' ? eclToEq(p) : galToEq(p));
  }
  return points;
}
