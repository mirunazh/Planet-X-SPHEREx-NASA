# Static SPHEREx image index

Answers "which SPHEREx Level 2 images cover this sky position" from static files, so the web app never waits
on the IRSA archive at view time. The builder pulls the metadata of every public Level 2 image once, from IRSA
TAP, and writes compact binary shards to `assets/index/`; the TypeScript reader in `packages/spherex-index`
fetches `meta.json` plus a few shards and tests each candidate footprint exactly. Its output has the shape of the
SIA path's `Exposure[]` (spherex-core `sia.ts`, same de-duplication and sort), so it feeds `buildLiveMission`
unchanged.

| file | role |
|---|---|
| `fetch_rows.py` | TAP rows in resumable weekly chunks (CSV), plus the archive's own counts per collection and detector |
| `build_index.py` | rows to `assets/index/meta.json` + `assets/index/cells/<i>.bin`; picks the sharding by measured cost; completeness check |
| `check_archive.py` | live TAP `CONTAINS(POINT, poly)` truth at 30 fixed positions (compared by `packages/spherex-index/test/archive.test.ts`) |

Python is stdlib + numpy (+ astropy for `check_archive.py`); downloads go through `curl` like
`pipeline/s3reader.py`. Every request to IRSA: at most 2 in flight, exponential backoff (5 s doubling to 120 s),
a generic User-Agent, and a hard stop after 10 minutes without a successful answer (finished chunks stay on disk).

## Rebuild from scratch

```sh
ROWS=/some/scratch/dir/rows        # outside the repo: about 0.5 GB of CSV
uv run --with numpy --with astropy python -I pipeline/index/fetch_rows.py --out $ROWS
uv run --with numpy --with astropy python -I pipeline/index/build_index.py --rows $ROWS
cd packages/spherex-index && npm install --ignore-scripts --legacy-peer-deps && npm test && npx tsc --noEmit
```

`fetch_rows.py` first stores the archive's count per collection and detector (`counts.json`), then one CSV per
7-day window of observation start time (`rows_<mjd0>_<mjd1>.csv`, written to `.part` and renamed when complete).
A rerun fetches only missing windows. `build_index.py` refuses to write an index whose row counts differ from
`counts.json` unless `--allow-partial` is given (then `meta.json` says what is covered).

## Update when new data arrive

- **New quick release in the same processing (QR4 and so on):** the new images have later observation times.
  `fetch_rows.py --out $ROWS --since <meta.json newestMjd>` refetches the windows that end after that MJD (and any
  window that never completed), refreshes `counts.json`, and `build_index.py` rebuilds everything from the CSVs in
  a minute or so. Deploy copies `assets/index/` as it copies `assets/missions/`.
- **Reprocessed release (new file versions, new collection names):** the URIs change for old observations too, so
  delete the rows directory and run the full rebuild. Unknown collection names are added to `meta.collections`
  automatically (up to 8); a URI that does not match the Level 2 path template stops the build with that URI.

## Format (`spherex-index/1`)

`meta.json` (compact JSON): `format`, `builtAt`, `oldestMjd`, `newestMjd` (mid-exposure), `rows`, `rowBytes`,
`timeUnitDays`, `geometry` (`refRaUnitDeg`, `refDecUnitDeg`, `cornerUnitRad`, `rMaxDeg`, `vertices`),
`collections`, `prefixes` (`[release dir, plan, version, t0 MJD]`), `counts` (per collection, per detector, per
collection and detector, plus the comparison with the archive count), `sharding` (the parameters chosen and
their measured cost), `credit` (data credit, IRSA acknowledgement, DOIs), `cells` (`[ra0, ra1, dec0, dec1, rows]`,
file `cells/<index>.bin`, no file for an empty cell).

Each cell file is a plain array of fixed 28-byte little-endian rows (read with `DataView`, no library):

| offset | type | content |
|---|---|---|
| 0 | u16 | prefix index: release dir, plan (`2025W17_4B`), version (`l2b-v27-2026-196`), t0 |
| 2 | u16 | exposure number (14 bits) and sub-exposure minus 1 (2 bits) |
| 4 | u32 | mid-exposure time offset from t0 in 1e-6 d (24 bits), detector minus 1 (3 bits), collection index (3 bits) |
| 8 | u16 | reference RA, unit 360/65536 deg |
| 10 | i16 | reference Dec, unit 90/32767 deg |
| 12 | 4 x (i16, i16) | footprint corners in gnomonic (TAN) coordinates about the reference point, unit `cornerUnitRad` |

The file URI is rebuilt as
`<release>/level2/<plan>/<version>/<det>/level2_<plan>_<nnnn>_<sub>D<det>_spx_<version>.fits`, the S3 key (prefix
`https://nasa-irsa-spherex.s3.us-east-1.amazonaws.com/`), equal to the archive URI minus `ibe/data/spherex/`.
The builder checks every URI against this template (and the detector against `energy_bandpassname`).

**Exact footprint test.** The footprint polygon (`s_region`, 4 corners, great-circle edges as in ADQL) is stored
as its corners in the gnomonic projection about the row's own reference point (the quantised mean of the
corners). A gnomonic projection maps great circles to straight lines, so after projecting the query point about
the same reference the planar even-odd test is exact for the stored corners, with no special case at RA 0/360 or
the poles. The only approximation is corner quantisation: `cornerUnitRad` is about 0.28 arcsec, so a corner
moves by at most 0.14 arcsec (SPHEREx pixels are 6.2 arcsec; the SIA path itself queries a 3.6 arcsec circle).

**Sharding.** Rows go to the cell whose RA/Dec box holds their reference point. A footprint can contain a point
only if the point lies within `rMaxDeg` (the largest reference-to-corner distance in the data) of its reference
point, so the reader fetches every cell whose box meets the RA/Dec bounding box of that cap (a superset, with RA
wrap and pole caps handled). Cells start as about 10-degree equal-area RA/Dec cells and are halved along their
longer side while they hold more than a byte budget and stay at least a few degrees wide; the builder tries a
small grid of (band height, byte budget, minimum side) on the real rows, measures the request count and bytes at
10,008 probe positions (a Fibonacci sphere plus the ecliptic and celestial poles and RA 0), and keeps the one with
the smallest worst-case bytes that needs at most 9 cell requests and at most 999 cells.

MEASURED

## Hosting

Static files next to the web app: a deploy copies `assets/index/` exactly as it copies `assets/missions/`
(`baseUrl` is wherever that directory is served, for example `/assets/index/`). No server code, no CORS question
(same origin), no archive call at view time. Long cache lifetimes are fine for `cells/*.bin` within one build;
`meta.json` should be revalidated, since a rebuild rewrites both.

## Data use and credit

The index holds only public archive metadata (no pixels). `meta.json` carries the credit the app should show:
SPHEREx Level 2 images (NASA/JPL-Caltech), metadata and data from the NASA/IPAC Infrared Science Archive with
IRSA's standard acknowledgement, and the release DOIs (DR1 10.26131/IRSA678, QR3 10.26131/IRSA662), as in note 03.
