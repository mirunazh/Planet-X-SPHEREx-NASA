# Direction B, "Dial": notes (cut short by a hard stop)

## Run it
From the repository root: `python3 -m http.server 3302 --bind 127.0.0.1`, then open
`http://127.0.0.1:3302/design/b-dial/index.html`. The page fetches `/assets/missions/...` and
`/docs/research/experiments/exp13_parallax_epsindb.json`, so it must be served from the repo root.
Routes: `#/` (S1), `#/look` (S2), `#/measure` (S3), `#/elsewhere` (S4); S5 = `?theme=dark#/look`.
URL parameters for screenshots: `visit=0..4`, `play=0`, `plx=<mas>`, `theme=dark`, `lang=ro`.
Screenshots: `cd design/b-dial && node tools/shoot.mjs` (playwright-core 1.56.1 driving the cached
`chromium_headless_shell-1243`; installed in `tools/` with `--ignore-scripts`).

## What is built
- One HTML app, plain HTML, CSS and vanilla JS: `index.html`, `style.css`, `app.js`. Working title
  in one variable (`NAME` in `app.js`).
- The instrument (dark viewfinder, mono readout strip, time dial, Earlier/Play/Later keys) is one
  DOM instance moved into the slot of the current screen, so it stays in the same place from S1 to S2.
- Frames drawn on a canvas from the real `.f32` stacks with each group's `display` stretch,
  `image-rendering: pixelated`, 27 px crop (81 arcsec) around Epsilon Indi B.
- Dial: SVG face with month ticks, year ticks and detents at the five real, uneven visit dates
  (`mjdMid`); a native `<input type="range">` underneath carries role, value, `aria-valuetext` and
  the keyboard. Pointer: mouse turns on press, touch turns on tap or horizontal drag;
  `touch-action: pan-y` leaves vertical scrolling to the page.
- Play steps through the visits every 900 ms (about 1.1 changes a second, under the 3-flash
  ceiling); autoplay on S1 only, never under `prefers-reduced-motion`. Status region announces the
  visit when paused or stepped.
- Marker buttons (`aria-pressed`, filled/empty square plus the marker's own shape as legend);
  glossary terms are real buttons with `aria-expanded`, open in place, Esc closes.
- S3: the two marks (dashed and solid orange rings), measured motion vs catalogue, parallax slider
  driving a live chart of the five pass means (exp13) and the model curve, distance and speed.
- S4: name search field, WISE 0855 featured large, four others as a ruled list with real
  thumbnails, Surprise me, coordinates field prefilled with the challenge position and the answer.
- Language switch EN/RO swaps the S1 strings, header and instrument labels (ă â î ș ț proven).
- Light body and all-dark body (`data-theme`), honouring `prefers-color-scheme`.

## Fonts and licences
IBM Plex Sans 400/500/600 and IBM Plex Mono 300/400, latin and latin-ext woff2 subsets from the
fontsource 5.2.5 package on jsdelivr, self-hosted in `fonts/`. Licence: SIL OFL 1.1,
`fonts/LICENSE-IBM-Plex-OFL.txt` (fetched from github.com/IBM/plex).

## Tokens (contrast computed with `tools/contrast.py`, WCAG 2.x formula)
| Token | Hex | Pair | Ratio |
|---|---|---|---|
| body / text | `#E9E7E2` / `#1E1F21` | text on body | 13.35 |
| muted | `#55575B` | on body | 5.86 |
| control edge | `#7D7F84` | on body (non-text) | 3.24 |
| primary button | `#1E1F21` fill, `#E9E7E2` text | | 13.35 |
| display / display text | `#0F1113` / `#E8EAEC` | | 15.69 |
| display muted | `#A4A9AF` | on display | 7.99 |
| the one orange (dial index, object ring; never text) | `#D2550F` | on body / on display | 3.37 / 4.55 |
| sky marker | `#56B4E9` | on display | 8.20 |
| focus | `#0B57D0` / `#8AB4F8` | on body / on display | 5.17 / 8.98 |
Type: Plex Sans 18 body, 20 lead, 22 h2, 32 to 44 h1, 44 to 76 display; Plex Mono 14 to 20
readouts, 56 Light for measured values. Spacing 4, 8, 12, 16, 24, 32, 48, 64. Radius 6 px
controls, 14 px viewfinder, circles for the dial. Rules 1 px; control edges 1.5 px.
Dark body tokens (S5): body `#1B1C1E`, text `#E6E4DF`, muted `#A3A5A9`; not yet computed.

## Real vs mocked
Real: every frame, date, wavelength range, exposure count, measured and predicted position, the
motion (6.54 arcsec, 4.58 per year), Gaia values (4.68, 12.05 ly, 82.0 km/s), the team fit
(306 ± 28 mas, 10.7 ly, 72.5 km/s), the five parallax points. Mocked: the student's two clicks are
the pipeline centroids; the slider value in the S3 shot is 300 mas from the URL; the parallax
model curve uses a low-precision Sun position (within about 0.03 of exp13's factors); search,
Surprise me and the target links do nothing yet (all go to Epsilon Indi B); the coordinate echo
text is not yet filled by a parser.

## Critique rounds
Not done. The hard stop arrived right after the first render. One look at `s2-desktop.png`:
1. The 81-arcsec crop with this stretch shows one big blob and almost no neighbouring stars, so
   the motion has no visible reference; widen to about 40 px or lower `vmax` for the viewfinder.
2. Dial labels: "Apr" of 2025 collides with the "2025" year label; move year labels inward.
3. Readout "Light" wraps to two lines; shorten to the range only or give it its own row.
4. The compass glyph is too small to read; enlarge or drop the letters inside it.
5. The right column of the dial unit ends at mid-height, leaving an empty block under it.
6. The theme button says "Dark" with no state shown in text.
7. Footer credit is a long paragraph; split into two short lines.
8. S1, S3, S4 and phone shots not reviewed at all.

## Not done
axe-core run (installed in `tools/`, not executed), critique rounds, coordinate parser and echo,
Romanian beyond S1/header/instrument, 320 px check, contrast of the dark-body tokens.
