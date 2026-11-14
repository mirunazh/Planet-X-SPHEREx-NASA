/**
 * The parts of assets/missions/<id>/manifest.json ("mission-manifest/1") and of the
 * parallax product (docs/research/experiments/exp13_parallax_epsindb.json) that this
 * library reads. Types only; parsing and fetching belong to the data-reading library.
 */
import type { Grid } from './grid.js';

export type MissionId = 'epsindb' | 'barnard' | 'wise0855' | 'rwaur' | 'rdra';

/** Groups each mission has, from assets/missions/index.json (checked by a test). */
export const MISSION_GROUPS: Readonly<Record<MissionId, readonly string[]>> = {
  wise0855: ['d5d6', 'd2'],
  epsindb: ['d2'],
  barnard: ['d2'],
  rwaur: ['d2'],
  rdra: ['d6'],
};

export const MISSION_IDS = Object.keys(MISSION_GROUPS) as MissionId[];

export interface PixelSky {
  x: number;
  y: number;
  ra: number;
  dec: number;
}

export interface Measured extends PixelSky {
  errArcsec: number;
  errEastArcsec: number;
  errNorthArcsec: number;
  snr: number;
}

export interface Pass {
  index: number;
  label: string;
  mjdMid: number;
  yearMid: number;
  nExposures: number;
  wavelengthUmMin: number;
  wavelengthUmMax: number;
  stack: string;
  predicted: PixelSky;
  measured: Measured | null;
  snr: number | null;
  detected: boolean;
  blendedWith: { name: string; centroidToPredictedArcsec: number } | null;
  saturationRadiusPx: number | null;
}

export interface Group {
  id: string;
  label: string;
  passes: Pass[];
  exposures: { id: string; mjd: number; wavelengthUm: number; pass: number | null }[];
}

export interface Literature {
  pmArcsecPerYear: number;
  parallaxMas: number;
  distancePc: number;
  distanceLy: number;
  tangentialVelocityKmS: number;
}

export interface MoverTruth {
  group: string;
  fromPass: number;
  toPass: number;
  motionArcsec: { east: number; north: number; total: number };
  predictedMotionArcsec: { east: number; north: number; total: number };
  baselineYears: number;
  rateArcsecPerYear: number;
  predictedRateArcsecPerYear: number;
  literature: Literature;
}

export interface RatioTruth {
  versusPass: number;
  pass: number;
  ratio: number;
  err: number;
  nBins: number;
  deltaMag: number;
  controlRatio: number;
  controlErr: number;
  controlNBins: number;
}

export interface MatchedWavelengthSeries {
  binsUm: [number, number][];
  passes: { pass: number; target: (number | null)[]; control: (number | null)[]; nTarget: number[]; nControl: number[] }[];
  ratios: RatioTruth[];
}

export interface LightCurvePoint {
  mjd: number;
  relMag: number;
  err: number;
  wavelengthUm: number;
  exposure: string;
  pass: number | null;
}

export interface LightCurveSeries {
  points: LightCurvePoint[];
  rmsMag: number;
  withinDayRmsMag: number;
  fit246: { fullAmplitudeMag: number; residualRmsMag: number };
  bestPeriodDays: number;
}

export interface Manifest {
  schema: 'mission-manifest/1';
  id: MissionId;
  name: string;
  kind: 'mover' | 'variable';
  astrometry: { ra: number; dec: number; pmRaCosDecMasYr: number; pmDecMasYr: number; parallaxMas: number };
  grid: Grid;
  groups: Group[];
  truth: MoverTruth | Record<string, unknown>;
  series?: { matchedWavelength?: MatchedWavelengthSeries; lightCurve?: LightCurveSeries } | null;
  challengeInput?: { ra: number; dec: number; x: number; y: number };
  caveats: string[];
}

/** One row of the parallax product (exposures or pass_means). */
export interface ParallaxPoint {
  year: number;
  east: number; // arcsec from the reference point, field-star corrected
  north: number;
  east_err: number;
  north_err: number;
  fE: number; // parallax factors (AU), precomputed from the Earth's position
  fN: number;
  pass_index?: number;
}

export interface ParallaxFitRecord {
  E0: number;
  N0: number;
  muE: number;
  muN: number;
  plx: number; // arcsec
  plx_err: number;
  distance_pc: number;
  distance_err_pc: number;
  vtan_kms: number;
  vtan_err_kms: number;
}

export interface ParallaxProduct {
  target: string;
  t0: number;
  best_fit: ParallaxFitRecord;
  best_fit_pm_fixed: ParallaxFitRecord;
  literature: { plx: number; plx_B_gaia: number; muE: number; muN: number; distance_pc: number };
  pass_means: (ParallaxPoint & { n: number; pass_index: number })[];
  exposures: ParallaxPoint[];
}

export function moverTruth(m: Manifest): MoverTruth | null {
  return m.kind === 'mover' && 'rateArcsecPerYear' in m.truth ? (m.truth as MoverTruth) : null;
}

export function group(m: Manifest, id: string): Group {
  const g = m.groups.find((q) => q.id === id);
  if (!g) throw new Error(`manifest ${m.id} has no group ${id}`);
  return g;
}
