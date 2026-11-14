// Every user-facing string lives here so a translation can be dropped in later.
// No em dashes (house rule): commas, colons or parentheses instead.
// Voice: a curious 14 to 20 year old. Plain words first, the technical term second, in brackets.

import type { Compass } from './sky';

/** The product name: the team has not chosen one yet, so it lives in this one constant. */
const APP_NAME = 'SPHEREx Time Viewer';
const PITCH = 'Find the next Tombaugh.';

export const S = {
  appName: APP_NAME,
  pageTitle: `${APP_NAME}: ${PITCH.slice(0, 1).toLowerCase()}${PITCH.slice(1, -1)}`,
  pageDescription: 'Watch real NASA infrared images of one patch of sky change over time, then spot what moved.',
  pitch: PITCH,
  pitchBody:
    'Clyde Tombaugh was 24 when he found Pluto in 1930 by flicking between two photos of the sky, and you can do the same with real infrared images from NASA’s SPHEREx telescope.',
  home: 'Home',

  coordLabel: 'Where to look: sky coordinates (RA and Dec)',
  coordPlaceholder: '08h55m10.831s -07d14m42.53s',
  coordHelp: 'Degrees, like 133.795129 -7.245147, or hours, minutes and seconds, like 08 55 10.831 -07 14 42.53.',
  coordSubmit: 'Look here',
  tryChallenge: (c: string) => `Try the challenge position (${c})`,
  tryChallengeShort: 'Try the challenge position',
  coordEmpty: 'Type a position first.',
  coordUnreadable: 'That does not look like coordinates. Try 133.795129 -7.245147 or 08h55m10.831s -07d14m42.53s.',
  coordRaRange: 'Right ascension must be 0 to 360 degrees (or 0 to 24 hours, minutes and seconds under 60).',
  coordDecRange: 'Declination must be between -90 and +90 degrees (minutes and seconds under 60).',
  searching: 'Checking the catalogue of fast-moving stars...',
  loadFailed: 'Could not load the data:',

  targetsHeading: 'Or start with a real target',
  targetsIntro: 'Five patches of sky that SPHEREx photographed again and again. Hover or focus a card to blink its first and last visit.',
  kindMover: 'Moves',
  kindVariable: 'Changes brightness',
  passesCount: (n: number) => `${n} visits`,
  openTarget: (name: string) => `Watch ${name}`,

  movedTitle: (name: string) => `It moved: ${name} was here, but not any more`,
  movedBody: (year: string, sepArcsec: number, dir: string) =>
    `It passed this position around ${year}. Today it is ${sepArcsec.toFixed(0)} arcseconds${
      sepArcsec >= 60 ? ` (${(sepArcsec / 60).toFixed(1)} arcminutes)` : ''
    } to the ${dir}.`,
  hereTitle: (name: string) => `Known object here: ${name}`,
  hereBody: (name: string, sep: string) => `${name} is ${sep} arcseconds from the position you typed.`,
  jumpToIt: 'Jump to it',
  openMission: 'Open its SPHEREx images',
  otherMovers: (n: number) => `${n} more known object${n === 1 ? '' : 's'} crossed this spot.`,

  placeholderTitle: 'No ready-made images for this spot yet',
  placeholderBody:
    'Loading SPHEREx images for any coordinate, live from the NASA archive, is the next step of this project. For now the viewer has real images for the five targets below.',
  placeholderPosition: 'You asked for',

  backHome: 'All targets',
  modeLabel: 'Show',
  modeStack: 'One per visit',
  modeExp: 'Every photo',
  modeStackHint: 'Each visit stacks all its photos (exposures) into one cleaner image.',
  modeExpHint: 'Each photo (exposure) sees a slightly different infrared colour, so brightness flickers from frame to frame.',
  groupLabel: 'Camera (detector)',
  play: 'Play',
  pause: 'Pause',
  stepBack: 'Previous frame',
  stepForward: 'Next frame',
  loop: 'Loop',
  speed: 'Speed (frames per second)',
  speedValue: (fps: number) => `${fps}`,
  playbackLabel: 'Playback',
  timeAxis: 'Time',
  timeAxisValue: (date: string, i: number, n: number) => `${date}, frame ${i} of ${n}`,
  frameOf: (i: number, n: number) => `Frame ${i} of ${n}`,
  zoomIn: 'Zoom in',
  zoomOut: 'Zoom out',
  zoomReset: 'Fit',
  zoomValue: (z: number) => `${z.toFixed(1)}x`,
  loadingFrames: (done: number, total: number) => `Loading frames ${done} of ${total}`,
  keyboardHint: 'Space plays or pauses, arrow keys step, drag to pan, scroll to zoom.',

  overlaysLabel: 'On the image',
  overlayPredicted: 'Where it should be (predicted)',
  overlayMeasured: 'Where we found it (measured)',
  overlayNeighbour: 'A nearby ordinary star: the blob there is that star, not the target',
  overlayInput: 'Your position (typed)',
  overlayInputChallenge: 'The challenge position',
  noData: 'Dark red pixels: no data, or too bright to record',

  readoutDate: 'When',
  readoutWavelength: 'Infrared colour (wavelength)',
  readoutExposures: 'Photos (exposures)',
  readoutGroup: 'Camera (detector)',
  readoutDetection: 'Target',
  detected: (snr: string) => `Seen: its signal is ${snr} times the noise (S/N).`,
  notDetected: 'Not seen in this frame.',
  fromPassStack: (label: string) => `Position and markers come from the ${label} stack.`,
  blended: (name: string) => `It overlaps a nearby ordinary star (${name}).`,
  saturated: 'Too bright to measure its brightness: the centre is blank, so the position comes from the glow around it.',
  wavelengthRange: (a: number, b: number) => `${a.toFixed(3)} to ${b.toFixed(3)} micron`,
  dateRange: (a: string, b: string) => (a === b ? a : `${a} to ${b}`),

  notesHeading: 'Technical notes',
  provenanceHeading: 'Source files for this frame',
  releasesHeading: 'Data releases',
  provenanceRelease: (rel: string, doi: string) => `${rel}, DOI ${doi}`,
  caveatsHeading: 'Notes from the data pipeline',

  compassNorth: 'N',
  compassEast: 'E',
  scaleBar: (arcsec: number) => `${arcsec}"`,

  footerNoEndorse: 'NASA does not endorse this project.',
  footerData:
    'Images: SPHEREx Level 2 spectral images (NASA/JPL-Caltech), from the NASA/IPAC Infrared Science Archive (IRSA).',
  footerMovers: 'Fast-moving star catalogue: SIMBAD, CDS, Strasbourg.',
  footerChallenge: 'Built for the 2026 NASA Space Apps Challenge, "Planet X and SPHEREx".',
} as const;

export type StringKey = { [K in keyof typeof S]: (typeof S)[K] extends string ? K : never }[keyof typeof S];

/** Drops the pipeline's internal references ("note 08", field names) from a manifest caveat. */
export function plainNote(text: string): string {
  return text
    .replace(/\s*\((?:pass field \w+|notes? \d+(?: and \d+)?)\)/g, '')
    .replace(/,\s*notes? \d+(?: and \d+)?(?=\))/g, '')
    .replace(/,?\s*as in notes? \d+(?: and \d+)?/g, '');
}

export const COMPASS_WORDS: Record<Compass, string> = {
  N: 'north',
  NE: 'north-east',
  E: 'east',
  SE: 'south-east',
  S: 'south',
  SW: 'south-west',
  W: 'west',
  NW: 'north-west',
};
