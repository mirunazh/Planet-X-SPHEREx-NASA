"""Build the static SPHEREx mission assets for the five challenge targets.

usage (from the repo root; see pipeline/README.md):
  uv run --with astropy --with numpy --with scipy --with reproject --with matplotlib --with pillow \
      python -I -B pipeline/build_missions.py --data <cache dir> [--seed <read-only cache dir> ...]
      [--only wise0855,epsindb] [--refresh-tap] [--out assets/missions]

Writes assets/missions/<id>/{manifest.json, contact.png, stacks/*.f32|png, exposures/*.f32} and
assets/missions/index.json. Each target is written as soon as it is done, so an interrupted run
keeps the finished targets; rerunning reuses every cached frame (downloads are resumable).
"""
import argparse, datetime, json, os, shutil, sys, time, warnings
from concurrent.futures import ThreadPoolExecutor

sys.dont_write_bytecode = True  # no __pycache__ in the repo
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import numpy as np
from astropy.coordinates import SkyCoord
import astropy.units as u
from astropy.wcs import WCS, FITSFixedWarning
import s3reader as S
import science as X

warnings.simplefilter("ignore", FITSFixedWarning)
warnings.filterwarnings("ignore", message=".*SIP.*")
import logging; logging.getLogger("astropy").setLevel(logging.ERROR)

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DOIS = {"DR1": "10.26131/IRSA678", "QR3": "10.26131/IRSA662", "QR2": "10.26131/IRSA652", "QR1": "10.26131/IRSA629"}  # note 03, section 0
NOTE06 = "docs/research/06-targets-and-planet-x-science.md, section 1 and appendix A (SIMBAD / Gaia DR3)"
GAP_DAYS, MIN_PASS = 20.0, 3

# Note 09: RW Aur field stars chosen by its pre-set rule (5 brightest compact sources, exp09_rwaur.json);
# reused verbatim so the matched-wavelength ratio reproduces note 09 without a new choice.
RWAUR_FIELD = [(76.9773393258569, 30.37529794926409, True), (76.92903366801137, 30.409463544722453, True),
               (76.98410652883905, 30.39529667708959, True), (76.954156261715, 30.420299651718246, False),
               (76.94932730165937, 30.378632827086868, False)]  # (ra, dec, bright: scatter < 20%)
EPS_IND_A = ("22 03 21.6536261624", "-56 47 09.522795714")  # J2000, note 06 appendix A

TARGETS = {
    "wise0855": dict(
        name="WISE 0855-0714", kind="mover",
        summary="The coldest known brown dwarf, 7.4 light years away, creeps west by about 8 arcseconds a year "
                "and glows only at 4 to 5 microns, so SPHEREx sees it in its longest-wavelength detectors and not in the short ones.",
        sexa=("08 55 16.53798", "-07 14 49.3728"), epoch=2000.0, pm=(-8123.7, 673.2), plx=439.0, rv=0.0,
        source="Kirkpatrick et al. 2021 position (J2000), proper motion and parallax via " + NOTE06,
        centre=(133.77696, -7.24362), tap=("w0855", 133.7683, -7.2429),
        groups=[("d5d6", "3.8 to 5.0 micron (detectors D5 and D6 stacked)", ["D5", "D6"]),
                ("d2", "1.1 to 1.65 micron (detector D2): where it should be invisible", ["D2"])],
        primary="d5d6", saturated=False,
        neighbours=[("CatWISE2020 J085501.95-071428.2", 133.7581637, -7.2411758)]),  # static star, note 08
    "epsindb": dict(
        name="Epsilon Indi B", kind="mover",
        summary="A pair of brown dwarfs 12 light years away that orbit the star Epsilon Indi A and sweep south-east "
                "by 4.7 arcseconds a year, bright and clean in SPHEREx's 1 to 1.65 micron detector.",
        sexa=("22 04 10.5951812451", "-56 46 58.239102418"), epoch=2000.0, pm=(3981.977, -2466.832), plx=270.658, rv=-40.0,
        source="Gaia DR3 photocentre of Ba+Bb propagated to J2000 (SIMBAD) via " + NOTE06,
        centre=(331.09699, -56.80076), tap=("epsindb", 331.096356, -56.800600),
        groups=[("d2", "1.1 to 1.65 micron (detector D2)", ["D2"])], primary="d2", saturated=False),
    "barnard": dict(
        name="Barnard's Star", kind="mover",
        summary="The fastest-moving star in the sky, a red dwarf 6 light years away that marches north by "
                "10.4 arcseconds a year, so bright that its centre saturates SPHEREx's detector.",
        sexa=("17 57 48.4984700685", "+04 41 36.113879676"), epoch=2000.0, pm=(-801.551, 10362.394), plx=546.9759, rv=-110.11,
        source="Gaia DR3 propagated to J2000 (SIMBAD) via " + NOTE06,
        centre=(269.44622, 4.76876), tap=("barnard", 269.4463, 4.7680),
        groups=[("d2", "1.1 to 1.65 micron (detector D2)", ["D2"])], primary="d2", saturated=True),
    "rwaur": dict(
        name="RW Aurigae", kind="variable",
        summary="A young T Tauri star 500 light years away, wrapped in a dusty disk that dims and brightens it; "
                "SPHEREx caught it about 0.37 magnitudes brighter in 2026 than in September 2025.",
        sexa=None, radec=(76.95608119552952, 30.401204589097233), epoch=2016.0, pm=(2.6406, -27.3976), plx=6.4062, rv=-20.94,
        source="Gaia DR3 156430822114424576 (component A), epoch 2016.0, via " + NOTE06,
        centre=(76.956089, 30.401133), tap=("rwaur", 76.956089, 30.401133),
        groups=[("d2", "1.1 to 1.65 micron (detector D2)", ["D2"])], primary="d2", saturated=False),
    "rdra": dict(
        name="R Draconis", kind="variable",
        summary="A pulsating red giant (a Mira variable) 2,600 light years away that swells and fades on a "
                "roughly 246-day cycle; it is so bright that SPHEREx only measures it from the wings of its saturated image.",
        sexa=("16 32 40.2265999080", "+66 45 17.925901992"), epoch=2000.0, pm=(-20.643, 6.149), plx=1.2509, rv=-132.8,
        source="Gaia DR3 propagated to J2000 (SIMBAD) via " + NOTE06,
        centre=(248.167242, 66.755023), tap=("rdra", 248.167242, 66.755023),
        groups=[("d6", "4.452 to 4.492 micron (detector D6, one narrow wavelength window)", ["D6"])],
        primary="d6", saturated=True, window=(4.452, 4.492)),
}
ORDER = ["wise0855", "epsindb", "barnard", "rwaur", "rdra"]

LITERATURE_VAR = {
    "rwaur": dict(magnitudesVega={"J": 8.378, "H": 7.621, "K": 7.020, "W1": 6.246, "W2": 5.228}, periodDays=None,
                  variability="Irregular: dimmings of 0.7 to 3 mag in V in 2010, 2012-13, 2014-15, 2016-19, and fading again in 2024-25 (note 06, UNVERIFIED in detail)",
                  distancePc=156.0, source=NOTE06),
    "rdra": dict(magnitudesVega={"J": 3.71, "H": 3.125, "K": 2.23, "W1": 0.393, "W2": 0.129}, periodDays=246.0,
                 vRange=[6.7, 13.2], variability="Mira variable, P about 246 d, V 6.7 to 13.2, K amplitude likely 0.5 to 0.9 mag (note 06, UNVERIFIED)",
                 distancePc=799.0, source=NOTE06),
}


def clean(o):
    if isinstance(o, dict):
        return {k: clean(v) for k, v in o.items()}
    if isinstance(o, (list, tuple)):
        return [clean(v) for v in o]
    if isinstance(o, (np.floating, float)):
        return None if not np.isfinite(o) else round(float(o), 7)
    if isinstance(o, np.integer):
        return int(o)
    if isinstance(o, np.bool_):
        return bool(o)
    return o


def astrometry(cfg):
    if cfg["sexa"]:
        c = SkyCoord(*cfg["sexa"], unit=(u.hourangle, u.deg))
        ra, dec = c.ra.deg, c.dec.deg
    else:
        ra, dec = cfg["radec"]
    return dict(ra=ra, dec=dec, epoch=cfg["epoch"], pmRaCosDecMasYr=cfg["pm"][0], pmDecMasYr=cfg["pm"][1],
                parallaxMas=cfg["plx"], radialVelocityKmS=cfg["rv"], source=cfg["source"])


def exp_id(uri):
    return os.path.basename(uri).split("_spx_")[0].replace("level2_", "")


def month_label(m0, m1):
    a = datetime.datetime(1858, 11, 17) + datetime.timedelta(days=m0)
    b = datetime.datetime(1858, 11, 17) + datetime.timedelta(days=m1)
    if (a.year, a.month) == (b.year, b.month):
        return a.strftime("%b %Y")
    return f"{a.strftime('%b')} to {b.strftime('%b %Y')}" if a.year == b.year else f"{a.strftime('%b %Y')} to {b.strftime('%b %Y')}"


def split_passes(mjds):
    order = np.argsort(mjds)
    lab = np.zeros(len(mjds), int)
    k = 0
    for i in range(1, len(order)):
        if mjds[order[i]] - mjds[order[i - 1]] > GAP_DAYS:
            k += 1
        lab[order[i]] = k
    return lab


def det_wave(det, uri, data):
    """One WCS-WAVE grid per detector for header-only wavelength selection (the grid is a per-detector
    calibration, identical across a year of files, note 09 section 1)."""
    p = os.path.join(data, f"wave_{det}.npz")
    if not os.path.exists(p):
        X_, Y_, V_ = S.read_wave(S.s3_url(uri))
        with open(p + ".part", "wb") as f:
            np.savez(f, X=X_, Y=Y_, V=V_)
        os.replace(p + ".part", p)
    with np.load(p, allow_pickle=False) as z:
        return z["X"], z["Y"], z["V"]


def select_window(rows, ast, lo, hi, data, seeds, det):
    """Header-only reads: keep exposures whose wavelength at the target is in [lo, hi] um."""
    wave = det_wave(det, rows[0]["uri"], data)
    with ThreadPoolExecutor(max_workers=8) as ex:  # network part only; astrometry below runs serially
        hdrs = list(ex.map(lambda r: S.get_header(r["uri"], os.path.join(data, "hdr"), seeds), rows))
    keep = []
    for r, hdr in zip(rows, hdrs):
        ra, dec = X.predict(ast, float(hdr["MJD-AVG"]))
        x, y = map(float, WCS(hdr).all_world2pix([[ra[0], dec[0]]], 0)[0])
        if 0 <= x < 2040 and 0 <= y < 2040 and lo <= S.wave_at(hdr, wave, x, y)[0] <= hi:
            keep.append(r)
    return keep


def load_group(tid, cfg, ast, dets, gw, outline, args, log):
    rows = []
    for det in dets:
        rs, path = S.tap_exposures(cfg["tap"][0], det, cfg["tap"][1], cfg["tap"][2], os.path.join(args.data, "tap"),
                                   args.seed, args.refresh_tap)
        log.append(dict(det=det, tapList=os.path.basename(path), nListed=len(rs)))
        if "window" in cfg:
            rs = select_window(rs, ast, *cfg["window"], args.data, args.seed, det)
            log[-1]["nInWindow"] = len(rs)
        rows += rs
    cache = os.path.join(args.data, "frames")

    def one(r):
        try:
            fr = S.get_frame(r["uri"], lambda h: X.native_box(h, outline)[2:4], cache, args.seed)
            return r["uri"], fr, None
        except Exception as e:
            return r["uri"], None, repr(e)[:200]
    t0 = time.time()
    with ThreadPoolExecutor(max_workers=8) as ex:  # at most 8 concurrent S3 requests
        got = list(ex.map(one, rows))
    failed = [dict(uri=u_, error=e) for u_, fr, e in got if fr is None]
    print(f"  {tid} {'+'.join(dets)}: {len(got) - len(failed)}/{len(got)} frames in {time.time() - t0:.0f} s, "
          f"downloaded so far {S.STATS['bytes'] / 1e6:.1f} MB", flush=True)
    E = []
    for uri, fr, _ in got:
        if fr is None:
            continue
        hdr = fr["hdr"]
        box = X.native_box(hdr, outline)
        img, w, g, bkg = X.prep_exposure(fr, box, gw)
        mjd = float(hdr["MJD-AVG"])
        ra, dec = X.predict(ast, mjd)
        fx, fy = map(float, WCS(hdr).all_world2pix([[ra[0], dec[0]]], 0)[0])
        wl, bw = S.wave_at(hdr, fr["wave"], fx, fy)
        E.append(dict(uri=uri, id=exp_id(uri), mjd=mjd, det=f"D{int(hdr['DETECTOR'])}", wl=wl, bw=bw, grid=g,
                      sigma=X.robust_sigma(g), bkg=bkg, native=img, nwcs=w, release=S.release_of(uri)))
    E.sort(key=lambda e: e["mjd"])
    return E, failed


def measure_pass(cube, sig, stack, px, py, saturated, rng):
    snr_sig = X.empty_ap_sigma(stack, [(px, py)], rng)
    flux = X.aperture(stack, px, py, min_finite=0.0 if saturated else 0.8)
    snr = flux / snr_sig if snr_sig and np.isfinite(snr_sig) and snr_sig > 0 else np.nan
    sat_r = X.ring_core(stack, px, py, kmax=10) if saturated else 0
    meas = None
    if np.isfinite(snr) and snr >= 5:
        cx, cy = X.centroid(stack, px, py)
        if np.isfinite(cx):
            ex_, ey_ = X.bootstrap_centroid_err(cube, sig, cx, cy, rng)
            meas = dict(x=cx, y=cy, errArcsec=float(np.hypot(ex_, ey_) / np.sqrt(2) * X.PIX),
                        errEastArcsec=ex_ * X.PIX, errNorthArcsec=ey_ * X.PIX, snr=snr,
                        offsetFromPredictedArcsec=dict(east=-(cx - px) * X.PIX, north=-(cy - py) * X.PIX))
    return snr, meas, sat_r


def attribute(meas, pra, pdec, neighbours):
    """ADDED AFTER LOOKING (WISE 0855 D2): a centroid that lands closer to a known static neighbour star than
    to the target's predicted position is credited to the neighbour, and the target counts as not detected."""
    c = np.cos(np.radians(pdec))
    dp = np.hypot((meas["ra"] - pra) * c * 3600, (meas["dec"] - pdec) * 3600)
    for name, nra, ndec in neighbours:
        dn = np.hypot((meas["ra"] - nra) * c * 3600, (meas["dec"] - ndec) * 3600)
        if dn < dp:
            return None, dict(name=name, ra=nra, dec=ndec, centroidRa=meas["ra"], centroidDec=meas["dec"], snr=meas["snr"],
                              centroidToNeighbourArcsec=dn, centroidToPredictedArcsec=dp,
                              note="The source in the aperture is this static star, not the target.")
    return meas, None


def build_group(tid, cfg, ast, gid, label, dets, gw, outline, outdir, args, gi):
    log = []
    E, failed = load_group(tid, cfg, ast, dets, gw, outline, args, log)
    lab = split_passes(np.array([e["mjd"] for e in E]))
    passes, dropped, kept = [], [], {}
    for k in sorted(set(lab)):
        g = [e for e, l in zip(E, lab) if l == k]
        if len(g) < MIN_PASS:
            dropped.append(dict(mjdStart=g[0]["mjd"], mjdEnd=g[-1]["mjd"], nExposures=len(g), label=month_label(g[0]["mjd"], g[-1]["mjd"]),
                                exposureIds=[e["id"] for e in g], reason=f"fewer than {MIN_PASS} exposures"))
            continue
        kept[k] = len(kept)
        for e in g:
            e["pass"] = kept[k]
    os.makedirs(os.path.join(outdir, "stacks"), exist_ok=True)
    os.makedirs(os.path.join(outdir, "exposures"), exist_ok=True)
    stacks = []
    for k, idx in kept.items():
        g = [e for e in E if e.get("pass") == idx]
        cube, sig = np.array([e["grid"] for e in g]), np.array([e["sigma"] for e in g])
        st = X.stack(cube, sig)
        wts = 1 / sig ** 2
        mid = float(np.sum(wts * [e["mjd"] for e in g]) / wts.sum())  # effective epoch of the stack
        ra, dec = X.predict(ast, mid)
        px, py = map(float, gw.wcs_world2pix([[ra[0], dec[0]]], 0)[0])
        rng = np.random.default_rng([gi, idx, 11])
        snr, meas, sat_r = measure_pass(cube, sig, st, px, py, cfg["saturated"], rng)
        blend = None
        if meas:
            meas["ra"], meas["dec"] = map(float, gw.wcs_pix2world([[meas["x"], meas["y"]]], 0)[0])
            meas, blend = attribute(meas, ra[0], dec[0], cfg.get("neighbours", []))
        name = f"{gid}_p{idx}"
        X.write_f32(os.path.join(outdir, "stacks", name + ".f32"), st)
        yy, xx = np.indices(st.shape)
        core = np.hypot(xx - px, yy - py) <= (sat_r + 2 if cfg["saturated"] else -1)
        passes.append(dict(index=idx, label=month_label(g[0]["mjd"], g[-1]["mjd"]), mjdStart=g[0]["mjd"], mjdEnd=g[-1]["mjd"],
                           mjdMid=mid, yearMid=float(X.jyear(mid)), nExposures=len(g),
                           detectors=sorted({e["det"] for e in g}),
                           wavelengthUmMin=min(e["wl"] for e in g), wavelengthUmMax=max(e["wl"] for e in g),
                           stack=f"stacks/{name}.f32", preview=f"stacks/{name}.png",
                           predicted=dict(ra=float(ra[0]), dec=float(dec[0]), x=px, y=py), measured=meas, snr=snr,
                           detected=meas is not None, blendedWith=blend, saturationRadiusPx=sat_r if cfg["saturated"] else None,
                           nanFraction=float(np.isnan(st).mean()), nanFractionOutsideCore=float(np.isnan(st[~core]).mean())))
        stacks.append(st)
        print(f"  {tid} {gid} pass {idx} ({passes[-1]['label']}): n={len(g)} wl {passes[-1]['wavelengthUmMin']:.3f}-"
              f"{passes[-1]['wavelengthUmMax']:.3f} S/N {snr:.1f} "
              + (f"offset E {meas['offsetFromPredictedArcsec']['east']:+.2f} N {meas['offsetFromPredictedArcsec']['north']:+.2f} "
                 f"+- {meas['errArcsec']:.2f}\"" if meas else "not detected") + (f" satR {sat_r}" if cfg["saturated"] else ""), flush=True)
    disp = X.display_hint(stacks)
    dexp = X.display_hint([e["grid"] for e in E])
    for p, st in zip(passes, stacks):
        X.write_png(os.path.join(outdir, p["preview"]), st, disp)
    exposures = []
    for e in E:
        X.write_f32(os.path.join(outdir, "exposures", e["id"] + ".f32"), e["grid"])
        exposures.append(dict(id=e["id"], pass_=e.get("pass"), mjd=e["mjd"], detector=e["det"], wavelengthUm=e["wl"],
                              bandwidthUm=e["bw"], frame=f"exposures/{e['id']}.f32", uri=S.s3_url(e["uri"]),
                              release=e["release"], noiseSigma=e["sigma"], background=e["bkg"]))
    for x_ in exposures:
        x_["pass"] = x_.pop("pass_")
    grp = dict(id=gid, label=label, detectors=dets, display=disp, displayExposure=dexp, stackMethod=X.STACK_METHOD,
               passes=passes, exposures=exposures, droppedPasses=dropped, failedExposures=failed, exposureLists=log)
    if cfg["saturated"]:
        grp["saturated"] = True
        grp["saturationRadiusPx"] = int(max([p["saturationRadiusPx"] for p in passes] or [0]))
    return grp, E, stacks


# ---------------------------------------------------------------- per-target extras
def mover_truth(cfg, grp):
    use = [p for p in grp["passes"] if p["measured"]]
    pmt = float(np.hypot(*cfg["pm"]) / 1000)
    dpc = 1000 / cfg["plx"]
    lit = dict(pmArcsecPerYear=pmt, parallaxMas=cfg["plx"], distancePc=dpc, distanceLy=dpc * 3.26156,
               tangentialVelocityKmS=4.74 * pmt * dpc)
    if len(use) < 2:
        return dict(group=grp["id"], motionArcsec=None, note="fewer than 2 passes with a measured position", literature=lit)
    a, b = use[0], use[-1]
    def d(p, q):
        e = (q["ra"] - p["ra"]) * np.cos(np.radians(p["dec"])) * 3600
        n = (q["dec"] - p["dec"]) * 3600
        return dict(east=e, north=n, total=float(np.hypot(e, n)))
    yrs = b["yearMid"] - a["yearMid"]
    m, pr = d(a["measured"], b["measured"]), d(a["predicted"], b["predicted"])
    return dict(group=grp["id"], fromPass=a["index"], toPass=b["index"], motionArcsec=m, predictedMotionArcsec=pr,
                baselineYears=yrs, rateArcsecPerYear=m["total"] / yrs, predictedRateArcsecPerYear=pr["total"] / yrs,
                literature=lit, note="motionArcsec is measured: difference of the stack centroids of the first and last passes "
                                     "with a detection (S/N >= 5); predictedMotionArcsec comes from the astrometry (proper motion + parallax).")


def rwaur_series(E, ast):
    """Note 09 section 7, reproduced: wing annulus [2, 5] native px (ring-core rule gives r_core = 0),
    background [8, 12]; 5 field stars (note 09's) normalise; 0.03 um bins; ratio to pass 0."""
    ra, dec = ast["ra"], ast["dec"]
    rcs = []
    for e in E:
        tra, tdec = X.predict(ast, e["mjd"])
        e["tx"], e["ty"] = map(float, e["nwcs"].all_world2pix([[tra[0], tdec[0]]], 0)[0])
        rcs.append(X.ring_core(e["native"], e["tx"], e["ty"], kmax=12))
    rc = float(np.percentile(rcs, 95))
    ain, aout, bin_, bout = rc + 2, rc + 5, rc + 8, rc + 12

    def star_flux(e, sra, sdec, rin, rout, b0, b1, ffmin):
        x, y = map(float, e["nwcs"].all_world2pix([[sra, sdec]], 0)[0])
        img = e["native"]
        if not (9 <= x < img.shape[1] - 9 and 9 <= y < img.shape[0] - 9):
            return np.nan
        core = img[int(round(y)) - 2:int(round(y)) + 3, int(round(x)) - 2:int(round(x)) + 3]
        if not np.isfinite(core).all():
            return np.nan
        f, ff = X.ann_flux(img, x, y, rin, rout, b0, b1)
        return f if ff > ffmin else np.nan
    SF = np.array([[star_flux(e, s[0], s[1], 0, 2.5, 5, 8, 0.99) for e in E] for s in RWAUR_FIELD])
    SF = SF / np.nanmedian(SF, 1, keepdims=True)
    norm = np.nanmedian(SF, 0)
    for e, nm in zip(E, norm):
        f, ff = X.ann_flux(e["native"], e["tx"], e["ty"], ain, aout, bin_, bout)
        e["wing"] = f / nm if ff >= 0.95 else np.nan
    ctrl = 0  # brightest field star, measured with the target's own annulus, normalised by the other bright stars
    others = [i for i, s in enumerate(RWAUR_FIELD) if s[2] and i != ctrl]
    with warnings.catch_warnings():  # exposures where both normalising stars fall off the box give NaN, as intended
        warnings.simplefilter("ignore", RuntimeWarning)
        cnorm = np.nanmedian(SF[others], 0)
    for e, nm in zip(E, cnorm):
        e["ctrl"] = star_flux(e, RWAUR_FIELD[ctrl][0], RWAUR_FIELD[ctrl][1], ain, aout, bin_, bout, 0.95) / nm
    bins = np.arange(1.08, 1.70, 0.03)
    ks = sorted({e["pass"] for e in E if e.get("pass") is not None})
    per = []
    for k in ks:
        t, c, nt, nc = [], [], [], []
        for lo, hi in zip(bins[:-1], bins[1:]):
            vt = [e["wing"] for e in E if e.get("pass") == k and lo <= e["wl"] < hi and np.isfinite(e["wing"])]
            vc = [e["ctrl"] for e in E if e.get("pass") == k and lo <= e["wl"] < hi and np.isfinite(e["ctrl"])]
            t.append(np.mean(vt) if vt else np.nan); c.append(np.mean(vc) if vc else np.nan)
            nt.append(len(vt)); nc.append(len(vc))
        per.append(dict(pass_=k, target=t, control=c, nTarget=nt, nControl=nc))
    ratios = []
    for p in per[1:]:
        def rr(key):
            r = np.array([b / a for a, b in zip(per[0][key], p[key]) if np.isfinite(a) and np.isfinite(b)])
            return (float(np.median(r)), float(np.std(r) / np.sqrt(len(r))), len(r)) if len(r) > 1 else (np.nan, np.nan, len(r))
        tr, te, tn = rr("target"); cr, ce, cn = rr("control")
        ratios.append(dict(pass_=p["pass_"], versusPass=per[0]["pass_"], ratio=tr, err=te, nBins=tn, deltaMag=-2.5 * np.log10(tr),
                           controlRatio=cr, controlErr=ce, controlNBins=cn))
    for p in per + ratios:
        p["pass"] = p.pop("pass_")
    return dict(matchedWavelength=dict(
        binsUm=[[float(a), float(b)] for a, b in zip(bins[:-1], bins[1:])], passes=per, ratios=ratios,
        targetAnnulusNativePx=[ain, aout], backgroundAnnulusNativePx=[bin_, bout], coreRadiusNativePx=rc,
        controlStar=dict(ra=RWAUR_FIELD[ctrl][0], dec=RWAUR_FIELD[ctrl][1]),
        fieldStars=[dict(ra=s[0], dec=s[1], usedForControlNorm=s[2] and i != ctrl) for i, s in enumerate(RWAUR_FIELD)],
        method="Per exposure, in native 6.15\" pixels: flux in the target's wing annulus minus a sigma-clipped background annulus, "
               "divided by the median over 5 field stars of (star flux / that star's median). Exposures are binned by the "
               "wavelength at the target (0.03 um); per bin the mean per pass; ratio = median over bins of pass k / pass 0, "
               "err = std over bins / sqrt(nBins). Control = the brightest field star measured with the same annulus, "
               "normalised by the other two bright field stars; it should give 1. Units: normalised annulus flux (relative).",
        unit="relative flux"))


def rdra_series(E, ast):
    """Note 09 section 6 (second run): ring-profile core rule, wing annulus [r+2, r+5] native px, raw wing flux."""
    for e in E:
        tra, tdec = X.predict(ast, e["mjd"])
        e["tx"], e["ty"] = map(float, e["nwcs"].all_world2pix([[tra[0], tdec[0]]], 0)[0])
    rcs = [X.ring_core(e["native"], e["tx"], e["ty"]) for e in E]
    rc = float(np.percentile(rcs, 95))
    ain, aout, bin_, bout = rc + 2, rc + 5, rc + 8, rc + 12
    w = np.array([X.ann_flux(e["native"], e["tx"], e["ty"], ain, aout, bin_, bout) for e in E])
    ok = (w[:, 1] >= 0.95) & (w[:, 0] > 0)
    mj = np.array([e["mjd"] for e in E])
    m = np.full(len(E), np.nan)
    m[ok] = -2.5 * np.log10(w[ok, 0] / np.median(w[ok, 0]))
    d = mj.astype(int); dev = []
    for dd in set(d[ok]):
        mm = m[ok & (d == dd)]
        if len(mm) >= 2:
            dev += list(mm - mm.mean())
    wdr = float(np.std(dev)) if dev else np.nan

    def fit(P):
        A = np.vstack([np.ones(ok.sum()), np.sin(2 * np.pi * mj[ok] / P), np.cos(2 * np.pi * mj[ok] / P)]).T
        c, *_ = np.linalg.lstsq(A, m[ok], rcond=None)
        return c, float(np.std(m[ok] - A @ c))
    c246, r246 = fit(246.0)
    grid = np.arange(100, 600, 1.0)
    res = [fit(q)[1] for q in grid]
    pts = [dict(mjd=e["mjd"], relMag=float(mm), err=wdr, wavelengthUm=e["wl"], exposure=e["id"], pass_=e.get("pass"))
           for e, mm, o in zip(E, m, ok) if o]
    for p in pts:
        p["pass"] = p.pop("pass_")
    lc = dict(points=pts, nDropped=int((~ok).sum()), coreRadiusNativePx=rc, coreRadiusPerExposurePercentiles=[float(v) for v in np.percentile(rcs, [0, 50, 95, 100])],
              wingAnnulusNativePx=[ain, aout], backgroundAnnulusNativePx=[bin_, bout],
              rmsMag=float(np.nanstd(m[ok])), withinDayRmsMag=wdr, nWithinDay=len(dev),
              fit246=dict(fullAmplitudeMag=float(2 * np.hypot(c246[1], c246[2])), residualRmsMag=r246),
              bestPeriodDays=float(grid[int(np.argmin(res))]), bestPeriodResidualMag=float(min(res)),
              method="Per exposure, native pixels: raw wing-annulus flux (sigma-clipped background annulus) relative to its "
                     "median, as magnitudes (negative = brighter). err = within-day scatter (same for every point). "
                     "No field-star normalisation: the field has no usable bright star at 4.5 um (note 09).",
              caveat="Indicative only: R Dra is 5 to 7 mag past saturation, the core is NaN or garbage out to about 3 native pixels, "
                     "and the ring-profile core rule was chosen after looking at the data (note 09). Per-point noise 0.2 to 0.3 mag; "
                     "three date clusters do not constrain the period.")
    return dict(lightCurve=lc)


def contact_sheet(path, tid, cfg, groups):
    import matplotlib
    matplotlib.use("Agg")
    import matplotlib.pyplot as plt
    ncol = max(len(g["passes"]) for g, _ in groups)
    fig, axes = plt.subplots(2 * len(groups), ncol, figsize=(2.4 * ncol, 2.6 * 2 * len(groups)), squeeze=False)
    cmap = plt.get_cmap("gray").copy(); cmap.set_bad("#3060c0")
    for gi, (g, stacks) in enumerate(groups):
        mid = g["passes"][len(g["passes"]) // 2]["predicted"] if g["passes"] else dict(x=60, y=60)
        zx, zy, h = int(round(mid["x"])), int(round(mid["y"])), 12
        for j in range(ncol):
            for r in (0, 1):
                ax = axes[2 * gi + r, j]; ax.set_xticks([]); ax.set_yticks([])
                if j >= len(g["passes"]):
                    ax.axis("off"); continue
                p, st = g["passes"][j], stacks[j]
                img = X.stretch(st, g["display"])
                img = np.where(np.isfinite(st), img, np.nan)
                off = (0, 0) if r == 0 else (zx - h, zy - h)
                if r == 1:
                    img = img[zy - h:zy + h + 1, zx - h:zx + h + 1]
                ax.imshow(img, cmap=cmap, vmin=0, vmax=1, interpolation="nearest")
                pr = p["predicted"]
                ax.add_patch(plt.Circle((pr["x"] - off[0], pr["y"] - off[1]), 3 if r else 7, fill=False, color="red", lw=0.8))
                if p["measured"]:
                    ax.plot(p["measured"]["x"] - off[0], p["measured"]["y"] - off[1], "+", color="cyan", ms=8 if r else 5, mew=1)
                snr = "n/a" if p["snr"] is None or not np.isfinite(p["snr"]) else f"{p['snr']:.1f}"
                ax.set_title((f"{g['id']} p{p['index']} {p['label']}\nn={p['nExposures']} S/N {snr}" if r == 0
                              else f"zoom +-36\" {'detected' if p['measured'] else 'not detected'}"), fontsize=7)
    fig.suptitle(f"{cfg['name']} ({tid}): pass stacks, 3\"/px, N up E left; red = predicted, cyan + = measured; "
                 f"blue = no data / saturated NaN", fontsize=8)
    fig.tight_layout()
    fig.savefig(path, dpi=110)
    plt.close(fig)


CAVEATS = {
    "wise0855": ["In the D2 group a normal star (CatWISE2020 J085501.95-071428.2) 4 to 8 arcsec from WISE 0855 is clearly visible "
                 "next to the predicted position (pass field blendedWith); WISE 0855 itself does not show at 1.1 to 1.65 micron.",
                 "At 0.6 to 1.3 SPHEREx pixels per pass the motion is subtle: zoom in and use the markers.",
                 "A static star (CatWISE2020 J085501.95-071428.2, W1 15.0) lies 4 to 11 arcsec from WISE 0855 during the "
                 "SPHEREx baseline and blends with it in D5 and in the short-wavelength detectors (note 08).",
                 "The challenge coordinates are the WISE-era (about 2010.45) position, 2 arcmin east of where the brown dwarf is in 2025 and 2026."],
    "epsindb": ["Epsilon Indi A, a K5 star about 8 magnitudes past saturation, lies 402 arcsec (6.7 arcmin) west, outside this "
                "field; no ghost or bloom from it was seen near B (note 09), but FLAGS were not read.",
                "Ba and Bb (about 0.7 arcsec apart) are unresolved; the position is their photocentre."],
    "barnard": ["The star saturates the detector: the NaN core in the stacks is left as is, and the measured position is the "
                "centroid of the unsaturated wings (plus any finite but nonlinear core pixels), as in note 08.",
                "S/N for a saturated star is computed from finite pixels only; it shows the star is bright, not a photometric precision."],
    "rwaur": ["RW Aur A and B (about 1.5 arcsec apart) fall in one SPHEREx pixel.",
              "Each exposure samples a different wavelength, so brightness is compared per wavelength bin, never frame to frame."],
    "rdra": ["Heavily saturated: the core is NaN or garbage out to about 3 native pixels; only the wings are used.",
             "The light curve is indicative only; the ring-profile core rule was chosen after looking at the data (note 09).",
             "A ring of compact spots about 60 arcsec from the star appears in some exposures (ghost or halo, unidentified)."],
}
AFTER_LOOKING = {
    "barnard": ["No FLAGS mask (the standard mask erases the saturated star, note 08)."],
    "rwaur": ["Field stars and control star taken from note 09 (that run's pre-set rule); the control-star check itself was added after looking in note 09."],
    "wise0855": ["Attribution rule: a centroid closer to the known static star CatWISE2020 J085501.95-071428.2 than to the "
                 "prediction is credited to that star (pass field blendedWith) and the target counts as not detected. Added after the "
                 "pre-set S/N >= 5 rule 'detected' WISE 0855 in 3 of 4 D2 passes: those centroids sit 0.06 to 0.43 arcsec from the star."],
    "rdra": ["Ring-profile core rule and raw (un-normalised) wing flux, both chosen after looking in note 09.",
             "Wavelength window 4.452 to 4.492 um chosen in note 09 by maximising distinct days."],
}


def build_target(tid, args):
    cfg = TARGETS[tid]
    ast = astrometry(cfg)
    gw = X.grid_wcs(*cfg["centre"])
    outline = X.grid_outline(gw)
    outdir = os.path.join(args.out, tid)
    if os.path.isdir(outdir):
        shutil.rmtree(outdir)  # stale files from an earlier build must not survive
    os.makedirs(outdir)
    print(f"== {tid}: {cfg['name']}", flush=True)
    groups, Es = [], {}
    for gi, (gid, label, dets) in enumerate(cfg["groups"]):
        grp, E, stacks = build_group(tid, cfg, ast, gid, label, dets, gw, outline, outdir, args, gi)
        groups.append((grp, stacks)); Es[gid] = E
    G = [g for g, _ in groups]
    man = dict(schema="mission-manifest/1", id=tid, name=cfg["name"], kind=cfg["kind"], summary=cfg["summary"],
               astrometry=ast,
               grid=dict(ra0=cfg["centre"][0], dec0=cfg["centre"][1], scaleArcsec=X.PIX, width=X.N, height=X.N, projection="TAN",
                         orientation="north up, east left: row 0 is the north (top) row, column 0 the east (left) column; "
                                     "pixel (x, y) = (column, row), 0-based pixel centres; FITS equivalent CRPIX1 = CRPIX2 = 61, "
                                     "CDELT1 = CDELT2 = -3/3600 deg (row index increases southward)",
                         fileFormat="raw little-endian float32, row-major, 121 x 121 values, MJy/sr after background subtraction, NaN = no data"),
               groups=G)
    pg = next(g for g in G if g["id"] == cfg["primary"])
    if cfg["kind"] == "mover":
        man["truth"] = mover_truth(cfg, pg)
    elif tid == "rwaur":
        man["series"] = rwaur_series(Es["d2"], ast)
        man["truth"] = dict(ratios=man["series"]["matchedWavelength"]["ratios"], literature=LITERATURE_VAR[tid])
    else:
        man["series"] = rdra_series(Es["d6"], ast)
        lc = man["series"]["lightCurve"]
        man["truth"] = dict(lightCurveRmsMag=lc["rmsMag"], fit246FullAmplitudeMag=lc["fit246"]["fullAmplitudeMag"],
                            bestPeriodDays=lc["bestPeriodDays"], literature=LITERATURE_VAR[tid])
    if tid == "wise0855":
        x_, y_ = map(float, gw.wcs_world2pix([[133.795129, -7.245147]], 0)[0])
        man["challengeInput"] = dict(ra=133.795129, dec=-7.245147, x=x_, y=y_,
                                     note="The challenge's coordinates (08h55m10.831s, -07d14m42.53s) are the WISE-era position "
                                          "(epoch about 2010.45, notes 06 and 08). Both they and the 2025 to 2026 position fall inside this field.")
    if tid == "epsindb":
        a = SkyCoord(*EPS_IND_A, unit=(u.hourangle, u.deg))
        c0 = SkyCoord(cfg["centre"][0] * u.deg, cfg["centre"][1] * u.deg)
        man["contaminants"] = [dict(name="Epsilon Indi A", ra=a.ra.deg, dec=a.dec.deg, sepFromCentreArcsec=c0.separation(a).arcsec,
                                    positionAngleDeg=c0.position_angle(a).deg, insideField=False,
                                    note="402 arcsec west of B (note 06), outside the 6-arcmin field")]
    rel = sorted({e["release"] for g in G for e in g["exposures"]})
    man["caveats"] = CAVEATS[tid]
    man["provenance"] = dict(releases=[dict(release=r, doi=DOIS.get(r), nExposures=sum(e["release"] == r for g in G for e in g["exposures"])) for r in rel],
                             pipeline="S3 range read", generatedAt=datetime.datetime.now(datetime.timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
                             builder="pipeline/build_missions.py", recipes="docs/research/08 and 09",
                             choicesAfterLooking=AFTER_LOOKING.get(tid, []),
                             zodi="not subtracted (a sigma-clipped median of the box is enough for fields of a few arcmin, note 09)",
                             flags="not read and not applied (the FLAGS mask erases saturated stars, note 08)")
    man["credits"] = dict(data="SPHEREx Level 2 spectral images (NASA/JPL-Caltech; archive: NASA/IPAC Infrared Science Archive, IRSA), "
                               "read from the public bucket s3://nasa-irsa-spherex",
                          dois={r: DOIS.get(r) for r in rel}, acknowledgement=None,
                          acknowledgementNote="No acknowledgement wording found in docs/research/03; left null rather than guessed.",
                          astrometry=cfg["source"])
    contact_sheet(os.path.join(outdir, "contact.png"), tid, cfg, groups)
    with open(os.path.join(outdir, "manifest.json.part"), "w") as f:
        json.dump(clean(man), f, indent=1, allow_nan=False)
    os.replace(os.path.join(outdir, "manifest.json.part"), os.path.join(outdir, "manifest.json"))
    print(f"== {tid}: manifest written", flush=True)


def write_index(out):
    ms = []
    for tid in ORDER:
        p = os.path.join(out, tid, "manifest.json")
        if os.path.exists(p):
            m = json.load(open(p))
            ms.append(dict(id=tid, name=m["name"], kind=m["kind"], summary=m["summary"], manifest=f"{tid}/manifest.json",
                           contactSheet=f"{tid}/contact.png", groups=[g["id"] for g in m["groups"]],
                           nPasses={g["id"]: len(g["passes"]) for g in m["groups"]}))
    json.dump(dict(schema="mission-index/1", generatedAt=datetime.datetime.now(datetime.timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
                   missions=ms), open(os.path.join(out, "index.json"), "w"), indent=1)


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--data", required=True, help="writable cache dir for TAP lists, headers and frames (outside the repo)")
    ap.add_argument("--seed", action="append", default=[], help="read-only cache dir to reuse (repeatable)")
    ap.add_argument("--only", default=",".join(ORDER))
    ap.add_argument("--out", default=os.path.join(REPO, "assets", "missions"))
    ap.add_argument("--refresh-tap", action="store_true", help="re-query IRSA TAP (new release) instead of cached lists")
    args = ap.parse_args()
    os.makedirs(args.data, exist_ok=True); os.makedirs(args.out, exist_ok=True)
    t0 = time.time()
    for tid in [t for t in ORDER if t in args.only.split(",")]:
        try:
            build_target(tid, args)
        except Exception as e:
            import traceback; traceback.print_exc()
            print(f"== {tid}: FAILED {e!r}", flush=True)
        write_index(args.out)
    print(f"done in {time.time() - t0:.0f} s; downloaded {S.STATS['bytes'] / 1e6:.1f} MB in {S.STATS['requests']} requests, "
          f"{S.STATS['retries']} retries", flush=True)


if __name__ == "__main__":
    main()
