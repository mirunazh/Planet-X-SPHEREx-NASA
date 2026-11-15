/**
 * What the Solar System intro draws. The project's scope is SPHEREx only, so the one picture is
 * the SPHEREx sky behind the Sun, built by scripts/build-intro-imagery.mjs (npm run data:intro);
 * public/intro/sources.json records its provenance (checked by tests/introImagery.test.ts).
 * The Sun and the planets are drawn as simple coloured discs: a diagram, not photographs.
 */
import type { PlanetId } from '@/lib/sky/planets';

export type BodyId = PlanetId | 'sun';

export interface BodyShape {
  /** Radius that labels keep clear of, over the body's drawn radius. */
  reach: number;
}

/** Saturn's A ring outer edge over its equatorial radius (136 775 km / 60 268 km, NASA fact sheet). */
export const SATURN_RINGS = 136775 / 60268;
/** Saturn's C ring inner edge over its equatorial radius (74 658 km / 60 268 km, NASA fact sheet). */
export const SATURN_RINGS_INNER = 74658 / 60268;

export const BODY_SHAPES: Record<BodyId, BodyShape> = {
  sun: { reach: 1.1 },
  mercury: { reach: 1 },
  venus: { reach: 1 },
  earth: { reach: 1 },
  mars: { reach: 1 },
  jupiter: { reach: 1 },
  saturn: { reach: SATURN_RINGS },
  uranus: { reach: 1 },
  neptune: { reach: 1 },
};

/**
 * The sky behind the planets. The orrery looks down from the north ecliptic pole, so the stars
 * behind the Sun are those around the south ecliptic pole. Stereographic projection centred on that
 * pole, seen from inside the sky, with ecliptic longitude 0° to the right and 90° up, like the orrery.
 */
export const SKY_BACKDROP = {
  src: '/intro/sky-south-ecliptic-pole.jpg',
  /** Width and height of the image, px. */
  size: 2048,
  /** Image pixels per unit of stereographic radius 2·tan(θ/2), θ being the angle from the pole. */
  pxPerUnitRadius: 731.2118,
  /** Half-width of the picture as an angle from the pole, degrees. */
  edgeDeg: 70,
  /**
   * Radius, image px, of the disc around the pole (about 2.2°) that has no data in the SPHEREx DR1
   * all-sky map. It is not the deep field: SPHEREx's southern deep field sits 6.4° from the pole,
   * away from the Magellanic Clouds. It shows the local median sky; the Sun's glare covers it.
   */
  holeRadiusPx: 28,
};

/** One line under the drawing; the full credits are in Sources. */
export const INTRO_CREDIT_LINE = 'Sky: NASA SPHEREx · Sun and planets drawn as a diagram';

/** Credits for Sources → "Solar System intro" (same shape as PLANET_SOURCES). */
export const INTRO_IMAGE_SOURCES = [
  {
    label: 'Sky behind the planets',
    text: 'SPHEREx DR1 all-sky map at 2.19 µm, the sky map’s first view, reprojected around the south ecliptic pole: the direction a view from above the Solar System looks. NASA/JPL-Caltech, via NASA/IPAC IRSA. Planet sizes and the sky’s angular scale are illustrative; the Sun and planets are drawn, not photographed.',
    url: 'https://irsa.ipac.caltech.edu/data/hips/SPHEREx/spherex_allsky_cube/properties',
  },
];
