# Architecture

How the SPHEREx time viewer fits together: where the data comes from, what each component reads and writes, the file formats, the public API of the two finished TypeScript libraries, and why each major choice was made.

Status key used below: **done** (built and checked), **in progress** (being built while this document was written), **planned** (in the plan, not started). Commands marked "ran today" were run on 14 November 2026 by the author of this document; others are quoted from package scripts and not rerun.

Terms, defined once:

- **Exposure**: one SPHEREx photograph, about 113 seconds long, in one of six detectors (D1 to D6). Each detector sees a different range of infrared wavelengths, and the wavelength also changes across the detector.
- **Pass** (in the code and the files; "visit" in some UI text): a run of exposures of the same field with no gap longer than 20 days.
- **Stack**: the weighted average of the exposures of one pass, reprojected onto one common grid. Stacking raises the signal-to-noise ratio (S/N), the strength of a source against the noise.
- **Proper motion**: how far a star moves across the sky per year, in arcseconds per year. **Parallax**: the yearly wobble of a nearby star's position caused by Earth's orbit; distance in parsecs is 1 divided by the parallax in arcseconds.
- **FITS**: the standard astronomy image file format. **WCS**: the header keywords that map pixel positions to sky positions (here TAN-SIP: a flat-sky projection plus a polynomial correction).
- **HTTP Range request**: ask a web server for only some bytes of a file.

## 1. Data flow

```
                       PUBLIC SERVICES (no keys)
  +-----------------------------+   +---------------------------------+   +------------------+
  | IRSA TAP / SIA              |   | AWS S3 bucket nasa-irsa-spherex |   | SIMBAD (Harvard  |
  | "which exposures cover      |   | the FITS files, read with HTTP  |   | mirror of CDS)   |
  |  this RA/Dec?"              |   | Range requests, CORS open       |   | fast-mover       |
  | NO CORS: browser cannot     |   | (pixels)                        |   | catalogue        |
  |  call it                    |   |                                 |   |                  |
  +--------------+--------------+   +----------------+----------------+   +---------+--------+
                 |                                   |                              |
      exposure lists (uri, MJD,            3 requests per exposure:                 |
      detector, collection)                headers, pixel rows, wavelength          |
                 |                                   |                              |
                 v                                   v                              v
  +------------------------------------------------------------------+   +--------------------+
  | pipeline/  (Python, run with uv, offline build step)             |   | pipeline/movers/   |
  |   s3reader.py   TAP lists + S3 range reader (cached on disk)     |   |  build_movers.py   |
  |   science.py    astrometry, grid, reprojection, stacking,        |   +---------+----------+
  |                 centroid, S/N, display stretch                   |             |
  |   build_missions.py   5 targets -> assets/missions/             |             |
  |   check_missions.py   269 assertions                             |             |
  |   index/  (in progress, not yet in repo) ~1.63 M footprints      |             |
  +--------------------------------+---------------------------------+             |
                                   |                                               |
                                   v                                               v
  +------------------------------------------------------------------------------------------+
  | assets/   STATIC FILES, committed to the repository (26 MB)                              |
  |   missions/index.json                  mission-index/1                                   |
  |   missions/<id>/manifest.json          mission-manifest/1                                |
  |   missions/<id>/stacks/<group>_p<k>.f32 + .png     one stacked frame per pass            |
  |   missions/<id>/exposures/<exposure>.f32           one frame per exposure                |
  |   missions/<id>/contact.png            contact sheet for human review                    |
  |   movers.json, movers-pm500.json       movers/1, 23,073 and 5,282 objects               |
  |   index/ (in progress, not yet in repo) spherex-index/1 static exposure index            |
  +--------+----------------------------------+------------------------------+---------------+
           |                                  |                              |
           | copied by web/scripts/           | read as test fixtures        | read by scenes
           | sync-assets.mjs                  | and golden references        | (video/scenes)
           v                                  v                              v
  +--------------------+    +--------------------------------------+   +--------------------+
  | web/  (Next.js)    |    | packages/  (TypeScript, no UI)       |   | video/             |
  |  / landing         |<---|  spherex-core    live path in the    |   |  Playwright +      |
  |  /watch  movie     |    |                  browser (done)      |   |  ffmpeg render     |
  |  URL = view state  |    |  missions-core   measuring logic     |   |  (harness done)    |
  |  static assets now;|    |                  (done, wiring in    |   +--------------------+
  |  libraries being   |    |                  progress)           |
  |  wired in          |    |  spherex-index   static index reader |
  |  (in progress)     |    |                  (in progress)       |
  +--------------------+    +--------------------------------------+
```

Two paths feed the viewer.

1. **Static path (done, wired).** `pipeline/` builds files once; `web/` serves them. The five target missions start from one click because nothing is computed at view time.
2. **Live path (libraries done; wiring into `web/` in progress, not yet in the repository: local branch `wip/live-path`, where any typed coordinate plays live).** For any other coordinate: list the covering exposures (static index, or the IRSA search through a server route), read a small pixel box from each exposure in S3 directly from the browser, and build the same `mission-manifest/1` shape in memory with `spherex-core`. The viewer does not need to know which path produced the frames.

Wiring status at the time of writing: when this document was started, nothing in `web/src` imported the packages. By 19:14 a worker had added `spherex-core` and `missions-core` as `file:../packages/...` dependencies in `web/package.json`, a `web/src/app/wiring-check/` page, an `api/wiring-check` route and a smoke test (`web/src/lib/packages.smoke.test.ts`), and changed `web/next.config.ts` so Next can compile the linked TypeScript source. None of that was reviewed or rerun here, and no UI feature uses the libraries yet as far as the source shows. Finishing the integration is task L1.1 and L2.1 in `docs/ECHIPA-START-AICI.md`.

## 2. Components

### 2.1 `pipeline/` (Python, done)

| | |
|---|---|
| Inputs | IRSA TAP exposure lists; S3 FITS files via Range requests; hard-coded target table (`TARGETS` in `pipeline/build_missions.py`) with coordinates, proper motion and parallax from Gaia DR3 via SIMBAD |
| Outputs | everything under `assets/missions/` |
| Run | `uv run --with astropy --with numpy --with scipy --with reproject --with matplotlib --with pillow python -I -B pipeline/build_missions.py --data <cache dir>` (from `pipeline/README.md`, not rerun) |
| Check | `uv run --with numpy --with pillow python -I pipeline/check_missions.py`: ran today, 269 checks passed, 0 failed |

Method per exposure: read only the detector rows that cover the 6 arcminute grid plus 2 pixels; subtract a 3-sigma-clipped median as background; reproject (bilinear) onto the fixed north-up grid. FLAGS are not read and ZODI (zodiacal light) is not subtracted. Passes split at gaps over 20 days, and passes with fewer than 3 exposures are dropped and listed in the manifest (`droppedPasses`). Stacks are inverse-variance weighted means with per-pixel 4-sigma clipping when a pass has 5 or more exposures. S/N is measured in a 9 arcsecond aperture against 300 random empty apertures; when S/N is 5 or more, a flux-weighted centroid (12 arcsecond radius) is reported with a bootstrap error from 100 resamples.

Safety limits built in: 8 concurrent S3 requests, TAP queries one at a time, a 480 MB download stop per run, resumable cache.

### 2.2 `pipeline/movers/` (Python, done)

Builds `assets/movers.json` (23,073 objects from SIMBAD with total proper motion of at least 300 mas/yr, 1.4 MB, 554 KB gzipped) and `assets/movers-pm500.json` (5,282 objects, 326 KB). Columns: `name, ra, dec, pmRaCosDec, pmDec, plx, otype, spType`; epoch 2000.0, ICRS. The web app loads the small file to answer "was a fast mover at the typed coordinate in 2010?". See `pipeline/movers/NOTES.md`.

### 2.3 `packages/spherex-core` (TypeScript, done)

The browser port of the pipeline: FITS header parser, TAN-SIP WCS, wavelength table, S3 range reader, reprojection, stacking, astrometry, SIA parsing, and `buildLiveMission`. ES modules, strict TypeScript, no runtime dependencies. Checked against astropy with golden fixtures. Details in section 5.

### 2.4 `packages/missions-core` (TypeScript, done; wiring in progress, not yet in the repository: local branch `wip/missions`, the measuring missions at `/mission/[id]` and `/report`)

Pure logic for the guided measuring missions. It covers grid maths, centroid refinement at a click, motion between two epochs, the parallax fit, scoring against the pipeline value and the literature value, a shareable report encoded in a link, mission scripts and a glossary. It has no dependencies. Section 5.

### 2.5 `packages/spherex-index` (TypeScript, in progress, not yet in the repository)

Reader for a static index of every public SPHEREx Level 2 image, so "which images cover this position" needs no archive call. The goal (from the plan) is an index of all about 1.63 million images. It should fit in static files of at most 50 MB in total, at most 1,000 files and at most 10 requests per query, built by a resumable, incremental Python builder (`pipeline/index/`) and checked equal to the archive at 30 positions and for the five targets. Today: `queryIndex`, `exposuresAt`, `coverageSummary` and the polygon geometry exist and 7 geometry tests pass (ran today); the builder, `assets/index/` and the format README are not finished.

### 2.6 `web/` (Next.js 16, React 19, zustand, Astryx design system; done for static missions, being restyled)

| | |
|---|---|
| Inputs | `public/data/` (a copy of `assets/missions/` and `assets/movers-pm500.json`, made by `npm run sync-assets` before dev, build and test) |
| Routes | `/` landing (pitch, coordinate box, five target cards); `/watch` the movie |
| State | all in the URL, see section 4 |
| Commands (from `web/package.json`, not rerun) | `npm run dev` (port 3100), `npm run build`, `npm start`, `npm test`, `npm run typecheck`, `npm run sync-assets` |

Source layout: `src/app/` (routes, layout, providers), `src/components/` (`MissionView`, `SkyCanvas`, `TimeAxis`, `CoordForm`, `TargetCards`, `MoverBanner`, `WatchPage`, `TopBar`, `Footer`), `src/lib/` (`data.ts` typed loader for the manifests and frames; `viewState.ts` URL state and store; `sky.ts` coordinate parsing and projection; `movers.ts` the "what was here" search; `resolve.ts` typed position to mission; `strings.ts` all user-visible text), `src/theme/` (design tokens and the custom Astryx theme). A worker was restyling this folder while this document was written, so component details may have changed.

### 2.7 `video/` (Node, Playwright, ffmpeg; harness done, film not done)

Renders the 30 second demo video from HTML scenes, frame by frame. `shots.mjs` is the shot list (durations, captions of at most 8 words), `render.mjs` draws scenes with Playwright and joins them with ffmpeg at 1080p and 60 fps, `capture.mjs` captures a live page frame-exactly using a virtual clock, `audio.mjs` synthesises the soundtrack and normalises loudness, `test.mjs` checks resolution, length, loudness and determinism. The scenes that do not need the app (1930 plates, "Age 24", the transition to a real SPHEREx frame, the end card) exist; the app scenes (s3 to s8) are placeholders until the design is final. The harness worker's last run of `node test.mjs` on 14 November 2026 passed (three clips H.264 1920x1080 at 60 fps; determinism 10 of 10 sampled frames identical for each of three checks; 130 sampled frames, 549 text checks, 0 failures; loudness -16.0 LUFS); not rerun by this document. Music and voice slots are wired but empty. The plan behind this is note 14, section B4 (the fallback pipeline with no new tool).

## 3. File formats

### 3.1 `mission-manifest/1` (one `manifest.json` per target)

Top-level keys (read from `assets/missions/epsindb/manifest.json`):

| key | content |
|---|---|
| `schema` | `"mission-manifest/1"` |
| `id`, `name`, `kind`, `summary` | `kind` is `"mover"` (moves across the sky) or `"variable"` (changes brightness) |
| `astrometry` | `ra`, `dec`, `epoch` (2000.0), `pmRaCosDecMasYr`, `pmDecMasYr`, `parallaxMas`, `radialVelocityKmS`, `source` |
| `grid` | `ra0`, `dec0`, `scaleArcsec` (3.0), `width` and `height` (121), `projection` (`"TAN"`), `orientation`, `fileFormat` |
| `groups[]` | one per detector group (see below): `id`, `label`, `detectors`, `display` (stretch for stacks), `displayExposure` (stretch for single exposures), `stackMethod`, `passes[]`, `exposures[]`, `droppedPasses[]`, `failedExposures[]`, `exposureLists[]` |
| `groups[].passes[]` | `index`, `label`, `mjdStart`, `mjdEnd`, `mjdMid`, `yearMid`, `nExposures`, `detectors`, `wavelengthUmMin`, `wavelengthUmMax`, `stack` (path to `.f32`), `preview` (path to `.png`), `predicted` and `measured` (each `ra`, `dec`, `x`, `y`; measured adds `errArcsec`, `snr`, `offsetFromPredictedArcsec`), `snr`, `detected`, `blendedWith`, `saturationRadiusPx`, `nanFraction`, `nanFractionOutsideCore` |
| `groups[].exposures[]` | `id`, `mjd`, `detector`, `wavelengthUm`, `bandwidthUm`, `frame` (path), `uri` (the S3 URL of the source file), `release`, `noiseSigma`, `background`, `pass` |
| `truth` | for movers: `group`, `fromPass`, `toPass`, `motionArcsec` (measured), `predictedMotionArcsec`, `baselineYears`, `rateArcsecPerYear`, `predictedRateArcsecPerYear`, `literature` (proper motion, parallax, distance, tangential velocity); for variables: ratios or a light curve plus literature |
| `contaminants`, `caveats` | strings the UI should show |
| `provenance` | `releases[]` (release name, DOI, count), `pipeline`, `generatedAt`, `builder`, `recipes`, `choicesAfterLooking[]`, `zodi`, `flags` |
| `credits` | `data`, `dois`, `acknowledgement` (currently `null`: the official wording was not found in the notes and was not guessed), `acknowledgementNote`, `astrometry` |

`choicesAfterLooking` records every analysis choice made after seeing the data (for example the aperture rule for R Draconis), so a reader can tell pre-planned steps from tuned ones. `mission-index/1` (`assets/missions/index.json`) lists the missions: `id`, `name`, `kind`, `summary`, `manifest`, `contactSheet`, `groups`, `nPasses`.

### 3.2 Detector groups

| group id | detectors | wavelength | notes |
|---|---|---|---|
| `d1` | D1 | 0.75 to 1.1 µm | live path only |
| `d2` | D2 | 1.1 to 1.65 µm | |
| `d3` | D3 | 1.6 to 2.4 µm | live path only |
| `d4` | D4 | 2.4 to 3.8 µm | live path only |
| `d5d6` | D5 and D6 stacked | 3.8 to 5.0 µm | WISE 0855 is visible only here |

The static assets use `d2` for four targets, `d5d6` plus `d2` for WISE 0855, and a group `d6` (detector D6 alone, restricted to a narrow wavelength window around 4.45 to 4.49 µm) for R Draconis; see `MISSION_GROUPS` in `packages/missions-core/src/manifest.ts`. The five groups in `DETECTOR_GROUPS` (`packages/spherex-core/src/live.ts`) are the set for the live path; `d6` exists only as a static group.

### 3.3 Raw `.f32` frames

Raw little-endian float32, row-major, 121 x 121 values (58,564 bytes). Row 0 is the north (top) row and column 0 is the east (left) column. Values are MJy/sr (megajanskys per steradian, a surface brightness) after subtracting a sigma-clipped median background. `NaN` means no data or a saturated core. In JavaScript: `new Float32Array(await (await fetch(url)).arrayBuffer())`.

### 3.4 Grid and pixel convention

TAN (gnomonic) projection about `grid.ra0, grid.dec0`; 3 arcsec per pixel; **north up, east left** (the way the sky looks on a normal chart). Pixel `(x, y)` = (column, row), 0-based, pixel centres. FITS equivalent: `CRPIX1 = CRPIX2 = 61` (1-based), `CDELT1 = CDELT2 = -3/3600` degrees, no rotation. Exposures have different orientation and WCS, so every exposure is reprojected onto this fixed grid.

### 3.5 Display stretch (PNG previews and the canvas)

Per group the manifest carries `display = { vmin, vmax, soft, ... }`. For a value `v`:

```
t   = clip((v - vmin) / (vmax - vmin), 0, 1)
out = asinh(t / soft) / asinh(1 / soft)
```

PNG previews are 8-bit grey with alpha (alpha 0 where the stack is `NaN`). `web/src/lib/sky.ts` has `stretch(v, display)` implementing the same formula.

### 3.6 Source exposure access (S3 range recipe)

Three requests per exposure, about 538 KB for a 61-row box (about 750 KB for the 121 x 121 grid). See `docs/DATA.md` section 3.

### 3.7 URL state (`web/src/lib/viewState.ts`)

The whole view is in the query string; parsing is tolerant (anything missing or malformed falls back to the default and never throws).

| param | meaning | accepted values |
|---|---|---|
| `m` | mission id | `^[a-z0-9_-]{1,40}$` (`wise0855`, `epsindb`, `barnard`, `rwaur`, `rdra`) |
| `ra`, `dec` | a typed position, drawn as an overlay | decimal degrees, RA 0 to 360, Dec -90 to 90 (both needed) |
| `g` | detector group | same pattern as `m` |
| `mode` | `stack` (one frame per pass) or `exp` (every exposure) | `stack` default |
| `f` | frame index | 0 to 100000; when present the movie does not autoplay |
| `ov` | overlays | comma list of `pred`, `meas`, `input`, or `none` |
| `z`, `cx`, `cy` | zoom (1 to 16) and zoom centre in grid pixels | numbers |
| `fps` | speed | one of 0.5, 1, 2, 4, 8, 12 |
| `loop` | loop the movie | `0` turns it off |

Example: `/watch?m=wise0855&mode=stack&f=2&ov=pred,meas&z=4`.

The mission report from `missions-core` is a separate base64url string (`mission-report/1`, at most 4,096 characters, no personal data) meant to travel inside a link; the web app does not use it yet.

## 4. Public API of the TypeScript libraries

Both are ES modules whose entry is `src/index.ts`. Neither has runtime dependencies. Both export their TypeScript source (`"exports": { ".": "./src/index.ts" }`); the plan was to copy the code into `web/src/lib/` at integration, and the web worker is instead linking the packages with `file:` dependencies.

### 4.1 `spherex-core`

| module | exports | what it does |
|---|---|---|
| `fits` | `parseHeader`, `findHdu`, `findTableInSuffix`, `dataSize`, `num`, `BLOCK`, `FitsIncompleteError` | 2,880-byte header blocks to a keyword map; locates the IMAGE HDU and its data offset; throws `FitsIncompleteError` when `END` is beyond the buffer |
| `wcs` | `wcsFromHeader`, `gridWcs`, `TanSipWcs` | TAN-SIP `skyToPixel` and `pixelToSky`, 0-based pixels like astropy origin 0; the 121 x 121 mission grid as a WCS |
| `wave` | `parseWaveTable`, `waveAt` | the WCS-WAVE table (grid shape read from `TFORM1`/`TFORM2`) and a bilinear lookup of wavelength and bandwidth at a pixel |
| `s3` | `s3Url`, `releaseOf`, `rangeFetch`, `Limiter`, `s3Limiter`, `readHead`, `readRows`, `decodeBigEndianF32`, `boxForSquare`, `readExposureBox`, `NX` | archive URI to S3 URL; Range GET with 3 retries; a pool of 6 concurrent requests; reads one exposure box with its WCS, MJD, detector and wavelength |
| `frame` | `median`, `sigmaClippedMedian`, `robustSigma`, `reprojectBilinear`, `prepExposure` | background and noise estimates; bilinear reprojection onto the grid |
| `stack` | `splitPasses`, `groupPasses`, `stackFrames`, `centroid`, `aperture`, `emptyApertureSigma`, `bootstrapCentroidErr`, `measureNear`, `displayHint`, `mulberry32` | 20-day passes (minimum 3 exposures); inverse-variance stack with 4-sigma clipping; S/N, centroid and bootstrap error; asinh display hint |
| `astrometry` | `jyear`, `mjdOfJyear`, `separationArcsec`, `propagate`, `whatWasHere`, `predictPosition`, `moversFromCatalogue` | proper-motion propagation; "what was at this position in year Y"; geocentric predicted position including parallax |
| `sia` | `COLLECTIONS`, `siaUrl`, `siaUrls`, `parseSiaCsv`, `dedupeExposures`, `handleObservationsRequest`, `irsaLimiter` | the four SIA collection URLs, CSV parsing, and a pure server-route handler |
| `live` | `buildLiveMission`, `DETECTOR_GROUPS`, `availableGroups`, `monthLabel`, `exposureId`, `DOIS`, `STACK_METHOD` | the whole chain for one detector group, returned as a `mission-manifest/1` object with `Float32Array` frames |

`handleObservationsRequest(searchParams, fetch)` returns `{ status, body }`: 400 on bad input, 200 when at least one collection answered, 502 when none did. IRSA answers HTTP 502 intermittently, so each collection is retried up to four times; if one still fails the body carries `complete: false` and that collection has `ok: false`. A 200 with `complete: false` can hold zero exposures, so check `complete` before showing "no coverage".

Known limits (from `packages/spherex-core/README.md`): at most 150 exposures per group are read, evenly spaced in time. There is no neighbour-star attribution and no saturation handling (`kind` is `"field"` unless astrometry is passed). S/N and bootstrap errors use a seeded `mulberry32` generator, statistically equivalent to numpy's but not identical. There are no PNG previews, FLAGS are not read and ZODI is not subtracted.

### 4.2 `missions-core`

| module | exports | what it does |
|---|---|---|
| `grid` | `gridToSky`, `skyToGrid`, `offsetArcsec`, `positionAngleDeg`, `angleDiffDeg` | pixel to sky and back for the mission grid, east/north offsets, position angle |
| `centroid` | `refineCentroid`, `apertureSum`, `annulusStats`, `disc`, `median`, constants `CENTROID_RADIUS_PX` (4), `SNR_APERTURE_PX` (3), `ANNULUS_PX` (6 to 10), `MIN_SNR` (5) | rounds a click to the flux-weighted centroid; flags `no-signal`, `faint`, `edge`, `saturated-core`, `mostly-nan` |
| `motion` | `motionBetween`, `fitMotion` | motion from two epochs, or a weighted least-squares fit through three or more; rate, position angle, errors |
| `parallax` | `fitParallaxFixedPm`, `chi2AtParallax`, `modelAt`, `distancePc`, `distanceLy`, `tangentialVelocityKmS`, `T0`, `KM_S_PER_AU_PER_YEAR` | the classroom fit (proper motion fixed to Gaia, one free parameter); distance and speed |
| `photometry` | `apertureFlux`, `ratioToControl`, `binPoints`, `binRatio`, `deltaMag`, `lightCurvePoints`, `foldPhase` | brightness ratios at matched wavelength and light curves for the variable stars |
| `score` | `compare`, `scoreMotion`, `scoreParallaxMas`, `scoreDistance`, `scoreSpeed`, `scoreRatio`, `pipelineRate`, `literatureRate`, `CLOSE_PERCENT` (10), `CLOSE_ANGLE_DEG` (15) | compares a student's answer with the pipeline value and the literature value; tier `inside`, `close` or `try-again` |
| `report` | `encodeReport`, `decodeReport`, `REPORT_VERSION`, `MAX_ENCODED_LENGTH`, `MAX_FRAMES`, `MAX_CLICKS`, `QUANTITIES` | a mission report as a base64url string; `decodeReport` validates everything and returns an error code instead of throwing |
| `manifest` | types `Manifest`, `Pass`, `Group`, `MoverTruth`, `ParallaxProduct`, ...; `MISSION_GROUPS`, `MISSION_IDS`, `moverTruth`, `group` | the manifest shape the logic reads |
| `content/missions` | `missionScript`, `missionFacts`, `MISSION_ORDER`, `STEP_ORDER`, `STEP_TITLE`, `PITCH`, `TIER_TEXT`, `REASON_TEXT`, `SOURCE_TEXT`, `FLAG_TEXT` | the four-step scripts (Watch, Measure, Hunt, Report) built from a manifest |
| `content/glossary` | `GLOSSARY` | plain-language definitions |

### 4.3 `spherex-index` (in progress, not yet in the repository)

`loadMeta`, `queryIndex`, `exposuresAt`, `coverageSummary`, `dedupeExposures`, plus geometry helpers (`gnomonic`, `pointInPolygon`, `sphericalPolygonContains`, `separationDeg`, `capBox`, `cellMeetsBox`). `exposuresAt` returns the same `Exposure` shape as the SIA path, so the result feeds `buildLiveMission` unchanged. The API may still change.

## 5. Decisions and reasons

**Stack per visit, not a blink of single exposures.** The notes found that stars move only 0.3 to 2.5 pixels over the whole 1.5-year baseline, and that every exposure of the same sky position is at a different wavelength (the detectors carry a variable filter, so the wavelength changes across the image). A blink of raw exposures flickers with the star's spectrum, not with motion (notes 02, 03, 06, 08). Stacking the exposures of one pass gives a few clean frames; the viewer also offers every exposure (`mode=exp`).

**Detector groups.** Each detector sees different wavelengths and a source can be visible in one and absent in another. WISE 0855 (a very cold brown dwarf) is detected only in D5 and D6 (3.8 to 5.0 µm), with S/N 9 to 14 per pass, and not in D2 or D4; the manifest keeps the D2 group on purpose, as an honest "absent here" control (note 08).

**Static assets for five targets plus a live path.** The static assets start instantly (target in the plan: under 2 seconds), cannot fail at demo time, and let us check every number in advance. The live path covers any coordinate, the thing the challenge asks for ("users will enter the coordinates of a patch of sky").

**Why the archive cannot be called from a browser.** The probe of 14 November (note 05) found that IRSA's TAP, SIA, image-cutout and file endpoints send no `Access-Control-Allow-Origin` header, so a web page cannot read their responses. Only the HiPS tiles and the S3 bucket send it. So the exposure search needs a small server route (or a static index), but the pixels can be read straight from S3. (The team's earlier document `docs/image-sources-and-pipeline.md` says IRSA is CORS-enabled; that holds for the HiPS tiles the globe uses, not for TAP, SIA or cutouts.)

**Why range reads from S3 instead of IRSA cutouts.** A cutout costs about 4 MB and 10 to 21 seconds whatever its size, because a 3.8 MB calibration table travels with every cutout, and the server answered "busy" (HTTP 503) for about a third of requests at 8 in parallel. A range read is about 538 KB and 2.5 seconds per frame, zero failures in 1,157 header reads and 180 pixel reads, and bit-identical pixels to the cutouts on 6 of 6 exposures tested (note 09).

**Why a static index.** The IRSA search service answered HTTP 502 for minutes at a time during testing, and a cold TAP footprint query takes 10 to 45 seconds. A static index of all about 1.63 million images (note 04, section 3: 1,628,318 rows on 2026-11-14) removes the archive from the request path, and an incremental builder lets it follow new releases ("easy to update" in the challenge text). In progress.

**TypeScript port, checked against astropy.** The same maths runs in Python (for building assets) and in TypeScript (for live loading). Agreement checked: pixel boxes bit-identical, sky to pixel within 1.7e-11 px, wavelength identical, live-built stacks equal to the Python build for two targets (Epsilon Indi B and WISE 0855: same passes, correlation 1.000000, centroids equal to four decimals). See `docs/PROCESS.md` for the table.

**No FLAGS mask on bright stars.** The archive's bad-pixel mask marks saturated stars as bad, so applying it erases Barnard's Star completely (note 08). The pipeline reads no FLAGS and shows the saturated core as `NaN`.

**Parallax only for Epsilon Indi B, with Gaia's proper motion.** The method was written down before fitting (note 13). Raw SPHEREx positions show a seasonal shift of about 0.2 arcsec that imitates parallax and gives an answer 60 percent too high; a correction with three reference stars fixes it. WISE 0855 and Barnard's Star do not give a measurable parallax from the available data.

**Decisions not made here (open for the team):** the product name, whether the 3D globe becomes the entry page, which account deploys, and voice-over. See `docs/ECHIPA-START-AICI.md`, section 6.
