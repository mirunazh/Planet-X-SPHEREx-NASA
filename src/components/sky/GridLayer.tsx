'use client';

/** Equatorial grid plus the celestial equator, ecliptic and galactic plane. */
import { useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useNav } from '@/lib/store';
import { type GreatCircle, type Vec3, eqToWorld, greatCircle, radecToVec } from '@/lib/sky/coords';
import { lineMaterial, syncOverlayUniforms } from './shaders';

function segmentsFromPolyline(points: Vec3[], out: number[]): void {
  for (let i = 0; i < points.length - 1; i++) {
    out.push(...eqToWorld(points[i]), ...eqToWorld(points[i + 1]));
  }
}

function gridPositions(): Float32Array {
  const out: number[] = [];
  for (let h = 0; h < 24; h++) {
    const line: Vec3[] = [];
    for (let dec = -80; dec <= 80; dec += 2) line.push(radecToVec(h * 15, dec));
    segmentsFromPolyline(line, out);
  }
  for (let dec = -80; dec <= 80; dec += 10) {
    if (dec === 0) continue;
    const line: Vec3[] = [];
    for (let ra = 0; ra <= 360; ra += 2) line.push(radecToVec(ra, dec));
    segmentsFromPolyline(line, out);
  }
  return new Float32Array(out);
}

function circlePositions(kind: GreatCircle): Float32Array {
  const out: number[] = [];
  segmentsFromPolyline(greatCircle(kind, 360), out);
  return new Float32Array(out);
}

const geometryFrom = (positions: Float32Array) => {
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  return g;
};

export function GridLayer() {
  const show = useNav((s) => s.showGrid);
  const layers = useMemo(
    () => [
      { key: 'grid', geometry: geometryFrom(gridPositions()), material: lineMaterial('#86a3d1', 0.2), order: 100 },
      { key: 'equator', geometry: geometryFrom(circlePositions('equator')), material: lineMaterial('#a8c7f2', 0.45), order: 101 },
      { key: 'ecliptic', geometry: geometryFrom(circlePositions('ecliptic')), material: lineMaterial('#f2b84f', 0.55), order: 102 },
      { key: 'galactic', geometry: geometryFrom(circlePositions('galactic')), material: lineMaterial('#62d9c7', 0.5), order: 103 },
    ],
    [],
  );

  useEffect(
    () => () => {
      for (const l of layers) {
        l.geometry.dispose();
        l.material.dispose();
      }
    },
    [layers],
  );

  useFrame((state) => {
    const outside = useNav.getState().mode === 'globe';
    for (const l of layers) syncOverlayUniforms(l.material, state.camera, outside, state.viewport.dpr);
  });

  if (!show) return null;
  return (
    <>
      {layers.map((l) => (
        <lineSegments key={l.key} geometry={l.geometry} material={l.material} renderOrder={l.order} frustumCulled={false} />
      ))}
    </>
  );
}
