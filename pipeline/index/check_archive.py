"""Archive truth for the index check: a live TAP CONTAINS(POINT, poly) query at 30 fixed positions.

usage (from the repo root):
  uv run --with numpy --with astropy python -I pipeline/index/check_archive.py --out <truth dir>

Writes positions.json (seed 18: 26 uniform on the sphere, one within 1 deg of each ecliptic pole, two near RA 0)
and truth_<k>.csv per position (uri list), resumable, through fetch_rows.Client: at most 2 requests in flight,
backoff, stop after 10 minutes without a success. The comparison with the reader runs in
packages/spherex-index (npm run test:live with SPHEREX_ARCHIVE_TRUTH=<truth dir>).
"""
import argparse, json, os, sys
from concurrent.futures import ThreadPoolExecutor

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import numpy as np
from astropy.coordinates import SkyCoord, BarycentricMeanEcliptic
import astropy.units as u
import fetch_rows as F

Q = ("SELECT a.uri FROM spherex.artifact a JOIN spherex.plane p ON a.planeid = p.planeid "
     "WHERE 1 = CONTAINS(POINT('ICRS', {ra}, {dec}), p.poly) AND p.calibrationlevel = 2 AND p.dataproducttype = 'image'")


def positions():
    rng = np.random.default_rng(18)
    ra = rng.uniform(0, 360, 26)
    dec = np.degrees(np.arcsin(rng.uniform(-1, 1, 26)))
    pts = [dict(ra=float(r), dec=float(d), kind="uniform") for r, d in zip(ra, dec)]
    for lat, name in ((90, "north ecliptic pole"), (-90, "south ecliptic pole")):
        p = SkyCoord(lon=0 * u.deg, lat=lat * u.deg, frame=BarycentricMeanEcliptic()).icrs
        off = SkyCoord(p.ra, p.dec).directional_offset_by(rng.uniform(0, 360) * u.deg, rng.uniform(0.2, 1.0) * u.deg)
        pts.append(dict(ra=float(off.ra.deg), dec=float(off.dec.deg), kind=f"within 1 deg of the {name}"))
    for ra0 in (rng.uniform(0, 0.5), rng.uniform(359.5, 360)):
        pts.append(dict(ra=float(ra0), dec=float(np.degrees(np.arcsin(rng.uniform(-0.9, 0.9)))), kind="near RA 0"))
    return [dict(p, ra=round(p["ra"], 6), dec=round(p["dec"], 6)) for p in pts]  # the query uses these exact values


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--out", required=True)
    a = ap.parse_args()
    os.makedirs(a.out, exist_ok=True)
    pts = positions()
    json.dump(pts, open(os.path.join(a.out, "positions.json"), "w"), indent=1)
    logf = open(os.path.join(a.out, "truth.log"), "a")

    def log(m):
        print(m, flush=True); logf.write(m + "\n"); logf.flush()

    c = F.Client(log)
    todo = [(k, p) for k, p in enumerate(pts) if not os.path.exists(os.path.join(a.out, f"truth_{k}.csv"))]
    log(f"{len(todo)} of {len(pts)} positions to query")
    try:
        with ThreadPoolExecutor(max_workers=2) as ex:
            list(ex.map(lambda kp: c.query(Q.format(ra=kp[1]["ra"], dec=kp[1]["dec"]),
                                           os.path.join(a.out, f"truth_{kp[0]}.csv"), "uri"), todo))
    except F.Outage as e:
        done = sum(os.path.exists(os.path.join(a.out, f"truth_{k}.csv")) for k in range(len(pts)))
        log(f"STOPPED: {e}; {done} of {len(pts)} positions have archive truth")
        sys.exit(2)


if __name__ == "__main__":
    main()
