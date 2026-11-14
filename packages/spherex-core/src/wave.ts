/**
 * SPHEREx WCS-WAVE lookup table (FITS WCS paper III, WAVE-TAB), read from the last 5,760 bytes of a Level 2 file.
 * Row layout: X as nx big-endian int32, Y as ny int32, VALUES as (ny, nx, 2) big-endian float32
 * ([..., 0] wavelength, [..., 1] bandwidth, micron). nx and ny come from TFORM1 / TFORM2: the grid is not square
 * (D2 11 x 11, D4 13 x 20, D5/D6 9 x 9 or 11 x 11).
 */
import { type FitsHeader, findTableInSuffix, num } from "./fits.js";

export interface WaveTable {
  x: Float64Array; // control points along detector X (1-based FITS pixel units)
  y: Float64Array;
  /** (ny, nx, 2) row-major: index (j * nx + i) * 2 + k. */
  values: Float64Array;
  nx: number;
  ny: number;
}

export function parseWaveTable(suffix: ArrayBuffer | Uint8Array): WaveTable {
  const b = suffix instanceof Uint8Array ? suffix : new Uint8Array(suffix);
  const h = findTableInSuffix(b, "WCS-WAVE");
  const count = (k: string) => {
    const m = /^\s*(\d+)/.exec(String(h.cards[k] ?? ""));
    if (!m) throw new Error(`WCS-WAVE ${k} missing`);
    return Number(m[1]);
  };
  const nx = count("TFORM1"), ny = count("TFORM2");
  const rowLen = num(h, "NAXIS1");
  if (rowLen !== 4 * (nx + ny) + 8 * nx * ny) throw new Error(`WCS-WAVE row length ${rowLen} does not match ${nx} x ${ny}`);
  if (h.end + rowLen > b.length) throw new Error("WCS-WAVE row not inside the suffix");
  const dv = new DataView(b.buffer, b.byteOffset + h.end, rowLen);
  const x = new Float64Array(nx), y = new Float64Array(ny), values = new Float64Array(nx * ny * 2);
  for (let i = 0; i < nx; i++) x[i] = dv.getInt32(4 * i);
  for (let j = 0; j < ny; j++) y[j] = dv.getInt32(4 * (nx + j));
  const v0 = 4 * (nx + ny);
  for (let k = 0; k < values.length; k++) values[k] = dv.getFloat32(v0 + 4 * k);
  return { x, y, values, nx, ny };
}

/** numpy.interp(p, xp, arange(n)): fractional index, clamped to the ends. */
function fracIndex(p: number, xp: Float64Array): number {
  const n = xp.length;
  if (p <= xp[0]!) return 0;
  if (p >= xp[n - 1]!) return n - 1;
  let i = 0;
  while (xp[i + 1]! < p) i++;
  return i + (p - xp[i]!) / (xp[i + 1]! - xp[i]!);
}

/** Wavelength and bandwidth (micron) at 0-based file pixel (x, y): W keys of the IMAGE header, no SIP
 *  (port of pipeline/s3reader.py wave_at). */
export function waveAt(h: FitsHeader, t: WaveTable, x: number, y: number): { wavelength: number; bandwidth: number } {
  const px = num(h, "CRVAL1W", 1) + num(h, "CDELT1W", 1) * (x + 1 - num(h, "CRPIX1W", 1));
  const py = num(h, "CRVAL2W", 1) + num(h, "CDELT2W", 1) * (y + 1 - num(h, "CRPIX2W", 1));
  const fx = fracIndex(px, t.x), fy = fracIndex(py, t.y);
  const i = Math.min(Math.floor(fx), t.nx - 2), j = Math.min(Math.floor(fy), t.ny - 2);
  const ax = fx - i, ay = fy - j;
  const at = (jj: number, ii: number, k: number) => t.values[(jj * t.nx + ii) * 2 + k]!;
  const bil = (k: number) =>
    (1 - ax) * (1 - ay) * at(j, i, k) + ax * (1 - ay) * at(j, i + 1, k) + (1 - ax) * ay * at(j + 1, i, k) + ax * ay * at(j + 1, i + 1, k);
  return { wavelength: bil(0), bandwidth: bil(1) };
}
