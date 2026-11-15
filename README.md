# Planet-X-SPHEREx-NASA

**SPHEREx Sky Navigator**: a 3D navigator for the infrared sky in the style of Apple's Find My, built **only on NASA data**. Pan around the sky from inside the celestial sphere and zoom from a 100° field of view down to 0.05°. The app works out the exact ICRS coordinates under your view as you move, so you never type a coordinate unless you want to.

Built for the NASA Space Apps Challenge 2026.

**Ghid în română:** [Pornire pas cu pas, funcționalități și prezentarea proiectului](docs/GHID-PORNIRE-SI-PREZENTARE.md).

> NASA does not endorse this project. NASA data is used under NASA's data and media guidelines. See **Data & credits** in the app.

## What it does

- **Panoramic navigation.** Opens at a 60° field of view, north up and east left, with the grid hidden. Drag to pan; scroll, pinch or use +/− to zoom. Home (or R) resets the view; Esc stops motion. Legacy globe links retain their sky direction and open in the panorama.
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
npm run benchmark    # CPU geometry and visible-cell query/sort timings (not GPU/FPS)
npm run data         # rebuild public/data/*.json from NASA services (with provenance)
npm run verify:hips  # re-run the tile-orientation check against NASA data
npm run build && npm start
npm run test:production # exercise the latest build locally; NED responses simulated
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
  - Full-resolution tiles stream for the patch in view, at the HEALPix order matching the screen pixel, within a 64-tile desktop / 40-tile compact-screen plan.
  - Coarser tiles fill in while finer ones load.
  - Decoded images and texture pixels use estimated resident budgets of 128 MiB for detail and 64 MiB for previews; these do not include total browser/GPU memory. Visible images are protected, and background preloading is limited.
  - Transfers time out after 30 seconds. Failed details can be retried without losing resident images; reconnecting retries failed detail, preview and place loads.
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

The final verification record and remaining browser/live-data checks are in [docs/stage-6-review.md](docs/stage-6-review.md). For production testing, orientation checks, an exact demonstration sequence and performance recording, use [docs/demo-checklist.md](docs/demo-checklist.md).
## IRSA image comparison

Run `docker compose up --build -d` to start the navigator and the internal Python inventory service together. The web app is available at `http://localhost:3000`. In the navigator, choose **Compare images**, adjust the crop, then **Find images**. Image comparison is restricted to SPHEREx. The first comparison stage includes SPHEREx archive discovery, detector/wavelength/date/product filters, metadata and A/B selections. The comparison page now includes an image slideshow with sequential FITS cutout loading, previous/next navigation, keyboard and wheel navigation, autoplay and observation timestamps. Overlay/subtraction tools remain later work.

If a local Next.js dev server is already using port 3000 over IPv6, `localhost:3000` may reach it while `127.0.0.1:3000` reaches Docker. The comparison service is also published on loopback port 8000 so both web instances can use it. For development, `docker compose up -d comparison` is sufficient alongside `npm run dev`.

For separate local development, run `pip install -r services/comparison/requirements.txt`, start `COMPARISON_DB="$PWD/.comparison-data/inventory.sqlite3" uvicorn app:app --app-dir services/comparison --host 127.0.0.1 --port 8000`, then `npm run dev`. Next.js uses `http://127.0.0.1:8000` by default; `COMPARISON_SERVICE_URL` overrides the internal service address. The browser uses same-origin API routes.

Inventory searches now run as persistent background jobs. Available metadata appears before slower collections finish. Refresh keeps displayed results and A/B selections; updates are explicitly adopted so loaded pages stay fixed. Collection failures, endpoint suspension and verification dates are visible in the inventory. SQLite metadata is stored in the `comparison-metadata` Docker volume; run only one comparison-service process/worker. The default metadata cache is 256 MiB, separate from any future FITS cache. Positive metadata is fresh for 24 hours and retained up to seven days; complete empty results are fresh for 15 minutes. Discovery returns metadata; the slideshow then requests the current FITS cutout and preloads one successor.

The API uses `POST /api/comparison/searches` (region/filter JSON, optional `refresh`), `GET /api/comparison/searches/{id}` for progress, and `GET /api/comparison/searches/{id}/results?version=…&cursor=…` for immutable pages of 100. `/api/comparison/inventory` is retired with HTTP 410. `/api/comparison/health` reports process health separately from the last known IRSA response. See the [resilient inventory review and deterministic acceptance instructions](docs/comparison-resilience-review.md).

See [stage 1 review and acceptance steps](docs/comparison-stage-1-review.md) for limits, verification status, and the test checklist.

For the current archive diagnosis, Compose temporarily sets `IRSA_REQUEST_TIMEOUT_SECONDS`, `SEARCH_EXECUTION_TIMEOUT_SECONDS` and `SEARCH_QUEUE_TIMEOUT_SECONDS` to `0` (no application time limit). Requests can keep waiting until IRSA responds, a network error occurs, or the service is stopped. Restore `25`, `120` and `30`, respectively, to re-enable the approved bounded defaults. Concurrency and metadata size limits remain active. `/api/comparison/health` exposes the effective timeout values (`null` means disabled).

### SPHEREx slideshow

Searches use IRSA SIA `POS=CIRCLE` for `spherex_dr1` and `spherex_qr3`, equivalent to the spatial/release selection in `Irsa.query_sia(pos=(coord, search_radius), collection=[...])`. The cone circumscribes the navigator's square crop. Frames are ordered by observation time, with unknown times last. In the comparison page, use **Previous**, **Next**, **Play/Pause**, or arrow keys/scroll over the viewer. **Next** loads subsequent inventory pages when needed; **View image** opens a specific row in the viewer. Images load inside the app.

The Python service reads the FITS `IMAGE` extension with Astropy, resamples the selected crop to a common north-up/east-left grid, and returns a display PNG. Per-image asinh contrast helps inspection; it is not a calibrated brightness comparison. Missing pixels remain transparent, and wavelength metadata is still labelled as detector range. One FITS cutout downloads at a time, sharing the global two-request IRSA limit. The PNG cache is separate from metadata, defaults to 128 MiB under `/data/previews`, and persists in the existing Docker volume. `PREVIEW_CACHE_DIR` and `PREVIEW_CACHE_BYTES` override it. The browser retains at most six preview blobs and only preloads the next frame. Image requests respect the temporarily disabled IRSA timeout setting.

See [slideshow implementation and acceptance](docs/comparison-slideshow-review.md). Run `python3 scripts/verify-slideshow-live.py` against the Compose web app for a live metadata-to-PNG check.


### Weekly sky challenge

Open `/compare?challenge=weekly`, or **Weekly sky challenge** in the navigator’s featured places.
The challenge revisits the same 6′ square around M101 (ICRS 210.80227°, +54.34895°).
A new challenge week starts Monday at 00:00 UTC. This is the app’s schedule, not a promised IRSA release time.
IRSA describes QR3 ingestion as approximately weekly; the service checks the regional DR1/QR3 inventory every six hours while it is running.
The first inventory establishes a baseline. Later newly discovered product IDs are counted for the current week;
observation dates are shown separately, and no new regional coverage is assumed.

The background worker prepares up to 12 PNG cutouts across observation dates in one detector range
(prefer D3; retain that detector on subsequent checks). It tries up to 24 candidates, skips unavailable or
less than half-covered crops, publishes usable frames progressively, and keeps the previous prepared frames
during refreshes and archive failures. QR3 additions become eligible when the next regional check sees them.
The full existing inventory remains accessible from the challenge.

The manifest and baseline persist beside the metadata database in `challenge/weekly-challenge.json`.
Challenge PNGs have a separate 16 MiB cache at `challenge/images`; the current prepared frames are protected
from eviction. Both persist in the existing Docker volume. Images are served from this cache, independent of
metadata job expiration, with no FITS request on page open. The worker shares the existing archive connection
limit and image-rendering semaphore. It runs inside the single-worker comparison service; leave that service
running for automatic checks. Existing disabled archive timeouts remain unchanged.

Read-only endpoints: `GET /api/comparison/challenge`, `GET /api/comparison/challenge/previews/{id}`,
and `GET /api/comparison/challenge/previews/{id}/image`. A page visit reads preparation state and never starts
an extra search. A stopped service resumes preparation after startup using the persisted manifest and PNGs.
