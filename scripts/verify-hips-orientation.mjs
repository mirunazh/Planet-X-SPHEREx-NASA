// Verifies how HiPS tile pixels map onto HEALPix cells, using NASA data only.
//
// Method: bright stars from the 2MASS Point Source Catalog (IRSA table fp_psc)
// are located in SPHEREx DR1 and 2MASS HiPS tiles served by IRSA under each of
// the 8 possible pixel orientations. The correct orientation is the one that puts
// every star on a bright pixel. The same test is repeated on the low-resolution
// Allsky image used for the first paint of the globe.
//
// Run: npm run verify:hips

import { PNG } from 'pngjs';
import jpeg from 'jpeg-js';
import * as hp from '@hscmap/healpix';

const TAP = 'https://irsa.ipac.caltech.edu/TAP/sync';
const HIPS = 'https://irsa.ipac.caltech.edu/data/hips';
const EXPECTED = 'x=nw,y=ne';

const SURVEYS = [
  { id: 'SPHEREx DR1 cube, frame 46 (2.19 um)', base: `${HIPS}/SPHEREx/spherex_allsky_cube`, ext: 'png', order: 5, suffix: '_46' },
  { id: '2MASS colour', base: `${HIPS}/CDS/2MASS/Color`, ext: 'jpg', order: 6, suffix: '' },
];

// Test fields spread over the north cap, equatorial belt and south cap faces.
const FIELDS = [
  [15, 60], [110, 45], [200, 5], [300, -10], [60, -50], [250, -70], [170, 80], [330, 30],
];

const HYPOTHESES = [];
for (const swap of [false, true]) {
  for (const flipX of [false, true]) {
    for (const flipY of [false, true]) {
      HYPOTHESES.push({
        swap, flipX, flipY,
        name: `${swap ? 'x=nw,y=ne' : 'x=ne,y=nw'}${flipX ? ' flipX' : ''}${flipY ? ' flipY' : ''}`,
      });
    }
  }
}

const DEG = Math.PI / 180;
const radecToVec = (ra, dec) => [
  Math.cos(dec * DEG) * Math.cos(ra * DEG),
  Math.cos(dec * DEG) * Math.sin(ra * DEG),
  Math.sin(dec * DEG),
];

async function tap(query) {
  const url = `${TAP}?LANG=ADQL&FORMAT=csv&QUERY=${encodeURIComponent(query)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`TAP HTTP ${res.status}`);
  const lines = (await res.text()).trim().split(/\r?\n/).slice(1);
  return lines.filter(Boolean).map((l) => l.split(','));
}

const imageCache = new Map();
async function fetchImage(url, ext) {
  if (imageCache.has(url)) return imageCache.get(url);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  let img;
  if (ext === 'png') {
    const png = PNG.sync.read(buf);
    img = { w: png.width, h: png.height, data: png.data };
  } else {
    const j = jpeg.decode(buf, { useTArray: true, maxMemoryUsageInMB: 512 });
    img = { w: j.width, h: j.height, data: j.data };
  }
  imageCache.set(url, img);
  return img;
}

const lum = (img, x, y) => {
  const i = (y * img.w + x) * 4;
  return (img.data[i] + img.data[i + 1] + img.data[i + 2]) / 3;
};

function robustStats(img, x0 = 0, y0 = 0, w = img.w, h = img.h) {
  const values = [];
  for (let y = y0; y < y0 + h; y += 2) for (let x = x0; x < x0 + w; x += 2) values.push(lum(img, x, y));
  values.sort((a, b) => a - b);
  const med = values[Math.floor(values.length / 2)];
  const dev = values.map((v) => Math.abs(v - med)).sort((a, b) => a - b);
  const mad = dev[Math.floor(dev.length / 2)];
  return { med, mad };
}

function peakZ(img, x, y, { med, mad }) {
  let m = -Infinity;
  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      const xx = Math.min(img.w - 1, Math.max(0, x + dx));
      const yy = Math.min(img.h - 1, Math.max(0, y + dy));
      m = Math.max(m, lum(img, xx, yy));
    }
  }
  return (m - med) / (1.4826 * mad + 1);
}

// Sub-pixel position of a direction inside its tile: tile index plus (ne, nw) in [0, size).
function cellPosition(tileOrder, levels, v) {
  const nside = 2 ** (tileOrder + levels);
  const ipix = hp.vec2pix_nest(nside, v);
  const per = 4 ** levels;
  const tile = Math.floor(ipix / per);
  const { x, y } = hp.bit_decombine(ipix % per);
  return { tile, ne: x, nw: y };
}

function mapHypothesis(h, ne, nw, size) {
  let X = h.swap ? nw : ne;
  let Y = h.swap ? ne : nw;
  if (h.flipX) X = size - 1 - X;
  if (h.flipY) Y = size - 1 - Y;
  return { X, Y };
}

const median = (a) => [...a].sort((p, q) => p - q)[Math.floor(a.length / 2)];

async function main() {
  console.log('Fetching reference stars from the 2MASS Point Source Catalog (IRSA fp_psc)...');
  const stars = [];
  for (const [ra, dec] of FIELDS) {
    const rows = await tap(
      `SELECT TOP 2 ra, dec, k_m FROM fp_psc WHERE CONTAINS(POINT('ICRS', ra, dec), CIRCLE('ICRS', ${ra}, ${dec}, 1.5)) = 1 AND k_m BETWEEN 3.5 AND 6.5 ORDER BY k_m ASC`,
    );
    for (const r of rows) stars.push({ ra: Number(r[0]), dec: Number(r[1]), k: Number(r[2]) });
  }
  console.log(`  ${stars.length} stars (Ks 3.5-6.5) in ${FIELDS.length} fields\n`);

  let failures = 0;
  for (const s of SURVEYS) {
    const scores = HYPOTHESES.map(() => []);
    for (const star of stars) {
      const { tile, ne, nw } = cellPosition(s.order, 9, radecToVec(star.ra, star.dec));
      const url = `${s.base}/Norder${s.order}/Dir${Math.floor(tile / 10000) * 10000}/Npix${tile}${s.suffix}.${s.ext}`;
      const img = await fetchImage(url, s.ext);
      const st = robustStats(img);
      HYPOTHESES.forEach((h, i) => {
        const { X, Y } = mapHypothesis(h, ne, nw, img.w);
        scores[i].push(peakZ(img, X, Y, st));
      });
    }
    const rows = HYPOTHESES.map((h, i) => ({
      name: h.name,
      medianZ: median(scores[i]),
      hits: scores[i].filter((z) => z > 5).length,
    })).sort((a, b) => b.medianZ - a.medianZ);
    console.log(`Tiles: ${s.id} (order ${s.order})`);
    for (const r of rows) console.log(`  ${r.name.padEnd(24)} median z=${r.medianZ.toFixed(1).padStart(7)}  hits ${r.hits}/${stars.length}`);
    const best = rows[0];
    const ok = best.name === EXPECTED && best.hits >= Math.ceil(stars.length * 0.8) && best.medianZ > 2 * Math.max(1, rows[1].medianZ);
    console.log(`  -> best: ${best.name} ${ok ? 'OK' : 'UNEXPECTED'}\n`);
    if (!ok) failures++;
  }

  // Allsky preview: 27 columns of 64x64 order-3 tiles.
  const allskyUrl = `${HIPS}/SPHEREx/spherex_allsky_cube/Norder3/Allsky_46.png`;
  const sky = await fetchImage(allskyUrl, 'png');
  const cols = 27;
  const t = sky.w / cols;
  const hyp = HYPOTHESES.find((h) => h.name === EXPECTED);
  const z = [];
  for (const star of stars) {
    const { tile, ne, nw } = cellPosition(3, 6, radecToVec(star.ra, star.dec));
    const { X, Y } = mapHypothesis(hyp, ne, nw, t);
    const col = tile % cols;
    const row = Math.floor(tile / cols);
    const st = robustStats(sky, col * t, row * t, t, t);
    z.push(peakZ(sky, col * t + X, row * t + Y, st));
  }
  const allskyOk = median(z) > 3;
  console.log(`Allsky ${sky.w}x${sky.h} (tile ${t}px): median z=${median(z).toFixed(1)}, hits ${z.filter((v) => v > 3).length}/${z.length} -> ${allskyOk ? 'OK' : 'UNEXPECTED'}`);
  if (!allskyOk) failures++;

  // Cube frame naming: frame 0 has no suffix.
  const probe = async (u) => (await fetch(u, { method: 'HEAD' })).status;
  const base = `${HIPS}/SPHEREx/spherex_allsky_cube/Norder3/Dir0`;
  const [plain, zero, one] = await Promise.all([probe(`${base}/Npix0.png`), probe(`${base}/Npix0_0.png`), probe(`${base}/Npix0_1.png`)]);
  const namingOk = plain === 200 && zero === 404 && one === 200;
  console.log(`Cube frame naming: Npix0.png ${plain}, Npix0_0.png ${zero}, Npix0_1.png ${one} -> ${namingOk ? 'OK (frame 0 has no suffix)' : 'UNEXPECTED'}`);
  if (!namingOk) failures++;

  process.exitCode = failures ? 1 : 0;
  console.log(failures ? `\n${failures} check(s) failed` : '\nAll orientation checks passed');
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
