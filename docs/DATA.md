# Data sources, terms, recipes and rebuild commands

This document covers every external data source and service the project touches: what it is used for and what its terms and credit line require. It then gives the recipe for reading pixels from the S3 bucket, the known failure modes and what to do about them, and, for each generated file, the exact command that rebuilds it and the check that validates it.

Labels used throughout: **VERIFIED** means a research note records reading it at the source on 14 November 2026 (the note number is given). **UNVERIFIED** means the notes did not confirm it. **Ran today** means the documentation pass ran the command. **Not rerun** means the command is quoted from a script or README.

## 1. Sources and services

No source needs an API key. The NASA `api.nasa.gov` service is **not used**.

### 1.1 Used by the shipped project

| Source | Endpoint | Used for | Terms and required credit |
|---|---|---|---|
| **SPHEREx Level 2 spectral images** (NASA/JPL-Caltech), served by the NASA/IPAC Infrared Science Archive (IRSA) | pixels: `s3://nasa-irsa-spherex` (public HTTPS: `https://nasa-irsa-spherex.s3.us-east-1.amazonaws.com/<key>`) | All pixel data in the five missions and the live path | NASA mission data, public. Cite the release DOIs: DR1 images 10.26131/IRSA678, QR3 10.26131/IRSA662, QR2 10.26131/IRSA652, QR1 10.26131/IRSA629, all-sky cube 10.26131/IRSA679 (note 03, VERIFIED). **The official acknowledgement wording is not in the notes, and the manifests carry `credits.acknowledgement = null` on purpose.** To do: copy the wording from the IRSA SPHEREx pages and cite it (see section 5). |
| **IRSA TAP** (exposure metadata) | `https://irsa.ipac.caltech.edu/TAP/sync` (parameters `QUERY`, `FORMAT`; table `spherex.obscore` in the pipeline index builder, `spherex.plane` joined to `spherex.artifact` in the mission builder) | Which exposures cover a position (pipeline and index builder only, never from the browser) | Same as above. **No CORS headers**, so a browser cannot call it (note 05, VERIFIED). |
| **IRSA SIA** (simple image access) | `https://irsa.ipac.caltech.edu/SIA?COLLECTION=<collection>&POS=circle+<ra>+<dec>+<radius>&RESPONSEFORMAT=csv` | The live path's exposure search, through a server route; collections `spherex_dr1`, `spherex_dr1_deep`, `spherex_qr3`, `spherex_qr3_deep` | Same as above. No CORS headers (note 05). Answers HTTP 502 intermittently (about 1 request in 6 measured by the library author; for minutes at a time during one end-to-end run). |
| **SIMBAD** at CDS Strasbourg, through the Harvard mirror | `https://simbad.harvard.edu/simbad/sim-tap/sync` (the CDS endpoint `https://simbad.cds.unistra.fr/simbad/sim-tap/sync` returned HTTP 404 on 14 November; the script tries it first and falls back) | The fast-mover catalogue (`assets/movers.json`) and the target coordinates | CDS asks for an acknowledgement (notes 12 and 06). The exact wording is **UNVERIFIED** in the notes; the standard text is on the SIMBAD website. |
| **Gaia DR3** (ESA), as served by SIMBAD and by IRSA TAP table `gaia_dr3_source` | via SIMBAD (above) | Proper motions, parallaxes and positions of the targets; Epsilon Indi B literature distance (Gaia B parallax 270.7 mas) | Cite Gaia DR3 and the ESA acknowledgement (note 12; wording UNVERIFIED). |
| **Kirkpatrick et al. 2021** | literature (position, proper motion, parallax of WISE 0855) | WISE 0855 astrometry in `pipeline/build_missions.py` | Cite the paper in the references. |
| **HiPS tiles** (2MASS, AllWISE, SPHEREx all-sky cube) from IRSA | `https://irsa.ipac.caltech.edu/data/hips/...` | Only the team's earlier 3D globe (repository root) | CORS open (note 05, VERIFIED). Credits as in the root `README.md`: SPHEREx (JPL/Caltech, funded by NASA, DOI 10.26131/IRSA679), 2MASS (UMass and IPAC/Caltech, funded by NASA and NSF), WISE/NEOWISE (UCLA and JPL/Caltech, funded by NASA). |
| **NED**, **NASA Exoplanet Archive** | as in the root app | Only the 3D globe (name resolution, exoplanet pins) | Credits in the root `README.md`. |
| **Inter** and **JetBrains Mono** fonts (SIL Open Font License) | downloaded at build time by `next/font/google`, then served from the app's own site | `web/` interface fonts; also copied for `video/` in `video/assets/fonts/` with their licence files | OFL: keep the licence texts (they are in `video/assets/fonts/`). No font request goes to Google at run time (`web/src/app/layout.tsx`). |

### 1.2 Used only for research (not shipped)

| Source | Used for | Notes |
|---|---|---|
| WiseView (`http://byw.tools/wiseview`, operated by the American Museum of Natural History) | Prior art for the blink viewer (note 02) | Read, not copied. No licence file in its repository: do not copy code. Use `http`, not `https`: `https` failed to connect from the probing machine. |
| IRSA IBE cutouts (`.../ibe/data/spherex/...?center=...&size=...`) | Validation: the range reader's pixels are bit-identical to cutouts (note 09); detectability experiment (note 08) | About 4 MB and 10 to 21 s per cutout, HTTP 503 when busy; no CORS. |
| IRSA catalogue tables (`gaia_dr3_source`, `allwise_p3as_psd`, `catwise_2020`, `fp_psc`, `unwise_2019`) | Checking positions and proper motions (notes 04, 08) | Same TAP endpoint. |
| Sesame (CDS name resolver), AAVSO VSX, JPL, IMCCE and others | Surveyed in notes 06, 07, 12 | Not used at run time. AAVSO and IMCCE ask for acknowledgement (note 12) if used later. |
| NASA media guidelines | Rules for the video (note 14): NASA content is generally not copyrighted in the US, NASA should be acknowledged as source, and the NASA insignia and logotype are not public domain, so no NASA logo in the video | Quoted in note 14, section D2 (VERIFIED). |

### 1.3 Required credit lines from the challenge rules

- "NASA does not endorse this project" (already in the web footer and the root `README.md`).
- No NASA logo anywhere in the demo.
- At least one NASA dataset listed in the form field "NASA Data" (note 01).

## 2. Rules of the road for each service

- IRSA TAP: query only `CONTAINS(POINT('ICRS', ra, dec), poly)`. The `INTERSECTS(...)` form returned 6 rows where `CONTAINS` returned 363 (note 04); the cause is unknown, so do not use it for footprints. Errors come back as HTTP 200 with a VOTable `ERROR` element, so read the body. A cold footprint query takes 10 to 45 seconds and concurrent queries do not run faster; the pipeline runs them one at a time.
- IRSA SIA: one request per collection, CSV output (`RESPONSEFORMAT=csv`), about 2 to 6 seconds when it works.
- S3: plain HTTPS GET with a `Range` header; status 206 is expected; CORS allows `GET`, `HEAD` and the `range` header from any origin (note 05, VERIFIED). The server key is the IRSA path with the prefix `ibe/data/spherex/` removed.
- SIMBAD: use the Harvard mirror when the CDS endpoint fails.
- Be polite: the pipeline limits itself to 8 concurrent S3 requests, one TAP query at a time, and stops after 480 MB of new downloads per run.

## 3. The three-request S3 recipe (per exposure)

From note 09, section 1, implemented in `pipeline/s3reader.py` (Python) and `packages/spherex-core/src/s3.ts` (TypeScript). A SPHEREx Level 2 file is a FITS file of about 61 to 67 MB. We never download it whole.

Variables: `URL` is the S3 URL; the image is 2,040 x 2,040 pixels of big-endian float32, so one row is 2,040 x 4 = 8,160 bytes.

1. **Headers.** `Range: bytes=0-34559` (12 FITS blocks of 2,880 bytes). Walk the blocks: the PRIMARY header ends after block 1; the IMAGE header starts at byte 2,880 and ends at the block containing `END`. From it read the celestial WCS (TAN-SIP), `MJD-AVG`, `DETECTOR` and the spectral WCS keys. The IMAGE data offset is `2880 + (IMAGE header length)`. It is not constant (25,920 or 28,800 bytes in the files seen), so this request is mandatory; 34,560 bytes covered it every time.
2. **Pixels.** Convert the target to a pixel with the WCS, choose rows `y0 .. y1`, then `Range: bytes = offset + y0 * 8160` to `offset + (y1 + 1) * 8160 - 1`. Whole rows arrive, so columns are free: slice any columns afterwards. 61 rows are 497,760 bytes.
3. **Wavelength table.** `Range: bytes=-5760` (a suffix range: the last two blocks) holds the WCS-WAVE table (wavelength and bandwidth in micrometres on a coarse grid). Its shape differs per detector and sometimes per file (9 x 9, 11 x 11, 13 x 20), so read the shape from `TFORM1` and `TFORM2`, never assume it. It is the same for a detector across a year, so cache it per detector.

Total for a 61-row box: 34,560 + 497,760 + 5,760 = **538,080 bytes** in 3 requests. For the mission grid (121 x 121 pixels at 3 arcsec, about 6 arcminutes) about 750 KB. Requests 1 and 3 can run in parallel; request 2 needs request 1.

Measured (note 09, from a laptop in Europe): 2.45 s median per frame sequentially, 40 frames in 24.6 s at 8 in parallel, 0 failures in 180 pixel reads and 1,157 header reads; pixels bit-identical to IRSA cutouts on 6 of 6 exposures. Library end-to-end run: first frame at 4.6 s, about 95 frames in 23 to 32 s, 65 to 73 MB transferred.

Optional extras not used by the product: a ZODI (zodiacal light) read costs four more requests and was found unnecessary for fields of a few arcminutes (note 09, section 4: ZODI varies by at most 0.0005 MJy/sr within 30 arcsec against pixel noise of 0.033 to 0.34 MJy/sr). The FLAGS layer is Rice-compressed and is not read.

## 4. Known failure modes and what to do

| What happens | Seen where | What to do |
|---|---|---|
| IRSA SIA or TAP answers HTTP 502 (for one collection, or for minutes in a row) | live path; index builder | `handleObservationsRequest` retries 4 times and returns `complete: false`. Show a retry message, never "no coverage" when `complete` is false. Longer term: the static index (in progress). |
| IRSA cutout answers 503 "Server busy, retry later." with `retry-after: 5` | note 05 | Not used by the product. Use the range reader. |
| IRSA TAP `INTERSECTS` returns too few rows | note 04 | Use `CONTAINS(POINT, poly)`. |
| Main SIMBAD endpoint returns 404 | 14 Nov | `build_movers.py` falls back to the Harvard mirror automatically. |
| Python `urllib` hung with no bytes and no error while `curl` fetched the same URL | note 08 | The note 08 downloader shells out to curl. The current pipeline uses its own retrying reader; if a download hangs, try `curl` for the same URL. |
| The network drops mid-run | note 08 lost 157 of 190 files once | All pipeline caches write each frame as soon as it arrives; rerun the same command and only missing frames are fetched. |
| The archive's FLAGS bad-pixel mask erases saturated stars (Barnard's Star disappears) | note 08 | FLAGS are not read or applied. Saturated cores show as `NaN`. |
| A static star walks into the aperture of WISE 0855 | note 08 | The manifest marks `blendedWith` for the affected passes; the measured WISE 0855 motion reads about 22 percent low for that reason. |
| Barnard's Star core is saturated | notes 08, 13 | Measured motion reads about 13 percent low from the wings only (9.05 against 10.39 arcsec per year); the graded target is Epsilon Indi B. |
| The challenge coordinates of WISE 0855 point where it was in 2010, not now | note 06 | Propagate with proper motion. In SPHEREx data (2025 to 2026) it is about 2 arcminutes west. |
| Different detectors and wavelengths in one blink | note 02 | Stack per pass and per detector group; never blink raw exposures from different wavelengths without saying so. |
| Release lag | note 04 | The newest image is 5 October 2026 (MJD 61318.0); do not promise anything newer. |

## 5. To do before the form is submitted

- Copy the official IRSA/SPHEREx acknowledgement text, the CDS (SIMBAD) text and the Gaia DR3 text from their own pages, cite the URL, and put them on the app's "Credits and licences" page. Today only the DOIs are in the manifests.
- Confirm the terms of the S3 bucket page (open-data listing) and cite it. The notes record that it is public and CORS-open, not its terms.

## 6. Rebuild commands and checks, per generated asset

Run everything from the repository root. The Python programs use `uv run --with ...`, so there is no virtual environment. `-I` isolates Python from the current directory; `-B` keeps `__pycache__` out of the repo. Keep any cache directory **outside** the repository and never run code from inside it.

| Asset | Rebuild | Check |
|---|---|---|
| `assets/missions/<id>/**` and `assets/missions/index.json` (five targets: 455 files, 26 MB) | `uv run --with astropy --with numpy --with scipy --with reproject --with matplotlib --with pillow python -I -B pipeline/build_missions.py --data <cache dir>` (not rerun). A subset: `--only wise0855,epsindb`. New release: add `--refresh-tap`. A cold build reads about 400 frames (about 300 MB) in a few minutes. | `uv run --with numpy --with pillow python -I pipeline/check_missions.py` (**ran today: 269 checks passed, 0 failed**). The checks cover schema, files, sizes, coverage and the science numbers (for example Epsilon Indi B motion 6.54 arcsec against 6.4 expected, WISE 0855 detected at S/N 5 or more in 4 `d5d6` passes and in none of the `d2` passes, RW Aurigae ratios 1.395 and 1.398 against 1.40, 50 light-curve points for R Draconis, assets total 25.7 MB). |
| `assets/movers.json` (23,073 objects, at least 300 mas/yr) | `cd assets && uv run python -I ../pipeline/movers/build_movers.py` (not rerun; needs the network) | `uv run python -I pipeline/movers/check_movers.py assets/movers.json` (**ran today: all PASS**; WISE 0855 propagated to 2010.5 lands 0.43 arcsec from the challenge coordinates). |
| `assets/movers-pm500.json` (5,282 objects, at least 500 mas/yr; the web app loads this one) | `uv run python -I pipeline/movers/build_movers.py 500 assets/movers-pm500.json` (not rerun) | `uv run python -I pipeline/movers/check_movers.py assets/movers-pm500.json` (**ran today: all PASS**, 5,282 rows). |
| `web/public/data/` (copy of the above) | `cd web && npm run sync-assets` (also runs before `dev`, `build` and `test`; not rerun) | `cd web && npm test` (57 tests when last verified at 18:46; not rerun). |
| `assets/index/` static exposure index (**in progress, not yet in the repository**) | `uv run --with numpy --with astropy python -I pipeline/index/fetch_rows.py --out <rows dir>` fetches the metadata rows (resumable, at most 2 requests in flight); the builder `pipeline/index/build_index.py` was not yet in the repository when this was written | Plan: equal to the archive at 30 positions and for the five targets; `cd packages/spherex-index && npx vitest run` (ran today: 7 geometry tests pass; the archive comparison is `npm run test:live`, not rerun). |
| Golden fixtures in `packages/spherex-core/test/fixtures/` | The README says they were made by `../fixgen/make_fixtures.py` from the Python pipeline; **that script is not in the repository**, so the fixtures are committed files and cannot currently be regenerated from this repo. | `cd packages/spherex-core && npx vitest run` (**ran today: 55 passed**). |
| Experiment results and figures in `docs/research/experiments/` | Each script has its arguments in its docstring (`det08_*.py`, `exp09_*.py`, `exp13_*.py`). Parallax: `uv run --with astropy --with numpy --with scipy --with matplotlib python -B -I experiments/exp13_parallax.py epsindb <data dir> experiments` (from note 13, about 1 minute, deterministic; not rerun; it needs the cached row bands from note 09, which are not in the repository) | The JSON and `.log` files next to each script are the recorded outputs; note 13 states that a second full run gave a byte-identical log. |
| `video/out/*.mp4`, `*.wav` (harness done; film not done, app shots are placeholders) | `cd video && npm run render` (not rerun) | `cd video && node test.mjs` (not rerun): checks 1920 x 1080, 60 fps, yuv420p, h264, length within one frame and at most 30 s, loudness, determinism by SHA-256 of sampled frames. |

## 7. Data volumes and limits to remember

- Static assets: 26 MB for five targets (the check requires under 40 MB). 455 files in all; each frame is 58,564 bytes (121 x 121 float32).
- Whole archive on 14 November 2026: 1,628,318 plane rows, 1,628,230 of them Level 2 images (D1 272,963; D2 272,990; D3 272,684; D4 269,694; D5 270,443; D6 269,456), from 24 April 2025 to 5 October 2026 (note 04, VERIFIED).
- Per target on that date: Barnard 363 images in 5 passes; Epsilon Indi 465 in 4; WISE 0855 258 in 4 (newest 14 May 2026); RW Aurigae 335 in 3; R Draconis 2,493 in 3 merged passes (note 04).
