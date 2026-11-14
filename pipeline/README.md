# Mission asset pipeline

Builds the static SPHEREx assets the web app loads for its guided missions: for each of the five
challenge targets, per-pass image stacks on one fixed sky grid, every single exposure, PNG previews,
a contact sheet for human review, and a `manifest.json` that says what is where. Nothing here talks
to a live archive at view time; the app only reads `assets/missions/`.

| file | role |
|---|---|
| `build_missions.py` | target table (`TARGETS`), per-target build, manifests, contact sheets, `index.json` |
| `science.py` | astrometry (proper motion + parallax), grid, reprojection, stacking, centroid, S/N, photometry, display stretch |
| `s3reader.py` | IRSA TAP exposure lists and the S3 byte-range reader (headers, rows, wavelength table), with caching |
| `check_missions.py` | assert-based check of every manifest, file, coverage and the science numbers |

The recipes come from `docs/research/08-detectability-experiment.md` and
`docs/research/09-s3-range-reader-and-remaining-targets.md`; read those for the why.

## Run it (one command)

From the repo root, with a writable cache directory outside the repo:

```sh
uv run --with astropy --with numpy --with scipy --with reproject --with matplotlib --with pillow \
  python -I -B pipeline/build_missions.py --data /path/to/cache
```

Then check:

```sh
uv run --with numpy python -I -B pipeline/check_missions.py
```

- `--data DIR` holds TAP lists (`tap/`), headers (`hdr/`) and frame row bands (`frames/*.npz`).
  Downloads are resumable: every frame is cached as soon as it arrives, so rerunning after a dropped
  connection only fetches what is missing. A cold build reads about 400 frames, roughly 300 MB, and
  takes a few minutes at 8 parallel requests.
- `--seed DIR` (repeatable) adds read-only caches to reuse first (TAP CSVs named `<target>_<det>.csv`,
  frame bands named `<file stem>_h*.npz`, headers named `<file>.fits.hdr`). Missing rows are fetched
  and the merged band is written to `--data`, never into a seed directory.
- `--only wise0855,epsindb` builds a subset. Each target's folder and manifest are written as soon as
  that target is done, and `index.json` is rewritten after every target, so partial runs are usable.
- Treat the cache as untrusted data: never run Python from inside it; pass it as an argument.
- `-B` (and `sys.dont_write_bytecode` in the scripts) keeps `__pycache__` out of the repo.
- Limits built in: 8 concurrent S3 requests, TAP queries one at a time, a 480 MB download stop per run.

## Output

`assets/missions/index.json` lists the missions. Per target, `assets/missions/<id>/`:

- `manifest.json` (schema `mission-manifest/1`): astrometry, grid, groups (detector sets) with passes,
  exposures, display hints, dropped passes; `truth` (movers: measured and predicted motion plus
  literature values; variables: ratios or light-curve numbers plus literature), `series` (variables),
  caveats, provenance (releases with DOIs, choices made after looking), credits.
- `stacks/<group>_p<k>.f32` and `.png`, `exposures/<exposure id>.f32`, `contact.png`.

Every `.f32` is raw little-endian float32, row-major, 121 x 121 values: row 0 is the north (top) row,
column 0 the east (left) column, 3 arcsec per pixel, TAN projection about `grid.ra0, grid.dec0`
(FITS equivalent: CRPIX1 = CRPIX2 = 61, CDELT1 = CDELT2 = -3/3600 deg). Values are MJy/sr after
subtracting a sigma-clipped median background; NaN means no data or a saturated core. In JavaScript:
`new Float32Array(await (await fetch(url)).arrayBuffer())`. PNG previews are 8-bit grey plus alpha
(alpha 0 where the stack is NaN) using the group's `display` stretch:
`t = clip((v - vmin) / (vmax - vmin), 0, 1); out = asinh(t / soft) / asinh(1 / soft)`.

## Add a target

Add an entry to `TARGETS` in `build_missions.py` and its id to `ORDER`:

- `sexa` (J2000 sexagesimal) or `radec`, `epoch`, `pm` (mas/yr, RA already times cos Dec), `plx` (mas), `rv` (km/s), `source`;
- `centre`: the grid centre (for a fast mover, put it so the whole track and any given coordinates fit in 6 arcmin);
- `tap`: (list name, RA, Dec) of the point used for the TAP exposure query;
- `groups`: list of (id, label, detectors), and `primary`: the group used for `truth`;
- `saturated`: True for stars past the detector's saturation limit (leaves the NaN core, measures the wings);
- optional `window`: (lo, hi) um to keep only exposures whose wavelength at the target falls inside (header-only reads).

Add a line to `CAVEATS` and, for a new science check, a few lines to `check_missions.py`.
For variable stars, `rwaur_series` and `rdra_series` show the two photometry recipes (matched
wavelength ratio, and a wing light curve).

## A new SPHEREx release

Exposure lists are cached, so a plain rerun rebuilds from what is on disk. To pick up new data:

```sh
uv run --with astropy --with numpy --with scipy --with reproject --with matplotlib --with pillow \
  python -I -B pipeline/build_missions.py --data /path/to/cache --refresh-tap
```

`--refresh-tap` re-queries IRSA TAP for every target and detector; only new exposures are downloaded
(cached frames are reused). New exposures fall into a new pass (or extend one) by the 20-day gap rule,
and the release name (`DR1`, `QR3`, ...) is read from the file path. Add the new release's DOI to `DOIS`
in `build_missions.py` (source it, do not guess), then run `check_missions.py`. If the archive
reprocesses old files under a new version, the URIs change and those frames are fetched again.

## Method in one paragraph

Per exposure: read only the detector rows that cover the 6-arcmin grid (plus 2 pixels), subtract a
3-sigma-clipped median, and reproject (bilinear) onto the fixed north-up grid; FLAGS are not read or
applied (the bad-pixel mask erases saturated stars), and ZODI is not subtracted (flat across a few
arcmin). Passes split at gaps over 20 days; passes with fewer than 3 exposures are dropped and listed.
Stacks are inverse-variance weighted means (weight from each exposure's robust noise) with per-pixel
4-sigma clipping across exposures when a pass has 5 or more. The target's predicted position at the
stack's effective epoch comes from the astrometry (proper motion plus parallax, geocentric). S/N is a
9 arcsec aperture against the scatter of the same aperture at 300 random empty positions; when S/N is
5 or more, the flux-weighted centroid (12 arcsec radius) is reported, with its error from 100
bootstrap resamples of the exposures.
