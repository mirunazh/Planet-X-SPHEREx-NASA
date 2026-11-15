import { isInventoryPage, isSearchProgress, isPreviewProgress, isWeeklyChallenge } from './types';

type Path = 'challenge' | `challenge/previews/${string}` | 'inventory' | 'health' | 'searches' | `searches/${string}` | `previews/${string}`;
const FILTERS = new Set(['ra', 'dec', 'size', 'mission', 'band', 'wave_min', 'wave_max', 'start', 'end', 'kind', 'refresh', 'nearby_radius']);
const MAX_BODY_BYTES = 4096;
/** New searches per minute, for one client and for everyone together: each one queries NASA's archive. */
const SEARCHES_PER_CLIENT = 6;
const SEARCHES_TOTAL = 40;
const WINDOW_MS = 60_000;

const searchTimes = new Map<string, number[]>();
let allSearchTimes: number[] = [];

/** The hop the nearest reverse proxy appended last; without one, every client shares a key. */
function clientKey(request: Request): string {
  const hops = request.headers.get('x-forwarded-for')?.split(',').map((hop) => hop.trim()).filter(Boolean);
  return hops?.length ? hops[hops.length - 1] : 'direct';
}

/** Sliding one-minute window; the total cap still holds when client keys are spoofed. */
export function allowSearch(request: Request, now = Date.now()): boolean {
  const cutoff = now - WINDOW_MS;
  allSearchTimes = allSearchTimes.filter((t) => t > cutoff);
  const key = clientKey(request);
  const mine = (searchTimes.get(key) ?? []).filter((t) => t > cutoff);
  const allowed = mine.length < SEARCHES_PER_CLIENT && allSearchTimes.length < SEARCHES_TOTAL;
  if (allowed) {
    mine.push(now);
    allSearchTimes.push(now);
  }
  searchTimes.set(key, mine);
  if (searchTimes.size > 5000) for (const [k, times] of searchTimes) if (!times.some((t) => t > cutoff)) searchTimes.delete(k);
  return allowed;
}

/** Reads at most `limit` bytes of the body; null when it is larger, without buffering the rest. */
async function readBody(request: Request, limit: number): Promise<string | null> {
  const declared = Number(request.headers.get('content-length'));
  if (Number.isFinite(declared) && declared > limit) return null;
  if (!request.body) return '';
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > limit) {
      await reader.cancel();
      return null;
    }
    chunks.push(value);
  }
  const all = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) {
    all.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return new TextDecoder().decode(all);
}

const isTimeout = (error: unknown) => error instanceof Error && error.name === 'TimeoutError';

export async function comparisonProxy(request: Request, path: Path): Promise<Response> {
  if (!/^(challenge(?:\/previews\/[a-f0-9]{64}(?:\/image)?)?|inventory|health|searches(?:\/[\w-]{1,100}(?:\/(?:results|previews))?)?|previews\/[a-f0-9]{64}(?:\/image)?)$/.test(path)) {
    return Response.json({ detail: 'Invalid search identifier.' }, { status: 400 });
  }
  const incoming = new URL(request.url);
  const upstream = new URL(`/${path}`, process.env.COMPARISON_SERVICE_URL ?? 'http://127.0.0.1:8000');
  const allowed = path.endsWith('/results') ? new Set(['version', 'cursor']) : path === 'inventory' ? FILTERS : new Set<string>();
  for (const [key, value] of incoming.searchParams) {
    if (!allowed.has(key) || value.length > 200) return Response.json({ detail: 'Invalid comparison query.' }, { status: 400 });
    upstream.searchParams.set(key, value);
  }
  let body: string | undefined;
  if (request.method === 'POST' && (path === 'searches' || path.endsWith('/previews'))) {
    // Only this site's own pages may start archive work: browsers mark cross-site requests, and a
    // JSON content type cannot be sent cross-site without a preflight that this route never allows.
    const site = request.headers.get('sec-fetch-site');
    if (site && site !== 'same-origin' && site !== 'none') return Response.json({ detail: 'Cross-site requests are not allowed.' }, { status: 403 });
    if (!request.headers.get('content-type')?.toLowerCase().startsWith('application/json')) {
      return Response.json({ detail: 'Send the search as JSON.' }, { status: 415 });
    }
    try {
      const raw = await readBody(request, MAX_BODY_BYTES);
      if (raw === null) return Response.json({ detail: 'Comparison request too large.' }, { status: 413 });
      const data: unknown = JSON.parse(raw);
      if (!data || typeof data !== 'object' || Array.isArray(data) || Object.keys(data).some((key) => !(path === 'searches' ? FILTERS : new Set(['version', 'productId', 'retry'])).has(key))) throw new Error();
      const values = data as Record<string, unknown>;
      if (values.mission !== undefined && values.mission !== 'spherex') {
        return Response.json({ detail: 'Only SPHEREx image discovery is supported.' }, { status: 400 });
      }
      body = JSON.stringify(path === 'searches' ? { ...values, mission: 'spherex' } : values);
    } catch {
      return Response.json({ detail: 'Invalid comparison search.' }, { status: 400 });
    }
    if (path === 'searches' && !allowSearch(request)) {
      return Response.json({ detail: 'Too many new searches right now. Wait a minute, then retry.' },
        { status: 429, headers: { 'Retry-After': '60', 'Cache-Control': 'no-store' } });
    }
  } else if (path === 'inventory') {
    if ((upstream.searchParams.get('mission') ?? 'spherex') !== 'spherex') return Response.json({ detail: 'Only SPHEREx image discovery is supported.' }, { status: 400 });
    upstream.searchParams.set('mission', 'spherex');
  }
  const send = () => fetch(upstream, {
    method: request.method, body, headers: body ? { 'Content-Type': 'application/json' } : undefined,
    signal: AbortSignal.any([request.signal, AbortSignal.timeout(10_000)]), cache: 'no-store', redirect: 'error',
  });
  try {
    let response: Response;
    try {
      response = await send();
    } catch (error) {
      // A reused keep-alive socket can be closed by the service just as a request goes out; a read
      // is safe to repeat once. Timeouts and the visitor's own cancellations are not retried.
      if (request.method !== 'GET' || request.signal.aborted || isTimeout(error)) throw error;
      response = await send();
    }
    if (path.endsWith('/image') && response.ok) {
      if (!response.headers.get('content-type')?.includes('image/png')) return Response.json({ detail: 'Invalid image preview.' }, { status: 502 });
      const png = await response.arrayBuffer();
      const signature = new Uint8Array(png, 0, Math.min(png.byteLength, 8));
      if (png.byteLength > 2 * 1024 * 1024 || signature.length !== 8 || ![137, 80, 78, 71, 13, 10, 26, 10].every((v, i) => signature[i] === v)) {
        return Response.json({ detail: 'Invalid image preview.' }, { status: 502 });
      }
      return new Response(png, { headers: { 'Content-Type': 'image/png', 'Cache-Control': 'private, max-age=86400, immutable', 'X-Content-Type-Options': 'nosniff' } });
    }
    const raw = await response.text();
    let valid = response.headers.get('content-type')?.includes('application/json') ?? false;
    try {
      const data: unknown = JSON.parse(raw);
      if (response.ok) valid = valid && (path.endsWith('/results') || path === 'inventory' ? isInventoryPage(data)
        : path === 'challenge' ? isWeeklyChallenge(data) : path.startsWith('challenge/previews/') || path.startsWith('previews/') || path.endsWith('/previews') ? isPreviewProgress(data) : path === 'health' ? !!data && typeof data === 'object' && 'ok' in data && typeof data.ok === 'boolean' : isSearchProgress(data));
    } catch { valid = false; }
    if (!valid) return Response.json({ detail: 'The image inventory service returned an invalid response. Retry the search.' }, { status: 502, headers: { 'Cache-Control': 'no-store' } });
    return new Response(raw, { status: response.status, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } });
  } catch (error) {
    const timedOut = isTimeout(error);
    return Response.json({ detail: timedOut
      ? 'The photo search took too long to answer, usually because NASA’s archive is slow. Retry in a minute; photos already found stay available.'
      : 'The photo search service is not reachable right now. Retry in a minute, or open the weekly challenge, which uses photos prepared in advance.' },
    { status: timedOut ? 504 : 503, headers: { 'Cache-Control': 'no-store' } });
  }
}
