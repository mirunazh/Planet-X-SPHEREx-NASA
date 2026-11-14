/**
 * HiPS "Allsky" previews: one image holding all 768 order-3 tiles at 64 px.
 * A single request paints the whole globe. Kept in a small LRU cache because
 * each SPHEREx wavelength has its own Allsky image.
 */
import * as THREE from 'three';

export interface AllskyAsset {
  url: string;
  texture: THREE.Texture;
  bitmap: ImageBitmap;
  width: number;
  height: number;
}

const MAX_ENTRIES = 8;
const pending = new Map<string, Promise<AllskyAsset>>();
const ready = new Map<string, AllskyAsset>();
const pinned: string[] = [];

/** Marks an Allsky URL as on screen so eviction never frees it while visible. */
export function pinAllsky(url: string): void {
  const i = pinned.indexOf(url);
  if (i >= 0) pinned.splice(i, 1);
  pinned.unshift(url);
  pinned.length = Math.min(pinned.length, 2);
}

export function loadAllsky(url: string): Promise<AllskyAsset> {
  const hit = pending.get(url);
  if (hit) {
    pending.delete(url);
    pending.set(url, hit);
    return hit;
  }
  const promise = (async () => {
    const res = await fetch(url, { mode: 'cors' });
    if (!res.ok) throw new Error(`HTTP ${res.status} loading ${url}`);
    const bitmap = await createImageBitmap(await res.blob());
    const texture = new THREE.Texture(bitmap);
    texture.flipY = false;
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.generateMipmaps = false; // mipmaps would bleed between the packed tiles
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.needsUpdate = true;
    const asset = { url, texture, bitmap, width: bitmap.width, height: bitmap.height };
    ready.set(url, asset);
    return asset;
  })();
  promise.catch(() => pending.delete(url));
  pending.set(url, promise);
  trim();
  return promise;
}

function trim(): void {
  for (const url of [...pending.keys()]) {
    if (pending.size <= MAX_ENTRIES) return;
    if (pinned.includes(url)) continue;
    pending.delete(url);
    const asset = ready.get(url);
    if (asset) {
      asset.texture.dispose();
      asset.bitmap.close();
      ready.delete(url);
    }
  }
}
