// cd design/a-plate && node tools/shoot.mjs [s1 s2 ...]   (static server on 127.0.0.1:3302 from the repo root)
// playwright 1.56.1 from ./node_modules drives the cached chromium build 1194; nothing is downloaded.
import { chromium } from 'playwright';
const base = `http://127.0.0.1:${process.env.PORT || 3302}/design/a-plate/index.html`;
const all = [
  ['s1', '?play=0#/'], ['s2', '?visit=4&marks=moved,first,stars&term=1#/look'], ['s3', '?plx=306#/measure'],
  ['s1-ro', '?lang=ro&play=0#/'], ['s1-real', '?play=0&real=1#/'], ['s2-dark', '?theme=dark&visit=4&marks=moved,stars#/look'],
];
const want = process.argv.slice(2);
const shots = want.length ? all.filter(([n]) => want.includes(n)) : all;
const sizes = [['desktop', 1440, 900], ['phone', 390, 844]];
const b = await chromium.launch();
for (const [w, W, H] of sizes) {
  const p = await b.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });
  p.on('pageerror', e => console.log('PAGE ERROR', e.message));
  for (const [n, q] of shots) {
    await p.goto('about:blank'); await p.goto(base + q);
    await p.waitForSelector('body[data-ready="1"]', { timeout: 15000 }).catch(() => console.log('not ready', n));
    await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(400);
    const sw = await p.evaluate(() => document.documentElement.scrollWidth);
    if (sw > W) console.log(`${n}-${w}: horizontal overflow ${sw}px`);
    await p.screenshot({ path: `shots/${n}-${w}.png` });
  }
  await p.close();
}
await b.close();
// full-page review copies of the long screens (for the critique, not for the comparison set)
if (process.env.FULL) {
  const b2 = await chromium.launch();
  for (const [w, W, H] of sizes) {
    const p = await b2.newPage({ viewport: { width: W, height: H } });
    await p.goto(base + '?plx=306#/measure'); await p.waitForSelector('body[data-ready="1"]'); await p.waitForTimeout(400);
    await p.screenshot({ path: `shots/review-s3-${w}-full.png`, fullPage: true });
  }
  await b2.close();
}
