/**
 * Live mission builder: the browser version of pipeline/build_missions.py build_group for one detector group at an
 * arbitrary position. Output has the shape of "mission-manifest/1" with frames and stacks as Float32Array in memory
 * (instead of file names). Differences from the Python build: random draws for S/N and bootstrap errors use a seeded
 * mulberry32 (not numpy), no neighbour attribution, no saturation handling, no PNG previews (preview: null), and
 * kind is "field" unless an astrometry block is given ("mover").
 */
import { type Astrometry, jyear, predictPosition } from "./astrometry.js";
import { GRID_N, GRID_SCALE_ARCSEC, prepExposure } from "./frame.js";
import { type FetchLike, Limiter, type CachedWave, readExposureBox, releaseOf, s3Url } from "./s3.js";
import type { Exposure } from "./sia.js";
import { type DisplayHint, displayHint, groupPasses, measureNear, stackFrames } from "./stack.js";
import { gridWcs } from "./wcs.js";
import { waveAt } from "./wave.js";

export const DOIS: Record<string, string> = { DR1: "10.26131/IRSA678", QR3: "10.26131/IRSA662", QR2: "10.26131/IRSA652", QR1: "10.26131/IRSA629" };
export const STACK_METHOD =
  "Inverse-variance weighted mean of the reprojected exposures; weight 1/sigma_i^2 with sigma_i = 1.4826 x MAD of the finite pixels of " +
  "exposure i on the grid. Passes with 5 or more exposures: each grid pixel with at least 5 finite values is sigma-clipped across " +
  "exposures first (reject |value - median| > 4 x 1.4826 x MAD of that pixel's values, up to 3 iterations). Per-pixel scatter is used " +
  "as the clipping sigma, not the background sigma_i, so that stars, whose flux changes with the wavelength sampled, are not clipped. " +
  "NaN where no exposure has data.";

export interface Measured {
  x: number; y: number; errArcsec: number; errEastArcsec: number; errNorthArcsec: number; snr: number;
  offsetFromPredictedArcsec: { east: number; north: number }; ra: number; dec: number;
}

export interface LiveGroup { id: string; label?: string; detectors: string[] }

export interface LiveExposure {
  id: string;
  pass: number | null;
  mjd: number;
  detector: string;
  wavelengthUm: number;
  bandwidthUm: number;
  frame: Float32Array;
  uri: string; // S3 URL
  release: string;
  noiseSigma: number;
  background: number;
}

export interface LiveProgress {
  done: number;
  total: number;
  failed: number;
  /** The exposure that just arrived (pass is null until all are in), or the failure. */
  exposure?: LiveExposure;
  error?: { uri: string; error: string };
}

export interface LiveOptions {
  ra: number;
  dec: number;
  exposures: readonly Exposure[];
  /** Detector group; default: the detector with the most exposures. */
  group?: LiveGroup;
  /** For a known mover: predicted positions follow it. Otherwise the target is static at (ra, dec). */
  astrometry?: Astrometry;
  id?: string;
  name?: string;
  /** Cap on frames read (evenly spaced in time); default 150 (about 100 MB). */
  maxExposures?: number;
  /** Exposures read at once (each is 2 or 3 requests through the S3 limiter); default 6. */
  concurrency?: number;
  onProgress?: (p: LiveProgress) => void;
  signal?: AbortSignal;
  fetchImpl?: FetchLike;
  limiter?: Limiter;
  waveCache?: Map<string, Promise<CachedWave>> | null;
}

/** Fixed detector groups for the viewer (wavelength ranges from the SIA em_min / em_max of each detector).
 *  D5 and D6 are stacked together as in the static WISE 0855 mission ("d5d6"). */
export const DETECTOR_GROUPS: ReadonlyArray<LiveGroup & { label: string; wavelengthUm: [number, number] }> = [
  { id: "d1", label: "0.75 to 1.1 micron (detector D1)", detectors: ["D1"], wavelengthUm: [0.75, 1.12] },
  { id: "d2", label: "1.1 to 1.65 micron (detector D2)", detectors: ["D2"], wavelengthUm: [1.1, 1.65] },
  { id: "d3", label: "1.6 to 2.4 micron (detector D3)", detectors: ["D3"], wavelengthUm: [1.63, 2.44] },
  { id: "d4", label: "2.4 to 3.8 micron (detector D4)", detectors: ["D4"], wavelengthUm: [2.4, 3.85] },
  { id: "d5d6", label: "3.8 to 5.0 micron (detectors D5 and D6 stacked)", detectors: ["D5", "D6"], wavelengthUm: [3.81, 5.01] },
];

/** Groups with at least `minPerPass` exposures in at least `minPasses` passes (20-day rule), best first:
 *  most such passes, then most exposures in them, then the DETECTOR_GROUPS order. */
export function availableGroups(exposures: readonly Pick<Exposure, "mjd" | "detector">[], minPerPass = 3, minPasses = 2) {
  return DETECTOR_GROUPS.map((g, order) => {
    const passes = groupPasses(exposures.filter((e) => g.detectors.includes(e.detector)), undefined, minPerPass).passes;
    return { ...g, nPasses: passes.length, nExposures: passes.reduce((a, p) => a + p.length, 0), order };
  })
    .filter((g) => g.nPasses >= minPasses)
    .sort((a, b) => b.nPasses - a.nPasses || b.nExposures - a.nExposures || a.order - b.order)
    .map(({ order: _o, ...g }) => g);
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function monthLabel(m0: number, m1: number): string {
  const a = new Date((m0 - 40587) * 86400000), b = new Date((m1 - 40587) * 86400000);
  const f = (d: Date) => `${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
  if (a.getUTCFullYear() === b.getUTCFullYear() && a.getUTCMonth() === b.getUTCMonth()) return f(a);
  return a.getUTCFullYear() === b.getUTCFullYear() ? `${MONTHS[a.getUTCMonth()]} to ${f(b)}` : `${f(a)} to ${f(b)}`;
}

export const exposureId = (uri: string) => uri.split("/").pop()!.split("_spx_")[0]!.replace("level2_", "");

function nanFraction(a: Float32Array): number {
  let k = 0;
  for (const v of a) if (Number.isNaN(v)) k++;
  return k / a.length;
}

/** Read, reproject and stack one detector group around (ra, dec); see the module comment for the output. */
export async function buildLiveMission(o: LiveOptions) {
  const n = GRID_N, scale = GRID_SCALE_ARCSEC;
  const grid = gridWcs(o.ra, o.dec, n, scale);
  const counts = new Map<string, number>();
  for (const e of o.exposures) counts.set(e.detector, (counts.get(e.detector) ?? 0) + 1);
  const top = [...counts.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ?? "D2";
  const group = o.group ?? { id: top.toLowerCase(), detectors: [top] };
  const label = group.label ?? `detector${group.detectors.length > 1 ? "s" : ""} ${group.detectors.join(" and ")}`;
  const listed = o.exposures.filter((e) => group.detectors.includes(e.detector)).slice().sort((a, b) => a.mjd - b.mjd);
  const max = o.maxExposures ?? 150;
  // ponytail: even subsampling in time when a deep field lists hundreds; a wavelength-matched pick is the upgrade
  const chosen = listed.length <= max ? listed : Array.from({ length: max }, (_, i) => listed[Math.round((i * (listed.length - 1)) / (max - 1))]!);
  const target = (mjd: number): [number, number] => (o.astrometry ? predictPosition(o.astrometry, mjd) : [o.ra, o.dec]);
  const half = (n / 2) * scale; // pixel-edge half size of the grid: 181.5"
  const pool = new Limiter(o.concurrency ?? 6);
  const read = { signal: o.signal, fetchImpl: o.fetchImpl, limiter: o.limiter, waveCache: o.waveCache };

  const E: LiveExposure[] = [];
  const failed: Array<{ uri: string; error: string }> = [];
  let done = 0;
  await Promise.all(chosen.map((x) => pool.run(async () => {
    try {
      const box = await readExposureBox(x.uri, o.ra, o.dec, half, read);
      const p = prepExposure(box, o.ra, o.dec, n, scale);
      const [tx, ty] = box.wcs.skyToPixel(...target(box.mjd));
      const w = waveAt(box.header, box.wave, tx, ty);
      const e: LiveExposure = { id: exposureId(x.uri), pass: null, mjd: box.mjd, detector: box.detector, wavelengthUm: w.wavelength,
        bandwidthUm: w.bandwidth, frame: p.frame, uri: s3Url(x.uri), release: releaseOf(x.uri), noiseSigma: p.sigma, background: p.background };
      E.push(e);
      o.onProgress?.({ done: ++done, total: chosen.length, failed: failed.length, exposure: e });
    } catch (err) {
      if (o.signal?.aborted) throw err;
      const f = { uri: x.uri, error: (err instanceof Error ? err.message : String(err)).slice(0, 200) };
      failed.push(f);
      o.onProgress?.({ done: ++done, total: chosen.length, failed: failed.length, error: f });
    }
  }, o.signal)));
  if (o.signal?.aborted) throw o.signal.reason;

  const { passes: kept, dropped } = groupPasses(E);
  const passes = [];
  const stacks: Float32Array[] = [];
  for (const [idx, g] of kept.entries()) {
    for (const e of g) e.pass = idx;
    const sig = g.map((e) => e.noiseSigma), frames = g.map((e) => e.frame);
    const st = stackFrames(frames, sig);
    const wts = sig.map((s) => 1 / s ** 2), wsum = wts.reduce((a, b) => a + b, 0);
    const mid = g.reduce((a, e, i) => a + wts[i]! * e.mjd, 0) / wsum;
    const [pra, pdec] = target(mid);
    const [px, py] = grid.skyToPixel(pra, pdec);
    const m = measureNear(st, n, px, py, frames, sig, 1000 + idx);
    let measured: Measured | null = null;
    if (m.x !== undefined && m.y !== undefined) {
      const [mra, mdec] = grid.pixelToSky(m.x, m.y);
      measured = { x: m.x, y: m.y, errArcsec: (Math.hypot(m.errX!, m.errY!) / Math.SQRT2) * scale, errEastArcsec: m.errX! * scale,
        errNorthArcsec: m.errY! * scale, snr: m.snr, offsetFromPredictedArcsec: { east: -(m.x - px) * scale, north: -(m.y - py) * scale }, ra: mra, dec: mdec };
    }
    const wl = g.map((e) => e.wavelengthUm), nanF = nanFraction(st);
    passes.push({ index: idx, label: monthLabel(g[0]!.mjd, g[g.length - 1]!.mjd), mjdStart: g[0]!.mjd, mjdEnd: g[g.length - 1]!.mjd, mjdMid: mid,
      yearMid: jyear(mid), nExposures: g.length, detectors: [...new Set(g.map((e) => e.detector))].sort(),
      wavelengthUmMin: Math.min(...wl), wavelengthUmMax: Math.max(...wl), stack: st, preview: null as string | null,
      predicted: { ra: pra, dec: pdec, x: px, y: py }, measured, snr: Number.isFinite(m.snr) ? m.snr : null, detected: measured !== null,
      blendedWith: null, saturationRadiusPx: null, nanFraction: nanF, nanFractionOutsideCore: nanF });
    stacks.push(st);
  }
  E.sort((a, b) => a.mjd - b.mjd);
  const grp = {
    id: group.id, label, detectors: group.detectors,
    display: stacks.length ? displayHint(stacks) : (null as DisplayHint | null),
    displayExposure: E.length ? displayHint(E.map((e) => e.frame)) : (null as DisplayHint | null),
    stackMethod: STACK_METHOD, passes, exposures: E,
    droppedPasses: dropped.map((g) => ({ mjdStart: g[0]!.mjd, mjdEnd: g[g.length - 1]!.mjd, nExposures: g.length, label: monthLabel(g[0]!.mjd, g[g.length - 1]!.mjd),
      exposureIds: g.map((e) => e.id), reason: "fewer than 3 exposures" })),
    failedExposures: failed,
    exposureLists: group.detectors.map((d) => ({ det: d, tapList: "IRSA SIA (live)", nListed: listed.filter((e) => e.detector === d).length,
      nRead: chosen.filter((e) => e.detector === d).length })),
  };
  const rel = [...new Set(E.map((e) => e.release))].sort();
  const a = o.astrometry;
  return {
    schema: "mission-manifest/1" as const,
    id: o.id ?? `live_${o.ra.toFixed(4)}_${o.dec.toFixed(4)}`,
    name: o.name ?? `RA ${o.ra.toFixed(4)}, Dec ${o.dec.toFixed(4)}`,
    kind: a ? ("mover" as const) : ("field" as const),
    summary: `SPHEREx ${label} around RA ${o.ra.toFixed(4)}, Dec ${o.dec.toFixed(4)}, built live in the browser.`,
    astrometry: a ?? null,
    grid: { ra0: o.ra, dec0: o.dec, scaleArcsec: scale, width: n, height: n, projection: "TAN",
      orientation: "north up, east left: row 0 is the north (top) row, column 0 the east (left) column; pixel (x, y) = (column, row), " +
        "0-based pixel centres; FITS equivalent CRPIX1 = CRPIX2 = 61, CDELT1 = CDELT2 = -3/3600 deg (row index increases southward)",
      fileFormat: "in memory: Float32Array, row-major, 121 x 121 values, MJy/sr after background subtraction, NaN = no data" },
    groups: [grp],
    truth: a ? { group: group.id, ...moverTruth(a, passes) } : null,
    caveats: ["Built live from the public S3 bucket; FLAGS not read, ZODI not subtracted (flat across a few arcmin, note 09)."],
    provenance: { releases: rel.map((r) => ({ release: r, doi: DOIS[r] ?? null, nExposures: E.filter((e) => e.release === r).length })),
      pipeline: "S3 range read (browser)", generatedAt: new Date().toISOString().replace(/\.\d+Z$/, "Z"), builder: "spherex-core live.ts",
      recipes: "docs/research/08 and 09", choicesAfterLooking: [] as string[],
      zodi: "not subtracted (a sigma-clipped median of the box is enough for fields of a few arcmin, note 09)",
      flags: "not read and not applied (the FLAGS mask erases saturated stars, note 08)" },
    credits: { data: "SPHEREx Level 2 spectral images (NASA/JPL-Caltech; archive: NASA/IPAC Infrared Science Archive, IRSA), read from the public bucket s3://nasa-irsa-spherex",
      dois: Object.fromEntries(rel.map((r) => [r, DOIS[r] ?? null])), acknowledgement: null },
  };
}

export type LiveMission = Awaited<ReturnType<typeof buildLiveMission>>;

type LivePass = { index: number; yearMid: number; predicted: { ra: number; dec: number }; measured: { ra: number; dec: number } | null };

/** build_missions.py mover_truth: measured motion between the first and last passes with a detection. */
function moverTruth(a: Astrometry, passes: readonly LivePass[]) {
  const use = passes.filter((p) => p.measured);
  const pmt = Math.hypot(a.pmRaCosDecMasYr, a.pmDecMasYr) / 1000;
  const plx = a.parallaxMas ?? null;
  const dpc = plx ? 1000 / plx : null;
  const literature = { pmArcsecPerYear: pmt, parallaxMas: plx, distancePc: dpc, distanceLy: dpc && dpc * 3.26156, tangentialVelocityKmS: dpc && 4.74 * pmt * dpc };
  if (use.length < 2) return { motionArcsec: null, note: "fewer than 2 passes with a measured position", literature };
  const p0 = use[0]!, p1 = use[use.length - 1]!;
  const d = (p: { ra: number; dec: number }, q: { ra: number; dec: number }) => {
    const east = (q.ra - p.ra) * Math.cos((p.dec * Math.PI) / 180) * 3600, north = (q.dec - p.dec) * 3600;
    return { east, north, total: Math.hypot(east, north) };
  };
  const yrs = p1.yearMid - p0.yearMid;
  const m = d(p0.measured!, p1.measured!), pr = d(p0.predicted, p1.predicted);
  return { fromPass: p0.index, toPass: p1.index, motionArcsec: m, predictedMotionArcsec: pr, baselineYears: yrs,
    rateArcsecPerYear: m.total / yrs, predictedRateArcsecPerYear: pr.total / yrs, literature };
}
