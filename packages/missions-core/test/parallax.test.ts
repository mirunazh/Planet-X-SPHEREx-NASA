import { describe, expect, it } from 'vitest';
import { fitParallaxFixedPm, chi2AtParallax, distancePc, distanceLy, tangentialVelocityKmS, modelAt } from '../src/parallax.js';
import { parallaxProduct } from './data.js';

const P = parallaxProduct();
const ref = P.best_fit_pm_fixed; // 306.18 +- 28.08 mas, 3.266 pc, 72.5 km/s
const mu = Math.hypot(P.literature.muE, P.literature.muN);

describe('parallax, proper motion fixed to Gaia (the classroom fit of note 13)', () => {
  it('reproduces 306.18 +- 28.08 mas on the 93 exposures the reference fit used', () => {
    expect(P.exposures).toHaveLength(93);
    const f = fitParallaxFixedPm(P.exposures, P.literature.muE, P.literature.muN, P.t0);
    const d = distancePc(f.plxArcsec);
    const v = tangentialVelocityKmS(mu, d);
    console.log(`[parallax] 93 exposures: plx ${(f.plxArcsec * 1000).toFixed(3)} +- ${(f.plxErrArcsec * 1000).toFixed(3)} mas (formal unscaled ${(f.plxErrFormalArcsec * 1000).toFixed(2)}), chi2 ${f.chi2.toFixed(2)}/${f.dof}; d ${d.toFixed(4)} pc (${distanceLy(f.plxArcsec).toFixed(2)} ly); v ${v.toFixed(3)} km/s; E0 ${f.E0.toFixed(4)} N0 ${f.N0.toFixed(4)}`);
    expect(Math.abs(f.plxArcsec - 0.30618) * 1000).toBeLessThan(1);
    expect(Math.abs(f.plxErrArcsec - 0.02808) * 1000).toBeLessThan(1);
    expect(Math.abs(f.plxArcsec - ref.plx)).toBeLessThan(1e-9);
    expect(Math.abs(f.E0 - ref.E0)).toBeLessThan(1e-9);
    expect(Math.abs(f.N0 - ref.N0)).toBeLessThan(1e-9);
    expect(Math.abs(d / 3.266 - 1)).toBeLessThan(0.01);
    expect(Math.abs(v / 72.5 - 1)).toBeLessThan(0.01);
    expect(f.dof).toBe(183);
    expect(f.chi2).toBeCloseTo(235.8766, 3);
  });

  it('chi2AtParallax has its minimum at the fitted value and matches a direct residual sum', () => {
    const f = fitParallaxFixedPm(P.exposures, P.literature.muE, P.literature.muN, P.t0);
    const c = (p: number) => chi2AtParallax(P.exposures, P.literature.muE, P.literature.muN, p, P.t0);
    expect(c(f.plxArcsec)).toBeCloseTo(f.chi2, 6);
    for (const dp of [-0.1, -0.01, -0.001, 0.001, 0.01, 0.1]) expect(c(f.plxArcsec + dp)).toBeGreaterThan(c(f.plxArcsec));
    // a slider scan on a 1 mas grid finds the same minimum
    let best = 0;
    for (let p = 0; p <= 0.8; p += 0.001) if (c(p) < c(best)) best = p;
    expect(Math.abs(best - f.plxArcsec)).toBeLessThan(0.001);
    // direct sum with E0, N0 from the fit
    const m = { E0: f.E0, N0: f.N0, muE: P.literature.muE, muN: P.literature.muN, plxArcsec: f.plxArcsec, t0: P.t0 };
    let direct = 0;
    for (const e of P.exposures) {
      const q = modelAt(m, e.year, e.fE, e.fN);
      direct += ((e.east - q.east) / e.east_err) ** 2 + ((e.north - q.north) / e.north_err) ** 2;
    }
    expect(direct).toBeCloseTo(f.chi2, 6);
    // Delta chi2 = 1 at plx +- formal error
    expect(c(f.plxArcsec + f.plxErrFormalArcsec) - f.chi2).toBeCloseTo(1, 6);
  });

  it('the 5 pass means alone (what the slider shows)', () => {
    const f = fitParallaxFixedPm(P.pass_means, P.literature.muE, P.literature.muN, P.t0);
    const d = distancePc(f.plxArcsec);
    console.log(`[parallax] 5 pass means: plx ${(f.plxArcsec * 1000).toFixed(2)} +- ${(f.plxErrArcsec * 1000).toFixed(2)} mas (formal ${(f.plxErrFormalArcsec * 1000).toFixed(2)}, chi2 ${f.chi2.toFixed(2)}/${f.dof}); d ${d.toFixed(3)} pc; v ${tangentialVelocityKmS(mu, d).toFixed(2)} km/s`);
    // exp13_epsindb_fits.json DIFF pm_fixed_pass_means: 305.867 +- 35.156 mas
    expect(Math.abs(f.plxArcsec - 0.3058674)).toBeLessThan(1e-6);
    expect(Math.abs(f.plxErrArcsec - 0.0351560)).toBeLessThan(1e-6);
  });

  it('unit helpers', () => {
    expect(distancePc(0.5)).toBe(2);
    expect(distanceLy(1)).toBeCloseTo(3.26156, 9);
    expect(tangentialVelocityKmS(1, 1)).toBeCloseTo(4.74047, 9);
  });
});
