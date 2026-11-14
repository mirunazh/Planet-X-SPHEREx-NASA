/** Memory-budgeted Allsky previews. One download/decode at a time; the displayed
 * preview and its requested replacement remain protected across layer swaps.
 */
import * as THREE from 'three';
import { ALLSKY_MEMORY_BUDGET, abortError, textureBytes } from './textureMemory';

export interface AllskyAsset {
  url: string;
  texture: THREE.Texture;
  bitmap: ImageBitmap;
  width: number;
  height: number;
}

interface PreviewEntry {
  url: string;
  promise: Promise<AllskyAsset>;
  resolve: (asset: AllskyAsset) => void;
  reject: (error: unknown) => void;
  lastUsed: number;
  controller?: AbortController;
  asset?: AllskyAsset;
  bytes: number;
}

export class AllskyCache {
  private entries = new Map<string, PreviewEntry>();
  private pinned = new Set<string>();
  private bytes = 0;
  private inflight = 0;
  private clock = 0;

  constructor(private readonly budget = ALLSKY_MEMORY_BUDGET) {}

  pin(urls: string[]): void {
    this.pinned = new Set(urls);
    for (const e of this.entries.values()) {
      if (!e.asset && !this.pinned.has(e.url)) this.remove(e);
    }
    this.pump();
  }

  load(url: string): Promise<AllskyAsset> {
    const hit = this.entries.get(url);
    if (hit) {
      hit.lastUsed = ++this.clock;
      return hit.promise;
    }
    let resolve!: PreviewEntry['resolve'];
    let reject!: PreviewEntry['reject'];
    const promise = new Promise<AllskyAsset>((yes, no) => { resolve = yes; reject = no; });
    this.entries.set(url, { url, promise, resolve, reject, bytes: 0, lastUsed: ++this.clock });
    this.pump();
    return promise;
  }

  private remove(e: PreviewEntry): void {
    if (this.entries.get(e.url) !== e) return;
    this.entries.delete(e.url);
    e.controller?.abort();
    if (e.asset) {
      e.asset.texture.dispose();
      e.asset.bitmap.close();
      this.bytes -= e.bytes;
    } else {
      e.reject(abortError());
    }
  }

  private makeRoom(bytes: number): boolean {
    let available = this.budget - this.bytes;
    const candidates = [...this.entries.values()]
      .filter((e) => e.asset && !this.pinned.has(e.url))
      .sort((a, b) => a.lastUsed - b.lastUsed);
    for (const e of candidates) available += e.bytes;
    if (bytes > available) return false;
    for (const e of candidates) {
      if (this.bytes + bytes <= this.budget) break;
      this.remove(e);
    }
    return true;
  }

  private pump(): void {
    if (this.inflight) return;
    // Latest requested preview first. There is no speculative preloading here.
    const next = [...this.entries.values()].filter((e) => !e.asset && !e.controller)
      .sort((a, b) => b.lastUsed - a.lastUsed)[0];
    if (next) void this.download(next);
  }

  private async download(e: PreviewEntry): Promise<void> {
    const controller = new AbortController();
    e.controller = controller;
    this.inflight++;
    const current = () => !controller.signal.aborted && this.entries.get(e.url) === e;
    let bitmap: ImageBitmap | undefined;
    try {
      const res = await fetch(e.url, { mode: 'cors', signal: controller.signal });
      if (!current()) return;
      if (!res.ok) throw new Error(`HTTP ${res.status} loading ${e.url}`);
      const blob = await res.blob();
      if (!current()) return;
      bitmap = await createImageBitmap(blob);
      if (!current()) return;
      const bytes = textureBytes(bitmap.width, bitmap.height, false);
      if (!this.makeRoom(bytes)) throw new Error('Sky preview exceeds the available image memory budget');
      const texture = new THREE.Texture(bitmap);
      texture.flipY = false;
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.generateMipmaps = false; // no bleeding between packed tiles
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.needsUpdate = true;
      e.asset = { url: e.url, texture, bitmap, width: bitmap.width, height: bitmap.height };
      e.bytes = bytes;
      this.bytes += bytes;
      bitmap = undefined;
      e.resolve(e.asset);
    } catch (error) {
      if (current()) {
        this.entries.delete(e.url);
        e.reject(error);
      }
    } finally {
      bitmap?.close();
      this.inflight--;
      this.pump();
    }
  }

  /** Release all resident images and abort pending work when the viewer leaves. */
  clear(): void {
    this.pinned.clear();
    for (const e of this.entries.values()) this.remove(e);
  }

  memoryStats(): { bytes: number; budget: number; inflight: number; entries: number } {
    return { bytes: this.bytes, budget: this.budget, inflight: this.inflight, entries: this.entries.size };
  }
}

export const allskyCache = new AllskyCache();
export const pinAllsky = (urls: string[]): void => allskyCache.pin(urls);
export const loadAllsky = (url: string): Promise<AllskyAsset> => allskyCache.load(url);
