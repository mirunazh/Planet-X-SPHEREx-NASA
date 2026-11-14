// node tools/shoot.mjs [s1 s2 ...] [--axe]   (static server on 127.0.0.1:3302 from the repo root)
// Uses the Chromium headless shell build that playwright-core 1.56.1 expects, already in the cache; downloads nothing.
import { chromium } from 'playwright-core';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const here = fileURLToPath(new URL('.', import.meta.url));
const base = 'http://127.0.0.1:3302/design/d-observatory/index.html';
const all = {
  s1: '#/', s2: '?a=1#/mission/spot', s3: '#/mission/measure', s4: '?plx=306#/mission/distance', s5: '#/mission/done', s6: '#/explore',
  's1-ro': '?lang=ro#/', 's2-ask': '#/mission/spot', 's1-real': '#/',
};
const args = process.argv.slice(2), axe = args.includes('--axe'), still = args.includes('--still');
const pick = args.filter(a => !a.startsWith('--'));
const names = pick.length ? pick : ['s1', 's2', 's3', 's4', 's5', 's6'];
const sizes = [['desktop', 1440, 900], ['phone', 390, 844]];
const axeSrc = axe ? readFileSync(`${here}node_modules/axe-core/axe.min.js`, 'utf8') : '';
const b = await chromium.launch();
for (const [w, W, H] of sizes) {
  const p = await b.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1, reducedMotion: still ? 'reduce' : 'no-preference' });
  p.on('pageerror', e => console.log('PAGEERROR', e.message));
  p.on('console', m => m.type() === 'error' && console.log('CONSOLE', m.text()));
  for (const n of names) {
    await p.goto('about:blank'); await p.goto(base + all[n]);
    await p.waitForSelector('body[data-loaded="1"]', { timeout: 20000 }).catch(() => console.log('not loaded', n));
    await p.evaluate(() => document.fonts.ready);
    if (n === 's1-real') await p.click('#real');
    await p.waitForTimeout(n.startsWith('s1') && !still ? 3800 : 1200);
    await p.screenshot({ path: `${here}../shots/${n}-${w}.png` });
    if (axe) {
      await p.addScriptTag({ content: axeSrc });
      const r = await p.evaluate(async () => (await axe.run(document, { resultTypes: ['violations'] })).violations.map(v => `${v.impact} ${v.id} (${v.nodes.length}): ${v.nodes.slice(0, 2).map(n => n.target.join(' ')).join(' | ')}`));
      console.log(`axe ${n}-${w}:`, r.length ? '\n  ' + r.join('\n  ') : 'clean');
    }
  }
  await p.close();
}
await b.close();
