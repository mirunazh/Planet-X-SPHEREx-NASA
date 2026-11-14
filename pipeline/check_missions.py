"""Assert-based check of assets/missions: schema, files, coverage, and that the science reproduces.

usage: python -I -B pipeline/check_missions.py [assets/missions]   (numpy only; exits non-zero on failure)
"""
import json, os, sys
import numpy as np

OUT = sys.argv[1] if len(sys.argv) > 1 else os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "assets", "missions")
IDS = ["wise0855", "epsindb", "barnard", "rwaur", "rdra"]
N = 121
NUM = (int, float)
fails, passes_ = [], []


def check(cond, msg):
    (passes_ if cond else fails).append(msg)
    return cond


def has(d, keys, where):
    miss = [k for k in keys if k not in d]
    return check(not miss, f"{where}: keys present" + (f" (missing {miss})" if miss else ""))


def file_ok(base, rel, size=None):
    p = os.path.join(base, rel)
    ok = os.path.isfile(p) and (size is None or os.path.getsize(p) == size)
    if rel.endswith(".png") and ok:
        ok = open(p, "rb").read(8) == b"\x89PNG\r\n\x1a\n"
    return ok


def validate(m, base):
    tid = m.get("id")
    has(m, ["schema", "id", "name", "kind", "summary", "astrometry", "grid", "groups", "truth", "caveats", "provenance", "credits"], tid)
    check(m["schema"] == "mission-manifest/1", f"{tid}: schema id")
    check(m["kind"] in ("mover", "variable"), f"{tid}: kind")
    has(m["astrometry"], ["ra", "dec", "epoch", "pmRaCosDecMasYr", "pmDecMasYr", "parallaxMas", "source"], f"{tid}.astrometry")
    g = m["grid"]
    has(g, ["ra0", "dec0", "scaleArcsec", "width", "height", "projection", "orientation"], f"{tid}.grid")
    check(g["width"] == N and g["height"] == N and g["scaleArcsec"] == 3.0 and g["projection"] == "TAN", f"{tid}: grid 121x121 3\"/px TAN")
    has(m["provenance"], ["releases", "pipeline", "generatedAt"], f"{tid}.provenance")
    check(m["provenance"]["pipeline"] == "S3 range read", f"{tid}: provenance pipeline")
    check(isinstance(m["caveats"], list) and all(isinstance(c, str) for c in m["caveats"]), f"{tid}: caveats are strings")
    if m["kind"] == "variable":
        check("series" in m, f"{tid}: variable has series")
    for gr in m["groups"]:
        w = f"{tid}.{gr['id']}"
        has(gr, ["id", "label", "detectors", "display", "displayExposure", "stackMethod", "passes", "exposures", "droppedPasses"], w)
        for dk in ("display", "displayExposure"):
            d = gr[dk]
            check(d["stretch"] == "asinh" and all(isinstance(d[k], NUM) for k in ("vmin", "vmax", "soft")) and d["vmax"] > d["vmin"], f"{w}: {dk} valid")
        check(len(gr["passes"]) >= 2, f"{w}: at least 2 passes ({len(gr['passes'])})")
        ids = {e["id"] for e in gr["exposures"]}
        for e in gr["exposures"]:
            ok = all(k in e for k in ["id", "pass", "mjd", "detector", "wavelengthUm", "bandwidthUm", "frame", "uri", "release"])
            ok &= file_ok(base, e["frame"], N * N * 4)
            if not ok:
                check(False, f"{w}: exposure {e.get('id')} keys/frame"); break
        else:
            check(True, f"{w}: {len(gr['exposures'])} exposure frames exist with {N * N * 4} bytes")
        for p in gr["passes"]:
            pw = f"{w} pass {p['index']}"
            has(p, ["index", "label", "mjdStart", "mjdEnd", "mjdMid", "yearMid", "nExposures", "wavelengthUmMin", "wavelengthUmMax",
                    "stack", "preview", "predicted", "measured"], pw)
            check(p["nExposures"] >= 3 and p["nExposures"] == sum(e["pass"] == p["index"] for e in gr["exposures"]), f"{pw}: nExposures consistent and >= 3")
            check(p["mjdStart"] <= p["mjdMid"] <= p["mjdEnd"], f"{pw}: mjdMid inside the pass")
            check(file_ok(base, p["stack"], N * N * 4) and file_ok(base, p["preview"]), f"{pw}: stack .f32 and .png exist")
            has(p["predicted"], ["ra", "dec", "x", "y"], f"{pw}.predicted")
            if p["measured"] is not None:
                has(p["measured"], ["ra", "dec", "x", "y", "errArcsec", "snr"], f"{pw}.measured")
                check(p["measured"]["snr"] >= 5, f"{pw}: measured only at S/N >= 5")
            st = np.fromfile(os.path.join(base, p["stack"]), "<f4").reshape(N, N)
            yy, xx = np.indices(st.shape)
            r = (p.get("saturationRadiusPx") or 0) + 2 if gr.get("saturated") else -1
            core = np.hypot(xx - p["predicted"]["x"], yy - p["predicted"]["y"]) <= r
            frac = float(np.isnan(st[~core]).mean())
            check(frac < 0.2, f"{pw}: NaN fraction outside saturated core {frac:.3f} < 0.2")
        for dp in gr["droppedPasses"]:
            check(dp["nExposures"] < 3 and set(dp["exposureIds"]) <= ids, f"{w}: dropped pass {dp['label']} has < 3 exposures")
    for r in m["provenance"]["releases"]:
        check(r["doi"] is None or r["doi"].startswith("10.26131/"), f"{tid}: DOI format {r['release']}")


def group(m, gid):
    return next(g for g in m["groups"] if g["id"] == gid)


def science(M):
    if "epsindb" in M:
        t = M["epsindb"]["truth"]["motionArcsec"]["total"]
        check(abs(t - 6.4) <= 0.5, f"epsindb: first-to-last motion {t:.2f}\" within 0.5 of 6.4")
    if "wise0855" in M:
        d = [p for p in group(M["wise0855"], "d5d6")["passes"] if p["measured"] and p["measured"]["snr"] >= 5]
        check(len(d) >= 3, f"wise0855: detected at S/N >= 5 in {len(d)} d5d6 passes (need >= 3)")
        d2 = [p for p in group(M["wise0855"], "d2")["passes"] if p["measured"] is not None]
        check(not d2, f"wise0855: not detected in d2 ({len(d2)} passes with a measurement)")
    if "barnard" in M:
        ps = [p for p in group(M["barnard"], "d2")["passes"] if p["measured"]]
        steps = [(b["measured"]["dec"] - a["measured"]["dec"]) * 3600 for a, b in zip(ps, ps[1:])]
        check(len(ps) >= 2 and all(s > 0 for s in steps), f"barnard: wing centroid steps north {[round(s, 2) for s in steps]}\"")
    if "rwaur" in M:
        rs = M["rwaur"]["series"]["matchedWavelength"]["ratios"]
        check(len(rs) >= 1 and all(abs(r["ratio"] - 1.40) <= 0.1 for r in rs), f"rwaur: ratios {[round(r['ratio'], 3) for r in rs]} within 0.1 of 1.40")
        check(all(abs(r["controlRatio"] - 1.0) <= 0.1 for r in rs), f"rwaur: control ratios {[round(r['controlRatio'], 3) for r in rs]} near 1")
    if "rdra" in M:
        lc = M["rdra"]["series"]["lightCurve"]
        check(len(lc["points"]) >= 30 and all(set(p) >= {"mjd", "relMag", "err"} for p in lc["points"]), f"rdra: light curve has {len(lc['points'])} points")


def main():
    idx = json.load(open(os.path.join(OUT, "index.json")))
    M = {}
    for e in idx["missions"]:
        base = os.path.join(OUT, e["id"])
        m = json.load(open(os.path.join(base, "manifest.json")))
        check(m["id"] == e["id"] and file_ok(base, "contact.png"), f"{e['id']}: manifest id and contact sheet")
        validate(m, base)
        M[e["id"]] = m
    check(set(M) == set(IDS), f"index lists all five targets (has {sorted(M)})")
    science(M)
    total = sum(os.path.getsize(os.path.join(dp, f)) for dp, _, fs in os.walk(OUT) for f in fs)
    check(total < 40e6, f"assets total {total / 1e6:.1f} MB < 40 MB")
    for m in fails:
        print("FAIL", m)
    print(f"{len(passes_)} checks passed, {len(fails)} failed")
    for m in passes_:
        if any(k in m for k in ("motion", "detected", "north", "ratios", "light curve", "assets total", "not detected")):
            print("  ok", m)
    assert not fails, f"{len(fails)} checks failed"


if __name__ == "__main__":
    main()
