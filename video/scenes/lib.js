// Shared scene helpers. A scene is a pure function of time: window.setT(seconds) draws
// that exact instant. No timers, no Date, no performance.now, no Math.random.
import { byId, vars, FPS } from '../shots.mjs';

export const shot = byId[new URLSearchParams(location.search).get('shot')];
export { vars, FPS };
export const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
export const lerp = (a, b, k) => a + (b - a) * k;
export const ramp = (t, t0, t1) => clamp((t - t0) / (t1 - t0));
export const easeOut = (k) => 1 - Math.pow(1 - k, 3);
export const easeInOut = (k) => (k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2);

export function rng(seed) { // mulberry32, fixed seed => same sky every render
  let a = seed >>> 0;
  return () => { a = (a + 0x6d2b79f5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}

export function el(tag, attrs = {}, parent = document.body) {
  const e = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) k === 'text' ? (e.textContent = v) : k === 'html' ? (e.innerHTML = v) : e.setAttribute(k, v);
  parent.appendChild(e);
  return e;
}

// Standard caption from the shot list. Returns an updater for time t (seconds into the shot).
export function caption(text = shot.caption) {
  const wrap = el('div', { class: 'cap-wrap' });
  const cap = el('div', { class: 'cap', 'data-text': 'caption', text }, wrap);
  return (t) => { const k = easeOut(ramp(t, 0.02, 0.22)); cap.style.opacity = k; cap.style.transform = `translateY(${(1 - k) * 10}px)`; };
}

export function tag(text, dotColor) {
  const e = el('div', { class: 'tag', 'data-text': 'label' });
  e.innerHTML = `<i style="color:${dotColor || 'currentColor'}"></i>`;
  e.appendChild(document.createTextNode(text));
  return e;
}

// Real SPHEREx stack: raw little-endian float32, 121 x 121, NaN = no data.
export async function loadStack(url) {
  const buf = await (await fetch(url)).arrayBuffer();
  return new Float32Array(buf);
}
export function stretch(v, d) { // the manifest's own display formula
  if (!Number.isFinite(v)) return 0;
  const t = clamp((v - d.vmin) / (d.vmax - d.vmin));
  return Math.asinh(t / d.soft) / Math.asinh(1 / d.soft);
}

export function register(draw, ready = Promise.resolve()) {
  window.setT = (t) => { draw(t, Math.round(t * FPS)); };
  Promise.all([ready, document.fonts.ready]).then(() => { draw(0, 0); window.sceneReady = true; });
}

// ---- Text audit, run by the harness at sampled frames -------------------------------
const parse = (s) => { const m = s.match(/[\d.]+/g) || [0, 0, 0, 0]; return [+m[0], +m[1], +m[2], m[3] === undefined ? 1 : +m[3]]; };
const over = (top, base) => [0, 1, 2].map((i) => top[i] * top[3] + base[i] * (1 - top[3]));
const lum = (c) => { const f = (v) => { v /= 255; return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); }; return 0.2126 * f(c[0]) + 0.7152 * f(c[1]) + 0.0722 * f(c[2]); };
const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };

window.__audit = () => {
  const W = 1920, H = 1080, sx = W * 0.05, sy = H * 0.05;
  const out = [];
  for (const e of document.querySelectorAll('[data-text]')) {
    let op = 1, layers = [], base = null;
    for (let n = e; n && n.nodeType === 1; n = n.parentElement) {
      const cs = getComputedStyle(n);
      op *= +cs.opacity;
      if (cs.visibility === 'hidden' || cs.display === 'none') op = 0;
      const bg = parse(cs.backgroundColor);
      if (!base && bg[3] > 0) { if (bg[3] >= 1) base = bg.slice(0, 3); else layers.push(bg); }
    }
    if (!e.textContent.trim()) continue; // nothing typed yet
    if (op < 0.98) { out.push({ id: e.dataset.text, text: e.textContent, skipped: 'fading' }); continue; }
    const r = e.getBoundingClientRect();
    const range = document.createRange(); range.selectNodeContents(e); const tr = range.getBoundingClientRect();
    const fg = parse(getComputedStyle(e).color);
    // Unknown imagery behind a translucent pill: take the worse of pure white and pure black.
    const bases = base ? [base] : [[255, 255, 255], [0, 0, 0]];
    let worst = Infinity;
    for (const b0 of bases) { const bg = [...layers].reverse().reduce((acc, l) => over(l, acc), b0); worst = Math.min(worst, ratio(over(fg, bg), bg)); }
    const issues = [];
    if (r.left < sx - 0.5 || r.top < sy - 0.5 || r.right > W - sx + 0.5 || r.bottom > H - sy + 0.5) issues.push('outside title-safe');
    if (e.scrollWidth > e.clientWidth + 1 || e.scrollHeight > e.clientHeight + 1) issues.push('overflow');
    if (tr.left < r.left - 0.5 || tr.right > r.right + 0.5 || tr.top < r.top - 0.5 || tr.bottom > r.bottom + 0.5) issues.push('text outside its box');
    if (worst < 4.5) issues.push(`contrast ${worst.toFixed(2)}`);
    out.push({ id: e.dataset.text, text: e.textContent, contrast: +worst.toFixed(2), rect: [r.left, r.top, r.right, r.bottom].map(Math.round), issues });
  }
  return out;
};
