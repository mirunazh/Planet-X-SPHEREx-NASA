"""Experiment 09, part 2: Epsilon Indi B, R Draconis, RW Aurigae through the S3 range reader.

usage:
  python -I exp09_targets.py epsindb <datadir> <imgdir> <out json>
  python -I exp09_targets.py rdra_headers <datadir> <out json>       (header-only reads, D6 + D4)
  python -I exp09_targets.py rdra <datadir> <imgdir> <out json> <det> <wl_lo> <wl_hi> <nmax>
  python -I exp09_targets.py rwaur <datadir> <imgdir> <out json>
<datadir> holds tap/<target>_<det>.csv (exp09_tap.py) and the frame caches (cache_<target>/).

Choices fixed before looking at any target pixels (later additions are marked AFTER LOOKING):
- background: 3-sigma-clipped median of the finite pixels in the 61x61 native box (no ZODI,
  see the ZODI test in exp09_reader.py); no FLAGS (Rice-compressed in the full file), NaN = bad.
- stacks: per pass (gap > 20 d), reproject (bilinear) to a north-up 3"/px TAN grid, MEDIAN stack
  (no VARIANCE read, and the median rejects cosmic rays that FLAGS would have caught).
- eps Ind B: centroid per exposure in native pixels (flux-weighted, r = 2 px, 5 iterations,
  start at prediction), converted to sky with the TAN-SIP WCS; per-pass mean +- std/sqrt(n)
  after a 3-sigma clip. Also det08's stack centroid (r = 12", grid). Astrometric control: the 3
  brightest compact sources 60 to 150" from the target, measured the same way.
- photometry (RW Aur, R Dra): native pixels, 5x5 supersampled annuli. Saturated core radius
  r_core = 95th percentile over exposures of the largest radius of a NaN pixel within 12 px
  (R Dra: 25 px) of the target; wing annulus = [r_core + 2, r_core + 5] px; background annulus
  [r_core + 8, r_core + 12] px (clipped median). An exposure is dropped if < 95% of the wing
  annulus is finite. Field stars: unsaturated (no NaN within 2 px in any exposure), 5 brightest
  local maxima of the all-exposure median stack, 60" from the target and 20" from the edge;
  each measured with a r <= 2.5 px aperture (local background 5-8 px). Normalised flux =
  wing flux / median over field stars of (field flux / that star's median over all exposures).
- RW Aur wavelength matching: bins of 0.03 um at the target wavelength, ratio of each pass to
  pass 0 inside each bin, then median and scatter over bins.
"""
import csv, json, os, sys, warnings
from concurrent.futures import ThreadPoolExecutor
import numpy as np
from astropy.wcs import WCS
from astropy.stats import sigma_clipped_stats
from reproject import reproject_interp
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import exp09_reader as R
from det08_analyze import grid_wcs, passes_of, centroid, aperture, empty_ap_sigma, show
from scipy.ndimage import maximum_filter

PIX = 3.0
NATIVE = 6.15
EPS_IND_B = {2025.4: (331.095601, -56.800231), 2025.9: (331.096356, -56.800600),
             2026.4: (331.097623, -56.800916), 2026.9: (331.098378, -56.801285)}
EPS_IND_A = (330.84022, -56.78598)  # Sesame (note 04), J2000; moves ~4.7"/yr, irrelevant at 402"
RW_AUR = (76.956089, 30.401133)
R_DRA = (248.167242, 66.755023)


def mjd_to_jyear(m):
    return 2000.0 + (m - 51544.5) / 365.25


def eps_pred(mjd):
    """Linear interpolation of the brief's four predicted geocentric positions (2025.4..2026.9).
    ponytail: linear in time between half-year nodes; parallax curvature inside a half-year is
    < 0.3" here, fine against 6.15" pixels."""
    t = np.atleast_1d(mjd_to_jyear(np.asarray(mjd, float)))
    ep = np.array(sorted(EPS_IND_B)); ra = np.array([EPS_IND_B[e][0] for e in ep]); de = np.array([EPS_IND_B[e][1] for e in ep])
    # extrapolate linearly beyond the ends using the nearest segment
    i = np.clip(np.searchsorted(ep, t) - 1, 0, len(ep) - 2)
    f = (t - ep[i]) / (ep[i + 1] - ep[i])
    return ra[i] + f * (ra[i + 1] - ra[i]), de[i] + f * (de[i + 1] - de[i])


def load_all(datadir, target, det, ra, dec, half, uris=None, workers=8):
    rows = list(csv.DictReader(open(os.path.join(datadir, "tap", f"{target}_{det}.csv"))))
    uris = uris or [r["uri"] for r in rows]
    cache = os.path.join(datadir, f"cache_{target}")
    def one(u):
        try:
            fr = R.read_frame(u, ra, dec, cache, half=half)
            fr["uri"] = u
            return fr
        except Exception as e:
            print("FAIL", os.path.basename(u), repr(e)[:150], flush=True)
            return None
    with ThreadPoolExecutor(max_workers=workers) as ex:
        frs = list(ex.map(one, uris))
    ok = [f for f in frs if f is not None]
    print(f"{target} {det}: {len(ok)}/{len(uris)} frames loaded", flush=True)
    return ok


def prep(fr, ra, dec, half=30):
    """Native box around (ra, dec): background-subtracted image, its WCS, target pixel, wavelength."""
    hdr, band, y0 = fr["hdr"], fr["band"], fr["y0"]
    w = WCS(hdr)
    x, y = map(float, w.all_world2pix([[ra, dec]], 0)[0])
    ix = int(round(x))
    x0, x1 = max(ix - half, 0), min(ix + half, R.NX - 1)
    img = band[:, x0:x1 + 1].astype(float)
    bw = w.slice((slice(y0, y0 + band.shape[0]), slice(x0, x1 + 1)))
    bx, by = map(float, bw.all_world2pix([[ra, dec]], 0)[0])
    assert abs(bx - (x - x0)) < 1e-4 and abs(by - (y - y0)) < 1e-4, (bx, x - x0, by, y - y0)  # WCS slice keeps SIP right
    good = np.isfinite(img)
    _, med, _ = sigma_clipped_stats(img[good], sigma=3)
    wl, bwid = R.wave_at(hdr, fr["wave"], x, y)
    return dict(img=img - med, wcs=bw, x=bx, y=by, mjd=float(hdr["MJD-AVG"]), wl=wl, bw=bwid,
                uri=fr["uri"], bkg=float(med), det=int(hdr["DETECTOR"]))


def regrid(p, gw, n):
    d, _ = reproject_interp((p["img"], p["wcs"]), gw, shape_out=(n, n), order="bilinear")
    return d


def med_stack(ims):
    with warnings.catch_warnings():
        warnings.simplefilter("ignore")
        return np.nanmedian(np.array(ims), 0)


def ann_mask(shape, x, y, rin, rout, ss=5):
    """Fractional pixel coverage of the annulus rin <= r < rout (rin = 0 for a disc)."""
    yy, xx = np.indices(shape, dtype=float)
    o = (np.arange(ss) + 0.5) / ss - 0.5
    m = np.zeros(shape)
    for dy in o:
        for dx in o:
            r = np.hypot(xx + dx - x, yy + dy - y)
            m += (r >= rin) & (r < rout)
    return m / ss ** 2


def ann_flux(img, x, y, rin, rout, bin_, bout):
    m = ann_mask(img.shape, x, y, rin, rout)
    sel = m > 0
    fin = np.isfinite(img)
    ffrac = float(m[sel & fin].sum() / m[sel].sum()) if sel.any() else 0.0
    b = ann_mask(img.shape, x, y, bin_, bout) > 0.5
    bv = img[b & fin]
    if bv.size < 10:
        return np.nan, ffrac
    _, bk, _ = sigma_clipped_stats(bv, sigma=3)
    v = np.where(fin, img - bk, 0.0)
    return float((v * m).sum() / max(ffrac, 1e-9)), ffrac


def nan_radius(p, rmax):
    yy, xx = np.indices(p["img"].shape)
    r = np.hypot(xx - p["x"], yy - p["y"])
    bad = (~np.isfinite(p["img"])) & (r <= rmax)
    return float(r[bad].max()) if bad.any() else 0.0


def native_centroid(img, x, y, r=2.0, it=5):
    yy, xx = np.indices(img.shape)
    for _ in range(it):
        m = (np.hypot(xx - x, yy - y) <= r) & np.isfinite(img)
        wgt = np.clip(img[m], 0, None)
        if wgt.sum() <= 0 or m.sum() < 9:
            return np.nan, np.nan
        x, y = (xx[m] * wgt).sum() / wgt.sum(), (yy[m] * wgt).sum() / wgt.sum()
    return float(x), float(y)


def sky_offset(w, x, y, ra0, dec0):
    ra, dec = w.all_pix2world([[x, y]], 0)[0]
    return ((ra - ra0) * np.cos(np.radians(dec0)) * 3600, (dec - dec0) * 3600, ra, dec)


def find_field_stars(stack, gw, avoid_xy, nmax, min_sep_px, edge_px, ps_nan=None):
    """Brightest local maxima in a stack (grid px), away from avoid_xy and the edge."""
    s = np.nan_to_num(stack, nan=-np.inf)
    pk = (s == maximum_filter(s, size=5)) & np.isfinite(stack)
    ys, xs = np.nonzero(pk)
    n = stack.shape[0]
    cand = []
    for y, x in sorted(zip(ys, xs), key=lambda t: -stack[t]):
        if min(x, y, n - 1 - x, n - 1 - y) < edge_px:
            continue
        if any(np.hypot(x - ax, y - ay) < min_sep_px for ax, ay in avoid_xy):
            continue
        if any(np.hypot(x - cx, y - cy) < 5 for cx, cy in cand):
            continue
        cand.append((x, y))
    return [tuple(gw.wcs_pix2world([[x, y]], 0)[0]) for x, y in cand[:nmax * 4]]


# ------------------------------------------------------------------ Epsilon Indi B
def epsindb(datadir, imgdir, outp):
    ra_c, dec_c = EPS_IND_B[2025.9]
    frs = load_all(datadir, "epsindb", "D2", ra_c, dec_c, half=30)
    P = []
    for fr in frs:
        p = prep(fr, ra_c, dec_c, half=60)  # 121 native columns (columns are free: whole rows are read)
        pra, pdec = eps_pred(p["mjd"]); p["pra"], p["pdec"] = float(pra[0]), float(pdec[0])
        px, py = map(float, p["wcs"].all_world2pix([[p["pra"], p["pdec"]]], 0)[0])
        p["px"], p["py"] = px, py
        cx, cy = native_centroid(p["img"], px, py)
        if np.isfinite(cx):
            dx, dy, cra, cdec = sky_offset(p["wcs"], cx, cy, p["pra"], p["pdec"])
        else:
            dx = dy = cra = cdec = np.nan
        p.update(cdx=float(dx), cdy=float(dy), cra=float(cra), cdec=float(cdec))
        p["peak"] = float(np.nanmax(p["img"][int(round(py)) - 1:int(round(py)) + 2, int(round(px)) - 1:int(round(px)) + 2]))
        p["nan_near"] = int((~np.isfinite(p["img"][int(round(py)) - 3:int(round(py)) + 4, int(round(px)) - 3:int(round(px)) + 4])).sum())
        # eps Ind A: where is it relative to the band?
        ax, ay = map(float, p["wcs"].all_world2pix([[*EPS_IND_A]], 0)[0])
        full = WCS(fr["hdr"]); fax, fay = map(float, full.all_world2pix([[*EPS_IND_A]], 0)[0])
        p["A_file_px"] = (fax, fay); p["A_in_band"] = bool(0 <= ay < p["img"].shape[0] and fr["band"].shape[0] > 0)
        P.append(p)
    mj = np.array([p["mjd"] for p in P]); lab = passes_of(mj)
    for p, l in zip(P, lab):
        p["pass"] = int(l)
    n = 81
    gw = grid_wcs(ra_c, dec_c, n)
    for p in P:
        p["grid"] = regrid(p, gw, n)
    out = dict(n_frames=len(P), passes=[], exposures=[], refstars=[])
    frames = {}
    for k in sorted(set(lab)):
        g = [p for p in P if p["pass"] == k]
        st = med_stack([p["grid"] for p in g])
        tm = float(np.mean([p["mjd"] for p in g]))
        pra, pdec = eps_pred(tm)
        gx, gy = map(float, gw.wcs_world2pix([[pra[0], pdec[0]]], 0)[0])
        sx, sy = centroid(st, gx, gy)
        rng = np.random.default_rng(9)
        sig, _ = empty_ap_sigma(st, [(gx, gy)], rng)
        snr = aperture(st, gx, gy) / sig
        dx = np.array([p["cdx"] for p in g]); dy = np.array([p["cdy"] for p in g])
        ok = np.isfinite(dx)
        _, mx, sdx = sigma_clipped_stats(dx[ok], sigma=3); _, my, sdy = sigma_clipped_stats(dy[ok], sigma=3)
        rec = dict(pass_=k, n=len(g), n_cen=int(ok.sum()), mjd_mean=tm, jyear=mjd_to_jyear(tm),
                   mjd_min=float(min(p["mjd"] for p in g)), mjd_max=float(max(p["mjd"] for p in g)),
                   wl_min=float(min(p["wl"] for p in g)), wl_max=float(max(p["wl"] for p in g)),
                   pred_ra=float(pra[0]), pred_dec=float(pdec[0]),
                   cen_minus_pred_E=float(mx), cen_minus_pred_N=float(my),
                   err_E=float(sdx / np.sqrt(ok.sum())), err_N=float(sdy / np.sqrt(ok.sum())), scatter_E=float(sdx), scatter_N=float(sdy),
                   stack_cen_minus_pred_E=float(-(sx - gx) * PIX), stack_cen_minus_pred_N=float((sy - gy) * PIX),
                   stack_snr=float(snr), peak_median=float(np.median([p["peak"] for p in g])),
                   exposures_with_nan_within_3px=int(sum(p["nan_near"] > 0 for p in g)))
        out["passes"].append(rec)
        frames[k] = (st, gx, gy, rec)
        print(f"pass {k}: n={len(g)} {rec['mjd_min']:.1f}-{rec['mjd_max']:.1f} wl {rec['wl_min']:.3f}-{rec['wl_max']:.3f} "
              f"cen-pred E {mx:+.2f}+-{rec['err_E']:.2f} N {my:+.2f}+-{rec['err_N']:.2f} (scatter {sdx:.2f},{sdy:.2f}) "
              f"stack cen-pred E {rec['stack_cen_minus_pred_E']:+.2f} N {rec['stack_cen_minus_pred_N']:+.2f} SNR {snr:.0f}", flush=True)
    # measured motion between passes (per-exposure means) vs predicted
    ps = out["passes"]
    out["motion"] = []
    for a, b in list(zip(ps[:-1], ps[1:])) + [(ps[0], ps[-1])]:
        pdE = (b["pred_ra"] - a["pred_ra"]) * np.cos(np.radians(a["pred_dec"])) * 3600
        pdN = (b["pred_dec"] - a["pred_dec"]) * 3600
        mE = pdE + b["cen_minus_pred_E"] - a["cen_minus_pred_E"]
        mN = pdN + b["cen_minus_pred_N"] - a["cen_minus_pred_N"]
        out["motion"].append(dict(a=a["pass_"], b=b["pass_"], pred_E=pdE, pred_N=pdN, meas_E=mE, meas_N=mN,
                                  err_E=float(np.hypot(a["err_E"], b["err_E"])), err_N=float(np.hypot(a["err_N"], b["err_N"]))))
        print(f"motion pass {a['pass_']}->{b['pass_']}: measured E {mE:+.2f} N {mN:+.2f}, predicted E {pdE:+.2f} N {pdN:+.2f}", flush=True)
    # astrometric control: bright compact field sources, same per-exposure centroid
    allst = med_stack([p["grid"] for p in P])
    cx0, cy0 = (n - 1) / 2, (n - 1) / 2
    stars = find_field_stars(allst, gw, [(cx0, cy0)], 3, min_sep_px=20, edge_px=8)
    used = 0
    for sra, sdec in stars:
        offs = []
        for p in P:
            x, y = map(float, p["wcs"].all_world2pix([[sra, sdec]], 0)[0])
            if not (3 <= x < p["img"].shape[1] - 3 and 3 <= y < p["img"].shape[0] - 3):
                offs.append((p["pass"], np.nan, np.nan)); continue
            c = native_centroid(p["img"], x, y)
            if not np.isfinite(c[0]):
                offs.append((p["pass"], np.nan, np.nan)); continue
            dx, dy, _, _ = sky_offset(p["wcs"], *c, sra, sdec)
            offs.append((p["pass"], dx, dy))
        offs = np.array(offs, float)
        if np.isfinite(offs[:, 1]).sum() < 0.8 * len(P):
            continue
        rec = dict(ra=float(sra), dec=float(sdec), per_pass=[])
        for k in sorted(set(lab)):
            s = offs[(offs[:, 0] == k) & np.isfinite(offs[:, 1])]
            _, mx, sx_ = sigma_clipped_stats(s[:, 1], sigma=3); _, my, sy_ = sigma_clipped_stats(s[:, 2], sigma=3)
            rec["per_pass"].append(dict(pass_=k, n=len(s), E=float(mx), N=float(my), scatter_E=float(sx_), scatter_N=float(sy_)))
        out["refstars"].append(rec)
        print("refstar", f"{sra:.5f},{sdec:.5f}", " ".join(f"p{q['pass_']}:({q['E']:+.2f},{q['N']:+.2f})" for q in rec["per_pass"]), flush=True)
        used += 1
        if used == 3:
            break
    # eps Ind A location
    afx = np.array([p["A_file_px"] for p in P])
    out["epsIndA"] = dict(file_px_x_range=[float(afx[:, 0].min()), float(afx[:, 0].max())],
                          file_px_y_range=[float(afx[:, 1].min()), float(afx[:, 1].max())],
                          n_on_detector=int(((afx >= 0) & (afx < 2040)).all(1).sum()),
                          sep_rows_from_B=[float(np.min(np.abs(afx[:, 1] - np.array([p["py"] + 0 for p in P])))), None])
    out["exposures"] = [{k: p[k] for k in ["uri", "mjd", "wl", "bw", "pass", "cdx", "cdy", "peak", "nan_near", "x", "y", "bkg"]} for p in P]
    # figures: contact sheet (zoom +-45") and centroid track
    ks = sorted(frames)
    fig, axes = plt.subplots(1, len(ks) + 1, figsize=(2.3 * (len(ks) + 1), 2.6))
    h = 15; c = (n - 1) // 2
    for i, k in enumerate(ks):
        st, gx, gy, rec = frames[k]
        show(axes[i], st[c - h:c + h + 1, c - h:c + h + 1], "bright",
             f"pass {k} n={rec['n']}\n{rec['jyear']:.2f} {rec['wl_min']:.2f}-{rec['wl_max']:.2f} um",
             [(gx - c + h, gy - c + h, "red")])
    d = frames[ks[-1]][0] - frames[ks[0]][0]
    show(axes[-1], d[c - h:c + h + 1, c - h:c + h + 1], "diff", f"pass {ks[-1]} - pass {ks[0]}",
         [(frames[ks[0]][1] - c + h, frames[ks[0]][2] - c + h, "blue"), (frames[ks[-1]][1] - c + h, frames[ks[-1]][2] - c + h, "red")])
    fig.suptitle("eps Ind B, D2 (1.1-1.6 um), per-pass median stacks, 3\"/px, N up E left, +-45\"; red = predicted", fontsize=8)
    fig.tight_layout(); fig.savefig(os.path.join(imgdir, "exp09_epsindb_passes.png"), dpi=140); plt.close(fig)
    # track: absolute sky offsets relative to the 2025.4 prediction
    r0, d0 = EPS_IND_B[2025.4]; cosd = np.cos(np.radians(d0))
    fig, ax = plt.subplots(1, 2, figsize=(9, 4))
    tt = np.linspace(mjd_to_jyear(mj.min()) - 0.05, mjd_to_jyear(mj.max()) + 0.05, 200)
    trA, trD = eps_pred((tt - 2000.0) * 365.25 + 51544.5)
    ax[0].plot((trA - r0) * cosd * 3600, (trD - d0) * 3600, "-", color="0.6", lw=1, label="predicted track")
    for e, (a_, b_) in EPS_IND_B.items():
        ax[0].plot((a_ - r0) * cosd * 3600, (b_ - d0) * 3600, "k+", ms=8)
        ax[0].annotate(str(e), ((a_ - r0) * cosd * 3600, (b_ - d0) * 3600), fontsize=7, xytext=(3, 3), textcoords="offset points")
    xe = np.array([(p["cra"] - r0) * cosd * 3600 for p in P]); ye = np.array([(p["cdec"] - d0) * 3600 for p in P])
    ax[0].scatter(xe, ye, s=5, c=[p["pass"] for p in P], cmap="viridis", alpha=0.5, label="per exposure")
    for rec in ps:
        X = (rec["pred_ra"] - r0) * cosd * 3600 + rec["cen_minus_pred_E"]; Y = (rec["pred_dec"] - d0) * 3600 + rec["cen_minus_pred_N"]
        ax[0].errorbar(X, Y, xerr=rec["err_E"], yerr=rec["err_N"], fmt="o", color="C3", ms=4)
        ax[0].annotate(f"p{rec['pass_']}", (X, Y), fontsize=7, color="C3", xytext=(4, -8), textcoords="offset points")
    ax[0].set_xlabel("East offset from 2025.4 prediction (\")"); ax[0].set_ylabel("North offset (\")")
    ax[0].invert_xaxis(); ax[0].set_aspect("equal", "datalim"); ax[0].legend(fontsize=7)
    ax[0].set_xlim(8, -8); ax[0].set_ylim(-8, 6)
    ax[0].set_title("measured (red = pass mean +- err) vs predicted", fontsize=8)
    ax[1].scatter([mjd_to_jyear(p["mjd"]) for p in P], [p["cdx"] for p in P], s=6, label="E")
    ax[1].scatter([mjd_to_jyear(p["mjd"]) for p in P], [p["cdy"] for p in P], s=6, label="N")
    ax[1].axhline(0, color="k", lw=0.5); ax[1].set_ylim(-6, 6)
    ax[1].set_xlabel("year"); ax[1].set_ylabel("centroid - predicted (\")"); ax[1].legend(fontsize=7)
    ax[1].set_title("per-exposure residuals (1 native px = 6.15\")", fontsize=8)
    fig.tight_layout(); fig.savefig(os.path.join(imgdir, "exp09_epsindb_track.png"), dpi=140); plt.close(fig)
    # wider view toward eps Ind A for contamination (full band width, all-exposure median, native)
    json.dump(out, open(outp, "w"), indent=1, default=float)
    print("wrote", outp)
    return P


# ------------------------------------------------------------------ R Dra header survey
def rdra_headers(datadir, outp):
    """Header-only reads (request A, 34,560 B) for every D6 and D4 exposure + one request C per
    detector (the WCS-WAVE grid is a per-detector calibration, checked identical on 3 files)."""
    res = {}
    for det in ["D6", "D4"]:
        rows = list(csv.DictReader(open(os.path.join(datadir, "tap", f"rdra_{det}.csv"))))
        cache = os.path.join(datadir, "hdr_rdra"); os.makedirs(cache, exist_ok=True)
        waves = []
        for r in [rows[0], rows[len(rows) // 2], rows[-1]]:
            waves.append(R.read_wave(R.s3_url(r["uri"]), []))
        same = all(np.array_equal(waves[0][2], w[2]) for w in waves[1:])
        def one(r):
            path = os.path.join(cache, os.path.basename(r["uri"]) + ".hdr")
            log = []
            try:
                if os.path.exists(path):
                    from astropy.io import fits
                    hdr = fits.Header.fromstring(open(path).read())
                else:
                    hdr, off = R.read_head(R.s3_url(r["uri"]), log)
                    open(path, "w").write(hdr.tostring())
                x, y = map(float, WCS(hdr).all_world2pix([[*R_DRA]], 0)[0])
                wl, bw = R.wave_at(hdr, waves[0], x, y)
                return dict(uri=r["uri"], mjd=float(hdr["MJD-AVG"]), x=x, y=y, wl=wl, bw=bw, log=log)
            except Exception as e:
                return dict(uri=r["uri"], error=repr(e)[:150], log=log)
        with ThreadPoolExecutor(max_workers=8) as ex:
            res[det] = dict(wave_grid_identical_on_3=same, exposures=list(ex.map(one, rows)))
        ok = [e for e in res[det]["exposures"] if "error" not in e]
        print(f"R Dra {det}: {len(ok)}/{len(rows)} headers, wave grid identical on 3 files: {same}", flush=True)
        # best +-0.02 um window: maximise distinct days, then exposures
        wl = np.array([e["wl"] for e in ok]); day = np.array([int(e["mjd"]) for e in ok])
        inside = np.array([(0 <= e["x"] < 2040) and (0 <= e["y"] < 2040) for e in ok])
        best = None
        for c in np.arange(wl.min(), wl.max(), 0.005):
            m = inside & (np.abs(wl - c) <= 0.02)
            score = (len(set(day[m])), int(m.sum()))
            if best is None or score > best[0]:
                best = (score, float(c))
        res[det]["best_window"] = dict(centre=best[1], n_days=best[0][0], n_exp=best[0][1])
        print(f"  best window {best[1]:.3f} +- 0.02 um: {best[0][1]} exposures on {best[0][0]} days", flush=True)
    json.dump(res, open(outp, "w"), indent=1, default=float)


# ------------------------------------------------------------------ variable-star photometry
def wing_photometry(P, ra, dec, gw, n, rmax_nan, label):
    """Shared by RW Aur and R Dra: r_core rule, wing annulus, field-star normalisation."""
    rc = float(np.percentile([nan_radius(p, rmax_nan) for p in P], 95))
    rin, rout, bin_, bout = rc + 2, rc + 5, rc + 8, rc + 12
    print(f"{label}: r_core(95%) = {rc:.2f} px -> wing annulus {rin:.1f}-{rout:.1f} px, bkg {bin_:.1f}-{bout:.1f}", flush=True)
    for p in P:
        p["wing"], p["wing_ffrac"] = ann_flux(p["img"], p["x"], p["y"], rin, rout, bin_, bout)
        p["nan_r"] = nan_radius(p, rmax_nan)
    allst = med_stack([p["grid"] for p in P])
    c0 = (n - 1) / 2
    cands = find_field_stars(allst, gw, [(c0, c0)], 5, min_sep_px=20, edge_px=7)
    stars = []
    for sra, sdec in cands:
        fl = []
        okall = True
        for p in P:
            x, y = map(float, p["wcs"].all_world2pix([[sra, sdec]], 0)[0])
            if not (9 <= x < p["img"].shape[1] - 9 and 9 <= y < p["img"].shape[0] - 9):
                fl.append(np.nan); continue
            core = p["img"][int(round(y)) - 2:int(round(y)) + 3, int(round(x)) - 2:int(round(x)) + 3]
            if not np.isfinite(core).all():
                okall = False; break
            f, ff = ann_flux(p["img"], x, y, 0, 2.5, 5, 8)
            fl.append(f if ff > 0.99 else np.nan)
        fl = np.array(fl) if okall else None
        if fl is None or np.isfinite(fl).sum() < 0.8 * len(P) or np.nanmedian(fl) <= 0:
            continue
        stars.append(dict(ra=float(sra), dec=float(sdec), flux=fl, median=float(np.nanmedian(fl))))
        if len(stars) == 5:
            break
    norm = np.nanmedian(np.array([s["flux"] / s["median"] for s in stars]), 0) if stars else np.full(len(P), np.nan)
    for p, nm in zip(P, norm):
        p["field_norm"] = float(nm)
        p["wing_norm"] = p["wing"] / nm if p["wing_ffrac"] >= 0.95 else np.nan
    print(f"{label}: {len(stars)} field stars, median fluxes " + ", ".join(f"{s['median']:.1f}" for s in stars), flush=True)
    return dict(r_core=rc, annulus=[rin, rout], bkg=[bin_, bout],
                field_stars=[dict(ra=s["ra"], dec=s["dec"], median=s["median"],
                                  scatter_frac=float(np.nanstd(s["flux"] / s["median"]))) for s in stars]), allst


def describe_core(P, rmax):
    return dict(nan_radius_px_median=float(np.median([nan_radius(p, rmax) for p in P])),
                nan_radius_px_max=float(np.max([nan_radius(p, rmax) for p in P])),
                n_nan_within_rmax_median=float(np.median([int((~np.isfinite(p["img"][max(int(p["y"]) - rmax, 0):int(p["y"]) + rmax + 1,
                                                                                  max(int(p["x"]) - rmax, 0):int(p["x"]) + rmax + 1])).sum()) for p in P])),
                peak_finite_median=float(np.median([np.nanmax(p["img"][max(int(p["y"]) - rmax, 0):int(p["y"]) + rmax + 1,
                                                                     max(int(p["x"]) - rmax, 0):int(p["x"]) + rmax + 1]) for p in P])))


def rwaur(datadir, imgdir, outp):
    ra, dec = RW_AUR
    frs = load_all(datadir, "rwaur", "D2", ra, dec, half=30)
    P = [prep(fr, ra, dec, half=30) for fr in frs]
    lab = passes_of(np.array([p["mjd"] for p in P]))
    for p, l in zip(P, lab):
        p["pass"] = int(l)
    n = 81; gw = grid_wcs(ra, dec, n)
    for p in P:
        p["grid"] = regrid(p, gw, n)
    out = dict(core=describe_core(P, 12))
    phot, allst = wing_photometry(P, ra, dec, gw, n, 12, "RW Aur")
    out.update(phot)
    # matched-wavelength comparison
    bins = np.arange(1.08, 1.70, 0.03)
    ks = sorted(set(lab))
    tab = []
    for i in range(len(bins) - 1):
        row = dict(lo=float(bins[i]), hi=float(bins[i + 1]))
        for k in ks:
            v = [p["wing_norm"] for p in P if p["pass"] == k and bins[i] <= p["wl"] < bins[i + 1] and np.isfinite(p["wing_norm"])]
            row[f"p{k}"] = float(np.mean(v)) if v else np.nan
            row[f"n{k}"] = len(v)
        tab.append(row)
    out["wl_bins"] = tab
    out["ratios"] = {}
    for k in ks[1:]:
        r = np.array([t[f"p{k}"] / t[f"p{ks[0]}"] for t in tab if np.isfinite(t[f"p{k}"]) and np.isfinite(t[f"p{ks[0]}"])])
        out["ratios"][f"p{k}/p{ks[0]}"] = dict(n_bins=len(r), median=float(np.median(r)) if len(r) else np.nan,
                                              mean=float(np.mean(r)) if len(r) else np.nan, std=float(np.std(r)) if len(r) else np.nan,
                                              sem=float(np.std(r) / np.sqrt(len(r))) if len(r) > 1 else np.nan,
                                              dmag=float(-2.5 * np.log10(np.median(r))) if len(r) else np.nan)
        print(f"RW Aur pass {k}/pass {ks[0]}: {out['ratios'][f'p{k}/p{ks[0]}']}", flush=True)
    # control: same ratio for field star 0 against the others (should be 1)
    out["passes"] = [dict(pass_=k, n=int((lab == k).sum()), mjd_min=float(min(p["mjd"] for p in P if p["pass"] == k)),
                          mjd_max=float(max(p["mjd"] for p in P if p["pass"] == k)),
                          n_wing_ok=int(sum(np.isfinite(p["wing_norm"]) for p in P if p["pass"] == k))) for k in ks]
    out["exposures"] = [{k: p[k] for k in ["uri", "mjd", "wl", "pass", "wing", "wing_ffrac", "field_norm", "wing_norm", "nan_r", "bkg"]} for p in P]
    # figures
    fig, axes = plt.subplots(1, len(ks), figsize=(2.6 * len(ks), 2.8))
    for i, k in enumerate(ks):
        st = med_stack([p["grid"] for p in P if p["pass"] == k])
        c = (n - 1) // 2; h = 20
        show(axes[i], st[c - h:c + h + 1, c - h:c + h + 1], "bright", f"RW Aur pass {k} n={(lab == k).sum()}", [(h, h, "red")])
    fig.suptitle("RW Aur D2 per-pass median stacks, 3\"/px, +-60\", N up", fontsize=8)
    fig.tight_layout(); fig.savefig(os.path.join(imgdir, "exp09_rwaur_passes.png"), dpi=140); plt.close(fig)
    fig, ax = plt.subplots(1, 2, figsize=(10, 4))
    for k in ks:
        g = [p for p in P if p["pass"] == k]
        ax[0].plot([p["wl"] for p in g], [p["wing_norm"] for p in g], "o", ms=4, label=f"pass {k} ({mjd_to_jyear(np.mean([p['mjd'] for p in g])):.2f})")
    ax[0].set_xlabel("wavelength at target (um)"); ax[0].set_ylabel("wing-annulus flux / field-star norm"); ax[0].legend(fontsize=7)
    ax[0].set_title(f"RW Aur wing annulus {phot['annulus'][0]:.1f}-{phot['annulus'][1]:.1f} px", fontsize=8)
    mids = [(t["lo"] + t["hi"]) / 2 for t in tab]
    for k in ks[1:]:
        ax[1].plot(mids, [t[f"p{k}"] / t[f"p{ks[0]}"] for t in tab], "o-", ms=4, label=f"pass {k} / pass {ks[0]}")
    ax[1].axhline(1, color="k", lw=0.5); ax[1].set_xlabel("wavelength bin (um)"); ax[1].set_ylabel("ratio"); ax[1].legend(fontsize=7)
    ax[1].set_title("matched-wavelength ratio (0.03 um bins)", fontsize=8)
    fig.tight_layout(); fig.savefig(os.path.join(imgdir, "exp09_rwaur_wavelength_match.png"), dpi=140); plt.close(fig)
    json.dump(out, open(outp, "w"), indent=1, default=float)


def rdra(datadir, imgdir, outp, det, lo, hi, nmax, hdrjson):
    ra, dec = R_DRA
    H = json.load(open(hdrjson))[det]["exposures"]
    sel = [e for e in H if "error" not in e and lo <= e["wl"] <= hi and 0 <= e["x"] < 2040 and 0 <= e["y"] < 2040]
    sel.sort(key=lambda e: e["mjd"])
    if len(sel) > nmax:  # keep the time spread: evenly spaced in index
        sel = [sel[i] for i in np.linspace(0, len(sel) - 1, nmax).astype(int)]
    frs = load_all(datadir, "rdra", det, ra, dec, half=40, uris=[e["uri"] for e in sel])
    P = [prep(fr, ra, dec, half=40) for fr in frs]
    n = 101; gw = grid_wcs(ra, dec, n)
    for p in P:
        p["grid"] = regrid(p, gw, n)
    out = dict(det=det, window=[lo, hi], n_selected=len(sel), core=describe_core(P, 25))
    phot, allst = wing_photometry(P, ra, dec, gw, n, 25, "R Dra")
    out.update(phot)
    mj = np.array([p["mjd"] for p in P]); wn = np.array([p["wing_norm"] for p in P]); wr = np.array([p["wing"] for p in P])
    ok = np.isfinite(wn) & (wn > 0)
    out["n_ok"] = int(ok.sum()); out["n_days"] = int(len(set(mj[ok].astype(int))))
    # sinusoid fit, period fixed at 246 d and free (grid), in magnitudes
    def fit(P_):
        A = np.vstack([np.ones(ok.sum()), np.sin(2 * np.pi * mj[ok] / P_), np.cos(2 * np.pi * mj[ok] / P_)]).T
        m = -2.5 * np.log10(wn[ok])
        c, *_ = np.linalg.lstsq(A, m, rcond=None)
        res = m - A @ c
        return c, float(np.std(res)), m
    if ok.sum() > 5:
        c246, s246, m = fit(246.0)
        grid = np.arange(100, 600, 1.0)
        chi = [fit(q)[1] for q in grid]
        out["fit246"] = dict(semi_amp_mag=float(np.hypot(c246[1], c246[2])), full_amp_mag=float(2 * np.hypot(c246[1], c246[2])), resid_rms_mag=s246)
        out["best_period"] = float(grid[int(np.argmin(chi))]); out["best_resid"] = float(min(chi))
        out["raw_rms_mag"] = float(np.std(m)); out["mag_range"] = [float(m.min()), float(m.max())]
        # nightly scatter: rms about the daily mean for days with >= 2 exposures
        d = mj[ok].astype(int); dev = []
        for dd in set(d):
            mm = m[d == dd]
            if len(mm) >= 2:
                dev += list(mm - mm.mean())
        out["within_day_rms_mag"] = float(np.std(dev)) if dev else np.nan
        out["field_norm_rms"] = float(np.nanstd([p["field_norm"] for p in P]))
        print(f"R Dra: n_ok {ok.sum()} on {out['n_days']} days; fit P=246: full amp {out['fit246']['full_amp_mag']:.3f} mag, resid {s246:.3f}; "
              f"best P {out['best_period']:.0f} d (resid {out['best_resid']:.3f}); raw rms {out['raw_rms_mag']:.3f}; within-day rms {out['within_day_rms_mag']:.3f}", flush=True)
    out["exposures"] = [{k: p[k] for k in ["uri", "mjd", "wl", "wing", "wing_ffrac", "field_norm", "wing_norm", "nan_r", "bkg"]} for p in P]
    # figures: contact sheet of 6 exposures spread in time, and light curve
    idx = np.linspace(0, len(P) - 1, 6).astype(int)
    fig, axes = plt.subplots(1, 6, figsize=(14, 2.8))
    for a, i in zip(axes, idx):
        p = P[i]; c = (n - 1) // 2; h = 35
        show(a, p["grid"][c - h:c + h + 1, c - h:c + h + 1], "bright", f"MJD {p['mjd']:.0f} {p['wl']:.3f} um", [(h, h, "red")])
        for r_ in phot["annulus"]:
            a.add_patch(plt.Circle((h, h), r_ * NATIVE / PIX, fill=False, color="cyan", lw=0.6))
    fig.suptitle(f"R Dra {det}, single exposures at {lo:.3f}-{hi:.3f} um, 3\"/px, +-105\"; cyan = wing annulus; white/NaN = saturated", fontsize=8)
    fig.tight_layout(); fig.savefig(os.path.join(imgdir, "exp09_rdra_frames.png"), dpi=140); plt.close(fig)
    fig, ax = plt.subplots(2, 1, figsize=(9, 6), sharex=True)
    ax[0].plot(mj[ok], -2.5 * np.log10(wn[ok]), "o", ms=3, label="wing / field norm")
    if ok.sum() > 5:
        tt = np.linspace(mj.min(), mj.max(), 500)
        ax[0].plot(tt, c246[0] + c246[1] * np.sin(2 * np.pi * tt / 246) + c246[2] * np.cos(2 * np.pi * tt / 246), "-", color="C3", lw=1, label="P = 246 d fit")
    ax[0].invert_yaxis(); ax[0].set_ylabel("-2.5 log10(normalised wing flux)"); ax[0].legend(fontsize=7)
    ax[0].set_title(f"R Dra {det} {lo:.3f}-{hi:.3f} um, wing annulus {phot['annulus'][0]:.1f}-{phot['annulus'][1]:.1f} native px", fontsize=8)
    okr = np.isfinite(wr) & (wr > 0)
    ax[1].plot(mj[okr], -2.5 * np.log10(wr[okr] / np.nanmedian(wr[okr])), "o", ms=3, color="C1", label="raw wing (no field norm)")
    ax[1].plot(mj, -2.5 * np.log10(np.array([p["field_norm"] for p in P])), "x", ms=3, color="C2", label="field-star norm")
    ax[1].invert_yaxis(); ax[1].set_xlabel("MJD"); ax[1].set_ylabel("mag"); ax[1].legend(fontsize=7)
    fig.tight_layout(); fig.savefig(os.path.join(imgdir, "exp09_rdra_lightcurve.png"), dpi=140); plt.close(fig)
    json.dump(out, open(outp, "w"), indent=1, default=float)


if __name__ == "__main__":
    cmd = sys.argv[1]
    if cmd == "epsindb":
        epsindb(*sys.argv[2:5])
    elif cmd == "rdra_headers":
        rdra_headers(*sys.argv[2:4])
    elif cmd == "rdra":
        d, img, o, det, lo, hi, nmax, hj = sys.argv[2:10]
        rdra(d, img, o, det, float(lo), float(hi), int(nmax), hj)
    elif cmd == "rwaur":
        rwaur(*sys.argv[2:5])
