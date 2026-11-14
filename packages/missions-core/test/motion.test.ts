import { describe, expect, it } from 'vitest';
import { motionBetween, fitMotion } from '../src/motion.js';
import type { Epoch } from '../src/motion.js';
import { group, moverTruth } from '../src/manifest.js';
import type { MissionId } from '../src/manifest.js';
import { manifest } from './data.js';
import { gauss } from './rng.js';

describe('motionBetween reproduces the manifest truth', () => {
  for (const id of ['epsindb', 'barnard', 'wise0855'] as MissionId[]) {
    it(id, () => {
      const m = manifest(id);
      const t = moverTruth(m)!;
      const passes = group(m, t.group).passes;
      const a = passes.find((p) => p.index === t.fromPass)!;
      const b = passes.find((p) => p.index === t.toPass)!;
      const ep = (p: typeof a): Epoch => ({ ra: p.measured!.ra, dec: p.measured!.dec, year: p.yearMid });
      const r = motionBetween(ep(a), ep(b));
      const d = {
        east: Math.abs(r.east - t.motionArcsec.east),
        north: Math.abs(r.north - t.motionArcsec.north),
        total: Math.abs(r.total - t.motionArcsec.total),
        rate: Math.abs(r.rate - t.rateArcsecPerYear),
        years: Math.abs(r.years - t.baselineYears),
      };
      console.log(`[motion] ${id}: rate ${r.rate.toFixed(4)} vs ${t.rateArcsecPerYear.toFixed(4)} "/yr; max |diff| E/N/total ${Math.max(d.east, d.north, d.total).toExponential(2)}", rate ${d.rate.toExponential(2)}"/yr; PA ${r.paDeg.toFixed(1)} deg`);
      expect(d.east).toBeLessThan(0.01);
      expect(d.north).toBeLessThan(0.01);
      expect(d.total).toBeLessThan(0.01);
      expect(d.rate).toBeLessThan(0.01);
      expect(d.years).toBeLessThan(1e-6);
      // from the grid pixels via gridToSky the same numbers come out (the student's path)
    });
  }

  it('propagates per-point errors and returns NaN errors without them', () => {
    const r = motionBetween({ ra: 0, dec: 0, year: 2025, errEast: 0.3, errNorth: 0.4 }, { ra: 0, dec: 1 / 3600, year: 2026, errEast: 0.3, errNorth: 0.4 });
    expect(r.rate).toBeCloseTo(1, 9);
    expect(r.rateErr).toBeCloseTo(Math.hypot(0.4, 0.4), 9);
    expect(Number.isNaN(motionBetween({ ra: 0, dec: 0, year: 0 }, { ra: 0, dec: 0.001, year: 1 }).rateErr)).toBe(true);
  });
});

describe('fitMotion', () => {
  const truth = { rateEast: 3.98198, rateNorth: -2.46683 }; // Gaia, Epsilon Indi B
  const make = (rnd: () => number, n: number, sigma: number): Epoch[] =>
    Array.from({ length: n }, (_, i) => {
      const year = 2025.3 + (1.4 * i) / (n - 1);
      const e = truth.rateEast * (year - 2025.3) + sigma * rnd();
      const no = truth.rateNorth * (year - 2025.3) + sigma * rnd();
      const dec = -56.8 + no / 3600;
      return { ra: 331.1 + e / 3600 / Math.cos((-56.8 * Math.PI) / 180), dec, year, errEast: sigma, errNorth: sigma };
    });

  it('recovers a known rate inside its own uncertainty (2 sigma, one seeded draw)', () => {
    const f = fitMotion(make(gauss(42), 6, 0.1));
    const dE = Math.abs(f.rateEast - truth.rateEast);
    const dN = Math.abs(f.rateNorth - truth.rateNorth);
    console.log(`[motion] synthetic fit: rateE ${f.rateEast.toFixed(3)} +- ${f.rateEastErr.toFixed(3)}, rateN ${f.rateNorth.toFixed(3)} +- ${f.rateNorthErr.toFixed(3)}, rate ${f.rate.toFixed(3)} +- ${f.rateErr.toFixed(3)} (true ${Math.hypot(truth.rateEast, truth.rateNorth).toFixed(3)}), rms ${f.residualRmsArcsec.toFixed(3)}"`);
    // one seeded draw: 2 sigma (95%); the next test checks that the 1-sigma bars are calibrated
    expect(dE).toBeLessThan(2 * f.rateEastErr);
    expect(dN).toBeLessThan(2 * f.rateNorthErr);
    expect(Math.abs(f.rate - Math.hypot(truth.rateEast, truth.rateNorth))).toBeLessThan(2 * f.rateErr);
  });

  it('its error bars cover the truth about 68% of the time (500 trials)', () => {
    const rnd = gauss(7);
    let inside = 0;
    let bias = 0;
    let errSum = 0;
    for (let k = 0; k < 500; k++) {
      const f = fitMotion(make(rnd, 5, 0.2).map(({ errEast: _e, errNorth: _n, ...p }) => p)); // unweighted: errors from the scatter
      if (Math.abs(f.rateEast - truth.rateEast) < f.rateEastErr) inside++;
      bias += (f.rateEast - truth.rateEast) / 500;
      errSum += f.rateEastErr / 500;
    }
    console.log(`[motion] coverage of 1-sigma bars: ${inside}/500; mean bias ${bias.toFixed(4)} "/yr (typical error ${errSum.toFixed(3)})`);
    expect(Math.abs(bias)).toBeLessThan((3 * errSum) / Math.sqrt(500));
    expect(inside / 500).toBeGreaterThan(0.6);
    expect(inside / 500).toBeLessThan(0.76);
  });

  it('is exact on noiseless data and refuses fewer than three epochs', () => {
    const f = fitMotion(make(() => 0, 4, 0.1));
    expect(f.rateEast).toBeCloseTo(truth.rateEast, 3);
    expect(f.rateNorth).toBeCloseTo(truth.rateNorth, 3);
    expect(f.residualRmsArcsec).toBeLessThan(1e-3);
    expect(() => fitMotion(make(() => 0, 2, 0.1))).toThrow(RangeError);
  });
});
