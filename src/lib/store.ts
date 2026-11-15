import { create } from 'zustand';
import { type Vec3, radecToVec } from './sky/coords';
import type { Mode } from './sky/view';
import { type SurveyId, SURVEYS } from './sky/surveys';
import type { SkyTarget, TargetOrigin } from './sky/target';
import { type SkyLayer, requestedLayer, sameLayer } from './sky/layer';

export interface PinSource {
  service: string;
  url?: string;
  resolvedName?: string;
  retrievedAt?: string;
  note?: string;
  query?: string;
}

export interface Pin {
  id: string;
  kind: 'host' | 'target';
  name: string;
  ra: number;
  dec: number;
  vec: Vec3;
  /** Field of view to fly to, degrees. */
  fov: number;
  distPc?: number | null;
  planetCount?: number | null;
  kmag?: number | null;
  planets?: string[];
  firstDiscovery?: number | null;
  facilities?: string[];
  targetKind?: string;
  description?: string;
  source?: PinSource;
}

export interface AnimStep {
  /** 'flight' moves the view to a chosen place; 'inertia' is the spin after a flick. */
  kind?: 'flight' | 'inertia';
  duration: number;
  start?: number;
  init?: () => void;
  update: (t: number) => void;
  done?: () => void;
}

export type Panel = 'none' | 'credits' | 'help';
export type LoadStatus = 'idle' | 'loading' | 'ready' | 'error';

export interface NavState {
  mode: Mode;
  center: Vec3;
  fov: number;
  distance: number;
  surveyId: SurveyId;
  frame: number;
  /** Requested selection above; this changes only when the renderer swaps images. */
  displayedLayer: SkyLayer | null;
  /** Changes for every effective selection or retry, including A → B → A in one render. */
  layerRevision: number;
  rawPixels: boolean;
  /** Display gain applied to the survey images (display only, not data). */
  gain: number;
  showGrid: boolean;
  showHosts: boolean;
  showTargets: boolean;
  hosts: Pin[];
  targets: Pin[];
  dataStatus: LoadStatus;
  dataRetrievedAt: string | null;
  hovered: Pin | null;
  hoverPos: { x: number; y: number } | null;
  selected: Pin | null;
  locked: SkyTarget | null;
  origin: TargetOrigin;
  busy: boolean;
  /** Explicit movement/reset/stop intents invalidate pending name lookups. */
  navigationRevision: number;
  viewport: { width: number; height: number; dpr: number };
  allskyStatus: LoadStatus;
  /** HiPS order the renderer is drawing (null = whole-sky preview only). */
  activeOrder: number | null;
  panel: Panel;
  /** Animation queue; mutated in place by the navigation helpers, never rendered. */
  anim: AnimStep[];
}

export interface NavActions {
  setView: (v: Partial<Pick<NavState, 'center' | 'fov'>>) => void;
  setSurvey: (id: SurveyId) => void;
  setFrame: (frame: number) => void;
  retryLayer: () => void;
  toggle: (key: 'showGrid' | 'showHosts' | 'showTargets' | 'rawPixels') => void;
  setPins: (hosts: Pin[], targets: Pin[], retrievedAt: string | null) => void;
  setHover: (pin: Pin | null, pos: { x: number; y: number } | null) => void;
  select: (pin: Pin | null) => void;
  setLocked: (target: SkyTarget | null) => void;
  setViewport: (v: NavState['viewport']) => void;
  setPanel: (panel: Panel) => void;
}

export const INITIAL_VIEW: Pick<NavState, 'mode' | 'center' | 'fov' | 'distance'> = {
  mode: 'sky',
  center: radecToVec(266.40499, -28.93617), // Galactic Centre: opening direction toward the Milky Way
  fov: 60,
  distance: 3.2,
};

export const useNav = create<NavState & NavActions>()((set) => ({
  ...INITIAL_VIEW,
  surveyId: 'spherex',
  frame: SURVEYS.spherex.defaultFrame,
  displayedLayer: null,
  layerRevision: 0,
  rawPixels: false,
  gain: 1,
  showGrid: false,
  showHosts: true,
  showTargets: true,
  hosts: [],
  targets: [],
  dataStatus: 'idle',
  dataRetrievedAt: null,
  hovered: null,
  hoverPos: null,
  selected: null,
  locked: null,
  origin: 'navigation',
  busy: false,
  navigationRevision: 0,
  viewport: { width: 1, height: 1, dpr: 1 },
  allskyStatus: 'idle',
  activeOrder: null,
  panel: 'none',
  anim: [],

  setView: (v) => set(v),
  setSurvey: (surveyId) => set((s) => surveyId === s.surveyId ? {} : { surveyId, layerRevision: s.layerRevision + 1, allskyStatus: 'loading', locked: null }),
  setFrame: (frame) => set((s) => {
    const next = requestedLayer({ surveyId: 'spherex', frame }).frame;
    const changed = !sameLayer(requestedLayer(s), requestedLayer({ ...s, frame: next }));
    return { frame: next, ...(changed ? { layerRevision: s.layerRevision + 1, allskyStatus: 'loading' as const, locked: null } : {}) };
  }),
  retryLayer: () => set((s) => ({ layerRevision: s.layerRevision + 1, allskyStatus: 'loading', locked: null })),
  toggle: (key) => set((s) => ({ [key]: !s[key] }) as Partial<NavState>),
  setPins: (hosts, targets, dataRetrievedAt) => set({ hosts, targets, dataRetrievedAt, dataStatus: 'ready' }),
  setHover: (hovered, hoverPos) => set({ hovered, hoverPos }),
  select: (selected) => set({ selected }),
  setLocked: (locked) => set({ locked }),
  setViewport: (viewport) => set({ viewport }),
  setPanel: (panel) => set({ panel }),
}));
