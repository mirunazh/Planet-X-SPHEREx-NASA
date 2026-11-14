import { type SkyLayer } from './layer';
import { SPHEREX_FRAMES } from './surveys';

export const PREFETCH_IDLE_MS = 650;

/** Small screens (including landscape phones) use a smaller working set. */
export function streamProfile(width: number, height: number) {
  const compact = Math.min(width, height) < 720;
  return {
    compact,
    maxTiles: compact ? 40 : 64,
    uploadsPerFrame: compact ? 1 : 2,
    haloTiles: compact ? 2 : 6,
    maxDpr: compact ? 1.25 : 1.75,
    maxPixels: compact ? 1_000_000 : 3_000_000,
  };
}

export function renderDpr(width: number, height: number, deviceDpr: number, quality = 1): number {
  const profile = streamProfile(width, height);
  const pixelCap = Math.sqrt(profile.maxPixels / Math.max(1, width * height));
  return Math.min(Math.max(0.5, deviceDpr), profile.maxDpr, pixelCap) * quality;
}

export interface NetworkHints { saveData?: boolean; effectiveType?: string }
export function allowsPrefetch(hints?: NetworkHints): boolean {
  return !hints?.saveData && hints?.effectiveType !== 'slow-2g' && hints?.effectiveType !== '2g';
}

/** A single usable adjacent cube channel; never wraps or selects blank channels. */
export function adjacentLayer(layer: SkyLayer): SkyLayer | null {
  if (layer.surveyId !== 'spherex') return null;
  for (const direction of [1, -1]) {
    for (let frame = layer.frame + direction; frame >= 0 && frame < SPHEREX_FRAMES.length; frame += direction) {
      if (!SPHEREX_FRAMES[frame].blank) return { surveyId: layer.surveyId, frame };
    }
  }
  return null;
}

/** Two-second windows avoid chasing individual slow frames. Recovery needs six
 * seconds of headroom; tab suspension/very long pauses do not affect quality.
 */
export class FrameQuality {
  private elapsed = 0;
  private frames = 0;
  private fastWindows = 0;
  quality = 1;

  sample(deltaSeconds: number): number | null {
    if (deltaSeconds <= 0 || deltaSeconds > 0.15) {
      this.elapsed = 0; this.frames = 0; this.fastWindows = 0;
      return null;
    }
    this.elapsed += deltaSeconds;
    this.frames++;
    if (this.elapsed < 2) return null;
    const meanMs = this.elapsed * 1000 / this.frames;
    this.elapsed = 0; this.frames = 0;
    const previous = this.quality;
    if (meanMs > 24) {
      this.quality = Math.max(0.65, this.quality - 0.15);
      this.fastWindows = 0;
    } else if (meanMs < 18) {
      if (++this.fastWindows >= 3) {
        this.quality = Math.min(1, this.quality + 0.1);
        this.fastWindows = 0;
      }
    } else this.fastWindows = 0;
    return this.quality === previous ? null : this.quality;
  }
}
