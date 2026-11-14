/**
 * Byte-range reads of SPHEREx Level 2 files on the public S3 bucket (CORS-open, Range allowed).
 * Recipe (docs/research/09, section 1): A = bytes 0-34559 (PRIMARY + IMAGE headers), B = whole IMAGE rows of the
 * box (8,160 B per row, big-endian float32), C = suffix bytes=-5760 (WCS-WAVE table). A and C run in parallel,
 * B after A. C is cached per release and detector (a per-detector calibration) and re-read when the header's
 * spectral_wcs calibration id differs from the cached one.
 */
import { FitsIncompleteError, type FitsHeader, findHdu, num } from "./fits.js";
import { TanSipWcs, wcsFromHeader } from "./wcs.js";
import { type WaveTable, parseWaveTable, waveAt } from "./wave.js";

export const S3_HOST = "https://nasa-irsa-spherex.s3.us-east-1.amazonaws.com/";
export const NX = 2040;
export const ROW_BYTES = NX * 4;
export const HEAD_BYTES = 12 * 2880; // 34,560
export const TAIL_BYTES = 2 * 2880; // 5,760

export type FetchLike = (url: string, init?: RequestInit) => Promise<Response>;

/** S3 URL for an archive uri ("ibe/data/spherex/dr1/...", a full IRSA URL, an S3 URL or the bare key "dr1/..."). */
export function s3Url(uri: string): string {
  if (uri.startsWith(S3_HOST)) return uri;
  const k = uri.indexOf("ibe/data/spherex/");
  return S3_HOST + (k >= 0 ? uri.slice(k + "ibe/data/spherex/".length) : uri.replace(/^\/+/, ""));
}

/** "DR1", "QR3", ... from the path. */
export function releaseOf(uri: string): string {
  return s3Url(uri).slice(S3_HOST.length).split("/", 1)[0]!.toUpperCase();
}

/** Promise pool: at most `max` tasks at once, FIFO. Queued tasks whose signal aborts are dropped. */
export class Limiter {
  private active = 0;
  private readonly queue: Array<() => void> = [];
  constructor(readonly max: number) {}

  async run<T>(task: () => Promise<T>, signal?: AbortSignal): Promise<T> {
    if (this.active < this.max) this.active++;
    else {
      // wait for a finishing task to hand its slot over (active stays counted, so no newcomer can jump in)
      await new Promise<void>((resolve, reject) => {
        const go = () => { signal?.removeEventListener("abort", onAbort); resolve(); };
        const onAbort = () => {
          const i = this.queue.indexOf(go);
          if (i >= 0) this.queue.splice(i, 1);
          reject(signal!.reason ?? new DOMException("Aborted", "AbortError"));
        };
        if (signal?.aborted) return onAbort();
        signal?.addEventListener("abort", onAbort, { once: true });
        this.queue.push(go);
      });
    }
    try {
      return await task();
    } finally {
      const next = this.queue.shift();
      if (next) next();
      else this.active--;
    }
  }
}

/** Shared default: 6 concurrent S3 requests (the browser's per-host limit). */
export const s3Limiter = new Limiter(6);

export interface ReadOptions {
  signal?: AbortSignal;
  fetchImpl?: FetchLike;
  limiter?: Limiter;
  /** Retries after the first try (default 3), with 0.5 s, 1.5 s, 3.5 s backoff. */
  retries?: number;
  /** Wave-table cache; pass a new Map to isolate, or null to disable. Default: a module-level cache. */
  waveCache?: Map<string, Promise<CachedWave>> | null;
}

const sleep = (ms: number, signal?: AbortSignal) =>
  new Promise<void>((resolve, reject) => {
    const t = setTimeout(resolve, ms);
    signal?.addEventListener("abort", () => { clearTimeout(t); reject(signal.reason); }, { once: true });
  });

/** One HTTP Range GET ("0-34559", "-5760"): expects 206 and exactly the requested byte count. */
export async function rangeFetch(url: string, range: string, o: ReadOptions = {}): Promise<Uint8Array> {
  const f = o.fetchImpl ?? fetch;
  const want = range.startsWith("-") ? Number(range.slice(1)) : (([a, b]) => b! - a! + 1)(range.split("-").map(Number));
  const tries = 1 + (o.retries ?? 3);
  let last = "";
  for (let k = 0; k < tries; k++) {
    if (k > 0) await sleep(500 * (2 ** k - 1), o.signal);
    try {
      const buf = await (o.limiter ?? s3Limiter).run(async () => {
        const r = await f(url, { headers: { Range: `bytes=${range}` }, signal: o.signal });
        if (r.status !== 206) {
          void r.body?.cancel();
          // 4xx other than 408 / 429 is permanent (missing key, bad range): fail at once, no retry
          const permanent = r.status >= 400 && r.status < 500 && r.status !== 408 && r.status !== 429;
          throw Object.assign(new Error(`HTTP ${r.status}`), { permanent });
        }
        return new Uint8Array(await r.arrayBuffer());
      }, o.signal);
      if (buf.length === want) return buf;
      last = `got ${buf.length} of ${want} bytes`;
    } catch (e) {
      if (o.signal?.aborted) throw e;
      last = e instanceof Error ? e.message : String(e);
      if ((e as { permanent?: boolean }).permanent) break;
    }
  }
  throw new Error(`${url} bytes=${range}: ${last}`);
}

export interface ImageHead {
  header: FitsHeader;
  dataOffset: number;
  wcs: TanSipWcs;
}

/** Request A (and more blocks if END is beyond 34,560 bytes, never seen so far). */
export async function readHead(url: string, o: ReadOptions = {}): Promise<ImageHead> {
  let buf = await rangeFetch(url, `0-${HEAD_BYTES - 1}`, o);
  for (;;) {
    try {
      const { header, dataOffset } = findHdu(buf, "IMAGE");
      if (num(header, "NAXIS1") !== NX || num(header, "NAXIS2") !== NX || num(header, "BITPIX") !== -32) {
        throw new Error(`unexpected IMAGE HDU shape in ${url}`);
      }
      return { header, dataOffset, wcs: wcsFromHeader(header) };
    } catch (e) {
      if (!(e instanceof FitsIncompleteError) || buf.length > 40 * 2880) throw e;
      const more = await rangeFetch(url, `${buf.length}-${buf.length + 4 * 2880 - 1}`, o);
      const next = new Uint8Array(buf.length + more.length);
      next.set(buf);
      next.set(more, buf.length);
      buf = next;
    }
  }
}

/** Request B: IMAGE rows y0..y1 (0-based, inclusive), all 2040 columns, as native-endian Float32Array. */
export async function readRows(url: string, dataOffset: number, y0: number, y1: number, o: ReadOptions = {}): Promise<Float32Array> {
  const raw = await rangeFetch(url, `${dataOffset + y0 * ROW_BYTES}-${dataOffset + (y1 + 1) * ROW_BYTES - 1}`, o);
  return decodeBigEndianF32(raw);
}

export function decodeBigEndianF32(raw: Uint8Array): Float32Array {
  const dv = new DataView(raw.buffer, raw.byteOffset, raw.byteLength);
  const out = new Float32Array(raw.byteLength >> 2);
  for (let i = 0; i < out.length; i++) out[i] = dv.getFloat32(4 * i);
  return out;
}

export interface CachedWave {
  table: WaveTable;
  calib: string | null;
}

const defaultWaveCache = new Map<string, Promise<CachedWave>>();

function calibId(h: FitsHeader): string | null {
  return h.history.find((s) => s.includes("spectral_wcs")) ?? null;
}

function detectorFromUri(uri: string): string | null {
  return /_\dD(\d)_spx_/.exec(uri)?.[1] ?? null;
}

export interface ExposureBox {
  uri: string;
  url: string;
  header: FitsHeader;
  dataOffset: number;
  /** Full-frame WCS, 0-based pixels: box pixel (i, j) is file pixel (x0 + i, y0 + j). */
  wcs: TanSipWcs;
  wave: WaveTable;
  x0: number;
  y0: number;
  width: number;
  height: number;
  /** width x height, row-major, row 0 = file row y0. NaN kept as NaN. */
  pixels: Float32Array;
  mjd: number;
  detector: string; // "D2"
  /** File pixel (0-based) of the requested (ra, dec), and wavelength / bandwidth there (micron). */
  targetX: number;
  targetY: number;
  wavelengthUm: number;
  bandwidthUm: number;
  bytes: number;
}

/** File pixel box (inclusive, clipped to the detector) that covers a tangent-plane square of half size h arcsec
 *  around (ra, dec), sampled like pipeline/science.py grid_outline (9 points per edge) plus a 2-pixel margin. */
export function boxForSquare(wcs: TanSipWcs, ra: number, dec: number, halfArcsec: number, margin = 2) {
  const s = halfArcsec / 3600;
  const plane = new TanSipWcs({ crpix: [1, 1], crval: [ra, dec], cd: [[1, 0], [0, 1]] }); // "pixel" = (xi, eta) in deg
  let xmin = Infinity, xmax = -Infinity, ymin = Infinity, ymax = -Infinity;
  for (let k = 0; k < 9; k++) {
    const e = -s + (2 * s * k) / 8;
    for (const [a, b] of [[e, -s], [e, s], [-s, e], [s, e]] as const) {
      const [r, d] = plane.pixelToSky(a, b);
      const [x, y] = wcs.skyToPixel(r, d);
      xmin = Math.min(xmin, x); xmax = Math.max(xmax, x); ymin = Math.min(ymin, y); ymax = Math.max(ymax, y);
    }
  }
  if (!Number.isFinite(xmin + xmax + ymin + ymax)) return null;
  const x0 = Math.max(Math.floor(xmin) - margin, 0), x1 = Math.min(Math.ceil(xmax) + margin, NX - 1);
  const y0 = Math.max(Math.floor(ymin) - margin, 0), y1 = Math.min(Math.ceil(ymax) + margin, NX - 1);
  if (x0 > x1 || y0 > y1) return null;
  return { x0, x1, y0, y1 };
}

/**
 * Read the pixel box around (ra, dec): a tangent-plane square of half size `halfSizeArcsec` (the mission grid is
 * 181.5"), mapped through the exposure's TAN-SIP WCS, plus 2 pixels. Throws if the square is entirely off the
 * detector. Three requests: A and C in parallel (C cached per release and detector), then B.
 */
export async function readExposureBox(uri: string, ra: number, dec: number, halfSizeArcsec: number, o: ReadOptions = {}): Promise<ExposureBox> {
  const url = s3Url(uri);
  const cache = o.waveCache === undefined ? defaultWaveCache : o.waveCache;
  const det = detectorFromUri(uri);
  const key = det ? `${releaseOf(uri)}/D${det}` : null;
  const headP = readHead(url, o);
  const fetchWave = (): Promise<CachedWave> =>
    Promise.all([rangeFetch(url, `-${TAIL_BYTES}`, o), headP]).then(([b, h]) => ({ table: parseWaveTable(b), calib: calibId(h.header) }));
  let waveP = cache && key ? cache.get(key) : undefined;
  const fresh = !waveP;
  if (!waveP) {
    waveP = fetchWave();
    waveP.catch(() => {}); // observed below; avoids an unhandled rejection when request A fails first
    if (cache && key) {
      cache.set(key, waveP);
      waveP.catch(() => cache.delete(key)); // a failed read must not poison the cache
    }
  }
  const head = await headP;
  let wave = await waveP;
  if (wave.calib !== calibId(head.header)) wave = await fetchWave(); // another calibration file: read this file's own table
  const box = boxForSquare(head.wcs, ra, dec, halfSizeArcsec);
  if (!box) throw new Error(`(${ra}, ${dec}) is not on ${uri}`);
  const rows = await readRows(url, head.dataOffset, box.y0, box.y1, o);
  const width = box.x1 - box.x0 + 1, height = box.y1 - box.y0 + 1;
  const pixels = new Float32Array(width * height);
  for (let j = 0; j < height; j++) pixels.set(rows.subarray(j * NX + box.x0, j * NX + box.x1 + 1), j * width);
  const [tx, ty] = head.wcs.skyToPixel(ra, dec);
  const w = waveAt(head.header, wave.table, tx, ty);
  return {
    uri, url, header: head.header, dataOffset: head.dataOffset, wcs: head.wcs, wave: wave.table,
    x0: box.x0, y0: box.y0, width, height, pixels,
    mjd: num(head.header, "MJD-AVG"), detector: `D${num(head.header, "DETECTOR")}`,
    targetX: tx, targetY: ty, wavelengthUm: w.wavelength, bandwidthUm: w.bandwidth,
    bytes: HEAD_BYTES + (fresh ? TAIL_BYTES : 0) + height * ROW_BYTES,
  };
}
