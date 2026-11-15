import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { BODY_IMAGES, INTRO_IMAGE_SOURCES, SKY_BACKDROP } from '@/components/intro/imagery';
import { backdropSize, computeLayout } from '@/components/intro/orrery';
import { PLANET_ORDER } from '@/lib/sky/planets';

const PUBLIC = fileURLToPath(new URL('../public', import.meta.url));

interface ManifestEntry {
  credit: string;
  source: string;
  page: string;
  processing: string[];
  globeFraction?: number;
  discFraction?: number;
  projection?: { size: number; edgeDeg: number; pxPerUnitRadius: number };
}

const manifest = JSON.parse(readFileSync(`${PUBLIC}/intro/sources.json`, 'utf8')) as { files: Record<string, ManifestEntry> };
const fileName = (src: string) => src.replace('/intro/', '');

describe('intro imagery', () => {
  it('has a picture for the Sun and every planet', () => {
    expect(Object.keys(BODY_IMAGES).sort()).toEqual(['sun', ...PLANET_ORDER].sort());
  });

  it('ships every picture it draws, each with provenance from a NASA source', () => {
    for (const src of [...Object.values(BODY_IMAGES).map((b) => b.src), SKY_BACKDROP.src]) {
      expect(existsSync(`${PUBLIC}${src}`), src).toBe(true);
      const entry = manifest.files[fileName(src)];
      expect(entry, src).toBeDefined();
      expect(entry.credit, src).toMatch(/NASA/);
      expect(entry.source, src).toMatch(/^https:\/\/([a-z-]+\.)*(nasa\.gov|caltech\.edu)\//);
      expect(entry.processing.length, src).toBeGreaterThan(0);
    }
  });

  it('matches the geometry the build script measured', () => {
    expect(1 / BODY_IMAGES.sun.extent).toBeCloseTo(manifest.files['sun.png'].discFraction ?? NaN, 3);
    expect(1 / BODY_IMAGES.saturn.extent).toBeCloseTo(manifest.files['saturn.png'].globeFraction ?? NaN, 3);
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
