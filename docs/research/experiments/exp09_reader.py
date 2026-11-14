"""Experiment 09, part 1: minimal S3 byte-range reader for SPHEREx Level 2 files.

Recipe per exposure (byte arithmetic in 09-s3-range-reader-and-remaining-targets.md):
  A  Range bytes=0-34559           PRIMARY + IMAGE header (extended by 2880-byte blocks if END
                                   is missing). Gives TAN-SIP WCS, MJD-AVG, DETECTOR and the
                                   IMAGE data offset = end of the IMAGE header.
  B  Range covering the box rows   rows y0..y1 of the 2040-wide big-endian float32 IMAGE:
                                   bytes off+y0*8160 .. off+(y1+1)*8160-1, then slice columns.
  C  Range bytes=-5760             WCS-WAVE header + its one row (X, Y index vectors and the
                                   VALUES control-point grid). Wavelength/bandwidth at a pixel
                                   = bilinear interpolation on that grid (the -TAB algorithm).
  optional ZODI: FLAGS header (at off + 16,646,400) -> PCOUNT -> VARIANCE header -> ZODI
                 header -> ZODI rows (same row arithmetic as B).

usage:
  python -I exp09_reader.py validate <w8 cutout dir> <w8 tap dir> <cachedir>
  python -I exp09_reader.py timing <tap csv> <cachedir> <n_seq> <n_par> <workers> <out json>
  python -I exp09_reader.py zodi <tap csv> <cachedir> <n> <out json>
All downloads go through curl (urllib hung under uv Python in experiment 08), 3 tries each.
"""
import csv, glob, io, json, os, subprocess, sys, time, warnings
from concurrent.futures import ThreadPoolExecutor
import numpy as np
from astropy.io import fits
from astropy.wcs import WCS, FITSFixedWarning

warnings.simplefilter("ignore", FITSFixedWarning)
warnings.filterwarnings("ignore", message=".*SIP.*")
import logging; logging.getLogger("astropy").setLevel(logging.ERROR)

S3 = "https://nasa-irsa-spherex.s3.us-east-1.amazonaws.com/"
BLOCK = 2880
NX = 2040
ROW = NX * 4  # bytes per IMAGE row


def s3_url(uri):
    return S3 + uri.split("ibe/data/spherex/", 1)[1]


class Fail(Exception):
    pass


def rget(url, rng, log, tag, tries=3):
    """One HTTP Range GET through curl. rng = 'a-b' or '-n' (suffix). Appends a record to log."""
    last = None
    for attempt in range(tries):
        t0 = time.perf_counter()
        r = subprocess.run(["curl", "-sS", "-f", "-m", "120", "-r", rng, "-w",
                            "%{stderr}@@%{http_code} %{time_total} %{time_starttransfer}", url],
                           capture_output=True)
        dt = time.perf_counter() - t0
        tail = r.stderr.decode(errors="replace").rsplit("@@", 1)
        code = tail[1].split()[0] if len(tail) == 2 else "?"
        rec = dict(tag=tag, range=rng, t=dt, bytes=len(r.stdout), code=code, exit=r.returncode,
                   attempt=attempt, ttfb=float(tail[1].split()[2]) if len(tail) == 2 else None)
        if rng.startswith("-"):
            want = int(rng[1:])
        else:
            a, b = map(int, rng.split("-")); want = b - a + 1
        if r.returncode == 0 and code == "206" and len(r.stdout) == want:
            log.append(rec)
            return r.stdout
        rec["error"] = f"exit {r.returncode} http {code} got {len(r.stdout)}/{want} B {tail[0].strip()[:80]}"
        log.append(rec)
        last = rec["error"]
        time.sleep(1 + 2 * attempt)
    raise Fail(f"{tag}: {last}")


def headers_in(buf, start=0):
    """Walk 2880-byte blocks from buf[start]; return (header_text, data_offset) or None if no END."""
    off = start
    while off + BLOCK <= len(buf):
        blk = buf[off:off + BLOCK]
        off += BLOCK
        for i in range(0, BLOCK, 80):
            if blk[i:i + 8] == b"END     ":
                return buf[start:off].decode("ascii"), off
    return None


def read_head(url, log):
    """Request A. Returns (IMAGE header, IMAGE data offset)."""
    n = 12 * BLOCK  # 34,560 bytes
    buf = rget(url, f"0-{n - 1}", log, "A")
    while True:
        p = headers_in(buf, 0)
        if p:
            img = headers_in(buf, p[1])
            if img:
                hdr = fits.Header.fromstring(img[0])
                assert hdr.get("EXTNAME") == "IMAGE" and hdr["NAXIS1"] == NX and hdr["BITPIX"] == -32, hdr.get("EXTNAME")
                return hdr, img[1]
        buf += rget(url, f"{len(buf)}-{len(buf) + 4 * BLOCK - 1}", log, "A+")


def read_rows(url, data_off, y0, y1, log, tag="B"):
    """Request B. Rows y0..y1 (0-based, inclusive) of a 2040x2040 big-endian float32 HDU."""
    buf = rget(url, f"{data_off + y0 * ROW}-{data_off + (y1 + 1) * ROW - 1}", log, tag)
    return np.frombuffer(buf, ">f4").reshape(y1 - y0 + 1, NX).astype(np.float32)


def read_wave(url, log):
    """Request C. Returns (X, Y, VALUES[ny, nx, 2]) from the last HDU (WCS-WAVE)."""
    buf = rget(url, "-5760", log, "C")
    for s in range(0, len(buf), BLOCK):
        if buf[s:s + 9] == b"XTENSION=":
            h = headers_in(buf, s)
            hdr = fits.Header.fromstring(h[0])
            if hdr.get("EXTNAME") == "WCS-WAVE":
                break
    else:
        raise Fail("WCS-WAVE header not in last 5760 bytes")
    row = buf[h[1]:h[1] + hdr["NAXIS1"]]
    # X and Y lengths differ per detector (D6: 9 x 9, D4: 13 x 20 with a step at rows 1800/1801)
    nx, ny = int(hdr["TFORM1"].strip()[:-1]), int(hdr["TFORM2"].strip()[:-1])
    assert hdr["TTYPE1"].strip() == "X" and hdr["TTYPE2"].strip() == "Y" and hdr["TTYPE3"].strip() == "VALUES"
    assert hdr["TFORM3"].strip() == f"{2 * nx * ny}E" and hdr["NAXIS1"] == 4 * (nx + ny) + 8 * nx * ny
    X = np.frombuffer(row[:4 * nx], ">i4").astype(float)
    Y = np.frombuffer(row[4 * nx:4 * (nx + ny)], ">i4").astype(float)
    V = np.frombuffer(row[4 * (nx + ny):], ">f4").reshape(ny, nx, 2).astype(float)  # FITS TDIM (2,nx,ny)
    return X, Y, V


def wave_at(hdr, wave, x, y):
    """Wavelength, bandwidth (um) at 0-based file pixel (x, y). WAVE-TAB per WCS paper III:
    psi_i = CRVALiW + CDELTiW * (p_i - CRPIXiW), p 1-based; index via X/Y; bilinear on VALUES."""
    X, Y, V = wave
    px = hdr["CRVAL1W"] + hdr["CDELT1W"] * (x + 1 - hdr["CRPIX1W"])
    py = hdr["CRVAL2W"] + hdr["CDELT2W"] * (y + 1 - hdr["CRPIX2W"])
    fx = np.interp(px, X, np.arange(len(X)))
    fy = np.interp(py, Y, np.arange(len(Y)))
    i, j = min(int(fx), len(X) - 2), min(int(fy), len(Y) - 2)
    ax, ay = fx - i, fy - j
    v = ((1 - ax) * (1 - ay) * V[j, i] + ax * (1 - ay) * V[j, i + 1]
         + (1 - ax) * ay * V[j + 1, i] + ax * ay * V[j + 1, i + 1])
    return float(v[0]), float(v[1])


def read_zodi_rows(url, data_off, y0, y1, log):
    """Optional: walk FLAGS -> VARIANCE -> ZODI headers (offsets are not constant) and read rows."""
    f_off = data_off + NX * NX * 4  # 16,646,400 B, a whole number of blocks
    buf = rget(url, f"{f_off}-{f_off + 7 * BLOCK - 1}", log, "Zf")
    h = headers_in(buf); fh = fits.Header.fromstring(h[0])
    assert fh["EXTNAME"] == "FLAGS", fh["EXTNAME"]
    fsize = fh["NAXIS1"] * fh["NAXIS2"] + fh["PCOUNT"]
    v_off = f_off + h[1] + -(-fsize // BLOCK) * BLOCK
    buf = rget(url, f"{v_off}-{v_off + 5 * BLOCK - 1}", log, "Zv")
    h = headers_in(buf); assert fits.Header.fromstring(h[0])["EXTNAME"] == "VARIANCE"
    z_off = v_off + h[1] + NX * NX * 4
    buf = rget(url, f"{z_off}-{z_off + 5 * BLOCK - 1}", log, "Zz")
    h = headers_in(buf); assert fits.Header.fromstring(h[0])["EXTNAME"] == "ZODI"
    return read_rows(url, z_off + h[1], y0, y1, log, "Zr"), dict(flags=f_off, variance=v_off, zodi=z_off, zodi_data=z_off + h[1])


def read_frame(uri, ra, dec, cachedir, half=30, log=None, rows=None):
    """A + B + C for one exposure; caches header text, row band and wave grid as .npz.
    rows=(y0, y1) overrides the box (used by the validation against cutouts)."""
    path = os.path.join(cachedir, os.path.basename(uri).replace(".fits", f"_h{half}.npz"))
    log = [] if log is None else log
    if os.path.exists(path) and rows is None:
        z = np.load(path, allow_pickle=False)
        hdr = fits.Header.fromstring(str(z["hdr"]))
        return dict(hdr=hdr, band=z["band"], y0=int(z["y0"]), wave=(z["X"], z["Y"], z["V"]),
                    data_off=int(z["data_off"]), cached=True)
    url = s3_url(uri)
    hdr, off = read_head(url, log)
    w = WCS(hdr)
    x, y = map(float, w.all_world2pix([[ra, dec]], 0)[0])  # SIP on
    if rows is None:
        iy = int(round(y))
        y0, y1 = max(iy - half, 0), min(iy + half, NX - 1)
        if y1 < y0:
            raise Fail(f"target row {iy} outside detector")
    else:
        y0, y1 = rows
    band = read_rows(url, off, y0, y1, log)
    wave = read_wave(url, log)
    if rows is None:
        os.makedirs(cachedir, exist_ok=True)
        np.savez(path, hdr=hdr.tostring(), band=band, y0=y0, X=wave[0], Y=wave[1], V=wave[2], data_off=off)
    return dict(hdr=hdr, band=band, y0=y0, wave=wave, data_off=off, x=x, y=y, cached=False)


def band_wcs(hdr, y0, nrows):
    """WCS of the row band (TAN-SIP), shifted so band pixel (x, y - y0) maps like file pixel (x, y)."""
    return WCS(hdr).slice((slice(y0, y0 + nrows), slice(None)))


# ---------------------------------------------------------------- validation vs IBE cutouts
def validate(cutdir, tapdir, cachedir):
    sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
    from det08_targets import predict
    uris = {}
    for f in glob.glob(os.path.join(tapdir, "w0855_*.csv")):
        for r in csv.DictReader(open(f)):
            uris[os.path.basename(r["uri"])] = r["uri"]
    picks = []
    for det in ["D6", "D5", "D4"]:
        fs = sorted(glob.glob(os.path.join(cutdir, det, "*.fits")))
        picks += [fs[0], fs[len(fs) // 2]]
    out = []
    for f in picks:
        log = []
        with fits.open(f) as h:
            ch = h["IMAGE"].header; cimg = h["IMAGE"].data.astype(np.float32)
            wa = WCS(ch, key="A")
            px0, py0 = (int(round(v)) for v in wa.wcs_pix2world([[0, 0]], 0)[0])
            ny, nx = cimg.shape
            mjd = ch["MJD-AVG"]
            ra, dec = predict("w0855", mjd); ra, dec = ra[0], dec[0]
            cx, cy = map(float, WCS(ch).all_world2pix([[ra, dec]], 0)[0])
            ws = WCS(ch, fobj=h, key="W"); ws.sip = None
            wl_ast, bw_ast = (float(np.atleast_1d(v)[0]) for v in ws.wcs_pix2world([[cx, cy]], 0)[0])
            cX, cY, cV = (h["WCS-WAVE"].data[k][0] for k in ("X", "Y", "VALUES"))
        t0 = time.perf_counter()
        fr = read_frame(uris[os.path.basename(f)], ra, dec, cachedir, log=log, rows=(py0, py0 + ny - 1))
        dt = time.perf_counter() - t0
        sub = fr["band"][:, px0:px0 + nx]
        same = bool(np.array_equal(sub, cimg, equal_nan=True))
        wl, bw = wave_at(fr["hdr"], fr["wave"], fr["x"], fr["y"])
        rec = dict(file=os.path.basename(f), det=ch["DETECTOR"], cutout_shape=[ny, nx], parent_origin=[px0, py0],
                   pixels_identical=same, n_finite=int(np.isfinite(cimg).sum()),
                   max_abs_diff=float(np.nanmax(np.abs(sub - cimg))),
                   target_px_s3=[fr["x"], fr["y"]], target_px_cutout_plus_origin=[cx + px0, cy + py0],
                   dpix=float(np.hypot(fr["x"] - cx - px0, fr["y"] - cy - py0)),
                   wl_reader=wl, bw_reader=bw, wl_astropy_cutout=wl_ast, bw_astropy_cutout=bw_ast,
                   wave_table_identical=bool(np.array_equal(fr["wave"][0], cX) and np.array_equal(fr["wave"][1], cY)
                                             and np.array_equal(fr["wave"][2], np.asarray(cV, float).reshape(fr["wave"][2].shape))),
                   data_off=fr["data_off"], t_total=dt, requests=log)
        print(f"{rec['file']}: D{rec['det']} {ny}x{nx} origin {px0},{py0} identical={same} "
              f"dpix={rec['dpix']:.2e} wl {wl:.5f} vs astropy {wl_ast:.5f}, bw {bw:.5f} vs {bw_ast:.5f}, "
              f"wave table identical={rec['wave_table_identical']} data_off={fr['data_off']} t={dt:.1f}s", flush=True)
        out.append(rec)
    return out


# ---------------------------------------------------------------- timing
def timing(tapcsv, cachedir, n_seq, n_par, workers, ra, dec):
    rows = list(csv.DictReader(open(tapcsv)))
    def one(uri):
        log = []
        t0 = time.perf_counter()
        try:
            fr = read_frame(uri, ra, dec, cachedir, log=log)
            ok, err = True, None
        except Exception as e:
            ok, err = False, repr(e)[:200]
        return dict(uri=uri, ok=ok, err=err, t=time.perf_counter() - t0, requests=log)
    res = {}
    seq = [r["uri"] for r in rows[:n_seq]]
    par = [r["uri"] for r in rows[n_seq:n_seq + n_par]]
    t0 = time.perf_counter(); res["sequential"] = [one(u) for u in seq]; res["seq_wall"] = time.perf_counter() - t0
    t0 = time.perf_counter()
    with ThreadPoolExecutor(max_workers=workers) as ex:
        res["parallel"] = list(ex.map(one, par))
    res["par_wall"] = time.perf_counter() - t0
    res["workers"] = workers
    return res


def zodi_test(tapcsv, cachedir, n, ra, dec):
    """ZODI over the 61x61 box vs a sigma-clipped local median: how much structure is left?"""
    from astropy.stats import sigma_clipped_stats
    rows = list(csv.DictReader(open(tapcsv)))
    idx = np.linspace(0, len(rows) - 1, n).astype(int)
    out = []
    for i in idx:
        uri = rows[i]["uri"]; log = []
        fr = read_frame(uri, ra, dec, cachedir)
        url = s3_url(uri)
        y0, y1 = fr["y0"], fr["y0"] + fr["band"].shape[0] - 1
        z, offs = read_zodi_rows(url, fr["data_off"], y0, y1, log)
        x = int(round(float(WCS(fr["hdr"]).all_world2pix([[ra, dec]], 0)[0][0])))
        sl = slice(max(x - 30, 0), x + 31)
        img, zz = fr["band"][:, sl].astype(float), z[:, sl].astype(float)
        good = np.isfinite(img)
        _, m1, s1 = sigma_clipped_stats(img[good], sigma=3)
        _, m2, s2 = sigma_clipped_stats((img - zz)[good], sigma=3)
        a = (img - m1) - (img - zz - m2)  # difference between the two background treatments = ZODI - median
        # aperture photometry sees only the ZODI gradient across aperture + annulus (r <= 30" = 5 px)
        yy, xx = np.mgrid[:zz.shape[0], :zz.shape[1]]
        cy, cx = zz.shape[0] // 2, zz.shape[1] // 2
        near = np.hypot(yy - cy, xx - cx) <= 5
        rec = dict(uri=os.path.basename(uri), zodi_median=float(np.median(zz)), zodi_ptp_box=float(np.ptp(zz)),
                   zodi_ptp_r30=float(np.ptp(zz[near])), resid_rms_box=float(np.std(a[good])), pixel_sigma=float(s1),
                   pixel_sigma_after_zodi=float(s2), offsets=offs, requests=log)
        print(f"{rec['uri']}: ZODI median {rec['zodi_median']:.3f} MJy/sr, ptp box {rec['zodi_ptp_box']:.4f}, "
              f"ptp r<=30\" {rec['zodi_ptp_r30']:.4f}, residual rms {rec['resid_rms_box']:.4f}, pixel sigma {s1:.4f} -> {s2:.4f}", flush=True)
        out.append(rec)
    return out


if __name__ == "__main__":
    cmd = sys.argv[1]
    if cmd == "validate":
        res = validate(*sys.argv[2:5])
        json.dump(res, open(sys.argv[5], "w"), indent=1)
        assert all(r["pixels_identical"] for r in res) and len(res) >= 3
        assert all(abs(r["wl_reader"] - r["wl_astropy_cutout"]) < 1e-4 for r in res)
        print("VALIDATION PASSED")
    elif cmd == "timing":
        tapcsv, cachedir, n_seq, n_par, workers, outp, ra, dec = sys.argv[2:10]
        res = timing(tapcsv, cachedir, int(n_seq), int(n_par), int(workers), float(ra), float(dec))
        json.dump(res, open(outp, "w"), indent=1)
        print("wrote", outp)
    elif cmd == "zodi":
        tapcsv, cachedir, n, outp, ra, dec = sys.argv[2:8]
        json.dump(zodi_test(tapcsv, cachedir, int(n), float(ra), float(dec)), open(outp, "w"), indent=1)
