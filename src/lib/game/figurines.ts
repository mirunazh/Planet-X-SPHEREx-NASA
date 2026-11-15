/**
 * Figurines: the six collectible tools of the simple navigator. Each one opens a
 * panel. The main path (Places, Telescope, What you're seeing, Compare photos) is always
 * open; only the Field guide and the Weekly challenge are earned by playing.
 * Locks are only a light game layer: unlockAll() opens everything at once.
 */
export type FigurineId = 'places' | 'telescope' | 'explain' | 'guide' | 'compare' | 'challenge';

export interface Figurine {
  label: string;
  /** One plain line describing what the figurine does. */
  tip: string;
  /** How to find it while it is locked. */
  unlockHint: string;
  /** All figurines share one look; the emoji is the only thing that tells them apart. */
  emoji: string;
  alwaysUnlocked: boolean;
}

export const FIGURINE_ORDER: FigurineId[] = ['places', 'telescope', 'explain', 'guide', 'compare', 'challenge'];

export const FIGURINES: Record<FigurineId, Figurine> = {
  places: {
    label: 'Places',
    tip: 'Fly to galaxies, stars and deep fields picked for you',
    unlockHint: 'Always available',
    emoji: '🧭',
    alwaysUnlocked: true,
  },
  telescope: {
    label: 'Telescope',
    tip: 'See the same sky through other NASA telescopes and infrared colors',
    unlockHint: 'Always available',
    emoji: '🔭',
    alwaysUnlocked: true,
  },
  explain: {
    label: "What you're seeing",
    tip: 'Find out what the colors and dots on the sky mean',
    unlockHint: 'Always available',
    emoji: '👁️',
    alwaysUnlocked: true,
  },
  guide: {
    label: 'Field guide',
    tip: 'Keep track of the places you visit and the telescopes you used',
    unlockHint: 'Try another telescope or color',
    emoji: '📖',
    alwaysUnlocked: false,
  },
  compare: {
    label: 'Compare photos',
    tip: 'Pick a small square of sky and flip through every SPHEREx photo of it, date by date',
    unlockHint: 'Always available',
    emoji: '🎞️',
    alwaysUnlocked: true,
  },
  challenge: {
    label: 'Weekly challenge',
    tip: 'Look closer at one patch of sky, rechecked against NASA’s archive every week',
    unlockHint: 'Finish 3 sky quests',
    emoji: '🏆',
    alwaysUnlocked: false,
  },
};

export type Rank = 'Stargazer' | 'Observer' | 'Explorer';

/** Passport rank from the number of figurines found (0–2, 3–4, 5–6). */
export function rankFor(found: number): Rank {
  if (found <= 2) return 'Stargazer';
  if (found <= 4) return 'Observer';
  return 'Explorer';
}
