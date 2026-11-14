# 05: IRSA cutout, S3 and HiPS pixel access: CORS, latency, sizes (hands-on probe)

Probed 2026-11-14 from a Mac (Europe), around 12:30-13:00 UTC, plain curl and astropy. Test target: Barnard's Star (RA 269.4485, Dec 4.7398), band SPHEREx-D2. Test file (first row of the TAP result, `data/tap.csv`):

    ibe/data/spherex/dr1/level2/2025W34_2B/l2b-v27-2026-229/2/level2_2025W34_2B_0090_4D2_spx_l2b-v27-2026-229.fits

Variables used below: `F=https://irsa.ipac.caltech.edu/<that uri>`, `C="$F?center=269.4485,4.7398d&size=0.1"`, `S3=https://nasa-irsa-spherex.s3.us-east-1.amazonaws.com/dr1/level2/2025W34_2B/l2b-v27-2026-229/2/level2_2025W34_2B_0090_4D2_spx_l2b-v27-2026-229.fits` (S3 key = IBE path minus `ibe/data/spherex/`).

All results are VERIFIED (command output seen) unless marked UNVERIFIED. A network outage hit mid-run; results contaminated by it are flagged.

## 1. CORS verdicts

Commands: `curl -sI -H 'Origin: https://example.org' <url>` and `curl -s -o /dev/null -D - -X OPTIONS -H 'Origin: https://example.org' -H 'Access-Control-Request-Method: GET' -H 'Access-Control-Request-Headers: range' <url>`. For the cutout, HEAD returns 405, so a real GET with `-D -` was used.

| Endpoint | Access-Control-Allow-Origin seen | Browser fetch() cross-origin? |
|---|---|---|
| (a) TAP sync `https://irsa.ipac.caltech.edu/TAP/sync?QUERY=...&FORMAT=CSV` | none (GET and OPTIONS both 200, no ACAO header) | NO |
| (b) IBE full file `$F` | none. HEAD 200, `accept-ranges: bytes`, `content-length: 61626240`. OPTIONS returns 405 | NO |
| (c) IBE cutout `$C` | none. GET 200 headers: server nginx, `content-type: application/fits`, `content-disposition: attachment; filename=...`. HEAD and OPTIONS both 405 | NO |
| (d) Same object on S3 `$S3` | `Access-Control-Allow-Origin: *`, `Access-Control-Allow-Methods: HEAD, GET`, preflight adds `Access-Control-Allow-Headers: range`, `Access-Control-Expose-Headers: ETag, x-amz-meta-custom-header`, `Access-Control-Max-Age: 3000`. A ranged GET (206) also carries ACAO `*` | YES (GET and Range, no other request headers) |
| (e) S3 bucket listing `https://nasa-irsa-spherex.s3.us-east-1.amazonaws.com/?list-type=2&prefix=qr3/&delimiter=/` | same S3 CORS block, ACAO `*` | YES |
| (f) HiPS `properties` | `access-control-allow-origin: *`; OPTIONS 204 with `access-control-allow-methods: GET, HEAD, OPTIONS`, `access-control-allow-headers: Range` | YES |
| (f) HiPS PNG tile `.../spherex_allsky_cube/Norder3/Dir0/Npix0.png` | `access-control-allow-origin: *` (GET with Origin) | YES |
| (f2) HiPS FITS cube tile on IBE `.../ibe/data/spherex/dr1/hips5_cube/hips_20261026/Norder5/Dir0/Npix7945_cube.fits` | none (200, `content-length: 320909760`, `accept-ranges: bytes`) | NO |
| (f3) Same cube tile on S3 `.../dr1/hips5_cube/hips_20261026/Norder5/Dir0/Npix7945_cube.fits` | `Access-Control-Allow-Origin: *`, same `Content-Length: 320909760` | YES |
| (g) SIA `https://irsa.ipac.caltech.edu/SIA?COLLECTION=spherex_qr2&POS=circle+269.4485+4.7398+0.01&MAXREC=1` | none (200, `application/x-votable+xml`) | NO |

Summary: every `irsa.ipac.caltech.edu` dynamic or IBE endpoint (TAP, SIA, IBE files and cutouts) has no CORS headers. Only the static HiPS tree under `/data/hips/` and the S3 bucket send `ACAO: *`. Cookie note: TAP and SIA responses set an `anonymous=...` cookie.

Other facts: IBE honors Range on the full file (`curl -r 0-2879` returned 206, `content-range: bytes 0-2879/61626240`) but, with no CORS, a browser cannot use it.

## 2. IBE cutouts

Syntax (from https://irsa.ipac.caltech.edu/ibe/cutouts.html, VERIFIED by fetch):
`<fits-url>?center=x,y[units]&size=x[,y][units][&gzip=flag]`.
- `center`: `ra,dec` with optional units deg (default), rad, etc., or `x,y` with `px|pix|pixels` (pixel coords in the parent image). RA is range-reduced.
- `size`: one value (square) or `w,h` (w along NAXIS1, h along NAXIS2); units px/pix/pixels, arcsec, arcmin, deg, rad; default degrees. Forgiving unit parsing. Bad input is HTTP 400.
- `gzip`: default is gzipped for other datasets, but the page states "Unlike cutouts from other data sets, SPHEREx cutouts will not be gzipped". Measured: `gzip=1` on SPHEREx returned a 503 (inconclusive), and `format=png` is silently ignored (200, 2,001,308 bytes of `application/fits`).
- Cutout axes stay aligned with the parent detector grid (not north-up). Requests partly outside the image are clipped. A cutout with no overlap errors. A position with no overlap with this file (`center=10,-80d`) returned 422 `Input position contains invalid values (NaNs or infs).`
- Result is a full MEF: PRIMARY, IMAGE, FLAGS, VARIANCE, ZODI, EPSF, WCS-WAVE.

Command per row: `curl -s -o out.fits -w "ttfb=%{time_starttransfer} total=%{time_total} bytes=%{size_download} code=%{http_code}\n" "$F?center=269.4485,4.7398d&size=<S>"`. Two runs each, run order as executed. Pixel size of the cutouts: 59 px per 0.1 deg, so about 6.1 arcsec per pixel.

| size (deg) | pixel shape (rows x cols) | run 1 | run 2 |
|---|---|---|---|
| 0.05 | 29 x 29 | 503 after 1.15 s | 200, ttfb 0.68 s, total 21.1 s, 3,965,760 B |
| 0.1 | 59 x 59 | 503 after 1.16 s | 200, ttfb 1.24 s, total 20.9 s, 4,000,320 B |
| 0.2 | 109 x 117 | 503 after 0.92 s | 200, ttfb 1.05 s, total 7.3 s, 4,150,080 B |
| 0.5 | 197 x 294 | 200, ttfb 0.89 s, total 5.8 s, 4,875,840 B | 503 after 0.93 s; a later separate run gave 200, ttfb 1.37 s, total 22.6 s, 4,875,840 B |
| 1.0 | 344 x 587 | 200, ttfb 0.74 s, total 18.1 s, 7,179,840 B | 200, ttfb 0.82 s, total 17.6 s, 7,179,840 B |

Other forms (VERIFIED, 200): `center=1000,1000px&size=60px` gives 60x60, 4,000,320 B. `size=120,40px` gives shape (40,120), i.e. 120 wide by 40 high, 4,023,360 B. `size=6arcmin` equals 0.1 deg, 4,000,320 B.

Key finding: the payload is almost constant (about 4.0 MB) because the EPSF table HDU is 3,867,840 bytes (441 rows x 8752 B) in every cutout. HDU bytes in the 59x59 cutout: PRIMARY 2,880, IMAGE 40,320, FLAGS 31,680, VARIANCE 25,920, ZODI 25,920, EPSF 3,867,840, WCS-WAVE 5,760. The pixels the viewer needs are about 40 KB. There is no parameter found to drop extensions (UNVERIFIED that none exists; none documented on the cutouts page).

Failure mode: the server returns `503` with 25-byte body `Server busy, retry later.` and header `retry-after: 5` (VERIFIED, `curl -D -`). Even single serial requests hit it (roughly 3 of 10 in the sizing loop). Time to first byte is about 0.7-1.5 s, but the body streams slowly (5-23 s for 4 MB), so the total time is dominated by transfer, not the query.

### 24 cutouts, 8 parallel, size 0.1 (script `scripts/par.sh`, `xargs -P8`, 24 different exposures of the Barnard's Star position from the TAP list)

First pass, one attempt each, wall clock 40.4 s:

| outcome | count | detail |
|---|---|---|
| 200 OK | 16 | total time sorted: 10.4, 10.7, 10.7, 11.0, 11.9, 12.2, 13.2, 15.0, 16.4, 16.9, 19.5, 20.0, 20.4, 20.9, 21.0, 21.0 s (median about 15.7 s, p95 about 21 s). ttfb 0.77-1.9 s |
| 503 Server busy | 8 | returned after 0.7-1.7 s |
| other errors | 0 | no timeouts, no resets |

Retry 1 (8 failed ones, 4 parallel, 5 s pause): 3 OK (11.5, 15.1, 21.4 s), 5 more 503. Retry 2 (5 remaining, serial, 5 s pause): 4 OK (10.6, 12.3, 12.4, 23.1 s), 1 more 503. Final: 23 of 24 within two retries; 1 still failing. First-attempt failure rate 33 percent at 8 parallel. A 5-request serial check afterwards gave 200 (11.4 s), 503, 200 (21.9 s), then two results ruined by the network outage (a 45 s partial transfer and a 90 s timeout), so those are excluded.

## 3. FITS content (cutout `data/c_0.1.fits`, full file via S3)

Commands: `uv run --with astropy --with numpy python -I scripts/hdr.py data/c_0.1.fits`, `scripts/fits2.py`.

HDUs (cutout): PRIMARY (empty, VERSION 7.0.5), IMAGE 59x59 float32, FLAGS 59x59 int32, VARIANCE 59x59 float32, ZODI 59x59 float32, EPSF BinTable 441R x 11C, WCS-WAVE BinTable 1R x 3C. Full file: the same HDU list (opened via fsspec). Full file size 61,626,240 bytes.

Compression: NONE. No `ZIMAGE` keyword in any HDU, IMAGE is plain BITPIX -32 (full file IMAGE is 2040x2040 float32, about 16.6 MB). Byte-range slicing of pixels is possible (see section 4).

Time keywords (IMAGE HDU, VERIFIED values for the test exposure):

| key | value |
|---|---|
| DATE-OBS / DATE-BEG | 2025-08-21T23:33:58.633 |
| MJD-OBS / MJD-BEG | 60908.981928623 |
| DATE-AVG / MJD-AVG | 2025-08-21T23:34:56.192 / 60908.982594812 |
| DATE-END / MJD-END | 2025-08-21T23:35:53.751 / 60908.983261001 |
| XPOSURE | 113.5826 s |
| TELAPSE | 118.1873 s |
| TIMESYS / MJDREF | UTC / 0.0 |
| DATE (file creation) | 2026-08-17T19:38:51.952 |
| TSAMP | 1.5349 |

Note: the TAP `time_bounds_lower` for this plane (60908.981929) equals MJD-BEG. Time keywords live in the IMAGE extension header, not in PRIMARY (PRIMARY has only SIMPLE, BITPIX, NAXIS, EXTEND, VERSION).

IDs: `DETECTOR = 2`, `OBSID = '2025W34_2B_0090_4'`, `EXPIDN = 202534202009042`, `SPS_TARGET = 'SPS_086985_S12'`, `SPS_FLAGS = 'all_sky'`, `L1DQAFLG = 'Pass'`, `L2DQAFLG = 'Pass'`. Units: IMAGE `BUNIT = 'MJy / sr'`, VARIANCE `MJy2 / sr2`, ZODI `MJy / sr`, FLAGS is a bit mask (EXTTYPE MASK). Useful quality keys: `PSF_FWHM = 7.46`, `ASTRONETSOLVED = True`, `SATSTRKS = 1`.

WCS (IMAGE): `CTYPE1/2 = RA---TAN-SIP / DEC--TAN-SIP`, CRVAL 269.236070549, 6.40102765807, CRPIX -113.5, -939.5 (cutout offset applied), PC matrix about 0.0017 deg per pixel, SIP orders A/B/AP/BP = 3. Alternate WCS A (linear detector pixels, `WCSNAMEA = '0-based active pixel coordinates'`, CRPIX1A = -1133, CRPIX2A = -1959) gives parent pixel = 1 + cutout px - CRPIX1A. Alternate WCS W (`WAVE-TAB`, `PS1_0W = 'WCS-WAVE'`, VALUES/X/Y), table in cutouts has X and Y of 11 points each (1..2040), VALUES shape (11,11,2) (differs from the 9 points the tutorial describes; this file may be a newer product version, v27).

Barnard's Star position in this cutout: pixel (28.6, 28.7) 0-based, in bounds; parent pixel (1163.6, 1989.7). Wavelength and bandwidth at that position from astropy WCS key W: 1.0928 um and 0.0249 um (band 1 channel). IMAGE stats: median 0.572 MJy/sr, 3478 of 3481 pixels finite.

### 3b. Orchestrator check: byte map of the FULL files (VERIFIED 2026-11-14, corrects "Compression: NONE" above for full files)

Walked two full Level 2 files on S3 with stdlib HTTP Range requests (script: scratchpad `orch/hdumap.py`, 26 to 27 requests, about 14 s each). The cutouts are uncompressed, but in the full files the FLAGS HDU is a Rice tile-compressed BINTABLE, and header lengths and offsets differ between files.

| HDU | D2 file `level2_2025W34_2B_0090_4D2` | D6 file `level2_2025W19_1B_0116_1D6` |
|---|---|---|
| PRIMARY | header 0 to 2,880, no data | same |
| IMAGE (plain float32, 2040x2040) | header at 2,880, 25,920 B; data at 28,800, 16,646,400 B | header at 2,880, 23,040 B; data at 25,920, 16,646,400 B |
| FLAGS (BINTABLE, `ZIMAGE=T`, `ZCMPTYPE=RICE_1`, `ZBITPIX=32`, `ZTILE1=2040`, `ZTILE2=1`) | header at 16,675,200, 17,280 B; data 7,744,320 B | header at 16,672,320, 17,280 B; data 11,793,600 B |
| VARIANCE (plain float32) | header at 24,436,800, 11,520 B; data at 24,448,320 | header at 28,483,200, 11,520 B; data at 28,494,720 |
| ZODI (plain float32) | header at 41,094,720, 11,520 B; data at 41,106,240 | header at 45,141,120, 11,520 B; data at 45,152,640 |
| EPSF (BINTABLE 441 x 8752 B) | data 3,862,080 B | same size |
| WCS-WAVE (BINTABLE, 1 row) | row 1,056 B, at end of file | row 720 B, at end of file |
| File size | 61,626,240 B | 65,672,640 B |

Consequences for a Range-based reader:
- The IMAGE data offset is NOT constant (28,800 versus 25,920), so each file needs its header read first. One request for bytes 0 to about 34,559 covers PRIMARY plus the IMAGE header in both files; the pixel rows are then one more request (row y starts at data offset + y x 2040 x 4, big-endian float32).
- FLAGS in the full file needs Rice decompression, one tile per image row (read the 8-byte row descriptors, then the heap bytes for the wanted rows). Its size varies per file, so VARIANCE, ZODI and WCS-WAVE offsets must be derived by reading the FLAGS header (`PCOUNT`), not hard-coded.
- Skipping ZODI is possible for small fields: zodiacal light is smooth over a few arcminutes, so a local sigma-clipped median removes it (UNVERIFIED here; the detectability experiment in `08` tests background handling).
- Wavelength per pixel is fixed to the detector (the filter does not move), so the per-detector `spectral_wcs` calibration products on S3 could replace reading WCS-WAVE from every file (UNVERIFIED: not opened).

## 4. S3 direct

Layout (listings with `curl -s "https://nasa-irsa-spherex.s3.us-east-1.amazonaws.com/?list-type=2&prefix=<p>&delimiter=/"`):

- Bucket root: `qr2/`, `qr3/`, and `index.html` (26,765 B, CORS `*`).
- `dr1/` (the release in use): `abs_gain_matrix/ aurora_template/ dark/ dichroic/ epsf/ gain_factors/ he_template/ hips5_cube/ l3_flux_corrections/ level2/ nonfunc_v2/ nonlinear_pars/ readnoise_pars/ shuttle_glow_template/ sip/ solid_angle_pixel_map/ spectral_channels/ spectral_wcs/ xtalk_class1/ xtalk_class2/ zodi_scaling_v2/`
- `qr3/`: same set minus `hips5_cube/` (has `level2/` starting 2026W20_2A).
- `qr2/`: `abs_gain_matrix/ average_psf/ dark/ dichroic/ gain_factors/ level2/ nonfunc/ nonlinear_pars/ readnoise_pars/ sip/ solid_angle_pixel_map/ spectral_channels/ spectral_wcs/`.
- `dr1/level2/<week>_<id>/<processing>/<detector 1-6>/<file>.fits` e.g. `dr1/level2/2025W34_2B/l2b-v27-2026-229/{1..6}/`; a `l2b_retry-v27-2026-229/` sibling also exists for that week. Listing is truncated at 1000 keys per request (continuation needed).
- `dr1/hips5_cube/hips_20261026/Norder5/...`: only FITS cube tiles (first 1000 keys all `.fits`).
- No catalogs, no mosaics, no PNG or JPG browse images found under `dr1/`, `qr3/`, `qr2/` (checked top-level prefixes and the hips5_cube key suffixes; deeper level2 trees listed only for the test week). UNVERIFIED for the entire bucket (not exhaustively listed).

Range: `curl -s -o r.bin -D - -r 0-2879 $S3` returned `HTTP/1.1 206 Partial Content`, `Content-Range: bytes 0-2879/61626240`, 1.8 s (also 206 with Origin header and ACAO `*`). A 490 KB range took 1.3, 5.5 and 2.3 s.

Partial pixel read, 60x60 section of the IMAGE HDU (`scripts/s3sec2.py`, `fits.open(url, use_fsspec=True)` then `f['IMAGE'].section[1960:2020,1130:1190]`; result is a raw (uncompressed) 60x60 array):

| path | open (headers) | total incl. section | notes |
|---|---|---|---|
| HTTPS S3, run 1 | 5.1 s | 28.8 s | |
| HTTPS S3, run 2 | 4.2 s | 16.1 s | |
| s3:// anon (s3fs), run 1 | 20.2 s | 43.0 s | |
| s3:// anon (s3fs), run 2 | 19.4 s | 36.1 s | |
| IBE cutout `size=0.1` (for comparison) | n/a | 10-21 s typical, 4.0 MB | from section 2 |

This machine had high RTT (a 2880-byte ranged GET took 1.4-1.8 s), so absolute times are pessimistic, but the ordering holds. Astropy's fsspec reader does many sequential small reads and is no faster than the IBE cutout. A hand-built reader (one 2880-byte-multiple header read, then one range covering the rows, about 490 KB for 60 rows at 2040 px wide, as tested above at 1.3-5.5 s) would be a few seconds (the combined hand-built flow is UNVERIFIED, only its two parts were timed).

## 5. HiPS cube

Properties file (full text, `curl -s https://irsa.ipac.caltech.edu/data/hips/SPHEREx/spherex_allsky_cube/properties`, 3,504 B) key lines:

    creator_did          = ivo://IPAC/P/SPHEREx/DR1/cube
    obs_title            = SPHEREx DR1 all-sky data cube
    hips_builder         = Aladin/HipsGen v12.900
    hips_version         = 1.4
    hips_release_date    = 2026-11-01T01:58Z
    hips_frame           = equatorial
    hips_order           = 5
    hips_order_min       = 0
    hips_tile_width      = 512
    hips_service_url     = https://irsa.ipac.caltech.edu/data/hips/SPHEREx/spherex_allsky_cube
    hips_status          = public master clonableOnce
    hips_tile_format     = png
    custom_tile_format   = fits-cube
    custom_tile_format_order = fits-cube:5
    hips_pixel_scale     = 0.0035786
    dataproduct_type     = cube
    hips_cube_depth      = 102
    hips_cube_firstframe = 1
    hips_pixel_cut       = 0 40
    hips_pixel_function  = asinh
    hips_data_range      = -1418.79 11348.3
    data_cube_bunit3     = um
    data_cube_crval3_arr = 0.753 0.771 ... 4.988   (102 values)
    em_min = 7.43e-07, em_max = 5.009e-06
    t_min = 60789.75076, t_max = 61174.49276
    moc_sky_fraction     = 1.000000

Description text: 102 frames, frame index = 17*(band-1)+(channel-1), frames 50 and 51 (band 3 ch 17, band 4 ch 1) blank. The sky is a time-collapsed all-sky mosaic per wavelength (t_min..t_max spans the 385 days), NOT a time series.

Tile formats: the public tree is PNG (`hips_tile_format = png`), 512x512, 8-bit colormap, asinh stretch 0 to 40 (display-ready, not science values). FITS cube tiles exist too (`custom_tile_format = fits-cube`, order 5 only).
- PNG tile layout (VERIFIED by directory listing and fetches): `Norder{N}/Dir{ (ipix//10000)*10000 }/Npix{ipix}/Npix{ipix}.png` is documented in the listing as a per-pixel directory, but the file URL that works is `.../Norder3/Dir0/Npix0.png` (frame 0), and further frames as `Npix{ipix}_{k}.png` with k = 1 to 101 (`Npix0_1.png`, ... listed inside `Npix0/`). Frame k=101 returned 200, k=102 returned 404. So URL for frame k is `Npix{ipix}.png` for k=0 and `Npix{ipix}_{k}.png` for k>0, directly under `Dir{...}/`. I fetched `Norder5/Dir0/Npix7945{,_1,_61,_101}.png` (the tile containing Barnard's Star at order 5) successfully; the directory listing `Npix0/` also shows the files. Caveat: whether `Dir0/Npix0.png` and `Dir0/Npix0/Npix0.png` are both reachable was not separately confirmed for all frames (the listing shows the latter path; the former returned 200 for frame 0 at Norder3).
- Sizes: PNG tile, order 3 frame 0 is 39,131 B; order 5 tiles are 102,788 to 122,854 B for the four frames tested; each order-5 tile took 1.3-1.5 s. Order 5 has 10,000 files in `Dir0` alone.
- FITS cube tile (order 5): `Npix7945_cube.fits` is 320,909,760 bytes with `accept-ranges: bytes` (on both IBE and S3); the cube tile is not usable per pixel in a browser except via S3 Range requests.
- Order-5 pixel scale 0.0035786 deg = 12.9 arcsec per HiPS pixel, coarser than SPHEREx's 6.15 arcsec native.

Aladin Lite: the tree is a standard HiPS cube with PNG tiles and `hips_cube_depth`; IRSA's own landing page (`https://irsa.ipac.caltech.edu/data/hips/SPHEREx/spherex_allsky_cube/`, 42 KB html) embeds Aladin Lite 3.8.2 from jsDelivr with a frame slider driven by `hips_cube_firstframe`/`?frame=N`. So Aladin Lite can display it (VERIFIED from the page source, not rendered by me).

Listing (`curl -s https://irsa.ipac.caltech.edu/data/hips/SPHEREx/`): only `spherex_allsky_cube/` (dated 11-Nov-2026). `https://irsa.ipac.caltech.edu/data/hips/list` was not fetched (UNVERIFIED). The ibe path `https://irsa.ipac.caltech.edu/ibe/data/spherex/dr1/hips5_cube/hips_20261026/` itself returns 404 for the directory, but tile files under it work (the cube tile above returned 200).

## 6. Other image services

- Preview images: none found. IBE ignores `format=png`. The SIA response lists `image/png` only as an allowed value in the product-type/format options domain, with no preview links (grep of `data/sia.xml` found no png or jpg URLs). The IBE directory listing for the test week had no png or jpg links. The old `nph-cutouts` CGI returned 502.
- Cutout tool doc `https://irsa.ipac.caltech.edu/data/SPHEREx/docs/cutout_tool.html` documents only the IBE direct URL (`?center=ra,dec&size=0.1`).
- Spectrophotometry Tool and Data Explorer network calls: NOT inspected (UNVERIFIED, none found in the docs I read). No documented API for them.

## Implications for the viewer

1. Browser-direct cutouts from IRSA are impossible: IBE cutouts, IBE full files, TAP and SIA send no CORS headers. The page needs a thin backend proxy (or edge function) for TAP and cutouts, or must pull pixels from S3 instead.
2. S3 and the HiPS PNG tree are fully CORS-open (`*`, Range allowed), so a browser can read them directly. Browser-direct is realistic only for (a) HiPS PNG tiles (fast, 100 KB, but time-collapsed, 12.9 arcsec pixels, no per-exposure time dimension) and (b) hand-written HTTP Range reads of the raw uncompressed IMAGE HDU on S3. For the time video, (b) is the only direct route, and needs a small JS FITS header parser plus WCS from the cutout's header (the full-file header is just a few KB over Range). TAP still has to go through the proxy.
3. Fastest for the time-lapse: a proxy that fetches S3 byte ranges (header plus the pixel rows of the box, about 0.5 MB) and returns a compact PNG or JSON per frame, caching aggressively. This beats the IBE cutout, which always ships about 4 MB because of the EPSF table, takes 10-21 s per file, and returns 503 for a third of requests at 8 parallel. Also, reading S3 server-side removes the browser CORS question and the per-user rate-limit exposure.
4. If the proxy uses the IBE cutout anyway: budget 10-21 s per frame, run at most 2-4 in parallel, honor `retry-after: 5`, retry up to 3 times, pre-warm the cache for the demo targets (Barnard's Star, WISE 0855, Epsilon Indi), and strip the EPSF HDU server-side before sending to the browser (cuts 4.0 MB to about 0.13 MB).
5. astropy `use_fsspec` is not the fast path (16-43 s here); do not copy that pattern into the backend. Hand-rolled Range reads (1.3-5.5 s for 490 KB, measured only as pieces) are the lead to confirm.
6. Aladin Lite with the IRSA HiPS cube is a free, working context map and wavelength slider; use it as a secondary layer, not for the time-lapse.
7. Time of each frame comes from `MJD-AVG` / `DATE-AVG` in the IMAGE header, or from the TAP `time_bounds_lower` (equals MJD-BEG).

Scratch artifacts: `<scratch>/w5/` (scripts/, data/). Total download volume about 150 MB, far under 2 GB.
