import { describe, expect, it } from 'vitest';
import { adjacentLayer, allowsPrefetch, FrameQuality, renderDpr, streamProfile } from '@/lib/sky/streaming';

function sample(quality: FrameQuality, fps: number, seconds: number) {
  for (let i = 0; i < fps * seconds; i++) quality.sample(1 / fps);
}

describe('streaming policy', () => {
  it('keeps compact screens conservative in portrait and landscape', () => {
    expect(streamProfile(390, 844)).toEqual(streamProfile(844, 390));
    expect(streamProfile(390, 844)).toMatchObject({ maxTiles: 40, uploadsPerFrame: 1, haloTiles: 2 });
    expect(streamProfile(1600, 900)).toMatchObject({ maxTiles: 64, uploadsPerFrame: 2, haloTiles: 6 });
  });

  it('caps rendering by device density, device profile and total pixels', () => {
    expect(renderDpr(390, 844, 3)).toBe(1.25);
    expect(renderDpr(1600, 900, 1)).toBe(1);
    for (const [width, height, dpr] of [[390, 844, 3], [1600, 900, 2], [3840, 2160, 2], [7680, 4320, 2]]) {
      const actual = renderDpr(width, height, dpr);
      expect(width * height * actual ** 2).toBeLessThanOrEqual(streamProfile(width, height).maxPixels + 0.001);
      expect(actual).toBeLessThanOrEqual(dpr);
    }
    expect(renderDpr(1600, 900, 2, 0.65)).toBeCloseTo(renderDpr(1600, 900, 2) * 0.65);
  });

  it('skips blank channels and never wraps or prefetches another survey', () => {
    expect(adjacentLayer({ surveyId: 'spherex', frame: 49 })).toEqual({ surveyId: 'spherex', frame: 52 });
    expect(adjacentLayer({ surveyId: 'spherex', frame: 101 })).toEqual({ surveyId: 'spherex', frame: 100 });
    expect(adjacentLayer({ surveyId: 'twomass', frame: 0 })).toBeNull();
    expect(adjacentLayer({ surveyId: 'allwise', frame: 0 })).toBeNull();
  });

  it('respects data saving and very slow connections', () => {
    expect(allowsPrefetch({ saveData: true, effectiveType: '4g' })).toBe(false);
    expect(allowsPrefetch({ effectiveType: '2g' })).toBe(false);
    expect(allowsPrefetch({ effectiveType: 'slow-2g' })).toBe(false);
    expect(allowsPrefetch({ effectiveType: '4g' })).toBe(true);
    expect(allowsPrefetch()).toBe(true);
  });

  it('lowers resolution after sustained slow frames and recovers gradually with hysteresis', () => {
    const quality = new FrameQuality();
    sample(quality, 30, 1); expect(quality.quality).toBe(1);
    sample(quality, 30, 2); expect(quality.quality).toBeCloseTo(0.85);
    sample(quality, 30, 12); expect(quality.quality).toBe(0.65);
    sample(quality, 60, 3); expect(quality.quality).toBe(0.65);
    sample(quality, 60, 5); expect(quality.quality).toBeGreaterThan(0.65);
    sample(quality, 60, 40); expect(quality.quality).toBe(1);
  });

  it('ignores isolated stalls/tab suspension and does not oscillate on middling frame times', () => {
    const quality = new FrameQuality();
    for (let i = 0; i < 5; i++) { sample(quality, 60, 1); quality.sample(10); }
    expect(quality.quality).toBe(1);
    sample(quality, 50, 20); expect(quality.quality).toBe(1);
    sample(quality, 30, 3);
    quality.sample(1); // start a fresh observation window after the slow period
    const reduced = quality.quality;
    sample(quality, 50, 20); expect(quality.quality).toBe(reduced);
  });
});
