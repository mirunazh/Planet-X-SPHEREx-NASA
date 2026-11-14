/**
 * Sphere patches for HEALPix cells. Each cell is subdivided into a grid whose
 * vertices lie exactly on the cell (pixcoord2vec_nest) and whose texture
 * coordinates follow the verified HiPS pixel orientation (see lib/sky/hips.ts).
 */
import * as THREE from 'three';
import * as healpix from '@hscmap/healpix';
import { type Vec3, cross, dot, eqToWorld, sub } from '@/lib/sky/coords';
import { ALLSKY_ORDER, allskyUv, tileUv } from '@/lib/sky/hips';

const segmentsFor = (order: number) => (order <= 3 ? 16 : order <= 5 ? 8 : order <= 7 ? 4 : 2);

function vertexAt(positions: Float32Array, k: number): Vec3 {
  return [positions[k * 3], positions[k * 3 + 1], positions[k * 3 + 2]];
}

/** Grid triangles for one cell, wound so they face outward (front faces seen from outside). */
function cellIndices(n: number, positions: Float32Array, base: number, out: number[]): void {
  const a = vertexAt(positions, base);
  const b = vertexAt(positions, base + n + 1);
  const c = vertexAt(positions, base + n + 2);
  const outward = dot(cross(sub(b, a), sub(c, a)), a) > 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      const p00 = base + i * (n + 1) + j;
      const p10 = base + (i + 1) * (n + 1) + j;
      const p11 = p10 + 1;
      const p01 = p00 + 1;
      if (outward) out.push(p00, p10, p11, p00, p11, p01);
      else out.push(p00, p11, p10, p00, p01, p11);
    }
  }
}

function fillCell(
  nside: number,
  ipix: number,
  n: number,
  positions: Float32Array,
  uvs: Float32Array,
  base: number,
  uvFor: (ne: number, nw: number) => [number, number],
): void {
  for (let i = 0; i <= n; i++) {
    for (let j = 0; j <= n; j++) {
      const ne = i / n;
      const nw = j / n;
      const k = base + i * (n + 1) + j;
      const w = eqToWorld(healpix.pixcoord2vec_nest(nside, ipix, ne, nw) as Vec3);
      positions[k * 3] = w[0];
      positions[k * 3 + 1] = w[1];
      positions[k * 3 + 2] = w[2];
      const [u, v] = uvFor(ne, nw);
      uvs[k * 2] = u;
      uvs[k * 2 + 1] = v;
    }
  }
}

export function buildTileGeometry(order: number, ipix: number): THREE.BufferGeometry {
  const n = segmentsFor(order);
  const count = (n + 1) * (n + 1);
  const positions = new Float32Array(count * 3);
  const uvs = new Float32Array(count * 2);
  fillCell(2 ** order, ipix, n, positions, uvs, 0, tileUv);
  const indices: number[] = [];
  cellIndices(n, positions, 0, indices);
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  g.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
  g.setIndex(indices);
  return g;
}

const allskyCache = new Map<string, THREE.BufferGeometry>();

/** One merged mesh for all 768 order-3 cells, textured from the Allsky mosaic. */
export function getAllskyGeometry(width: number, height: number): THREE.BufferGeometry {
  const key = `${width}x${height}`;
  const cached = allskyCache.get(key);
  if (cached) return cached;
  const nside = 2 ** ALLSKY_ORDER;
  const cells = 12 * nside * nside;
  const n = 8;
  const per = (n + 1) * (n + 1);
  const positions = new Float32Array(cells * per * 3);
  const uvs = new Float32Array(cells * per * 2);
  const indices: number[] = [];
  for (let tile = 0; tile < cells; tile++) {
    fillCell(nside, tile, n, positions, uvs, tile * per, (ne, nw) => allskyUv(tile, ne, nw, width, height));
    cellIndices(n, positions, tile * per, indices);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  g.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
  g.setIndex(indices);
  allskyCache.set(key, g);
  return g;
}
