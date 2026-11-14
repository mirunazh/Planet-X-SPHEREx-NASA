import { describe, expect, it } from 'vitest';
import { gridToSky, skyToGrid, offsetArcsec, angleDiffDeg } from '../src/grid.js';
import { MISSION_IDS } from '../src/manifest.js';
import { manifest } from './data.js';

describe('grid matches the Python build', () => {
  it('gridToSky reproduces every measured and predicted position; round trip is exact', () => {
    let worstSky = { arcsec: 0, where: '' };
    let worstTrip = { px: 0, where: '' };
    let n = 0;
    for (const id of MISSION_IDS) {
      const m = manifest(id);
      const pts = m.groups.flatMap((g) =>
        g.passes.flatMap((p) => [
          { where: `${id} ${g.id} p${p.index} predicted`, q: p.predicted },
          ...(p.measured ? [{ where: `${id} ${g.id} p${p.index} measured`, q: p.measured }] : []),
        ]),
      );
      if (m.challengeInput) pts.push({ where: `${id} challengeInput`, q: m.challengeInput });
      for (const { where, q } of pts) {
        const s = gridToSky(m.grid, q.x, q.y);
        const d = offsetArcsec(s, { ra: q.ra, dec: q.dec }).total;
        if (d > worstSky.arcsec) worstSky = { arcsec: d, where };
        const back = skyToGrid(m.grid, s.ra, s.dec);
        const t = Math.hypot(back.x - q.x, back.y - q.y);
        if (t > worstTrip.px) worstTrip = { px: t, where };
        expect(d, where).toBeLessThan(0.05);
        expect(t, where).toBeLessThan(1e-6);
        n++;
      }
    }
    console.log(`[grid] ${n} positions; worst sky diff ${worstSky.arcsec.toExponential(3)}" (${worstSky.where}); worst round trip ${worstTrip.px.toExponential(3)} px (${worstTrip.where})`);
  });

  it('centre pixel is (60, 60); +x is west, +y is south', () => {
    const g = { ra0: 10, dec0: 20, scaleArcsec: 3, width: 121, height: 121 };
    const c = gridToSky(g, 60, 60);
    expect(c.ra).toBeCloseTo(10, 12);
    expect(c.dec).toBeCloseTo(20, 12);
    const o = offsetArcsec(c, gridToSky(g, 61, 60));
    expect(o.east).toBeCloseTo(-3, 4);
    expect(offsetArcsec(c, gridToSky(g, 60, 61)).north).toBeCloseTo(-3, 4);
    expect(o.paDeg).toBeCloseTo(270, 3);
  });

  it('offsetArcsec wraps across RA 0 and gives position angles east of north', () => {
    const o = offsetArcsec({ ra: 359.999, dec: 0 }, { ra: 0.001, dec: 0 });
    expect(o.east).toBeCloseTo(7.2, 6);
    expect(offsetArcsec({ ra: 0, dec: 0 }, { ra: 0, dec: 1 / 3600 }).paDeg).toBeCloseTo(0, 9);
    expect(offsetArcsec({ ra: 0, dec: 0 }, { ra: 1 / 3600, dec: 0 }).paDeg).toBeCloseTo(90, 9);
    expect(angleDiffDeg(359, 1)).toBeCloseTo(2, 9);
  });
});
