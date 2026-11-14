# 02: WiseView, Backyard Worlds workflow, prior art

Fetched 2026-11-14. Labels: VERIFIED = read from a live source or source code today; UNVERIFIED = from memory or a secondary snippet. Scratch copies of the code are in <scratch>/w2/ (wvsrc = repo clone, live.js = deployed JS, wv.html = deployed page, fb = coolneighbors/flipbooks).

## 1. WiseView status

- http://byw.tools/wiseview is UP: HTTP/1.1 200, text/html, 18,695 bytes, served 2026-11-14. VERIFIED (curl -sIL http://byw.tools/wiseview).
- **Use http, not https.** https://byw.tools/wiseview and https://byw.tools/ failed at connect (curl exit 7, no response) from this machine. The challenge page links http, so that is why it "could not be loaded" in a browser that forces https/HSTS. VERIFIED (curl rc=7 on https; http 200). The Wayback fallback was not needed.
- Page loads jQuery 3.2.1 (googleapis), jQuery UI 1.12.1, jquery.blockUI, `static/flash3.js`. Footer: "WiseView is operated by the American Museum of Natural History"; "designed for Chrome, known issues in IE"; authors Dan Caselden and Paul Westin. VERIFIED (http://byw.tools/wiseview).
- Routes `/wiseview`, `/wiseview-v2`, `/wiseview-v3` all serve the same page (flash3.html). VERIFIED (wvsrc/wv/www/unoverse.py, class SearchV3_Page).
- Live backend still answers: `GET http://byw.tools/tiles?ra=133.786&dec=-7.244` returns JSON with per-epoch MJD list. VERIFIED. The png-animation Lambda (below) returned valid JSON today. VERIFIED.
- Help text links a tutorial video: https://www.youtube.com/watch?v=23hXbfh1_aA ("Wiseview-V1" by Guillaume Colin). VERIFIED (page text). Not watched.

## 2. WiseView features and URL parameters

State lives in the URL **hash** (`window.location.hash`), not the query string. Defaults below come from `fromUrl()` / `__setDefaults()` in the deployed http://byw.tools/static/flash3.js (lines ~480-650). VERIFIED.

Example (README): `http://byw.tools/wiseview#ra=133.787&dec=-7.245150&size=120&band=2&speed=274&trimbright=521.66&linear=1&color=gray&mode=fixed&coadd_mode=time-resolved&zoom=12` (old V1 syntax; `v1UrlCompat()` converts `coadd_mode`). Modern full example, all keys emitted by `buildUrl()`:

`http://byw.tools/wiseview#ra=133.786245&dec=-7.244372&size=176&band=2&speed=500&minbright=-50.0000&maxbright=500.0000&window=0.5&diff_window=1&linear=1&color=gray&zoom=9&border=0&gaia=0&invert=1&maxdyr=0&scandir=0&neowise=0&diff=0&outer_epochs=0&unique_window=1&smooth_scan=0&shift=0&pmra=0&pmdec=0`

(Default target is WISE 0855-0714 at 133.786245 -7.244372.)

| URL param | UI control | Meaning | Default | Why it helps see motion |
|---|---|---|---|---|
| ra, dec | location box | decimal degrees, or sexagesimal with `:`, spaces, or `h m s d m s`; box accepts "ra dec" | 133.786245 -7.244372 | click image = recentre; click-drag = open new tab with new FOV |
| size | Field of View | arcsec, capped at 2000 in JS; page default value 60, JS default 176 | 176 | small FOV = bigger apparent motion per pixel |
| band | Band[s] | 1=W1, 2=W2, 3=W1+W2 colour (W1 blue, W2 red, green = mean) | 2 | W2 (4.6 um) favours cold brown dwarfs |
| speed | Blink interval (ms) | slider 20-1000 | 500 | flicker rate |
| minbright, maxbright | Min-max pixel values | clip range applied after coadd/subtract, before stretch; symlog slider; accepts "-50px" form | -50 / 500 | tune so faint movers survive stretch |
| linear | Stretch Linearity | asinh "a" parameter, 0 (log-like) to 1 (linear); sent to API as `stretch` | 1.0 | asinh keeps bright stars from swamping faint sources |
| window | Sliding window (yrs) | each frame coadds all epochs within this width; 0 = raw time-resolved epochs; slider max = full baseline | 0.5 (reset button sets 0.75) | deeper frames = fainter sources visible |
| diff | Difference imaging | for each frame, subtract coadds outside the window from coadds inside it | 0 | static sources cancel; movers appear as +/- pairs (dipoles) |
| diff_window | Exclusion window (yrs) | gap around target epoch excluded from the subtraction | 1.0 | avoids subtracting the mover's own flux |
| outer_epochs | Skip middle epochs | show only first and last frames (the "pre-post" mode) | 0 | 2-frame blink of the extremes, longest lever arm |
| unique_window | Skip duplicate windows | drop frames identical to previous | 1 | consistent animation speed |
| scandir | Separate scan directions | split forward vs backward scan coadds and show the two animations sequentially | 0 | real high-parallax objects and some artifacts appear in only one direction |
| smooth_scan | Smooth by scan direction | smooth cutouts to negate scan-direction-dependent PSF features | 0 | removes PSF spikes that mimic motion |
| neowise | Use only NEOWISE imagery | drop pre-NEOWISE (2010-11) images from coaddition | 0 | cleaner, consistent depth |
| invert | Invert pixel values | 255-value before PNG | 1 (note JS quirk: `(map.invert \|\| 1) == 1`, so 0 cannot be set from the URL) | dark sources on white |
| maxdyr | Maximize dynamic range | set min/max to the post-clip data extremes; frame intensities then not comparable across settings. API key is `max_dyr` | 0 from URL (UI checkbox default checked) | UNVERIFIED which wins at first load |
| color | colormap | `gray` etc. (JS line commented out) | gray | cosmetic |
| zoom | Zoom | CSS scale 0.5-20, step 0.5 | 9 | size on screen |
| border | Border epoch 0 | white dashed border when the loop restarts | 0 | tells true consistent motion from a hop back at loop end |
| gaia | Gaia DR3 overlay | catalogue positions, propagated by pmra/pmdec/parallax to each frame's MJD (base 2015.5 = MJD 57204) | 0 | shows which dots are known stars |
| shift, pmra, pmdec | Shift and add (mas/yr) | shift each epoch by proper motion before adding; sent as `pmx=(pmra/1000)/2.75`, `pmy` (pixels/yr) | 0 | co-add on a guessed motion to make a mover a sharp static point (deep detection) |
| synth_a, synth_a_sub, synth_a_ra, _dec, _w1, _w2, _pmra, _pmdec, _mjd | Synthetic Object | inject (or subtract) a fake point source with given W1/W2 mags, motion and reference MJD; same set for synth_b | off | test whether a suspected mover is real: subtract a model and see if it vanishes |

Other UI: epoch legend (`+` added, `-` subtracted, `.` unused per frame), per-frame date label via `mjd_to_aarondate`, links to Legacy Survey Sky Viewer (layer unwise-neo11), SIMBAD, VizieR, Pan-STARRS cutout page, and "Nearest Zooniverse Subjects" (Talk links). Presets: Defaults, Diff, Pre-post, Parallax-enhancing, Time-resolved. V1-to-V2 mode mapping is in the page Help tab (time-resolved = window 0; full-depth = window max; pre-post = Skip middle epochs; parallax-enhancing = Separate scan directions with window max). All VERIFIED (wv.html, live.js).

Lower panel: Pan-STARRS g/i/y composite (`/pawnstars`, ps1images.stsci.edu fitscut, asinh, autoscale 98, output 256 px) for optical context. VERIFIED (unoverse.py).

## 3. Internals

### Source and licence
- Repo: https://github.com/backyardworlds/wiseview ("WiseView: Visualizing Motion and Variability of Faint WISE Sources"), public domain (Unlicense text). ASCL: https://ascl.net/1806.004 (Caselden, Westin, Meisner, Kuchner, Colin). VERIFIED.
- Repo files: wv/www/unoverse.py (Flask + flask_restful), wv/www/static/flash3.js (1355 lines; deployed copy is 1362 lines and newer), wv/www/templates/flash3.html, wv/common/{unwise_tiles,unwise_cutout,image_parsing,xref,s3_wrapper}.py, uwsgi.ini. VERIFIED.
- **The repo is the OLD architecture.** The deployed JS no longer calls `/cutout`; it calls a Lambda. Do not copy the repo's image path blindly.

### Frontend
- Plain jQuery + jQuery UI sliders, two stacked `<canvas>` elements (images + overlay), `setInterval` blink loop. No React/bundler. Frames are `<img>` elements preloaded then drawn to canvas. VERIFIED (live.js).

### Backend, current (deployed)
- Browser calls **`GET https://moo23y1au0.execute-api.us-west-2.amazonaws.com/default/png-animation`** (AWS API Gateway + Lambda; an older URL https://vjxontvb73.execute-api.us-west-2.amazonaws.com/png-animation is in the flipbooks repo). Query keys: ra, dec, band, size, max_dyr, minbright, maxbright, invert, stretch, diff, scandir, outer, neowise, window, diff_window, unique, smooth_scan, shift, pmx, pmy, synth_[ab]_{ra,dec,w1,w2,pmra,pmdec,mjd,sub}. VERIFIED (live.js lines 938-980; I ran one call, 200 OK).
- Response JSON: `ims` (list of S3 keys like `cutouts/<uuid>`), `min`, `max` (pixel range, drives slider limits), `all_mjds` (every epoch MJD), `mjds` (MJDs per frame), `epochs` (indices per frame), `neg_epochs` (diff mode), `scandirs`, and WCS keys CRPIX1/2, CRVAL1/2, NAXIS1/2. VERIFIED (live response).
- PNG frames are fetched from **https://amnh-citsci-public.s3-us-west-2.amazonaws.com/<key>**, i.e. server-rendered, already stretched PNGs on public S3. Browser retries up to 6x on HTTP 504. VERIFIED (live.js lines 925, 1010-1020).
- Gaia overlay: POST to https://n7z4i9pzx8.execute-api.us-west-2.amazonaws.com/prod/catalog/gaiadr2 with ADQL on `gaiadr3.gaia_source` (ra, dec, parallax, pmra, pmdec; CIRCLE radius = size/3600*2.75 deg). VERIFIED.
- Tiny Flask app on AMNH servers (uwsgi: 4 processes x 8 threads, uwsgi cache2 30000 items LRU) still serves `/tiles`, `/xref`, `/pawnstars`, `/cutout`. VERIFIED (uwsgi.ini, unoverse.py).
  - `GET /tiles?ra&dec` -> JSON {tiles:[{coadd_id, px, py, epochs:[{band, epoch, mjdmean, forward}]}]}
  - `GET /cutout?ra&dec&size&band(1|2)&epoch[&covmap]` -> FITS cutout (+coverage-map HDU), 404 if no data
  - `GET /xref?ra&dec` -> Zooniverse subject ids near the point
  - `GET /pawnstars?ra&dec&size` -> URL of a Pan-STARRS fitscut composite

### Data source and tiling
- Pixels: **unWISE time-resolved coadds** (Meisner et al.), stored in a private S3 bucket (`amnh-citsci-private`, us-west-2) at `unwise/data/timeresolved/e%03d/<coadd_id[:3]>/<coadd_id>/unwise-<coadd_id>-w{1,2}-img-m.fits`; coverage maps `...-n-m.fits.gz`. VERIFIED (unwise_cutout.py).
- Tile: 2048 x 2048 px, **2.75 arcsec/px** (CD = 0.000763888... deg), so 1.56 deg per side; TAN projection, reference pixel 1024.5. Tile lookup: ball tree on tile centres, pick the tile whose nearest edge is furthest. VERIFIED (unwise_tiles.py).
- Epoch table: columns include COADD_ID, BAND, EPOCH, MJDMIN/MAX/MEAN, FORWARD (scan direction), N_EXP, covmin/max/med, astrometric RMS. Repo index file `tr_neo7_index-mjd-forward.fits`. VERIFIED.
- Epoch count and cadence (live API, 2026-11-14, RA 133.79 Dec -7.24): 23 epochs, e000 MJD 55320.9 (2010-05) to e022 MJD 60417.0 (2024-04), roughly 6-month cadence with a 2011-2013 hibernation gap (epochs jump from MJD 55512 to 56784). `forward` flag alternates because WISE scans forward then backward each pass. VERIFIED (response data). Meisner et al. describe ~16 all-sky maps per band through 2020: VERIFIED (arXiv 2209.14327 abstract).
- Bands: W1 3.4 um, W2 4.6 um only. Native WISE resolution about 6 arcsec FWHM: UNVERIFIED (memory).
- Papers: Lang 2014 AJ 147,108 (arXiv 1405.0308); Meisner, Lang, Schlegel 2017 AJ 153,38 (arXiv 1603.05664); Meisner et al. 2017 (arXiv 1705.06746); unTimely catalogue, Meisner et al. 2023 (arXiv 2209.14327, 23.5 billion W1 detections). VERIFIED (unwise.me, arXiv abstracts).

### Frame construction (from UI help + tooltips; Lambda source is NOT public, so exact algorithm UNVERIFIED)
- window = 0: one frame per epoch. window = w: each frame coadds every epoch within w years of the target epoch. `unique` drops duplicates. `outer` keeps first and last frames. `scandir` partitions frames by `forward` flag. `diff`: sum of in-window minus sum of out-of-window (excluding `diff_window`), giving the +/- legend. VERIFIED as UI semantics (tooltips); implementation UNVERIFIED.
- Alignment: a repo `backyardworlds/scalar_astrom_tweak` ("sinc shift to align time-resolved unWISE coadds based on SCAMP solutions") exists; cutouts in the repo use template WCS and `TODO: FIX SCAMP`. VERIFIED existence; role UNVERIFIED.

### Image stretch
- Server-side. Repo code `wv/common/image_parsing.py complex()`: clip to [min(data, -250), maxbright], rescale 0-1, `astropy.visualization.AsinhStretch(linear)`, rescale; "percent" mode clips at a percentile, "fixed" at an absolute value, "adapt" auto-finds bounds via a Scharr-edge-weighted heuristic. Hot-pixel removal by 3x3 median filter exists but is commented out in the main path. The deployed page still states "stretched with astropy.visualization.AsinhStretch, where Linear controls the 'a' parameter". VERIFIED (code + help text).
- BYW blog 2017: purely asinh normalization can make modest proper motions hard to see; "adapt" is work in progress. https://blog.backyardworlds.org/2017/09/13/wiseview/ (via search snippet; UNVERIFIED in full).

### Caching and performance
- Frames pre-rendered into public S3 (CDN-like, browser fetches `<img>` in parallel); API retries on 504; uwsgi cache2 (30000 items LRU), client-side `Memoizer(32)` for coadds (buggy: `this.keys.length = this.size` is an assignment). All frames loaded before blinking; `$.blockUI` overlay while loading. VERIFIED (uwsgi.ini, live.js).

## 4. How people actually use it

- Backyard Worlds: Planet 9 launched 2017-02-15 on Zooniverse (PI Marc Kuchner). Volunteers view flipbooks (4-frame animations of unWISE difference images, per the guide quoted below), flag movers, then fill a "Think You've Got One" form. WiseView is the follow-up tool volunteers use for any candidate, to see the whole 2010-2024 time series with deeper coadds. https://en.wikipedia.org/wiki/Backyard_Worlds (VERIFIED via fetch); https://blog.backyardworlds.org/2017/09/13/wiseview/ .
- Typical loop (assembled from sources): spot mover in flipbook; open WiseView at that RA/Dec; blink time-resolved and diff modes; check scan direction split; check Gaia/SIMBAD/VizieR/Legacy Survey/Pan-STARRS for a known high-PM star; check IRSA for catalogue entry; submit form. Guillaume Colin's video covers BYW basics, SIMBAD, IRSA and the form: https://www.youtube.com/watch?v=AvQd-UgrWAA . UNVERIFIED as a complete workflow (not watched).
- Field-guide lessons (citizen scientist Michaela Allen, BYW blog 2023-04-27, https://blog.backyardworlds.org/2023/04/27/...): a true fast mover appears in all four frames (reference example WISE 0855-0714); ghosts show in only two frames and do not move; extra noise near the South Atlantic Anomaly (about Dec -25); "dipoles" are objects moving differently from the rest; many bright dipoles are high-PM stars found in SIMBAD, so always check; misalignment from slight telescope shifts makes many apparent dipoles ("petal" effect, Kuchner), do not report; bad frames (stripes, black, half-cut) get tagged #badimage. VERIFIED (fetched Spanish text).
- Most used features (inference from help page + presets): window slider, diff toggle, scan-direction split, Gaia overlay, links bar. UNVERIFIED as usage statistics.
- Known limitations: Chrome-only support; stretch makes small PM hard to see; adaptive intensity imperfect; all frames must be downloaded first; epoch gap 2011-2013; WISE ~6 arcsec resolution means crowded fields smear. No Zooniverse Talk threads were read (not searched). UNVERIFIED beyond the first two.
- Related volunteer tool: AstroToolBox (Frank Kiwy, Java; blinks WISE epochs plus DSS, SDSS, 2MASS, DECaLS time series with catalogue overlays and a photometric classifier). https://blog.backyardworlds.org/2022/03/10/astrotoolbox/ , https://github.com/fkiwy/AstroToolBox . VERIFIED.

## 5. Discovery record

- First discovery (June 2017): WISEA J110125.95+540052.8, T5.5 at ~34 pc, found six days after launch; paper Kuchner et al. 2017 ApJL 841, L19, arXiv 1705.02919. VERIFIED (search results on arXiv/ADS/AAS Nova).
- Progress (Wikipedia timeline): Jul 2018 42 spectroscopically confirmed brown dwarfs (14 within 20 pc); Jul 2019 131 confirmed (70 T, 61 L), 1,305 candidates, ~100 Y candidates; >100,000 participants by Aug 2020. https://en.wikipedia.org/wiki/Backyard_Worlds VERIFIED.
- **Three Thousand Motion-Confirmed L and T Dwarf Candidates** (arXiv 2604.01323, 2026): 3,006 candidates, 2,357 L-type, 649 T-type, plus 80 likely L/T without significant motion; 28 new comoving companions; 9 candidate binaries; "would more than double the number of known L and T dwarfs". VERIFIED (arXiv abstract fetched). NASA also quotes "over 3,000 discoveries in 10 years" (search snippet, UNVERIFIED).
- "The Accident": WISEA J153429.75-104303.3 (WISE 1534-1043), enigmatic, possible first Y-type subdwarf (Wikipedia, VERIFIED as stated there; primary paper not read). W0830+2837 = WISEA J083011.95+283716.0, first Y dwarf found by volunteers, ~11.2 pc, ~350 K, "missing link planetary-mass object", arXiv 2004.12829 (Bardalez Gagliuffi et al. 2020; author attribution UNVERIFIED).
- 20 pc census: Kirkpatrick et al. 2021 census of 525 L/T/Y dwarfs (Wikipedia reference); "full-sky 20-pc census of ~3,600 stars and brown dwarfs", arXiv 2312.03639. VERIFIED titles.
- Other: 95 cold dwarfs with Spitzer follow-up incl. 5 new Y dwarfs (arXiv 2008.06396); CWISE J0146-0508AB widest field BD binary, ~129 au (arXiv 2202.02315); Ross 19B (arXiv 2108.05321); WISE 2150-7520AB (arXiv 1911.04600); extreme T subdwarfs (arXiv 2007.03836, 2106.01387, 2108.10308, 2411.01378); 89 comoving companions (arXiv 2403.04592); hypervelocity L subdwarf (arXiv 2407.08578); Y dwarf CWISE J1055+5443 (arXiv 2310.09524). VERIFIED titles via arXiv API.
- Challenge page claim "hundreds of discoveries" is conservative against the 3,006 figure.
- Cool Neighbors: launched June 2023, targets faint cold dwarfs, uses machine learning to pre-select images. VERIFIED (Wikipedia). Flipbook generation code: https://github.com/coolneighbors/flipbooks (calls the same png-animation API; README says default FOV "~2.75 arcsec per pixel"). VERIFIED.

## 6. Comparable tools and prior art

| Tool | What it does | URL | Status |
|---|---|---|---|
| WiseView | Blink of unWISE time-resolved coadds for any RA/Dec | http://byw.tools/wiseview | VERIFIED up |
| unTimely Catalog Explorer | Python: catalogue search, finder charts, light curves, per-epoch W1/W2 GIF blinks with detections | https://github.com/fkiwy/untimely_catalog_explorer ; catalogue viewer https://catalog.unwise.me/viewer.html | VERIFIED (README, search) |
| AstroToolBox | Java desktop blinker over WISE epochs + other surveys | https://fkiwy.github.io/AstroToolBox/ | VERIFIED |
| Legacy Survey Sky Viewer | Layers unwise-neo4/6/7(/11) as static epoch coadds; no blink | https://www.legacysurvey.org/viewer | layers from repo code (VERIFIED), no-blink UNVERIFIED |
| unWISE coadd search | per-tile coadd download | https://unwise.me/imgsearch/ | VERIFIED |
| flipbooks (Cool Neighbors) | scripted PNG/GIF generation via WiseView API | https://github.com/coolneighbors/flipbooks | VERIFIED |
| IRSA Finder Chart | multi-survey cutouts (2MASS, WISE, DSS, etc.) side by side | https://irsa.ipac.caltech.edu/applications/finderchart/ | UNVERIFIED (memory) |
| IRSA Viewer / SPHEREx Data Explorer (Firefly) | tiled, locked, 3-colour views, cube plane stepping, Auto play over loaded images | https://irsa.ipac.caltech.edu/onlinehelp/spherex/spherex/visualization.html | VERIFIED (fetched) |
| ESASky, Aladin Lite | HiPS sky viewers with survey/mission switching, no per-epoch blink by default | https://sky.esa.int , https://aladin.cds.unistra.fr/AladinLite/ | UNVERIFIED (memory) |
| Daily Minor Planet (Zooniverse) | volunteers judge 4-exposure sequences (6-7 min apart) of Catalina Sky Survey as real vs artifact; 1,200 new objects reported, ~3,700 volunteers | https://www.zooniverse.org/projects/fulsdavid/the-daily-minor-planet | VERIFIED (search) |
| Catalina Outer Solar System Survey, Active Asteroids, Kilonova Seekers | Zooniverse flipbook-style projects (TNOs; comae/tails; transient candidates) | Active Asteroids launched Aug 2021, 16 active objects reported (search snippet); COSSS likely inactive; Kilonova Seekers not confirmed | partly UNVERIFIED |
| ZTF / Pan-STARRS blink tools | Pan-STARRS cutout service used by WiseView; ZTF viewers not checked | https://ps1images.stsci.edu/cgi-bin/ps1cutouts | VERIFIED for PS1 |

### SPHEREx-specific gap (stated plainly)
- **No existing SPHEREx blink or time-series image viewer was found.** The IRSA SPHEREx Data Explorer visualization page lists no blink mode and no time-series viewing; "flip" means y-axis mirror; the only auto-advance is "Auto play" through loaded images in the expanded view; cube planes are wavelength, not time. VERIFIED (fetched page 2026-11-14).
- IRSA lists a "Variable Source Inspector" as a planned tool for multi-epoch spectra, availability unconfirmed. UNVERIFIED (search snippet; https://arxiv.org/pdf/2511.02985 mentions it).
- The SPHEREx catalogue pipeline rejects variable sources and moving solar-system objects (search snippet, UNVERIFIED), so the images are the only place movers survive.
- Other gap: SPHEREx has no fixed band-per-epoch structure like WISE; each image is a different wavelength per pixel (per the Data Explorer's wavelength readout), so a naive blink mixes colour and time (see section 7).

## 7. Implications for the viewer

Opinions, not sourced facts.

Transfer well:
- URL-hash state with named params (ra, dec, size, speed, window, diff, stretch) so any view is shareable; the hash is how WiseView made candidates reproducible.
- Pre-rendered, stretched PNG frames from an API plus a client-side canvas loop; preload all frames, show a loading overlay.
- Asinh stretch with an explicit "linear" knob and clip min/max; show the epoch legend and per-frame date.
- Difference imaging and an exclusion window: static sources cancel, movers become +/- dipoles; this is the single most useful motion cue.
- Border or marker on frame 0 to avoid the "hop back" illusion; blink speed slider; click to recentre.
- Cross-links to SIMBAD, VizieR, Legacy Survey, Pan-STARRS at the current coordinates; a Gaia overlay propagated to each frame's MJD.
- Lightweight alternative to the repo's backend: skip Flask and S3 entirely if SPHEREx cutouts can come directly from IRSA/cloud (other workers cover access).

Transfer badly or need rethinking:
- WiseView assumes one fixed band set (W1/W2) per epoch on a fixed tile grid; SPHEREx images carry a wavelength per pixel (spectral variation across the detector), so epochs at a sky position differ in wavelength. Blinking raw frames conflates spectral gradient with motion. Group by wavelength channel or normalise before differencing.
- Sliding-window coadds assume many repeated epochs; SPHEREx revisits (about 4 full-sky passes over the mission) are far fewer, so expect a handful of frames, not 23. A frame strip plus blink may beat a long loop.
- Scan-direction split (forward/backward) is WISE-specific; the SPHEREx analogue would be per-observation/detector or per-band separation.
- The WiseView server code is not reusable verbatim (the Lambda is closed, and the repo uses the retired `/cutout` path); reimplement the stretch with astropy AsinhStretch as in image_parsing.py.
- Shift-and-add and synthetic-object injection are expert features; for a 2-day hackathon, ship blink + difference + stretch + shareable URL first.
