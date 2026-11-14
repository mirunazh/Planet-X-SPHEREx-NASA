"""Experiment 08: print the markdown tables used in 08-detectability-experiment.md from the JSON.

usage: python -I det08_tables.py <det08_results.json> <det08_results_nomask.json>
"""
import json, sys
from astropy.time import Time

mask, nomask = (json.load(open(p)) for p in sys.argv[1:3])


def d(m):
    return Time(m, format="mjd").iso[:10]


for tgt, R in [("barnard (mask OFF)", nomask["barnard"]), ("w0855 (mask ON)", mask["w0855"]),
               ("w0855 (mask OFF)", nomask["w0855"])]:
    print(f"\n### {tgt}\n")
    print("| pass | det | n | dates | wavelength at target (um) | SNR mean | SNR median | centroid - predicted (\" W, \" N) |")
    print("|---|---|---|---|---|---|---|---|")
    for f in R["frames"]:
        print(f"| {f['pass_']} | {f['det']} | {f['n']} | {d(f['mjd_min'])} to {d(f['mjd_max'])} | "
              f"{f['wl_min']:.2f} to {f['wl_max']:.2f} | {f['snr_mean']:.1f} | {f['snr_median']:.1f} | "
              f"{f['cen_dx_arcsec_mean']:+.1f}, {f['cen_dy_arcsec_mean']:+.1f} |")
    print("\n| det | passes | measured shift (\" W, \" N) | same, centroid started at grid centre | predicted |")
    print("|---|---|---|---|---|")
    for m in R["motion"]:
        print(f"| {m['det']} | {m['a']} to {m['b']} | {m['meas_dx']:+.1f}, {m['meas_dy']:+.1f} | "
              f"{m['meas0_dx']:+.1f}, {m['meas0_dy']:+.1f} | {m['pred_dx']:+.1f}, {m['pred_dy']:+.1f} |")
    print("\nreference star shifts:", [(r["det"], r["pass_"], round(r["dx_arcsec"], 1), round(r["dy_arcsec"], 1))
                                    for r in R["refstar"]])
    print("difference images:", [(x["det"], f"p{x['last']}-p{x['first']}", round(x["snr_at_last"], 1),
                                  round(x["snr_at_first"], 1)) for x in R["diff"]])
    print("flag bits in 3x3 at target (exposure counts):", R["target_3x3_bit_counts"], "of", len(R["exposures"]))
    print("mean fraction of cutout pixels with bit set:",
          {k: round(v, 3) for k, v in R["bitfrac_mean"].items() if v > 0.001})
    if "shift_and_add" in R:
        print("\n| stack | n | SNR mean | SNR median | control SNR | empty-aperture sigma | centroid offset (\" W, \" N) |")
        print("|---|---|---|---|---|---|---|")
        for k, s in R["shift_and_add"].items():
            print(f"| {k} | {s['n']} | {s['snr_mean']:.1f} | {s['snr_median']:.1f} | {s['snr_control']:.1f} | "
                  f"{s['sigma_ap']:.3g} | {s['cen_dx_arcsec']:+.1f}, {s['cen_dy_arcsec']:+.1f} |")
        print("brief 'epoch 2014' assumption would be off by (\" W, \" N):", R.get("brief_epoch2014_offset_arcsec"))
    if "neighbour_snr_mean" in R["frames"][0]:
        print("neighbour star (pass, det, SNR at star, separation from target arcsec):",
              [(f["pass_"], f["det"], round(f["neighbour_snr_mean"], 1), round(f["neighbour_sep_arcsec"], 1)) for f in R["frames"]])
    print("per-frame empty-aperture sigma:", [(f["det"], f["pass_"], f"{f['sigma_ap_mean']:.3g}") for f in R["frames"]])
