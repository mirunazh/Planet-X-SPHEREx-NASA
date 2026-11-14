# 04 IRSA coverage probe (SPHEREx metadata for the 5 challenge targets, TAP/SIA behavior)

Run date: 2026-11-14 (hackathon day 1). All queries run live with curl against https://irsa.ipac.caltech.edu. Raw outputs: scratchpad `w4/data/`. Label convention: VERIFIED = produced by a command in this session; UNVERIFIED = inference or not tested.

TAP endpoint: `https://irsa.ipac.caltech.edu/TAP/sync` (params QUERY, FORMAT; LANG defaults to ADQL). Tutorial-style CONTAINS(POINT, p.poly) filter used throughout.

## 1. Schema (VERIFIED, from TAP_SCHEMA.tables and TAP_SCHEMA.columns, 0.7 s and 0.8 s)

Queries:
`SELECT table_name,description FROM TAP_SCHEMA.tables WHERE schema_name='spherex'`
`SELECT table_name,column_name,datatype,unit,ucd,description FROM TAP_SCHEMA.columns WHERE table_name LIKE 'spherex.%'`

Tables in the spherex schema: `spherex.obscore` (IRSA ObsCore of SPHEREx products), `spherex.observation` (CAOM Observation), `spherex.plane` (CAOM Plane), `spherex.artifact` (CAOM Artifact), `spherex.provenance_input` (join of calibration files). A table named `splices` (SPHEREx Target List of Ice Sources) also appears under the schema filter.

### Key column map (VERIFIED)

| Need | Table.column | Notes |
|---|---|---|
| Time | `spherex.plane.time_bounds_lower` / `time_bounds_upper` (unit d, MJD); also `spherex.obscore.t_min` / `t_max` (MJD) | Exposure start/end, about 0.0013 d (115 s) apart (time_exposure 113.58 s on sample row) |
| Detector / bandpass | `spherex.plane.energy_bandpassname` = `SPHEREx-D1` .. `SPHEREx-D6`; `plane.productid` = `D1`..`D6` | |
| Wavelength range | `plane.energy_bounds_lower` / `upper` (m); D1 sample 7.455e-07 to 1.1167e-06 m; `energy_resolvingpower` 39.1 on D1 | obscore: `em_min`, `em_max` (m) |
| Release (DR1 vs QR3, wide vs deep) | `spherex.observation.collection` = `spherex_dr1`, `spherex_dr1_deep`, `spherex_qr3`, `spherex_qr3_deep` (plus `spherex_dr1_cal`) | NOT on plane. Needs JOIN plane.obsid = observation.obsid. Also encoded in `artifact.uri` path (`/dr1/` or `/qr3/`) and in `plane.obs_publisher_did` (`ivo://irsa.ipac/spherex_dr1_deep?2025W18_1B_0001_1/D1`). obscore: `obs_collection` |
| Processing version | `plane.provenance_version` (`7.0.5`, `7.0`); `provenance_name`, `provenance_lastexecuted`. The file-level version (e.g. `l2b-v27-2026-196`) appears only in `artifact.uri` | |
| Footprint polygon | `plane.poly` (char, WKB hex, deg), `plane.pt` (center point); obscore `s_region`, `s_ra`, `s_dec`, `s_fov` | |
| File URI | `spherex.artifact.uri` (relative, prefix `https://irsa.ipac.caltech.edu/`), join on `artifact.planeid = plane.planeid`; `contentlength` bytes (65,393,280 on sample), `contenttype image/fits`, `producttype` | |
| Exposure identifier | `spherex.observation.observationid` (e.g. `2025W17_4B_0001_1`), `obscore.obs_id`; `planeid` equals `obsid` for images (UUID) | one observation has up to 6 planes (one per detector) |
| Field name | `observation.target_name` (e.g. `SPS_081242_S12`), `target_type` = field | survey tile, not an astronomical target |
| Quality / metrics | `plane.quality_flag` (empty for all images), `metrics_background`, `metrics_maglimit` | |

Sample plane row (SELECT TOP 2 * FROM spherex.plane, 10.9 s): naxis 2040x2040, position_resolution 3.075 arcsec, samplesize 6.15 arcsec/pix, time_exposure 113.58 s, ipac_pub_date 2026-10-05, metarelease 2026-09-27.

### Full column list (VERIFIED, generated from cols.csv)


**spherex.plane**

| column | type | unit | description |
|---|---|---|---|
| obsid | char |  | foreign key: caom.observation.obsid |
| planeid | char |  | unique plane identifier: 32-bit UUID |
| productid | char |  | name of this product |
| creatorid | char |  | unique creator identifier for this product |
| metarelease | char |  | date the metadata for a plane is public (UTC) |
| datarelease | char |  | public release date |
| calibrationlevel | short |  | IVOA ObsCore calibration level   (-1,0,1,2,3,4) |
| dataproducttype | char |  | IVOA ObsCore data product type + extensions |
| quality_flag | char |  | flag describing the data quality |
| metrics_sourcenumberdensity | double | deg-2 | number density of sources |
| metrics_background | double | Jy/pix | background intensity |
| metrics_backgroundstddev | double | Jy/pix | standard deviation in background |
| metrics_fluxdensitylimit | double | Jy | flux density limit where S:N=5 for point source |
| metrics_maglimit | double |  | AB magnitude limit where S:N=5 for point source |
| position_dimension_naxis1 | long |  | dimensions (number of pixels) along one spatial axis |
| position_dimension_naxis2 | long |  | dimensions (number of pixels) along other spatial axis |
| position_resolution | double | arcsec | median spatial resolution (FWHM) |
| position_samplesize | double | arcsec | median sample (pixel) size on spatial axes |
| position_timedependent | boolean |  | flag indicating that the position is time-dependent (0=false, 1=true) |
| energy_bounds_lower | double | m | lower bound on energy axis (barycentric wavelength) |
| energy_bounds_upper | double | m | upper bound on energy axis (barycentric wavelength) |
| energy_bounds_samples | double | m | detailed energy coverage (barycentric wavelength) |
| energy_emband | char |  | comma-separated energy band names (e.g. Infrared, Optical) |
| energy_dimension | long |  | dimension (number of pixels) along energy axis |
| energy_resolvingpower | double |  | median spectral resolving power (R) |
| energy_samplesize | double | m | median sample (pixel) size on energy axis |
| energy_bandpassname | char |  | collection-specific name for energy band (e.g. filter name) |
| energy_transition_species | char |  | atom or molecule |
| energy_transition_transition | char |  | specific energy transition of species |
| energy_restwav | double | m | rest wavelength of target spectral feature (barycentric) |
| time_bounds_lower | double | d | lower bound on time axis (Modified Julian Day) |
| time_bounds_upper | double | d | upper bound on time axis (Modified Julian Day) |
| time_bounds_samples | double | d | detailed time coverage (Modified Julian Day) |
| time_dimension | long |  | dimension (number of pixels) along time axis |
| time_resolution | double | d | median resolution on the time axis |
| time_samplesize | double | d | median sample (pixel) size on time axis |
| time_exposure | double | s | median exposure time per pixel |
| polarization_states | char |  | polarization letter codes - not populated at IRSA |
| polarization_dimension | long |  | number of samples (pixels) along polarization axis |
| provenance_name | char |  | name of the process that created this plane |
| provenance_reference | char |  | external reference (URL) |
| provenance_version | char |  | version of the process/software |
| provenance_project | char |  | responsible entity (e.g. person) |
| provenance_producer | char |  | responsible entity (e.g. person) |
| provenance_runid | char |  | responsible entity (e.g. person) |
| provenance_lastexecuted | char |  | date this process was last executed |
| provenance_keywords | char |  | provenance keywords (JSON of key/value pairs) |
| ipac_gid | int |  | IRSA access control identifier: group ID |
| mission_id | int |  | IRSA access control identifier: mission ID |
| poly | char | deg | IRSA internal spatial index descriptor |
| pt | char | deg | IRSA internal spatial index descriptor |
| ipac_pub_date | char |  | public release date (UTC) |
| lastmodified | char |  | timestamp of last modification of this row |
| obs_publisher_did | char |  | IVOA ID for the dataset, assigned by the publisher (IRSA) |

**spherex.observation**

| column | type | unit | description |
|---|---|---|---|
| obsid | char |  | unique observation identifier: 32-bit UUID |
| collection | char |  | data collection this observation belongs to |
| observationid | char |  | unique observation identifier (human readable) |
| metarelease | char |  | metadata public release date |
| sequencenumber | int |  | sequence number of the observation |
| type | char |  | type of data, often from FITS OBSTYPE keyword, e.g. exposure, spectrum, object, dark |
| intent | char |  | intended purpose of data (one of: science, calibration) |
| algorithm_name | char |  | algorithm that defines the observation (e.g. exposure, coadd, cube) |
| telescope_name | char |  | name of telescope used to acquire observation |
| telescope_geolocationx | double |  | x component of geocentric location of telescope |
| telescope_geolocationy | double |  | y component of geocentric location of telescope |
| telescope_geolocationz | double |  | z component of geocentric location of telescope |
| telescope_keywords | char |  | telescope keywords (JSON of key/value pairs) |
| instrument_name | char |  | name of instrument used to acquire observation |
| instrument_keywords | char |  | instrument keywords (JSON of key/value pairs) |
| environment_seeing | double | arcsec | atmospheric seeing (FWHM) |
| environment_humidity | double |  | humidity at telescope during observation |
| environment_elevation | double | deg | elevation above horizon (0 to 90) |
| environment_tau | double |  | zenith optical depth |
| environment_wavelengthtau | double | m | wavelength at which Tau has been measured |
| environment_ambienttemp | double | C | ambient temperature telescope during observation |
| environment_photometric | boolean |  | conditions were photometric (0=false, 1=true) |
| proposal_id | char |  | collection-specific unique proposal identifier |
| proposal_pi | char |  | proposal principal investigator |
| proposal_project | char |  | project that created/acquired the observation |
| proposal_title | char |  | proposal title |
| proposal_keywords | char |  | proposal keywords (JSON of key/value pairs) |
| target_name | char |  | name of intended target |
| target_type | char |  | classification of intended target |
| target_redshift | double |  | redshift of intended target |
| target_standard | boolean |  | intended target is a standard (0=false, 1=true) |
| target_moving | boolean |  | flag for moving target |
| target_keywords | char |  | target keywords (JSON of key/value pairs) |
| targetposition_coordinates | char | deg | coordiantes of the target position |
| targetposition_coordsys | char |  | coordinate system for target position |
| targetposition_equinox | double |  | equinox of target position coordinate system |
| requirements_flag | char |  | flag describing satisfied proposal requirements (possible values: fail,null) |
| ipac_gid | int |  | IRSA access control identifier: group ID |
| mission_id | int |  | IRSA access control identifier: mission ID |
| ipac_pub_date | char |  | public release date (UTC) |
| lastmodified | char |  | timestamp of last modification of this row |

**spherex.artifact**

| column | type | unit | description |
|---|---|---|---|
| planeid | char |  | foreign key: caom.plane.planeid |
| artifactid | char |  | unique artifact identifier: 32-bit UUID |
| uri | char |  | artifact access url |
| producttype | char |  | product type (e.g. science, calibration, auxiliary, preview, info) |
| releasetype | char |  | release type (data, meta) |
| contenttype | char |  | artifact file type |
| contentlength | long | byte | artifact size in bytes |
| contentchecksum | char |  | checksum of the content (URI of the form {algorithm}:{hex value}) |
| ipac_gid | int |  | IRSA access control identifier: group ID |
| mission_id | int |  | IRSA access control identifier: mission ID |
| ipac_pub_date | char |  | public release date (UTC) |
| lastmodified | char |  | timestamp of last modification of this row |

**spherex.obscore**

| column | type | unit | description |
|---|---|---|---|
| obs_id | char |  | Observation ID |
| obs_collection | char |  | Data collection |
| s_ra | double | deg | Central right ascension, ICRS |
| s_dec | double | deg | Central declination, ICRS |
| energy_bandpassname | char |  | Band name |
| em_min | double | m | Minimum wavelength (in meters) |
| em_max | double | m | Maximum wavelength (in meters) |
| t_min | double | d | Observation start time (in MJD) |
| t_max | double | d | Observation end time (in MJD) |
| t_exptime | double | s | Exposure time |
| access_url | char |  | Data access URL |
| access_format | char |  | MIME type of access_url |
| dataproduct_type | char |  | Data product type (e.g. image, spectrum, cube, measurements) |
| calib_level | short |  | Calibration level (0, 1, 2, 3, 4) |
| target_name | char |  | SPHEREx target field |
| obs_title | char |  | Description of observation |
| facility_name | char |  | Telescope name |
| instrument_name | char |  | Instrument name |
| obs_creation_date | char |  | Data product creation date |
| obs_creator_name | char |  | Data product creator |
| obs_release_date | char |  | Public release date |
| obs_publisher_did | char |  | IVOA ID for the dataset, assigned by the publisher (IRSA) |
| publisher_id | char |  | IVOA ID for the publisher (IRSA) |
| bib_reference | char |  | IRSA documentation landing page |
| data_rights | char |  | Data rights (Public, Secure, Proprietary) |
| s_fov | double | deg | Field of view |
| s_region | char |  | Sky region covered by the data product (ICRS) |
| s_resolution | double | arcsec | Spatial resolution |
| s_xel1 | long |  | Number of pixels along x-axis (NAXIS1) |
| s_xel2 | long |  | Number of pixels along y-axis (NAXIS2) |
| s_ucd | char |  | UCD for s_xel1/s_xel2 (pos or u,v data) |
| s_unit | char |  | Units used for s_ra, s_dec |
| s_resolution_min | double | arcsec | Minimum spatial resolution |
| s_resolution_max | double | arcsec | Maximum spatial resolution |
| s_calib_status | char |  | Astrometric calibration status |
| s_pixel_scale | double | arcsec | Pixel size |
| t_xel | long |  | Number of pixels along the time axis |
| t_resolution | double | s | Resolution on the time axis |
| em_xel | long |  | Number of pixels along the energy axis |
| em_calib_status | char |  | Type of spectral coord calibration |
| em_res_power | double |  | Spectral resolving power (R) |
| pol_xel | long |  | Number of pixels along the polarization axis |
| proposal_id | char |  | Proposal identifier |
| energy_emband | char |  | Energy band (Radio,Millimeter,Infrared,Optical,...) |
| position_timedependent | boolean |  | Position is time-dependent (0=false, 1=true) |
| obs_intent | char |  | Intended purpose of data (science, calibration) |
| algorithm_name | char |  | Algorithm (e.g. mosaic, exposure) |
| facility_keywords | char |  | Telescope keywords formatted as a JSON string |
| instrument_keywords | char |  | Instrument keywords formatted as a JSON string |
| environment_photometric | boolean |  | Conditions were photometric (0=false, 1=true) |
| proposal_project | char |  | Project that created/acquired the observation |
| target_type | char |  | Classification of intended target (object, field) |
| target_standard | boolean |  | Intended target is a standard (0=false, 1=true) |
| target_moving | boolean |  | Intended target is moving (0=false, 1=true) |
| target_keywords | char |  | Target keywords formatted as a JSON string |
| proposal_pi | char |  | Proposal principal investigator |
| access_estsize | long | kbyte | Estimated size of the download at access_url |
| o_ucd | char |  | UCD of the observable (e.g. phot.flux.density, phot.count) |
| ipac_gid | int |  | Internal IRSA column:  group ID |
| ipac_pub_date | char |  | Internal IRSA column: public release date |
| pt | char | deg | Internal IRSA column: Spatial index |
| poly | char | deg | Internal IRSA column: Spatial index |

**spherex.provenance_input**

| column | type | unit | description |
|---|---|---|---|
| inputid | char |  | calibration input plane identifier (plane.planeid) |
| outputid | char |  | science output plane identifier (plane.planeid) |

## 2. Per-target coverage (VERIFIED)

Query template (one per target, 4 run concurrently, 41 s wall each; R Dra run alone, 45.6 s):
```
SELECT p.planeid, p.energy_bandpassname, p.time_bounds_lower, p.time_bounds_upper, p.provenance_version, o.collection, o.observationid, o.target_name
FROM spherex.plane p JOIN spherex.observation o ON p.obsid=o.obsid
WHERE 1=CONTAINS(POINT('ICRS',RA,DEC), p.poly) ORDER BY p.time_bounds_lower
```
Pass definition: consecutive images (sorted by start time) with a gap of at most 20 days belong to the same pass. Dates are UTC calendar dates from MJD. Script: `scripts/an.py`.

Sesame check (VERIFIED, note cds.unistra.fr redirects, use curl -L): Barnard's Star J2000 269.45208, +4.69336 (epoch 2000; pmDE 10362 mas/yr; the coordinate used in this probe, 269.4485, +4.7398, is the Gaia DR3 epoch 2016 position 269.44850, 4.73942, see section 5; the challenge page itself gives coordinates only for WISE 0855); RW Aur 76.95653, +30.40144; R Dra 248.16761, +66.75498; eps Ind (Sesame returns the A component 330.84022, -56.78598, the B pair sits about 0.2 deg east, irrelevant at 3.5 deg image width); WISE 0855-0714 not resolved by Sesame under that name (use challenge coordinates).


### Barnard's Star

Total images: **363**. Per detector: D1=60, D2=61, D3=61, D4=59, D5=62, D6=60. By collection: spherex_dr1=240, spherex_qr3=123. Provenance versions: {'7.0.5': 363}. Earliest 2025-08-15, latest 2026-09-22 (MJD 60902.865 to 61305.628). Distinct observing days: 40.

| pass | start | end | days | images | D1 | D2 | D3 | D4 | D5 | D6 | collections | obs days |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | 2025-08-15 | 2025-09-05 | 20.2 | 108 | 19 | 18 | 18 | 18 | 18 | 17 | {'spherex_dr1': 108} | 13 |
| 2 | 2025-09-30 | 2025-10-01 | 0.7 | 10 | 5 | 0 | 0 | 5 | 0 | 0 | {'spherex_dr1': 10} | 2 |
| 3 | 2026-03-11 | 2026-04-10 | 29.9 | 114 | 18 | 19 | 20 | 18 | 19 | 20 | {'spherex_dr1': 114} | 9 |
| 4 | 2026-05-04 | 2026-05-05 | 0.9 | 8 | 0 | 0 | 4 | 0 | 0 | 4 | {'spherex_dr1': 8} | 2 |
| 5 | 2026-08-16 | 2026-09-22 | 37.0 | 123 | 18 | 24 | 19 | 18 | 25 | 19 | {'spherex_qr3': 123} | 14 |

### Epsilon Indi B

Total images: **465**. Per detector: D1=48, D2=93, D3=99, D4=45, D5=84, D6=96. By collection: spherex_dr1=345, spherex_qr3=120. Provenance versions: {'7.0.5': 465}. Earliest 2025-04-24, latest 2026-10-02 (MJD 60789.856 to 61315.478). Distinct observing days: 60.

| pass | start | end | days | images | D1 | D2 | D3 | D4 | D5 | D6 | collections | obs days |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | 2025-04-24 | 2025-06-10 | 46.3 | 124 | 4 | 32 | 28 | 3 | 30 | 27 | {'spherex_dr1': 124} | 14 |
| 2 | 2025-09-28 | 2025-11-12 | 44.9 | 147 | 24 | 30 | 23 | 24 | 24 | 22 | {'spherex_dr1': 147} | 25 |
| 3 | 2026-04-18 | 2026-05-04 | 15.3 | 74 | 20 | 7 | 12 | 18 | 6 | 11 | {'spherex_dr1': 74} | 11 |
| 4 | 2026-09-22 | 2026-10-02 | 10.3 | 120 | 0 | 24 | 36 | 0 | 24 | 36 | {'spherex_qr3': 120} | 10 |

### WISE 0855-0714

Total images: **258**. Per detector: D1=36, D2=48, D3=45, D4=36, D5=48, D6=45. By collection: spherex_dr1=258. Provenance versions: {'7.0.5': 258}. Earliest 2025-05-05, latest 2026-05-14 (MJD 60800.700 to 61174.287). Distinct observing days: 27.

| pass | start | end | days | images | D1 | D2 | D3 | D4 | D5 | D6 | collections | obs days |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | 2025-05-05 | 2025-05-06 | 0.8 | 30 | 4 | 8 | 3 | 4 | 8 | 3 | {'spherex_dr1': 30} | 2 |
| 2 | 2025-10-31 | 2025-11-14 | 14.2 | 110 | 18 | 19 | 18 | 18 | 19 | 18 | {'spherex_dr1': 110} | 6 |
| 3 | 2025-12-11 | 2025-12-13 | 1.6 | 18 | 0 | 6 | 3 | 0 | 6 | 3 | {'spherex_dr1': 18} | 3 |
| 4 | 2026-04-21 | 2026-05-14 | 23.1 | 100 | 14 | 15 | 21 | 14 | 15 | 21 | {'spherex_dr1': 100} | 16 |

### RW Aurigae

Total images: **335**. Per detector: D1=56, D2=55, D3=56, D4=56, D5=56, D6=56. By collection: spherex_dr1=226, spherex_qr3=109. Provenance versions: {'7.0.5': 335}. Earliest 2025-09-01, latest 2026-09-16 (MJD 60919.420 to 61299.896). Distinct observing days: 35.

| pass | start | end | days | images | D1 | D2 | D3 | D4 | D5 | D6 | collections | obs days |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | 2025-09-01 | 2025-09-20 | 18.8 | 112 | 19 | 18 | 19 | 19 | 18 | 19 | {'spherex_dr1': 112} | 12 |
| 2 | 2026-02-20 | 2026-03-12 | 19.3 | 114 | 19 | 19 | 19 | 19 | 19 | 19 | {'spherex_dr1': 114} | 13 |
| 3 | 2026-09-02 | 2026-09-16 | 14.8 | 109 | 18 | 18 | 18 | 18 | 19 | 18 | {'spherex_qr3': 109} | 10 |

### R Draconis

Total images: **2493**. Per detector: D1=584, D2=89, D3=574, D4=584, D5=89, D6=573. By collection: spherex_dr1=413, spherex_dr1_deep=1225, spherex_qr3=126, spherex_qr3_deep=729. Provenance versions: {'7.0.5': 2493}. Earliest 2025-04-24, latest 2026-09-27 (MJD 60789.880 to 61310.291). Distinct observing days: 222.

| pass | start | end | days | images | D1 | D2 | D3 | D4 | D5 | D6 | collections | obs days |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | 2025-04-24 | 2025-07-22 | 88.7 | 240 | 22 | 33 | 67 | 21 | 32 | 65 | {'spherex_dr1_deep': 87, 'spherex_dr1': 153} | 34 |
| 2 | 2025-08-29 | 2026-01-13 | 137.0 | 472 | 175 | 37 | 24 | 174 | 38 | 24 | {'spherex_dr1_deep': 260, 'spherex_dr1': 212} | 58 |
| 3 | 2026-02-08 | 2026-09-27 | 230.8 | 1781 | 387 | 19 | 483 | 389 | 19 | 484 | {'spherex_dr1_deep': 878, 'spherex_dr1': 48, 'spherex_qr3': 126, 'spherex_qr3_deep': 729} | 130 |

Notes (VERIFIED from the tables): wide-survey targets get roughly 18 to 20 images per detector per pass; passes in which only some detectors appear (Barnard pass 2 and 4, WISE 0855 pass 3, Eps Ind pass 4) mean the position sat near the edge of the detector footprints or that the detector arrays cover different offsets of the sky. R Dra sits in the deep field (collections spherex_dr1_deep, spherex_qr3_deep) and also has 222 distinct observing days. With the 20-day rule R Dra collapses to 3 passes because deep-field visits are nearly continuous; gaps of more than 20 days exist only in 2025-07/08 and 2026-01/02.

## 3. Archive-wide (VERIFIED)

Queries (4 run concurrently, each about 24.9 s wall):
- `SELECT MIN(time_bounds_lower) AS tmin, MAX(time_bounds_upper) AS tmax, COUNT(*) AS n FROM spherex.plane` : tmin MJD 60789.750762 (2025-04-24), tmax MJD 61318.002720 (2026-10-05), n = 1,628,318 rows.
- `SELECT o.collection, p.energy_bandpassname, COUNT(*) AS n, MIN(p.time_bounds_lower), MAX(p.time_bounds_upper) FROM spherex.plane p JOIN spherex.observation o ON p.obsid=o.obsid GROUP BY o.collection, p.energy_bandpassname`
- `SELECT provenance_version, provenance_name, COUNT(*) AS n FROM spherex.plane GROUP BY provenance_version, provenance_name` : 7.0.5 = 1,628,230 rows; 7.0 = 88 rows (the calibration rows). Both "SPHEREx SSDC Level 1-2 Quick-Release Pipeline".
- `SELECT quality_flag, dataproducttype, calibrationlevel, COUNT(*) ... GROUP BY ...` : image / level 2 = 1,628,230; measurements level 3 = 75; level 1 = 13. quality_flag is empty everywhere.

| collection | images | time range (MJD) | dates |
|---|---|---|---|
| spherex_dr1 (wide) | 945,725 | 60789.75 to 61174.49 | 2025-04-24 to 2026-05-14 |
| spherex_dr1_deep | 233,681 | 60789.77 to 61174.50 | 2025-04-24 to 2026-05-15 |
| spherex_qr3 (wide) | 362,124 | 61174.51 to 61318.00 | 2026-05-15 to 2026-10-05 |
| spherex_qr3_deep | 86,700 | 61174.53 to 61317.97 | 2026-05-15 to 2026-10-04 |
| spherex_dr1_cal | 88 calibration rows (not images) | none | none |

Per detector (all science collections): D1 272,963; D2 272,990; D3 272,684; D4 269,694; D5 270,443; D6 269,456. Sum 1,628,230.

Release lag: latest observation is 2026-10-05 and today is 2026-11-14, so about 40 days lag. plane.metarelease sample rows 2026-09-27, ipac_pub_date 2026-10-05. UNVERIFIED: whether a future QR4 will arrive during the hackathon (very unlikely).

## 4. Service behavior

### Timings (VERIFIED, `-w %{time_total}`)
Timing is noisy: the same query ranged 14.6 to 28 s, and 4 concurrent queries all took about 41 to 56 s (the server seems to serialize or share work). Warm repeats can be much faster.

| # | Query (point P = POINT('ICRS',269.4485,4.7398), Barnard) | wall | rows |
|---|---|---|---|
| 1 | plane only, CONTAINS(P, poly), no other filter | 28.1 s (cold), 14.7 s (repeat) | 363 |
| 2 | same + `energy_bandpassname='SPHEREx-D2'` | 10.0 s | 61 |
| 3 | same as 1 + `time_bounds_lower BETWEEN 61100 AND 61200` | 14.4 s | 122 |
| 4 | tutorial query: artifact JOIN plane, uri concat, CONTAINS, ORDER BY time, all detectors (run concurrently with 3 others) | 56.6 s | 363 |
| 5 | tutorial query with D2 filter (concurrent) | 56.1 s | 61 |
| 6 | artifact JOIN plane, D2, ORDER BY, run alone right after #2 | 2.9 s (warm) | 61 |
| 7 | INTERSECTS(CIRCLE('ICRS',269.4485,4.7398,0.01), p.poly) | 1.0 to 1.9 s | 6 (!) |
| 8 | INTERSECTS(POINT, poly) | 1.1 s | 6 (!) |
| 9 | CONTAINS(CIRCLE(r=0.01 deg), p.poly) | 12.0 s | 361 |
| 10 | plane+observation join for a target (section 2) | 41 s (4 concurrent), 45.6 s alone | 258 to 2493 |
| 11 | TAP_SCHEMA query | 0.7 s | n/a |
| 12 | `SELECT TOP 2 * FROM spherex.plane` | 10.9 s (first call, cold) | 2 |
| 13 | `TOP 2 * FROM spherex.artifact` / `observation` | 20.8 s / 33.7 s (cold) | 2 |

Findings:
- Point-in-polygon with all detectors is 14 to 28 s alone; adding a detector filter gave 10 s; adding a time range did not clearly help (14.4 s). Speedup from extra constraints is small and confounded by caching. VERIFIED: no constraint made it dramatically faster.
- INTERSECTS(POINT or small CIRCLE, poly) is fast (about 1 s) but returned only 6 rows instead of 363. Cause UNVERIFIED (probably a different spatial-index path); do not use it for footprints. Use CONTAINS(POINT, poly), which matches SIA counts (below).
- Cold queries on the artifact and observation tables took 20 to 34 s even with TOP 2.
- Row limit: `SELECT TOP 200000 planeid ... ` returned exactly 200000 rows in 33.7 s, and an unlimited query returned 30,889 rows in 16.1 s, so no 2000 or 100000 style MAXREC cap was hit at 200k (cap above that UNVERIFIED). /TAP/capabilities reports executionDuration default and hard of 259200 s (3 days).
- Output formats via FORMAT= : `CSV` works (also lowercase `csv` for async), `JSON` works but is a verbose XML-to-JSON dump of the VOTable (`{"VOTABLE": {"<xmlattr>": ...`), `VOTABLE` works (default), `TSV` works (4.8 s on 3 rows). `FORMAT=parquet` returned HTTP 200 with a VOTable containing `QUERY_STATUS ERROR: Unknown format when generating content type`; always check for ERROR INFO since HTTP status stays 200. Bad column names also give HTTP 200 plus an ERROR INFO (e.g. `ORA-00904: "MJD": invalid identifier`).
- Async: POST to `/TAP/async` with `QUERY`, `LANG=ADQL`, `FORMAT=csv`, `PHASE=RUN` returned HTTP 303 in 1.0 s with `Location: https://irsa.ipac.caltech.edu/TAP/async/28267110`. Polling `/phase` showed COMPLETED on the first poll, result at `/results/result` returned 363 rows in 1.0 s. (The job was likely served from cache; async needs a Location redirect and a cookie handled, `-L` works.)
- Availability: `/TAP/availability` reports `available true`.

### SIA v2 direct HTTP (VERIFIED)
Base: `https://irsa.ipac.caltech.edu/SIA?COLLECTION=<c>&POS=circle+RA+DEC+RADIUS` (degrees). Results for Barnard, radius 0.001 deg:

| Request | wall | content-type | rows |
|---|---|---|---|
| COLLECTION=spherex_qr3 (default format) | 6.4 s | application/x-votable+xml | 123 |
| COLLECTION=spherex_dr1 | 5.7 s | application/x-votable+xml | 240 |
| COLLECTION=spherex_dr1&RESPONSEFORMAT=csv | 1.9 s | text/csv | 240 |
| COLLECTION=spherex_dr1&RESPONSEFORMAT=json | 4.0 s | application/json (verbose VOTable-as-JSON) | 240 |
| COLLECTION=spherex_dr1&TIME=60900+61000 | 2.5 s | votable | 118 |

SIA counts equal TAP counts (DR1 240, QR3 123), which cross-checks the CONTAINS(POINT, poly) footprint test. SIA needs one request per collection (4 collections: spherex_dr1, spherex_dr1_deep, spherex_qr3, spherex_qr3_deep). CSV columns include `s_ra, s_dec, energy_bandpassname, obs_id, em_min, em_max, access_url, access_format, access_estsize, t_exptime, s_region, obs_collection, target_name, t_min, t_max, obs_publisher_did, cloud_access, ...`. `FORMAT=` instead of `RESPONSEFORMAT=` was not tested (UNVERIFIED). SIA is 1 request for about 2 to 6 s versus TAP 10 to 40 s for the same footprint set, so SIA with csv is the faster path for a point lookup (but SIA lags TAP by about 1 day, per the context doc, UNVERIFIED here).

## 5. Companion catalogs on the same TAP (VERIFIED)

Table names (query `TAP_SCHEMA.tables ... LIKE`, 0.8 s): `gaia_dr3_source`, `gaia_dr3_allwise_best_neighbour`, `gaia_edr3_source`, `catwise_2020`, `catwise_2020_reject`, `allwise_p3as_psd`, `allwise_p3as_mep`, `unwise_2019`, `fp_psc` (2MASS PSC), `allsky_4band_p3as_psd` (WISE All-Sky), `neowiser_p1bs_psd` (NEOWISE single exposure), `unwise.unwise_neo3_images` (image metadata).

Key columns found (units from TAP_SCHEMA):
- gaia_dr3_source: source_id, designation, ref_epoch (yr), ra, dec (deg), parallax (mas), pmra, pmdec, pmra_error (mas/yr), phot_g_mean_mag.
- catwise_2020: source_name, source_id, ra, dec, meanobsmjd (d), ra_pm, dec_pm, pmra, pmdec, sigpmra, sigpmdec (all arcsec/yr, note: arcsec not mas), w1mpro, w2mpro, w1mpro_pm, w2mpro_pm, w1snr, w2snr, cc_flags, unwise_objid.
- allwise_p3as_psd: designation, ra, dec, pmra, pmdec, sigpmra, sigpmdec (mas/yr), w1mpro, w2mpro, ra_pm, dec_pm, ph_qual, cc_flags.
- unwise_2019: unwise_objid, ra, dec, coadd_id (no proper motion column listed in my filter; unverified whether others exist).
- fp_psc: designation, ra, dec, j_m, h_m, k_m, ph_qual.

Cone searches (60 arcsec = 0.016667 deg):
- Gaia DR3 around Barnard, 5.0 s, 79 rows: `SELECT ra,dec,pmra,pmdec,parallax,phot_g_mean_mag FROM gaia_dr3_source WHERE 1=CONTAINS(POINT('ICRS',ra,dec),CIRCLE('ICRS',269.4485,4.7398,0.016667))`. Barnard itself: ra 269.44850252544, dec 4.73942005111, pmra -801.551, pmdec 10362.394 mas/yr, parallax 546.9759 mas, G = 8.1940. So the coordinate used in this probe is the Gaia epoch 2016.0 position (the challenge page gives no coordinates for Barnard's Star).
- CatWISE2020 around WISE 0855 (first attempt used non-existent column `mjd`, error with HTTP 200; correct column is meanobsmjd), 14.6 s, 45 rows: `SELECT source_name,ra,dec,pmra,pmdec,sigpmra,sigpmdec,w1mpro,w2mpro,w1mpro_pm,w2mpro_pm,meanobsmjd FROM catwise_2020 WHERE 1=CONTAINS(POINT('ICRS',ra,dec),CIRCLE('ICRS',133.7951,-7.2451,0.016667))`. No row at the challenge position with a large proper motion. Three rows at about 38 arcsec west have pmra about -7.9 to -8.0 arcsec/yr and w2mpro_pm about 13.8 to 14.1 (J085506.91-071437.5, J085508.34-071439.2, J085507.96-071439.3, RA about 133.783); these are very likely WISE 0855 itself (CatWISE epoch about MJD 57100 to 57850) split into duplicate detections. Identity UNVERIFIED.
- AllWISE around WISE 0855 (16.1 s, 12 rows), 2MASS around Barnard (11.2 s, 14 rows), unWISE around WISE 0855 (8.2 s, 42 rows): all worked with the same CONTAINS(POINT, CIRCLE) pattern.

## 6. Failed or unverified
- Sesame does not resolve "WISE 0855-0714" under that spelling (empty), and original cds.unistra.fr URL answers 302 to vizier.idia.ac.za.
- Cause of the INTERSECTS undercount, the true MAXREC cap, SIA FORMAT= alias, and the SIA 1-day lag were not tested.
- No FITS, cutout, CORS or S3 tests (non-goal).

## Implications for the viewer
- Frames per target (all detectors; one image is one detector at one wavelength band): Barnard 363 images over 5 passes (40 observing days); Eps Ind 465 over 4 passes (60 days); WISE 0855 258 over 4 passes (27 days, no QR3 coverage, newest image 2026-05-14); RW Aur 335 over 3 passes (35 days); R Dra 2493 over 3 merged passes (222 days).
- A "little video" in time should not mix detectors blindly: each detector samples a different wavelength band, so frames differ in appearance. Either pick one detector per video (D2 gives 61 Barnard, 93 Eps Ind, 48 WISE 0855, 55 RW Aur, 89 R Dra frames) or offer a per-detector selector, and show wavelength from em_min/em_max.
- Realistic motion story: Barnard moves 10.4 arcsec/yr; its passes span 2025-08 to 2026-09, about 1.1 yr, so total motion is about 11 arcsec, about 2 SPHEREx pixels (6.15 arcsec/pix). A time-lapse is visible only through pass-to-pass shifts; pass grouping (5 passes) is a sensible chapter structure. WISE 0855 moves 8.1 arcsec/yr, about 8.8 arcsec over its 1.0 yr span.
- Latency: a cold TAP footprint query is 10 to 45 s and does not parallelize, so precompute and ship the pass/frame lists for the 5 test targets as static JSON, and use live SIA with `RESPONSEFORMAT=csv` (about 2 to 6 s) for arbitrary RA/Dec, one request per collection (4 requests, keep within the 4-concurrent politeness limit). Use a loading state and cache results.
- Use CONTAINS(POINT, poly), not INTERSECTS, and always check VOTable ERROR INFO since errors return HTTP 200.
- R Dra is the stress test: 2493 images means the UI must filter by detector and release (deep vs wide) or subsample; deep fields give near-daily cadence.
- Coverage is current only to 2026-10-05; do not promise newer frames.
