/**
 * Smooth zoom-and-pan flights between two views, after van Wijk & Nuij (2003),
 * "Smooth and efficient zooming and panning", IEEE InfoVis. Same formulation as
 * d3-interpolate's interpolateZoom, with angular distance on the sphere as the
 * pan distance and the field of view as the zoom width.
 */
import { type Vec3, DEG, RAD, angularDistance, slerp } from './coords';
import { SKY_MAX_FOV } from './view';

export interface FlyPath {
  duration: number;
  at(t: number): { center: Vec3; fov: number };
}

const RHO = Math.SQRT2;
const RHO2 = 2;
const RHO4 = 4;

const smoothstep = (t: number) => t * t * (3 - 2 * t);
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

export function flyPath(c0: Vec3, fov0: number, c1: Vec3, fov1: number): FlyPath {
  const d1 = angularDistance(c0, c1) * DEG;
  const w0 = fov0 * DEG;
  const w1 = fov1 * DEG;
  let S: number;
  let uw: (s: number) => [number, number];

  if (d1 < 1e-9) {
    S = Math.log(w1 / w0) / RHO;
    uw = (s) => [1, w0 * Math.exp(RHO * s)];
  } else {
    const b0 = (w1 * w1 - w0 * w0 + RHO4 * d1 * d1) / (2 * w0 * RHO2 * d1);
    const b1 = (w1 * w1 - w0 * w0 - RHO4 * d1 * d1) / (2 * w1 * RHO2 * d1);
    const r0 = Math.log(Math.sqrt(b0 * b0 + 1) - b0);
    const r1 = Math.log(Math.sqrt(b1 * b1 + 1) - b1);
    S = (r1 - r0) / RHO;
    uw = (s) => [
      (w0 / (RHO2 * d1)) * (Math.cosh(r0) * Math.tanh(RHO * s + r0) - Math.sinh(r0)),
      (w0 * Math.cosh(r0)) / Math.cosh(RHO * s + r0),
    ];
  }

  const duration = clamp(Math.abs(S) * 900, 500, 3200);
  return {
    duration,
    at(t: number) {
      const tt = smoothstep(clamp(t, 0, 1));
      if (tt >= 1) return { center: c1, fov: fov1 };
      const [u, w] = uw(tt * S);
      return {
        center: d1 < 1e-9 ? c1 : slerp(c0, c1, clamp(u, 0, 1)),
        fov: clamp(w * RAD, Math.min(fov0, fov1) * 0.5, SKY_MAX_FOV),
      };
    },
  };
}
