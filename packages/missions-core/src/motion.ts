/**
 * Proper motion from positions at two or more epochs. Offsets use the pipeline's flat-sky
 * formula (grid.ts offsetArcsec), measured from the first point.
 */
import { offsetArcsec, positionAngleDeg } from './grid.js';
import type { Sky } from './grid.js';

export interface Epoch extends Sky {
  year: number; // Julian year (manifest `yearMid`)
  errEast?: number; // arcsec, 1 sigma
  errNorth?: number;
}

export interface Motion {
  east: number; // arcsec moved
  north: number;
  total: number;
  years: number;
  rateEast: number; // arcsec per year
  rateNorth: number;
  rate: number;
  paDeg: number; // direction of motion, degrees east of north
  rateErr: number; // 1 sigma, NaN without input errors
  paErrDeg: number;
}

export function motionBetween(p1: Epoch, p2: Epoch): Motion {
  const o = offsetArcsec(p1, p2);
  const years = p2.year - p1.year;
  const sE = Math.hypot(p1.errEast ?? NaN, p2.errEast ?? NaN) / Math.abs(years);
  const sN = Math.hypot(p1.errNorth ?? NaN, p2.errNorth ?? NaN) / Math.abs(years);
  return { east: o.east, north: o.north, total: o.total, years, ...rates(o.east / years, o.north / years, sE, sN) };
}

export interface MotionFit extends Omit<Motion, 'east' | 'north' | 'total'> {
  rateEastErr: number;
  rateNorthErr: number;
  residualRmsArcsec: number;
  chi2: number;
  dof: number;
  n: number;
}

/**
 * Weighted linear least squares, east(t) = a + rateEast (t - tm) and the same for north,
 * fitted separately. With errors on every point the formal errors are scaled by
 * max(1, sqrt(chi2 / dof)) (the exp13 convention); without errors the points are equally
 * weighted and the errors come from the scatter.
 */
export function fitMotion(points: Epoch[]): MotionFit {
  const n = points.length;
  if (n < 3) throw new RangeError('fitMotion needs three or more epochs; use motionBetween for two');
  const ref = points[0] as Epoch;
  const weighted = points.every((p) => (p.errEast ?? 0) > 0 && (p.errNorth ?? 0) > 0);
  const t = points.map((p) => p.year);
  const off = points.map((p) => offsetArcsec(ref, p));
  const fe = line(t, off.map((o) => o.east), points.map((p) => (weighted ? (p.errEast as number) : 1)));
  const fn = line(t, off.map((o) => o.north), points.map((p) => (weighted ? (p.errNorth as number) : 1)));
  const chi2 = fe.chi2 + fn.chi2;
  const dof = 2 * n - 4;
  const scale = weighted ? Math.max(1, Math.sqrt(chi2 / dof)) : Math.sqrt(chi2 / dof);
  const sE = fe.slopeErr * scale;
  const sN = fn.slopeErr * scale;
  return {
    years: Math.max(...t) - Math.min(...t),
    ...rates(fe.slope, fn.slope, sE, sN),
    rateEastErr: sE,
    rateNorthErr: sN,
    residualRmsArcsec: Math.sqrt((fe.rss + fn.rss) / (2 * n)),
    chi2,
    dof,
    n,
  };
}

function rates(rateEast: number, rateNorth: number, sE: number, sN: number) {
  const rate = Math.hypot(rateEast, rateNorth);
  // first-order propagation to the total and to the direction
  const rateErr = Math.hypot(rateEast * sE, rateNorth * sN) / rate;
  const paErrDeg = (Math.hypot(rateNorth * sE, rateEast * sN) / (rate * rate)) * (180 / Math.PI);
  return { rateEast, rateNorth, rate, paDeg: positionAngleDeg(rateEast, rateNorth), rateErr, paErrDeg };
}

/** Weighted straight line y = a + b (t - tw); slope error from the weights alone. */
function line(t: number[], y: number[], s: number[]) {
  let sw = 0, st = 0, sy = 0;
  for (let i = 0; i < t.length; i++) {
    const w = 1 / (s[i] as number) ** 2;
    sw += w; st += w * (t[i] as number); sy += w * (y[i] as number);
  }
  const tw = st / sw;
  const yw = sy / sw;
  let stt = 0, sty = 0;
  for (let i = 0; i < t.length; i++) {
    const w = 1 / (s[i] as number) ** 2;
    const dt = (t[i] as number) - tw;
    stt += w * dt * dt; sty += w * dt * ((y[i] as number) - yw);
  }
  const slope = sty / stt;
  let chi2 = 0, rss = 0;
  for (let i = 0; i < t.length; i++) {
    const r = (y[i] as number) - yw - slope * ((t[i] as number) - tw);
    chi2 += (r / (s[i] as number)) ** 2; rss += r * r;
  }
  return { slope, slopeErr: Math.sqrt(1 / stt), chi2, rss };
}
