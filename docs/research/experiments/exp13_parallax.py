"""Experiment 13: is the parallax of Epsilon Indi B (and WISE 0855, Barnard's Star) measurable in SPHEREx data?

usage:
  python -B -I exp13_parallax.py check                               parallax factors vs det08 full propagation
  python -B -I exp13_parallax.py epsindb <cache dir> <out dir>        93 cached D2 bands (exp09), fits, figures, JSON
  python -B -I exp13_parallax.py others <out dir>                     WISE 0855 + Barnard from det08 per-pass centroids
<cache dir> = scratchpad/w9/data/cache_epsindb; <out dir> = docs/research/experiments (img/ under it).
Method, outlier rule and model are pre-registered in 13-parallax-distance-feasibility.md, section 0.
Run with: uv run --with astropy --with numpy --with scipy --with matplotlib python -B -I exp13_parallax.py ...
"""
import sys
sys.dont_write_bytecode = True  # no __pycache__ in the repo
import glob, json, os, warnings
import numpy as np
import astropy.units as u
from astropy.io import fits
from astropy.time import Time
from astropy.wcs import WCS, FITSFixedWarning
from astropy.stats import sigma_clipped_stats
from astropy.coordinates import get_body_barycentric
from scipy.ndimage import maximum_filter
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt

warnings.simplefilter("ignore", FITSFixedWarning)
warnings.filterwarnings("ignore", message=".*SIP.*")
import logging; logging.getLogger("astropy").setLevel(logging.ERROR)
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)

NATIVE = 6.15
T0 = 2026.0
# exp09 prediction nodes (geocentric, from note 06); used only as the centroid start point
NODES = {2025.4: (331.095601, -56.800231), 2025.9: (331.096356, -56.800600),
         2026.4: (331.097623, -56.800916), 2026.9: (331.098378, -56.801285)}
REF = NODES[2025.9]
LIT = dict(epsindb=dict(plx_mas=274.84, plx_note="eps Ind A, Gaia DR3 (brief: 274.8 mas, 3.64 pc)",
                        plx_B_gaia_mas=270.66, plx_B_note="eps Ind B photocentre, Gaia DR3, RUWE 4.3 (note 06)",
                        pmE_mas_yr=3981.98, pmN_mas_yr=-2466.83, pm_note="eps Ind B, Gaia DR3 (note 06)"),
           w0855=dict(plx_mas=439.0, pmE_mas_yr=-8123.0, pmN_mas_yr=673.0, note="Kirkpatrick 2021 / det08"),
           barnard=dict(plx_mas=546.98, pmE_mas_yr=-801.55, pmN_mas_yr=10362.39, note="Gaia DR3 (note 06)"))


def jyear(mjd):
    return 2000.0 + (np.asarray(mjd, float) - 51544.5) / 365.25


def plx_factors(mjd, ra, dec):
    """Geocentric parallax factors (fE along RA*cos(dec), fN), Earth barycentric position in AU."""
    e = get_body_barycentric("earth", Time(np.atleast_1d(mjd), format="mjd", scale="tdb"))
    X, Y, Z = (np.asarray(c.to_value(u.au)) for c in (e.x, e.y, e.z))
    a, d = np.radians(ra), np.radians(dec)
    return X * np.sin(a) - Y * np.cos(a), X * np.cos(a) * np.sin(d) + Y * np.sin(a) * np.sin(d) - Z * np.cos(d)


def to_EN(ra, dec, ref):
    return (np.asarray(ra) - ref[0]) * np.cos(np.radians(ref[1])) * 3600, (np.asarray(dec) - ref[1]) * 3600


def design(t, fE, fN, with_plx=True, fix_pm=None):
    """Rows: E block then N block. Columns: E0, N0, muE, muN, plx (fix_pm: E0, N0, plx)."""
    n = len(t); z = np.zeros(n); o = np.ones(n); dt = t - T0
    cols = [np.r_[o, z], np.r_[z, o]]
    if fix_pm is None:
        cols += [np.r_[dt, z], np.r_[z, dt]]
    if with_plx:
        cols.append(np.r_[fE, fN])
    return np.array(cols).T


def wlsq(t, E, N, sE, sN, fE, fN, with_plx=True, fix_pm=None):
    A = design(t, fE, fN, with_plx, fix_pm)
    y = np.r_[E, N]
    if fix_pm is not None:
        y = y - np.r_[fix_pm[0] * (t - T0), fix_pm[1] * (t - T0)]
    w = 1 / np.r_[sE, sN]
    p, *_ = np.linalg.lstsq(A * w[:, None], y * w, rcond=None)
    r = (y - A @ p) * w
    cov = np.linalg.inv((A * w[:, None]).T @ (A * w[:, None]))
    return p, float(r @ r), len(y) - len(p), cov


def unpack(p, fix_pm=None):
    if fix_pm is None:
        return dict(E0=p[0], N0=p[1], muE=p[2], muN=p[3], plx=p[4] if len(p) > 4 else 0.0)
    return dict(E0=p[0], N0=p[1], muE=fix_pm[0], muN=fix_pm[1], plx=p[2] if len(p) > 2 else 0.0)


def derived(plx_as, muE, muN):
    d = 1.0 / plx_as
    mu = np.hypot(muE, muN)
    return d, mu, 4.74 * mu * d


def fit_report(t, E, N, sE, sN, fE, fN, lab=None, nboot=0, seed=13, fix_pm=None):
    """PM-only vs PM+plx, formal / bootstrap / leave-one-pass-out errors."""
    p0, c0, n0, _ = wlsq(t, E, N, sE, sN, fE, fN, with_plx=False, fix_pm=fix_pm)
    p1, c1, n1, cov = wlsq(t, E, N, sE, sN, fE, fN, with_plx=True, fix_pm=fix_pm)
    k = 2 if fix_pm is not None else 4
    out = dict(n_points=len(t), chi2_pm_only=c0, dof_pm_only=n0, chi2_pm_plx=c1, dof_pm_plx=n1,
               dchi2=c0 - c1, fit=unpack(p1, fix_pm), fit_pm_only=unpack(p0, fix_pm))
    scale = max(1.0, np.sqrt(c1 / n1)) if n1 > 0 else np.nan
    out["plx_err_formal"] = float(np.sqrt(cov[k, k]) * scale)
    out["formal_scale"] = float(scale)
    if fix_pm is None:
        out["muE_err_formal"] = float(np.sqrt(cov[2, 2]) * scale); out["muN_err_formal"] = float(np.sqrt(cov[3, 3]) * scale)
    errs = [out["plx_err_formal"]]
    if nboot:
        rng = np.random.default_rng(seed)
        B = []
        for _ in range(nboot):
            i = rng.integers(0, len(t), len(t))
            pb, *_ = wlsq(t[i], E[i], N[i], sE[i], sN[i], fE[i], fN[i], fix_pm=fix_pm)
            q = unpack(pb, fix_pm); d, mu, v = derived(q["plx"], q["muE"], q["muN"])
            B.append([q["plx"], q["muE"], q["muN"], d, v])
        B = np.array(B)
        pc = lambda c: [float(x) for x in np.percentile(B[:, c], [16, 50, 84])]
        out["boot"] = dict(n=nboot, plx_std=float(B[:, 0].std()), plx_p16_50_84=pc(0), muE_std=float(B[:, 1].std()),
                           muN_std=float(B[:, 2].std()), dist_pc_p16_50_84=pc(3), vtan_kms_p16_50_84=pc(4))
        errs.append(out["boot"]["plx_std"])
    if lab is not None and len(set(lab)) > 2:
        J = []
        for kk in sorted(set(lab)):
            m = lab != kk
            try:
                pj, cj, nj, covj = wlsq(t[m], E[m], N[m], sE[m], sN[m], fE[m], fN[m], fix_pm=fix_pm)
            except np.linalg.LinAlgError:
                continue
            if nj < 0:
                continue
            q = unpack(pj, fix_pm)
            J.append(dict(left_out=int(kk), plx=q["plx"], muE=q["muE"], muN=q["muN"], chi2=cj, dof=nj,
                          plx_err_formal=float(np.sqrt(covj[k, k]))))
        out["loo"] = J
        if len(J) == len(set(lab)):
            v = np.array([j["plx"] for j in J]); nj = len(v)
            out["plx_err_jackknife"] = float(np.sqrt((nj - 1) / nj * ((v - v.mean()) ** 2).sum()))
            errs.append(out["plx_err_jackknife"])
    out["plx_err_max"] = float(max(errs))
    out["significance"] = float(out["fit"]["plx"] / out["plx_err_max"])
    d, mu, vt = derived(out["fit"]["plx"], out["fit"]["muE"], out["fit"]["muN"])
    out["distance_pc"] = float(d); out["mu_total_as_yr"] = float(mu); out["vtan_kms"] = float(vt)
    # first-order error propagation with the largest parallax error (mu error is negligible here)
    out["distance_err_pc"] = float(d * out["plx_err_max"] / out["fit"]["plx"])
    out["vtan_err_kms"] = float(vt * out["plx_err_max"] / out["fit"]["plx"])
    return out


# ------------------------------------------------------------------ checks
def check():
    from det08_targets import predict
    # pm = 0: with the real pm the 1 mas comparison star would move at 0.07 c and ERFA's light-time
    # terms (starpm) differ by 0.02 AU-equivalent; the parallax factors do not depend on pm anyway.
    p = dict(ra=331.0961, dec=-56.8006, pmra=0.0, pmdec=0.0, plx=271.0, rv=0.0,
             epoch=Time(2026.0, format="jyear", scale="tdb"))
    mj = np.linspace(60700, 61400, 15)
    r1, d1 = predict(None, mj, p)
    r0, d0 = predict(None, mj, dict(p, plx=1.0))  # ERFA overrides the distance for a near-zero parallax
    dE = (r1 - r0) * np.cos(np.radians(p["dec"])) * 3600; dN = (d1 - d0) * 3600
    fE, fN = plx_factors(mj, p["ra"], p["dec"])
    err = max(np.abs(dE / 0.270 - fE).max(), np.abs(dN / 0.270 - fN).max())
    print(f"parallax factors vs det08 full propagation: max |diff| = {err:.2e} (factor units, AU)")
    assert err < 2e-3, err
    # synthetic recovery: noise-free data from the model must return the inputs
    t = jyear(mj); s = np.full(len(t), 0.1)
    E = 1.0 + 3.98 * (t - T0) + 0.27 * fE; N = -2.0 - 2.47 * (t - T0) + 0.27 * fN
    q = wlsq(t, E, N, s, s, fE, fN)[0]
    assert np.allclose(q, [1.0, -2.0, 3.98, -2.47, 0.27], atol=1e-9), q
    print("synthetic recovery OK")
    return err


# ------------------------------------------------------------------ Epsilon Indi B
def node_pred(mjd):
    t = jyear(mjd); ep = np.array(sorted(NODES))
    ra = np.array([NODES[e][0] for e in ep]); de = np.array([NODES[e][1] for e in ep])
    i = int(np.clip(np.searchsorted(ep, t) - 1, 0, len(ep) - 2)); f = (t - ep[i]) / (ep[i + 1] - ep[i])
    return ra[i] + f * (ra[i + 1] - ra[i]), de[i] + f * (de[i + 1] - de[i])


def native_centroid(img, x, y, r=2.0, it=5):  # identical to exp09_targets.native_centroid
    yy, xx = np.indices(img.shape)
    for _ in range(it):
        m = (np.hypot(xx - x, yy - y) <= r) & np.isfinite(img)
        wgt = np.clip(img[m], 0, None)
        if wgt.sum() <= 0 or m.sum() < 9:
            return np.nan, np.nan
        x, y = (xx[m] * wgt).sum() / wgt.sum(), (yy[m] * wgt).sum() / wgt.sum()
    return float(x), float(y)


def passes_of(mjds, gap=20.0):  # identical to det08_analyze.passes_of
    order = np.argsort(mjds); lab = np.zeros(len(mjds), int); k = 0
    for i in range(1, len(order)):
        if mjds[order[i]] - mjds[order[i - 1]] > gap:
            k += 1
        lab[order[i]] = k
    return lab


def load_frames(cache):
    F = []
    for f in sorted(glob.glob(os.path.join(cache, "*.npz"))):
        z = np.load(f, allow_pickle=False)
        hdr = fits.Header.fromstring(str(z["hdr"])); band = z["band"]; y0 = int(z["y0"])
        w = WCS(hdr)
        x, _ = map(float, w.all_world2pix([[*REF]], 0)[0]); ix = int(round(x))
        x0, x1 = max(ix - 60, 0), min(ix + 60, 2039)
        img = band[:, x0:x1 + 1].astype(float)
        bw = w.slice((slice(y0, y0 + band.shape[0]), slice(x0, x1 + 1)))
        good = np.isfinite(img)
        _, med, sd = sigma_clipped_stats(img[good], sigma=3)
        F.append(dict(name=os.path.basename(f).split("_spx")[0], img=img - med, wcs=bw, mjd=float(hdr["MJD-AVG"]), sig=float(sd)))
    return F


def measure(img, w, ra, dec, edge=3):
    x, y = map(float, w.all_world2pix([[ra, dec]], 0)[0])
    if not (edge <= x < img.shape[1] - edge and edge <= y < img.shape[0] - edge):
        return np.nan, np.nan, x, y
    cx, cy = native_centroid(img, x, y)
    if not np.isfinite(cx) or not (edge <= cx < img.shape[1] - edge and edge <= cy < img.shape[0] - edge):
        return np.nan, np.nan, x, y
    r, d = w.all_pix2world([[cx, cy]], 0)[0]
    return float(r), float(d), cx, cy


def find_refstars(F, lab):
    """Pre-registered rule, section 0. Local maxima refined with the same centroid before clustering
    (pixel-level peaks scatter by up to 4" on the sky, so a 3" cluster radius needs refined positions)."""
    dets = []
    for k, fr in enumerate(F):
        img = fr["img"]; s = np.nan_to_num(img, nan=-np.inf)
        pk = (s == maximum_filter(s, size=5)) & np.isfinite(img) & (img > 15 * fr["sig"])
        bx, by = map(float, fr["wcs"].all_world2pix([[*REF]], 0)[0])
        for y, x in zip(*np.nonzero(pk)):
            if not 30 <= np.hypot(x - bx, y - by) * NATIVE <= 170:
                continue
            cx, cy = native_centroid(img, float(x), float(y))
            if not np.isfinite(cx):
                continue
            r, d = fr["wcs"].all_pix2world([[cx, cy]], 0)[0]
            dets.append((k, float(r), float(d), float(img[y, x])))
    cl = []  # each: list of (frame, ra, dec, peak)
    for det in dets:
        for c in cl:
            cr, cd = np.median([q[1] for q in c]), np.median([q[2] for q in c])
            if np.hypot((det[1] - cr) * np.cos(np.radians(cd)), det[2] - cd) * 3600 < 3:
                c.append(det); break
        else:
            cl.append([det])
    keep = []
    npass = len(set(lab))
    for c in cl:
        frames = {q[0] for q in c}
        if len(frames) < 0.7 * len(F) or len({lab[f] for f in frames}) < npass:
            continue
        if np.median([q[3] for q in c]) >= 100:
            continue
        keep.append(dict(ra=float(np.median([q[1] for q in c])), dec=float(np.median([q[2] for q in c])),
                         n_found=len(frames), peak=float(np.median([q[3] for q in c]))))
    iso = []
    for s in keep:
        if all(np.hypot((s["ra"] - o["ra"]) * np.cos(np.radians(s["dec"])), s["dec"] - o["dec"]) * 3600 >= 15
               for o in keep if o is not s):
            iso.append(s)
    return iso, len(cl)


def pass_line_sigma(t, v, lab):
    """Per pass: 1.4826 * MAD of residuals about a straight line in time (pre-registered error)."""
    s = np.zeros(len(t)); res = np.zeros(len(t))
    for k in set(lab):
        m = lab == k
        c = np.polyfit(t[m] - t[m].mean(), v[m], 1) if m.sum() > 2 else [0, v[m].mean()]
        r = v[m] - np.polyval(c, t[m] - t[m].mean())
        s[m] = 1.4826 * np.median(np.abs(r - np.median(r))); res[m] = r
    return s, res


def epsindb(cache, outdir):
    imgdir = os.path.join(outdir, "img")
    F = load_frames(cache)
    mj = np.array([f["mjd"] for f in F]); lab = passes_of(mj)
    ex09 = {os.path.basename(e["uri"]).split("_spx")[0]: e for e in json.load(open(os.path.join(HERE, "exp09_epsindb.json")))["exposures"]}
    rows = []
    for fr, l in zip(F, lab):
        pra, pdec = node_pred(fr["mjd"])
        px, py = map(float, fr["wcs"].all_world2pix([[pra, pdec]], 0)[0])
        cx, cy = native_centroid(fr["img"], px, py)
        ra = dec = np.nan
        if np.isfinite(cx):
            ra, dec = fr["wcs"].all_pix2world([[cx, cy]], 0)[0]
        ipx, ipy = int(round(px)), int(round(py))
        nan_near = int((~np.isfinite(fr["img"][ipy - 3:ipy + 4, ipx - 3:ipx + 4])).sum())
        e9 = ex09[fr["name"]]
        dE = (ra - pra) * np.cos(np.radians(pdec)) * 3600; dN = (dec - pdec) * 3600
        rows.append(dict(name=fr["name"], mjd=fr["mjd"], pass_=int(l), ra=float(ra), dec=float(dec), nan_near=nan_near,
                         wl=float(e9["wl"]), d_exp09=float(np.hypot(dE - e9["cdx"], dN - e9["cdy"]))))
    maxd = max(r["d_exp09"] for r in rows)
    print(f"reproduces exp09 per-exposure centroids: max difference {maxd:.2e}\"")
    assert maxd < 1e-3, maxd
    # reference stars and per-exposure frame shift
    stars, ncl = find_refstars(F, lab)
    print(f"reference stars: {len(stars)} kept of {ncl} clusters: " + ", ".join(f"({s['ra']:.5f},{s['dec']:.5f} pk {s['peak']:.1f} n {s['n_found']})" for s in stars))
    S = np.full((len(F), len(stars), 2), np.nan)
    for i, fr in enumerate(F):
        for j, s in enumerate(stars):
            r, d, _, _ = measure(fr["img"], fr["wcs"], s["ra"], s["dec"])
            if np.isfinite(r):
                S[i, j] = to_EN(r, d, (s["ra"], s["dec"]))
    S -= np.nanmedian(S, axis=0, keepdims=True)
    nstar = np.isfinite(S[:, :, 0]).sum(1)
    with warnings.catch_warnings():
        warnings.simplefilter("ignore")
        shift = np.nanmedian(S, axis=1)
    for r, sh, ns in zip(rows, shift, nstar):
        r["nstar"] = int(ns); r["shiftE"], r["shiftN"] = (float(sh[0]), float(sh[1])) if ns >= 3 else (np.nan, np.nan)
    # per-pass refstar means (diagnostic)
    star_pass = [[np.nanmean(S[lab == k, j], 0).tolist() for k in sorted(set(lab))] for j in range(len(stars))]
    t_all = jyear(mj)
    fE_all, fN_all = plx_factors(mj, *REF)
    E_abs, N_abs = to_EN([r["ra"] for r in rows], [r["dec"] for r in rows], REF)
    res = dict(n_exposures=len(F), reference_stars=stars, n_clusters=ncl, refstar_pass_means_EN=star_pass,
               exp09_reproduction_max_diff_arcsec=maxd, datasets={})
    keep_sets = {}
    for ds in ["DIFF", "ABS"]:
        E = E_abs - (np.array([r["shiftE"] for r in rows]) if ds == "DIFF" else 0)
        N = N_abs - (np.array([r["shiftN"] for r in rows]) if ds == "DIFF" else 0)
        ok = np.isfinite(E) & np.isfinite(N) & (np.array([r["nan_near"] for r in rows]) == 0)
        n_drop_basic = int((~ok).sum())
        idx = np.nonzero(ok)[0]
        sE, rE = pass_line_sigma(t_all[idx], E[idx], lab[idx]); sN, rN = pass_line_sigma(t_all[idx], N[idx], lab[idx])
        clip = (np.abs(rE) > 4 * sE) | (np.abs(rN) > 4 * sN)
        idx = idx[~clip]
        sE, _ = pass_line_sigma(t_all[idx], E[idx], lab[idx]); sN, _ = pass_line_sigma(t_all[idx], N[idx], lab[idx])
        t, l, fE, fN = t_all[idx], lab[idx], fE_all[idx], fN_all[idx]
        rep = fit_report(t, E[idx], N[idx], sE, sN, fE, fN, lab=l, nboot=2000)
        rep.update(n_dropped_basic=n_drop_basic, n_clipped=int(clip.sum()),
                   clipped=[rows[i]["name"] for i in np.nonzero(ok)[0][clip]],
                   sigma_per_pass={int(k): [float(sE[l == k][0]), float(sN[l == k][0])] for k in sorted(set(l))})
        # (a) pass means
        P = []
        for k in sorted(set(l)):
            m = l == k; n = m.sum()
            P.append([t[m].mean(), E[idx][m].mean(), N[idx][m].mean(), sE[m][0] / np.sqrt(n), sN[m][0] / np.sqrt(n), fE[m].mean(), fN[m].mean(), k])
        P = np.array(P)
        rep["pass_means"] = fit_report(P[:, 0], P[:, 1], P[:, 2], P[:, 3], P[:, 4], P[:, 5], P[:, 6], lab=P[:, 7].astype(int))
        rep["pass_mean_table"] = P.tolist()
        # (c) proper motion fixed to the literature
        lit = LIT["epsindb"]; fix = (lit["pmE_mas_yr"] / 1000, lit["pmN_mas_yr"] / 1000)
        rep["pm_fixed"] = fit_report(t, E[idx], N[idx], sE, sN, fE, fN, lab=l, nboot=2000, fix_pm=fix)
        rep["pm_fixed_pass_means"] = fit_report(P[:, 0], P[:, 1], P[:, 2], P[:, 3], P[:, 4], P[:, 5], P[:, 6], lab=P[:, 7].astype(int), fix_pm=fix)
        res["datasets"][ds] = rep
        keep_sets[ds] = dict(idx=idx, E=E[idx], N=N[idx], sE=sE, sN=sN, t=t, l=l, fE=fE, fN=fN, P=P)
        f = rep["fit"]
        print(f"{ds}: n={len(idx)} (dropped {n_drop_basic}, clipped {int(clip.sum())}); plx {f['plx']*1000:.1f} mas "
              f"formal {rep['plx_err_formal']*1000:.1f} boot {rep['boot']['plx_std']*1000:.1f} jack {rep.get('plx_err_jackknife', np.nan)*1000:.1f} "
              f"-> {rep['significance']:.1f} sigma; pm {f['muE']*1000:.0f}, {f['muN']*1000:.0f} mas/yr; chi2 {rep['chi2_pm_only']:.1f}/{rep['dof_pm_only']} -> "
              f"{rep['chi2_pm_plx']:.1f}/{rep['dof_pm_plx']}; d {rep['distance_pc']:.2f}+-{rep['distance_err_pc']:.2f} pc; v {rep['vtan_kms']:.1f}+-{rep['vtan_err_kms']:.1f} km/s")
        print(f"   LOO: " + "; ".join(f"-p{j['left_out']}: {j['plx']*1000:.0f}" for j in rep["loo"]))
        pm = rep["pass_means"]; pf = rep["pm_fixed"]
        print(f"   pass means: plx {pm['fit']['plx']*1000:.1f} +- {pm['plx_err_formal']*1000:.1f} (jack {pm.get('plx_err_jackknife', np.nan)*1000:.1f}) chi2 {pm['chi2_pm_only']:.1f}/{pm['dof_pm_only']} -> {pm['chi2_pm_plx']:.1f}/{pm['dof_pm_plx']}")
        print(f"   pm fixed: plx {pf['fit']['plx']*1000:.1f} formal {pf['plx_err_formal']*1000:.1f} boot {pf['boot']['plx_std']*1000:.1f} jack {pf.get('plx_err_jackknife', np.nan)*1000:.1f}; chi2 {pf['chi2_pm_only']:.1f}/{pf['dof_pm_only']} -> {pf['chi2_pm_plx']:.1f}/{pf['dof_pm_plx']}")
    res["literature"] = LIT["epsindb"]
    json.dump(res, open(os.path.join(outdir, "exp13_epsindb_fits.json"), "w"), indent=1, default=float)
    # product file (primary data set DIFF)
    K = keep_sets["DIFF"]; f = res["datasets"]["DIFF"]["fit"]
    prod = dict(target="Epsilon Indi B", instrument="SPHEREx D2 (1.1 to 1.65 um), DR1 + QR3 Level 2, per-exposure centroids",
                reference_point_deg=dict(ra=REF[0], dec=REF[1]),
                offsets="east = (ra - ra_ref) * cos(dec_ref) * 3600, north = (dec - dec_ref) * 3600, arcsec; frame-shift corrected with field stars",
                model="east(t) = E0 + muE * (t - t0) + plx * fE;  north(t) = N0 + muN * (t - t0) + plx * fN;  t in Julian years, arcsec and arcsec/yr",
                t0=T0, best_fit=dict(E0=f["E0"], N0=f["N0"], muE=f["muE"], muN=f["muN"], plx=f["plx"],
                                     plx_err=res["datasets"]["DIFF"]["plx_err_max"],
                                     distance_pc=res["datasets"]["DIFF"]["distance_pc"], distance_err_pc=res["datasets"]["DIFF"]["distance_err_pc"],
                                     vtan_kms=res["datasets"]["DIFF"]["vtan_kms"], vtan_err_kms=res["datasets"]["DIFF"]["vtan_err_kms"]),
                best_fit_pm_only=res["datasets"]["DIFF"]["fit_pm_only"],
                literature=dict(plx=LIT["epsindb"]["plx_mas"] / 1000, plx_B_gaia=LIT["epsindb"]["plx_B_gaia_mas"] / 1000,
                                muE=LIT["epsindb"]["pmE_mas_yr"] / 1000, muN=LIT["epsindb"]["pmN_mas_yr"] / 1000,
                                distance_pc=1000 / LIT["epsindb"]["plx_mas"], notes=[LIT["epsindb"]["plx_note"], LIT["epsindb"]["pm_note"]]),
                best_fit_pm_fixed=dict({k: v for k, v in res["datasets"]["DIFF"]["pm_fixed"]["fit"].items()},
                                       plx_err=res["datasets"]["DIFF"]["pm_fixed"]["plx_err_max"],
                                       distance_pc=res["datasets"]["DIFF"]["pm_fixed"]["distance_pc"],
                                       distance_err_pc=res["datasets"]["DIFF"]["pm_fixed"]["distance_err_pc"],
                                       vtan_kms=res["datasets"]["DIFF"]["pm_fixed"]["vtan_kms"],
                                       vtan_err_kms=res["datasets"]["DIFF"]["pm_fixed"]["vtan_err_kms"],
                                       note="classroom version: proper motion fixed to Gaia DR3, only E0, N0 and plx fitted"),
                pass_means=[dict(pass_index=int(p[7]), year=float(p[0]), mjd=float((p[0] - 2000.0) * 365.25 + 51544.5),
                                 n=int((K["l"] == p[7]).sum()), east=float(p[1]), north=float(p[2]), east_err=float(p[3]),
                                 north_err=float(p[4]), fE=float(p[5]), fN=float(p[6])) for p in K["P"]],
                parallax_factor_definition="fE = X sin(ra) - Y cos(ra); fN = X cos(ra) sin(dec) + Y sin(ra) sin(dec) - Z cos(dec); (X, Y, Z) = Earth barycentric position in AU (ICRS), ra/dec of the reference point",
                exposures=[dict(name=rows[i]["name"], mjd=float(mj[i]), year=float(t_all[i]), pass_index=int(lab[i]), wavelength_um=rows[i]["wl"],
                                east=float(K["E"][j]), north=float(K["N"][j]), east_err=float(K["sE"][j]), north_err=float(K["sN"][j]),
                                fE=float(fE_all[i]), fN=float(fN_all[i])) for j, i in enumerate(K["idx"])])
    json.dump(prod, open(os.path.join(outdir, "exp13_parallax_epsindb.json"), "w"), indent=1)
    # self-check: a page holding only this file must rebuild the model and the fit's chi-square
    q = json.load(open(os.path.join(outdir, "exp13_parallax_epsindb.json"))); b = q["best_fit"]; c2 = 0.0
    for e in q["exposures"]:
        dt = e["year"] - q["t0"]
        c2 += ((e["east"] - b["E0"] - b["muE"] * dt - b["plx"] * e["fE"]) / e["east_err"]) ** 2
        c2 += ((e["north"] - b["N0"] - b["muN"] * dt - b["plx"] * e["fN"]) / e["north_err"]) ** 2
    assert abs(c2 - res["datasets"]["DIFF"]["chi2_pm_plx"]) < 1e-6 * c2, (c2, res["datasets"]["DIFF"]["chi2_pm_plx"])
    print(f"product JSON rebuilds the model: chi2 {c2:.3f} (fit {res['datasets']['DIFF']['chi2_pm_plx']:.3f})")
    figures(res, keep_sets, imgdir)
    return res


def model_curve(f, tt, ra, dec):
    mjd = (tt - 2000.0) * 365.25 + 51544.5
    fE, fN = plx_factors(mjd, ra, dec)
    return f["E0"] + f["muE"] * (tt - T0) + f["plx"] * fE, f["N0"] + f["muN"] * (tt - T0) + f["plx"] * fN, fE, fN


def figures(res, KS, imgdir):
    K = KS["DIFF"]; rep = res["datasets"]["DIFF"]; f = rep["fit"]; f0 = rep["fit_pm_only"]
    tt = np.linspace(K["t"].min() - 0.08, K["t"].max() + 0.08, 600)
    mE, mN, fEt, fNt = model_curve(f, tt, *REF)
    col = plt.cm.viridis(K["l"] / max(K["l"].max(), 1))
    P = K["P"]
    # 1. sky track
    fig, ax = plt.subplots(figsize=(6.2, 5.2))
    ax.plot(f0["E0"] + f0["muE"] * (tt - T0), f0["N0"] + f0["muN"] * (tt - T0), "--", color="0.6", lw=1, label="proper motion only")
    ax.plot(mE, mN, "-", color="C3", lw=1.2, label=f"proper motion + parallax ({f['plx']*1000:.0f} mas)")
    ax.scatter(K["E"], K["N"], s=7, c=col, alpha=0.6, label="single exposures (colour = pass)")
    ax.errorbar(P[:, 1], P[:, 2], xerr=P[:, 3], yerr=P[:, 4], fmt="o", ms=4, color="k", label="pass means")
    for p in P:
        ax.annotate(f"{p[0]:.2f}", (p[1], p[2]), xytext=(6, 4), textcoords="offset points", fontsize=7)
    ax.invert_xaxis(); ax.set_aspect("equal", "datalim")
    ax.set_xlabel("east offset (arcsec)"); ax.set_ylabel("north offset (arcsec)")
    ax.set_title("Epsilon Indi B in SPHEREx D2: sky track 2025.3 to 2026.8\n(field-star corrected; 1 SPHEREx pixel = 6.15\")", fontsize=9)
    ax.legend(fontsize=7, loc="lower right")
    fig.tight_layout(); fig.savefig(os.path.join(imgdir, "exp13_epsindb_track.png"), dpi=140); plt.close(fig)
    # 2. residuals with and without parallax
    fig, ax = plt.subplots(2, 2, figsize=(9, 5.5), sharex=True, sharey=True)
    for j, (nm, q) in enumerate([("proper motion only", f0), ("proper motion + parallax", f)]):
        rE = K["E"] - (q["E0"] + q["muE"] * (K["t"] - T0) + q["plx"] * K["fE"])
        rN = K["N"] - (q["N0"] + q["muN"] * (K["t"] - T0) + q["plx"] * K["fN"])
        chi = rep["chi2_pm_only"] if j == 0 else rep["chi2_pm_plx"]; dof = rep["dof_pm_only"] if j == 0 else rep["dof_pm_plx"]
        for i, (r, lbl) in enumerate([(rE, "east"), (rN, "north")]):
            ax[i, j].scatter(K["t"], r, s=7, c=col, alpha=0.7); ax[i, j].axhline(0, color="k", lw=0.5)
            for k in sorted(set(K["l"])):
                m = K["l"] == k; ax[i, j].errorbar(K["t"][m].mean(), r[m].mean(), yerr=r[m].std() / np.sqrt(m.sum()), fmt="o", color="k", ms=4)
            ax[i, j].set_ylabel(f"{lbl} residual (\")")
        ax[0, j].set_title(f"{nm}: chi2 = {chi:.0f} for {dof} dof", fontsize=9)
    ax[1, 0].set_xlabel("year"); ax[1, 1].set_xlabel("year"); ax[0, 0].set_ylim(-1.2, 1.2)
    ax[1, 0].xaxis.set_major_locator(matplotlib.ticker.MultipleLocator(0.5))
    fig.tight_layout(); fig.savefig(os.path.join(imgdir, "exp13_epsindb_residuals.png"), dpi=140); plt.close(fig)
    # 3. parallax-only signal (the student picture)
    fig, ax = plt.subplots(1, 3, figsize=(12, 3.8), gridspec_kw=dict(width_ratios=[1.3, 1.3, 1]))
    pE = K["E"] - f["E0"] - f["muE"] * (K["t"] - T0); pN = K["N"] - f["N0"] - f["muN"] * (K["t"] - T0)
    for i, (v, fc, lbl) in enumerate([(pE, fEt, "east"), (pN, fNt, "north")]):
        ax[i].scatter(K["t"], v, s=7, c=col, alpha=0.5)
        for k in sorted(set(K["l"])):
            m = K["l"] == k; ax[i].errorbar(K["t"][m].mean(), v[m].mean(), yerr=v[m].std() / np.sqrt(m.sum()), fmt="o", color="k", ms=4)
        ax[i].plot(tt, f["plx"] * fc, "-", color="C3", label=f"fit: {f['plx']*1000:.0f} mas")
        ax[i].plot(tt, LIT["epsindb"]["plx_mas"] / 1000 * fc, ":", color="C0", label="literature 275 mas")
        ax[i].axhline(0, color="k", lw=0.4); ax[i].set_ylim(-1, 1)
        ax[i].set_xlabel("year"); ax[i].set_ylabel(f"{lbl} offset after removing proper motion (\")"); ax[i].legend(fontsize=7)
    ax[2].plot(f["plx"] * fEt, f["plx"] * fNt, "-", color="C3", lw=1)
    for k in sorted(set(K["l"])):
        m = K["l"] == k
        ax[2].errorbar(pE[m].mean(), pN[m].mean(), xerr=pE[m].std() / np.sqrt(m.sum()), yerr=pN[m].std() / np.sqrt(m.sum()), fmt="o", color="k", ms=4)
        ax[2].annotate(f"{K['t'][m].mean():.2f}", (pE[m].mean(), pN[m].mean()), xytext=(5, 3), textcoords="offset points", fontsize=7)
    ax[2].invert_xaxis(); ax[2].set_aspect("equal", "datalim"); ax[2].set_xlabel("east (\")"); ax[2].set_ylabel("north (\")")
    ax[2].set_title("parallax ellipse (pass means)", fontsize=9)
    fig.suptitle("Epsilon Indi B: what is left after removing the straight-line proper motion is the yearly parallax wobble", fontsize=9)
    fig.tight_layout(); fig.savefig(os.path.join(imgdir, "exp13_epsindb_parallax_signal.png"), dpi=140); plt.close(fig)


# ------------------------------------------------------------------ WISE 0855 and Barnard (det08 per-pass centroids)
def others(outdir):
    from det08_targets import predict
    out = {}
    cases = [("w0855", "D6", "det08_results.json"), ("w0855", "D5+D6", "det08_results.json"), ("barnard", "D2", "det08_results_nomask.json")]
    for target, det, fn in cases:
        R = json.load(open(os.path.join(HERE, fn)))[target]
        fr = [f for f in R["frames"] if f["det"] == det and f["n"] >= 3]
        refdet = "D6" if det == "D5+D6" else det
        rs = [r for r in R["refstar"] if r["det"] == refdet]
        err = max(0.3, float(np.sqrt(np.mean([r["dx_arcsec"] ** 2 + r["dy_arcsec"] ** 2 for r in rs if r["pass_"] != rs[0]["pass_"]]) / 2)))
        mj = np.array([f["mjd_mean"] for f in fr])
        pra, pdec = predict(target, mj)
        ref = (float(pra.mean()), float(pdec.mean()))
        pE, pN = to_EN(pra, pdec, ref)
        # det08 grid x increases to the west: east offset = -cen_dx
        E = pE - np.array([f["cen_dx_arcsec_mean"] for f in fr]); N = pN + np.array([f["cen_dy_arcsec_mean"] for f in fr])
        t = jyear(mj); fE, fN = plx_factors(mj, *ref); s = np.full(len(t), err)
        rep = fit_report(t, E, N, s, s, fE, fN, lab=np.arange(len(t)))
        lit = LIT[target]
        rep_fix = fit_report(t, E, N, s, s, fE, fN, lab=np.arange(len(t)), fix_pm=(lit["pmE_mas_yr"] / 1000, lit["pmN_mas_yr"] / 1000))
        # size of the signal: parallax displacement range between the passes used
        sig_range = float(np.hypot(np.ptp(lit["plx_mas"] / 1000 * fE), np.ptp(lit["plx_mas"] / 1000 * fN)))
        out[f"{target}_{det}"] = dict(passes=[dict(pass_=f["pass_"], n=f["n"], mjd=f["mjd_mean"], E=float(e), N=float(nn), fE=float(a), fN=float(b))
                                              for f, e, nn, a, b in zip(fr, E, N, fE, fN)],
                                      per_pass_error_arcsec=err, literature=lit, free=rep, pm_fixed=rep_fix,
                                      expected_parallax_swing_between_passes_arcsec=sig_range)
        print(f"{target} {det}: {len(t)} passes, error {err:.2f}\" per coord; signal swing {sig_range:.2f}\"; "
              f"free: plx {rep['fit']['plx']*1000:.0f} +- {rep['plx_err_formal']*1000:.0f} mas (chi2 {rep['chi2_pm_plx']:.2f}/{rep['dof_pm_plx']}), "
              f"pm {rep['fit']['muE']*1000:.0f},{rep['fit']['muN']*1000:.0f}; pm fixed: plx {rep_fix['fit']['plx']*1000:.0f} +- {rep_fix['plx_err_formal']*1000:.0f} "
              f"(jack {rep_fix.get('plx_err_jackknife', np.nan)*1000:.0f}) chi2 {rep_fix['chi2_pm_only']:.2f} -> {rep_fix['chi2_pm_plx']:.2f}/{rep_fix['dof_pm_plx']}")
    json.dump(out, open(os.path.join(outdir, "exp13_others_fits.json"), "w"), indent=1, default=float)
    return out


if __name__ == "__main__":
    cmd = sys.argv[1]
    if cmd == "check":
        check()
    elif cmd == "epsindb":
        check(); epsindb(sys.argv[2], sys.argv[3])
    elif cmd == "others":
        others(sys.argv[2])
