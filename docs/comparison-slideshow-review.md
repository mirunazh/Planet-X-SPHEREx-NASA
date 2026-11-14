# SPHEREx slideshow

The comparison page now displays SPHEREx exposures inside the application. It searches the DR1 and QR3 wide-survey collections, loads a FITS cutout for the selected exposure, and renders that cutout as a PNG. External IRSA links remain optional provenance/download links.

## Interaction

- The first available exposure loads automatically. Frames are ordered by observation time, with unknown times last.
- Previous/Next, left/right arrow keys while the viewer is focused, and scrolling over the image change the exposure. Scrolling outside the viewer still scrolls the page.
- Play advances only after the current image has decoded, at a selectable 1/3/5/10-second interval. Backgrounding the page pauses playback. At startup the viewer can skip up to four unavailable exposures to find a first displayable frame, reporting the skipped count. Once a frame has been displayed, an image error pauses playback and offers Retry image; Next remains available.
- Only the current frame and one successor are requested. The browser retains at most six PNG blob URLs and revokes them on eviction/unmount.
- Next automatically loads the next stable inventory page at a page boundary. View image opens an inventory row directly. Newly published inventory versions still require explicit adoption, preserving already loaded pages. A/B selections remain available in a collapsed section.

## Search and image pipeline

The async service issues SIA `POS=CIRCLE` queries for `spherex_dr1` and `spherex_qr3`. This uses the same SIA selection as `Irsa.query_sia(pos=(coord, search_radius), collection=[...])`, without introducing a blocking Astroquery transport. The circle encloses the square selected in the navigator, including across RA zero and near the poles. The actual rendered region remains that square. Some cone matches may not have usable pixels in the crop; those frames report the limitation instead of inventing pixels.

In a live comparison during this session, a circular query for M101 returned 256 metadata rows in about 9 seconds, while a polygon query at the same position had not returned within a separate 30-second diagnostic limit even with MAXREC=5. This motivated switching the discovery predicate to the user's circle-based example. It is an observed difference for this query, not a general archive performance guarantee.

`POST /api/comparison/searches/{id}/previews` accepts a version and product ID, never an arbitrary image URL. The service resolves the product from that search's immutable result version, builds an allowlisted IRSA SPHEREx IBE cutout URL, and starts background preparation. `GET /api/comparison/previews/{id}` reports queued/downloading/rendering/ready/error; `GET .../{id}/image` returns the prepared PNG. Slow downloads do not occupy a long-running browser HTTP request.

Astropy reads the FITS IMAGE extension from downloaded bytes. A celestial WCS maps it to a common 384×384 TAN grid, north up/east left. Bilinear resampling is for display only. Nonfinite/out-of-footprint pixels are transparent. Each frame gets a percentile-based asinh display stretch. The viewer labels detector wavelength ranges and explicitly states that independent contrast and wavelength differences do not establish variability; subtraction/photometric comparison is outside this stage.

FITS requests use a FITS Accept header and retry transient network/429/502/503/504 failures twice. One preview downloads/processes at a time, sharing the metadata client's global two-request IRSA semaphore. At most eight preview jobs are queued. Downloads are capped at 64 MiB; source IMAGE arrays are capped at 2048² pixels before decoding. PNGs are cached separately from metadata in `/data/previews`, in the persistent Docker volume, with a default 128 MiB LRU budget. No raw FITS images are retained by the preview cache. Successful PNGs can be reused after restart. User-requested disabled timeout settings remain in effect.

## Verification

- 197 TypeScript tests and 31 Python tests pass, including proxy binary integrity, URL and product membership checks, preview deduplication/retry/persistence, north-up orientation, RA wrap/poles, missing pixels, invalid FITS/WCS, cache cleanup, and cancellation of stale browser requests. Existing inventory recovery tests remain passing.
- Type checking, optimized Next.js build and compiled production-handler checks pass. The UI detector reports no findings. Both Docker images build with Astropy installed.
- The production component was exercised in a real browser against the isolated FITS fixture: first image load, autoplay advancement, pause on simulated HTTP 503, successful Retry image, direct row selection, automatic 100→101 pagination, and wheel navigation 101→102 were observed through browser accessibility state.
- The browser screenshot facility returned a blank frame, and responsive emulation triggered a ScreenCaptureKit error; desktop/mobile pixel-level screenshot acceptance could not be completed in this environment. The actual PNG generated from a live IRSA FITS cutout was opened and inspected independently.
- A real cutout from IRSA's official example downloaded successfully (3,954,240 bytes), including IMAGE, FLAGS, VARIANCE, ZODI, EPSF and WCS-WAVE extensions. Rendering its 2′ crop produced a valid 384×384 PNG with partial coverage correctly reported. The deployed end-to-end circular SIA search found 393 exposures. Its first candidate returned HTTP 503; the second candidate successfully downloaded, rendered, and was returned by the web PNG proxy (87,382 bytes). The complete cached-metadata-to-PNG check took 22.2 seconds, including the failed candidate. The PNG was saved locally and visually inspected. The live application was then opened in a real browser: it reported 393 found exposures, automatically skipped the first failed D6 frame, and displayed the D3 exposure from 2025-05-09 03:33:55 UTC inside the slideshow.

## Repeatable acceptance

```sh
npm test
npm run typecheck
npm run build
npm run test:production
PYTHONPATH=services/comparison services/comparison/.venv/bin/python -m unittest discover -s services/comparison/tests -q
docker compose up --build -d
python3 scripts/verify-slideshow-live.py
```

For deterministic browser acceptance, run `.venv/bin/python tests/browser_fixture.py` from `services/comparison`, then `COMPARISON_SERVICE_URL=http://127.0.0.1:8001 npm start -- --port 3100` from the repository root (after building). Open `http://127.0.0.1:3100/compare?ra=0&dec=0&size=10`. The fixture uses synthetic FITS data, labels rows Fixture exposure, and never contacts IRSA. Exposure 3 fails its first three download attempts with HTTP 503, exhausting automatic retries, then succeeds on manual retry. A metadata refresh deliberately fails, retaining the displayed inventory.

Use Play to observe sequential image loading, retry exposure 3, browse using scroll/arrow keys, and select the last loaded row then Next to load the next page. Repeat at a 390px viewport when browser capture is available. Open a real sky region in the ordinary Compose app to use live data.

Sources: [IRSA cutout API](https://irsa.ipac.caltech.edu/ibe/cutouts.html), [official SPHEREx cutout tutorial](https://caltech-ipac.github.io/irsa-tutorials/spherex-cutouts/), [SPHEREx data access](https://caltech-ipac.github.io/spherex-archive-documentation/spherex-data-access/).
