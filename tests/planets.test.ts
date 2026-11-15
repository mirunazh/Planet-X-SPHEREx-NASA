import { describe, expect, it } from 'vitest';
import {
  PLANETS,
  PLANET_ORDER,
  eclipticLongitudeDeg,
  heliocentricEcliptic,
  julianDay,
  orbitalPeriodDays,
  solveKepler,
  type PlanetId,
} from '@/lib/sky/planets';

const RAD = 180 / Math.PI;
const AU_KM = 149597870.7;
const distance = (p: { x: number; y: number; z: number }) => Math.hypot(p.x, p.y, p.z);
/** Smallest signed difference between two angles, degrees. */
const angleDiff = (a: number, b: number) => ((((a - b) % 360) + 540) % 360) - 180;

describe('time scale', () => {
  it('puts J2000.0 at JD 2451545.0 and the Unix epoch at JD 2440587.5', () => {
    expect(julianDay(new Date('2000-01-01T12:00:00Z'))).toBe(2451545.0);
    expect(julianDay(new Date(0))).toBe(2440587.5);
  });
});

describe('Kepler equation', () => {
  it('solves E − e·sin E = M to machine precision, including Mercury-like eccentricity', () => {
    for (const e of [0, 0.0167, 0.2056, 0.6]) {
      for (const M of [-3, -1, -0.1, 0, 0.5, 2, 3.1]) {
        const E = solveKepler(M, e);
        expect(E - e * Math.sin(E)).toBeCloseTo(M, 12);
      }
    }
  });
});

describe('Earth at the 2025 March equinox', () => {
  // USNO: the equinox fell on 2025-03-20 at 09:01 UTC, when the Sun's geocentric longitude is 0°.
  const equinox = new Date('2025-03-20T09:01:00Z');

  it("puts Earth at heliocentric longitude 180°, opposite the Sun's direction", () => {
    expect(Math.abs(eclipticLongitudeDeg('earth', equinox) - 180)).toBeLessThan(0.7);
  });

  it('is offset by the precession of the equinox since J2000, as expected for a fixed J2000 frame', () => {
    // General precession in longitude: 5028.796″ per Julian century (IAU 2006), about 0.35° by 2025.
    const T = (julianDay(equinox) - 2451545) / 36525;
    const expected = 180 - (5028.796 * T) / 3600;
    // What remains is aberration (20.5″), the Earth–Moon barycentre offset (< 7″) and JPL's quoted 20″ error.
    expect(Math.abs(eclipticLongitudeDeg('earth', equinox) - expected)).toBeLessThan(0.02);
  });
});

describe('orbital periods from the mean-longitude rates', () => {
  it('gives the familiar periods', () => {
    expect(Math.abs(orbitalPeriodDays('mercury') - 88)).toBeLessThan(1);
    expect(Math.abs(orbitalPeriodDays('earth') - 365.25)).toBeLessThan(0.5);
    expect(Math.abs(orbitalPeriodDays('neptune') - 60000)).toBeLessThan(1000);
  });

  it("obeys Kepler's third law, P² = a³ in years and au, to 0.5%", () => {
    for (const id of PLANET_ORDER) {
      const years = orbitalPeriodDays(id) / 365.25;
      expect(Math.abs((years * years) / PLANETS[id].elements.a ** 3 - 1)).toBeLessThan(0.005);
    }
  });

  it('gets slower with distance from the Sun', () => {
    const periods = PLANET_ORDER.map(orbitalPeriodDays);
    periods.slice(1).forEach((p, i) => expect(p).toBeGreaterThan(periods[i]));
  });
});

describe('heliocentric positions', () => {
  it('keeps Mars between 1.38 and 1.67 au from the Sun over 2026–2028 (sampled monthly)', () => {
    for (let month = 0; month < 36; month++) {
      const r = distance(heliocentricEcliptic('mars', new Date(Date.UTC(2026, month, 1))));
      expect(r).toBeGreaterThan(1.38);
      expect(r).toBeLessThan(1.67);
    }
  });

  it('returns longitudes in [0, 360)', () => {
    for (const id of PLANET_ORDER) {
      for (let day = 0; day < 400; day += 7) {
        const lon = eclipticLongitudeDeg(id, new Date(Date.UTC(2026, 10, 15 + day)));
        expect(lon).toBeGreaterThanOrEqual(0);
        expect(lon).toBeLessThan(360);
      }
    }
  });

  // Geometric heliocentric positions in the ecliptic of J2000 at 2026-11-15 00:00 UT (JD 2461359.5), au,
  // from the JPL Horizons API (DE441), retrieved 2026-11-15. Earth is the Earth–Moon barycentre (target '3'),
  // the planets are their body centres (199 … 899).
  const HORIZONS: Record<PlanetId, [number, number, number]> = {
    mercury: [-8.809989091012561e-2, 2.998786420370378e-1, 3.258753495670434e-2],
    venus: [3.002466392322312e-1, 6.558328915176632e-1, -8.311202033010227e-3],
    earth: [6.055705508549668e-1, 7.823001953522822e-1, -5.20715431964824e-5],
    mars: [-4.710872085957731e-1, 1.537688773430219, 4.377530968678651e-2],
    jupiter: [-3.743240117578106, 3.781534494606773, 6.804157470670331e-2],
    saturn: [9.194876959268326, 2.012004145440319, -4.010534475484059e-1],
    uranus: [8.771589014233687, 1.734077574586258e1, -4.933080963021454e-2],
    neptune: [2.982953330925988e1, 1.521966728607146, -7.187577401711956e-1],
  };

  it('agrees with the full JPL ephemeris to 0.1° in longitude and 0.01 au in distance', () => {
    const date = new Date('2026-11-15T00:00:00Z');
    for (const id of PLANET_ORDER) {
      const [hx, hy, hz] = HORIZONS[id];
      const p = heliocentricEcliptic(id, date);
      expect(Math.abs(angleDiff(eclipticLongitudeDeg(id, date), Math.atan2(hy, hx) * RAD))).toBeLessThan(0.1);
      expect(Math.abs(Math.asin(p.z / distance(p)) - Math.asin(hz / Math.hypot(hx, hy, hz))) * RAD).toBeLessThan(0.01);
      expect(Math.abs(distance(p) - Math.hypot(hx, hy, hz))).toBeLessThan(0.01);
    }
  });

  it("meets JPL's quoted accuracy for the inner planets (tens of arcseconds, thousands of km)", () => {
    const date = new Date('2026-11-15T00:00:00Z');
    for (const id of ['mercury', 'venus', 'earth', 'mars'] as const) {
      const [hx, hy, hz] = HORIZONS[id];
      const p = heliocentricEcliptic(id, date);
      expect(Math.abs(angleDiff(eclipticLongitudeDeg(id, date), Math.atan2(hy, hx) * RAD)) * 3600).toBeLessThan(60);
      expect(Math.abs(distance(p) - Math.hypot(hx, hy, hz)) * AU_KM).toBeLessThan(25_000);
    }
  });
});

describe('planet data', () => {
  it('lists the eight planets in order from the Sun', () => {
    expect(PLANET_ORDER).toEqual(['mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune']);
    PLANET_ORDER.slice(1).forEach((id, i) => expect(PLANETS[id].elements.a).toBeGreaterThan(PLANETS[PLANET_ORDER[i]].elements.a));
  });

  it("uses NASA's mean radii (Jupiter largest, Mercury smallest)", () => {
    const radii = PLANET_ORDER.map((id) => PLANETS[id].radiusKm);
    expect(Math.max(...radii)).toBe(PLANETS.jupiter.radiusKm);
    expect(Math.min(...radii)).toBe(PLANETS.mercury.radiusKm);
    expect(PLANETS.earth.radiusKm).toBe(6371.0);
  });
});
