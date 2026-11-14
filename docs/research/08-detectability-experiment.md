# 08: Can a human see Barnard's Star and WISE 0855 move in per-pass SPHEREx frames?

Worker 8, 2026-11-14. Exploratory analysis on real SPHEREx data (DR1 + QR3), not product code.
Every number below comes from the scripts in `experiments/` and is reproducible:

| file | what it does |
|---|---|
| `experiments/det08_targets.py` | astrometry, predicted geocentric position (proper motion + parallax), self-check |
| `experiments/det08_download.py` | IRSA TAP query + cutout download (8 parallel, 3 tries, skips cached files) |
| `experiments/det08_analyze.py` | background, masking, reprojection, per-pass stacks, photometry, centroids, figures, JSON |
| `experiments/det08_tables.py` | prints the tables in this note from the JSON |
| `experiments/det08_results.json`, `det08_results_nomask.json` | all numbers (flag mask on / off) |
| `experiments/det08_analyze_mask.log`, `det08_analyze_nomask.log`, `det08_download_final.log` | console output |

Rerun: `uv run --with astropy --with numpy --with scipy --with reproject --with matplotlib python -I det08_download.py <datadir>`, then `... det08_analyze.py <datadir> img` and again with `--nomask`, then `det08_tables.py det08_results.json det08_results_nomask.json`. The analysis is seeded and deterministic (two reruns gave identical tables).

## Verdict

| target | verdict | key numbers |
|---|---|---|
| Barnard's Star (D2) | **Clearly visible, and the motion is clearly visible**, but only if the flag mask is NOT applied: the core is saturated (NaN) and the standard bad-bit mask erases the whole star | 3 real passes (Aug 2025, Mar 2026, Aug 2026). Measured centroid shifts: +5.2" N then +4.1" N (predicted +5.6", +4.6"); pass 0 to 2: 9.4" measured vs 10.2" predicted. Field reference star stable to 0.4" |
| WISE 0855 (D5, D6) | **Clearly detected in every pass that has 6 or more exposures; motion measured and matching prediction; visually subtle** (0.6 to 1.3 SPHEREx pixels) | Per-pass aperture S/N: D6 2.3 / 13.4 / 7.3 / 11.1 (n = 3/18/3/21), D5 8.6 / 7.5 / 9.3 / 10.5, D5+D6 8.7 / 11.1 / 11.3 / 13.9. Shift-and-add D5+D6 (93 exposures): S/N 14.0 (median stack 16.0), blank control -0.3. Measured motion pass 0 to 3 in D6: 7.5" W vs 8.0" W predicted |
| WISE 0855 (D4, null check) | Not detected (as expected), but D4 is a contaminated null: a static star walks into the aperture | D4 pass 0 S/N 1.8 with the centroid sitting on the neighbour star, not the target; later D4 "signal" (5.5, 9.8) is that star |

## 1. Astrometry and reference epochs used

- **Barnard's Star**: Gaia DR3 values from the brief (RA 269.44850, Dec +4.73981, epoch 2016.0; pmRA -801.6, pmDec +10362.4 mas/yr; parallax 547.0 mas; RV -110.6 km/s). SIMBAD TAP (`simbad.cds.unistra.fr/simbad/sim-tap/sync`) returned an HTML 404 page, so no SIMBAD cross-check was possible; the values match Gaia DR3 as remembered.
- **WISE 0855**: the brief said the challenge coordinates were "about epoch 2014". They are not. IRSA's AllWISE catalog has `J085510.74-071442.5` at RA 133.7947597, Dec -7.2451456, which AllWISE reports at its reference epoch MJD 55400 (2010.56); the challenge coordinates agree with it to 1.3". I used that AllWISE position at epoch MJD 55400 with pmRA -8123, pmDec +673 mas/yr and parallax 439 mas from the brief. The coordinator later confirmed the epoch is about 2010.45 and sent independently computed positions; mine differ from them by a constant 0.48" (RA) and 0.27" (Dec), under 0.1 SPHEREx pixel.
- Using "epoch 2014" would have put the predicted position 29.3" east and 2.3" south of the true one (almost 5 SPHEREx pixels), enough to miss the source.
- Predicted position = barycentric space motion to the epoch, then the direction seen from the geocentre (SPHEREx is in low Earth orbit), no aberration (the WCS is ICRS). The self-check in `det08_targets.py` asserts Barnard moves 9.5 to 11.5"/yr north.
- Neighbour star found while debugging D4: CatWISE2020 `J085501.95-071428.2` (RA 133.7581637, Dec -7.2411758, W1 15.04, W2 15.20, essentially static). WISE 0855 passes 11.0" from it in May 2025, 8" in Nov 2025, 7.3" in Dec 2025 and 4.1" in May 2026.

Queries (IRSA TAP, CSV):

```sql
-- exposures (run for D2 at the Barnard point, D6/D5/D4 at the WISE 0855 point)
SELECT a.uri, p.time_bounds_lower, p.time_bounds_upper, p.energy_bandpassname
FROM spherex.artifact a JOIN spherex.plane p ON a.planeid = p.planeid
WHERE 1 = CONTAINS(POINT('ICRS', <ra>, <dec>), p.poly)
AND p.energy_bandpassname = 'SPHEREx-<det>' ORDER BY p.time_bounds_lower
-- points: Barnard 269.4463, 4.7680; WISE 0855 133.7683, -7.2429
-- astrometry checks
SELECT designation, ra, dec, w1mpro, w2mpro, pmra, pmdec FROM allwise_p3as_psd
WHERE 1=CONTAINS(POINT('ICRS',ra,dec),CIRCLE('ICRS',133.795129,-7.245147,0.005))
SELECT source_name, ra, dec, w1mpro, w2mpro FROM catwise_2020
WHERE 1=CONTAINS(POINT('ICRS',ra,dec),CIRCLE('ICRS',133.7600,-7.2423,0.0125))
```

Cutouts: `https://irsa.ipac.caltech.edu/<uri>?center=<ra>,<dec>d&size=<deg>`, centred on the predicted position at the middle of the time baseline (Barnard 269.44637, 4.76912, size 0.10; WISE 0855 133.76008, -7.24232, size 0.15).

TAP returned: Barnard D2 61 exposures (D3 59, not downloaded, see section 6), WISE 0855 D6 45, D5 48, D4 36 (all DR1; nothing after 2026-05-14).

## 2. Method (fixed before looking at the data unless marked)

1. Per exposure: `IMAGE - ZODI`, then subtract the 3-sigma-clipped median of the good pixels. Bad pixels (bits TRANSIENT, OVERFLOW, SUR_ERROR, NONFUNC, DICHROIC, MISSING_DATA, HOT, COLD, NONLINEAR, PERSIST, OUTLIER, CROSSTALK, GHOST, GHOST_FPA, GHOST_EXT, STREAK, BLOOM, SNOWBALL, HALO) set to NaN; SOURCE, FULLSAMPLE, PHANMISS kept. The `--nomask` run only drops NaN or non-positive-variance pixels.
2. Wavelength at the target pixel from the `W` WCS with `sip = None`; time = `MJD-AVG`.
3. Reproject (`reproject_interp`, bilinear) IMAGE and VARIANCE onto a north-up east-left TAN grid at 3"/px (96x96 for Barnard, 140x140 for WISE 0855) centred on the mid-baseline position. A second "comoving" grid per exposure is centred on the target's predicted position at that exposure (for shift-and-add).
4. Passes: sort exposure times, split at gaps over 20 days. Frame = inverse-variance weighted mean of all exposures of one detector in one pass (median also computed). For WISE 0855 also a D5+D6 frame.
5. Photometry: 9" radius aperture (3 grid px, about one PSF FWHM) at the predicted position, local background from an 18 to 30" annulus. Noise = robust (MAD) scatter of the same aperture at 300 random positions in the frame avoiding the target (empty-aperture method; it includes the noise correlation that interpolation creates and the confusion from faint sources). Aperture requires 80% finite pixels, otherwise NaN.
6. Centroid: flux-weighted (negative pixels clipped), 12" radius, 5 iterations, started at the predicted position. **Added after looking**: the same centroid started at the grid centre for every pass, to rule out the start point biasing the measured motion. It gave identical shifts (tables below), so the motion is not an artefact of the start point.
7. **Added after looking**: astrometric control (brightest compact source more than 30" from the target, centroided in every pass), neighbour-star aperture (WISE 0855), and difference images restricted to passes with at least 3 exposures (Barnard's last "pass" is a single exposure).
8. Control for shift-and-add: one fixed position 90" W, 90" N of the target (chosen before looking), plus the empty-aperture distribution itself.

## 3. Barnard's Star (D2, 1.09 to 1.66 um)

What the core looks like: in all 59 exposures the 3x3 pixels around the star carry OVERFLOW + SUR_ERROR + TRANSIENT + BLOOM (+ SOURCE). The central 2 to 4 native pixels are NaN in both IMAGE and VARIANCE; around them a block of about 7x7 native pixels (43") is flagged TRANSIENT | SUR_ERROR | BLOOM but holds finite values (peak finite pixels next to the hole 400 to 2700 MJy/sr, scattering by a factor of 6 between exposures). This is what the Explanatory Supplement predicts: nonlinearity starts at AB 11.5 in D2 and Barnard is AB 6 to 7.5.

- **Mask on**: the whole star is NaN in every frame; no centroid, no photometry (all entries NaN in `det08_results.json`). Figures `det08_barnard_passes.png`, `det08_barnard_zoom.png` show a hole.
- **Mask off** (decided after the masked run failed): the stacked frame shows the star with a small NaN core; the centroid of the unsaturated wings tracks the motion.

| pass | n | dates (UTC) | wavelength at target (um) | centroid - predicted (" W, " N) |
|---|---|---|---|---|
| 0 | 18 | 2025-08-21 to 2025-08-30 | 1.10 to 1.63 | -1.3, -0.9 |
| 1 | 18 | 2026-03-15 to 2026-03-22 | 1.12 to 1.63 | -0.0, -1.4 |
| 2 | 22 | 2026-08-18 to 2026-08-24 | 1.09 to 1.66 | -0.5, -1.9 |
| 3 | 1 | 2026-09-22 | 1.51 | -8.3, +0.6 |

| passes | measured shift (" W, " N) | started at grid centre | predicted |
|---|---|---|---|
| 0 to 1 | +0.7, +5.2 | +0.7, +5.2 | -0.6, +5.6 |
| 1 to 2 | +0.8, +4.1 | +0.8, +4.1 | +1.4, +4.6 |
| 2 to 3 | -7.6, +3.3 | -8.8, -1.1 | +0.1, +0.8 |

- Pass 0 to 2: measured 9.4" (mostly north) vs predicted 10.2"; per-pass absolute offsets stay within 2" (a third of a pixel), with a small systematic southward offset of 1 to 2" that I did not chase (possibly the NaN core and asymmetric bloom).
- Reference star in the same frames moved 0.0 to 0.4" between passes, so the WCS is stable at the 0.4" level.
- Pass 3 is a single exposure 30 days after pass 2, split off by the 20-day rule; its centroid is 8" off. One saturated exposure is not a usable frame.
- S/N: not applicable. The aperture is rejected because the core is NaN; the wings alone are hundreds of sigma (peak pixels 400 to 2700 MJy/sr against an empty-aperture sigma of 2.9 for the summed 9" aperture).
- By eye (`det08_barnard_zoom_nomask.png`): the star steps north by about one SPHEREx pixel per pass, and the pass 2 minus pass 0 difference shows a clean north-south dipole. 2 of 61 exposures (pass 2) failed to download.

## 4. WISE 0855 (D6 4.42 to 5.00 um, D5 3.83 to 4.41 um, D4 null)

Exposures, dates and wavelength coverage at the target (flag mask on; the mask-off run agrees within the S/N scatter discussed below):

| pass | det | n | dates (UTC) | wavelength (um) | S/N mean stack | S/N median stack | centroid - predicted (" W, " N) | neighbour star sep. |
|---|---|---|---|---|---|---|---|---|
| 0 | D4 | 4 | 2025-05-06 | 3.36 to 3.64 | 1.8 | 1.3 | +10.8, +3.1 | 11.0" |
| 0 | D5 | 8 | 2025-05-06 | 4.04 to 4.41 | 8.6 | 8.5 | +2.6, +1.8 | 11.0" |
| 0 | D6 | 3 | 2025-05-05 | 4.86 to 5.00 | 2.3 | 2.3 | +0.3, +1.6 | 11.0" |
| 0 | D5+D6 | 11 | 2025-05-05 to 05-06 | 4.04 to 5.00 | 8.7 | 7.2 | +2.1, +1.7 | 11.0" |
| 1 | D4 | 18 | 2025-10-31 to 11-03 | 2.44 to 3.83 | 5.5 | 5.8 | +6.6, +3.7 | 8.1" |
| 1 | D5 | 19 | 2025-11-07 to 11-10 | 3.82 to 4.41 | 7.5 | 7.9 | +2.6, +2.1 | 8.0" |
| 1 | D6 | 18 | 2025-11-10 to 11-14 | 4.42 to 4.98 | 13.4 | 12.5 | +1.2, +0.9 | 7.9" |
| 1 | D5+D6 | 37 | 2025-11-07 to 11-14 | 3.82 to 4.98 | 11.1 | 12.0 | +2.0, +1.7 | 8.0" |
| 2 | D5 | 6 | 2025-12-11 to 12-13 | 4.05 to 4.22 | 9.3 | 10.0 | +1.2, +1.2 | 7.3" |
| 2 | D6 | 3 | 2025-12-12 to 12-13 | 4.63 to 4.74 | 7.3 | 7.3 | +0.2, +0.6 | 7.3" |
| 2 | D5+D6 | 9 | 2025-12-11 to 12-13 | 4.05 to 4.74 | 11.3 | 10.2 | +0.9, +1.1 | 7.3" |
| 3 | D4 | 14 | 2026-05-01 to 05-05 | 2.43 to 3.74 | 9.8 | 7.3 | +2.0, +3.2 | 4.1" |
| 3 | D5 | 15 | 2026-05-01 to 05-14 | 3.83 to 4.37 | 10.5 | 11.2 | +0.7, +1.6 | 4.1" |
| 3 | D6 | 21 | 2026-04-21 to 05-11 | 4.42 to 4.97 | 11.1 | 12.1 | -0.0, +1.1 | 4.2" |
| 3 | D5+D6 | 36 | 2026-04-21 to 05-14 | 3.83 to 4.97 | 13.9 | 10.7 | +0.4, +1.4 | 4.2" |

(D4 has no pass 2. 1 D6 and 1 D5 exposure failed on the first try and came in on the retry; nothing is missing for WISE 0855.)

Measured motion (centroid shift between pass frames, fixed-sky grid):

| det | passes | measured (" W, " N) | started at grid centre | predicted |
|---|---|---|---|---|
| D6 | 0 to 1 | +4.3, -0.6 | +4.3, -0.6 | +3.4, +0.1 |
| D6 | 1 to 2 | -0.3, -0.4 | -0.3, -0.4 | +0.8, -0.0 |
| D6 | 2 to 3 | +3.5, +1.1 | +3.5, +1.1 | +3.8, +0.5 |
| D5 | 0 to 1 | +3.3, +0.4 | +3.3, +0.4 | +3.3, +0.1 |
| D5 | 1 to 2 | -0.6, -0.9 | -0.6, -0.9 | +0.9, -0.0 |
| D5 | 2 to 3 | +3.5, +1.0 | +3.5, +1.0 | +4.0, +0.6 |
| D5+D6 | 0 to 3 (sum) | +6.3, +0.4 | | +8.0, +0.7 |
| D4 | 0 to 1 | -1.1, +0.7 | -1.1, +0.7 | +3.1, +0.1 |
| D4 | 1 to 3 | +0.4, +0.1 | +0.4, +0.1 | +4.9, +0.6 |

Reading it:
- D6 total pass 0 to 3: +7.5" W, +0.1" N measured vs +8.0" W, +0.6" N predicted. The same algorithm on D4, where only the static neighbour star is in the window, returns about zero motion. So the D5/D6 source moves like WISE 0855 and the D4 source does not move.
- Reference stars: 0.0 to 0.4" in D4/D5, up to 0.8" in D6 between passes.
- Difference image pass 3 minus pass 0 (static stars should cancel): D5 shows -5.4 sigma at the pass 0 position (something that was there in May 2025 is gone) and +3.9 at the pass 3 position; D5+D6 -4.5 / +6.2. D6 alone shows +4.5 / +0.9 because D6 pass 0 is weak (3 exposures at the red edge, 4.86 to 5.00 um, S/N 2.3). D4: +3.6 / +1.0, a residual of the neighbour star.
- Contamination: the neighbour star is a 6 to 11 sigma source in D4 frames; in D5 it is of similar order to WISE 0855 (aperture at the star: 5.9 sigma in D5 pass 0, with the target 11" away). In D6 it is faint (0.5 sigma in pass 0). Therefore: D6 numbers are mostly WISE 0855; D5 pass 3 (4.1" separation) is a blend; the cleanest D5 numbers are passes 0 to 2. The D5 centroid offsets of +2.6" W, +2" N in passes 0 and 1 point at the star, as expected for a blend.

Shift-and-add (all passes, each exposure reprojected onto a grid centred on the target's predicted position at that time) vs a static stack:

| stack | n | S/N mean | S/N median | control S/N | empty-aperture sigma | centroid offset (" W, " N) |
|---|---|---|---|---|---|---|
| D6 comoving | 45 | 14.0 | 12.6 | -1.0 | 0.181 | +0.2, +1.0 |
| D6 static | 45 | 13.1 | 12.7 | -1.4 | 0.175 | +1.2, +1.2 |
| D5 comoving | 48 | 12.2 | 12.3 | -0.2 | 0.152 | +0.9, +1.4 |
| D5 static | 48 | 10.8 | 12.6 | -0.5 | 0.154 | +2.6, +2.0 |
| D5+D6 comoving | 93 | 14.0 | 16.0 | -0.3 | 0.145 | +0.7, +1.2 |
| D5+D6 static | 93 | 11.6 | 11.3 | -0.7 | 0.158 | +2.0, +1.9 |
| D4 comoving | 36 | 6.5 | 6.0 | 0.2 | 0.156 | +5.1, +3.5 |
| D4 static | 36 | 6.1 | 6.6 | 0.1 | 0.149 | +5.4, +3.8 |

- Shift-and-add helps only modestly (D5+D6 14.0 vs 11.6) because the whole SPHEREx baseline (one year, 8") is about one PSF width.
- **The deep stack is confusion-limited, not photon-limited.** The empty-aperture sigma drops from 0.20 (D6 pass 1, 18 exposures) to 0.18 (D6, 45) and 0.145 (D5+D6, 93), where pure photon noise would give 0.13 and 0.09. The field (galactic l = 235, b = +23 deg) is full of faint sources at 6" resolution. Stacking more than about 20 exposures barely raises S/N here.
- D4 "S/N 6.5" is the neighbour star smeared along the track: the centroid sits 5" W, 3.5" N, on the star.
- S/N uncertainty: the empty-aperture sigma depends on where the 300 random apertures land. Two runs that consumed the random generator differently gave D6 comoving 11.5 and 14.0, so read every S/N here as plus or minus about 15%.

Figures: `img/det08_w0855_zoom.png` (per-pass frames, plus or minus 36", and the pass 3 minus pass 0 difference), `img/det08_w0855_passes.png` (full 7' frames), `img/det08_w0855_shift_and_add.png` (comoving top, static bottom, red = target, cyan = control). `_nomask` versions are the same with the flag mask off.

By eye: in the D5, D6 and D5+D6 zoomed frames there is an obvious source in the red circle in every pass except D6 pass 0. The motion between consecutive passes (3 to 4") is half a SPHEREx pixel, so in a blink it reads as a small shift, not an obvious jump; it is clear in the first-minus-last difference (blue/red pair in D5 and D5+D6) and in the centroid numbers.

## 5. Surprises and failures

- **Saturation erases Barnard's Star under the standard mask** (section 3). The SOURCE bit is set on 100% of Barnard's cutout pixels and 44% of WISE 0855's, so treating SOURCE as good is mandatory.
- **WISE 0855 epoch error in the brief** (2010.5, not 2014): 29" error had it not been checked against AllWISE.
- **Neighbour star** 4 to 11" from WISE 0855 during the SPHEREx baseline contaminates D4 and D5 and makes D4 an impure null.
- **Static stars do not cancel in difference images** (`det08_w0855_passes.png`, right column): each pass samples a different wavelength mix through the LVF (D4 pass 0: 3.36 to 3.64 um; D4 pass 3: 2.43 to 3.74 um), so a star's brightness changes between passes and leaves residual blobs all over the difference frame, some as strong as the real mover.
- **Each cutout is about 4 MB whatever its size**: the full 441-row EPSF table (3.8 MB) rides along with a 60 to 90 pixel image. 190 cutouts = 761 MB. This forced dropping Barnard D3 to stay under 1 GB.
- **Cutouts are slow**: 9 to 15 s per request, median 12.7 to 20 s under 8-way concurrency (other workers were hitting IRSA too). TAP exposure queries took 40 to 57 s each.
- **Python urllib hung** (no bytes, no error, minutes) from the uv Python while `curl` fetched the same URL in 9 s; the downloader shells out to curl.
- **Network outage** mid-run: download pass 1 lost 157 of 190 files (curl exit 56/7/28), pass 2 lost 17 (exit 6, DNS), pass 3 lost 2 (exit 56). Final: 188 of 190; missing 2 Barnard D2 exposures from pass 2 (2026W35_1A_0038_1, 2026W35_2A_0126_1). Every downloaded file was verified to open with all 7 HDUs.
- Timing: download wall time 558 s + 560 s (both disturbed by the outage) + 40 s; analysis about 10 s per run for 188 exposures on the laptop (two reprojections of two arrays each).
- Small: D6 pass 0 is only 3 exposures at 4.86 to 5.00 um (red edge, noisier: sigma 0.46 vs 0.20); the 20-day rule splits Nov and Dec 2025 into two passes; a single-exposure "pass" (Barnard pass 3) gives an 8" wrong centroid.

## 6. Not done

- Barnard D3 (budget), Epsilon Indi B (time), PSF-fitting photometry that would separate WISE 0855 from the neighbour star, a matched-wavelength difference image.

## Implications for the viewer

1. **Frame = one pass of one detector group.** Cluster `MJD-AVG` with a gap threshold of about 20 days, then drop or merge any cluster with fewer than about 3 exposures (a single exposure gave an 8" wrong centroid for Barnard). Expect 3 to 4 frames per target in DR1 + QR3 (about one year).
2. **Stack within a pass**: ZODI subtraction, then subtract a sigma-clipped median, reproject to one north-up grid (3"/px bilinear `reproject_interp` worked and is fast: about 10 s for 188 exposures), inverse-variance mean. The median stack gave similar S/N; mean is fine.
3. **Per-detector frames are needed, and the "sum all six" hint should be "sum the detectors where the target is bright".** For a cold brown dwarf, D5+D6 gave the best per-pass frames (S/N 9 to 14) and D4 was a null; adding D1 to D4 would only add stars and confusion. Offer the user a band choice (at least short D1 to D3, long D4 to D6, and single detectors), not one all-band sum.
4. **Do not apply the bad-flag mask blindly.** Treat SOURCE as good (it covers half or all of the pixels). For bright stars, display without the TRANSIENT, SUR_ERROR, OVERFLOW and BLOOM bits masked, or the star disappears; show the NaN core as saturated (white). Masking mattered little for the faint target.
5. **Stretch**: one stretch shared by all frames of a sequence, based on the robust sigma. For faint targets a linear -3 to +6 sigma stretch made WISE 0855 obvious; for bright stars asinh from -3 sigma to the 99.9th percentile. Nearest-neighbour display at 3"/px.
6. **Zoom and mark.** At SPHEREx's 6.15" pixels the motions are about one pixel per half-year (Barnard 5", WISE 0855 4"). They are visible in a blink only when zoomed to about 1' and with a predicted-track marker; at full-cutout scale they are invisible. A first-minus-last difference frame is the best single "it moved" picture for the known targets.
7. **Difference images will show false movers** because static stars change brightness between passes through the LVF. Either match wavelength ranges between passes before differencing or show the difference only as a secondary view next to the blink.
8. **Propagate high-proper-motion coordinates to the SPHEREx epoch** before cutting and marking (WISE 0855 sits 122 to 134" from the challenge coordinates). Centre cutouts on the mid-baseline predicted position.
9. **Shift-and-add is not needed** for these targets over the current one-year baseline (gain about 1.2x), and the deep stack is confusion-limited, so more exposures do not buy much depth in crowded fields.
10. **Data volume is the practical bottleneck**: about 4 MB and 10 to 20 s per cutout because of the bundled EPSF table. 50 to 100 cutouts per target per band means 200 to 400 MB and 1 to 3 minutes at 8 parallel requests. A browser tool should fetch through a small backend that caches and strips the EPSF HDU, or precompute frames for the demo targets.
