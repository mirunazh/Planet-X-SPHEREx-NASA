'use client';

/**
 * Renders the active NASA survey on the celestial sphere:
 *   1. the Allsky preview as a base layer (one request, whole sky),
 *   2. full-resolution HiPS tiles for the patch in view, at the order whose
 *      pixel matches a screen pixel, with lower-order tiles as fallback.
 * Meshes are managed imperatively to avoid React work in the render loop.
 */
import { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import * as healpix from '@hscmap/healpix';
import { useNav } from '@/lib/store';
import { type SkyLayer, requestedLayer, layerKey } from '@/lib/sky/layer';
import { LayerRequest } from '@/lib/sky/layerRequest';
import { SURVEYS } from '@/lib/sky/surveys';
import { allskyUrl, tileUrl } from '@/lib/sky/hips';
import { type Mode, pixelScaleDeg, tileOrderFor, visibleRadiusDeg } from '@/lib/sky/view';
import { DEG, type Vec3, angularDistance, normalize } from '@/lib/sky/coords';
import { tileStore } from './TileStore';
import { allskyCache, loadAllsky, pinAllsky } from './allsky';
import { buildTileGeometry, disposeAllskyGeometries, getAllskyGeometry } from './geometry';

const MAX_TILES = 72;
const PLAN_INTERVAL_MS = 90;

const sideFor = (mode: Mode) => (mode === 'sky' ? THREE.BackSide : THREE.FrontSide);

function tileMaterial(map: THREE.Texture, mode: Mode, gain: number): THREE.MeshBasicMaterial {
  const material = new THREE.MeshBasicMaterial({ map, side: sideFor(mode), depthTest: false, depthWrite: false, toneMapped: false });
  material.color.setScalar(gain);
  return material;
}

function disposeMesh(mesh: THREE.Mesh, disposeGeometry = true): void {
  if (disposeGeometry) mesh.geometry.dispose();
  (mesh.material as THREE.Material).dispose();
}

export function HipsLayer() {
  const group = useMemo(() => new THREE.Group(), []);
  const allskyMesh = useRef<THREE.Mesh | null>(null);
  const tileMeshes = useRef(new Map<string, THREE.Mesh>());
  const renderKeys = useRef(new Set<string>());
  const wantedKeys = useRef(new Set<string>());
  const lastPlan = useRef(-Infinity);
  const displayed = useRef<SkyLayer | null>(null);

  const surveyId = useNav((s) => s.surveyId);
  const frame = useNav((s) => SURVEYS[s.surveyId].isCube ? s.frame : 0);
  const revision = useNav((s) => s.layerRevision);
  const mode = useNav((s) => s.mode);
  const rawPixels = useNav((s) => s.rawPixels);
  const gain = useNav((s) => s.gain);

  useEffect(() => {
    group.traverse((obj) => {
      const mesh = obj as THREE.Mesh;
      if (mesh.isMesh) (mesh.material as THREE.MeshBasicMaterial).color.setScalar(gain);
    });
  }, [gain, group]);

  const transition = useMemo(() => new LayerRequest({
    requested: () => requestedLayer(useNav.getState()),
    revision: () => useNav.getState().layerRevision,
    load: (layer: SkyLayer) => loadAllsky(allskyUrl(SURVEYS[layer.surveyId], layer.frame)),
    loading: () => useNav.setState({ allskyStatus: 'loading' }),
    commit: (asset, layer) => {
      const st = useNav.getState();
      asset.texture.magFilter = st.rawPixels ? THREE.NearestFilter : THREE.LinearFilter;
      asset.texture.needsUpdate = true;
      const mesh = new THREE.Mesh(getAllskyGeometry(asset.width, asset.height), tileMaterial(asset.texture, st.mode, st.gain));
      mesh.renderOrder = 1;
      mesh.frustumCulled = false;
      // One synchronous swap: no frame can contain an old-band tile over a
      // new-band preview. Until this point all geometry uses the displayed band.
      for (const tile of tileMeshes.current.values()) {
        group.remove(tile);
        disposeMesh(tile);
      }
      tileMeshes.current.clear();
      renderKeys.current.clear();
      wantedKeys.current.clear();
      tileStore.retain(new Set());
      lastPlan.current = -Infinity;
      if (allskyMesh.current) {
        group.remove(allskyMesh.current);
        disposeMesh(allskyMesh.current, false);
      }
      allskyMesh.current = mesh;
      group.add(mesh);
      displayed.current = layer;
      pinAllsky([asset.url]);
      useNav.setState({ displayedLayer: layer, allskyStatus: 'ready', activeOrder: null });
    },
    error: (error) => {
      console.error('[hips] Allsky load failed', error);
      useNav.setState({ allskyStatus: 'error' });
    },
  }), [group]);

  useEffect(() => {
    const layer = requestedLayer(useNav.getState());
    const previous = displayed.current;
    pinAllsky([
      allskyUrl(SURVEYS[layer.surveyId], layer.frame),
      ...(previous ? [allskyUrl(SURVEYS[previous.surveyId], previous.frame)] : []),
    ]);
    transition.request(layer);
    return () => transition.cancel();
  }, [surveyId, frame, revision, transition]);

  // Inside the sphere we see back faces, outside we see front faces.
  useEffect(() => {
    group.traverse((obj) => {
      const mesh = obj as THREE.Mesh;
      if (!mesh.isMesh) return;
      const mat = mesh.material as THREE.MeshBasicMaterial;
      mat.side = sideFor(mode);
      mat.needsUpdate = true;
    });
  }, [mode, group]);

  useEffect(() => {
    tileStore.setNearest(rawPixels);
    const map = (allskyMesh.current?.material as THREE.MeshBasicMaterial | undefined)?.map;
    if (map) {
      map.magFilter = rawPixels ? THREE.NearestFilter : THREE.LinearFilter;
      map.needsUpdate = true;
    }
  }, [rawPixels]);

  useEffect(
    () => () => {
      for (const mesh of tileMeshes.current.values()) {
        group.remove(mesh);
        disposeMesh(mesh);
      }
      tileMeshes.current.clear();
      if (allskyMesh.current) {
        group.remove(allskyMesh.current);
        disposeMesh(allskyMesh.current, false);
      }
      allskyMesh.current = null;
      displayed.current = null;
      renderKeys.current.clear();
      wantedKeys.current.clear();
      tileStore.clear();
      allskyCache.clear();
      disposeAllskyGeometries();
      useNav.setState({ displayedLayer: null, activeOrder: null });
    },
    [],
  );

  useFrame((state) => {
    const st = useNav.getState();
    const layer = displayed.current;
    if (!layer) return;
    const survey = SURVEYS[layer.surveyId];
    const frameIdx = layer.frame;
    const now = performance.now();

    if (now - lastPlan.current > PLAN_INTERVAL_MS) {
      lastPlan.current = now;
      const view = { mode: st.mode, center: st.center, fov: st.fov, distance: st.distance };
      const aspect = state.size.width / Math.max(1, state.size.height);
      const scale = pixelScaleDeg(view, state.size.height * state.viewport.dpr);
      let order = tileOrderFor(scale, survey.maxOrder);
      const keys = new Set<string>();
      const wanted = new Set<string>();
      const center = normalize(st.center);
      const radius = Math.min(89, visibleRadiusDeg(view, aspect)) * DEG;
      let cells: number[] = [];
      // Coarsen until the view fits the tile budget; if even order 3 does not fit,
      // the view is wide enough that the Allsky preview is the right layer.
      while (order !== null) {
        cells = [];
        healpix.query_disc_inclusive_nest(2 ** order, center, radius, (p) => cells.push(p));
        if (cells.length <= MAX_TILES) break;
        order = order > 3 ? order - 1 : null;
      }
      if (order !== null) {
        const prefix = layerKey(layer);
        // Already-loaded coarser tiles fill the gaps while finer ones arrive.
        for (let o = 3; o < order; o++) {
          healpix.query_disc_inclusive_nest(2 ** o, center, radius, (p) => {
            const key = `${prefix}${o}|${p}`;
            if (tileStore.peek(key)?.status === 'loaded') {
              keys.add(key);
              wanted.add(key);
              tileStore.touch(key);
            }
          });
        }
        for (const ipix of cells) {
          const key = `${prefix}${order}|${ipix}`;
          const priority = angularDistance(healpix.pix2vec_nest(2 ** order, ipix) as Vec3, center);
          tileStore.request(key, tileUrl(survey, order, ipix, frameIdx), priority, order, ipix);
          wanted.add(key);
          if (tileStore.peek(key)?.status === 'loaded') keys.add(key);
        }
      }
      renderKeys.current = keys;
      wantedKeys.current = wanted;
      if (st.activeOrder !== order) useNav.setState({ activeOrder: order });
    }

    // Sync meshes with the plan.
    const meshes = tileMeshes.current;
    const keys = renderKeys.current;
    for (const [key, mesh] of meshes) {
      if (keys.has(key)) continue;
      group.remove(mesh);
      disposeMesh(mesh);
      meshes.delete(key);
    }
    for (const key of keys) {
      if (meshes.has(key)) continue;
      const entry = tileStore.peek(key);
      if (!entry?.texture) continue;
      const mesh = new THREE.Mesh(buildTileGeometry(entry.order, entry.ipix), tileMaterial(entry.texture, st.mode, st.gain));
      mesh.renderOrder = 10 + entry.order;
      mesh.frustumCulled = false;
      group.add(mesh);
      meshes.set(key, mesh);
    }
    // Unprotect old textures only after their meshes have been detached. New
    // completed tiles are protected by wantedKeys until the next planning pass.
    tileStore.retain(wantedKeys.current, new Set(meshes.keys()));
    tileStore.pump();
  });

  return <primitive object={group} />;
}
