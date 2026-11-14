# 03. SPHEREx mission, survey strategy and data products (research notes)

Collected 2026-11-14 by worker w3. Tags: VERIFIED = read in the cited source today; DERIVED = my arithmetic or physical reasoning from verified inputs; UNVERIFIED = memory or not found in a source.
Short source keys: EXPSUPP = https://irsa.ipac.caltech.edu/data/SPHEREx/docs/SPHEREx_Expsupp.pdf (read in full via anydoc; page numbers are the PDF's "Page N of 84"). BOCK = arXiv:2511.02985. BRYAN = arXiv:2508.20332. AKESON = arXiv:2511.15823. KORNGUT = arXiv:2603.29835.

Extends (does not repeat) ~/Downloads/planet-x-spherex-context.md.

---

## 0. Document versions and corrections to the context file

- Explanatory Supplement is **Version 2.1, dated 2026-11-10**, SSDC-DP-017, 84 pages, authors SPHEREx Science Data Center team. VERIFIED (EXPSUPP title page).
- Archive User Guide is dated **November 12, 2026**. VERIFIED (https://irsa.ipac.caltech.edu/spherex-archive-documentation/).
- Context file said "launched March 2025"; exact: **12 March 2025 03:10:12 UTC**, Falcon 9, Vandenberg. Regular science operations began **1 May 2025**. VERIFIED (EXPSUPP 1.1, p4). (arXiv abstract of BOCK says 11 March, that is the local-time date; EXPSUPP is authoritative.)
- Context file said PSF header error fixed "April 10, 2026" (from IRSA mission page). EXPSUPP and the Data Releases page say **March 31, 2026**. The QR overview says "In April 2026". Treat as March 31 (files) / April (announcement). VERIFIED (EXPSUPP 2.2 p13; https://irsa.ipac.caltech.edu/spherex-archive-documentation/spherex-data-releases).
- QR DOIs complete: QR1 10.26131/IRSA629, **QR2 10.26131/IRSA652** (context file wrongly lists IRSA629 as QR2), QR3 10.26131/IRSA662, DR1 images 10.26131/IRSA678, all-sky cube IRSA679. VERIFIED (https://irsa.ipac.caltech.edu/data/SPHEREx/docs/overview_qr.html).
- Context file said "ePSF 441 rows". True for D1, D2, D4, D5, D6 (21x21). **Detector 3 is 11x41 = 451 rows.** VERIFIED (EXPSUPP 2.2 p13, 4.1.2 p52).
- Spectral image file size is **about 67 MB each**. VERIFIED (EXPSUPP 2.2 p14).
- Context file bands table lists band edges as 0.75-1.09 etc. The EXPSUPP Table 2 gives overlapping design edges: B1 0.744-1.116, B2 1.099-1.651, B3 1.636-2.421, B4 2.423-3.822, B5 3.809-4.420, B6 4.412-5.002 um; R = 39, 41, 41, 35, 112, 128. VERIFIED (EXPSUPP 1.3 Table 2, p6). Channels are defined 17 per band.

---

## 1. Survey strategy and cadence

### 1.1 Orbit and spacecraft
- Sun-synchronous polar LEO, semi-major axis 7,037.41 km, eccentricity 0.00034, inclination 97.951 deg, **MLTAN 6:00 AM**, **orbital period 98 min**. VERIFIED (EXPSUPP Table 1, p5).
- No propulsion. Onboard recorder holds up to 8 days of science data (about 1074 Gbit); Ka-band downlink 600 Mbps; several downlinks a day. VERIFIED (EXPSUPP 1.2 p4; BOCK Fig. 8 caption).
- Telescope: 20 cm effective aperture, f/3, FoV 2 x (3.5 x 11.3 deg)... precisely: total FoV 3.5 x 11.3 deg made of 3 detector arrays (3.5 x 3.5 deg each) per side; dichroic splits light so SWIR FPA (62 K, 0.75-2.44 um, reflection) and MWIR FPA (45 K, 2.40-5.01 um, transmission) see the same sky simultaneously. Pixel 6.15 x 6.15 arcsec. VERIFIED (EXPSUPP 1.3 Table 2, p6; AKESON line "3x1 H2RG ... 3.5x3.5 degrees").
- Detectors: 6 x H2RG 2048x2048 (2040x2040 active in L2 files), SUR (sample-up-the-ramp) readout, frame time 1.5349 s, **exposure time 113.58 s** (header XPOSURE = 113.5826 s, TELAPSE = 118.1873 s which includes discarded frames). Pre-IOC exposure was 112 s; lengthened to 118 s after IOC. VERIFIED (EXPSUPP Table 2 p6, header example Table A.35 p77; KORNGUT line 513 "from the pre-IOC value of 112 s, to 118 s").

### 1.2 Pointing constraints (the "allowable pointing zone")
- Sun > 93.5 deg off boresight; Earth zenith angle < 45 deg (was 39.3 deg pre-launch); telescope must point < 20 deg from zenith in the ram direction is excluded (shuttle glow mitigation: "the telescope point < 20 deg from zenith in the ram direction" per BOCK 4.2.1); Moon > 32 deg during observing, > 13 deg during slews. VERIFIED (BOCK 4.2.1-4.2.2).
- South Atlantic Anomaly: quadrilateral centered -26 deg lat / -45 deg lon, 8.1 % of Earth surface; images are still taken and telemetered but not counted for survey completeness; **images inside the SAA boundary are excluded from the IRSA archive** (archive inclusion rule below). VERIFIED (BOCK 4.2.3; EXPSUPP 3.2.12 p42).
- Because the orbit is Sun-synchronous at 6 am/6 pm, the observable sky is a band near the great circle 90 deg from the Sun, which rotates about 1 deg/day around the ecliptic as Earth orbits. VERIFIED qualitatively (BOCK 4.2.5 "filling in observations near the great circle 90 deg from the Sun in piecewise fashion"; EXPSUPP Fig. 4 caption "observable arc ... gradually rotates").

### 1.3 Scan strategy: large slew, up to 4 small slews
- Each pointing yields one **exposure** = 6 simultaneous spectral images (one per detector). "Exposures in a set are separated by small slews of **11.8 arcmin**, chosen to match the distance between spectral channels." A set is "typically 1 to 4 exposures"; the file naming says "Each large slew has a maximum of 4 small slews" (counter 1..4). Large slews up to ~70 deg; slew time allocation 19.7 + 1.088 x theta(deg) s, e.g. a 35 deg slew = 38.1 s motion + 19.7 s settle. Pointing stability 0.15 arcsec rms. VERIFIED (BOCK 4.2 and 5.x; EXPSUPP Table 3 p13).
- **Target group** = 17 pointings at identical ecliptic longitude, spaced one channel width in **ecliptic latitude**; groups are laid on great-circle "latitude rings", fewer groups at high latitude; rings and groups overlap. VERIFIED (EXPSUPP 1.4 p7-8; BRYAN 2.1).
- The observatory is rolled so the wide FoV axis follows lines of constant ecliptic latitude. Ecliptic PA = 0 deg on ascending half-orbits, 180 deg on descending halves. VERIFIED (EXPSUPP 1.4 p8).
- Survey definitions (**not time-ordered**): Survey 1 = first 12.5 months with PA = 0; Survey 2 = first 12.5 months with PA = 180; Survey 3 = months 12.5-25 with PA = 0; Survey 4 = months 12.5-25 with PA = 180. Header keywords `SPS_LON_ECL`, `SPS_LAT_ECL`, `SPS_PA_ECL` (planned boresight, ecliptic; header table prints them as SPS_ELON, SPS_ELAT, SPS_EPA) identify the survey. Surveys 3 and 4 are shifted 6 arcmin (half a channel) vs 1 and 2 for Nyquist sampling. VERIFIED (EXPSUPP 2.2 p14, Table A.35 p76).
- Survey plans are loaded about twice a week; plan IDs look like `2025W20_2B` (year, ISO week, half-week 1/2, version letter; first plan `2025W17_4B`). VERIFIED (EXPSUPP 1.5 p10). OBSID form `2025W22_2B_0001_1` = plan + large-slew counter + small-slew counter; filename `level2_2025W22_2B_0001_1D3_spx_l2b-v4-2025-152.fits` (D3 = detector; last token = processing version and day-of-year). VERIFIED (EXPSUPP Table 3).

### 1.4 How one sky position accumulates 102 channels (the time versus wavelength entanglement)
This is the load-bearing fact for the viewer.
- It is a **linear variable filter**: wavelength is a function of **detector pixel position** (2D, slightly curved iso-wavelength contours, mostly varying along the ecliptic-latitude axis). A given source therefore lands on one wavelength in one exposure. VERIFIED (KORNGUT: "the position within the focal plane that a source lands on during an exposure determines the wavelength at which it is measured"; EXPSUPP 1.3; context file section 6.1).
- Spectral channels are about 3.5 x 0.2 deg rectangles on the focal plane (17 per 3.5 deg array). VERIFIED (KORNGUT section 2).
- Per pixel, wavelength and bandwidth come from the WCS-WAVE extension (key "W"). D1 example: about 1.126 um (top) to 0.744 um (bottom) across one 2040 px image. VERIFIED (context file section 6.1).
- **Each exposure sees a point source in exactly two images**: one SWIR detector (D1, D2 or D3) and one MWIR detector (D4, D5 or D6), because the dichroic overlays the same sky on both FPAs. DERIVED from "6 spectral images per exposure" + FoV 3 arrays x 3.5 deg + "dichroic detector pairs" used as astrometry seeds (EXPSUPP 4.2.2 p57) + "SPS values same for all 6 bands" (EXPSUPP 2.2). The pairing D1-D4, D2-D5, D3-D6 is UNVERIFIED but consistent with the 3x1 array layout. Each of the 6 detectors therefore holds a *different* part of the sky in a given exposure.
- Stepping along the gradient by one channel (11.8 arcmin) per small slew moves a source through the 17 channels of a detector in 17 exposures (the "target group"). To reach all 3 array positions x 6 bands = 102 channels needs on the order of 3 x 17 = 51 stepped exposures (Bryan: a fully sampled deep tile takes (17+16) x 3 = 99 small steps, because it must also fill the ends). DERIVED/VERIFIED mix (BRYAN 2.2).
- **Time to complete all 102 channels at one position: "Over the course of each survey, a typical object on the sky will be observed in all of the spectral channels within approximately two weeks."** VERIFIED (BOCK 4.2.5). Spectral channels of any given exposure are never simultaneous; successive wavelengths of one source are separated by minutes to days. Cadence within a group: exposure 118 s plus small slew; four exposures per large slew, so a handful of wavelengths are obtained in about 10 minutes, then the telescope slews away (Earth/Sun/Moon avoidance) and returns later in the orbit or days later. DERIVED.
- Dependence on ecliptic latitude (NOT stated numerically in any doc I found; DERIVED physics, UNVERIFIED): the observable band is centered 90 deg from the Sun, so a point at ecliptic latitude beta has Sun elongation = arccos(cos beta cos dLambda). Near the ecliptic (beta ~ 0) elongation sweeps through 90 deg at the full ~1 deg/day, giving the shortest visibility window; towards the ecliptic poles elongation stays near 90 deg all year and the point is visible essentially continuously. Documented evidence: poles are "observable every orbit" and "the deep fields are visited every 98-minute orbit" (BRYAN 2.2). The two-week figure is a typical/average for the all-sky survey (BOCK).
- **Consequence for a RA/Dec time series**: for a given RA/Dec, the archive contains a *burst* of exposures spanning roughly 1-2 weeks (one per wavelength step, 100+ exposures at different wavelengths) every ~6 months, plus the same burst with offset PA and half-channel shift. Within a burst, brightness differences between frames mix real time variation, wavelength changes (SED slope, absorption features, emission lines) and moving-object motion. VERIFIED partially (BOCK 4.2.5: "after approximately 6 months the sky will be fully observed, with roughly half the observations in survey 1 and half in survey 2"; "typical object ... within approximately two weeks").
- Frame-grouping implications (DERIVED, see section 9): group by (detector or band, narrow wavelength window) not by time alone.

### 1.5 Revisit interval and number of all-sky passes by Nov 2026
- Mission = 4 all-sky surveys over a nominal 25-month science mission (12.5 months per pair); "the sky is fully observed approximately every 6 months", "full-sky spectral coverage twice every year". VERIFIED (EXPSUPP 1.1 p4, Fig. 4 caption p9; BOCK 4.2.5). Challenge text "every six months" matches.
- First full-sky map announced as complete in **December 2025** (observations May-Dec 2025), i.e. one 6-month coverage. VERIFIED via search snippet (NASA/JPL, https://www.jpl.nasa.gov/images/pia26600-spherexs-first-all-sky-map/ ; https://spherex.caltech.edu/news/nasa-s-spherex-observatory-completes-first-cosmic-map-like-no-other; not opened in full).
- Count as of 2026-11-14 (DERIVED, UNVERIFIED): science started 1 May 2025 so about 18.5 months have elapsed; at one full-sky coverage per ~6 months that is about 3 coverages (May-Nov 2025, Nov 2025-May 2026, May-Nov 2026 in progress or just finished). Archive-wise: DR1 = Survey 1 + Survey 2 (months 0-12.5, the first ~2 coverages, to about mid-May 2026); QR3 = Survey 3 + 4 data from **16 May 2026** onward, released with a 60-day maximum lag, so public QR3 runs to about mid-September 2026 as of today (UNVERIFIED exact end).
- Deep-field positions have vastly more epochs (below).
- Re-observation: 1 to 3 % of images are flagged for reobservation based on transient fraction; about 2000 DR1 images with significant artifacts are excluded from the cubes and "scheduled for re-observations during Year 2". VERIFIED (BOCK 4.2; EXPSUPP 2.5 p21).
- Survey completeness: simulated Survey 2 had 99.54 % voxel completeness; moon avoidance leaves gaps. VERIFIED (BOCK Fig. 7 caption).
- Exposures per day (DERIVED): about 1.2 million images in DR1 (EXPSUPP 2.5) / 6 detectors = ~200,000 exposures in ~12.5 months (~380 days) = ~525 exposures/day, or ~36 per 98-min orbit, consistent with 118 s + slews (max 730/day). KORNGUT says ">1.1 x 10^6 exposures" collected through first survey into the second (counting images or exposures is ambiguous). UNVERIFIED, DERIVED.

### 1.6 Deep fields
- Two fields near the ecliptic poles: **North Deep Field centered on the NEP**; **South Deep Field centered at ecliptic latitude -82 deg, ecliptic longitude -44.8 deg** (offset to avoid Magellanic Clouds). About **100 deg^2 each**, fully spectrally sampled. Tile pattern = one detector array footprint (3.5 x 3.5 deg); sky rotation over the year makes the footprint circular, high-density core diameter about 5 deg (3.5 x sqrt2). VERIFIED (BOCK 4.2.4 and Fig. 9 caption; BRYAN 2.2).
- Depth: >400 observations per channel at the center after 2 years (BOCK 4.2.4); sensitivity quoted assuming 200 observations per channel (BOCK Fig. 19 caption). VERIFIED.
- Cadence: "the deep fields are visited every 98-minute orbit with a few small steps"; a complete fully-spectrally-sampled tile takes (17+16) x 3 = 99 small steps, "which in practice takes **several days** to complete"; each tile is rotated slightly. Authors explicitly note this "may be of use for additional time-domain science cases". Random sub-pixel shifts applied to each deep-field pointing. VERIFIED (BRYAN 2.2).
- Deep images are in separate SIA collections `spherex_dr1_deep`, `spherex_qr3_deep` (context file) and the Spectrophotometry Tool has an "Include deep-field images" checkbox with a warning of "several hours" runtime if used. VERIFIED (https://irsa.ipac.caltech.edu/applications/spherex/tool-spectrophotometry).
- Relevance: the NEP/SEP are the only places with orbit-scale time sampling; the Planet X / brown-dwarf targets are not there.

---

## 2. Sensitivity and image quality

### 2.1 Depth
- Official headline (4 surveys, whole sky, median sky background, |b|>25 deg): **5 sigma point-source depth 19.5-19.9 AB for 0.75-3.8 um, 17.8-18.8 AB for 3.8-5.0 um** after 4 passes (abstract wording); body text says up to 19.9 AB at lambda/dlambda~40 and 17.8-18.8 AB at R~120. VERIFIED (BOCK abstract, arXiv https://arxiv.org/abs/2511.02985). Pre-launch simulator prediction was 18.5-19 AB (0.75-3.8 um) and 16.6-18 AB (3.8-5 um), zodiacal-limited (Crill et al. 2025, arXiv:2505.24856). VERIFIED.
- Per-channel curve is in BOCK Figure 19 (and EXPSUPP Fig. 3 / KORNGUT Fig. 25) as a plot only; I could not extract numbers per band. Features: degraded at 1.08 um (terrestrial He line), at ~2.4 um (dichroic), and in bands 5 and 6 (higher R). VERIFIED (BOCK Fig. 19 caption). Flight performance equals or beats the 2018 concept estimates except the He-contaminated 1.083 um channel. VERIFIED (EXPSUPP Fig. 3 caption).
- **Single-exposure depth is not tabulated in any document I found.** DERIVED estimate: sensitivity is zodiacal photon-noise limited (BOCK/Crill), each channel has 4 observations in the headline numbers, so single exposure = headline minus 2.5 log10(sqrt 4) = **0.75 mag shallower: about 18.8-19.1 AB (0.75-3.8 um) and 17.0-18.0 AB (3.8-5.0 um)** at median sky. UNVERIFIED; the user-visible reality is that most stars brighter than ~17-18 AB are individually detected in single frames, faint sources only in stacks. The Spectrophotometry Tool and VARIANCE layer give the true per-pixel noise.
- Photometric catalog uncertainty: reported sigma is Tractor sigma plus 3 % of flux in quadrature (Eq. 19). VERIFIED (EXPSUPP 3.3 p44).

### 2.2 Bright limits and saturation
- On-board overflow threshold is about half full well: flag OVERFLOW "set at approximately half the level of full-well saturation". VERIFIED (EXPSUPP Table 16 p33).
- Nonlinearity onset magnitudes from pre-launch model (Table 25, AB): B1 11.50, B2 11.50, B3 11.30, B4 11.71, B5 10.19, B6 9.75 (flux 91,200 / 91,200 / 109,600 / 75,200 / 304,800 / 457,100 uJy). Calibrator S/N=50 magnitudes: 14.74, 14.79, 14.61, 14.85, 13.46, 13.17 AB (flux 4,610 / 4,410 / 5,200 / 4,170 / 15,000 / 19,600 uJy). VERIFIED (EXPSUPP 4.2.1 Table 25 p54, text garbled in conversion; band-to-value mapping is by row order and plausible).
- Brighter sources: pixels flagged OVERFLOW/TRANSIENT, flux NaN at core ("early overflow pixels with no determinable flux are assigned NaN"), bloom/ghost/crosstalk artefacts; ghost modeling thresholds quoted in H-band Jy (e.g. 3000 Jy, 10,000 Jy). VERIFIED (EXPSUPP Fig. 9 caption p17, 3.2.9 p40).
- Implication: Barnard's Star (J~5.2 Vega, ~H 4.8) will saturate and bloom in short wavelengths; expect NaN cores. UNVERIFIED target-specific claim from catalogue magnitudes in memory.

### 2.3 Pixel scale, PSF
- Pixel 6.15 arcsec; solid angle median per pixel about 37.9 arcsec^2 (header OMEGA_MEDIAN 37.945 in an example). VERIFIED (EXPSUPP Table 2, Table A.35).
- Optical image quality "better than 3 arcsec FWHM over most of the SWIR focal plane", up to 6 arcsec in extreme band-3 corners; MWIR PSF "up to 5.5 arcsec due to diffraction". VERIFIED (BOCK 4.3.2).
- Pixel-convolved effective PSF FWHM in the file header `PSF_FWHM` (median per image): example 8.67 arcsec (EXPSUPP Table A.35), 7.53 (IRSA tutorial). So **use ~7-9 arcsec effective FWHM (about 1.2-1.5 pixels) for display scale; PSF grows toward red.** VERIFIED for the keyword; band-by-band table not in docs (UNVERIFIED).
- ePSF: 33x33 oversampled x5, 21x21 zones (D3 11x41); stable with time. VERIFIED (EXPSUPP 4.1.2).

### 2.4 Astrometry
- Fine astrometry with astrometry.net then SCAMP against Gaia (proper-motion-corrected) and 2MASS; **RMS < 0.3 arcsec** vs Gaia DR3, no degradation to the corners (images not in SAA with < 300,000 transient pixels). Max distortion ~13 px (~80 arcsec) at corners. VERIFIED (EXPSUPP 4.2.2 p57-58).
- Quality flag header keyword `FINAST`: 0 good, 1 partial (offsets of "a couple of pixels" in image corners), other = poor, do not use. In R7 failures < 1 % after retry module; header keywords `WCSRETRY`, `RETRY_WCSMODE`, `WCSSEED`, `WCSSEEDOBS`. Archive only ingests images with FINAST = 0. VERIFIED (EXPSUPP 4.2.2, 3.2.12 p42).
- Pointing jitter 0.15 arcsec rms. VERIFIED (BOCK).

### 2.5 Photometric calibration
- Absolute flux calibration "<1 %" relative to CALSPEC for most channels; 17 primary calibrator stars, ~54,000 measurements; Bock design target 3 % overall, 2 % channel-to-channel. QR3/DR1 calibrations differ from QR2: "caution when combining QR2 and QR3". VERIFIED (EXPSUPP 4.2.1 p56, 2.1 p11; BOCK 3.x).
- Units MJy/sr; conversion to flux: mJy = MJy/sr x 23.5045 x (pixel scale arcsec)^2 / 1000 (context file) or use the per-pixel solid angle map (calibration product `solid_angle_pixel_map`). VERIFIED.

### 2.6 Zodiacal light
- ZODI layer = per-image estimate in MJy/sr: modified Kelsall et al. 1998 model (Planck-updated) times a per-wavelength scale factor derived from all Year-1 exposures with |b| > 30 deg (Kelsall underestimates amplitude), spectrum from Tsumura 2013. **Not subtracted from IMAGE.** The scale factor file is an IRSA calibration product (EXPSUPP 4.3.4). VERIFIED (EXPSUPP 3.2.11 p41-42).
- Zodi is the dominant background everywhere: sensitivity "limited by the zodiacal light background at all wavelengths" (Crill 2025 abstract). Atmospheric He 1.083 um line is "a factor few to a factor of 30 greater surface brightness than Zodi" in Bands 1-2. Aurora lines can be "a factor of a few brighter than ZL". VERIFIED (EXPSUPP 2.3 p17).
- Zodi varies with solar elongation within an image (the flat-field fit includes a linear tilt for it) and over the year with ecliptic latitude and longitude; it therefore changes between frames of the same patch, so subtracting a plain median of frames is not equivalent to differencing. DERIVED. A per-frame "IMAGE minus ZODI" subtraction exists in the all-sky cubes (EXPSUPP 2.5), and tutorials compute differences of D2 and D4 images.

---

## 3. Data releases

### 3.1 Coverage by release (observation-date)
- QR1: July 2025 start, retired Feb 2026. QR2: Oct 2025 start; "reprocessing of data collected between the start of the science survey and October 2025" initially, then continued weekly with pipeline 6.4 to 6.5.6 (QR2 pipeline versions); QR2 remains downloadable by direct URL through **February 2027** but "no longer returned in IRSA or VO searches". VERIFIED (https://irsa.ipac.caltech.edu/data/SPHEREx/docs/overview_qr.html; EXPSUPP 2.1).
- **DR1 = all Survey 1 + Survey 2 data (first 12.5 months of science, 1 May 2025 to about 15 May 2026) reprocessed with pipeline R7**, plus the all-sky cubes. Released November 2026. VERIFIED (https://irsa.ipac.caltech.edu/spherex-archive-documentation/spherex-data-releases; EXPSUPP 2.1). The exact last-observation date is not printed; "May 16, 2026" is the first date of QR3/R7 data. UNVERIFIED end date.
- **QR3 = Survey 3 + Survey 4 data, weekly from September 2026**; "QR3 versions of the data observed from May 16, 2026 to July 19, 2026 are released together with DR1" (initially processed with 6.5.6). QR3 and DR1 together = a uniform R7 set. VERIFIED (same).
- Lag: L2 images produced within a few days, **available at IRSA within 60 days of observation** (max). VERIFIED (EXPSUPP 2.1, 2.2; AKESON 5.2). Archive guide: SIA availability lags ingestion by about 1 day (context file). So the freshest observation visible today is probably 3-8 weeks old. UNVERIFIED actual.
- Release timeline figure (text alt): QR1 Jul 2025, QR2 Oct 2025, QR3 Sep 2026, DR1+QR3 Nov 2026, **High Reliability Source Catalog V1 Aug 2027**, **DR2 with HRSC V2 Dec 2027**. VERIFIED (spherex-data-releases page, figure alt text). AKESON Table 2 (older) says HRSC July 2027, cubes Year 1 Nov 2026, Year 2 Nov 2027. The Archive Guide figure supersedes.

### 3.2 Numbers and sizes
- File = one detector image, ~67 MB (MEF, 6 HDUs). VERIFIED.
- DR1 all-sky cubes built from "over 1.2 million individual images" excluding ~2000 flagged images. VERIFIED (EXPSUPP 2.5).
- Planned volumes (AKESON Table 2): spectral images 190 TB total mission, all-sky cubes 95 TB, HRSC 120 TB. VERIFIED (older; pre-DR1).
- Rough size of DR1 + QR3 spectral images today (DERIVED, UNVERIFIED): ~1.2 M images x 67 MB = ~80 TB for DR1 alone.
- Cutouts: server-side, append `?center=<ra>,<dec>&size=<value>` to an on-prem IBE URL (context file shows `d` suffix unit and size in degrees). The official Cutout Tool doc gives **no parameter table**: only `center` ("156.09328159,-41.64466331") and `size` ("0.1"), a curl example, and says cutouts preserve MEF structure and metadata; the doc mentions Data Explorer scissors icon for a cutout size and "Generate Download Script". Max size/units/limits are NOT documented there. VERIFIED (https://irsa.ipac.caltech.edu/data/SPHEREx/docs/cutout_tool.html). Size units degrees (0.1 = ~60 px, from context file tutorials; 6.15" x 60 = 369" = 0.10 deg, consistent). Other IRSA IBE cutout parameters (`mode`, `gzip`) exist generally, UNVERIFIED for SPHEREx.
- Cloud: `s3://nasa-irsa-spherex/{dr1,qr3,qr2}/...` anonymous (context file).

### 3.3 Level 3 / Level 4 products and schedule
- Level 2 = calibrated spectral images (public). Level 3 = forced photometry (Tractor) of Reference Catalog sources producing the "primary all-sky catalog" (parquet; flux, error, wavelength, MJD per measurement) and a secondary all-sky catalog (spectrum averaged over surveys, fixed wavelength grid, **variability flag**); needs at least two surveys of data. VERIFIED (AKESON modules list; EXPSUPP 3.3).
- **Public Level 3/4 products are NOT in DR1.** DR1 products are spectral images + all-sky cubes. The **High Reliability Source Catalog (HRSC)** (SNR>10 in >=5 of 102 channels, survey-to-survey consistency) planned Aug 2027 (V1) and Dec 2027 (V2); legacy catalogs (solar system objects, exoplanet host and low-mass stars, galaxy clusters) "3 years after launch" (~March 2028). VERIFIED (AKESON 5.1; BOCK abstract; spherex-data-releases figure).
- Today's only public catalog-ish products: SPLICES target list (ice sources), the Spectrophotometry Tool output on demand, and 3I/ATLAS observation table. VERIFIED (context file).
- QR vs DR processing: DR1/QR3 use pipeline R7 (major update): new persistence masks, bad pixel flagging, fine astrometry (retry module), outlier detection (STREAK), zodi prediction, photometry, ePSF instead of optical-PSF deconvolution, updated absolute gain and spectral calibrations. QR2 = pipeline 6.4-6.5.6. "Science users should NOT combine files from [QR1 and QR2]"; "caution when combining QR2 and QR3". VERIFIED (EXPSUPP 2.1 p11).
- New R7 flags (bits 26-29 and others): BLOOM, SNOWBALL, HALO, SATELLITE_HALO, STREAK, CROSSTALK. VERIFIED (EXPSUPP Table 16).

### 3.4 Known issues and caveats (EXPSUPP section 2.3, 2.4, 2.5.2; DR1/QR pages)
1. **Zodi not subtracted** from IMAGE; background is high and varies image to image. VERIFIED.
2. QR2 PSF-extension header error (planes stored in increasing x but header says y); up to +-5 % photometry error in corners; QR2 files with 6.4-6.5.5 carry suffix `+psffix1`; not applicable to QR3/DR1. VERIFIED (EXPSUPP p13-14).
3. Frame-edge ghost (triangular), linear bright-source ghost, beam-splitter ghost (~10 arcmin disk, strongest near band 3/4 boundary), **8 deg ghost** (bright star ~8 deg from center in bands 2-6), Moon stray light at detector edges (bands 1, 4, 5, 6). VERIFIED (p14-15).
4. Cosmic-ray related: extended CR signatures, snowballs (core flagged OVERFLOW+TRANSIENT, halo unflagged in QR2), CR-induced glow (bands 1-2), transients flagged on board above ~100 photoelectrons; transients in first 10 s may not be flagged. Mean transient flag fraction 1.1 % in first 3 months. VERIFIED (p15-16, Table 16; BOCK 5.7).
5. Crosstalk: three types (negative image displaced ~32 rows; repeats at multiples of 64 px; smear); types 1 and 2 flagged in R7. VERIFIED (p16-17).
6. **Atmospheric He 1.083 um** and aurora/other airglow lines (0.78, 0.84, 0.93, 1.13, 1.81, 2.63, 2.75, 4.03, 4.64 um) vary over the orbit; produce stripes; the He line causes weak spectral leaks at 0.84 um (B1) and 1.49 and 1.25 um (B2). VERIFIED (p17).
7. Shuttle glow (2.9 um in band 4; 4.5 um in bands 5 and 6; ram-angle limited, template available). VERIFIED (p18-19).
8. **Diffuse optical transients in ~1 % of exposures** (foreground particles/objects). Earth-satellite streaks "in many images"; Borlaff et al. 2026 find 73.3 % of images show satellite trails, mean 2.18 trails per exposure (arXiv:2605.27501); brightest are flagged on-board; fainter ones get STREAK in the outlier module; **streaks near noise are not flagged**. VERIFIED (EXPSUPP p20; arXiv abstract).
9. Dichroic edge: rows in band 3 long side and band 4 short side have DICHROIC flag (throughput < 50 %), gain-corrected but noisy; all-sky cube channels 51 and 52 (band 3 ch 17, band 4 ch 1) are blank (NaN, NHITS=0, FLAGS=0, listed in `BLANKCH`). VERIFIED (EXPSUPP 2.4, 2.5.2). Note context file said 'frames 50 and 51 0-based'; EXPSUPP says 51 and 52 (1-based).
10. Source mask sizes depend on the Reference Catalog magnitude and may be too big or too small. Sources fainter than 19 AB not masked by default. VERIFIED (EXPSUPP 2.4, 3.2.9).
11. All-sky cube striping: airglow lines and extended-source features create scan-correlated stripes (LVF maps wavelength to position, roll angle rotates stripes); "sawtooth or moire-like artifacts that do not average down". Zodi layer is subtracted for the cubes; cube pixel flags rejected list given. DR1 cubes use HEALPix order 5 NESTED, 12,288 tiles, ~1.8 x 1.8 deg, 512x512 px of 12.9 arcsec; HiPS PNG tree has fixed 0-40 MJy/sr asinh stretch for visualization. VERIFIED (EXPSUPP 2.5, p21-22).
12. Archive inclusion rules for a spectral image: N_TRANSIENT < 435,000 AND not in SAA AND FINAST = 0 AND L2DQA = PASS (at least 6 of the 11 checks pass). Because DQA is per band, "some observations will not include all 6 bands in the archive". VERIFIED (EXPSUPP 3.2.12 p42).
13. Anomalous images list: https://spherex.caltech.edu/page/anomalyimages (not opened). VERIFIED reference only.
14. WCS-WAVE table fidelity is "suitable for visualization", for science use the Spectral WCS calibration files (CWAVE/CBAND) from IRSA. VERIFIED (EXPSUPP 2.2; spectral calibrations page).
15. Spectral calibration page: lab-derived transmission curves at 17/34/51/68 sub-channels per detector, files in detector coordinates (x flipped for D4-D6 vs on-sky). VERIFIED (https://irsa.ipac.caltech.edu/data/SPHEREx/docs/spherex_spectral_calibrations.html).

### 3.5 FLAGS (Table 16) quick reference
Bits per context file section 6.2, plus: bit 29 SATELLITE_HALO ("not recommended for use in science analysis"); bit 7 DICHROIC; bit 23 GHOST_FPA currently unused ("subsumed into GHOST_EXT, removed in Year 2"); bit 28 HALO "caution recommended". Suggested masking for photometry (EXPSUPP 3.3 p44-45): SUR_ERROR, NONFUNC, MISSING_DATA, HOT, COLD, NONLINEAR, PERSIST, BLOOM, SNOWBALL, HALO, SATELLITE_HALO. For background estimation additionally: OVERFLOW, OUTLIER, SOURCE, TRANSIENT. Level-3 `CONTAINS_BAD_PIXEL` is bit 32 of the photometry `flags`, within 2.5 px of the source. VERIFIED.

### 3.6 Time keywords in L2 headers (for building a time axis)
`DATE-OBS`, `DATE-BEG`, `DATE-AVG`, `DATE-END` (ISO-8601 UTC), `MJD-OBS`, `MJD-BEG`, **`MJD-AVG`** (mid-exposure), `MJD-END`, `TIMESYS = 'UTC'`, `MJDREF = 0`, **`XPOSURE` = 113.5826 s** (science exposure, "time between start and end of collecting data that contributes to the photocurrent"), **`TELAPSE` = 118.1873 s** (starts before MJD-BEG, includes discarded frames; ends at MJD-END). Example: DATE-BEG 2025-04-27T18:35:50.023, MJD-AVG 60792.775550715 (that example is from commissioning, before science start). Spacecraft state vectors: `X_SC_START..Z_SC_END`, `VX_SC...` (km, km/s, GEOCENTER frame), mid-exposure `X_SC, Y_SC, Z_SC` (useful for parallax). Also `SPS_*`, `SGT_LAT_MIDPT`, `SGT_LON_MIDPT`, `SGT_MIN_GCD2SAA`, `NON_SURVEY`, `OBS_IN_SBAND`. VERIFIED (EXPSUPP Table A.35 p76-77). In the SIA/TAP tables, `t_min`/`t_max` (SIA) and `time_bounds_lower/upper` (TAP, MJD) are the same observation interval (context file).

---

## 4. Official tools

- **SPHEREx Data Explorer** (https://irsa.ipac.caltech.edu/applications/spherex): Spectral Image Search tab, Results tab with interactive display; scissors icon sets cutout size; "Generate Download Script" with cutout option; no SIA ingestion delay (context file). Page text I could extract had no mention of time series or moving objects. UNVERIFIED for those features (the Jina render returned only a short shell).
- **Spectrophotometry Tool** (https://irsa.ipac.caltech.edu/applications/spherex/tool-spectrophotometry): Single Object / Multi-object tabs; input a name or coordinates (examples "Dobashi 2438", "NGC 3256", "156.96263 -43.90506", "277.372470 11.726053 gal", sexagesimal with `Equ J2000`, "181.482580 -48.451583 ecl"); options "Include deep-field images" and "Intrinsic morphology model for forced photometry" (Point Source | Sersic Galaxy Profile); jobs run for "several minutes", hours with deep fields, tracked in a Job Monitor tab. It uses the Tractor forced photometry in EXPSUPP 3.3; positions are fixed (source position is not floated; moving objects not handled). Outputs: flux, uncertainty, wavelength, pixel coordinates, fit quality and `flags` bitmask. A programmatic API was NOT documented on the page (UNVERIFIED; Firefly-based async jobs). VERIFIED (page text + EXPSUPP 3.3).
- **Source Discovery Tool**: Python tool, see context file section 9. VERIFIED.
- **Mosaic Tool**: no API. VERIFIED (context file).
- **MOST** programmatic interface (https://irsa.ipac.caltech.edu/applications/MOST/MOSTProgramInterface.html): `https://irsa.ipac.caltech.edu/cgi-bin/MOST/nph-most?catalog=spherex&input_type=name_input&obj_name=<name or number>&obs_begin=YYYY+MM+DD&obs_end=YYYY+MM+DD&output_mode=Brief` (examples on the page use `output_mode=Brief`, the parameter table lists `outfmt`; both appear in the docs; try `output_mode`). `catalog` values: `spherex` (and `wise_merge`, `ztf`, ...). Other `input_type` values: `mpc_input` (with `mpc_data`), `manual_input` (with `obj_type=Asteroid|Comet`, `body_designation`, `epoch`, `semimajor_axis`, `eccentricity`, `inclination`, etc.), optional `ephem_step` (days, default 0.25), `obs_begin`/`obs_end` format `yyyy+mm+dd+hh:mm:ss`. SPHEREx output columns include `observationid, productid, target_name, target_moving, instrument (SPHEREx detector), ra, dec, start_date, end_date, mjd_start, mjd_end, exposure_time, uri`. VERIFIED (MOST instructions and program interface pages). MOST is orbit-to-images only, one object per query.
- **3I/ATLAS page** (https://irsa.ipac.caltech.edu/data/SPHEREx/docs/comet3iatlas/index.html): provides a VOTable of all SPHEREx spectral images that include 3I/ATLAS with predicted position per exposure (`comet_ra`, `comet_dec`) and URL; wget and curl download scripts; warns that SPHEREx S/N is low at many wavelengths; the comet is **spatially extended** so **do not use the Spectrophotometry Tool** (point-source). Observed **August and December 2025**. VERIFIED. This table is the best existing precedent for a "moving target" product: per-exposure predicted RA/Dec.

---

## 5. Moving and variable objects in SPHEREx

- **Pipeline handling of solar system objects**: Level 2 modules include "Compute Known Solar System Object Positions": from S-band telemetry and WCS pointing, using the orbit propagation tool **kete** (Dahlen 2025), lists SSO catalog objects in each frame, their astrometric coordinates during the integration and UTC, with optional predicted fluxes as priors for forced photometry; stored as an ancillary parquet file. VERIFIED (AKESON module list).
- There is **no public moving-object detection** or SSO product in DR1. The Solar System Object Catalog (SSOC) of known asteroids and comets is a science-team legacy catalog "3 years after launch". SOLO (a ground-based light-curve monitor in California) supports it. VERIFIED (BOCK abstract; arXiv:2602.08037).
- Predictions: Ivezic et al. 2022: "meaningful flux measurements for about **100,000 asteroids**, of which ~**10,000** will have high-quality spectra" (cited by BOCK 2.4); EXPSUPP lists ">=100,000 asteroid and comet spectra" among expected archival products. Rotation and changing geometry matter because "spectral observations are distributed over time". VERIFIED via BOCK. The arXiv ID of Ivezic et al. 2022 ("Simulated SPHEREx spectra of asteroids and their implications for asteroid size and reflectance estimation", Ivezic, Ivezic, Moeyens, Lisse, Bus, Jones, Crill, Dore, Emery) was not found by my arXiv title search: UNVERIFIED (I believe it is in Planetary Science Journal 2022, ID not confirmed). Lisse, Bauer, Kim 2024, "Planetary Defense Use of the SPHEREx Solar System Object Catalog": arXiv:2402.08705 (hundreds of thousands of SSOs at WISE/NEOWISE sensitivities). VERIFIED.
- Asteroid motion scale (DERIVED, UNVERIFIED): main-belt asteroids move ~0.25 deg/day at opposition, i.e. ~2.4 SPHEREx pixels per hour, so across consecutive exposures within one slew set (minutes) the motion is ~ sub-pixel to a pixel; between visits days apart it is of order a degree. Near-Earth objects and comets near Earth move faster. SPHEREx sees objects near quadrature (elongation ~90 deg), where asteroids' apparent motion is slower than at opposition. The 6-arcsec pixel and 118 s exposure mean trailing is small for most objects; satellite streaks are common.
- **3I/ATLAS**: Lisse et al. SPHEREx papers: arXiv:2508.15469 "SPHEREx Discovery of Strong Water Ice Absorption and an Extended Carbon Dioxide Coma in 3I/ATLAS" (RNAAS 9(9) 242, 2026); arXiv:2512.07318 "SPHEREx Pre-Perihelion Mapping of H2O, CO2, and CO" (submitted to ApJL); arXiv:2601.06759 "SPHEREx Re-Observation ... in December 2025: Detection of Increased Post-Perihelion Activity, Refractory Coma Dust, and New Coma Gas Species". VERIFIED (arXiv listing + IRSA page). Observations in **August and December 2025** only.
- **Brown dwarfs / variability science**: arXiv:2607.00543 (Rustamkulov et al., Jul 2026): "thousands of nearby brown dwarfs" measured at R~40-100; spectra for 37 field brown dwarfs L0 to Y4. arXiv:2604.22012 "A SPHEREx Pipeline and Spectral Library for Ultracool Dwarfs"; arXiv:2604.26771 SUDA atlas; NASA article "NASA's SPHEREx Telescope Sees Menagerie of Brown Dwarfs" (Oct 2026, https://www.nasa.gov/missions/spherex/nasas-spherex-telescope-sees-menagerie-of-brown-dwarfs/). VERIFIED (titles/abstract). Variable stars: arXiv:2609.30551 "Breaking the AGB Color Degeneracy with Variability and H2O" (uses SPHEREx). Variability pipeline module: secondary all-sky catalog + variability flag, needs >= 2 surveys; for bright (S/N>100) sources it compares native channels, for faint ones about 10 collapsed bands. VERIFIED (AKESON).
- Motion of nearby stars: the SPHEREx position in every L2 image is Gaia-anchored (proper-motion corrected), so a high-proper-motion star appears at its true epoch position; WISE 0855 moves ~8 arcsec/yr (UNVERIFIED value from memory; Luhman 2014 gave 8.1 arcsec/yr), so over the ~12 months of DR1 it moves ~1.3 pixels; the 6 arcsec pixel and 7-9 arcsec PSF mean per-frame motion is only discernible across months, comparing survey 1 vs 2 vs 3. Barnard's Star moves 10.3 arcsec/yr (UNVERIFIED from memory).

---

## 6. Key papers (arXiv IDs verified through export.arxiv.org today)

| Reference | arXiv | One line |
|---|---|---|
| Bock et al. 2026, The SPHEREx Satellite Mission | 2511.02985 | Mission, instrument, survey design, in-flight sensitivity (5 sigma 19.5-19.9 / 17.8-18.8 AB after 4 passes), data pipeline overview |
| Akeson et al. 2026, The SPHEREx Image and Spectrophotometry Processing Pipeline | 2511.15823 | L1-L3 pipeline modules, data products, release cadence, kete SSO module, variability module |
| Korngut et al. 2026, The SPHEREx Instrument: calibration, testing and performance | 2603.29835 | LVF, detectors, SUR, thermal, PSF Neff, exposure time 118 s, >1.1e6 exposures collected |
| Bryan et al. 2025/26, Optimized Observation Sequencing in LEO with the SPHEREx Survey Planning Software | 2508.20332 | Target groups of 17 pointings, deep field tiling, cadence |
| Crill et al. 2025, The SPHEREx Sky Simulator | 2505.24856 | Sky model, zodi, pre-launch 5 sigma 18.5-19 / 16.6-18 AB |
| Crill et al. 2020, SPHEREx: NASA's near-infrared spectrophotometric all-sky survey | 2404.11017 (the 2024 arXiv posting of the SPIE 2020 paper; UNVERIFIED that this is the same paper) | Detector and survey overview |
| Lisse et al. 2024, Planetary Defense Use of the SPHEREx SSOC | 2402.08705 | hundreds of thousands of SSOs |
| Lisse et al. 2025/26 (3I/ATLAS) | 2508.15469, 2512.07318, 2601.06759 | H2O ice, CO2 coma, post-perihelion |
| Rustamkulov et al. 2026, Brown dwarf spectra | 2607.00543 | 37 L0-Y4 brown dwarf spectra |
| SUDA / UCD pipeline | 2604.26771, 2604.22012 | Ultracool dwarf atlas and pipeline |
| Borlaff et al. 2026, satellite trails | 2605.27501 | 73.3 % of images have trails |
| SPHEREx persistence flagging | 2608.21639 | Persistence masks used in R7 |
| Bestiary of electrical artifacts | 2608.09862 | Crosstalk, etc. (Fazar et al.) |
| Spectral map making with SPHEREx | 2603.25790 | Custom mosaicking |
| TractorJAX GPU forced photometry | 2610.16007 | Fast forced photometry |
| SAA boundary from transient flagging | 2607.02809 | Transient rates |
| Forward modeling LVF data, PAH and Pa-alpha maps | 2611.12846 | Handles the LVF stripe problem |
| Ivezic et al. 2022, simulated SPHEREx asteroid spectra | ID not found | 100,000 asteroids, 10,000 high quality spectra |

First-results papers in 2026 are numerous (list above covers ~60 SPHEREx titles Mar-Nov 2026 from arXiv listing). Ashby et al. 2026 (absolute calibration) is "in prep" per EXPSUPP. VERIFIED listing.

---

## 7. Mission news and status through Nov 2026

- Operating nominally: KORNGUT "instrument... currently operating in full science survey mode, meets all driving requirements"; >1.1 x 10^6 exposures collected without interruption; thermal stability << requirements (SWIR FPA peak-to-peak < 2.5 mK). VERIFIED.
- First all-sky map (102 colors) completed Dec 2025; **DR1 + all-sky cube released November 2026** (IRSA pages); Explanatory Supplement v2.1 2026-11-10; Archive Guide 2026-11-12. VERIFIED.
- Mission extension/anomaly: no extension or anomaly announcement found in sources I opened. EXPSUPP states the nominal mission is 25 months of science (so ends ~June 2027) and says the spacecraft re-enters within 25 years after the end of operations. Anomaly list: only image-level (anomaly images page). Extension: UNVERIFIED (not found). Orbit decay from drag mentioned but no figure. VERIFIED/UNVERIFIED as stated.
- Press: NASA stories on the Oct 2026 brown dwarf menagerie and the April 2026 Cygnus X water ice map (https://science.nasa.gov/mission/spherex/). VERIFIED (listing).

---

## 8. Things I could not verify

- Per-band 5 sigma single-exposure AB depths (plot only), per-band PSF FWHM table, exposures per day (derived only).
- Numeric dependence of pass duration on ecliptic latitude (documents give only "approximately two weeks" typical and "poles every orbit").
- Exact end date of DR1 and current end date of QR3 (60-day lag implies about mid-September).
- Cutout service limits (max size, units variants) beyond `center` and `size`; Data Explorer time-series or moving-object features; any Spectrophotometry Tool REST API.
- Ivezic et al. 2022 arXiv ID; whether Crill et al. 2020 is exactly 2404.11017.
- Mission extension decision.

---

## 9. Implications for the viewer (opinion)

1. **Do not make time the only frame axis.** For one RA/Dec the archive returns hundreds of images (examples: 84 for D2 alone at M101; 443-454 for a full-detector query), spanning bursts of ~1-2 weeks every ~6 months, and every frame is at a *different wavelength* because of the LVF. A naive "one frame per exposure" video will flicker with the SED, not with real variability. Good frame grouping: (a) pick a narrow wavelength window or a single band and use only exposures whose pixel-center wavelength falls in it (use the WCS "W" mapping at the target pixel, the cutout keeps CRPIX1A/2A); within a fixed channel the revisit cadence is one epoch per ~6 months per survey, giving only ~3-4 frames over the whole mission, which is the honest "video" for moving objects. (b) Alternatively a "per-survey burst" frame: all exposures in one 1-2 week burst coadded per detector band (D1..D6), giving 6 frames per burst, each a different wavelength range and a mean time; the challenge itself suggests per-detector coadds. (c) Optionally a within-burst spectral sweep for spectra, separate from the time video.
2. Show wavelength and `MJD-AVG` on every frame; sort a time video by MJD-AVG within a chosen detector; expose a "wavelength tolerance" slider; offer the 102-channel all-sky HiPS cube (a combined mosaic, not a time series) only as a static background.
3. For moving objects (asteroids, comets) the strongest real signal is the burst structure: in a 1-2 week burst, the same field is revisited with offsets and an object moving 0.25 deg/day moves ~1 deg across the burst; this is the same cadence class as WISE. Fast movers need wider cutouts; the 11.3 x 3.5 deg FoV and 6.15" pixels set a trade-off; MOST gives per-exposure predicted positions for known objects (and the 3I/ATLAS VOTable is a model for a "follow target" mode).
4. Use `FLAGS` to mask by default (at least: TRANSIENT/OVERFLOW/SUR_ERROR/NONFUNC/HOT/COLD/NONLINEAR/PERSIST/BLOOM/SNOWBALL/HALO/SATELLITE_HALO/STREAK/OUTLIER and DICHROIC) and show them as an optional overlay (challenge consideration 7). Remember the ZODI layer is not subtracted: for display subtract the ZODI layer or a local median (note the zodi gradient across the frame and the He 1.083 um stripe in band 1).
5. Per-frame depth is only ~0.75 mag shallower than the 4-pass headline numbers (DERIVED), so ~19 AB is plausible single-frame; Barnard's Star will saturate; WISE 0855 (J-band mag >25, but W2 ~ 14 Vega, 4.5 um) is likely near the detection limit only in bands 5-6 (UNVERIFIED claim from memory; 17.8-18.8 AB limit at 4-5 um after 4 passes would not reach it in one frame): set expectations, and test targets accordingly.
6. Release lag is up to 60 days and QR3 is updated weekly; to keep the viewer current, query TAP (immediate) rather than SIA (about 1 day lag) at request time, and do not hard-code release names (`spherex_dr1`, `spherex_qr3`, `_deep` variants; future `dr2`).
7. Mixing QR2 and DR1/QR3 is discouraged; QR2 is removed from searches. Expose a "release" label per frame.
