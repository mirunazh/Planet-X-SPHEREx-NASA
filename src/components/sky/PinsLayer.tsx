'use client';

/** Exoplanet host stars (NASA Exoplanet Archive) and featured targets as GPU points. */
import { useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { type Pin, useNav } from '@/lib/store';
import { eqToWorld } from '@/lib/sky/coords';
import { pointMaterial, syncOverlayUniforms } from './shaders';

function pointsGeometry(pins: Pin[]): THREE.BufferGeometry {
  const positions = new Float32Array(pins.length * 3);
  pins.forEach((p, i) => positions.set(eqToWorld(p.vec), i * 3));
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  return g;
}

export function PinsLayer() {
  const hosts = useNav((s) => s.hosts);
  const targets = useNav((s) => s.targets);
  const showHosts = useNav((s) => s.showHosts);
  const showTargets = useNav((s) => s.showTargets);
  const hovered = useNav((s) => s.hovered);
  const selected = useNav((s) => s.selected);
  const highlight = hovered ?? selected;

  const hostGeometry = useMemo(() => pointsGeometry(hosts), [hosts]);
  const targetGeometry = useMemo(() => pointsGeometry(targets), [targets]);
  const highlightGeometry = useMemo(() => pointsGeometry(highlight ? [highlight] : []), [highlight]);
  const materials = useMemo(
    () => ({
      host: pointMaterial('#ffb547', 5, 0.85, false),
      target: pointMaterial('#7fe3ff', 20, 0.95, true),
      highlight: pointMaterial('#ffffff', 30, 1, true),
    }),
    [],
  );

  useEffect(() => () => hostGeometry.dispose(), [hostGeometry]);
  useEffect(() => () => targetGeometry.dispose(), [targetGeometry]);
  useEffect(() => () => highlightGeometry.dispose(), [highlightGeometry]);
  useEffect(() => () => Object.values(materials).forEach((m) => m.dispose()), [materials]);

  useFrame((state) => {
    const outside = useNav.getState().mode === 'globe';
    for (const m of Object.values(materials)) syncOverlayUniforms(m, state.camera, outside, state.viewport.dpr);
  });

  return (
    <>
      {showHosts && hosts.length > 0 && (
        <points geometry={hostGeometry} material={materials.host} renderOrder={200} frustumCulled={false} />
      )}
      {showTargets && targets.length > 0 && (
        <points geometry={targetGeometry} material={materials.target} renderOrder={201} frustumCulled={false} />
      )}
      {highlight && (
        <points geometry={highlightGeometry} material={materials.highlight} renderOrder={202} frustumCulled={false} />
      )}
    </>
  );
}
