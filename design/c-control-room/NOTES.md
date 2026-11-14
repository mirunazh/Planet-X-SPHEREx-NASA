# Direction C, "Control Room": state at the hard stop

Built under a hard stop (about 25 minutes of build time). No critique rounds were run and axe was not run.

## How to run

From the repository root: `python3 -m http.server 3303 --bind 127.0.0.1`, then open
`http://127.0.0.1:3303/design/c-control-room/`. Routes: `#/` (S1), `#/look` or `#/look/<id>` (S2),
`#/measure` (S3), `#/elsewhere` (S4), `?theme=light#/look` (S5). Screenshots: `node <shoot.js>` with
`node_modules/playwright-core` (1.65.1) against the cached `chromium_headless_shell-1243`.

## What is built (real data)

- S1: the "1930" mono numeral, statement, one primary action, one quiet link. The Epsilon Indi B blink
  (visit 1 and visit 5, 90 arcsec field) is drawn from `stacks/d2_p0.f32` and `d2_p4.f32` with the
  manifest's asinh stretch, pixelated. Blink runs at 0.8 s per frame; starts paused under
  `prefers-reduced-motion`; Pause/Play button; the date of the frame on screen is marked with a filled
  square (shape, not colour only). EN/RO switch changes the S1 strings (ă â î ș ț in the RO copy).
- S2: all five visits drawn from the .f32 files; time axis at real, uneven dates (visit spans as bars,
  month ticks); a native range input (arrow keys step visits, `aria-valuetext` with dates); Previous,
  Play, Next; data strip as a `<dl>` (visit, dates spelled out, infrared colour in words then microns,
  photos, detection as check mark plus word plus S/N); "what am I looking at" with one glossary term
  open in place; marker legend buttons with On/Off words (aria-pressed, no switches); live status text.
- S5: same as S2 via `data-theme="light"` (HDS carbon-05 ground).

## What is NOT built

- S3 (mark and measure) and S4 (look somewhere else) have their HTML and real content in `index.html`
  but no CSS and no JS (the parallax chart, slider maths and coordinate parser are not written). Their
  screenshots show unstyled markup.
- The marker overlay (predicted, found, trail) is not drawn on the image; the buttons only toggle state.
- No axe run, no contrast check in the browser, no 320 px check, no critique rounds.

## Tokens (dark; computed WCAG ratios on #17171B)

ink #E3E3E3 13.93, white 17.88, muted #B9B9BB 9.12, dim #959599 5.99, control edge #77777A 4.00 (non-text),
hairline #58585B 2.52 (decorative only), orange #EA6F24 5.79 (6.80 on the black image; reserved for the
moved object), blue #288BFF 5.30 (links), green #47DA84 9.90 (detected), button #17171B on #E3E3E3 13.93,
focus 2 px dashed white.
Light: ink #17171B on #F6F6F6 16.54, muted #444447 8.98, dim #58585B 6.56, edge #77777A 4.13, blue
#1A5FCC 5.47, green #157A43 4.99, orange text #A64A16 5.38.
Type: Inter (headings), Public Sans 18 px body, DM Mono (numbers; 300 for the hero numeral). Labels
14 px uppercase Inter 600. Spacing on the HDS scale (4 to 72). Corners 0. Rules 1 px.

## Fonts and licences

Self-hosted woff2 from the fontsource packages on jsdelivr (latin and latin-ext subsets): Inter variable
5.2.8, Public Sans variable 5.2.7, DM Mono 300/400/500 5.2.7. All SIL OFL 1.1; licence texts in
`fonts/LICENSE-*.txt`.

## Open issues seen in the last screenshots

1. S2: the axis month labels collide with the transport buttons (the labels sit below the 72 px axis box).
2. S2: "Oct" and "2026" labels crowd each other near the year boundary.
3. S1 and S2: the compass sits outside the frame and floats; on S2 it pushes into the gutter.
4. S1: the frame at 400 px is smaller than planned (540); the image column needs `width:100%`.
5. S2: the visit range input is invisible (opacity) so focus has no visible ring on the axis; give the
   current visit bar the focus ring.
6. Phone layouts were not reviewed.
7. NaN pixels are drawn white (saturated cores in Barnard and R Draconis); say so in the caption.
8. The parallax factor curve for S3 was checked: a low-precision solar ephemeris matches the precomputed
   factors within 0.03 AU (sign flipped), good enough for the model loop.

## Next

Fix 1 to 5, style S3 and S4, draw the markers, run axe on all screens, then the critique rounds.
