// Soundtrack made here, nothing downloaded: shutter clacks, a low drone, soft ticks, one hit
// on the cut to today, an optional sonification of Epsilon Indi B's five SPHEREx passes.
// Rendered offline in plain JS (deterministic, seeded noise), then mixed with the music and
// voice slots (muted until a file is given) and loudness normalised in two passes.
import fs from 'node:fs';
import path from 'node:path';
import { ff, ROOT } from './lib/common.mjs';

export const MUSIC = null; // path to a licensed track; ducked under VOICE. Credit it in shots.mjs vars.musicCredit
export const VOICE = null; // path to an adult or synthetic voice track (no under-18 voices)
const SR = 48000;
const TARGET = { I: -16, TP: -1.5, LRA: 11 };

// Cues per scene, in seconds from the shot start. Keep in sync with the scene's own timing.
const CUES = {
  blink: (d) => [{ k: 'drone', t: 0, len: d }, ...[0, 0.5, 1, 1.5, 2, 2.5].map((t) => ({ k: 'clack', t })), { k: 'scratch', t: 1.62 }],
  tombaugh: (d) => [{ k: 'drone', t: 0, len: d }, { k: 'clack', t: 0, gain: 0.5 }, ...typeTicks(0.55, 'Clyde Tombaugh, 1930'), { k: 'tick', t: 1.95, f: 700 }],
  bridge: (d) => [{ k: 'drone', t: 0, len: d, fadeOut: true }, { k: 'hit', t: 0 }, { k: 'clack', t: 0.22, gain: 0.6 }, { k: 'tick', t: 1.0, f: 1320, gain: 0.8 }],
  placeholder: () => [],
  endcard: () => [{ k: 'clack', t: 0.55, gain: 0.8 }, { k: 'clack', t: 1.05, gain: 0.55 }, { k: 'tail', t: 0 }],
};
export const typeTicks = (t0, text, cps = 26) => [...text].map((ch, i) => ({ k: 'tick', t: t0 + i / cps, f: ch === ' ' ? 900 : 1500 + (i % 3) * 90, gain: 0.35 }));

// Optional sonification: one tick per SPHEREx pass during shot 4, pitch rising with the
// measured drift from the first pass (two semitones per arcsecond).
function sonification() {
  const f = path.join(ROOT, 'docs/research/experiments/exp13_parallax_epsindb.json');
  if (!fs.existsSync(f)) return [];
  const p = JSON.parse(fs.readFileSync(f, 'utf8')).pass_means;
  return p.map((q, i) => ({ k: 'tone', t: 0.8 + i * 0.7, f: 330 * 2 ** ((2 * Math.hypot(q.east - p[0].east, q.north - p[0].north)) / 12) }));
}

function rng(seed) { let a = seed >>> 0; return () => { a = (a + 0x6d2b79f5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296 * 2 - 1; }; }
function bandpass(x, f0, q) { // RBJ biquad, in place
  const w = 2 * Math.PI * f0 / SR, al = Math.sin(w) / (2 * q), a0 = 1 + al;
  const b0 = al / a0, b2 = -al / a0, a1 = -2 * Math.cos(w) / a0, a2 = (1 - al) / a0;
  let x1 = 0, x2 = 0, y1 = 0, y2 = 0;
  for (let i = 0; i < x.length; i++) { const y = b0 * x[i] + b2 * x2 - a1 * y1 - a2 * y2; x2 = x1; x1 = x[i]; y2 = y1; y1 = y; x[i] = y; }
  return x;
}

function voice(c, noise) { // returns [Float32Array mono, pan]
  const n = (s) => Math.round(s * SR), g = c.gain ?? 1;
  if (c.k === 'clack') { // shutter: bright click, body thunk, small bounce
    const b = new Float32Array(n(0.12));
    const click = bandpass(Float32Array.from(b, noise), 2600, 1.4);
    for (let i = 0; i < b.length; i++) {
      const s = i / SR;
      b[i] = 0.9 * click[i] * Math.exp(-s / 0.009) + 0.5 * Math.sin(2 * Math.PI * 140 * s) * Math.exp(-s / 0.03)
        + (s > 0.014 ? 0.35 * click[i] * Math.exp(-(s - 0.014) / 0.006) : 0);
    }
    return [b.map((v) => v * g), 0.1];
  }
  if (c.k === 'tick') { const b = new Float32Array(n(0.05)); for (let i = 0; i < b.length; i++) { const s = i / SR; b[i] = 0.25 * g * Math.sin(2 * Math.PI * (c.f || 1200) * s) * Math.exp(-s / 0.008); } return [b, 0]; }
  if (c.k === 'tone') { const b = new Float32Array(n(0.45)); for (let i = 0; i < b.length; i++) { const s = i / SR; b[i] = 0.22 * Math.min(1, s / 0.004) * Math.exp(-s / 0.12) * (Math.sin(2 * Math.PI * c.f * s) + 0.3 * Math.sin(4 * Math.PI * c.f * s)); } return [b, 0]; }
  if (c.k === 'scratch') { const b = bandpass(Float32Array.from(new Float32Array(n(0.4)), noise), 3800, 0.8); for (let i = 0; i < b.length; i++) { const s = i / SR; b[i] *= 0.06 * Math.sin(Math.PI * s / 0.4) * (0.7 + 0.3 * Math.sin(2 * Math.PI * 23 * s)); } return [b, -0.2]; }
  if (c.k === 'hit') { // soft bass hit: falling sine plus a short air burst
    const b = new Float32Array(n(1.4)); const air = bandpass(Float32Array.from(b, noise), 900, 0.7); let ph = 0;
    for (let i = 0; i < b.length; i++) { const s = i / SR; ph += 2 * Math.PI * (44 + 50 * Math.exp(-s / 0.07)) / SR; b[i] = 0.85 * Math.sin(ph) * Math.exp(-s / 0.45) * Math.min(1, s / 0.003) + 0.25 * air[i] * Math.exp(-s / 0.05); }
    return [b, 0];
  }
  if (c.k === 'tail') { const b = new Float32Array(n(2.4)); for (let i = 0; i < b.length; i++) { const s = i / SR; b[i] = 0.18 * Math.min(1, s / 0.4) * Math.exp(-s / 1.2) * (Math.sin(2 * Math.PI * 110 * s) + 0.5 * Math.sin(2 * Math.PI * 164.8 * s) + 0.25 * Math.sin(2 * Math.PI * 220.5 * s)); } return [b, 0]; }
  if (c.k === 'drone') { // low A with a fifth, slow beating, 0.3 s fade in, optional fade out
    const L = n(c.len), b = new Float32Array(L);
    for (let i = 0; i < L; i++) {
      const s = i / SR, abs = (c.abs ?? 0) + s; // continuous phase across shots
      const env = Math.min(1, s / 0.3) * (c.fadeOut ? Math.max(0, 1 - s / c.len) ** 1.5 : 1) * (c.first ? Math.min(1, abs / 0.6) : 1);
      b[i] = env * 0.16 * (Math.sin(2 * Math.PI * 55 * abs) + 0.6 * Math.sin(2 * Math.PI * 82.6 * abs) * (0.75 + 0.25 * Math.sin(2 * Math.PI * 0.4 * abs)) + 0.3 * Math.sin(2 * Math.PI * 110.3 * abs));
    }
    return [b, 0];
  }
  throw new Error(`unknown cue ${c.k}`);
}

function writeWav(file, L, R) {
  const n = L.length, buf = Buffer.alloc(44 + n * 8);
  buf.write('RIFF', 0); buf.writeUInt32LE(36 + n * 8, 4); buf.write('WAVEfmt ', 8); buf.writeUInt32LE(16, 16);
  buf.writeUInt16LE(3, 20); buf.writeUInt16LE(2, 22); buf.writeUInt32LE(SR, 24); buf.writeUInt32LE(SR * 8, 28); buf.writeUInt16LE(8, 32); buf.writeUInt16LE(32, 34);
  buf.write('data', 36); buf.writeUInt32LE(n * 8, 40);
  for (let i = 0; i < n; i++) { buf.writeFloatLE(L[i], 44 + i * 8); buf.writeFloatLE(R[i], 48 + i * 8); }
  fs.writeFileSync(file, buf);
}

// list: shots in order. Returns the path of the normalised WAV, exactly the list's length.
export function buildAudio(list, outWav, { sonify = true } = {}) {
  const total = list.reduce((a, s) => a + s.dur, 0);
  const L = new Float32Array(Math.round(total * SR)), R = new Float32Array(L.length);
  const noise = rng(1930);
  let at = 0, droneAbs = 0;
  for (const s of list) {
    const cues = CUES[s.scene](s.dur);
    if (sonify && s.id === 's4') cues.push(...sonification());
    for (const c of cues) {
      if (c.k === 'drone') { c.abs = droneAbs; c.first = droneAbs === 0; droneAbs += c.len; }
      const [b, pan] = voice(c, noise), o = Math.round((at + c.t) * SR);
      const gl = Math.cos((pan + 1) * Math.PI / 4) * Math.SQRT2, gr = Math.sin((pan + 1) * Math.PI / 4) * Math.SQRT2;
      for (let i = 0; i < b.length && o + i < L.length; i++) { L[o + i] += b[i] * gl; R[o + i] += b[i] * gr; }
    }
    at += s.dur;
  }
  const dir = path.dirname(outWav), base = outWav.replace(/\.wav$/, '');
  fs.mkdirSync(dir, { recursive: true });
  writeWav(`${base}.sfx.wav`, L, R);

  // Mix: SFX + music slot (ducked under voice by sidechain) + voice slot. Silent sources when unset.
  const src = (f) => (f ? ['-i', f] : ['-f', 'lavfi', '-t', String(total), '-i', `anullsrc=r=${SR}:cl=stereo`]);
  const graph = `[1:a]aresample=${SR},volume=0.5[m];[2:a]aresample=${SR},asplit=2[v][vsc];[m][vsc]sidechaincompress=threshold=0.05:ratio=8:attack=20:release=400[duck];`
    + `[0:a][duck][v]amix=inputs=3:normalize=0:duration=first,alimiter=limit=0.5:level=false[mix]`;
  ff(['-i', `${base}.sfx.wav`, ...src(MUSIC), ...src(VOICE), '-filter_complex', graph, '-map', '[mix]', '-t', String(total), '-ar', String(SR), '-c:a', 'pcm_f32le', `${base}.mix.wav`]);

  // Two passes: measure, then apply. Verified with the same meter.
  const ln = `loudnorm=I=${TARGET.I}:TP=${TARGET.TP}:LRA=${TARGET.LRA}`;
  const p1 = JSON.parse(ff(['-i', `${base}.mix.wav`, '-af', `${ln}:print_format=json`, '-f', 'null', '-'], { quiet: false }).match(/\{[\s\S]*\}/)[0]);
  if (!Number.isFinite(+p1.input_i)) { // silent section (placeholders only): nothing to normalise
    ff(['-i', `${base}.mix.wav`, '-ar', String(SR), '-c:a', 'pcm_s24le', outWav]);
    console.log(`  audio ${path.basename(outWav)}: silent, not normalised`);
    return outWav;
  }
  // Pass 2 is a pure gain (truly linear). loudnorm's own linear=true mode falls back to dynamic
  // whenever the LRA is above target, which the silent placeholder shots cause; so only if the
  // gain would push the true peak over the ceiling do we let loudnorm's limiter handle it.
  const m1 = measure(`${base}.mix.wav`); // ebur128 is the meter we report with, so gain is set from it
  const gain = TARGET.I - m1.I;
  const linear = m1.TP + gain <= TARGET.TP - 0.3;
  const second = linear ? `volume=${gain.toFixed(2)}dB`
    : `${ln}:measured_I=${p1.input_i}:measured_TP=${p1.input_tp}:measured_LRA=${p1.input_lra}:measured_thresh=${p1.input_thresh}:offset=${p1.target_offset}:linear=true`;
  ff(['-i', `${base}.mix.wav`, '-af', second, '-ar', String(SR), '-c:a', 'pcm_s24le', '-t', String(total), outWav]);
  const m = measure(outWav);
  console.log(`  audio ${path.basename(outWav)}: pass1 I=${m1.I} TP=${m1.TP}; pass2 ${linear ? `gain ${gain.toFixed(2)} dB` : 'loudnorm (dynamic)'} -> I=${m.I} TP=${m.TP}`);
  return outWav;
}

// ffmpeg's own meter on any file: integrated LUFS and true peak.
export function measure(file) {
  const log = ff(['-nostats', '-i', file, '-filter_complex', 'ebur128=peak=true', '-f', 'null', '-'], { quiet: false });
  const sum = log.slice(log.lastIndexOf('Summary:'));
  return { I: +sum.match(/I:\s+(-?[\d.]+) LUFS/)[1], TP: +sum.match(/Peak:\s+(-?[\d.]+) dBFS/)[1] };
}
