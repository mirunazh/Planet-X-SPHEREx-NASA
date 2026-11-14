/**
 * Short explanations for every element of the interface. Shown as tooltips on
 * hover or keyboard focus (HintLayer), and listed in the Field guide inside
 * "How it works" for touch screens. One source of truth for both.
 */
import type { SurveyId } from '@/lib/sky/surveys';

export const HINT = {
  // Top bar
  brand: 'Explore the infrared sky using only NASA data. Drag to turn the sky, scroll to zoom.',
  search:
    'Go somewhere: type a name (M31), coordinates (10.68 41.27 or 00 42 44 +41 16 09), or any galaxy name, which is looked up in NASA’s NED.',
  help: 'Controls, a guide to every field, and how the coordinates are calculated.',
  credits: 'Where each image and catalogue comes from, with NASA’s required acknowledgements.',

  // Coordinate readout
  ra: 'Right ascension (RA): the sky’s east–west coordinate, like longitude on Earth. Written in hours, minutes and seconds; 24h = 360°.',
  dec: 'Declination (Dec): the sky’s north–south coordinate, like latitude. +90° is the north celestial pole, 0° the celestial equator.',
  galactic: 'Galactic coordinates: l runs along the Milky Way (0° points to its centre), b is the angle above or below its plane.',
  fov: 'Field of view: how tall a slice of sky the screen shows, top to bottom. The full Moon is about 0.5° across.',
  uncertainty: 'Precision: the larger of one screen pixel and one image pixel. Finer digits are hidden because they would not be real.',
  detailPreview: 'Whole-sky preview: a low-resolution image of the entire sky. Zoom in to load sharper tiles.',
  detailNative: 'Native resolution: you are seeing the telescope’s real pixels.',
  detailMagnified: 'Beyond native resolution: the image pixels are enlarged, so finer detail is not real. 2MASS has the sharpest pixels.',
  modeGlobe: 'Globe view: the sky seen from outside, mirror-reversed like a celestial globe. Zoom in to fly inside.',
  modeSky: 'Sky view: you are inside the sphere and see the real sky, with north up and east to the left.',
  reticle: 'The crosshair in the middle of the screen marks the point the coordinates refer to.',

  // Sky layer panel
  layersToggle: 'Show or hide the layer settings.',
  surveyInfo: 'Mission, wavelengths, years observed, and the size of one image pixel (1″ = one arcsecond = 1/3600 of a degree).',
  wavelength: 'Which of SPHEREx’s 102 infrared colours to show. Band and channel name the detector strip (6 bands × 17 channels).',
  gain: 'Brightens the picture on screen only. The measured data do not change.',
  grid: 'Coordinate grid (blue), ecliptic (orange: path of the Sun and planets) and galactic plane (teal: middle of the Milky Way).',
  targets: 'Blue rings: galaxies, SPHEREx deep fields and reference points. Click one for details.',
  hosts: 'Orange dots: stars with confirmed planets, from the NASA Exoplanet Archive. Hover or click for details.',
  raw: 'Show the real square image pixels instead of smoothing them, to tell real detail from interpolation.',

  // Navigation dock
  minimap: 'Whole-sky map with the Milky Way across the middle. The cyan outline is your current view; click to fly there.',
  zoomOut: 'Zoom out (− key).',
  zoomIn: 'Zoom in (+ key).',
  enterSky: 'Fly through the sphere into the real sky (S key).',
  exitSky: 'Fly back out to the globe (S key).',
  reset: 'Return to the starting view of the whole sky (R key).',
  lock: 'Freeze the coordinates of the centre point as a target for the image comparison (Enter key).',
  lockDisabled: 'Zoom in until the view is less than 1° tall to lock a target.',

  // Details panel (pins)
  kind: 'What kind of object this is.',
  position: 'Position on the sky: right ascension and declination.',
  planets: 'Number of confirmed planets and their names.',
  distance: 'Distance from the Sun. 1 parsec (pc) = 3.26 light-years.',
  kmag: 'Brightness at 2.2 µm (Ks band). Smaller numbers are brighter; 5 magnitudes = 100× brighter.',
  discovery: 'Year the first planet was announced, and the observatory that found it.',
  source: 'The NASA service this position and data come from.',
  flyHere: 'Fly to this object.',
  close: 'Close this panel.',

  // Locked target panel
  locked: 'Locked target: the centre position, frozen for the image comparison.',
  decimal: 'RA and Dec in decimal degrees, the format most software expects.',
  healpix: 'ID of this patch of sky in the HEALPix grid that NASA’s image tiles use (order-14 cells are 12.9″ wide).',
  layer: 'Survey and wavelength you were viewing when you locked.',
  origin: 'How you reached this view: search, pin, navigation (drag or zoom) or deeplink (a shared link).',
  copyJson: 'Copy all target data as JSON, the format the image pipeline reads.',
  copyLink: 'Copy a link that reopens exactly this view.',
  release: 'Release the locked target.',

  // On the sky
  pins: 'Orange dots are exoplanet host stars, blue rings are featured targets. Hover for a name, click for details.',
  skyLabels: 'Labels on the sky: RA hours along the celestial equator, declination degrees along the meridian through the view centre.',
} as const;

export const SURVEY_HINT: Record<SurveyId, string> = {
  spherex: 'NASA SPHEREx (2025–26): the whole sky in 102 infrared colours from 0.75 to 5 µm. One pixel = 12.9″.',
  twomass: '2MASS (1997–2001): near-infrared J, H, Ks colour image of the whole sky. Sharpest layer: one pixel = 0.8″.',
  allwise: 'NASA WISE (2010–11): mid-infrared colour image at 3.4, 4.6 and 22 µm. One pixel = 1.6″.',
};

export interface GuideSection {
  title: string;
  items: [term: string, text: string][];
}

export const FIELD_GUIDE: GuideSection[] = [
  {
    title: 'Top bar',
    items: [
      ['Search', HINT.search],
      ['How it works', HINT.help],
      ['Data & credits', HINT.credits],
    ],
  },
  {
    title: 'Coordinate readout (bottom centre)',
    items: [
      ['RA', HINT.ra],
      ['Dec', HINT.dec],
      ['l · b', HINT.galactic],
      ['FOV', HINT.fov],
      ['± value', HINT.uncertainty],
      ['Whole-sky preview', HINT.detailPreview],
      ['Native resolution', HINT.detailNative],
      ['Beyond native resolution ×N', HINT.detailMagnified],
      ['Globe view', HINT.modeGlobe],
      ['Sky view', HINT.modeSky],
      ['Crosshair', HINT.reticle],
    ],
  },
  {
    title: 'Sky layer panel (bottom left)',
    items: [
      ['SPHEREx', SURVEY_HINT.spherex],
      ['2MASS', SURVEY_HINT.twomass],
      ['AllWISE', SURVEY_HINT.allwise],
      ['Line under the buttons', HINT.surveyInfo],
      ['Wavelength', HINT.wavelength],
      ['Display brightness', HINT.gain],
      ['Grid, ecliptic and galactic plane', HINT.grid],
      ['Featured targets', HINT.targets],
      ['Exoplanet host stars', HINT.hosts],
      ['Show raw pixels', HINT.raw],
    ],
  },
  {
    title: 'Navigation (bottom right)',
    items: [
      ['Mini-map', HINT.minimap],
      ['− and +', 'Zoom out and zoom in (− and + keys).'],
      ['Fly inside / Back to globe', 'Switch between the globe (outside) and the real sky (inside). S key.'],
      ['Reset', HINT.reset],
      ['Lock target', `${HINT.lock} ${HINT.lockDisabled}`],
    ],
  },
  {
    title: 'Details panel (after clicking a pin)',
    items: [
      ['Planets', HINT.planets],
      ['Distance', HINT.distance],
      ['Ks magnitude', HINT.kmag],
      ['First discovery', HINT.discovery],
      ['Source', HINT.source],
    ],
  },
  {
    title: 'Locked target panel',
    items: [
      ['Decimal', HINT.decimal],
      ['HEALPix', HINT.healpix],
      ['Layer', HINT.layer],
      ['Origin', HINT.origin],
      ['Copy JSON', HINT.copyJson],
      ['Copy link', HINT.copyLink],
    ],
  },
  {
    title: 'On the sky',
    items: [
      ['Pins', HINT.pins],
      ['Labels', HINT.skyLabels],
    ],
  },
];
