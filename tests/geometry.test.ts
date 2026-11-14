import { afterEach, describe, expect, it } from 'vitest';
import * as THREE from 'three';
import * as healpix from '@hscmap/healpix';
import { buildTileGeometry, disposeAllskyGeometries, getAllskyGeometry } from '@/components/sky/geometry';
import { eqToWorld, type Vec3 } from '@/lib/sky/coords';

afterEach(disposeAllskyGeometries);

describe('rendered HiPS orientation (offline geometric regression)', () => {
  it('maps rays to the same image position in detail and preview across all 12 HEALPix faces', () => {
    const preview = new THREE.Mesh(getAllskyGeometry(1728, 1856), new THREE.MeshBasicMaterial({ side: THREE.BackSide }));
    for (let face = 0; face < 12; face++) {
      for (const local of [0, 21, 63]) {
        const tile = face * 64 + local;
        const geometry = buildTileGeometry(3, tile);
        const detail = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ side: THREE.BackSide }));
        for (const [ne, nw] of [[0.25, 0.75], [0.75, 0.25]]) {
          const world = eqToWorld(healpix.pixcoord2vec_nest(8, tile, ne, nw) as Vec3);
          const ray = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(...world).normalize());
          const fine = ray.intersectObject(detail)[0];
          const coarse = ray.intersectObject(preview)[0];
          expect(fine).toBeDefined();
          expect(coarse).toBeDefined();
          // Independent image-pixel expectations: x follows nw, y follows ne.
          expect(fine.uv!.x).toBeCloseTo(nw, 5);
          expect(fine.uv!.y).toBeCloseTo(ne, 5);
          expect(coarse.uv!.x * 1728).toBeCloseTo((tile % 27) * 64 + 0.5 + nw * 63, 3);
          expect(coarse.uv!.y * 1856).toBeCloseTo(Math.floor(tile / 27) * 64 + 0.5 + ne * 63, 3);
        }
        geometry.dispose();
        (detail.material as THREE.Material).dispose();
      }
    }
    (preview.material as THREE.Material).dispose();
  });

  it.each([4, 5, 7, 9])('keeps order %i detail aligned with HEALPix directions and outward winding', (order) => {
    const nside = 2 ** order;
    for (let face = 0; face < 12; face++) {
      const tile = face * nside * nside + Math.floor(nside * nside / 3);
      const geometry = buildTileGeometry(order, tile);
      const mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ side: THREE.BackSide }));
      const direction = eqToWorld(healpix.pixcoord2vec_nest(nside, tile, 0.5, 0.5) as Vec3);
      const hits = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(...direction).normalize()).intersectObject(mesh);
      expect(hits.length).toBeGreaterThan(0);
      expect(hits[0].uv!.x).toBeCloseTo(0.5, 4);
      expect(hits[0].uv!.y).toBeCloseTo(0.5, 4);
      geometry.dispose();
      (mesh.material as THREE.Material).dispose();
    }
  });
});
