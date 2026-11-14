"""Assert-based check of movers.json. Usage: uv run python -I check_movers.py [file]"""
import json, math, sys

F = sys.argv[1] if len(sys.argv) > 1 else "movers.json"
d = json.load(open(F))
assert d["schema"] == "movers/1" and d["epoch"] == 2000.0 and d["count"] == len(d["rows"])
assert d["columns"] == ["name", "ra", "dec", "pmRaCosDec", "pmDec", "plx", "otype", "spType"]
rows = d["rows"]

def propagate(r, epoch):
    """dRA = pmRaCosDec*dt/3.6e6/cos(dec); dDec = pmDec*dt/3.6e6; dt in years from 2000.0; parallax ignored."""
    dt = epoch - 2000.0
    ra = r[1] + r[3] * dt / 3.6e6 / math.cos(math.radians(r[2]))
    return ra % 360.0, r[2] + r[4] * dt / 3.6e6

def sep(ra1, d1, ra2, d2):
    """Angular separation in arcsec (haversine)."""
    a1, b1, a2, b2 = map(math.radians, (ra1, d1, ra2, d2))
    h = math.sin((b2 - b1) / 2) ** 2 + math.cos(b1) * math.cos(b2) * math.sin((a2 - a1) / 2) ** 2
    return math.degrees(2 * math.asin(math.sqrt(h))) * 3600

def find(sub):
    m = [r for r in rows if r[0] == sub]
    assert len(m) == 1, (sub, len(m))
    return m[0]

def expect(label, name, epoch, ra, dec, tol):
    s = sep(*propagate(find(name), epoch), ra, dec)
    print(f"{'PASS' if s <= tol else 'FAIL'} {label}: {s:.2f} arcsec (limit {tol})")
    assert s <= tol, (label, s)

expect("WISE 0855 @2010.5 vs challenge", "WISEA J085510.74-071442.5", 2010.5, 133.795129, -7.245147, 5)
expect("WISE 0855 @2026.4", "WISEA J085510.74-071442.5", 2026.4, 133.758746, -7.242058, 3)
expect("Barnard's Star @2026.9", "Barnard's star", 2026.9, 269.445990, 4.770861, 3)
expect("eps Ind B @2026.9", "eps Ind B", 2026.9, 331.098378, -56.801285, 3)

# "what was here": challenge coords, 10 arcsec radius, every row, epochs 1990..2027
hits = set()
for r in rows:
    for e10 in range(19900, 20271, 5):  # 0.5 yr steps
        ra, dec = propagate(r, e10 / 10)
        if abs(dec - (-7.245147)) < 0.01 and sep(ra, dec, 133.795129, -7.245147) <= 10:
            hits.add(r[0]); break
print("what-was-here hits:", sorted(hits))
assert hits == {"WISEA J085510.74-071442.5"}, hits
print("PASS what-was-here: only WISE 0855")

for r in rows:
    assert isinstance(r[0], str) and r[0].strip(), r
    assert all(isinstance(x, (int, float)) and math.isfinite(x) for x in r[1:5]), r
    assert 0 <= r[1] < 360 and -90 <= r[2] <= 90, r
    assert r[5] is None or math.isfinite(r[5]), r
for n in ("RW Aur", "R Dra"):
    find(n)
print(f"PASS sanity: {len(rows)} rows, no NaN, names non-empty, RW Aur and R Dra present")
