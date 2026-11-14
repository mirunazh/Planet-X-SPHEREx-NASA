import { create } from 'zustand';
import { type Vec3, radecToVec } from './sky/coords';
import type { Mode } from './sky/view';
import { type SurveyId, SURVEYS } from './sky/surveys';
import type { SkyTarget, TargetOrigin } from './sky/target';

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
  flash: number;
  busy: boolean;
  crossing: boolean;
  viewport: { width: number; height: number; dpr: number };
  allskyStatus: LoadStatus;
  /** HiPS order the renderer is drawing (null = whole-sky preview only). */
  activeOrder: number | null;
  panel: Panel;
  /** Animation queue; mutated in place by the navigation helpers, never rendered. */
  anim: AnimStep[];
}

export interface NavActions {
  setView: (v: Partial<Pick<NavState, 'mode' | 'center' | 'fov' | 'distance'>>) => void;
  setSurvey: (id: SurveyId) => void;
  setFrame: (frame: number) => void;
  toggle: (key: 'showGrid' | 'showHosts' | 'showTargets' | 'rawPixels') => void;
  setPins: (hosts: Pin[], targets: Pin[], retrievedAt: string | null) => void;
  setHover: (pin: Pin | null, pos: { x: number; y: number } | null) => void;
  select: (pin: Pin | null) => void;
  setLocked: (target: SkyTarget | null) => void;
  setViewport: (v: NavState['viewport']) => void;
  setPanel: (panel: Panel) => void;
}

export const INITIAL_VIEW: Pick<NavState, 'mode' | 'center' | 'fov' | 'distance'> = {
  mode: 'globe',
  center: radecToVec(266.40499, -28.93617), // Galactic Centre: the Milky Way band crosses the globe
  fov: 46,
  distance: 3.2,
};

export const useNav = create<NavState & NavActions>()((set) => ({
  ...INITIAL_VIEW,
  surveyId: 'spherex',
  frame: SURVEYS.spherex.defaultFrame,
  rawPixels: false,
  gain: 1,
  showGrid: true,
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
  flash: 0,
  busy: false,
  crossing: false,
  viewport: { width: 1, height: 1, dpr: 1 },
  allskyStatus: 'idle',
  activeOrder: null,
  panel: 'none',
  anim: [],

  setView: (v) => set(v),
  setSurvey: (surveyId) => set({ surveyId }),
  setFrame: (frame) => set({ frame }),
  toggle: (key) => set((s) => ({ [key]: !s[key] }) as Partial<NavState>),
  setPins: (hosts, targets, dataRetrievedAt) => set({ hosts, targets, dataRetrievedAt, dataStatus: 'ready' }),
  setHover: (hovered, hoverPos) => set({ hovered, hoverPos }),
  select: (selected) => set({ selected }),
  setLocked: (locked) => set({ locked }),
  setViewport: (viewport) => set({ viewport }),
  setPanel: (panel) => set({ panel }),
}));
