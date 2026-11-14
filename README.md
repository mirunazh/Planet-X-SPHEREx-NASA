# Planet-X-SPHEREx-NASA

## Work in progress: the time viewer (branch wip/spherex-time-viewer)

The new folders `web/`, `packages/`, `pipeline/`, `assets/` and `video/` hold the SPHEREx time viewer: real SPHEREx exposures of five target objects stacked into short films, a browser library that reads pixels straight from NASA's public S3 bucket for any coordinate, the logic of guided measuring missions, and the tools for the 30-second demo video. The 3D globe described below is the team's earlier app and is left as it was. Start with [docs/ECHIPA-START-AICI.md](docs/ECHIPA-START-AICI.md) (team onboarding, in Romanian), then [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md), [docs/DATA.md](docs/DATA.md), [docs/PROCESS.md](docs/PROCESS.md), [docs/DEPENDENCIES.md](docs/DEPENDENCIES.md), [docs/RESEARCH-INDEX.md](docs/RESEARCH-INDEX.md) and [docs/SUBMISSION-CHECKLIST.md](docs/SUBMISSION-CHECKLIST.md).

**SPHEREx Sky Navigator**: a 3D navigator for the infrared sky in the style of Apple's Find My, built **only on NASA data**. Spin the whole sky like a globe, fly *through* the celestial sphere into the real sky, and zoom down to arcseconds. The app works out the exact ICRS coordinates under your view as you move, so you never type a coordinate unless you want to.

Built for the NASA Space Apps Challenge 2026.

> NASA does not endorse this project. NASA data is used under NASA's data and media guidelines. See **Data & credits** in the app.

## What it does

- **Globe → sky crossing.** From outside, the celestial sphere is a globe, shown mirror-reversed like a classic celestial globe. Zoom in and the camera passes through the sphere wall into the true sky (north up, east left).
- **Coordinate deduction.** RA/Dec (ICRS), galactic l/b and field of view are computed live from the camera direction. The number of digits follows the real uncertainty: the larger of one screen pixel and one survey pixel.
- **NASA surveys**, streamed as HiPS tiles from NASA/IPAC IRSA:

  | Survey | Bands | Years | Native pixel |
  |---|---|---|---|
  | SPHEREx DR1 all-sky spectral cube | 102 channels, 0.75–5.0 µm, with a wavelength slider | 2025–2026 | 12.9″ |
  | 2MASS colour | J, H, Ks | 1997–2001 | 0.8″ |
  | AllWISE colour | W1, W2, W4 | 2010–2011 | 1.6″ |

- **Pins.**
  - 4,862 exoplanet host stars from the NASA Exoplanet Archive.
  - Featured targets: galaxies resolved by NED, both SPHEREx deep fields located from IRSA DR1 metadata, and IAU reference points.
- **Search.** Type coordinates in any common notation, a pin name, or any galaxy name (resolved by NED through a server-side route).
- **Lock target.** Below a 1° field of view, lock the centre to produce a reproducible `SkyTarget` with position, uncertainty, HEALPix order-14 index, layer and wavelength. This is the hand-off to the image-comparison pipeline. Copy it as JSON or as a deep link.
- **Deep links.** Every view is a URL, e.g. `/?ra=10.68479&dec=41.26907&mode=sky&fov=0.5&survey=spherex&f=46`.
- **Self-explaining interface.** Hover over any element (or focus it with the keyboard) for a short explanation. The same texts appear in the Field guide under **How it works**, which also serves touch screens.

## How the coordinates are generated

No coordinate is looked up. The camera sits at the centre of a unit sphere aligned with the ICRS frame. The view direction `(x, y, z)` converts to `RA = atan2(y, x)` and `Dec = asin(z)`. NASA's HiPS images are already registered to the same frame, and each tile's file name is its HEALPix sky address, so every image lands where it belongs.

The tile pixel orientation was **verified with NASA data, not assumed**. `npm run verify:hips` places 16 bright stars from the 2MASS Point Source Catalogue (IRSA `fp_psc`) on SPHEREx and 2MASS tiles under all 8 possible orientations. The correct orientation hits 16/16 stars in both surveys; the next-best manages 10/16.

Further validation:
- The NED position of M31 lands on its nucleus in both SPHEREx and 2MASS.
- The IAU Galactic Centre lands on the SPHEREx bulge.
- The Kepler field's exoplanet hosts appear in Cygnus/Lyra.

## Run it

Requires Node.js ≥ 20.9.

```bash
npm ci
npm run dev          # http://localhost:3000
```

Other scripts:

```bash
npm test             # unit tests (coordinate maths, formatting, parsing, HiPS addressing, fly-to)
npm run typecheck
npm run data         # rebuild public/data/*.json from NASA services (with provenance)
npm run verify:hips  # re-run the tile-orientation check against NASA data
npm run build && npm start
```

Docker (production, Next.js standalone output):

```bash
docker build -t sky-navigator .
docker run --rm -p 3000:3000 sky-navigator
```

## Architecture

```
src/lib/sky/        pure, unit-tested core: coords, view/camera maths, formatting, parsing,
                    HiPS addressing, survey registry, fly-to path, SkyTarget
src/lib/            store (zustand), navigation actions, URL deep links, pins
src/components/sky/ WebGL layers (React Three Fiber): HiPS tile renderer, grid, pins, camera driver
src/components/hud/ coordinate readout, search, layers, mini-map, side panel, dialogs
src/app/api/resolve NED name lookup: validated input, cached, rate-limited
scripts/            NASA data snapshot + HiPS orientation verification
docs/               plan and image-source rationale for the presentation
```

Design notes:
- **Tiles load straight from IRSA in the browser.** IRSA serves them with CORS `*`, and they are never mirrored.
  - The whole-sky preview takes one request.
  - Full-resolution tiles stream for the patch in view, at the HEALPix order matching the screen pixel, within a 72-tile budget.
  - Coarser tiles fill in while finer ones load.
- **Production security headers:** CSP limited to self and IRSA, `nosniff`, a strict referrer policy and frame denial.

## Data and credits

- **SPHEREx:** Jet Propulsion Laboratory / Caltech, funded by NASA. DR1 all-sky cube DOI `10.26131/IRSA679`.
- **2MASS:** University of Massachusetts and IPAC/Caltech, funded by NASA and NSF.
- **WISE / NEOWISE:** UCLA and JPL/Caltech, funded by NASA.
- **Archives:** NASA/IPAC Infrared Science Archive (IRSA), NASA Exoplanet Archive, NASA/IPAC Extragalactic Database (NED).
- **Standards:** HEALPix (Górski et al. 2005) and IVOA HiPS 1.0.
- **Software:** Next.js, React, three.js, React Three Fiber, @hscmap/healpix, zustand (all MIT licensed).

The full acknowledgement texts are in the app under **Data & credits**. The rationale for the data sources is in [docs/image-sources-and-pipeline.md](docs/image-sources-and-pipeline.md), and the navigator plan is in [docs/plan-sky-navigator.md](docs/plan-sky-navigator.md).

## Known limitations

- SPHEREx HiPS tiles stop at 12.9″ pixels. Deeper zoom magnifies them, and the readout says so. Switch to 2MASS for 0.8″ detail.
- The PNG tiles use a fixed asinh display stretch (0–40 MJy/sr). They are for display, not photometry.
- The SPHEREx cube's blank channels (frames 50 and 51) are skipped by the wavelength slider.
