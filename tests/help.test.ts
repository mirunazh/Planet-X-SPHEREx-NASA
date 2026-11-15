import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { GLOSSARY, HELP, HELP_SCREEN_IDS, type HelpScreenId } from '@/content/help';
import { placeCallout, placeTooltip, spotlightBox } from '@/components/help/placement';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const SCREENS = HELP_SCREEN_IDS.map((id) => HELP[id]);

/** Sentences end with . ! or ? followed by a space; decimals such as 0.75 stay whole. */
function sentences(text: string): string[] {
  return text
    .split(/(?<=[.!?])\s+/)
    .map((sentence) => sentence.trim())
    .filter(Boolean);
}

function wordCount(sentence: string): number {
  return sentence.split(/\s+/).filter(Boolean).length;
}

/** Every piece of help copy a visitor can read, labelled for readable failures. */
function allCopy(): { where: string; text: string }[] {
  const copy: { where: string; text: string }[] = [];
  for (const screen of SCREENS) {
    copy.push({ where: `${screen.id} title`, text: screen.title });
    screen.science.paragraphs.forEach((text, i) => copy.push({ where: `${screen.id} paragraph ${i + 1}`, text }));
    screen.science.sources.forEach((source) => copy.push({ where: `${screen.id} source`, text: source.label }));
    for (const step of screen.steps) {
      copy.push({ where: `${screen.id} step ${step.tour} title`, text: step.title });
      copy.push({ where: `${screen.id} step ${step.tour}`, text: step.text });
    }
  }
  for (const entry of GLOSSARY) {
    copy.push({ where: `glossary ${entry.term}`, text: entry.term });
    copy.push({ where: `glossary ${entry.term}`, text: entry.definition });
  }
  return copy;
}

/** Text of the repository's own files (help content excluded), to check where cited URLs come from. */
function repositoryText(): string {
  const parts: string[] = [];
  for (const dir of ['src', 'docs', join('public', 'data')]) {
    const base = join(ROOT, dir);
    for (const entry of readdirSync(base, { recursive: true, encoding: 'utf8' })) {
      const path = join(base, entry);
      const normalised = path.replaceAll('\\', '/');
      if (normalised.includes('/src/content/help/') || !/\.(ts|tsx|md|json)$/.test(normalised)) continue;
      if (statSync(path).isFile()) parts.push(readFileSync(path, 'utf8'));
    }
  }
  return parts.join('\n');
}

describe('help screens', () => {
  it('has one screen per id, keyed by its own id', () => {
    expect([...Object.keys(HELP)].sort()).toEqual([...HELP_SCREEN_IDS].sort());
    for (const id of HELP_SCREEN_IDS) expect(HELP[id].id).toBe(id);
  });

  it('gives every screen a title, science paragraphs and steps', () => {
    for (const screen of SCREENS) {
      expect(screen.title.trim(), screen.id).not.toBe('');
      expect(screen.science.paragraphs.length, screen.id).toBeGreaterThan(0);
      expect(screen.steps.length, screen.id).toBeGreaterThan(0);
      for (const paragraph of screen.science.paragraphs) expect(paragraph.trim(), screen.id).not.toBe('');
    }
  });

  it('gives the navigator three short science paragraphs', () => {
    expect(HELP.navigator.science.paragraphs).toHaveLength(3);
  });

  it('points every step at a data-tour id, once per screen', () => {
    for (const screen of SCREENS) {
      const tours = screen.steps.map((step) => step.tour);
      expect(new Set(tours).size, screen.id).toBe(tours.length);
      for (const step of screen.steps) {
        expect(step.tour, `${screen.id}: ${step.title}`).toMatch(/^[a-z][a-z0-9-]*$/);
        expect(step.title.trim(), step.tour).not.toBe('');
        expect(step.text.trim(), step.tour).not.toBe('');
      }
    }
  });

  it('keeps the tour ids the pages are built with, in tour order', () => {
    const expected: Record<HelpScreenId, string[]> = {
      navigator: ['sky', 'next-step', 'dock-telescope'],
      intro: ['intro-sky', 'intro-cta'],
      compare: ['compare-filters', 'compare-viewer', 'compare-controls', 'compare-list'],
      challenge: ['challenge-status', 'challenge-viewer', 'challenge-browse'],
    };
    for (const id of HELP_SCREEN_IDS) expect(HELP[id].steps.map((step) => step.tour), id).toEqual(expected[id]);
  });
});

describe('help copy', () => {
  it('never claims a discovery', () => {
    for (const { where, text } of allCopy()) {
      expect(text, where).not.toMatch(/discover/i);
      expect(text, where).not.toMatch(/you found a new/i);
    }
  });

  it('keeps every sentence under 25 words', () => {
    for (const { where, text } of allCopy()) {
      for (const sentence of sentences(text)) expect(wordCount(sentence), `${where}: "${sentence}"`).toBeLessThan(25);
    }
  });

  it('keeps paragraphs, steps and definitions to at most three sentences', () => {
    const blocks = [
      ...SCREENS.flatMap((screen) => screen.science.paragraphs),
      ...SCREENS.flatMap((screen) => screen.steps.map((step) => step.text)),
      ...GLOSSARY.map((entry) => entry.definition),
    ];
    for (const block of blocks) expect(sentences(block).length, block).toBeLessThanOrEqual(3);
  });

  it('explains the words the screens rely on', () => {
    const terms = GLOSSARY.map((entry) => entry.term.toLowerCase());
    for (const term of ['infrared', 'wavelength', 'light-year', 'galaxy', 'milky way', 'telescope survey', 'exoplanet', 'field of view', 'ra and dec']) {
      expect(terms).toContain(term);
    }
    expect(new Set(terms).size).toBe(terms.length);
    for (const entry of GLOSSARY) expect(entry.definition.trim(), entry.term).not.toBe('');
  });
});

describe('help sources', () => {
  const sources = SCREENS.flatMap((screen) => screen.science.sources.map((source) => ({ screen: screen.id, ...source })));

  it('links only to https addresses', () => {
    for (const source of sources) {
      expect(source.url, source.label).toMatch(/^https:\/\//);
      expect(() => new URL(source.url), source.url).not.toThrow();
      expect(source.label.trim(), source.url).not.toBe('');
    }
  });

  it('cites only URLs the repository already uses', () => {
    const text = repositoryText();
    for (const source of sources) expect(text.includes(source.url), `${source.screen}: ${source.url}`).toBe(true);
  });

  it('does not repeat a source within a screen', () => {
    for (const screen of SCREENS) {
      const urls = screen.science.sources.map((source) => source.url);
      expect(new Set(urls).size, screen.id).toBe(urls.length);
    }
  });
});

describe('tour and hint placement', () => {
  const viewport = { width: 1000, height: 800 };
  const card = { width: 300, height: 160 };

  it('grows the spotlight around its target', () => {
    expect(spotlightBox({ top: 100, left: 200, width: 50, height: 40 }, viewport)).toEqual({ top: 94, left: 194, width: 62, height: 52 });
  });

  it('keeps the ring of a full-screen target inside the viewport', () => {
    expect(spotlightBox({ top: 0, left: 0, width: 1000, height: 800 }, viewport)).toEqual({ top: 4, left: 4, width: 992, height: 792 });
  });

  it('drops the spotlight for a target that is off screen', () => {
    expect(spotlightBox({ top: 900, left: 100, width: 50, height: 40 }, viewport)).toBeNull();
  });

  it('puts the callout below a small target when there is room', () => {
    expect(placeCallout({ top: 100, left: 400, width: 100, height: 40 }, card, viewport)).toEqual({ top: 154, left: 300, placement: 'below' });
  });

  it('puts the callout above a target near the bottom', () => {
    expect(placeCallout({ top: 700, left: 400, width: 100, height: 60 }, card, viewport)).toEqual({ top: 526, left: 300, placement: 'above' });
  });

  it('keeps the callout inside the screen edges', () => {
    const placed = placeCallout({ top: 100, left: 960, width: 30, height: 30 }, card, viewport);
    expect(placed.placement).toBe('below');
    expect(placed.left).toBe(1000 - 300 - 12);
  });

  it('centres the callout over a full-screen target or when nothing is lit', () => {
    expect(placeCallout({ top: 4, left: 4, width: 992, height: 792 }, card, viewport)).toEqual({ top: 320, left: 350, placement: 'center' });
    expect(placeCallout(null, card, viewport).placement).toBe('center');
  });

  it('puts the callout beside a tall target', () => {
    const placed = placeCallout({ top: 40, left: 20, width: 250, height: 720 }, card, viewport);
    expect(placed).toEqual({ top: 320, left: 284, placement: 'right' });
  });

  it('falls back to the screen edge farther from a target that fills the middle', () => {
    const narrow = { width: 400, height: 800 };
    const placed = placeCallout({ top: 40, left: 20, width: 360, height: 300 }, { width: 376, height: 600 }, narrow);
    expect(placed.placement).toBe('bottom');
    expect(placed.top).toBe(800 - 600 - 12);
  });

  it('shows a tooltip above its control, or below when there is no room', () => {
    const tip = { width: 200, height: 40 };
    expect(placeTooltip({ top: 300, left: 400, width: 100, height: 44 }, tip, viewport)).toEqual({ top: 252, left: 350, placement: 'above' });
    expect(placeTooltip({ top: 10, left: 400, width: 100, height: 44 }, tip, viewport)).toEqual({ top: 62, left: 350, placement: 'below' });
    expect(placeTooltip({ top: 300, left: 0, width: 40, height: 40 }, tip, viewport).left).toBe(8);
  });
});
