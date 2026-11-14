/**
 * IRSA SIA v2 exposure lists (docs/research/04, section 4): one request per collection, RESPONSEFORMAT=csv.
 * The archive sends no CORS headers, so the web app calls handleObservationsRequest from a server route.
 * Note: the CSV's cloud_access column holds unquoted JSON with commas, so columns are read by header index and
 * only columns before it are used (access_url, energy_bandpassname, obs_collection, t_min, t_max).
 */
import { Limiter, type FetchLike } from "./s3.js";

export const SIA_BASE = "https://irsa.ipac.caltech.edu/SIA";
export const COLLECTIONS = ["spherex_dr1", "spherex_dr1_deep", "spherex_qr3", "spherex_qr3_deep"] as const;
export const DEFAULT_RADIUS_DEG = 0.001;
export const MAX_RADIUS_DEG = 0.05;

export interface Exposure {
  /** Key inside the bucket, e.g. "dr1/level2/2025W17_4B/.../level2_..._1D2_spx_....fits" (s3Url accepts it). */
  uri: string;
  /** Mid-exposure MJD, (t_min + t_max) / 2. */
  mjd: number;
  detector: string; // "D1" .. "D6"
  collection: string;
}

export function siaUrl(collection: string, ra: number, dec: number, radiusDeg = DEFAULT_RADIUS_DEG): string {
  return `${SIA_BASE}?COLLECTION=${collection}&POS=circle+${ra}+${dec}+${radiusDeg}&RESPONSEFORMAT=csv`;
}

export function siaUrls(ra: number, dec: number, radiusDeg = DEFAULT_RADIUS_DEG): string[] {
  return COLLECTIONS.map((c) => siaUrl(c, ra, dec, radiusDeg));
}

/** Split one CSV line (double quotes honoured). */
function splitCsv(line: string): string[] {
  const out: string[] = [];
  let cur = "", q = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (q) {
      if (ch === '"' && line[i + 1] === '"') { cur += '"'; i++; } else if (ch === '"') q = false; else cur += ch;
    } else if (ch === '"') q = true;
    else if (ch === ",") { out.push(cur); cur = ""; } else cur += ch;
  }
  out.push(cur);
  return out;
}

/** Parse an SIA CSV body into exposures; throws if it is not an SIA table (HTML error page, VOTable error). */
export function parseSiaCsv(text: string, fallbackCollection = ""): Exposure[] {
  const lines = text.split(/\r?\n/).filter((l) => l.length > 0);
  if (lines.length === 0) return [];
  const head = splitCsv(lines[0]!);
  const col = (k: string) => head.indexOf(k);
  const iu = col("access_url"), ib = col("energy_bandpassname"), ic = col("obs_collection"), i0 = col("t_min"), i1 = col("t_max");
  if (iu < 0 || ib < 0 || i0 < 0) throw new Error(`not an SIA CSV table: ${lines[0]!.slice(0, 120)}`);
  const out: Exposure[] = [];
  for (const line of lines.slice(1)) {
    const f = splitCsv(line);
    const url = f[iu] ?? "";
    const k = url.indexOf("ibe/data/spherex/");
    const det = /D(\d)$/.exec(f[ib] ?? "")?.[1];
    const t0 = Number(f[i0]), t1 = i1 >= 0 ? Number(f[i1]) : t0;
    if (k < 0 || !det || !Number.isFinite(t0) || !url.endsWith(".fits")) continue; // not a SPHEREx image row
    out.push({ uri: url.slice(k + "ibe/data/spherex/".length), mjd: Number.isFinite(t1) ? (t0 + t1) / 2 : t0, detector: `D${det}`,
      collection: (ic >= 0 ? f[ic] : "") || fallbackCollection });
  }
  return out;
}

/** Unique by uri, sorted by MJD. */
export function dedupeExposures(list: readonly Exposure[]): Exposure[] {
  const seen = new Map<string, Exposure>();
  for (const e of list) if (!seen.has(e.uri)) seen.set(e.uri, e);
  return [...seen.values()].sort((a, b) => a.mjd - b.mjd);
}

export interface CollectionStatus {
  collection: string;
  ok: boolean;
  n: number;
  ms: number;
  error?: string;
}

export interface ObservationsBody {
  ra: number;
  dec: number;
  radiusDeg: number;
  /** false when at least one collection failed: the list may be missing exposures (retry later or show a warning). */
  complete: boolean;
  count: number;
  collections: CollectionStatus[];
  exposures: Exposure[];
}

/** Shared default: at most 2 concurrent requests to IRSA. */
export const irsaLimiter = new Limiter(2);

/**
 * Pure request handler for a server route: GET ?ra=..&dec=..[&radius=deg]. Validates input (finite RA in [0, 360),
 * Dec in [-90, 90], radius in (0, 0.05] deg, default 0.001), queries the four collections (at most 2 at a time,
 * up to 4 retries each, `timeoutMs` per collection), and returns { status, body }: 200 with partial results if at least
 * one collection answered, 502 if none did, 400 on bad input.
 */
export async function handleObservationsRequest(params: URLSearchParams, fetchImpl: FetchLike = fetch,
  opts: { timeoutMs?: number; limiter?: Limiter } = {}): Promise<{ status: number; body: ObservationsBody | { error: string } }> {
  const num = (k: string) => { const v = params.get(k); return v === null || v.trim() === "" ? NaN : Number(v); };
  const ra = num("ra"), dec = num("dec");
  const radius = params.has("radius") ? num("radius") : DEFAULT_RADIUS_DEG;
  if (!Number.isFinite(ra) || ra < 0 || ra >= 360) return { status: 400, body: { error: "ra must be a number in [0, 360)" } };
  if (!Number.isFinite(dec) || dec < -90 || dec > 90) return { status: 400, body: { error: "dec must be a number in [-90, 90]" } };
  if (!Number.isFinite(radius) || radius <= 0) return { status: 400, body: { error: "radius must be a positive number (deg)" } };
  const radiusDeg = Math.min(radius, MAX_RADIUS_DEG);
  const timeoutMs = opts.timeoutMs ?? 30_000;
  const limiter = opts.limiter ?? irsaLimiter;

  const one = async (collection: string) => {
    const t0 = Date.now();
    const deadline = AbortSignal.timeout(timeoutMs);
    let error = "";
    // IRSA answers 502 intermittently (about 1 request in 6 on 2026-11-14, fast): retry after 1, 2, 4, 4 s
    for (let attempt = 0; attempt < 5 && !deadline.aborted; attempt++) {
      try {
        if (attempt > 0) await new Promise((r) => setTimeout(r, 1000 * Math.min(2 ** (attempt - 1), 4)));
        const text = await limiter.run(async () => {
          const r = await fetchImpl(siaUrl(collection, ra, dec, radiusDeg), { signal: deadline });
          const body = await r.text();
          if (!r.ok) throw new Error(`HTTP ${r.status}`);
          return body;
        }, deadline);
        const rows = parseSiaCsv(text, collection);
        return { status: { collection, ok: true, n: rows.length, ms: Date.now() - t0 }, rows };
      } catch (e) {
        error = deadline.aborted ? `timeout after ${timeoutMs} ms` : e instanceof Error ? e.message : String(e);
      }
    }
    return { status: { collection, ok: false, n: 0, ms: Date.now() - t0, error }, rows: [] as Exposure[] };
  };
  const res = await Promise.all(COLLECTIONS.map(one));
  const exposures = dedupeExposures(res.flatMap((r) => r.rows));
  const collections = res.map((r) => r.status);
  const status = collections.some((c) => c.ok) ? 200 : 502;
  return { status, body: { ra, dec, radiusDeg, complete: collections.every((c) => c.ok), count: exposures.length, collections, exposures } };
}
