/** Existing SPHEREx DR1 projection; provenance is in public/intro/sources.json. */
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
   * away from the Magellanic Clouds. It shows the local median sky for display.
   */
  holeRadiusPx: 28,
};

export const INTRO_CREDIT_LINE = 'Sky: NASA/JPL-Caltech · SPHEREx Science Data Center, Caltech/IPAC · NASA/IPAC IRSA';

export const INTRO_IMAGE_SOURCES = [{
  label: 'SPHEREx intro image',
  text: 'SPHEREx DR1 at 2.19 µm, reprojected around the south ecliptic pole. A small missing-data region uses the local sky level for display. Provenance: public/intro/sources.json.',
  url: 'https://irsa.ipac.caltech.edu/data/hips/SPHEREx/spherex_allsky_cube/properties',
}];
