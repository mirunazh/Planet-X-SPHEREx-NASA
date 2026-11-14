// Exercise the built Next.js HTTP handler without binding a port. Browser
// hydration/WebGL and live NASA availability are separate acceptance checks.
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { Socket } from 'node:net';
import { createRequire } from 'node:module';

process.env.NODE_ENV = 'production';
const require = createRequire(import.meta.url);
const next = require('next');
// Next's own request/response doubles retain the real production router,
// headers, static files and compiled route handlers, without a listening socket.
const { createRequestResponseMocks } = require('next/dist/server/lib/mock-request');
await readFile(new URL('../.next/BUILD_ID', import.meta.url)); // npm run build first
const app = next({ dev: false, dir: process.cwd(), hostname: 'localhost', port: 3000 });
const socket = new Socket(); // unconnected stream; never calls listen/connect
const originalFetch = globalThis.fetch;
let requests = 0;

try {
  await app.prepare();
  const upstreamCalls = new Map();
  globalThis.fetch = async (input) => {
    const url = new URL(String(input));
    assert.equal(`${url.origin}${url.pathname}`, 'https://ned.ipac.caltech.edu/srs/ObjectLookup');
    const name = url.searchParams.get('name');
    const count = (upstreamCalls.get(name) ?? 0) + 1;
    upstreamCalls.set(name, count);
    if (name === 'upstream' && count === 1) return new Response('', { status: 503 });
    if (name === 'malformed' && count === 1) return Response.json({ ResultCode: 3, Preferred: { Position: { RA: 360, Dec: 100 } } });
    if (name === 'ambiguous') return Response.json({ ResultCode: 1 });
    if (name === 'bad-label') return Response.json({ ResultCode: 3, Preferred: { Name: {}, Position: { RA: 10.68, Dec: 41.27 }, ObjType: { Value: [] } } });
    return Response.json({ ResultCode: 3, Preferred: { Name: 'M31', Position: { RA: 10.68, Dec: 41.27 } } });
  };

  async function request(url) {
    requests++;
    const chunks = [];
    const { req, res } = createRequestResponseMocks({
      url, socket, headers: { host: 'localhost:3000', 'x-forwarded-for': 'production-smoke' },
      maximumResponseBody: 8 * 1024 * 1024,
      resWriter: (chunk) => { chunks.push(Buffer.from(chunk)); return true; },
    });
    const finished = new Promise((resolve, reject) => { res.once('finish', resolve); res.once('error', reject); });
    await app.getRequestHandler()(req, res);
    await finished;
    return { status: res.statusCode, headers: res.getHeaders(), text: Buffer.concat(chunks).toString() };
  }

  const page = await request('/?ra=10.68479&dec=41.26907&mode=sky&fov=0.5&survey=spherex&f=46');
  assert.equal(page.status, 200);
  assert.match(page.text, /SPHEREx Sky Navigator/);
  assert.match(page.text, /Loading the infrared sky/);
  assert.match(page.headers['content-security-policy'], /connect-src 'self' https:\/\/irsa\.ipac\.caltech\.edu/);
  assert.equal(page.headers['x-content-type-options'], 'nosniff');
  assert.equal(page.headers['x-frame-options'], 'DENY');
  assert.equal(page.headers['x-powered-by'], undefined);
  const assets = new Set([...page.text.matchAll(/(?:src|href)="([^"?]+\.(?:js|css))(?:\?[^"]*)?"/g)].map((match) => match[1]));
  assert.ok(assets.size > 0, 'HTML should reference built JS/CSS');
  for (const path of assets) {
    const asset = await request(path);
    assert.equal(asset.status, 200, path);
    assert.ok(asset.text.length > 0, path);
  }
  console.log(`PASS: production page, ${assets.size} JS/CSS assets and security headers`);

  const hosts = JSON.parse((await request('/data/exoplanet-hosts.json')).text);
  const targets = JSON.parse((await request('/data/targets.json')).text);
  assert.ok(hosts.provenance.service && hosts.provenance.retrievedAt);
  assert.ok(hosts.hosts.length > 0);
  for (const pin of [...hosts.hosts, ...targets.targets]) {
    assert.ok(Number.isFinite(pin.ra) && pin.ra >= 0 && pin.ra < 360, pin.name);
    assert.ok(Number.isFinite(pin.dec) && Math.abs(pin.dec) <= 90, pin.name);
  }
  for (const id of ['m31', 'm101', 'spherex-deep-north', 'teegardens-star']) assert.ok(targets.targets.some((pin) => pin.id === id), id);
  console.log(`PASS: ${hosts.hosts.length} host positions, ${targets.targets.length} featured places and demo destinations`);

  assert.equal((await request('/api/resolve?name=%3Cinvalid%3E')).status, 400);
  assert.equal(upstreamCalls.size, 0);
  const lookup = await request('/api/resolve?name=M31');
  assert.equal(lookup.status, 200);
  assert.deepEqual(JSON.parse(lookup.text), { ok: true, name: 'M31', ra: 10.68, dec: 41.27, objectType: null, source: 'NED' });
  assert.equal((await request('/api/resolve?name=m31')).status, 200);
  assert.equal(upstreamCalls.get('M31'), 1);
  assert.equal(upstreamCalls.has('m31'), false);
  assert.equal((await request('/api/resolve?name=ambiguous')).status, 404);
  const label = await request('/api/resolve?name=bad-label');
  assert.equal(label.status, 200);
  assert.equal(JSON.parse(label.text).name, 'bad-label');
  assert.equal(JSON.parse(label.text).objectType, null);
  for (const name of ['upstream', 'malformed']) {
    const failure = await request(`/api/resolve?name=${name}`);
    assert.equal(failure.status, 502);
    assert.equal(failure.headers['cache-control'], 'no-store');
    assert.equal((await request(`/api/resolve?name=${name}`)).status, 200);
    assert.equal(upstreamCalls.get(name), 2);
  }
  assert.equal((await request('/missing-page')).status, 404);
  console.log(`PASS: compiled name lookup, validation, cache, errors/recovery and 404 (${requests} local HTTP requests total)`);
  console.log('External NED responses were simulated. No browser, live NASA check or FPS measurement was performed.');
} finally {
  globalThis.fetch = originalFetch;
  socket.destroy();
  await app.close();
}
