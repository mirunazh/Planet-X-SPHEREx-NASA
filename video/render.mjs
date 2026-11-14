// Render HTML scenes frame by frame and join them with ffmpeg.
//   node render.mjs                     both outputs (proof + timeline-30s), audio, audit
//   node render.mjs proof               one output
//   node render.mjs --only s1,s9        frames only for these shots (no encode)
//   options: --frames <dir> (default video/frames)  --reuse (keep complete frame dirs)
//            --jobs 4  --no-audio  --audit-every 15
import fs from 'node:fs';
import path from 'node:path';
import { shots, byId, outputs, FPS, W, H, MAX_SECONDS } from './shots.mjs';
import { VIDEO, BASE, serve, launch, ff, X264, TO_YUV, mkdirp, rmrf } from './lib/common.mjs';
import { buildAudio } from './audio.mjs';

const argv = process.argv.slice(2);
const opt = (k, d) => { const i = argv.indexOf(k); return i >= 0 ? argv[i + 1] : d; };
const flag = (k) => argv.includes(k);
const valued = new Set(['--frames', '--jobs', '--audit-every', '--only']);
const positional = argv.filter((a, i) => !a.startsWith('--') && !valued.has(argv[i - 1]));
const only = opt('--only')?.split(',');
const names = only ? [] : positional.length ? positional : Object.keys(outputs);
for (const n of names) if (!outputs[n]) throw new Error(`unknown output ${n}; known: ${Object.keys(outputs).join(', ')}`);
const FRAMES = path.resolve(opt('--frames', path.join(VIDEO, 'frames')));
const OUT = path.join(VIDEO, 'out');
const jobs = +opt('--jobs', 4), auditEvery = +opt('--audit-every', 15);

const ids = only || [...new Set(names.flatMap((n) => outputs[n]))];
const pad = (n) => String(n).padStart(5, '0');
const complete = (s) => fs.existsSync(path.join(FRAMES, s.id, pad(s.frames - 1) + '.png'));

async function renderShot(page, s) {
  const dir = path.join(FRAMES, s.id);
  rmrf(dir); mkdirp(dir);
  await page.goto(`${BASE}/video/scenes/${s.scene}.html?shot=${s.id}`);
  await page.waitForFunction(() => window.sceneReady === true, null, { timeout: 30000 });
  const audit = [];
  for (let n = 0; n < s.frames; n++) {
    await page.evaluate((t) => window.setT(t), n / FPS);
    await page.screenshot({ path: path.join(dir, pad(n) + '.png'), type: 'png' });
    if (n % auditEvery === 0 || n === s.frames - 1) audit.push({ shot: s.id, t: +(n / FPS).toFixed(3), items: await page.evaluate(() => window.__audit()) });
  }
  return audit;
}

async function renderFrames(list) {
  const server = await serve();
  const browser = await launch();
  const ctx = await browser.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });
  const queue = [...list], audits = [], times = {};
  const worker = async () => {
    const page = await ctx.newPage();
    page.on('pageerror', (e) => { console.error('page error:', e.message); process.exitCode = 1; });
    for (let s; (s = queue.shift()); ) {
      const t0 = Date.now();
      audits.push(...(await renderShot(page, s)));
      times[s.id] = (Date.now() - t0) / 1000;
      console.log(`  ${s.id}: ${s.frames} frames in ${times[s.id].toFixed(1)} s`);
    }
  };
  const t0 = Date.now();
  await Promise.all(Array.from({ length: Math.min(jobs, list.length) }, worker));
  const wall = (Date.now() - t0) / 1000;
  await browser.close(); server.close();
  return { audits, times, wall };
}

function encode(name) {
  const list = outputs[name].map((id) => byId[id]);
  const total = list.reduce((a, s) => a + s.frames, 0) / FPS;
  if (name.startsWith('timeline') && total > MAX_SECONDS + 1e-9) throw new Error(`${name} is ${total} s, over ${MAX_SECONDS}`);
  const inputs = list.flatMap((s) => ['-framerate', String(FPS), '-i', path.join(FRAMES, s.id, '%05d.png')]);
  const graph = list.map((_, i) => `[${i}:v]`).join('') + `concat=n=${list.length}:v=1:a=0,${TO_YUV}[v]`;
  const audio = flag('--no-audio') ? [] : ['-i', buildAudio(list, path.join(OUT, `${name}.wav`))];
  const amap = audio.length ? ['-map', `${list.length}:a`, '-c:a', 'aac', '-b:a', '192k', '-ar', '48000'] : [];
  const file = path.join(OUT, `${name}.mp4`);
  ff([...inputs, ...audio, '-filter_complex', graph, '-map', '[v]', ...amap, ...X264, '-t', total.toFixed(6), '-movflags', '+faststart', file]);
  return { file, total };
}

mkdirp(OUT);
const todo = ids.map((id) => byId[id] ?? (() => { throw new Error(`unknown shot ${id}`); })()).filter((s) => !(flag('--reuse') && complete(s)));
console.log(`rendering ${todo.length} shot(s) into ${FRAMES}`);
const { audits, times, wall } = await renderFrames(todo);
const framesDone = todo.reduce((a, s) => a + s.frames, 0);
if (framesDone) console.log(`frames: ${framesDone} (${(framesDone / FPS).toFixed(2)} s of video) in ${wall.toFixed(1)} s wall = ${(wall / (framesDone / FPS)).toFixed(2)} s per video second`);

// Audit report: every sampled frame, every text element.
if (audits.length) {
  const file = path.join(OUT, only ? `audit-${only.join('_')}.json` : 'audit.json');
  const bad = audits.flatMap((a) => a.items.filter((i) => i.issues?.length).map((i) => ({ shot: a.shot, t: a.t, ...i })));
  const checked = audits.flatMap((a) => a.items.filter((i) => i.issues));
  const minC = Math.min(...checked.map((i) => i.contrast));
  fs.writeFileSync(file, JSON.stringify({ samples: audits.length, textChecks: checked.length, minContrast: minC, failures: bad, audits }, null, 1));
  console.log(`audit: ${audits.length} sampled frames, ${checked.length} text checks, min contrast ${minC.toFixed(2)}, failures ${bad.length} -> ${path.relative(VIDEO, file)}`);
  for (const b of bad.slice(0, 20)) console.log('  FAIL', b.shot, b.t, JSON.stringify(b.text), b.issues.join(', '));
  if (bad.length) process.exitCode = 1;
}

for (const n of names) {
  const t0 = Date.now();
  const { file, total } = encode(n);
  console.log(`encoded ${path.relative(VIDEO, file)} (${total.toFixed(3)} s) in ${((Date.now() - t0) / 1000).toFixed(1)} s`);
}
