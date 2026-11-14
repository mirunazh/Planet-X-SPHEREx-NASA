// node tools/axe.mjs : axe-core on every route, desktop and phone
import { chromium } from 'playwright-core';
import os from 'node:os';
import path from 'node:path';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const axeSrc = require('fs').readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8');
const exe = path.join(os.homedir(), 'Library/Caches/ms-playwright/chromium_headless_shell-1194/chrome-mac/headless_shell');
const base = 'http://127.0.0.1:3302/design/e-workbook/';
const routes = ['?play=0#/', '?play=0&lang=ro#/', '#/mission/spot', '#/mission/measure', '#/mission/distance', '#/mission/done', '#/explore'];
const b = await chromium.launch({ executablePath: exe });
for (const [W, H] of [[1440, 900], [390, 844]]) for (const r of routes) {
  const p = await b.newPage({ viewport: { width: W, height: H } });
  await p.goto(base + r); await p.waitForSelector('body[data-ready="1"]', { timeout: 20000 }); await p.waitForTimeout(3500);
  await p.addScriptTag({ content: axeSrc });
  const res = await p.evaluate(async () => (await axe.run(document, { runOnly: ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa', 'best-practice'] })).violations.map(v => ({ id: v.id, impact: v.impact, n: v.nodes.length, t: v.nodes.slice(0, 3).map(n => n.target.join(' ')) })));
  const hs = await p.evaluate(() => document.documentElement.scrollWidth - innerWidth);
  console.log(W, r, 'hscroll', hs, JSON.stringify(res));
  await p.close();
}
await b.close();
