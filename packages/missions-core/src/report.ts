/**
 * A student's result as a shareable link: "mission-report/1", JSON in base64url.
 * No accounts and no personal data: the report has no free text and nothing that names the
 * student (users include minors). decodeReport is a trust boundary: it receives arbitrary
 * text from a URL, validates every field and returns a typed error instead of throwing.
 */
import { MISSION_GROUPS, MISSION_IDS } from './manifest.js';
import type { MissionId } from './manifest.js';

export const REPORT_VERSION = 'mission-report/1';
export const MAX_ENCODED_LENGTH = 4096;
export const MAX_FRAMES = 16;
export const MAX_CLICKS = 64;

/** Quantities a report may carry, with sane ranges (inclusive). */
export const QUANTITIES = {
  rateArcsecPerYear: [0, 100],
  paDeg: [0, 360],
  parallaxMas: [0, 10000],
  distancePc: [0, 1e7],
  speedKmS: [0, 1e6],
  ratio: [0, 1000],
} as const;
export type Quantity = keyof typeof QUANTITIES;
export type Numbers = Partial<Record<Quantity, number>>;

export interface Click {
  pass: number; // pass index in the group
  x: number; // grid pixel
  y: number;
}

export interface MissionReport {
  v: typeof REPORT_VERSION;
  mission: MissionId;
  group: string;
  frames: number[]; // pass indices shown to the student
  clicks: Click[];
  derived: Numbers; // the student's numbers
  truth: { pipeline: Numbers; literature: Numbers }; // what they were compared with
  app: string; // app version, "major.minor.patch"
}

export type DecodeErrorCode =
  | 'not-text'
  | 'too-long'
  | 'bad-encoding'
  | 'bad-json'
  | 'bad-version'
  | 'unknown-mission'
  | 'unknown-group'
  | 'bad-field';

export type DecodeResult =
  | { ok: true; report: MissionReport }
  | { ok: false; error: { code: DecodeErrorCode; path?: string } };

export function encodeReport(r: MissionReport): string {
  const bytes = new TextEncoder().encode(JSON.stringify(r));
  let bin = '';
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

class Invalid extends Error {
  constructor(readonly code: DecodeErrorCode, readonly path?: string) {
    super(code);
  }
}

export function decodeReport(text: unknown): DecodeResult {
  try {
    return { ok: true, report: parse(text) };
  } catch (e) {
    if (e instanceof Invalid) return { ok: false, error: e.path ? { code: e.code, path: e.path } : { code: e.code } };
    return { ok: false, error: { code: 'bad-field' } };
  }
}

function parse(text: unknown): MissionReport {
  if (typeof text !== 'string') throw new Invalid('not-text');
  if (text.length > MAX_ENCODED_LENGTH) throw new Invalid('too-long');
  if (!/^[A-Za-z0-9_-]+$/.test(text) || text.length % 4 === 1) throw new Invalid('bad-encoding');
  let json: string;
  try {
    const bin = atob(text.replace(/-/g, '+').replace(/_/g, '/') + '='.repeat((4 - (text.length % 4)) % 4));
    json = new TextDecoder('utf-8', { fatal: true }).decode(Uint8Array.from(bin, (c) => c.charCodeAt(0)));
  } catch {
    throw new Invalid('bad-encoding');
  }
  let o: unknown;
  try {
    o = JSON.parse(json);
  } catch {
    throw new Invalid('bad-json');
  }
  const r = obj(o, '', ['v', 'mission', 'group', 'frames', 'clicks', 'derived', 'truth', 'app']);
  if (r.v !== REPORT_VERSION) throw new Invalid('bad-version');
  if (!MISSION_IDS.includes(r.mission as MissionId)) throw new Invalid('unknown-mission');
  const mission = r.mission as MissionId;
  if (typeof r.group !== 'string' || !MISSION_GROUPS[mission].includes(r.group)) throw new Invalid('unknown-group');
  const frames = arr(r.frames, 'frames', MAX_FRAMES).map((f, i) => passIndex(f, `frames.${i}`));
  const clicks = arr(r.clicks, 'clicks', MAX_CLICKS).map((c, i) => {
    const q = obj(c, `clicks.${i}`, ['pass', 'x', 'y']);
    return { pass: passIndex(q.pass, `clicks.${i}.pass`), x: num(q.x, `clicks.${i}.x`, -1, 121), y: num(q.y, `clicks.${i}.y`, -1, 121) };
  });
  const t = obj(r.truth, 'truth', ['pipeline', 'literature']);
  if (typeof r.app !== 'string' || !/^\d{1,4}\.\d{1,4}\.\d{1,4}$/.test(r.app)) throw new Invalid('bad-field', 'app');
  return {
    v: REPORT_VERSION,
    mission,
    group: r.group,
    frames,
    clicks,
    derived: numbers(r.derived, 'derived'),
    truth: { pipeline: numbers(t.pipeline, 'truth.pipeline'), literature: numbers(t.literature, 'truth.literature') },
    app: r.app,
  };
}

/** A plain object whose keys are all in `allowed` (and, unless optional, all present). */
function obj(v: unknown, path: string, allowed: readonly string[], optional = false): Record<string, unknown> {
  if (typeof v !== 'object' || v === null || Array.isArray(v)) throw new Invalid('bad-field', path || undefined);
  const keys = Object.keys(v);
  for (const k of keys) if (!allowed.includes(k)) throw new Invalid('bad-field', path ? `${path}.${k}` : k);
  if (!optional) for (const k of allowed) if (!keys.includes(k)) throw new Invalid('bad-field', path ? `${path}.${k}` : k);
  return v as Record<string, unknown>;
}

function arr(v: unknown, path: string, max: number): unknown[] {
  if (!Array.isArray(v) || v.length > max) throw new Invalid('bad-field', path);
  return v;
}

function num(v: unknown, path: string, lo: number, hi: number): number {
  if (typeof v !== 'number' || !Number.isFinite(v) || v < lo || v > hi) throw new Invalid('bad-field', path);
  return v;
}

function passIndex(v: unknown, path: string): number {
  const n = num(v, path, 0, MAX_FRAMES - 1);
  if (!Number.isInteger(n)) throw new Invalid('bad-field', path);
  return n;
}

function numbers(v: unknown, path: string): Numbers {
  const o = obj(v, path, Object.keys(QUANTITIES), true);
  const out: Numbers = {};
  for (const k of Object.keys(o) as Quantity[]) out[k] = num(o[k], `${path}.${k}`, QUANTITIES[k][0], QUANTITIES[k][1]);
  return out;
}
