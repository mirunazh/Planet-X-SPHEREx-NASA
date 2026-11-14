import { isInventoryPage, isSearchProgress, isPreviewProgress } from './types';

type Path = 'inventory' | 'health' | 'searches' | `searches/${string}` | `previews/${string}`;
const FILTERS = new Set(['ra', 'dec', 'size', 'mission', 'band', 'wave_min', 'wave_max', 'start', 'end', 'kind', 'refresh']);

export async function comparisonProxy(request: Request, path: Path): Promise<Response> {
  if (!/^(inventory|health|searches(?:\/[\w-]{1,100}(?:\/(?:results|previews))?)?|previews\/[a-f0-9]{64}(?:\/image)?)$/.test(path)) {
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
    try {
      const raw = await request.text();
      if (raw.length > 4096) throw new Error();
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
  } else if (path === 'inventory') {
    if ((upstream.searchParams.get('mission') ?? 'spherex') !== 'spherex') return Response.json({ detail: 'Only SPHEREx image discovery is supported.' }, { status: 400 });
    upstream.searchParams.set('mission', 'spherex');
  }
  try {
    const response = await fetch(upstream, {
      method: request.method, body, headers: body ? { 'Content-Type': 'application/json' } : undefined,
      signal: AbortSignal.any([request.signal, AbortSignal.timeout(10_000)]), cache: 'no-store', redirect: 'error',
    });
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
        : path.startsWith('previews/') || path.endsWith('/previews') ? isPreviewProgress(data) : path === 'health' ? !!data && typeof data === 'object' && 'ok' in data && typeof data.ok === 'boolean' : isSearchProgress(data));
    } catch { valid = false; }
    if (!valid) return Response.json({ detail: 'The image inventory service returned an invalid response. Retry the search.' }, { status: 502, headers: { 'Cache-Control': 'no-store' } });
    return new Response(raw, { status: response.status, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } });
  } catch (error) {
    const timedOut = error instanceof Error && error.name === 'TimeoutError';
    return Response.json({ detail: timedOut ? 'The inventory service request timed out. Retry; retained results remain available.'
      : 'The web app could not connect to the image inventory service. Check the service connection and retry.' },
    { status: timedOut ? 504 : 503, headers: { 'Cache-Control': 'no-store' } });
  }
}
