/** Glossary: plain English for a 14-year-old, at most 30 words per entry (checked by a test). */

export interface GlossaryEntry {
  term: string;
  text: string;
  see?: string[];
}

export const GLOSSARY: readonly GlossaryEntry[] = [
  { term: 'arcsecond', text: 'A tiny angle on the sky. Split a degree into 3,600 slices and one slice is an arcsecond: about the width of a coin seen from four kilometres away.', see: ['proper motion'] },
  { term: 'arcminute', text: 'Sixty arcseconds. The full Moon is about thirty arcminutes across, and each SPHEREx field in this app is about six arcminutes wide.' },
  { term: 'proper motion', text: "How fast a star slides across the sky, in arcseconds per year. Close stars usually show the most, because the same speed looks bigger from nearby.", see: ['parallax'] },
  { term: 'parallax', text: 'The small yearly back-and-forth shift of a nearby star, caused by Earth circling the Sun. The closer the star, the bigger the wobble.', see: ['parsec'] },
  { term: 'parsec', text: 'The distance at which a star would show a parallax of exactly one arcsecond. Distance in parsecs equals one divided by the parallax in arcseconds.', see: ['light year'] },
  { term: 'light year', text: 'How far light travels in one year, nearly ten trillion kilometres. One parsec is about 3.26 light years.' },
  { term: 'tangential velocity', text: 'How fast a star really moves sideways across our view, in kilometres per second. You need both its proper motion and its distance to work it out.' },
  { term: 'brown dwarf', text: 'An object bigger than a planet but too small to burn hydrogen like a star. It glows faintly from leftover heat, mostly in infrared light.' },
  { term: 'infrared', text: 'Light with longer waves than red light, invisible to our eyes. Warm things, cool stars and dusty clouds shine brightly in it.' },
  { term: 'micron', text: 'One millionth of a metre. Infrared wavelengths are measured in microns; SPHEREx sees from about 0.75 to 5 microns.' },
  { term: 'wavelength', text: 'The distance between two wave crests of light. It sets the colour; each SPHEREx picture records one narrow range of wavelengths.' },
  { term: 'SPHEREx', text: 'A NASA space telescope launched in 2025 that maps the whole sky in infrared, at many wavelengths, every six months.' },
  { term: 'exposure', text: 'One single picture taken by the telescope. Each SPHEREx exposure lasts a couple of minutes and records one patch of sky.' },
  { term: 'stack', text: 'Several exposures of the same patch added together. Noise partly cancels out, so faint things show up better than in any single picture.' },
  { term: 'visit', text: 'A group of exposures taken within a few days. SPHEREx comes back to the same patch of sky about every six months.' },
  { term: 'epoch', text: 'The date a position or picture belongs to. Comparing two epochs shows what moved between them.' },
  { term: 'signal to noise', text: 'How strong a source is compared with the random flicker of the background. Below about five, you cannot be sure it is real.' },
  { term: 'saturation', text: 'When a star is so bright that the detector pixels overflow. The centre gets no usable value, so we measure from the fainter edges.' },
  { term: 'centroid', text: 'The centre of a blob of light, found by weighting each pixel by how bright it is. It can be more precise than one pixel.' },
  { term: 'pixel', text: 'One square of a digital image. In this app each grid pixel covers three arcseconds of sky.' },
  { term: 'blink comparator', text: 'A machine that flips quickly between two photographs of the same sky. Anything that moved seems to jump. Clyde Tombaugh found Pluto this way.' },
  { term: 'right ascension', text: "A star's east-west position on the sky, like longitude on Earth. It is measured eastward, in hours or degrees." },
  { term: 'declination', text: "A star's north-south position on the sky, like latitude on Earth: from plus ninety degrees at the north pole to minus ninety." },
  { term: 'magnitude', text: 'A brightness scale where smaller numbers mean brighter. A change of one magnitude is about two and a half times in brightness.' },
  { term: 'variable star', text: 'A star whose brightness changes over time, because it pulses, or because dust or a companion blocks some of its light.' },
  { term: 'light curve', text: 'A graph of brightness against time. Its shape tells you whether a star changes regularly, slowly or suddenly.' },
  { term: 'period', text: 'The time a regular variable star takes to go through one full cycle of brightening and fading.' },
  { term: 'error bar', text: 'The range a measurement could reasonably be off by. Two answers agree when their error bars overlap.' },
  { term: 'blend', text: 'Two objects so close together that their light merges into one blob, so the measured centre lands somewhere between them.' },
  { term: 'Gaia', text: 'A European space telescope that measured the positions, motions and distances of nearly two billion stars with extreme precision.' },
];
