import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { INTRO_IMAGE_SOURCES, SKY_BACKDROP } from '@/components/intro/imagery';

const PUBLIC = fileURLToPath(new URL('../public', import.meta.url));
const manifest = JSON.parse(readFileSync(`${PUBLIC}/intro/sources.json`, 'utf8'));

describe('SPHEREx introduction imagery', () => {
  it('ships only the recorded SPHEREx projection and preserves provenance', () => {
    expect(Object.keys(manifest.files)).toEqual([SKY_BACKDROP.src.replace('/intro/', '')]);
    expect(existsSync(`${PUBLIC}${SKY_BACKDROP.src}`)).toBe(true);
    const entry = Object.values(manifest.files)[0] as { mission: string; source: string; processing: string[]; projection: { size: number; edgeDeg: number } };
    expect(entry.mission).toBe('SPHEREx');
    expect(entry.source).toContain('/SPHEREx/spherex_allsky_cube');
    expect(entry.processing.length).toBeGreaterThan(0);
    expect(entry.projection).toMatchObject({ size: SKY_BACKDROP.size, edgeDeg: SKY_BACKDROP.edgeDeg });
    for (const source of INTRO_IMAGE_SOURCES) expect(source.url).toMatch(/^https:\/\/irsa\.ipac\.caltech\.edu\//);
  });
});
