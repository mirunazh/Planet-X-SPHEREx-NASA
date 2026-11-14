# 09: S3 byte-range reader, and Epsilon Indi B, R Draconis, RW Aurigae in real SPHEREx data

Worker 9, 2026-11-14. Exploratory analysis on real SPHEREx Level 2 files (DR1 + QR3), not product code. Every number below comes from a script in `experiments/` (prefix `exp09_`) and its JSON or log:

| file | what it does |
|---|---|
| `experiments/exp09_reader.py` | the range reader (requests A, B, C, optional ZODI chain), plus `validate`, `timing` and `zodi` subcommands |
| `experiments/exp09_tap.py` | IRSA TAP exposure lists (2 queries at a time, cached CSVs) |
| `experiments/exp09_targets.py` | Part 2: `epsindb`, `rdra_headers`, `rdra`, `rwaur` |
| `experiments/exp09_epsinda.py` | Epsilon Indi A contamination check (offline, cached bands) |
| `experiments/exp09_posthoc.py` | checks ADDED AFTER LOOKING: R Dra ring-profile core rule and light curves, RW Aur controls (offline, cached data) |
| `experiments/exp09_tables.py` | prints the Part 1 tables from the JSON |
| `experiments/exp09_*.json`, `exp09_*.log` | all numbers and console output |
| `experiments/img/exp09_*.png` | figures |

Rerun (from any directory outside the data dir): `uv run --with astropy --with numpy --with scipy --with reproject --with matplotlib python -I experiments/exp09_<script>.py <args>`; arguments are in each script's docstring. Data dir: `scratchpad/w9/data/` (TAP CSVs, cached `.npz` row bands, cached headers). The scripts reuse `det08_targets.py` and `det08_analyze.py` (grid, pass split, centroid, aperture, empty-aperture noise, display stretch).

## Verdict

| target | verdict | key numbers |
|---|---|---|
| S3 range reader | **Works, pixel-exact, 4 to 8 times faster and 7.5 times smaller than an IBE cutout, zero failures** | 6 of 6 exposures (D4, D5, D6) bit-identical to IBE cutouts, wavelength and bandwidth identical to 1e-15 um. 538,080 B per frame (61 x 61 box). 2.45 s median per frame sequential; 40 frames in 24.6 s at 8 parallel (1.63 frames/s, median 3.5 s per frame); 0 failed requests out of 180 plus 1,157 header-only reads and 24 ZODI-chain reads. IBE: 4.0 MB, 10 to 21 s, 33% 503 at 8 parallel |
| ZODI | **Can be skipped for small fields** | ZODI varies by 0.0003 to 0.0032 MJy/sr across a 61 x 61 px box and by at most 0.0005 within 30", against a pixel noise of 0.033 to 0.34 MJy/sr; pixel sigma unchanged after ZODI subtraction |
| Epsilon Indi B (D2) | **Clearly visible in every pass and every single exposure; motion measured and matching the prediction** | 93 exposures in 5 passes (2025.32 to 2026.75), stack S/N 316 to 578. Pass 0 to 4: measured 5.02" E, 3.95" S (6.39") vs predicted 5.26" E, 3.60" S (6.37"); per-pass offsets from prediction within 0.8" with errors 0.03 to 0.07"; no saturation, no NaN within 3 px in any exposure |
| Epsilon Indi A contamination | **None seen in B's box** | A falls 46 rows / 71 columns (402") from B, outside the 61-row band in all 93 exposures; no NaN within 5 px of B; no 5-sigma flux outlier. FLAGS (ghost bits) not read |
| R Draconis (D6, 4.452 to 4.492 um) | **Clearly visible, heavily saturated; variability marginally detected, a 246 d cycle consistent but not demonstrated** | NaN core only 1 to 2 px, finite garbage pixels (1,000 to 7,500 MJy/sr) out to about 3 px. 50 exposures on 38 days in the best window. Raw wing flux (4 to 7 px and 7 to 10 px): rms 0.32 and 0.36 mag against within-day scatter 0.28 and 0.20 mag; a 0.5 to 0.7 mag decline across Mar to Jun 2026; a P = 246 d sinusoid gives a full amplitude of 0.75 to 1.06 mag, best free period 234 to 250 d, but only 3 date clusters. Field-star normalisation failed (only 2 faint stars). Pre-set core rule failed; the working rule was chosen after looking |
| RW Aurigae (D2) | **Visible, NOT saturated (unexpected); variability detected** | No NaN in 55 exposures, peak 133 to 223 MJy/sr. Matched-wavelength ratio pass 1 / pass 0 = 1.40 +- 0.05 and pass 2 / pass 0 = 1.40 +- 0.04 (0.37 mag brighter in Feb to Mar 2026 and Sep 2026 than in Sep 2025); raw and core-aperture versions agree (1.38 to 1.43); control star measured the same way: 0.99 +- 0.02, 1.00 +- 0.03 |

## 1. The range reader: recipe and byte arithmetic

S3 URL = `https://nasa-irsa-spherex.s3.us-east-1.amazonaws.com/` + the TAP `uri` with the leading `ibe/data/spherex/` removed. All requests are plain HTTP GET with a `Range` header (curl `-r`), status 206 expected and the returned length checked. 3 tries each with 1 s and 3 s backoff.

**Request A, headers.** `Range: bytes=0-34559` (12 FITS blocks of 2,880 B). Walk the 2,880-byte blocks: the PRIMARY header ends after block 1 (2,880 B, no data); the IMAGE header starts at byte 2,880 and ends at the block containing the `END` card. If no `END` is found, fetch 4 more blocks and repeat (never needed). From the IMAGE header: TAN-SIP celestial WCS (`astropy.wcs.WCS(hdr)`, SIP on), `MJD-AVG`, `DETECTOR`, the W-keys of the spectral WCS (`CRPIXiW`, `CRVALiW`, `CDELTiW`), and

    IMAGE data offset = 2,880 + (IMAGE header length)

Measured: 25,920 B (IMAGE header 23,040 B) in all 6 WISE 0855 files (D4 to D6); 28,800 B (header 25,920 B) in all 93 Epsilon Indi B D2 files. It is not a constant, so request A is mandatory, but 34,560 B covered it every time.

**Target pixel.** `x, y = WCS(hdr).all_world2pix([[ra, dec]], 0)[0]` (0-based, SIP on). Box rows `y0 = round(y) - 30`, `y1 = round(y) + 30`, clipped to 0..2039 (61 rows by default).

**Request B, pixels.** IMAGE is `BITPIX = -32`, `NAXIS1 = NAXIS2 = 2040`, big-endian float32, so one row is 2,040 x 4 = 8,160 B:

    Range: bytes = off + y0 * 8160  to  off + (y1 + 1) * 8160 - 1

61 rows = 497,760 B. Decode with `np.frombuffer(buf, ">f4").reshape(61, 2040)` and slice any columns you like (columns are free: whole rows come anyway). I kept the full 61 x 2040 band on disk, which turned out useful (section 5, Epsilon Indi A).

**Request C, wavelength.** `Range: bytes=-5760` (suffix range: the last 2 blocks). The WCS-WAVE header starts at a 2,880 boundary inside it (`XTENSION= 'BINTABLE'`, `EXTNAME = 'WCS-WAVE'`), its one row follows the header. Row layout: `X` as nx big-endian int32, `Y` as ny int32, then `VALUES` as 2 x nx x ny big-endian float32 (FITS `TDIM3 = (2,nx,ny)`, numpy shape `(ny, nx, 2)`; `[..., 0]` = wavelength, `[..., 1]` = bandwidth, um). **nx and ny differ per detector**: D5 and D6 are 9 x 9 (row 720 B), D2 11 x 11 (1,056 B, note 05), D4 13 x 20 with Y = 1, 151, ..., 1800, 1801, 1841, ..., 2040 (row 2,212 B; a step between rows 1800 and 1801). Wavelength at 0-based pixel (x, y), WAVE-TAB per WCS paper III, no SIP:

    psi_x = CRVAL1W + CDELT1W * (x + 1 - CRPIX1W)       (CRVAL = CDELT = 1 in these files)
    psi_y = CRVAL2W + CDELT2W * (y + 1 - CRPIX2W)
    fx = interp(psi_x, X, 0..nx-1);  fy = interp(psi_y, Y, 0..ny-1)
    (wavelength, bandwidth) = bilinear(VALUES[:, :, k], fx, fy)

The grid is a per-detector calibration (header `HISTORY Calibration source file: spectral_wcs_6_v3.0.fits`): checked identical on 3 files each of R Dra D6 and D4 spanning a year. So a viewer can fetch request C once per detector and cache it.

**Per frame total: 34,560 + 497,760 + 5,760 = 538,080 B** (61-row box), 3 requests, A and C independent of B's position.

**Optional ZODI chain** (4 more requests, all offsets derived, nothing hard-coded except the 2040 x 2040 image size):

    FLAGS header at  off + 16,646,400          (2040*2040*4 is a whole number of blocks: 5,780)
      read 7 blocks, parse END; FLAGS data = NAXIS1 * NAXIS2 + PCOUNT bytes, padded to 2,880
    VARIANCE header at  FLAGS data start + padded size;  read 5 blocks, parse END
    ZODI header at  VARIANCE data start + 16,646,400;     read 5 blocks, parse END
    ZODI rows: same row arithmetic as request B

Measured on 6 D2 files: FLAGS header always at 16,675,200, but the VARIANCE header moves between 28,126,080 and 33,137,280 B because the Rice-compressed FLAGS size varies (ZODI data 44,795,520 to 49,806,720). The chain cost 20,160 + 14,400 + 14,400 + 497,760 B and about 0.5 + 0.6 + 0.6 + 1.1 s sequentially.

## 2. Validation against IBE cutouts (WISE 0855, existing experiment 08 cutouts)

`exp09_reader.py validate`, 2 exposures each of D6, D5, D4. Parent origin of the cutout from the cutout's alternate WCS A (`WCSNAMEA = '0-based active pixel coordinates'`): parent pixel = cutout pixel + 1 - CRPIXnA. The range reader read exactly the cutout's rows; the comparison is `np.array_equal(range_read_box, cutout_IMAGE, equal_nan=True)`.

| file | det | cutout | parent origin (x, y) | pixels identical | finite px | target px, S3 WCS minus (cutout WCS + origin) | wavelength reader / astropy W on cutout (um) | bandwidth reader / astropy (um) | IMAGE data offset |
|---|---|---|---|---|---|---|---|---|---|
| 2025W19_1B_0116_1D6 | D6 | 88x88 | 316, 106 | yes | 7737 | 1.4e-14 px | 4.967378 / 4.967378 | 0.037187 / 0.037187 | 25,920 |
| 2025W50_2A_0254_1D6 | D6 | 88x88 | 1265, 956 | yes | 7743 | 2.3e-13 px | 4.701850 / 4.701850 | 0.036776 / 0.036776 | 25,920 |
| 2025W19_1B_0181_1D5 | D5 | 88x88 | 665, 367 | yes | 7739 | 0 | 4.295073 / 4.295073 | 0.037563 / 0.037563 | 25,920 |
| 2025W45_2A_0308_4D5 | D5 | 88x88 | 1648, 29 | yes | 7744 | 2.3e-13 px | 4.408115 / 4.408115 | 0.038457 / 0.038457 | 25,920 |
| 2025W19_1B_0241_1D4 | D4 | 88x88 | 1016, 512 | yes | 7739 | 0 | 3.358036 / 3.358036 | 0.094751 / 0.094751 | 25,920 |
| 2025W45_1A_0110_2D4 | D4 | 88x88 | 1599, 1571 | yes | 7743 | 2.3e-13 px | 2.632083 / 2.632083 | 0.075107 / 0.075107 | 25,920 |

- 6 of 6 bit-identical including NaN positions. Max wavelength difference 8.9e-16 um, bandwidth 6.9e-18 um (the hand-written bilinear lookup equals astropy's WAVE-TAB). The WCS-WAVE tables read by suffix range are identical to the cutouts' tables. The full-file TAN-SIP WCS gives the same target pixel as the cutout WCS to 2e-13 px.
- The WCS slice (`WCS(hdr).slice(...)`) used for the cached band keeps SIP correct; `exp09_targets.prep` asserts this to 1e-4 px on every exposure.
- The first validation run crashed on D4: I had assumed a square control grid (true for D2, D5, D6). Fixed by reading nx and ny from `TFORM1` and `TFORM2`.

## 3. Timing (Epsilon Indi B D2 exposures, 61-row box, from this Mac, 2026-11-14 about 16:40 local)

`exp09_reader.py timing`: first 20 exposures one after another, then the next 40 with 8 threads; each frame is A, then B, then C, sequential within the frame. Times are wall clock around each curl call (s), shown as median / p90 / max.

| mode | frames ok / tried | wall (s) | frames/s | per frame (s) | A (s) | B (s) | C (s) | bytes per frame | retries | failures |
|---|---|---|---|---|---|---|---|---|---|---|
| sequential | 20 / 20 | 54.6 | 0.37 | 2.45 / 2.90 / 7.01 | 0.67 / 0.80 / 0.85 | 1.16 / 1.40 / 5.47 | 0.58 / 0.76 / 0.83 | 538,080 | 0 | 0 |
| parallel x8 | 40 / 40 | 24.6 | 1.63 | 3.48 / 6.21 / 8.82 | 0.74 / 0.87 / 1.30 | 1.96 / 4.85 / 7.41 | 0.61 / 0.84 / 1.02 | 538,080 | 0 | 0 |
| IBE cutout, note 05 (8 parallel, 24 cutouts) | 16 / 24 first try | 40.4 | 0.40 | about 15.7 median, 21 p95 | | | | 4,000,320 | 8 needed retries | 33% 503 first try |

- Time to first byte median 0.53 s (sequential), 0.57 s (parallel): about half of every request is latency. A and C are pure latency (0.6 to 0.7 s for 35 KB and 6 KB).
- Header-only survey (request A only, R Dra, section 6): 1,157 requests at 8 parallel, 0 failures, median 0.74 to 0.75 s, p90 0.88 to 1.02 s, max 2.6 s, 40 MB.
- Totals over the whole experiment: 0 failed requests in every run that logged them (timing 180 requests, validation 18 plus 12 in the first, crashed run, ZODI 24, header survey 1,163). The Part 2 frame reads (33 more Epsilon Indi B, 50 R Dra, 55 RW Aur frames, 414 requests) did not log retries, but every frame loaded. The only failure today was the machine losing DNS (uv could not reach PyPI); S3 itself never returned an error.
- A browser could run A and C in parallel and start B after A (B needs the data offset and the target row), cutting a frame to about 2 round trips: roughly 1.2 to 1.8 s here.

## 4. Is ZODI needed? (`exp09_reader.py zodi`, 6 Epsilon Indi B D2 exposures spread over the list)

| exposure | ZODI median (MJy/sr) | ZODI peak-to-peak, 61x61 box | peak-to-peak, r <= 30" | rms of (ZODI minus its median), box | pixel sigma, median-subtracted only | pixel sigma, ZODI then median subtracted |
|---|---|---|---|---|---|---|
| 2025W17_4B_0017_1D2 | 0.160 | 0.0032 | 0.0005 | 0.0009 | 0.0632 | 0.0631 |
| 2025W18_2B_0489_3D2 | 0.148 | 0.0021 | 0.0004 | 0.0006 | 0.0429 | 0.0428 |
| 2025W40_1A_0661_4D2 | 0.162 | 0.0008 | 0.0002 | 0.0003 | 0.0371 | 0.0372 |
| 2025W42_2A_0033_2D2 | 0.171 | 0.0010 | 0.0003 | 0.0002 | 0.0470 | 0.0469 |
| 2026W40_1A_0435_3D2 | 0.153 | 0.0003 | 0.0001 | 0.0001 | 0.3448 | 0.3449 |
| 2026W40_2A_0216_2D2 | 0.163 | 0.0003 | 0.0000 | 0.0001 | 0.0326 | 0.0325 |

The difference between "IMAGE minus ZODI minus clipped median" and "IMAGE minus clipped median" is ZODI minus its own median: at most 0.0032 MJy/sr across 375" (5 to 8% of one pixel sigma) and at most 0.0005 inside an aperture plus annulus, which an annulus background removes anyway. **Verdict: skip ZODI for boxes of a few arcminutes; a sigma-clipped local median is enough.** Caveat: tested on D2 at high ecliptic latitude (-41 deg); ZODI is brightest and steepest near the ecliptic and at D3/D4 wavelengths, but even 10 times larger gradients would stay under one pixel sigma across the box. One exposure (2026W40_1A_0435_3) has a pixel sigma 10 times the others (0.34 MJy/sr); not investigated.

## 5. Epsilon Indi B (D2, 1.10 to 1.65 um at the target)

Method (fixed before looking, `exp09_targets.py epsindb`): all 93 D2 exposures read with the range reader, box centred on the 2025.9 prediction (61 rows, 121 columns used). Predicted position at each exposure = linear interpolation in time between the brief's four positions (2025.4 to 2026.9; linear extrapolation outside). Per exposure: clipped-median background, flux-weighted centroid in native pixels (r = 2 px, 5 iterations, started at the prediction), converted to RA/Dec with the TAN-SIP WCS, offset from the prediction. Per pass (gap > 20 d): 3-sigma-clipped mean of the offsets, error = scatter / sqrt(n). Also det08's method on a median stack (3"/px north-up grid, 12" centroid). Astrometric control: the 3 brightest compact field sources 60 to 150" from B, measured exactly the same way.

The 20-day rule gives 5 passes (note 04 counted 4: its first pass, Apr to Jun 2025, splits into 2 here because of a 33-day gap).

| pass | n | dates (MJD) | epoch | wavelength (um) | stack S/N | B peak (MJy/sr, median) | centroid minus prediction (" E, " N), per-exposure mean +- error | scatter per exposure (" E, " N) | stack centroid minus prediction (" E, " N) |
|---|---|---|---|---|---|---|---|---|---|
| 0 | 19 | 60789.9 to 60799.7 | 2025.32 | 1.107 to 1.651 | 578 | 13.8 | +0.14 +- 0.04, -0.38 +- 0.05 | 0.18, 0.21 | +0.24, -0.43 |
| 1 | 13 | 60832.7 to 60833.5 | 2025.43 | 1.107 to 1.638 | 487 | 10.4 | +0.28 +- 0.03, -0.56 +- 0.07 | 0.11, 0.25 | +0.19, -0.30 |
| 2 | 30 | 60949.7 to 60987.4 | 2025.78 | 1.109 to 1.618 | 399 | 9.4 | -0.04 +- 0.04, -0.75 +- 0.05 | 0.23, 0.26 | +0.03, -0.79 |
| 3 | 7 | 61154.9 to 61160.6 | 2026.32 | 1.107 to 1.541 | 316 | 8.3 | +0.33 +- 0.05, -0.35 +- 0.07 | 0.14, 0.19 | +0.41, -0.21 |
| 4 | 24 | 61311.1 to 61315.5 | 2026.75 | 1.095 to 1.637 | 443 | 10.8 | -0.10 +- 0.05, -0.73 +- 0.05 | 0.23, 0.25 | -0.06, -0.72 |

Measured motion (difference of per-pass means, added to the predicted difference):

| passes | measured (" E, " N) | predicted (" E, " N) | error (" E, " N) |
|---|---|---|---|
| 0 to 1 | +0.47, -0.47 | +0.33, -0.29 | 0.05, 0.08 |
| 1 to 2 | +0.72, -1.11 | +1.03, -0.92 | 0.05, 0.08 |
| 2 to 3 | +2.81, -0.87 | +2.44, -1.27 | 0.07, 0.09 |
| 3 to 4 | +1.03, -1.50 | +1.46, -1.12 | 0.07, 0.09 |
| **0 to 4** | **+5.02, -3.95 (6.39")** | **+5.26, -3.60 (6.37")** | 0.06, 0.07 |

Astrometric control (the same centroid on static field stars, offset from the star's stack position, per pass 0 to 4, " E, " N):
- 331.12982, -56.77476: (-0.69,-0.21) (-0.66,-0.08) (-0.91,-0.30) (-0.61,-0.19) (-0.95,-0.43)
- 331.06135, -56.79976: (+0.40,-1.32) (+0.54,-1.18) (+0.18,-1.41) (+0.39,-1.45) (+0.20,-1.41)
- 331.12222, -56.78726: (+0.74,-0.38) (+0.61,-0.01) (+0.32,-0.26) (+0.57,-0.09) (+0.41,-0.12)

Reading it:
- The constant part of each star's offset is the difference between a per-exposure flux-weighted centroid and the stack position (pixel-phase bias of an undersampled PSF), so only the pass-to-pass changes matter: field stars move 0.2 to 0.4" between passes, and passes 2 and 4 sit 0.2 to 0.3" further south and west for two of the three stars. Epsilon Indi B shows the same pattern (passes 2 and 4 at -0.75 and -0.73" N, the others -0.35 to -0.56"). So the per-pass residuals of B are at the level of the frame-to-frame WCS systematics (about 0.3"), and the measured 0-to-4 motion agrees with the prediction to 0.24" E and 0.35" N, about 0.05 SPHEREx pixel.
- A constant offset of about +0.1" E, -0.55" N from the prediction remains in every pass. It is within the WCS systematics seen on field stars, and could also be the Gaia photocentre epoch or Ba/Bb orbital wobble (note 06); I did not chase it.
- Per-exposure centroid scatter is 0.11 to 0.26" (1/25 to 1/50 pixel), so even single exposures show the track. The whole motion over 1.4 years is about one pixel (6.4" vs 6.15"), so by eye it is a small step per pass; the pass 4 minus pass 0 difference shows a clean dipole (`img/exp09_epsindb_passes.png`, right panel). The track figure (`img/exp09_epsindb_track.png`) shows the per-exposure points following the predicted curve, offset by the constant about 0.5" to the south.
- B is not saturated: peak 8 to 14 MJy/sr (median per pass), max 32 MJy/sr, and 0 exposures have any NaN within 3 px.

**Epsilon Indi A contamination** (`exp09_epsinda.py`, offline on the cached bands). A (K5V, about 8 mag past saturation) is on the D2 array in 88 of 93 exposures, but at -46 to +47 rows and -71 to +71 columns from B (402", 65 px), so it is outside the 61-row band in every exposure and I have no pixels of A itself. Around B: 0 exposures with a NaN within 5 px; B's aperture flux shows no outlier beyond 5 robust sigma of a straight-line flux-versus-wavelength fit (a weak test: the line leaves 55% scatter because the T-dwarf spectrum is far from linear over 1.1 to 1.65 um). No ghost or bloom of A is visible in any per-pass stack within plus or minus 45" of B. FLAGS (GHOST, GHOST_EXT, BLOOM bits) were not read, so a faint ghost below the noise cannot be excluded, but nothing affects the centroids at the 0.3" level.

## 6. R Draconis (D6, 4.452 to 4.492 um)

**Choosing detector and window** (`exp09_targets.py rdra_headers`, header-only reads). TAP gave 573 D6 and 584 D4 exposures. For each, request A only (34,560 B) gave the target pixel; the wavelength at the target came from one WCS-WAVE grid per detector (identical on 3 files each). Wavelength at the target spans 4.402 to 5.012 um (D6) and 2.404 to 3.838 um (D4). Sliding a plus or minus 0.02 um window in 0.005 um steps and maximising distinct days, then exposures: **D6 centred on 4.472 um: 50 exposures on 38 days** (MJD 60789.9 to 61199.6, 2025-04-24 to 2026-06-09); D4 best (2.449 um) only 29 exposures on 26 days. D6 is also the least saturated detector (saturation AB 9.75). So the light curve uses those 50 D6 exposures (35 MB). The 300-exposure budget was not the limit: the narrow window was. Days cluster in three groups (Apr to Jun 2025, Dec 2025 to Jan 2026, Mar to Jun 2026, see the light-curve figure).

**The core and bloom.** In every exposure the NaN region is tiny: ring r < 1 px is 100% NaN, ring 1 to 2 px is 22 to 33% NaN (median 6 NaN pixels in total). Around it the pixels are finite but enormous: 4,300 to 7,500 MJy/sr at r = 1 to 2 px, 1,000 to 3,700 at 2 to 3 px, 130 to 200 at 3 to 4 px, then 80 to 260 at 4 to 6 px (sampled on 5 exposures). By analogy with Barnard's Star (note 08), the finite pixels within about 3 px are flagged OVERFLOW / SUR_ERROR / BLOOM and not trustworthy; I did not read FLAGS to confirm. No NaN bloom column or row. Two other features in the single frames (`img/exp09_rdra_frames.png`): a ring of compact spots about 60" (10 native px) from the star in some exposures (MJD 60812, 61115, 61134 shown) but not others, presumably an optical ghost or halo pattern that depends on where the star falls; and isolated NaN patches 30 to 100" away in some frames.

**First run (rule fixed before looking) failed.** The pre-set rule put r_core at the 95th percentile of "largest NaN radius within 25 px". The isolated NaN patches, not the core, set that radius (median 11 px, 95th percentile 24 px), so the wing annulus landed at 26 to 29 px (160 to 180"), in the background. Only 2 field stars passed the field-star rule (no NaN within 2 px in any exposure), both faint (median fluxes 3.7 and 2.4, scatter 4 and 12 times their own flux), so the normalisation was noise. Result: rms 1.40 mag, within-day rms 1.32 mag, P = 246 d fit residual 1.34 mag: **no usable light curve** (`img/exp09_rdra_lightcurve.png`, `exp09_rdra.json`). This is a failure of my rule, not of the data.

**Second run (ADDED AFTER LOOKING, `exp09_posthoc.py`).** Replacement core rule: per exposure, r_core = smallest k whose ring [k, k+1) is under 10% NaN, 95th percentile over exposures: 2 px (per-exposure values 1 to 2). The annulus formula is unchanged, so the wing annulus is 4 to 7 px (25 to 43"), background 10 to 14 px. I also report a second annulus at 7 to 10 px (fixed in the script before running it, reported, not selected). The field-star normalisation is useless here (above), so the raw wing flux (relative to its median) is the light curve; this choice was also made after looking.

| light curve (50 exposures, 38 days) | rms (mag) | within-day rms (23 points on days with 2 or more exposures) | P = 246 d sinusoid: full amplitude, residual (mag) | best period 100 to 600 d (residual) |
|---|---|---|---|---|
| wing 4 to 7 px, raw | 0.32 | 0.28 | 0.75, 0.27 | 250 d (0.27) |
| wing 7 to 10 px, raw | 0.36 | 0.20 | 1.06, 0.23 | 234 d (0.23) |
| wing 4 to 7 px / field-star norm | 0.93 | 1.09 | 0.30, 0.93 | 108 d (0.92) |
| first run, 26 to 29 px / field-star norm | 1.40 | 1.32 | 1.56, 1.34 | 216 d (1.32) |

Reading it (`img/exp09_posthoc_rdra_rwaur.png`, left):
- Both raw wing annuli show the same shape: brighter in Apr to Jun 2025, then a decline of roughly 0.5 to 0.7 mag across Mar to Jun 2026. In the 7 to 10 px annulus the excess variance over the within-day scatter corresponds to an intrinsic rms of about 0.30 mag (sqrt(0.36^2 - 0.20^2)); in the 4 to 7 px annulus about 0.15 mag.
- A 246 d sinusoid fits with a full amplitude of 0.75 to 1.06 mag at 4.47 um, and the free period scan prefers 234 to 250 d, but with only three clusters of dates (about 1.7 cycles, half of them empty) the period is not constrained: any period that puts the three clusters at the right phases fits as well.
- Per-point noise is 0.20 to 0.28 mag (within-day scatter), far above photon noise: the wings of a star 5 to 7 mag past saturation move with pixel phase, the ghost ring, and the nonlinear pixels next to the core. Without a usable field star, a calibration drift cannot be excluded directly, but the RW Aur control star (section 7) moved by 1 to 2% over a year, so a 0.5 mag drift from calibration alone is unlikely.
- **Verdict: variability marginally detected (a 0.5 to 0.7 mag decline in 2026 in raw wing flux, at 0.2 to 0.3 mag per-point noise); a 246 d cycle is consistent with the data but not demonstrated.** The wings are usable at the few-tenths-of-a-magnitude level only, and only once the NaN core is measured as a ring profile.

## 7. RW Aurigae (D2, 1.09 to 1.65 um)

55 D2 exposures, all read (30 MB), 3 passes: pass 0 n = 18 (MJD 60926.3 to 60928.8, 2025-09-08 to 09-11), pass 1 n = 19 (61100.2 to 61108.2, 2026-02-28 to 03-08), pass 2 n = 18 (61293.4 to 61298.3, 2026-09-09 to 09-14).

**Surprise: RW Aur is not saturated in D2.** No NaN pixel within 12 px of the target in any of the 55 exposures; the median peak pixel is 133, 195 and 223 MJy/sr in passes 0, 1, 2 (Barnard's finite pixels next to its NaN core reached 400 to 2,700). So the core rule gave r_core = 0 and the wing annulus is 2 to 5 px (12 to 31"), background 8 to 12 px. RW Aur has been in a faded state since 2024 (note 06), which probably explains it. The finite core may still be nonlinear (FLAGS not read), so the core aperture is reported only as a cross-check.

Method (fixed before looking): per exposure, wing-annulus flux; 5 field stars (the brightest local maxima of the all-exposure stack, 60" or more from the target, no NaN within 2 px in any exposure) measured with an r <= 2.5 px aperture; normalised flux = wing / median over stars of (star flux / that star's median); 0.03 um bins of the target wavelength; ratio of each pass to pass 0 inside each bin, then median and scatter over bins. Checks ADDED AFTER LOOKING (`exp09_posthoc.py`): raw (un-normalised) ratio, normalisation by the 3 bright stars only (the 2 faintest have 170 to 200% scatter), the core aperture, and a control: the brightest field star (RA 76.97734, Dec 30.37530, flux about 8 times fainter than RW Aur's wing) measured with the target's own wing annulus and normalised by the other bright stars.

| measurement | pass 1 / pass 0: median ratio (scatter over bins, error of mean) | pass 2 / pass 0 | change (mag) |
|---|---|---|---|
| wing / 5-star norm (pre-set method, 17 and 16 bins) | 1.40 (0.22, 0.054) | 1.40 (0.17, 0.041) | -0.37, -0.37 |
| wing / 3 bright stars | 1.38 (0.21, 0.052) | 1.37 (0.13, 0.033) | -0.35, -0.34 |
| wing, raw (no normalisation) | 1.38 (0.21, 0.052) | 1.38 (0.15, 0.037) | -0.35, -0.35 |
| core r <= 2.5 px / 3 bright stars | 1.42 (0.20, 0.051) | 1.43 (0.23, 0.058) | -0.38, -0.39 |
| **control star**, same wing annulus / other stars | **0.99 (0.10, 0.024)** | **1.00 (0.10, 0.025)** | +0.01, 0.00 |
| field-star normalisation factor per pass (5 stars / 3 stars) | pass 0: 0.999 / 0.999, pass 1: 0.997 / 0.998, pass 2: 1.016 / 0.999 | | |

- **Variability detected: RW Aur was about 0.35 mag (factor 1.38 to 1.40) brighter at 1.1 to 1.65 um in Feb to Mar 2026 and Sep 2026 than in Sep 2025**, about 7 to 11 times the error of the mean, while the control star measured the same way gives 0.99 +- 0.02 and 1.00 +- 0.03. Passes 1 and 2 are equal within errors. The field normalisation barely matters (factors within 2% of 1), so the result does not depend on it.
- The per-bin scatter for RW Aur (0.13 to 0.22) is about twice the control star's (0.10). The per-bin ratios run from 1.6 to 1.7 at 1.1 um to 1.2 to 1.5 at 1.5 to 1.6 um, with one outlier at 1.21 um (0.78); so the brightening may be larger at shorter wavelengths, or RW Aur also varies within a pass. I did not test either.
- Figures: `img/exp09_rwaur_passes.png` (per-pass median stacks), `img/exp09_rwaur_wavelength_match.png` (left: normalised wing flux against wavelength per pass, pass 0 sits below the other two at every wavelength; right: ratio per bin), `img/exp09_posthoc_rdra_rwaur.png` (right: RW Aur against the control star).

## 8. Surprises and failures

- **S3 never failed.** 0 errors in about 1,800 range requests over the experiment, versus a third of IBE cutout requests returning 503 (note 05). The only failures were on this machine: DNS dropped and `uv` could not reach PyPI, killing the first RW Aur run before it downloaded anything; the rerun read all 55 frames.
- **The IMAGE data offset depends on the file**: 25,920 B (D4 to D6 WISE 0855 files) and 28,800 B (all D2 Epsilon Indi B files). The VARIANCE and ZODI offsets vary much more (28.1 to 33.1 MB for VARIANCE in 6 D2 files) because the Rice-compressed FLAGS size varies.
- **WCS-WAVE grids are not square and not uniform**: 9 x 9 (D5, D6), 11 x 11 (D2), 13 x 20 with a step at rows 1800/1801 (D4). My first parser assumed square and crashed on D4.
- **RW Aur is not saturated in D2** (expected saturated in note 06); it brightened by 0.35 mag between Sep 2025 and Feb 2026.
- **R Dra's NaN core is only 1 to 2 px** although it is 5 to 7 mag past saturation; the damage is finite garbage pixels, not NaN, so "find the NaN hole" underestimates the bad region and "largest NaN radius" is fooled by unrelated NaN patches. My pre-set rule failed this way and had to be replaced after looking.
- **Field stars near R Dra are faint at 4.5 um** (only 2 passed the rule, both noise-dominated), so the brief's "normalise by field stars" could not be done for R Dra.
- **A ring of compact spots about 60" around R Dra** appears in some exposures and not others (ghost or halo, not identified).
- **The 20-day pass rule splits Epsilon Indi B's first season into 2 passes** (5 instead of note 04's 4).
- **Epsilon Indi B's absolute offset** from the brief's prediction is about +0.1" E, -0.55" N in every pass; the pass-to-pass motion matches the prediction.
- One Epsilon Indi B D2 exposure (2026W40_1A_0435_3) has 10 times the pixel noise of the others (0.34 vs 0.03 to 0.06 MJy/sr).
- The `plt` tick labels on the right panel of `exp09_epsindb_track.png` overlap (cosmetic).

## 9. What I did not do

- FLAGS: not read (Rice-compressed in full files). So I cannot confirm which bits cover R Dra's finite garbage core, whether Epsilon Indi A's ghosts (GHOST_EXT) touch B, or what the ring around R Dra is.
- VARIANCE: not read; stacks are medians (unweighted), which also stands in for the cosmic-ray masking that FLAGS would give.
- Epsilon Indi A itself is outside every cached band (46 rows from B), so I have no pixels of A, only the statement that nothing reaches B's box.
- R Dra: the light curve covers 50 exposures in one wavelength window; I did not combine several windows (each normalised separately), which could raise the count to a few hundred, nor try PSF-wing fitting. D4 was surveyed (headers) but not photometered.
- RW Aur: only D2; D5/D6, where it is brighter relative to saturation, not tried. No within-pass variability test, no colour of the brightening.
- No IBE-cutout FLAGS cross-check for these three targets (would cost 4 MB and 10 to 21 s per cutout).
- Timing was measured from one Mac in Europe at one time of day; a server in us-east-1 would see far lower latency (unmeasured).
- Totals: about 165 MB downloaded (validation 8 MB, Epsilon Indi B 50 MB, ZODI 3 MB, R Dra headers 40 MB, R Dra frames 35 MB, RW Aur 30 MB); TAP: 4 queries, 12.5 to 17.4 s each, 2 at a time.

## Implications for the viewer

1. **Use the S3 range reader, not IBE cutouts.** Three requests per frame: `bytes=0-34559` (headers), the box rows (8,160 B per row), `bytes=-5760` (wavelength grid). 538 KB and about 2.5 s per frame from a laptop in Europe, 1.6 frames/s with 8 in parallel, zero failures, pixel-identical to IBE. A 90-exposure target is about 50 MB and under a minute. S3 is CORS-open with Range allowed (note 05), so the browser can do this directly; only TAP needs a proxy.
2. **Port only three small parsers**: 2880-byte FITS header cards (find `END`, read a few keywords), a TAN-SIP WCS (CRPIX, CD/PC, A/B polynomials; or fetch pixel positions from a backend), and the WAVE-TAB lookup (two `interp` calls and one bilinear step). Read `NAXIS1` of `X` and `Y` from `TFORM1` and `TFORM2`; do not assume a square grid. Cache the wavelength grid per detector (one request C per detector per session).
3. **Order the requests**: A and C in parallel, B after A (it needs the data offset and target row). Cache headers: a header-only pass (35 KB each, 0.75 s) is cheap enough to compute every exposure's pixel and wavelength before reading any pixels, which is how to pick "frames at matched wavelength".
4. **Skip ZODI** for boxes of a few arcminutes: subtract a sigma-clipped median of the box. Skip FLAGS too (Rice-compressed); treat NaN as bad and use median stacks, which reject cosmic rays.
5. **Columns are free, rows cost 8 KB each.** A wide-but-short box (for example 61 rows by 200 columns) costs the same as 61 by 61. When a nearby bright star matters (Epsilon Indi A), widen along the rows, not the columns, or read a second band.
6. **High-proper-motion targets work at sub-pixel precision even with a single exposure**: Epsilon Indi B's per-exposure centroid scatter is 0.1 to 0.26", and the 1.4-year motion (6.4", about 1 pixel) matches the prediction to 0.3". A per-exposure centroid track plot is a stronger "it moves" picture than a blink when the motion is about a pixel.
7. **Variable stars: compare at matched wavelength.** RW Aur's brightening (0.35 mag) shows clearly only after binning by wavelength at the target, because each exposure samples a different LVF channel and the star's spectrum changes by a factor 2 across D2. The viewer should show flux against wavelength per pass (as in `exp09_rwaur_wavelength_match.png`), or let the user pick a narrow wavelength window, and offer a control star.
8. **Saturated stars need a "ring profile" core**, not "find the NaN": measure the NaN fraction per radius ring and start photometry two pixels past it. Even then a star 5 to 7 mag past saturation (R Dra) gives only 0.2 to 0.3 mag per-point precision from its wings. Show such stars with the core marked as saturated, and present their light curves as indicative.
9. **Deep-field targets have many exposures but few per wavelength**: R Dra has 573 D6 exposures, but only 50 fall within plus or minus 0.02 um of one wavelength. A light-curve feature needs either wavelength-matched windows or a model of the spectrum; "plot all exposures against time" would mostly show the LVF wavelength sweep, not variability.
