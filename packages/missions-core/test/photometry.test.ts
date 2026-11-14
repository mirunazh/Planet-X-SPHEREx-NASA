import { describe, expect, it } from 'vitest';
import { apertureFlux, ratioToControl, binPoints, binRatio, deltaMag, lightCurvePoints, foldPhase } from '../src/photometry.js';
import { manifest } from './data.js';

describe('photometry', () => {
  it('apertureFlux recovers a synthetic star on a sloping-free background', () => {
    const w = 41, h = 41;
    const f = new Float32Array(w * h).map((_, k) => 2 + 50 * Math.exp(-(((k % w) - 20) ** 2 + (Math.floor(k / w) - 20) ** 2) / 2));
    const r = apertureFlux(f, w, h, 20, 20, 5, [8, 12]);
    expect(r.background).toBeCloseTo(2, 6);
    expect(r.flux).toBeCloseTo(50 * 2 * Math.PI, 0); // Gaussian volume, sigma 1 px
    f[20 * w + 20] = NaN; // a missing pixel is scaled for, not counted as zero
    expect(apertureFlux(f, w, h, 20, 20, 5, [8, 12]).finiteFraction).toBeLessThan(1);
    expect(ratioToControl(3, 2, 0.3, 0.2)).toEqual({ ratio: 1.5, err: expect.closeTo(1.5 * Math.hypot(0.1, 0.1), 9) });
  });

  it('RW Aur: the series reproduces the manifest ratios (target and control)', () => {
    const m = manifest('rwaur');
    const s = m.series!.matchedWavelength!;
    for (const t of s.ratios) {
      const r = binRatio(s, t.pass, t.versusPass);
      const c = binRatio(s, t.pass, t.versusPass, 'control');
      console.log(`[photometry] rwaur pass ${t.pass}: ratio ${r.ratio.toFixed(4)} +- ${r.err.toFixed(4)} (${r.nBins} bins) vs manifest ${t.ratio} +- ${t.err} (${t.nBins}); control ${c.ratio.toFixed(4)} vs ${t.controlRatio}; dmag ${deltaMag(r.ratio).toFixed(4)} vs ${t.deltaMag}`);
      expect(r.ratio).toBeCloseTo(t.ratio, 5);
      expect(r.err).toBeCloseTo(t.err, 5);
      expect(r.nBins).toBe(t.nBins);
      expect(c.ratio).toBeCloseTo(t.controlRatio, 5);
      expect(deltaMag(r.ratio)).toBeCloseTo(t.deltaMag, 5);
    }
    const pts = binPoints(s);
    expect(pts.every((p) => Number.isFinite(p.target) && Number.isFinite(p.control))).toBe(true);
    expect(new Set(pts.map((p) => p.pass))).toEqual(new Set([0, 1, 2]));
  });

  it('R Dra: chart points carry every light-curve point; fold phase stays in 0..1', () => {
    const lc = manifest('rdra').series!.lightCurve!;
    const pts = lightCurvePoints(lc);
    expect(pts).toHaveLength(lc.points.length);
    const rms = Math.sqrt(pts.reduce((a, p) => a + p.relMag ** 2, 0) / pts.length);
    console.log(`[photometry] rdra ${pts.length} points, rms about zero ${rms.toFixed(4)} vs manifest rmsMag ${lc.rmsMag}`);
    for (const p of pts) {
      const ph = foldPhase(p.mjd, 246, 60000);
      expect(ph).toBeGreaterThanOrEqual(0);
      expect(ph).toBeLessThan(1);
    }
    expect(foldPhase(-1, 10)).toBeCloseTo(0.9, 9);
  });
});
