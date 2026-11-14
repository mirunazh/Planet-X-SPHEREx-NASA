// Typed loader for the static mission assets (schema "mission-index/1" and "mission-manifest/1",
// see pipeline/README.md). Everything is served from public/data, copied by `npm run sync-assets`.

export const DATA_ROOT = '/data';
export const GRID_SIZE = 121;
export const FRAME_BYTES = GRID_SIZE * GRID_SIZE * 4;

export interface MissionIndexEntry {
  id: string;
  name: string;
  kind: 'mover' | 'variable';
  summary: string;
  manifest: string;
  contactSheet: string;
  groups: string[];
  nPasses: Record<string, number>;
}

export interface MissionIndex {
  schema: 'mission-index/1';
  generatedAt: string;
  missions: MissionIndexEntry[];
}

export interface DisplayHint {
  vmin: number;
  vmax: number;
  stretch: 'asinh';
  soft: number;
  sigma: number;
  formula: string;
}

export interface PixelPosition {
  ra: number;
  dec: number;
  x: number;
  y: number;
}

export interface MeasuredPosition extends PixelPosition {
  errArcsec: number;
  snr: number;
  offsetFromPredictedArcsec: { east: number; north: number };
}

export interface Pass {
  index: number;
  label: string;
  mjdStart: number;
  mjdEnd: number;
  mjdMid: number;
  yearMid: number;
  nExposures: number;
  detectors: string[];
  wavelengthUmMin: number;
  wavelengthUmMax: number;
  stack: string;
  preview: string;
  predicted: PixelPosition;
  measured: MeasuredPosition | null;
  snr: number | null;
  detected: boolean;
  blendedWith: { name: string; ra: number; dec: number; note: string } | null;
  saturationRadiusPx: number | null;
}

export interface Exposure {
  id: string;
  mjd: number;
  detector: string;
  wavelengthUm: number;
  bandwidthUm: number;
  frame: string;
  uri: string;
  release: string;
  pass: number;
}

export interface Group {
  id: string;
  label: string;
  detectors: string[];
  display: DisplayHint;
  displayExposure: DisplayHint;
  passes: Pass[];
  exposures: Exposure[];
  droppedPasses: { label: string; nExposures: number; reason: string }[];
  saturated?: boolean;
}

export interface Manifest {
  schema: 'mission-manifest/1';
  id: string;
  name: string;
  kind: 'mover' | 'variable';
  summary: string;
  astrometry: { ra: number; dec: number; epoch: number; pmRaCosDecMasYr: number; pmDecMasYr: number; source: string };
  grid: { ra0: number; dec0: number; scaleArcsec: number; width: number; height: number };
  groups: Group[];
  truth: { group?: string } & Record<string, unknown>;
  challengeInput: { ra: number; dec: number; x: number; y: number; note: string } | null;
  caveats: string[];
  provenance: { releases: { release: string; doi: string; nExposures: number }[]; builder: string; generatedAt: string };
  credits: { data: string; dois: Record<string, string>; astrometry: string };
}

export function missionUrl(missionId: string, relPath: string): string {
  return `${DATA_ROOT}/missions/${missionId}/${relPath}`;
}

async function getJson<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${url}: HTTP ${res.status}`);
  return (await res.json()) as T;
}

export function loadIndex(): Promise<MissionIndex> {
  return getJson<MissionIndex>(`${DATA_ROOT}/missions/index.json`);
}

const manifestCache = new Map<string, Promise<Manifest>>();
export function loadManifest(missionId: string): Promise<Manifest> {
  let p = manifestCache.get(missionId);
  if (!p) {
    p = getJson<Manifest>(`${DATA_ROOT}/missions/${missionId}/manifest.json`).then((m) => {
      if (m.schema !== 'mission-manifest/1') throw new Error(`${missionId}: unexpected schema ${m.schema}`);
      for (const g of m.groups) g.exposures.sort((a, b) => a.mjd - b.mjd);
      return m;
    });
    p.catch(() => manifestCache.delete(missionId));
    manifestCache.set(missionId, p);
  }
  return p;
}

/** Raw little-endian float32, row-major, 121 x 121 (row 0 = north). */
export function parseFrame(buf: ArrayBuffer, label = 'frame'): Float32Array {
  if (buf.byteLength !== FRAME_BYTES) throw new Error(`${label}: ${buf.byteLength} bytes, expected ${FRAME_BYTES}`);
  // ponytail: assumes a little-endian host (every browser platform in use); DataView if that ever changes.
  return new Float32Array(buf);
}

const frameCache = new Map<string, Promise<Float32Array>>();
export function loadFrame(url: string): Promise<Float32Array> {
  let p = frameCache.get(url);
  if (!p) {
    p = fetch(url).then(async (res) => {
      if (!res.ok) throw new Error(`${url}: HTTP ${res.status}`);
      return parseFrame(await res.arrayBuffer(), url);
    });
    p.catch(() => frameCache.delete(url));
    frameCache.set(url, p);
  }
  return p;
}

export type Mode = 'stack' | 'exp';

/** One playable frame: a per-pass stack or a single exposure, with what the readout needs. */
export interface Frame {
  url: string;
  display: DisplayHint;
  pass: Pass;
  exposures: Exposure[];
  mjdStart: number;
  mjdEnd: number;
  wavelengthUmMin: number;
  wavelengthUmMax: number;
}

export function framesFor(manifest: Manifest, group: Group, mode: Mode): Frame[] {
  const passByIndex = new Map(group.passes.map((p) => [p.index, p]));
  if (mode === 'stack') {
    return group.passes.map((pass) => ({
      url: missionUrl(manifest.id, pass.stack),
      display: group.display,
      pass,
      exposures: group.exposures.filter((e) => e.pass === pass.index),
      mjdStart: pass.mjdStart,
      mjdEnd: pass.mjdEnd,
      wavelengthUmMin: pass.wavelengthUmMin,
      wavelengthUmMax: pass.wavelengthUmMax,
    }));
  }
  return group.exposures
    .filter((e) => passByIndex.has(e.pass))
    .map((e) => ({
      url: missionUrl(manifest.id, e.frame),
      display: group.displayExposure,
      pass: passByIndex.get(e.pass)!,
      exposures: [e],
      mjdStart: e.mjd,
      mjdEnd: e.mjd,
      wavelengthUmMin: e.wavelengthUm - e.bandwidthUm / 2,
      wavelengthUmMax: e.wavelengthUm + e.bandwidthUm / 2,
    }));
}

/** Every frame file a manifest references (stacks and exposures), relative to the mission folder. */
export function referencedFrameFiles(manifest: Manifest): string[] {
  return manifest.groups.flatMap((g) => [...g.passes.map((p) => p.stack), ...g.exposures.map((e) => e.frame)]);
}

export function mjdToDate(mjd: number): Date {
  return new Date((mjd - 40587) * 86400000);
}

export function dateToYear(d: Date): number {
  const y = d.getUTCFullYear();
  const start = Date.UTC(y, 0, 1);
  return y + (d.getTime() - start) / (Date.UTC(y + 1, 0, 1) - start);
}
