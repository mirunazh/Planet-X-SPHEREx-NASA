// Skyblink, direction E "Workbook". Vanilla JS, no build step, no network beyond this repository.
const ROOT = '/assets/missions/';
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const qp = new URLSearchParams(location.search);
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches || qp.get('still') === '1';
const css = getComputedStyle(document.documentElement);
const tok = n => css.getPropertyValue(n).trim();

// ---------- words (Romanian is required on S1 and the shell) ----------
const STR = {
  en: { skip: 'Skip to the sky picture', s1Title: 'Find the next Tombaugh.', s1Lead: 'Two real infrared photos of one patch of sky, taken 17 months apart by NASA’s SPHEREx telescope. Hold the button and watch one star jump.', s1Go: 'Start mission 1', s1Time: 'About 3 minutes', s1Else: 'Look at any spot in the sky', hold: 'Hold to blink', then: 'Then', now: 'Now', segLabel: 'Show the photo from', holdHint: 'Press and hold, or hold the Space bar.', legend: 'Colour shows brightness, not real colour. A real photo, only enlarged and coloured.', foot1: 'An independent student project for the 2026 NASA Space Apps Challenge; not made, reviewed or endorsed by NASA.', foot2: 'Images: NASA/JPL-Caltech, SPHEREx, via NASA/IPAC IRSA.', photoOf: 'Infrared photo of the sky around Epsilon Indi B', to: 'to' },
  ro: { skip: 'Sari la imaginea cerului', s1Title: 'Găsește următorul Tombaugh.', s1Lead: 'Două fotografii infraroșii reale ale aceluiași colț de cer, făcute la 17 luni distanță de telescopul SPHEREx al NASA. Ține apăsat butonul și o stea sare.', s1Go: 'Începe misiunea 1', s1Time: 'Cam 3 minute', s1Else: 'Privește orice colț al cerului', hold: 'Ține apăsat', then: 'Atunci', now: 'Acum', segLabel: 'Arată fotografia din', holdHint: 'Ține apăsat butonul sau bara de spațiu.', legend: 'Culoarea arată strălucirea, nu culoarea reală. O fotografie reală, doar mărită și colorată.', foot1: 'Un proiect independent al unor elevi și studenți pentru NASA Space Apps Challenge 2026; nu este realizat, verificat sau susținut de NASA.', foot2: 'Imagini: NASA/JPL-Caltech, SPHEREx, prin NASA/IPAC IRSA.', photoOf: 'Fotografie în infraroșu a cerului din jurul stelei Epsilon Indi B', to: 'până în' },
};
let lang = qp.get('lang') === 'ro' ? 'ro' : 'en';
const t = k => STR[lang][k] ?? STR.en[k];
const mjdDate = mjd => new Date((mjd - 40587) * 864e5);
const monthYear = (mjd, opt = { month: 'long', year: 'numeric' }) => new Intl.DateTimeFormat(lang === 'ro' ? 'ro-RO' : 'en-GB', { ...opt, timeZone: 'UTC' }).format(mjdDate(mjd));
const passLabel = p => {
  const a = mjdDate(p.mjdStart), b = mjdDate(p.mjdEnd);
  if (lang === 'en') return p.label.replace(' to ', ' to ');
  const m = d => new Intl.DateTimeFormat('ro-RO', { month: 'long', timeZone: 'UTC' }).format(d);
  return a.getUTCMonth() === b.getUTCMonth() ? `${m(a)} ${a.getUTCFullYear()}` : `${m(a)} ${t('to')} ${m(b)} ${b.getUTCFullYear()}`;
};
const live = msg => { $('#live').textContent = ''; requestAnimationFrame(() => { $('#live').textContent = msg; }); };
const f32 = async url => new Float32Array(await (await fetch(url)).arrayBuffer());

// ---------- colour lookup tables, built from the CSS tokens ----------
const hex = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));
function lut(stops) { // stops: [[pos, '#hex'], ...] -> Uint8Array(256*3)
  const out = new Uint8Array(768), cs = stops.map(([p, h]) => [p, hex(h)]);
  for (let i = 0; i < 256; i++) {
    const v = i / 255; let k = 0; while (k < cs.length - 2 && v > cs[k + 1][0]) k++;
    const [p0, c0] = cs[k], [p1, c1] = cs[k + 1], f = Math.min(1, Math.max(0, (v - p0) / (p1 - p0)));
    for (let j = 0; j < 3; j++) out[i * 3 + j] = Math.round(c0[j] + (c1[j] - c0[j]) * f);
  }
  return out;
}
const RAMP = lut([[0, tok('--ramp-0')], [0.22, tok('--ramp-0')], [0.31, tok('--ramp-1')], [0.43, tok('--ramp-2')], [0.62, tok('--ramp-3')], [0.82, tok('--ramp-4')], [1, tok('--ramp-5')]]);
const DIV = lut([[0, tok('--div-neg')], [0.5, tok('--div-mid')], [1, tok('--div-pos')]]);

// Catmull-Rom bicubic sample of a 121 x 121 float frame; pixel centres sit on integers.
function sample(d, x, y) {
  const xi = Math.floor(x), yi = Math.floor(y), fx = x - xi, fy = y - yi;
  const w = f => [((-0.5 * f + 1) * f - 0.5) * f, (1.5 * f - 2.5) * f * f + 1, ((-1.5 * f + 2) * f + 0.5) * f, (0.5 * f - 0.5) * f * f];
  const wx = w(fx), wy = w(fy); let s = 0;
  for (let j = 0; j < 4; j++) { const Y = Math.min(120, Math.max(0, yi - 1 + j)); let r = 0;
    for (let i = 0; i < 4; i++) { const X = Math.min(120, Math.max(0, xi - 1 + i)); const v = d[Y * 121 + X]; r += wx[i] * (Number.isFinite(v) ? v : 0); }
    s += wy[j] * r; }
  return s;
}

// ---------- the eyepiece component ----------
class Eyepiece {
  constructor(fig) {
    this.fig = fig; this.disc = $('.ep-disc', fig); this.cv = $('.ep-cv', fig); this.svg = $('.ep-marks', fig);
    this.cache = new Map(); this.i = 0; this.real = false; this.mode = 'frame';
  }
  setData(frames, disp) { this.frames = frames; this.disp = disp; this.cache.clear(); }
  get x0() { return this.cx - this.n / 2; } get y0() { return this.cy - this.n / 2; }
  px(x, y) { const s = this.size / this.n; return [(x - this.x0) * s, (y - this.y0) * s]; }   // data px -> screen px
  data(u, v) { const s = this.size / this.n; return [u / s + this.x0, v / s + this.y0]; }
  layout() {
    const css = this.disc.clientWidth; if (!css) return false;
    const crop = (css < 400 && this.fig.dataset.cropPhone) || this.fig.dataset.crop; // phone: a tighter crop keeps the jump visible
    if (crop !== this.crop) { this.crop = crop; [this.cx, this.cy, this.n] = crop.split(',').map(Number); this.cache.clear(); }
    const dpr = Math.min(2, devicePixelRatio || 1), B = Math.min(1000, Math.round(css * dpr));
    if (B !== this.B) { this.B = B; this.cache.clear(); this.cv.width = this.cv.height = B; }
    this.size = css; this.svg.setAttribute('viewBox', `0 0 ${css} ${css}`);
    return true;
  }
  image(key, valueAt, table) {
    const k = `${key}|${this.real}|${this.B}`; if (this.cache.has(k)) return this.cache.get(k);
    const B = this.B, img = new ImageData(B, B), s = B / this.n;
    for (let oy = 0; oy < B; oy++) for (let ox = 0; ox < B; ox++) {
      const x = this.x0 + (ox + 0.5) / s, y = this.y0 + (oy + 0.5) / s; // continuous coords, pixel centres on integers
      const idx = valueAt(x, y), o = (oy * B + ox) * 4;
      img.data[o] = table[idx * 3]; img.data[o + 1] = table[idx * 3 + 1]; img.data[o + 2] = table[idx * 3 + 2]; img.data[o + 3] = 255;
    }
    this.cache.set(k, img); return img;
  }
  stretch(v) { const d = this.disp, tt = Math.min(1, Math.max(0, (v - d.vmin) / (d.vmax - d.vmin))); return Math.round(255 * Math.asinh(tt / d.soft) / Math.asinh(1 / d.soft)); }
  read(d, x, y) { return this.real ? d[Math.min(120, Math.max(0, Math.round(y))) * 121 + Math.min(120, Math.max(0, Math.round(x)))] : sample(d, x, y); }
  show(i = this.i) {
    if (!this.frames || !this.layout()) return;
    this.i = i; let img;
    if (this.mode === 'diff') {
      const a = this.frames.at(-1), b = this.frames[0], k = this.disp.vmax * 0.06;
      img = this.image('diff', (x, y) => { const v = this.read(a, x, y) - this.read(b, x, y); return Math.round(127.5 + 127.5 * Math.asinh(v / k) / Math.asinh(this.disp.vmax / 2 / k) ); }, DIV);
    } else {
      const d = this.frames[i]; img = this.image(i, (x, y) => this.stretch(this.read(d, x, y)), RAMP);
    }
    this.cv.getContext('2d').putImageData(img, 0, 0);
  }
  marks(html) { this.svg.innerHTML = html; }
}

// pencil loop around (cx, cy) in screen px: a little over one turn, slightly wobbly, like a hand-drawn ring
function pencilPath(cx, cy, r, seed = 1) {
  const N = 72, turns = 1.14; let d = '';
  for (let k = 0; k <= N * turns; k++) {
    const a = -2.2 + (k / N) * 2 * Math.PI, f = k / (N * turns);
    const rr = r * (1 + 0.045 * Math.sin(3 * a + seed) + 0.07 * f) ;
    d += `${k ? 'L' : 'M'}${(cx + rr * Math.cos(a) * 1.04).toFixed(1)} ${(cy + rr * Math.sin(a) * 0.96).toFixed(1)}`;
  }
  return d;
}
const ring = (cx, cy, r, cls = '', seed) => `<path class="mk-halo" d="${pencilPath(cx, cy, r, seed)}"/><path class="mk-pencil ${cls}" data-draw d="${pencilPath(cx, cy, r, seed)}"/>`;
function drawIn(svg, ms = 700) {
  $$('[data-draw]', svg).forEach((p, k) => {
    const L = p.getTotalLength(); const halo = p.previousElementSibling?.classList.contains('mk-halo') ? p.previousElementSibling : null;
    [p, halo].forEach(el => { if (!el) return; el.style.strokeDasharray = L; if (!reduce) el.animate([{ strokeDashoffset: L }, { strokeDashoffset: 0 }], { duration: ms, delay: k * 120, easing: 'cubic-bezier(0.77, 0, 0.175, 1)', fill: 'both' }); });
  });
}
function countUp(el, to, dp = 1, ms = 650) {
  el.classList.add('on');
  if (reduce) { el.textContent = to.toFixed(dp); return; }
  const t0 = performance.now();
  const step = now => { const f = Math.min(1, (now - t0) / ms), e = 1 - Math.pow(1 - f, 3); el.textContent = (to * e).toFixed(dp); if (f < 1) requestAnimationFrame(step); };
  requestAnimationFrame(step);
}

// ---------- the blink control ----------
const blinks = [];
function wireBlink(root, ep, P, onFirstHold) {
  const hold = $('[data-hold]', root), segs = $$('[data-show]', root), screen = root.closest('.screen');
  const B = { base: 'then', held: false, ep, screen, stopAuto: () => {} };
  const set = state => {
    ep.show(state === 'now' ? P.length - 1 : 0);
    const p = P[state === 'now' ? P.length - 1 : 0];
    $$('[data-epoch-word]', screen).forEach(el => { el.textContent = t(state); });
    $$('[data-epoch-date]', screen).forEach(el => { el.textContent = passLabel(p); });
    ep.cv.setAttribute('aria-label', `${t('photoOf')}: ${t(state).toLowerCase()}, ${passLabel(p)}.`);
    B.state = state;
  };
  const press = () => { if (B.held) return; B.held = true; B.stopAuto(); hold.setAttribute('data-held', ''); set(B.base === 'then' ? 'now' : 'then'); onFirstHold?.(); };
  const release = () => { if (!B.held) return; B.held = false; hold.removeAttribute('data-held'); set(B.base); };
  hold.addEventListener('pointerdown', e => { e.preventDefault(); hold.setPointerCapture(e.pointerId); hold.focus({ preventScroll: true }); press(); });
  ['pointerup', 'pointercancel', 'lostpointercapture'].forEach(n => hold.addEventListener(n, release));
  hold.addEventListener('contextmenu', e => e.preventDefault());
  hold.addEventListener('keydown', e => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); if (!e.repeat) press(); } });
  hold.addEventListener('keyup', e => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); release(); } });
  segs.forEach(b => b.addEventListener('click', () => { B.stopAuto(); B.base = b.dataset.show; segs.forEach(s => s.setAttribute('aria-pressed', s === b)); set(B.base); live(`${t(B.base)}, ${passLabel(P[B.base === 'now' ? P.length - 1 : 0])}`); }));
  B.set = set; B.press = press; B.release = release; blinks.push(B);
  return B;
}
// Space anywhere on a screen with a blink control (unless typing or on another control) holds the blink
document.addEventListener('keydown', e => {
  if (e.key !== ' ' || e.repeat) return;
  const a = document.activeElement; if (a && (a.matches('input, textarea, button, a, summary, [role="application"]'))) return;
  const B = blinks.find(b => !b.screen.hidden); if (B) { e.preventDefault(); B.press(); }
});
document.addEventListener('keyup', e => { if (e.key === ' ') blinks.forEach(b => b.release()); });

// ---------- language ----------
function applyLang() {
  document.documentElement.lang = lang;
  $$('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });
  $$('[data-i18n-label]').forEach(el => el.setAttribute('aria-label', t(el.dataset.i18nLabel)));
  $$('[data-lang]').forEach(a => a.dataset.lang === lang ? a.setAttribute('aria-current', 'true') : a.removeAttribute('aria-current'));
  blinks.forEach(b => b.set && b.set(b.state || 'then'));
}
$$('[data-lang]').forEach(a => a.addEventListener('click', e => { e.preventDefault(); lang = a.dataset.lang; const u = new URL(location); u.searchParams.set('lang', lang); history.replaceState(null, '', u); applyLang(); }));

// ---------- routes ----------
const EPS = {};
function route() {
  const r = location.hash.replace(/^#/, '').split('?')[0] || '/';
  let hit = null;
  $$('.screen').forEach(s => { const on = s.dataset.route === r; s.hidden = !on; if (on) hit = s; });
  if (!hit) { hit = $('.screen'); hit.hidden = false; }
  document.body.dataset.route = hit.dataset.route;
  document.title = `${$('h1', hit).textContent} | Skyblink`;
  Object.values(EPS).forEach(ep => { if (!ep.fig.closest('.screen').hidden) ep.show(); });
  redrawMarks();
  if (r !== '/') blinks.forEach(b => b.stopAuto());
}
addEventListener('hashchange', () => { route(); scrollTo(0, 0); });
let rz; addEventListener('resize', () => { clearTimeout(rz); rz = setTimeout(() => { Object.values(EPS).forEach(ep => ep.show()); redrawMarks(); }, 120); });
const markers = [];
function redrawMarks() { markers.forEach(f => f()); }

// ---------- S1 ----------
function s1(P) {
  const ep = EPS.s1, a = P[0].measured, b = P.at(-1).measured;
  const B = wireBlink($('.s1 .blink'), ep, P);
  const circle = () => { const [x1, y1] = ep.px(a.x, a.y), [x2, y2] = ep.px(b.x, b.y), r = Math.max(30, ep.size * 0.092); ep.marks(ring((x1 + x2) / 2, (y1 + y2) / 2, r, '', 1.3)); };
  markers.push(() => { if (ep.size) circle(); });
  B.set('then');
  if (reduce || document.body.dataset.route !== '/') { circle(); return; }
  // the one orchestrated moment: iris opens, it blinks once, the pencil circles the star that moved
  ep.disc.classList.add('iris');
  const timers = [];
  const at = (ms, f) => timers.push(setTimeout(f, ms));
  at(1000, () => B.set('now'));
  at(1550, () => B.set('then'));
  at(1800, () => { circle(); drawIn(ep.svg, 800); });
  let auto;
  at(3200, () => { if (qp.get('play') === '0') return; let on = false; auto = setInterval(() => { on = !on; B.set(on ? 'now' : 'then'); }, 1200); }); // 0.8 flips a second, far under 3 flashes
  B.stopAuto = () => { timers.forEach(clearTimeout); clearInterval(auto); ep.disc.classList.remove('iris'); if (!$('[data-draw]', ep.svg)) circle(); };
}

// ---------- S2: spot it ----------
function peaks(ep, d) { // local maxima inside the crop, brighter than the faint background
  const out = [], x0 = Math.ceil(ep.x0), y0 = Math.ceil(ep.y0), x1 = Math.floor(ep.x0 + ep.n), y1 = Math.floor(ep.y0 + ep.n);
  for (let y = y0 + 1; y < y1 - 1; y++) for (let x = x0 + 1; x < x1 - 1; x++) {
    const v = d[y * 121 + x]; if (!(ep.stretch(v) > 120)) continue;
    let top = true; for (let j = -2; j <= 2 && top; j++) for (let i = -2; i <= 2; i++) if ((i || j) && d[(y + j) * 121 + x + i] > v) { top = false; break; }
    if (top) out.push({ x, y, v });
  }
  return out;
}
function s2(P, M) {
  const ep = EPS.s2, a = P[0].measured, b = P.at(-1).measured, scr = ep.fig.closest('.screen');
  const B = wireBlink($('.blink', scr), ep, P); B.set('then');
  const stars = peaks(ep, ep.frames.at(-1));
  const fb = $('[data-feedback="s2"]'), next = $('[data-next="s2"]');
  const st = { cross: null, done: false, miss: null };
  const ICON = { ok: '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10" class="fill"/><path d="m7 12.5 3.2 3.2L17 9" stroke="#0B1026" stroke-width="2.6"/></svg>', hint: '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 11v6"/><circle cx="12" cy="7.5" r="1.3" class="fill"/></svg>' };
  const say = (kind, title, text) => { fb.hidden = false; fb.dataset.kind = kind; fb.innerHTML = `${ICON[kind]}<p><b>${title}</b>${text}</p>`; live(`${title} ${text}`); };
  const draw = () => {
    if (!ep.size) return;
    let s = '';
    const [x1, y1] = ep.px(a.x, a.y), [x2, y2] = ep.px(b.x, b.y), r = Math.max(30, ep.size * 0.092);
    if (st.miss) { const [u, v] = ep.px(st.miss.x, st.miss.y); s += `<path class="mk-halo" d="M${u - 9} ${v - 9}L${u + 9} ${v + 9}M${u + 9} ${v - 9}L${u - 9} ${v + 9}"/><path class="mk-pencil" d="M${u - 9} ${v - 9}L${u + 9} ${v + 9}M${u + 9} ${v - 9}L${u - 9} ${v + 9}"/>`; }
    if (st.done) s += ring((x1 + x2) / 2, (y1 + y2) / 2, r, '', 2.1);
    if (st.cross) { const [u, v] = ep.px(st.cross.x, st.cross.y); s += `<g class="mk-cross"><path d="M${u - 22} ${v}h14M${u + 8} ${v}h14M${u} ${v - 22}v14M${u} ${v + 8}v14"/></g>`; }
    ep.marks(s);
  };
  markers.push(draw);
  const solve = credited => {
    st.done = true; st.miss = null; draw(); drawIn(ep.svg, 700);
    const months = (P.at(-1).mjdMid - P[0].mjdMid) / 30.44;
    countUp($('[data-blank="s2-arc"]'), M.truth.motionArcsec.total, 1); countUp($('[data-blank="s2-mo"]'), months, 0);
    say(credited ? 'ok' : 'hint', credited ? 'Yes, that one.' : 'Here it is.', ` It slid ${M.truth.motionArcsec.total.toFixed(1)} arcseconds in ${Math.round(months)} months. The other dots stayed put: they are much farther away.`);
    next.removeAttribute('aria-disabled');
  };
  const pick = (x, y) => {
    if (st.done) return;
    let best = null, bd = 1e9; stars.forEach(s => { const dd = Math.hypot(s.x - x, s.y - y); if (dd < bd) { bd = dd; best = s; } });
    const target = Math.hypot(b.x - x, b.y - y) < 3.2 || Math.hypot(a.x - x, a.y - y) < 3.2;
    if (target) return solve(true);
    st.miss = { x, y }; draw();
    if (best && bd < 3) say('hint', 'That one stays put.', ' Hold the button and watch it: it does not jump. Look for the brightest dot, a little left of the middle.');
    else say('hint', 'No star there.', ' Tap right on a dot. Hold the button first and watch which one jumps.');
  };
  ep.disc.addEventListener('click', e => { const r = ep.disc.getBoundingClientRect(); const [x, y] = ep.data(e.clientX - r.left, e.clientY - r.top); pick(x, y); });
  ep.disc.addEventListener('keydown', e => {
    const k = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] }[e.key];
    if (k) { e.preventDefault(); st.cross ??= { x: ep.cx, y: ep.cy }; st.cross.x += k[0]; st.cross.y += k[1]; draw(); }
    if (e.key === 'Enter' && st.cross) { e.preventDefault(); pick(st.cross.x, st.cross.y); }
    if (e.key === ' ') { e.preventDefault(); if (!e.repeat) B.press(); }
  });
  ep.disc.addEventListener('keyup', e => { if (e.key === ' ') B.release(); });
  ep.disc.setAttribute('aria-label', 'Sky picture. Arrow keys move the crosshair, Enter marks the dot under it, Space blinks.');
  $('[data-showme="s2"]').addEventListener('click', () => solve(false));
  $('[data-realpx="ep-s2"]').addEventListener('click', e => { const on = e.currentTarget.getAttribute('aria-pressed') !== 'true'; e.currentTarget.setAttribute('aria-pressed', on); ep.real = on; ep.show(); });
  window.SB.s2 = { pick: () => pick(b.x, b.y), miss: () => pick(stars.find(s => Math.hypot(s.x - b.x, s.y - b.y) > 6)?.x ?? ep.cx, stars.find(s => Math.hypot(s.x - b.x, s.y - b.y) > 6)?.y ?? ep.cy) };
}

// ---------- S3: measure it ----------
function s3(P) {
  const ep = EPS.s3, a = P[0].measured, b = P.at(-1).measured;
  ep.i = P.length - 1;
  const draw = () => {
    if (!ep.size) return;
    const [x1, y1] = ep.px(a.x, a.y), [x2, y2] = ep.px(b.x, b.y), s = ep.size / ep.n, r = 7;
    const bar = 10 / 3 * s, bx = ep.size * 0.30, by = ep.size * 0.80, ang = Math.atan2(y2 - y1, x2 - x1), ah = (k) => `${x2 - 13 * Math.cos(ang + k)} ${y2 - 13 * Math.sin(ang + k)}`;
    ep.marks(`<circle class="mk-halo" cx="${x1}" cy="${y1}" r="${r}"/><circle class="mk-pencil mk-dash" cx="${x1}" cy="${y1}" r="${r}"/>
      <path class="mk-halo" d="M${x1} ${y1}L${x2} ${y2}M${ah(0.5)}L${x2} ${y2}L${ah(-0.5)}"/><path class="mk-pencil" data-draw d="M${x1} ${y1}L${x2} ${y2}M${ah(0.5)}L${x2} ${y2}L${ah(-0.5)}"/>
      <circle class="mk-halo" cx="${x2}" cy="${y2}" r="${r}"/><circle class="mk-pencil" cx="${x2}" cy="${y2}" r="${r}"/>
      <path class="mk-halo" d="M${x1 - 30} ${y1 - 30}L${x1 - 12} ${y1 - 12}M${x2 + 30} ${y2 + 30}L${x2 + 12} ${y2 + 12}"/><path class="mk-pencil" d="M${x1 - 30} ${y1 - 30}L${x1 - 12} ${y1 - 12}M${x2 + 30} ${y2 + 30}L${x2 + 12} ${y2 + 12}"/>
      <text class="mk-label" x="${x1 - 34}" y="${y1 - 34}" text-anchor="end">then</text><text class="mk-label" x="${x2 + 34}" y="${y2 + 46}">now</text>
      <path class="mk-halo" d="M${bx} ${by}h${bar}M${bx} ${by - 6}v12M${bx + bar} ${by - 6}v12"/><path class="mk-pencil" d="M${bx} ${by}h${bar}M${bx} ${by - 6}v12M${bx + bar} ${by - 6}v12"/>
      <text class="mk-label" x="${bx}" y="${by + 24}">10 arcseconds</text>`);
  };
  markers.push(draw);
  const btn = $('[data-diff]');
  btn.addEventListener('click', () => { const on = btn.getAttribute('aria-pressed') !== 'true'; btn.setAttribute('aria-pressed', on); ep.mode = on ? 'diff' : 'frame'; ep.show(); $('[data-diff-note]').hidden = !on;
    $('[data-s3-tag]').innerHTML = on ? '<b>Now minus then</b> fixed stars cancel out' : '<b>Now</b> October 2026, with your marks'; live(on ? 'Showing now minus then. The fixed stars vanish; the mover leaves a dark and a bright spot.' : 'Showing the October 2026 photo.'); });
  if (qp.get('diff') === '1') btn.click();
}

// ---------- S4: how far ----------
let PX;
function s4() {
  const P = PX, lit = P.literature, ms = P.pass_means;
  const fitAt = plx => { // fixed catalogue slide; the offsets E0, N0 follow; misfit = rms of normalised residuals
    let w = 0, e = 0, n = 0; ms.forEach(p => { const a = 1 / p.east_err ** 2, c = 1 / p.north_err ** 2; w += a; e += a * (p.east - lit.muE * (p.year - P.t0) - plx * p.fE); n += c; });
    let wn = 0, nn = 0; ms.forEach(p => { const c = 1 / p.north_err ** 2; wn += c; nn += c * (p.north - lit.muN * (p.year - P.t0) - plx * p.fN); });
    const E0 = e / w, N0 = nn / wn; let chi = 0;
    ms.forEach(p => { chi += ((p.east - E0 - lit.muE * (p.year - P.t0) - plx * p.fE) / p.east_err) ** 2 + ((p.north - N0 - lit.muN * (p.year - P.t0) - plx * p.fN) / p.north_err) ** 2; });
    return { E0, chi: Math.sqrt(chi / (2 * ms.length)) };
  };
  // the curve uses the same parallax factor, interpolated over the year with a low-precision Sun (good to a few percent)
  const earthF = (mjd, ra) => { const n = mjd + 2400000.5 - 2451545, r = Math.PI / 180, L = (280.46 + .9856474 * n) * r, g = (357.528 + .9856003 * n) * r;
    const lam = L + 1.915 * r * Math.sin(g) + .02 * r * Math.sin(2 * g), R = 1.00014 - .01671 * Math.cos(g), eps = 23.439 * r;
    const X = -R * Math.cos(lam), Y = -R * Math.cos(eps) * Math.sin(lam); return X * Math.sin(ra) - Y * Math.cos(ra); };
  const ra = P.reference_point_deg.ra * Math.PI / 180;
  const W = 560, H = 250, L = 56, R = 14, T = 16, Bm = 40, y0 = 2025.25, y1 = 2026.85, v = 0.45;
  const X = y => L + (y - y0) / (y1 - y0) * (W - L - R), Y = e => T + (v - e) / (2 * v) * (H - T - Bm);
  const input = $('#plx');
  const p0mjd = y => 51544.5 + (y - 2000) * 365.25;
  $('[data-plx-table]').innerHTML = `<caption class="sr">Measured east offsets</caption><tr><th scope="col">Visit</th><th scope="col">Date</th><th scope="col">East offset</th><th scope="col">Error</th></tr>` + ms.map((p, k) => `<tr><td>${k + 1}</td><td>${new Intl.DateTimeFormat('en-GB', { month: 'short', year: 'numeric', timeZone: 'UTC' }).format(mjdDate(p.mjd))}</td><td>${p.east.toFixed(2)}″</td><td>${p.east_err.toFixed(2)}″</td></tr>`).join('');
  const draw = () => {
    const mas = +input.value, plx = mas / 1000, { E0, chi } = fitAt(plx);
    let s = `<title id="plx-chart-t">East to west wobble of Epsilon Indi B with its straight slide taken out: five measured visits and the curve for a parallax of ${mas} milliarcseconds.</title>`;
    [-0.4, -0.2, 0, 0.2, 0.4].forEach(e => { s += `<line class="${e ? 'c-grid' : 'c-axis'}" x1="${L}" x2="${W - R}" y1="${Y(e)}" y2="${Y(e)}"/><text class="c-t" x="${L - 10}" y="${Y(e) + 4}" text-anchor="end">${e > 0 ? '+' : e < 0 ? '−' : ''}${Math.abs(e).toFixed(1)}″</text>`; });
    [[2025.5, 'Jul 2025'], [2026, 'Jan 2026'], [2026.5, 'Jul 2026']].forEach(([y, l]) => { s += `<text class="c-t" x="${X(y)}" y="${H - 14}" text-anchor="middle">${l}</text>`; });
    let d = ''; for (let y = y0; y <= y1 + 1e-9; y += 0.01) { const mjd = 51544.5 + (y - 2000) * 365.25; d += `${d ? 'L' : 'M'}${X(y).toFixed(1)} ${Y(plx * earthF(mjd, ra)).toFixed(1)}`; }
    s += `<path class="c-model" d="${d}"/>`;
    const fmtY = y => new Intl.DateTimeFormat('en-GB', { month: 'short', year: 'numeric', timeZone: 'UTC' }).format(mjdDate(p0mjd(y)));
    ms.forEach((p, k) => { const e = p.east - lit.muE * (p.year - P.t0) - E0, x = X(p.year); s += `<g class="c-hit"><title>Visit ${k + 1}, ${fmtY(p.year)}: ${e >= 0 ? '+' : '−'}${Math.abs(e).toFixed(2)}″ ± ${p.east_err.toFixed(2)}″</title><circle cx="${x}" cy="${Y(e)}" r="16" fill="transparent"/><line class="c-err" x1="${x}" x2="${x}" y1="${Y(e + p.east_err)}" y2="${Y(e - p.east_err)}"/><circle class="c-pt" cx="${x}" cy="${Y(e)}" r="6"/></g>`; if (k === 1) s += `<text class="c-lab" x="${x + 12}" y="${Y(e) - 12}">your visits</text>`; });
    s += `<text class="c-lab c-lab-m" x="${X(2026.08)}" y="${Y(plx * earthF(51544.5 + (2026.08 - 2000) * 365.25, ra)) + (plx > 0.1 ? 22 : -10)}">your curve</text>`;
    $('#plx-chart').innerHTML = s;
    $('#plx-out').textContent = `${mas} mas`;
    input.setAttribute('aria-valuetext', `${mas} milliarcseconds, misfit ${chi.toFixed(1)}`);
    $('[data-misfit]').textContent = chi.toFixed(1);
    const good = chi < 1.6;
    $('[data-fit-word]').textContent = good ? 'Good fit: the curve runs through the dots.' : 'Move the slider until the curve passes through the dots. Lower is better.';
    const pc = 1000 / mas, ly = 3.26156 * pc, vk = 4.74047 * 4.68416 * pc; // tangential speed from the catalogue motion, as the exp13 fit did
    if (mas) { $('[data-plx-you]').textContent = mas; $('[data-ly-you]').textContent = $('[data-ly-you2]').textContent = ly.toFixed(1); $('[data-v-you]').textContent = $('[data-v-you2]').textContent = vk.toFixed(1); }
  };
  input.addEventListener('input', draw);
  if (qp.get('plx')) input.value = qp.get('plx');
  draw();
  // the diagram: Sun, Earth at two points of its orbit, the nearby star, the far stars, the angle
  const g = $('.diagram .dg'), sx = 110, sy = 150;
  g.innerHTML = `<ellipse class="dg-orbit" cx="${sx}" cy="${sy}" rx="70" ry="70"/><circle class="dg-sun" cx="${sx}" cy="${sy}" r="16"/>
    <circle class="dg-earth" cx="${sx}" cy="${sy - 70}" r="8"/><circle class="dg-earth" cx="${sx}" cy="${sy + 70}" r="8"/>
    <line class="dg-ray" x1="${sx}" y1="${sy - 70}" x2="330" y2="${sy}"/><line class="dg-ray" x1="${sx}" y1="${sy + 70}" x2="330" y2="${sy}"/>
    <line class="dg-ray" x1="330" y1="${sy}" x2="500" y2="${sy + 52}" stroke-dasharray="4 5"/><line class="dg-ray" x1="330" y1="${sy}" x2="500" y2="${sy - 52}" stroke-dasharray="4 5"/>
    <path class="dg-angle" d="M296 ${sy - 11} A36 36 0 0 0 296 ${sy + 11}"/>
    <circle class="dg-star" cx="330" cy="${sy}" r="10"/>
    ${[[470, 40], [500, 82], [480, 205], [505, 230], [450, 120], [495, 170]].map(([x, y]) => `<circle class="dg-far" cx="${x}" cy="${y}" r="3"/>`).join('')}
    <text class="dg-t" x="${sx}" y="${sy + 40}" text-anchor="middle">Sun</text>
    <text class="dg-t" x="${sx + 14}" y="${sy - 82}">Earth in spring</text><text class="dg-t" x="${sx + 14}" y="${sy + 92}">Earth in autumn</text>
    <text class="dg-t" x="330" y="${sy - 22}" text-anchor="middle">nearby star</text><text class="dg-t" x="440" y="22">far stars</text><text class="dg-t" x="252" y="${sy + 5}" text-anchor="end">the angle</text>`;
}

// ---------- S5: the patch ----------
function s5(P, M) {
  const pts = P.map(p => p.measured), xs = pts.map(p => p.x), ys = pts.map(p => p.y);
  const mx = (Math.min(...xs) + Math.max(...xs)) / 2, my = (Math.min(...ys) + Math.max(...ys)) / 2, k = 150 / Math.hypot(xs[0] - xs.at(-1), ys[0] - ys.at(-1));
  const tp = pts.map(p => [200 + (p.x - mx) * k, 172 + (p.y - my) * k]);
  const C = n => tok(n);
  const svg = $('#patch');
  svg.innerHTML = `<title id="patch-t">Mission 1 patch: Epsilon Indi B, 4.58 arcseconds a year, 10.7 light years, measured with real NASA SPHEREx data, April 2025 to October 2026. The motif is the star's measured track across five visits.</title>
    <defs><path id="arc-top" d="M58 200a142 142 0 0 1 284 0"/><path id="arc-bot2" d="M47 200a153 153 0 0 0 306 0"/><clipPath id="inner"><circle cx="200" cy="200" r="118"/></clipPath></defs>
    <circle cx="200" cy="200" r="198" fill="${C('--ink')}"/>
    <circle cx="200" cy="200" r="186" fill="${C('--sun')}"/>
    <circle cx="200" cy="200" r="124" fill="${C('--ink')}"/>
    <g clip-path="url(#inner)"><rect x="60" y="60" width="280" height="280" fill="${C('--cobalt')}"/>
      ${[[120, 120], [262, 104], [292, 230], [140, 280], [218, 300], [98, 210], [250, 160]].map(([x, y], i) => `<circle cx="${x}" cy="${y}" r="${i % 3 ? 2.5 : 4}" fill="${C('--paper')}"/>`).join('')}
      <polyline points="${tp.map(p => p.join(',')).join(' ')}" fill="none" stroke="${C('--paper')}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="1 10"/>
      ${tp.slice(0, -1).map(([x, y]) => `<circle cx="${x}" cy="${y}" r="6" fill="none" stroke="${C('--paper')}" stroke-width="3"/>`).join('')}
      <circle cx="${tp.at(-1)[0]}" cy="${tp.at(-1)[1]}" r="17" fill="${C('--red')}" stroke="${C('--ink')}" stroke-width="4"/>
    </g>
    <text font-family="Bricolage" font-weight="800" font-size="30" letter-spacing="2" fill="${C('--ink')}"><textPath href="#arc-top" startOffset="50%" text-anchor="middle">EPSILON INDI B</textPath></text>
    <text font-family="Figtree" font-weight="800" font-size="16" letter-spacing="1.2" fill="${C('--ink')}"><textPath href="#arc-bot2" startOffset="50%" text-anchor="middle">4.58″ A YEAR  /  10.7 LIGHT YEARS  /  72.5 KM/S</textPath></text>
    <rect x="104" y="272" width="192" height="44" rx="8" fill="${C('--red-fill')}" stroke="${C('--ink')}" stroke-width="4"/>
    <text x="200" y="302" text-anchor="middle" font-family="Bricolage" font-weight="800" font-size="23" letter-spacing="1" fill="${C('--on-fill')}">MISSION 1</text>`;
  $$('[data-mini]').forEach(m => {
    const on = m.dataset.mini === 'epsindb', varb = /rwaur|rdra/.test(m.dataset.mini);
    m.innerHTML = on ? `<circle cx="50" cy="50" r="49" fill="${C('--ink')}"/><circle cx="50" cy="50" r="44" fill="${C('--sun')}"/><circle cx="50" cy="50" r="29" fill="${C('--cobalt')}"/><path d="M36 40 L64 58" stroke="${C('--paper')}" stroke-width="3" stroke-dasharray="1 5" stroke-linecap="round"/><circle cx="64" cy="58" r="6" fill="${C('--red')}" stroke="${C('--ink')}" stroke-width="2"/>`
      : `<circle cx="50" cy="50" r="46" fill="none" stroke="${C('--ink-2')}" stroke-width="2.5" stroke-dasharray="5 6"/><circle cx="50" cy="50" r="29" fill="${C('--wash')}"/>${varb ? `<path d="M30 50q5-14 10 0t10 0 10 0 10 0" fill="none" stroke="${C('--ink-2')}" stroke-width="3" stroke-linecap="round"/>` : `<path d="M34 60 L66 40" stroke="${C('--ink-2')}" stroke-width="3" stroke-dasharray="1 6" stroke-linecap="round"/><circle cx="66" cy="40" r="5" fill="${C('--ink-2')}"/>`}`;
  });
  $('[data-copy]').addEventListener('click', async () => {
    const u = new URL(location); u.hash = '#/mission/done'; u.searchParams.set('r', 'epsindb,4.58,306,72.5');
    try { await navigator.clipboard.writeText(u.href); $('[data-copy-note]').textContent = 'Link copied. Paste it anywhere to show your result.'; } catch { $('[data-copy-note]').textContent = `Copying is blocked here. Your link: ${u.href}`; }
    live($('[data-copy-note]').textContent);
  });
}

// ---------- S6: the explorer ----------
function s6(M, frames) {
  const ep = EPS.s6, g = M.groups.find(x => x.id === 'd5d6'), P = g.passes, ci = M.challengeInput;
  ep.setData(frames, { ...g.display, vmin: g.display.vmin + 2 * g.display.sigma }); // ponytail: black point 2 sigma up for this faint 4 to 5 micron field, stated in NOTES
  const st = { i: P.length - 1, mk: { then2010: true, now: true, track: false }, playing: false, timer: 0 };
  const range = $('#ex-range'); range.max = P.length - 1;
  const t0 = P[0].mjdStart - 25, t1 = P.at(-1).mjdEnd + 25, RW = 560;
  const RX = mjd => 10 + (mjd - t0) / (t1 - t0) * (RW - 20);
  const ruler = () => {
    let s = `<line class="r-base" x1="0" x2="${RW}" y1="40" y2="40"/>`;
    const d0 = mjdDate(t0);
    for (let d = new Date(Date.UTC(d0.getUTCFullYear(), d0.getUTCMonth() + 1, 1)); d < mjdDate(t1); d.setUTCMonth(d.getUTCMonth() + 1)) {
      const x = RX(d / 864e5 + 40587), yr = d.getUTCMonth() === 0;
      s += `<line class="r-tick${yr ? ' yr' : ''}" x1="${x}" x2="${x}" y1="${yr ? 22 : 32}" y2="40"/>`;
      s += yr ? `<text class="r-yr" x="${x + 4}" y="18">${d.getUTCFullYear()}</text>` : `<text class="r-mo" x="${x}" y="58" text-anchor="middle">${new Intl.DateTimeFormat('en-GB', { month: 'narrow', timeZone: 'UTC' }).format(d)}</text>`;
    }
    s += `<text class="r-yr" x="2" y="18">${mjdDate(t0).getUTCFullYear()}</text>`;
    P.forEach((p, i) => { s += `<line class="r-span" x1="${RX(p.mjdStart)}" x2="${Math.max(RX(p.mjdEnd), RX(p.mjdStart) + 0.1)}" y1="40" y2="40"/><circle class="r-visit${i === st.i ? ' on' : ''}" data-v="${i}" cx="${RX(p.mjdMid)}" cy="40" r="${i === st.i ? 10 : 7}"/><text class="r-mo" x="${RX(p.mjdMid)}" y="78" text-anchor="middle" style="font-weight:700;fill:var(--ink)">${i + 1}</text>`; });
    $('[data-ruler]').innerHTML = `<svg viewBox="0 0 ${RW} 84" aria-hidden="true">${s}</svg>`;
    $$('[data-v]').forEach(c => c.addEventListener('click', () => { stop(); show(+c.dataset.v); }));
  };
  const draw = () => {
    if (!ep.size) return;
    const p = P[st.i], m = p.measured || p.predicted, [u, v] = ep.px(m.x, m.y), [cu, cv] = ep.px(ci.x, ci.y), r = Math.max(16, ep.size * 0.04);
    let s = '';
    if (st.mk.track) s += `<path class="mk-halo" d="M${cu} ${cv}L${u} ${v}"/><path class="mk-pencil mk-dash" d="M${cu} ${cv}L${u} ${v}"/>`;
    if (st.mk.then2010) s += `<rect class="mk-halo" x="${cu - 11}" y="${cv - 11}" width="22" height="22"/><rect class="mk-pencil" x="${cu - 11}" y="${cv - 11}" width="22" height="22"/><text class="mk-label" x="${cu}" y="${cv - 20}" text-anchor="middle">2010</text>`;
    if (st.mk.now) s += `${ring(u, v, r, '', 3)}<text class="mk-label" x="${u}" y="${v - r - 10}" text-anchor="middle">now</text>`;
    ep.marks(s);
  };
  markers.push(draw);
  const show = i => {
    st.i = (i + P.length) % P.length; const p = P[st.i], m = p.measured || p.predicted;
    ep.show(st.i); draw(); ruler(); range.value = st.i;
    const n = `${st.i + 1} of ${P.length}`, dates = `${monthYear(p.mjdStart, { day: 'numeric', month: 'short' })} to ${monthYear(p.mjdEnd, { day: 'numeric', month: 'short', year: 'numeric' })}`;
    $('[data-ex-visit]').textContent = `Visit ${n}`; $('[data-ex-date]').textContent = p.label; $('[data-ex-n]').textContent = n; $('[data-ex-dates]').textContent = dates;
    $('[data-ex-light]').textContent = `${p.wavelengthUmMin.toFixed(2)} to ${p.wavelengthUmMax.toFixed(2)} microns,`;
    $('[data-ex-photos]').textContent = `${p.nExposures} photos`;
    const gap = Math.hypot(m.x - ci.x, m.y - ci.y) * M.grid.scaleArcsec; $('[data-ex-gap]').textContent = Math.round(gap);
    range.setAttribute('aria-valuetext', `Visit ${n}, ${p.label}`);
    ep.cv.setAttribute('aria-label', `Infrared photo around WISE 0855-0714, visit ${n}, ${p.label}. The brown dwarf is a faint dot ${Math.round(gap)} arcseconds west of its 2010 position, marked with a square.`);
    if (!st.playing) live(`Visit ${n}, ${p.label}`);
  };
  const stop = () => { st.playing = false; clearInterval(st.timer); $('[data-play]').setAttribute('aria-pressed', 'false'); $('[data-play-label]').textContent = 'Play'; };
  $('[data-play]').addEventListener('click', () => { if (st.playing) return stop(); st.playing = true; $('[data-play]').setAttribute('aria-pressed', 'true'); $('[data-play-label]').textContent = 'Pause'; st.timer = setInterval(() => show(st.i + 1), 900); });
  $$('[data-step-by]').forEach(b => b.addEventListener('click', () => { stop(); show(st.i + +b.dataset.stepBy); }));
  range.addEventListener('input', () => { stop(); show(+range.value); });
  $$('[data-mk]').forEach(b => b.addEventListener('click', () => { const on = b.getAttribute('aria-pressed') !== 'true'; b.setAttribute('aria-pressed', on); st.mk[b.dataset.mk] = on; draw(); }));
  $$('.term').forEach(b => b.addEventListener('click', () => { const on = b.getAttribute('aria-expanded') !== 'true'; b.setAttribute('aria-expanded', on); document.getElementById(b.getAttribute('aria-controls')).hidden = !on; }));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') $$('.term[aria-expanded="true"]').forEach(b => { b.setAttribute('aria-expanded', false); document.getElementById(b.getAttribute('aria-controls')).hidden = true; b.focus(); }); });
  $('[data-search]').addEventListener('submit', e => { e.preventDefault(); const q = $('#q').value.trim(); const u = new URL(location); u.hash = `#/explore?q=${encodeURIComponent(q)}`; history.replaceState(null, '', u); live(`Showing ${q}. The link now opens this spot.`); });
  show(st.i);
}

// ---------- boot ----------
async function boot() {
  window.SB = {};
  applyLang(); route();
  const M = await (await fetch(`${ROOT}epsindb/manifest.json`)).json();
  const g = M.groups.find(x => x.id === 'd2'), P = g.passes;
  const frames = await Promise.all(P.map(p => f32(`${ROOT}epsindb/${p.stack}`)));
  ['s1', 's2', 's3'].forEach(k => { EPS[k] = new Eyepiece($(`#ep-${k}`)); EPS[k].setData(frames, g.display); });
  EPS.s3.setData(frames, { ...g.display, vmax: g.display.vmax * 2, soft: g.display.soft * 8 }); // ponytail: gentler stretch when zoomed in, so the core and the marks read; stated in NOTES
  EPS.s6 = new Eyepiece($('#ep-s6'));
  s1(P); s2(P, M); s3(P);
  const W = await (await fetch(`${ROOT}wise0855/manifest.json`)).json();
  const wf = await Promise.all(W.groups.find(x => x.id === 'd5d6').passes.map(p => f32(`${ROOT}wise0855/${p.stack}`)));
  s6(W, wf);
  PX = await (await fetch('/docs/research/experiments/exp13_parallax_epsindb.json')).json();
  s4(); s5(P, M);
  applyLang(); route();
  document.body.dataset.ready = '1';
}
boot();
