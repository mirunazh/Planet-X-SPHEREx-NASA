// Shared bits for render.mjs, capture.mjs and test.mjs: a read-only static server,
// the browser launch, and ffmpeg helpers.
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

export const VIDEO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const ROOT = path.resolve(VIDEO, '..'); // repo root, served read-only (scenes read assets/missions)
export const PORT = 3200; // 3100 belongs to the app worker
export const BASE = `http://127.0.0.1:${PORT}`;

const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.mjs': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.woff2': 'font/woff2', '.png': 'image/png', '.svg': 'image/svg+xml' };

export function serve() {
  const server = http.createServer((req, res) => {
    const rel = decodeURIComponent(new URL(req.url, BASE).pathname);
    const file = path.join(ROOT, path.normalize(rel));
    if (req.method !== 'GET' || !file.startsWith(ROOT + path.sep)) { res.writeHead(403).end(); return; }
    fs.stat(file, (err, st) => {
      const f = !err && st.isDirectory() ? path.join(file, 'index.html') : file;
      fs.readFile(f, (e, buf) => {
        if (e) { res.writeHead(404).end(); return; }
        res.writeHead(200, { 'content-type': TYPES[path.extname(f)] || 'application/octet-stream', 'cache-control': 'no-store' });
        res.end(buf);
      });
    });
  });
  return new Promise((ok, fail) => server.once('error', fail).listen(PORT, '127.0.0.1', () => ok(server)));
}

export function launch() {
  return chromium.launch({
    args: ['--force-color-profile=srgb', '--font-render-hinting=none', '--disable-lcd-text', '--hide-scrollbars'],
  });
}

export function ff(args, { quiet = true } = {}) {
  const r = spawnSync('ffmpeg', ['-hide_banner', '-y', ...(quiet ? ['-loglevel', 'error'] : []), ...args], { encoding: 'utf8', maxBuffer: 1 << 26 });
  if (r.status !== 0) throw new Error(`ffmpeg failed: ${args.join(' ')}\n${r.stderr}`);
  return r.stderr;
}

// H.264 for upload: BT.709 tagged so players do not shift the colours, 60 fps CFR, faststart.
export const X264 = ['-c:v', 'libx264', '-preset', 'slow', '-crf', '16', '-r', '60',
  '-colorspace', 'bt709', '-color_primaries', 'bt709', '-color_trc', 'bt709', '-color_range', 'tv'];
export const TO_YUV = 'scale=out_color_matrix=bt709:out_range=tv:flags=lanczos,format=yuv420p';

export const mkdirp = (d) => fs.mkdirSync(d, { recursive: true });
export const rmrf = (d) => fs.rmSync(d, { recursive: true, force: true });
