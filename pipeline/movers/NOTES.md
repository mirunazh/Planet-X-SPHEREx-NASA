# movers.json notes

## Source
SIMBAD TAP, table `basic`, via the Harvard mirror https://simbad.harvard.edu/simbad/sim-tap/sync (CSV).
The CDS endpoint https://simbad.cds.unistra.fr/simbad/sim-tap/sync returned HTTP 404 today; the script tries it first and falls back.
IRSA was not needed.

Main query (min total pm 300 mas/yr):
`SELECT main_id, ra, dec, pmra, pmdec, plx_value, otype, sp_type FROM basic WHERE pmra*pmra + pmdec*pmdec >= 90000`
Second query (named slow movers): same columns, `basic JOIN ident ON oidref = oid WHERE id IN ('RW Aur','V* RW Aur','R Dra','V* R Dra')`.

## Counts
- Main query: 23647 rows. Named query: 2 rows (RW Aur, R Dra).
- Dropped: 576 exoplanet rows (otype Pl, Pl?), which duplicate their host's coordinates and pm.
- Final `count` in movers.json: 23073. Sorted by total proper motion, fastest first.
- No hand-added rows: all five required targets came from SIMBAD.
  Names as SIMBAD gives them: "Barnard's star", "eps Ind B" (Ba+Bb combined, otype BD*), "WISEA J085510.74-071442.5" (WISE 0855), "RW Aur", "R Dra". Prefixes "NAME ", "* ", "V* " are stripped, whitespace collapsed. A name search UI must add aliases (WISE 0855, WISE J085510.83-071442.5, GJ 699).
- RW Aur's SIMBAD pm (7, -20) is the older Hipparcos-era value (research doc prefers Gaia A: 2.6, -27.4); the difference is under 0.7"/26 yr, irrelevant here. R Dra and RW Aur are slow movers kept as named challenge targets.

## Size
- movers.json (pm >= 300): 1,409,480 bytes raw, 553,952 bytes gzip. The 600 KB target holds only for the gzip transfer size. 23k objects cannot fit 600 KB raw.
- movers-pm500.json (build with `build_movers.py 500 movers-pm500.json`): 5282 rows, 325,726 bytes raw, 132,862 gzip. Use this if raw size matters; check passes on it too.
- Precision: ra/dec 5 decimals (0.036 arcsec), pm integer mas/yr (error under 15 mas over 26 yr), parallax 0.1 mas.

## Missing / limits
- Objects with null pmra or pmdec in SIMBAD are not selected by the query (null comparison), so they are absent; rows with null coordinates or pm are skipped.
- Objects whose SIMBAD pm is below 300 mas/yr are absent (except RW Aur, R Dra).
- SIMBAD pm values for some faint or binary entries can be wrong or duplicated per component; no cross-match was done.
- Parallax is stored but unused.

## Propagation (epoch 2000.0, ICRS)
dt = epoch - 2000.0 (years)
dRA_deg = pmRaCosDec * dt / 3.6e6 / cos(dec)
dDec_deg = pmDec * dt / 3.6e6
Separation by haversine. Parallax ignored (under 1 arcsec).

## Check output (`uv run python -I check_movers.py`)
PASS WISE 0855 @2010.5 vs challenge: 0.43 arcsec (limit 5)
PASS WISE 0855 @2026.4: 0.44 arcsec (limit 3)
PASS Barnard's Star @2026.9: 0.38 arcsec (limit 3)
PASS eps Ind B @2026.9: 0.18 arcsec (limit 3)
what-was-here hits: ['WISEA J085510.74-071442.5']
PASS what-was-here: only WISE 0855
PASS sanity: 23073 rows, no NaN, names non-empty, RW Aur and R Dra present

## Rebuild
`uv run python -I build_movers.py [min_pm_mas_per_yr] [outfile]`
