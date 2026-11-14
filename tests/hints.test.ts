import { describe, expect, it } from 'vitest';
import { FIELD_GUIDE, HINT, SURVEY_HINT } from '@/components/hud/hints';
import { SPHEREX_PRESETS, SURVEY_ORDER } from '@/lib/sky/surveys';

const MAX_LENGTH = 200; // "short description": a tooltip, not a paragraph

describe('interface hints', () => {
  it('keeps every hover description short and non-empty', () => {
    const all = [...Object.values(HINT), ...Object.values(SURVEY_HINT), ...SPHEREX_PRESETS.map((p) => p.hint)];
    for (const text of all) {
      expect(text.trim().length).toBeGreaterThan(10);
      expect(text.length).toBeLessThanOrEqual(MAX_LENGTH);
    }
  });

  it('describes every survey', () => {
    for (const id of SURVEY_ORDER) expect(SURVEY_HINT[id]).toBeTruthy();
  });

  it('gives the field guide a term and an explanation for every row', () => {
    const terms = FIELD_GUIDE.flatMap((s) => s.items.map(([term]) => term));
    expect(new Set(terms).size).toBe(terms.length);
    for (const section of FIELD_GUIDE) {
      expect(section.items.length).toBeGreaterThan(0);
      for (const [term, text] of section.items) {
        expect(term.length).toBeGreaterThan(0);
        expect(text.length).toBeGreaterThan(10);
      }
    }
  });
});
