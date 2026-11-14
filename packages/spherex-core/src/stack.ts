/**
 * Pass grouping, per-pass stacking and measurement on square grids (flat Float32Array, row-major, n x n).
 * Ports of pipeline/build_missions.py split_passes / measure_pass and pipeline/science.py stack, aperture,
 * empty_ap_sigma, centroid, bootstrap_centroid_err, display_hint. Random draws use a seeded mulberry32, so S/N and
 * bootstrap errors are statistically equivalent to the Python build but not identical to numpy's generator.
 */
import { median, robustSigma } from "./frame.js";

export const GAP_DAYS = 20;
export const MIN_PASS = 3;

/** Pass label per input index: sorted by MJD, a new pass starts after a gap of more than `gapDays`. */
export function splitPasses(mjds: readonly number[], gapDays = GAP_DAYS): number[] {
  const order = mjds.map((_, i) => i).sort((a, b) => mjds[a]! - mjds[b]!);
  const lab = new Array<number>(mjds.length).fill(0);
  let k = 0;
  for (let i = 1; i < order.length; i++) {
    if (mjds[order[i]!]! - mjds[order[i - 1]!]! > gapDays) k++;
    lab[order[i]!] = k;
  }
  return lab;
}

/** Items sorted by MJD and grouped into passes; passes with fewer than `minExposures` go to `dropped`. */
export function groupPasses<T extends { mjd: number }>(items: readonly T[], gapDays = GAP_DAYS, minExposures = MIN_PASS) {
  const sorted = [...items].sort((a, b) => a.mjd - b.mjd);
  const lab = splitPasses(sorted.map((e) => e.mjd), gapDays);
  const groups: T[][] = [];
  sorted.forEach((e, i) => (groups[lab[i]!] ??= []).push(e));
  return { passes: groups.filter((g) => g.length >= minExposures), dropped: groups.filter((g) => g.length < minExposures) };
}

/**
 * Inverse-variance weighted mean (weight 1 / sigma_i^2) of equally sized frames, NaN where no frame has data.
 * With `clip` and 5 or more frames, each pixel with at least 5 finite values is first sigma-clipped across frames:
 * reject |v - median| > 4 x 1.4826 x MAD of that pixel's values, up to 3 iterations.
 */
export function stackFrames(frames: readonly Float32Array[], sigmas: readonly number[], clip = true): Float32Array {
  const m = frames.length;
  const size = frames[0]?.length ?? 0;
  const out = new Float32Array(size);
  const w = sigmas.map((s) => 1 / (s * s));
  const vals = new Float64Array(m);
  const use = new Uint8Array(m);
  const tmp = new Float64Array(m);
  for (let p = 0; p < size; p++) {
    let nfin = 0;
    for (let i = 0; i < m; i++) {
      vals[i] = frames[i]![p]!;
      use[i] = Number.isFinite(vals[i]) ? 1 : 0;
      nfin += use[i]!;
    }
    if (clip && m >= 5) {
      for (let it = 0; it < 3 && nfin >= 5; it++) {
        let k = 0;
        for (let i = 0; i < m; i++) if (use[i]) tmp[k++] = vals[i]!;
        const med = median(tmp.subarray(0, k));
        for (let i = 0; i < k; i++) tmp[i] = Math.abs(tmp[i]! - med);
        const mad = 1.4826 * median(tmp.subarray(0, k));
        if (!(mad > 0)) break;
        let changed = false;
        for (let i = 0; i < m; i++) {
          if (use[i] && Math.abs(vals[i]! - med) > 4 * mad) { use[i] = 0; nfin--; changed = true; }
        }
        if (!changed) break;
      }
    }
    let num = 0, den = 0;
    for (let i = 0; i < m; i++) if (use[i]) { num += vals[i]! * w[i]!; den += w[i]!; }
    out[p] = den > 0 ? num / den : NaN;
  }
  return out;
}

/** Flux-weighted centroid (negative pixels clipped to 0, NaN ignored) within r px, `it` iterations; null if no flux. */
export function centroid(img: Float32Array, n: number, x: number, y: number, r = 4, it = 5, height = img.length / n): [number, number] | null {
  for (let k = 0; k < it; k++) {
    let sw = 0, sx = 0, sy = 0;
    for (let j = Math.max(0, Math.ceil(y - r)); j <= Math.min(height - 1, Math.floor(y + r)); j++) {
      for (let i = Math.max(0, Math.ceil(x - r)); i <= Math.min(n - 1, Math.floor(x + r)); i++) {
        const v = img[j * n + i]!;
        if (!Number.isFinite(v) || Math.hypot(i - x, j - y) > r) continue;
        const wt = Math.max(v, 0);
        sw += wt; sx += i * wt; sy += j * wt;
      }
    }
    if (!(sw > 0)) return null;
    x = sx / sw;
    y = sy / sw;
  }
  return [x, y];
}

/** 9" aperture (r = 3 px) minus the median of an 18-30" annulus, scaled for missing pixels; NaN if too empty. */
export function aperture(img: Float32Array, n: number, x: number, y: number, r = 3, rin = 6, rout = 10, minFinite = 0.8): number {
  const h = img.length / n;
  const ann: number[] = [];
  let apN = 0, nf = 0, sum = 0;
  for (let j = Math.max(0, Math.ceil(y - rout)); j <= Math.min(h - 1, Math.floor(y + rout)); j++) {
    for (let i = Math.max(0, Math.ceil(x - rout)); i <= Math.min(n - 1, Math.floor(x + rout)); i++) {
      const d = Math.hypot(i - x, j - y), v = img[j * n + i]!;
      if (d <= r) { apN++; if (Number.isFinite(v)) { nf++; sum += v; } }
      if (d >= rin && d <= rout && Number.isFinite(v)) ann.push(v);
    }
  }
  if (nf === 0 || nf < minFinite * apN || ann.length < 20) return NaN;
  return (sum - nf * median(ann)) * (apN / nf);
}

/** Seeded uniform [0, 1) generator (mulberry32). */
export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Robust scatter of the same aperture at up to `count` random empty positions (at least 10 px from `avoid`). */
export function emptyApertureSigma(img: Float32Array, n: number, avoid: ReadonlyArray<[number, number]>, rand: () => number, count = 300, avoidR = 10): number {
  const h = img.length / n;
  const vals: number[] = [];
  for (let t = 0; t < count * 3 && vals.length < count; t++) {
    const x = 12 + rand() * (n - 25), y = 12 + rand() * (h - 25);
    if (avoid.some(([ax, ay]) => Math.hypot(x - ax, y - ay) < avoidR)) continue;
    const s = aperture(img, n, x, y);
    if (Number.isFinite(s)) vals.push(s);
  }
  return vals.length > 20 ? robustSigma(vals) : NaN;
}

/** Centroid scatter (px, x and y) over `nboot` stacks of exposures resampled with replacement, on a
 *  (2 half + 1)^2 window around (x, y). [NaN, NaN] if fewer than 10 bootstrap centroids. */
export function bootstrapCentroidErr(frames: readonly Float32Array[], sigmas: readonly number[], n: number, x: number, y: number,
  rand: () => number, nboot = 100, half = 15): [number, number] {
  const ix = Math.round(x), iy = Math.round(y);
  const xa = Math.max(ix - half, 0), ya = Math.max(iy - half, 0);
  const xb = Math.min(ix + half, n - 1), yb = Math.min(iy + half, n - 1);
  const ww = xb - xa + 1, wh = yb - ya + 1;
  const subs = frames.map((f) => {
    const s = new Float32Array(ww * wh);
    for (let j = 0; j < wh; j++) s.set(f.subarray((ya + j) * n + xa, (ya + j) * n + xb + 1), j * ww);
    return s;
  });
  const pts: Array<[number, number]> = [];
  for (let b = 0; b < nboot; b++) {
    const k = subs.map(() => Math.floor(rand() * subs.length));
    const c = centroid(stackFrames(k.map((i) => subs[i]!), k.map((i) => sigmas[i]!)), ww, x - xa, y - ya, 4, 5, wh);
    if (c) pts.push(c);
  }
  if (pts.length < 10) return [NaN, NaN];
  const std = (a: number[]) => { const m = a.reduce((s, v) => s + v, 0) / a.length; return Math.sqrt(a.reduce((s, v) => s + (v - m) ** 2, 0) / a.length); };
  return [std(pts.map((p) => p[0])), std(pts.map((p) => p[1]))];
}

export interface Measurement {
  snr: number;
  /** Present when S/N >= 5 and a centroid exists (grid px, 0-based). */
  x?: number;
  y?: number;
  errX?: number;
  errY?: number;
}

/** S/N of the 9" aperture at the predicted (px, py) against empty apertures; centroid and bootstrap error when S/N >= 5. */
export function measureNear(stack: Float32Array, n: number, px: number, py: number, frames: readonly Float32Array[], sigmas: readonly number[],
  seed = 11, saturated = false): Measurement {
  const rand = mulberry32(seed);
  const noise = emptyApertureSigma(stack, n, [[px, py]], rand);
  const flux = aperture(stack, n, px, py, 3, 6, 10, saturated ? 0 : 0.8);
  const snr = noise > 0 ? flux / noise : NaN;
  if (!(snr >= 5)) return { snr };
  const c = centroid(stack, n, px, py);
  if (!c) return { snr };
  const [ex, ey] = bootstrapCentroidErr(frames, sigmas, n, c[0], c[1], rand);
  return { snr, x: c[0], y: c[1], errX: ex, errY: ey };
}

/** numpy nanpercentile (linear) of finite values. */
function percentile(a: Float64Array, q: number): number {
  const s = a.slice().sort();
  if (s.length === 0) return NaN;
  const pos = (q / 100) * (s.length - 1), i = Math.floor(pos), f = pos - i;
  return i + 1 < s.length ? s[i]! + f * (s[i + 1]! - s[i]!) : s[i]!;
}

export interface DisplayHint {
  vmin: number;
  vmax: number;
  stretch: "asinh";
  soft: number;
  sigma: number;
  formula: string;
}

/** Shared asinh stretch (science.display_hint): vmin = median - 3 sigma, vmax = median over images of the 99.9th
 *  percentile (at least vmin + 10 sigma), soft = clip(3 sigma / (vmax - vmin), 1e-4, 1). */
export function displayHint(images: readonly Float32Array[]): DisplayHint {
  const fin = images.map((a) => Float64Array.from(a).filter(Number.isFinite));
  const sig = median(images.map((a) => robustSigma(a)).filter(Number.isFinite));
  const med = median(fin.map((a) => median(a)).filter(Number.isFinite));
  let vmax = median(fin.map((a) => percentile(a, 99.9)).filter(Number.isFinite));
  const vmin = med - 3 * sig;
  vmax = Math.max(vmax, vmin + 10 * sig);
  return { vmin, vmax, stretch: "asinh", soft: Math.min(Math.max((3 * sig) / (vmax - vmin), 1e-4), 1), sigma: sig,
    formula: "t = clip((v - vmin) / (vmax - vmin), 0, 1); out = asinh(t / soft) / asinh(1 / soft)" };
}
