/**
 * Compare a student's number with the truth. Every answer is compared twice and the two are
 * never mixed up: against the team pipeline's own measurement of the same SPHEREx data
 * ('pipeline', what the data can support) and against the published catalogue value
 * ('literature', Gaia or the papers in note 06). The headline tier is the pipeline one; the
 * literature comparison explains the rest (for example WISE 0855, where the blend makes the
 * SPHEREx motion read low). Tier and reason are codes; the words live in content/.
 */
import { angleDiffDeg, positionAngleDeg } from './grid.js';
import { group, moverTruth } from './manifest.js';
import type { Manifest, ParallaxProduct } from './manifest.js';

export type Tier = 'inside' | 'close' | 'try-again';
export type Source = 'pipeline' | 'literature';
export type Reason =
  | 'inside-error-bar' // the value is within the combined 1-sigma uncertainty
  | 'within-percent' // outside the error bar but within CLOSE_PERCENT or 2 sigma
  | 'value-off' // more than CLOSE_PERCENT away
  | 'direction-inside' // direction within the same 1-sigma uncertainty, seen sideways
  | 'direction-close' // direction within CLOSE_ANGLE_DEG
  | 'direction-off' // direction more than CLOSE_ANGLE_DEG away
  | 'no-answer'; // the student's number is missing or not finite

export const CLOSE_PERCENT = 10;
export const CLOSE_ANGLE_DEG = 15;

export interface Answer {
  value: number;
  err?: number; // the student's own 1-sigma uncertainty, if the app computed one
  paDeg?: number; // direction, for motions
}

export interface Reference {
  source: Source;
  value: number;
  err: number; // 1 sigma, 0 when the catalogue value is taken as exact
  paDeg?: number;
}

export interface Comparison {
  source: Source;
  reference: number;
  referenceErr: number;
  student: number;
  percentError: number; // signed, (student - reference) / reference x 100
  angleErrorDeg: number | null;
  insideErrorBar: boolean;
  tier: Tier;
  reasons: Reason[];
}

export interface Score {
  headline: Tier; // = pipeline.tier
  pipeline: Comparison;
  literature: Comparison | null; // null when no catalogue value exists for this quantity
}

export function compare(a: Answer, ref: Reference): Comparison {
  const base = { source: ref.source, reference: ref.value, referenceErr: ref.err, student: a.value };
  if (!Number.isFinite(a.value)) {
    return { ...base, percentError: NaN, angleErrorDeg: null, insideErrorBar: false, tier: 'try-again', reasons: ['no-answer'] };
  }
  const sigma = Math.hypot(a.err ?? 0, ref.err);
  const percentError = ((a.value - ref.value) / ref.value) * 100;
  const angleErrorDeg = a.paDeg !== undefined && ref.paDeg !== undefined ? angleDiffDeg(a.paDeg, ref.paDeg) : null;
  // the same 1-sigma uncertainty, seen sideways, bounds the direction
  const angleSigma = (Math.atan2(sigma, Math.abs(ref.value)) * 180) / Math.PI;
  const valueInside = Math.abs(a.value - ref.value) <= sigma;
  const angleInside = angleErrorDeg === null || angleErrorDeg <= angleSigma;
  const insideErrorBar = valueInside && angleInside;
  const valueClose = Math.abs(percentError) <= CLOSE_PERCENT || Math.abs(a.value - ref.value) <= 2 * sigma;
  const angleClose = angleErrorDeg === null || angleErrorDeg <= CLOSE_ANGLE_DEG;
  const reasons: Reason[] = [valueInside ? 'inside-error-bar' : valueClose ? 'within-percent' : 'value-off'];
  if (angleErrorDeg !== null) reasons.push(angleInside ? 'direction-inside' : angleClose ? 'direction-close' : 'direction-off');
  const tier: Tier = insideErrorBar ? 'inside' : (valueInside || valueClose) && angleClose ? 'close' : 'try-again';
  return { ...base, percentError, angleErrorDeg, insideErrorBar, tier, reasons };
}

const score = (a: Answer, pipeline: Reference, literature: Reference | null): Score => {
  const p = compare(a, pipeline);
  return { headline: p.tier, pipeline: p, literature: literature ? compare(a, literature) : null };
};

/** The pipeline's rate and its 1-sigma error from the two stack centroids it used. */
export function pipelineRate(m: Manifest): Reference {
  const t = moverTruth(m);
  if (!t) throw new Error(`${m.id} is not a mover`);
  const passes = group(m, t.group).passes;
  const a = passes.find((p) => p.index === t.fromPass)?.measured;
  const b = passes.find((p) => p.index === t.toPass)?.measured;
  if (!a || !b) throw new Error(`${m.id}: truth passes not measured`);
  const { east: E, north: N, total } = t.motionArcsec;
  const sE = Math.hypot(a.errEastArcsec, b.errEastArcsec);
  const sN = Math.hypot(a.errNorthArcsec, b.errNorthArcsec);
  const err = Math.hypot(E * sE, N * sN) / total / t.baselineYears;
  return { source: 'pipeline', value: t.rateArcsecPerYear, err, paDeg: positionAngleDeg(E, N) };
}

export function literatureRate(m: Manifest): Reference {
  const t = moverTruth(m);
  if (!t) throw new Error(`${m.id} is not a mover`);
  const pa = positionAngleDeg(m.astrometry.pmRaCosDecMasYr, m.astrometry.pmDecMasYr);
  return { source: 'literature', value: t.literature.pmArcsecPerYear, err: 0, paDeg: pa };
}

export const scoreMotion = (m: Manifest, a: Answer): Score => score(a, pipelineRate(m), literatureRate(m));

/** Parallax chain (Epsilon Indi B): pipeline = the exp13 classroom fit, literature = the manifest. */
export function scoreParallaxMas(m: Manifest, p: ParallaxProduct, a: Answer): Score {
  const f = p.best_fit_pm_fixed;
  return score(a, { source: 'pipeline', value: f.plx * 1000, err: f.plx_err * 1000 },
    { source: 'literature', value: moverTruth(m)!.literature.parallaxMas, err: 0 });
}

export function scoreDistance(m: Manifest, p: ParallaxProduct, a: Answer): Score {
  const f = p.best_fit_pm_fixed;
  return score(a, { source: 'pipeline', value: f.distance_pc, err: f.distance_err_pc },
    { source: 'literature', value: moverTruth(m)!.literature.distancePc, err: 0 });
}

export function scoreSpeed(m: Manifest, p: ParallaxProduct, a: Answer): Score {
  const f = p.best_fit_pm_fixed;
  return score(a, { source: 'pipeline', value: f.vtan_kms, err: f.vtan_err_kms },
    { source: 'literature', value: moverTruth(m)!.literature.tangentialVelocityKmS, err: 0 });
}

/** RW Aur brightening ratio for one pass against pass 0; no catalogue value exists for it. */
export function scoreRatio(m: Manifest, pass: number, a: Answer): Score {
  const r = m.series?.matchedWavelength?.ratios.find((q) => q.pass === pass);
  if (!r) throw new Error(`${m.id} has no ratio for pass ${pass}`);
  return score(a, { source: 'pipeline', value: r.ratio, err: r.err }, null);
}
