"""Experiment 09: exposure lists from IRSA TAP for the three remaining targets.

usage: python -I exp09_tap.py <datadir>
Writes <datadir>/tap/<target>_<det>.csv (skips files already on disk). At most 2 queries
at once (IRSA TAP is slow, 10 to 60 s, and does not parallelize). Same query as det08.
"""
import os, subprocess, sys, time, urllib.parse
from concurrent.futures import ThreadPoolExecutor

TAP = "https://irsa.ipac.caltech.edu/TAP/sync"
QUERY = ("SELECT a.uri, p.time_bounds_lower, p.time_bounds_upper, p.energy_bandpassname "
         "FROM spherex.artifact a JOIN spherex.plane p ON a.planeid = p.planeid "
         "WHERE 1 = CONTAINS(POINT('ICRS', {ra}, {dec}), p.poly) "
         "AND p.energy_bandpassname = 'SPHEREx-{det}' ORDER BY p.time_bounds_lower")
# point = mid-baseline position (eps Ind B 2025.9 prediction, RW Aur and R Dra static)
JOBS = [("epsindb", "D2", 331.096356, -56.800600),
        ("rwaur", "D2", 76.956089, 30.401133),
        ("rdra", "D6", 248.167242, 66.755023),
        ("rdra", "D4", 248.167242, 66.755023)]


def run(job, datadir):
    target, det, ra, dec = job
    path = os.path.join(datadir, "tap", f"{target}_{det}.csv")
    if os.path.exists(path):
        return path, "cached", 0.0
    q = urllib.parse.urlencode({"QUERY": QUERY.format(ra=ra, dec=dec, det=det), "FORMAT": "CSV"})
    t0 = time.time()
    for attempt in range(3):
        r = subprocess.run(["curl", "-sf", "-m", "600", f"{TAP}?{q}"], capture_output=True)
        if r.returncode == 0 and r.stdout.startswith(b"uri,"):
            open(path, "wb").write(r.stdout)
            return path, f"ok {r.stdout.count(b'\n') - 1} rows", time.time() - t0
        time.sleep(5 + 5 * attempt)
    return path, f"FAILED curl exit {r.returncode} {r.stdout[:200]!r}", time.time() - t0


if __name__ == "__main__":
    d = sys.argv[1]
    os.makedirs(os.path.join(d, "tap"), exist_ok=True)
    with ThreadPoolExecutor(max_workers=2) as ex:
        for path, status, dt in ex.map(lambda j: run(j, d), JOBS):
            print(f"{os.path.basename(path)}: {status} ({dt:.1f} s)", flush=True)
