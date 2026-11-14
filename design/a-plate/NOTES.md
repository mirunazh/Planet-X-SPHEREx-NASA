# Direction A, "Plate": notes (stopped at the hard stop, 2026-11-14)

## State: NO SCREENS BUILT

The coordinator called a hard stop before any HTML existed. `shots/` is empty. There is no `index.html`, no CSS and no JS yet. No server was started on port 3301, and axe was not run. Everything below is research and setup that the build can start from directly.

## What exists in this folder

- `fonts/`: self-hosted woff2 files with latin and latin-ext subsets (latin-ext covers ă ș ț; â and î are in latin). From the fontsource-variable packages, version 5.3.0:
  - `newsreader-latin{,-ext}-opsz-normal.woff2` (opsz and wght axes, 200 to 800). Licence `fonts/OFL-Newsreader.txt` (SIL OFL 1.1).
  - `atkinson-hyperlegible-next-latin{,-ext}-wght-normal.woff2` (200 to 800). Licence `fonts/OFL-AtkinsonHyperlegibleNext.txt` (SIL OFL 1.1).
  - `atkinson-hyperlegible-mono-latin{,-ext}-wght-normal.woff2`. Licence `fonts/OFL-AtkinsonHyperlegibleMono.txt` (SIL OFL 1.1).
  - Unicode ranges: copy them from `node_modules/@fontsource-variable/*/opsz.css` and `wght.css`.
- `node_modules/`: `playwright@1.56.1` (uses cached chromium-1194, so nothing to download), `axe-core`, and the fontsource packages. It is git-ignored through `.gitignore`.
- `package.json`, `.gitignore`.

## How to run (once the build exists)

From the repository root: `python3 -m http.server 3301 --bind 127.0.0.1`, then open `http://127.0.0.1:3301/design/a-plate/`. The page fetches `/assets/missions/<id>/...`.

## Palette with computed contrast (WCAG 2.x, my script; light = "paper", dark = "darkroom")

| Token | Hex | Pair | Ratio |
|---|---|---|---|
| paper | #F3EEE2 | ink on paper | 15.03 |
| sheet | #E7E1D2 | ink on sheet | 13.34 |
| ink | #1B1A17 | muted on paper / sheet | 6.49 / 5.76 |
| muted | #5A5448 | rule (non-text) on paper / sheet | 4.78 / 4.24 |
| rule | #6F6858 | red on paper; paper on red button | 5.65 / 5.65 |
| red | #B3261E | red on sheet | 5.01 |
| link | #1F4E8C | link on paper | 7.18 |
| dark ground | #14130F | dark text #EDE7D8 | 15.07 |
| dark sheet | #1F1D18 | dark text on dark sheet | 13.65 |
| dark muted | #B3AB9A | on ground / sheet | 8.15 / 7.38 |
| dark rule | #8C846F | on ground / sheet | 5.00 / 4.53 |
| safelight red | #F2766B | on ground; ground on red button | 6.71 / 6.71 |
| dark link | #9DB8E8 | on ground | 9.25 |
| image marks | #D55E00 / #0072B2 | on white | 3.87 / 5.19 (non-text, plus a 2 px paper halo) |

Planned scales: type 15 caption, 16, 18 body (1.6), 22 serif lead, 30 h2 serif, 40 mono numbers, 44 h1 (S2 to S4), 60 to 64 display (S1). Spacing 4, 8, 12, 16, 24, 32, 48, 64, 96. Radius 2 px on controls only, 0 on anything printed. Rules: 1 px structural, 2 px ink head rule on logbook tables.

## Real data facts gathered (verified from manifests and exp13)

- Epsilon Indi B, group d2, 5 visits: 24 Apr to 4 May 2025 (19 photos), 6 to 7 Jun 2025 (13), 1 Oct to 8 Nov 2025 (30), 24 to 30 Apr 2026 (7), 28 Sep to 2 Oct 2026 (24). Mid dates run from 26 April 2025 to 30 September 2026, 17 months apart. The predicted position runs from (61.0, 59.3) to (59.3, 60.6) px. A crop of 28 px (84 arcsec), x and y from 46 to 74, shows the jump clearly (checked as ASCII art).
- Parallax: a fit on the 5 pass means gives 305.9 +/- 24.8 mas, and on 93 exposures 306.2 +/- 28.1 mas (team result: 3.27 pc, 10.7 ly). The speed is 72.5 km/s, which uses Gaia's motion (4.68 arcsec/yr), as `missions-core` does. With the student's own 4.58 it would be 70.9.
- Model curve: a low-precision solar ephemeris reproduces the tabulated parallax factors to within 0.01 (verified), so the slider chart can draw a continuous curve.
- WISE 0855: the challenge coordinates map to about (38.4, 61.8) px in its grid, and today's (2026.87) position to about (82.8, 58.1). The separation is 133.8 arcsec, mostly west, which confirms "134 arcseconds to the west". Both fall inside one full 121 px field, a good featured plate for S4.
- Glossary wording to reuse: `packages/missions-core/src/content/glossary.ts`.

## Design plan (not built)

The plate is a neutral negative image (white sky, black stars) mounted on warm paper. Registration crosses sit at the corners. Pointers in the margin show the object's first-visit position (hollow, ink) and its current-visit position (filled, red), so they do real work as a readout. A ruled plate label goes above the image and the receipt `dl` beside it. The time axis is a native range input snapped to visits at their real dates over a calendar ruler. The darkroom mode uses a safelight-red accent.

## Open issues and next step

Build S1 and S2 first (index.html with hash routes), take screenshots, then run the critique rounds. None of this was done.
