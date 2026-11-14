/**
 * HiPS tile cache: prioritised, concurrency-limited loading straight from IRSA
 * (CORS-enabled, never mirrored), off-main-thread decoding via createImageBitmap,
 * retry with backoff, and LRU eviction that frees GPU memory.
 */
import * as THREE from 'three';

export type TileStatus = 'queued' | 'loading' | 'loaded' | 'missing' | 'error';

export interface TileEntry {
  key: string;
  url: string;
  order: number;
  ipix: number;
  status: TileStatus;
  priority: number;
  lastUsed: number;
  attempts: number;
  retryAt: number;
  texture?: THREE.Texture;
  bitmap?: ImageBitmap;
}

const MAX_INFLIGHT = 8;
const MAX_ENTRIES = 360;
const MAX_ATTEMPTS = 3;

class TileStore {
  private entries = new Map<string, TileEntry>();
  private inflight = 0;
  private nearest = false;
  version = 0;

  peek(key: string): TileEntry | undefined {
    return this.entries.get(key);
  }

  touch(key: string): void {
    const e = this.entries.get(key);
    if (e) e.lastUsed = performance.now();
  }

  request(key: string, url: string, priority: number, order: number, ipix: number): void {
    const now = performance.now();
    const e = this.entries.get(key);
    if (!e) {
      this.entries.set(key, { key, url, order, ipix, status: 'queued', priority, lastUsed: now, attempts: 0, retryAt: 0 });
      return;
    }
    e.priority = priority;
    e.lastUsed = now;
    if (e.status === 'error' && e.attempts < MAX_ATTEMPTS && now >= e.retryAt) e.status = 'queued';
  }

  /** Drops queued requests that the current view no longer needs. */
  retain(wanted: Set<string>): void {
    for (const [key, e] of this.entries) if (e.status === 'queued' && !wanted.has(key)) this.entries.delete(key);
  }

  pump(): void {
    while (this.inflight < MAX_INFLIGHT) {
      let best: TileEntry | undefined;
      for (const e of this.entries.values()) {
        if (e.status === 'queued' && (!best || e.priority < best.priority)) best = e;
      }
      if (!best) return;
      void this.load(best);
    }
  }

  private async load(e: TileEntry): Promise<void> {
    e.status = 'loading';
    e.attempts++;
    this.inflight++;
    try {
      const res = await fetch(e.url, { mode: 'cors' });
      if (res.status === 404) {
        e.status = 'missing'; // outside the survey footprint
        return;
      }
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const bitmap = await createImageBitmap(await res.blob());
      if (this.entries.get(e.key) !== e) {
        bitmap.close();
        return;
      }
      const texture = new THREE.Texture(bitmap);
      texture.flipY = false;
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.generateMipmaps = true;
      texture.minFilter = THREE.LinearMipmapLinearFilter;
      texture.magFilter = this.nearest ? THREE.NearestFilter : THREE.LinearFilter;
      texture.anisotropy = 4;
      texture.needsUpdate = true;
      e.texture = texture;
      e.bitmap = bitmap;
      e.status = 'loaded';
    } catch (err) {
      e.status = 'error';
      e.retryAt = performance.now() + 1500 * 2 ** e.attempts;
      if (e.attempts >= MAX_ATTEMPTS) console.warn('[tiles] giving up on', e.url, err);
    } finally {
      this.inflight--;
      this.version++;
      this.evict();
    }
  }

  private evict(): void {
    if (this.entries.size <= MAX_ENTRIES) return;
    const cutoff = performance.now() - 2000;
    const candidates = [...this.entries.values()]
      .filter((e) => e.status !== 'loading' && e.lastUsed < cutoff)
      .sort((a, b) => a.lastUsed - b.lastUsed);
    for (const e of candidates) {
      if (this.entries.size <= MAX_ENTRIES) break;
      e.texture?.dispose();
      e.bitmap?.close();
      this.entries.delete(e.key);
    }
  }

  /** "Raw pixels" view: nearest-neighbour magnification shows the survey's true pixels. */
  setNearest(nearest: boolean): void {
    this.nearest = nearest;
    for (const e of this.entries.values()) {
      if (!e.texture) continue;
      e.texture.magFilter = nearest ? THREE.NearestFilter : THREE.LinearFilter;
      e.texture.needsUpdate = true;
    }
  }

  stats(): { pending: number; failed: number; loaded: number } {
    let pending = 0;
    let failed = 0;
    let loaded = 0;
    for (const e of this.entries.values()) {
      if (e.status === 'queued' || e.status === 'loading') pending++;
      else if (e.status === 'error' && e.attempts >= MAX_ATTEMPTS) failed++;
      else if (e.status === 'loaded') loaded++;
    }
    return { pending, failed, loaded };
  }
}

export const tileStore = new TileStore();
