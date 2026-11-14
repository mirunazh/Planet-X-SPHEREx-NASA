'use client';

import { useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { HipsLayer } from './sky/HipsLayer';
import { GridLayer } from './sky/GridLayer';
import { PinsLayer } from './sky/PinsLayer';
import { GlobeRim, Navigator } from './sky/Navigator';
import { useSkyControls } from './useSkyControls';
import { Hud } from './hud/Hud';
import { applyUrlState, startUrlSync } from '@/lib/urlState';
import { loadPins } from '@/lib/pins';
import { useNav } from '@/lib/store';

function NoWebGL() {
  return (
    <div className="boot">
      <p>This viewer needs WebGL. Please use a recent version of Chrome, Edge, Firefox or Safari with hardware acceleration enabled.</p>
    </div>
  );
}

export default function SkyExplorer() {
  const stageRef = useRef<HTMLDivElement>(null);
  // Apply a deep link before the first frame renders.
  useState(() => {
    applyUrlState();
    return true;
  });
  useSkyControls(stageRef);

  useEffect(() => {
    void loadPins();
    // Development-only handle for debugging and end-to-end tests.
    if (process.env.NODE_ENV !== 'production') (window as unknown as { __nav?: typeof useNav }).__nav = useNav;
    return startUrlSync();
  }, []);

  return (
    <main className="explorer">
      <div
        ref={stageRef}
        className="stage"
        role="application"
        aria-label="Sky viewer. Drag to rotate, scroll to zoom, double-click to fly. Arrow keys pan, plus and minus zoom, Enter locks the target."
        tabIndex={0}
      >
        <Canvas
          flat
          dpr={[1, 2]}
          gl={{ antialias: true, powerPreference: 'high-performance' }}
          camera={{ fov: 40, near: 0.001, far: 50, position: [0, 0, 3] }}
          fallback={<NoWebGL />}
        >
          <color attach="background" args={['#03050b']} />
          <Navigator />
          <HipsLayer />
          <GlobeRim />
          <GridLayer />
          <PinsLayer />
        </Canvas>
      </div>
      <Hud />
    </main>
  );
}
