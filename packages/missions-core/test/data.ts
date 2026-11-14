// Read-only access to the real assets in the team repo (absolute paths, never written).
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import type { Manifest, MissionId, ParallaxProduct } from '../src/manifest.js';

export const REPO = fileURLToPath(new URL('../../../', import.meta.url)).replace(/\/$/, '');
export const MISSIONS = `${REPO}/assets/missions`;

export const json = <T>(p: string): T => JSON.parse(readFileSync(p, 'utf8')) as T;
export const manifest = (id: MissionId): Manifest => json<Manifest>(`${MISSIONS}/${id}/manifest.json`);
export const parallaxProduct = (): ParallaxProduct =>
  json<ParallaxProduct>(`${REPO}/docs/research/experiments/exp13_parallax_epsindb.json`);

export function frame(id: MissionId, rel: string): Float32Array {
  const b = readFileSync(`${MISSIONS}/${id}/${rel}`);
  // copy into an aligned buffer: Node's pooled Buffers can start at an odd offset
  return new Float32Array(b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength));
}
