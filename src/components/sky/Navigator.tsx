'use client';

/** Drives the camera from the view state and advances queued animations every frame. */
import { useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useNav } from '@/lib/store';
import { runAnimations } from '@/lib/navigation';
import { cameraBasis } from '@/lib/sky/view';

export function Navigator() {
  const camera = useThree((s) => s.camera) as THREE.PerspectiveCamera;
  const width = useThree((s) => s.size.width);
  const height = useThree((s) => s.size.height);
  const dpr = useThree((s) => s.viewport.dpr);

  useEffect(() => {
    useNav.getState().setViewport({ width, height, dpr });
  }, [width, height, dpr]);

  useEffect(() => {
    camera.near = 0.001;
    camera.far = 50;
    camera.updateProjectionMatrix();
  }, [camera]);

  useFrame(() => {
    runAnimations(performance.now());
    const st = useNav.getState();
    const b = cameraBasis({ mode: st.mode, center: st.center, fov: st.fov, distance: st.distance });
    camera.position.set(b.position[0], b.position[1], b.position[2]);
    camera.up.set(b.up[0], b.up[1], b.up[2]);
    camera.lookAt(b.position[0] + b.forward[0], b.position[1] + b.forward[1], b.position[2] + b.forward[2]);
    if (Math.abs(camera.fov - b.fov) > 1e-9) {
      camera.fov = b.fov;
      camera.updateProjectionMatrix();
    }
  });

  return null;
}
