import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { BODY_SHAPES, INTRO_CREDIT_LINE, INTRO_IMAGE_SOURCES, SATURN_RINGS, SATURN_RINGS_INNER, SKY_BACKDROP } from '@/components/intro/imagery';
import { backdropSize, computeLayout } from '@/components/intro/orrery';
import { PLANET_ORDER } from '@/lib/sky/planets';

const PUBLIC = fileURLToPath(new URL('../public', import.meta.url));

interface ManifestEntry {
  credit: string;
  source: string;
  page: string;
  processing: string[];
  mission?: string;
  projection?: { size: number; edgeDeg: number; pxPerUnitRadius: number };
}

const manifest = JSON.parse(readFileSync(`${PUBLIC}/intro/sources.json`, 'utf8')) as { files: Record<string, ManifestEntry> };
const fileName = (src: string) => src.replace('/intro/', '');

describe('intro imagery', () => {
  it('draws a shape for the Sun and every planet, with the rings of Saturn outside its globe', () => {
    expect(Object.keys(BODY_SHAPES).sort()).toEqual(['sun', ...PLANET_ORDER].sort());
    expect(SATURN_RINGS_INNER).toBeGreaterThan(1);
    expect(SATURN_RINGS).toBeGreaterThan(SATURN_RINGS_INNER);
    expect(BODY_SHAPES.saturn.reach).toBe(SATURN_RINGS);
  });

  it('ships only SPHEREx imagery (the project scope), with provenance', () => {
    expect(Object.values(manifest.files).map((f) => f.mission)).toEqual(['SPHEREx']);
    expect(INTRO_CREDIT_LINE).toMatch(/SPHEREx/);
    expect(INTRO_CREDIT_LINE).not.toMatch(/SDO|Cassini|Voyager|MESSENGER|Mariner|DSCOVR|Viking/);
    for (const src of [SKY_BACKDROP.src]) {
      expect(existsSync(`${PUBLIC}${src}`), src).toBe(true);
      const entry = manifest.files[fileName(src)];
      expect(entry, src).toBeDefined();
      expect(entry.credit, src).toMatch(/NASA/);
      expect(entry.source, src).toMatch(/^https:\/\/([a-z-]+\.)*(nasa\.gov|caltech\.edu)\//);
      expect(entry.processing.length, src).toBeGreaterThan(0);
    }
  });

  it('matches the geometry the build script measured', () => {
    const sky = manifest.files[fileName(SKY_BACKDROP.src)].projection;
    expect(sky?.size).toBe(SKY_BACKDROP.size);
    expect(sky?.edgeDeg).toBe(SKY_BACKDROP.edgeDeg);
    expect(SKY_BACKDROP.pxPerUnitRadius).toBeCloseTo(sky?.pxPerUnitRadius ?? NaN, 3);
  });

  it('keeps the stereographic scale consistent with the edge angle', () => {
    const edgeRad = (SKY_BACKDROP.edgeDeg * Math.PI) / 180;
    expect(SKY_BACKDROP.pxPerUnitRadius * 2 * Math.tan(edgeRad / 2)).toBeCloseTo(SKY_BACKDROP.size / 2, 1);
  });

  it('credits every picture with a working https link', () => {
    for (const source of INTRO_IMAGE_SOURCES) {
      expect(source.url, source.label).toMatch(/^https:\/\//);
      expect(() => new URL(source.url), source.url).not.toThrow();
      expect(source.text.trim(), source.label).not.toBe('');
    }
  });
});

describe('backdropSize', () => {
  const screens: [number, number][] = [
    [1440, 900],
    [375, 812],
    [800, 512],
    [2560, 1440],
  ];

  it('reaches every corner of the overlay from the Sun', () => {
    for (const [w, h] of screens) {
      const layout = computeLayout(w, h, { x: 16, y: 120, w: w * 0.6, h: h * 0.6 });
      const half = backdropSize(layout) / 2;
      for (const [x, y] of [
        [0, 0],
        [w, 0],
        [0, h],
        [w, h],
      ]) {
        expect(Math.abs(x - layout.cx), `${w}x${h}`).toBeLessThanOrEqual(half);
        expect(Math.abs(y - layout.cy), `${w}x${h}`).toBeLessThanOrEqual(half);
      }
    }
  });

  it('never shrinks the sky below five orrery radii', () => {
    const layout = computeLayout(400, 400, { x: 0, y: 0, w: 400, h: 400 });
    expect(backdropSize(layout)).toBeGreaterThanOrEqual(5 * layout.radius);
  });
});
