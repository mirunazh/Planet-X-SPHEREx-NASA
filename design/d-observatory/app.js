// Skyblink, direction D "Observatory". Vanilla JS, no build. The sky is two stage-size canvases (then, now).
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const ROOT = '/assets/missions/', N = 121, U = 4, M = N * U;
const qp = new URLSearchParams(location.search);
const RM = matchMedia('(prefers-reduced-motion: reduce)').matches || qp.get('still') === '1';
const css = getComputedStyle(document.documentElement), tok = n => css.getPropertyValue(n).trim();
const wait = ms => new Promise(r => setTimeout(r, ms));

// ---------- colour ramps (from the token block) ----------
function hex(h) { return [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16)); }
function ramp(stops) {
  const lut = new Uint8Array(256 * 3);
  for (let i = 0; i < 256; i++) {
    const t = i / 255; let k = 0; while (k < stops.length - 2 && t > stops[k + 1][0]) k++;
    const [t0, a] = stops[k], [t1, b] = stops[k + 1], f = Math.min(1, Math.max(0, (t - t0) / (t1 - t0)));
    for (let c = 0; c < 3; c++) lut[i * 3 + c] = Math.round(a[c] + (b[c] - a[c]) * f);
  }
  return lut;
}
const EMBER = ramp([[0, hex(tok('--void'))], [.12, hex(tok('--e0'))], [.30, hex(tok('--e1'))], [.48, hex(tok('--e2'))], [.64, hex(tok('--e3'))], [.82, hex(tok('--e4'))], [1, hex(tok('--e5'))]]);
// diverging for the difference view: violet (where it was) . black . amber (where it is now)
const DIVERGE = ramp([[0, hex(tok('--e5'))], [.12, hex(tok('--e2'))], [.32, hex(tok('--e1'))], [.5, hex(tok('--void'))], [.68, hex(tok('--e3'))], [.88, hex(tok('--e4'))], [1, hex(tok('--e5'))]]);

// ---------- data ----------
async function f32(url) { return new Float32Array(await (await fetch(url)).arrayBuffer()); }
// asinh stretch from the manifest, then a black point just above the noise floor so the empty sky is true black
const BP = +(qp.get('bp') ?? .13), GAIN = +(qp.get('gain') ?? 1.8); // GAIN > 1 keeps the bright cores from clipping to one white blob
const stretch = (v, d, bp = BP) => { const t = Math.min(1, Math.max(0, (v - d.vmin) / ((d.vmax - d.vmin) * GAIN))), a = Math.asinh(t / d.soft) / Math.asinh(1 / d.soft); return Math.max(0, (a - bp) / (1 - bp)); };
function cr(p0, p1, p2, p3, t) { return p1 + .5 * t * (p2 - p0 + t * (2 * p0 - 5 * p1 + 4 * p2 - p3 + t * (3 * (p1 - p2) + p3 - p0))); }
function upsample(a) { // separable Catmull-Rom, N -> M; display only, the honest squares stay one toggle away
  const cl = i => i < 0 ? 0 : i >= N ? N - 1 : i, h = new Float32Array(M * N), o = new Float32Array(M * M);
  for (let y = 0; y < N; y++) for (let x = 0; x < M; x++) { const s = (x + .5) / U - .5, i = Math.floor(s), r = y * N; h[y * M + x] = cr(a[r + cl(i - 1)], a[r + cl(i)], a[r + cl(i + 1)], a[r + cl(i + 2)], s - i); }
  for (let y = 0; y < M; y++) { const s = (y + .5) / U - .5, i = Math.floor(s), t = s - i; for (let x = 0; x < M; x++) o[y * M + x] = cr(h[cl(i - 1) * M + x], h[cl(i) * M + x], h[cl(i + 1) * M + x], h[cl(i + 2) * M + x], t); }
  return o;
}
function canvasOf(n) { const c = document.createElement('canvas'); c.width = c.height = n; return c; }
function paintInto(c, vals, lut, k = 1) { // k: 0..1 develop; brightest cores appear first
  const g = c.getContext('2d'), n = c.width, im = g.createImageData(n, n), th = (1 - k) * .9, ex = Math.min(1, k * 2.2);
  for (let i = 0; i < vals.length; i++) { let v = vals[i]; v = th ? Math.max(0, v - th) / (1 - th) : v; const j = Math.min(255, Math.max(0, Math.round(v * ex * 255))) * 3, p = i * 4; im.data[p] = lut[j]; im.data[p + 1] = lut[j + 1]; im.data[p + 2] = lut[j + 2]; im.data[p + 3] = 255; }
  g.putImageData(im, 0, 0);
}
function layer(raw, d, lut = EMBER, map = v => stretch(v, d)) {
  const clean = raw.map(v => v === v ? v : 0), s = clean.map(map), L = { s: upsample(clean).map(map), s1: s, c: canvasOf(M), c1: canvasOf(N), lut };
  L.paint = (k = 1) => { paintInto(L.c, L.s, lut, k); if (k === 1) paintInto(L.c1, L.s1, lut); };
  L.paint(); return L;
}

// ---------- camera: where the sky sits on the stage ----------
const stage = $('#stage'), cvThen = $('#sky-then'), cvNow = $('#sky-now'), marks = $('#marks');
let cam = { fx: 60, fy: 60, ax: .6, ay: .4, s: 18 }, real = false, W = innerWidth, H = innerHeight;
const toScreen = (x, y) => [cam.ax * W + (x - cam.fx) * cam.s, cam.ay * H + (y - cam.fy) * cam.s];
const toData = (X, Y) => [cam.fx + (X - cam.ax * W) / cam.s, cam.fy + (Y - cam.ay * H) / cam.s];
const bloom = canvasOf(8);
function bake(cv, L) {
  const dpr = devicePixelRatio || 1; cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
  const g = cv.getContext('2d'); g.setTransform(dpr, 0, 0, dpr, 0, 0); g.fillStyle = tok('--void'); g.fillRect(0, 0, W, H);
  if (!L) return;
  const [dx, dy] = toScreen(-.5, -.5), size = N * cam.s;
  if (real) { g.imageSmoothingEnabled = false; g.drawImage(L.c1, dx, dy, size, size); return; }
  g.imageSmoothingEnabled = true; g.imageSmoothingQuality = 'high'; g.drawImage(L.c, dx, dy, size, size);
  const fe = cam.s * 10, v = tok('--void'); // the photo's own edge dissolves into the page, never a hard line
  [[dx, 0, dx + fe, 0], [dx + size, 0, dx + size - fe, 0], [0, dy, 0, dy + fe], [0, dy + size, 0, dy + size - fe]].forEach(([x0, y0, x1, y1]) => {
    const gr = g.createLinearGradient(x0, y0, x1, y1); gr.addColorStop(0, v); gr.addColorStop(1, 'rgba(0,0,0,0)'); g.fillStyle = gr;
    g.fillRect(Math.min(x0, x1) || 0, Math.min(y0, y1) || 0, x0 === x1 ? W : fe, y0 === y1 ? H : fe);
  });
  // soft glow: a sixth-size copy, blurred and screened back on (the embers)
  bloom.width = Math.ceil(W / 6); bloom.height = Math.ceil(H / 6);
  const b = bloom.getContext('2d'); b.filter = 'blur(2px)'; b.drawImage(L.c, dx / 6, dy / 6, size / 6, size / 6);
  g.globalCompositeOperation = 'screen'; g.globalAlpha = .55; g.drawImage(bloom, 0, 0, W, H); g.globalAlpha = 1; g.globalCompositeOperation = 'source-over';
}

// ---------- state ----------
const S = { route: 'home', now: false, keep: false, answered: qp.get('a') === '1', diff: false, visit: 0, marks: { was: true, now: true, path: true } };
let EPS, EPSL = [], WISE, WISEL = [], DIFF, PX;

// ---------- the blink control (one template, instanced) ----------
const T = {
  en: { skip: 'Skip to the controls', navExplore: 'Explore the sky', h1: 'Find the next Tombaugh.', lede: "Two real photos of the same patch of sky, taken 17 months apart by NASA's SPHEREx telescope. Flip between them and one star jumps.", start: 'Start mission 1', time: 'about 3 min', any: 'Look at any spot in the sky', legend: 'Real photo, only enlarged and coloured. Colour shows brightness, not real colour.', real: 'Real pixels', indep: 'An independent student project for the 2026 NASA Space Apps Challenge; not made, reviewed or endorsed by NASA.', credit: 'Images: NASA/JPL-Caltech, SPHEREx, via NASA/IPAC IRSA.', hold: 'Hold to blink', holdHow: 'or hold', space: 'Space', then: 'Then', now: 'Now', keep: 'Keep it flipped', dThen: 'Apr to May 2025', dNow: 'Sep to Oct 2026', showing: 'Showing' },
  ro: { skip: 'Sari la comenzi', navExplore: 'Explorează cerul', h1: 'Găsește următorul Tombaugh.', lede: 'Două fotografii reale ale aceluiași colț de cer, făcute la 17 luni distanță de telescopul SPHEREx al NASA. Comută între ele și o stea sare.', start: 'Începe misiunea 1', time: 'cam 3 minute', any: 'Privește orice colț de cer', legend: 'Fotografie reală, doar mărită și colorată. Culoarea arată strălucirea, nu culoarea reală.', real: 'Pixeli reali', indep: 'Un proiect studențesc independent pentru NASA Space Apps Challenge 2026; nu este realizat, verificat sau aprobat de NASA.', credit: 'Imagini: NASA/JPL-Caltech, SPHEREx, prin NASA/IPAC IRSA.', hold: 'Ține ca să comuți', holdHow: 'sau ține', space: 'Spațiu', then: 'Atunci', now: 'Acum', keep: 'Lasă-l comutat', dThen: 'apr.–mai 2025', dNow: 'sept.–oct. 2026', showing: 'Se vede' },
};
let lang = qp.get('lang') === 'ro' ? 'ro' : 'en';
function applyLang() {
  document.documentElement.lang = lang;
  $$('[data-i18n]').forEach(e => { const v = T[lang][e.dataset.i18n]; if (v) e.textContent = v; });
  $$('[data-d="then"]').forEach(e => e.textContent = T[lang].dThen); $$('[data-d="now"]').forEach(e => e.textContent = T[lang].dNow);
  $$('.lang button').forEach(b => b.setAttribute('aria-pressed', b.dataset.lang === lang));
}
$$('[data-blink]').forEach(slot => slot.append($('#t-blink').content.cloneNode(true)));

function flip(on, announce = true) {
  if (S.now === on) return; S.now = on;
  if (!S.diff) { cvNow.classList.toggle('off', !on); cvThen.classList.toggle('off', on); }
  $$('.key').forEach(k => k.setAttribute('aria-pressed', on));
  $$('.when [data-w]').forEach(e => e.toggleAttribute('data-on', (e.dataset.w === 'now') === on));
  if (announce) $('#live').textContent = `${T[lang].showing}: ${on ? T[lang].dNow : T[lang].dThen}`;
}
const held = new Set();
const press = (id, on) => { on ? held.add(id) : held.delete(id); flip(held.size > 0 ? !S.keep : S.keep); };
$$('.key').forEach(k => {
  k.addEventListener('pointerdown', e => { if (e.button) return; k.setPointerCapture(e.pointerId); press('p', true); });
  ['pointerup', 'pointercancel'].forEach(t => k.addEventListener(t, () => press('p', false)));
  k.addEventListener('click', e => { if (e.detail === 0) setKeep(!S.keep); }); // Enter on the key: toggle
  k.addEventListener('contextmenu', e => e.preventDefault());
});
function setKeep(v) { S.keep = v; $$('[data-keep]').forEach(s => s.setAttribute('aria-checked', v)); flip(held.size ? !v : v); }
$$('[data-keep]').forEach(s => s.addEventListener('click', () => setKeep(!S.keep)));
const typing = t => t.closest && t.closest('input, textarea, select, [contenteditable]');
const spaceOk = t => t === document.body || t === stage || t.classList?.contains('key');
addEventListener('keydown', e => { if (e.code === 'Space' && !typing(e.target) && spaceOk(e.target) && S.route !== 'explore') { e.preventDefault(); if (!e.repeat) press('k', true); } });
addEventListener('keyup', e => { if (e.code === 'Space' && held.has('k')) { e.preventDefault(); press('k', false); } });
addEventListener('blur', () => { held.clear(); flip(S.keep); });

// ---------- overlay marks ----------
const ns = 'http://www.w3.org/2000/svg';
function reticle(x, y, r = 34, cls = 'reticle') {
  const [X, Y] = toScreen(x, y), t = [0, 90, 180, 270].map(a => { const c = Math.cos(a * Math.PI / 180), s = Math.sin(a * Math.PI / 180); return `<line x1="${(r + 4) * c}" y1="${(r + 4) * s}" x2="${(r + 12) * c}" y2="${(r + 12) * s}"/>`; }).join('');
  return `<g transform="translate(${X.toFixed(1)} ${Y.toFixed(1)})"><g class="${cls}" style="transform-box:fill-box;transform-origin:center"><circle class="halo" r="${r}"/><circle r="${r}"/><g class="ticks">${t}</g></g></g>`;
}
function ring(x, y, cls, label, r = 20, dy = -1) {
  const [X, Y] = toScreen(x, y);
  return `<circle class="${cls}" cx="${X}" cy="${Y}" r="${r}"/>` + (label ? `<text class="mark-label" x="${X + r + 8}" y="${Y + dy * (r - 6)}">${label}</text>` : '');
}
function trailPath(a, b) { const [x1, y1] = toScreen(a.x, a.y), [x2, y2] = toScreen(b.x, b.y); return `<line class="trail" id="trail" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"/>`; }
function scalebar(arcsec = 10) {
  const len = arcsec / 3 * cam.s, X = W < 760 ? 16 : 56, Y = W < 760 ? 92 : S.route === 'explore' ? 128 : H - 120;
  return `<g class="scalebar"><line x1="${X}" y1="${Y}" x2="${X + len}" y2="${Y}"/><line x1="${X}" y1="${Y - 5}" x2="${X}" y2="${Y + 5}"/><line x1="${X + len}" y1="${Y - 5}" x2="${X + len}" y2="${Y + 5}"/><text x="${X}" y="${Y - 12}">${arcsec} arcseconds</text></g>`;
}
let cross = null;
function drawMarks() {
  marks.setAttribute('viewBox', `0 0 ${W} ${H}`);
  let s = '';
  const P0 = EPS && EPS.p0, P1 = EPS && EPS.p1, mid = P0 && { x: (P0.x + P1.x) / 2, y: (P0.y + P1.y) / 2 };
  if (S.route === 'home' && S.settled) s = reticle(mid.x, mid.y, W < 760 ? 36 : 46);
  if (S.route === 'spot') {
    if (S.miss) s += ring(S.miss[0], S.miss[1], 'mark-miss', 'not this one', 16);
    if (S.answered) s += trailPath(P0, P1) + reticle(mid.x, mid.y, 34);
    else if (cross) { const [X, Y] = toScreen(cross[0], cross[1]); s += `<g class="cross" transform="translate(${X} ${Y})"><line x1="-18" x2="-6"/><line x1="6" x2="18"/><line y1="-18" y2="-6"/><line y1="6" y2="18"/></g>`; }
  }
  if (S.route === 'measure' && P0) s += trailPath(P0, P1) + ring(P0.x, P0.y, 'mark-then', T.en.then + ', ' + T.en.dThen, 18, -1) + ring(P1.x, P1.y, 'mark-now', T.en.now + ', ' + T.en.dNow, 18, 2.2) + scalebar(10);
  if ((S.route === 'distance') && P0) s += trailPath(P0, P1) + ring(P0.x, P0.y, 'mark-then', '', 18) + ring(P1.x, P1.y, 'mark-now', '', 18);
  if (S.route === 'explore' && WISE) {
    const was = WISE.was, p = WISE.pos[S.visit];
    if (S.marks.path) s += trailPath(was, p);
    if (S.marks.was) s += ring(was.x, was.y, 'mark-then', 'In 2010', 22, -1);
    if (S.marks.now) { const [X, Y] = toScreen(p.x, p.y), r = X > W - 170; s += reticle(p.x, p.y, 24) + `<text class="mark-label" text-anchor="${r ? 'end' : 'middle'}" x="${r ? X + 34 : X}" y="${Y - 46}">${WISE.g.passes[S.visit].label}</text>`; }
    s += scalebar(30);
  }
  marks.innerHTML = s;
}

// ---------- routes ----------
const ROUTES = { '/': 'home', '/mission/spot': 'spot', '/mission/measure': 'measure', '/mission/distance': 'distance', '/mission/done': 'done', '/explore': 'explore' };
function camera() {
  W = innerWidth; H = innerHeight;
  const phone = W < 760, side = 420 + Math.min(56, Math.max(16, W * .04)) * 2, f = { fx: 60.08, fy: 60.1 };
  const wide = (W - side) / W;
  const C = {
    home: phone ? { ...f, ax: .52, ay: .25, s: W / 27 } : { ...f, ax: .63, ay: .42, s: Math.max(W / +(qp.get('z') ?? 88), H / 56) },
    mission: phone ? { ...f, ax: .5, ay: .21, s: W / 24 } : { ...f, ax: wide / 2, ay: .44, s: (W - side) / 50 },
    done: phone ? { ...f, ax: .5, ay: .3, s: W / 27 } : { ...f, ax: wide / 2, ay: .5, s: (W - side) / 50 },
    explore: phone ? { fx: 60.1, fy: 59.8, ax: .5, ay: .2, s: W / 58 } : { fx: 60.1, fy: 59.8, ax: wide / 2, ay: .42, s: (W - side) / 64 },
  };
  const r = S.route;
  cam = C[r === 'home' ? 'home' : r === 'done' ? 'done' : r === 'explore' ? 'explore' : 'mission'];
  stage.style.setProperty('--vx', (cam.ax * 100) + '%'); stage.style.setProperty('--vy', (cam.ay * 100) + '%');
}
function render() {
  camera();
  if (S.route === 'explore') { bake(cvThen, WISEL[S.visit]); bake(cvNow, null); }
  else if (S.diff && S.route === 'measure') { bake(cvThen, DIFF); }
  else { bake(cvThen, EPSL[0]); bake(cvNow, EPSL.at(-1)); }
  drawMarks();
}
function route() {
  const r = ROUTES[location.hash.slice(1) || '/'] || 'home';
  S.route = r; document.body.dataset.route = r;
  if (r !== 'measure' && S.diff) setDiff(false, false);
  if (r === 'explore') { flip(false, false); cvThen.classList.remove('off'); cvNow.classList.add('off'); }
  $$('[data-screen]').forEach(e => e.hidden = e.dataset.screen !== r);
  $('#panel').hidden = r === 'home';
  $('#flight').hidden = r === 'explore';
  const order = ['spot', 'measure', 'distance', 'done'], at = order.indexOf(r);
  $$('#flight li').forEach((li, i) => { li.classList.toggle('is-past', i < at); li.toggleAttribute('aria-current', i === at); if (i === at) li.setAttribute('aria-current', 'step'); });
  const h = $(`[data-screen="${r}"] h2, [data-screen="${r}"] h1`);
  $('#panel').setAttribute('aria-labelledby', h ? (h.id || (h.id = 'h-' + r)) : '');
  document.title = `Skyblink: ${h ? h.textContent : ''}`;
  stage.tabIndex = r === 'spot' ? 0 : -1;
  stage.setAttribute('role', r === 'spot' ? 'application' : 'img');
  stage.setAttribute('aria-label', r === 'spot' ? 'Sky photo. Arrow keys move the crosshair, Enter marks a dot, hold Space to blink.' : r === 'explore' ? 'Infrared photo of the sky around WISE 0855-0714' : 'Infrared photo of the sky around Epsilon Indi B');
  if (EPS) render();
  if (r === 'spot') spotUI();
  if (r === 'measure') countUp($$('[data-screen="measure"] [data-count]'));
  if (r === 'explore') exploreUI();
  if (r === 'done') patch();
}
addEventListener('hashchange', route);
let rz; addEventListener('resize', () => { clearTimeout(rz); rz = setTimeout(() => EPS && render(), 80); });

// ---------- S1: the one orchestrated moment ----------
async function intro() {
  const L = EPSL[0];
  if (!RM) {
    const t0 = performance.now(), dur = 1700;
    await new Promise(res => { const step = now => { const t = Math.min(1, (now - t0) / dur), k = 1 - Math.pow(1 - t, 3); L.paint(k); bake(cvThen, L); t < 1 ? requestAnimationFrame(step) : res(); }; requestAnimationFrame(step); });
    L.paint(1); bake(cvThen, L);
    if (S.route !== 'home' || held.size) return;
    await wait(450); flip(true, false); await wait(700); if (!held.size && !S.keep) flip(false, false); await wait(260);
  }
  S.settled = true; drawMarks();
  const r = $('.reticle', marks);
  if (r && !RM) {
    r.animate([{ opacity: 0, transform: 'scale(1.5)' }, { opacity: 1, transform: 'scale(1)' }], { duration: 420, easing: 'cubic-bezier(0.23, 1, 0.32, 1)' });
    $('.ticks', r).animate([{ opacity: 0, transform: 'scale(1.25)' }, { opacity: 1, transform: 'scale(1)' }], { duration: 140, delay: 380, easing: 'cubic-bezier(0.23, 1, 0.32, 1)', fill: 'backwards' });
  }
}

// ---------- S2: spot it ----------
function spotUI() {
  const fb = $('#spot-fb');
  $('#spot-help').hidden = S.answered;
  if (S.answered) {
    fb.hidden = false;
    fb.innerHTML = `<h3>Yes. It slid <span class="num" data-count="6.5" data-dp="1">6.5</span> arcseconds in 17 months.</h3><p class="muted">That is Epsilon Indi B, a pair of brown dwarfs 12 light years away. Every other dot stayed put.</p>`;
    $('#spot-row').innerHTML = `<a class="btn btn-primary" href="#/mission/measure">Measure it</a>`;
    countUp($$('[data-count]', fb));
  }
}
function answer(how) {
  S.answered = true; S.miss = null; drawMarks(); spotUI();
  $('#live').textContent = how === 'show' ? 'Here it is. It slid 6.5 arcseconds in 17 months.' : 'Yes. It slid 6.5 arcseconds in 17 months.';
  if (RM) return;
  const r = $('.reticle', marks), tr = $('#trail');
  r && r.animate([{ opacity: 0, transform: 'scale(1.35)' }, { opacity: 1, transform: 'scale(1)' }], { duration: 260, easing: 'cubic-bezier(0.23, 1, 0.32, 1)' });
  if (tr) { const len = Math.hypot(tr.x2.baseVal.value - tr.x1.baseVal.value, tr.y2.baseVal.value - tr.y1.baseVal.value); tr.style.strokeDasharray = len; tr.animate([{ strokeDashoffset: len }, { strokeDashoffset: 0 }], { duration: 520, delay: 200, easing: 'cubic-bezier(0.77, 0, 0.175, 1)', fill: 'backwards' }); }
}
function pickAt(x, y) {
  if (S.route !== 'spot' || S.answered) return;
  const d = Math.min(Math.hypot(x - EPS.p0.x, y - EPS.p0.y), Math.hypot(x - EPS.p1.x, y - EPS.p1.y));
  if (d < 3.4) return answer('pick');
  S.miss = [x, y]; drawMarks();
  const fb = $('#spot-fb'); fb.hidden = false;
  fb.innerHTML = `<h3>Not that one.</h3><p class="muted">That dot sits in the same place in both photos. Hold the key and look near the middle of the sky for the dot that jumps.</p>`;
  $('#live').textContent = 'Not that one. That dot stays put. Look near the middle for the dot that jumps.';
}
stage.addEventListener('click', e => { const [x, y] = toData(e.clientX, e.clientY); pickAt(x, y); });
stage.addEventListener('keydown', e => {
  if (S.route !== 'spot' || S.answered) return;
  const step = e.shiftKey ? 5 : 1, mv = { ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, -step], ArrowDown: [0, step] }[e.key];
  if (!cross) cross = [cam.fx - 8, cam.fy - 4];
  if (mv) { e.preventDefault(); cross = [cross[0] + mv[0], cross[1] + mv[1]]; drawMarks(); }
  if (e.key === 'Enter') { e.preventDefault(); pickAt(...cross); }
});
$('#show-me').addEventListener('click', () => answer('show'));

// ---------- S3: measure ----------
function countUp(els) {
  els.forEach(el => {
    const to = +el.dataset.count, dp = +el.dataset.dp, small = el.querySelector('small'), node = [...el.childNodes].find(n => n.nodeType === 3) || el.insertBefore(document.createTextNode(''), small);
    if (RM) { node.textContent = to.toFixed(dp); return; }
    const t0 = performance.now(), dur = 700;
    const step = now => { const t = Math.min(1, (now - t0) / dur), k = 1 - Math.pow(1 - t, 3); node.textContent = (to * k).toFixed(dp); if (t < 1) requestAnimationFrame(step); };
    requestAnimationFrame(step);
  });
}
function setDiff(on, draw = true) {
  S.diff = on; $('#diff').setAttribute('aria-checked', on); $('#diff-note').hidden = !on;
  if (on) { cvThen.classList.remove('off'); cvNow.classList.add('off'); } else flip(S.now, false), cvNow.classList.toggle('off', !S.now), cvThen.classList.toggle('off', S.now);
  if (draw) render();
}
$('#diff').addEventListener('click', () => setDiff(!S.diff));

// ---------- S4: parallax ----------
function earthF(mjd, ra, dec) { // ponytail: low-precision Sun (Astronomical Almanac), within ~0.03 of the exp13 factors; enough for a drawn curve
  const n = mjd + 2400000.5 - 2451545, r = Math.PI / 180, L = (280.46 + .9856474 * n) * r, g = (357.528 + .9856003 * n) * r;
  const lam = L + 1.915 * r * Math.sin(g) + .02 * r * Math.sin(2 * g), R = 1.00014 - .01671 * Math.cos(g), eps = (23.439 - 4e-7 * n) * r;
  const X = -R * Math.cos(lam), Y = -R * Math.cos(eps) * Math.sin(lam);
  return X * Math.sin(ra) - Y * Math.cos(ra);
}
const BEST = PXBEST => PXBEST.best_fit_pm_fixed;
function chart(v) {
  const P = PX, pm = P.literature, ms = P.pass_means, t0 = P.t0, best = BEST(P), snap = Math.abs(v - best.plx * 1000) < 2;
  const mas = snap ? best.plx * 1000 : v, plx = mas / 1000;
  const ra = P.reference_point_deg.ra * Math.PI / 180, dec = P.reference_point_deg.dec * Math.PI / 180;
  let w = 0, wf = 0, wr = 0; ms.forEach(p => { const a = 1 / p.east_err ** 2; w += a; wf += a * p.fE; wr += a * (p.east - pm.muE * (p.year - t0)); });
  const E0 = (wr - plx * wf) / w;
  const Wc = 356, Hc = 190, L = 40, R = 10, Tp = 18, B = 28, y0 = 2025.25, y1 = 2026.85, A = .45;
  const X = y => L + (y - y0) / (y1 - y0) * (Wc - L - R), Y = e => Tp + (A - e) / (2 * A) * (Hc - Tp - B);
  let s = `<title id="plx-chart-t">East to west wobble of Epsilon Indi B after taking out its straight slide: five measured points and your curve for a wobble of ${mas.toFixed(0)} milliarcseconds.</title>`;
  [-.4, 0, .4].forEach(e => { s += `<line class="${e ? 'grid' : 'axis'}" x1="${L}" x2="${Wc - R}" y1="${Y(e)}" y2="${Y(e)}"/><text x="${L - 6}" y="${Y(e) + 4}" text-anchor="end">${e ? (e > 0 ? '+' : '−') + Math.abs(e).toFixed(1) + '″' : '0'}</text>`; });
  [[2025.5, 'Jul 2025'], [2026, 'Jan 2026'], [2026.5, 'Jul 2026']].forEach(([y, l]) => { s += `<text x="${X(y)}" y="${Hc - 8}" text-anchor="middle">${l}</text>`; });
  let d = '', miss = 0, mw = 0;
  for (let y = y0; y <= y1; y += .01) { const mjd = 51544.5 + (y - 2000) * 365.25; d += (d ? 'L' : 'M') + X(y).toFixed(1) + ' ' + Y(plx * earthF(mjd, ra, dec)).toFixed(1); }
  s += `<path class="model" d="${d}"/><text x="${Wc - R}" y="${Tp - 4}" text-anchor="end" style="fill:var(--ice)">your curve</text>`;
  ms.forEach((p, i) => {
    const e = p.east - pm.muE * (p.year - t0) - E0, x = X(p.year), m = plx * p.fE; miss += (e - m) ** 2 / p.east_err ** 2; mw += 1 / p.east_err ** 2;
    s += `<g><title>Photo set ${i + 1}, ${EPS.g.passes[i].label}: ${(e * 1000).toFixed(0)} milliarcseconds east</title><line class="err" x1="${x}" x2="${x}" y1="${Y(e + p.east_err)}" y2="${Y(e - p.east_err)}"/><circle class="pt" cx="${x}" cy="${Y(e)}" r="5"/></g>`;
  });
  s += `<text x="${L + 4}" y="${Tp - 4}">your five photos <tspan style="fill:var(--e4)">●</tspan></text>`;
  $('#plx-chart').innerHTML = s;
  const ly = 3.26156 * 1000 / mas, vkm = 4.74047 * Math.hypot(pm.muE, pm.muN) * 1000 / mas;
  $('#plx-out').textContent = `${mas.toFixed(0)} milliarcseconds`;
  $('#misfit').textContent = `Misfit: ${(Math.sqrt(miss / mw) * 1000).toFixed(0)} milliarcseconds${snap ? '. Best fit.' : ''}`;
  $('#ly-you').textContent = ly.toFixed(1); $('#v-you').textContent = vkm.toFixed(1);
  $('#mas-you').textContent = snap ? `${mas.toFixed(0)} ± ${(best.plx_err * 1000).toFixed(0)} milliarcsec` : `${mas.toFixed(0)} milliarcsec`;
}

// ---------- S5: the patch, drawn from the numbers ----------
function patch() {
  const svg = $('#patch'), c = 200, P = EPS.g.passes.map(p => p.measured), cx = P.reduce((a, p) => a + p.x, 0) / P.length, cy = P.reduce((a, p) => a + p.y, 0) / P.length;
  const k = 40, pts = P.map(p => [c + (p.x - cx) * k, c + (p.y - cy) * k]);
  const stops = ['--e1', '--e2', '--e3', '--e4', '--e5'].map((t, i) => `<stop offset="${i / 4}" stop-color="${tok(t)}"/>`).join('');
  const arc = (r, a0, a1) => { const p = a => [c + r * Math.cos(a), c + r * Math.sin(a)], [x0, y0] = p(a0), [x1, y1] = p(a1); return `M${x0} ${y0} A${r} ${r} 0 0 1 ${x1} ${y1}`; };
  svg.innerHTML = `<title id="patch-t">Mission patch: Epsilon Indi B, measured with real NASA SPHEREx data. Speed across the sky 4.58 arcseconds a year, distance 10.7 light years, speed 72.5 km a second.</title>
  <defs><linearGradient id="rg" x1="0" y1="1" x2="1" y2="0">${stops}</linearGradient>
  <radialGradient id="core"><stop offset="0" stop-color="${tok('--e0')}"/><stop offset="1" stop-color="${tok('--void')}"/></radialGradient>
  <path id="top" d="${arc(166, Math.PI * 1.1, Math.PI * 1.9)}"/><path id="bot" d="${arc(178, Math.PI * .9, Math.PI * .1).replace('0 0 1', '0 0 0')}"/></defs>
  <circle cx="200" cy="200" r="196" fill="${tok('--void')}"/>
  <circle cx="200" cy="200" r="172" fill="none" stroke="url(#rg)" stroke-width="42"/>
  <circle cx="200" cy="200" r="150" fill="url(#core)"/>
  <circle cx="200" cy="200" r="128" fill="none" stroke="${tok('--ice-dim')}" stroke-width="1" stroke-dasharray="2 6"/>
  <text font-size="21" fill="${tok('--void')}" letter-spacing="2"><textPath href="#top" startOffset="50%" text-anchor="middle">EPSILON INDI B</textPath></text>
  <text font-size="13" fill="${tok('--void')}" letter-spacing="2"><textPath href="#bot" startOffset="50%" text-anchor="middle">SPHEREx  APR 2025 TO OCT 2026</textPath></text>
  <polyline points="${pts.map(p => p.join(',')).join(' ')}" fill="none" stroke="${tok('--ice')}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  ${pts.map((p, i) => `<circle cx="${p[0]}" cy="${p[1]}" r="${i === 0 || i === pts.length - 1 ? 9 : 5}" fill="${i === pts.length - 1 ? tok('--e5') : tok('--e3')}" stroke="${tok('--void')}" stroke-width="2"/>`).join('')}
  <text x="200" y="286" font-size="32" fill="${tok('--ice')}" text-anchor="middle" font-variant-numeric="tabular-nums">4.58″/yr</text>
  <text x="200" y="308" font-size="11" fill="${tok('--mist')}" text-anchor="middle" letter-spacing="1.5">10.7 LY   72.5 KM/S</text>`;
}

// ---------- S6: explorer ----------
function exploreUI() {
  if (!WISE) return;
  const ps = WISE.g.passes, y0 = ps[0].yearMid - .1, y1 = ps.at(-1).yearMid + .1, f = y => (y - y0) / (y1 - y0) * 100, pos = y => f(y).toFixed(2) + '%';
  const lo = ps.map((p, i) => i > 0 && f(p.yearMid) - f(ps[i - 1].yearMid) < 12); // visits a month apart: drop the second date a line, keep the true spacing
  $('#rail').innerHTML = ps.map((p, i) => `<button class="v" type="button" style="left:${pos(p.yearMid)}" ${i === S.visit ? 'aria-current="true"' : ''} aria-label="Visit ${i + 1} of ${ps.length}, ${p.label}"><i></i></button>`).join('');
  $('#dates').innerHTML = ps.map((p, i) => `<span style="left:${pos(p.yearMid)}${lo[i] ? ';top:18px' : ''}${i === ps.length - 1 ? ';transform:translateX(-80%)' : ''}" ${i === S.visit ? 'data-on' : ''}>${p.label}</span>`).join('');
  $$('#rail .v').forEach((b, i) => b.addEventListener('click', () => visit(i)));
  const p = ps[S.visit];
  $('#facts').innerHTML = `<dt>Visit</dt><dd>${S.visit + 1} of ${ps.length}</dd><dt>Dates</dt><dd>${p.label}</dd><dt>Light</dt><dd>Infrared, just past red light: ${p.wavelengthUmMin.toFixed(2)} to ${p.wavelengthUmMax.toFixed(2)} microns</dd><dt>Photos added</dt><dd>${p.nExposures}</dd>`;
}
function visit(i) {
  const n = WISE.g.passes.length; S.visit = (i + n) % n; bake(cvThen, WISEL[S.visit]); drawMarks(); exploreUI();
  $('#live').textContent = `Visit ${S.visit + 1} of ${n}, ${WISE.g.passes[S.visit].label}`;
}
let playing = null;
$('#prev').addEventListener('click', () => visit(S.visit - 1));
$('#next').addEventListener('click', () => visit(S.visit + 1));
$('#play').addEventListener('click', e => {
  if (playing) { clearInterval(playing); playing = null; e.currentTarget.textContent = 'Play'; return; }
  e.currentTarget.textContent = 'Pause'; playing = setInterval(() => visit(S.visit + 1), 900);
});
$$('[data-mark]').forEach(b => b.addEventListener('click', () => { const k = b.dataset.mark; S.marks[k] = !S.marks[k]; b.setAttribute('aria-checked', S.marks[k]); drawMarks(); }));
$('#ex-form').addEventListener('submit', e => { e.preventDefault(); $('#live').textContent = 'Showing WISE 0855-0714. Only the five mission targets are loaded in this mock-up.'; });
async function copy(text, btn, done) { try { await navigator.clipboard.writeText(text); } catch { } const o = btn.textContent; btn.textContent = done; $('#live').textContent = done; setTimeout(() => btn.textContent = o, 1600); }
$('#share').addEventListener('click', e => copy(`${location.origin}${location.pathname}?ra=133.7951&dec=-7.2451#/explore`, e.currentTarget, 'Link copied'));
$('#copy').addEventListener('click', e => copy(`${location.origin}${location.pathname}?pm=4.58&plx=306&v=72.5#/mission/done`, e.currentTarget, 'Link copied'));

// ---------- misc controls ----------
$('#real').addEventListener('click', e => { real = !real; e.currentTarget.setAttribute('aria-checked', real); render(); });
$$('.lang button').forEach(b => b.addEventListener('click', () => { lang = b.dataset.lang; applyLang(); }));

// ---------- boot ----------
async function boot() {
  applyLang();
  const m = await (await fetch(ROOT + 'epsindb/manifest.json')).json(), g = m.groups[0];
  const raws = await Promise.all(g.passes.map(p => f32(ROOT + 'epsindb/' + p.stack)));
  EPS = { m, g, p0: g.passes[0].measured, p1: g.passes.at(-1).measured };
  EPSL = raws.map(r => layer(r, g.display));
  EPSL[0].paint(RM || location.hash.length > 2 ? 1 : 0);
  const a = raws[0], b = raws.at(-1), sc = g.display.vmax * .06;
  DIFF = layer(b.map((v, i) => v - a[i]), g.display, DIVERGE, v => .5 + .5 * Math.tanh(v / sc));
  route();
  document.body.dataset.ready = '1';
  if (S.route === 'home') intro(); else { S.settled = true; drawMarks(); }
  // the rest loads quietly
  PX = await (await fetch('/docs/research/experiments/exp13_parallax_epsindb.json')).json();
  const plx = $('#plx'); plx.value = qp.get('plx') || 200; plx.addEventListener('input', () => chart(+plx.value)); chart(+plx.value);
  const wm = await (await fetch(ROOT + 'wise0855/manifest.json')).json(), wg = wm.groups[0];
  const wr = await Promise.all(wg.passes.map(p => f32(ROOT + 'wise0855/' + p.stack)));
  WISE = { m: wm, g: wg, was: { x: wm.challengeInput.x, y: wm.challengeInput.y }, pos: wg.passes.map(p => p.measured) };
  WISEL = wr.map(r => layer(r, wg.display, EMBER, v => stretch(v, wg.display, .24))); // this field is noisier at 4 to 5 microns
  S.visit = Math.min(+(qp.get('visit') ?? wg.passes.length - 1), wg.passes.length - 1);
  if (S.route === 'explore') render(), exploreUI();
  missions(); document.body.dataset.loaded = '1';
}
async function missions() {
  const idx = await (await fetch(ROOT + 'index.json')).json(), blurb = { epsindb: 'Done. You measured it.', barnard: 'The fastest-moving star in the sky.', wise0855: "The challenge's own target: 134 arcseconds west since 2010.", rwaur: 'A young star that dims and brightens.', rdra: 'A giant star that changes brightness.' };
  $('#missions').innerHTML = idx.missions.map(m => `<li><a href="${m.id === 'wise0855' ? '#/explore' : '#/'}"><canvas width="40" height="40" data-id="${m.id}" aria-hidden="true"></canvas><span><b>${m.name}</b><span>${blurb[m.id] || ''}</span></span></a></li>`).join('');
  for (const cv of $$('#missions canvas')) {
    const mm = await (await fetch(ROOT + cv.dataset.id + '/manifest.json')).json(), gg = mm.groups[0], pp = gg.passes.at(-1), r = await f32(ROOT + mm.id + '/' + pp.stack);
    const L = layer(r, gg.display), cx = Math.round(pp.measured?.x ?? 60), cy = Math.round(pp.measured?.y ?? 60), g = cv.getContext('2d');
    g.imageSmoothingQuality = 'high'; g.drawImage(L.c, (cx - 8) * U, (cy - 8) * U, 16 * U, 16 * U, 0, 0, 40, 40);
  }
}
boot();
