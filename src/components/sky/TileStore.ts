/** Memory-budgeted HiPS cache. Visible/planned textures are protected; obsolete
 * work is cancelled, including results returned after abort by a decoder.
 */
import * as THREE from 'three';
import { TILE_MEMORY_BUDGET, textureBytes } from './textureMemory';

export type TileStatus = 'queued' | 'loading' | 'loaded' | 'missing' | 'error' | 'deferred';

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
  bytes?: number;
  controller?: AbortController;
  texture?: THREE.Texture;
  bitmap?: ImageBitmap;
}

const MAX_ATTEMPTS = 3;

export class TileStore {
  private entries = new Map<string, TileEntry>();
  private wanted = new Set<string>();
  private visible = new Set<string>();
  private inflight = 0;
  private bytes = 0;
  private nearest = false;
  version = 0;

  constructor(private readonly budget = TILE_MEMORY_BUDGET, private readonly concurrency = 6) {}

  peek(key: string): TileEntry | undefined { return this.entries.get(key); }

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

  /** Call after detaching obsolete meshes. Wanted includes incoming/fallback tiles. */
  retain(wanted: Set<string>, visible = new Set<string>()): void {
    this.wanted = new Set(wanted);
    this.visible = new Set(visible);
    for (const [key, e] of this.entries) {
      if (!wanted.has(key) && !visible.has(key) && e.status !== 'loaded') this.remove(e);
    }
  }

  pump(): void {
    while (this.inflight < this.concurrency) {
      let best: TileEntry | undefined;
      for (const e of this.entries.values()) {
        // A full protected working set uses the preview for remaining detail.
        // Do not repeatedly download tiles that cannot fit until the view changes.
        if (e.status === 'deferred' && this.canFit(e.bytes ?? 0)) e.status = 'queued';
        if (e.status === 'queued' && this.wanted.has(e.key) && (!best || e.priority < best.priority)) best = e;
      }
      if (!best) return;
      void this.load(best);
    }
  }

  private protected(e: TileEntry): boolean { return this.wanted.has(e.key) || this.visible.has(e.key); }

  private canFit(bytes: number): boolean {
    let available = this.budget - this.bytes;
    for (const e of this.entries.values()) if (e.status === 'loaded' && !this.protected(e)) available += e.bytes ?? 0;
    return bytes <= available;
  }

  private makeRoom(bytes: number): boolean {
    if (!this.canFit(bytes)) return false;
    const candidates = [...this.entries.values()]
      .filter((e) => e.status === 'loaded' && !this.protected(e))
      .sort((a, b) => a.lastUsed - b.lastUsed);
    for (const e of candidates) {
      if (this.bytes + bytes <= this.budget) break;
      this.remove(e);
    }
    return true;
  }

  private remove(e: TileEntry): void {
    if (this.entries.get(e.key) !== e) return;
    this.entries.delete(e.key);
    e.controller?.abort();
    if (e.texture) {
      e.texture.dispose();
      e.bitmap?.close();
      this.bytes -= e.bytes ?? 0;
      e.texture = undefined;
      e.bitmap = undefined;
    }
    this.version++;
  }

  private async load(e: TileEntry): Promise<void> {
    const controller = new AbortController();
    e.controller = controller;
    e.status = 'loading';
    e.attempts++;
    this.inflight++;
    const current = () => !controller.signal.aborted && this.entries.get(e.key) === e;
    let bitmap: ImageBitmap | undefined;
    try {
      const res = await fetch(e.url, { mode: 'cors', signal: controller.signal });
      if (!current()) return;
      if (res.status === 404) { e.status = 'missing'; return; }
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const blob = await res.blob();
      if (!current()) return;
      bitmap = await createImageBitmap(blob);
      if (!current()) return;
      e.bytes = textureBytes(bitmap.width, bitmap.height, true);
      if (!this.makeRoom(e.bytes)) {
        e.status = 'deferred';
        e.attempts = 0;
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
      bitmap = undefined; // ownership passes to the cache
      this.bytes += e.bytes;
      e.status = 'loaded';
    } catch (err) {
      if (current()) {
        e.status = 'error';
        e.retryAt = performance.now() + 1500 * 2 ** e.attempts;
        if (e.attempts >= MAX_ATTEMPTS) console.warn('[tiles] giving up on', e.url, err);
      }
    } finally {
      bitmap?.close();
      e.controller = undefined;
      this.inflight--;
      this.version++;
    }
  }

  /** Detach meshes before clearing. In-flight slots stay occupied until settled. */
  clear(): void {
    this.wanted.clear();
    this.visible.clear();
    for (const e of this.entries.values()) this.remove(e);
  }

  setNearest(nearest: boolean): void {
    this.nearest = nearest;
    for (const e of this.entries.values()) {
      if (!e.texture) continue;
      e.texture.magFilter = nearest ? THREE.NearestFilter : THREE.LinearFilter;
      e.texture.needsUpdate = true;
    }
  }

  stats(prefix?: string): { pending: number; failed: number; loaded: number } {
    let pending = 0;
    let failed = 0;
    let loaded = 0;
    for (const e of this.entries.values()) {
      if (prefix !== undefined && !e.key.startsWith(prefix)) continue;
      if (e.status === 'queued' || e.status === 'loading') pending++;
      else if (e.status === 'error' && e.attempts >= MAX_ATTEMPTS) failed++;
      else if (e.status === 'loaded') loaded++;
    }
    return { pending, failed, loaded };
  }

  memoryStats(): { bytes: number; budget: number; inflight: number; entries: number } {
    return { bytes: this.bytes, budget: this.budget, inflight: this.inflight, entries: this.entries.size };
  }
}

export const tileStore = new TileStore();
