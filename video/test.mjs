// Checks for the outputs, then the contact sheet.  node test.mjs [--skip-determinism]
// 1 ffprobe: 1920x1080, 60/1, yuv420p, h264, duration within one frame, timeline <= 30 s
// 2 determinism: re-render s1 + bridge and re-run the stand-in capture into a temp dir,
//   compare SHA-256 of 10 sampled frames each
// 3 loudness: integrated LUFS and true peak of every output with audio
// 4 contact.png: one frame every 0.5 s of the 30 s timeline, with times
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { shots, outputs, byId, FPS } from './shots.mjs';
import { VIDEO, BASE, serve, launch, mkdirp } from './lib/common.mjs';
import { measure } from './audio.mjs';

const OUT = path.join(VIDEO, 'out');
let failed = 0;
const check = (ok, msg) => { console.log(`${ok ? 'PASS' : 'FAIL'}  ${msg}`); if (!ok) failed++; };

// 1. ffprobe
const expected = { proof: outputs.proof, 'timeline-30s': outputs['timeline-30s'] };
const capFrames = fs.readdirSync(path.join(VIDEO, 'frames/capture-standin')).filter((f) => f.endsWith('.png')).length;
for (const name of ['proof', 'timeline-30s', 'capture-standin']) {
  const file = path.join(OUT, `${name}.mp4`);
  const r = spawnSync('ffprobe', ['-v', 'error', '-select_streams', 'v:0', '-show_entries', 'stream=codec_name,width,height,r_frame_rate,avg_frame_rate,pix_fmt,nb_frames', '-show_entries', 'format=duration', '-of', 'json', file], { encoding: 'utf8' });
  const j = JSON.parse(r.stdout), s = j.streams[0], dur = +j.format.duration;
  const target = expected[name] ? expected[name].reduce((a, id) => a + byId[id].frames, 0) / FPS : capFrames / FPS;
  const ok = s.width === 1920 && s.height === 1080 && s.r_frame_rate === '60/1' && s.avg_frame_rate === '60/1' && s.pix_fmt === 'yuv420p' && s.codec_name === 'h264'
    && Math.abs(dur - target) <= 1 / FPS + 1e-9 && (name !== 'timeline-30s' || dur <= 30.0005);
  check(ok, `${name}.mp4: ${s.codec_name} ${s.width}x${s.height} ${s.r_frame_rate} (avg ${s.avg_frame_rate}) ${s.pix_fmt}, ${s.nb_frames} frames, ${dur.toFixed(3)} s (target ${target.toFixed(3)} s)`);
}

// 2. determinism
const sha = (f) => crypto.createHash('sha256').update(fs.readFileSync(f)).digest('hex');
const sample = (n) => Array.from({ length: 10 }, (_, i) => Math.round((i * (n - 1)) / 9));
if (!process.argv.includes('--skip-determinism')) {
  const tmp = path.join(VIDEO, 'frames', '_det'); fs.rmSync(tmp, { recursive: true, force: true }); mkdirp(tmp);
  const run = (args) => { const r = spawnSync('node', args, { cwd: VIDEO, encoding: 'utf8' }); if (r.status) console.log(r.stdout, r.stderr); };
  run(['render.mjs', '--only', 's1,bridge', '--frames', tmp]);
  for (const id of ['s1', 'bridge']) {
    const idx = sample(byId[id].frames), file = (d, n) => path.join(d, id, String(n).padStart(5, '0') + '.png');
    const same = idx.filter((n) => sha(file(path.join(VIDEO, 'frames'), n)) === sha(file(tmp, n))).length;
    check(same === 10, `determinism ${id}: ${same}/10 sampled frames identical (frames ${idx.join(',')})`);
  }
  run(['capture.mjs', 'standin/actions.mjs', '--frames', path.join(tmp, 'cap'), '--out', path.join(tmp, 'cap.mp4')]);
  const idx = sample(capFrames), f2 = (d, n) => path.join(d, String(n).padStart(5, '0') + '.png');
  const same = idx.filter((n) => sha(f2(path.join(VIDEO, 'frames/capture-standin'), n)) === sha(f2(path.join(tmp, 'cap'), n))).length;
  check(same === 10, `determinism live capture: ${same}/10 sampled frames identical (frames ${idx.join(',')})`);
  fs.rmSync(tmp, { recursive: true, force: true });
}

// 3. loudness
for (const name of ['proof', 'timeline-30s']) {
  const m = measure(path.join(OUT, `${name}.mp4`));
  check(Math.abs(m.I + 16) <= 0.5 && m.TP <= -1.5, `${name}.mp4 loudness: I ${m.I} LUFS, true peak ${m.TP} dBTP`);
}

// 4. contact sheet (HTML, because this ffmpeg has no drawtext)
const cells = [];
for (let t = 0; t < 30 - 1e-9; t += 0.5) {
  const s = shots.find((x) => t >= x.start - 1e-9 && t < x.start + x.dur - 1e-9);
  cells.push({ t, src: `/video/frames/${s.id}/${String(Math.round((t - s.start) * FPS)).padStart(5, '0')}.png`, id: s.id });
}
const html = `<!doctype html><meta charset="utf-8"><style>@font-face{font-family:M;src:url(/video/assets/fonts/JetBrainsMono-Regular.woff2)}
body{margin:0;background:#080B12;color:#E8ECF6;font:16px M;padding:20px;width:2000px}h1{font-size:20px;margin:0 0 14px}
.g{display:grid;grid-template-columns:repeat(6,320px);gap:12px 16px}.c img{width:320px;height:180px;display:block;border:1px solid #3A4666}.c div{padding:4px 0}</style>
<h1>timeline-30s, one frame every 0.5 s</h1><div class="g">${cells.map((c) => `<div class="c"><img src="${c.src}"><div>${c.t.toFixed(2)} s  ${c.id}</div></div>`).join('')}</div>`;
mkdirp(OUT); fs.writeFileSync(path.join(VIDEO, 'frames', 'contact.html'), html);
const server = await serve(); const browser = await launch();
const page = await browser.newPage({ viewport: { width: 2040, height: 800 } });
await page.goto(`${BASE}/video/frames/contact.html`, { waitUntil: 'networkidle' });
await page.screenshot({ path: path.join(OUT, 'contact.png'), fullPage: true });
await browser.close(); server.close();
console.log(`contact sheet: out/contact.png (${cells.length} frames)`);
process.exitCode = failed ? 1 : 0;
