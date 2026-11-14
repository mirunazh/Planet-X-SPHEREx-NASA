"""Download the metadata rows of every public SPHEREx Level 2 image from IRSA TAP, in resumable time chunks.

usage (from the repo root):
  python3 -I pipeline/index/fetch_rows.py --out <rows dir>        (stdlib + curl)
      [--since <MJD>] [--chunk-days 7] [--start 60788] [--end <MJD>] [--counts-only] [--probe]

One CSV per chunk of observation start time, rows_<t0>_<t1>.csv, written to a .part file while it streams in
and renamed when complete, so an interrupted run keeps every finished chunk and a rerun fetches only the
missing ones. --since <MJD> refetches every chunk that ends after that MJD (new data in a running release).
counts.json holds the archive's own row counts per collection and detector at fetch time (the completeness
check in build_index.py compares against it).

Each query runs as a TAP async job (the sync endpoint's proxy answered 502 after 400 s on a long query).
Politeness: at most 2 jobs (so 2 requests) in flight, phase polls 5 s growing to 30 s, exponential backoff on any
error, a generic User-Agent, and a hard stop when the archive has answered nothing for 10 minutes (finished chunks
are kept; rerun later).
"""
import argparse, csv, json, os, subprocess, sys, threading, time
from concurrent.futures import ThreadPoolExecutor

TAP = "https://irsa.ipac.caltech.edu/TAP/sync"
UA = "tap-client/1.0 (curl)"
T_FIRST = 60788  # whole day before the first SPHEREx Level 2 image (MJD 60789.75, note 04 section 3)
COLS = "access_url,obs_collection,energy_bandpassname,t_min,t_max,s_ra,s_dec,s_region"
WHERE = "calib_level = 2 AND dataproduct_type = 'image' AND obs_collection LIKE 'spherex_%'"
QUERY = f"SELECT {COLS} FROM spherex.obscore WHERE {WHERE} AND t_min >= {{t0}} AND t_min < {{t1}}"
COUNT = (f"SELECT obs_collection, energy_bandpassname, COUNT(*) AS n, MAX(t_max) AS tmax FROM spherex.obscore "
         f"WHERE {WHERE} GROUP BY obs_collection, energy_bandpassname")
OUTAGE_S = 600


class Outage(Exception):
    pass


class QueryError(Exception):
    pass


class Client:
    """Serialises the outage clock across the (at most 2) worker threads."""

    def __init__(self, log):
        self.log, self.lock, self.last_ok, self.down = log, threading.Lock(), time.time(), False

    def alive(self):
        with self.lock:
            self.last_ok = time.time()

    def curl(self, *args):
        """One HTTP request through curl (system CA store, as pipeline/s3reader.py); returns (status, stdout)."""
        r = subprocess.run(["curl", "-sS", "-A", UA, "-m", "900", "-w", "\n%{http_code} %{redirect_url}", *args],
                           capture_output=True, text=True)
        tail = r.stdout.rsplit("\n", 1)[-1].split(" ")
        if r.returncode != 0:
            raise OSError(f"curl exit {r.returncode}: {r.stderr.strip()[:120]}")
        if tail[0][:1] not in "23":
            raise OSError(f"HTTP {tail[0]}")
        self.alive()  # any 2xx/3xx answer means the archive is up
        return tail[0], (tail[1] if len(tail) > 1 else ""), r.stdout.rsplit("\n", 1)[0]

    def run_async(self, adql, dest):
        """TAP async job (a long query outlives the sync proxy, which answered 502 after 400 s): create with
        PHASE=RUN, poll the phase (5 s growing to 30 s), stream the result to dest.part."""
        jar = ["-c", dest + ".cookies", "-b", dest + ".cookies"]  # the job may be tied to a session cookie (note 04)
        _, job, _ = self.curl(*jar, f"{TAP.replace('/sync', '/async')}", "--data-urlencode", f"QUERY={adql}",
                              "-d", "FORMAT=csv", "-d", "LANG=ADQL", "-d", "PHASE=RUN", "-o", os.devnull)
        if not job:
            raise OSError("no job URL in the async answer")
        wait, t0 = 5, time.time()
        while True:
            time.sleep(wait)
            wait = min(wait * 1.5, 30)
            try:
                phase = self.curl(*jar, f"{job}/phase")[2].strip()
            except OSError as e:  # a failed poll does not kill the job; the outage clock still runs
                if time.time() - self.last_ok > OUTAGE_S:
                    raise
                self.log(f"poll {os.path.basename(dest)}: {e}")
                continue
            if phase == "COMPLETED":
                break
            if phase == "ERROR":  # a bad query is not transient: stop with the archive's message
                raise QueryError(f"job {job}: {self.curl(*jar, '-L', f'{job}/error')[2][:600]}")
            if phase == "ABORTED" or time.time() - t0 > 3600:
                raise OSError(f"job {job} phase {phase}")
        self.curl(*jar, "-L", f"{job}/results/result", "-o", dest + ".part")
        os.remove(dest + ".cookies") if os.path.exists(dest + ".cookies") else None

    def query(self, adql, dest, expect):
        """Run one query as an async job, stream the body to dest.part, check it, rename. Retries with backoff."""
        delay = 5
        for attempt in range(1, 100):
            if self.down:
                raise Outage("stopped: archive down")
            t0, err = time.time(), ""
            try:
                self.run_async(adql, dest)
                n = os.path.getsize(dest + ".part")
                with open(dest + ".part", "rb") as f:
                    head = f.readline().decode("utf-8", "replace").strip()
                if head != expect:
                    with open(dest + ".part", "rb") as f:
                        raise ValueError(f"not the expected CSV: {f.read(300)!r}")
                os.replace(dest + ".part", dest)
                self.log(f"ok {os.path.basename(dest)} {n} B in {time.time() - t0:.1f} s (attempt {attempt})")
                return dest
            except (OSError, ValueError) as e:
                err = f"{type(e).__name__}: {str(e)[:200]}"
            if os.path.exists(dest + ".part"):
                os.remove(dest + ".part")
            with self.lock:
                if time.time() - self.last_ok > OUTAGE_S:
                    self.down = True
            self.log(f"fail {os.path.basename(dest)} attempt {attempt} after {time.time() - t0:.1f} s: {err}; "
                     f"{'giving up (no success for 10 min)' if self.down else f'retry in {delay} s'}")
            if self.down:
                raise Outage(err)
            time.sleep(delay)
            delay = min(delay * 2, 120)
        raise Outage("too many attempts")


def chunks(start, end, days):
    t = start
    while t < end:
        yield t, t + days  # fixed windows (file names stay stable across runs); the last may reach past `end`
        t += days


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--out", required=True)
    ap.add_argument("--since", type=float, help="refetch chunks that end after this MJD")
    ap.add_argument("--chunk-days", type=int, default=7)
    ap.add_argument("--start", type=int, default=T_FIRST)
    ap.add_argument("--end", type=int, default=int(time.time() / 86400 + 40587) + 1, help="default: tomorrow (MJD)")
    ap.add_argument("--counts-only", action="store_true")
    ap.add_argument("--no-counts", action="store_true")
    ap.add_argument("--probe", action="store_true", help="fetch one day (MJD 61000) to probe/rows_probe.csv and stop")
    a = ap.parse_args()
    os.makedirs(a.out, exist_ok=True)
    logf = open(os.path.join(a.out, "fetch.log"), "a")
    lk = threading.Lock()

    def log(msg):
        line = f"{time.strftime('%Y-%m-%dT%H:%M:%S')} {msg}"
        with lk:
            print(line, flush=True); logf.write(line + "\n"); logf.flush()

    c = Client(log)
    if a.probe:
        os.makedirs(os.path.join(a.out, "probe"), exist_ok=True)
        c.query(QUERY.format(t0=61000, t1=61001), os.path.join(a.out, "probe", "rows_probe.csv"), COLS)
        return
    todo = []
    for t0, t1 in chunks(a.start, a.end, a.chunk_days):
        p = os.path.join(a.out, f"rows_{t0}_{t1}.csv")
        if not os.path.exists(p) or (a.since is not None and t1 > a.since):
            todo.append((t0, t1, p))
    log(f"start: {len(todo)} chunks to fetch (MJD {a.start} to {a.end}, {a.chunk_days} d each, since={a.since})")
    t_run = time.time()
    try:
        if not a.no_counts or a.counts_only:  # counts first: the completeness check needs the archive's number now
            c.query(COUNT, os.path.join(a.out, "counts.csv"), "obs_collection,energy_bandpassname,n,tmax")
            rows = list(csv.DictReader(open(os.path.join(a.out, "counts.csv"))))
            json.dump({"fetchedAt": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()), "rows": rows},
                      open(os.path.join(a.out, "counts.json"), "w"), indent=1)
            log(f"archive count: {sum(int(r['n']) for r in rows)} Level 2 images")
        if a.counts_only:
            return
        with ThreadPoolExecutor(max_workers=2) as ex:  # never more than 2 requests to IRSA at once
            list(ex.map(lambda t: c.query(QUERY.format(t0=t[0], t1=t[1]), t[2], COLS), todo))
    except Outage as e:
        missing = [os.path.basename(p) for _, _, p in todo if not os.path.exists(p)]
        log(f"STOPPED after {time.time() - t_run:.0f} s: {e}; {len(missing)} chunks still missing: {missing}")
        sys.exit(2)
    log(f"done: {len(todo)} chunks in {time.time() - t_run:.0f} s")


if __name__ == "__main__":
    main()
