// Builds the real NASA imagery shown by the Solar System intro, from NASA services only.
// Every file is listed in public/intro/sources.json with its mission, credit, source URL,
// processing steps and retrieval time.
//
//   public/intro/sky-south-ecliptic-pole.jpg
//       The sky a viewer above the Solar System looks towards. The intro draws the planets as
//       seen from the north ecliptic pole, so the stars behind the Sun are those around the
//       south ecliptic pole (with the Magellanic Clouds). Reprojected from the SPHEREx DR1 HiPS
//       at IRSA, frame 46 (2.19 µm): the same tiles the sky map opens on.
//   public/intro/sun.png        SDO/AIA 171 Å full-disc image, transparent outside the corona.
//   public/intro/<planet>.jpg   Mission photographs cropped to the planet's disc.
//   public/intro/saturn.png     Cassini photograph with the rings, transparent around them.
//
// Run: npm run data:intro            (everything)
//      npm run data:intro -- sky     (only the sky backdrop; or: photos)

import { mkdir, writeFile, readFile } from 'node:fs/promises';
import { PNG } from 'pngjs';
import jpeg from 'jpeg-js';
import * as hp from '@hscmap/healpix';

const OUT = new URL('../public/intro/', import.meta.url);
const HEADERS = { 'User-Agent': 'spherex-sky-navigator/0.1 (build-time image snapshot)' };
const retrievedAt = new Date().toISOString();
const DEG = Math.PI / 180;

// --- Sources ------------------------------------------------------------------------------------

const IRSA_HIPS = 'https://irsa.ipac.caltech.edu/data/hips';
const NASA_IMAGES_API = 'https://images-api.nasa.gov/search';
const NASA_ASSETS = 'https://images-assets.nasa.gov/image';

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

/** Photographs from the NASA Image and Video Library; credits are read from its metadata. */
const PHOTOS = [
  { body: 'mercury', id: 'PIA15160', mission: 'MESSENGER', size: 160 },
  // Two panels side by side; the left one has colours close to what the eye would see.
  { body: 'venus', id: 'PIA23791', mission: 'Mariner 10', size: 160, region: [0, 0, 0.46, 1] },
  { body: 'mars', id: 'PIA00407', mission: 'Viking Orbiter', size: 160 },
  { body: 'jupiter', id: 'PIA02873', mission: 'Cassini', size: 192 },
  { body: 'saturn', id: 'PIA21046', mission: 'Cassini', size: 320, rings: true },
  { body: 'uranus', id: 'PIA18182', mission: 'Voyager 2', size: 160 },
  { body: 'neptune', id: 'PIA00046', mission: 'Voyager 2', size: 160 },
];

/** DSCOVR EPIC natural-colour image (Africa and Europe in view). */
const EARTH = { body: 'earth', image: 'epic_1b_20261112105645', date: '2026-11-12', size: 1024 };

/** SDO/AIA 171 Å browse image of 15 Nov 2026, 06:26:22 UT. */
const SUN = { stamp: '20261115_062622', channel: '0171', size: 256 };

/** Saturn's A ring outer edge over its equatorial radius (136 775 km / 60 268 km, NASA fact sheet). */
const SATURN_RING_TO_GLOBE = 136775 / 60268;

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

function encodePng(img) {
  const png = new PNG({ width: img.w, height: img.h });
  png.data = Buffer.from(img.data.buffer, img.data.byteOffset, img.data.byteLength);
  return PNG.sync.write(png, { colorType: 6 });
}

const luma = (d, i) => 0.2126 * d[i] + 0.7152 * d[i + 1] + 0.0722 * d[i + 2];
const clamp01 = (v) => Math.min(1, Math.max(0, v));

/**
 * Bounding box of the bright object on a dark background, inside `region` (fractions of the
 * image). Rows and columns need a few bright pixels to count, so stray noise is ignored.
 */
function findObject(img, { region = [0, 0, 1, 1], threshold = 40 } = {}) {
  const [fx, fy, fw, fh] = region;
  const x0 = Math.floor(fx * img.w);
  const y0 = Math.floor(fy * img.h);
  const x1 = Math.ceil((fx + fw) * img.w);
  const y1 = Math.ceil((fy + fh) * img.h);
  const cols = new Uint32Array(img.w);
  const rows = new Uint32Array(img.h);
  for (let y = y0; y < y1; y++) {
    for (let x = x0; x < x1; x++) {
      if (luma(img.data, (y * img.w + x) * 4) > threshold) {
        cols[x]++;
        rows[y]++;
      }
    }
  }
  const min = Math.max(3, 0.01 * Math.min(x1 - x0, y1 - y0));
  const first = (a, lo, hi) => { for (let i = lo; i < hi; i++) if (a[i] >= min) return i; return -1; };
  const last = (a, lo, hi) => { for (let i = hi - 1; i >= lo; i--) if (a[i] >= min) return i; return -1; };
  const left = first(cols, x0, x1);
  const right = last(cols, x0, x1);
  const top = first(rows, y0, y1);
  const bottom = last(rows, y0, y1);
  if (left < 0 || top < 0) throw new Error('No object found above the threshold');
  return { cx: (left + right + 1) / 2, cy: (top + bottom + 1) / 2, rx: (right - left + 1) / 2, ry: (bottom - top + 1) / 2 };
}

/** Adds the bilinear sample at (x, y) (pixel centres at i + 0.5) to acc; outside the image is black. */
function addSample(img, x, y, acc) {
  if (x < 0 || y < 0 || x >= img.w || y >= img.h) return;
  const fx = Math.min(Math.max(x - 0.5, 0), img.w - 1);
  const fy = Math.min(Math.max(y - 0.5, 0), img.h - 1);
  const ix = Math.floor(fx);
  const iy = Math.floor(fy);
  const ax = fx - ix;
  const ay = fy - iy;
  const ix1 = Math.min(ix + 1, img.w - 1);
  const iy1 = Math.min(iy + 1, img.h - 1);
  const d = img.data;
  const i00 = (iy * img.w + ix) * 4;
  const i10 = (iy * img.w + ix1) * 4;
  const i01 = (iy1 * img.w + ix) * 4;
  const i11 = (iy1 * img.w + ix1) * 4;
  for (let c = 0; c < 3; c++) {
    acc[c] += (d[i00 + c] * (1 - ax) + d[i10 + c] * ax) * (1 - ay) + (d[i01 + c] * (1 - ax) + d[i11 + c] * ax) * ay;
  }
}

/** Square crop centred on (cx, cy) with half-width `half`, area-averaged down to size × size. */
function cropSquare(img, cx, cy, half, size) {
  const out = { w: size, h: size, data: new Uint8ClampedArray(size * size * 4) };
  const step = (2 * half) / size;
  const n = Math.max(1, Math.ceil(step));
  const acc = new Float64Array(3);
  for (let j = 0; j < size; j++) {
    for (let i = 0; i < size; i++) {
      acc.fill(0);
      for (let b = 0; b < n; b++) {
        for (let a = 0; a < n; a++) {
          addSample(img, cx - half + (i + (a + 0.5) / n) * step, cy - half + (j + (b + 0.5) / n) * step, acc);
        }
      }
      const o = (j * size + i) * 4;
      out.data[o] = acc[0] / (n * n);
      out.data[o + 1] = acc[1] / (n * n);
      out.data[o + 2] = acc[2] / (n * n);
      out.data[o + 3] = 255;
    }
  }
  return out;
}

/**
 * Turns black space into transparency: opacity rises with brightness between `lo` and `hi`,
 * colour is un-premultiplied so the image composited over black is unchanged. `solid(x, y)`
 * marks pixels that stay opaque (a planet's or the Sun's disc); `fade(x, y)` scales opacity.
 */
function keyOutBlack(img, { lo, hi, solid = () => false, fade = () => 1 }) {
  const d = img.data;
  for (let y = 0; y < img.h; y++) {
    for (let x = 0; x < img.w; x++) {
      const i = (y * img.w + x) * 4;
      const a = solid(x + 0.5, y + 0.5) ? 1 : clamp01((luma(d, i) - lo) / (hi - lo)) * clamp01(fade(x + 0.5, y + 0.5));
      for (let c = 0; c < 3; c++) d[i + c] = a > 0 ? Math.min(255, d[i + c] / a) : 0;
      d[i + 3] = Math.round(a * 255);
    }
  }
  return img;
}

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

// --- Photographs --------------------------------------------------------------------------------

async function libraryMetadata(id) {
  const json = await get(`${NASA_IMAGES_API}?nasa_id=${id}`, { as: 'json' });
  const data = json.collection?.items?.[0]?.data?.[0];
  if (!data) throw new Error(`${id} not found in the NASA Image and Video Library`);
  return { title: data.title, credit: data.secondary_creator || data.photographer || data.center, date: data.date_created?.slice(0, 10) };
}

async function buildPhoto({ body, id, mission, size, region, rings }) {
  const meta = await libraryMetadata(id);
  const source = `${NASA_ASSETS}/${id}/${id}~orig.jpg`;
  const img = decode(await get(source));
  const found = findObject(img, { region, threshold: rings ? 24 : 40 });
  const entry = {
    subject: body[0].toUpperCase() + body.slice(1),
    mission,
    title: `${id}: ${meta.title}`,
    credit: meta.credit,
    source,
    page: `https://images.nasa.gov/details/${id}`,
    // The library's date_created is when NASA published the image, often years after the photo
    // (Mariner 10 imaged Venus in 1974; PIA23791 was published in 2020).
    published: meta.date,
    retrievedAt,
  };

  if (rings) {
    // The rings' long axis is not foreshortened, so its half-width is the A ring's outer radius.
    const half = found.rx * 1.03;
    const out = cropSquare(img, found.cx, found.cy, half, size);
    const globe = (found.rx / SATURN_RING_TO_GLOBE / half) * (size / 2);
    keyOutBlack(out, { lo: 6, hi: 48, solid: (x, y) => Math.hypot(x - size / 2, y - size / 2) < globe * 0.85 });
    const file = `${body}.png`;
    const bytes = encodePng(out);
    await writeFile(new URL(file, OUT), bytes);
    console.log(`  ${file}: ${size}×${size}, ${(bytes.length / 1024).toFixed(0)} KB`);
    const globeFraction = Number((globe / (size / 2)).toFixed(4));
    return {
      [file]: {
        ...entry,
        processing: [
          `Square crop around the rings (A ring outer edge = ${SATURN_RING_TO_GLOBE.toFixed(3)} × equatorial radius), resized to ${size} px`,
          'Black space made transparent; the planet\'s disc stays opaque',
        ],
        globeFraction,
      },
    };
  }

  const half = Math.max(found.rx, found.ry);
  const out = cropSquare(img, found.cx, found.cy, half, size);
  const file = `${body}.jpg`;
  const bytes = encodeJpeg(out, 88);
  await writeFile(new URL(file, OUT), bytes);
  console.log(`  ${file}: ${size}×${size}, ${(bytes.length / 1024).toFixed(0)} KB`);
  return {
    [file]: {
      ...entry,
      processing: [`Square crop to the planet's disc${region ? ' (left panel)' : ''}, resized to ${size} px`],
    },
  };
}

async function buildEarth() {
  const [y, m, d] = EARTH.date.split('-');
  const list = await get(`https://epic.gsfc.nasa.gov/api/natural/date/${EARTH.date}`, { as: 'json' });
  const meta = list.find((x) => x.image === EARTH.image);
  if (!meta) throw new Error(`EPIC image ${EARTH.image} not listed for ${EARTH.date}`);
  const source = `https://epic.gsfc.nasa.gov/archive/natural/${y}/${m}/${d}/png/${EARTH.image}.png`;
  const img = decode(await get(source));
  const found = findObject(img, { threshold: 30 });
  const out = cropSquare(img, found.cx, found.cy, Math.max(found.rx, found.ry), EARTH.size);
  const file = 'earth.jpg';
  const bytes = encodeJpeg(out, 86);
  await writeFile(new URL(file, OUT), bytes);
  console.log(`  ${file}: ${EARTH.size}×${EARTH.size}, ${(bytes.length / 1024).toFixed(0)} KB`);
  return {
    [file]: {
      subject: 'Earth',
      mission: 'DSCOVR EPIC (Earth Polychromatic Imaging Camera), from 1.5 million km',
      credit: 'NASA EPIC Team',
      source,
      page: 'https://epic.gsfc.nasa.gov/',
      taken: `${meta.date} UTC`,
      centroid: meta.centroid_coordinates,
      processing: [`Square crop to the disc, resized to ${EARTH.size} px`],
      retrievedAt,
    },
  };
}

async function buildSun() {
  const [y, m, d] = [SUN.stamp.slice(0, 4), SUN.stamp.slice(4, 6), SUN.stamp.slice(6, 8)];
  const source = `https://sdo.gsfc.nasa.gov/assets/img/browse/${y}/${m}/${d}/${SUN.stamp}_1024_${SUN.channel}.jpg`;
  const img = decode(await get(source));
  // SDO browse images are centred on the Sun. The limb is where the mean brightness of thin rings
  // around the centre falls fastest.
  const c = img.w / 2;
  const profile = [];
  for (let r = 0; r < img.w / 2; r++) {
    let sum = 0;
    let n = 0;
    for (let k = 0; k < 360; k++) {
      const x = Math.round(c + r * Math.cos(k * DEG));
      const yy = Math.round(c + r * Math.sin(k * DEG));
      sum += luma(img.data, (yy * img.w + x) * 4);
      n++;
    }
    profile.push(sum / n);
  }
  let limb = 0;
  let steepest = 0;
  for (let r = Math.floor(img.w * 0.3); r < img.w * 0.48; r++) {
    const drop = profile[r - 2] - profile[r + 2];
    if (drop > steepest) {
      steepest = drop;
      limb = r;
    }
  }
  const half = limb * 1.25;
  const out = cropSquare(img, c, c, half, SUN.size);
  const disc = (limb / half) * (SUN.size / 2);
  const mid = SUN.size / 2;
  keyOutBlack(out, {
    lo: 4,
    hi: 110,
    solid: (x, yy) => Math.hypot(x - mid, yy - mid) < disc,
    // The corona fades out before the frame's corners (and the caption printed there).
    fade: (x, yy) => 1 - clamp01((Math.hypot(x - mid, yy - mid) / mid - 0.86) / 0.13),
  });
  const file = 'sun.png';
  const bytes = encodePng(out);
  await writeFile(new URL(file, OUT), bytes);
  console.log(`  ${file}: ${SUN.size}×${SUN.size}, ${(bytes.length / 1024).toFixed(0)} KB (limb at ${limb} px of ${img.w})`);
  return {
    [file]: {
      subject: 'The Sun in extreme ultraviolet (171 Å)',
      mission: 'Solar Dynamics Observatory, Atmospheric Imaging Assembly',
      credit: 'NASA/SDO and the AIA science team',
      source,
      page: 'https://sdo.gsfc.nasa.gov/',
      taken: `${y}-${m}-${d} ${SUN.stamp.slice(9, 11)}:${SUN.stamp.slice(11, 13)}:${SUN.stamp.slice(13, 15)} UT`,
      processing: [`Square crop of ${(2 * half).toFixed(0)} px around the Sun, resized to ${SUN.size} px`, 'Black space made transparent; the corona fades out at 0.86–0.99 of the half-width'],
      discFraction: Number((disc / mid).toFixed(4)),
      retrievedAt,
    },
  };
}

// --- Main ---------------------------------------------------------------------------------------

async function main() {
  const only = process.argv[2];
  await mkdir(OUT, { recursive: true });
  const manifestUrl = new URL('sources.json', OUT);
  let previous = {};
  try {
    previous = JSON.parse(await readFile(manifestUrl, 'utf8')).files ?? {};
  } catch {
    // First run.
  }
  const files = { ...previous };
  if (!only || only === 'sky') Object.assign(files, await buildSky());
  if (!only || only === 'photos') {
    console.log('Photographs...');
    Object.assign(files, await buildSun(), await buildEarth());
    for (const photo of PHOTOS) Object.assign(files, await buildPhoto(photo));
  }
  const manifest = {
    description: 'Real NASA imagery for the Solar System intro. Rebuild with: npm run data:intro',
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
