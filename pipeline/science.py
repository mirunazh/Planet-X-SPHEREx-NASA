"""Astrometry, grid, stacking and measurement helpers for the mission asset build.

Copied and adapted from docs/research/experiments (det08_targets.py, det08_analyze.py,
exp09_targets.py, exp09_posthoc.py); see notes 08 and 09 for why each recipe is what it is.
"""
import warnings
import numpy as np
import astropy.units as u
from astropy.coordinates import SkyCoord, Distance, get_body_barycentric, CartesianRepresentation
from astropy.time import Time
from astropy.wcs import WCS
from astropy.stats import sigma_clipped_stats
from reproject import reproject_interp

PIX = 3.0     # arcsec per grid pixel
N = 121       # grid width and height (6.05 arcmin)


# ---------------------------------------------------------------- astrometry
def predict(ast, mjd):
    """Geocentric direction (deg) at MJD(s): space motion to the epoch, then minus the Earth's
    barycentric position (SPHEREx is in LEO). No aberration: the SPHEREx WCS is ICRS."""
    c = SkyCoord(ra=ast["ra"] * u.deg, dec=ast["dec"] * u.deg, distance=Distance(parallax=ast["parallaxMas"] * u.mas),
                 pm_ra_cosdec=ast["pmRaCosDecMasYr"] * u.mas / u.yr, pm_dec=ast["pmDecMasYr"] * u.mas / u.yr,
                 radial_velocity=ast.get("radialVelocityKmS", 0.0) * u.km / u.s,
                 obstime=Time(ast["epoch"], format="jyear", scale="tdb"), frame="icrs")
    t = Time(np.atleast_1d(mjd), format="mjd", scale="tdb")
    m = c.apply_space_motion(new_obstime=t).cartesian
    e = get_body_barycentric("earth", t)
    s = SkyCoord(CartesianRepresentation(m.x - e.x, m.y - e.y, m.z - e.z), frame="icrs")
    return s.ra.deg, s.dec.deg


def jyear(mjd):
    return 2000.0 + (np.asarray(mjd, float) - 51544.5) / 365.25


# ---------------------------------------------------------------- grid
def grid_wcs(ra0, dec0, n=N):
    """TAN grid, north up, east left, row 0 = north: CDELT2 is negative so array row 0 is the
    northern edge and column 0 the eastern edge, exactly the order of the .f32 files."""
    w = WCS(naxis=2)
    w.wcs.ctype = ["RA---TAN", "DEC--TAN"]
    w.wcs.crval = [ra0, dec0]
    w.wcs.crpix = [(n + 1) / 2, (n + 1) / 2]
    w.wcs.cdelt = [-PIX / 3600, -PIX / 3600]
    return w


def grid_outline(gw, n=N):
    """Sky positions along the grid border (pixel edges), for the native footprint."""
    e = np.linspace(-0.5, n - 0.5, 9)
    xs = np.concatenate([e, e, np.full(9, -0.5), np.full(9, n - 0.5)])
    ys = np.concatenate([np.full(9, -0.5), np.full(9, n - 0.5), e, e])
    return gw.wcs_pix2world(np.c_[xs, ys], 0)


def native_box(hdr, outline, margin=2):
    """Native pixel box (x0, x1, y0, y1, inclusive, clipped) that covers the grid outline."""
    p = WCS(hdr).all_world2pix(outline, 0)
    x0, y0 = np.floor(p.min(0)).astype(int) - margin
    x1, y1 = np.ceil(p.max(0)).astype(int) + margin
    lo, hi = 0, 2039
    return max(x0, lo), min(x1, hi), max(y0, lo), min(y1, hi)


def prep_exposure(fr, box, gw):
    """Background-subtracted native box (no FLAGS mask: NaN in IMAGE stays NaN), its TAN-SIP WCS,
    and the exposure reprojected (bilinear) onto the grid; NaN where there is no data."""
    x0, x1, y0, y1 = box
    hdr = fr["hdr"]
    img = fr["band"][y0 - fr["y0"]:y1 - fr["y0"] + 1, x0:x1 + 1].astype(float)
    w = WCS(hdr).slice((slice(y0, y1 + 1), slice(x0, x1 + 1)))
    good = np.isfinite(img)
    _, med, _ = sigma_clipped_stats(img[good], sigma=3)
    img = img - med
    g, _ = reproject_interp((img, w), gw, shape_out=(N, N), order="bilinear")
    return img, w, g.astype(np.float32), float(med)


def robust_sigma(a):
    v = a[np.isfinite(a)]
    return float(1.4826 * np.median(np.abs(v - np.median(v)))) if v.size else np.nan


# ---------------------------------------------------------------- stacking
STACK_METHOD = ("Inverse-variance weighted mean of the reprojected exposures; weight 1/sigma_i^2 with sigma_i = "
                "1.4826 x MAD of the finite pixels of exposure i on the grid. Passes with 5 or more exposures: "
                "each grid pixel with at least 5 finite values is sigma-clipped across exposures first "
                "(reject |value - median| > 4 x 1.4826 x MAD of that pixel's values, up to 3 iterations). "
                "Per-pixel scatter is used as the clipping sigma, not the background sigma_i, so that stars, "
                "whose flux changes with the wavelength sampled, are not clipped. NaN where no exposure has data.")


def stack(cube, sig, clip=True):
    d = np.array(cube, dtype=float)
    if clip and len(d) >= 5:
        with warnings.catch_warnings():
            warnings.simplefilter("ignore")
            for _ in range(3):
                nfin = np.isfinite(d).sum(0)
                med = np.nanmedian(d, 0)
                mad = 1.4826 * np.nanmedian(np.abs(d - med), 0)
                bad = (np.abs(d - med) > 4 * mad) & (mad > 0) & (nfin >= 5)
                if not bad.any():
                    break
                d[bad] = np.nan
    w = (1.0 / np.asarray(sig, float) ** 2)[:, None, None] * np.isfinite(d)
    ws = w.sum(0)
    with np.errstate(invalid="ignore", divide="ignore"):
        out = np.where(ws > 0, np.nansum(np.nan_to_num(d) * w, 0) / ws, np.nan)
    return out.astype(np.float32)


# ---------------------------------------------------------------- measurement (det08)
def aperture(img, x, y, r=3.0, rin=6.0, rout=10.0, min_finite=0.8):
    """9" aperture, 18-30" annulus median background; scaled for missing pixels."""
    yy, xx = np.indices(img.shape)
    rr = np.hypot(xx - x, yy - y)
    ap = rr <= r
    ann = (rr >= rin) & (rr <= rout) & np.isfinite(img)
    nf = np.isfinite(img[ap]).sum()
    if nf == 0 or nf < min_finite * ap.sum() or ann.sum() < 20:
        return np.nan
    return float(np.nansum(img[ap] - np.median(img[ann])) * ap.sum() / nf)


def empty_ap_sigma(img, avoid_xy, rng, n=300, avoid_r=10.0):
    """Robust scatter of the same aperture at random empty positions (includes the noise
    correlation that interpolation creates and confusion from faint sources)."""
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
    return float(1.4826 * np.median(np.abs(vals - np.median(vals)))) if len(vals) > 20 else np.nan


def centroid(img, x, y, r=4.0, it=5):
    """Flux-weighted centroid (negative pixels clipped, NaN ignored), 12" radius, 5 iterations."""
    yy, xx = np.indices(img.shape)
    for _ in range(it):
        m = (np.hypot(xx - x, yy - y) <= r) & np.isfinite(img)
        wgt = np.clip(img[m], 0, None)
        if wgt.sum() <= 0:
            return np.nan, np.nan
        x, y = (xx[m] * wgt).sum() / wgt.sum(), (yy[m] * wgt).sum() / wgt.sum()
    return float(x), float(y)


def bootstrap_centroid_err(cube, sig, x, y, rng, nboot=100, half=15):
    """Centroid scatter (grid px, x and y) over stacks of exposures resampled with replacement.
    Works on a (2*half+1)^2 window around (x, y) for speed."""
    ix, iy = int(round(x)), int(round(y))
    ya, xa = max(iy - half, 0), max(ix - half, 0)
    sub = np.asarray(cube)[:, ya:iy + half + 1, xa:ix + half + 1]
    sig = np.asarray(sig)
    pts = []
    for _ in range(nboot):
        k = rng.integers(0, len(sub), len(sub))
        cx, cy = centroid(stack(sub[k], sig[k]), x - xa, y - ya)
        if np.isfinite(cx):
            pts.append((cx, cy))
    if len(pts) < 10:
        return np.nan, np.nan
    pts = np.array(pts)
    return float(np.std(pts[:, 0])), float(np.std(pts[:, 1]))


def ring_core(img, x, y, kmax=25):
    """Saturated-core radius: smallest k whose ring [k, k+1) around (x, y) is under 10% NaN
    (the ring-profile rule of note 09, chosen there after looking at R Dra)."""
    yy, xx = np.indices(img.shape)
    r = np.hypot(xx - x, yy - y)
    for k in range(kmax):
        ring = (r >= k) & (r < k + 1)
        if ring.any() and (~np.isfinite(img[ring])).mean() < 0.1:
            return k
    return kmax


# ---------------------------------------------------------------- native-pixel photometry (exp09)
def ann_mask(shape, x, y, rin, rout, ss=5):
    yy, xx = np.indices(shape, dtype=float)
    o = (np.arange(ss) + 0.5) / ss - 0.5
    m = np.zeros(shape)
    for dy in o:
        for dx in o:
            r = np.hypot(xx + dx - x, yy + dy - y)
            m += (r >= rin) & (r < rout)
    return m / ss ** 2


def ann_flux(img, x, y, rin, rout, bin_, bout):
    """Annulus (or disc, rin = 0) flux with a sigma-clipped local background; returns
    (flux scaled for missing pixels, finite fraction of the annulus)."""
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


# ---------------------------------------------------------------- display
def display_hint(images):
    """Shared asinh stretch from robust statistics: vmin = median - 3 sigma, vmax = median over
    images of the 99.9th percentile, soft = 3 sigma / (vmax - vmin) (linear up to ~3 sigma)."""
    sig = float(np.median([robust_sigma(a) for a in images]))
    med = float(np.median([np.nanmedian(a) for a in images]))
    vmax = float(np.median([np.nanpercentile(a, 99.9) for a in images]))
    vmin = med - 3 * sig
    vmax = max(vmax, vmin + 10 * sig)
    return dict(vmin=vmin, vmax=vmax, stretch="asinh", soft=float(np.clip(3 * sig / (vmax - vmin), 1e-4, 1.0)),
                sigma=sig, formula="t = clip((v - vmin) / (vmax - vmin), 0, 1); out = asinh(t / soft) / asinh(1 / soft)")


def stretch(img, d):
    t = np.clip((img - d["vmin"]) / (d["vmax"] - d["vmin"]), 0, 1)
    return np.arcsinh(t / d["soft"]) / np.arcsinh(1 / d["soft"])


def write_png(path, img, d):
    """8-bit grey + alpha PNG; NaN pixels get alpha 0."""
    from PIL import Image
    g = np.nan_to_num(np.round(255 * stretch(img, d)), nan=0).astype(np.uint8)
    a = np.where(np.isfinite(img), 255, 0).astype(np.uint8)
    Image.fromarray(np.dstack([g, a]), mode="LA").save(path, optimize=True)


def write_f32(path, img):
    np.ascontiguousarray(img, dtype="<f4").tofile(path)
