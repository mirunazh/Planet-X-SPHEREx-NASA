// node tools/shoot.mjs  (server on 127.0.0.1:3302 started from the repo root)
import { chromium } from 'playwright-core';
const exe = `${process.env.HOME}/Library/Caches/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-mac-arm64/chrome-headless-shell`;
const base = 'http://127.0.0.1:3302/design/b-dial/index.html';
const shots = [
  ['s1', '?play=0#/'], ['s2', '?visit=4#/look'], ['s3', '?plx=300#/measure'], ['s4', '#/elsewhere'], ['s5', '?theme=dark&visit=4#/look'],
];
const sizes = [['desktop', 1440, 900], ['phone', 390, 844]];
const b = await chromium.launch({ executablePath: exe });
for (const [w, W, H] of sizes) {
  const p = await b.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });
  for (const [n, q] of shots) {
    await p.goto('about:blank'); await p.goto(base + q);
    await p.waitForSelector('body[data-ready="1"]', { timeout: 15000 }).catch(() => {});
    await p.waitForTimeout(600);
    await p.screenshot({ path: `shots/${n}-${w}.png` });
  }
  await p.close();
}
await b.close();
