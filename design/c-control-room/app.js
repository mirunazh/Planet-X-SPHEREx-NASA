// Skyblink, direction C "Control Room". Plain JS, no build step.
const APP = 'Skyblink';
const BASE = '/assets/missions/';
const RO = {
  skip: 'Sari la imagine', s1Line: 'Un tânăr de 24 de ani a descoperit Pluto comutând rapid între două fotografii ale cerului.',
  s1Sub: 'Aceste două fotografii în infraroșu ale aceluiași petic de cer au fost făcute la 17 luni distanță de telescopul SPHEREx al NASA. Un punct s-a mișcat.',
  s1Cta: 'Găsește ce s-a mișcat', s1Else: 'Caută în altă parte', pause: 'Pauză', play: 'Pornește',
  navElsewhere: 'Caută în altă parte', navGlossary: 'Glosar', themeLight: 'Luminos',
};
const EN = {};
document.querySelectorAll('[data-i18n]').forEach((el) => (EN[el.dataset.i18n] = el.innerHTML));
document.querySelectorAll('[data-app]').forEach((el) => (el.textContent = APP));
document.title = APP;

const cache = {};
const manifest = (id) => (cache[id] ??= fetch(BASE + id + '/manifest.json').then((r) => r.json()));
async function frame(id, rel) {
  const buf = await (await fetch(BASE + id + '/' + rel)).arrayBuffer();
  return new Float32Array(buf);
}
function paint(arr, d) {
  const c = document.createElement('canvas'); c.width = c.height = 121;
  const ctx = c.getContext('2d'), img = ctx.createImageData(121, 121);
  const k = Math.asinh(1 / d.soft);
  for (let i = 0; i < arr.length; i++) {
    const v = arr[i];
    // ponytail: NaN drawn as white (in these five fields NaN only marks saturated cores)
    const t = Number.isNaN(v) ? 1 : Math.min(1, Math.max(0, (v - d.vmin) / (d.vmax - d.vmin)));
    const g = Math.round((Math.asinh(t / d.soft) / k) * 255);
    img.data.set([g, g, g, 255], i * 4);
  }
  ctx.putImageData(img, 0, 0);
  return c;
}
function place(plate, canvas, cx, cy, field) {
  const x0 = cx - field / 2, y0 = cy - field / 2;
  Object.assign(canvas.style, { width: (121 / field) * 100 + '%', left: (-x0 / field) * 100 + '%', top: (-y0 / field) * 100 + '%' });
  plate.prepend(canvas);
}
function scalebar(plate, field, arcsec) {
  const s = document.createElement('div'); s.className = 'scalebar';
  s.innerHTML = `<i style="width:${((arcsec / 3) / field) * plate.clientWidth}px"></i>${arcsec} arcsec`;
  s.setAttribute('aria-hidden', 'true'); plate.append(s);
}
const fmt = (mjd, lang) => new Date((mjd - 40587) * 864e5).toLocaleDateString(lang === 'ro' ? 'ro-RO' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
let lang = 'en';
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

async function dates() {
  for (const el of document.querySelectorAll('[data-date]')) {
    const [id, i] = el.dataset.date.split(':');
    const m = await manifest(id);
    el.textContent = fmt(m.groups[0].passes[+i].mjdMid, lang);
  }
}

// S1: blink first and last visit of Epsilon Indi B, 90 arcsec field
let s1Timer = null;
async function initS1() {
  const plate = document.getElementById('s1Plate');
  if (plate.dataset.ready) return; plate.dataset.ready = 1;
  const m = await manifest('epsindb'), g = m.groups[0];
  const a = g.passes[0].measured, b = g.passes[4].measured;
  const cx = (a.x + b.x) / 2 + 0.5, cy = (a.y + b.y) / 2 + 0.5, field = 30;
  const cs = [paint(await frame('epsindb', g.passes[0].stack), g.display), paint(await frame('epsindb', g.passes[4].stack), g.display)];
  cs.forEach((c) => place(plate, c, cx, cy, field));
  scalebar(plate, field, 30);
  const items = document.querySelectorAll('.blinkset li');
  let k = 0;
  const show = () => { cs.forEach((c, i) => (c.style.visibility = i === k ? 'visible' : 'hidden')); items.forEach((li, i) => li.classList.toggle('on', i === k)); };
  const btn = document.getElementById('s1Pause');
  const setPlaying = (on) => {
    clearInterval(s1Timer); s1Timer = on ? setInterval(() => { k = 1 - k; show(); }, 800) : null;
    btn.setAttribute('aria-pressed', String(!on));
    btn.querySelector('.lbl').textContent = on ? (lang === 'ro' ? RO.pause : 'Pause') : (lang === 'ro' ? RO.play : 'Play');
  };
  btn.onclick = () => setPlaying(!s1Timer);
  show(); setPlaying(!reduce);
}

// S2: step through the visits on a real time axis
async function initS2(id = 'epsindb') {
  const plate = document.getElementById('s2Plate');
  if (plate.dataset.ready === id) return; plate.dataset.ready = id;
  plate.querySelectorAll('canvas,.scalebar').forEach((n) => n.remove());
  const m = await manifest(id), g = m.groups[0], P = g.passes, field = 36;
  const cx = 60.5, cy = 60.5;
  const cs = [];
  for (const p of P) { const c = paint(await frame(id, p.stack), g.display); place(plate, c, cx, cy, field); cs.push(c); }
  scalebar(plate, field, 30);
  document.getElementById('s2-h').textContent = m.name;
  document.getElementById('s2Where').textContent = `RA ${m.grid.ra0.toFixed(3)}°  Dec ${m.grid.dec0.toFixed(3)}°`;
  document.getElementById('s2What').textContent = m.summary;
  const t0 = P[0].mjdStart - 20, t1 = P[P.length - 1].mjdEnd + 20, pos = (t) => ((t - t0) / (t1 - t0)) * 100;
  const sc = document.querySelector('.axis-scale'); sc.innerHTML = '';
  for (let y = 2025; y <= 2026; y++) for (let mo = 0; mo < 12; mo++) {
    const t = Date.UTC(y, mo, 1) / 864e5 + 40587; if (t < t0 || t > t1) continue;
    const d = document.createElement('div'); d.className = 'tick'; d.style.left = pos(t) + '%';
    if (mo % 3 === 0) d.innerHTML = `<b>${mo === 0 ? y : new Date(Date.UTC(y, mo, 1)).toLocaleDateString('en-GB', { month: 'short' })}</b>`;
    sc.append(d);
  }
  const vs = P.map((p, i) => { const v = document.createElement('div'); v.className = 'visit'; v.style.left = pos(p.mjdStart) + '%'; v.style.width = pos(p.mjdEnd) - pos(p.mjdStart) + '%'; v.innerHTML = `<span>${i + 1}</span>`; sc.append(v); return v; });
  const range = document.getElementById('s2Range');
  Object.assign(range, { min: 0, max: P.length - 1, step: 1 });
  let k = 0, timer = null;
  const strip = document.getElementById('s2Strip');
  const show = (i) => {
    k = (i + P.length) % P.length; range.value = k;
    cs.forEach((c, j) => (c.style.visibility = j === k ? 'visible' : 'hidden'));
    vs.forEach((v, j) => v.classList.toggle('on', j === k));
    const p = P[k], when = `${fmt(p.mjdStart, lang)} to ${fmt(p.mjdEnd, lang)}`;
    range.setAttribute('aria-valuetext', `Visit ${k + 1} of ${P.length}, ${when}`);
    strip.innerHTML = `
      <div><dt>Visit</dt><dd class="mono">${k + 1} of ${P.length}</dd></div>
      <div><dt>Dates</dt><dd>${when}</dd></div>
      <div><dt>Infrared colour</dt><dd>${p.wavelengthUmMin < 2 ? 'Near infrared, just past red light' : 'Heat glow, far past red light'}<span class="sub mono">${p.wavelengthUmMin.toFixed(2)} to ${p.wavelengthUmMax.toFixed(2)} µm</span></dd></div>
      <div><dt>Photos</dt><dd><span class="mono">${p.nExposures}</span> added together</dd></div>
      <div><dt>Target</dt><dd>${p.detected ? `<span class="status ok"><svg aria-hidden="true" viewBox="0 0 20 20" width="18" height="18"><path d="M4 10.5l4 4 8-9" fill="none" stroke="currentColor" stroke-width="2"/></svg>Detected</span><span class="sub mono">signal ${Math.round(p.snr)} times the noise</span>` : '<span class="status">Not seen</span>'}</dd></div>`;
    document.getElementById('s2Live').textContent = `Visit ${k + 1} of ${P.length}, ${when}.`;
  };
  range.oninput = () => show(+range.value);
  document.getElementById('s2Prev').onclick = () => show(k - 1);
  document.getElementById('s2Next').onclick = () => show(k + 1);
  const play = document.getElementById('s2Play');
  play.onclick = () => { if (timer) { clearInterval(timer); timer = null; } else timer = setInterval(() => show(k + 1), 1000); play.setAttribute('aria-pressed', String(!!timer)); play.querySelector('.lbl').textContent = timer ? 'Pause' : 'Play'; };
  play.querySelector('.lbl').textContent = 'Play';
  document.getElementById('s2Explain').innerHTML = 'Each square is one pixel of the SPHEREx camera, 3 <button type="button" class="term" aria-expanded="true">arcseconds</button> wide. Step through the visits and watch the bright dot in the middle creep down and to the left while the stars stay put.';
  const gl = document.getElementById('s2Gloss');
  gl.innerHTML = '<p style="margin:0"><strong>Arcsecond:</strong> a tiny angle. 3,600 arcseconds make one degree; the full Moon is about 1,800 arcseconds wide.</p>'; gl.hidden = false;
  const term = document.querySelector('#s2Explain .term');
  term.onclick = () => { gl.hidden = !gl.hidden; term.setAttribute('aria-expanded', String(!gl.hidden)); };
  document.getElementById('s2Marks').innerHTML = ['Where the catalogue predicts it', 'Where our software found it', 'Its trail'].map((t, i) => `<button type="button" class="btn mark-btn" aria-pressed="${i < 2}">${t} <span class="st">${i < 2 ? 'On' : 'Off'}</span></button>`).join('');
  document.querySelectorAll('.mark-btn').forEach((b) => (b.onclick = () => { const on = b.getAttribute('aria-pressed') !== 'true'; b.setAttribute('aria-pressed', String(on)); b.querySelector('.st').textContent = on ? 'On' : 'Off'; }));
  show(2);
}

function route() {
  const [, name = '', id] = location.hash.replace(/^#\/?/, '#').split(/[#/]/);
  const screen = { '': 'home', look: 'look', measure: 'measure', elsewhere: 'elsewhere' }[name] || 'home';
  document.querySelectorAll('.screen').forEach((s) => (s.hidden = s.dataset.screen !== screen));
  if (screen === 'home') initS1();
  if (screen === 'look') initS2(id || 'epsindb');
}
document.querySelectorAll('[data-lang]').forEach((b) => (b.onclick = () => {
  lang = b.dataset.lang; document.documentElement.lang = lang;
  document.querySelectorAll('[data-lang]').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
  const D = lang === 'ro' ? RO : EN;
  document.querySelectorAll('[data-i18n]').forEach((el) => { if (D[el.dataset.i18n]) el.innerHTML = D[el.dataset.i18n]; });
  document.querySelectorAll('[data-app]').forEach((el) => (el.textContent = APP));
  dates();
}));
document.getElementById('themeBtn').onclick = (e) => {
  const light = document.documentElement.dataset.theme !== 'light';
  document.documentElement.dataset.theme = light ? 'light' : 'dark';
  e.currentTarget.setAttribute('aria-pressed', String(light));
};
if (/theme=light/.test(location.search)) document.documentElement.dataset.theme = 'light';
addEventListener('hashchange', route);
route(); dates();
