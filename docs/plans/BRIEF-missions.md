# Brief: the measuring missions

Status on 14 November 2026, 19:30 EET: not started. This is the full task, ready to hand to a person or an assistant. Start from branch `wip/spherex-time-viewer`.

## Goal

The educational core of the product: the student watches a star move between two SPHEREx visits, marks it in both, and the app turns the marks into a proper motion, then a distance (parallax), then a speed, each shown next to the true value. No accounts, no personal data: the result lives in a shareable link. The library `packages/missions-core` (dependency `missions-core` in `web`) already holds all the logic. The task is the experience on top of it.

## Read first

- `packages/missions-core/README.md`, `src/` and `test/`: `gridToSky`, `skyToGrid`, `refineCentroid` and its flags, `motionBetween`, `fitMotion`, `fitParallaxFixedPm`, `chi2AtParallax`, `distancePc`, `distanceLy`, `tangentialVelocityKmS`, the `score*` functions and their tiers, `encodeReport`, `decodeReport`, `missionScript`, `missionFacts`, `GLOSSARY`.
- All of `web/src`: canvas, player, time axis, markers, URL state, strings, store.
- `assets/missions/*/manifest.json`: per-visit predicted and measured positions, the `truth` block.
- `docs/research/experiments/exp13_parallax_epsindb.json` and `docs/research/13-parallax-distance-feasibility.md`.
- `docs/research/15-design-language-and-accessibility.md`: section 0 (principles, first-run flow), C4 to C6, D4 (Look, Mark, Measure), D5 (measuring tool, slider, result, glossary term), D6 (acceptance checklist).

## Facts the experience must respect

Epsilon Indi B is the graded mission. Correct marks give 4.58 arcsec per year (catalogue 4.68; the gap is the parallax wobble, which is the next step). The parallax fit with the proper motion fixed gives 306 +/- 28 milliarcsec, 3.27 parsec (10.7 light years) and 72.5 km/s, against the catalogue's 270.7 milliarcsec, 12.05 light years and 82.0 km/s: a 12 percent difference, 1.4 sigma. Compute the speed from the Gaia proper motion times the student's distance (72.5 km/s); the two-visit rate would give about 70.9.

Barnard's Star saturates the detector (blank core; the library flags it) and reads about 13 percent slow. WISE 0855 blends with a static star and reads about 22 percent slow. For those two, and for the two brightness targets (RW Aurigae, R Draconis), the lesson is the honest explanation of why, not a grade. Parallax is NOT measurable for WISE 0855 or Barnard's Star in this data: never show a distance step there.

Not yet verified: that marks snapped from the real stack files reproduce 4.58 arcsec per year within 0.01. Check it first.

## What to build

1. Data: `assets/missions/epsindb/parallax.json` with what the app needs from exp13 (the five visit means, the 93 exposure points, the parallax factors, t0, the fixed proper motion, the reference result) and a `source` field naming the experiment. `web/scripts/sync-assets.mjs` already copies the whole missions folder. Note the new file in `pipeline/README.md`.
2. Route `/mission/[id]` for the five mission ids (statically generated), reachable from each target ("Measure it") and from the landing page for Epsilon Indi B. One question and one primary action per step, driven by `missionScript`:
   - LOOK: first and last visit blink under fixed alignment marks. "Show me" reveals the object.
   - MARK: mark the object in the first visit, then in the last. A rough click or tap snaps to the star's centre (`refineCentroid`); the snap is visible; unreliable picks (too faint, saturated core, edge) are explained from the library's flags. Fully operable without a pointer: a keyboard crosshair (arrow keys, Shift for larger steps, Enter marks) with a live numeric readout. Undo and Start again always available. Marks are shape plus label, never colour alone.
   - MEASURE: how far it moved, over how long, the rate, in words and numbers; then the catalogue value and the library's tier text. The student commits an answer before the true value is revealed.
   - DISTANCE (Epsilon Indi B only): one native range input with a visible value and unit for the parallax; a small plain SVG chart (no chart library) with the measured points, error bars and the model curve following the slider, and the misfit number falling as the fit improves; then distance in light years and parsecs next to the catalogue value. The same data as a table behind the chart.
   - SPEED: speed across the sky next to the catalogue value, with one sentence that makes the number concrete.
   - REPORT: built from `encodeReport`: the student's numbers, the true values, the frames used and their source files, the data credit, "Copy link". `/report?r=...` decodes with `decodeReport` (it validates; a plain message for a broken or tampered link). No name field, no free text, nothing stored.
   - Glossary terms open in place (a button with `aria-expanded`, definition from `GLOSSARY`, Escape closes); never tooltip-only.
3. Missions 2 and 3 (Barnard's Star, WISE 0855): LOOK, MARK, MEASURE and the honest lesson. Missions 4 and 5: LOOK and the explanation.
4. Progress lives in the URL (step, marks, slider value), so a reload or a shared link restores it.

Implementation note: add optional props to `SkyCanvas` (a pick callback, extra overlay marks, an externally controlled crosshair); its behaviour must not change when the props are absent. Astryx's clickable card allows a nested "Measure it" link.

## Non-goals

No visual redesign (keep markup semantic and plain). No new dependency. No change to `/watch` data loading. If `missions-core` has a bug, write a failing case; patch only if it blocks, with a test in the package.

## Test plan

- Unit tests (vitest): the step machine (every transition, undo, restart, URL round trip); marking on the real stack files (a mark within 3 px of the object lands on the manifest's measured position; the saturated core of Barnard's Star produces the explanation, not a number); the Epsilon Indi B numbers from exact marks (4.58 arcsec per year within 0.01; slider at best fit gives 306 milliarcsec within 1, 10.7 light years, 72.5 km/s within 1 percent); report link round trip and rejection of a tampered link.
- `npx tsc --noEmit`, `npm test`, `npm run build` pass. Run `node scripts/sync-assets.mjs` once before the tests.
- Real browser: complete mission 1 with the keyboard only, from the landing page to the copied report link, and open that link in a fresh context; complete it again with pointer clicks at 390 x 844; run missions 2 and 3 to their lesson; zero console errors; axe-core on each step with zero serious or critical findings. Screenshots to `web/docs/screens/mission-*.png`.

If time runs short: mission 1 complete and accessible beats five partial missions.

## Hard constraints

The users include minors: no accounts, no names, no free-text input, nothing sent to any server. Honest numbers only; where the data cannot support a claim the app says so. No NASA logo. No em dash character (U+2014) anywhere, interface text included. Commit with explicit paths on a `wip/` branch; never push `main`.
