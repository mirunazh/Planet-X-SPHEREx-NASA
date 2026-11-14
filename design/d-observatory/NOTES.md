# D, "Observatory": design notes

## Design plan (written before building)

**Palette, by role.** Void `#000000` (the page is space; the photo dissolves into it). Ember ramp, sky only (infrared is heat): `#000000` then `#12061F`, `#4A1173`, `#B5246B`, `#F2622E`, `#FFC75A`, `#FFF7E0`. Ice `#9BE8FF`: everything that belongs to the student (marks, reticle, trail, focus ring, the primary action). Ink `#EEF3F7` (cool white text), Mist `#97A3AE` (secondary text, 8.2 to 1 on black). Smoke `rgba(8,10,14,.66)` + blur: the one floating panel. Rule: warm is the sky, cool is you.

**Type.** Archivo variable on its width axis (font-stretch 125%, weight 800) for the headline and big numbers: the wide lettering of 1970s space hardware without touching any mark. Geist for interface and reading text, `tabular-nums` on every measurement. No monospace.

**Layout.** The sky is the page: two stage-size canvases (then, now) under everything, the interface floats over them.

```
S1 desktop                                   S1 phone
+--------------------------------------------+ +----------------+
| Skyblink                   Explore  EN RO  | | Skyblink  EN RO|
|                                            | |    ( o )  .    |
|                         .     ( o )   .    | |  sky, reticle  |
|            sky, edge to edge, embers       | |                |
| Find the next                              | | Find the next  |
| Tombaugh.                                  | | Tombaugh.      |
| one sentence                               | | one sentence   |
| [ keycap: Hold to blink ]  Then | Now      | | [Start mission]|
| [Start mission 1, 3 min]  Look at any spot | |  [ keycap ]    |
| credit . independence . legend             | | legend, credit |
+--------------------------------------------+ +----------------+

Mission (S2 to S4)                            Explorer (S6)
+--------------------------------------------+ +--------------------------------------------+
| sky full-bleed           +-----------------+ | | sky full-bleed           +-----------------+ |
|        ( o )             | 1 2 3 4 flight  | | |   [2010]  ......  ( o )  | search, answer  | |
|                          | question        | | |                          | visit facts     | |
|                          | answer, numbers | | |                          | markers, term   | |
| [keycap]                 +-----------------+ | | ==o====o=o=========o== uneven time track  | |
+--------------------------------------------+ +--------------------------------------------+
```

Alignment: left aligned everywhere; the panel is the only container.

**The one memorable thing.** The sky is the page, and the whole sky blinks when you hold the key.

**Changes after checking the plan against generated-design defaults.**
1. The art direction started the ember ramp at `#12061F` (a purple). Background noise would then paint the whole page aubergine, which is the "purple blob" tell; the ramp now starts at true black and reaches `#12061F` only at the noise floor, so the photo dissolves into the page.
2. Black plus one bright accent is default trait 2. Kept, because the brief pins it, but the accent is bound to a role (only what the student owns is ice) and the colour of the page is the photo itself, not a flat field.
3. No monospace data labels, no uppercase eyebrows, no middle-dot meta strings, no arrows appended to buttons (trait 5). The flight plan is numbered because it is a real sequence.
4. One glass panel only; everything else floats on the sky with no card behind it.
5. Anime.js dropped: the four motions (develop, blink, reticle settle, trail draw, count up) are a canvas loop plus WAAPI, so no vendor file is needed.

## How to run

Static server from the repository root (`python3 -m http.server 3302 --bind 127.0.0.1`), then open `http://127.0.0.1:3302/design/d-observatory/`. No build. Screenshots and axe: `cd tools && npm i --ignore-scripts && node shoot.mjs [s1 s2 ...] [--axe] [--still]` (playwright-core 1.56.1 uses the cached Chromium headless shell 1194; nothing is downloaded).

Routes: `#/` (S1), `#/mission/spot` (S2; `?a=1` opens it answered), `#/mission/measure` (S3), `#/mission/distance` (S4; `?plx=306` sets the slider), `#/mission/done` (S5), `#/explore` (S6; `?visit=0..3`). `?lang=ro` for Romanian on S1, `?still=1` forces the reduced-motion path.

## Tokens

All colour, type, space, radius, shadow and motion values are custom properties at the top of `style.css`. The canvas ramps in `app.js` read the same tokens (`--void`, `--e0` to `--e5`), so there is one source. Exceptions: the keycap face gradient and its shadows are tokens too (`--key-face`, `--sh-key`, `--sh-key-down`).

## Image: crop, stretch, ramp

- Data: Epsilon Indi B, detector D2 (1.1 to 1.65 micron), stacks `d2_p0` (Apr to May 2025, 19 photos) and `d2_p4` (Sep to Oct 2026, 24 photos); WISE 0855-0714, D5 and D6 stacked (3.8 to 5.0 micron), four visits.
- Stretch: the manifest's asinh (`soft` per group) with `vmax` multiplied by 1.8 so the bright cores do not clip to one white disc, then a black point at 0.13 of the stretched range (0.24 for the noisier WISE field) so empty sky is true black. Values go through a 256-entry ramp: black, `#12061F`, `#4A1173`, `#B5246B`, `#F2622E`, `#FFC75A`, `#FFF7E0`.
- Enlargement: separable Catmull-Rom (bicubic) from 121 to 484 pixels, then the browser's high-quality smoothing to stage size, plus a sixth-size blurred copy screened on top for the glow. "Real pixels" in the footer redraws the raw 121 x 121 squares with smoothing off.
- Crop: no box. The whole frame is placed by a camera (focus point, anchor on the stage, scale). S1 desktop: 16.4 screen px per data px, so the 2.2 px (6.5 arcsec) jump is 36 px; phone 14.4 px per data px, 32 px. The mover sits right of centre on desktop, above the headline on the phone; two fixed stars stay in view at 1440. The frame's own edge fades into black over 10 data pixels and a radial vignette follows the anchor.
- Difference view (S3): last stack minus first, `tanh` scaled, on a diverging ramp from violet (where it was) through black to amber (where it is now).

## Review record

Plan review: see the five changes at the top of this file.

Round 1 (all twelve PNGs read): whole sky painted aubergine by the noise floor (added the black point); the mover clipped to one white blob (vmax gain); the empty field after the first black point (lowered it and zoomed out from 76 to 88 data px across); the CTA sat on top of the footer legend (footer split into a sky key row and a fine-print row); keycap label stacked badly (selector fix); WISE frame showed a hard vertical edge (edge feathering in the canvas); the scale bar collided with the S6 dates and the controls overlapped the legend (scale bar moved up, controls beside the track); Nov and Dec 2025 dates overlapped (the second drops a line, true spacing kept).

Round 2: flight-plan steps for past stages were thrown across the panel because `.done` (step state) collided with `.done` (the S5 section), renamed to `.is-past`; patch lettering overflowed its arc and sat on the inner field (text moved onto a wider ember ring, in black, shorter bottom line); S5 lacked the true values beside the student's (added a facts list); S5 phone patch was cut by the sheet; S2 phone hid the answer below the key (feedback now sits above the key and the help text hides once answered); RO key label repeated "ține apăsat".

Verified by script: holding Space flips the `now` canvas on, sets `aria-pressed`, and the live region says "Showing: Sep to Oct 2026"; release restores "then". Before and after crops show the star jump inside the reticle.

## axe-core

axe-core 4.x on S1 to S6, S1 in Romanian, and S2 unanswered, at 1440 x 900 and 390 x 844: zero violations of any impact after moving the stage inside `main` (the only earlier finding was a moderate `region`). axe cannot judge text contrast over a canvas; text over the sky sits on the vignette and carries a dark text shadow, and the token pairs are: Ink on black 18.8, Mist on black 8.2, Ice on black (and black on Ice) 15.4, Mist-2 (switch outlines, 3 to 1 needed) 5.8, all computed with the WCAG formula.

## Open issues

- Motion was built to the plan but judged only from stills and one scripted blink; play it at 2x slowness for feel.
- S6 search accepts input but only WISE 0855-0714 is loaded; the loading line is a static illustration of the state.
- S4 slider snaps to the classroom best fit (306.2 mas) within 2 mas so the shown result matches the brief's 306 +/- 28, 10.7 ly, 72.5 km/s; speed uses the catalogue proper motion (4.68 arcsec a year) as in `exp13` "best_fit_pm_fixed".
- Romanian covers S1 and the footer only, as the brief allows; the mission screens are English.
- Anime.js was not used (WAAPI plus one canvas loop), so there is no `vendor/` folder.

## Fonts and licences

`fonts/`: Archivo (variable, weight and width axes, latin and latin-ext) and Geist (variable weight, latin and latin-ext), both from `@fontsource-variable`, SIL Open Font License 1.1 (`LICENSE-Archivo-OFL.txt`, `LICENSE-Geist-OFL.txt`). No network request at run time except the page's own files and the repository's `/assets` and `/docs` data.
