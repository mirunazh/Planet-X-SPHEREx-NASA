# missions-core

Pure TypeScript logic for the guided measuring missions of the SPHEREx time viewer. It takes a `mission-manifest/1` object (see `docs/ARCHITECTURE.md`) and the pixel frames a student looks at, and answers the questions a mission needs: where did the student click, how fast did the object move, how far away is it, how close is the answer to the true value, and how does a student share the result. No runtime dependencies, no network, no DOM; it runs in a browser, in Node and in tests. ES modules, strict TypeScript.

Status: done and tested (32 tests pass, type check clean, ran on 14 November 2026). Wiring it into `web/` is in progress; at the time of writing no screen uses it yet.

## What it does

A mission has four steps: **Watch** (see the object move), **Measure** (click it in two epochs), **Hunt** (find it from its motion), **Report** (share the result). This package supplies the maths and the words for those steps:

1. **Click to centroid.** A click lands within a pixel or so of the object; `refineCentroid` moves it to the flux-weighted centre within a 4-pixel (12 arcsecond) radius, estimates the signal-to-noise ratio, and flags problems (`no-signal`, `faint`, `edge`, `saturated-core`, `mostly-nan`). Bright stars like Barnard's Star have a saturated core stored as `NaN`; the centroid is then measured from the wings and flagged.
2. **Motion.** `motionBetween` (two epochs) or `fitMotion` (three or more) gives east and north offsets, rate in arcseconds per year, direction (position angle, degrees east of north) and errors.
3. **Distance and speed from parallax** (Epsilon Indi B only). `fitParallaxFixedPm` is the classroom fit: the proper motion is fixed to Gaia's value, one parameter (the parallax) is free. `distancePc = 1 / parallax in arcseconds`; `tangentialVelocityKmS = 4.74047 x rate x distance`.
4. **Brightness changes** (RW Aurigae, R Draconis). Aperture photometry, ratios against a control star at matched wavelength, magnitude differences and light-curve folding.
5. **Scoring.** `compare` and the `score*` helpers compare a student's number with two references: the pipeline's own measurement and the literature value. A tier of `inside` (within the error bar), `close` (within 10 percent) or `try-again` comes back with reasons, so the app can explain a miss.
6. **Report in a link.** `encodeReport` turns a finished mission into a base64url string of at most 4,096 characters with no personal data (mission, group, frames viewed, clicks, derived numbers, the truth it was compared with, app version). `decodeReport` validates all of it and returns an error code instead of throwing.
7. **Content.** `missionScript` builds the four steps with instructions, hints and explanations from the manifest's real numbers; `GLOSSARY` has plain-language definitions. The texts were written for students and still need a human edit (lane L3).

## Honesty rules (built into the content and the scoring)

- Barnard's Star is flagged as a saturated core; its measured motion reads about 13 percent low (9.05 against 10.39 arcsec per year), so the graded mission is Epsilon Indi B.
- The parallax mission runs only on Epsilon Indi B. WISE 0855 and Barnard's Star give no measurable parallax with the data on hand.
- Scoring always shows the pipeline value and the literature value, and the reference error bar, rather than one "right answer".

## API

Everything is exported from `src/index.ts`.

| Module | Exports |
|---|---|
| `grid` | `gridToSky`, `skyToGrid`, `offsetArcsec`, `positionAngleDeg`, `angleDiffDeg`; types `Grid`, `Sky`, `Offset`. The 121 x 121 px, 3 arcsec/px, TAN, north-up, east-left grid of the manifests. |
| `centroid` | `refineCentroid(frame, width, height, x, y, radiusPx = 5)` returning `{ x, y, snr, flux, background, nanFraction, flags, reliable }`; `apertureSum`, `annulusStats`, `disc`, `median`; constants `CENTROID_RADIUS_PX = 4`, `SNR_APERTURE_PX = 3`, `ANNULUS_PX = [6, 10]`, `MIN_SNR = 5` (the same values as `pipeline/science.py`). |
| `motion` | `motionBetween(p1, p2)`, `fitMotion(points)` on `Epoch = { ra, dec, year, errEast?, errNorth? }`. |
| `parallax` | `fitParallaxFixedPm(points, muE, muN, t0)`, `chi2AtParallax`, `modelAt`, `distancePc`, `distanceLy`, `tangentialVelocityKmS`; constants `T0` (2026.0), `KM_S_PER_AU_PER_YEAR`, `LY_PER_PC`. |
| `photometry` | `apertureFlux`, `ratioToControl`, `binPoints`, `binRatio`, `deltaMag`, `lightCurvePoints`, `foldPhase`. |
| `score` | `compare(answer, reference)`, `scoreMotion`, `scoreParallaxMas`, `scoreDistance`, `scoreSpeed`, `scoreRatio`, `pipelineRate`, `literatureRate`; constants `CLOSE_PERCENT = 10`, `CLOSE_ANGLE_DEG = 15`; types `Tier`, `Reason`, `Comparison`, `Score`. |
| `report` | `encodeReport`, `decodeReport`, `REPORT_VERSION = "mission-report/1"`, `MAX_ENCODED_LENGTH`, `MAX_FRAMES`, `MAX_CLICKS`, `QUANTITIES`; types `MissionReport`, `DecodeResult`. |
| `manifest` | Types `Manifest`, `Group`, `Pass`, `MoverTruth`, `ParallaxProduct`, `ParallaxPoint`; `MISSION_GROUPS`, `MISSION_IDS`, `moverTruth`, `group`. |
| `content/missions` | `missionScript(manifest, parallax?)`, `missionFacts`, `MISSION_ORDER` (`epsindb`, `barnard`, `wise0855`, `rwaur`, `rdra`), `STEP_ORDER`, `STEP_TITLE`, `PITCH`, `TIER_TEXT`, `REASON_TEXT`, `SOURCE_TEXT`, `FLAG_TEXT`. |
| `content/glossary` | `GLOSSARY` |

### Example

```ts
import { refineCentroid, motionBetween, scoreMotion, encodeReport } from 'missions-core';

// frame: Float32Array(121 * 121) read from assets/missions/epsindb/stacks/d2_p0.f32
const c0 = refineCentroid(frame0, 121, 121, clickX0, clickY0);   // student's click, rounded
const c1 = refineCentroid(frame4, 121, 121, clickX1, clickY1);
// convert grid pixels to sky with gridToSky(manifest.grid, x, y), then:
const motion = motionBetween(epoch0, epoch1);                    // rate in arcsec per year
const score = scoreMotion(manifest, { value: motion.rate, paDeg: motion.paDeg });
console.log(score.headline);                                     // 'inside' | 'close' | 'try-again'
```

## Tests

```sh
cd packages/missions-core
npm install --ignore-scripts --legacy-peer-deps   # this package has no .npmrc, so pass the flag
npm test                                          # vitest run; same as npx vitest run
npx tsc --noEmit                                  # strict type check (also: npm run typecheck)
```

Ran on 14 November 2026: 7 test files, 32 tests, all pass; `tsc --noEmit` clean. `npm 10.9` crashes on vitest's optional peers without `--legacy-peer-deps` (`Cannot read properties of null (reading 'edgesOut')`).

The tests read the **real repository assets** (read-only), not mocks: `assets/missions/<id>/manifest.json`, the stack frames, and `docs/research/experiments/exp13_parallax_epsindb.json` (see `test/data.ts`). Run them from a checkout that has those folders. They check, among others:

- `grid.test.ts`: `gridToSky` reproduces every measured and predicted position in the manifests (the Python build); the round trip is exact; the centre pixel is (60, 60); offsets wrap across RA 0.
- `centroid.test.ts`: from 3 pixels away in four directions a click on Epsilon Indi B lands within 0.2 px of the pipeline centroid (the worker reported 0.001 px at the best case, and 0.015 px on WISE 0855); Barnard's Star's `NaN` core is flagged while the wing centroid still lands near the pipeline's; edge, mostly-`NaN` and empty frames are flagged instead of returning garbage.
- `motion.test.ts`: `motionBetween` reproduces each manifest's truth; `fitMotion` recovers a known rate inside its own error, its error bars cover the truth about 68 percent of the time over 500 seeded trials, and it refuses fewer than three epochs.
- `parallax.test.ts`: the fit on the 93 exposures reproduces 306.18 +- 28.08 mas, 3.266 pc and 72.5 km/s, with chi-squared 235.8766 on 183 degrees of freedom.
- `photometry.test.ts`: aperture flux on a synthetic star; the RW Aurigae series reproduces the manifest ratios; R Draconis chart points carry every light-curve point.
- `score-report.test.ts`: tiers and reasons; the WISE 0855 pipeline answer is inside its error bar; the Epsilon Indi B chain scores inside against the pipeline and close against Gaia; reports round-trip and bad input is rejected with a typed error.
- `content.test.ts`: every mission and group exists in `assets/missions/index.json`; each script runs Watch, Measure, Hunt, Report in order; no number is typed by hand (they all come from the manifest); no em dash; glossary entries are 30 words or fewer.

## Known limits

- Not yet used by any screen of `web/` (wiring in progress).
- The parallax fit needs the precomputed product `exp13_parallax_epsindb.json` (field-star-corrected positions and parallax factors); it does not compute Earth's position itself.
- Mission texts are a first draft written by the AI assistant and need an edit for school students.
