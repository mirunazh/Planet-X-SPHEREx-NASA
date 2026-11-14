"""Build movers.json from SIMBAD TAP (high proper motion objects). Stdlib only."""
import csv, io, json, math, re, sys, time, urllib.parse, urllib.request
from datetime import datetime, timezone

MIN_PM = float(sys.argv[1]) if len(sys.argv) > 1 else 300.0   # mas/yr total
OUT = sys.argv[2] if len(sys.argv) > 2 else "movers.json"
ENDPOINTS = ["https://simbad.cds.unistra.fr/simbad/sim-tap/sync",
             "https://simbad.harvard.edu/simbad/sim-tap/sync"]
COLS = "main_id, ra, dec, pmra, pmdec, plx_value, otype, sp_type"
Q_MAIN = f"SELECT {COLS} FROM basic WHERE pmra*pmra + pmdec*pmdec >= {MIN_PM*MIN_PM:g}"
# named challenge targets that may fall below the cut (slow movers) or be missing
Q_NAMED = (f"SELECT {COLS} FROM basic JOIN ident ON oidref = oid WHERE id IN "
           "('RW Aur','V* RW Aur','R Dra','V* R Dra')")

def tap(q):
    body = urllib.parse.urlencode({"REQUEST": "doQuery", "LANG": "ADQL", "FORMAT": "csv", "QUERY": q}).encode()
    last = None
    for url in ENDPOINTS:  # sequential: one request at a time
        try:
            req = urllib.request.Request(url, body, {"User-Agent": "Mozilla/5.0 (compatible; tap-client)"})
            txt = urllib.request.urlopen(req, timeout=240).read().decode()
            if txt.startswith("main_id"):
                return url, list(csv.DictReader(io.StringIO(txt)))
            last = f"{url}: non-CSV reply"
        except Exception as e:
            last = f"{url}: {e}"
        print("endpoint failed:", last, file=sys.stderr)
    raise SystemExit("all endpoints failed: " + str(last))

def clean(n):
    for _ in range(2):
        n = re.sub(r"^(NAME|\*|V\*)\s+", "", n.strip())
    return re.sub(r"\s+", " ", n)

def num(s, nd):
    if s in ("", None): return None
    v = round(float(s), nd)
    return int(v) if v == int(v) else v

def row(r):
    return [clean(r["main_id"]), num(r["ra"], 5), num(r["dec"], 5), num(r["pmra"], 0),
            num(r["pmdec"], 0), num(r["plx_value"], 1), r["otype"] or None, r["sp_type"] or None]

url, main = tap(Q_MAIN)
time.sleep(1)
_, named = tap(Q_NAMED)
seen, rows = set(), []
skipped_planets = 0
for r in main + named:
    if r["otype"] in ("Pl", "Pl?"):   # exoplanets duplicate their host's coords and pm
        skipped_planets += 1; continue
    x = row(r)
    if None in x[1:5]: continue
    key = (x[0], x[1], x[2])
    if key in seen: continue
    seen.add(key); rows.append(x)
rows.sort(key=lambda x: -math.hypot(x[3], x[4]))
out = {"schema": "movers/1",
       "generatedAt": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
       "source": f"SIMBAD TAP {url} ; {Q_MAIN} ; plus {Q_NAMED} ; exoplanet rows (Pl, Pl?) dropped",
       "epoch": 2000.0, "count": len(rows),
       "columns": ["name", "ra", "dec", "pmRaCosDec", "pmDec", "plx", "otype", "spType"],
       "rows": rows}
json.dump(out, open(OUT, "w"), separators=(",", ":"), ensure_ascii=False)
print(url, "main", len(main), "named", len(named), "planets dropped", skipped_planets, "rows", len(rows))
