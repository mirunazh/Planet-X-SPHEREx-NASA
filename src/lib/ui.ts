import { create } from 'zustand';

/** Panels of the simple navigator. Only one sheet is open at a time. */
export type SheetId = 'places' | 'telescope' | 'explain' | 'guide' | 'settings';

const EXPERT_KEY = 'skynav.expertLayout.v1';

function readExpertLayout(): boolean {
  try {
    return typeof window !== 'undefined' && window.localStorage.getItem(EXPERT_KEY) === '1';
  } catch {
    return false;
  }
}

export interface UiState {
  sheet: SheetId | null;
  /** true = Dominic's original full HUD; false = the simple, game-like navigator. */
  expertLayout: boolean;
  cropOpen: boolean;
  introOpen: boolean;
  tourOpen: boolean;
  openSheet: (id: SheetId) => void;
  toggleSheet: (id: SheetId) => void;
  closeSheet: () => void;
  setExpertLayout: (value: boolean) => void;
  setCropOpen: (value: boolean) => void;
  setIntroOpen: (value: boolean) => void;
  setTourOpen: (value: boolean) => void;
}

export const useUi = create<UiState>()((set) => ({
  sheet: null,
  expertLayout: false,
  cropOpen: false,
  introOpen: false,
  tourOpen: false,
  openSheet: (sheet) => set({ sheet }),
  toggleSheet: (id) => set((s) => ({ sheet: s.sheet === id ? null : id })),
  closeSheet: () => set({ sheet: null }),
  setExpertLayout: (expertLayout) => {
    try {
      window.localStorage.setItem(EXPERT_KEY, expertLayout ? '1' : '0');
    } catch {
      // Storage can be unavailable (private mode); the choice then lasts for this visit only.
    }
    set({ expertLayout, sheet: null });
  },
  setCropOpen: (cropOpen) => set({ cropOpen }),
  setIntroOpen: (introOpen) => set({ introOpen }),
  setTourOpen: (tourOpen) => set({ tourOpen }),
}));

/** Reads saved preferences once the browser is available. */
export function loadUiPreferences(): void {
  useUi.setState({ expertLayout: readExpertLayout() });
}

const INTRO_KEY = 'skynav.introSeen.v1';
/** Set (for this tab only) while the intro is on screen, cleared when it ends. */
const INTRO_PENDING_KEY = 'skynav.introPending.v1';

/**
 * First visit, a link with ?intro=1, or a reload while the intro was still showing. Deep links into
 * a specific view skip the intro. The pending flag matters because the sky page writes its start
 * view into the address bar at once, so any reload looks like a deep link.
 */
export function shouldShowIntro(): boolean {
  try {
    const params = new URLSearchParams(window.location.search);
    if (params.get('intro') === '1') return true;
    if (readPending()) return true;
    if (params.has('ra') || params.has('dec')) return false;
    return window.localStorage.getItem(INTRO_KEY) !== '1';
  } catch {
    return false;
  }
}

function readPending(): boolean {
  try {
    return window.sessionStorage.getItem(INTRO_PENDING_KEY) === '1';
  } catch {
    return false;
  }
}

export function markIntroPending(): void {
  try {
    window.sessionStorage.setItem(INTRO_PENDING_KEY, '1');
  } catch {
    // Without session storage a reload during the intro skips it; that is acceptable.
  }
}

export function markIntroSeen(): void {
  try {
    window.sessionStorage.removeItem(INTRO_PENDING_KEY);
  } catch {
    // Nothing to clear.
  }
  try {
    window.localStorage.setItem(INTRO_KEY, '1');
  } catch {
    // Without storage the intro may show again on the next visit; that is acceptable.
  }
}
