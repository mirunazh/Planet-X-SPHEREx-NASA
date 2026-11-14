# Direction A, "Plate": notes (14 November 2026)

## State

Per the coordinator's scope change, S1, S2 and S3 are built, screenshotted, looked at and revised. S4 and S5 were not built to the bar, and axe-core was not run (both skipped on instruction).

- Built and reviewed: S1 `#/`, S2 `#/look`, S3 `#/measure`. Also shot: S1 in Romanian, S1 with Real pixels, and S2 in the darkroom theme (that shot is S5 in effect, but it was not given a separate critique pass).
- Drafted, NOT reviewed and NOT screenshotted: `#/elsewhere` (S4). It renders the real WISE 0855 field and the four other targets, but nobody has looked at it. Treat it as unbuilt.
- Not run: axe-core (installed in `node_modules`).

## Run it

From the repository root, a static server (one is already on 3302): `python3 -m http.server 3302 --bind 127.0.0.1`, then open `http://127.0.0.1:3302/design/a-plate/`. The page fetches `/assets/missions/...` and `/docs/research/experiments/exp13_parallax_epsindb.json`, so it must be served from the repository root. It makes no other request; the fonts are in `fonts/`.

Screenshots: `cd design/a-plate && node tools/shoot.mjs` (all) or `node tools/shoot.mjs s1 s2` (some); `FULL=1` adds full-page review copies of S3. It uses `playwright` 1.56.1 from `node_modules` with the cached Chromium 1194, downloads nothing, and logs any page error or horizontal overflow (none at the last run).

Files: `index.html`, `css/plate.css`, `js/plate.js` (working title in `NAME`), `tools/shoot.mjs`, `shots/`.

## Routes and URL parameters

Routes: `#/` (S1), `#/look` (S2), `#/measure` (S3), `#/elsewhere` (S4 draft). The darkroom theme is `?theme=dark`.
Parameters: `lang=ro`, `theme=dark|light`, `play=0` (no autoplay on S1), `flip=1` (S1 starts on the last visit), `visit=0..4` (S2), `marks=moved,first,stars` (S2 markers; the default is `stars`), `term=1` (opens the S2 glossary entry), `view=neg|pos`, `real=1` (Real pixels), `plx=<mas>` (S3 slider).

## What is built

- **The plate** (one component on every screen): the real frame mounted like a photographic plate. A 1 px ink edge, a soft shadow (light theme only), registration crosses at the four corners, the plate label printed in the top margin and the scale bar or tone legend in the bottom margin. Negative (dark stars on a light plate) by default in the light theme; positive in the darkroom.
- **S1:** headline, lead and one red action ("Find what moved"), plus a quiet link. The hero is the live blink: one large three-cell control (Then, date | Hold to blink | Now, date). Press and hold (pointer) or hold Space anywhere on the screen to see Now; let go to see Then. A tap or Enter latches it (`aria-pressed`). The flip is instant, with no cross-fade. Autoplay blinks every 1.1 s on S1 only, never under `prefers-reduced-motion`, and a visible "Pause the automatic blink" text button stops it.
- **S2:** the film. A time ruler with month ticks and the five visits at their real, uneven dates. A native range input over it snaps to the nearest visit, and arrow, Home and End keys step visit by visit; `aria-valuetext` reads "Visit 3 of 5, 12 October 2025". Earlier / Play / Later sit in a ruled button strip; left and right arrow keys also work anywhere on the page. The visit facts are a `dl`: visit n of 5, date range, "Near infrared, just past red light" with the wavelength range in microns, and photos added together, which opens a glossary entry in place (Esc closes it). Three marker toggles each pair a shape with a label: a red ring on the mover, an ink cross at its visit 1 position, and finding-chart ticks on the stars that stay put. Margin pointers on the top and left edges show the mover's x and y (red filled for now, hollow ink for visit 1). The plate view offers Negative or Positive radios and a Real pixels checkbox.
- **S3:** a close-up plate with mark 1 (ink cross) and mark 2 (small red ring) joined by a dashed trail, and a ruled logbook table of the marks. The measured rate is 4.58 arcsec a year against the catalogue's 4.68 ("2 percent below the catalogue: close"). The parallax slider is a native range with a visible value, a distance readout and a misfit number, and it redraws a plain SVG chart of the five pass means with error bars and the model curve. A results table compares 306 ± 28 mas, 10.7 ly and 72.5 km/s against 270.7 mas, 12.05 ly and 82.0 km/s, with an honest paragraph on the 12 percent gap. On a phone the table stacks.
- **Language:** English and Romanian for the header, S1 and every S2 instrument label (diacritics ă â î ș ț render in all three fonts). S3 and S4 stay English and carry `lang="en"`.
- Skip link, landmarks, one `h1` per screen, focus moves to the `h1` on route change, a 3 px ink focus ring, 44 px or larger targets, and a polite status region that announces the visit on manual steps.

## Image: crop, stretch, ramp, upscale

- Data: Epsilon Indi B, group d2 (1.1 to 1.65 microns), the five stack files from `manifest.json`.
- **Crop (S1, S2):** 52 x 52 grid pixels = 156 arcsec, columns 47 to 98 and rows 36 to 87 of the 121 px field. The mover sits left of centre on the same row as two fixed stars, at grid (83,59) and (95,59), about 28 and 37 sigma. A fainter fixed star at (60,79), about 11 sigma, sits lower left. The plate canvas is 600 CSS px on desktop, so the 6.54 arcsec jump between the first and last visit is **25.2 screen px** (measured in the browser). On a 390 px phone it is about 13.5 px.
- **Crop (S3 close-up):** 24 x 24 grid pixels = 72 arcsec, columns and rows 48 to 71, so the two marks sit about 38 px apart at 424 px.
- **Stretch:** asinh, as in the manifest formula, with plate parameters. The black point is the frame's median plus 0.5 x the manifest sigma (this lifts background noise out of view; the raw manifest stretch made the sky a grey fog). The top is the manifest `vmax` (5.81) and the softening is 0.05 (manifest: 0.0227). For the S3 close-up, the top is 1.05 x the crop's peak and the softening is 0.4, so the saturated core keeps a gradient.
- **Ramp:** 256-entry lookup tables. Negative: plate white `#FCFAF5` to ink `#141310` through warm greys. Positive: `#0E0D0B` through a deep red `#4A1A14` and `#C4785C` to `#FFF9EC` (the darkroom's safelight). Each plate carries a legend bar and the line "Real photo, only enlarged and toned. Darker (or Lighter) means brighter in infrared."
- **Upscale:** a separable Catmull-Rom bicubic on the stretched values, at 16 canvas px per grid pixel (832 px canvas), with a 2 px border read from the full frame. Real pixels draws the 52 grid pixels with `image-rendering: pixelated`.

## Data facts used (all from the manifests and exp13; none invented)

Visit mid dates (from `mjdMid`): 27 April 2025 and 1 October 2026 for the first and last visits; the older notes said 26 April and 30 September, which is a rounding difference. Ranges: 24 April to 4 May 2025 (19 photos), 6 to 7 June 2025 (13), 1 October to 8 November 2025 (30), 24 to 30 April 2026 (7), 28 September to 2 October 2026 (24). Motion 6.54 arcsec in 1.43 years = 4.58 arcsec a year; Gaia 4.68. Parallax fit 306 ± 28 mas (exp13 `best_fit_pm_fixed`), 10.7 ly, 72.5 km/s (Gaia motion with the team's distance); catalogue 270.7 mas, 12.05 ly, 82.0 km/s. The chart's model curve uses a low-precision Sun position (within about 0.01 of the exp13 factors).

Mocked: the student's two marks are the pipeline centroids, not clicks (no click-to-mark yet). The S3 shot sets the slider to 306 from the URL.

## Review (what was looked at and fixed)

Every desktop and phone screenshot was opened and judged. Fixes, in order:
1. The sky read as a mottled grey fog because the stretch lifted the noise. The black point was raised and the knee softened (see above): now a clean plate with soft points.
2. The S1 hold control fell below the fold and the plate label cost a row. The plate label moved into the plate's top margin and the tone legend into the bottom margin; the whole hero, control included, now fits 1440 x 900.
3. S2's player sat below the fold. Ruler, strip and hint moved into the right column under the lead; the visit facts follow.
4. On a phone the plate came after all the text. The order is now headline, plate, control or player, then the rest. The header was cut to one row (the darkroom toggle becomes a 44 px box with a hidden label).
5. The headline broke as "24-year-/old". The phrase is kept together.
6. An i18n bug blanked every element whose key had no string, which hid the S3 heading, lead and table headers. Fixed with a guard.
7. The S3 marks drowned in the saturated core, and the label halos drew white boxes. Fixed with the close-up crop and stretch, a small ring and the correct halo width.
8. The range thumb covered the "Oct" label, the S1 hint wrapped, the phone ruler labels collided, the S3 phone table wrapped values, the positive-view legend said "Darker", and the Romanian legend was clipped. All fixed.

Checked in the browser (playwright): holding Space shows Now and releasing shows Then; Enter latches; two ArrowRight presses on the range give "Visit 3 of 5, 12 October 2025"; no page errors; no horizontal overflow at 390 px.

## axe-core

Not run (skipped on the coordinator's instruction). The next step is to inject `node_modules/axe-core/axe.min.js` on each route and assert zero serious or critical findings.

## Open issues

- S4 is drafted but not reviewed; S5 (dark S2) has a screenshot (`s2-dark-*`) but no critique pass of its own.
- No click-to-mark on S3 yet (the marks are centroids), and no difference view.
- The phone jump is about 13.5 px; a phone-only tighter crop would raise it, at the cost of the second fixed star.
- Glossary wording is from `packages/missions-core/src/content/glossary.ts`, lightly shortened; Romanian beyond S1, the header and the S2 labels is not done.
- Contrast (WCAG 2.x, computed by the previous worker, tokens unchanged). Light: paper `#F3EEE2`, sheet `#E7E1D2`, ink `#1B1A17` (15.03 on paper), muted `#5A5448` (6.49), rule `#6F6858` (4.78, non-text), red `#B3261E` (5.65; paper on red 5.65), link `#1F4E8C` (7.18). Darkroom: ground `#14130F`, text `#EDE7D8` (15.07), muted `#B3AB9A` (8.15), rule `#8C846F` (5.00), red `#F2766B` (6.71), link `#9DB8E8` (9.25). The tone ramps are image content, not text; marker strokes carry a 2 px paper halo. Fonts: Newsreader, Atkinson Hyperlegible Next and Mono, self-hosted in `fonts/` with their OFL licences.
