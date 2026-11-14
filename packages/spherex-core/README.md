# spherex-core

Browser-side SPHEREx data path for arbitrary sky positions: list the Level 2 exposures that cover a position
(IRSA SIA), read small pixel boxes straight from the public S3 bucket with HTTP Range requests, reproject them onto
a fixed north-up grid and stack them per pass. A TypeScript port of `pipeline/` in the hackathon repo, checked
against astropy and the static mission assets. ES modules, strict TypeScript, no runtime dependencies; `src/` uses
only `fetch`, `ArrayBuffer`, `DataView` and typed arrays.

## The three-request recipe (per exposure)

1. `Range: bytes=0-34559`: PRIMARY and IMAGE headers. The IMAGE data offset is the end of the IMAGE header and
   differs per file (25,920 or 28,800 bytes so far), so this request is always made.
2. `Range` over whole IMAGE rows of the box: 2040 big-endian float32 per row, 8,160 bytes per row
   (`offset + y0 * 8160` to `offset + (y1 + 1) * 8160 - 1`). Columns are free.
3. `Range: bytes=-5760`: the WCS-WAVE table (wavelength and bandwidth lookup). Cached per release and detector,
   re-read when the header's spectral_wcs calibration id differs.

Requests 1 and 3 run in parallel, request 2 after request 1. About 750 kB per exposure for the 121 x 121 grid.

## API (all exported from `src/index.ts`)

| module | export | what it does |
|---|---|---|
| fits | `parseHeader`, `findHdu`, `FitsIncompleteError` | 2880-byte header blocks to a keyword map; IMAGE HDU and data offset; error when END is beyond the buffer |
| wcs | `wcsFromHeader`, `gridWcs`, `TanSipWcs` | TAN-SIP `skyToPixel` / `pixelToSky`, 0-based pixels like astropy origin 0; the mission grid |
| wave | `parseWaveTable`, `waveAt` | WCS-WAVE table (grid shape from TFORM1/TFORM2) and bilinear wavelength, bandwidth at a pixel |
| s3 | `s3Url`, `rangeFetch`, `Limiter`, `s3Limiter`, `readExposureBox` | archive uri to S3 URL; Range GET with 3 retries; 6-request pool; one exposure box with WCS, MJD, detector, wavelength |
| frame | `sigmaClippedMedian`, `robustSigma`, `reprojectBilinear`, `prepExposure` | background, noise, bilinear reprojection onto the 121 x 121, 3"/px grid |
| stack | `groupPasses`, `stackFrames`, `measureNear`, `centroid`, `displayHint` | 20-day passes (min 3), 1/sigma^2 stack with 4-sigma clipping, S/N and centroid, asinh display hint |
| astrometry | `propagate`, `separationArcsec`, `whatWasHere`, `predictPosition`, `moversFromCatalogue` | movers catalogue tracks, "what was here", geocentric predicted position with parallax |
| sia | `siaUrls`, `parseSiaCsv`, `handleObservationsRequest` | four SIA collection URLs, CSV parsing, a pure server-route handler (IRSA sends no CORS headers) |
| live | `buildLiveMission`, `DETECTOR_GROUPS`, `availableGroups` | the whole chain for one detector group, as a mission-manifest/1 object with Float32Array frames; group list |

`handleObservationsRequest(searchParams, fetch)` returns `{ status, body }`: 400 on bad input, 200 when at least one
collection answered, 502 when none did. IRSA answers HTTP 502 intermittently (about 1 request in 6 when measured),
so each collection is retried up to 4 times (1, 2, 4, 4 s). If one still fails, the body says so:
`complete: false` and that collection has `ok: false` with the error in `body.collections`. A 200 with
`complete: false` can hold 0 exposures, so check `complete` before telling the user "no coverage".
Wrap it in the web app's server route.

## Tests

```sh
npm install --ignore-scripts      # .npmrc sets legacy-peer-deps, see below
npm test                          # offline: golden fixtures from astropy, mocked S3, synthetic stacks
npx tsc --noEmit                  # strict typecheck
npm run test:live                 # one real S3 box and one real SIA query
npm run test:e2e                  # full chain on Epsilon Indi B, WISE 0855 and a plain field vs the static missions
```

Fixtures in `test/fixtures` were made by `../fixgen/make_fixtures.py` from the repo's Python pipeline (read-only).
The e2e test reads the static missions from the repo path in `test/e2e.test.ts` and skips cases a and b without it.
When SIA comes back incomplete (`complete: false`), cases a and b build from the static mission's own exposure list
so the S3 chain is still tested and comparable; the log says so.

Last e2e run (2026-11-14, Mac in Europe): Epsilon Indi B D2 and WISE 0855 D5+D6 rebuilt with the static passes
(19/13/30/7/24 and 11/37/9/36), stacks r = 1.000000 with max |diff| under 1e-6 MJy/sr, centroids equal to 1e-4 px,
display hints equal to 5 decimals; 93 frames in 12 to 16 s after the list, about 68 MB, 0 S3 failures.

## Known limits

- At most 150 exposures per group are read (evenly spaced in time); deep fields list hundreds.
- No neighbour-star attribution (the static WISE 0855 build credits a blended static star) and no saturation
  handling (ring-core radius, NaN core); `kind` is `"field"` unless astrometry is passed (`"mover"`).
- S/N and bootstrap centroid errors use a seeded mulberry32 generator, not numpy's: statistically equivalent, not
  identical to the static build. No PNG previews (`preview: null`). FLAGS not read, ZODI not subtracted.
- Install note: npm 10.9.8 crashes on vitest's peer dependencies (`Cannot read properties of null (reading
  'edgesOut')`); `.npmrc` sets `legacy-peer-deps=true` to avoid it.
- Finding: the WCS-WAVE grid is not always 9 x 9 for D5. File `2025W19_1B_0181_1D5` has 11 x 11 (note 09 says D5
  and D6 are 9 x 9). The parser reads the shape from the table, never assumes it.
