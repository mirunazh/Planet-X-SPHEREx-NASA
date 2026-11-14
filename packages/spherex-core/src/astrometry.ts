/** Proper motion, separation, "what was here" over the movers catalogue (pipeline/movers/NOTES.md), and the
 *  geocentric predicted position with parallax used for mission markers (pipeline/science.py predict). */

const D2R = Math.PI / 180;

/** Julian year (2000.0 = MJD 51544.5). */
export const jyear = (mjd: number) => 2000 + (mjd - 51544.5) / 365.25;
export const mjdOfJyear = (y: number) => 51544.5 + (y - 2000) * 365.25;

/** Angular separation in arcsec (haversine). */
export function separationArcsec(ra1: number, dec1: number, ra2: number, dec2: number): number {
  const b1 = dec1 * D2R, b2 = dec2 * D2R;
  const h = Math.sin((b2 - b1) / 2) ** 2 + Math.cos(b1) * Math.cos(b2) * Math.sin(((ra2 - ra1) * D2R) / 2) ** 2;
  return (2 * Math.asin(Math.min(1, Math.sqrt(h)))) / D2R * 3600;
}

export interface Mover {
  name: string;
  ra: number; // deg, epoch 2000.0
  dec: number;
  pmRaCosDec: number; // mas/yr
  pmDec: number;
  plx: number | null;
  otype: string | null;
  spType: string | null;
}

/** Rows of assets/movers*.json ("movers/1": columns name, ra, dec, pmRaCosDec, pmDec, plx, otype, spType). */
export function moversFromCatalogue(cat: { columns: string[]; rows: unknown[][] }): Mover[] {
  const c = (k: string) => { const i = cat.columns.indexOf(k); if (i < 0) throw new Error(`movers catalogue lacks ${k}`); return i; };
  const [n, ra, dec, pa, pd, plx, ot, sp] = ["name", "ra", "dec", "pmRaCosDec", "pmDec", "plx", "otype", "spType"].map(c) as number[];
  return cat.rows.map((r) => ({
    name: String(r[n!]), ra: Number(r[ra!]), dec: Number(r[dec!]), pmRaCosDec: Number(r[pa!]), pmDec: Number(r[pd!]),
    plx: r[plx!] == null ? null : Number(r[plx!]), otype: (r[ot!] as string | null) ?? null, spType: (r[sp!] as string | null) ?? null,
  }));
}

/** Linear propagation from epoch 2000.0 (NOTES.md): dRA = pmRaCosDec dt / 3.6e6 / cos(dec), dDec = pmDec dt / 3.6e6. */
export function propagate(m: Pick<Mover, "ra" | "dec" | "pmRaCosDec" | "pmDec">, epoch: number, epoch0 = 2000): [number, number] {
  const dt = epoch - epoch0;
  const ra = m.ra + (m.pmRaCosDec * dt) / 3.6e6 / Math.cos(m.dec * D2R);
  return [((ra % 360) + 360) % 360, m.dec + (m.pmDec * dt) / 3.6e6];
}

export interface WhatWasHereHit {
  name: string;
  otype: string | null;
  spType: string | null;
  pmTotalMasYr: number;
  /** Epoch (Julian year) of closest approach within [from, to], and the separation then (arcsec). */
  closestEpoch: number;
  closestArcsec: number;
  /** Position at `now` (default: today). */
  current: { ra: number; dec: number; epoch: number };
  mover: Mover;
}

/**
 * Catalogue objects whose linear track passes within `radiusArcsec` of (ra, dec) between `from` and `to`.
 * Closest approach is solved on the tangent plane at (ra, dec) (the track is linear in RA and Dec), then checked with
 * the exact haversine separation. Sorted by closest separation.
 */
export function whatWasHere(ra: number, dec: number, radiusArcsec: number, movers: readonly Mover[],
  opts: { from?: number; to?: number; now?: number } = {}): WhatWasHereHit[] {
  const from = opts.from ?? 1990, to = opts.to ?? 2027;
  const now = opts.now ?? jyear(Date.now() / 86400000 + 40587);
  const cosd = Math.cos(dec * D2R);
  const hits: WhatWasHereHit[] = [];
  for (const m of movers) {
    const vdec = m.pmDec / 3.6e6; // deg/yr
    const d0 = m.dec + vdec * (from - 2000), d1 = m.dec + vdec * (to - 2000);
    if (Math.min(d0, d1) - radiusArcsec / 3600 > dec || Math.max(d0, d1) + radiusArcsec / 3600 < dec) continue;
    const vra = m.pmRaCosDec / 3.6e6 / Math.cos(m.dec * D2R);
    // offsets (arcsec, tangent plane approx) at epoch 2000 and their rate
    let dra = m.ra - ra;
    dra -= 360 * Math.round(dra / 360);
    const x0 = dra * cosd * 3600, y0 = (m.dec - dec) * 3600, vx = vra * cosd * 3600, vy = vdec * 3600;
    const v2 = vx * vx + vy * vy;
    const t = Math.min(Math.max(2000 + (v2 > 0 ? -(x0 * vx + y0 * vy) / v2 : 0), from), to);
    const [r, d] = propagate(m, t);
    const sep = separationArcsec(r, d, ra, dec);
    if (sep > radiusArcsec) continue;
    const [cr, cd] = propagate(m, now);
    hits.push({ name: m.name, otype: m.otype, spType: m.spType, pmTotalMasYr: Math.hypot(m.pmRaCosDec, m.pmDec),
      closestEpoch: t, closestArcsec: sep, current: { ra: cr, dec: cd, epoch: now }, mover: m });
  }
  return hits.sort((a, b) => a.closestArcsec - b.closestArcsec);
}

/** Mission-manifest astrometry block. */
export interface Astrometry {
  ra: number;
  dec: number;
  epoch: number; // Julian year
  pmRaCosDecMasYr: number;
  pmDecMasYr: number;
  parallaxMas?: number | null;
  radialVelocityKmS?: number | null;
}

const AU_PER_PC = 206264.806;
const KMS_TO_AU_PER_YR = 0.210945; // 1 km/s in AU per Julian year

/** Earth's heliocentric position (AU, equatorial), low-precision solar formula (Astronomical Almanac, 0.01 deg);
 *  the Sun-barycentre offset (0.01 AU) is ignored: under 5 mas for any star with parallax below 0.5". */
function earthPosition(mjd: number): [number, number, number] {
  const n = mjd + 2400000.5 - 2451545.0;
  const g = (357.528 + 0.9856003 * n) * D2R;
  const lam = (280.46 + 0.9856474 * n + 1.915 * Math.sin(g) + 0.02 * Math.sin(2 * g)) * D2R;
  const eps = (23.439 - 4e-7 * n) * D2R;
  const R = 1.00014 - 0.01671 * Math.cos(g) - 0.00014 * Math.cos(2 * g);
  // Sun geocentric is (R cos lam, R cos eps sin lam, R sin eps sin lam); Earth is the opposite vector
  return [-R * Math.cos(lam), -R * Math.cos(eps) * Math.sin(lam), -R * Math.sin(eps) * Math.sin(lam)];
}

/** Geocentric direction (deg) at `mjd`: straight-line space motion from the catalogue epoch (proper motion, parallax
 *  as distance, radial velocity), minus the Earth's position. No aberration (the SPHEREx WCS is ICRS). */
export function predictPosition(a: Astrometry, mjd: number): [number, number] {
  const ra = a.ra * D2R, dec = a.dec * D2R;
  const plx = a.parallaxMas && a.parallaxMas > 0 ? a.parallaxMas : 0;
  const dist = plx > 0 ? (1000 / plx) * AU_PER_PC : 1e12; // AU; no parallax = effectively infinite
  const u = [Math.cos(dec) * Math.cos(ra), Math.cos(dec) * Math.sin(ra), Math.sin(dec)];
  const e = [-Math.sin(ra), Math.cos(ra), 0];
  const nn = [-Math.sin(dec) * Math.cos(ra), -Math.sin(dec) * Math.sin(ra), Math.cos(dec)];
  const masToRad = D2R / 3.6e6;
  const vr = plx > 0 ? (a.radialVelocityKmS ?? 0) * KMS_TO_AU_PER_YR : 0;
  const dt = jyear(mjd) - a.epoch;
  const E = plx > 0 ? earthPosition(mjd) : [0, 0, 0];
  const p = [0, 1, 2].map((k) =>
    dist * u[k]! + dt * (dist * masToRad * (a.pmRaCosDecMasYr * e[k]! + a.pmDecMasYr * nn[k]!) + vr * u[k]!) - E[k]!);
  const r = Math.atan2(p[1]!, p[0]!) / D2R;
  return [((r % 360) + 360) % 360, Math.atan2(p[2]!, Math.hypot(p[0]!, p[1]!)) / D2R];
}
