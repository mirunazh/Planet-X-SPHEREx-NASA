/**
 * Mission scripts and every other user-facing string. Each script follows the same four steps
 * (Watch, Measure, Hunt, Report). Every number in a script comes from the mission manifest,
 * the parallax product (exp13) or a named constant, through `missionFacts`; the text never
 * types a data value by hand (a test checks this).
 */
import { offsetArcsec, positionAngleDeg } from '../grid.js';
import { group, moverTruth } from '../manifest.js';
import type { Manifest, MissionId, ParallaxProduct } from '../manifest.js';
import { KM_S_PER_AU_PER_YEAR, LY_PER_PC } from '../parallax.js';
import type { Tier, Reason, Source } from '../score.js';
import type { CentroidFlag } from '../centroid.js';

export type StepKind = 'watch' | 'measure' | 'hunt' | 'report';
export const STEP_ORDER: readonly StepKind[] = ['watch', 'measure', 'hunt', 'report'];
export const STEP_TITLE: Record<StepKind, string> = { watch: 'Watch', measure: 'Measure', hunt: 'Hunt', report: 'Report' };

export interface Step {
  kind: StepKind;
  id: string;
  instruction: string;
  hint: string;
  explain: string; // shown after the student answers
}

export interface MissionScript {
  id: MissionId;
  order: number; // 1 = the graded mission
  title: string;
  tagline: string;
  steps: Step[];
}

/** Mission order of priority. */
export const MISSION_ORDER: readonly MissionId[] = ['epsindb', 'barnard', 'wise0855', 'rwaur', 'rdra'];

export const PITCH = {
  title: 'Find the next Tombaugh',
  subtitle: "Planet X was once hunted by a young man with no degree, blinking two photographs. Here is the same method, with NASA's newest infrared sky.",
};

export const TIER_TEXT: Record<Tier, string> = {
  inside: 'Inside the error bar',
  close: 'Close',
  'try-again': 'Try again',
};

export const REASON_TEXT: Record<Reason, string> = {
  'inside-error-bar': 'Your number agrees with this value within the measurement uncertainty.',
  'within-percent': 'Your number is near this value but outside its error bar.',
  'value-off': 'Your number is far from this value. Check that you clicked the same object in both visits.',
  'direction-inside': 'The direction matches.',
  'direction-close': 'The direction is nearly right.',
  'direction-off': 'The direction is off. Did you click the visits in the right order, the earlier one first?',
  'no-answer': 'No number yet.',
};

export const SOURCE_TEXT: Record<Source, { label: string; about: string }> = {
  pipeline: { label: 'Our pipeline', about: "What the team's own software measured from these same SPHEREx images." },
  literature: { label: 'Published value', about: 'The catalogue value from other telescopes, mostly Gaia, measured over many years.' },
};

export const FLAG_TEXT: Record<CentroidFlag, string> = {
  'no-signal': 'Nothing bright enough here. Try clicking closer to the dot.',
  faint: 'Very faint here, so this position is uncertain.',
  edge: 'Too close to the edge of the picture to measure well.',
  'saturated-core': 'The centre of this star is blank because it is too bright. The position comes from the glow around it.',
  'mostly-nan': 'Most of this spot has no data. Try another visit.',
};

// ---------------------------------------------------------------- facts

type Facts = Record<string, string>;

const fx = (n: number, d: number) => n.toFixed(d);
const pct = (a: number, b: number) => fx(Math.abs((a / b - 1) * 100), 0);
const sig2 = (n: number) => String(Number(n.toPrecision(2))); // two significant figures

const COMPASS = ['north', 'north-east', 'east', 'south-east', 'south', 'south-west', 'west', 'north-west'];
const SCREEN = ['up', 'up and to the left', 'left', 'down and to the left', 'down', 'down and to the right', 'right', 'up and to the right'];
const octant = (paDeg: number) => Math.round(paDeg / 45) % 8;

/** Every formatted number (and data-derived word) a script may show, keyed by name. */
export function missionFacts(m: Manifest, p?: ParallaxProduct): Facts {
  const f: Facts = { name: m.name, scale: fx(m.grid.scaleArcsec, 0) };
  const t = moverTruth(m);
  if (t) {
    const g = group(m, t.group);
    const a = g.passes.find((q) => q.index === t.fromPass)!;
    const b = g.passes.find((q) => q.index === t.toPass)!;
    const pa = positionAngleDeg(t.motionArcsec.east, t.motionArcsec.north);
    Object.assign(f, {
      nPasses: String(g.passes.length),
      first: a.label,
      last: b.label,
      years: fx(t.baselineYears, 1),
      moved: fx(t.motionArcsec.total, 1),
      movedPx: fx(t.motionArcsec.total / m.grid.scaleArcsec, 1),
      rate: fx(t.rateArcsecPerYear, 2),
      predictedRate: fx(t.predictedRateArcsecPerYear, 2),
      litRate: fx(t.literature.pmArcsecPerYear, 2),
      pctLow: pct(t.rateArcsecPerYear, t.literature.pmArcsecPerYear),
      dir: COMPASS[octant(pa)]!,
      screen: SCREEN[octant(pa)]!,
      litPlx: fx(t.literature.parallaxMas, 0),
      litPlxArcsec: fx(t.literature.parallaxMas / 1000, 2),
      litDist: fx(t.literature.distancePc, 2),
      litLy: fx(t.literature.distanceLy, 1),
      litSpeed: fx(t.literature.tangentialVelocityKmS, 1),
      errMax: fx(Math.max(...g.passes.flatMap((q) => (q.measured ? [q.measured.errArcsec] : []))), 1),
      wlLo: fx(Math.min(...g.passes.map((q) => q.wavelengthUmMin)), 1),
      wlHi: fx(Math.max(...g.passes.map((q) => q.wavelengthUmMax)), 1),
    });
  }
  if (m.id === 'epsindb' && p) {
    const c = p.best_fit_pm_fixed;
    const free = p.best_fit;
    Object.assign(f, {
      kms: fx(KM_S_PER_AU_PER_YEAR, 2),
      gaiaRate: fx(Math.hypot(p.literature.muE, p.literature.muN), 2),
      nDots: String(p.pass_means.length),
      nExp: String(p.exposures.length),
      plx: fx(c.plx * 1000, 0),
      plxErr: fx(c.plx_err * 1000, 0),
      plxArcsec: fx(c.plx, 2),
      dist: fx(c.distance_pc, 2),
      distErr: fx(c.distance_err_pc, 2),
      ly: fx(c.distance_pc * LY_PER_PC, 1),
      speed: fx(c.vtan_kms, 1),
      speedErr: fx(c.vtan_err_kms, 1),
      distPct: pct(c.distance_pc, moverTruth(m)!.literature.distancePc),
      distSigma: fx(Math.abs(c.distance_pc - moverTruth(m)!.literature.distancePc) / c.distance_err_pc, 1),
      freePlx: fx(free.plx * 1000, 0),
      freePlxErr: fx(free.plx_err * 1000, 0),
    });
  }
  if (m.id === 'wise0855' && m.challengeInput && t) {
    const g = group(m, t.group);
    const now = g.passes.find((q) => q.index === t.fromPass)!.measured!;
    const ast = m.astrometry;
    const off = offsetArcsec({ ra: ast.ra, dec: ast.dec }, m.challengeInput);
    const blend = m.groups.flatMap((q) => q.passes).find((q) => q.blendedWith)?.blendedWith;
    const d2 = m.groups.find((q) => q.id !== t.group)!;
    Object.assign(f, {
      challengeYear: fx(2000 + off.east / (ast.pmRaCosDecMasYr / 1000), 0),
      challengeArcmin: fx(offsetArcsec(m.challengeInput, now).total / 60, 0),
      neighbour: blend?.name ?? 'a static star',
      predictedMoved: fx(t.predictedMotionArcsec.total, 1),
      shortLo: fx(Math.min(...d2.passes.map((q) => q.wavelengthUmMin)), 1),
      shortHi: fx(Math.max(...d2.passes.map((q) => q.wavelengthUmMax)), 1),
    });
  }
  const mw = m.series?.matchedWavelength;
  if (mw) {
    const g = m.groups[0]!;
    const r = mw.ratios[0]!;
    const lit = m.truth as { literature: { distancePc: number } };
    const label = (i: number) => g.passes.find((q) => q.index === i)!.label;
    Object.assign(f, {
      pass0: label(r.versusPass),
      pass1: label(r.pass),
      ratio: fx(r.ratio, 2),
      ratioErr: fx(r.err, 2),
      dmag: fx(Math.abs(r.deltaMag), 2),
      ctrl: fx(r.controlRatio, 2),
      ctrlErr: fx(r.controlErr, 2),
      nBins: String(r.nBins),
      binWidth: fx(mw.binsUm[0]![1] - mw.binsUm[0]![0], 2),
      litLy: sig2(lit.literature.distancePc * LY_PER_PC),
    });
  }
  const lc = m.series?.lightCurve;
  if (lc) {
    const lit = (m.truth as { literature: { periodDays: number; distancePc: number } }).literature;
    Object.assign(f, {
      nPoints: String(lc.points.length),
      nGroups: String(m.groups[0]!.passes.length),
      rms: fx(lc.rmsMag, 2),
      withinDay: fx(lc.withinDayRmsMag, 2),
      litPeriod: fx(lit.periodDays, 0),
      bestPeriod: fx(lc.bestPeriodDays, 0),
      litLy: sig2(lit.distancePc * LY_PER_PC),
    });
  }
  return f;
}

// ---------------------------------------------------------------- scripts

const S = (kind: StepKind, id: string, instruction: string, hint: string, explain: string): Step => ({ kind, id, instruction, hint, explain });

const REPORT = (what: string): Step =>
  S('report', 'report',
    `Make your report: ${what}, the visits you used and the true values go into one link you can share.`,
    'The link holds numbers only. There is no name and no account, so nobody can tell who made it.',
    'Anyone who opens the link sees your measurement next to the real one, and can try to beat it.');

const SCRIPTS: Record<MissionId, (f: Facts) => Omit<MissionScript, 'id' | 'order'>> = {
  epsindb: (f) => ({
    title: f.name!,
    tagline: 'Measure how fast a nearby brown dwarf moves, then how far away it is, then how fast it really goes.',
    steps: [
      S('watch', 'watch',
        `Blink through the ${f.nPasses} SPHEREx visits, from ${f.first} to ${f.last}. One dot near the middle shifts while the stars around it stay put.`,
        `Step slowly and watch the centre: the mover drifts ${f.screen}.`,
        `That dot is ${f.name}, a pair of brown dwarfs. It moved ${f.moved} arcseconds in ${f.years} years, about ${f.movedPx} grid pixels of ${f.scale} arcseconds each. Stars much farther away hardly move at all.`),
      S('measure', 'motion',
        `Click on ${f.name} in the first visit (${f.first}), then in the last one (${f.last}). The app snaps each click to the centre of the light and works out the speed across the sky.`,
        'Your job is to pick the right dot, not the exact pixel: the app finds the centre for you.',
        `Our pipeline measured ${f.rate} arcseconds per year toward the ${f.dir}. Gaia gives ${f.litRate}. The gap is real and expected: Earth's yearly wobble is mixed into two visits that are not a whole number of years apart. With the wobble included, the prediction is ${f.predictedRate}.`),
      S('measure', 'distance',
        `Now remove the steady motion, using Gaia's ${f.gaiaRate} arcseconds per year. What is left is a small wobble, back and forth once a year, caused by Earth going around the Sun. Drag the slider until the curve runs through the ${f.nDots} dots.`,
        'Watch the fit meter: it is lowest when the curve passes through the middle of the dots, not when it touches just one.',
        `The best fit is a wobble of ${f.plx} milliarcseconds, plus or minus ${f.plxErr} (that is ${f.plxArcsec} arcseconds). Distance in parsecs is one divided by that: ${f.dist} plus or minus ${f.distErr} parsecs, about ${f.ly} light years. Gaia measured ${f.litPlx} milliarcseconds, or ${f.litDist} parsecs. We land ${f.distPct} percent short, ${f.distSigma} times our error bar: close, not perfect. Without Gaia's motion, SPHEREx alone gives ${f.freePlx} plus or minus ${f.freePlxErr}.`),
      S('measure', 'speed',
        `Put the two together. Speed across the sky in kilometres per second = ${f.kms} x motion (arcseconds per year) x distance (parsecs).`,
        `${f.kms} turns "one astronomical unit per year" into kilometres per second.`,
        `${f.gaiaRate} x ${f.dist} x ${f.kms} gives ${f.speed} plus or minus ${f.speedErr} kilometres per second. With Gaia's distance the same sum gives ${f.litSpeed}. You measured this from ${f.nExp} infrared pictures.`),
      S('hunt', 'hunt',
        'Blink the visits again and look across the whole field. Does anything else move?',
        'A real mover shifts steadily in one direction from visit to visit. Something that jumps around randomly is noise.',
        'We did not find another mover here. If you think you see one, click it in two visits: it goes into your report for others to check.'),
      REPORT('your speed across the sky, distance and real speed'),
    ],
  }),
  barnard: (f) => ({
    title: f.name!,
    tagline: 'The fastest star in the sky, so bright that its centre is blank.',
    steps: [
      S('watch', 'watch',
        `Blink through the ${f.nPasses} visits from ${f.first} to ${f.last}. Find the big bright star near the centre and watch it creep ${f.screen}.`,
        'Look for the star with a hole in the middle: that is it.',
        `${f.name} moved ${f.moved} arcseconds in ${f.years} years. Its centre is blank because it is so bright that the detector pixels overflowed. That is called saturation, and those pixels have no usable value.`),
      S('measure', 'motion',
        `Click the star in the first visit (${f.first}) and in the last (${f.last}). Click on the ring of light around the blank centre; the app measures the middle of the ring.`,
        'Do not chase the hole. Click anywhere on the bright ring and let the app find its centre.',
        `Our pipeline measured ${f.rate} arcseconds per year toward the ${f.dir}. The published value is ${f.litRate}, so ours reads ${f.pctLow} percent low. The glow around a saturated star is lopsided and shifts a little between visits, so each position is only good to about ${f.errMax} arcseconds. Its distance cannot be measured here: only ${f.nPasses} visits, and a yearly wobble of only ${f.litPlxArcsec} arcseconds each way, no bigger than that uncertainty. The published distance is ${f.litDist} parsecs (${f.litLy} light years).`),
      S('hunt', 'control',
        'Find a fainter star in the field and click it in the first and last visit, the same way. It should not move.',
        'Pick a small, round, clearly separate dot.',
        `A star that stays put proves the pictures line up, so the ${f.moved} arcsecond shift of ${f.name} is the star moving, not the camera.`),
      REPORT('your speed across the sky and its direction'),
    ],
  }),
  wise0855: (f) => ({
    title: f.name!,
    tagline: "The challenge's own target: a cold brown dwarf that is no longer where the coordinates say.",
    steps: [
      S('watch', 'find',
        `Type in the challenge's coordinates for ${f.name}. A marker appears where it was around ${f.challengeYear}. Is anything there now?`,
        `Nothing is there any more. In the years since, it has travelled about ${f.challengeArcmin} arcminutes ${f.dir}: look ${f.screen} of the marker.`,
        `${f.name} is the coldest brown dwarf known. It glows mostly at long infrared wavelengths, so SPHEREx sees it in the ${f.wlLo} to ${f.wlHi} micron detectors. Blink the ${f.nPasses} visits from ${f.first} to ${f.last} and it creeps ${f.screen}.`),
      S('measure', 'motion',
        `Click ${f.name} in the first visit (${f.first}) and in the last (${f.last}).`,
        'It is faint: zoom in and use the visit markers.',
        `Our pipeline measured ${f.rate} arcseconds per year toward the ${f.dir}. The published value is ${f.litRate}, so ours reads ${f.pctLow} percent low. Why? An ordinary star, ${f.neighbour}, sits a few arcseconds away and blends with it. Its light pulls the measured centre toward a point that does not move, so the motion looks smaller. The prediction for this time span is ${f.predictedMoved} arcseconds; we measured ${f.moved}. A yearly wobble cannot be measured here either: the positions are too uncertain.`),
      S('hunt', 'impostor',
        `Switch to the short-wavelength pictures (${f.shortLo} to ${f.shortHi} microns). There is a dot right next to where ${f.name} should be. Is it the brown dwarf?`,
        'Blink the visits. Does that dot move like the brown dwarf did?',
        `No. That dot stays put: it is ${f.neighbour}, an ordinary star. ${f.name} is too cold to show at these wavelengths. Checking for impostors like this is how real searches avoid false discoveries.`),
      REPORT('your speed across the sky and its direction'),
    ],
  }),
  rwaur: (f) => ({
    title: f.name!,
    tagline: 'A young star hidden by moving dust: measure brightness instead of position.',
    steps: [
      S('watch', 'watch',
        `Blink the visits. ${f.name} stays in place, but look at how bright it is in ${f.pass0} compared with ${f.pass1}.`,
        'Compare it with the stars around it, not with the background.',
        'Each SPHEREx picture records a different wavelength, and a star can look brighter at one wavelength than another. So we only ever compare pictures taken at the same wavelength.'),
      S('measure', 'ratio',
        `Compare ${f.name} in ${f.pass1} with ${f.pass0}, one wavelength slice of ${f.binWidth} microns at a time, against a control star that should not change.`,
        'If the control star changes too, the camera or the method is fooling you.',
        `Across ${f.nBins} wavelength slices, ${f.name} was ${f.ratio} times as bright (plus or minus ${f.ratioErr}), ${f.dmag} magnitudes brighter. The control star gives ${f.ctrl} plus or minus ${f.ctrlErr}, just what you expect if nothing changed. The brightening is the star, not the camera. Dust around this young star, about ${f.litLy} light years away, clears and returns.`),
      S('hunt', 'control',
        'Find the control star yourself: a bright, separate star in the field. Check that it looks the same in every visit.',
        'Pick a star about as bright as the target, away from the frame edge.',
        'Astronomers always measure a variable star against steady stars. It is the easiest way to catch mistakes.'),
      REPORT('your brightness ratio'),
    ],
  }),
  rdra: (f) => ({
    title: f.name!,
    tagline: 'A giant star that swells and fades. Not demonstrated yet: what would you need?',
    steps: [
      S('watch', 'watch',
        `Blink the ${f.nGroups} visits. ${f.name} is a huge red giant that pulses, so bright that its centre is blank.`,
        'The ring of light around the blank centre is what gets measured.',
        `It is so far past saturation that only the outer glow can be measured. That works, but it is noisy. It is about ${f.litLy} light years away.`),
      S('measure', 'curve',
        `Look at the light curve: ${f.nPoints} measurements in ${f.nGroups} groups of dates. Can you see a regular cycle?`,
        'Compare the spread inside one group of dates with the difference between groups.',
        `Measurements taken on the same day already scatter by ${f.withinDay} magnitudes, almost as much as the whole spread of ${f.rms}. Books give a cycle of ${f.litPeriod} days; our best guess is ${f.bestPeriod} days, but ${f.nGroups} groups of dates cannot pin down a period. Honest answer: not demonstrated yet.`),
      S('hunt', 'plan',
        `Plan the observations that would settle it. How many visits would you need, and how far apart, to catch a cycle of ${f.litPeriod} days?`,
        'A cycle is only visible if your visits land at several different points of it.',
        'You would need visits spread over at least one full cycle, several per cycle, each with less noise than the change you want to see. SPHEREx keeps observing, so later data may get there.'),
      REPORT('your answer'),
    ],
  }),
};

export function missionScript(m: Manifest, p?: ParallaxProduct): MissionScript {
  const facts = missionFacts(m, p);
  return { id: m.id, order: MISSION_ORDER.indexOf(m.id) + 1, ...SCRIPTS[m.id](facts) };
}
