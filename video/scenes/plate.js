// Procedural 1930 photographic plates (negatives: dark stars on pale glass), fixed seed.
// Plate B is plate A re-exposed: slightly denser, misregistered, different dust, and the
// one moving dot sits a little to the east-north. ILLUSTRATION, not a real plate.
import { rng } from './lib.js';

export const PW = 2400, PH = 1500;
export const DOT_A = { x: 1262, y: 729 }, DOT_B = { x: 1291, y: 719 };
export const DOT_MID = { x: (DOT_A.x + DOT_B.x) / 2, y: (DOT_A.y + DOT_B.y) / 2 };
const INK = '30,25,18';

function canvas(w, h) { const c = document.createElement('canvas'); c.width = w; c.height = h; return c; }

export function makePlates() {
  const r = rng(1930);
  const stars = [];
  while (stars.length < 2400) { // denser along a tilted band, like a field near the Milky Way
    const x = r() * PW, y = r() * PH;
    const d = Math.abs(y - PH * 0.52 - (x - PW * 0.5) * 0.32);
    if (r() > 0.3 + 0.7 * Math.exp(-((d / 360) ** 2))) continue;
    if (Math.hypot(x - DOT_MID.x, y - DOT_MID.y) < 60) continue; // keep the circled patch readable
    const rad = 0.8 + 5.4 * Math.pow(r(), 10);
    stars.push({ x, y, rad, dark: Math.min(0.92, 0.42 + rad * 0.14), jx: r() - 0.5, jy: r() - 0.5 });
  }
  const mottle = Array.from({ length: 70 }, () => ({ x: r() * PW, y: r() * PH, R: 120 + r() * 420, a: (r() - 0.5) * 0.07 }));
  const dust = [0, 1].map(() => Array.from({ length: 90 }, () => ({ x: r() * PW, y: r() * PH, R: 0.6 + r() * 1.8, light: r() < 0.7 })));
  const scratch = [0, 1].map(() => Array.from({ length: 2 }, () => ({ x: r() * PW, y: r() * PH, len: 200 + r() * 500, ang: r() * Math.PI, bend: (r() - 0.5) * 80 })));

  const plate = (k) => {
    const c = canvas(PW, PH), g = c.getContext('2d');
    g.fillStyle = k ? '#D3CBB6' : '#D9D2BF';
    g.fillRect(0, 0, PW, PH);
    for (const m of mottle) { // uneven emulsion
      const gr = g.createRadialGradient(m.x, m.y, 0, m.x, m.y, m.R);
      const col = m.a > 0 ? '255,250,236' : '96,84,62';
      gr.addColorStop(0, `rgba(${col},${Math.abs(m.a)})`); gr.addColorStop(1, `rgba(${col},0)`);
      g.fillStyle = gr; g.fillRect(m.x - m.R, m.y - m.R, 2 * m.R, 2 * m.R);
    }
    g.save();
    if (k) { g.translate(PW / 2 + 2.6, PH / 2 - 1.9); g.rotate(0.0011); g.translate(-PW / 2, -PH / 2); } // misregistration
    const blob = (x, y, rad, dark) => {
      const R = rad * 2.0, gr = g.createRadialGradient(x, y, 0, x, y, R);
      gr.addColorStop(0, `rgba(${INK},${dark})`); gr.addColorStop(rad / R, `rgba(${INK},${dark * 0.85})`); gr.addColorStop(1, `rgba(${INK},0)`);
      g.fillStyle = gr; g.beginPath(); g.arc(x, y, R, 0, 7); g.fill();
    };
    for (const s of stars) blob(s.x + s.jx * 0.5 * k, s.y + s.jy * 0.5 * k, s.rad * (k ? 1.07 : 1), s.dark);
    const dot = k ? DOT_B : DOT_A;
    blob(dot.x, dot.y, 2.7, 0.88);
    g.restore();
    for (const d of dust[k]) { g.fillStyle = d.light ? 'rgba(250,247,238,0.9)' : `rgba(${INK},0.7)`; g.beginPath(); g.arc(d.x, d.y, d.R, 0, 7); g.fill(); }
    g.strokeStyle = 'rgba(250,246,236,0.5)'; g.lineWidth = 0.8;
    for (const s of scratch[k]) { const dx = Math.cos(s.ang) * s.len, dy = Math.sin(s.ang) * s.len; g.beginPath(); g.moveTo(s.x, s.y); g.quadraticCurveTo(s.x + dx / 2 + s.bend, s.y + dy / 2 - s.bend, s.x + dx, s.y + dy); g.stroke(); }
    // emulsion edge darkening, seen when the plate is small
    for (const [x, y, w, h, gx0, gy0, gx1, gy1] of [[0, 0, 40, PH, 0, 0, 40, 0], [PW - 40, 0, 40, PH, PW, 0, PW - 40, 0], [0, 0, PW, 40, 0, 0, 0, 40], [0, PH - 40, PW, 40, 0, PH, 0, PH - 40]]) {
      const e = g.createLinearGradient(gx0, gy0, gx1, gy1); e.addColorStop(0, 'rgba(70,60,44,0.35)'); e.addColorStop(1, 'rgba(70,60,44,0)');
      g.fillStyle = e; g.fillRect(x, y, w, h);
    }
    return c;
  };

  const grain = Array.from({ length: 8 }, () => { // quarter-res noise, scaled up = soft clumps
    const c = canvas(480, 270), g = c.getContext('2d'), im = g.createImageData(480, 270);
    for (let i = 0; i < im.data.length; i += 4) { const v = 128 + (r() + r() + r() - 1.5) * 120; im.data[i] = im.data[i + 1] = im.data[i + 2] = v; im.data[i + 3] = 255; }
    g.putImageData(im, 0, 0); return c;
  });
  const vignette = canvas(1920, 1080);
  { const g = vignette.getContext('2d'), gr = g.createRadialGradient(960, 540, 260, 960, 560, 1150);
    gr.addColorStop(0, 'rgba(12,9,6,0)'); gr.addColorStop(0.6, 'rgba(12,9,6,0.25)'); gr.addColorStop(1, 'rgba(12,9,6,0.85)'); g.fillStyle = gr; g.fillRect(0, 0, 1920, 1080); }
  return { A: plate(0), B: plate(1), grain, vignette, flick: Array.from({ length: 512 }, () => r()) };
}

// view = { cx, cy, s, dx, dy } : plate point (cx, cy) lands at screen (960 + dx, 540 + dy), scale s.
export const toScreen = (v, p) => ({ x: 960 + (v.dx || 0) + (p.x - v.cx) * v.s, y: 540 + (v.dy || 0) + (p.y - v.cy) * v.s });

export function drawPlateView(g, P, which, v, frame, { grain = 0.2, dim = 0, circle = 0, shadow = false, vignette = true } = {}) {
  g.fillStyle = '#0B0907'; g.fillRect(0, 0, 1920, 1080);
  const o = toScreen(v, { x: 0, y: 0 });
  if (shadow) { g.save(); g.shadowColor = 'rgba(0,0,0,0.7)'; g.shadowBlur = 60; g.shadowOffsetY = 18; g.fillStyle = '#000'; g.fillRect(o.x, o.y, PW * v.s, PH * v.s); g.restore(); }
  g.imageSmoothingQuality = 'high';
  g.drawImage(which, o.x, o.y, PW * v.s, PH * v.s);
  if (circle > 0) drawCircle(g, v, circle);
  if (grain > 0) {
    g.save(); g.globalCompositeOperation = 'overlay'; g.globalAlpha = grain;
    const tile = P.grain[(frame * 5 + 3) % P.grain.length], jx = P.flick[frame % 512] * 4, jy = P.flick[(frame + 7) % 512] * 4;
    g.drawImage(tile, -jx, -jy, 1928, 1088); g.restore();
  }
  const f = 0.035 * P.flick[(frame * 3) % 512] + dim; // projector-like flicker plus shutter dim
  if (f > 0) { g.fillStyle = `rgba(10,8,5,${Math.min(1, f)})`; g.fillRect(0, 0, 1920, 1080); }
  if (vignette) g.drawImage(P.vignette, 0, 0);
}

// Grease-pencil circle around the jump, in plate space so it stays on the plate. p in 0..1.
export function drawCircle(g, v, p) {
  const c = toScreen(v, DOT_MID), rx = 34 * v.s * 1.5, ry = 26 * v.s * 1.5;
  const a0 = -2.2, span = p * Math.PI * 2 * 1.1, N = Math.max(2, Math.ceil(120 * p));
  for (const [w, a, off] of [[5.5 * Math.max(v.s, 0.45), 0.85, 0], [2.5 * Math.max(v.s, 0.45), 0.45, 1.6]]) {
    g.beginPath();
    for (let i = 0; i <= N; i++) {
      const th = a0 + (span * i) / N, k = 1 + 0.05 * Math.sin(3 * th + 1.3) + 0.025 * Math.sin(7 * th) + 0.06 * (i / N);
      const x = c.x + Math.cos(th) * rx * k + off, y = c.y + Math.sin(th) * ry * k + off * 0.5;
      i ? g.lineTo(x, y) : g.moveTo(x, y);
    }
    g.strokeStyle = `rgba(150,30,20,${a})`; g.lineWidth = w; g.lineCap = 'round'; g.lineJoin = 'round'; g.stroke();
  }
}
