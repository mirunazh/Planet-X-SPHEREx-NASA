/**
 * Brightness for the two variable-star missions. Only what the manifests support:
 * - RW Aur: matched-wavelength ratios (series.matchedWavelength), target against a control star;
 * - R Dra: a wing light curve (series.lightCurve), indicative only.
 * apertureFlux is for the viewer (click a star, read its brightness on one frame).
 */
import { annulusStats, disc, median } from './centroid.js';
import type { LightCurveSeries, MatchedWavelengthSeries } from './manifest.js';

export interface ApertureFlux {
  flux: number; // background-subtracted sum, frame units x pixels, scaled for missing pixels
  background: number; // sigma-free median of the annulus
  nPix: number;
  finiteFraction: number;
}

/** Disc (radiusPx) minus the annulus median; annulus = [inner, outer] px. NaN when the annulus is empty. */
export function apertureFlux(
  frame: ArrayLike<number>, width: number, height: number, x: number, y: number, radiusPx: number,
  annulus: readonly [number, number],
): ApertureFlux {
  const at = (i: number, j: number) => (i < 0 || j < 0 || i >= width || j >= height ? NaN : (frame[j * width + i] as number));
  const bg = annulusStats(at, x, y, annulus[0], annulus[1], width, height);
  let s = 0, n = 0, nf = 0;
  disc(x, y, radiusPx, -1, -1, (i, j) => {
    n++;
    const v = at(i, j);
    if (Number.isFinite(v)) { s += v - bg.median; nf++; }
  });
  const flux = Number.isFinite(bg.median) && nf ? (s * n) / nf : NaN;
  return { flux, background: bg.median, nPix: n, finiteFraction: n ? nf / n : 0 };
}

/** Target over control, with first-order error propagation. */
export function ratioToControl(target: number, control: number, targetErr = 0, controlErr = 0): { ratio: number; err: number } {
  const ratio = target / control;
  return { ratio, err: Math.abs(ratio) * Math.hypot(targetErr / target, controlErr / control) };
}

export interface BinPoint {
  pass: number;
  wavelengthUm: number; // bin centre
  binUm: [number, number];
  target: number;
  control: number;
}

/** RW Aur chart points: one per pass and wavelength bin where both stars were measured. */
export function binPoints(s: MatchedWavelengthSeries): BinPoint[] {
  return s.passes.flatMap((p) =>
    s.binsUm.flatMap((bin, k) => {
      const t = p.target[k];
      const c = p.control[k];
      return t == null || c == null ? [] : [{ pass: p.pass, wavelengthUm: (bin[0] + bin[1]) / 2, binUm: bin, target: t, control: c }];
    }),
  );
}

/**
 * The manifest's own recipe: per bin, pass k over pass 0; ratio = median over bins,
 * err = standard deviation over bins / sqrt(nBins). which = 'target' or 'control'.
 */
export function binRatio(s: MatchedWavelengthSeries, pass: number, versusPass = 0, which: 'target' | 'control' = 'target'): { ratio: number; err: number; nBins: number } {
  const a = s.passes.find((p) => p.pass === pass)?.[which];
  const b = s.passes.find((p) => p.pass === versusPass)?.[which];
  if (!a || !b) return { ratio: NaN, err: NaN, nBins: 0 };
  const r: number[] = [];
  a.forEach((v, k) => {
    const w = b[k];
    if (v != null && w != null && w !== 0) r.push(v / w);
  });
  const mean = r.reduce((x, y) => x + y, 0) / r.length;
  const sd = Math.sqrt(r.reduce((x, y) => x + (y - mean) ** 2, 0) / r.length);
  return { ratio: median(r), err: sd / Math.sqrt(r.length), nBins: r.length };
}

/** Brightness ratio to a magnitude change (negative = brighter). */
export const deltaMag = (ratio: number): number => -2.5 * Math.log10(ratio);

export interface CurvePoint {
  mjd: number;
  year: number;
  relMag: number;
  err: number;
  pass: number | null;
}

/** R Dra chart points (magnitudes relative to the median, negative = brighter). */
export function lightCurvePoints(s: LightCurveSeries): CurvePoint[] {
  return s.points.map((p) => ({ mjd: p.mjd, year: 2000 + (p.mjd - 51544.5) / 365.25, relMag: p.relMag, err: p.err, pass: p.pass }));
}

/** Phase 0..1 of each date for a trial period, for a "fold the light curve" slider. */
export const foldPhase = (mjd: number, periodDays: number, mjd0 = 0): number => {
  const ph = ((mjd - mjd0) / periodDays) % 1;
  return ph < 0 ? ph + 1 : ph;
};
