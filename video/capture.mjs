// Frame-exact capture of a LIVE page (requestAnimationFrame, timers, CSS transitions).
//   node capture.mjs standin/actions.mjs [--out out/capture-standin.mp4] [--frames frames/capture-standin]
// Time is virtual: Playwright's page.clock fakes Date, timers and performance.now, and is
// paused; every frame we advance it by exactly 1/60 s, flush requestAnimationFrame once with
// that timestamp, seek all CSS/Web animations to it, draw the cursor, and take one screenshot.
// Actions (see standin/actions.mjs): wait, move (eased), click, type, press, zoom (on a region).
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { VIDEO, BASE, serve, launch, ff, X264, TO_YUV, mkdirp, rmrf } from './lib/common.mjs';

const argv = process.argv.slice(2);
const opt = (k, d) => { const i = argv.indexOf(k); return i >= 0 ? argv[i + 1] : d; };
const scriptPath = path.resolve(argv.find((a) => !a.startsWith('--') && !['--out', '--frames'].includes(argv[argv.indexOf(a) - 1])) || 'standin/actions.mjs');
const S = (await import(pathToFileURL(scriptPath))).default;
const name = path.basename(path.dirname(scriptPath)) === 'standin' ? 'capture-standin' : path.basename(scriptPath, '.mjs');
const OUT = path.resolve(opt('--out', path.join(VIDEO, 'out', `${name}.mp4`)));
const FRAMES = path.resolve(opt('--frames', path.join(VIDEO, 'frames', name)));
const FPS = 60, VW = S.viewport?.width ?? 1920, VH = S.viewport?.height ?? 1080, DSF = S.dsf ?? 2;
const START = new Date(S.startTime ?? '2026-11-15T12:00:00Z');

// Runs in the page before any of its own scripts, after the clock is installed.
const SHIM = () => {
  // The fake clock pins Date exactly, but its performance.now() origin can carry a real
  // millisecond or two from document creation (seen under CPU load). Derive it from Date.
  const d0 = Date.now();
  Object.defineProperty(performance, 'now', { configurable: true, value: () => Date.now() - d0 });
  let q = [], id = 0;
  window.requestAnimationFrame = (cb) => { q.push([++id, cb]); return id; };
  window.cancelAnimationFrame = (h) => { q = q.filter(([i]) => i !== h); };
  window.__vframe = (cur) => {
    const now = performance.now(), run = q; q = [];
    for (const [, cb] of run) { try { cb(now); } catch (e) { console.error(e); } }
    for (const a of document.getAnimations()) { // CSS transitions/animations follow virtual time
      if (a.__v0 === undefined) { a.pause(); a.__v0 = now; }
      a.currentTime = now - a.__v0;
    }
    let c = document.getElementById('__cursor');
    if (!c) {
      c = document.createElement('div'); c.id = '__cursor';
      c.innerHTML = '<svg width="34" height="40" viewBox="0 0 17 20"><path d="M1 1 L1 16 L5 12.4 L7.8 18.6 L10.4 17.4 L7.7 11.4 L13 11.4 Z" fill="#fff" stroke="#000" stroke-width="1.2" stroke-linejoin="round"/></svg><i></i>';
      c.style.cssText = 'position:fixed;left:0;top:0;z-index:2147483647;pointer-events:none;width:0;height:0';
      c.lastChild.style.cssText = 'position:absolute;left:-22px;top:-22px;width:44px;height:44px;border-radius:50%;border:3px solid #FF6A3D;opacity:0';
      c.firstChild.style.cssText = 'position:absolute;left:-2px;top:-2px;filter:drop-shadow(0 2px 3px rgba(0,0,0,.5))';
      document.documentElement.appendChild(c);
    }
    c.style.transform = `translate(${cur.x}px,${cur.y}px)`;
    c.firstChild.style.transform = `scale(${cur.down ? 0.88 : 1})`;
    const k = cur.ripple; // 0..1 after a click, -1 when idle
    c.lastChild.style.opacity = k < 0 ? 0 : (1 - k) * 0.9;
    c.lastChild.style.transform = `scale(${0.4 + k * 1.2})`;
  };
};

const server = S.url.startsWith(BASE) ? await serve() : null;
const browser = await launch();
const ctx = await browser.newContext({ viewport: { width: VW, height: VH }, deviceScaleFactor: DSF });
const page = await ctx.newPage();
page.on('pageerror', (e) => { console.error('page error:', e.message); process.exitCode = 1; });
await page.clock.install({ time: START });
await page.clock.pauseAt(START); // paused before the page exists: load time does not leak in
await page.addInitScript(SHIM);
await page.goto(S.url, { waitUntil: 'load' });
if (S.ready) await page.waitForSelector(S.ready);

rmrf(FRAMES); mkdirp(FRAMES);
let frame = 0, ms = 0;
const cur = { x: S.cursor?.[0] ?? VW * 0.55, y: S.cursor?.[1] ?? VH * 0.75, down: false, ripple: -1, clickAt: -1 };
let view = { x: 0, y: 0, w: VW, h: VH };
const ease = (k) => (k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2);

async function step() {
  const next = Math.round(((frame + 1) * 1000) / FPS); // integer ms, no drift: 16, 33, 50, 67 ...
  await page.clock.runFor(next - ms); ms = next;
  cur.ripple = cur.clickAt < 0 ? -1 : Math.min(1, (frame - cur.clickAt) / 24);
  if (cur.ripple >= 1) cur.clickAt = -1;
  await page.evaluate((c) => window.__vframe(c), cur);
  await page.screenshot({ path: path.join(FRAMES, String(frame).padStart(5, '0') + '.png'), clip: { ...view, width: view.w, height: view.h }, scale: 'device', caret: 'hide' });
  frame++;
}
const frames = (s) => Math.max(1, Math.round(s * FPS));
async function target(t) {
  if (Array.isArray(t)) return { x: t[0], y: t[1] };
  const b = await page.locator(t).boundingBox();
  if (!b) throw new Error(`no element for ${t}`);
  return { x: b.x + b.width / 2, y: b.y + b.height / 2, b };
}

for (const a of S.actions) {
  if (a.wait !== undefined) { for (let i = frames(a.wait); i--; ) await step(); continue; }
  if (a.move) {
    const p = await target(a.move), x0 = cur.x, y0 = cur.y, n = frames(a.dur ?? 0.6);
    for (let i = 1; i <= n; i++) { const k = ease(i / n); cur.x = x0 + (p.x - x0) * k; cur.y = y0 + (p.y - y0) * k; await page.mouse.move(cur.x, cur.y); await step(); }
    continue;
  }
  if (a.click) {
    if (typeof a.click === 'string' || Array.isArray(a.click)) { const p = await target(a.click); cur.x = p.x; cur.y = p.y; await page.mouse.move(cur.x, cur.y); }
    cur.down = true; await page.mouse.down(); cur.clickAt = frame; await step(); await step();
    cur.down = false; await page.mouse.up(); for (let i = frames(a.hold ?? 0.08); i--; ) await step();
    continue;
  }
  if (a.type !== undefined) { const per = frames(1 / (a.cps ?? 14)); for (const ch of a.type) { await page.keyboard.type(ch); for (let i = per; i--; ) await step(); } continue; }
  if (a.press) { await page.keyboard.press(a.press); await step(); continue; }
  if (a.zoom) { // animate the capture window onto a region, kept at the viewport's aspect ratio
    let r = a.zoom === 'reset' ? { x: 0, y: 0, w: VW, h: VH } : null;
    if (!r) {
      const z = a.zoom.selector ? (await target(a.zoom.selector)).b : { x: a.zoom.rect[0], y: a.zoom.rect[1], width: a.zoom.rect[2], height: a.zoom.rect[3] };
      const pad = a.zoom.pad ?? 40, cx = z.x + z.width / 2, cy = z.y + z.height / 2;
      let w = Math.max(z.width + 2 * pad, ((z.height + 2 * pad) * VW) / VH); w = Math.min(VW, w); const h = (w * VH) / VW;
      r = { x: Math.min(VW - w, Math.max(0, cx - w / 2)), y: Math.min(VH - h, Math.max(0, cy - h / 2)), w, h };
    }
    const v0 = { ...view }, n = frames(a.dur ?? 0.8);
    for (let i = 1; i <= n; i++) { const k = ease(i / n); view = Object.fromEntries(['x', 'y', 'w', 'h'].map((q) => [q, v0[q] + (r[q] - v0[q]) * k])); await step(); }
    continue;
  }
  throw new Error(`unknown action ${JSON.stringify(a)}`);
}
await browser.close(); server?.close();

// Frames differ in pixel size while zooming; ffmpeg rescales each one to 1920x1080.
mkdirp(path.dirname(OUT));
ff(['-framerate', String(FPS), '-i', path.join(FRAMES, '%05d.png'), '-vf', `scale=1920:1080:flags=lanczos,${TO_YUV}`, ...X264, '-an', '-movflags', '+faststart', OUT]);
console.log(`captured ${frame} frames (${(frame / FPS).toFixed(3)} s) -> ${path.relative(VIDEO, OUT)}`);
