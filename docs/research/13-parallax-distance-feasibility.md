# 13: Can students measure parallax, distance and speed from SPHEREx data?

Worker 13, 2026-11-14. Feasibility test on data already on disk (no new downloads): the 93 cached Epsilon Indi B D2 row bands from note 09, and the per-pass WISE 0855 and Barnard's Star centroids from note 08. Every number below comes from one script and its JSON and logs:

| file | what it holds |
|---|---|
| `experiments/exp13_parallax.py` | `check` (parallax factors against det08's full propagation, synthetic recovery), `epsindb` (centroids, reference stars, all fits, figures, product JSON), `others` (WISE 0855, Barnard) |
| `experiments/exp13_epsindb_fits.json`, `exp13_epsindb.log` | every Epsilon Indi B fit (DIFF and ABS data sets, bootstrap, leave-one-pass-out, pass means, fixed proper motion) |
| `experiments/exp13_others_fits.json`, `exp13_others.log` | WISE 0855 (D6, D5+D6) and Barnard (D2) fits |
| `experiments/exp13_parallax_epsindb.json` | product data: 93 exposures and 5 pass means with offsets, errors, parallax factors, best fits, literature |
| `experiments/img/exp13_epsindb_track.png`, `_residuals.png`, `_parallax_signal.png` | figures |

Rerun (from any directory outside the data dir): `uv run --with astropy --with numpy --with scipy --with matplotlib python -B -I experiments/exp13_parallax.py epsindb <scratchpad>/w9/data/cache_epsindb experiments`, then `... others experiments`. About 1 minute. Seeded and deterministic: a second full run gave a byte-identical log. `-B` plus `sys.dont_write_bytecode` keep `__pycache__` out of the repo.

## Verdict

| target | parallax measured (mas) | literature (mas) | significance (pre-registered rule) | distance (pc) | tangential velocity (km/s) |
|---|---|---|---|---|---|
| **Epsilon Indi B, all 5 parameters free** (field-star corrected, primary) | **330 +- 70** (jackknife; formal 32, bootstrap 28) | 274.8 (A, Gaia DR3; brief), 270.7 (B, Gaia DR3) | **4.7 sigma: MARGINAL.** Delta chi2 = 140 for one parameter | **3.03 +- 0.64** (Gaia 3.64) | **67 +- 14** (Gaia 80.8) |
| **Epsilon Indi B, proper motion fixed to Gaia** (classroom version) | **306 +- 28** (formal; bootstrap 23, jackknife 15) | same | **10.9 sigma: MEASURED.** 1.1 sigma above 274.8 | **3.27 +- 0.30** | **72.5 +- 6.6** |
| Epsilon Indi B, NO field-star correction (shown for contrast) | 457 +- 119 free; 438 +- 51 with Gaia proper motion | same | 3.8 and 8.6 sigma, but **biased 60% high** (3.2 sigma above the literature with fixed proper motion) | 2.19 / 2.29 | 49 / 51 |
| WISE 0855, D6 (4 passes, det08 stack centroids) | 221 +- 311 | 439 | 0.7 sigma: NOT MEASURED | not meaningful | not meaningful |
| WISE 0855, D5+D6 | 302 +- 273 | 439 | 1.1 sigma: NOT MEASURED | | |
| Barnard's Star, D2 (3 passes, saturated, wing centroid) | 83 +- 195 | 547.0 | 0.4 sigma: NOT MEASURED | | |

Gaia reference values used for the velocity: mu = 4.684"/yr (B, Gaia DR3: +3981.98, -2466.83 mas/yr), d = 3.638 pc, so v_tan = 4.74 x 4.684 x 3.638 = 80.8 km/s.

**In one sentence:** the parallax of Epsilon Indi B is really in the SPHEREx data, and a student can measure it to about 10% (306 +- 28 mas, 3.3 +- 0.3 pc) once the proper motion is taken from Gaia and the positions have been corrected with field stars; fitted entirely from SPHEREx it is a 4.7 sigma detection (330 +- 70 mas). Without the field-star correction the same data give a confident but wrong answer (440 to 460 mas). WISE 0855 and Barnard's Star give no usable parallax from what is cached.

## 0. Pre-registration (written before any fit was run)

Everything in this section was fixed before the first fit. Deviations are listed in section 6; none was made after looking at a fit result.

**Epsilon Indi B, data and centroid.** The 93 cached D2 bands (`scratchpad/w9/data/cache_epsindb`, 61 rows by 2040 columns). Centroid exactly as exp09: background = 3-sigma-clipped median of the 61 x 121 native box; flux-weighted centroid in native pixels, radius 2 px, 5 iterations, started at exp09's prediction (linear interpolation of the 4 nodes); converted to RA/Dec with the band's TAN-SIP WCS. Check: it must reproduce exp09's per-exposure `cdx`, `cdy`.

**Reference-frame correction (differential astrometry).** exp09 found that static field stars shift by 0.2 to 0.4" between passes, with passes 2 and 4 (both autumn) further south-west. Parallax also flips with the season, so an uncorrected frame shift would alias into parallax. Therefore two data sets are fitted:
- ABS: raw per-exposure WCS centroids.
- DIFF (primary): ABS minus a per-exposure frame shift. Reference stars = local maxima (5 x 5) above 15 robust sigma in each native band, 30 to 170" from B, clustered on the sky within 3"; kept if found in at least 70% of exposures and in every pass, no other kept cluster within 15", and median peak below 100 MJy/sr. Each is centroided with the same routine (start at the cluster position); its offset = measured position minus its own median position over all exposures. Frame shift per exposure = median of the available star offsets (E and N separately); at least 3 stars required.

**Coordinates and model.** E = (RA - RA_ref) cos(Dec_ref) 3600, N = (Dec - Dec_ref) 3600 (arcsec), reference (331.096356, -56.800600) (the exp09 2025.9 node). Time t in Julian years, t = 2000 + (MJD - 51544.5) / 365.25, t0 = 2026.0. Model:

    E(t) = E0 + muE (t - t0) + plx fE(t)
    N(t) = N0 + muN (t - t0) + plx fN(t)
    fE = X sin(a) - Y cos(a)
    fN = X cos(a) sin(d) + Y sin(a) sin(d) - Z cos(d)

with (X, Y, Z) the Earth's barycentric position in AU (astropy `get_body_barycentric("earth")`, built-in ephemeris; geocentric is fine for low Earth orbit) and (a, d) the target's RA, Dec. Linear weighted least squares. The factors are checked against `det08_targets.predict` (full space-motion propagation) to 1e-3.

**Errors.** Per exposure, per pass and per coordinate: 1.4826 x MAD of the residuals about a straight line in time fitted to that pass alone (model independent, the same sigmas for every model).

**Outlier rule.** Drop exposures with a NaN centroid, any NaN within 3 px of B, or (DIFF) fewer than 3 reference stars; then drop exposures whose residual from their pass's straight line exceeds 4 sigma in either coordinate (one pass, no iteration). The same exposures go into every model.

**Statistics.** chi-square of "proper motion only" (4 parameters) versus "proper motion plus parallax" (5); parallax error three ways: formal (scaled by sqrt(reduced chi-square) when that is above 1), bootstrap over exposures (2,000 resamples, seed 13), and leave-one-pass-out jackknife (captures pass-level systematics, which the bootstrap does not). Significance = plx / the largest of the three. Distance d = 1000 / plx (pc), v_tan = 4.74 mu d (km/s), errors from the bootstrap and the jackknife.

**Verdict rule.** "Measured" if significance >= 5; "marginal" 3 to 5; "not measured" below 3. Agreement with the literature is reported, never used to choose a method.

**Literature.** Parallax 274.84 mas (Epsilon Indi A, Gaia DR3; the brief's 274.8, 3.64 pc) and 270.66 mas (Epsilon Indi B photocentre, Gaia DR3, RUWE 4.3, note 06). Proper motion of B: +3981.98, -2466.83 mas/yr (Gaia DR3 B, note 06).

**Robustness.** (a) pass means only (per pass: mean time, mean factors, mean position, error = per-exposure sigma / sqrt(n)); (b) each pass left out in turn; (c) proper motion fixed to the literature, E0, N0, plx free.

**WISE 0855 and Barnard's Star.** No re-centroiding: per-pass stack centroids from `det08_results.json` (WISE 0855, D6 and D5+D6, flag mask on) and `det08_results_nomask.json` (Barnard, D2), absolute position = det08 prediction at the pass mean time + measured offset. Passes with fewer than 3 exposures dropped (det08's own rule). Per-pass error per coordinate = rms of the reference-star pass-to-pass shifts for that detector in det08, floor 0.3". Same model, same statistics (no bootstrap: too few points; leave-one-pass-out where the fit stays determined).

## 1. Checks before the fits

- Parallax factors against det08's full propagation (`apply_space_motion` then Earth subtraction), 15 epochs over 2025 to 2026: max difference 1.1e-6 AU. Synthetic noise-free data are recovered exactly.
- The re-run centroids reproduce exp09's per-exposure offsets to 0.0" (bit-identical method on the same cache).
- No exposure was dropped by the NaN rule, none had fewer than 3 reference stars, and the 4-sigma rule clipped 0 exposures in DIFF and 2 in ABS (`2026W17_2A_0355_1D2`, `_4D2`, pass 3). So DIFF fits 93 exposures, ABS 91.

## 2. Epsilon Indi B

**Reference stars.** 86 sky clusters of detections; 3 pass the rule: (331.17189, -56.79333) peak 5.2 MJy/sr, seen in 93 exposures, 151" from B; (331.02076, -56.81403) peak 3.1, 83 exposures, 157"; (331.12938, -56.77485) peak 17.7, 91 exposures, 113" (the same star as exp09's first control star). B's peak is 8 to 14 MJy/sr, so two of the three are fainter than the target. Their per-pass mean offsets (" E, " N, relative to each star's own median):

| star | pass 0 (2025.32) | pass 1 (2025.43) | pass 2 (2025.78) | pass 3 (2026.31) | pass 4 (2026.75) |
|---|---|---|---|---|---|
| 331.17189 | +0.19, +0.03 | +0.09, +0.07 | -0.13, +0.08 | +0.04, -0.01 | -0.07, -0.13 |
| 331.02076 | +0.11, +0.10 | +0.00, +0.10 | +0.22, +0.40 | +0.01, +0.13 | -0.03, -0.16 |
| 331.12938 | +0.16, +0.14 | +0.12, +0.10 | -0.05, +0.03 | +0.23, +0.09 | -0.10, -0.09 |

The two brighter stars sit about 0.2" further west in the autumn passes (2 and 4) than in the spring passes (0, 1, 3). That is the same direction and season as Epsilon Indi B's own parallax shift (fE is +0.87 to +0.92 in spring, -0.58 to -0.68 in autumn), which is why the uncorrected fit inflates the parallax.

**Per-exposure errors** (pre-registered per-pass line scatter, DIFF, " E / " N): pass 0 0.17 / 0.27, pass 1 0.09 / 0.17, pass 2 0.26 / 0.24, pass 3 0.11 / 0.26, pass 4 0.32 / 0.42. ABS: 0.14 / 0.29, 0.07 / 0.31, 0.24 / 0.25, 0.04 / 0.10, 0.30 / 0.26. The correction adds noise (three faint stars), most visibly in pass 4.

**Main fit (DIFF, 93 exposures, 186 numbers).**

| quantity | value |
|---|---|
| chi2, proper motion only | 372.2 for 182 dof |
| chi2, proper motion + parallax | 232.3 for 181 dof (reduced 1.28, formal errors scaled by 1.13) |
| Delta chi2 | 139.9 for one parameter |
| parallax | 330 mas; formal +- 32, bootstrap +- 28 (16/50/84%: 302 / 329 / 358), jackknife +- 70 |
| proper motion | +4048 +- 47, -2393 +- 72 mas/yr (Gaia B: +3982, -2467; differences 1.4 and 1.0 sigma); total 4.702"/yr (Gaia 4.684) |
| distance | 3.03 +- 0.64 pc (jackknife); bootstrap 2.80 to 3.31 pc |
| tangential velocity | 67 +- 14 km/s (jackknife); bootstrap 62 to 74 km/s |
| vs literature | +56 mas over 274.8 (0.8 sigma), +60 over 270.7 (0.9 sigma); distance -0.61 pc (1.0 sigma); velocity -13 km/s (0.9 sigma) |

The bootstrap error (28 mas) is close to the formal one, but the jackknife (70 mas) is 2.5 times larger: the passes disagree with each other more than the scatter inside each pass predicts. Pass-level systematics, not photon noise, set the error. That is why the pre-registered rule uses the largest of the three, and why the free fit lands at 4.7 sigma ("marginal") although Delta chi2 is 140.

**Robustness (parallax in mas).**

| version | DIFF (primary) | error used | significance | chi2 PM only -> PM + plx | ABS (no correction) |
|---|---|---|---|---|---|
| per exposure, all free | 330 | 70 (jackknife) | 4.7 | 372.2/182 -> 232.3/181 | 457 +- 119 (3.8 sigma) |
| (a) pass means, all free | 330 | 69 (jackknife; formal 41) | 4.8 | 148.8/6 -> 10.7/5 | 459 +- 110 |
| (b) leave out pass 0 / 1 / 2 / 3 / 4, all free | 324 / 327 / **400** / 302 / 313 | | | | 458 / 462 / 548 / 367 / 422 |
| (c) proper motion fixed to Gaia, per exposure | **306** | 28 (formal; bootstrap 23, jackknife 15) | **10.9** | 389.2/184 -> 235.9/183 | 438 +- 51 (8.6 sigma) |
| (c) proper motion fixed, pass means | 306 | 35 (formal scaled by sqrt(14.1/7); jackknife 15) | 8.7 | 166.1/8 -> 14.1/7 | 439 +- 46 |
| (c) leave out pass 0 / 1 / 2 / 3 / 4, proper motion fixed | 311 / 309 / 317 / 295 / 303 | | | | 445 / 458 / 470 / 398 / 425 |

Reading it:
- **Pass means carry all the information.** Five points give the same parallax as 93 exposures (330 vs 330 free, 306 vs 306 fixed). A student can work with five dots.
- **Leaving out pass 2 (autumn 2025) moves the free fit from 330 to 400 mas.** With only two autumn passes, each one is a lever on both the parallax and the proper motion; fixing the proper motion removes that degeneracy and the leave-one-out spread shrinks to 295 to 317.
- **Fixing the proper motion to Gaia** gives 306 +- 28 mas, 3.27 +- 0.30 pc, v_tan 72.5 +- 6.6 km/s: 1.1 sigma above the 274.8 mas literature value (1.3 sigma above Gaia's 270.7 for B), distance 10% short of 3.64 pc. The remaining +31 mas is unexplained; candidates are an incompletely removed seasonal frame shift (3 faint reference stars), the Ba/Bb photocentre orbit (RUWE 4.3) or Gaia's 2016 proper motion no longer matching B's current photocentre motion. I did not chase it.
- **The field-star correction is the difference between right and wrong.** ABS gives 440 to 460 mas in every version, 3.2 sigma above the literature with the proper motion fixed, while looking "significant" (8.6 sigma). A seasonal frame shift of about 0.2" that flips with the spacecraft's viewing geometry mimics parallax almost perfectly at this target.

**Which version a student can do honestly:** (c) on the five pass means, one slider. The positions must be the field-star-corrected ones (shipped in the product JSON) and the proper motion must be labelled as Gaia's. It gives 0.31 +- 0.03" (per exposure) or +- 0.035" (pass means), 3.3 +- 0.3 to 0.4 pc. The all-free version is also honest but must be presented as "detected at 4.7 sigma, 330 +- 70 mas", and it is harder (five parameters, and the answer hinges on pass 2).

**Figures.**
- `img/exp13_epsindb_track.png`: the sky track, per-exposure points coloured by pass, the five pass means, the fitted model (red) and the best "proper motion only" line (grey dashed). The S-shaped wiggle around the line is the parallax.
- `img/exp13_epsindb_residuals.png`: residuals against time without parallax (left: pass means off by up to 0.35", alternating with the season) and with parallax (right: flat).
- `img/exp13_epsindb_parallax_signal.png`: the student picture. Data minus the fitted straight-line proper motion against time, east and north, with the fitted (330 mas) and literature (275 mas) parallax curves, plus the parallax ellipse traced by the five pass means. East swings by about 0.6" peak to peak, north by about 0.5".

**Product file** `experiments/exp13_parallax_epsindb.json`: reference point, model formula, t0, best fit (all free), best fit with proper motion fixed (`best_fit_pm_fixed`), "proper motion only" fit, literature values, parallax-factor definition, 93 exposures (name, MJD, year, pass index, wavelength, east, north, east_err, north_err, fE, fN; DIFF data set) and 5 pass means in the same fields. The script reloads the file and rebuilds the chi-square of the best fit from it alone (232.329, identical to the fit): a page can draw `east = E0 + muE (t - t0) + plx fE` from this file without astropy. For a smooth model curve between exposures the page needs fE, fN at arbitrary times: either interpolate the shipped factors within a pass, or compute them from a simple solar position (the Earth's position is minus the Sun's geocentric position; a low-precision formula is good to 1e-3 AU).

## 3. WISE 0855 and Barnard's Star

Fits on det08's per-pass stack centroids (no per-exposure centroids exist for these two targets, and re-centroiding the cached cutouts was out of the time box).

| case | passes (n exposures) | per-pass error | expected parallax swing between passes | free fit | proper motion fixed |
|---|---|---|---|---|---|
| WISE 0855 D6 | 4 (3, 18, 3, 21) | 0.52" (D6 reference-star rms) | 0.90" | plx 221 +- 311 mas, pm -7677, -21 mas/yr (lit -8123, +673), chi2 3.9 / 3 | 252 +- 274 (jackknife 409); chi2 5.9 -> 5.1 / 5 |
| WISE 0855 D5+D6 | 4 (11, 37, 9, 36) | 0.52" | 0.90" | plx 302 +- 273 mas, pm -6293, +317, chi2 2.5 / 3 | 363 +- 359 (jackknife 681); chi2 10.5 -> 8.8 / 5 |
| Barnard D2 | 3 (18, 18, 22) | 0.30" (floor; reference star rms was lower) | 1.05" | plx 83 +- 195 mas, pm -1546, +9449, chi2 0.0 / 1 | 49 +- 306; chi2 7.5 -> 7.5 / 3 |

Why it fails:
- **WISE 0855**: the parallax error (270 to 310 mas) is about two thirds of the parallax itself. The centroid error per pass is about 0.5" (S/N 9 to 14 per pass stack, and reference stars shifting by up to 0.8" between passes in D6) against a swing of 0.9". Only 4 passes, two of them with 3 D6 exposures. D5 also blends with the static neighbour star (4" away in pass 3). Per-exposure centroids would not help: single exposures are at S/N 2 to 3. A 5-sigma parallax would need per-pass errors near 0.1", 5 times better, which the confusion-limited stacks (note 08) cannot give.
- **Barnard's Star**: 3 usable passes leave 1 degree of freedom for 5 parameters, so the free fit is just determined. Worse, the wing centroid of a saturated star wanders by 1 to 2" between passes (note 08: southward offsets of 1 to 2", NaN core, asymmetric bloom), against a swing of 1.05". Even with the optimistic 0.3" error the result is 0.2 to 0.4 sigma. The single-exposure pass 3 (8" off) was excluded by the n >= 3 rule.

Both: **parallax not measurable** with the cached data; the proper motion is (WISE 0855 D6: -7.7"/yr against -8.1"/yr).

## 4. The smallest honest claim

Recommended wording for the product:

> "Using five SPHEREx visits between April 2025 and October 2026, you measured the yearly parallax wobble of Epsilon Indi B: about half an arcsecond, one twelfth of a SPHEREx pixel. With Gaia's proper motion, your parallax of 0.31 +- 0.03 arcsec puts it 3.3 +- 0.3 parsecs (about 10.7 light years) away, within about 10% of Gaia's 3.64 pc, and moving across the sky at 72 +- 7 km/s (Gaia: 81 km/s)."

In "within N percent" form: **students measure the distance to Epsilon Indi B with a 10% error bar (3.3 +- 0.3 pc), landing 10% short of Gaia's 3.64 pc (1.2 sigma).** Without Gaia's proper motion: a 4.7 sigma detection and a distance good to about 20% (3.0 +- 0.6 pc). Do not claim better than 10%, do not claim a measurement for WISE 0855 or Barnard's Star, and do not claim the uncorrected positions measure anything.

## 5. Surprises

1. **The raw SPHEREx astrometry has a seasonal frame shift that impersonates parallax.** Field stars sit about 0.2" further west in the autumn passes. Uncorrected, Epsilon Indi B's parallax comes out at 440 to 460 mas (60% too high) with a seemingly strong 8.6 sigma; corrected, 306 to 330 mas. Anyone fitting SPHEREx WCS positions directly will get a wrong parallax for every nearby star.
2. **Only 3 reference stars survive** out of 86 clusters, because the cached band is 61 rows (6.3') and the frame rotates between exposures, so few stars stay inside it; two of the three are fainter than B. The correction works but adds noise (pass 4 north scatter 0.42" vs 0.26" raw).
3. **The jackknife error is 2.5 times the bootstrap error** (70 vs 28 mas): pass-level systematics dominate. The formal or bootstrap error alone would have claimed a 10 to 12 sigma free-fit detection.
4. **Five pass means give exactly the same answer as 93 exposures**, so the classroom version loses nothing by showing five dots.
5. **One pass (2, autumn 2025) moves the free fit by 70 mas.** Fixing the proper motion removes that sensitivity.
6. The fitted proper motion differs from Gaia's by 66 and 74 mas/yr (1.0 to 1.4 sigma), while the total (4.70"/yr) matches Gaia's 4.68"/yr to 0.4%.
7. A trap in the check, not in the method: a comparison star with near-zero parallax and Epsilon Indi B's proper motion is assigned a fake space velocity of 0.07 c by ERFA, whose light-time terms then shift its position by 0.02 AU-equivalent; ERFA also overrides the distance for a parallax of 0.001 mas. The check uses zero proper motion (the factors do not depend on it).

## 6. Deviations from the pre-registration

- Reference-star clustering uses peak positions refined by the same centroid before the 3" clustering. Decided while writing the code, before any fit: raw peak pixels scatter by up to 4" on the sky, so a 3" radius on unrefined peaks would have split every star.
- The factor check uses zero proper motion (section 5, item 7). The fitted factors were never changed.
- After the first complete run: the legend of the track figure moved and the year ticks of the residual figure thinned (cosmetic), and the product JSON gained `pass_means`, `best_fit_pm_fixed` and the rebuild self-check. A rerun gave a byte-identical log apart from the added check line. No method, rule or model was changed after looking at any fit.

## 7. What I did not do

- No Gaia-catalogue reference frame. A small Gaia TAP query around B would give many more reference stars with known positions and allow a full (shift + rotation + scale) frame solution per exposure; it would probably shrink the jackknife error and might explain the +31 mas offset. Out of scope (no new data).
- No wider band read (more rows = more reference stars, a new download).
- No PSF fitting; the flux-weighted centroid in an undersampled 6.15" PSF has a pixel-phase bias that is part of the per-exposure scatter.
- No wavelength-dependent centroid term: each exposure is at a different wavelength (1.1 to 1.65 um) and the PSF changes with it.
- No model of the Ba/Bb orbital photocentre motion.
- No investigation of what causes the seasonal frame shift (WCS solution, PSF orientation, pixel phase).
- WISE 0855 and Barnard: no per-exposure re-centroiding of the cached cutouts; their fits use det08's per-pass stack centroids and an assumed per-pass error. For Barnard the assumed 0.3" is optimistic; the conclusion only gets stronger with a realistic error.
- No separate figure for WISE 0855 and Barnard (nothing to show beyond the table).

## Implications for the missions

1. **Target: Epsilon Indi B only** for the distance and speed mission. It is the only target where the parallax is in the data at better than 5 sigma (with Gaia's proper motion). WISE 0855 and Barnard's Star are "see it move, measure the proper motion" targets, not parallax targets; say so on screen if a student asks.
2. **Interaction, in this order** (all driven by `exp13_parallax_epsindb.json`):
   - *See it move*: the per-pass image stacks (note 09) and the sky track with the five pass means. The motion is 6.4" over 1.4 years, about one pixel.
   - *Measure the motion*: show the straight line through the two spring passes 1 year apart (2025.32 and 2026.31): they share a parallax phase, so their difference is pure proper motion (about 4.7"/yr). Then offer Gaia's value as the "official" proper motion and switch to it.
   - *Find the wobble*: subtract the proper motion; five dots remain that swing east and west with the season (`exp13_epsindb_parallax_signal.png`). One slider, the parallax, scales the red curve fE, fN until it passes through the dots; show a live chi-square or "distance from the dots" meter. The best fit is at 0.31".
   - *Distance and speed*: d = 1 / plx (3.3 pc), v = 4.74 x mu x d (72 km/s). Show Gaia's 3.64 pc and 81 km/s next to the student's answer, with the 10% error bar.
   - *Advanced*: free all five parameters; the answer becomes 0.33 +- 0.07" (4.7 sigma), and leaving out one pass shows how fragile it is.
3. **Caveats to show students:**
   - The wobble is half an arcsecond; a SPHEREx pixel is 6.15". You are measuring a twelfth of a pixel, possible only because the star's light is spread over several pixels and averaged over 93 exposures.
   - The positions were corrected using three nearby stars. Without that correction the answer is 60% wrong, because the telescope's frame shifts slightly with the season. (A good "why astronomers use reference stars" moment.)
   - The proper motion comes from Gaia; with SPHEREx alone the distance is good to about 20%.
   - Only 1.4 years and 5 visits; Gaia used about 34 months and many visits per year.
   - Epsilon Indi B is two brown dwarfs (Ba and Bb) too close to separate; you measure their combined light centre.
   - The student's answer lands about 10% short of Gaia's distance, just over 1 sigma: honest agreement, not a perfect match.
4. **Pipeline consequence for the viewer:** any position the product shows for parallax purposes must be field-star corrected. A Gaia-based reference frame would be the robust version.
