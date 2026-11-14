/**
 * The navigator's output: a precise, reproducible sky target that the image
 * pipeline consumes (see docs/plan-sky-navigator.md, section 6).
 */
import * as healpix from '@hscmap/healpix';
import { type Vec3, normalize, radecToGalactic, vecToRadec } from './coords';

export type TargetOrigin = 'navigation' | 'pin' | 'search' | 'deeplink';

export interface SkyTarget {
  ra: number;
  dec: number;
  frame: 'ICRS';
  galactic: { l: number; b: number };
  fovDeg: number;
  uncertaintyArcsec: number;
  /** Order 14 matches the SPHEREx HiPS pixel (12.9″). */
  healpix: { order: 14; ipix: number; scheme: 'NESTED' };
  layer: { survey: string; hipsUrl: string; frames?: number[]; wavelengthUm?: number };
  origin: TargetOrigin;
  lockedAt: string;
}

export function buildSkyTarget(args: {
  center: Vec3;
  fovDeg: number;
  uncertaintyArcsec: number;
  survey: string;
  hipsUrl: string;
  frames?: number[];
  wavelengthUm?: number;
  origin: TargetOrigin;
  now?: Date;
}): SkyTarget {
  const center = normalize(args.center);
  const { ra, dec } = vecToRadec(center);
  const { l, b } = radecToGalactic(ra, dec);
  return {
    ra,
    dec,
    frame: 'ICRS',
    galactic: { l, b },
    fovDeg: args.fovDeg,
    uncertaintyArcsec: args.uncertaintyArcsec,
    healpix: { order: 14, ipix: healpix.vec2pix_nest(healpix.order2nside(14), center), scheme: 'NESTED' },
    layer: { survey: args.survey, hipsUrl: args.hipsUrl, frames: args.frames, wavelengthUm: args.wavelengthUm },
    origin: args.origin,
    lockedAt: (args.now ?? new Date()).toISOString(),
  };
}
