/**
 * Name → position via NED (NASA/IPAC Extragalactic Database), server-side.
 * Inputs are validated, results cached and requests rate-limited so the public
 * app never forwards unbounded traffic to NED (NED supports automated access
 * on a best-effort basis).
 */
import { NextResponse, type NextRequest } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const NED_LOOKUP = 'https://ned.ipac.caltech.edu/srs/ObjectLookup';
const NAME_PATTERN = /^[\p{L}\p{N} .,'+\-_()*:[\]/]{1,64}$/u;
const CACHE_TTL_MS = 24 * 60 * 60 * 1000;
const CACHE_MAX = 500;
const RATE_CAPACITY = 20; // requests
const RATE_REFILL_PER_SEC = 20 / 60; // 20 per minute per client

interface ResolveBody {
  ok: boolean;
  name?: string;
  ra?: number;
  dec?: number;
  objectType?: string | null;
  source?: 'NED';
  message?: string;
}

interface NedLookup {
  ResultCode?: number;
  Preferred?: { Name?: string; Position?: { RA?: number; Dec?: number }; ObjType?: { Value?: string } };
}

const cache = new Map<string, { at: number; status: number; body: ResolveBody }>();
const buckets = new Map<string, { tokens: number; at: number }>();

/** Key of the bucket every lookup also draws from: about one NED request per second in total. */
const ALL_CLIENTS = '*';
const GLOBAL_CAPACITY = 60;
const GLOBAL_REFILL_PER_SEC = 1;

function rateLimited(client: string, capacity = RATE_CAPACITY, refillPerSec = RATE_REFILL_PER_SEC): boolean {
  const now = Date.now();
  const b = buckets.get(client) ?? { tokens: capacity, at: now };
  b.tokens = Math.min(capacity, b.tokens + ((now - b.at) / 1000) * refillPerSec);
  b.at = now;
  const limited = b.tokens < 1;
  if (!limited) b.tokens -= 1;
  buckets.set(client, b);
  // Forget idle client buckets, never the shared one.
  if (buckets.size > 5000) for (const [k, v] of buckets) if (k !== ALL_CLIENTS && v.tokens >= RATE_CAPACITY - 1) buckets.delete(k);
  return limited;
}

function reply(body: ResolveBody, status: number) {
  return NextResponse.json(body, { status, headers: { 'Cache-Control': status === 200 ? 'public, max-age=86400' : 'no-store' } });
}

function remember(key: string, status: number, body: ResolveBody): void {
  if (cache.size >= CACHE_MAX) cache.delete(cache.keys().next().value as string);
  cache.set(key, { at: Date.now(), status, body });
}

export async function GET(req: NextRequest) {
  const name = (req.nextUrl.searchParams.get('name') ?? '').trim();
  if (!NAME_PATTERN.test(name)) {
    return reply({ ok: false, message: 'Enter an object name of 1 to 64 characters.' }, 400);
  }
  // Cached answers cost NED nothing, so they are served before any limit applies.
  const key = name.toLowerCase();
  const hit = cache.get(key);
  if (hit && Date.now() - hit.at < CACHE_TTL_MS) return reply(hit.body, hit.status);

  // Only used as an in-memory rate-limit key; never logged or stored. The right-most hop is the one
  // the nearest reverse proxy appended; the left-most is whatever the client chose to send. The
  // shared bucket caps NED traffic even when keys are spoofed.
  const hops = req.headers.get('x-forwarded-for')?.split(',').map((hop) => hop.trim()).filter(Boolean);
  const client = hops?.length ? hops[hops.length - 1] : 'local';
  if (rateLimited(client) || rateLimited(ALL_CLIENTS, GLOBAL_CAPACITY, GLOBAL_REFILL_PER_SEC)) {
    return reply({ ok: false, message: 'Too many lookups. Please wait a moment.' }, 429);
  }

  try {
    const res = await fetch(`${NED_LOOKUP}?name=${encodeURIComponent(name)}`, {
      signal: AbortSignal.timeout(6000),
      headers: { 'User-Agent': 'spherex-sky-navigator/0.1' },
      cache: 'no-store',
    });
    if (!res.ok) {
      console.error('[resolve] NED HTTP error', { status: res.status });
      return reply({ ok: false, message: 'NED is not responding right now.' }, 502);
    }
    const json = (await res.json()) as NedLookup;
    const pos = json.Preferred?.Position;
    let body: ResolveBody;
    let status: number;
    if (json.ResultCode === 3 && typeof pos?.RA === 'number' && typeof pos?.Dec === 'number' &&
      Number.isFinite(pos.RA) && Number.isFinite(pos.Dec) && pos.RA >= 0 && pos.RA < 360 && Math.abs(pos.Dec) <= 90) {
      const preferredName = json.Preferred?.Name;
      const objectType = json.Preferred?.ObjType?.Value;
      body = {
        ok: true, name: typeof preferredName === 'string' && preferredName.trim() ? preferredName.trim() : name,
        ra: pos.RA, dec: pos.Dec, objectType: typeof objectType === 'string' ? objectType : null, source: 'NED',
      };
      status = 200;
    } else if (json.ResultCode === 3) {
      return reply({ ok: false, message: 'NED returned an invalid position. Please try again.' }, 502);
    } else if (json.ResultCode === 1) {
      body = { ok: false, message: 'That name is ambiguous in NED. Please be more specific.' };
      status = 404;
    } else {
      body = { ok: false, message: 'Not found in NED. NED covers galaxies and other objects beyond the Milky Way.' };
      status = 404;
    }
    remember(key, status, body);
    return reply(body, status);
  } catch (err) {
    console.error('[resolve] NED lookup failed', { error: err instanceof Error ? err.message : String(err) });
    return reply({ ok: false, message: 'NED lookup timed out. Please try again.' }, 504);
  }
}
