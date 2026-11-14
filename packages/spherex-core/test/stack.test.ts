import { describe, expect, it } from "vitest";
import { centroid, displayHint, groupPasses, measureNear, mulberry32, splitPasses, stackFrames } from "../src/stack.js";

const N = 61;

function gaussFrame(rand: () => number, x: number, y: number, amp: number, noise: number, fwhm = 3): Float32Array {
  const s = fwhm / 2.3548;
  const g = () => Math.sqrt(-2 * Math.log(1 - rand())) * Math.cos(2 * Math.PI * rand());
  const f = new Float32Array(N * N);
  for (let j = 0; j < N; j++) for (let i = 0; i < N; i++) f[j * N + i] = amp * Math.exp(-((i - x) ** 2 + (j - y) ** 2) / (2 * s * s)) + noise * g();
  return f;
}

describe("passes", () => {
  it("splits at gaps over 20 days and drops passes under 3 exposures", () => {
    const mjds = [100, 101, 102, 130, 131, 200, 205, 210, 219.9, 260];
    expect(splitPasses(mjds)).toEqual([0, 0, 0, 1, 1, 2, 2, 2, 2, 3]);
    const g = groupPasses(mjds.map((mjd) => ({ mjd })).reverse());
    expect(g.passes.map((p) => p.map((e) => e.mjd))).toEqual([[100, 101, 102], [200, 205, 210, 219.9]]);
    expect(g.dropped.map((p) => p.length)).toEqual([2, 1]);
  });
});

describe("stacking on a moving Gaussian in noise", () => {
  const rand = mulberry32(42);
  // the source moves 0.05 px per exposure: a small drift inside a pass, like a fast mover
  const make = (k: number) => Array.from({ length: k }, (_, i) => gaussFrame(rand, 30 + 0.05 * i, 29, 2, 1));

  it("S/N grows as sqrt(N) (mean over 12 noise realisations)", () => {
    const snr = (k: number) => {
      let s = 0;
      for (let t = 0; t < 12; t++) {
        const fr = make(k);
        const st = stackFrames(fr, fr.map(() => 1));
        s += measureNear(st, N, 30 + 0.025 * (k - 1), 29, fr, fr.map(() => 1), t).snr;
      }
      return s / 12;
    };
    const s1 = snr(1), s4 = snr(4), s16 = snr(16);
    console.log(`S/N: 1 exposure ${s1.toFixed(2)}, 4 ${s4.toFixed(2)} (x${(s4 / s1).toFixed(2)}, ideal x2), 16 ${s16.toFixed(2)} (x${(s16 / s1).toFixed(2)}, ideal x4)`);
    expect(s4 / s1).toBeGreaterThan(2 * 0.8);
    expect(s4 / s1).toBeLessThan(2 * 1.25);
    expect(s16 / s1).toBeGreaterThan(4 * 0.8);
    expect(s16 / s1).toBeLessThan(4 * 1.25);
  });

  it("weighted mean uses 1/sigma^2", () => {
    const a = new Float32Array([1, NaN]), b = new Float32Array([4, 2]);
    const st = stackFrames([a, b], [1, 2], false);
    expect(st[0]).toBeCloseTo((1 * 1 + 4 * 0.25) / 1.25, 6);
    expect(st[1]).toBe(2);
    expect(Number.isNaN(stackFrames([new Float32Array([NaN])], [1])[0])).toBe(true);
  });

  it("rejects a 4-sigma outlier when there are 5 or more exposures, not with 4", () => {
    const fr = make(8);
    const hit = 20 * N + 10;
    const clean = stackFrames(fr, fr.map(() => 1));
    fr[3]![hit] = 500; // cosmic ray
    const st = stackFrames(fr, fr.map(() => 1));
    expect(Math.abs(st[hit]! - clean[hit]!)).toBeLessThan(0.2); // unrejected it would add 500 / 8 = 62
    const four = fr.slice(0, 4);
    expect(stackFrames(four, four.map(() => 1))[hit]!).toBeGreaterThan(100);
  });

  it("centroid recovers the source position (brighter source, S/N about 30)", () => {
    const fr = Array.from({ length: 16 }, (_, i) => gaussFrame(rand, 30 + 0.05 * i, 29, 5, 1));
    const st = stackFrames(fr, fr.map(() => 1));
    const m = measureNear(st, N, 30.3, 29.2, fr, fr.map(() => 1));
    expect(m.snr).toBeGreaterThan(5);
    expect(Math.hypot(m.x! - 30.375, m.y! - 29)).toBeLessThan(0.15);
    console.log(`centroid offset ${Math.hypot(m.x! - 30.375, m.y! - 29).toFixed(3)} px, bootstrap err ${m.errX!.toFixed(3)}, ${m.errY!.toFixed(3)} px, S/N ${m.snr.toFixed(1)}`);
    expect(m.errX! > 0 && m.errX! < 0.3).toBe(true);
    expect(centroid(new Float32Array(N * N), N, 30, 30)).toBeNull();
  });

  it("display hint is finite and ordered", () => {
    const d = displayHint(make(3));
    expect(d.vmax).toBeGreaterThan(d.vmin);
    expect(d.soft).toBeGreaterThan(0);
  });
});
