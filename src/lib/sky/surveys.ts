/**
 * Registry of the NASA sky surveys the navigator can display. All of them are
 * HiPS tile sets served by the NASA/IPAC Infrared Science Archive (IRSA).
 * Values were read from each survey's `properties` file on 2026-11-14.
 */
export type SurveyId = 'spherex' | 'twomass' | 'allwise';

export interface Credit {
  label: string;
  text: string;
  url: string;
  doi?: string;
}

export interface SpherexFrame {
  index: number;
  wavelengthUm: number;
  band: number;
  channel: number;
  blank: boolean;
}

export interface Survey {
  id: SurveyId;
  name: string;
  shortName: string;
  mission: string;
  baseUrl: string;
  ext: 'png' | 'jpg';
  maxOrder: number;
  /** Native pixel of the HiPS at its deepest order, in arcseconds. */
  pixelScaleArcsec: number;
  wavelength: string;
  epoch: string;
  isCube: boolean;
  defaultFrame: number;
  credits: Credit[];
}

/** SPHEREx DR1 cube wavelengths (µm), from `data_cube_crval3_arr` in the HiPS properties. */
const SPHEREX_WAVELENGTHS_UM = [
  0.753, 0.771, 0.79, 0.809, 0.828, 0.848, 0.868, 0.889, 0.91, 0.932, 0.955, 0.978, 1.001, 1.025, 1.05, 1.075, 1.102,
  1.113, 1.139, 1.167, 1.195, 1.224, 1.254, 1.284, 1.315, 1.346, 1.378, 1.412, 1.446, 1.481, 1.517, 1.554, 1.592,
  1.631, 1.656, 1.695, 1.735, 1.775, 1.818, 1.861, 1.905, 1.949, 1.995, 2.041, 2.089, 2.139, 2.189, 2.24, 2.292,
  2.345, 2.399, 2.445, 2.506, 2.575, 2.646, 2.719, 2.794, 2.871, 2.951, 3.033, 3.118, 3.204, 3.293, 3.383, 3.476,
  3.57, 3.667, 3.768, 3.833, 3.867, 3.901, 3.935, 3.97, 4.005, 4.04, 4.076, 4.112, 4.148, 4.184, 4.22, 4.257, 4.294,
  4.331, 4.368, 4.405, 4.435, 4.467, 4.5, 4.533, 4.566, 4.6, 4.635, 4.669, 4.704, 4.739, 4.773, 4.808, 4.843, 4.879,
  4.915, 4.951, 4.988,
];

/** Frames 50 and 51 (band 3 channel 17, band 4 channel 1) are the blank dichroic channels. */
export const SPHEREX_BLANK_FRAMES = new Set([50, 51]);

export const SPHEREX_FRAMES: SpherexFrame[] = SPHEREX_WAVELENGTHS_UM.map((wavelengthUm, index) => ({
  index,
  wavelengthUm,
  band: Math.floor(index / 17) + 1,
  channel: (index % 17) + 1,
  blank: SPHEREX_BLANK_FRAMES.has(index),
}));

export const SPHEREX_PRESETS: { frame: number; label: string; hint: string }[] = [
  { frame: 0, label: '0.75 µm', hint: 'Shortest SPHEREx wavelength' },
  { frame: 22, label: '1.25 µm', hint: 'Close to the 2MASS J band' },
  { frame: 46, label: '2.19 µm', hint: 'Close to the 2MASS Ks band' },
  { frame: 62, label: '3.29 µm', hint: 'PAH emission and methane absorption' },
  { frame: 80, label: '4.26 µm', hint: 'CO₂ ice absorption band' },
  { frame: 90, label: '4.60 µm', hint: 'Close to the WISE W2 band' },
];

const SPHEREX_ACK =
  'This publication makes use of data products from the Spectro-Photometer for the History of the Universe, Epoch of Reionization and Ices Explorer (SPHEREx), which is a joint project of the Jet Propulsion Laboratory and the California Institute of Technology, and is funded by the National Aeronautics and Space Administration.';
const TWOMASS_ACK =
  'This publication makes use of data products from the Two Micron All Sky Survey, which is a joint project of the University of Massachusetts and the Infrared Processing and Analysis Center/California Institute of Technology, funded by the National Aeronautics and Space Administration and the National Science Foundation.';
const WISE_ACK =
  'This Progressive Survey distribution makes use of data products from the Wide-field Infrared Survey Explorer, which is a joint project of the University of California, Los Angeles, and the Jet Propulsion Laboratory/California Institute of Technology, and NEOWISE, which is a project of the Jet Propulsion Laboratory/California Institute of Technology. WISE and NEOWISE are funded by the National Aeronautics and Space Administration.';

const IRSA_HIPS = 'https://irsa.ipac.caltech.edu/data/hips';

export const SURVEYS: Record<SurveyId, Survey> = {
  spherex: {
    id: 'spherex',
    name: 'SPHEREx DR1 all-sky spectral cube',
    shortName: 'SPHEREx',
    mission: 'SPHEREx (NASA)',
    baseUrl: `${IRSA_HIPS}/SPHEREx/spherex_allsky_cube`,
    ext: 'png',
    maxOrder: 5,
    pixelScaleArcsec: 12.883,
    wavelength: '0.75–5.0 µm in 102 channels',
    epoch: '2025-04-24 → 2026-05-14',
    isCube: true,
    defaultFrame: 46,
    credits: [
      {
        label: 'SPHEREx',
        text: SPHEREX_ACK,
        url: 'https://irsa.ipac.caltech.edu/Missions/spherex.html',
        doi: '10.26131/IRSA679',
      },
      {
        label: 'SPHEREx HiPS',
        text: 'All-sky cube HiPS produced by the SPHEREx Science Data Center (© Caltech/IPAC).',
        url: `${IRSA_HIPS}/SPHEREx/spherex_allsky_cube/properties`,
      },
    ],
  },
  twomass: {
    id: 'twomass',
    name: '2MASS colour (J, H, Ks)',
    shortName: '2MASS',
    mission: '2MASS (NASA / NSF)',
    baseUrl: `${IRSA_HIPS}/CDS/2MASS/Color`,
    ext: 'jpg',
    maxOrder: 9,
    pixelScaleArcsec: 0.805,
    wavelength: '1.24 / 1.66 / 2.16 µm',
    epoch: '1997–2001',
    isCube: false,
    defaultFrame: 0,
    credits: [
      { label: '2MASS', text: TWOMASS_ACK, url: 'https://irsa.ipac.caltech.edu/Missions/2mass.html' },
      {
        label: '2MASS HiPS',
        text: 'HiPS built by CDS (CNRS/Unistra) from 2MASS images, served by IRSA.',
        url: `${IRSA_HIPS}/CDS/2MASS/Color/properties`,
      },
    ],
  },
  allwise: {
    id: 'allwise',
    name: 'AllWISE colour (W1, W2, W4)',
    shortName: 'AllWISE',
    mission: 'WISE / NEOWISE (NASA)',
    baseUrl: `${IRSA_HIPS}/CDS/AllWISE/RGB-W4-W2-W1`,
    ext: 'jpg',
    maxOrder: 8,
    pixelScaleArcsec: 1.61,
    wavelength: '3.4 / 4.6 / 22 µm',
    epoch: '2010–2011',
    isCube: false,
    defaultFrame: 0,
    credits: [
      { label: 'WISE / NEOWISE', text: WISE_ACK, url: 'https://irsa.ipac.caltech.edu/Missions/wise.html' },
      {
        label: 'AllWISE HiPS',
        text: 'HiPS built by CDS (CNRS/Unistra) from AllWISE Atlas images, served by IRSA.',
        url: `${IRSA_HIPS}/CDS/AllWISE/RGB-W4-W2-W1/properties`,
      },
    ],
  },
};

export const SURVEY_ORDER: SurveyId[] = ['spherex', 'twomass', 'allwise'];

export const PLATFORM_CREDITS: Credit[] = [
  {
    label: 'IRSA',
    text: 'All images are served by the NASA/IPAC Infrared Science Archive (IRSA), operated by Caltech/IPAC with NASA funding.',
    url: 'https://irsa.ipac.caltech.edu/',
  },
  {
    label: 'NASA Exoplanet Archive',
    text: 'This research has made use of the NASA Exoplanet Archive, which is operated by the California Institute of Technology, under contract with the National Aeronautics and Space Administration under the Exoplanet Exploration Program.',
    url: 'https://exoplanetarchive.ipac.caltech.edu/',
  },
  {
    label: 'NED',
    text: 'Object names are resolved with the NASA/IPAC Extragalactic Database (NED), operated by Caltech/IPAC with NASA funding.',
    url: 'https://ned.ipac.caltech.edu/',
  },
  {
    label: 'HEALPix',
    text: 'Sky tiling follows HEALPix (Górski et al. 2005, ApJ 622, 759) and the IVOA HiPS 1.0 standard.',
    url: 'https://healpix.jpl.nasa.gov/',
  },
];

export function isSurveyId(value: string | null | undefined): value is SurveyId {
  return value === 'spherex' || value === 'twomass' || value === 'allwise';
}

export function nearestUsableFrame(frame: number): number {
  const f = Math.max(0, Math.min(SPHEREX_FRAMES.length - 1, Math.round(frame)));
  if (!SPHEREX_BLANK_FRAMES.has(f)) return f;
  return f === 50 ? 49 : 52;
}
