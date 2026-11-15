// Builds the real NASA imagery shown by the Solar System intro, from NASA services only.
// Every file is listed in public/intro/sources.json with its mission, credit, source URL,
// processing steps and retrieval time.
//
//   public/intro/sky-south-ecliptic-pole.jpg
//       The sky a viewer above the Solar System looks towards. The intro draws the planets as
//       seen from the north ecliptic pole, so the stars behind the Sun are those around the
//       south ecliptic pole (with the Magellanic Clouds). Reprojected from the SPHEREx DR1 HiPS
//       at IRSA, frame 46 (2.19 µm): the same tiles the sky map opens on.
//
// The project's scope is SPHEREx only, so this is the intro's only picture: the Sun and the
// planets are drawn as simple discs, not photographs from other missions.
//
// Run: npm run data:intro

import { mkdir, writeFile } from 'node:fs/promises';
import { PNG } from 'pngjs';
import jpeg from 'jpeg-js';
import * as hp from '@hscmap/healpix';

const OUT = new URL('../public/intro/', import.meta.url);
const HEADERS = { 'User-Agent': 'spherex-sky-navigator/0.1 (build-time image snapshot)' };
const retrievedAt = new Date().toISOString();
const DEG = Math.PI / 180;

// --- Sources ------------------------------------------------------------------------------------

const IRSA_HIPS = 'https://irsa.ipac.caltech.edu/data/hips';

/** Mean obliquity of the ecliptic at J2000.0 (IAU 1976), degrees: the frame of src/lib/sky/planets.ts. */
const OBLIQUITY_J2000 = 23.4392911;

const SKY = {
  file: 'sky-south-ecliptic-pole.jpg',
  hips: `${IRSA_HIPS}/SPHEREx/spherex_allsky_cube`,
  /** 512-px tiles at order 2 have 1.72′ pixels, close to one output pixel near the centre. */
  order: 2,
  /** 2.19 µm ("Through dust"): the frame the sky map opens on. */
  frame: 46,
  size: 2048,
  /** Angle from the centre (the south ecliptic pole) to the middle of each edge. */
  edgeDeg: 70,
  supersample: 3,
};

// --- Network ------------------------------------------------------------------------------------

async function get(url, { timeoutMs = 120000, tries = 3, as = 'buffer' } = {}) {
  let lastError;
  for (let attempt = 1; attempt <= tries; attempt++) {
    const ctl = new AbortController();
    const timer = setTimeout(() => ctl.abort(), timeoutMs);
    try {
      const res = await fetch(url, { headers: HEADERS, signal: ctl.signal });
      if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
      return as === 'json' ? await res.json() : Buffer.from(await res.arrayBuffer());
    } catch (error) {
      lastError = error;
    } finally {
      clearTimeout(timer);
    }
  }
  throw lastError;
}

async function inPool(items, limit, work) {
  const results = new Array(items.length);
  let next = 0;
  const runners = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (next < items.length) {
      const i = next++;
      results[i] = await work(items[i], i);
    }
  });
  await Promise.all(runners);
  return results;
}

// --- Images -------------------------------------------------------------------------------------

/** Decodes PNG or JPEG into 8-bit RGBA. */
function decode(buf) {
  if (buf[0] === 0x89 && buf[1] === 0x50) {
    const png = PNG.sync.read(buf);
    return { w: png.width, h: png.height, data: png.data };
  }
  const j = jpeg.decode(buf, { useTArray: true, formatAsRGBA: true, maxMemoryUsageInMB: 2048 });
  return { w: j.width, h: j.height, data: j.data };
}

const encodeJpeg = (img, quality) => jpeg.encode({ data: img.data, width: img.w, height: img.h }, quality).data;

const clamp01 = (v) => Math.min(1, Math.max(0, v));

// --- Sky backdrop -------------------------------------------------------------------------------

/**
 * Stereographic view centred on the south ecliptic pole, as seen from inside the sky: ecliptic
 * longitude 0° (the March equinox) to the right and 90° up, exactly like the intro's orrery,
 * which looks down from the north ecliptic pole. Returns the ICRS unit vector for an output
 * position given in pixels from the top-left corner.
 */
function skyDirection(px, py, scale, half) {
  const dx = (px - half) / scale;
  const dy = (half - py) / scale;
  const theta = 2 * Math.atan(Math.hypot(dx, dy) / 2); // angle from the south ecliptic pole
  const beta = theta - Math.PI / 2;
  const lambda = Math.atan2(dy, dx);
  const cb = Math.cos(beta);
  const xe = cb * Math.cos(lambda);
  const ye = cb * Math.sin(lambda);
  const ze = Math.sin(beta);
  const ce = Math.cos(OBLIQUITY_J2000 * DEG);
  const se = Math.sin(OBLIQUITY_J2000 * DEG);
  return [xe, ye * ce - ze * se, ye * se + ze * ce];
}

async function buildSky() {
  const { size: N, order, frame, supersample: ss } = SKY;
  const half = N / 2;
  const scale = half / (2 * Math.tan((SKY.edgeDeg * DEG) / 2)); // px per unit of stereographic radius
  const nside = 2 ** (order + 9);
  const perTile = 4 ** 9;

  const needed = new Set();
  for (let py = 0; py <= N; py += 4) {
    for (let px = 0; px <= N; px += 4) needed.add(Math.floor(hp.vec2pix_nest(nside, skyDirection(px, py, scale, half)) / perTile));
  }
  const tileIds = [...needed].sort((a, b) => a - b);
  console.log(`Sky: ${tileIds.length} SPHEREx order-${order} tiles (frame ${frame})...`);
  const tiles = new Map();
  await inPool(tileIds, 8, async (t) => {
    const url = `${SKY.hips}/Norder${order}/Dir${Math.floor(t / 10000) * 10000}/Npix${t}_${frame}.png`;
    tiles.set(t, decode(await get(url)));
  });

  const value = new Float32Array(N * N);
  for (let py = 0; py < N; py++) {
    for (let px = 0; px < N; px++) {
      let sum = 0;
      let valid = 0;
      for (let b = 0; b < ss; b++) {
        for (let a = 0; a < ss; a++) {
          const ipix = hp.vec2pix_nest(nside, skyDirection(px + (a + 0.5) / ss, py + (b + 0.5) / ss, scale, half));
          const tile = tiles.get(Math.floor(ipix / perTile));
          // In a tile image, x follows nw and y follows ne (src/lib/sky/hips.ts, cellToImage).
          const { x: ne, y: nw } = hp.bit_decombine(ipix % perTile);
          const i = (ne * tile.w + nw) * 4;
          // Transparent pixels are "no data"; a value of 0 is real (dark) sky at the bottom of the cut.
          if (tile.data[i + 3] > 0) {
            sum += tile.data[i];
            valid++;
          }
        }
      }
      value[py * N + px] = valid ? sum / valid : NaN;
    }
  }

  // The DR1 all-sky HiPS has no data in a small disc at the south ecliptic pole. (It is not the
  // deep field: SPHEREx's southern deep field sits 6.4° away, clear of the Magellanic Clouds.) It is
  // behind the Sun in the intro; show it as plain sky at the local median level rather than as a
  // black hole. No stars are invented.
  const gaps = [];
  for (let i = 0; i < N * N; i++) if (Number.isNaN(value[i])) gaps.push(i);
  const R = 48;
  for (const i of gaps) {
    const gx = i % N;
    const gy = Math.floor(i / N);
    const near = [];
    for (let y = Math.max(0, gy - R); y <= Math.min(N - 1, gy + R); y += 2) {
      for (let x = Math.max(0, gx - R); x <= Math.min(N - 1, gx + R); x += 2) {
        const v = value[y * N + x];
        if (!Number.isNaN(v)) near.push(v);
      }
    }
    near.sort((p, q) => p - q);
    value[i] = near.length ? near[Math.floor(near.length / 2)] : 0;
  }
  const gapRadiusDeg = gaps.length ? (2 * Math.atan(Math.sqrt(gaps.length / Math.PI) / scale / 2)) / DEG : 0;
  if (gaps.length) console.log(`  ${gaps.length} pixels without data (a disc of about ${gapRadiusDeg.toFixed(1)}° radius), filled with the local median`);

  // Display stretch: the HiPS values are already asinh-scaled (hips_pixel_function). Lower the
  // black point to the typical sky level so the planets sit on dark sky, as on the map's darkest
  // fields; brightness in between is unchanged in order.
  const sorted = Float32Array.from(value).sort();
  const pct = (p) => sorted[Math.min(sorted.length - 1, Math.floor(p * sorted.length))];
  const black = pct(0.35);
  const white = Math.max(black + 1, pct(0.9995));
  const img = { w: N, h: N, data: new Uint8ClampedArray(N * N * 4) };
  for (let i = 0; i < N * N; i++) {
    const v = Math.round(255 * Math.pow(clamp01((value[i] - black) / (white - black)), 0.9));
    img.data[i * 4] = v;
    img.data[i * 4 + 1] = v;
    img.data[i * 4 + 2] = v;
    img.data[i * 4 + 3] = 255;
  }
  const bytes = encodeJpeg(img, 76);
  await writeFile(new URL(SKY.file, OUT), bytes);
  console.log(`  ${SKY.file}: ${N}×${N}, ${(bytes.length / 1024).toFixed(0)} KB (black ${black.toFixed(1)}, white ${white.toFixed(1)})`);

  return {
    [SKY.file]: {
      subject: 'The sky around the south ecliptic pole, behind the Sun in a view from above the Solar System',
      mission: 'SPHEREx',
      credit: 'NASA/JPL-Caltech (SPHEREx); HiPS by the SPHEREx Science Data Center, Caltech/IPAC',
      source: `${SKY.hips} (frame ${frame}, 2.19 µm), order-${order} tiles ${tileIds.join(', ')}`,
      page: 'https://irsa.ipac.caltech.edu/Missions/spherex.html',
      processing: [
        `Stereographic projection centred on the south ecliptic pole (J2000 ecliptic, obliquity ${OBLIQUITY_J2000}°), seen from inside the sky`,
        'Ecliptic longitude 0° (March equinox) to the right, 90° up: the orientation of the intro orrery',
        `${N}×${N} px, ${SKY.edgeDeg}° from the centre to the middle of each edge, ${ss}×${ss} samples per pixel`,
        `Display stretch: black point at the 35th percentile (${black.toFixed(1)}), white at the 99.95th (${white.toFixed(1)}), gamma 0.9`,
        ...(gaps.length
          ? [`${gaps.length} pixels have no data in the DR1 all-sky HiPS (a disc of about ${gapRadiusDeg.toFixed(1)}° radius at the pole); they show the local median sky level and sit behind the Sun`]
          : []),
      ],
      projection: { type: 'stereographic', centre: 'south ecliptic pole', size: N, edgeDeg: SKY.edgeDeg, pxPerUnitRadius: Number(scale.toFixed(4)) },
      retrievedAt,
    },
  };
}

// --- Main ---------------------------------------------------------------------------------------

async function main() {
  await mkdir(OUT, { recursive: true });
  const manifestUrl = new URL('sources.json', OUT);
  const files = await buildSky();
  const manifest = {
    description: 'SPHEREx imagery for the Solar System intro. Rebuild with: npm run data:intro',
    policy: 'NASA sources only. NASA imagery is generally not subject to copyright in the United States; credits follow NASA media usage guidelines.',
    files,
  };
  await writeFile(manifestUrl, `${JSON.stringify(manifest, null, 2)}\n`);
  console.log(`Wrote ${Object.keys(files).length} entries to public/intro/sources.json`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
