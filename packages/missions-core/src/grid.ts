/**
 * The mission sky grid: 121 x 121 pixels, 3 arcsec each, gnomonic (TAN) projection about
 * (ra0, dec0), north up, east left. Pixel (x, y) = (column, row), 0-based pixel centres,
 * row 0 = north, column 0 = east. FITS equivalent: CRPIX1 = CRPIX2 = 61, CDELT1 = CDELT2 =
 * -3/3600 deg, no rotation (pipeline/science.py grid_wcs). These formulas are the
 * standard TAN projection that astropy's wcs_pix2world / wcs_world2pix apply to that WCS.
 */

export interface Grid {
  ra0: number; // deg
  dec0: number; // deg
  scaleArcsec: number; // 3
  width: number; // 121
  height: number; // 121
}

export interface Sky {
  ra: number; // deg
  dec: number; // deg
}

export interface Offset {
  east: number; // arcsec, positive = east (RA increasing)
  north: number; // arcsec
  total: number; // arcsec
  paDeg: number; // position angle of b seen from a, degrees east of north, 0..360
}

const D2R = Math.PI / 180;

/** 0-based reference pixel: FITS CRPIX = (n + 1) / 2 is 1-based. */
const refPix = (n: number) => (n + 1) / 2 - 1;

export function gridToSky(grid: Grid, x: number, y: number): Sky {
  const cdelt = (-grid.scaleArcsec / 3600) * D2R; // radians per pixel, both axes negative
  const xi = (x - refPix(grid.width)) * cdelt; // standard coordinate toward east
  const eta = (y - refPix(grid.height)) * cdelt; // toward north
  const a0 = grid.ra0 * D2R;
  const d0 = grid.dec0 * D2R;
  const den = Math.cos(d0) - eta * Math.sin(d0);
  const ra = a0 + Math.atan2(xi, den);
  const dec = Math.atan2(Math.sin(d0) + eta * Math.cos(d0), Math.hypot(xi, den));
  return { ra: norm360(ra / D2R), dec: dec / D2R };
}

export function skyToGrid(grid: Grid, ra: number, dec: number): { x: number; y: number } {
  const a = ra * D2R;
  const d = dec * D2R;
  const a0 = grid.ra0 * D2R;
  const d0 = grid.dec0 * D2R;
  const cosc = Math.sin(d0) * Math.sin(d) + Math.cos(d0) * Math.cos(d) * Math.cos(a - a0);
  const xi = (Math.cos(d) * Math.sin(a - a0)) / cosc;
  const eta = (Math.cos(d0) * Math.sin(d) - Math.sin(d0) * Math.cos(d) * Math.cos(a - a0)) / cosc;
  const cdelt = (-grid.scaleArcsec / 3600) * D2R;
  return { x: refPix(grid.width) + xi / cdelt, y: refPix(grid.height) + eta / cdelt };
}

/**
 * Offset from a to b, the same flat-sky formula as the pipeline's truth block
 * (build_missions.py mover_truth): east = dRA * cos(dec_a) * 3600, north = dDec * 3600.
 * Exact enough for the few-arcminute fields used here.
 */
export function offsetArcsec(a: Sky, b: Sky): Offset {
  let dra = b.ra - a.ra;
  dra -= 360 * Math.round(dra / 360); // wrap across RA = 0
  const east = dra * Math.cos(a.dec * D2R) * 3600;
  const north = (b.dec - a.dec) * 3600;
  return { east, north, total: Math.hypot(east, north), paDeg: positionAngleDeg(east, north) };
}

/** Degrees east of north, 0..360, of a vector (east, north). */
export function positionAngleDeg(east: number, north: number): number {
  return norm360(Math.atan2(east, north) / D2R);
}

/** Smallest absolute difference between two angles, degrees, 0..180. */
export function angleDiffDeg(a: number, b: number): number {
  const d = Math.abs(norm360(a - b));
  return d > 180 ? 360 - d : d;
}

function norm360(v: number): number {
  const r = v % 360;
  return r < 0 ? r + 360 : r;
}
