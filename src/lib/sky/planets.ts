/**
 * Where the planets are: heliocentric positions from the Keplerian elements of
 * E. M. Standish, "Approximate Positions of the Planets" (JPL Solar System Dynamics),
 * Table 1 — mean ecliptic and equinox of J2000, valid 1800 AD to 2050 AD.
 * https://ssd.jpl.nasa.gov/planets/approx_pos.html (every value checked against the page on 2026-11-15).
 *
 * Frame: J2000 ecliptic, x → J2000 March equinox, z → north ecliptic pole (right-handed); positions in au.
 * JPL quotes errors over 1800–2050 of 10″ (Neptune) to 600″ (Saturn) in heliocentric longitude: fine for a
 * diagram, not for pointing a telescope. As in the table, 'earth' is the Earth–Moon barycentre.
 * Pure functions, covered by tests/planets.test.ts.
 */
import { DEG, RAD } from './coords';

export type PlanetId = 'mercury' | 'venus' | 'earth' | 'mars' | 'jupiter' | 'saturn' | 'uranus' | 'neptune';

export const PLANET_ORDER: PlanetId[] = ['mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune'];

/** Mean orbital elements at J2000 or, used as `rates`, their change per Julian century. */
export interface KeplerianElements {
  /** Semi-major axis a, au. */
  a: number;
  /** Eccentricity e. */
  e: number;
  /** Inclination I to the J2000 ecliptic, degrees. */
  inclination: number;
  /** Mean longitude L, degrees. */
  meanLongitude: number;
  /** Longitude of perihelion ϖ, degrees. */
  longPeri: number;
  /** Longitude of the ascending node Ω, degrees. */
  longNode: number;
}

export interface Planet {
  name: string;
  /** Display colour for diagrams: an approximate hue for recognition, not a measured colour. */
  color: string;
  /** Volumetric mean radius, km (NASA NSSDCA Planetary Fact Sheets). */
  radiusKm: number;
  /** Values at J2000.0 (JPL Table 1). */
  elements: KeplerianElements;
  /** Rates per Julian century (JPL Table 1). */
  rates: KeplerianElements;
}

/** Columns in the order JPL prints them: a, e, I, L, long.peri, long.node. */
const row = (a: number, e: number, inclination: number, meanLongitude: number, longPeri: number, longNode: number): KeplerianElements => ({
  a,
  e,
  inclination,
  meanLongitude,
  longPeri,
  longNode,
});

export const PLANETS: Record<PlanetId, Planet> = {
  mercury: {
    name: 'Mercury',
    color: '#b8b3ab',
    radiusKm: 2439.7,
    elements: row(0.38709927, 0.20563593, 7.00497902, 252.25032350, 77.45779628, 48.33076593),
    rates: row(0.00000037, 0.00001906, -0.00594749, 149472.67411175, 0.16047689, -0.12534081),
  },
  venus: {
    name: 'Venus',
    color: '#e6d3a3',
    radiusKm: 6051.8,
    elements: row(0.72333566, 0.00677672, 3.39467605, 181.97909950, 131.60246718, 76.67984255),
    rates: row(0.00000390, -0.00004107, -0.00078890, 58517.81538729, 0.00268329, -0.27769418),
  },
  earth: {
    name: 'Earth',
    color: '#5fa8ff',
    radiusKm: 6371.0,
    elements: row(1.00000261, 0.01671123, -0.00001531, 100.46457166, 102.93768193, 0.0),
    rates: row(0.00000562, -0.00004392, -0.01294668, 35999.37244981, 0.32327364, 0.0),
  },
  mars: {
    name: 'Mars',
    color: '#e07a5a',
    radiusKm: 3389.5,
    elements: row(1.52371034, 0.09339410, 1.84969142, -4.55343205, -23.94362959, 49.55953891),
    rates: row(0.00001847, 0.00007882, -0.00813131, 19140.30268499, 0.44441088, -0.29257343),
  },
  jupiter: {
    name: 'Jupiter',
    color: '#d8bb92',
    radiusKm: 69911,
    elements: row(5.20288700, 0.04838624, 1.30439695, 34.39644051, 14.72847983, 100.47390909),
    rates: row(-0.00011607, -0.00013253, -0.00183714, 3034.74612775, 0.21252668, 0.20469106),
  },
  saturn: {
    name: 'Saturn',
    color: '#e3cf98',
    radiusKm: 58232,
    elements: row(9.53667594, 0.05386179, 2.48599187, 49.95424423, 92.59887831, 113.66242448),
    rates: row(-0.00125060, -0.00050991, 0.00193609, 1222.49362201, -0.41897216, -0.28867794),
  },
  uranus: {
    name: 'Uranus',
    color: '#b3d8d6',
    radiusKm: 25362,
    elements: row(19.18916464, 0.04725744, 0.77263783, 313.23810451, 170.95427630, 74.01692503),
    rates: row(-0.00196176, -0.00004397, -0.00242939, 428.48202785, 0.40805281, 0.04240589),
  },
  neptune: {
    name: 'Neptune',
    color: '#7f9cf5',
    radiusKm: 24622,
    elements: row(30.06992276, 0.00859048, 1.77004347, -55.12002969, 44.96476227, 131.78422574),
    rates: row(0.00026291, 0.00005105, 0.00035372, 218.45945325, -0.32241464, -0.00508664),
  },
};

/** Years covered by JPL Table 1. Outside them the errors grow; use Table 2a/2b instead. */
export const ELEMENTS_VALID_YEARS = { from: 1800, to: 2050 } as const;

/** Provenance for a credits list (same shape as the survey credits). */
export const PLANET_SOURCES = [
  {
    label: 'JPL Solar System Dynamics',
    text: 'Planet positions use the Keplerian elements of E. M. Standish, "Approximate Positions of the Planets" (Table 1, J2000 ecliptic, 1800–2050).',
    url: 'https://ssd.jpl.nasa.gov/planets/approx_pos.html',
  },
  {
    label: 'NASA Planetary Fact Sheets',
    text: 'Planet radii are the volumetric mean radii of the NASA Space Science Data Coordinated Archive (NSSDCA) fact sheets.',
    url: 'https://nssdc.gsfc.nasa.gov/planetary/factsheet/',
  },
];

const MS_PER_DAY = 86_400_000;
/** Julian Day of the Unix epoch, 1970-01-01T00:00:00 UTC. */
const JD_UNIX_EPOCH = 2440587.5;
/** J2000.0 (2000-01-01 12:00 TT) as a Julian Day. */
export const J2000_JD = 2451545.0;
const DAYS_PER_JULIAN_CENTURY = 36525;
/**
 * TT − UTC in seconds: 32.184 s plus the 37 leap seconds in force since 2017-01-01. JPL's time argument
 * is TDB, which stays within 2 ms of TT. Using one constant for every date shifts dates before 2017 by
 * under 70 s, far below the accuracy of the table.
 */
export const TT_MINUS_UTC_SECONDS = 69.184;

/** Julian Day (UTC-based) of an instant: 2451545.0 at 2000-01-01T12:00:00Z. */
export function julianDay(date: Date): number {
  return date.getTime() / MS_PER_DAY + JD_UNIX_EPOCH;
}

/** JPL's time argument T: Julian centuries of TDB (≈ TT) since J2000.0. */
export function julianCenturiesTdb(date: Date): number {
  return (julianDay(date) + TT_MINUS_UTC_SECONDS / 86400 - J2000_JD) / DAYS_PER_JULIAN_CENTURY;
}

/** Degrees reduced to [−180, 180). */
const wrap180 = (deg: number): number => deg - 360 * Math.floor((deg + 180) / 360);

/** The planet's elements at a date: J2000 value + rate × T. */
export function elementsAt(id: PlanetId, date: Date): KeplerianElements {
  const T = julianCenturiesTdb(date);
  const { elements: p, rates: r } = PLANETS[id];
  return {
    a: p.a + r.a * T,
    e: p.e + r.e * T,
    inclination: p.inclination + r.inclination * T,
    meanLongitude: p.meanLongitude + r.meanLongitude * T,
    longPeri: p.longPeri + r.longPeri * T,
    longNode: p.longNode + r.longNode * T,
  };
}

/** Eccentric anomaly E (radians) solving Kepler's equation E − e·sin E = M, by Newton iteration. */
export function solveKepler(meanAnomaly: number, e: number): number {
  let E = meanAnomaly + e * Math.sin(meanAnomaly);
  for (let n = 0; n < 30; n++) {
    const step = (E - e * Math.sin(E) - meanAnomaly) / (1 - e * Math.cos(E));
    E -= step;
    if (Math.abs(step) < 1e-12) break;
  }
  return E;
}

/** Heliocentric position in the J2000 ecliptic frame, au. */
export function heliocentricEcliptic(id: PlanetId, date: Date): { x: number; y: number; z: number } {
  const { a, e, inclination, meanLongitude, longPeri, longNode } = elementsAt(id, date);
  const w = (longPeri - longNode) * DEG; // argument of perihelion ω = ϖ − Ω
  const node = longNode * DEG;
  const inc = inclination * DEG;
  const E = solveKepler(wrap180(meanLongitude - longPeri) * DEG, e); // mean anomaly M = L − ϖ

  // Position in the orbital plane, x′ towards perihelion.
  const xp = a * (Math.cos(E) - e);
  const yp = a * Math.sqrt(1 - e * e) * Math.sin(E);

  // Rotate by ω, I and Ω into the J2000 ecliptic.
  const cw = Math.cos(w);
  const sw = Math.sin(w);
  const cn = Math.cos(node);
  const sn = Math.sin(node);
  const ci = Math.cos(inc);
  const si = Math.sin(inc);
  return {
    x: (cw * cn - sw * sn * ci) * xp + (-sw * cn - cw * sn * ci) * yp,
    y: (cw * sn + sw * cn * ci) * xp + (-sw * sn + cw * cn * ci) * yp,
    z: sw * si * xp + cw * si * yp,
  };
}

/** Heliocentric ecliptic longitude (J2000), degrees in [0, 360). */
export function eclipticLongitudeDeg(id: PlanetId, date: Date): number {
  const { x, y } = heliocentricEcliptic(id, date);
  return (((Math.atan2(y, x) * RAD) % 360) + 360) % 360;
}

/** Sidereal orbital period in days, from the mean-longitude rate: 36525 × 360 / L̇. */
export function orbitalPeriodDays(id: PlanetId): number {
  return (DAYS_PER_JULIAN_CENTURY * 360) / PLANETS[id].rates.meanLongitude;
}
