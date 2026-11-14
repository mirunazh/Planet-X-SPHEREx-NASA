import { bench, describe } from 'vitest';
import { buildTileGeometry, disposeAllskyGeometries, getAllskyGeometry } from '@/components/sky/geometry';
import * as healpix from '@hscmap/healpix';
import { angularDistance, DEG, radecToVec, type Vec3 } from '@/lib/sky/coords';
import { pixelScaleDeg, tileOrderFor, visibleRadiusDeg } from '@/lib/sky/view';
import { renderDpr, streamProfile } from '@/lib/sky/streaming';

// CPU-only timings. These do not measure image decoding, texture uploads or FPS.
const options = { time: 500, warmupTime: 100, iterations: 10 };

describe('sky geometry CPU', () => {
  bench('cold whole-sky geometry (768 cells)', () => {
    disposeAllskyGeometries();
    getAllskyGeometry(1728, 1856);
    disposeAllskyGeometries();
  }, options);
  bench('coarse detail geometry (order 3)', () => {
    buildTileGeometry(3, 42).dispose();
  }, options);
  bench('fine detail geometry (order 9)', () => {
    buildTileGeometry(9, 123456).dispose();
  }, options);
});

describe('visible-cell planning CPU', () => {
  for (const [name, width, height, deviceDpr] of [['desktop', 1440, 900, 2], ['mobile', 390, 844, 3]] as const) {
    bench(`${name}: four destinations × four zoom levels`, () => {
      const profile = streamProfile(width, height);
      const dpr = renderDpr(width, height, deviceDpr);
      for (const [ra, dec] of [[10.68, 41.27], [210.8, 54.35], [270, 66.56], [43.25, 16.88]]) {
        for (const fov of [60, 10, 0.6, 0.05]) {
          const center = radecToVec(ra, dec);
          const view = { mode: 'sky' as const, center, fov, distance: 3.2 };
          const radius = Math.min(89, visibleRadiusDeg(view, width / height)) * DEG;
          let order = tileOrderFor(pixelScaleDeg(view, height * dpr), 9);
          let cells: number[] = [];
          while (order !== null) {
            cells = [];
            healpix.query_disc_inclusive_nest(2 ** order, center, radius, (p) => cells.push(p));
            if (cells.length <= profile.maxTiles) break;
            order = order > 3 ? order - 1 : null;
          }
          if (order !== null) {
            const nside = 2 ** order;
            cells.sort((a, b) => angularDistance(healpix.pix2vec_nest(nside, a) as Vec3, center) - angularDistance(healpix.pix2vec_nest(nside, b) as Vec3, center));
          }
        }
      }
    }, options);
  }
});
