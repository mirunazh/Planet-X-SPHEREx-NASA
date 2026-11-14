'use client';

import { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { FrameQuality, renderDpr } from '@/lib/sky/streaming';

/** Keep the canvas and tile planner on the same actual rendering resolution. */
export function RenderQuality() {
  const width = useThree((s) => s.size.width);
  const height = useThree((s) => s.size.height);
  const setDpr = useThree((s) => s.setDpr);
  const quality = useRef(new FrameQuality());

  useEffect(() => {
    const apply = () => setDpr(renderDpr(width, height, window.devicePixelRatio || 1, quality.current.quality));
    apply();
    window.addEventListener('resize', apply);
    return () => window.removeEventListener('resize', apply);
  }, [width, height, setDpr]);

  useFrame((state, delta) => {
    const next = quality.current.sample(delta);
    if (next !== null) setDpr(renderDpr(state.size.width, state.size.height, window.devicePixelRatio || 1, next));
  });
  return null;
}
