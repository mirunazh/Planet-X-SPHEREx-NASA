"""Experiment 08: can per-pass SPHEREx frames show Barnard's Star and WISE 0855 moving?

usage: python -I det08_analyze.py <datadir> <imgdir> [--nomask]
Reads <datadir>/<target>/<det>/*.fits (from det08_download.py), writes PNGs to <imgdir>
and a JSON of all numbers to <imgdir>/../det08_results[_nomask].json.

Per exposure: IMAGE - ZODI, minus sigma-clipped median; bad flag bits -> NaN (SOURCE,
FULLSAMPLE, PHANMISS kept); reproject (bilinear) onto a north-up 3"/px TAN grid.
Per (pass, detector): inverse-variance mean (and median). Passes = gaps > 20 d.
Photometry: r = 3 grid px (9") aperture, local annulus 18-30"; noise = robust std of the
same aperture at 300 random positions in the frame (empty-aperture method; handles the
noise correlation that interpolation introduces). Choices above were fixed before looking;
the --nomask run, grid-centre centroid, reference/neighbour star checks and the n>=3 rule
for difference images were added after (see 08-detectability-experiment.md, section 2).
"""
import json, os, sys, glob, warnings
import numpy as np
from astropy.io import fits
from astropy.wcs import WCS, FITSFixedWarning
from astropy.stats import sigma_clipped_stats
from astropy.visualization import ImageNormalize, AsinhStretch, LinearStretch
from reproject import reproject_interp
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from det08_targets import predict, W0855_BRIEF

warnings.simplefilter("ignore", FITSFixedWarning)
warnings.filterwarnings("ignore", message=".*SIP.*")
import logging; logging.getLogger("astropy").setLevel(logging.ERROR)

PIX = 3.0  # arcsec per grid pixel
BAD_BITS = [0, 1, 2, 6, 7, 9, 10, 11, 15, 17, 19, 20, 22, 23, 24, 25, 26, 27, 28]
BAD = sum(1 << b for b in BAD_BITS)
BITNAMES = {0: "TRANSIENT", 1: "OVERFLOW", 2: "SUR_ERROR", 6: "NONFUNC", 7: "DICHROIC",
            9: "MISSING_DATA", 10: "HOT", 11: "COLD", 12: "FULLSAMPLE", 14: "PHANMISS",
            15: "NONLINEAR", 17: "PERSIST", 19: "OUTLIER", 20: "CROSSTALK", 21: "SOURCE",
            22: "GHOST", 23: "GHOST_FPA", 24: "GHOST_EXT", 25: "STREAK", 26: "BLOOM",
            27: "SNOWBALL", 28: "HALO"}
# neighbour: CatWISE2020 J085501.95-071428.2 (W1 15.04, W2 15.20, static), which WISE 0855 passes 4" from in 2026
CFG = {"barnard": dict(dets=["D2"], n=96),
       "w0855": dict(dets=["D6", "D5", "D4"], n=140, neighbour=(133.7581637, -7.2411758))}
NOMASK = "--nomask" in sys.argv


def grid_wcs(ra, dec, n):
    w = WCS(naxis=2)
    w.wcs.ctype = ["RA---TAN", "DEC--TAN"]
    w.wcs.crval = [ra, dec]
    w.wcs.crpix = [(n + 1) / 2, (n + 1) / 2]
    w.wcs.cdelt = [-PIX / 3600, PIX / 3600]
    return w


def load(path, target, gw_fixed, n):
    with fits.open(path) as h:
        hd = h["IMAGE"].header
        img = h["IMAGE"].data.astype(float) - h["ZODI"].data
        var = h["VARIANCE"].data.astype(float)
        flg = h["FLAGS"].data.astype(np.int64)
        w = WCS(hd)
        mjd = hd["MJD-AVG"]
        ra, dec = predict(target, mjd)
        x, y = map(float, w.world_to_pixel_values(ra[0], dec[0]))
        ws = WCS(hd, fobj=h, key="W"); ws.sip = None
        wl = float(np.atleast_1d(getattr(ws.pixel_to_world(x, y)[0], "value", np.nan))[0])
    ix, iy = int(round(x)), int(round(y))
    inside = 0 <= iy < img.shape[0] and 0 <= ix < img.shape[1]
    box = (slice(max(iy - 1, 0), iy + 2), slice(max(ix - 1, 0), ix + 2))
    f_t = int(np.bitwise_or.reduce(flg[box].ravel())) if inside else -1
    raw_peak = float(np.nanmax(img[box])) if inside and np.isfinite(img[box]).any() else np.nan
    bad = (~np.isfinite(img)) | (~np.isfinite(var)) | (var <= 0)
    if not NOMASK:
        bad |= (flg & BAD) != 0
    bitfrac = {BITNAMES[b]: float(((flg >> b) & 1).mean()) for b in BITNAMES}
    _, med, _ = sigma_clipped_stats(img[~bad], sigma=3)
    img = img - med
    img[bad] = np.nan
    var[bad] = np.nan
    out = {}
    for key, gw in [("fixed", gw_fixed), ("comoving", grid_wcs(ra[0], dec[0], n))]:
        d, _ = reproject_interp((img, w), gw, shape_out=(n, n), order="bilinear")
        v, _ = reproject_interp((var, w), gw, shape_out=(n, n), order="bilinear")
        out[key] = (d, v)
    return dict(path=os.path.basename(path), mjd=mjd, wl=wl, flags_at_target=f_t,
                inside=inside, peak3x3=raw_peak, nbad=float(bad.mean()), bitfrac=bitfrac,
                ra=ra[0], dec=dec[0], **out)


def passes_of(mjds, gap=20.0):
    order = np.argsort(mjds)
    lab = np.zeros(len(mjds), int)
    k = 0
    for i in range(1, len(order)):
        if mjds[order[i]] - mjds[order[i - 1]] > gap:
            k += 1
        lab[order[i]] = k
    return lab


def stack(items, key):
    d = np.array([it[key][0] for it in items]); v = np.array([it[key][1] for it in items])
    w = np.where(np.isfinite(d) & np.isfinite(v) & (v > 0), 1 / np.where(v > 0, v, 1), 0)
    ws = w.sum(0)
    mean = np.where(ws > 0, np.nansum(np.nan_to_num(d) * w, 0) / np.where(ws > 0, ws, 1), np.nan)
    with warnings.catch_warnings():
        warnings.simplefilter("ignore")
        med = np.nanmedian(d, 0)
    return mean, med, (np.isfinite(d)).sum(0)


def aperture(img, x, y, r=3.0, rin=6.0, rout=10.0):
    yy, xx = np.indices(img.shape)
    rr = np.hypot(xx - x, yy - y)
    ap = rr <= r
    ann = (rr >= rin) & (rr <= rout) & np.isfinite(img)
    if np.isfinite(img[ap]).sum() < 0.8 * ap.sum() or ann.sum() < 20:
        return np.nan
    bkg = np.median(img[ann])
    return float(np.nansum(img[ap] - bkg) * ap.sum() / np.isfinite(img[ap]).sum())


def empty_ap_sigma(img, avoid_xy, rng, n=300, avoid_r=10.0):
    h, w = img.shape
    vals = []
    for _ in range(n * 3):
        x, y = rng.uniform(12, w - 13), rng.uniform(12, h - 13)
        if any(np.hypot(x - ax, y - ay) < avoid_r for ax, ay in avoid_xy):
            continue
        s = aperture(img, x, y)
        if np.isfinite(s):
            vals.append(s)
        if len(vals) >= n:
            break
    vals = np.array(vals)
    return 1.4826 * np.median(np.abs(vals - np.median(vals))), len(vals)


def centroid(img, x, y, r=4.0, it=5):
    yy, xx = np.indices(img.shape)
    for _ in range(it):
        m = (np.hypot(xx - x, yy - y) <= r) & np.isfinite(img)
        wgt = np.clip(img[m], 0, None)
        if wgt.sum() <= 0:
            return np.nan, np.nan
        x, y = (xx[m] * wgt).sum() / wgt.sum(), (yy[m] * wgt).sum() / wgt.sum()
    return float(x), float(y)


def robust_sigma(img):
    v = img[np.isfinite(img)]
    return 1.4826 * np.median(np.abs(v - np.median(v)))


def show(ax, img, kind, title, marks=()):
    s = robust_sigma(img)
    if kind == "bright":
        norm = ImageNormalize(vmin=-3 * s, vmax=np.nanpercentile(img, 99.9), stretch=AsinhStretch(0.05))
    elif kind == "diff":
        lim = np.nanpercentile(np.abs(img), 99.7)
        norm = ImageNormalize(vmin=-lim, vmax=lim, stretch=LinearStretch())
    else:  # faint: linear -3..+6 sigma
        norm = ImageNormalize(vmin=-3 * s, vmax=6 * s, stretch=LinearStretch())
    ax.imshow(img, origin="lower", cmap="gray" if kind != "diff" else "RdBu_r", norm=norm,
              interpolation="nearest")
    for (x, y, c) in marks:
        ax.add_patch(plt.Circle((x, y), 7, fill=False, color=c, lw=0.8))
    ax.set_title(title, fontsize=7)
    ax.set_xticks([]); ax.set_yticks([])


def main(datadir, imgdir):
    os.makedirs(imgdir, exist_ok=True)
    rng = np.random.default_rng(8)
    results = {}
    sfx = "_nomask" if NOMASK else ""
    for target, cfg in CFG.items():
        n = cfg["n"]
        files = {d: sorted(glob.glob(os.path.join(datadir, target, d, "*.fits"))) for d in cfg["dets"]}
        if not any(files.values()):
            continue
        allmjd = []
        for d, fs in files.items():
            for f in fs:
                allmjd.append(fits.getheader(f, "IMAGE")["MJD-AVG"])
        cra, cdec = predict(target, 0.5 * (min(allmjd) + max(allmjd)))
        gw = grid_wcs(cra[0], cdec[0], n)
        items = []
        for d, fs in files.items():
            for f in fs:
                try:
                    it = load(f, target, gw, n)
                except Exception as e:
                    print("LOAD FAIL", f, repr(e)); continue
                it["det"] = d
                items.append(it)
        mj = np.array([it["mjd"] for it in items])
        lab = passes_of(mj)
        for it, l in zip(items, lab):
            it["pass"] = int(l)
        R = dict(centre=[cra[0], cdec[0]], exposures=[], frames=[])
        for it in items:
            R["exposures"].append({k: it[k] for k in ["path", "det", "pass", "mjd", "wl", "flags_at_target",
                                                       "inside", "peak3x3", "nbad", "ra", "dec"]})
        # mean bad fraction per bit across exposures
        R["bitfrac_mean"] = {b: float(np.mean([it["bitfrac"][b] for it in items])) for b in BITNAMES.values()}
        tbits = {}
        for it in items:
            for b, nm in BITNAMES.items():
                if it["flags_at_target"] >= 0 and (it["flags_at_target"] >> b) & 1:
                    tbits[nm] = tbits.get(nm, 0) + 1
        R["target_3x3_bit_counts"] = tbits
        groups = {}
        for it in items:
            groups.setdefault((it["pass"], it["det"]), []).append(it)
        if target == "w0855":
            for it in items:
                if it["det"] in ("D5", "D6"):
                    groups.setdefault((it["pass"], "D5+D6"), []).append(it)
        frames = {}
        for (p, d), g in sorted(groups.items()):
            mean, med, cov = stack(g, "fixed")
            tm = float(np.mean([it["mjd"] for it in g]))
            pra, pdec = predict(target, tm)
            px, py = map(float, gw.world_to_pixel_values(pra[0], pdec[0]))
            rows = {}
            for nm, img in [("mean", mean), ("median", med)]:
                sig, nap = empty_ap_sigma(img, [(px, py)], rng)
                flux = aperture(img, px, py)
                cx, cy = centroid(img, px, py)
                # unbiased check: same centroid started from the grid centre for every pass
                c0x, c0y = centroid(img, (n - 1) / 2, (n - 1) / 2)
                rows[nm] = dict(cen0_x=c0x, cen0_y=c0y, snr=flux / sig if sig > 0 else np.nan, flux_ap=flux, sigma_ap=sig, n_empty=nap,
                                cen_dx_arcsec=(cx - px) * PIX, cen_dy_arcsec=(cy - py) * PIX,
                                cen_x=cx, cen_y=cy)
            fr = dict(pass_=p, det=d, n=len(g), mjd_mean=tm, mjd_min=min(it["mjd"] for it in g),
                      mjd_max=max(it["mjd"] for it in g),
                      wl_min=float(np.nanmin([it["wl"] for it in g])), wl_max=float(np.nanmax([it["wl"] for it in g])),
                      pred_x=float(px), pred_y=float(py), coverage_at_target=int(cov[int(round(py)), int(round(px))]),
                      **{f"{k}_{nm}": v for nm, r in rows.items() for k, v in r.items()})
            if "neighbour" in cfg:  # contamination check: same aperture on the static neighbour star
                nx, ny = map(float, gw.world_to_pixel_values(*cfg["neighbour"]))
                fr["neighbour_snr_mean"] = aperture(mean, nx, ny) / rows["mean"]["sigma_ap"]
                fr["neighbour_sep_arcsec"] = float(np.hypot(nx - px, ny - py) * PIX)
            R["frames"].append(fr)
            frames[(p, d)] = (mean, med, fr)
            print(f"{target} pass{p} {d:6s} n={len(g):2d} mjd={tm:.1f} wl={fr['wl_min']:.3f}-{fr['wl_max']:.3f} "
                  f"SNR mean={rows['mean']['snr']:.1f} med={rows['median']['snr']:.1f} "
                  f"cen offset=({rows['mean']['cen_dx_arcsec']:+.1f},{rows['mean']['cen_dy_arcsec']:+.1f})\"")
        # motion between passes: measured centroid vs predicted, per detector
        R["motion"] = []
        for d in sorted({k[1] for k in frames}):
            ps = sorted(p for (p, dd) in frames if dd == d)
            for a, b in zip(ps[:-1], ps[1:]) if len(ps) > 1 else []:
                fa, fb = frames[(a, d)][2], frames[(b, d)][2]
                mdx = (fb["cen_x_mean"] - fa["cen_x_mean"]) * PIX; mdy = (fb["cen_y_mean"] - fa["cen_y_mean"]) * PIX
                pdx = (fb["pred_x"] - fa["pred_x"]) * PIX; pdy = (fb["pred_y"] - fa["pred_y"]) * PIX
                m0x = (fb["cen0_x_mean"] - fa["cen0_x_mean"]) * PIX; m0y = (fb["cen0_y_mean"] - fa["cen0_y_mean"]) * PIX
                print(f"    (centroid started at grid centre: ({m0x:+.1f},{m0y:+.1f})\")")
                R["motion"].append(dict(det=d, a=a, b=b, meas_dx=mdx, meas_dy=mdy, pred_dx=pdx, pred_dy=pdy,
                                        meas0_dx=m0x, meas0_dy=m0y,
                                        meas_len=float(np.hypot(mdx, mdy)), pred_len=float(np.hypot(pdx, pdy))))
                print(f"  motion {d} pass{a}->{b}: measured ({mdx:+.1f},{mdy:+.1f})\" predicted ({pdx:+.1f},{pdy:+.1f})\"")
        # astrometric control: brightest compact source >30" from the target in the first frame of each
        # detector, centroided in every pass; a static star should not move.
        R["refstar"] = []
        for d in sorted({k[1] for k in frames}):
            ps = sorted(p for (p, dd) in frames if dd == d)
            f0 = frames[(ps[0], d)]
            img0 = f0[0].copy()
            yy, xx = np.indices(img0.shape)
            far = np.hypot(xx - f0[2]["pred_x"], yy - f0[2]["pred_y"]) > 10
            edge = (xx > 12) & (xx < n - 13) & (yy > 12) & (yy < n - 13)
            img0[~(far & edge)] = np.nan
            if not np.isfinite(img0).any():
                continue
            ry, rx = np.unravel_index(np.nanargmax(img0), img0.shape)
            rx, ry = centroid(f0[0], rx, ry)
            for p in ps:
                cx, cy = centroid(frames[(p, d)][0], rx, ry)
                R["refstar"].append(dict(det=d, pass_=p, x=cx, y=cy, dx_arcsec=(cx - rx) * PIX, dy_arcsec=(cy - ry) * PIX))
                print(f"  refstar {d} pass{p}: shift vs pass{ps[0]} ({(cx-rx)*PIX:+.1f},{(cy-ry)*PIX:+.1f})\"")
        # difference image last - first pass: static stars cancel, mover = +/- pair
        R["diff"] = []
        for d in sorted({k[1] for k in frames}):
            ps = sorted(p for (p, dd) in frames if dd == d and frames[(p, dd)][2]["n"] >= 3)
            if len(ps) < 2:
                continue
            fa, fb = frames[(ps[0], d)][2], frames[(ps[-1], d)][2]
            diff = frames[(ps[-1], d)][0] - frames[(ps[0], d)][0]
            sig, _ = empty_ap_sigma(diff, [(fa["pred_x"], fa["pred_y"]), (fb["pred_x"], fb["pred_y"])], rng)
            pos = aperture(diff, fb["pred_x"], fb["pred_y"]) / sig
            neg = aperture(diff, fa["pred_x"], fa["pred_y"]) / sig
            R["diff"].append(dict(det=d, first=ps[0], last=ps[-1], snr_at_last=pos, snr_at_first=neg))
            print(f"  diff {d} pass{ps[-1]}-pass{ps[0]}: SNR at last pos {pos:+.1f}, at first pos {neg:+.1f}")
        # figures: contact sheet + difference image per detector
        kind = "bright" if target == "barnard" else "faint"
        dets = sorted({k[1] for k in frames})
        maxp = max(k[0] for k in frames) + 1
        fig, axes = plt.subplots(len(dets), maxp + 1, figsize=(2.2 * (maxp + 1), 2.3 * len(dets)), squeeze=False)
        for i, d in enumerate(dets):
            ps = sorted(p for (p, dd) in frames if dd == d)
            for p in range(maxp):
                ax = axes[i, p]
                if (p, d) not in frames:
                    ax.axis("off"); continue
                mean, med, fr = frames[(p, d)]
                show(ax, mean, kind, f"{d} pass{p} n={fr['n']}\nMJD {fr['mjd_mean']:.0f} SNR {fr['snr_mean']:.1f}",
                     [(fr["pred_x"], fr["pred_y"], "red")])
            ps = [p for p in ps if frames[(p, d)][2]["n"] >= 3]
            if len(ps) > 1:
                diff = frames[(ps[-1], d)][0] - frames[(ps[0], d)][0]
                show(axes[i, maxp], diff, "diff", f"{d} pass{ps[-1]} - pass{ps[0]}",
                     [(frames[(ps[0], d)][2]["pred_x"], frames[(ps[0], d)][2]["pred_y"], "blue"),
                      (frames[(ps[-1], d)][2]["pred_x"], frames[(ps[-1], d)][2]["pred_y"], "red")])
            else:
                axes[i, maxp].axis("off")
        fig.suptitle(f"{target}: per-pass inverse-variance stacks, {PIX:.0f}\"/px, N up E left, "
                     f"red circle = predicted position (r=21\")", fontsize=8)
        fig.tight_layout()
        fig.savefig(os.path.join(imgdir, f"det08_{target}_passes{sfx}.png"), dpi=130)
        plt.close(fig)
        # zoomed contact sheet (target +-30") for the human-eye test
        fig, axes = plt.subplots(len(dets), maxp + 1, figsize=(2.0 * (maxp + 1), 2.1 * len(dets)), squeeze=False)
        cx, cy, h = n // 2, n // 2, 12
        for i, d in enumerate(dets):
            for p in range(maxp):
                ax = axes[i, p]
                if (p, d) not in frames:
                    ax.axis("off"); continue
                mean, med, fr = frames[(p, d)]
                sub = mean[cy - h:cy + h, cx - h:cx + h]
                show(ax, sub, kind, f"{d} p{p} MJD {fr['mjd_mean']:.0f}",
                     [(fr["pred_x"] - (cx - h), fr["pred_y"] - (cy - h), "red")])
            ps = [p for p in sorted(p for (p, dd) in frames if dd == d) if frames[(p, d)][2]["n"] >= 3]
            if len(ps) > 1:
                fa, fb = frames[(ps[0], d)][2], frames[(ps[-1], d)][2]
                diff = (frames[(ps[-1], d)][0] - frames[(ps[0], d)][0])[cy - h:cy + h, cx - h:cx + h]
                show(axes[i, maxp], diff, "diff", f"{d} p{ps[-1]} - p{ps[0]}",
                     [(fa["pred_x"] - (cx - h), fa["pred_y"] - (cy - h), "blue"),
                      (fb["pred_x"] - (cx - h), fb["pred_y"] - (cy - h), "red")])
            else:
                axes[i, maxp].axis("off")
        fig.suptitle(f"{target}: zoom +-36\" around mid-baseline position", fontsize=8)
        fig.tight_layout()
        fig.savefig(os.path.join(imgdir, f"det08_{target}_zoom{sfx}.png"), dpi=150)
        plt.close(fig)
        # shift-and-add (comoving) stacks, all passes
        if target == "w0855":
            R["shift_and_add"] = {}
            dsets = [("D6", ["D6"]), ("D5", ["D5"]), ("D4", ["D4"]), ("D5+D6", ["D5", "D6"])]
            fig, axes = plt.subplots(2, len(dsets), figsize=(2.6 * len(dsets), 5.4), squeeze=False)
            c0 = (n - 1) / 2
            ctrl = (c0 + 30, c0 + 30)  # control: 90" E-ish/N offset, fixed a priori
            for j, (nm, ds) in enumerate(dsets):
                g = [it for it in items if it["det"] in ds]
                if not g:
                    continue
                for row, key in enumerate(["comoving", "fixed"]):
                    mean, med, cov = stack(g, key)
                    if key == "comoving":
                        tx, ty = c0, c0
                    else:  # static stack: target smeared; measure at mean predicted position
                        pr, pd = predict(target, np.mean([it["mjd"] for it in g]))
                        tx, ty = map(float, gw.world_to_pixel_values(pr[0], pd[0]))
                    sig, nap = empty_ap_sigma(mean, [(tx, ty)], rng)
                    sigm, _ = empty_ap_sigma(med, [(tx, ty)], rng)
                    snr = aperture(mean, tx, ty) / sig
                    snr_med = aperture(med, tx, ty) / sigm
                    snr_ctrl = aperture(mean, *ctrl) / sig
                    cx, cy = centroid(mean, tx, ty, r=3.0)
                    R["shift_and_add"][f"{nm}_{key}"] = dict(n=len(g), snr_mean=snr, snr_median=snr_med,
                                                             snr_control=snr_ctrl, sigma_ap=sig, cen_dx_arcsec=(cx - tx) * PIX,
                                                             cen_dy_arcsec=(cy - ty) * PIX, n_empty=nap)
                    print(f"  {key} stack {nm}: n={len(g)} SNR mean={snr:.1f} median={snr_med:.1f} "
                          f"control={snr_ctrl:.1f} centroid offset=({(cx-tx)*PIX:+.1f},{(cy-ty)*PIX:+.1f})\"")
                    show(axes[row, j], mean, "faint",
                         f"{nm} {key} n={len(g)}\nSNR {snr:.1f} (ctrl {snr_ctrl:.1f})",
                         [(tx, ty, "red"), (ctrl[0], ctrl[1], "cyan")])
                    if key == "comoving" and nm == "D6":
                        # where the brief's 'epoch 2014' assumption would put it
                        tm = np.array([it["mjd"] for it in g])
                        br, bd = predict(target, tm.mean(), W0855_BRIEF)
                        pr, pd = predict(target, tm.mean())
                        off = list(map(float, gw.world_to_pixel_values(br[0], bd[0])))
                        pp = list(map(float, gw.world_to_pixel_values(pr[0], pd[0])))
                        R["brief_epoch2014_offset_arcsec"] = [(off[0] - pp[0]) * PIX, (off[1] - pp[1]) * PIX]
            fig.suptitle("WISE 0855: top = shift-and-add in target rest frame (all passes); bottom = static stack. "
                         "red = target, cyan = control", fontsize=8)
            fig.tight_layout()
            fig.savefig(os.path.join(imgdir, f"det08_w0855_shift_and_add{sfx}.png"), dpi=130)
            plt.close(fig)
        results[target] = R
    out = os.path.join(os.path.dirname(os.path.abspath(imgdir)), f"det08_results{sfx}.json")
    json.dump(results, open(out, "w"), indent=1, default=float)
    print("wrote", out)


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])
