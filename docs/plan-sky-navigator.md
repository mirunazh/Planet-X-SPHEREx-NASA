# Sky Navigator: coordinate selection plan

**Version:** v0.1, draft for refinement. Written 2026-11-14 12:45 (Europe/Bucharest).
**Scope:** how users pick a sky position by navigating instead of typing coordinates.
**Constraint:** imagery and catalogues come from NASA sources only. Section 3.4 covers the edge cases.

---

## 1. Goal

Build a 3D globe of the sky in the style of Apple's Find My: you spin it, zoom it and fly into it. While you move, it continuously works out the exact ICRS coordinates under the centre of the view. When you lock, it hands a precise, reproducible target to the comparison view.

**In scope:** sky rendering, navigation, coordinate deduction, target lock, pins and overlays, search.

**Out of scope (separate plans):** image comparison, accounts, journal, reporting.

---

## 2. Experience

### 2.1 Two modes, one crossing

| Mode | Camera | What you see | Orientation |
|---|---|---|---|
| **Globe** (outside) | Orbits outside the unit sphere | The whole sky as an object, like the Find My globe | Mirror-reversed, as on a celestial globe: RA increases to the right |
| **Sky** (inside) | At the sphere centre. A perspective camera there gives a gnomonic (TAN) projection | The real sky, zoomable to arcseconds | True: north up, RA increases to the left |

**The crossing.** Zooming the globe past a threshold flies the camera through the sphere wall into Sky mode.
- The same sky point stays centred.
- The image flips from mirrored to true orientation during a transition of about 700 ms (crossfade plus a field-of-view ease).
- Zooming back out reverses it.
- With `prefers-reduced-motion`, it is an instant cut.

### 2.2 Interactions

- **Globe mode:**
  - Drag to rotate, with inertia.
  - Pinch or scroll to zoom.
  - Double-click a point to fly to it.
- **Sky mode:**
  - Grab-the-sky drag: the point under the cursor stays under the cursor.
  - Scroll or pinch changes the field of view around the cursor.
  - Double-click zooms 2× at that point.
- **Keyboard:** arrow keys pan, `+`/`−` zoom, `Enter` locks, `Esc` goes back.
- **Fly-to** (from pins, search and deep links): follows the van Wijk & Nuij (2003) smooth zoom-and-pan path: zoom out, travel, zoom in. It is adapted to use angular distance and field of view.
- **Pins** (the Find My analogy):
  - curated demo targets
  - SPHEREx deep fields
  - exoplanet host stars ("find my planet")
  - the user's saved notes (later)

  When zoomed out, pins cluster by HEALPix cell with a count badge. They split apart as you zoom in.
- **Bottom sheet** (Find My style) when a pin is selected: name, coordinates, what data exists there, and "Open in compare".

### 2.3 Coordinate HUD (the "deduction")

These are always visible:
- RA (hms) and Dec (dms) of the view centre in ICRS, plus galactic l and b, plus the field of view.
- **Precision is always shown, never implied.** The number of displayed digits follows the uncertainty, which is the larger of two values: the screen pixel scale and the active survey's pixel scale.
- A "native resolution reached" indicator appears once the survey's pixels are being magnified.
- A whole-sky Mollweide mini-map shows the current footprint, taken from the four screen-corner rays.

**Lock** is enabled once the field of view is at or below a threshold (proposed: 1°). It produces a `SkyTarget` (section 6). It can optionally snap to the nearest catalogue source within N arcsec. A snap is always shown, never silent.

---

## 3. NASA data sources

### 3.1 Imagery (HiPS)

All of these were checked on 2026-11-14 and are served with `Access-Control-Allow-Origin: *`.

| Layer | Mission | HiPS base URL (`https://irsa.ipac.caltech.edu/data/hips/…`) | Max order / pixel | Frame | Tiles | Role |
|---|---|---|---|---|---|---|
| SPHEREx DR1 all-sky cube | SPHEREx | `SPHEREx/spherex_allsky_cube` | 5 / 12.9″ | equatorial | PNG 512², 8-bit indexed, **102 frames** | Primary layer: wavelength slider, RGB composite |
| AllWISE colour; W1–W4 | WISE | `CDS/AllWISE/RGB-W4-W2-W1`, `CDS/AllWISE/W1`…`W4` | 8 / 1.6″ | equatorial | JPEG (FITS for single bands) | Deep-zoom context, mid-infrared |
| 2MASS colour; J, H, K | 2MASS (NASA/NSF) | `CDS/2MASS/Color`, `/J`, `/H`, `/K` | 9 / 0.8″ | equatorial | JPEG | Sharpest NASA near-infrared context |
| GALEX GR6 AIS colour; FUV; NUV | GALEX | `CDS/GALEX/GR6-03-2014/AIS-Color`, `AIS-FD`, `AIS-ND` | 8 | equatorial | PNG | Ultraviolet end of a "spectrum journey" (partial sky) |
| Spitzer GLIMPSE360; IRAC1–4 | Spitzer | `Spitzer/GLIMPSE360`, `CDS/SPITZER/IRAC1`…`4` | 9 / 0.8″ | equatorial (GLIMPSE360), galactic (IRAC) | JPEG | Galactic-plane detail (partial sky) |
| IRAS-IRIS colour | IRAS | `CDS/IRIS/color` | 3 | galactic | JPEG | Far-infrared whole-sky layer |

**SPHEREx cube details**, from its `properties` file (built 2026-11-01):
- **Frame index:** `f = 17·(band−1) + (channel−1)`, for `f` = 0…101. The wavelengths are listed in `data_cube_crval3_arr`, from 0.753 to 4.988 µm.
  - Frames 50 and 51 are blank (dichroic channels).
  - Example frames: f16 = 1.10 µm, f46 = 2.19 µm, f62 = 3.29 µm (PAH / methane), f90 = 4.60 µm.
- **Tile URL:** `{base}/Norder{k}/Dir{d}/Npix{n}_{f}.png`, where `d = floor(n/10000)·10000`.
  - `Npix{n}.png` (no suffix) also exists and looks like frame 0. Verify this.
- **Low-resolution whole sky:** `{base}/Norder3/Allsky.png` and `{base}/Norder3/Allsky_{f}.png`. Each is about 1.1–1.3 MB and contains all 768 order-3 tiles at reduced resolution. One request paints the whole globe.
- **PNG stretch:** asinh, cut 0–40 MJy/sr. Use it for display only, never for measurement. Science-grade FITS cube tiles exist at order 5, under the IBE path listed in the IRSA tutorials.
- **Time span:** MJD 60789.75–61174.49, which is 2025-04-24 to 2026-05-14.
- **Coverage map:** `{base}/Moc.fits` (sky fraction 1.0).
- **Credit:** NASA/SPHEREx. HiPS © Caltech/IPAC. DR1 All-Sky Cube DOI 10.26131/IRSA679.

**Rule:** the CDS-built mirrors at IRSA are marked `unclonable`, and IRSA's list asks that no HiPS be mirrored without the copyright owner's agreement. Load all tiles **directly from IRSA in the browser**. Do not re-host or proxy them; browser caching only.

### 3.2 Optional optical "what your eyes see" layer: NASA SVS Deep Star Maps 2020

- **Source:** https://svs.gsfc.nasa.gov/4851
- **Format:** equirectangular, ICRF/J2000, centred on RA 0h, with RA increasing to the left. OpenEXR, half-float, linear colour. Sizes run from 4k (36 MB) to 64k (3.8 GB).
- **Companion overlays (raster TIFF):** constellation figures, constellation boundaries, a celestial grid (16k and up), a Milky Way-only layer and a bright-stars-only layer.
- **Not CORS-enabled for our origin.** Preprocess it at build time (tone-map EXR to sRGB, then WebP/KTX2 or our own tiles) and self-host the derivative with full credit.
- **Credit:** NASA/Goddard Space Flight Center Scientific Visualization Studio. Gaia DR2: ESA/Gaia/DPAC. Constellation figures: A. MacRobert, R. Sinnott, R. Fienberg (Sky & Telescope).
- **Caveat:** NASA made this product, but from ESA Hipparcos/Gaia DR2, Yale BSC and USNO UCAC3 catalogues (open question 1).
- **Purpose:** a storytelling morph from "the sky your eyes see" to "the sky SPHEREx sees".

### 3.3 Catalogues and services

| Need | Source | Access | Notes |
|---|---|---|---|
| Exoplanet host-star pins | NASA Exoplanet Archive (NExScI/IPAC) | TAP `https://exoplanetarchive.ipac.caltech.edu/TAP`, table `pscomppars`. Precompute to JSON at build time | Verify the endpoint and columns |
| Bright-star labels and points | Yale BSC5P, hosted at NASA HEASARC | TAP `https://heasarc.gsfc.nasa.gov/xamin/vo/tap/`, table `bsc5p` (verify). Precompute | The page says "solely for the purposes of scientific research" and that Yale may hold copyright. Check before public release |
| Name search (galaxies, extragalactic) | NED (NASA/IPAC) | `https://ned.ipac.caltech.edu/srs/ObjectLookup`, returns JSON | Automated access is best-effort, and the page flags the legacy API as deprecated. Call it server-side only, cached |
| Instant local search | Built from the sources above plus curated targets | MiniSearch in the browser | Offline, NASA-only, no network round-trip |
| Cutouts in any projection (fallback) | NASA SkyView (HEASARC) | `https://skyview.gsfc.nasa.gov/cgi-bin/images?Survey=…&position=…&Return=…` | The survey list page returned 404; verify survey names |
| Science cutouts at lock | IRSA SPHEREx cutouts | TAP `spherex.artifact` ⋈ `spherex.plane`, then `{uri}?center=RA,Decd&size=deg` | See [image-sources-and-pipeline.md](image-sources-and-pipeline.md) |
| Hero / social image | JPL PIA26600, "SPHEREx's First All-Sky Map" | https://www.jpl.nasa.gov/images/pia26600-spherexs-first-all-sky-map/ | Not a sphere texture. Credit NASA/JPL-Caltech |

### 3.4 Excluded under the NASA-only rule

- Some HiPS appear in IRSA's list but are not NASA data: Planck and Herschel (ESA), DENIS, SDSS, MSX (US DoD) and DSS (STScI digitised photographic plates).
- IAU constellation boundaries as vectors (from CDS) are not NASA data either. Without them we can draw constellation lines (SVS raster), but we cannot say "you are in Orion" (open question 4).

---

## 4. Coordinate system and maths

- **Frame:** ICRS, which equals J2000 to within tens of milliarcseconds (negligible here). Store coordinates in degrees as float64.
- **Scene mapping:** three.js is Y-up and right-handed. Equatorial unit vectors use x toward RA 0°/Dec 0°, y toward RA 90°, and z toward the north celestial pole. Map them to three.js as `(x, y, z)₃ = (x_eq, z_eq, −y_eq)`, a proper rotation.
  - Seen from the centre, this gives north up with RA increasing to the left (the true sky).
  - Seen from outside, RA increases to the right (the mirror image).
  - This was checked algebraically; confirm it in the spike.
- **Deduction:**
  - **Sky mode:** take the camera's forward vector. RA = `atan2(y, x) mod 360°`, Dec = `asin(z)`.
  - **Globe mode:** cast a ray from the screen centre, find where it hits the unit sphere, then apply the same conversion.
  - **Footprint:** the four screen-corner rays.
- **Galactic coordinates:** a fixed ICRS→galactic rotation matrix (Hipparcos definition). Test fixtures:
  - the galactic centre, RA 266.40499°, Dec −28.93617°, must map to (l, b) = (0, 0)
  - the north galactic pole, RA 192.85948°, Dec +27.12825°, must map to b = +90°
- **Reference lines:** the ecliptic uses obliquity ε₀ = 84381.406″ (IAU 2006). The galactic plane and celestial equator are drawn with the same rotations.
- **HEALPix:** NESTED scheme, via `@hscmap/healpix` (MIT, supports order ≤ 15).
  - Tile order for a view: `k = clamp(ceil(log2(58.63° / (512·s))), 3, k_max)`, where `s` is the screen pixel scale in degrees.
  - Orders 3 and below use the Allsky image.
- **Resolution ladder** (for a viewport 1000 px tall):
  - SPHEREx tiles are native down to a field of view of about 3.6°.
  - AllWISE is native down to about 0.45°.
  - 2MASS is native down to about 0.22°.
  - Below that, pixels are magnified: show the indicator and offer lock. The compare view then fetches native 6.15″ SPHEREx cutouts.
- **Precision:** `uncertainty = max(s_screen, s_survey)`. The formatter picks digits so that the last digit is about the size of the uncertainty.
- **Fly-to:** the van Wijk & Nuij (2003) optimal path in angular distance and field of view, with ρ ≈ √2. The view centre moves along a great-circle slerp.
- **Highest-risk detail: HiPS tile pixel orientation.** Each tile maps onto its HEALPix cell with a specific corner and axis convention (IVOA HiPS 1.0). Verify it in the spike by overlaying known bright stars on the tiles.

---

## 5. Technical architecture (Next.js)

### Stack

Versions are as published on npm on 2026-11-14:

| Package | Version | Licence |
|---|---|---|
| Next.js | 16.4.6 | MIT |
| React | 19.3.1 | MIT |
| `@react-three/fiber` | 9.8.2 (peer requirements: React ≥19 <19.4, three ≥0.156) | MIT |
| `@react-three/drei` | 10.7.9 | MIT |
| `three` | 0.187.0 | MIT |
| `@hscmap/healpix` | 1.4.12 | MIT |

Also: `zustand` (state), `d3-interpolate` (zoom path) and `minisearch` (search). Confirm their versions when scaffolding.

### App Router layout

```
app/
  explore/page.tsx            server shell: metadata, credits panel
  api/resolve/route.ts        NED lookup proxy: validation, timeout, cache, rate limit
components/
  sky/SkyExplorer.tsx         client component, loaded with dynamic(..., { ssr: false })
  sky/SkySphere.tsx           tile meshes, one ShaderMaterial (mono or RGB composite, stretch uniforms)
  sky/TileManager.ts          visible-tile set, priority queue, LRU texture cache, parent-tile fallback, ≤6 concurrent fetches
  sky/Overlays.tsx            grid, ecliptic, galactic plane, pins with HEALPix clustering, labels
  sky/Controls.ts             globe orbit, sky drag, zoom about cursor, keyboard
  sky/Transition.ts           Globe↔Sky crossing choreography
  hud/                        coordinate readout, precision, mini-map, bottom sheet, lock button (accessible DOM)
lib/sky/                      pure, unit-tested: coords, galactic, format, healpix, hips (URL builders, properties parser), flyTo, precision
scripts/                      build-time data jobs → public/data/*.json, each with provenance (source URL, query, retrieved-at)
```

### State, data flow and rendering

- **State:** one zustand store, `{ mode, center, fov, roll, layer, frames, pins, lockedTarget }`. It is synced to the URL (`?ra=&dec=&fov=&layer=&f=`) with throttling, so every view is a shareable deep link.
- **Data flow:**
  - Browser to IRSA for HiPS tiles: direct, no proxy, no mirroring.
  - Static JSON served from `public/data`.
  - NED only through our route handler.
- **Rendering:** sky tiles use `depthWrite: false`, with render order set by layer. Textures are mipmapped and disposed when evicted. Wavelength switching swaps frame textures, which are cached per frame.

---

## 6. Output contract: `SkyTarget`

```ts
export interface SkyTarget {
  ra: number;                 // ICRS, degrees, [0, 360)
  dec: number;                // ICRS, degrees, [-90, 90]
  frame: 'ICRS';
  galactic: { l: number; b: number };          // degrees
  fovDeg: number;             // field of view at lock
  uncertaintyArcsec: number;  // max(screen pixel scale, survey pixel scale)
  healpix: { order: 14; ipix: number; scheme: 'NESTED' }; // order 14 = SPHEREx HiPS pixel (12.9″)
  layer: { hipsUrl: string; frames?: number[] };          // what the user was looking at
  origin: 'navigation' | 'pin' | 'search' | 'deeplink';
  snappedTo?: { catalog: string; id: string; separationArcsec: number };
  lockedAt: string;           // ISO 8601, UTC
}
```

---

## 7. Non-functional requirements

- **Performance:**
  - 60 fps on a mid-range laptop.
  - At most about 150 live tile textures and at most 6 concurrent tile requests.
  - First globe paint under 2 s on broadband (one Allsky PNG is about 1.1 MB per frame).
  - The 3D bundle is lazy-loaded.
- **Accessibility:**
  - Full keyboard navigation.
  - The HUD is announced through `aria-live` when the view settles, not on every frame.
  - `prefers-reduced-motion` is honoured.
  - Text meets AA contrast.
- **Errors and logging:**
  - A failed tile retries with backoff, then falls back to its parent tile.
  - A visible "data unavailable" state.
  - An error boundary around the canvas.
  - Route handlers log with request IDs and enforce timeouts. No personal data in logs.
- **Security:**
  - All route inputs are validated and length-limited.
  - The NED proxy is rate-limited.
  - The CSP allows images only from IRSA and our own origin.
  - No secrets in the client (none are needed).
- **Privacy (GDPR):** this module has no accounts. If "sky above me" is added later, geolocation stays in the browser and is never sent.
- **Credits:** an always-available credits panel lists every active layer's acknowledgement and DOI.
- **Deployment:**
  - Production: Next.js `output: 'standalone'` in a Docker image.
  - Hackathon demo: Vercel is acceptable if it's faster.

---

## 8. Testing

- **Unit (Vitest):**
  - coordinate conversions with fixtures (galactic centre, north galactic pole, M31 position from NED)
  - sexagesimal formatting and precision rules
  - HEALPix tile selection
  - HiPS URL builders
  - fly-to path endpoints
- **Alignment:** draw catalogue bright stars over SPHEREx and 2MASS tiles at several positions. The error must stay under one survey pixel.
- **Interaction (Playwright smoke test):** load, rotate, zoom, cross into Sky mode, lock. Assert that a `SkyTarget` is produced and the URL updates.
- **Performance:** track fps and live tile count while zooming from the globe down to a 0.2° field of view.

---

## 9. Build plan (hackathon, time-boxed)

| Phase | Outcome | Dev | Test |
|---|---|---|---|
| 0. Scaffold + spike | Next.js app and R3F canvas. One SPHEREx Allsky frame on a sphere in Globe mode. A star overlay confirms the orientation | 2.5 h | 0.5 h |
| 1. Coordinate core | `lib/sky` maths, plus the HUD readout with precision | 2 h | 1 h |
| 2. Sky mode + tiles | Camera inside, grab-the-sky drag, field-of-view zoom, TileManager for orders 3–5 | 4–5 h | 1 h |
| 3. Crossing + fly-to + URL | Globe↔Sky transition, van Wijk–Nuij flights, deep links | 3 h | 0.5 h |
| 4. Layers + pins | Wavelength slider and RGB composite, 2MASS/AllWISE for deep zoom, exoplanet hosts, curated targets, clustering | 3 h | 0.5 h |
| 5. Lock + search | `SkyTarget` hand-off, local search, NED route | 2–3 h | 0.5 h |
| 6. Polish | Accessibility, reduced motion, credits panel, performance pass | 2 h | 0.5 h |
| Deploy | Docker image or Vercel, plus a recorded backup demo video | — | 1 h deploy |

**Totals:** about 19–21 h of development, about 4.5 h of testing and about 1 h of deployment.

**Assumptions:**
- 2–3 developers, working in parallel once Phase 1 is done (the maths library and the rendering can be split).
- At least one person is comfortable with three.js.
- IRSA stays reachable during the event.

**Critical path:** Phase 0 spike, then the Phase 2 tile manager. If the spike hasn't worked by about 16:00 on Saturday, fall back: embed Aladin Lite v3 (LGPL-3.0-or-later) for Sky mode, and keep the custom globe only for the intro.

---

## 10. Risks

| Risk | Impact | Mitigation |
|---|---|---|
| HiPS tile orientation or seams are wrong | Sky misplaced, so the coordinates are wrong | Spike first; star-overlay test; follow IVOA HiPS 1.0 pixel ordering |
| The crossing transition feels janky | Weak signature moment | Time-box it; fall back to a crossfade |
| GPU memory or too many tiles | Stutter | LRU cache, order cap, parent-tile fallback |
| IRSA is slow or down at the venue | Blank tiles | Browser cache; recorded backup demo video |
| The network intercepts TLS (seen today on several hosts) | Some services blocked | Test the venue network early. IRSA, SVS, NED and HEASARC worked from this machine |
| BSC licence ("solely for scientific research") | Public-use question | Use exoplanet hosts and SVS raster layers for labels, or confirm the terms |
| NED legacy API deprecation | Search breaks | Keep NED behind our route; switch to the new NED API |
| "NASA-only" is ambiguous (the SVS map uses ESA data) | Rule conflict | Decide explicitly (open question 1) |

---

## 11. Open questions

1. Does the SVS star map (made by NASA from ESA-derived catalogues) count as NASA data for the optical "eye view" layer?
2. What field of view should lock at, 1°? And what default cutout size should the compare view use?
3. Which three SPHEREx frames make the opening RGB globe? Starting proposal: f16 / f46 / f90 (1.10 / 2.19 / 4.60 µm), to be tuned by eye.
4. Constellation names need non-NASA IAU boundary data. Include them or skip them?
5. Is "sky above me" (geolocation) in scope?
6. Which curated targets go on the demo path?
7. Team: how many developers, and who owns rendering versus the coordinate core?

---

## 12. References

- IRSA HiPS list: https://irsa.ipac.caltech.edu/data/hips/list
- SPHEREx HiPS properties: https://irsa.ipac.caltech.edu/data/hips/SPHEREx/spherex_allsky_cube/properties
- NASA SVS Deep Star Maps 2020: https://svs.gsfc.nasa.gov/4851
- NED ObjectLookup: https://ned.ipac.caltech.edu/Documents/Guides/Interface/ObjectLookup
- HEASARC VO / TAP: https://heasarc.gsfc.nasa.gov/docs/archive/vo/
- BSC5P: https://heasarc.gsfc.nasa.gov/W3Browse/star-catalog/bsc5p.html
- SkyView batch interface: https://skyview.gsfc.nasa.gov/current/docs/batchpage.html
- JPL PIA26600: https://www.jpl.nasa.gov/images/pia26600-spherexs-first-all-sky-map/
- `@hscmap/healpix`: https://www.npmjs.com/package/@hscmap/healpix
- Aladin Lite: https://github.com/cds-astro/aladin-lite
- van Wijk, J. J. & Nuij, W. A. A. (2003). "Smooth and efficient zooming and panning." IEEE InfoVis.
- IVOA HiPS 1.0 Recommendation (Fernique et al., 2017).
