import { describe, expect, it } from "vitest";
import { readExposureBox } from "../src/s3.js";
import { median, prepExposure, robustSigma, sigmaClippedMedian } from "../src/frame.js";
import { centroid } from "../src/stack.js";
import { gridWcs } from "../src/wcs.js";
import { predictPosition, type Astrometry } from "../src/astrometry.js";
import { fixture, gridF32, mockFetch } from "./helpers.js";

const AST: Record<string, Astrometry> = {
  epsindb: { ra: 331.0441466, dec: -56.7828442, epoch: 2000, pmRaCosDecMasYr: 3981.977, pmDecMasYr: -2466.832, parallaxMas: 270.658, radialVelocityKmS: -40 },
  wise0855: { ra: 133.8189082, dec: -7.247048, epoch: 2000, pmRaCosDecMasYr: -8123.7, pmDecMasYr: 673.2, parallaxMas: 439, radialVelocityKmS: 0 },
};

function correlation(a: Float32Array, b: Float32Array) {
  let n = 0, sa = 0, sb = 0;
  for (let i = 0; i < a.length; i++) if (Number.isFinite(a[i]) && Number.isFinite(b[i])) { n++; sa += a[i]!; sb += b[i]!; }
  const ma = sa / n, mb = sb / n;
  let cab = 0, caa = 0, cbb = 0, maxd = 0;
  for (let i = 0; i < a.length; i++) {
    if (!(Number.isFinite(a[i]) && Number.isFinite(b[i]))) continue;
    cab += (a[i]! - ma) * (b[i]! - mb); caa += (a[i]! - ma) ** 2; cbb += (b[i]! - mb) ** 2;
    maxd = Math.max(maxd, Math.abs(a[i]! - b[i]!));
  }
  return { r: cab / Math.sqrt(caa * cbb), n, maxd };
}

describe.each(["2025W17_4B_0017_1D2", "2025W19_1B_0116_1D6"])("reprojection vs assets/missions exposure %s", (id) => {
  it("background exact-ish, noise, correlation > 0.995, target centroid within 0.1 px", async () => {
    const f = fixture(id);
    const m = f.json.mission!;
    const box = await readExposureBox(f.json.uri, m.ra0, m.dec0, 181.5, { fetchImpl: mockFetch([id]), waveCache: new Map(), retries: 0 });
    const p = prepExposure(box, m.ra0, m.dec0);
    const ref = gridF32(id);
    expect(Math.abs(p.background - m.background)).toBeLessThan(1e-9);
    expect(Math.abs(p.sigma - m.sigma) / m.sigma).toBeLessThan(1e-3);
    const c = correlation(p.frame, ref);
    let nanMine = 0, nanRef = 0;
    for (let i = 0; i < ref.length; i++) { if (Number.isNaN(p.frame[i])) nanMine++; if (Number.isNaN(ref[i])) nanRef++; }
    const [tra, tdec] = predictPosition(AST[m.id]!, box.mjd);
    const [px, py] = gridWcs(m.ra0, m.dec0).skyToPixel(tra, tdec);
    const a = centroid(p.frame, 121, px, py)!, b = centroid(ref, 121, px, py)!;
    const dc = Math.hypot(a[0] - b[0], a[1] - b[1]);
    console.log(`${id}: r=${c.r.toFixed(6)} over ${c.n} px, max |diff| ${c.maxd.toExponential(2)} MJy/sr, NaN mine/ref ${nanMine}/${nanRef}, ` +
      `bkg ${p.background} vs ${m.background}, sigma ${p.sigma.toFixed(6)} vs ${m.sigma.toFixed(6)}, centroid diff ${dc.toExponential(2)} px ` +
      `(at ${a[0].toFixed(2)}, ${a[1].toFixed(2)}), wavelength ${box.wavelengthUm.toFixed(5)}`);
    expect(c.r).toBeGreaterThan(0.995);
    expect(dc).toBeLessThan(0.1);
  });
});

describe("statistics", () => {
  it("median like numpy", () => {
    expect(median([3, 1, 2])).toBe(2);
    expect(median([4, 1, 2, 3])).toBe(2.5);
  });
  it("sigma clipping drops outliers, robust sigma of a Gaussian", () => {
    const rand = (() => { let s = 1; return () => ((s = (s * 16807) % 2147483647) / 2147483647); })();
    const gauss = () => Math.sqrt(-2 * Math.log(rand())) * Math.cos(2 * Math.PI * rand());
    const v = Array.from({ length: 20000 }, () => 5 + gauss());
    for (let i = 0; i < 500; i++) v.push(1000);
    v.push(NaN);
    expect(Math.abs(sigmaClippedMedian(v) - 5)).toBeLessThan(0.03);
    expect(Math.abs(robustSigma(v.slice(0, 20000)) - 1)).toBeLessThan(0.03);
  });
});
