/**
 * Words for the "What you're seeing" panel and its guided tour, one entry per screen.
 *
 * Writing rules (checked by tests/help.test.ts):
 * - plain words, sentences under 25 words, paragraphs of at most 3 sentences;
 * - only conservative, standard facts, and never a claim of discovery;
 * - sources only from URLs that the repository already cites.
 */
import type { GlossaryEntry, HelpScreen, HelpScreenId, HelpSource } from './types';

export type { GlossaryEntry, HelpScreen, HelpScreenId, HelpSource, HelpStep } from './types';

const SOURCE = {
  spherexMission: { label: 'SPHEREx mission (NASA/IPAC IRSA)', url: 'https://irsa.ipac.caltech.edu/Missions/spherex.html' },
  spherexMap: {
    label: 'SPHEREx’s first all-sky map (NASA/JPL)',
    url: 'https://www.jpl.nasa.gov/images/pia26600-spherexs-first-all-sky-map/',
  },
  spherexTiles: {
    label: 'The map tiles: SPHEREx all-sky cube (IRSA)',
    url: 'https://irsa.ipac.caltech.edu/data/hips/SPHEREx/spherex_allsky_cube/properties',
  },
  spherexAccess: {
    label: 'How SPHEREx photos are archived (IRSA)',
    url: 'https://irsa.ipac.caltech.edu/spherex-archive-documentation/spherex-data-access/',
  },
  spherexCutouts: {
    label: 'Cutting out SPHEREx photos (IRSA tutorial)',
    url: 'https://caltech-ipac.github.io/irsa-tutorials/spherex-cutouts/',
  },
  spherexReleases: {
    label: 'SPHEREx data releases (IRSA)',
    url: 'https://irsa.ipac.caltech.edu/spherex-archive-documentation/spherex-data-releases/',
  },
  ned: { label: 'NASA/IPAC Extragalactic Database (NED)', url: 'https://ned.ipac.caltech.edu/' },
} satisfies Record<string, HelpSource>;

/** Screens in the order a visitor meets them. */
export const HELP_SCREEN_IDS: readonly HelpScreenId[] = ['intro', 'navigator', 'compare', 'challenge'];

export const HELP: Record<HelpScreenId, HelpScreen> = {
  navigator: {
    id: 'navigator',
    title: 'The infrared sky map',
    science: {
      paragraphs: [
        'Imagine standing at the center of a giant ball with the whole sky painted on the inside. This map is stitched together from photos taken by NASA’s SPHEREx space telescope from April 2025 to May 2026. It shows directions, not distances, so a nearby star and a far-off galaxy can sit side by side.',
        'The bright band across the sky is the Milky Way, our home galaxy, seen from inside its flat disk. Its center is about 26,000 light-years away, toward the constellation Sagittarius. Dust hides the center from our eyes, but infrared light, which we cannot see, gets through dust better than visible light.',
        'SPHEREx launched in March 2025 and maps the whole sky every six months, in 102 infrared colors. The SPHEREx map shows one color at a time, in black and white, and you can pick which. Named markers help you visit galaxies, stars and deep fields.',
      ],
      sources: [SOURCE.spherexMission, SOURCE.spherexMap, SOURCE.spherexTiles],
    },
    steps: [
      {
        tour: 'sky',
        title: 'Move the sky',
        text: 'Drag to look around. Scroll, or pinch with two fingers, to zoom in and out.',
      },
      {
        tour: 'next-step',
        title: 'Visit a place',
        text: 'This card always shows your next step. Start by choosing a place, like the Andromeda galaxy, and we fly you there.',
      },
      {
        tour: 'dock-telescope',
        title: 'Change how it is seen',
        text: 'Pick another SPHEREx infrared color. Each wavelength shows different details in the same region.',
      },
    ],
  },

  intro: {
    id: 'intro',
    title: 'The sky through SPHEREx',
    science: {
      paragraphs: [
        'SPHEREx maps the sky in infrared light. Stars, dust and galaxies appear in its all-sky map.',
        'The opening image is a projection of the SPHEREx DR1 map around the south ecliptic pole. It shows the 2.19 micrometre channel.',
        'Enter the navigator to explore the sky, change SPHEREx wavelengths and inspect individual observations of a chosen region.',
      ],
      sources: [SOURCE.spherexMission, SOURCE.spherexTiles],
    },
    steps: [
      { tour: 'intro-sky', title: 'An infrared view', text: 'This image comes from the SPHEREx all-sky map.' },
      { tour: 'intro-cta', title: 'Explore the sky', text: 'Open the navigator to choose a region and view its SPHEREx observations.' },
    ],
  },

  compare: {
    id: 'compare',
    title: 'Photos of one square of sky',
    science: {
      paragraphs: [
        'Each frame is one SPHEREx exposure, a single photo taken on the date shown. The photos are lined up so that north is up and east is to the left.',
        'SPHEREx has six detectors, light-sensing chips that each see a different range of infrared colors. Within one detector the color also changes across the chip, so each photo sees a spot at its own color. The caption under the photo names the detector, from D1 to D6.',
        'The contrast of each photo is adjusted on its own, so faint details show up. That means a change in brightness between frames is not evidence that something changed in the sky.',
        'Flipping quickly between two aligned photos is called blinking, and it is how moving things are spotted. Something that moved, like an asteroid, seems to jump while the stars stay put. Here, color and contrast also change between photos, so most differences are not real changes.',
      ],
      sources: [SOURCE.spherexMission, SOURCE.spherexAccess, SOURCE.spherexCutouts],
    },
    steps: [
      {
        tour: 'compare-filters',
        title: 'Filters',
        text: 'Narrow the list by detector, wavelength, date or type of photo. Press Apply filters to search again.',
      },
      {
        tour: 'compare-viewer',
        title: 'The photo',
        text: 'The current SPHEREx photo of your square. Its date and detector are shown below it.',
      },
      {
        tour: 'compare-controls',
        title: 'Flip through',
        text: 'Use Previous and Next, or press Play to flip through the photos in date order. Arrow keys work too, once you click the photo.',
      },
      {
        tour: 'compare-list',
        title: 'All photos',
        text: 'This list holds every photo found for this square. Press View image to show one above, or Original FITS to get the full science file.',
      },
    ],
  },

  challenge: {
    id: 'challenge',
    title: 'The weekly sky challenge',
    science: {
      paragraphs: [
        'Each week this page returns to the same small square of sky, around the galaxy M101. Comparing photos of one place, taken on different dates, is how astronomers notice things that move or change. The photos are prepared ahead of time, so they open quickly.',
        '“Newly found this week” counts image files that this app saw in NASA’s archive for the first time this week. This is not a count of new observations: a file can be new to the app but taken months earlier. A week can end at zero, because a new release may hold no photos of this square.',
        'M101, also called the Pinwheel Galaxy, is a spiral galaxy about 21 million light-years away. So the galaxy’s light in these photos left it about 21 million years ago.',
      ],
      sources: [SOURCE.spherexReleases, SOURCE.spherexAccess, SOURCE.ned],
    },
    steps: [
      {
        tour: 'challenge-status',
        title: 'This week',
        text: 'Shows how many photos are ready, when the archive was last checked, and what is new this week.',
      },
      {
        tour: 'challenge-viewer',
        title: 'Prepared photos',
        text: 'Photos of the same square, prepared in advance and shown in date order. Press Play to flip through them.',
      },
      {
        tour: 'challenge-browse',
        title: 'Browse all',
        text: 'Open the full list of SPHEREx photos of this square, with filters, on the comparison page.',
      },
    ],
  },
};

/** Words used on more than one screen, explained once. */
export const GLOSSARY: GlossaryEntry[] = [
  {
    term: 'Infrared',
    definition: 'Light with longer wavelengths than red light. Our eyes cannot see it, and it gets through dust better than visible light.',
  },
  {
    term: 'Wavelength',
    definition: 'The distance from one crest of a light wave to the next. It sets the color of light. SPHEREx sees wavelengths from 0.75 to 5 micrometres, or thousandths of a millimetre.',
  },
  {
    term: 'Light-year',
    definition: 'The distance light travels in one year, about 9.5 trillion kilometres. It measures distance, not time.',
  },
  {
    term: 'Galaxy',
    definition: 'A huge group of stars, gas and dust held together by gravity. Andromeda is a galaxy, and the Milky Way is ours.',
  },
  {
    term: 'Milky Way',
    definition: 'Our home galaxy, a flat disk of stars, gas and dust. We live inside the disk, so we see it as a bright band across the sky.',
  },
  {
    term: 'Telescope survey',
    definition: 'A project that photographs large areas of the sky the same way, so the photos join into one map. SPHEREx observes the sky in infrared light.',
  },
  {
    term: 'Exoplanet',
    definition: 'A planet that travels around a star other than the Sun.',
  },
  {
    term: 'Field of view',
    definition: 'How much of the sky fits on your screen, measured as an angle in degrees. Zooming in makes it smaller.',
  },
  {
    term: 'Arcsecond',
    definition: 'A tiny angle on the sky. One degree holds 3,600 arcseconds, and each SPHEREx map pixel is about 13 arcseconds wide.',
  },
  {
    term: 'RA and Dec',
    definition: 'Right ascension (RA) and declination (Dec) are like longitude and latitude, but for the sky. Together they point to one exact spot on the sky.',
  },
];
