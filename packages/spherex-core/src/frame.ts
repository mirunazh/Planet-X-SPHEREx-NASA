/** Background, noise and reprojection of one exposure box onto the fixed mission grid (pipeline/science.py
 *  prep_exposure and robust_sigma). Grid: TAN, north up, east left, row 0 = north, column 0 = east, 3"/px, 121 x 121. */
import type { TanSipWcs } from "./wcs.js";
import { gridWcs } from "./wcs.js";

export const GRID_N = 121;
export const GRID_SCALE_ARCSEC = 3;

/** Median of finite values (NaN-free input assumed; even counts average the two middle values, like numpy). */
export function median(values: ArrayLike<number>): number {
  const a = Float64Array.from(values).sort();
  const n = a.length;
  if (n === 0) return NaN;
  const h = n >> 1;
  return n % 2 ? a[h]! : (a[h - 1]! + a[h]!) / 2;
}

function finite(a: ArrayLike<number>): Float64Array {
  const out = new Float64Array(a.length);
  let k = 0;
  for (let i = 0; i < a.length; i++) if (Number.isFinite(a[i])) out[k++] = a[i]!;
  return out.subarray(0, k);
}

/** astropy sigma_clipped_stats(..., sigma=3)[1]: iterate (keep median - s*std <= v <= median + s*std, population std)
 *  until nothing changes or `maxiters`, then the median of what is left. NaN and infinities are ignored. */
export function sigmaClippedMedian(values: ArrayLike<number>, sigma = 3, maxiters = 5): number {
  let d = finite(values);
  for (let it = 0; it < maxiters; it++) {
    const med = median(d);
    let mean = 0;
    for (const v of d) mean += v;
    mean /= d.length;
    let ss = 0;
    for (const v of d) ss += (v - mean) ** 2;
    const std = Math.sqrt(ss / d.length);
    const lo = med - sigma * std, hi = med + sigma * std;
    const kept = d.filter((v) => v >= lo && v <= hi);
    if (kept.length === d.length) break;
    d = kept;
  }
  return median(d);
}

/** 1.4826 x median absolute deviation of the finite values (NaN if none). */
export function robustSigma(a: ArrayLike<number>): number {
  const v = finite(a);
  if (v.length === 0) return NaN;
  const m = median(v);
  for (let i = 0; i < v.length; i++) v[i] = Math.abs(v[i]! - m);
  return 1.4826 * median(v);
}

export interface PixelBox {
  pixels: Float32Array; // width x height, row-major
  width: number;
  height: number;
  x0: number; // file pixel of box column 0
  y0: number;
  wcs: TanSipWcs; // full-frame, 0-based
}

/**
 * Bilinear reprojection of a box (minus `subtract`) onto an n x n grid WCS; NaN where there is no data.
 * Edge rule of reproject's map_coordinates: source coordinates within half a pixel outside the box snap to the edge
 * pixel, farther ones give NaN; any NaN among the 4 neighbours gives NaN (scipy order=1).
 */
export function reprojectBilinear(src: PixelBox, grid: TanSipWcs, n = GRID_N, subtract = 0): Float32Array {
  const out = new Float32Array(n * n);
  const { pixels, width: w, height: h } = src;
  for (let j = 0; j < n; j++) {
    for (let i = 0; i < n; i++) {
      const [ra, dec] = grid.pixelToSky(i, j);
      const [fx, fy] = src.wcs.skyToPixel(ra, dec);
      let x = fx - src.x0, y = fy - src.y0;
      if (!(x >= -0.5 && x <= w - 0.5 && y >= -0.5 && y <= h - 0.5)) { out[j * n + i] = NaN; continue; }
      x = Math.min(Math.max(x, 0), w - 1);
      y = Math.min(Math.max(y, 0), h - 1);
      const ix = Math.min(Math.floor(x), w - 2), iy = Math.min(Math.floor(y), h - 2);
      const ax = x - ix, ay = y - iy;
      const k = iy * w + ix;
      const v = (1 - ax) * (1 - ay) * pixels[k]! + ax * (1 - ay) * pixels[k + 1]! + (1 - ax) * ay * pixels[k + w]! + ax * ay * pixels[k + w + 1]!;
      out[j * n + i] = v - subtract; // NaN propagates from any neighbour
    }
  }
  return out;
}

export interface PreparedFrame {
  /** n x n grid, row 0 = north, column 0 = east, MJy/sr after background subtraction, NaN = no data. */
  frame: Float32Array;
  background: number;
  /** robustSigma of the reprojected frame. */
  sigma: number;
}

/** Sigma-clipped median background of the box, subtracted, then bilinear reprojection onto the grid at (ra0, dec0). */
export function prepExposure(box: PixelBox, ra0: number, dec0: number, n = GRID_N, scaleArcsec = GRID_SCALE_ARCSEC): PreparedFrame {
  const background = sigmaClippedMedian(box.pixels);
  const frame = reprojectBilinear(box, gridWcs(ra0, dec0, n, scaleArcsec), n, background);
  return { frame, background, sigma: robustSigma(frame) };
}
