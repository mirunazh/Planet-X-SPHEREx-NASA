import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { Pin } from '@/lib/store';
import type { SurveyId } from '@/lib/sky/surveys';
import { FIGURINES, FIGURINE_ORDER, rankFor } from '@/lib/game/figurines';
import { QUESTS, QUEST_ORDER } from '@/lib/game/quests';
import {
  GAME_STORAGE_KEY,
  type GameEvent,
  type GameProgress,
  applyEvent,
  initialProgress,
  isUnlocked,
  mergeProgress,
  sanitizeSaved,
  unlockAllProgress,
  useGame,
} from '@/lib/game/store';
import {
  buildPinIndex,
  distanceLabel,
  fieldGuideEntries,
  formatLightYears,
  newestFirst,
  placeTypeLabel,
  planetHostFor,
  planetLabel,
  resolvePin,
  sourceHref,
  withPlanetData,
} from '@/lib/game/fieldGuide';

const NOW = '2026-11-15T10:00:00.000Z';
const LATER = '2026-11-15T11:00:00.000Z';

function pin(fields: Partial<Pin> & Pick<Pin, 'id' | 'kind' | 'name'>): Pin {
  return { ra: 0, dec: 0, vec: [1, 0, 0], fov: 1, ...fields };
}

const m31 = pin({
  id: 'm31',
  kind: 'target',
  name: 'Andromeda Galaxy (M31)',
  targetKind: 'galaxy',
  source: { service: 'NED (NASA/IPAC Extragalactic Database)', url: 'https://ned.ipac.caltech.edu/srs/ObjectLookup?name=M31' },
});
const deepField = pin({ id: 'spherex-deep-north', kind: 'target', name: 'SPHEREx Deep Field (north)', targetKind: 'deep-field' });
const teegardenTarget = pin({ id: 'teegardens-star', kind: 'target', name: "Teegarden's Star", targetKind: 'star' });
const teegardenHost = pin({ id: 'host-3857', kind: 'host', name: "Teegarden's Star", distPc: 3.83, planetCount: 3 });
const otherHost = pin({ id: 'host-0', kind: 'host', name: '11 Com', distPc: 93.18, planetCount: 1 });

const visit = (p: Pin, surveyId: SurveyId = 'spherex'): GameEvent => ({ type: 'visitedPlace', pin: p, surveyId });
const select = (p: Pin, surveyId: SurveyId = 'spherex'): GameEvent => ({ type: 'selectedPin', pin: p, surveyId });
const run = (events: GameEvent[], from: GameProgress = initialProgress(), now = NOW) =>
  events.reduce((state, event) => applyEvent(state, event, now), from);

function memoryStorage(seed: Record<string, string> = {}) {
  const data = new Map(Object.entries(seed));
  return {
    data,
    getItem: (key: string) => data.get(key) ?? null,
    setItem: (key: string, value: string) => void data.set(key, String(value)),
    removeItem: (key: string) => void data.delete(key),
  };
}

describe('figurines and quests', () => {
  it('lists six distinct figurines in dock order, with only "What you\'re seeing" open from the start', () => {
    expect(FIGURINE_ORDER).toEqual(['places', 'telescope', 'explain', 'guide', 'compare', 'challenge']);
    expect(FIGURINE_ORDER.filter((id) => FIGURINES[id].alwaysUnlocked)).toEqual(['places', 'telescope', 'explain', 'compare']);
    expect(new Set(FIGURINE_ORDER.map((id) => FIGURINES[id].emoji)).size).toBe(6);
    expect(FIGURINES.explain.label).toBe("What you're seeing");
    expect(FIGURINES.guide.unlockHint).toBe('Try another infrared color');
    expect(FIGURINES.challenge.unlockHint).toBe('Finish 3 sky quests');
    for (const id of FIGURINE_ORDER) expect(FIGURINES[id].emoji.trim().length).toBeGreaterThan(0);
  });

  it('has three quests with titles, tasks and takeaways', () => {
    expect(QUEST_ORDER).toEqual(['galaxy', 'dust', 'planets']);
    for (const id of QUEST_ORDER) {
      expect(QUESTS[id].title.length).toBeGreaterThan(0);
      expect(QUESTS[id].task.length).toBeGreaterThan(0);
      expect(QUESTS[id].takeaway.length).toBeGreaterThan(0);
    }
  });

  it('ranks the passport by figurines found', () => {
    expect([0, 1, 2, 3, 4, 5, 6].map(rankFor)).toEqual([
      'Stargazer', 'Stargazer', 'Stargazer', 'Observer', 'Observer', 'Explorer', 'Explorer',
    ]);
  });
});

describe('applyEvent: unlock rules', () => {
  it('starts with the main path open, the extras locked and no quests', () => {
    const state = initialProgress();
    expect(state.unlocked).toEqual(['places', 'telescope', 'explain', 'compare']);
    expect(Object.values(state.quests).some(Boolean)).toBe(false);
    expect(isUnlocked('explain', [])).toBe(true);
    expect(isUnlocked('compare', [])).toBe(true);
    expect(isUnlocked('guide', state.unlocked)).toBe(false);
    expect(isUnlocked('challenge', state.unlocked)).toBe(false);
  });

  it('never announces the always-open figurines: looking around or zooming changes nothing', () => {
    const start = initialProgress();
    expect(applyEvent(start, { type: 'lookedAround' }, NOW)).toBe(start);
    expect(applyEvent(start, { type: 'zoomedClose' }, NOW)).toBe(start);
  });

  it('records a visit with the current telescope', () => {
    const state = run([visit(m31)]);
    expect(state.unlocked).toContain('telescope');
    expect(state.visited.m31).toEqual({ name: 'Andromeda Galaxy (M31)', kind: 'target', targetKind: 'galaxy', surveys: ['spherex'], firstVisit: NOW });
    expect(state.current).toBe('m31');
  });

  it('records selected targets and planet hosts as visits, without unlock cards', () => {
    expect(run([select(deepField)]).visited['spherex-deep-north'].kind).toBe('target');
    const host = run([select(otherHost)]);
    expect(host.visited['host-0'].kind).toBe('host');
    expect(host.toasts.some((t) => t.kind === 'figurine')).toBe(false);
  });

  it('finds the Field guide and finishes the dust quest with a new infrared color', () => {
    const same = run([{ type: 'usedSurvey', surveyId: 'spherex' }, { type: 'usedSurvey', surveyId: 'spherex' }]);
    expect(same.unlocked).not.toContain('guide');
    expect(same.quests.dust).toBe(false);
    expect(same.surveysUsed).toEqual(['spherex']);

    const color = run([{ type: 'changedColor' }], same);
    expect(color.unlocked).toContain('guide');
    expect(color.quests.dust).toBe(true);
    expect(color.toasts).toEqual([{ kind: 'figurine', id: 'guide' }, { kind: 'quest', id: 'dust' }]);
    expect(run([{ type: 'changedColor' }], color)).toBe(color);
  });

  it('keeps Compare photos open from the start', () => {
    expect(initialProgress().unlocked).toContain('compare');
    expect(run([{ type: 'zoomedClose' }]).toasts).toEqual([]);
  });

  it('ignores unknown surveys and pins without an id', () => {
    const start = initialProgress();
    expect(applyEvent(start, { type: 'usedSurvey', surveyId: 'hubble' as never }, NOW)).toBe(start);
    expect(applyEvent(start, { type: 'usedSurvey', surveyId: 'twomass' as never }, NOW)).toBe(start);
    expect(applyEvent(start, visit({ ...m31, id: '' }), NOW)).toBe(start);
    expect(applyEvent(start, { type: 'somethingElse' } as never, NOW)).toBe(start);
  });
});

describe('applyEvent: quests', () => {
  it('completes the galaxy quest for galaxies only', () => {
    expect(run([visit(deepField)]).quests.galaxy).toBe(false);
    const state = run([visit(m31)]);
    expect(state.quests.galaxy).toBe(true);
    expect(state.toasts).toEqual([{ kind: 'quest', id: 'galaxy' }]);
    expect(run([select(m31)]).quests.galaxy).toBe(true);
  });

  it('completes the planets quest for a host, or a featured star the archive lists as a host', () => {
    expect(run([select(otherHost)]).quests.planets).toBe(true);
    expect(run([visit(teegardenTarget)]).quests.planets).toBe(false);
    const enriched = withPlanetData(teegardenTarget, [otherHost, teegardenHost]);
    expect(enriched.planetCount).toBe(3);
    expect(enriched.distPc).toBe(3.83);
    expect(run([visit(enriched)]).quests.planets).toBe(true);
    expect(withPlanetData(m31, [teegardenHost])).toBe(m31);
  });

  it('finds the Weekly challenge after all three quests, announced after the last quest', () => {
    const state = run([visit(m31), { type: 'changedColor' }, select(otherHost)]);
    expect(Object.values(state.quests).every(Boolean)).toBe(true);
    expect(state.unlocked).toContain('challenge');
    expect(state.toasts.slice(-2)).toEqual([{ kind: 'quest', id: 'planets' }, { kind: 'figurine', id: 'challenge' }]);
    expect(state.toasts.filter((t) => t.kind === 'figurine' && t.id === 'challenge')).toHaveLength(1);
  });
});

describe('applyEvent: telescope stamps', () => {
  // A place saved when it was seen only with a survey that has since been removed loads without stamps.
  const unstamped = (current: string | null): GameProgress => ({
    ...initialProgress(),
    visited: { m31: { name: 'Andromeda Galaxy (M31)', kind: 'target', targetKind: 'galaxy', surveys: [], firstVisit: NOW } },
    current,
  });

  it('stamps the telescope used during a visit, without duplicates', () => {
    const state = run([{ type: 'usedSurvey', surveyId: 'spherex' }, { type: 'usedSurvey', surveyId: 'spherex' }], unstamped('m31'));
    expect(state.visited.m31.surveys).toEqual(['spherex']);
  });

  it('stops stamping once the visit ends', () => {
    expect(run([{ type: 'usedSurvey', surveyId: 'spherex' }], unstamped(null)).visited.m31.surveys).toEqual([]);
  });

  it('adds a stamp on a return visit and keeps the first visit time', () => {
    const again = run([visit(m31)], unstamped(null), LATER);
    expect(again.visited.m31.surveys).toEqual(['spherex']);
    expect(again.visited.m31.firstVisit).toBe(NOW);
  });
});

describe('unlockAll, merge and sanitize', () => {
  it('unlocks every figurine without toasts or quests', () => {
    const state = unlockAllProgress(initialProgress());
    expect(FIGURINE_ORDER.every((id) => state.unlocked.includes(id))).toBe(true);
    expect(state.toasts).toEqual([]);
    expect(state.quests.galaxy).toBe(false);
    expect(unlockAllProgress(state)).toBe(state);
  });

  it('drops anything unexpected from stored data', () => {
    expect(sanitizeSaved(null)).toBeNull();
    expect(sanitizeSaved('nope')).toBeNull();
    const saved = sanitizeSaved({
      unlocked: ['places', 'places', 'laser', 42],
      surveysUsed: ['spherex', 'hubble', 'twomass', 'allwise'],
      quests: { galaxy: true, dust: 'yes' },
      visited: { m31: { name: 'Andromeda', kind: 'target', surveys: ['twomass', 'spherex', 'x'], firstVisit: NOW }, bad: { kind: 'planet' } },
    });
    // 2MASS and AllWISE were removed (SPHEREx-only scope), so old saves keep only the SPHEREx stamps.
    expect(saved).toEqual({
      unlocked: ['places', 'telescope', 'explain', 'compare'],
      surveysUsed: ['spherex'],
      quests: { galaxy: true, dust: false, planets: false },
      visited: { m31: { name: 'Andromeda', kind: 'target', surveys: ['spherex'], firstVisit: NOW } },
    });
  });

  it('merges saved progress with progress made before loading', () => {
    const saved = run([visit(m31), { type: 'lookedAround' }]);
    const memory = run([{ type: 'lookedAround' }, visit(m31), { type: 'changedColor' }], initialProgress(), LATER);
    const merged = mergeProgress(saved, memory);
    expect(merged.visited.m31.surveys).toEqual(['spherex']);
    expect(merged.visited.m31.firstVisit).toBe(NOW);
    // Places and the galaxy quest were already saved: no second announcement. A new color: the Field guide.
    expect(merged.toasts).toEqual([{ kind: 'figurine', id: 'guide' }, { kind: 'quest', id: 'dust' }]);
    expect(mergeProgress(saved, memory, true).toasts[0]).toEqual({ kind: 'quest', id: 'galaxy' });
  });
});

describe('useGame store', () => {
  beforeEach(() => {
    useGame.setState({ ...initialProgress(), hydrated: false });
  });
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('works without window: hydrate is a no-op and events still apply', () => {
    expect(typeof window).toBe('undefined');
    expect(() => useGame.getState().hydrate()).not.toThrow();
    expect(useGame.getState().hydrated).toBe(false);
    useGame.getState().record({ type: 'lookedAround' });
    useGame.getState().record({ type: 'zoomedClose' });
    expect(useGame.getState().unlocked).toEqual(['places', 'telescope', 'explain', 'compare']);
  });

  it('shows toasts in order and dismisses the first', () => {
    const { record, dismissToast } = useGame.getState();
    record({ type: 'lookedAround' });
    record(visit(m31));
    record({ type: 'changedColor' });
    expect(useGame.getState().toasts.map((t) => t.id)).toEqual(['galaxy', 'guide', 'dust']);
    dismissToast();
    expect(useGame.getState().toasts.map((t) => t.id)).toEqual(['guide', 'dust']);
    dismissToast();
    dismissToast();
    dismissToast();
    expect(useGame.getState().toasts).toEqual([]);
  });

  it('unlockAll opens every figurine and reset forgets everything', () => {
    useGame.getState().record(visit(m31));
    useGame.getState().unlockAll();
    expect(FIGURINE_ORDER.every((id) => isUnlocked(id, useGame.getState().unlocked))).toBe(true);
    useGame.getState().reset();
    const state = useGame.getState();
    expect(state.unlocked).toEqual(['places', 'telescope', 'explain', 'compare']);
    expect(state.visited).toEqual({});
    expect(state.toasts).toEqual([]);
    expect(state.current).toBeNull();
  });

  it('ends the visit in progress', () => {
    useGame.getState().record(visit(m31));
    expect(useGame.getState().current).toBe('m31');
    useGame.getState().endVisit();
    expect(useGame.getState().current).toBeNull();
    expect(useGame.getState().visited.m31.surveys).toEqual(['spherex']);
  });

  it('loads, saves and clears progress in localStorage', () => {
    const storage = memoryStorage({
      [GAME_STORAGE_KEY]: JSON.stringify({ v: 1, unlocked: ['explain', 'places'], surveysUsed: ['spherex'], quests: { galaxy: true }, visited: {} }),
    });
    vi.stubGlobal('window', { localStorage: storage });

    useGame.getState().hydrate();
    let state = useGame.getState();
    expect(state.hydrated).toBe(true);
    // Loading adds the always-open main path to whatever the save says.
    expect(state.unlocked).toEqual(['places', 'telescope', 'explain', 'compare']);
    expect(FIGURINE_ORDER.filter((id) => isUnlocked(id, state.unlocked))).toEqual(['places', 'telescope', 'explain', 'compare']);
    expect(state.quests.galaxy).toBe(true);
    expect(state.toasts).toEqual([]);

    useGame.getState().record({ type: 'zoomedClose' });
    const saved = JSON.parse(storage.getItem(GAME_STORAGE_KEY) ?? '{}');
    // Zooming in unlocks nothing now, so the save is left as it was.
    expect(saved.unlocked).toEqual(['explain', 'places']);
    expect(saved).not.toHaveProperty('toasts');
    expect(saved).not.toHaveProperty('current');

    useGame.getState().reset();
    state = useGame.getState();
    expect(state.unlocked).toEqual(['places', 'telescope', 'explain', 'compare']);
    expect(storage.getItem(GAME_STORAGE_KEY)).toBeNull();
  });

  it('hydrates before the first event so a saved game is never overwritten', () => {
    const storage = memoryStorage({ [GAME_STORAGE_KEY]: JSON.stringify({ unlocked: ['explain', 'telescope'] }) });
    vi.stubGlobal('window', { localStorage: storage });
    useGame.getState().record({ type: 'usedSurvey', surveyId: 'spherex' });
    useGame.getState().record({ type: 'changedColor' });
    expect(JSON.parse(storage.getItem(GAME_STORAGE_KEY) ?? '{}').unlocked).toEqual(['places', 'telescope', 'explain', 'compare', 'guide']);
  });

  it('survives corrupt data and storage that throws', () => {
    vi.stubGlobal('window', { localStorage: memoryStorage({ [GAME_STORAGE_KEY]: '{not json' }) });
    expect(() => useGame.getState().hydrate()).not.toThrow();
    expect(useGame.getState().unlocked).toEqual(['places', 'telescope', 'explain', 'compare']);

    useGame.setState({ ...initialProgress(), hydrated: false });
    const broken = {
      getItem: () => { throw new Error('SecurityError'); },
      setItem: () => { throw new Error('QuotaExceededError'); },
      removeItem: () => { throw new Error('SecurityError'); },
    };
    vi.stubGlobal('window', { localStorage: broken });
    expect(() => {
      useGame.getState().hydrate();
      useGame.getState().record({ type: 'lookedAround' });
      useGame.getState().unlockAll();
      useGame.getState().reset();
    }).not.toThrow();
  });
});

describe('field guide helpers', () => {
  it('formats light-years at a sensible precision', () => {
    expect(formatLightYears(4.24)).toBe('4.2 light-years');
    expect(formatLightYears(1)).toBe('1 light-year');
    expect(formatLightYears(12.49)).toBe('12 light-years');
    expect(formatLightYears(303.9)).toBe('304 light-years');
    expect(formatLightYears(27_723)).toBe('27,700 light-years');
    expect(formatLightYears(2_537_000)).toBe('2.5 million light-years');
    expect(formatLightYears(23_000_000)).toBe('23 million light-years');
    expect(formatLightYears(13_400_000_000)).toBe('13 billion light-years');
    expect(formatLightYears(0)).toBeNull();
    expect(formatLightYears(Number.NaN)).toBeNull();
    expect(distanceLabel(3.83)).toBe('12 light-years');
    expect(distanceLabel(null)).toBeNull();
  });

  it('names place types in plain words', () => {
    expect(placeTypeLabel({ kind: 'target', targetKind: 'galaxy' })).toBe('Galaxy');
    expect(placeTypeLabel({ kind: 'target', targetKind: 'deep-field' })).toBe('Deep field');
    expect(placeTypeLabel({ kind: 'host' })).toBe('Star with planets');
    expect(placeTypeLabel({ kind: 'target', targetKind: 'star' })).toBe('Star');
    expect(placeTypeLabel({ kind: 'target', targetKind: 'star' }, true)).toBe('Star with planets');
    expect(placeTypeLabel({ kind: 'target', targetKind: 'reference' })).toBe('Sky landmark');
    expect(placeTypeLabel({ kind: 'target', targetKind: 'star-forming-region' })).toBe('Star forming region');
    expect(planetLabel(1)).toBe('1 known planet');
    expect(planetLabel(7)).toBe('7 known planets');
    expect(planetLabel(null)).toBeNull();
  });

  it('joins saved places back to live pins, guarding index-based host ids', () => {
    const index = buildPinIndex([m31, teegardenTarget], [otherHost, teegardenHost]);
    const hostPlace = { name: "Teegarden's Star", kind: 'host' as const, surveys: [], firstVisit: NOW };
    expect(resolvePin('host-3857', hostPlace, index)).toBe(teegardenHost);
    // The snapshot changed and host-0 is now another star: fall back to the name.
    expect(resolvePin('host-0', hostPlace, index)).toBe(teegardenHost);
    const starPlace = { name: "Teegarden's Star", kind: 'target' as const, targetKind: 'star', surveys: [], firstVisit: NOW };
    expect(planetHostFor(resolvePin('teegardens-star', starPlace, index), starPlace, index)).toBe(teegardenHost);
    const galaxyPlace = { name: 'Andromeda Galaxy (M31)', kind: 'target' as const, targetKind: 'galaxy', surveys: [], firstVisit: NOW };
    expect(planetHostFor(resolvePin('m31', galaxyPlace, index), galaxyPlace, index)).toBeNull();
  });

  it('orders the field guide newest first', () => {
    const state = run([visit(m31)], initialProgress(), NOW);
    const later = run([visit(deepField)], state, LATER);
    expect(newestFirst(later.visited).map((e) => e.id)).toEqual(['spherex-deep-north', 'm31']);
  });

  it('shows one card when a featured star and its planet-host dot are both visited', () => {
    const first = run([visit(teegardenTarget), visit(m31)], initialProgress(), NOW);
    const both = run([select(teegardenHost)], first, LATER);
    const cards = fieldGuideEntries(both.visited);
    expect(cards.map((c) => c.id)).toEqual(['host-3857', 'm31']);
    expect(cards[0].place.surveys).toEqual(['spherex']);
    expect(both.visited['teegardens-star'].surveys).toEqual(['spherex']);
  });

  it('links only to web pages, and bare TAP endpoints to the archive home', () => {
    expect(sourceHref('https://ned.ipac.caltech.edu/srs/ObjectLookup?name=M31')).toBe('https://ned.ipac.caltech.edu/srs/ObjectLookup?name=M31');
    expect(sourceHref('https://irsa.ipac.caltech.edu/TAP/sync')).toBe('https://irsa.ipac.caltech.edu/');
    expect(sourceHref('javascript:alert(1)')).toBeNull();
    expect(sourceHref('not a url')).toBeNull();
    expect(sourceHref(undefined)).toBeNull();
  });
});
