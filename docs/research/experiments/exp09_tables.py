"""Experiment 09: print the timing and validation tables from the reader JSON files.

usage: python -I exp09_tables.py <exp09_timing.json> <exp09_validate.json> [<exp09_zodi.json>]
"""
import json, sys
import numpy as np


def q(v):
    v = np.asarray(v, float)
    return f"{np.median(v):.2f} / {np.percentile(v, 90):.2f} / {v.max():.2f}" if v.size else "n/a"


T = json.load(open(sys.argv[1]))
print("| mode | frames ok / tried | wall (s) | frames/s | per frame total s (median / p90 / max) | A s | B s | C s | bytes per frame | retried requests | failures |")
print("|---|---|---|---|---|---|---|---|---|---|---|")
for mode, wall in [("sequential", T["seq_wall"]), ("parallel", T["par_wall"])]:
    fr = T[mode]
    ok = [f for f in fr if f["ok"]]
    reqs = [r for f in fr for r in f["requests"]]
    good = [r for r in reqs if "error" not in r]
    per = {t: [r["t"] for r in good if r["tag"] == t] for t in "ABC"}
    by = [sum(r["bytes"] for r in f["requests"] if "error" not in r) for f in ok]
    errs = [r["error"] for r in reqs if "error" in r]
    label = mode if mode == "sequential" else f"parallel x{T['workers']}"
    print(f"| {label} | {len(ok)} / {len(fr)} | {wall:.1f} | {len(ok) / wall:.2f} | {q([f['t'] for f in ok])} | {q(per['A'])} | "
          f"{q(per['B'])} | {q(per['C'])} | {np.median(by):,.0f} | {len(errs)} | {sum(not f['ok'] for f in fr)} |")
    for e in sorted(set(errs)):
        print(f"  error type x{errs.count(e)}: {e}")
    ttfb = [r["ttfb"] for r in good if r["ttfb"] is not None]
    print(f"  {mode}: time to first byte median {np.median(ttfb):.2f} s; total MB {sum(by) / 1e6:.1f}; "
          f"B bytes {sorted(set(r['bytes'] for r in good if r['tag'] == 'B'))[:4]}")

V = json.load(open(sys.argv[2]))
print("\n| file | det | cutout | parent origin (x, y) | pixels identical | finite px | target px S3 - cutout | wl reader | wl astropy | bw reader | bw astropy | IMAGE data offset |")
print("|---|---|---|---|---|---|---|---|---|---|---|---|")
for r in V:
    print(f"| {r['file'][7:33]} | D{r['det']} | {r['cutout_shape'][0]}x{r['cutout_shape'][1]} | {r['parent_origin'][0]}, {r['parent_origin'][1]} | "
          f"{r['pixels_identical']} | {r['n_finite']} | {r['dpix']:.1e} px | {r['wl_reader']:.6f} | {r['wl_astropy_cutout']:.6f} | "
          f"{r['bw_reader']:.6f} | {r['bw_astropy_cutout']:.6f} | {r['data_off']:,} |")
print("max |wl diff| um:", max(abs(r["wl_reader"] - r["wl_astropy_cutout"]) for r in V),
      " max |bw diff|:", max(abs(r["bw_reader"] - r["bw_astropy_cutout"]) for r in V))

if len(sys.argv) > 3:
    Z = json.load(open(sys.argv[3]))
    print("\n| exposure | ZODI median (MJy/sr) | ZODI peak-to-peak, 61x61 box | ZODI peak-to-peak, r <= 30\" | rms of (ZODI - median) in box | pixel sigma (no ZODI) | pixel sigma (ZODI subtracted) | ZODI header offsets |")
    print("|---|---|---|---|---|---|---|---|")
    for z in Z:
        print(f"| {z['uri'][7:33]} | {z['zodi_median']:.3f} | {z['zodi_ptp_box']:.4f} | {z['zodi_ptp_r30']:.4f} | {z['resid_rms_box']:.4f} | "
              f"{z['pixel_sigma']:.4f} | {z['pixel_sigma_after_zodi']:.4f} | F {z['offsets']['flags']:,} V {z['offsets']['variance']:,} Z {z['offsets']['zodi']:,} |")
