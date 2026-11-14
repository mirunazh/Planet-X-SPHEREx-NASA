import { describe, expect, it } from 'vitest';
import { angularDistance, radecToVec } from '@/lib/sky/coords';
import {
  type View,
  distanceForSkyFov,
  equivalentSkyFov,
  pickSky,
  pixelScaleDeg,
  projectSky,
  solveAnchor,
  tileOrderFor,
  visibleRadiusDeg,
} from '@/lib/sky/view';

const sky: View = { mode: 'sky', center: radecToVec(10, 20), fov: 30, distance: 3 };
const globe: View = { mode: 'globe', center: radecToVec(10, 20), fov: 30, distance: 3 };
const ASPECT = 16 / 9;

describe('coordinate deduction', () => {
  it('returns the view centre under the screen centre in both modes', () => {
    expect(angularDistance(pickSky(sky, ASPECT, 0, 0)!, sky.center)).toBeLessThan(1e-9);
    expect(angularDistance(pickSky(globe, ASPECT, 0, 0)!, globe.center)).toBeLessThan(1e-9);
  });

  it('projects a picked point back to the same screen position', () => {
    // Globe points must fall inside the globe's silhouette (angular radius asin(1/3) ≈ 19.5° at distance 3).
    const cases: [View, number[][]][] = [
      [sky, [[0.4, -0.3], [-0.8, 0.6], [0.1, 0.9]]],
      [globe, [[0.4, -0.3], [-0.3, 0.5], [0.1, 0.8]]],
    ];
    for (const [v, points] of cases) {
      for (const [x, y] of points) {
        const p = pickSky(v, ASPECT, x, y);
        expect(p).not.toBeNull();
        const s = projectSky(v, ASPECT, p!)!;
        expect(s.x).toBeCloseTo(x, 9);
        expect(s.y).toBeCloseTo(y, 9);
      }
    }
  });

  it('shows the true sky from inside (east on the left) and a mirror image from outside', () => {
    const at0 = (mode: 'sky' | 'globe'): View => ({ mode, center: radecToVec(0, 0), fov: 20, distance: 3 });
    const east = radecToVec(1, 0);
    expect(projectSky(at0('sky'), ASPECT, east)!.x).toBeLessThan(0);
    expect(projectSky(at0('globe'), ASPECT, east)!.x).toBeGreaterThan(0);
    const north = radecToVec(0, 1);
    expect(projectSky(at0('sky'), ASPECT, north)!.y).toBeGreaterThan(0);
    expect(projectSky(at0('globe'), ASPECT, north)!.y).toBeGreaterThan(0);
  });

  it('hides the far side of the globe', () => {
    expect(projectSky(globe, ASPECT, radecToVec(190, -20))).toBeNull();
  });
});

describe('grab-the-sky solver', () => {
  it('moves a chosen sky point under any screen point', () => {
    const cases: [View, number[][]][] = [
      [sky, [[0, 0], [-0.2, 0.1], [0.5, 0.5]]],
      [globe, [[0, 0], [-0.2, 0.1], [0.3, 0.3]]], // inside the globe silhouette
    ];
    for (const [v, points] of cases) {
      const anchor = pickSky(v, ASPECT, 0.3, -0.2)!;
      for (const [x, y] of points) {
        const center = solveAnchor(v, ASPECT, x, y, anchor);
        const under = pickSky({ ...v, center }, ASPECT, x, y)!;
        expect(angularDistance(under, anchor) * 3600).toBeLessThan(0.01);
      }
    }
  });
});

describe('globe ↔ sky scale continuity', () => {
  it('matches the globe at distance 2 to a ~46° sky view', () => {
    expect(equivalentSkyFov(2)).toBeCloseTo(46.319, 2);
  });

  it('inverts equivalentSkyFov while the screen edge still lands on the globe (d < 1/sin 20° ≈ 2.92)', () => {
    for (const d of [1.5, 2, 2.65, 2.9]) expect(distanceForSkyFov(equivalentSkyFov(d))).toBeCloseTo(d, 9);
  });

  it('reports the whole visible cap once the globe fits on screen', () => {
    expect(equivalentSkyFov(3)).toBeCloseTo(2 * (Math.acos(1 / 3) * 180) / Math.PI, 9);
  });
});

describe('tile order selection', () => {
  it('uses the Allsky preview when zoomed out', () => {
    expect(tileOrderFor(0.2, 5)).toBeNull();
  });

  it('picks an order matching the screen pixel, capped at the survey depth', () => {
    expect(tileOrderFor(0.05, 5)).toBe(3);
    expect(tileOrderFor(0.004, 5)).toBe(5);
    expect(tileOrderFor(0.001, 5)).toBe(5);
    expect(tileOrderFor(0.0001, 9)).toBe(9);
  });

  it('reports pixel scale and visible radius', () => {
    expect(pixelScaleDeg(sky, 1000)).toBeCloseTo(0.03, 12);
    expect(visibleRadiusDeg(sky, 1)).toBeGreaterThan(15);
    expect(visibleRadiusDeg(globe, 1)).toBeLessThanOrEqual((Math.acos(1 / 3) * 180) / Math.PI + 1e-9);
  });
});
