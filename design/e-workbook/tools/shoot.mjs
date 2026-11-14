// node tools/shoot.mjs [s1 s2 ...]   (static server on 127.0.0.1:3302 from the repository root)
import { chromium } from 'playwright-core';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const here = path.dirname(fileURLToPath(import.meta.url));
const exe = path.join(os.homedir(), 'Library/Caches/ms-playwright/chromium_headless_shell-1194/chrome-mac/headless_shell');
const base = 'http://127.0.0.1:3302/design/e-workbook/';
const all = {
  s1: ['?play=0#/', null, 3400],
  s2: ['#/mission/spot', 'SB.s2.pick()', 1200],
  s3: ['#/mission/measure', null, 900],
  s4: ['?plx=306#/mission/distance', null, 600],
  s5: ['#/mission/done', null, 600],
  s6: ['#/explore', null, 600],
  's1-ro': ['?play=0&lang=ro#/', null, 3400],
  's2-hint': ['#/mission/spot', 'SB.s2.miss()', 900],
  's3-diff': ['?diff=1#/mission/measure', null, 900],
};
const pick = process.argv.slice(2);
const shots = Object.entries(all).filter(([k]) => !pick.length || pick.includes(k));
const sizes = [['desktop', 1440, 900], ['phone', 390, 844]];
const b = await chromium.launch({ executablePath: exe });
for (const [w, W, H] of sizes) {
  for (const [n, [q, act, wait]] of shots) {
    const p = await b.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });
    p.on('pageerror', e => console.log(n, w, 'pageerror', e.message));
    await p.goto(base + q);
    await p.waitForSelector('body[data-ready="1"]', { timeout: 20000 }).catch(() => console.log(n, 'not ready'));
    await p.evaluate(() => document.fonts.ready);
    if (act) await p.evaluate(act);
    await p.waitForTimeout(wait);
    const full = n !== 's1' && n !== 's1-ro';
    await p.screenshot({ path: path.join(here, '..', 'shots', `${n}-${w}.png`), fullPage: full && w === 'desktop' }); // phone: the real first screen, sticky bar included
    if (full && w === 'phone') await p.screenshot({ path: path.join(here, '..', 'shots', `${n}-${w}-full.png`), fullPage: true });
    await p.close();
  }
}
await b.close();
