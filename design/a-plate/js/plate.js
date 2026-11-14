// Skyblink, direction A "Plate". Vanilla JS, no build step, no requests beyond this server.
const NAME = 'Skyblink'; // working title, kept in one place
const ROOT = '/assets/missions/';
// Crop: 52 x 52 grid pixels (156 arcsec), columns 47 to 98, rows 36 to 87 of the 121 px field.
// The mover sits left of centre on the same row as two fixed stars, (83,59) and (95,59); a fainter one is at (60,79).
const CROP = { x0: 47, y0: 36, n: 52 };
const STARS = [[83, 59], [95, 59], [60, 79]];
const ZOOM = { x0: 48, y0: 48, n: 24 }; // S3 measuring view: 72 arcsec around the mover, so the two marks sit apart
const UP = 16; // smooth view: each grid pixel becomes 16 x 16 canvas pixels (832 px canvas)
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const qp = new URLSearchParams(location.search);
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

const STR = {
  en: {
    skip: 'Skip to the main content', navLabel: 'Steps', navLook: 'Look', navMeasure: 'Measure', navElse: 'Elsewhere', dark: 'Darkroom',
    s1Over: 'Epsilon Indi B, seen by SPHEREx', s1Title: 'In 1930, a <span class="nw">24-year-old</span> found Pluto by flipping between two photographs of the same sky.',
    s1Lead: 'Here are two real infrared photos of one patch of sky, taken by NASA’s SPHEREx telescope 17 months apart. Flip between them. Most dots stay put. One does not.',
    s1Go: 'Find what moved', s1Else: 'Look somewhere else', plate: 'Plate', then: 'Then', now: 'Now', hold: 'Hold to blink',
    holdHint: 'Hold the button or the Space bar. A tap keeps it flipped.',
    blinkPause: 'Pause the automatic blink', blinkPlay: 'Blink automatically',
    real: 'Real photo, only enlarged and toned. Darker means brighter in infrared.', realPos: 'Real photo, only enlarged and toned. Lighter means brighter in infrared.',
    of: 'of', pause: 'Pause', play: 'Play',
    scale30: '30 arcseconds', orient: 'North up, east left', axisLabel: 'Visit date', filmLabel: 'Film controls',
    earlier: 'Earlier', later: 'Later', keysHint: 'Or use the left and right arrow keys.', step1: 'Step 1 of 2: look',
    s2Title: 'Five visits to one patch of sky', s2Lead: 'SPHEREx photographed this patch five times in 17 months. Play the visits: one dot slides, its neighbours stay put.',
    thisVisit: 'This visit', roVisit: 'Visit', roDates: 'Dates', roLight: 'Light', roPhotos: 'Photos added together',
    near: 'Near infrared, just past red light:', um: 'microns', glStackTerm: 'A stack.', glStack: 'Several photos of the same patch added together. Random noise partly cancels out, so faint things show up better than in any single photo.',
    marksH: 'Marks on the plate', mkMoved: 'Ring the dot that moved', mkFirst: 'Show where it was on visit 1', mkStars: 'Tick the stars that stay put',
    viewH: 'Plate view', viewNeg: 'Negative: dark stars on a light plate', viewPos: 'Positive: as the camera saw it', realPx: 'Real pixels: the honest squares, not enlarged smoothly',
    s2Go: 'I see it: mark and measure',
    indep: 'An independent student project for the 2026 NASA Space Apps Challenge. Not made, reviewed or endorsed by NASA.',
    credit: 'Images: NASA/JPL-Caltech, SPHEREx, via NASA/IPAC IRSA.',
    alt: (v, n, d, k) => `Infrared photo of the sky around Epsilon Indi B, visit ${v} of ${n}, ${d}, ${k} photos added together. The brown dwarf is the large dot left of centre. Two fainter stars sit on the same row to its right and stay put.`,
  },
  ro: {
    skip: 'Sari la conținut', navLabel: 'Pași', navLook: 'Privește', navMeasure: 'Măsoară', navElse: 'În altă parte', dark: 'Camera obscură',
    s1Over: 'Epsilon Indi B, văzut de SPHEREx', s1Title: 'În 1930, un tânăr de <span class="nw">24 de ani</span> a descoperit Pluto comutând între două fotografii ale aceluiași cer.',
    s1Lead: 'Iată două fotografii infraroșii reale ale aceluiași petic de cer, făcute de telescopul SPHEREx al NASA la 17 luni distanță. Comută între ele. Cele mai multe puncte stau pe loc. Unul nu.',
    s1Go: 'Găsește ce s-a mișcat', s1Else: 'Privește în altă parte', plate: 'Placa', then: 'Atunci', now: 'Acum', hold: 'Ține apăsat',
    holdHint: 'Ține apăsat butonul sau bara de spațiu. O atingere o lasă întoarsă.',
    blinkPause: 'Oprește clipirea automată', blinkPlay: 'Clipire automată',
    real: 'Foto reală, doar mărită și tonată. Mai închis: mai luminos în infraroșu.', realPos: 'Foto reală, doar mărită și tonată. Mai deschis: mai luminos în infraroșu.',
    of: 'din', pause: 'Pauză', play: 'Pornește',
    scale30: '30 de secunde de arc', orient: 'Nordul sus, estul la stânga', axisLabel: 'Data vizitei', filmLabel: 'Comenzile filmului',
    earlier: 'Mai devreme', later: 'Mai târziu', keysHint: 'Sau folosește săgețile stânga și dreapta.', step1: 'Pasul 1 din 2: privește',
    s2Title: 'Cinci vizite la același petic de cer', s2Lead: 'SPHEREx a fotografiat acest petic de cinci ori în 17 luni. Pornește vizitele: un punct alunecă, vecinii lui stau pe loc.',
    thisVisit: 'Această vizită', roVisit: 'Vizita', roDates: 'Datele', roLight: 'Lumina', roPhotos: 'Fotografii adunate',
    near: 'Infraroșu apropiat, imediat după lumina roșie:', um: 'microni', glStackTerm: 'O stivă.', glStack: 'Mai multe fotografii ale aceluiași petic, adunate. Zgomotul se anulează parțial, așa că obiectele slabe se văd mai bine decât în orice fotografie singură.',
    marksH: 'Semne pe placă', mkMoved: 'Încercuiește punctul care s-a mișcat', mkFirst: 'Arată unde era la vizita 1', mkStars: 'Bifează stelele care stau pe loc',
    viewH: 'Cum arată placa', viewNeg: 'Negativ: stele închise pe placă deschisă', viewPos: 'Pozitiv: cum a văzut-o camera', realPx: 'Pixeli reali: pătratele adevărate, nemărite lin',
    s2Go: 'Îl văd: marchează și măsoară',
    indep: 'Proiect studențesc independent pentru NASA Space Apps Challenge 2026. Nu este realizat, verificat sau aprobat de NASA.',
    credit: 'Imagini: NASA/JPL-Caltech, SPHEREx, prin NASA/IPAC IRSA.',
    alt: (v, n, d, k) => `Fotografie infraroșie a cerului din jurul lui Epsilon Indi B, vizita ${v} din ${n}, ${d}, ${k} fotografii adunate. Pitica brună este punctul mare din stânga centrului. Două stele mai slabe, pe același rând la dreapta, stau pe loc.`,
  },
};
let lang = qp.get('lang') === 'ro' ? 'ro' : 'en';
const t = k => STR[lang][k] ?? STR.en[k];

// ---------- dates ----------
const mjdDate = mjd => new Date((mjd - 40587) * 864e5);
const loc = () => (lang === 'ro' ? 'ro-RO' : 'en-GB');
const fmt = (mjd, o = { day: 'numeric', month: 'long', year: 'numeric' }) => new Intl.DateTimeFormat(loc(), { ...o, timeZone: 'UTC' }).format(mjdDate(mjd));
const fmtShort = mjd => fmt(mjd, { day: 'numeric', month: 'short', year: 'numeric' }).replace('.', '');
function fmtRange(a, b) {
  const A = mjdDate(a), B = mjdDate(b), sameY = A.getUTCFullYear() === B.getUTCFullYear(), sameM = sameY && A.getUTCMonth() === B.getUTCMonth();
  const to = lang === 'ro' ? ' – ' : ' to ';
  if (sameM) return `${A.getUTCDate()}${to}${fmt(b)}`;
  if (sameY) return `${fmt(a, { day: 'numeric', month: 'long' })}${to}${fmt(b)}`;
  return `${fmt(a)}${to}${fmt(b)}`;
}

// ---------- the plate renderer ----------
async function f32(url) { return new Float32Array(await (await fetch(url)).arrayBuffer()); }
// 256-entry tone ramps. Negative: warm plate white to ink, like a silver plate. Positive: night to paper white through a deep red.
function ramp(stops) {
  const L = new Uint8ClampedArray(256 * 3);
  for (let i = 0; i < 256; i++) {
    const v = i / 255; let k = 0; while (k < stops.length - 2 && v > stops[k + 1][0]) k++;
    const [a, ca] = stops[k], [b, cb] = stops[k + 1], f = (v - a) / (b - a);
    for (let c = 0; c < 3; c++) L[i * 3 + c] = ca[c] + (cb[c] - ca[c]) * f;
  }
  return L;
}
const LUT = {
  neg: ramp([[0, [252, 250, 245]], [.12, [246, 243, 236]], [.45, [168, 160, 146]], [.75, [70, 64, 55]], [1, [20, 19, 16]]]),
  pos: ramp([[0, [14, 13, 11]], [.3, [74, 26, 20]], [.62, [196, 120, 92]], [1, [255, 249, 236]]]),
};
let view = qp.get('view');
let realPx = qp.get('real') === '1';
const curView = () => view || (document.documentElement.dataset.theme === 'dark' ? 'pos' : 'neg');

// asinh stretch with the group's own display parameters (manifest), on a grid with a 2 px border for the resampler
const medians = new WeakMap();
function plateStretch(data, disp) { // ponytail: one median per frame, sorted copy; cached
  let med = medians.get(data);
  if (med === undefined) { const v = Float32Array.from(data.filter(Number.isFinite)).sort(); med = v[v.length >> 1]; medians.set(data, med); }
  return { vmin: med + .5 * disp.sigma, vmax: disp.vmax, soft: disp.plateSoft ?? .05 };
}
function stretched(data, d0, x0, y0, n, b) {
  const disp = plateStretch(data, d0), m = n + 2 * b, G = new Float32Array(m * m), k = Math.asinh(1 / disp.soft);
  for (let y = 0; y < m; y++) for (let x = 0; x < m; x++) {
    const X = Math.min(120, Math.max(0, x0 - b + x)), Y = Math.min(120, Math.max(0, y0 - b + y)), v = data[Y * 121 + X];
    const tt = Math.min(1, Math.max(0, (v - disp.vmin) / (disp.vmax - disp.vmin)));
    G[y * m + x] = Number.isFinite(v) ? Math.asinh(tt / disp.soft) / k : 0;
  }
  return G;
}
// Catmull-Rom bicubic upscale by an integer factor, separable (rows, then columns)
function bicubic(G, m, n, b, s) {
  const W = n * s, idx = new Int32Array(W), wt = new Float32Array(W * 4);
  for (let u = 0; u < W; u++) {
    const c = (u + .5) / s - .5 + b, i = Math.floor(c), f = c - i, f2 = f * f, f3 = f2 * f;
    idx[u] = i - 1;
    wt[u * 4] = -.5 * f3 + f2 - .5 * f; wt[u * 4 + 1] = 1.5 * f3 - 2.5 * f2 + 1; wt[u * 4 + 2] = -1.5 * f3 + 2 * f2 + .5 * f; wt[u * 4 + 3] = .5 * f3 - .5 * f2;
  }
  const tmp = new Float32Array(m * W), out = new Float32Array(W * W);
  for (let r = 0; r < m; r++) for (let u = 0; u < W; u++) { const o = r * m + idx[u], q = u * 4; tmp[r * W + u] = G[o] * wt[q] + G[o + 1] * wt[q + 1] + G[o + 2] * wt[q + 2] + G[o + 3] * wt[q + 3]; }
  for (let v = 0; v < W; v++) { const i = idx[v], q = v * 4; for (let u = 0; u < W; u++) out[v * W + u] = tmp[i * W + u] * wt[q] + tmp[(i + 1) * W + u] * wt[q + 1] + tmp[(i + 2) * W + u] * wt[q + 2] + tmp[(i + 3) * W + u] * wt[q + 3]; }
  return out;
}
const cache = new Map();
function render(canvas, data, disp, x0, y0, n, key) {
  const smooth = !realPx, s = smooth ? UP : 1, W = n * s, ck = `${key}|${curView()}|${smooth}`;
  let img = cache.get(ck);
  if (!img) {
    const b = 2, m = n + 2 * b, G = stretched(data, disp, x0, y0, n, b), V = smooth ? bicubic(G, m, n, b, s) : null, L = LUT[curView()];
    img = new ImageData(W, W);
    for (let y = 0; y < W; y++) for (let x = 0; x < W; x++) {
      const v = smooth ? V[y * W + x] : G[(y + b) * m + x + b], li = Math.round(Math.min(1, Math.max(0, v)) * 255) * 3, i = (y * W + x) * 4;
      img.data[i] = L[li]; img.data[i + 1] = L[li + 1]; img.data[i + 2] = L[li + 2]; img.data[i + 3] = 255;
    }
    cache.set(ck, img);
  }
  if (canvas.width !== W) canvas.width = canvas.height = W;
  canvas.getContext('2d').putImageData(img, 0, 0);
  canvas.classList.toggle('px', !smooth);
}
function paintRamps() {
  const L = LUT[curView()]; let g = [];
  for (let i = 0; i <= 8; i++) { const j = Math.round(i / 8 * 255) * 3; g.push(`rgb(${L[j]} ${L[j + 1]} ${L[j + 2]}) ${i * 12.5}%`); }
  $$('.ramp').forEach(r => { r.style.background = `linear-gradient(90deg, ${g.join(', ')})`; });
}

// overlay shapes, in grid pixels of the crop (pixel centres at +0.5)
const at = (x, y, c = CROP) => [x - c.x0 + .5, y - c.y0 + .5];
const ring = (x, y, r = 3.4) => `<circle class="m-moved-h" cx="${x}" cy="${y}" r="${r}"/><circle class="m-moved" cx="${x}" cy="${y}" r="${r}"/>`;
const cross = (x, y, a = 1.6) => { const d = `M${x - a} ${y}H${x + a}M${x} ${y - a}V${y + a}`; return `<path class="m-first-h" d="${d}"/><path class="m-star" d="${d}"/>`; };
const ticks = (x, y) => { const d = `M${x} ${y - 2.6}V${y - 5.4}M${x - 2.6} ${y}H${x - 5.4}`; return `<path class="m-star-h" d="${d}"/><path class="m-star" d="${d}"/>`; };
const label = (x, y, s, red, z = 1) => `<text class="m-lbl${red ? ' red' : ''}" x="${x}" y="${y}" style="font-size:${z}px">${s}</text>`;

function addReg() {
  $$('.frame').forEach(f => ['tl', 'tr', 'bl', 'br'].forEach(c => { const r = $('#reg').content.firstElementChild.cloneNode(true); r.classList.add(c); f.prepend(r); }));
}

// ---------- state ----------
const S = { g: null, m: null, frames: [], i: 0, playing: false, timer: 0, blinkOn: false, flipped: false, held: false, blinkT: 0,
  marks: new Set((qp.get('marks') ?? 'stars').split(',').filter(Boolean)) };
let tA = 0, tB = 0;
const pct = mjd => (mjd - tA) / (tB - tA);

function buildRuler() {
  const P = S.g.passes; tA = P[0].mjdMid - 22; tB = P.at(-1).mjdMid + 22;
  let s = '';
  const d0 = mjdDate(tA);
  for (let d = new Date(Date.UTC(d0.getUTCFullYear(), d0.getUTCMonth() + 1, 1)); d < mjdDate(tB); d.setUTCMonth(d.getUTCMonth() + 1)) {
    const p = pct(d / 864e5 + 40587) * 100, yr = d.getUTCMonth() === 0;
    s += `<span class="tk${yr ? ' yr' : ''}" style="left:${p}%"></span>`;
    if (yr) s += `<span class="yl" style="left:${p}%">${d.getUTCFullYear()}</span>`;
  }
  s += `<span class="yl" style="left:0">${mjdDate(tA).getUTCFullYear()}</span>`;
  P.forEach((q, i) => {
    const p = pct(q.mjdMid) * 100;
    s += `<span class="vt" style="left:${p}%"></span><span class="vl" data-vl="${i}" style="left:${p}%">${i + 1}</span><span class="ml" style="left:${p}%">${fmt(q.mjdMid, { month: 'short' }).replace('.', '')}</span>`;
  });
  $('[data-ruler]').innerHTML = s;
  const inp = $('[data-visit]'); inp.min = Math.round(tA); inp.max = Math.round(tB); inp.step = 1;
}

const plateAlt = i => { const P = S.g.passes, p = P[i]; return t('alt')(i + 1, P.length, fmtRange(p.mjdStart, p.mjdEnd), p.nExposures); };
const paintVisit = (canvas, i) => render(canvas, S.frames[i], S.g.display, CROP.x0, CROP.y0, CROP.n, `e${i}`);

function drawS2Overlay() {
  const P = S.g.passes, p = P[S.i], a = P[0].measured;
  let s = '';
  if (S.marks.has('stars')) STARS.forEach(([x, y]) => { s += ticks(...at(x, y)); });
  if (S.marks.has('first')) s += cross(...at(a.x, a.y));
  if (S.marks.has('moved')) s += ring(...at(p.measured.x, p.measured.y));
  $('#plate-s2 [data-ov]').innerHTML = s;
  const set = (k, x, y, on) => { const ex = $(`[data-ptr="${k}-x"]`), ey = $(`[data-ptr="${k}-y"]`), [cx, cy] = at(x, y); ex.hidden = ey.hidden = !on; ex.style.setProperty('--x', cx / CROP.n); ey.style.setProperty('--y', cy / CROP.n); };
  set('first', a.x, a.y, S.marks.has('first'));
  set('now', p.measured.x, p.measured.y, S.marks.has('moved'));
}

function show(i, announce = true) {
  const P = S.g.passes; S.i = (i + P.length) % P.length;
  const p = P[S.i], fig = $('#plate-s2'), cv = $('[data-sky]', fig);
  paintVisit(cv, S.i);
  cv.setAttribute('aria-label', plateAlt(S.i));
  drawS2Overlay();
  $('[data-pl-n]', fig).textContent = `${S.i + 1} / ${P.length}`;
  $('[data-pl-date]', fig).textContent = fmt(p.mjdMid);
  $('[data-ro="visit"]').textContent = `${S.i + 1} ${t('of')} ${P.length}`;
  $('[data-ro="dates"]').textContent = fmtRange(p.mjdStart, p.mjdEnd);
  $('[data-ro="light"]').textContent = t('near');
  $('[data-ro="um"]').textContent = `${p.wavelengthUmMin.toFixed(2)} ${lang === 'ro' ? '–' : 'to'} ${p.wavelengthUmMax.toFixed(2)} ${t('um')}`;
  $('[data-ro="photos"]').textContent = p.nExposures;
  $$('[data-vl]').forEach(el => el.classList.toggle('on', +el.dataset.vl === S.i));
  const inp = $('[data-visit]'); inp.value = Math.round(p.mjdMid);
  const vt = `${t('roVisit')} ${S.i + 1} ${t('of')} ${P.length}, ${fmt(p.mjdMid)}`;
  inp.setAttribute('aria-valuetext', vt);
  if (announce && !S.playing) $('[data-live]').textContent = vt;
}

function setPlaying(on) {
  S.playing = on; clearInterval(S.timer);
  $('[data-play]').dataset.state = on ? 'playing' : 'paused'; $('[data-play-label]').textContent = on ? t('pause') : t('play');
  if (on) S.timer = setInterval(() => show(S.i + 1, false), 1000); // one change a second, well under the 3 flashes ceiling
}

// ---------- S1: the blink comparator ----------
function blinkFrame() {
  const P = S.g.passes, now = S.flipped || S.held, i = now ? P.length - 1 : 0, fig = $('#plate-s1'), cv = $('[data-sky]', fig);
  paintVisit(cv, i); // instant flip, no cross-fade
  cv.setAttribute('aria-label', plateAlt(i));
  $('[data-pl-date]', fig).textContent = fmt(P[i].mjdMid);
  const k = $('[data-hold]'); k.dataset.show = now ? 'now' : 'then'; k.setAttribute('aria-pressed', S.flipped);
}
function setBlink(on) {
  S.blinkOn = on; clearInterval(S.blinkT);
  $('[data-blink]').dataset.state = on ? 'playing' : 'paused';
  $('[data-blink-label]').textContent = on ? t('blinkPause') : t('blinkPlay');
  if (on) S.blinkT = setInterval(() => { S.flipped = !S.flipped; blinkFrame(); }, 1100);
}
function hold(on) { if (!S.g) return; if (on && S.blinkOn) { setBlink(false); S.flipped = false; } S.held = on; blinkFrame(); }
{
  const k = $('[data-hold]'); let down = 0, longPress = false;
  k.addEventListener('pointerdown', e => { if (e.button) return; down = performance.now(); longPress = false; hold(true); });
  const up = () => { if (!down) return; longPress = performance.now() - down > 280; down = 0; hold(false); };
  k.addEventListener('pointerup', up); k.addEventListener('pointercancel', up); k.addEventListener('pointerleave', up);
  k.addEventListener('contextmenu', e => e.preventDefault());
  k.addEventListener('click', e => { // a tap or Enter latches; a long press was a momentary hold
    if (longPress) { longPress = false; return; }
    if (S.blinkOn) setBlink(false);
    S.flipped = !S.flipped; blinkFrame();
  });
  // hold Space anywhere on S1 (not while typing or on another control)
  const spaceOk = e => e.code === 'Space' && document.body.dataset.route === '/' && (e.target === k || !e.target.closest('input, textarea, select, button, a'));
  document.addEventListener('keydown', e => { if (!spaceOk(e)) return; e.preventDefault(); if (!e.repeat) hold(true); });
  document.addEventListener('keyup', e => { if (!spaceOk(e)) return; e.preventDefault(); hold(false); });
}

// ---------- S3 ----------
function drawS3() {
  const P = S.g.passes, a = P[0].measured, b = P.at(-1).measured, fig = $('#plate-s3'), Z = ZOOM;
  const cv = $('[data-sky]', fig);
  const f = S.frames.at(-1); let peak = 0; for (let y = Z.y0; y < Z.y0 + Z.n; y++) for (let x = Z.x0; x < Z.x0 + Z.n; x++) peak = Math.max(peak, f[y * 121 + x] || 0);
  render(cv, f, { ...S.g.display, vmax: peak * 1.05, plateSoft: .4 }, Z.x0, Z.y0, Z.n, `z${P.length - 1}`); // close-up: top of the stretch at the crop's peak, so the core is not a flat black disc
  cv.setAttribute('aria-label', `Close-up of the last visit, ${fmt(P.at(-1).mjdMid)}, with your two marks: a cross where the dot was on the first visit and a small red ring where it is now, a little lower and to the left, about 6.5 arcseconds away. A dashed trail joins them.`);
  $('[data-pl-date]', fig).textContent = fmt(P.at(-1).mjdMid);
  const [ax, ay] = at(a.x, a.y, Z), [bx, by] = at(b.x, b.y, Z);
  $('[data-ov]', fig).innerHTML = `<path class="m-trail-h" d="M${ax} ${ay}L${bx} ${by}"/><path class="m-trail" d="M${ax} ${ay}L${bx} ${by}"/>`
    + cross(ax, ay, .9) + ring(bx, by, .75) + label(ax + .5, ay - .7, '1', false, 1.3) + label(bx - 2.2, by + 2.2, '2', true, 1.3);
  const row = (n, g, p, i) => `<tr><th scope="row"><span class="mk">${g}${n}</span></th><td>${i + 1} ${t('of')} ${P.length}, ${fmt(p.mjdMid)}</td><td class="num mono">x ${p.measured.x.toFixed(1)}, y ${p.measured.y.toFixed(1)}</td></tr>`;
  $('[data-marks]').innerHTML = row(1, '<svg viewBox="0 0 28 28" aria-hidden="true"><path class="g-first" d="M14 4v20M4 14h20"/></svg>', P[0], 0)
    + row(2, '<svg viewBox="0 0 28 28" aria-hidden="true"><circle class="g-moved" cx="14" cy="14" r="9"/></svg>', P.at(-1), P.length - 1);
  const tr = S.m.truth, you = tr.rateArcsecPerYear, cat = tr.literature.pmArcsecPerYear, diff = Math.round(Math.abs(you - cat) / cat * 100);
  $('[data-pm-you]').textContent = you.toFixed(2);
  $('[data-pm-say]').textContent = `The dot moved ${tr.motionArcsec.total.toFixed(2)} arcseconds in ${tr.baselineYears.toFixed(2)} years (${fmt(P[0].mjdMid)} to ${fmt(P.at(-1).mjdMid)}). That is ${diff} percent below the catalogue: close.`;
}

// Parallax chart: east offset minus the straight-line motion, against time (data: exp13 pass means).
let PX = null;
function earthF(mjd, ra) { // ponytail: low-precision Sun position; within about 0.01 of exp13's tabulated factors, enough for a drawn curve
  const n = mjd + 2400000.5 - 2451545, r = Math.PI / 180, L = (280.46 + .9856474 * n) * r, g = (357.528 + .9856003 * n) * r;
  const lam = L + 1.915 * r * Math.sin(g) + .02 * r * Math.sin(2 * g), R = 1.00014 - .01671 * Math.cos(g), eps = (23.439 - 4e-7 * n) * r;
  const X = -R * Math.cos(lam), Y = -R * Math.cos(eps) * Math.sin(lam);
  return X * Math.sin(ra) - Y * Math.cos(ra);
}
function drawChart(plxMas) {
  const P = PX, pm = P.literature, ms = P.pass_means, t0 = P.t0, plx = plxMas / 1000, ra = P.reference_point_deg.ra * Math.PI / 180;
  let w = 0, wf = 0, wr = 0; ms.forEach(p => { const a = 1 / p.east_err ** 2; w += a; wf += a * p.fE; wr += a * (p.east - pm.muE * (p.year - t0)); });
  const E0 = (wr - plx * wf) / w;
  const W = 600, H = 250, L = 56, R = 12, T = 14, B = 36, y0 = 2025.2, y1 = 2026.85, v = .5;
  const X = y => L + (y - y0) / (y1 - y0) * (W - L - R), Y = e => T + (v - e) / (2 * v) * (H - T - B);
  let s = `<title id="plx-chart-t">East to west wobble of Epsilon Indi B once its straight-line motion is taken out: five measured visits with error bars, and the curve for a parallax of ${plxMas} milliarcseconds.</title>`;
  [-.4, 0, .4].forEach(e => { s += `<line class="${e ? 'c-grid' : 'c-axis'}" x1="${L}" x2="${W - R}" y1="${Y(e)}" y2="${Y(e)}"/><text class="c-t" x="${L - 10}" y="${Y(e) + 4}" text-anchor="end">${e > 0 ? '+' : e < 0 ? '−' : ''}${Math.abs(e).toFixed(1)}″</text>`; });
  [[2025.5, 'Jul 2025'], [2026, 'Jan 2026'], [2026.5, 'Jul 2026']].forEach(([y, l]) => { s += `<line class="c-grid" x1="${X(y)}" x2="${X(y)}" y1="${T}" y2="${H - B}"/><text class="c-t" x="${X(y)}" y="${H - 12}" text-anchor="middle">${l}</text>`; });
  let d = ''; for (let y = y0; y <= y1; y += .01) { const mjd = 51544.5 + (y - 2000) * 365.25; d += (d ? 'L' : 'M') + X(y).toFixed(1) + ' ' + Y(plx * earthF(mjd, ra)).toFixed(1); }
  s += `<path class="c-model" d="${d}"/>`;
  let chi = 0;
  ms.forEach(p => { const e = p.east - pm.muE * (p.year - t0) - E0, x = X(p.year), r = (e - plx * earthF(p.mjd, ra)) / p.east_err; chi += r * r; s += `<line class="c-err" x1="${x}" x2="${x}" y1="${Y(e + p.east_err)}" y2="${Y(e - p.east_err)}"/><circle class="c-pt" cx="${x}" cy="${Y(e)}" r="5.5"/>`; });
  $('#plx-chart').innerHTML = s;
  const ly = 3.26156 * 1000 / plxMas;
  $('#plx-out').textContent = `${plxMas} mas`;
  $('#plx-ly').textContent = `${ly.toFixed(1)} light years`;
  $('#plx-fit').textContent = Math.sqrt(chi / ms.length).toFixed(1);
  $('#plx').setAttribute('aria-valuetext', `${plxMas} milliarcseconds, a distance of ${ly.toFixed(1)} light years`);
}

// ---------- S4 (drafted, not reviewed) ----------
async function drawS4() {
  const m = await (await fetch(`${ROOT}wise0855/manifest.json`)).json(), g = m.groups.find(x => x.id === 'd5d6'), p = g.passes.at(-1);
  const fig = $('#plate-s4'), cv = $('[data-sky]', fig), d = await f32(`${ROOT}wise0855/${p.stack}`);
  render(cv, d, g.display, 0, 0, 121, 'w');
  const pos = p.measured || p.predicted, date = fmtRange(p.mjdStart, p.mjdEnd);
  $('[data-pl-date]', fig).textContent = date; $('[data-w-date]').textContent = date;
  const cx = 38.4 + .5, cy = 61.8 + .5, bx = pos.x + .5, by = pos.y + .5; // challenge position: NOTES.md, verified
  $('[data-ov]', fig).innerHTML = cross(cx, cy, 3.2) + ring(bx, by, 5.5)
    + `<path class="m-arrow" d="M${cx + 4} ${cy - .4}L${bx - 6.5} ${by + .3}"/>`
    + label(cx - 6, cy + 9, '2010') + label(bx - 6, by + 10.5, '2026', true);
  cv.setAttribute('aria-label', `Infrared photo, 6 arcminutes wide, around WISE 0855-0714, ${date}. A cross marks the 2010 catalogue position on empty sky; a red ring 45 pixels to the right (west) marks where the brown dwarf is now.`);
  $$('[data-thumb]').forEach(async c => {
    const mm = await (await fetch(`${ROOT}${c.dataset.thumb}/manifest.json`)).json(), gg = mm.groups[0], pp = gg.passes.at(-1), dd = await f32(`${ROOT}${mm.id}/${pp.stack}`);
    render(c, dd, gg.display, Math.round(pp.predicted.x - 12), Math.round(pp.predicted.y - 12), 24, `t${mm.id}`);
  });
}

// ---------- language, theme, view ----------
function applyLang() {
  document.documentElement.lang = lang;
  $$('[data-i18n]').forEach(el => { const v = t(el.dataset.i18n); if (v !== undefined) el[el.hasAttribute('data-html') ? 'innerHTML' : 'textContent'] = v; });
  $$('[data-i18n-label]').forEach(el => el.setAttribute('aria-label', t(el.dataset.i18nLabel)));
  $$('[data-lang]').forEach(a => a.dataset.lang === lang ? a.setAttribute('aria-current', 'true') : a.removeAttribute('aria-current'));
  $$('[data-name]').forEach(el => { el.textContent = NAME; });
  if (S.g) { buildRuler(); show(S.i, false); setPlaying(S.playing); setBlink(S.blinkOn); fillThenNow(); blinkFrame(); }
  route(false);
}
function fillThenNow() { const P = S.g.passes; $('[data-then]').textContent = fmtShort(P[0].mjdMid); $('[data-now]').textContent = fmtShort(P.at(-1).mjdMid); }
$$('[data-lang]').forEach(a => a.addEventListener('click', e => {
  e.preventDefault(); lang = a.dataset.lang;
  const u = new URL(location); u.searchParams.set('lang', lang); history.replaceState(null, '', u); applyLang();
}));
function repaint() {
  paintRamps();
  $$('[data-i18n="real"], [data-i18n="realPos"]').forEach(el => { el.dataset.i18n = curView() === 'pos' ? 'realPos' : 'real'; el.textContent = t(el.dataset.i18n); });
  $$('[name="view"]').forEach(r => { r.checked = r.value === curView(); });
  $('[data-real]').checked = realPx;
  if (!S.g) return; show(S.i, false); blinkFrame(); drawS3(); drawS4().catch(() => {});
}
function setTheme(th) { document.documentElement.dataset.theme = th; $('[data-theme-toggle]').setAttribute('aria-pressed', th === 'dark'); repaint(); }
$('[data-theme-toggle]').addEventListener('click', () => setTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'));
$$('[name="view"]').forEach(r => r.addEventListener('change', () => { view = r.value; repaint(); }));
$('[data-real]').addEventListener('change', e => { realPx = e.target.checked; repaint(); });

// ---------- S2 controls ----------
$$('.mark-btn').forEach(b => {
  b.setAttribute('aria-pressed', S.marks.has(b.dataset.mark));
  b.addEventListener('click', () => { const k = b.dataset.mark, on = !S.marks.has(k); on ? S.marks.add(k) : S.marks.delete(k); b.setAttribute('aria-pressed', on); drawS2Overlay(); });
});
$$('.term').forEach(b => b.addEventListener('click', () => { const on = b.getAttribute('aria-expanded') !== 'true'; b.setAttribute('aria-expanded', on); document.getElementById(b.getAttribute('aria-controls')).hidden = !on; }));
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') $$('.term[aria-expanded="true"]').forEach(b => { b.setAttribute('aria-expanded', false); document.getElementById(b.getAttribute('aria-controls')).hidden = true; b.focus(); });
  if (document.body.dataset.route === '/look' && S.g && !e.target.closest('input, textarea, select') && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) {
    e.preventDefault(); setPlaying(false); show(S.i + (e.key === 'ArrowLeft' ? -1 : 1));
  }
});
$$('[data-step]').forEach(b => b.addEventListener('click', () => { setPlaying(false); show(S.i + +b.dataset.step); }));
$('[data-play]').addEventListener('click', () => { setPlaying(!S.playing); if (!S.playing) show(S.i); });
$('[data-blink]').addEventListener('click', () => setBlink(!S.blinkOn));
const vin = $('[data-visit]');
vin.addEventListener('input', () => { // pointer drags snap to the nearest real visit date
  const P = S.g.passes; let best = 0; P.forEach((p, i) => { if (Math.abs(p.mjdMid - vin.value) < Math.abs(P[best].mjdMid - vin.value)) best = i; });
  setPlaying(false); show(best);
});
vin.addEventListener('keydown', e => { // keys step visit by visit, not day by day
  const P = S.g.passes, k = e.key, step = { ArrowLeft: -1, ArrowDown: -1, PageDown: -1, ArrowRight: 1, ArrowUp: 1, PageUp: 1 }[k];
  if (step === undefined && k !== 'Home' && k !== 'End') return;
  e.preventDefault(); e.stopPropagation(); setPlaying(false);
  show(k === 'Home' ? 0 : k === 'End' ? P.length - 1 : Math.max(0, Math.min(P.length - 1, S.i + step)));
});
$('[data-search]').addEventListener('submit', e => {
  e.preventDefault();
  const norm = x => x.toLowerCase().replace(/[’']/g, ''), q = norm($('#q').value.trim()), msg = $('#q-msg');
  const hit = q.length > 2 && $$('.targets li').find(li => norm($('a', li).textContent).includes(q));
  $$('.targets li').forEach(li => li.classList.remove('hl'));
  if (!q) msg.textContent = 'Type a name, for example Barnard’s Star.';
  else if (hit) { hit.classList.add('hl'); msg.textContent = `Found: ${$('a', hit).textContent}. It is in the list below.`; }
  else msg.textContent = `We have no SPHEREx pictures of “${$('#q').value.trim()}” in this demo yet. Try one of the five patches below.`;
});
$('[data-surprise]').addEventListener('click', () => { const L = $$('.targets li'), li = L[Math.floor(Math.random() * L.length)]; L.forEach(x => x.classList.remove('hl')); li.classList.add('hl'); $('a', li).focus(); });

function scaleBars() { // 30 arcsec = 10 grid pixels; the bar scales with the crop each plate shows
  $$('.plate').forEach(f => { const c = $('canvas', f), b = $('.bar', f); if (b && c.clientWidth) b.style.width = `${c.clientWidth * (b.classList.contains('bar-121') ? 20 / 121 : 10 / (f.id === 'plate-s3' ? ZOOM.n : CROP.n))}px`; });
}
addEventListener('resize', scaleBars);

// ---------- routes ----------
function route(moveFocus = true) {
  const r = location.hash.replace(/^#/, '') || '/';
  const hit = $$('.screen').find(s => s.dataset.route === r) || $('.screen');
  $$('.screen').forEach(s => { s.hidden = s !== hit; });
  document.body.dataset.route = hit.dataset.route;
  $$('.steps a').forEach(a => a.getAttribute('href') === '#' + hit.dataset.route ? a.setAttribute('aria-current', 'page') : a.removeAttribute('aria-current'));
  document.title = hit.dataset.route === '/' ? NAME : `${$('h1', hit).textContent}: ${NAME}`;
  if (S.g) { if (hit.dataset.route !== '/') setBlink(false); if (hit.dataset.route !== '/look') setPlaying(false); }
  scaleBars();
  if (moveFocus) { const h = $('h1', hit); h.tabIndex = -1; h.focus({ preventScroll: true }); scrollTo(0, 0); }
}
addEventListener('hashchange', () => route(true));

// ---------- boot ----------
async function boot() {
  addReg();
  setTheme(qp.get('theme') || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));
  applyLang();
  S.m = await (await fetch(`${ROOT}epsindb/manifest.json`)).json();
  S.g = S.m.groups.find(g => g.id === 'd2');
  S.frames = await Promise.all(S.g.passes.map(p => f32(`${ROOT}epsindb/${p.stack}`)));
  buildRuler(); fillThenNow();
  show(qp.has('visit') ? +qp.get('visit') : 0, false);
  if (qp.get('term') === '1') $('[aria-controls="g-stack"]').click();
  S.flipped = qp.get('flip') === '1'; blinkFrame(); setBlink(!reduce && qp.get('play') !== '0');
  drawS3();
  PX = await (await fetch('/docs/research/experiments/exp13_parallax_epsindb.json')).json();
  const plx = $('#plx'); if (qp.get('plx')) plx.value = qp.get('plx');
  plx.addEventListener('input', () => drawChart(+plx.value)); drawChart(+plx.value);
  drawS4().catch(() => {});
  repaint(); route(false);
  document.body.dataset.ready = '1';
}
boot();
