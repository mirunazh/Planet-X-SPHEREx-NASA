import { describe, expect, it } from 'vitest';
import * as healpix from '@hscmap/healpix';
import { allskyUrl, allskyUv, tileUrl, tileUv } from '@/lib/sky/hips';
import { SPHEREX_FRAMES, SURVEYS, nearestUsableFrame } from '@/lib/sky/surveys';
import { buildSkyTarget } from '@/lib/sky/target';
import { radecToVec } from '@/lib/sky/coords';
import { flyPath } from '@/lib/sky/flyto';
import { angularDistance } from '@/lib/sky/coords';

describe('HiPS addressing', () => {
  it('builds cube tile URLs with the frame suffix (frame 0 has none)', () => {
    expect(tileUrl(SURVEYS.spherex, 5, 12345, 46)).toBe(
      'https://irsa.ipac.caltech.edu/data/hips/SPHEREx/spherex_allsky_cube/Norder5/Dir10000/Npix12345_46.png',
    );
    expect(tileUrl(SURVEYS.spherex, 3, 7, 0)).toMatch(/Norder3\/Dir0\/Npix7\.png$/);
  });

  it('builds Allsky URLs', () => {
    expect(allskyUrl(SURVEYS.spherex, 10)).toMatch(/Norder3\/Allsky_10\.png$/);
  });

  it('maps cell corners to image corners (x = nw, y = ne, verified orientation)', () => {
    expect(tileUv(0, 0)).toEqual([0, 0]); // south corner → top-left
    expect(tileUv(1, 0)).toEqual([0, 1]); // east corner → bottom-left
    expect(tileUv(0, 1)).toEqual([1, 0]); // west corner → top-right
    expect(tileUv(1, 1)).toEqual([1, 1]); // north corner → bottom-right
  });

  it('places Allsky tiles in 27 columns of 64 px', () => {
    const [u, v] = allskyUv(28, 0.5, 0.5, 1728, 1856);
    expect(u * 1728).toBeCloseTo(64 + 32, 9);
    expect(v * 1856).toBeCloseTo(64 + 32, 9);
  });
});

describe('SPHEREx frames', () => {
  it('lists 102 frames with the blank dichroic channels flagged', () => {
    expect(SPHEREX_FRAMES).toHaveLength(102);
    expect(SPHEREX_FRAMES[46]).toMatchObject({ wavelengthUm: 2.189, band: 3, channel: 13, blank: false });
    expect(SPHEREX_FRAMES.filter((f) => f.blank).map((f) => f.index)).toEqual([50, 51]);
    expect(nearestUsableFrame(50)).toBe(49);
    expect(nearestUsableFrame(51)).toBe(52);
  });
});

describe('SkyTarget', () => {
  it('records the position, galactic coordinates and HEALPix order-14 index', () => {
    const center = radecToVec(10.68479292, 41.269065);
    const t = buildSkyTarget({
      center,
      fovDeg: 0.5,
      uncertaintyArcsec: 12.883,
      survey: 'spherex',
      hipsUrl: SURVEYS.spherex.baseUrl,
      frames: [46],
      wavelengthUm: 2.189,
      origin: 'search',
      now: new Date('2026-11-14T12:00:00Z'),
    });
    expect(t.ra).toBeCloseTo(10.68479292, 9);
    expect(t.dec).toBeCloseTo(41.269065, 9);
    expect(t.galactic.l).toBeCloseTo(121.174, 2);
    expect(t.healpix.ipix).toBe(healpix.vec2pix_nest(2 ** 14, center));
    expect(t.lockedAt).toBe('2026-11-14T12:00:00.000Z');
  });
});

describe('fly-to path', () => {
  it('starts and ends at the requested views', () => {
    const a = radecToVec(0, 0);
    const b = radecToVec(80, 30);
    const path = flyPath(a, 40, b, 2);
    expect(angularDistance(path.at(0).center, a)).toBeLessThan(1e-9);
    expect(path.at(0).fov).toBeCloseTo(40, 6);
    expect(angularDistance(path.at(1).center, b)).toBeLessThan(1e-9);
    expect(path.at(1).fov).toBe(2);
    expect(path.duration).toBeGreaterThanOrEqual(500);
    expect(path.duration).toBeLessThanOrEqual(3200);
  });

  it('zooms monotonically when the centre does not move', () => {
    const c = radecToVec(10, 10);
    const path = flyPath(c, 30, c, 1);
    let last = Infinity;
    for (let t = 0; t <= 1; t += 0.05) {
      const { fov } = path.at(t);
      expect(fov).toBeLessThanOrEqual(last + 1e-9);
      last = fov;
    }
  });
});
