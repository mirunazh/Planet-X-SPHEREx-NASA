# Direction E, "Workbook"

## Design plan (written before building)

**Palette, by role (contrast computed, WCAG 2.x formula):**

| Token | Hex | Role | Checked pairing |
|---|---|---|---|
| `--paper` | `#FFFFFF` | page | |
| `--wash` | `#F2F4F8` | right page of the spread, quiet fills | ink on wash 17.1 |
| `--ink` | `#0B1026` | text, the eyepiece rim | ink on paper 18.8 |
| `--ink-2` | `#4A5068` | secondary text | 7.96 on paper, 7.23 on wash |
| `--red` | `#FF3D2E` | infrared, the star that moved, the big poster block | 3.52 on paper (non-text only); ink on red 5.34 |
| `--red-fill` | `#E5281A` | primary button face | white on it 4.52 |
| `--red-ink` | `#C8200F` | small red text | 5.72 on paper, 5.2 on wash |
| `--cobalt` | `#2440FF` | everything the student draws or controls, links, focus | 6.46 on paper |
| `--cobalt-glow` | `#8C9BFF` | the student's pencil marks inside the black eyepiece | 8.25 on black |
| `--sun` | `#FFC53D` | the reward only | ink on sun 11.9 |
| `--void` | `#000000` | the eyepiece (true black, not a tinted near-black) | |

Eyepiece ramp (256-entry LUT built from CSS tokens): black, deep cobalt-violet, signal red, sun, white.

**Type:** Bricolage Grotesque Variable (800, optical size on, tight tracking) for headlines and the big numbers; Figtree Variable for interface and reading text, tabular numerals on every measurement. Two clearly distinct faces: a grotesk with ink traps and character for the poster voice, a round geometric sans for the lesson voice.

**Layout (desktop 1440):**

```
S1
+--------------------------------------------------------------+
| Skyblink                                   English  Romana   |
|                                     ##########################|
| Find the next                       ######  RED BLOCK  #######|
| Tombaugh.                       .------.  ####################|
|                                /  black  \   Then            |
| Real infrared photos ...      |  eyepiece |  April 2025      |
| [ Start mission 1 ] 3 min      \  stars  /  ##################|
| Look at any spot in the sky     '------'                      |
|                              [ HOLD TO BLINK ]  ( Then | Now )|
+--------------------------------------------------------------+

S2-S4 (workbook spread)                  S6 (explorer)
+---------------------+----------------+ +-----------------------+---------------+
| 1 Spot 2 Measure .. |   (wash page)  | | [ name or RA Dec  ]   | Visit 3 of 4  |
| Which dot moved?    |    .------.    | |     .------.          | Dates ____    |
| It moved ___ arcsec |   / black  \   | |    / black  \         | Light ____    |
| in ___ months.      |   \ disc   /   | |    \ disc   /         | Photos ____   |
| [hold to blink]     |    '------'    | | |--|----|-|------|    | markers       |
| feedback rises here |                | |  ruler, real dates    | glossary      |
+---------------------+----------------+ +-----------------------+---------------+
```

Phone: the eyepiece on top, the sheet below, the action sticky at the bottom.

**The one memorable thing:** a science workbook that comes alive. The sky is a round black eyepiece on a bright page, and everything the student does leaves a pencil mark: the star they pick gets circled, the trail gets drawn, the sentences have blanks that fill with their own counted-up numbers.

**Principles:** colour by role only (red = infrared and the mover, cobalt = the student's hand, sun = earned); flat blocks, no gradients except the data ramp; one orchestrated moment (S1 load: iris opens, blinks once, pencil circle draws), everything else answers the student; numbered path only where the content is a real sequence (the four mission steps).

**Review against the generated-design defaults, and what changed:**
- Cream + serif: not used (white and a cool wash). Kept.
- Near-black + one acid accent: the eyepiece is black, but the page is white and colour is by role; kept, and the eyepiece uses true `#000`, not a tinted `#0B0B0B`.
- SaaS card kit: I first sketched the S6 facts as four stat tiles. Changed to filled-in form lines (label, then an underlined answer), which is the workbook idiom and avoids identical rounded boxes.
- Eyebrows: I first had "Mission 1" as a small caps label above the S2 question. Removed: the numbered step path already says where you are. No uppercase labels anywhere except the mission patch, which is an embroidered object and not UI.
- Middle-dot meta strings and arrows on buttons: the CTA was "Start mission 1 · 3 min". Changed to the button "Start mission 1" with "About 3 minutes" as plain text beside it.
- Anime.js: dropped. The one choreography (iris clip-path, stroke-dashoffset, a timed flip) is three WAAPI calls; a library adds a file and a licence for nothing.
- Red primary button with white text failed (3.52). The button face moved one step darker (`--red-fill #E5281A`, 4.52) while the poster block keeps the brighter `#FF3D2E`; small red text uses `--red-ink`.
- Cobalt marks on the black eyepiece failed (3.25 on black). The student's marks inside the eyepiece use `--cobalt-glow #8C9BFF` (8.25) with a black under-stroke; cobalt proper stays for marks and controls on the white page.

## State at hard stop (built, reviewed, open)

**Run:** static server from the repository root (`python3 -m http.server 3302 --bind 127.0.0.1`), open `http://127.0.0.1:3302/design/e-workbook/`. Routes: `#/`, `#/mission/spot`, `#/mission/measure`, `#/mission/distance`, `#/mission/done`, `#/explore`. Query: `?lang=ro`, `?play=0` (no autoplay), `?still=1` (reduced motion), `?plx=306`, `?diff=1`. Screenshots: `cd tools && node shoot.mjs`; axe: `node tools/axe.mjs`.

**Built:** all six screens (S1 to S6), desktop and phone. Files: `index.html`, `style.css`, `app.js`, `fonts/`, `tools/`.

**Image treatment:** asinh stretch with the manifest's display values, Catmull-Rom bicubic upscale from the float data, 256-entry LUT from the ramp tokens (black held to 0.22 so the noise floor is black). Crop: Epsilon Indi B centred (73, 59), 46 px (138 arcsec) on desktop, (69, 60), 34 px on the phone; the 6.5 arcsec jump is about 25 px at the 540 px desktop eyepiece. S3 zooms to 32 px and uses vmax x2, soft x8 so the core and marks read. S6 (WISE 0855, 3.8 to 5.0 micron stacks) raises the black point by 2 sigma; crop (60, 60), 60 px. "Real pixels" toggle on S2. Difference view on S3: last minus first on a cobalt-black-sun diverging ramp.

**Reviewed (PNGs read):** s1 desktop and phone (four rounds), s1-ro desktop, s2 desktop and phone, s3 desktop (three rounds), s4 desktop and phone, s5 desktop and phone, s6 desktop and phone. Not looked at: s2-hint, s3-diff, s3/s6 phone after the last fixes, the final s3 marks after the last edit.

**axe:** `tools/axe.mjs` was started at the stop; results not read. Unverified.

**Open issues:** S6 says 131 arcsec (computed from the Apr to May 2026 visit and the 2010 challenge position); the brief's 134 is the late-2026 value from note 06. S4 on the phone puts the chart below the slider (scroll needed). On the phone the S2 hold button sits below the question, not in the sticky bar. Search on S6 only writes the link; it does not resolve names or coordinates. Contrast tokens computed by hand formula; not pinned by a test. dataviz skill was invoked after the first chart draft; chart then got direct labels, point tooltips and a numbers table.

**Fonts and licences:** Bricolage Grotesque Variable and Figtree Variable from `@fontsource-variable` (latin and latin-ext), SIL OFL 1.1, licence files in `fonts/`. No Anime.js (choreography is CSS and WAAPI). No network requests at run time beyond this repository.
