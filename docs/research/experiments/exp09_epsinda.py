"""Experiment 09: does eps Ind A (402" west of B, about 8 mag past saturation) contaminate B?
Offline: uses only the cached D2 row bands from exp09_targets.py epsindb (61 rows x 2040 columns).

usage: python -I exp09_epsinda.py <datadir> <imgdir> <out json>
Per exposure: where A falls (file pixels, rows from B), whether it is inside the cached band,
B's r <= 2.5 px aperture flux, and NaN / bright-pixel counts within 5 px of B. Flux outliers
(more than 5 robust sigma from a straight-line fit of flux vs wavelength) flag contamination.
"""
import glob, json, os, sys
import numpy as np
from astropy.io import fits
from astropy.wcs import WCS
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import exp09_reader as R
from exp09_targets import EPS_IND_A, eps_pred, ann_flux
from astropy.stats import sigma_clipped_stats

datadir, imgdir, outp = sys.argv[1:4]
rows = []
best = None
for f in sorted(glob.glob(os.path.join(datadir, "cache_epsindb", "*_h30.npz"))):
    z = np.load(f)
    hdr = fits.Header.fromstring(str(z["hdr"])); band = z["band"].astype(float); y0 = int(z["y0"])
    w = WCS(hdr)
    mjd = float(hdr["MJD-AVG"])
    bra, bdec = eps_pred(mjd)
    bx, by = map(float, w.all_world2pix([[bra[0], bdec[0]]], 0)[0])
    ax, ay = map(float, w.all_world2pix([[*EPS_IND_A]], 0)[0])
    _, med, sig = sigma_clipped_stats(band[np.isfinite(band)], sigma=3)
    img = band - med
    fx, fy = bx, by - y0
    flux, ff = ann_flux(img, fx, fy, 0, 2.5, 5, 8)
    ix, iy = int(round(fx)), int(round(fy))
    near = img[max(iy - 5, 0):iy + 6, max(ix - 5, 0):ix + 6]
    wl, _ = R.wave_at(hdr, (z["X"], z["Y"], z["V"]), bx, by)
    a_in = bool(y0 <= ay < y0 + band.shape[0] and 0 <= ax < 2040)
    rec = dict(file=os.path.basename(f), mjd=mjd, wl=wl, A_x=ax, A_y=ay, A_on_detector=bool(0 <= ax < 2040 and 0 <= ay < 2040),
               A_minus_B_rows=ay - by, A_minus_B_cols=ax - bx, A_in_band=a_in, B_flux=flux, B_ffrac=ff,
               nan_within_5px=int((~np.isfinite(near)).sum()), n_band_nan=int((~np.isfinite(band)).sum()))
    if a_in:
        a_core = band[int(round(ay)) - y0 - 3:int(round(ay)) - y0 + 4, int(round(ax)) - 3:int(round(ax)) + 4]
        rec["A_nan_in_7x7"] = int((~np.isfinite(a_core)).sum())
        if best is None or abs(rec["A_minus_B_rows"]) < abs(best[0]["A_minus_B_rows"]):
            best = (rec, img, fx, fy, ax, ay - y0)
    rows.append(rec)
wl = np.array([r["wl"] for r in rows]); fl = np.array([r["B_flux"] for r in rows])
ok = np.isfinite(fl)
c = np.polyfit(wl[ok], fl[ok], 1)
res = fl - np.polyval(c, wl)
_, _, rs = sigma_clipped_stats(res[ok], sigma=3)
for r, x in zip(rows, res):
    r["B_flux_resid_sigma"] = float(x / rs)
out = dict(n=len(rows), n_A_on_detector=sum(r["A_on_detector"] for r in rows), n_A_in_band=sum(r["A_in_band"] for r in rows),
           A_minus_B_rows_range=[float(min(r["A_minus_B_rows"] for r in rows)), float(max(r["A_minus_B_rows"] for r in rows))],
           A_minus_B_cols_range=[float(min(r["A_minus_B_cols"] for r in rows)), float(max(r["A_minus_B_cols"] for r in rows))],
           n_B_nan_within_5px=sum(r["nan_within_5px"] > 0 for r in rows),
           B_flux_fit=dict(slope=float(c[0]), intercept=float(c[1]), robust_resid_sigma=float(rs), frac_scatter=float(rs / np.nanmedian(fl))),
           n_B_flux_outliers_5sigma=int(np.sum(np.abs(res[ok]) > 5 * rs)), outliers=[r for r in rows if abs(r["B_flux_resid_sigma"]) > 5],
           exposures=rows)
print(json.dumps({k: v for k, v in out.items() if k != "exposures"}, indent=1, default=float))
json.dump(out, open(outp, "w"), indent=1, default=float)
if best:
    rec, img, fx, fy, ax, ay = best
    lo, hi = int(min(fx, ax)) - 40, int(max(fx, ax)) + 40
    fig, a = plt.subplots(figsize=(12, 2.4))
    sub = img[:, max(lo, 0):min(hi, 2040)]
    a.imshow(np.arcsinh(sub / 0.2), origin="lower", cmap="gray", interpolation="nearest", vmin=-2, vmax=8)
    a.plot([fx - max(lo, 0)], [fy], "o", mfc="none", mec="red", ms=14)
    a.plot([ax - max(lo, 0)], [ay], "o", mfc="none", mec="cyan", ms=14)
    a.set_title(f"{rec['file'][:40]}: native D2 row band, red = eps Ind B, cyan = eps Ind A "
                f"({rec['A_minus_B_cols']:+.0f} cols, {rec['A_minus_B_rows']:+.0f} rows); NaN = white", fontsize=8)
    fig.tight_layout(); fig.savefig(os.path.join(imgdir, "exp09_epsindb_epsinda_band.png"), dpi=130); plt.close(fig)
