"""Build the static SPHEREx Level 2 image index (assets/index/) from the rows fetched by fetch_rows.py.

usage (from the repo root):
  uv run --with numpy --with astropy python -I pipeline/index/build_index.py --rows <rows dir> [--out assets/index]
      [--allow-partial]

Output: meta.json + cells/<i>.bin. Format, sharding and measured sizes: pipeline/index/README.md.
Each row is 12 + 4 * V bytes (V = footprint vertices, 4 for SPHEREx, so 28 B), little-endian:
  0  u16  prefix index (meta.prefixes: release dir, plan, version, t0 MJD)
  2  u16  exposure number (14 bits) | (sub-exposure - 1) << 14
  4  u32  mid-exposure time offset from the prefix t0 in meta.timeUnitDays (24 bits)
          | (detector - 1) << 24 | collection index << 27
  8  u16  reference RA  (unit meta.geometry.refRaUnitDeg)
  10 i16  reference Dec (unit meta.geometry.refDecUnitDeg)
  12 V x (i16 xi, i16 eta): footprint corners, gnomonic about the reference point (unit cornerUnitRad)
Rows go to the cell whose RA/Dec box holds their reference point; the reader fetches every cell whose box comes
within rMaxDeg of the query point and tests the corners exactly.
"""
import argparse, csv, datetime, glob, json, os, re, shutil, sys, time
import numpy as np

FORMAT = "spherex-index/1"
URI_RE = re.compile(r"ibe/data/spherex/(\w+)/level2/(\w+)/([\w.-]+)/(\d)/level2_\2_(\d{4})_(\d)D\4_spx_\3\.fits$")
COLLECTIONS = ["spherex_dr1", "spherex_dr1_deep", "spherex_qr3", "spherex_qr3_deep"]  # extended on demand
T_UNIT, T_BLOCK = 1e-6, 16.0  # 24-bit offsets of 1e-6 d cover 16.77 d, so prefixes split every 16 MJD
RA_UNIT, DEC_UNIT = 360 / 65536, 90 / 32767
CREDIT = {
    "data": "SPHEREx Level 2 spectral images, NASA/JPL-Caltech; metadata from the NASA/IPAC Infrared Science Archive (IRSA) "
            "TAP service (spherex.obscore), images in the public bucket s3://nasa-irsa-spherex",
    "acknowledgement": "This research has made use of the NASA/IPAC Infrared Science Archive, which is funded by the National "
                       "Aeronautics and Space Administration and operated by the California Institute of Technology.",
    "dois": {"DR1": "10.26131/IRSA678", "QR3": "10.26131/IRSA662", "QR2": "10.26131/IRSA652", "QR1": "10.26131/IRSA629"},
    "note": "Index derived from public archive metadata; it holds no pixel data. Verify against IRSA for science use.",
}


def unit(ra, dec):
    a, d = np.radians(ra), np.radians(dec)
    return np.stack([np.cos(d) * np.cos(a), np.cos(d) * np.sin(a), np.sin(d)], -1)


def gnomonic(ra0, dec0, ra, dec):
    """Same formula as packages/spherex-index/src (vector form there)."""
    a, d, d0 = np.radians(ra - ra0), np.radians(dec), np.radians(dec0)
    c = np.sin(d) * np.sin(d0) + np.cos(d) * np.cos(d0) * np.cos(a)
    return np.cos(d) * np.sin(a) / c, (np.sin(d) * np.cos(d0) - np.cos(d) * np.sin(d0) * np.cos(a)) / c, c


def parse_polygon(s):
    v = [float(x) for x in re.findall(r"[-+]?\d+\.?\d*(?:[eE][-+]?\d+)?", s.split("POLYGON", 1)[-1])]
    return v


def load_rows(rows_dir):
    files = sorted(glob.glob(os.path.join(rows_dir, "rows_*.csv")))
    if not files:
        sys.exit(f"no rows_*.csv in {rows_dir}")
    seen, recs = set(), []
    for f in files:
        for r in csv.DictReader(open(f, newline="")):
            u = r["access_url"]
            if u in seen:
                continue
            seen.add(u)
            recs.append(r)
    return files, recs


def encode(recs):
    n = len(recs)
    pref, prefixes = {}, []
    seqn = np.zeros(n, np.uint16)
    tword = np.zeros(n, np.uint32)
    mjd = np.zeros(n, np.float64)
    det = np.zeros(n, np.int8)
    coll, verts, pidx = [], [], np.zeros(n, np.uint16)
    for i, r in enumerate(recs):
        m = URI_RE.search(r["access_url"])
        if not m:
            sys.exit(f"URI does not match the Level 2 template: {r['access_url']}")
        rel, plan, ver, d, seq, sub = m.groups()
        if r["energy_bandpassname"] != f"SPHEREx-D{d}":
            sys.exit(f"detector mismatch: {r['energy_bandpassname']} vs {r['access_url']}")
        if r["obs_collection"] not in COLLECTIONS:
            COLLECTIONS.append(r["obs_collection"])
        t = (float(r["t_min"]) + float(r["t_max"])) / 2
        key = (rel, plan, ver, float(np.floor(t / T_BLOCK) * T_BLOCK))
        if key not in pref:
            pref[key] = len(prefixes); prefixes.append(list(key))
        off = int(round((t - key[3]) / T_UNIT))
        assert 0 <= off < 1 << 24 and 1 <= int(sub) <= 4 and int(seq) < 1 << 14
        ci = COLLECTIONS.index(r["obs_collection"])
        assert ci < 8
        seqn[i] = int(seq) | (int(sub) - 1) << 14
        tword[i] = off | (int(d) - 1) << 24 | ci << 27
        mjd[i], det[i] = t, int(d)
        coll.append(r["obs_collection"])
        verts.append(parse_polygon(r["s_region"]))
        pidx[i] = pref[key]
    nv = max(len(v) for v in verts) // 2
    V = np.zeros((n, nv, 2))
    for i, v in enumerate(verts):
        a = np.array(v).reshape(-1, 2)
        if len(a) >= 2 and np.allclose(a[0], a[-1]):  # closed ring: drop the repeat
            a = a[:-1]
        V[i, :len(a)] = a
        V[i, len(a):] = a[-1]  # pad with the last vertex: a zero-length edge changes no ray-casting result
    return dict(prefix=pidx, seqn=seqn, tword=tword, mjd=mjd, det=det, coll=np.array(coll),
                verts=V, prefixes=prefixes)


def geometry(V):
    """Quantised reference point (normalised vertex mean) and gnomonic corners about it."""
    c = unit(V[..., 0], V[..., 1]).sum(1)
    ra = np.degrees(np.arctan2(c[:, 1], c[:, 0])) % 360
    dec = np.degrees(np.arctan2(c[:, 2], np.hypot(c[:, 0], c[:, 1])))
    qra = np.round(ra / RA_UNIT).astype(np.int64) % 65536
    qdec = np.round(dec / DEC_UNIT).astype(np.int64)
    rra, rdec = qra * RA_UNIT, qdec * DEC_UNIT
    xi, eta, cc = gnomonic(rra[:, None], rdec[:, None], V[..., 0], V[..., 1])
    assert (cc > 0.5).all(), "a footprint corner is more than 60 deg from its centre"
    big = max(np.abs(xi).max(), np.abs(eta).max())
    cu = float(np.ceil(big / 32000 * 1e12) / 1e12)  # radians per unit, a little headroom under 32767
    qx, qy = np.round(xi / cu).astype(np.int16), np.round(eta / cu).astype(np.int16)
    rmax = float(np.degrees(np.arctan(np.hypot(qx * cu, qy * cu)).max()))
    return qra.astype(np.uint16), qdec.astype(np.int16), qx, qy, cu, rmax, rra, rdec


def sep(ra1, dec1, ra2, dec2):
    h = np.sin(np.radians(dec2 - dec1) / 2) ** 2 + np.cos(np.radians(dec1)) * np.cos(np.radians(dec2)) * np.sin(np.radians(ra2 - ra1) / 2) ** 2
    return np.degrees(2 * np.arcsin(np.minimum(1, np.sqrt(h))))


def cell_distance(cells, ra, dec):
    """Degrees from (ra, dec) to each RA/Dec cell; same rule as geometry.ts cellDistanceDeg."""
    a0, a1, d0, d1 = cells.T
    inside_ra = (ra - a0) % 360 <= a1 - a0
    best = np.full(len(cells), 180.0)
    for a in (a0, a1):
        t = np.degrees(np.arctan2(np.sin(np.radians(dec)), np.cos(np.radians(dec)) * np.cos(np.radians(ra - a))))
        best = np.minimum(best, sep(ra, dec, a, np.clip(t, d0, d1)))
    return np.where(inside_ra, np.maximum(0, np.maximum(d0 - dec, dec - d1)), best)


def partition(rra, rdec, row_bytes, band_deg, max_bytes, min_side):
    """Equal-area-ish RA/Dec bands, then halve any cell over max_bytes along its longer on-sky side
    while that side stays >= 2 * min_side."""
    leaves = []

    def split(c, idx):
        ra0, ra1, d0, d1 = c
        w = (ra1 - ra0) * np.cos(np.radians(min(abs(d0), abs(d1)) if d0 * d1 > 0 else 0.0))
        h = d1 - d0
        if len(idx) * row_bytes <= max_bytes or max(w, h) < 2 * min_side:
            leaves.append((c, idx)); return
        if w >= h:
            m = (ra0 + ra1) / 2
            lo = rra[idx] < m
            split((ra0, m, d0, d1), idx[lo]); split((m, ra1, d0, d1), idx[~lo])
        else:
            m = (d0 + d1) / 2
            lo = rdec[idx] < m
            split((ra0, ra1, d0, m), idx[lo]); split((ra0, ra1, m, d1), idx[~lo])

    edges = np.arange(-90, 90 + 1e-9, band_deg)
    for d0, d1 in zip(edges[:-1], edges[1:]):
        last = d1 >= 90
        inb = np.nonzero((rdec >= d0) & ((rdec <= d1) if last else (rdec < d1)))[0]
        k = max(1, int(round(360 * np.cos(np.radians((d0 + d1) / 2)) / band_deg)))
        w = 360 / k
        cell_of = np.minimum((rra[inb] / w).astype(int), k - 1)
        for j in range(k):
            split((j * w, (j + 1) * w, float(d0), float(d1)), inb[cell_of == j])
    return leaves


def probe_points(n=10000):
    """Fibonacci sphere plus the densest spots (ecliptic poles, celestial poles, RA 0)."""
    i = np.arange(n) + 0.5
    dec = np.degrees(np.arcsin(1 - 2 * i / n))
    ra = (np.degrees(np.pi * (1 + 5 ** 0.5) * i)) % 360
    extra = np.array([[270, 66.56], [90, -66.56], [0, 90], [0, -90], [0, 0], [359.99, 45], [268, 65], [92, -67]])
    return np.concatenate([ra, extra[:, 0]]), np.concatenate([dec, extra[:, 1]])


def cost(leaves, row_bytes, rmax, pts):
    cells = np.array([c for c, _ in leaves])
    nbytes = np.array([len(ix) * row_bytes for _, ix in leaves])
    req, byt = [], []
    for ra, dec in zip(*pts):
        m = (cell_distance(cells, ra, dec) <= rmax) & (nbytes > 0)
        req.append(m.sum()); byt.append(nbytes[m].sum())
    return np.array(req), np.array(byt)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--rows", required=True)
    ap.add_argument("--out", default=os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))), "assets", "index"))
    ap.add_argument("--allow-partial", action="store_true", help="build even if the rows do not match the archive count")
    ap.add_argument("--band-deg", type=float, default=None)
    ap.add_argument("--max-bytes", type=int, default=None)
    ap.add_argument("--min-side", type=float, default=None)
    a = ap.parse_args()
    t0 = time.time()
    files, recs = load_rows(a.rows)
    print(f"{len(recs)} rows from {len(files)} chunk files ({time.time() - t0:.1f} s)", flush=True)
    E = encode(recs)
    V = E.pop("verts")
    nv = V.shape[1]
    row_bytes = 12 + 4 * nv
    qra, qdec, qx, qy, cu, rmax, rra, rdec = geometry(V)
    rmax_q = float(np.ceil((rmax + 1e-4) * 1e4) / 1e4)
    print(f"{nv} vertices per footprint, {row_bytes} B per row, corner unit {cu * 206264.806:.3f} arcsec, "
          f"rMax {rmax:.4f} deg ({time.time() - t0:.1f} s)", flush=True)

    # sharding: try a small grid of parameters, keep the cheapest worst case within 9 cell requests and 999 cells
    pts = probe_points()
    grid = [(a.band_deg, a.max_bytes, a.min_side)] if a.band_deg else \
        [(b, mb, ms) for b in (10.0, 12.0) for mb in (100_000, 160_000, 250_000) for ms in (2.5, 3.0, 3.5)]
    trials = []
    for b, mb, ms in grid:
        leaves = partition(rra, rdec, row_bytes, b, mb, ms)
        req, byt = cost(leaves, row_bytes, rmax_q, pts)
        t = dict(bandDeg=b, maxCellBytes=mb, minSideDeg=ms, cells=len(leaves), reqMax=int(req.max()),
                 reqP50=float(np.median(req)), bytesMax=int(byt.max()), bytesP99=int(np.percentile(byt, 99)),
                 bytesP50=int(np.median(byt)), worst=[float(pts[0][byt.argmax()]), float(pts[1][byt.argmax()])])
        trials.append((t, leaves))
        print("  trial", json.dumps(t), flush=True)
    ok = [x for x in trials if x[0]["reqMax"] <= 9 and x[0]["cells"] <= 999]
    best_t, leaves = min(ok or trials, key=lambda x: (x[0]["bytesMax"], x[0]["reqMax"]))
    print("chosen", json.dumps(best_t), flush=True)

    # write
    tmp = a.out + ".tmp"
    shutil.rmtree(tmp, ignore_errors=True)
    os.makedirs(os.path.join(tmp, "cells"))
    rec = np.zeros(len(qra), dtype=np.dtype([("p", "<u2"), ("s", "<u2"), ("t", "<u4"), ("ra", "<u2"), ("dec", "<i2"),
                                              ("c", "<i2", (nv, 2))]))
    rec["p"], rec["s"], rec["t"], rec["ra"], rec["dec"] = E["prefix"], E["seqn"], E["tword"], qra, qdec
    rec["c"][..., 0], rec["c"][..., 1] = qx, qy
    assert rec.dtype.itemsize == row_bytes
    cells_meta = []
    for i, (c, ix) in enumerate(leaves):
        ix = ix[np.argsort(E["mjd"][ix], kind="stable")]
        if len(ix):
            rec[ix].tofile(os.path.join(tmp, "cells", f"{i}.bin"))
        cells_meta.append([round(c[0], 9), round(c[1], 9), round(c[2], 9), round(c[3], 9), int(len(ix))])
    assert sum(c[4] for c in cells_meta) == len(rec)

    # completeness against the archive count taken at fetch time
    by = {}
    for col, d in zip(E["coll"], E["det"]):
        by[(col, f"D{d}")] = by.get((col, f"D{d}"), 0) + 1
    arch, check = None, None
    cp = os.path.join(a.rows, "counts.json")
    if os.path.exists(cp):
        cj = json.load(open(cp))
        arch = {(r["obs_collection"], r["energy_bandpassname"].replace("SPHEREx-", "")): int(r["n"]) for r in cj["rows"]}
        keys = sorted(set(arch) | set(by))
        diff = {f"{k[0]}/{k[1]}": [by.get(k, 0), arch.get(k, 0)] for k in keys if by.get(k, 0) != arch.get(k, 0)}
        check = dict(archiveCountAt=cj["fetchedAt"], archiveTotal=sum(arch.values()), indexTotal=len(rec),
                     match=not diff, differences_index_vs_archive=diff)
        print("completeness:", json.dumps(check), flush=True)
    if (check is None or not check["match"]) and not a.allow_partial:
        sys.exit("row counts do not match the archive count (or counts.json missing); rerun fetch_rows.py or pass --allow-partial")

    per_coll, per_det = {}, {}
    for (col, d), k in sorted(by.items()):
        per_coll[col] = per_coll.get(col, 0) + k
        per_det[d] = per_det.get(d, 0) + k
    meta = dict(
        format=FORMAT, builtAt=datetime.datetime.now(datetime.timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
        newestMjd=round(float(E["mjd"].max()), 6), oldestMjd=round(float(E["mjd"].min()), 6), rows=int(len(rec)),
        rowBytes=row_bytes, timeUnitDays=T_UNIT,
        geometry=dict(refRaUnitDeg=RA_UNIT, refDecUnitDeg=DEC_UNIT, cornerUnitRad=cu, rMaxDeg=rmax_q, vertices=nv),
        collections=COLLECTIONS, prefixes=prefixes_json(E["prefixes"]),
        counts=dict(byCollection=per_coll, byDetector=per_det,
                    byCollectionDetector={f"{c}/{d}": k for (c, d), k in sorted(by.items())}, archiveCheck=check),
        sharding=best_t, credit=CREDIT,
        cells=cells_meta)
    with open(os.path.join(tmp, "meta.json"), "w") as f:
        json.dump(meta, f, separators=(",", ":"))
    shutil.rmtree(a.out, ignore_errors=True)
    os.replace(tmp, a.out)
    size = sum(os.path.getsize(p) for p in glob.glob(os.path.join(a.out, "**", "*"), recursive=True) if os.path.isfile(p))
    nfiles = sum(1 for p in glob.glob(os.path.join(a.out, "**", "*"), recursive=True) if os.path.isfile(p))
    print(f"wrote {a.out}: {nfiles} files, {size} B, meta.json {os.path.getsize(os.path.join(a.out, 'meta.json'))} B, "
          f"{time.time() - t0:.0f} s", flush=True)


def prefixes_json(p):
    return [[r, pl, v, int(t)] for r, pl, v, t in p]


if __name__ == "__main__":
    main()
