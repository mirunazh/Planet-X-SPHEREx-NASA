/**
 * The classroom parallax model of note 13 (docs/research/13-parallax-distance-feasibility.md):
 *   east(t)  = E0 + muE (t - t0) + plx fE(t)
 *   north(t) = N0 + muN (t - t0) + plx fN(t)
 * arcsec, arcsec per year, Julian years. fE and fN are the parallax factors precomputed in the
 * data (Earth's position in AU projected on the sky); nothing here computes an ephemeris.
 * The proper motion is fixed (to Gaia's), so the fit is linear in E0, N0 and plx.
 */
import type { ParallaxPoint } from './manifest.js';

export const T0 = 2026.0; // exp13 t0
export const KM_S_PER_AU_PER_YEAR = 4.74047;
export const LY_PER_PC = 3.26156;

export interface Model {
  E0: number;
  N0: number;
  muE: number;
  muN: number;
  plxArcsec: number;
  t0?: number;
}

export function modelAt(m: Model, year: number, fE: number, fN: number): { east: number; north: number } {
  const dt = year - (m.t0 ?? T0);
  return { east: m.E0 + m.muE * dt + m.plxArcsec * fE, north: m.N0 + m.muN * dt + m.plxArcsec * fN };
}

export interface ParallaxFit {
  E0: number;
  N0: number;
  plxArcsec: number;
  /** formal error times max(1, sqrt(chi2 / dof)): the error exp13 reports for this fit */
  plxErrArcsec: number;
  plxErrFormalArcsec: number;
  chi2: number;
  dof: number;
  n: number;
}

/** Sums that make chi2(plx) a quadratic with E0 and N0 solved out. */
function sums(points: ParallaxPoint[], muE: number, muN: number, t0: number) {
  let wE = 0, wN = 0, wEf = 0, wNf = 0, wEr = 0, wNr = 0, wEff = 0, wNff = 0, wEfr = 0, wNfr = 0, wErr = 0, wNrr = 0;
  for (const p of points) {
    const dt = p.year - t0;
    const rE = p.east - muE * dt;
    const rN = p.north - muN * dt;
    const a = 1 / p.east_err ** 2;
    const b = 1 / p.north_err ** 2;
    wE += a; wEf += a * p.fE; wEr += a * rE; wEff += a * p.fE * p.fE; wEfr += a * p.fE * rE; wErr += a * rE * rE;
    wN += b; wNf += b * p.fN; wNr += b * rN; wNff += b * p.fN * p.fN; wNfr += b * p.fN * rN; wNrr += b * rN * rN;
  }
  // chi2(plx) = C - 2 B plx + A plx^2 after eliminating E0 = (wEr - plx wEf) / wE (same for N0)
  const A = wEff - (wEf * wEf) / wE + wNff - (wNf * wNf) / wN;
  const B = wEfr - (wEf * wEr) / wE + wNfr - (wNf * wNr) / wN;
  const C = wErr - (wEr * wEr) / wE + wNrr - (wNr * wNr) / wN;
  return { A, B, C, wE, wN, wEf, wNf, wEr, wNr };
}

export function fitParallaxFixedPm(points: ParallaxPoint[], muE: number, muN: number, t0 = T0): ParallaxFit {
  if (points.length < 2) throw new RangeError('need at least two points');
  const s = sums(points, muE, muN, t0);
  const plx = s.B / s.A;
  const chi2 = s.C - (s.B * s.B) / s.A;
  const dof = 2 * points.length - 3;
  // the plx variance of the full 3-parameter normal matrix equals 1 / A (Schur complement)
  const formal = Math.sqrt(1 / s.A);
  return {
    E0: (s.wEr - plx * s.wEf) / s.wE,
    N0: (s.wNr - plx * s.wNf) / s.wN,
    plxArcsec: plx,
    plxErrArcsec: formal * (dof > 0 ? Math.max(1, Math.sqrt(chi2 / dof)) : 1),
    plxErrFormalArcsec: formal,
    chi2,
    dof,
    n: points.length,
  };
}

/** Fit quality for a trial parallax (the slider), with E0 and N0 at their best values for it. */
export function chi2AtParallax(points: ParallaxPoint[], muE: number, muN: number, plxArcsec: number, t0 = T0): number {
  const s = sums(points, muE, muN, t0);
  return s.C - 2 * s.B * plxArcsec + s.A * plxArcsec * plxArcsec;
}

export const distancePc = (plxArcsec: number): number => 1 / plxArcsec;
export const distanceLy = (plxArcsec: number): number => LY_PER_PC / plxArcsec;
export const tangentialVelocityKmS = (rateArcsecPerYear: number, distPc: number): number =>
  KM_S_PER_AU_PER_YEAR * rateArcsecPerYear * distPc;
