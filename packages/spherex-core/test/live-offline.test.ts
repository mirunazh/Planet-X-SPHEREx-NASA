import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { buildLiveMission, monthLabel, type LiveProgress } from "../src/live.js";
import type { Exposure } from "../src/sia.js";
import { fixture, gridF32, mockFetch } from "./helpers.js";

const ID = "2025W17_4B_0017_1D2";
const f = fixture(ID);
const ref = JSON.parse(readFileSync(new URL("./fixtures/epsindb-manifest.json", import.meta.url), "utf8"));
const key = (u: string) => u.replace("ibe/data/spherex/", "");

// Three "exposures" that are copies of one real file under different names (same header, so one pass of 3),
// plus one missing file (404) and one on another detector (filtered out by the group).
const base = key(f.json.uri);
const copies = ["A", "B", "C"].map((s) => base.replace("_spx_", `${s}_spx_`).replace(`0017_1D2${s}`, `001${s.charCodeAt(0) - 60}_1D2`));
const exposures: Exposure[] = [
  ...copies.map((uri, i) => ({ uri, mjd: f.json.mjd + i * 1e-3, detector: "D2", collection: "spherex_dr1" })),
  { uri: base.replace("0017_1D2", "0099_1D2"), mjd: f.json.mjd, detector: "D2", collection: "spherex_dr1" },
  { uri: base.replace("1D2", "1D5"), mjd: f.json.mjd, detector: "D5", collection: "spherex_dr1" },
];
const real = mockFetch([ID]);
const fetchImpl = (url: string, init?: RequestInit) => real(copies.some((c) => url.endsWith(c)) ? f.json.url : url, init);

describe("buildLiveMission (offline, mocked S3)", () => {
  it("builds a mission-manifest/1 shaped object with in-memory frames and per-exposure progress", async () => {
    const seen: LiveProgress[] = [];
    const m = f.json.mission!;
    const t0 = performance.now();
    const man = await buildLiveMission({ ra: m.ra0, dec: m.dec0, exposures, fetchImpl, waveCache: new Map(), onProgress: (p) => seen.push(p) });
    const ms = performance.now() - t0;
    expect(man.schema).toBe("mission-manifest/1");
    const g = man.groups[0]!;
    expect(g.detectors).toEqual(["D2"]);
    expect(seen.length).toBe(4);
    expect(seen[seen.length - 1]!.done).toBe(4);
    expect(g.failedExposures.length).toBe(1);
    expect(g.exposures.length).toBe(3);
    expect(g.passes.length).toBe(1);
    const p = g.passes[0]!;
    expect(p.nExposures).toBe(3);
    expect(p.stack).toBeInstanceOf(Float32Array);
    expect(g.exposures.every((e) => e.pass === 0 && e.frame.length === 121 * 121)).toBe(true);
    // the frame equals the Python asset to float32 rounding
    const py = gridF32(ID);
    let maxd = 0;
    for (let i = 0; i < py.length; i++) if (Number.isFinite(py[i])) maxd = Math.max(maxd, Math.abs(py[i]! - g.exposures[0]!.frame[i]!));
    expect(maxd).toBeLessThan(1e-5);
    expect(Math.abs(g.exposures[0]!.wavelengthUm - 1.5618)).toBeLessThan(1e-3); // static target at the grid centre
    expect(Math.abs(g.exposures[0]!.background - m.manifestBackground)).toBeLessThan(1e-6);
    // the bright brown dwarf is detected near the centre of the field
    expect(p.detected).toBe(true);
    expect(Math.hypot(p.measured!.x - 61, p.measured!.y - 59.4)).toBeLessThan(1);
    // same keys as the Python manifest at every level that both have
    const keys = (o: object) => Object.keys(o).sort();
    const rg = ref.groups[0];
    for (const k of keys(rg)) expect(keys(g)).toContain(k);
    for (const k of keys(rg.passes[0])) expect(keys(p)).toContain(k);
    for (const k of keys(rg.exposures[0])) expect(keys(g.exposures[0]!)).toContain(k);
    for (const k of keys(rg.display)) expect(keys(g.display!)).toContain(k);
    for (const k of ["schema", "id", "name", "kind", "summary", "astrometry", "grid", "groups", "truth", "caveats", "provenance", "credits"]) expect(keys(man)).toContain(k);
    for (const k of keys(ref.grid)) expect(keys(man.grid)).toContain(k);
    console.log(`live offline: 3 frames + 1 failure in ${ms.toFixed(0)} ms; pass S/N ${p.snr?.toFixed(1)}, centroid (${p.measured!.x.toFixed(2)}, ${p.measured!.y.toFixed(2)}), ` +
      `max |frame - python| ${maxd.toExponential(2)}; display vmin ${g.display!.vmin.toFixed(4)} vmax ${g.display!.vmax.toFixed(4)}`);
  });

  it("follows a mover's astrometry for predicted positions and the truth block", async () => {
    const m = f.json.mission!;
    const astrometry = { ra: 331.0441466, dec: -56.7828442, epoch: 2000, pmRaCosDecMasYr: 3981.977, pmDecMasYr: -2466.832, parallaxMas: 270.658, radialVelocityKmS: -40 };
    const man = await buildLiveMission({ ra: m.ra0, dec: m.dec0, exposures, fetchImpl, waveCache: new Map(), astrometry, name: "Epsilon Indi B" });
    const p = man.groups[0]!.passes[0]!;
    expect(man.kind).toBe("mover");
    // Python pass 0 predicted (61.02, 59.27) at MJD 60792.74; this pass is at MJD 60789.86, 3 days earlier
    expect(Math.hypot(p.predicted.x - 61.02, p.predicted.y - 59.27)).toBeLessThan(0.1);
    expect(Math.abs(man.groups[0]!.exposures[0]!.wavelengthUm - m.manifestWavelength)).toBeLessThan(1e-6);
    expect(man.truth?.motionArcsec).toBeNull();
  });

  it("aborts", async () => {
    const m = f.json.mission!;
    const ac = new AbortController();
    const run = buildLiveMission({ ra: m.ra0, dec: m.dec0, exposures, fetchImpl, waveCache: new Map(), signal: ac.signal });
    ac.abort();
    await expect(run).rejects.toBeDefined();
  });

  it("month labels like the Python build", () => {
    expect(monthLabel(60789.856188, 60799.7063565)).toBe("Apr to May 2025");
    expect(monthLabel(60789.8, 60790.1)).toBe("Apr 2025");
    expect(monthLabel(61020, 61060)).toBe("Dec 2025 to Jan 2026");
  });
});
