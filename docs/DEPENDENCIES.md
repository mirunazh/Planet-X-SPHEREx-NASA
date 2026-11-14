# Dependencies and licences

Every runtime and development dependency of the new work (`web/`, `packages/*`, `video/`, the Python pipeline), plus the team's earlier root app, fonts and data. The hackathon asks for a full list of libraries and data and for OSI-approved licences (OSI is the Open Source Initiative, which approves open-source licences). The repository's own licence is Apache-2.0 (`LICENSE`, added as a proposal that the team still has to confirm).

How the licence column was filled: for packages installed in `node_modules`, read from each package's own `package.json` by a script on 14 November 2026 (ran today). For the root app, whose `node_modules` is not installed in this checkout, read from the npm registry with `npm view <package>@<version> license` (ran today). For Python packages, read from the installed package metadata through `uv run --with ...` (ran today). Nothing was guessed. Where a licence was not read, the table says so.

Only direct dependencies are listed in the main tables. The scan of installed trees is summarised in section 6. For a full machine-generated list, run `npm ls --all --json` in each folder.

## 1. `web/` (the new viewer)

From `web/package.json`; versions are pinned exactly (no carets), because the design system is in beta and releases almost daily.

| Package | Version | Kind | Licence | Role |
|---|---|---|---|---|
| `@astryxdesign/core` | 0.7.16 | runtime | MIT | design system components |
| `@astryxdesign/theme-neutral` | 0.7.16 | runtime | MIT | base theme (the app overrides it with its own theme) |
| `@stylexjs/stylex` | 0.19.2 | runtime | MIT | styling engine required by Astryx |
| `next` | 16.4.6 | runtime | MIT | framework |
| `react`, `react-dom` | 19.3.1 | runtime | MIT | UI |
| `zustand` | 5.1.0 | runtime | MIT | state store (URL state) |
| `spherex-core`, `missions-core` | 0.1.0 | runtime, in this repository (`file:../packages/...`, added by the integration worker at 19:14, in progress) | Apache-2.0 as part of this repository (`LICENSE`) | the two TypeScript libraries |
| `@types/node` | 22.20.5 | dev | MIT | types |
| `@types/react`, `@types/react-dom` | 19.3.0 | dev | MIT | types |
| `typescript` | 5.9.3 | dev | Apache-2.0 | compiler and type check |
| `vite` | 8.3.8 | dev | MIT | peer of vitest |
| `vitest` | 4.1.12 | dev | MIT | tests |

Install note: `web/.npmrc` sets `legacy-peer-deps=true`, `ignore-scripts=true`. Astryx's `core` and `cli` packages declare a harmless print-only `postinstall` (read in full in note 14); `ignore-scripts` skips it. Do not run `astryx init` or install Astryx's Claude plugin without review (note 14).

## 2. `packages/*`

| Package | Runtime dependencies | Development dependencies |
|---|---|---|
| `spherex-core` 0.1.0 | none (only `fetch`, `ArrayBuffer`, `DataView`, typed arrays) | `typescript` 5.9.3 (Apache-2.0), `vitest` 4.1.12 (MIT) |
| `missions-core` 0.1.0 | none | `typescript` 5.9.3 (Apache-2.0), `vitest` 4.1.12 (MIT) |
| `spherex-index` 0.1.0 (in progress, not yet in the repository) | none | `typescript` 5.9.3 (Apache-2.0), `vitest` 4.1.12 (MIT) |

## 3. `video/` (harness done; film not done)

| Package or tool | Version | Licence | Role |
|---|---|---|---|
| `playwright` (and its dependency `playwright-core`) | 1.63.0 | Apache-2.0 | drives the browser to render scenes and capture the app |
| Chromium, downloaded by `npx playwright install chromium` | not recorded | licence **not read** for this document | the browser Playwright launches; not committed to the repository |
| `ffmpeg` (a program, not a package) | 8.1.1 on the Mac that built the video | The build on that machine was configured with `--enable-gpl --enable-version3` (GPL version 3). The licence of whichever build a teammate has was not read. | joins frames, mixes audio. It is run as a separate program and is not distributed with the repository. |
| Inter (variable font, `video/assets/fonts/InterVariable.woff2`) | file as committed | SIL Open Font License 1.1 (text in `Inter-LICENSE.txt`) | video text |
| JetBrains Mono (Regular, Medium, SemiBold, `.woff2`) | file as committed | SIL Open Font License 1.1 (text in `JetBrainsMono-OFL.txt`) | video text and numbers |

The soundtrack is synthesised by `video/audio.mjs`; no music file is used yet. If a licensed track is added, its credit goes in `video/shots.mjs` (`vars.musicCredit`) and in this table. The notes considered Pixabay (no attribution required, note 14, VERIFIED) and Incompetech (CC BY, credit on the end card).

## 4. Python pipeline (no virtual environment; `uv run --with ...`)

| Package | Version read | Licence | Used by |
|---|---|---|---|
| astropy | 8.0.2 | BSD-3-Clause | WCS, coordinates, FITS in the pipeline and experiments |
| numpy | 2.5.4 | BSD-3-Clause AND 0BSD AND MIT AND Zlib AND CC0-1.0 (the bundled parts) | arrays |
| scipy | 1.18.1 | BSD licence (metadata classifier `OSI Approved :: BSD License`) | experiments, resampling |
| reproject | 0.21.0 | BSD 3-Clause | reprojection of exposures onto the grid |
| matplotlib | 3.11.2 | Matplotlib licence (metadata classifier `OSI Approved :: Python Software Foundation License`) | contact sheets and figures |
| pillow | 13.0.0 | MIT-CMU (SPDX identifier; a permissive "historical permission" licence; its OSI status was **not checked**) | PNG previews |

`pipeline/movers/` uses only the Python standard library. Cite the Astropy Collaboration papers (note 12). The Python versions are whatever `uv` resolved on 14 November; they are not pinned in a lock file, so a later run may resolve newer versions. To pin, add `--with astropy==8.0.2` and so on.

## 5. The team's earlier root app (3D globe)

From the root `package.json`; licences read from the npm registry today.

| Package | Version | Kind | Licence |
|---|---|---|---|
| `@hscmap/healpix` | 1.4.12 | runtime | MIT |
| `@react-three/fiber` | 9.8.2 | runtime | MIT |
| `three` | 0.187.0 | runtime | MIT |
| `next` | 16.4.6 | runtime | MIT |
| `react`, `react-dom` | 19.3.1 | runtime | MIT |
| `zustand` | 5.1.0 | runtime | MIT |
| `@types/node` | ^24 (registry resolved 24.19.2) | dev | MIT |
| `@types/pngjs` | 6.0.5 | dev | MIT |
| `@types/react`, `@types/react-dom` | 19.3.0 | dev | MIT |
| `@types/three` | 0.187.0 | dev | MIT |
| `jpeg-js` | 0.4.4 | dev | BSD-3-Clause |
| `pngjs` | 7.0.0 | dev | MIT |
| `typescript` | 5.9.3 | dev | Apache-2.0 (as read in `web/`) |
| `vitest` | 4.1.12 | dev | MIT (as read in `web/`) |

## 6. Scan of the installed trees (transitive packages)

A script counted the licence field of every package in each installed `node_modules` on the Mac (nested duplicates counted separately).

| Folder | Packages scanned | Licences found |
|---|---|---|
| `web/` | 175 | MIT 138; Apache-2.0 13; ISC 8; MPL-2.0 6; BSD-3-Clause 4; 0BSD 1; CC-BY-4.0 1; LGPL-3.0-or-later 1; "Apache-2.0 AND LGPL-3.0-or-later AND MIT" 1; and the two in-repository packages (no licence field) |
| `packages/spherex-core/` | 46 | MIT 38; Apache-2.0 3; ISC 2; MPL-2.0 2; BSD-3-Clause 1 |
| `video/` | 2 | Apache-2.0 2 |

## 7. Not a plain OSI software licence: flags

| Item | Why it is flagged | Verdict |
|---|---|---|
| `@img/sharp-libvips-darwin-arm64` and `@img/sharp-wasm32` (in `web/node_modules`, brought by Next.js for image optimisation) | LGPL-3.0-or-later (OSI-approved but copyleft). They are binary libraries for the `sharp` image library, not part of this project's code. | Acceptable as unmodified dependencies; list them. The app does not need to use the Next.js image optimiser. |
| `lightningcss` (6 packages, brought by Vite and Next tooling) | MPL-2.0: OSI-approved, file-level copyleft | Acceptable unmodified; list it. |
| `caniuse-lite` 1.0.30001826 | CC-BY-4.0, a data licence for browser-support data, not a software licence; requires attribution | Build-time only; list it with its attribution. |
| pillow's `MIT-CMU`, matplotlib's licence | Permissive licences with no standard SPDX "OSI" tick in the metadata read here | Permissive and widely used; confirm on the form if a judge asks. |
| ffmpeg (GPL-3 build on the Mac) | Not a library of this repository; run as an external program | Mention as a tool; do not bundle. |
| Chromium (via Playwright) | Licence not read for this document | Mention as a tool; not committed. |
| SPHEREx, Gaia, SIMBAD and the other data | Data, not software: NASA data is public, other sources ask for acknowledgement | See `docs/DATA.md`. |
| Remotion, Shepherd.js, Intro.js, Stellarium Web Engine | Not OSI (Remotion) or AGPL (the others) | **Not used.** Listed in note 11 as traps; keep them out. |

No dependency in the table above is under a non-open or non-commercial licence. Two items are **unverified**: Chromium's licence and the OSI status of `MIT-CMU`.

## 8. Fonts

| Font | Where | Licence |
|---|---|---|
| Inter | `web/` (through `next/font/google`, fetched at build time and served from our own site) and `video/assets/fonts/` | SIL Open Font License 1.1 |
| JetBrains Mono | same | SIL Open Font License 1.1 |

The OFL permits use and redistribution of the font files, provided the licence text travels with them (it does, in `video/assets/fonts/`). `web/` downloads the fonts at build time; no font request goes to Google at run time (`web/src/app/layout.tsx`).

## 9. Data

Data sources and the credit each needs are in [DATA.md](DATA.md), section 1. In short: SPHEREx Level 2 images (NASA/JPL-Caltech via NASA/IPAC IRSA, DOIs 10.26131/IRSA678 and 10.26131/IRSA662), SIMBAD (CDS) and Gaia DR3 (ESA) for target coordinates and the fast-mover catalogue, plus 2MASS, WISE and the NASA archives used by the root app. Test fixtures in `packages/spherex-core/test/fixtures/` are byte ranges of public SPHEREx files.
