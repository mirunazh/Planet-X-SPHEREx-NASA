/** Memory-budgeted Allsky previews. One download/decode at a time; the displayed
 * preview and its requested replacement remain protected across layer swaps.
 */
import * as THREE from 'three';
import { ALLSKY_MEMORY_BUDGET, abortError, textureBytes } from './textureMemory';
import { downloadImage } from './imageDownload';

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
  speculative: boolean;
}

export class AllskyCache {
  private entries = new Map<string, PreviewEntry>();
  private pinned = new Set<string>();
  private bytes = 0;
  private inflight = 0;
  private clock = 0;
  private prefetchUrl: string | null = null;

  constructor(private readonly budget = ALLSKY_MEMORY_BUDGET) {}

  pin(urls: string[]): void {
    this.pinned = new Set(urls);
    this.prefetchUrl = null;
    for (const e of this.entries.values()) {
      if (!e.asset && !this.pinned.has(e.url)) this.remove(e);
    }
    this.pump();
  }

  load(url: string): Promise<AllskyAsset> {
    return this.enqueue(url, false);
  }

  /** One adjacent preview, only when it fits beside the resident images.
   * Failed/skipped background work never affects the visible layer's status.
   */
  prefetch(url: string | null, referenceUrl?: string): void {
    if (url === this.prefetchUrl) return;
    this.prefetchUrl = url;
    for (const e of this.entries.values()) {
      if (e.speculative && !e.asset && e.url !== url && !this.pinned.has(e.url)) this.remove(e);
    }
    if (!url || this.entries.has(url)) return;
    const reference = referenceUrl ? this.entries.get(referenceUrl) : undefined;
    if (!reference?.asset || this.bytes + reference.bytes > this.budget) return;
    if ([...this.entries.values()].some((e) => !e.asset && !e.speculative)) return;
    void this.enqueue(url, true).catch(() => {});
  }

  private enqueue(url: string, speculative: boolean): Promise<AllskyAsset> {
    const hit = this.entries.get(url);
    if (hit) {
      hit.lastUsed = ++this.clock;
      if (!speculative) hit.speculative = false;
      return hit.promise;
    }
    let resolve!: PreviewEntry['resolve'];
    let reject!: PreviewEntry['reject'];
    const promise = new Promise<AllskyAsset>((yes, no) => { resolve = yes; reject = no; });
    this.entries.set(url, { url, promise, resolve, reject, speculative, bytes: 0, lastUsed: ++this.clock });
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

  private makeRoom(bytes: number, speculative: boolean): boolean {
    if (speculative) return this.bytes + bytes <= this.budget;
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
    // Foreground first; one slot bounds preview download/decode work.
    const next = [...this.entries.values()].filter((e) => !e.asset && !e.controller)
      .sort((a, b) => Number(a.speculative) - Number(b.speculative) || b.lastUsed - a.lastUsed)[0];
    if (next) void this.download(next);
  }

  private async download(e: PreviewEntry): Promise<void> {
    const controller = new AbortController();
    e.controller = controller;
    this.inflight++;
    const current = () => !controller.signal.aborted && this.entries.get(e.url) === e;
    let bitmap: ImageBitmap | undefined;
    try {
      const blob = await downloadImage(e.url, controller.signal);
      if (!current()) return;
      if (!blob) throw new Error('Sky preview is missing');
      bitmap = await createImageBitmap(blob);
      if (!current()) return;
      const bytes = textureBytes(bitmap.width, bitmap.height, false);
      if (!this.makeRoom(bytes, e.speculative)) throw new Error('Sky preview exceeds the available image memory budget');
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
    this.prefetchUrl = null;
    for (const e of this.entries.values()) this.remove(e);
  }

  memoryStats(): { bytes: number; budget: number; inflight: number; entries: number } {
    return { bytes: this.bytes, budget: this.budget, inflight: this.inflight, entries: this.entries.size };
  }
}

export const allskyCache = new AllskyCache();
export const pinAllsky = (urls: string[]): void => allskyCache.pin(urls);
export const loadAllsky = (url: string): Promise<AllskyAsset> => allskyCache.load(url);
