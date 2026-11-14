"""Experiment 08: list SPHEREx exposures via IRSA TAP and download cutouts.

usage: python -I det08_download.py <datadir>
Writes <datadir>/tap/<target>_<det>.csv and <datadir>/<target>/<det>/<file>.fits
Polite: 8 concurrent requests max, 3 attempts per file. Cutouts are ~4 MB each because
the full 441-row EPSF table rides along, whatever the cutout size.
"""
import csv, os, subprocess, sys, time, urllib.parse
from concurrent.futures import ThreadPoolExecutor
import numpy as np
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from det08_targets import predict

TAP = "https://irsa.ipac.caltech.edu/TAP/sync"
QUERY = ("SELECT a.uri, p.time_bounds_lower, p.time_bounds_upper, p.energy_bandpassname "
         "FROM spherex.artifact a JOIN spherex.plane p ON a.planeid = p.planeid "
         "WHERE 1 = CONTAINS(POINT('ICRS', {ra}, {dec}), p.poly) "
         "AND p.energy_bandpassname = 'SPHEREx-{det}' ORDER BY p.time_bounds_lower")
# (target, detectors, TAP point, cutout size deg). TAP point = rough 2025.9 position.
JOBS = [("barnard", ["D2"], (269.4463, 4.7680), 0.10),
        ("w0855", ["D6", "D5", "D4"], (133.7683, -7.2429), 0.15)]


def get(url, timeout=180):
    # ponytail: curl, not urllib: in this sandbox Python's urllib hung with no bytes
    # for minutes while curl fetched the same URL in 9 s.
    for attempt in range(3):
        r = subprocess.run(["curl", "-sf", "-m", str(timeout), url], capture_output=True)
        if r.returncode == 0 and r.stdout:
            return r.stdout
        err = RuntimeError(f"curl exit {r.returncode}")  # transient IRSA failures are expected
        time.sleep(2 + 3 * attempt)
    raise err


def tap_rows(datadir, target, det, ra, dec):
    path = os.path.join(datadir, "tap", f"{target}_{det}.csv")
    if not os.path.exists(path):
        os.makedirs(os.path.dirname(path), exist_ok=True)
        q = urllib.parse.urlencode({"QUERY": QUERY.format(ra=ra, dec=dec, det=det), "FORMAT": "CSV"})
        open(path, "wb").write(get(f"{TAP}?{q}", timeout=600))
    return list(csv.DictReader(open(path)))


def main(datadir):
    tasks = []
    for target, dets, (ra, dec), size in JOBS:
        rows = {det: tap_rows(datadir, target, det, ra, dec) for det in dets}
        t = np.array([float(r["time_bounds_lower"]) for rs in rows.values() for r in rs])
        cra, cdec = predict(target, 0.5 * (t.min() + t.max()))  # mid-baseline prediction
        print(f"{target}: centre {cra[0]:.5f},{cdec[0]:.5f}  n={len(t)}")
        for det, rs in rows.items():
            outdir = os.path.join(datadir, target, det)
            os.makedirs(outdir, exist_ok=True)
            for r in rs:
                url = f"https://irsa.ipac.caltech.edu/{r['uri']}?center={cra[0]:.6f},{cdec[0]:.6f}d&size={size}"
                tasks.append((url, os.path.join(outdir, os.path.basename(r["uri"]))))

    def fetch(task):
        url, out = task
        if os.path.exists(out):
            return out, "cached", 0.0
        t0 = time.time()
        try:
            data = get(url)
            assert data[:6] == b"SIMPLE", "not a FITS file"
            open(out, "wb").write(data)
            return out, "ok", time.time() - t0
        except Exception as e:
            return out, f"FAILED {e!r}", time.time() - t0

    t0 = time.time()
    with ThreadPoolExecutor(max_workers=8) as ex:
        res = list(ex.map(fetch, tasks))
    fails = [r for r in res if r[1].startswith("FAILED")]
    dts = [r[2] for r in res if r[1] == "ok"]
    mb = sum(os.path.getsize(r[0]) for r in res if os.path.exists(r[0])) / 1e6
    print(f"{len(res)} files, {len(fails)} failed, {mb:.0f} MB, wall {time.time()-t0:.0f} s, "
          f"per-request median {np.median(dts) if dts else 0:.1f} s")
    for f in fails:
        print(f)


if __name__ == "__main__":
    main(sys.argv[1])
