// Skyblink, direction B "Dial". Vanilla JS, no build step.
const NAME = 'Skyblink'; // working title, kept in one place
const ROOT = '/assets/missions/';
const CROP = 27; // 81 arcsec field (27 px of 3 arcsec)
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

const STR = {
  en: { s1Title: 'Find the next Tombaugh.', s1Lead: 'In 1930 a 24-year-old found Pluto by flipping between two photos of the same sky. Here are five real infrared photos from NASA’s SPHEREx telescope, taken months apart. One dot does not stay put.', s1Go: 'Find what moved', s1Else: 'Look somewhere else', earlier: 'Earlier', later: 'Later', play: 'Play', pause: 'Pause', dark: 'Dark', roVisit: 'Visit', roDate: 'Date', roLight: 'Light', roPhotos: 'Photos', dialHint: 'Turn the dial, or use the arrow keys.', skip: 'Skip to the picture', stepLook: 'Look', stepMeasure: 'Mark and measure', of: 'of', near: 'Near infrared' },
  ro: { s1Title: 'Găsește următorul Tombaugh.', s1Lead: 'În 1930, un tânăr de 24 de ani a descoperit Pluto comutând între două fotografii ale aceluiași cer. Iată cinci fotografii infraroșii reale ale telescopului SPHEREx al NASA, făcute la luni distanță. Un singur punct nu rămâne pe loc.', s1Go: 'Găsește ce s-a mișcat', s1Else: 'Privește în altă parte', earlier: 'Înainte', later: 'După', play: 'Pornește', pause: 'Oprește', dark: 'Întunecat', roVisit: 'Vizita', roDate: 'Data', roLight: 'Lumina', roPhotos: 'Fotografii', dialHint: 'Rotește discul sau folosește săgețile.', skip: 'Sari la imagine', stepLook: 'Privește', stepMeasure: 'Marchează și măsoară', of: 'din', near: 'Infraroșu apropiat' },
};
let lang = new URLSearchParams(location.search).get('lang') === 'ro' ? 'ro' : 'en';
const t = k => STR[lang][k] ?? STR.en[k];

const mjdDate = mjd => new Date((mjd - 40587) * 864e5);
const fmt = d => new Intl.DateTimeFormat(lang === 'ro' ? 'ro' : 'en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' }).format(d);
const fmtMonth = d => new Intl.DateTimeFormat('en-GB', { month: 'short', timeZone: 'UTC' }).format(d);

async function f32(url) { return new Float32Array(await (await fetch(url)).arrayBuffer()); }

function paint(canvas, data, disp, cx, cy, w) {
  canvas.width = canvas.height = w;
  const ctx = canvas.getContext('2d'), img = ctx.createImageData(w, w), k = Math.asinh(1 / disp.soft);
  const x0 = Math.round(cx - w / 2), y0 = Math.round(cy - w / 2);
  for (let y = 0; y < w; y++) for (let x = 0; x < w; x++) {
    const X = x0 + x, Y = y0 + y, v = X >= 0 && X < 121 && Y >= 0 && Y < 121 ? data[Y * 121 + X] : NaN;
    const tt = Math.min(1, Math.max(0, (v - disp.vmin) / (disp.vmax - disp.vmin)));
    const g = Number.isFinite(v) ? Math.round(255 * Math.asinh(tt / disp.soft) / k) : 15; // NaN = display black
    const i = (y * w + x) * 4; img.data[i] = img.data[i + 1] = img.data[i + 2] = g; img.data[i + 3] = 255;
  }
  ctx.putImageData(img, 0, 0);
  return { x0, y0 };
}

// ---- instrument state ----
const S = { m: null, g: null, frames: [], i: 0, playing: false, timer: 0, marks: { ring: true, path: false }, origin: { x0: 0, y0: 0 } };
const sky = $('#sky'), overlay = $('#overlay'), input = $('#dial-input'), face = $('#dial-face');
const PAD = 25, SWEEP = 270;
let tA, tB;
const ang = mjd => -SWEEP / 2 + SWEEP * (mjd - tA) / (tB - tA);
const pt = (a, r) => [r * Math.sin(a * Math.PI / 180), -r * Math.cos(a * Math.PI / 180)];

function buildDial() {
  const P = S.g.passes; tA = P[0].mjdMid - PAD; tB = P.at(-1).mjdMid + PAD;
  let s = `<circle class="track" r="104"/>`;
  const d0 = mjdDate(tA);
  for (let d = new Date(Date.UTC(d0.getUTCFullYear(), d0.getUTCMonth() + 1, 1)); d < mjdDate(tB); d.setUTCMonth(d.getUTCMonth() + 1)) {
    const a = ang(d / 864e5 + 40587), yr = d.getUTCMonth() === 0;
    const [x1, y1] = pt(a, yr ? 92 : 98), [x2, y2] = pt(a, 106);
    s += `<line class="${yr ? 'tick-year' : 'tick'}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"/>`;
    if (yr) { const [x, y] = pt(a, 78); s += `<text class="dial-yr" x="${x}" y="${y}">${d.getUTCFullYear()}</text>`; }
  }
  P.forEach((p, i) => {
    const a = ang(p.mjdMid), [x1, y1] = pt(a, 90), [x2, y2] = pt(a, 112), [lx, ly] = pt(a, 128);
    s += `<line class="tick-visit" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"/><text class="dial-lbl" data-i="${i}" x="${lx}" y="${ly}">${fmtMonth(mjdDate(p.mjdMid))}</text>`;
  });
  const [sx, sy] = pt(-SWEEP / 2, 78);
  s += `<text class="dial-yr" x="${sx}" y="${sy}">${mjdDate(P[0].mjdMid).getUTCFullYear()}</text>`;
  s += `<g class="knob" id="knob"><circle class="knob-c" r="62"/><line class="knob-i" x1="0" y1="-24" x2="0" y2="-52"/></g>`;
  face.innerHTML = s;
  input.max = P.length - 1;
}

function drawOverlay() {
  const p = S.g.passes[S.i], { x0, y0 } = S.origin;
  let s = '';
  if (S.marks.path) S.g.passes.forEach(q => { const x = q.predicted.x - x0 + .5, y = q.predicted.y - y0 + .5; s += `<path d="M${x - .6} ${y}h1.2M${x} ${y - .6}v1.2" stroke="#0F1113" stroke-width=".42"/><path d="M${x - .6} ${y}h1.2M${x} ${y - .6}v1.2" stroke="#56B4E9" stroke-width=".2"/>`; });
  if (S.marks.ring && p.measured) { const x = p.measured.x - x0 + .5, y = p.measured.y - y0 + .5; s += `<circle cx="${x}" cy="${y}" r="2.3" fill="none" stroke="#0F1113" stroke-width=".38"/><circle cx="${x}" cy="${y}" r="2.3" fill="none" stroke="#D2550F" stroke-width=".2"/>`; }
  overlay.innerHTML = s;
}

function show(i, announce = true) {
  const P = S.g.passes; S.i = (i + P.length) % P.length;
  const p = P[S.i];
  S.origin = paint(sky, S.frames[S.i], S.g.display, S.cx, S.cy, CROP);
  drawOverlay();
  input.value = S.i;
  const date = fmt(mjdDate(p.mjdMid));
  $('#ro-visit').textContent = `${S.i + 1} ${t('of')} ${P.length}`;
  $('#ro-date').textContent = date;
  $('#ro-light').textContent = `${t('near')}, ${p.wavelengthUmMin.toFixed(2)} to ${p.wavelengthUmMax.toFixed(2)} µm`;
  $('#ro-photos').textContent = p.nExposures;
  const vt = `Visit ${S.i + 1} of ${P.length}, ${date}`;
  input.setAttribute('aria-valuetext', vt);
  const first = P[0].measured, d = Math.hypot(p.measured.x - first.x, p.measured.y - first.y) * 3;
  sky.setAttribute('aria-label', `Infrared photo around Epsilon Indi B, ${vt}, ${p.nExposures} photos stacked. The brown dwarf is the bright dot in the middle; it sits ${d.toFixed(1)} arcseconds south-east of where it was in the first visit.`);
  const knob = $('#knob'); if (knob) knob.style.transform = `rotate(${ang(p.mjdMid)}deg)`;
  if (announce && !S.playing) $('#live').textContent = vt;
}

function setPlaying(on) {
  S.playing = on; clearInterval(S.timer);
  const b = $('[data-play]'); b.setAttribute('aria-pressed', on); $('[data-play-label]').textContent = on ? t('pause') : t('play');
  if (on) S.timer = setInterval(() => show(S.i + 1, false), 900); // about 1.1 changes a second, under the 3 flashes ceiling
  else show(S.i);
}

function wireDial() {
  input.addEventListener('input', () => { setPlaying(false); show(+input.value); });
  $$('[data-step-by]').forEach(b => b.addEventListener('click', () => { setPlaying(false); show(S.i + +b.dataset.stepBy); }));
  $('[data-play]').addEventListener('click', () => setPlaying(!S.playing));
  const dial = $('#dial'); let drag = false;
  const at = e => { const r = dial.getBoundingClientRect(); let a = Math.atan2(e.clientX - r.left - r.width / 2, -(e.clientY - r.top - r.height / 2)) * 180 / Math.PI;
    a = Math.max(-SWEEP / 2, Math.min(SWEEP / 2, a)); const mjd = tA + (a + SWEEP / 2) / SWEEP * (tB - tA);
    let best = 0; S.g.passes.forEach((p, i) => { if (Math.abs(p.mjdMid - mjd) < Math.abs(S.g.passes[best].mjdMid - mjd)) best = i; });
    if (best !== S.i) { setPlaying(false); show(best); } };
  // touch-action: pan-y keeps vertical page scroll; horizontal drags and taps turn the dial
  dial.addEventListener('pointerdown', e => { drag = true; dial.setPointerCapture(e.pointerId); if (e.pointerType === 'mouse') at(e); input.focus({ preventScroll: true }); });
  dial.addEventListener('pointermove', e => { if (drag) at(e); });
  dial.addEventListener('pointerup', e => { if (drag && e.pointerType !== 'mouse') at(e); drag = false; });
  dial.addEventListener('pointercancel', () => { drag = false; });
}

// ---- marker buttons, glossary, theme, language ----
$$('.mark-btn').forEach(b => b.addEventListener('click', () => { const on = b.getAttribute('aria-pressed') !== 'true'; b.setAttribute('aria-pressed', on); S.marks[b.dataset.mark] = on; drawOverlay(); }));
$$('.term').forEach(b => b.addEventListener('click', () => { const on = b.getAttribute('aria-expanded') !== 'true'; b.setAttribute('aria-expanded', on); document.getElementById(b.getAttribute('aria-controls')).hidden = !on; }));
document.addEventListener('keydown', e => { if (e.key === 'Escape') $$('.term[aria-expanded="true"]').forEach(b => { b.setAttribute('aria-expanded', false); document.getElementById(b.getAttribute('aria-controls')).hidden = true; b.focus(); }); });

function setTheme(th) { document.documentElement.dataset.theme = th; $('[data-theme-toggle]').setAttribute('aria-pressed', th === 'dark'); }
const qp = new URLSearchParams(location.search);
setTheme(qp.get('theme') || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));
$('[data-theme-toggle]').addEventListener('click', () => setTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'));

function applyLang() {
  document.documentElement.lang = lang;
  $$('[data-i18n]').forEach(el => { if (STR[lang][el.dataset.i18n]) el.textContent = t(el.dataset.i18n); });
  $$('[data-lang]').forEach(a => a.toggleAttribute('aria-current', a.dataset.lang === lang));
  $$('[data-lang]').forEach(a => a.dataset.lang === lang ? a.setAttribute('aria-current', 'true') : a.removeAttribute('aria-current'));
  $$('[data-name]').forEach(el => { el.textContent = NAME; });
  if (S.g) { buildDial(); show(S.i, false); setPlaying(S.playing); }
}
$$('[data-lang]').forEach(a => a.addEventListener('click', e => { e.preventDefault(); lang = a.dataset.lang; applyLang(); }));

// ---- routes ----
function route() {
  const r = (location.hash.replace(/^#/, '').split('?')[0]) || '/';
  let hit = null;
  $$('.screen').forEach(s => { const on = s.dataset.route === r; s.hidden = !on; if (on) hit = s; });
  if (!hit) { hit = $('.screen'); hit.hidden = false; }
  document.body.dataset.route = hit.dataset.route;
  const slot = $('[data-slot]', hit); if (slot) slot.append($('#instrument'));
  $$('.steps a').forEach(a => a.toggleAttribute('aria-current', a.getAttribute('href') === '#' + hit.dataset.route));
  $$('.steps a[aria-current]').forEach(a => a.setAttribute('aria-current', 'step'));
  document.title = `${NAME}: ${$('h1', hit).textContent}`;
}
addEventListener('hashchange', route);

// ---- S3 and S4 drawings ----
async function drawS3(P, frames) {
  const c = $('#s3-canvas'), { x0, y0 } = paint(c, frames.at(-1), S.g.display, S.cx, S.cy, CROP);
  const a = P[0].measured, b = P.at(-1).measured, ax = a.x - x0 + .5, ay = a.y - y0 + .5, bx = b.x - x0 + .5, by = b.y - y0 + .5;
  $('#s3-overlay').innerHTML = `<circle cx="${ax}" cy="${ay}" r="2.3" fill="none" stroke="#0F1113" stroke-width=".38"/><circle cx="${ax}" cy="${ay}" r="2.3" fill="none" stroke="#D2550F" stroke-width=".2" stroke-dasharray=".5 .4"/><circle cx="${bx}" cy="${by}" r="2.3" fill="none" stroke="#0F1113" stroke-width=".38"/><circle cx="${bx}" cy="${by}" r="2.3" fill="none" stroke="#D2550F" stroke-width=".2"/>`;
}

// Parallax chart: east offset minus the straight-line motion, against time (data: exp13 pass means).
let PX = null;
function earthF(mjd, ra, dec) { // ponytail: low-precision Sun (Astronomical Almanac), within ~0.03 of the exp13 factors; enough for a drawn curve
  const n = mjd + 2400000.5 - 2451545, r = Math.PI / 180, L = (280.46 + .9856474 * n) * r, g = (357.528 + .9856003 * n) * r;
  const lam = L + 1.915 * r * Math.sin(g) + .02 * r * Math.sin(2 * g), R = 1.00014 - .01671 * Math.cos(g), eps = (23.439 - 4e-7 * n) * r;
  const X = -R * Math.cos(lam), Y = -R * Math.cos(eps) * Math.sin(lam);
  return X * Math.sin(ra) - Y * Math.cos(ra);
}
function drawChart(plxMas) {
  const P = PX, pm = P.literature, ms = P.pass_means, t0 = P.t0, plx = plxMas / 1000;
  const ra = P.reference_point_deg.ra * Math.PI / 180, dec = P.reference_point_deg.dec * Math.PI / 180;
  let w = 0, wf = 0, wr = 0; ms.forEach(p => { const a = 1 / p.east_err ** 2; w += a; wf += a * p.fE; wr += a * (p.east - pm.muE * (p.year - t0)); });
  const E0 = (wr - plx * wf) / w;
  const W = 560, H = 220, L = 52, Rr = 12, T = 14, B = 34, y0 = 2025.25, y1 = 2026.85, v = .45;
  const X = y => L + (y - y0) / (y1 - y0) * (W - L - Rr), Y = e => T + (v - e) / (2 * v) * (H - T - B);
  let s = `<title id="plx-chart-t">East to west wobble of Epsilon Indi B after taking out its straight-line motion: five measured points and the curve for a parallax of ${plxMas} milliarcseconds.</title>`;
  [-.4, 0, .4].forEach(e => { s += `<line class="${e ? 'c-grid' : 'c-axis'}" x1="${L}" x2="${W - Rr}" y1="${Y(e)}" y2="${Y(e)}"/><text class="c-t" x="${L - 8}" y="${Y(e) + 4}" text-anchor="end">${e.toFixed(1)}″</text>`; });
  [2025.5, 2026, 2026.5].forEach(y => { s += `<text class="c-t" x="${X(y)}" y="${H - 10}" text-anchor="middle">${y === 2026 ? 'Jan 2026' : y === 2025.5 ? 'Jul 2025' : 'Jul 2026'}</text>`; });
  let d = ''; for (let y = y0; y <= y1; y += .01) { const mjd = 51544.5 + (y - 2000) * 365.25; d += (d ? 'L' : 'M') + X(y).toFixed(1) + ' ' + Y(plx * earthF(mjd, ra, dec)).toFixed(1); }
  s += `<path class="c-model" d="${d}"/>`;
  ms.forEach(p => { const e = p.east - pm.muE * (p.year - t0) - E0, x = X(p.year); s += `<line class="c-err" x1="${x}" x2="${x}" y1="${Y(e + p.east_err)}" y2="${Y(e - p.east_err)}"/><circle class="c-pt" cx="${x}" cy="${Y(e)}" r="5"/>`; });
  $('#plx-chart').innerHTML = s;
  const pc = 1000 / plxMas, ly = 3.26156 * pc, vkm = 4.74047 * 4.5824547 * pc;
  $('#plx-out').textContent = `${plxMas} milliarcseconds`;
  $('#ly-you').textContent = plxMas ? ly.toFixed(1) : 'too far';
  $('#v-you').textContent = plxMas ? vkm.toFixed(1) : '?';
}

async function thumbs() {
  for (const c of $$('[data-thumb]')) {
    const m = await (await fetch(`${ROOT}${c.dataset.thumb}/manifest.json`)).json();
    const g = m.groups[0], p = g.passes.at(-1), d = await f32(`${ROOT}${m.id}/${p.stack}`);
    paint(c, d, g.display, p.predicted.x, p.predicted.y, +c.width);
  }
}

async function boot() {
  applyLang(); route();
  S.m = await (await fetch(`${ROOT}epsindb/manifest.json`)).json();
  S.g = S.m.groups.find(g => g.id === 'd2');
  const a = S.g.passes[0].measured, b = S.g.passes.at(-1).measured; S.cx = (a.x + b.x) / 2 + .5; S.cy = (a.y + b.y) / 2 + .5;
  S.frames = await Promise.all(S.g.passes.map(p => f32(`${ROOT}epsindb/${p.stack}`)));
  buildDial(); wireDial(); show(0, false);
  setPlaying(!reduce && qp.get('play') !== '0' && document.body.dataset.route === '/');
  if (qp.get('visit')) show(+qp.get('visit'), false);
  drawS3(S.g.passes, S.frames);
  PX = await (await fetch('/docs/research/experiments/exp13_parallax_epsindb.json')).json();
  const plx = $('#plx'); if (qp.get('plx')) plx.value = qp.get('plx');
  plx.addEventListener('input', () => drawChart(+plx.value)); drawChart(+plx.value);
  thumbs();
  document.body.dataset.ready = '1';
}
boot();
