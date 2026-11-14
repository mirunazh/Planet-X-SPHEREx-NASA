import { describe, expect, it } from 'vitest';
import { missionScript, missionFacts, MISSION_ORDER, STEP_ORDER, TIER_TEXT, REASON_TEXT, SOURCE_TEXT, FLAG_TEXT, PITCH } from '../src/content/missions.js';
import type { MissionScript } from '../src/content/missions.js';
import { GLOSSARY } from '../src/content/glossary.js';
import { MISSION_GROUPS, MISSION_IDS } from '../src/manifest.js';
import type { Manifest, MissionId } from '../src/manifest.js';
import { json, manifest, MISSIONS, parallaxProduct } from './data.js';

const P = parallaxProduct();
const script = (m: Manifest) => missionScript(m, m.id === 'epsindb' ? P : undefined);
const texts = (s: MissionScript) => [s.title, s.tagline, ...s.steps.flatMap((t) => [t.instruction, t.hint, t.explain])];
const allStrings = (v: unknown): string[] =>
  typeof v === 'string' ? [v] : Array.isArray(v) ? v.flatMap(allStrings) : v && typeof v === 'object' ? Object.values(v).flatMap(allStrings) : [];

describe('content', () => {
  it('every mission id and group exists in assets/missions/index.json', () => {
    const idx = json<{ missions: { id: string; groups: string[] }[] }>(`${MISSIONS}/index.json`);
    expect(new Set(idx.missions.map((m) => m.id))).toEqual(new Set(MISSION_IDS));
    expect(new Set(MISSION_ORDER)).toEqual(new Set(MISSION_IDS));
    for (const m of idx.missions) expect(MISSION_GROUPS[m.id as MissionId]).toEqual(m.groups);
  });

  it('each script runs Watch, Measure, Hunt, Report in that order, every step complete', () => {
    for (const id of MISSION_IDS) {
      const s = script(manifest(id));
      const kinds = s.steps.map((t) => t.kind);
      expect([...new Set(kinds)], id).toEqual(STEP_ORDER);
      for (let i = 1; i < kinds.length; i++) expect(STEP_ORDER.indexOf(kinds[i]!)).toBeGreaterThanOrEqual(STEP_ORDER.indexOf(kinds[i - 1]!));
      for (const t of s.steps) for (const k of ['instruction', 'hint', 'explain'] as const) expect(t[k].length, `${id}.${t.id}.${k}`).toBeGreaterThan(10);
      for (const x of texts(s)) expect(x, id).not.toMatch(/undefined|NaN|Infinity/);
    }
  });

  it('no number in a script is typed by hand: removing the manifest-derived values leaves no digit', () => {
    for (const id of MISSION_IDS) {
      const m = manifest(id);
      const facts = Object.values(missionFacts(m, id === 'epsindb' ? P : undefined)).sort((a, b) => b.length - a.length);
      for (const x of texts(script(m))) {
        let rest = x;
        for (const f of facts) rest = rest.split(f).join('');
        expect(rest, `${id}: "${x}"`).not.toMatch(/\d/);
      }
    }
  });

  it('the text follows the data: change a manifest or exp13 value and the script changes', () => {
    const bump = (id: MissionId, edit: (m: Manifest) => void, expectText: string) => {
      const m = manifest(id);
      const before = texts(script(m)).join('\n');
      edit(m);
      const after = texts(script(m)).join('\n');
      expect(after, id).not.toEqual(before);
      expect(after, id).toContain(expectText);
    };
    bump('epsindb', (m) => { (m.truth as { rateArcsecPerYear: number }).rateArcsecPerYear = 4.1234; }, '4.12 arcseconds per year');
    bump('barnard', (m) => { (m.truth as { literature: { pmArcsecPerYear: number } }).literature.pmArcsecPerYear = 11.5; }, 'published value is 11.50');
    bump('wise0855', (m) => { (m.truth as { motionArcsec: { total: number } }).motionArcsec.total = 7.777; }, 'we measured 7.8');
    bump('rwaur', (m) => { m.series!.matchedWavelength!.ratios[0]!.ratio = 1.6789; }, '1.68 times as bright');
    bump('rdra', (m) => { m.series!.lightCurve!.rmsMag = 0.4444; }, 'whole spread of 0.44');
    // the parallax product drives the distance step
    const m = manifest('epsindb');
    const p2 = structuredClone(P);
    p2.best_fit_pm_fixed.distance_pc = 3.5;
    expect(texts(missionScript(m, p2)).join('\n')).toContain('3.50 plus or minus');
    expect(texts(missionScript(m, P)).join('\n')).toContain('306 milliarcseconds, plus or minus 28');
  });

  it('no em dash anywhere; glossary entries are 30 words or fewer and unique', () => {
    const everything = [
      ...MISSION_IDS.flatMap((id) => texts(script(manifest(id)))),
      ...allStrings([TIER_TEXT, REASON_TEXT, SOURCE_TEXT, FLAG_TEXT, PITCH, GLOSSARY]),
    ];
    for (const s of everything) expect(s.includes(String.fromCharCode(0x2014)), s).toBe(false);
    expect(GLOSSARY.length).toBeGreaterThanOrEqual(25);
    const words = GLOSSARY.map((g) => [g.term, g.text.split(/\s+/).filter(Boolean).length] as const);
    for (const [term, n] of words) expect(n, term).toBeLessThanOrEqual(30);
    expect(new Set(GLOSSARY.map((g) => g.term)).size).toBe(GLOSSARY.length);
    console.log(`[content] glossary ${GLOSSARY.length} terms, longest ${Math.max(...words.map((w) => w[1]))} words`);
  });
});
