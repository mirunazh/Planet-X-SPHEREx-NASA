/**
 * TAN (gnomonic) projection with SIP distortion, read from FITS header keywords.
 *
 * Pixel convention: 0-BASED pixel centres, like astropy `all_world2pix(..., 0)` and the Python pipeline
 * (pipeline/science.py, s3reader.py). Pixel (0, 0) is the centre of the first pixel of the first row in the file;
 * the FITS 1-based pixel is x + 1. SIP is applied on u = x + 1 - CRPIX1, v = y + 1 - CRPIX2 (all terms of
 * A_p_q / B_p_q, including the constant and linear ones, as astropy/wcslib do).
 * Sky to pixel: inverse SIP (AP/BP) as the starting point when present, then Newton iterations on the forward SIP
 * until the step is under 1e-10 px, so the result does not depend on the accuracy of AP/BP.
 */
import { type FitsHeader, num } from "./fits.js";

const D2R = Math.PI / 180;
const R2D = 180 / Math.PI;

type Poly = Array<[p: number, q: number, c: number]>;

export interface TanSipParams {
  crpix: [number, number]; // 1-based, FITS
  crval: [number, number]; // deg
  cd: [[number, number], [number, number]]; // deg per pixel
  a?: Poly;
  b?: Poly;
  ap?: Poly;
  bp?: Poly;
}

function polyFrom(h: FitsHeader, name: string): Poly | undefined {
  const order = h.cards[`${name}_ORDER`];
  if (typeof order !== "number") return undefined;
  const out: Poly = [];
  for (let p = 0; p <= order; p++) {
    for (let q = 0; p + q <= order; q++) {
      const c = h.cards[`${name}_${p}_${q}`];
      if (typeof c === "number" && c !== 0) out.push([p, q, c]);
    }
  }
  return out;
}

function evalPoly(poly: Poly | undefined, u: number, v: number): number {
  if (!poly) return 0;
  let s = 0;
  for (const [p, q, c] of poly) s += c * u ** p * v ** q;
  return s;
}

/** d/du and d/dv of a SIP polynomial. */
function gradPoly(poly: Poly | undefined, u: number, v: number): [number, number] {
  if (!poly) return [0, 0];
  let du = 0, dv = 0;
  for (const [p, q, c] of poly) {
    if (p > 0) du += c * p * u ** (p - 1) * v ** q;
    if (q > 0) dv += c * q * u ** p * v ** (q - 1);
  }
  return [du, dv];
}

export class TanSipWcs {
  readonly p: TanSipParams;
  private readonly inv: [[number, number], [number, number]];
  private readonly sd0: number;
  private readonly cd0: number;

  constructor(p: TanSipParams) {
    this.p = p;
    const [[a, b], [c, d]] = p.cd;
    const det = a * d - b * c;
    if (!(det !== 0 && Number.isFinite(det))) throw new Error("singular CD matrix");
    this.inv = [[d / det, -b / det], [-c / det, a / det]];
    this.sd0 = Math.sin(p.crval[1] * D2R);
    this.cd0 = Math.cos(p.crval[1] * D2R);
  }

  /** 0-based pixel to (ra, dec) in degrees. */
  pixelToSky(x: number, y: number): [number, number] {
    const p = this.p;
    const u = x + 1 - p.crpix[0];
    const v = y + 1 - p.crpix[1];
    const U = u + evalPoly(p.a, u, v);
    const V = v + evalPoly(p.b, u, v);
    const xi = (p.cd[0][0] * U + p.cd[0][1] * V) * D2R;
    const eta = (p.cd[1][0] * U + p.cd[1][1] * V) * D2R;
    const den = this.cd0 - eta * this.sd0;
    let ra = p.crval[0] + Math.atan2(xi, den) * R2D;
    ra = ((ra % 360) + 360) % 360;
    const dec = Math.atan2(this.sd0 + eta * this.cd0, Math.hypot(xi, den)) * R2D;
    return [ra, dec];
  }

  /** (ra, dec) in degrees to 0-based pixel; NaN for points on the far hemisphere. */
  skyToPixel(ra: number, dec: number): [number, number] {
    const p = this.p;
    const d = (ra - p.crval[0]) * D2R;
    const sd = Math.sin(dec * D2R), cdc = Math.cos(dec * D2R), cdd = Math.cos(d);
    const cosc = this.sd0 * sd + this.cd0 * cdc * cdd;
    if (!(cosc > 0)) return [NaN, NaN];
    const xi = ((cdc * Math.sin(d)) / cosc) * R2D;
    const eta = ((this.cd0 * sd - this.sd0 * cdc * cdd) / cosc) * R2D;
    const U = this.inv[0][0] * xi + this.inv[0][1] * eta;
    const V = this.inv[1][0] * xi + this.inv[1][1] * eta;
    if (!p.a && !p.b) return [U + p.crpix[0] - 1, V + p.crpix[1] - 1];
    let u = U + evalPoly(p.ap, U, V);
    let v = V + evalPoly(p.bp, U, V);
    for (let i = 0; i < 30; i++) {
      const fu = u + evalPoly(p.a, u, v) - U;
      const fv = v + evalPoly(p.b, u, v) - V;
      const [au, av] = gradPoly(p.a, u, v);
      const [bu, bv] = gradPoly(p.b, u, v);
      const j11 = 1 + au, j12 = av, j21 = bu, j22 = 1 + bv;
      const det = j11 * j22 - j12 * j21;
      const du = (fu * j22 - fv * j12) / det;
      const dv = (fv * j11 - fu * j21) / det;
      u -= du;
      v -= dv;
      if (Math.abs(du) + Math.abs(dv) < 1e-10) break;
    }
    return [u + p.crpix[0] - 1, v + p.crpix[1] - 1];
  }
}

/** TAN or TAN-SIP celestial WCS from an IMAGE header (CD matrix, or PC times CDELT). */
export function wcsFromHeader(h: FitsHeader): TanSipWcs {
  const c1 = String(h.cards.CTYPE1 ?? ""), c2 = String(h.cards.CTYPE2 ?? "");
  if (!c1.startsWith("RA---TAN") || !c2.startsWith("DEC--TAN")) throw new Error(`unsupported CTYPE ${c1} ${c2}`);
  const lonpole = num(h, "LONPOLE", 180);
  if (lonpole !== 180) throw new Error(`LONPOLE ${lonpole} not supported (only the TAN default 180)`);
  let cd: [[number, number], [number, number]];
  if (typeof h.cards.CD1_1 === "number") {
    cd = [[num(h, "CD1_1", 0), num(h, "CD1_2", 0)], [num(h, "CD2_1", 0), num(h, "CD2_2", 0)]];
  } else {
    const s1 = num(h, "CDELT1", 1), s2 = num(h, "CDELT2", 1);
    cd = [[num(h, "PC1_1", 1) * s1, num(h, "PC1_2", 0) * s1], [num(h, "PC2_1", 0) * s2, num(h, "PC2_2", 1) * s2]];
  }
  const sip = c1.endsWith("-SIP");
  return new TanSipWcs({
    crpix: [num(h, "CRPIX1"), num(h, "CRPIX2")],
    crval: [num(h, "CRVAL1"), num(h, "CRVAL2")],
    cd,
    a: sip ? polyFrom(h, "A") : undefined,
    b: sip ? polyFrom(h, "B") : undefined,
    ap: sip ? polyFrom(h, "AP") : undefined,
    bp: sip ? polyFrom(h, "BP") : undefined,
  });
}

/** The mission grid: TAN at (ra0, dec0), north up, east left, row 0 = north, column 0 = east, `scaleArcsec` per
 *  pixel, n x n pixels (FITS: CRPIX = (n + 1) / 2, CDELT1 = CDELT2 = -scale). Same as pipeline/science.py grid_wcs. */
export function gridWcs(ra0: number, dec0: number, n = 121, scaleArcsec = 3): TanSipWcs {
  const s = scaleArcsec / 3600;
  return new TanSipWcs({ crpix: [(n + 1) / 2, (n + 1) / 2], crval: [ra0, dec0], cd: [[-s, 0], [0, -s]] });
}
