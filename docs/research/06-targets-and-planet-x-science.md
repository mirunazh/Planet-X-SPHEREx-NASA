# 06 Targets and Planet X science (worker 6)

Date of research: 2026-11-14. Label key: VERIFIED = read at source or computed by the scripts in the appendices; UNVERIFIED = from memory, a secondary source, or an estimate. No em dashes are used. SIMBAD at cds.unistra.fr returned a "Page unavailable" 404 today; the Harvard mirror https://simbad.cfa.harvard.edu/simbad/sim-id?Ident=<name>&output.format=ASCII worked and is the SIMBAD source below. VizieR at Strasbourg was also down; AllWISE came from the IRSA TAP (https://irsa.ipac.caltech.edu/TAP/sync, table allwise_p3as_psd) and Gaia DR3 from https://gea.esac.esa.int/tap-server/tap/sync.

## 1. Per-target facts

Magnitudes: J, H, K are 2MASS Vega; W1, W2 are AllWISE Vega. Vega to AB offsets used: J +0.91, H +1.39, Ks +1.85, W1 +2.699, W2 +3.339 (UNVERIFIED, from memory of Blanton and Roweis 2007 and Jarrett et al. 2011; apply with +-0.05 mag care). Coordinates are ICRS at the epoch stated.

| | Barnard's Star | eps Ind B (Ba T1 + Bb T6) | WISE 0855-0714 | RW Aur (A+B) | R Dra |
|---|---|---|---|---|---|
| IDs | GJ 699, V2500 Oph, HIP 87937 (UNVERIFIED IDs beyond SIMBAD main) | eps Ind Ba/Bb, Gaia DR3 6412596012146801152 | WISEA J085510.74-071442.5, WISE J0855-0714 | V* RW Aur, Gaia DR3 156430822114424576 (A) and 156430817820015232 (B) | V* R Dra, HIP 81014, Gaia DR3 1648328016354496384 |
| ICRS J2000 (propagated, ep=J2000) | 17 57 48.49847 +04 41 36.1139 | 22 04 10.59518 -56 46 58.2391 | 08 55 16.53798 -07 14 49.373 (Kirkpatrick 2021) | 05 07 49.566 +30 24 05.18 (Hipparcos-era, +-3 mas) | 16 32 40.22660 +66 45 17.9259 |
| pm RA*, Dec (mas/yr) | -801.551, +10362.394 | +3981.977, -2466.832 | -8123.7, +673.2 | Gaia A: +2.641, -27.398 | -20.643, +6.149 |
| parallax (mas) / distance | 546.976 / 1.828 pc | 270.658 / 3.695 pc | 439.0 +-2.4 (Kirkpatrick 2021); 454 +-45 (Luhman 2014) / 2.2-2.3 pc | Gaia A 6.406 / 156 pc (B 5.454, RUWE 16.4, unreliable) | 1.2509 / 799 pc |
| Spectral type | M4V | T1V + T6V (Ba 66.9, Bb 53.3 Mjup per dynamical masses, UNVERIFIED id) | Y2 (Teff 225-260 K) | K1 + K5 e, T Tauri (CTTS) | M4.5-6 e Mira |
| J, H, K Vega | 5.244, 4.83, 4.524 | 11.908, 11.306, 11.208 (A+B unresolved) | 25.0, 23.83, none | 8.378, 7.621, 7.020 | 3.71, 3.125, 2.23 |
| W1, W2 Vega (AllWISE) | saturated, no clean entry (UNVERIFIED est. ~4.3, ~4.2) | 10.718, 9.492 (blend, bad pm in catalogue) | 16.231 (suspect blend), 13.704 | 6.246, 5.228 | 0.393, 0.129 (saturated flags) |
| AB J/H/K | 6.15, 6.22, 6.37 | 12.82, 12.70, 13.06 | n/a | 9.29, 9.01, 8.87 | 4.62, 4.51, 4.08 |
| AB W1/W2 | ~7.0, ~7.5 (est.) | 13.42, 12.83 | ~19.9?, 17.04 (W1 unreliable) | 8.95, 8.57 | 3.09, 3.47 |
| Variability | flares, ~145 d rotation (UNVERIFIED), non-variable in NIR | Ba/Bb weather-type variability possible (UNVERIFIED) | JWST time series: variable at 3-5 um (Rowland 2024; arXiv 2510.24575) | irregular, dimmings 2010 (~2 mag, ~180 d), 2012-13 (0.7 mag, ~40 d), 2014-15 (~2 mag, >250 d), 2016-19 up to 3 mag in V, 2024-25 fading again (~1.5 to 2 mag) | Mira, P ~246 d, V 6.7-13.2 (UNVERIFIED), K amplitude likely 0.5-0.9 mag (UNVERIFIED) |
| Ecliptic lat (computed) | +28.13 | -41.46 | -23.61 | +7.47 | +81.39 |
| Contaminants <10' | none bright (Gaia field sparse) | eps Ind A (K5V, J 2.89, G 4.32) 402.3" = 6.7' west; AB sep computed | none bright (G~12 stars at 4-5') | RW Aur B at ~1.5" (blended in one 6.15" pixel); Gaia G 12.18 and 13.04 | none bright |

Sources: SIMBAD mirror pages (VERIFIED) https://simbad.cfa.harvard.edu/simbad/sim-id?Ident=Barnard%27s%20Star&output.format=ASCII (and eps%20Ind%20B, WISE%20J085510.83-071442.5, RW%20Aur, R%20Dra, HD%20209100 for eps Ind A); Gaia DR3 ADQL cone searches (VERIFIED) via gea.esac.esa.int; AllWISE via IRSA TAP (VERIFIED); Luhman 2014 abstract (VERIFIED, pm 8.1 arcsec/yr, plx 0.454 arcsec) https://arxiv.org/abs/1404.6501; WISE 0855 JWST: https://arxiv.org/abs/2411.14541 (Rowland et al. 2024, VERIFIED abstract) and https://arxiv.org/abs/2510.24575 (VERIFIED abstract); RW Aur dimming history (search-result summary, UNVERIFIED in detail) https://ar5iv.arxiv.org/html/1512.03745 and https://apps.aavso.org/v2/campaigns/884; R Dra period/range (Wikipedia Mira list via search, UNVERIFIED) https://en.wikipedia.org/wiki/Mira_variable.

Notes: SIMBAD lists WISE 0855 at 08 55 16.538 because that is the J2000 epoch value of a star moving 8.1 arcsec/yr; the challenge's 08h55m10.831s is the 2010.45 (WISE era) position (see section 2). SIMBAD gives RW Aur A+B a Hipparcos-era pm (7.23, -20.33) with a 3.8 mas/yr error; Gaia A is better. R Dra and RW Aur are at the centre of a V~9 and G 6.4 field respectively, see the saturation analysis.

## 2. Predicted positions (computed, VERIFIED)

Method: SIMBAD J2000 ICRS coordinates, pm, parallax and RV propagated with astropy apply_space_motion, then the Earth barycentric position (astropy get_body_barycentric) subtracted from the object barycentric vector to get the geocentric apparent direction (proper motion plus parallax; stellar aberration not applied since it affects all stars together). SPHEREx is in low Earth orbit, so Earth-centre parallax is correct to within a negligible 1e-4 AU. RW Aur uses Gaia DR3 source A at epoch 2016.0. eps Ind B uses the Gaia photocentre of Ba+Bb (RUWE 4.3, so the photocentre has orbital wobble of order 0.1 arcsec; irrelevant at 6.15 arcsec pixels). Script: appendix A.

| Target | Epoch | RA (deg) | Dec (deg) | Shift from previous | Shift (px) | Total from 2025.4 |
|---|---|---|---|---|---|---|
| Barnard's Star | 2025.4 | 269.446457 | +4.766659 | | | |
| | 2025.9 | 269.446214 | +4.767973 | 4.81" | 0.78 | 4.81" (0.78 px) |
| | 2026.4 | 269.446232 | +4.769546 | 5.67" | 0.92 | 10.43" (1.70 px) |
| | 2026.9 | 269.445990 | +4.770861 | 4.81" | 0.78 | 15.22" (2.47 px) |
| eps Ind B | 2025.4 | 331.095601 | -56.800231 | | | |
| | 2025.9 | 331.096356 | -56.800600 | 2.00" | 0.32 | 2.00" |
| | 2026.4 | 331.097623 | -56.800916 | 2.74" | 0.45 | 4.69" (0.76 px) |
| | 2026.9 | 331.098378 | -56.801285 | 2.00" | 0.32 | 6.66" (1.08 px) |
| WISE 0855 | 2025.4 | 133.761020 | -7.242245 | | | |
| | 2025.9 | 133.760100 | -7.242247 | 3.28" | 0.53 | 3.28" |
| | 2026.4 | 133.758746 | -7.242058 | 4.89" | 0.79 | 8.15" (1.33 px) |
| | 2026.9 | 133.757826 | -7.242060 | 3.28" | 0.53 | 11.43" (1.86 px) |
| RW Aur A | 2025.4 | 76.956089 | +30.401133 | | | |
| | 2026.9 | 76.956091 | +30.401122 | | | 0.04" (0.01 px) |
| R Dra | 2025.4 | 248.167242 | +66.755023 | | | |
| | 2026.9 | 248.167220 | +66.755025 | | | 0.03" (0.01 px) |

Interpretation: the shift between consecutive half-year epochs is not the pure proper motion because parallax adds or subtracts (Barnard 5.2" pm per half year, plus a parallax swing of up to +-0.5"). Epochs 2025.4 and 2026.4 share a parallax phase; 2025.9 and 2026.9 the other.

WISE 0855 versus the challenge coordinates (08h55m10.831s, -07d14m42.53s = 133.795129, -7.245147). With the Kirkpatrick 2021 pm, the best matching epoch is 2010.45 (residual 0.2"), which is the WISE-era position from Luhman 2014. In 2025.4 to 2026.9 the object is 122" to 134" (2.04' to 2.23', 19.9 to 21.7 pixels) away, in the direction PA ~275 deg (west), and Dec within 0.1". A cutout centred on the challenge coordinates must be at least ~+-2.5 arcmin (0.04 deg, ~25 px half-width) wide, and about 0.05 deg half-width if the tool is to cover all epochs, to contain the object. Epoch 2010.45 and an 8.1 arcsec/yr rate are VERIFIED by computation; the original 2010.45 label for the challenge coordinates is an inference (UNVERIFIED as stated by the challenge).

eps Ind A to B separation, computed from SIMBAD J2000 positions: 402.3" (6.7').

## 3. Detectability against SPHEREx depth

Published depth numbers:
- Pre-launch single-visit 5 sigma point-source sensitivity: AB 18.5-19 from 0.75 to 3.8 um, AB 16.6 to 18 from 3.8 to 5 um, set by zodiacal photon noise, 112.5 s integration. VERIFIED, Crill et al. 2025 sky simulator paper: https://arxiv.org/pdf/2505.24856 (text read from the PDF, line "5 sigma point source sensitivity ... mAB 18.5-19 from 0.75 to 3.8 um").
- Four visits per channel: factor ~2 deeper (that paper), so ~19.5 to 19.9 AB (UNVERIFIED secondary figure). Deep fields (near ecliptic poles) 10 to 20 times deeper.
- Flight statement: actual performance is as good as or better than the 2018 projection except the helium-contaminated 1.083 um channel. VERIFIED, SPHEREx Explanatory Supplement v2.1 (2026-11-10) section 1.3 and Fig. 3: https://irsa.ipac.caltech.edu/data/SPHEREx/docs/SPHEREx_Expsupp.pdf. Exposure time 113.58 s, pixel 6.15", FOV 2 x (3.5 x 11.3 deg), VERIFIED same doc Table 2.
- Saturation (onset of nonlinearity) and high-SNR (50 sigma) thresholds, Explanatory Supplement Table 25 (VERIFIED):

| Detector | Saturation AB | 50 sigma AB |
|---|---|---|
| D1 | 11.50 | 14.74 |
| D2 | 11.50 | 14.79 |
| D3 | 11.30 | 14.61 |
| D4 | 11.71 | 14.85 |
| D5 | 10.19 | 13.46 |
| D6 | 9.75 | 13.17 |

Verdict per target (AB from the table in section 1 and the Vega offsets, so +-0.1 mag):
- R Dra: AB 3.1 to 4.6 in J through W2, 6 to 8 mag brighter than saturation in every detector. Saturated everywhere. Expect SATURATED/OVERFLOW/BLOOM/GHOST flags and halos in the region; the point is the Mira will not give usable core photometry. Best use: show the saturation footprint and variability from wings (UNVERIFIED feasibility).
- Barnard's Star: AB ~6.2 to 7.5 (W1, W2 estimated), saturated in all six detectors by 2.2 to 5 mag. The star is bright but moving 10.4"/yr, so the saturated blob migrates ~2.5 px in 1.5 yr.
- eps Ind A (K5V, AB J 3.8, H 3.74, K 4.09): 7 to 8 mag past saturation, 6.7' from B; ghosts (GHOST_EXT is flagged for sources up to 0.5 deg outside the array) and blooms may contaminate B's frames. UNVERIFIED extent.
- RW Aur A+B: AB 8.6 to 9.3 in J to W2, roughly 1 to 3 mag brighter than the saturation thresholds in D1-D4 (11.3 to 11.7) and 1.2 to 1.6 mag past D5/D6 (but only ~0.6 to 1 mag brighter in D6 at 8.57 vs 9.75: 1.2 mag). Saturated or nonlinear in all detectors in the quiet state. After the 2025 fading (~1.5 to 2 mag optical, less in the near-infrared, UNVERIFIED) it may fall into the linear range at 3 to 5 um. A and B are inside one pixel (Gaia A at 156 pc; ~1.5" apart, UNVERIFIED separation).
- eps Ind B: AB 12.7 to 13.4 from 1 to 5 um (D1 ~15 from z=15.07). Fainter than saturation in every detector (margin 1.2 to 2.6 mag) and brighter than the 50 sigma line in D5/D6 (12.83 vs 13.46/13.17). S/N is very high in single exposures: the clean target of the five. Ba and Bb (~0.6 to 0.7", UNVERIFIED) are unresolved.
- WISE 0855: AllWISE W2 13.704 (AB 17.04); the literature W2 ~13.9 and [3.6]-[4.5] ~ +4 (Luhman 2014) are UNVERIFIED values from memory. J 25.0 and H 23.83 Vega (SIMBAD, VERIFIED) mean AB ~25 at 1 to 1.6 um, 8 mag below the single-exposure limit: invisible in D1 to D3. At 3.6 um [3.6] ~17.4 Vega, AB ~20.2 (UNVERIFIED), invisible in D4. At 4.5 um it is AB ~16.7 to 17.0 (W2 13.45 to 13.70 Vega, +3.26/3.34 offsets), right at the single-exposure 5 sigma limit of the D5/D6 channels (16.6 to 18, pre-launch). JWST NIRSpec G395M shows the flux peak at 4.4 to 5 um (Rowland et al. 2024, https://arxiv.org/abs/2411.14541, abstract VERIFIED, flux numbers not read). So it is detected only in the D6 (4.42-5.0 um) and upper D5 channels at S/N of order 3 to 8 in a single channel exposure, and needs stacking of the ~17 channels of D6, and across epochs, to be convincing: in one all-sky pass each D6 channel position gets one visit, 17 channels, so stacking 17 gives sqrt(17) ~4x or ~1.5 mag, and 4 passes another 2x. Position moves 8.1"/yr, so within one pass the stack is fine; across passes shift before stacking.

## 4. Spectral signatures 0.75 to 5 um (for an on-the-fly spectrum)

All UNVERIFIED (domain knowledge; not read at a source today), except the SPHEREx features list from the IRSA tutorials in the shared context file.
- Barnard's Star (M4V): TiO and VO bands below ~0.9 um, steep rising Rayleigh-Jeans continuum, H2O bands at 1.4 and 1.9 um, CO first overtone at 2.3 um, fundamental CO at 4.6 um; peak in F_nu near 1.2 to 1.6 um then falling (F_nu falls ~ lambda^-2).
- eps Ind Ba (T1) + Bb (T6): methane at 1.6, 2.2, 3.3 um (strong) and 2.4 um onwards; H2O at 1.4 and 1.9 um; collision-induced H2 suppresses K; flux emerges in the J peak (1.27 um) and a 4 to 5 um peak; CO at 4.6 um and PH3/NH3 hints at 3 um. Bb (T6) deeper CH4 at 3.3 um and a bluer W1-W2 colour. The measured AllWISE W1-W2 = 1.23 (VERIFIED arithmetic from 10.718-9.492).
- WISE 0855 (Y2, 250 K): extremely red; the spectrum is dark below 3 um with water, CH4 and NH3 absorption and an emission window at 4.0 to 5.2 um (JWST: https://arxiv.org/abs/2411.14541: H2O, CH4, NH3, PH3 ~1 ppb, D/H). In SPHEREx only D5 and D6 give signal.
- R Dra (M-type Mira): strong H2O bands at 1.4, 1.9 and 2.7 um, CO at 2.3 and 4.6 um, TiO and VO below 1 um (VO ~1.05 um), possible dust emission near 3 um and SiO at 4 um, phase-dependent; saturated in SPHEREx so only wings.
- RW Aur (T Tauri, K1+K5): photospheric Si/Ca/CO features plus NIR excess from the inner dust rim rising to 3 to 5 um; Pa-alpha 1.875, Br-gamma 2.166, Br-alpha 4.05 um accretion lines; CO 4.67 emission; H2O ice absorption at 3.0 um and CO ice at 4.67 may appear in a dimmed (disk-occulted) state; history of dimmings given in the table (sources above, UNVERIFIED in detail).
- SPHEREx labelled features available in the tutorials: Pa-beta 1.282, 1.6 um H- bump, Pa-alpha 1.875, Br-gamma 2.166, Br-beta 2.626, PAH 3.30, Br-alpha 4.052, CO 4.67 um (from the shared context file, section 8).

## 5. Motion physics

Computed with a coplanar circular-orbit geometry (Appendix B). Columns give geocentric apparent motion in arcsec per day at solar elongation 90 deg (SPHEREx points near the terminator per the Explanatory Supplement Fig. 4 caption, VERIFIED: "completes full spectral sampling near the terminator") and at opposition (180 deg). Real orbits add eccentricity and inclination effects; this is a first-order scale, UNVERIFIED as to orbital realism. Conversions: pixel = 6.15", exposure = 113.58 s, pass = 14 days (an assumption of the brief, UNVERIFIED as to the real SPHEREx visibility window per position), 6 months = 182.6 d.

| Population | arcsec/day (90 deg) | (opposition) | px per 113.58 s exposure (90 deg) | px per day | px per 14 d | px per 182.6 d |
|---|---|---|---|---|---|---|
| NEO, typical 0.5 deg/day (assumed, UNVERIFIED) | 1800 | | 0.38 | 293 | 4100 | too far to link |
| NEO close approach, 5 deg/day (UNVERIFIED) | 18000 | | 3.8 | 2930 | 41000 | no |
| Main belt 2.7 AU | 800 | 817 | 0.17 | 130 | 1820 | 23700 |
| Jupiter trojan 5.2 AU | 299 | 474 | 0.064 | 49 | 681 | 8900 |
| Centaur 15 AU | 61 | 188 | 0.013 | 9.9 | 139 | 1800 |
| TNO 40 AU | 14.0 | 76.6 | 0.0030 | 2.3 | 32 | 416 |
| TNO 100 AU | 3.5 | 32.3 | 0.0008 | 0.57 | 8 | 104 |
| Planet Nine 500 AU circular | 0.3 | 6.8 | 0.00005 | 0.05 | 0.7 | 9 |
| Planet Nine 700 AU circular | 0.2 | 4.9 | 0.00004 | 0.03 | 0.5 | 6 |
| Brown dwarf WISE 0855 (8.15"/yr) | 0.022 | | 0.00000 | 0.0036 | 0.051 | 0.66 |
| Barnard's Star (10.39"/yr) | 0.028 | | | 0.0046 | 0.065 | 0.84 |
| eps Ind B (4.68"/yr) | 0.013 | | | 0.0021 | 0.029 | 0.38 |

Which population shows up how:
- Blinking exposures within one pass (minutes to days): main-belt asteroids, NEOs, trojans and comets (0.1 to 0.4 px per exposure for the fast ones, 50 to 300 px per day) appear as streak-like or hopping points; Centaurs are borderline (0.013 px per exposure, 10 px per day). Each detector images the same sky at a different time, so the change between exposures is real motion across different channels, and wavelength changes the brightness too.
- Blinking the 6-month passes: only objects with pm of order 1 arcsec/yr or more (brown dwarfs, high-pm stars) and slow distant bodies move a measurable 0.3 to 2 px between passes. Asteroids move tens of thousands of px, so they are not linkable between passes; TNOs at 40 to 100 AU move 100 to 400 px per half year (UNVERIFIED linking); Planet Nine moves a few to 10 px per half year, mainly the parallax signature, a pair of epochs gives an ~arcminute-scale pm which is the 3'/yr scale quoted in the IRAS/AKARI paper (VERIFIED abstract https://arxiv.org/abs/2504.17288).
- Parallax: nearby brown dwarfs at 2 pc have a parallax ellipse of 0.45" radius so epoch-to-epoch swing is up to 0.9" (0.15 px), well below the proper motion for the fast ones.

## 6. Planet X and Planet Nine

History (UNVERIFIED unless a URL is cited; standard history): Percival Lowell predicted a "Planet X" from residuals in the orbits of Uranus and Neptune (1900s); Clyde Tombaugh discovered Pluto at Lowell Observatory in 1930 with a blink comparator, comparing plates taken days apart; Pluto is far too low-mass to explain the residuals, which later disappeared when Neptune's mass was updated by Voyager 2. The challenge text itself says Pluto was discovered by comparing two images (VERIFIED in the shared context file).

Planet Nine hypothesis: Batygin and Brown 2016 (the clustering of the longitude of perihelion and orbital pole of distant eccentric KBOs); latest parameters from the Brown and Batygin 2021 abstract, VERIFIED https://arxiv.org/abs/2108.09868: mass 6.2 (+2.2/-1.3) Earth masses, semi-major axis 380 (+140/-80) AU, inclination 16 +-5 deg, perihelion 300 (+85/-60) AU; clustering significant at 99.6% after bias update. Earlier 2016 constraints (VERIFIED abstract https://arxiv.org/abs/1603.05712): a 380 to 980 AU, 5 to 20 Earth masses, brightness 22<V<25, motion mainly parallax detectable within 24 h at opposition.

Searches and limits:
- WISE: Meisner et al. 3.4 um search rules out Planet Nine in the parameter space searched at W1 < 16.7 at high Galactic latitude (90% completeness), VERIFIED abstract https://arxiv.org/abs/1712.04950.
- Fortney et al. 2016 (VERIFIED abstract and Table 2, https://arxiv.org/abs/1604.07424): Teff upper limits ~35 to 50 K for 5 to 20 Earth masses, radius 3 to 6 Earth radii, geometric albedo ~0.75; thermal fluxes at 3 to 5 um far above blackbody. Table 2 gives apparent Vega magnitudes at 622 AU for a Neptune-radius cloud-free atmosphere: u,g,r,i,z about 21.3 to 22.4; MKO J 23.8 to 24.4, H 23.4 to 24.9 (reflected, Vega); thermal L', M', W1, W2 range from ~16 to 30 depending on Teff (40 K: W1 about 22.8 to 23.9, W2 ~24 to 25 in one row; 50 K with depleted methane: W1 16.1, W2 17.2; 20 and 30 K: > 25 in W1 and W2). The table columns are partly garbled in the text extraction, so the W1/W2 assignment above carries UNVERIFIED column mapping. Best case W2 17.2 Vega is AB ~20.5.
- IRAS and AKARI (Phan et al. 2025, VERIFIED abstract https://arxiv.org/abs/2504.17288): 13 pairs after selection, one candidate, orbit undetermined; Brown's response "100 percent NOT Planet Nine" (secondary: https://www.astronomy.com/science/have-astronomers-found-planet-nine/, UNVERIFIED quote). Follow-up with DECam planned (secondary).
- 2017 OF201 (Cheng et al. 2025, VERIFIED abstract https://arxiv.org/abs/2505.15806): a = 830 AU, perihelion 45 AU, now at 90 AU, ~700 km; its longitude of perihelion lies outside the clustering and challenges the hypothesis.
- A 2025 targeted survey of ~98 sq deg found no credible candidates (search summary of https://arxiv.org/pdf/2504.05473v2, UNVERIFIED).
- "Planet Y" (Matese and Whitmire; Volk and Malhotra inclined-plane evidence): UNVERIFIED, not read.
- Rubin Observatory: the 10-year LSST started on 29 June 2026 per https://survey-strategy.lsst.io/progress and the 2026-07-10 early-operations update https://community.lsst.org/t/2026-07-10-early-operations-update-start-of-lsst/12280 (summaries via search, UNVERIFIED in detail); first alerts 24 Feb 2026 (~800,000 alerts) per Sky at Night summary (UNVERIFIED). I found no peer-reviewed Rubin result on Planet Nine as of 2026-11-14. Non-peer-reviewed items: a Zenodo Monte Carlo forecast (cumulative detection probability by 2036 61 to 72%, self-published, https://zenodo.org/records/20689349) and a Rubin forum post of 2026-06-08 claiming the clustering is a bias with 36 ETNOs (https://community.lsst.org/t/new-study-completely-debunks-planet-9/12085, read, VERIFIED to exist, unreviewed). A spacedaily item quoting Batygin about Rubin tests is UNVERIFIED.

Honest SPHEREx verdict on Planet Nine: SPHEREx cannot realistically detect it. At 380 to 700 AU the reflected-light magnitudes are z ~21 to 22 and J ~24 (Vega, Fortney 2016), 2 to 5 mag fainter than the 18.5 to 19 AB single-visit 5 sigma limit at 0.75 to 3.8 um (about 19.5 to 19.9 AB with four visits; deep fields ~1.5 mag deeper, UNVERIFIED). Thermal emission at 3.8 to 5 um is the most favourable channel, but the best-case model (50 K, depleted methane, W2 17.2 Vega = AB 20.5) is still ~2.5 to 4 mag below the 16.6 to 18 AB single-visit limit and ~2 mag below the four-visit limit; cooler (20 to 40 K) and cloudy models are fainter than AB 25. The planet would also move 5 to 10 px per half year (500 to 700 AU) or ~0.5 to 1 arcmin per half year, and it is not in the SPHEREx deep fields. So blinking SPHEREx cannot find it unless the planet is much closer or hotter than all published models (a tail of the Brown and Batygin 2021 distribution is "closer and brighter than initially expected", but still not within SPHEREx depth); WISE with a W1 < 16.7 limit already excludes more than SPHEREx can.

What SPHEREx CAN find by motion: the Explanatory Supplement quotes at least 100,000 asteroid and comet spectra as a design goal (VERIFIED, Expsupp section 1.1), and the Crill and Emery 2022 Icarus paper simulates asteroid spectra (cited in the Explanatory Supplement reference list, VERIFIED to exist). Realistic movers: bright comets (3I/ATLAS has an IRSA SPHEREx page, VERIFIED in the shared context), main-belt and NEO asteroids brighter than AB ~18.5 to 19, high proper motion stars, and cold brown dwarfs only if bright at 4 to 5 um, with Y/late-T dwarfs only visible in D5/D6 (like WISE 0855 at AB ~17, near the limit). I found no published yield prediction for motion-discovered brown dwarfs from SPHEREx. UNVERIFIED: yield numbers.

## 7. Backyard Worlds and the WISE cadence

UNVERIFIED (from memory; not read at a source today): Backyard Worlds: Planet 9 launched in 2017 and uses WiseView (http://byw.tools/wiseview, unreachable on 2026-11-14 per the shared context) to flip through time-resolved WISE/NEOWISE coadds; volunteers have found several hundred (the challenge text says "hundreds of discoveries", VERIFIED in the shared file) brown dwarfs and a first-class discovery (Kirkpatrick et al.); the WISE spacecraft surveyed the full sky about every six months, each epoch a coadd of ~12 or more exposures over ~1 to 2 days. Parallax of 0.5 arcsec at 2 pc and proper motion of arcseconds per year show up as a shift between 6-month epochs in the epoch-based flip. SPHEREx's all-sky coverage twice per year (VERIFIED, Expsupp Fig. 4 caption: "enabling full-sky spectral coverage twice every year") gives a similar cadence. Differences: SPHEREx is a spectral cube with each epoch in different wavelengths in different channels at different times, and the 6.15" pixel is larger than WISE's 2.75" (UNVERIFIED W1 pixel), so subpixel motion matters more.

## Appendix A: pos.py (positions)

See the next block (copied verbatim from the scratchpad file <scratch>/w6/pos.py). Run: `uv run --with astropy python -I pos.py`.

```python
import numpy as np, astropy.units as u
from astropy.coordinates import SkyCoord, get_body_barycentric, BarycentricMeanEcliptic
from astropy.time import Time
# J2000 ICRS epoch-propagated catalogue values (SIMBAD, Gaia DR3 based except W0855=Kirkpatrick+2021)
T = {
 "Barnards_Star": ("17 57 48.4984700685","+04 41 36.113879676",-801.551,10362.394,546.9759,-110.11),
 "eps_Ind_B(Ba+Bb)": ("22 04 10.5951812451","-56 46 58.239102418",3981.977,-2466.832,270.6580,-40.0),
 "WISE_0855": ("08 55 16.53798","-07 14 49.3728",-8123.7,673.2,439.0,0.0),
 "RW_Aur_A(Gaia)": (None,None,2.6406,-27.3976,6.4062,-20.94),
 "R_Dra": ("16 32 40.2265999080","+66 45 17.925901992",-20.643,6.149,1.2509,-132.8),
}
# RW Aur A Gaia DR3 156430822114424576 at epoch 2016.0
ep = [2025.4,2025.9,2026.4,2026.9]
PIX=6.15
def sc(name):
    r,d,pmra,pmde,plx,rv=T[name]
    if r is None:
        c=SkyCoord(76.95608119552952*u.deg,30.401204589097233*u.deg,distance=(1000/plx)*u.pc,pm_ra_cosdec=pmra*u.mas/u.yr,pm_dec=pmde*u.mas/u.yr,radial_velocity=rv*u.km/u.s,obstime=Time(2016.0,format='jyear'),frame='icrs')
    else:
        c=SkyCoord(r,d,unit=(u.hourangle,u.deg),distance=(1000/plx)*u.pc,pm_ra_cosdec=pmra*u.mas/u.yr,pm_dec=pmde*u.mas/u.yr,radial_velocity=rv*u.km/u.s,obstime=Time(2000.0,format='jyear'),frame='icrs')
    return c
def topo(c,t):
    """apparent direction from Earth centre (barycentric Earth) incl. proper motion + parallax; no aberration"""
    cb=c.apply_space_motion(new_obstime=t)
    xyz=cb.cartesian.xyz.to(u.au)
    e=get_body_barycentric('earth',t).xyz.to(u.au)
    v=(xyz-e[:,None] if xyz.ndim>1 else xyz-e)
    from astropy.coordinates import CartesianRepresentation,ICRS
    g=SkyCoord(CartesianRepresentation(v),frame='icrs')
    return SkyCoord(g.spherical.lon,g.spherical.lat,frame='icrs')
print("# decimal deg RA, Dec; geocentric apparent-direction (PM + parallax, no aberration)")
for n in T:
    c=sc(n); prev=None; first=None
    ecl=c.transform_to(BarycentricMeanEcliptic)
    print(f"\n{n}  ecl lon {ecl.lon.deg:.3f} lat {ecl.lat.deg:.3f}")
    for e in ep:
        t=Time(e,format='jyear'); p=topo(c,t)
        # PM-only for comparison
        pm=c.apply_space_motion(new_obstime=t)
        s=""
        if prev is not None:
            sep=p.separation(prev).arcsec; s=f"  shift_prev={sep:.2f}\" = {sep/PIX:.2f} px"
        if first is not None:
            sep=p.separation(first).arcsec; s+=f"  total={sep:.2f}\" = {sep/PIX:.2f} px"
        print(f"  {e}  RA {p.ra.deg:.6f} Dec {p.dec.deg:.6f}  (PM-only {pm.ra.deg:.6f} {pm.dec.deg:.6f}){s}")
        prev=p; first=first or p
# WISE0855 challenge coords epoch
c=sc("WISE_0855"); ch=SkyCoord("08h55m10.831s","-07d14m42.53s")
print("\nchallenge coords deg",ch.ra.deg,ch.dec.deg)
best=None
for y in np.arange(2000,2027,0.01):
    p=c.apply_space_motion(new_obstime=Time(y,format='jyear'))
    s=p.separation(ch).arcsec
    if best is None or s<best[1]: best=(y,s)
print("closest PM-only epoch to challenge coords:",best)
for e in [2010.5,2013.0,2014.0,2015.0]:
    p=c.apply_space_motion(new_obstime=Time(e,format='jyear')); print(e,p.to_string('hmsdms'),p.separation(ch).arcsec)
for e in ep:
    p=topo(c,Time(e,format='jyear')); d=p.separation(ch)
    print(f"2026-era {e}: sep from challenge coords {d.arcsec:.1f}\" = {d.arcmin:.2f}' = {d.arcsec/PIX:.1f} px; PA {ch.position_angle(p).deg:.1f}")
# eps Ind A-B separation and Barnard/WISE neighbours
A=SkyCoord(22.0+3/60+21.6536261624/3600,0,unit=u.hourangle); 
A=SkyCoord("22 03 21.6536261624","-56 47 09.522795714",unit=(u.hourangle,u.deg)); 
B=SkyCoord("22 04 10.5951812451","-56 46 58.239102418",unit=(u.hourangle,u.deg))
print("eps Ind A-B sep (J2000 both) arcsec",A.separation(B).arcsec)
```

## Appendix B: rates.py (motion rates and AB conversion)

```python
import numpy as np
PIX=6.15; EXP=113.58
# circular coplanar geocentric rate (arcsec/day) at solar elongation eps, body at heliocentric r AU
def rate(r,eps_deg):
    e=np.radians(eps_deg)
    # Earth at (1,0); Sun direction from Earth is (-1,0); line of sight at elongation eps from Sun
    # solve body position: distance d from Earth along direction making angle eps with Sun direction
    # |E + d*u - 0| = r , u = (-cos eps, sin eps)  rotated: sun dir = (-1,0); u at angle eps from sun dir
    u=np.array([-np.cos(e),np.sin(e)])
    E=np.array([1.0,0])
    b=2*E@u; c=1-r*r
    d=(-b+np.sqrt(b*b-4*c))/2
    P=E+d*u
    k=0.01720209895 # rad/day, a=1
    vE=np.array([0,1.0])*k
    vP=k/np.sqrt(r)*np.array([-P[1],P[0]])/r
    rel=vP-vE
    d_vec=P-E; dh=d_vec/np.linalg.norm(d_vec)
    perp=np.array([-dh[1],dh[0]])
    w=(rel@perp)/np.linalg.norm(d_vec)  # rad/day
    return abs(np.degrees(w)*3600)
rows=[("Main-belt (2.7 AU circ)",2.7),("Jupiter trojan (5.2 AU)",5.2),("Centaur (15 AU)",15),("TNO 40 AU",40),("TNO 100 AU",100),("P9 500 AU circ",500),("P9 700 AU circ",700)]
print("name | eps90 asec/day | eps120 | eps180 (opposition)")
for n,r in rows:
    print(n,[round(rate(r,e),1) for e in (90,120,180)] if r>1 else '')
# generic table of rates (arcsec/day) -> px per exposure/day/14d/182d
def conv(ad):
    return ad*EXP/86400/PIX, ad/PIX, ad*14/PIX, ad*182.6/PIX
print("\npx per exposure,day,14d,182d for given arcsec/day")
for n,ad in [("MBA 900(0.25deg/d)",900),("NEO 1800 (0.5deg/d)",1800),("NEO fast 18000",18000),("Trojan opp",rate(5.2,180)),("Trojan 90deg",rate(5.2,90)),("Centaur 90",rate(15,90)),("TNO40 90",rate(40,90)),("P9 600AU 90",rate(600,90)),("W0855 pm 8.15\"/yr",8.15/365.25),("Barnard 10.39\"/yr",10.39/365.25),("epsIndB 4.68\"/yr",4.685/365.25)]:
    print(n, round(ad,3), [round(x,4) for x in conv(ad)])
# AB mags
off={"J":0.91,"H":1.39,"K":1.85,"W1":2.699,"W2":3.339}
T={"Barnard":{"J":5.244,"H":4.83,"K":4.524},"R Dra":{"J":3.71,"H":3.125,"K":2.23,"W1":0.393,"W2":0.129},"RW Aur":{"J":8.378,"H":7.621,"K":7.02,"W1":6.246,"W2":5.228},"eps Ind B":{"J":11.908,"H":11.306,"K":11.208,"W1":10.718,"W2":9.492},"eps Ind A":{"J":2.89,"H":2.349,"K":2.237},"WISE0855":{"W2":13.704}}
print()
for n,d in T.items(): print(n,{k:round(v+off[k],2) for k,v in d.items()})
```

## Implications for the viewer (opinions)

1. Field of view and WISE 0855: the challenge coordinates are an epoch-2010.45 position. In the SPHEREx epoch (2025.4 to 2026.9) the brown dwarf is 2.0 to 2.2 arcmin west (PA 275 deg), 20 to 22 pixels. A default cutout of 0.1 deg (~60 px, 6 arcmin) centred on those coordinates does contain it, but 0.01 deg (6 px) does not. Recommend a default of at least 0.1 deg, and a proper-motion-aware "resolve name to current epoch" step (SIMBAD or Gaia pm) for named targets.
2. Frame grouping: stars and brown dwarfs move only 0.3 to 2.5 px over the 1.5 year baseline (Barnard 2.47 px, WISE 0855 1.86 px, eps Ind B 1.08 px, RW Aur and R Dra none). A "little video" of single exposures will not show them move. Group frames by survey pass or half-year epoch (stack channels per detector inside each pass), then play the 3 to 4 epochs with an overlay marker, a crosshair at the predicted position, and a 4x to 8x zoom with subpixel resampling.
3. Within-pass blink works for asteroids and NEOs only: 0.1 to 0.4 px per exposure and 50 to 300 px per day. Because exposures at the same sky position come from different channels (different wavelengths), normalise per frame and do not read brightness changes as variability.
4. Per-target caution: R Dra and Barnard's Star are saturated in all six detectors (2 to 8 mag past the Table 25 threshold) and RW Aur is saturated in the quiet state; show the FLAGS layer (OVERFLOW, BLOOM, GHOST, SATURATED) by default. eps Ind B is the cleanest target (S/N high, below saturation) but eps Ind A is 402" (66 px) away and will throw ghosts and halos: use a field larger than 7 arcmin to show them both and flag the contamination.
5. WISE 0855: only D5 and D6 carry signal (AB ~17 at 4 to 5 um), invisible in D1 to D4. The viewer should offer a per-detector stack (the challenge's six arrays) and default to D6 for this target, and should warn that single-channel exposures are near the 5 sigma limit.
6. Planet Nine is not detectable by SPHEREx; do not promise it. Position the tool as a discovery aid for brown dwarfs, high-pm stars, comets and asteroids, and say so in the UI.
7. R Dra sits at ecliptic latitude +81 deg near the north ecliptic pole region, so it will have far more visits than a low-latitude target (UNVERIFIED density), and the viewer needs to cope with 100s of frames per cutout.
8. Data: SIMBAD at Strasbourg and VizieR were unreachable on 2026-11-14; implement a fallback (Harvard SIMBAD mirror or Gaia TAP via ESA) for name resolution.
