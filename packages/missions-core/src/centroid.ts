/**
 * Snap a rough click to the object under it. The student's skill is choosing the right
 * object, not pixel-perfect clicking: we take the brightest 3 x 3 patch within radiusPx of
 * the click, then iterate a flux-weighted centroid over a 4 px (12 arcsec) disc after
 * subtracting the median of an 18 to 30 arcsec annulus, the same apertures as the pipeline
 * (pipeline/science.py centroid and aperture). NaN pixels are ignored everywhere.
 */

export type CentroidFlag =
  | 'no-signal' // nothing finite and above the background near the click
  | 'faint' // S/N under 5
  | 'edge' // the centroid disc runs off the frame
  | 'saturated-core' // NaN pixels at the centre: a saturated star, measured from its wings
  | 'mostly-nan'; // more than half of the centroid disc has no data

export interface CentroidResult {
  x: number; // grid pixel, NaN when flags include 'no-signal'
  y: number;
  snr: number; // aperture S/N estimate (see below), NaN when unknown
  flux: number; // background-subtracted sum in the 3 px aperture, frame units x pixels
  background: number; // annulus median
  nanFraction: number; // share of the centroid disc without data
  flags: CentroidFlag[];
  reliable: boolean; // no flags
}

export const CENTROID_RADIUS_PX = 4; // 12 arcsec, pipeline value
export const SNR_APERTURE_PX = 3; // 9 arcsec, pipeline value
export const ANNULUS_PX: readonly [number, number] = [6, 10]; // 18 to 30 arcsec, pipeline value
export const MIN_SNR = 5;

export function refineCentroid(
  frame: ArrayLike<number>,
  width: number,
  height: number,
  x: number,
  y: number,
  radiusPx = 5,
): CentroidResult {
  const at = (i: number, j: number) => (i < 0 || j < 0 || i >= width || j >= height ? NaN : (frame[j * width + i] as number));
  const fail = (flags: CentroidFlag[]): CentroidResult => ({
    x: NaN, y: NaN, snr: NaN, flux: NaN, background: NaN, nanFraction: 1, flags, reliable: false,
  });
  if (![x, y, radiusPx].every(Number.isFinite) || frame.length < width * height) return fail(['no-signal']);

  // 1. brightest 3 x 3 patch (mean of its finite pixels) within the search radius
  let best = -Infinity;
  let px = NaN;
  let py = NaN;
  disc(x, y, radiusPx, width, height, (i, j) => {
    let s = 0;
    let n = 0;
    for (let dj = -1; dj <= 1; dj++)
      for (let di = -1; di <= 1; di++) {
        const v = at(i + di, j + dj);
        if (Number.isFinite(v)) { s += v; n++; }
      }
    if (n >= 3 && s / n > best) { best = s / n; px = i; py = j; }
  });
  if (!Number.isFinite(px)) return fail(['no-signal']);

  // 2. local background and noise from the annulus around the peak
  const bg = annulusStats(at, px, py, ANNULUS_PX[0], ANNULUS_PX[1], width, height);
  const background = Number.isFinite(bg.median) ? bg.median : 0;

  // 3. iterate the flux-weighted centroid (negative pixels clipped) until it settles
  let cx = px;
  let cy = py;
  for (let it = 0; it < 50; it++) {
    let sw = 0, sx = 0, sy = 0;
    disc(cx, cy, CENTROID_RADIUS_PX, width, height, (i, j) => {
      const v = at(i, j);
      if (!Number.isFinite(v)) return;
      const w = Math.max(v - background, 0);
      sw += w; sx += w * i; sy += w * j;
    });
    if (!(sw > 0)) return fail(['no-signal']);
    const nx = sx / sw;
    const ny = sy / sw;
    const moved = Math.hypot(nx - cx, ny - cy);
    cx = nx; cy = ny;
    if (moved < 1e-4) break;
  }

  // 4. quality: NaN share, edge, S/N
  let nIn = 0, nNan = 0, nCoreNan = 0;
  disc(cx, cy, CENTROID_RADIUS_PX, -1, -1, (i, j) => {
    nIn++;
    if (!Number.isFinite(at(i, j))) { nNan++; if (Math.hypot(i - cx, j - cy) <= 2) nCoreNan++; }
  });
  const nanFraction = nIn ? nNan / nIn : 1;
  const { flux, snr } = apertureSnr(at, cx, cy, width, height);

  const flags: CentroidFlag[] = [];
  const r = CENTROID_RADIUS_PX;
  if (cx - r < 0 || cy - r < 0 || cx + r > width - 1 || cy + r > height - 1) flags.push('edge');
  if (nanFraction > 0.5) flags.push('mostly-nan');
  else if (nCoreNan > 0) flags.push('saturated-core');
  if (!(snr >= MIN_SNR)) flags.push('faint');
  return { x: cx, y: cy, snr, flux, background, nanFraction, flags, reliable: flags.length === 0 };
}

/**
 * Background-subtracted sum in a 3 px (9 arcsec) disc, scaled for missing pixels, with the
 * pipeline's background (median of the 6 to 10 px annulus) and its own NaN rule (science.py
 * aperture): NaN when under minFinite of the disc has data or the annulus has under 20 pixels.
 */
export function apertureSum(
  at: (i: number, j: number) => number, x: number, y: number, width: number, height: number, minFinite = 0.8,
): number {
  const bg = annulusStats(at, x, y, ANNULUS_PX[0], ANNULUS_PX[1], width, height);
  if (!Number.isFinite(bg.median)) return NaN;
  let s = 0, nAp = 0, nFin = 0;
  disc(x, y, SNR_APERTURE_PX, -1, -1, (i, j) => {
    nAp++;
    const v = at(i, j);
    if (Number.isFinite(v)) { s += v - bg.median; nFin++; }
  });
  return nFin === 0 || nFin < minFinite * nAp ? NaN : (s * nAp) / nFin;
}

/**
 * S/N = aperture sum / robust scatter of the same aperture on empty sky, the pipeline's
 * definition (science.py empty_ap_sigma), which includes the noise correlation that
 * reprojection adds. ponytail: a fixed 6 px lattice instead of 300 random positions, so the
 * value is deterministic and close to, not identical with, the manifest `snr`.
 */
function apertureSnr(
  at: (i: number, j: number) => number, x: number, y: number, width: number, height: number,
): { flux: number; snr: number } {
  const flux = apertureSum(at, x, y, width, height, 0);
  const sums: number[] = [];
  for (let j = 12; j <= height - 13; j += 6)
    for (let i = 12; i <= width - 13; i += 6) {
      if (Math.hypot(i - x, j - y) < 10) continue;
      const v = apertureSum(at, i, j, width, height);
      if (Number.isFinite(v)) sums.push(v);
    }
  if (sums.length <= 20) return { flux, snr: NaN };
  const med = median(sums);
  const sigma = 1.4826 * median(sums.map((v) => Math.abs(v - med)));
  return { flux, snr: sigma > 0 ? flux / sigma : NaN };
}

export function annulusStats(
  at: (i: number, j: number) => number, x: number, y: number, rin: number, rout: number, width: number, height: number,
): { median: number; sigma: number; n: number } {
  const v: number[] = [];
  disc(x, y, rout, width, height, (i, j) => {
    const r = Math.hypot(i - x, j - y);
    const f = at(i, j);
    if (r >= rin && Number.isFinite(f)) v.push(f);
  });
  if (v.length < 20) return { median: NaN, sigma: NaN, n: v.length };
  const med = median(v);
  return { median: med, sigma: 1.4826 * median(v.map((q) => Math.abs(q - med))), n: v.length };
}

/** Calls f(i, j) for every pixel centre within r of (x, y); clipped to the frame unless width < 0. */
export function disc(x: number, y: number, r: number, width: number, height: number, f: (i: number, j: number) => void): void {
  const clip = width >= 0;
  const i0 = clip ? Math.max(0, Math.ceil(x - r)) : Math.ceil(x - r);
  const i1 = clip ? Math.min(width - 1, Math.floor(x + r)) : Math.floor(x + r);
  const j0 = clip ? Math.max(0, Math.ceil(y - r)) : Math.ceil(y - r);
  const j1 = clip ? Math.min(height - 1, Math.floor(y + r)) : Math.floor(y + r);
  for (let j = j0; j <= j1; j++) for (let i = i0; i <= i1; i++) if ((i - x) ** 2 + (j - y) ** 2 <= r * r) f(i, j);
}

export function median(a: number[]): number {
  if (!a.length) return NaN;
  const s = [...a].sort((p, q) => p - q);
  const m = s.length >> 1;
  return s.length % 2 ? (s[m] as number) : ((s[m - 1] as number) + (s[m] as number)) / 2;
}
