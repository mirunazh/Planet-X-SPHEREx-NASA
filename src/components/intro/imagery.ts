/**
 * The real NASA imagery of the Solar System intro, built by scripts/build-intro-imagery.mjs
 * (npm run data:intro). public/intro/sources.json records each file's mission, credit, source URL
 * and processing; the geometry below must match it (checked by tests/introImagery.test.ts).
 */
import type { PlanetId } from '@/lib/sky/planets';

export type BodyId = PlanetId | 'sun';

export interface BodyImage {
  src: string;
  /** True for a square photo cropped to the disc, drawn with a round clip; false for a cut-out on transparency. */
  round: boolean;
  /** Half-width of the picture over the body's drawn radius: 1 for a disc, more for the corona or rings. */
  extent: number;
  /** Radius that labels keep clear of, over the body's drawn radius. */
  reach: number;
}

/** Saturn's A ring outer edge over its equatorial radius (136 775 km / 60 268 km, NASA fact sheet). */
const SATURN_RINGS = 136775 / 60268;

export const BODY_IMAGES: Record<BodyId, BodyImage> = {
  // The Sun's disc fills 0.8 of the picture's half-width; the corona fills the rest.
  sun: { src: '/intro/sun.png', round: false, extent: 1 / 0.8, reach: 1.1 },
  mercury: { src: '/intro/mercury.jpg', round: true, extent: 1, reach: 1 },
  venus: { src: '/intro/venus.jpg', round: true, extent: 1, reach: 1 },
  earth: { src: '/intro/earth.jpg', round: true, extent: 1, reach: 1 },
  mars: { src: '/intro/mars.jpg', round: true, extent: 1, reach: 1 },
  jupiter: { src: '/intro/jupiter.jpg', round: true, extent: 1, reach: 1 },
  // The globe fills 0.4278 of the picture's half-width; the rings reach the edge (with a 3% margin).
  saturn: { src: '/intro/saturn.png', round: false, extent: 1 / 0.4278, reach: SATURN_RINGS },
  uranus: { src: '/intro/uranus.jpg', round: true, extent: 1, reach: 1 },
  neptune: { src: '/intro/neptune.jpg', round: true, extent: 1, reach: 1 },
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
export const INTRO_CREDIT_LINE = 'Photos: NASA SDO, MESSENGER, Mariner 10, DSCOVR, Viking, Cassini, Voyager 2 · Sky: NASA SPHEREx';

/** Credits for Sources → "Solar System intro" (same shape as PLANET_SOURCES). */
export const INTRO_IMAGE_SOURCES = [
  {
    label: 'Sun',
    text: 'Solar Dynamics Observatory, AIA 171 Å (extreme ultraviolet), 15 Nov 2026 06:26 UT. Courtesy of NASA/SDO and the AIA science team.',
    url: 'https://sdo.gsfc.nasa.gov/',
  },
  {
    label: 'Mercury',
    text: 'MESSENGER global mosaic, PIA15160. NASA/Johns Hopkins University Applied Physics Laboratory/Carnegie Institution of Washington.',
    url: 'https://images.nasa.gov/details/PIA15160',
  },
  { label: 'Venus', text: 'Mariner 10, PIA23791 (left panel, close to natural colour). NASA/JPL-Caltech.', url: 'https://images.nasa.gov/details/PIA23791' },
  {
    label: 'Earth',
    text: 'DSCOVR EPIC natural-colour image, 12 Nov 2026 10:51 UTC, from 1.5 million km. NASA EPIC Team.',
    url: 'https://epic.gsfc.nasa.gov/',
  },
  { label: 'Mars', text: 'Viking Orbiter global colour view, PIA00407. NASA/JPL/USGS.', url: 'https://images.nasa.gov/details/PIA00407' },
  { label: 'Jupiter', text: 'Cassini, PIA02873. NASA/JPL/University of Arizona.', url: 'https://images.nasa.gov/details/PIA02873' },
  { label: 'Saturn', text: 'Cassini, PIA21046. NASA/JPL-Caltech/Space Science Institute.', url: 'https://images.nasa.gov/details/PIA21046' },
  { label: 'Uranus', text: 'Voyager 2, PIA18182. NASA/JPL-Caltech.', url: 'https://images.nasa.gov/details/PIA18182' },
  { label: 'Neptune', text: 'Voyager 2, PIA00046. NASA/JPL.', url: 'https://images.nasa.gov/details/PIA00046' },
  {
    label: 'Sky behind the planets',
    text: 'SPHEREx DR1 all-sky map at 2.19 µm, the sky map’s first view, reprojected around the south ecliptic pole: the direction a view from above the Solar System looks. NASA/JPL-Caltech, via NASA/IPAC IRSA. Planet sizes and the sky’s angular scale are illustrative.',
    url: 'https://irsa.ipac.caltech.edu/data/hips/SPHEREx/spherex_allsky_cube/properties',
  },
  {
    label: 'Image library',
    text: 'Planet photos from the NASA Image and Video Library, cropped and resized by scripts/build-intro-imagery.mjs; provenance in public/intro/sources.json.',
    url: 'https://images.nasa.gov/',
  },
];
