/**
 * Spherical geometry for the static index. Footprint edges are great circles (ADQL polygons), and a gnomonic
 * (TAN) projection maps every great circle to a straight line, so "point in footprint" is an exact planar
 * point-in-polygon test after projecting about any point near the footprint. RA wrap and the poles need no
 * special case: the projection is about the footprint's own reference point.
 */
const D2R = Math.PI / 180;

/** Gnomonic projection of (ra, dec) about the tangent point (ra0, dec0), degrees in, radians out; null when the
 *  point is 90 degrees or more from the tangent point (it cannot be inside a footprint there). */
export function gnomonic(ra0: number, dec0: number, ra: number, dec: number): [number, number] | null {
  const a = (ra - ra0) * D2R, d = dec * D2R, d0 = dec0 * D2R;
  const cd = Math.cos(d), sd = Math.sin(d), cd0 = Math.cos(d0), sd0 = Math.sin(d0), ca = Math.cos(a);
  const c = sd * sd0 + cd * cd0 * ca;
  if (c <= 0) return null;
  return [(cd * Math.sin(a)) / c, (sd * cd0 - cd * sd0 * ca) / c];
}

/** Even-odd ray casting; vertices in order (either orientation). */
export function pointInPolygon(x: number, y: number, xs: ArrayLike<number>, ys: ArrayLike<number>): boolean {
  let inside = false;
  for (let i = 0, j = xs.length - 1; i < xs.length; j = i++) {
    const xi = xs[i]!, yi = ys[i]!, xj = xs[j]!, yj = ys[j]!;
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}

/** Exact test against a spherical polygon given by its vertices in degrees (great-circle edges). */
export function sphericalPolygonContains(ra: number, dec: number, verts: ReadonlyArray<readonly [number, number]>): boolean {
  // tangent point: normalised mean of the vertex unit vectors
  let x = 0, y = 0, z = 0;
  for (const [r, d] of verts) {
    x += Math.cos(d * D2R) * Math.cos(r * D2R); y += Math.cos(d * D2R) * Math.sin(r * D2R); z += Math.sin(d * D2R);
  }
  const ra0 = Math.atan2(y, x) / D2R, dec0 = Math.atan2(z, Math.hypot(x, y)) / D2R;
  const p = gnomonic(ra0, dec0, ra, dec);
  if (!p) return false;
  const xs: number[] = [], ys: number[] = [];
  for (const [r, d] of verts) {
    const q = gnomonic(ra0, dec0, r, d);
    if (!q) return false; // polygon wider than a hemisphere: not a SPHEREx footprint
    xs.push(q[0]); ys.push(q[1]);
  }
  return pointInPolygon(p[0], p[1], xs, ys);
}

export function separationDeg(ra1: number, dec1: number, ra2: number, dec2: number): number {
  const s = (v: number) => Math.sin((v * D2R) / 2) ** 2;
  const h = s(dec2 - dec1) + Math.cos(dec1 * D2R) * Math.cos(dec2 * D2R) * s(ra2 - ra1);
  return (2 * Math.asin(Math.min(1, Math.sqrt(h)))) / D2R;
}

/** Angular distance (deg) from (ra, dec) to the RA/Dec cell [ra0, ra1] x [dec0, dec1] (0 <= ra0 < ra1 <= 360),
 *  0 inside. Same RA range: along the meridian. Otherwise the nearest point is on an edge meridian, at the
 *  latitude closest to the point on that great circle, clamped to the cell (distance is unimodal along it). */
export function cellDistanceDeg(cell: readonly number[], ra: number, dec: number): number {
  const [a0, a1, d0, d1] = cell as [number, number, number, number];
  const off = (((ra - a0) % 360) + 360) % 360; // RA of the point measured from the cell's west edge
  if (off <= a1 - a0) return Math.max(0, d0 - dec, dec - d1);
  let best = 180;
  for (const a of [a0, a1]) {
    const dl = (ra - a) * D2R;
    const t = Math.atan2(Math.sin(dec * D2R), Math.cos(dec * D2R) * Math.cos(dl)) / D2R;
    best = Math.min(best, separationDeg(ra, dec, a, Math.min(d1, Math.max(d0, t))));
  }
  return best;
}
