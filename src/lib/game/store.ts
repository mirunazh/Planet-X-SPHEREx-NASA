/**
 * Game progress: figurines found, places in the field guide, telescopes used and
 * quests done. All rules live in the pure applyEvent reducer; the zustand store
 * only adds persistence (localStorage) and the toast queue.
 *
 * Telescope stamps: recording a pin stamps the current survey on it, and that pin
 * stays "the visit in progress" (`current`) until the selection is cleared
 * (endVisit). A survey used during the visit is stamped on the pin too.
 */
import { create } from 'zustand';
import type { Pin } from '@/lib/store';
import { type SurveyId, isSurveyId } from '@/lib/sky/surveys';
import { FIGURINES, FIGURINE_ORDER, type FigurineId } from './figurines';
import { QUEST_ORDER, type QuestId } from './quests';

export const GAME_STORAGE_KEY = 'skynav.game.v1';

export type GameEvent =
  | { type: 'lookedAround' }
  | { type: 'visitedPlace'; pin: Pin; surveyId: SurveyId }
  | { type: 'selectedPin'; pin: Pin; surveyId: SurveyId }
  | { type: 'usedSurvey'; surveyId: SurveyId }
  | { type: 'changedColor' }
  | { type: 'zoomedClose' };

export type GameToast = { kind: 'figurine'; id: FigurineId } | { kind: 'quest'; id: QuestId };

export interface VisitedPlace {
  name: string;
  kind: 'host' | 'target';
  targetKind?: string;
  /** Telescopes the place was seen with, in the order they were used. */
  surveys: SurveyId[];
  /** ISO time the place was added to the field guide. */
  firstVisit: string;
}

/** The part saved in localStorage. */
export interface SavedProgress {
  unlocked: FigurineId[];
  visited: Record<string, VisitedPlace>;
  surveysUsed: SurveyId[];
  quests: Record<QuestId, boolean>;
}

export interface GameProgress extends SavedProgress {
  /** Queue of announcements; the UI shows the first one. Not saved. */
  toasts: GameToast[];
  /** Pin id of the visit in progress; a survey used now is stamped on it. Not saved. */
  current: string | null;
}

export function isUnlocked(id: FigurineId, unlocked: FigurineId[]): boolean {
  return FIGURINES[id]?.alwaysUnlocked === true || unlocked.includes(id);
}

const noQuests = (): Record<QuestId, boolean> => ({ galaxy: false, dust: false, planets: false });

export function initialProgress(): GameProgress {
  return {
    unlocked: FIGURINE_ORDER.filter((id) => FIGURINES[id].alwaysUnlocked),
    visited: {},
    surveysUsed: [],
    quests: noQuests(),
    toasts: [],
    current: null,
  };
}

const union = <T>(a: readonly T[], b: readonly T[]): T[] => [...a, ...b.filter((item) => !a.includes(item))];

const isGalaxy = (pin: Pin) => pin.kind === 'target' && (pin.targetKind ?? '').toLowerCase().includes('galaxy');

/** Host pins are planet hosts; a featured star counts when it carries a planet count (see withPlanetData). */
const hasKnownPlanets = (pin: Pin) => pin.kind === 'host' || (typeof pin.planetCount === 'number' && pin.planetCount > 0);

// ---------------------------------------------------------------------------
// Rules
// ---------------------------------------------------------------------------

/** Copy-on-write working state: each field is replaced, never mutated, so unchanged fields keep their identity. */
interface Draft {
  unlocked: FigurineId[];
  visited: Record<string, VisitedPlace>;
  surveysUsed: SurveyId[];
  quests: Record<QuestId, boolean>;
  current: string | null;
  toasts: GameToast[];
}

function unlock(d: Draft, id: FigurineId): void {
  // Always-open figurines are never "found", so they never get an unlock card.
  if (FIGURINES[id]?.alwaysUnlocked || d.unlocked.includes(id)) return;
  d.unlocked = [...d.unlocked, id];
  d.toasts.push({ kind: 'figurine', id });
}

function complete(d: Draft, id: QuestId): void {
  if (d.quests[id]) return;
  d.quests = { ...d.quests, [id]: true };
  d.toasts.push({ kind: 'quest', id });
}

function noteSurvey(d: Draft, id: SurveyId): void {
  if (isSurveyId(id) && !d.surveysUsed.includes(id)) d.surveysUsed = [...d.surveysUsed, id];
}

function stamp(d: Draft, pinId: string, id: SurveyId): void {
  const place = d.visited[pinId];
  if (!place || !isSurveyId(id) || place.surveys.includes(id)) return;
  d.visited = { ...d.visited, [pinId]: { ...place, surveys: [...place.surveys, id] } };
}

function recordPin(d: Draft, pin: Pin, id: SurveyId, now: string): void {
  if (d.visited[pin.id]) {
    stamp(d, pin.id, id);
  } else {
    d.visited = {
      ...d.visited,
      [pin.id]: {
        name: typeof pin.name === 'string' ? pin.name : pin.id,
        kind: pin.kind === 'host' ? 'host' : 'target',
        ...(pin.targetKind ? { targetKind: pin.targetKind } : {}),
        surveys: isSurveyId(id) ? [id] : [],
        firstVisit: now,
      },
    };
  }
  d.current = pin.id;
}

/** Rule that depends on totals: three quests find the challenge. */
function settle(d: Draft): void {
  if (QUEST_ORDER.every((id) => d.quests[id])) unlock(d, 'challenge');
}

function draftOf(p: GameProgress): Draft {
  return { unlocked: p.unlocked, visited: p.visited, surveysUsed: p.surveysUsed, quests: p.quests, current: p.current, toasts: [] };
}

function finish(state: GameProgress, d: Draft): GameProgress {
  if (
    d.unlocked === state.unlocked &&
    d.visited === state.visited &&
    d.surveysUsed === state.surveysUsed &&
    d.quests === state.quests &&
    d.current === state.current
  ) {
    return state;
  }
  return {
    unlocked: d.unlocked,
    visited: d.visited,
    surveysUsed: d.surveysUsed,
    quests: d.quests,
    current: d.current,
    toasts: d.toasts.length ? [...state.toasts, ...d.toasts] : state.toasts,
  };
}

/**
 * Pure reducer. Each new figurine or finished quest appends one toast.
 * Returns `state` itself when the event changes nothing, so the many repeated
 * events (every drag frame is a lookedAround) cost nothing downstream.
 *
 * - places    <- lookedAround
 * - telescope <- visitedPlace, or selectedPin of a target
 * - guide     <- changedColor, which also finishes the dust quest (SPHEREx is the
 *                only telescope, so a new infrared color is the "other view")
 * - compare   <- zoomedClose
 * - challenge <- all three quests done
 */
export function applyEvent(state: GameProgress, event: GameEvent, now: string): GameProgress {
  if (!event) return state;
  const d = draftOf(state);
  switch (event.type) {
    case 'lookedAround':
      unlock(d, 'places');
      break;
    case 'visitedPlace':
    case 'selectedPin': {
      const { pin, surveyId } = event;
      if (!pin || typeof pin.id !== 'string' || !pin.id) break;
      recordPin(d, pin, surveyId, now);
      if (event.type === 'visitedPlace' || pin.kind === 'target') unlock(d, 'telescope');
      if (isGalaxy(pin)) complete(d, 'galaxy');
      if (hasKnownPlanets(pin)) complete(d, 'planets');
      noteSurvey(d, surveyId);
      break;
    }
    case 'usedSurvey':
      noteSurvey(d, event.surveyId);
      if (d.current) stamp(d, d.current, event.surveyId);
      break;
    case 'changedColor':
      unlock(d, 'guide');
      complete(d, 'dust');
      break;
    case 'zoomedClose':
      unlock(d, 'compare');
      break;
    default:
      break;
  }
  settle(d);
  return finish(state, d);
}

/** Unlocks every figurine without announcements (a deliberate choice by the player). Quests stay as they are. */
export function unlockAllProgress(state: GameProgress): GameProgress {
  const unlocked = union(state.unlocked, FIGURINE_ORDER);
  return unlocked.length === state.unlocked.length ? state : { ...state, unlocked };
}

// ---------------------------------------------------------------------------
// Persistence
// ---------------------------------------------------------------------------

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);
const isFigurineId = (value: unknown): value is FigurineId =>
  typeof value === 'string' && (FIGURINE_ORDER as string[]).includes(value);
const isSurvey = (value: unknown): value is SurveyId => typeof value === 'string' && isSurveyId(value);

function uniqueList<T>(raw: unknown, ok: (item: unknown) => item is T): T[] {
  return Array.isArray(raw) ? raw.filter(ok).filter((item, i, all) => all.indexOf(item) === i) : [];
}

/** Validates stored data field by field; anything unexpected is dropped, never thrown. */
export function sanitizeSaved(value: unknown): SavedProgress | null {
  if (!isRecord(value)) return null;
  const quests = noQuests();
  if (isRecord(value.quests)) for (const id of QUEST_ORDER) quests[id] = value.quests[id] === true;

  const visited: Record<string, VisitedPlace> = {};
  if (isRecord(value.visited)) {
    for (const [id, raw] of Object.entries(value.visited)) {
      if (!id || !isRecord(raw) || typeof raw.name !== 'string' || (raw.kind !== 'host' && raw.kind !== 'target')) continue;
      visited[id] = {
        name: raw.name,
        kind: raw.kind,
        ...(typeof raw.targetKind === 'string' && raw.targetKind ? { targetKind: raw.targetKind } : {}),
        surveys: uniqueList(raw.surveys, isSurvey),
        firstVisit: typeof raw.firstVisit === 'string' ? raw.firstVisit : '',
      };
    }
  }
  return {
    unlocked: union(initialProgress().unlocked, uniqueList(value.unlocked, isFigurineId)),
    visited,
    surveysUsed: uniqueList(value.surveysUsed, isSurvey),
    quests,
  };
}

/**
 * Union of saved progress and progress held in memory. On the first load
 * (`keepToasts` false) memory holds only what was recorded before hydration
 * (normally nothing: record() hydrates first), so its toasts are kept only for
 * things the save did not have yet. The derived rules run on the combined result.
 */
export function mergeProgress(saved: SavedProgress, memory: GameProgress, keepToasts = false): GameProgress {
  const visited: Record<string, VisitedPlace> = { ...saved.visited };
  for (const [id, place] of Object.entries(memory.visited)) {
    const old = visited[id];
    visited[id] = old
      ? {
          ...old,
          surveys: union(old.surveys, place.surveys),
          firstVisit: old.firstVisit && (!place.firstVisit || old.firstVisit <= place.firstVisit) ? old.firstVisit : place.firstVisit,
        }
      : place;
  }
  const quests = noQuests();
  for (const id of QUEST_ORDER) quests[id] = saved.quests[id] || memory.quests[id];
  const merged: GameProgress = {
    unlocked: union(saved.unlocked, memory.unlocked),
    visited,
    surveysUsed: union(saved.surveysUsed, memory.surveysUsed),
    quests,
    toasts: keepToasts
      ? memory.toasts
      : memory.toasts.filter((t) => (t.kind === 'figurine' ? !saved.unlocked.includes(t.id) : !saved.quests[t.id])),
    current: memory.current,
  };
  const d = draftOf(merged);
  settle(d);
  return d.toasts.length ? { ...merged, unlocked: d.unlocked, quests: d.quests, toasts: [...merged.toasts, ...d.toasts] } : merged;
}

const savedPart = (p: SavedProgress): SavedProgress => ({
  unlocked: p.unlocked,
  visited: p.visited,
  surveysUsed: p.surveysUsed,
  quests: p.quests,
});

const serialize = (p: SavedProgress) => JSON.stringify({ v: 1, ...savedPart(p) });

const savedChanged = (a: SavedProgress, b: SavedProgress) =>
  a.unlocked !== b.unlocked || a.visited !== b.visited || a.surveysUsed !== b.surveysUsed || a.quests !== b.quests;

function readSaved(): SavedProgress | null {
  try {
    if (typeof window === 'undefined') return null;
    const raw = window.localStorage?.getItem(GAME_STORAGE_KEY);
    return raw ? sanitizeSaved(JSON.parse(raw)) : null;
  } catch {
    return null; // Blocked storage or a corrupt save: start fresh for this visit.
  }
}

function writeSaved(progress: SavedProgress): void {
  try {
    if (typeof window === 'undefined') return;
    window.localStorage?.setItem(GAME_STORAGE_KEY, serialize(progress));
  } catch {
    // Storage can be unavailable (private mode) or full; progress then lasts for this visit only.
  }
}

function clearSaved(): void {
  try {
    if (typeof window === 'undefined') return;
    window.localStorage?.removeItem(GAME_STORAGE_KEY);
  } catch {
    // Nothing to clear when storage is unavailable.
  }
}

// ---------------------------------------------------------------------------
// Store
// ---------------------------------------------------------------------------

export interface GameActions {
  /** Applies one game event, then saves. Repeated events that change nothing are free. */
  record: (event: GameEvent) => void;
  /** Unlocks every figurine at once, without toasts. */
  unlockAll: () => void;
  /** Forgets all progress, here and in storage. */
  reset: () => void;
  /** Removes the toast currently shown (the first in the queue). */
  dismissToast: () => void;
  /** Loads saved progress, merging anything recorded earlier. Safe to call more than once; a no-op without `window`. */
  hydrate: () => void;
  /** Ends the visit in progress: later survey changes are no longer stamped on that pin. */
  endVisit: () => void;
}

export interface GameState extends GameProgress, GameActions {
  /** True once saved progress has been read in the browser. */
  hydrated: boolean;
}

export const useGame = create<GameState>()((set, get) => ({
  ...initialProgress(),
  hydrated: false,

  record: (event) => {
    try {
      if (!get().hydrated) get().hydrate();
      const state = get();
      const next = applyEvent(state, event, new Date().toISOString());
      if (next === state) return;
      set(next);
      if (savedChanged(state, next)) writeSaved(next);
    } catch (error) {
      console.warn('[game] event ignored', error);
    }
  },

  unlockAll: () => {
    try {
      if (!get().hydrated) get().hydrate();
      const state = get();
      const next = unlockAllProgress(state);
      if (next === state) return;
      set({ unlocked: next.unlocked });
      writeSaved(next);
    } catch (error) {
      console.warn('[game] unlockAll failed', error);
    }
  },

  reset: () => {
    clearSaved();
    set(initialProgress());
  },

  dismissToast: () => set((s) => (s.toasts.length ? { toasts: s.toasts.slice(1) } : s)),

  hydrate: () => {
    if (typeof window === 'undefined') return;
    try {
      const saved = readSaved();
      const state = get();
      const next = saved ? mergeProgress(saved, state, state.hydrated) : state;
      set({ ...savedPart(next), toasts: next.toasts, current: next.current, hydrated: true });
      if (serialize(saved ?? initialProgress()) !== serialize(next)) writeSaved(next);
    } catch (error) {
      console.warn('[game] could not load saved progress', error);
      set({ hydrated: true });
    }
  },

  endVisit: () => set((s) => (s.current === null ? s : { current: null })),
}));
