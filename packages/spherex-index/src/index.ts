/**
 * Static SPHEREx Level 2 image index reader: "which images cover this position" from static files only
 * (assets/index/, built by pipeline/index/build_index.py; format in pipeline/index/README.md). No archive call.
 *
 * One query = meta.json (cached per baseUrl) + the cell files whose RA/Dec box comes within meta.geometry.rMaxDeg
 * of the position (a footprint can only contain points within that distance of its reference point). Each row is then tested exactly: the point is projected about the row's reference point and
 * tested against the 4 footprint corners (great-circle edges, see geometry.ts).
 */
import { cellDistanceDeg, pointInPolygon } from "./geometry.js";

export * from "./geometry.js";

/** Same shape as spherex-core's Exposure (SIA path), so the result feeds buildLiveMission unchanged. */
export interface Exposure {
  /** Key inside the bucket, e.g. "dr1/level2/2025W17_4B/l2b-v27-2026-196/2/level2_2025W17_4B_0017_1D2_spx_l2b-v27-2026-196.fits". */
  uri: string;
  /** Mid-exposure MJD, (t_min + t_max) / 2, to 1e-6 d. */
  mjd: number;
  detector: string; // "D1" .. "D6"
  collection: string;
}

export type FetchLike = (url: string, init?: RequestInit) => Promise<Response>;

export interface IndexMeta {
  format: string;
  builtAt: string;
  newestMjd: number;
  rows: number;
  rowBytes: number;
  timeUnitDays: number;
  geometry: { refRaUnitDeg: number; refDecUnitDeg: number; cornerUnitRad: number; rMaxDeg: number; vertices: number };
  collections: string[];
  /** [release dir, plan, version, t0 MJD] */
  prefixes: Array<[string, string, string, number]>;
  /** [ra0, ra1, dec0, dec1, rows]; file cells/<index>.bin */
  cells: Array<[number, number, number, number, number]>;
  counts: Record<string, unknown>;
  credit: Record<string, unknown>;
}

export interface IndexOptions {
  /** URL of the assets/index directory as served next to the app, e.g. "/assets/index/". */
  baseUrl: string;
  fetchImpl?: FetchLike;
  signal?: AbortSignal;
}

export interface QueryStats {
  requests: number;
  bytes: number;
  cells: number[];
  rowsScanned: number;
}

const metaCache = new Map<string, Promise<IndexMeta>>();
const D2R = Math.PI / 180;

const join = (base: string, path: string) => base.replace(/\/?$/, "/") + path;

async function getBytes(url: string, o: IndexOptions): Promise<ArrayBuffer> {
  const r = await (o.fetchImpl ?? fetch)(url, o.signal ? { signal: o.signal } : undefined);
  if (!r.ok) throw new Error(`index: HTTP ${r.status} for ${url}`);
  return r.arrayBuffer();
}

/** meta.json, fetched once per baseUrl (a failed fetch is not cached). */
export function loadMeta(o: IndexOptions): Promise<IndexMeta> {
  let p = metaCache.get(o.baseUrl);
  if (!p) {
    p = getBytes(join(o.baseUrl, "meta.json"), o).then((b) => {
      const m = JSON.parse(new TextDecoder().decode(b)) as IndexMeta;
      if (!m.format?.startsWith("spherex-index/1")) throw new Error(`index: unsupported format ${m.format}`);
      return m;
    });
    p.catch(() => metaCache.delete(o.baseUrl));
    metaCache.set(o.baseUrl, p);
  }
  return p;
}

/** Exposures whose footprint contains (ra, dec), unique by uri, sorted by MJD, plus what the query cost
 *  (meta.json counts as a request only when it was not cached yet). */
export async function queryIndex(ra: number, dec: number, o: IndexOptions): Promise<{ exposures: Exposure[]; stats: QueryStats }> {
  if (!Number.isFinite(ra) || !Number.isFinite(dec) || dec < -90 || dec > 90) throw new RangeError("ra must be finite, dec in [-90, 90]");
  ra = ((ra % 360) + 360) % 360;
  const cached = metaCache.has(o.baseUrl);
  const m = await loadMeta(o);
  const g = m.geometry;
  const want = m.cells.flatMap((c, i) => (c[4] > 0 && cellDistanceDeg(c, ra, dec) <= g.rMaxDeg ? [i] : []));
  const bufs = await Promise.all(want.map((i) => getBytes(join(o.baseUrl, `cells/${i}.bin`), o)));
  const stats: QueryStats = { requests: want.length + (cached ? 0 : 1), bytes: 0, cells: want, rowsScanned: 0 };

  // query point as a unit vector; per row: tangent-plane coordinates about the row's reference point
  const pr = ra * D2R, pd = dec * D2R;
  const px = Math.cos(pd) * Math.cos(pr), py = Math.cos(pd) * Math.sin(pr), pz = Math.sin(pd);
  const cosMax = Math.cos(g.rMaxDeg * D2R);
  const nv = g.vertices, xs = new Float64Array(nv), ys = new Float64Array(nv);
  const out: Exposure[] = [];
  for (const buf of bufs) {
    stats.bytes += buf.byteLength;
    const v = new DataView(buf);
    const n = buf.byteLength / m.rowBytes;
    stats.rowsScanned += n;
    for (let k = 0, o0 = 0; k < n; k++, o0 += m.rowBytes) {
      const a = v.getUint16(o0 + 8, true) * g.refRaUnitDeg * D2R, d = v.getInt16(o0 + 10, true) * g.refDecUnitDeg * D2R;
      const ca = Math.cos(a), sa = Math.sin(a), cd = Math.cos(d), sd = Math.sin(d);
      const c = px * cd * ca + py * cd * sa + pz * sd; // cos(distance to the reference point)
      if (c < cosMax || c <= 0) continue;
      const xi = (py * ca - px * sa) / c, eta = (pz * cd - (px * ca + py * sa) * sd) / c;
      for (let j = 0; j < nv; j++) {
        xs[j] = v.getInt16(o0 + 12 + 4 * j, true) * g.cornerUnitRad;
        ys[j] = v.getInt16(o0 + 14 + 4 * j, true) * g.cornerUnitRad;
      }
      if (!pointInPolygon(xi, eta, xs, ys)) continue;
      out.push(decodeRow(m, v, o0));
    }
  }
  return { exposures: dedupeExposures(out), stats };
}

function decodeRow(m: IndexMeta, v: DataView, o0: number): Exposure {
  const [rel, plan, ver, t0] = m.prefixes[v.getUint16(o0, true)]!;
  const sn = v.getUint16(o0 + 2, true), w = v.getUint32(o0 + 4, true);
  const seq = String(sn & 0x3fff).padStart(4, "0"), sub = (sn >> 14) + 1;
  const det = ((w >>> 24) & 7) + 1, coll = m.collections[(w >>> 27) & 7] ?? "";
  const mjd = Math.round((t0 + (w & 0xffffff) * m.timeUnitDays) * 1e6) / 1e6;
  return { uri: `${rel}/level2/${plan}/${ver}/${det}/level2_${plan}_${seq}_${sub}D${det}_spx_${ver}.fits`, mjd, detector: `D${det}`, collection: coll };
}

/** Exposures whose footprint contains (ra, dec): same shape and de-duplication as the SIA path. */
export async function exposuresAt(ra: number, dec: number, o: IndexOptions): Promise<Exposure[]> {
  return (await queryIndex(ra, dec, o)).exposures;
}

/** Unique by uri, sorted by MJD (spherex-core sia.ts dedupeExposures). */
export function dedupeExposures(list: readonly Exposure[]): Exposure[] {
  const seen = new Map<string, Exposure>();
  for (const e of list) if (!seen.has(e.uri)) seen.set(e.uri, e);
  return [...seen.values()].sort((a, b) => a.mjd - b.mjd);
}

export interface DetectorCoverage {
  detector: string;
  images: number;
  /** Runs of images with no gap over gapDays (the 20-day pass rule of spherex-core groupPasses, no minimum size). */
  visits: number;
  firstMjd: number;
  lastMjd: number;
}

/** Per detector (D1..D6, only those with images): number of images and visits, so a UI can say
 *  "34 images in 3 visits" before loading any pixels. */
export function coverageSummary(exposures: readonly Pick<Exposure, "mjd" | "detector">[], gapDays = 20) {
  const by = new Map<string, number[]>();
  for (const e of exposures) (by.get(e.detector) ?? by.set(e.detector, []).get(e.detector)!).push(e.mjd);
  const visitsOf = (t: number[]) => t.reduce((n, x, i) => n + (i > 0 && x - t[i - 1]! > gapDays ? 1 : 0), t.length ? 1 : 0);
  const detectors: DetectorCoverage[] = [...by.entries()].sort(([a], [b]) => a.localeCompare(b)).map(([detector, t]) => {
    t.sort((a, b) => a - b);
    return { detector, images: t.length, visits: visitsOf(t), firstMjd: t[0]!, lastMjd: t[t.length - 1]! };
  });
  const all = exposures.map((e) => e.mjd).sort((a, b) => a - b);
  return { images: all.length, visits: visitsOf(all), detectors };
}
