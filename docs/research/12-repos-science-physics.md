# 12. Repos, libraries and data for the science and physics side

Date of research: 2026-11-14. Method: `gh api`, npm registry and downloads API, PyPI and pypistats, `curl -sI` with an Origin header, Exa, jina reader. Nothing was installed or run. Read notes 06, 07, 09 first; this note does not repeat them.

Legend: VERIFIED = I saw it today in a tool result. UNVERIFIED = from memory or inferred; check before relying on it. Hours = integration effort for one developer who knows the codebase.

---

## 1. Top 10 to adopt now

| # | What | Serves (mission or feature) | Hours | Licence | Status |
|---|---|---|---|---|---|
| 1 | **astropy 8.0.2** (`SkyCoord.apply_space_motion`, `Distance`, `constants`, `modeling.models.BlackBody`, `timeseries.LombScargle`, `stats.sigma_clipped_stats`) | Offline "answer key" for every mission: expected motion, distance, v_t, temperature, period, stack S/N. Pipeline already uses it | 2 to 4 (wire reference values into the mission JSON) | BSD-3-Clause | USE, already in |
| 2 | **astronomy-engine** (npm, 467k downloads/week) | Browser Earth and planet positions for the parallax mission, light-travel time, "where was SPHEREx's Earth at this epoch" animation | 4 | MIT | USE |
| 3 | **IRSA SPHEREx tutorials** (`Caltech-IPAC/irsa-tutorials`, `tutorials/spherex/*.md`) | Reference code for the wavelength WCS, flux units, source extraction and PSF; use to cross-check our S3 reader | 2 (read and diff) | BSD-3-Clause | USE as reference |
| 4 | **SkyBoT + Miriade** (IMCCE, CORS `*`) | Asteroid and comet overlay and ephemeris check from the browser, no proxy | 4 | Free web service, terms UNVERIFIED (see 4) | USE |
| 5 | **AAVSO VSX API** (CORS `*`) | Period, range and type for R Dra and RW Aur, for phase folding and the Mira mission | 2 | Free service, terms UNVERIFIED | USE |
| 6 | **ml-levenberg-marquardt** (npm, 240k/week) | In-browser Planck fit to a spectrum (temperature from Wien and blackbody), in-browser line fit for proper motion | 3 | MIT | USE |
| 7 | **simple-statistics** (npm, 1.2M/week) | Median, MAD, sigma clip, linear regression for the stacking and S/N missions | 1 | ISC | USE |
| 8 | **Own Lomb-Scargle port** (about 40 lines TS; reference astropy `LombScargle`) | Period finding live in the browser. No maintained npm package exists | 3 | n/a (own code) | USE (build) |
| 9 | **unWISE cutouts + Legacy Survey cutouts** (CORS `*`) | 2010-era WISE backdrop next to SPHEREx so a student sees the motion over 15 years, not 1.5 | 3 | Public service; cite unWISE and Legacy Surveys | USE |
| 10 | **OpenStax Astronomy 2e** (glossary and definitions) | Glossary and "learn more" text | 2 | **CC BY-NC-SA 4.0 (non-commercial, share-alike)** | USE with the licence caveat |

---

## 2. The "all the laws of physics" repository

I could not identify one repo with certainty; no repo called "all the laws of physics" exists with real traction. Ranked by likelihood that this is the one the team lead remembers:

| Candidate | What is in it | Licence | Verdict |
|---|---|---|---|
| **Physics Derivation Graph** (`allofphysicsgraph/proofofconcept`, site allofphysics.com, "all of physics" is literally the domain) | Equations linked by derivation steps as a graph, SymPy-checked | Code GPL-2.0 (LICENSE file VERIFIED); site content CC BY 4.0 (stated in a 2018 blog post, VERIFIED); GitHub reports NOASSERTION. 21 stars, pushed 2026-07-25 VERIFIED | **Most likely match by name and concept.** Inspirational only: general physics, no astronomy focus, heavy stack (Flask, Neo4j) |
| **TheorIA dataset** (`theoria-dataset/theoria-dataset`) | One JSON per theoretical physics result with derivations in AsciiMath; 27 entries today VERIFIED; browsable site | CC BY 4.0 (README badge VERIFIED); 15 stars, pushed 2026-04-06 | Too small and too advanced (Lorentz transformations, not proper motion). SKIP |
| **Feynman Symbolic Regression Database** (AI Feynman, `SJ001/AI-Feynman`, 100 equations plus 20 bonus UNVERIFIED) | Equations from the Feynman Lectures as data files for symbolic regression | Code MIT, 785 stars, last push 2024-07-09 VERIFIED; the original data page at space.mit.edu returned 404 today VERIFIED; data licence UNVERIFIED | Likely the one if the lead remembers "equations" with a famous name. Mechanics, E and M, thermo only; no astronomy; inspirational only |
| **sympy.physics** (inside `sympy/sympy`, 15k stars, pushed today VERIFIED; licence BSD-3 plus bundled, GitHub says NOASSERTION) | Units, mechanics, quantum, optics modules | BSD | Python only. Useful for our own derivations in the pipeline, not the web app |
| **awesome-physics** (`wbierbower/awesome-physics`, 660 stars, pushed 2026-11-05 VERIFIED, no licence listed) | A link list of resources | none stated | Inspirational; check it for lecture notes |
| Smaller formula repos found: `nbeaver/equajson` (MIT, 2 stars), `Phylator/data` (MIT, last 2018), `BenjaminTMilnes/PhysicsFormulae` (no licence) | Equation data formats | mixed | SKIP |

**What "how things move in space" actually needs is not an equation catalogue.** The needed laws are about 10 formulas (cheat sheet in section 5) and they are fully implemented in astropy (`astropy.constants`, `SkyCoord`, `BlackBody`, `LombScargle`) and `astronomy-engine`. A student mission shows the formula in KaTeX, then computes it with real data; no repo on this list would change that. Recommendation: do not integrate any of the five. If a "laws" browser is wanted, write the 10 laws as a typed array of `{name, latex, units, example}` in our own code (1 hour) and cite Wikipedia and OpenStax.

Possible other candidates I did not check: Wikidata formula items, the NIST CODATA constants site, HyperPhysics. UNVERIFIED that any is "the repo".

---

## 3. Per-category tables

Columns: URL (GitHub unless noted) | licence | last commit or release | traction | gives us | hours | risk | verdict. Dates and counts VERIFIED today unless marked.

### 3.1 Astronomy computation in JavaScript/TypeScript

| Candidate | Licence | Last activity | Traction | Gives us | Hrs | Risk | Verdict |
|---|---|---|---|---|---|---|---|
| astronomy-engine (`cosinekitty/astronomy`, npm) | MIT | last commit 2025-01-27; last release 2.1.19 on 2023-12-14 | 1,112 stars; 467k npm/week; 74 dependents | Sun, Moon, planets, Earth vector, light-time and aberration, coordinate transforms (equatorial, ecliptic, galactic), time handling. No asteroids or comets | 4 | Slow release cadence, but precision is documented against NOVAS and JPL; API stable | **USE** |
| astronomia (`commenthol/astronomia`, npm) | MIT | pushed 2026-11-08; 4.3.0 | 183 stars; 1.49M npm/week as reported (suspicious, likely a transitive dependency) | Meeus-based: Kepler solver, planets VSOP87, precession, time scales (ΔT), sidereal | 4 | Meeus accuracy (arcsec for planets), less documented | MAYBE: use only for the Kepler solver if we do not write 10 lines ourselves |
| astronomy-bundle (npm) | MIT | 7.7.7, last release 2024-04-15 | 2.4k/week; 7 dependents | Same domain as astronomia | 4 | Overlaps | SKIP |
| fitsjs (`astrojs/fitsjs`) | MIT | 2015 commit | 162/week | FITS parser | n/a | Dead | SKIP |
| fitsjs-ng (npm 1.0.2) | MIT | 2026-02-20 | 7/week | FITS parser | 3 | Near-zero use; doc 09 already planned our own 2880-byte header parser | SKIP |
| jsfitsio (npm 3.1.0) | Apache-2.0 | 2026-08-22 | 365/week | FITS in browser (internals UNVERIFIED) | 4 | Unknown | MAYBE, only if own parser fails; no Rice need since we skip FLAGS |
| healpix (npm, substack) / healpix-ts / healpix-geo | BSD / ? / Apache-2.0 | healpix 2022; healpix-geo 2026-11 | 16 / ? / 63 per week | HEALPix index math | 2 | Not needed: Aladin handles HiPS tiles | SKIP |
| aladin-lite (`cds-astro/aladin-lite`, npm 3.9.2-beta) | LGPL-3.0 | pushed 2026-11-13 | 168 stars; 3.3k/week | Sky background, HiPS, catalogue overlay, coordinate parsing (note 07) | 6 | LGPL: keep it a separate loaded module, ship its notice | USE if note 07 option 2 is chosen (the other researcher's area) |
| simple-statistics | ISC | 8.0.0, 2026-10-28 | 1.2M/week | Median, MAD, regression, quantiles | 1 | none | **USE** |
| ml-levenberg-marquardt | MIT | 5.1.0, 2026-07-31 | 240k/week | Nonlinear least squares (Planck, linear motion fit) | 3 | You must supply the model; error bars need a manual Jacobian step | **USE** |
| mathjs | Apache-2.0 | 15.2.0, 2026-04-07 | 5.5M/week | Units and expression parsing | n/a | 600 kB+ bundle; unneeded | SKIP |
| js-quantities / convert-units | MIT | 2023 / 2025-07 | 94k / 268k per week | Unit conversion | 1 | Do not hold astronomical units (pc, mas/yr) natively, UNVERIFIED | SKIP, write 6 conversions by hand |
| Lomb-Scargle in JS | n/a | n/a | n/a | `npm search "lomb scargle"` returned no relevant package; `gh search` found nothing | 3 (own port) | We own correctness; test against astropy on R Dra | BUILD |
| WCS (TAN-SIP) in JS | n/a | n/a | n/a | No maintained npm package found. `astro-viewer` (npm 3.19.0) has a custom "SEE LICENSE" licence, SKIP | 4 (own port, doc 09) | Sub-pixel errors: unit-test against astropy | BUILD |

### 3.2 Python for the offline pipeline

| Candidate | Licence | Latest | Traction | Gives us | Hrs | Verdict |
|---|---|---|---|---|---|---|
| astropy | BSD-3 | 8.0.2, 2026-10-15; pushed 2026-11-13 | 5.4k stars; 963k PyPI/week | `apply_space_motion`, `Distance`, `BlackBody`, `LombScargle`, `TimeSeries.fold`, `constants` | 2 | USE |
| photutils | BSD-3 | 3.1.1, 2026-10-16 | 317 stars; 50k/week | Centroiding (`centroid_com`, `centroid_2dg`), aperture photometry, PSF fitting. Matches the "centroid track" in doc 09 | 4 | **USE** for the pipeline and validation of our own centroids |
| astroquery | BSD-3 | 0.4.11, 2025-09-20; pushed 2026-11-13 | 804 stars; 88k/week | SIMBAD, Gaia, VizieR, IRSA, Horizons, IMCCE modules for offline target prep | 2 | USE (offline only) |
| reproject | BSD-3 | 0.21.0, 2026-06-25 | 30k/week | Already in use | 0 | in use |
| astropy-healpix | BSD-3 | 2.0.1, pushed 2026-10-22 | 48k/week | HEALPix maths for HiPS tile picking | 1 | MAYBE |
| specutils | BSD (GitHub licence field empty) | 2.4.0, 2026-06-01 | 14k/week | Spectrum1D, line fitting, spectral resampling | 3 | MAYBE: our spectra are per-exposure points, a plain numpy array is enough |
| lightkurve | MIT | 2.6.0, 2026-04-16 | 550 stars; 17k/week | Folding, periodograms, flatten for Kepler/TESS light curves; wraps astropy `LombScargle`, adds SNR peak helpers | 3 | MAYBE: the API is Kepler/TESS-centred, our series is irregular with LVF wavelength confound; use astropy directly |
| astroplan | BSD | 0.10.1, 2024-08-13 | 9.6k/week | Observability | 0 | SKIP |
| sep (LGPLv3+) / astroalign | LGPL / unclear | 2025-02 / 2025-09 | 17k / 6k per week | Source extraction, asterism alignment | 3 | SKIP, photutils covers it |
| sbpy | NOASSERTION on GitHub (BSD 3-Clause on PyPI) | 0.6.0, 2025-12-02 | 79 stars; 707/week | Small-body ephemerides, comet dust models, magnitudes | 4 | MAYBE for comet mission, astroquery.jplhorizons is enough first |
| Caltech-IPAC/irsa-tutorials | BSD-3 | pushed 2026-11-13 | 19 stars | Notebooks: spherex_intro, spherex_cutouts, spherex_hipscube, spherex_mosaic, spherex_psf, spherex_source_discovery (file list VERIFIED via GitHub API). The page says QR3 and DR1 supersede QR2 | 2 | **USE as reference** |
| banados/spherex-tools | MIT | 2025-11-17 | 9 stars | Community SPHEREx helper (contents NOT read) | 1 to read | MAYBE read |
| freddavies/spherextract | no licence file reported | 2026-11-11 | 8 stars | "Download SPHEREx images and optimally extract spectrophotometry of point sources" | 2 to read | Read for the optimal-extraction idea only; no licence, so do not copy code |
| jgagneastro/SPIFF | MIT | 2026-08-21 | 11 stars | SPHEREx-related (contents NOT read) | 1 | MAYBE read |
| mateibut/SPHEREx-Blink-3.0 | MIT | 2026-11-14 (today) | 4 stars | Probably another hackathon entry; NOT read | 0 | Peek only to see competitors |
| spacetelescope/jdaviz | BSD-3 | 2026-11-13 | 179 stars | Notebook viewer widgets | 0 | SKIP |

### 3.3 Orbital mechanics and solar-system bodies

| Candidate | Licence | Last | Traction | Gives us | Hrs | CORS | Verdict |
|---|---|---|---|---|---|---|---|
| poliastro | MIT | pushed 2023-10-14; repo **archived** | 1,018 stars; 9.9k/week | Orbit objects | n/a | n/a | SKIP (archived, PyPI 2022) |
| hapsira (poliastro fork) | MIT | 2024-05-09 | 44 stars; 582/week | Same | n/a | n/a | SKIP |
| REBOUND | **GPL-3.0** | 5.2.2, 2026-10-05; pushed 2026-11-03 | 1,161 stars; 22k/week | N-body and Kepler integration. A **rebound 4.4.7 wheel exists in Pyodide 314.0.8** (192 kB) VERIFIED; the repo also has a `web_client/` dir with an emscripten build (`shell_rebound_webgl.html`; its age not checked) | 6 to 10 | n/a | MAYBE for ambitious: GPL-3 can taint a bundle; running it as a separate Pyodide package loaded on demand is the safe way. UNVERIFIED that this legally isolates it, ask a human |
| Skyfield | MIT | 1.55, 2026-08-07 | 1,806 stars; 166k/week | Offline planets, comets and asteroids from MPC elements, Earth position, light time. Not in Pyodide lock (VERIFIED absent) | 3 | n/a | USE offline to precompute ephemerides; MAYBE |
| JPL Horizons API | NASA, public | live | n/a | Exact positions of asteroids, comets, spacecraft (SPHEREx itself is NAIF target UNVERIFIED) | 2 (via our proxy or a pre-bake) | **no ACAO header** VERIFIED (HTTP 200, none) | USE only server-side or pre-baked |
| JPL SBDB API | public | live | n/a | Orbital elements (a, e, i, ...) for 433 etc. | 2 | **no ACAO** VERIFIED | USE pre-baked |
| JPL SB-Ident API | public | live | n/a | "Which known small bodies are in this field" | 2 | no ACAO (the note says so; my probe got 400 with my guessed parameters, header not seen) | USE pre-baked or via proxy |
| IMCCE SkyBoT cone search | free service, terms UNVERIFIED | live | n/a | Known asteroids/comets in a cone at an epoch, JSON | 4 | **`access-control-allow-origin: *`** at `ssp.imcce.fr/webservices/skybot/api/conesearch.php` VERIFIED; the older `vo.imcce.fr/...skybotconesearch_query.php` gave 403 | **USE** the `ssp.imcce.fr` endpoint |
| IMCCE Miriade ephemeris | free; acknowledgement text exists on the site (UNVERIFIED wording) | live | n/a | Ephemerides for named bodies in JSON | 3 | **ACAO `*`** VERIFIED (`ssp.imcce.fr/webservices/miriade/api/ephemcc.php`) | **USE** |
| IRSA Moving Object Search Tool | IRSA | live | n/a | Checks solar system objects in IRSA images | 0 | not probed | SKIP; SkyBoT covers it |
| MPC MPEph | public | live | n/a | Ephemeris pages | 0 | ACAO `*` on the HTML page VERIFIED; API terms unchecked | MAYBE |
| JPL CAD API (close approaches) | public | live | n/a | Close-approach data | 0 | no ACAO | SKIP |

### 3.4 Moving-object and change-detection codes

| Candidate | Licence | Last | Traction | Learn from it | Hrs | Verdict |
|---|---|---|---|---|---|---|
| KBMOD (`dirac-institute/kbmod`) | BSD-2 | pushed 2026-11-13; release v1.1.0 2023-04-20 (latest release tag shown; main is much newer) | 62 stars | GPU shift-and-stack along trial velocities. The method is what a student "stack along a line" lesson shows | 0 (read) | Inspiration, SKIP as dependency (needs GPU) |
| THOR (`moeyensj/thor`) | BSD-3 | pushed 2026-05-12 | 47 stars | Tracklet-free linking via test orbits | 0 | SKIP |
| HelioLinC3D (`heliolinx/heliolinx`, formerly `lsst-dm/heliolinc2`) | BSD-3 (new), none (old) | pushed 2026-11-12 / 2024-04-21 | 2 / 16 stars | Tracklet linking by heliocentric hypotheses; Rubin docs page found | 0 | SKIP |
| shifty (`matthewjohnpayne/shifty`), Xstack | MIT | 2022 / 2026-10 | 1 / 8 stars | Tiny shift-and-stack examples | 0 | SKIP; a 15-line numpy roll-and-median is enough |
| WiseView (`backyardworlds/wiseview`) | licence field empty | 2021-09-01 | 3 stars | The source of the tool behind Backyard Worlds, Python/Django server making flipbooks | 0 | Inspiration; note 02 covers it. No licence: do not copy code |
| unTimely catalog explorer (`fkiwy/unTimely_Catalog_explorer`) | MIT | 2026-05-24 | 17 stars | Time-resolved unWISE catalogue viewer | 1 (read) | MAYBE for the "motion over 15 years" idea |
| Backyard Worlds flipbooks (`coolneighbors/flipbooks`) | none | 2024-08-02 | 1 star | Flipbook generation | 0 | Inspiration |
| `oklo/planet-nine-search` | MIT | 2026-11-08 | 0 stars | Unknown, NOT read | 0 | ignore |

I found no maintained JavaScript implementation of any of these. Note 06 already says Planet Nine is not detectable by SPHEREx; none of these codes changes that.

### 3.5 Catalogues and data APIs (CORS probed today with `Origin: https://example.org`)

| Service | CORS | Terms | Gives us | Verdict |
|---|---|---|---|---|
| Gaia ESA TAP (`gea.esac.esa.int/tap-server/tap`) | **no ACAO** (HTTP 200, no header) | ESA open, cite Gaia | PM, parallax, G mag | USE server-side or pre-bake per target |
| Gaia at VizieR TAP (`tapvizier.cds.unistra.fr`) | probe returned no response today | n/a | same | UNVERIFIED, retry |
| SIMBAD TAP | `simbad.cds.unistra.fr/simbad/sim-tap` returned **404** today (consistent with note 06: unreachable) | CDS acknowledge | Names, pm, plx, SpT | Pre-bake for the 5 targets; fall back to Sesame |
| CDS Sesame name resolver (`cds.unistra.fr/cgi-bin/nph-sesame/-oI/...`) | **ACAO `*`** on the 302 response | CDS | Name to coordinates | USE |
| IRSA TAP / Gator (CatWISE, 2MASS, AllWISE) | **no ACAO** | IRSA open | CatWISE pm; fp_psc | pre-bake or proxy |
| NASA Exoplanet Archive TAP | **no ACAO** | NASA open | Exoplanet context, Epsilon Indi Ab | MAYBE pre-bake; low priority |
| AAVSO VSX API (`vsx.aavso.org/index.php?view=api.object&ident=...&format=json`) | **ACAO `*`** VERIFIED (200); `www.aavso.org` pages return 403 to curl | Free; citation request, light-curve data via account (UNVERIFIED) | Period, spectral type, V range of R Dra and RW Aur | **USE** for metadata. Raw light curves: UNVERIFIED how to fetch without a login |
| Legacy Survey cutouts (`legacysurvey.org/viewer/cutout.jpg`) | **ACAO `*`** VERIFIED | Public data, credit DESI Legacy Surveys | Optical backdrop (DR10) | USE |
| unWISE cutouts (`unwise.me/cutout_fits`) | **ACAO `*`** VERIFIED | Public, cite Lang 2014 | WISE W1/W2 FITS at time-resolved epochs (NEO7). Parameters I used returned 200 | **USE** |
| hips2fits (CDS) | **ACAO `*`** present; my test URL returned 404 (my parameters, not the host) | CDS | Reprojected HiPS cutouts | USE after re-testing the URL from note 07 |
| NASA Image and Video Library (`images-api.nasa.gov`) | **ACAO `*`** | NASA media guidelines (mostly public domain, check per item) | SPHEREx images and captions | MAYBE |
| NASA open APIs (`api.nasa.gov`) | ACAO echoes the origin; DEMO_KEY returned 500 | Needs key | APOD etc. | SKIP |
| archive.stsci.edu MAST | ACAO `*` on `/vo/mast_tap` (404 path) | public | Not needed | SKIP |

### 3.6 Citizen-science and education

| Candidate | Licence | Last | Traction | Gives us | Hrs | Verdict |
|---|---|---|---|---|---|---|
| Zooniverse front-end monorepo (`zooniverse/front-end-monorepo`) | Apache-2.0 | 2026-11-13 | 112 stars | Classification UI patterns; also the older `Panoptes-Front-End` (Apache-2.0, 68 stars, pushed 2026-10-26) | 0 to 40 | SKIP to embed, too heavy for a weekend; link to Backyard Worlds as the next step |
| Zooniverse Panoptes API (`zooniverse/panoptes`) | Apache-2.0 | 2026-11-05 | 116 stars | Backend | 0 | SKIP |
| Backyard Worlds: Planet 9 | project content, terms UNVERIFIED | live | n/a | Brand and flipbook concept; the project "Backyard Worlds: Planet 9" itself | 0 | Link, do not copy |
| OpenStax Astronomy 2e | **CC BY-NC-SA 4.0** VERIFIED on the preface page | 2e | n/a | Glossary, definitions, figures | 2 | USE with attribution and share-alike; non-commercial only, flag if the team ever monetises |
| NASA SVS, NASA STEM | NASA media usage: generally public domain, per-asset credits (UNVERIFIED for each) | live | n/a | Animations, classroom activities | 1 | MAYBE |
| Astropy tutorials (`astropy-learn/astropy-tutorials`) | BSD-3 | 2026-11-09 | 356 stars | Worked notebooks on LombScargle, coordinates | 1 | Reference |

I did not locate an open-licence classroom activity on proper motion with a reusable dataset. Not found, not checked beyond one search.

### 3.7 Real science code in the browser

Verified from the Pyodide 314.0.8 lock file and the jsDelivr CDN today:

| Item | Size (bytes) | Note |
|---|---|---|
| `pyodide.asm.wasm` | 9.60 MB | runtime |
| astropy 7.2.0 wheel | 5.99 MB | note: PyPI is at 8.0.2 but Pyodide ships 7.2.0 |
| numpy 2.4.6 | 2.96 MB | |
| scipy 1.18.0 | 14.03 MB | only if needed |
| pyerfa | 0.24 MB | astropy dependency |
| rebound 4.4.7 | 0.19 MB | available |
| sympy 1.14.0 | 4.19 MB | available |
| Not in the lock | | lightkurve, skyfield, photutils, sep, pint, astroquery, reproject |

So "astropy in the browser" is about 19 MB (runtime + astropy + numpy + erfa) without scipy, 33 MB with scipy, plus `astropy-iers-data`. Pyodide is MPL-2.0 (VERIFIED), 14.9k stars, npm 869k/week. Load time on a school connection: UNVERIFIED, I did not measure; expect several seconds on a warm cache and well over 10 s cold. Consistent with note 07 (reject for the main path). Cost is justified only for one opt-in "Run the real astropy code" button, which would make a good judge demo (`LombScargle` or `apply_space_motion` on the same numbers the JS shows). JupyterLite (`jupyterlite/jupyterlite`, BSD-3, 4.9k stars, pushed 2026-11-13) is the same engine with a notebook UI: MAYBE for the "explore freely" stage, 6 hours.

---

## 4. Real-user evidence

| Pick | Evidence found |
|---|---|
| astronomy-engine | 467k weekly downloads, 74 npm dependents VERIFIED. No specific thread read. |
| astropy LombScargle | Stack Overflow thread "longest period recoverable using the Lomb-Scargle periodogram" (question 77047432): unanswered, shows the Nyquist and baseline pitfalls students will hit. Relevant to us: our baseline is 1.5 years, so Mira periods near 245 d (UNVERIFIED value) are barely 2 cycles |
| SPHEREx | Hacker News thread 43869627 on the launch announcement (16 points, 1 comment): nothing technical |
| Others | None found for SkyBoT, Miriade, AAVSO, unWISE. I say so rather than inventing |

---

## 5. Physics cheat sheet

Units: use degrees for sky positions, milliarcseconds per year (mas/yr) for proper motion, parsecs for distance, km/s for velocity, micrometres for wavelength, Jy and AB magnitudes for flux. SPHEREx pixel is about 6.2 arcsec (derived from note 06: Barnard 10.3 arcsec/yr gives 2.47 px in 1.5 years; the instrument value is UNVERIFIED).

| Law | Formula | Units | Implemented by |
|---|---|---|---|
| Proper motion propagation | Δα cos δ = μα* Δt; Δδ = μδ Δt; for exact results include parallax and radial velocity | mas/yr, years | astropy `SkyCoord(..., pm_ra_cosdec, pm_dec, distance, radial_velocity).apply_space_motion(new_obstime=...)`; JS: 5 lines, flat sky is fine for under 1 degree |
| Parallax distance | d[pc] = 1000 / ϖ[mas] | mas to pc | astropy `Distance(parallax=...)`; note Gaia parallax zero-point offset about -0.017 mas (UNVERIFIED value), irrelevant for nearby stars |
| Tangential velocity | v_t = 4.74047 μ[arcsec/yr] d[pc] km/s | | astropy: `(mu * d).to(u.km/u.s, u.dimensionless_angles())`; constant 4.74047 (UNVERIFIED digits, equals 1 AU/yr in km/s) |
| Blackbody | B_λ(T) = (2hc²/λ⁵) / (exp(hc/λkT) − 1) | W sr⁻¹ m⁻³ | astropy `modeling.models.BlackBody`; `astropy.constants` or `scipy.constants` for h, c, k |
| Wien's law | λ_max T = 2897.77 μm K | μm, K | `scipy.constants.Wien` (2.897771955e-3 m K, UNVERIFIED digits); SPHEREx covers 0.75 to 5 μm, so peak T between about 580 K and 3,900 K is in range; WISE 0855 (about 285 K, UNVERIFIED) peaks near 10 μm and is only seen in its Wien tail |
| AB magnitude | m_AB = −2.5 log10(f_ν / 3631 Jy) | Jy | `astropy.units.ABmag` and `u.Jy` conversions (`.to(u.ABmag)`) |
| SPHEREx image units | image is surface brightness in MJy/sr; flux = Σpixels × Ω_pix; Ω_pix from the solid-angle-pixel-map ancillary file | MJy/sr | IRSA `spherex_intro` and `spherex_cutouts` tutorials (reference, not read line by line) |
| Inverse-square law | F = L / (4π d²); m₁ − m₂ = −2.5 log10(F₁/F₂); distance modulus m − M = 5 log10(d / 10 pc) | | 1-line numpy; astropy `Distance.distmod` |
| Lomb-Scargle period | peak of the periodogram power over frequency; phase = ((t − t0) / P) mod 1 | days | astropy `timeseries.LombScargle(t, y, dy).autopower()`; `.fold(period=...)` on `TimeSeries`; JS port needed |
| Mira period-luminosity | M_K = a (log10 P − 2.38) + b, with a about −3.5 and b about −7.2 from Whitelock et al. 2008 (**UNVERIFIED, from memory, check the paper before putting numbers on screen**) | days, mag | none; 2 lines in our own code |
| Kepler's third law | P² = a³ (years, AU, solar masses) | | 1 line |
| Kepler equation | M = E − e sin E, solve for E by Newton iteration; then true anomaly and position | rad | astronomia has a solver (MAYBE); 10 lines of TS; skyfield for offline |
| Light-travel time | t = d / c; 1 AU = 499.0 s; 1 pc = 3.26 ly | | astropy constants; `astronomy-engine` applies light-time in `GeoVector`; Barnard's Star (about 1.83 pc, UNVERIFIED) is 6 ly |
| Stacking and S/N | σ_stack = σ/√N for a mean; a median is about 1.25 times noisier; S/N ∝ √N | | `astropy.stats.sigma_clipped_stats`, numpy median; simple-statistics in JS |
| Saturation | pixel NaN/flags; core lost; photometry from wings (doc 09 ring profile) | | FLAGS plane (OVERFLOW, BLOOM, GHOST, SATURATED per note 06); no library |
| Centroid precision | σ_centroid ≈ FWHM / (2.355 × S/N) | arcsec | `photutils.centroids`; doc 09 measured 0.1 to 0.26 arcsec for Epsilon Indi B |

---

## 6. Suggested combinations

**Safe (about 12 hours, all CORS-clean, almost no new dependencies).** astropy-computed answer keys + astronomy-engine for Earth/planet positions + simple-statistics + KaTeX formulas. A student: sees Barnard's Star move by 2.5 pixels, measures the shift in arcsec, converts to mas/yr, compares to the Gaia value shown, derives v_t with the 4.74 formula, and checks the answer against the key. Parallax is shown as an animation (Earth around the Sun, from astronomy-engine), not measured.

**Balanced (about 30 hours).** Safe + ml-levenberg-marquardt (Planck fit) + own Lomb-Scargle port + AAVSO VSX periods + SkyBoT/Miriade overlay + unWISE/Legacy backdrop. A student: fits a blackbody to an exposure-by-exposure spectrum of Barnard's Star or Epsilon Indi B and reads a temperature; folds R Dra on its catalogue period and runs a periodogram; turns on the asteroid overlay to see predicted tracks across SPHEREx frames; flips between 2010 WISE and 2026 SPHEREx to see 16 years of motion.

**Ambitious (about 60 to 80 hours; not for tomorrow).** Balanced + an opt-in Pyodide button ("run the astropy code live") + REBOUND in Pyodide for a solar-system sandbox + a parallax-fit mission. A student: runs the real `LombScargle` and `apply_space_motion` in the page; drops a comet on an orbit and watches Kepler's laws appear; fits a parallax ellipse to centroid tracks.

---

## 7. Ambitious science ideas, with cost and honesty

| Idea | Rough cost | Caveats |
|---|---|---|
| **Measure parallax from SPHEREx alone** (centroid track of Epsilon Indi B, then of WISE 0855, fitted with proper motion plus parallax ellipse; parallaxes about 0.27 and 0.44 arcsec UNVERIFIED) | 8 to 12 h (photutils offline; fit in JS with levenberg-marquardt) | Doc 09 gives 0.1 to 0.26 arcsec per-exposure scatter, comparable to the signal, so only a stack of dozens of exposures can work; SPHEREx's orbit baseline is Earth-orbit sized so the ellipse is real. Unproven: run offline first and only ship if the fit matches Gaia within error. Biggest wow if it works |
| **Temperature of a brown dwarf from its SPHEREx spectrum** | 5 h | Brown dwarfs are not blackbodies (molecular bands); a fit gives a "colour temperature" off by hundreds of K. Say so on screen; it is a teaching approximation |
| **Mira period from SPHEREx plus AAVSO** | 6 h | SPHEREx alone covers 1.5 years of a period near 245 d (UNVERIFIED) and the LVF wavelength sweep contaminates brightness (doc 09 point 9). Use AAVSO for the long baseline and SPHEREx as a few flux points at matched wavelength |
| **Asteroid blink with prediction check** (SkyBoT predicted track vs observed object across exposures) | 6 h | Only objects bright enough in SPHEREx; only works within a pass (doc 06 point 3) |
| **Run the same code live (Pyodide)** | 6 h | 19 to 33 MB download, load time not measured |
| **15-year motion with unWISE** | 4 h | unWISE and SPHEREx wavelengths differ; do not compare brightness, only position |
| **A "Kepler sandbox" with REBOUND** | 10 h | GPL-3, Pyodide boot cost; separate from the science of the five targets |

---

## 8. Licence and attribution checklist

- astropy, photutils, astroquery, reproject, specutils: BSD-3, keep notice, cite Astropy Collaboration papers.
- astronomy-engine MIT, astronomia MIT, simple-statistics ISC, ml-levenberg-marquardt MIT: keep licence text in the build output.
- Aladin Lite LGPL-3.0: load as its own module, keep its notice and a link to the source.
- REBOUND GPL-3.0: do not bundle into the app; if used, only as an on-demand Pyodide package and credit it. Ask before shipping.
- Pyodide MPL-2.0: file-level copyleft, no problem when used unmodified.
- IRSA tutorials BSD-3: ok to adapt code with notice.
- WiseView, freddavies/spherextract: no licence file: read only, do not copy.
- OpenStax Astronomy 2e: CC BY-NC-SA 4.0: attribution, non-commercial, share-alike on derivatives.
- TheorIA CC BY 4.0, Physics Derivation Graph content CC BY 4.0, its code GPL-2.0: not used.
- Gaia: cite Gaia DR3 and the ESA acknowledgement. SIMBAD/VizieR/Sesame: CDS acknowledgement text. IRSA data: SPHEREx and IRSA acknowledgement text. Legacy Surveys and unWISE: credit lines. IMCCE SkyBoT and Miriade: acknowledge IMCCE and keep usage polite (rate limit values UNVERIFIED). AAVSO VSX: acknowledge AAVSO.
- The hackathon context: check whether NC-licensed material (OpenStax) is acceptable if the project becomes a product.

---

## 9. What I could not verify

- Which repo the team lead means; no single "laws of physics" repo exists in what I searched. The AI Feynman data page is now a 404, so data licence unknown.
- Pyodide cold and warm load time (no browser measurement).
- SIMBAD TAP and VizieR TAP behaviour: both returned nothing or 404 today, so their CORS status is unknown. Gaia ESA and IRSA TAP have no ACAO header.
- SB-Ident and CAD parameter probes (400 with my guessed parameters; header itself not recorded).
- IMCCE usage terms and rate limits; AAVSO terms and how to download raw light curves.
- Contents of `banados/spherex-tools`, `SPIFF`, `spherextract`, `SPHEREx-Blink-3.0` (not read, only metadata). The last one is a possible competitor, updated today.
- Mira PL coefficients, 4.74047 digits, parallax values, WISE 0855 temperature, R Dra period: from memory, marked UNVERIFIED; cite from a paper before showing numbers.
- KBMOD, THOR and HelioLinC code quality (README level only, no issue threads read). I read no user threads for most picks.
- `astronomy-engine` accuracy figure and that it applies aberration in `GeoVector` (documented claim from memory).
- How `astronomia` reaches 1.49M weekly downloads (likely a dependency).
- rebound `web_client` age and whether the Pyodide rebound works with current API.
