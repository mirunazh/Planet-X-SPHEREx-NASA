import { describe, expect, it } from 'vitest';
import {
  angularDistance,
  applyQuat,
  cross,
  eclToEq,
  eqToWorld,
  galacticToRadec,
  normalize,
  quatFromUnitVectors,
  radecToGalactic,
  radecToVec,
  slerp,
  vecToRadec,
  worldToEq,
  type Vec3,
} from '@/lib/sky/coords';

const near = (a: Vec3, b: Vec3, tol = 1e-12) => a.forEach((v, i) => expect(v).toBeCloseTo(b[i], -Math.log10(tol)));

describe('equatorial vectors', () => {
  it('round-trips RA/Dec, including RA near 0/360 and the poles', () => {
    for (const [ra, dec] of [
      [0, 0],
      [10.68479292, 41.269065],
      [359.9999, -12.5],
      [180, 89.9],
      [266.40499, -28.93617],
    ]) {
      const back = vecToRadec(radecToVec(ra, dec));
      expect(back.ra).toBeCloseTo(ra, 9);
      expect(back.dec).toBeCloseTo(dec, 9);
    }
  });

  it('maps to three.js world space with a proper rotation (no mirroring)', () => {
    const x: Vec3 = [1, 0, 0];
    const y: Vec3 = [0, 1, 0];
    const z: Vec3 = [0, 0, 1];
    near(cross(eqToWorld(x), eqToWorld(y)), eqToWorld(z));
    near(worldToEq(eqToWorld([0.3, -0.4, 0.866])), [0.3, -0.4, 0.866]);
    near(eqToWorld(z), [0, 1, 0]); // celestial north is world up
  });

  it('measures angular distance accurately at 1 arcsecond and at 90 degrees', () => {
    expect(angularDistance(radecToVec(0, 0), radecToVec(90, 0))).toBeCloseTo(90, 12);
    expect(angularDistance(radecToVec(0, 0), radecToVec(0, 1 / 3600)) * 3600).toBeCloseTo(1, 9);
  });
});

describe('galactic frame (Hipparcos definition)', () => {
  it('puts the galactic centre at l = 0, b = 0', () => {
    const { l, b } = radecToGalactic(266.40499, -28.93617);
    expect(Math.min(l, 360 - l)).toBeLessThan(2e-4);
    expect(Math.abs(b)).toBeLessThan(2e-4);
  });

  it('puts the north galactic pole at b = +90', () => {
    expect(radecToGalactic(192.85948, 27.12825).b).toBeGreaterThan(90 - 2e-4);
  });

  it('places l = 90, b = 0 at RA 318.004, Dec +48.330', () => {
    const { ra, dec } = galacticToRadec(90, 0);
    expect(ra).toBeCloseTo(318.0042, 3);
    expect(dec).toBeCloseTo(48.3297, 3);
  });

  it('gives the known galactic coordinates of M31 (NED position)', () => {
    const { l, b } = radecToGalactic(10.68479292, 41.269065);
    expect(l).toBeCloseTo(121.1743, 2);
    expect(b).toBeCloseTo(-21.5733, 2);
  });
});

describe('ecliptic frame', () => {
  it('puts the north ecliptic pole at RA 270, Dec 90 - obliquity', () => {
    const { ra, dec } = vecToRadec(eclToEq([0, 0, 1]));
    expect(ra).toBeCloseTo(270, 9);
    expect(dec).toBeCloseTo(90 - 84381.406 / 3600, 9);
  });
});

describe('rotations', () => {
  it('builds the rotation taking one direction onto another', () => {
    const a = normalize([1, 2, 3]);
    const b = normalize([-2, 0.5, 1]);
    near(applyQuat(quatFromUnitVectors(a, b), a), b, 1e-12);
  });

  it('handles opposite directions', () => {
    const a: Vec3 = [0, 0, 1];
    near(applyQuat(quatFromUnitVectors(a, [0, 0, -1]), a), [0, 0, -1], 1e-12);
  });

  it('slerps along the great circle', () => {
    const a = radecToVec(0, 0);
    const b = radecToVec(90, 0);
    near(slerp(a, b, 0), a);
    near(slerp(a, b, 1), b);
    expect(vecToRadec(slerp(a, b, 0.5)).ra).toBeCloseTo(45, 9);
  });
});
