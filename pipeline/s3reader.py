"""SPHEREx Level 2 byte-range reader over the public S3 bucket, plus IRSA TAP exposure lists.

Recipe (validated pixel-exact against IBE cutouts in docs/research/09, section 1 and 2):
  A  Range bytes=0-34559      PRIMARY + IMAGE header. The IMAGE data offset is the end of the
                              IMAGE header and differs per file, so A is always read.
  B  Range of whole rows      rows y0..y1 of the 2040 x 2040 big-endian float32 IMAGE
                              (8,160 B per row; columns are free).
  C  Range bytes=-5760        WCS-WAVE table: wavelength and bandwidth at any pixel. The control
                              grid is NOT square (D2 11 x 11, D4 13 x 20, D5/D6 9 x 9).
Every request goes through curl (Python urllib hung under uv Python, note 08), 3 tries.
Frames are cached as .npz (hdr, band, y0, X, Y, V, data_off), the same layout as the research
caches, so read-only seed caches can be reused and only missing rows are fetched.
"""
import csv, glob, io, os, subprocess, threading, time, urllib.parse
import numpy as np
from astropy.io import fits

S3 = "https://nasa-irsa-spherex.s3.us-east-1.amazonaws.com/"
TAP = "https://irsa.ipac.caltech.edu/TAP/sync"
BLOCK, NX = 2880, 2040
ROW = NX * 4
BUDGET = 480e6  # hard stop for new downloads per run (brief: under 500 MB)
_lock = threading.Lock()
STATS = dict(bytes=0, requests=0, retries=0)


class Fail(Exception):
    pass


def s3_url(uri):
    return S3 + uri.split("ibe/data/spherex/", 1)[1]


def release_of(uri):
    return uri.split("ibe/data/spherex/", 1)[1].split("/", 1)[0].upper()  # "DR1", "QR3", ...


def rget(url, rng, tries=3):
    """One HTTP Range GET through curl; checks status 206 and the byte count."""
    want = int(rng[1:]) if rng.startswith("-") else (lambda a, b: b - a + 1)(*map(int, rng.split("-")))
    last = None
    for attempt in range(tries):
        with _lock:
            if STATS["bytes"] + want > BUDGET:
                raise Fail(f"download budget {BUDGET / 1e6:.0f} MB reached")
        r = subprocess.run(["curl", "-sS", "-f", "-m", "120", "-r", rng, "-w", "%{stderr}@@%{http_code}", url],
                           capture_output=True)
        code = r.stderr.decode(errors="replace").rsplit("@@", 1)[-1].strip()
        if r.returncode == 0 and code == "206" and len(r.stdout) == want:
            with _lock:
                STATS["bytes"] += want; STATS["requests"] += 1
            return r.stdout
        last = f"curl exit {r.returncode} http {code} got {len(r.stdout)}/{want} B"
        with _lock:
            STATS["retries"] += 1
        time.sleep(1 + 2 * attempt)
    raise Fail(f"{url} {rng}: {last}")


def _headers_in(buf, start=0):
    off = start
    while off + BLOCK <= len(buf):
        blk = buf[off:off + BLOCK]
        off += BLOCK
        for i in range(0, BLOCK, 80):
            if blk[i:i + 8] == b"END     ":
                return buf[start:off].decode("ascii"), off
    return None


def read_head(url):
    """Request A: (IMAGE header, IMAGE data offset)."""
    buf = rget(url, f"0-{12 * BLOCK - 1}")
    while True:
        p = _headers_in(buf, 0)
        img = _headers_in(buf, p[1]) if p else None
        if img:
            hdr = fits.Header.fromstring(img[0])
            if hdr.get("EXTNAME") != "IMAGE" or hdr["NAXIS1"] != NX or hdr["BITPIX"] != -32:
                raise Fail(f"unexpected IMAGE header in {url}")
            return hdr, img[1]
        buf += rget(url, f"{len(buf)}-{len(buf) + 4 * BLOCK - 1}")


def read_rows(url, data_off, y0, y1):
    """Request B: rows y0..y1 (0-based, inclusive) as float32."""
    buf = rget(url, f"{data_off + y0 * ROW}-{data_off + (y1 + 1) * ROW - 1}")
    return np.frombuffer(buf, ">f4").reshape(y1 - y0 + 1, NX).astype(np.float32)


def read_wave(url):
    """Request C: (X, Y, VALUES[ny, nx, 2]) of the WCS-WAVE table."""
    buf = rget(url, "-5760")
    for s in range(0, len(buf), BLOCK):
        if buf[s:s + 9] == b"XTENSION=":
            h = _headers_in(buf, s)
            hdr = fits.Header.fromstring(h[0])
            if hdr.get("EXTNAME") == "WCS-WAVE":
                break
    else:
        raise Fail("WCS-WAVE header not in the last 5760 bytes")
    row = buf[h[1]:h[1] + hdr["NAXIS1"]]
    nx, ny = int(hdr["TFORM1"].strip()[:-1]), int(hdr["TFORM2"].strip()[:-1])
    assert hdr["NAXIS1"] == 4 * (nx + ny) + 8 * nx * ny
    X = np.frombuffer(row[:4 * nx], ">i4").astype(float)
    Y = np.frombuffer(row[4 * nx:4 * (nx + ny)], ">i4").astype(float)
    V = np.frombuffer(row[4 * (nx + ny):], ">f4").reshape(ny, nx, 2).astype(float)
    return X, Y, V


def wave_at(hdr, wave, x, y):
    """Wavelength and bandwidth (um) at 0-based file pixel (x, y): WAVE-TAB lookup, no SIP."""
    X, Y, V = wave
    px = hdr["CRVAL1W"] + hdr["CDELT1W"] * (x + 1 - hdr["CRPIX1W"])
    py = hdr["CRVAL2W"] + hdr["CDELT2W"] * (y + 1 - hdr["CRPIX2W"])
    fx, fy = np.interp(px, X, np.arange(len(X))), np.interp(py, Y, np.arange(len(Y)))
    i, j = min(int(fx), len(X) - 2), min(int(fy), len(Y) - 2)
    ax, ay = fx - i, fy - j
    v = ((1 - ax) * (1 - ay) * V[j, i] + ax * (1 - ay) * V[j, i + 1]
         + (1 - ax) * ay * V[j + 1, i] + ax * ay * V[j + 1, i + 1])
    return float(v[0]), float(v[1])


def _load_npz(path):
    with np.load(path, allow_pickle=False) as z:
        return dict(hdr=fits.Header.fromstring(str(z["hdr"])), band=z["band"].astype(np.float32), y0=int(z["y0"]),
                    wave=(z["X"], z["Y"], z["V"]), data_off=int(z["data_off"]))


def _save_npz(path, fr):
    tmp = path + ".part"
    with open(tmp, "wb") as f:
        np.savez(f, hdr=fr["hdr"].tostring(), band=fr["band"], y0=fr["y0"], X=fr["wave"][0], Y=fr["wave"][1],
                 V=fr["wave"][2], data_off=fr["data_off"])
    os.replace(tmp, path)  # atomic: an interrupted run never leaves a half-written cache file


def get_frame(uri, rows_needed, cachedir, seeds=()):
    """Header, wave grid and IMAGE rows covering rows_needed(hdr) -> (y0, y1).
    Looks in cachedir, then read-only seed caches (<stem>_h*.npz), then S3; fetches only the
    missing rows and saves the merged band to cachedir (never into a seed directory)."""
    stem = os.path.basename(uri)[:-5]
    own = os.path.join(cachedir, stem + ".npz")
    fr = _load_npz(own) if os.path.exists(own) else None
    if fr is None:
        for d in seeds:
            hits = sorted(glob.glob(os.path.join(d, stem + "_h*.npz")))
            if hits:
                fr = _load_npz(hits[0]); break
    url = s3_url(uri)
    changed = False
    if fr is None:
        hdr, off = read_head(url)
        fr = dict(hdr=hdr, data_off=off, wave=read_wave(url), band=np.zeros((0, NX), np.float32), y0=0)
        changed = True
    y0, y1 = rows_needed(fr["hdr"])
    have0, have1 = fr["y0"], fr["y0"] + len(fr["band"]) - 1
    if len(fr["band"]) == 0:
        fr["band"], fr["y0"] = read_rows(url, fr["data_off"], y0, y1), y0
        changed = True
    else:
        if y0 < have0:
            fr["band"] = np.vstack([read_rows(url, fr["data_off"], y0, have0 - 1), fr["band"]]); fr["y0"] = y0
            changed = True
        if y1 > have1:
            fr["band"] = np.vstack([fr["band"], read_rows(url, fr["data_off"], have1 + 1, y1)])
            changed = True
    if changed:
        os.makedirs(cachedir, exist_ok=True)
        _save_npz(own, fr)
    return fr


def get_header(uri, cachedir, seeds=()):
    """IMAGE header only (request A, 34,560 B), cached as <file>.fits.hdr like the research cache."""
    name = os.path.basename(uri) + ".hdr"
    for d in [cachedir, *seeds]:
        p = os.path.join(d, name)
        if os.path.exists(p):
            return fits.Header.fromstring(open(p).read())
    hdr, _ = read_head(s3_url(uri))
    os.makedirs(cachedir, exist_ok=True)
    open(os.path.join(cachedir, name), "w").write(hdr.tostring())
    return hdr


QUERY = ("SELECT a.uri, p.time_bounds_lower, p.time_bounds_upper, p.energy_bandpassname "
         "FROM spherex.artifact a JOIN spherex.plane p ON a.planeid = p.planeid "
         "WHERE 1 = CONTAINS(POINT('ICRS', {ra}, {dec}), p.poly) "
         "AND p.energy_bandpassname = 'SPHEREx-{det}' ORDER BY p.time_bounds_lower")


def tap_exposures(name, det, ra, dec, tapdir, seeds=(), refresh=False):
    """Exposure list (uri, times) for one detector at one sky point; cached CSV, seeds reused."""
    fn = f"{name}_{det}.csv"
    path = os.path.join(tapdir, fn)
    if not refresh and not os.path.exists(path):
        for d in seeds:
            if os.path.exists(os.path.join(d, fn)):
                path = os.path.join(d, fn); break
    if refresh or not os.path.exists(path):
        path = os.path.join(tapdir, fn)
        q = urllib.parse.urlencode({"QUERY": QUERY.format(ra=ra, dec=dec, det=det), "FORMAT": "CSV"})
        for attempt in range(3):
            r = subprocess.run(["curl", "-sf", "-m", "600", f"{TAP}?{q}"], capture_output=True)
            if r.returncode == 0 and r.stdout.startswith(b"uri,"):
                os.makedirs(tapdir, exist_ok=True)
                open(path + ".part", "wb").write(r.stdout); os.replace(path + ".part", path)
                break
            time.sleep(5 + 5 * attempt)
        else:
            raise Fail(f"TAP query failed for {fn}: curl exit {r.returncode}")
    return list(csv.DictReader(open(path))), path
