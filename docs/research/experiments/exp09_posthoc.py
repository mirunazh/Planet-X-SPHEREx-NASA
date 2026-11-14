"""Experiment 09: checks ADDED AFTER LOOKING at the first R Dra and RW Aur results (offline, cached data only).

usage: python -I exp09_posthoc.py <datadir> <imgdir> <out json>

1. R Dra: the pre-set core rule (95th percentile of the largest NaN radius within 25 px) was
   set off by unrelated NaN patches (cosmic-ray-like blobs) and put the wing annulus at
   26-29 px, in the background. Replacement rule: per exposure, r_core = smallest integer k
   whose ring [k, k+1) is < 10% NaN; take the 95th percentile over exposures. Annulus formula
   unchanged ([r_core+2, r_core+5], background [r_core+8, r_core+12]). Light curve reported
   raw (wing flux / its median) and field-normalised; sinusoid at P = 246 d and a period scan.
2. RW Aur: is the pass-to-pass ratio real? (a) the field-star normalisation per pass, (b) the
   raw (un-normalised) wing ratio, (c) a core aperture r <= 2.5 px (the core has no NaN),
   (d) control: the brightest field star measured with the target's wing annulus and
   normalised by the other field stars; it should give 1.
"""
import json, os, sys
import numpy as np
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from exp09_targets import (load_all, prep, regrid, med_stack, ann_flux, find_field_stars, grid_wcs, passes_of,
                           R_DRA, RW_AUR, mjd_to_jyear)

datadir, imgdir, outp = sys.argv[1:4]
E = os.path.dirname(os.path.abspath(__file__))
OUT = {}


def ring_core(p, kmax=25):
    yy, xx = np.indices(p["img"].shape)
    r = np.hypot(xx - p["x"], yy - p["y"])
    for k in range(kmax):
        ring = (r >= k) & (r < k + 1)
        if ring.any() and (~np.isfinite(p["img"][ring])).mean() < 0.1:
            return k
    return kmax


def star_flux(P, sra, sdec, rin, rout, bin_, bout, need_core=True):
    fl = []
    for p in P:
        x, y = map(float, p["wcs"].all_world2pix([[sra, sdec]], 0)[0])
        if not (9 <= x < p["img"].shape[1] - 9 and 9 <= y < p["img"].shape[0] - 9):
            fl.append(np.nan); continue
        core = p["img"][int(round(y)) - 2:int(round(y)) + 3, int(round(x)) - 2:int(round(x)) + 3]
        if need_core and not np.isfinite(core).all():
            fl.append(np.nan); continue
        f, ff = ann_flux(p["img"], x, y, rin, rout, bin_, bout)
        fl.append(f if ff > 0.95 else np.nan)
    return np.array(fl)


def binned_ratio(P, vals, lab, bins):
    ks = sorted(set(lab))
    res = {}
    for k in ks[1:]:
        r = []
        for lo, hi in zip(bins[:-1], bins[1:]):
            a = [v for p, v, l in zip(P, vals, lab) if l == ks[0] and lo <= p["wl"] < hi and np.isfinite(v)]
            b = [v for p, v, l in zip(P, vals, lab) if l == k and lo <= p["wl"] < hi and np.isfinite(v)]
            if a and b:
                r.append(np.mean(b) / np.mean(a))
        r = np.array(r)
        res[f"p{k}/p{ks[0]}"] = dict(n_bins=len(r), median=float(np.median(r)), std=float(np.std(r)),
                                     sem=float(np.std(r) / np.sqrt(len(r))), dmag=float(-2.5 * np.log10(np.median(r))))
    return res


# ---------------------------------------------------------------- RW Aur checks
ra, dec = RW_AUR
frs = load_all(datadir, "rwaur", "D2", ra, dec, half=30)
P = [prep(fr, ra, dec, half=30) for fr in frs]
lab = np.array(passes_of(np.array([p["mjd"] for p in P])))
n = 81; gw = grid_wcs(ra, dec, n)
for p in P:
    p["grid"] = regrid(p, gw, n)
prev = json.load(open(os.path.join(E, "exp09_rwaur.json")))
rin, rout = prev["annulus"]; bin_, bout = prev["bkg"]
stars = prev["field_stars"]
SF = np.array([star_flux(P, s["ra"], s["dec"], 0, 2.5, 5, 8) for s in stars])
SF = SF / np.nanmedian(SF, 1, keepdims=True)
norm = np.nanmedian(SF, 0)
good3 = [i for i, s in enumerate(stars) if s["scatter_frac"] < 0.2]  # the 3 bright ones
norm3 = np.nanmedian(SF[good3], 0)
rwing = np.array([ann_flux(p["img"], p["x"], p["y"], rin, rout, bin_, bout)[0] for p in P])
core = np.array([ann_flux(p["img"], p["x"], p["y"], 0, 2.5, 5, 8)[0] for p in P])
bins = np.arange(1.08, 1.70, 0.03)
rw = dict(annulus=[rin, rout],
          field_norm_per_pass={int(k): dict(median_all5=float(np.nanmedian(norm[lab == k])), median_bright3=float(np.nanmedian(norm3[lab == k])))
                               for k in sorted(set(lab))},
          star_scatter_per_pass={int(k): [float(np.nanmedian(SF[i][lab == k])) for i in range(len(stars))] for k in sorted(set(lab))},
          wing_norm5=binned_ratio(P, rwing / norm, lab, bins), wing_norm_bright3=binned_ratio(P, rwing / norm3, lab, bins),
          wing_raw=binned_ratio(P, rwing, lab, bins), core_r2p5_norm_bright3=binned_ratio(P, core / norm3, lab, bins),
          peak_median_per_pass={int(k): float(np.median([np.nanmax(p["img"][int(p["y"]) - 1:int(p["y"]) + 2, int(p["x"]) - 1:int(p["x"]) + 2])
                                                         for p, l in zip(P, lab) if l == k])) for k in sorted(set(lab))})
# control: brightest field star with the target's wing annulus, normalised by the other bright stars
ib = int(np.argmax([s["median"] for s in stars]))
others = [i for i in good3 if i != ib]
cw = star_flux(P, stars[ib]["ra"], stars[ib]["dec"], rin, rout, bin_, bout)
cnorm = np.nanmedian(SF[others], 0)
rw["control_star"] = dict(ra=stars[ib]["ra"], dec=stars[ib]["dec"], wing_norm_others=binned_ratio(P, cw / cnorm, lab, bins),
                          wing_raw=binned_ratio(P, cw, lab, bins))
OUT["rwaur"] = rw
print("RW Aur field norm per pass:", rw["field_norm_per_pass"])
for key in ["wing_norm5", "wing_norm_bright3", "wing_raw", "core_r2p5_norm_bright3"]:
    print(f"RW Aur {key}:", {k: (round(v['median'], 3), round(v['std'], 3), round(v['sem'], 3), round(v['dmag'], 3)) for k, v in rw[key].items()})
print("control star wing/others:", {k: (round(v['median'], 3), round(v['std'], 3), round(v['sem'], 3)) for k, v in rw["control_star"]["wing_norm_others"].items()},
      "raw:", {k: round(v['median'], 3) for k, v in rw["control_star"]["wing_raw"].items()})
print("RW Aur peak per pass:", rw["peak_median_per_pass"])

# ---------------------------------------------------------------- R Dra with the ring core rule
ra, dec = R_DRA
prevd = json.load(open(os.path.join(E, "exp09_rdra.json")))
uris = [e["uri"] for e in prevd["exposures"]]
frs = load_all(datadir, "rdra", "D6", ra, dec, half=40, uris=uris)
Q = [prep(fr, ra, dec, half=40) for fr in frs]
rcs = np.array([ring_core(p) for p in Q])
rc = float(np.percentile(rcs, 95))
a_in, a_out, b_in, b_out = rc + 2, rc + 5, rc + 8, rc + 12
mj = np.array([p["mjd"] for p in Q])
w = np.array([ann_flux(p["img"], p["x"], p["y"], a_in, a_out, b_in, b_out) for p in Q])
wing, ffrac = w[:, 0], w[:, 1]
fnorm = np.array([e["field_norm"] for e in prevd["exposures"]])
# fixed outer annulus too, to see how the light curve depends on radius (reported, not selected)
w2 = np.array([ann_flux(p["img"], p["x"], p["y"], a_out, a_out + 3, b_in, b_out)[0] for p in Q])
ok = (ffrac >= 0.95) & (wing > 0)


def curve(vals, okm):
    m = -2.5 * np.log10(vals[okm] / np.median(vals[okm]))
    t = mj[okm]
    def fit(P_):
        A = np.vstack([np.ones(len(t)), np.sin(2 * np.pi * t / P_), np.cos(2 * np.pi * t / P_)]).T
        c, *_ = np.linalg.lstsq(A, m, rcond=None)
        return c, float(np.std(m - A @ c))
    c, s = fit(246.0)
    grid = np.arange(100, 600, 1.0); rr = [fit(q)[1] for q in grid]
    d = t.astype(int); dev = []
    for dd in set(d):
        mm = m[d == dd]
        if len(mm) >= 2:
            dev += list(mm - mm.mean())
    return dict(n=int(okm.sum()), n_days=len(set(d)), raw_rms=float(np.std(m)), p246_full_amp=float(2 * np.hypot(c[1], c[2])),
                p246_resid=s, best_period=float(grid[int(np.argmin(rr))]), best_resid=float(min(rr)),
                within_day_rms=float(np.std(dev)) if dev else None, n_within_day=len(dev), coef=[float(x) for x in c]), m, t


cr, mr, tr = curve(wing, ok)
okn = ok & np.isfinite(fnorm) & (fnorm > 0)
cn, mn, tn = curve(wing / np.where(okn, fnorm, 1), okn)
ok2 = np.isfinite(w2) & (w2 > 0)
c2, m2, t2 = curve(w2, ok2)
OUT["rdra"] = dict(ring_core_per_exposure_pct=[float(v) for v in np.percentile(rcs, [0, 50, 95, 100])], r_core=rc,
                   annulus=[a_in, a_out], bkg=[b_in, b_out], raw=cr, field_normalised=cn, outer_annulus=dict(annulus=[a_out, a_out + 3], **c2),
                   n_dropped_ffrac=int((ffrac < 0.95).sum()))
print(f"R Dra ring core: per-exposure r_core pct {OUT['rdra']['ring_core_per_exposure_pct']} -> annulus {a_in}-{a_out} px")
for k in ["raw", "field_normalised"]:
    print("R Dra", k, {kk: (round(v, 3) if isinstance(v, float) else v) for kk, v in OUT["rdra"][k].items() if kk != "coef"})
print("R Dra outer", {kk: (round(v, 3) if isinstance(v, float) else v) for kk, v in OUT["rdra"]["outer_annulus"].items() if kk != "coef"})

fig, ax = plt.subplots(1, 2, figsize=(12, 4))
tt = np.linspace(mj.min(), mj.max(), 500)
for m_, t_, c_, lab_, col in [(mr, tr, cr, f"wing {a_in:.0f}-{a_out:.0f} px, raw", "C0"), (mn, tn, cn, "wing / field-star norm", "C2"),
                              (m2, t2, c2, f"wing {a_out:.0f}-{a_out + 3:.0f} px, raw", "C1")]:
    ax[0].plot(t_, m_, "o", ms=3, color=col, label=f"{lab_}: rms {c_['raw_rms']:.2f}, within-day {c_['within_day_rms']:.2f}")
    k0, k1, k2 = c_["coef"]
    ax[0].plot(tt, k0 + k1 * np.sin(2 * np.pi * tt / 246) + k2 * np.cos(2 * np.pi * tt / 246), "-", color=col, lw=0.8)
ax[0].invert_yaxis(); ax[0].set_xlabel("MJD"); ax[0].set_ylabel("mag relative to median"); ax[0].legend(fontsize=6)
ax[0].set_title(f"R Dra D6 4.452-4.492 um, ring core rule (r_core {rc:.0f} px); lines = P 246 d fits", fontsize=8)
ks = sorted(set(lab))
for k in ks:
    sel = lab == k
    ax[1].plot([p["wl"] for p, s in zip(P, sel) if s], (rwing / norm3)[sel], "o", ms=4, label=f"RW Aur pass {k}")
    ax[1].plot([p["wl"] for p, s in zip(P, sel) if s], (cw / cnorm)[sel] * np.nanmedian(rwing / norm3) / np.nanmedian(cw / cnorm), "x", ms=4,
               color=f"C{k}", alpha=0.6)
ax[1].set_xlabel("wavelength at target (um)"); ax[1].set_ylabel("wing flux / bright-3 field norm (x = control star, scaled)")
ax[1].legend(fontsize=7); ax[1].set_title("RW Aur (o) vs control field star (x), same wing annulus", fontsize=8)
fig.tight_layout(); fig.savefig(os.path.join(imgdir, "exp09_posthoc_rdra_rwaur.png"), dpi=140); plt.close(fig)
json.dump(OUT, open(outp, "w"), indent=1, default=float)
print("wrote", outp)
