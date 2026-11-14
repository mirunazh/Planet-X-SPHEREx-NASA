// The whole view lives in the URL so a copied link restores the same frame. Parsing is tolerant:
// anything missing or malformed falls back to the default, never throws.

import { create } from 'zustand';
import type { Mode } from './data';

export interface Overlays {
  pred: boolean;
  meas: boolean;
  input: boolean;
}

export interface ViewState {
  mission: string | null;
  ra: number | null;
  dec: number | null;
  group: string | null;
  mode: Mode;
  frame: number;
  overlays: Overlays;
  zoom: number;
  cx: number;
  cy: number;
  fps: number;
  loop: boolean;
}

export const ZOOM_MIN = 1;
export const ZOOM_MAX = 16;
export const FPS_STEPS = [0.5, 1, 2, 4, 8, 12] as const;
const CENTRE = 60;

export const DEFAULT_VIEW: ViewState = {
  mission: null,
  ra: null,
  dec: null,
  group: null,
  mode: 'stack',
  frame: 0,
  overlays: { pred: true, meas: true, input: true },
  zoom: 1,
  cx: CENTRE,
  cy: CENTRE,
  fps: 2,
  loop: true,
};

const ID = /^[a-z0-9_-]{1,40}$/i;

function num(v: string | null, lo: number, hi: number): number | null {
  if (v === null || v.trim() === '') return null;
  const n = Number(v);
  return Number.isFinite(n) && n >= lo && n <= hi ? n : null;
}

const round = (n: number, d: number) => Number(n.toFixed(d));

export function serializeView(s: ViewState): string {
  const p = new URLSearchParams();
  if (s.mission) p.set('m', s.mission);
  if (s.ra !== null && s.dec !== null) {
    p.set('ra', String(round(s.ra, 6)));
    p.set('dec', String(round(s.dec, 6)));
  }
  if (s.group) p.set('g', s.group);
  p.set('mode', s.mode);
  p.set('f', String(s.frame));
  const ov = (['pred', 'meas', 'input'] as const).filter((k) => s.overlays[k]);
  p.set('ov', ov.length ? ov.join(',') : 'none');
  p.set('z', String(round(s.zoom, 2)));
  p.set('cx', String(round(s.cx, 2)));
  p.set('cy', String(round(s.cy, 2)));
  p.set('fps', String(s.fps));
  p.set('loop', s.loop ? '1' : '0');
  return p.toString();
}

/** Returns the parsed state plus whether the URL pinned a frame (then the player must not autoplay). */
export function parseView(search: string): { view: ViewState; hasFrame: boolean } {
  const p = new URLSearchParams(search);
  const v: ViewState = { ...DEFAULT_VIEW, overlays: { ...DEFAULT_VIEW.overlays } };
  const m = p.get('m');
  if (m && ID.test(m)) v.mission = m;
  const ra = num(p.get('ra'), 0, 360);
  const dec = num(p.get('dec'), -90, 90);
  if (ra !== null && dec !== null) {
    v.ra = ra;
    v.dec = dec;
  }
  const g = p.get('g');
  if (g && ID.test(g)) v.group = g;
  if (p.get('mode') === 'exp') v.mode = 'exp';
  const f = num(p.get('f'), 0, 100000);
  if (f !== null) v.frame = Math.floor(f);
  const ov = p.get('ov');
  if (ov !== null) {
    const set = new Set(ov.split(','));
    v.overlays = { pred: set.has('pred'), meas: set.has('meas'), input: set.has('input') };
  }
  v.zoom = num(p.get('z'), ZOOM_MIN, ZOOM_MAX) ?? v.zoom;
  v.cx = num(p.get('cx'), 0, 121) ?? v.cx;
  v.cy = num(p.get('cy'), 0, 121) ?? v.cy;
  const fps = num(p.get('fps'), 0, 100);
  if (fps !== null && (FPS_STEPS as readonly number[]).includes(fps)) v.fps = fps;
  if (p.get('loop') === '0') v.loop = false;
  return { view: v, hasFrame: f !== null };
}

interface ViewStore extends ViewState {
  playing: boolean;
  set: (patch: Partial<ViewState & { playing: boolean }>) => void;
}

export const useView = create<ViewStore>((set) => ({
  ...DEFAULT_VIEW,
  playing: false,
  set: (patch) => set(patch),
}));

export function viewOf(s: ViewStore): ViewState {
  const { mission, ra, dec, group, mode, frame, overlays, zoom, cx, cy, fps, loop } = s;
  return { mission, ra, dec, group, mode, frame, overlays, zoom, cx, cy, fps, loop };
}
