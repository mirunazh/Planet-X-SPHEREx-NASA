'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useNav } from '@/lib/store';
import { vecToRadec } from '@/lib/sky/coords';
import { comparisonUrl, cropPixels, initialCropSize } from '@/lib/comparison/region';
import { cancelAnimations } from '@/lib/navigation';

export function CropSelector() {
  const [open, setOpen] = useState(false);
  const [size, setSize] = useState(10);
  const fov = useNav((s) => s.fov);
  const viewport = useNav((s) => s.viewport);
  const center = useNav((s) => s.center);
  const router = useRouter();
  const pixels = cropPixels(size, fov, viewport.height);
  const position = vecToRadec(center);
  return <>
    <button className="btn" id="compare-images" aria-expanded={open} aria-controls="crop-selector" onClick={() => {
      setSize(initialCropSize(fov, viewport.width / Math.max(1, viewport.height)));
      setOpen((value) => !value);
    }}>Compare images</button>
    {open && <>
      <div className="comparison-crop" aria-hidden="true" style={{ width: pixels, height: pixels }} />
      <section className="crop-selector panel" id="crop-selector" aria-label="Choose comparison region">
        <h2>Choose a sky region</h2>
        <p className="small muted">Pan the sky to position the square. The crop follows the screen centre.</p>
        <p className="mono small">ICRS {position.ra.toFixed(5)}°, {position.dec.toFixed(5)}°</p>
        <label htmlFor="crop-size">Square width <output>{size.toFixed(1)}′</output></label>
        <input id="crop-size" type="range" min="0.5" max="30" step="0.5" value={size} onChange={(event) => setSize(Number(event.target.value))} />
        {pixels > Math.min(viewport.width, viewport.height) && <p className="small">The crop extends beyond this view. Zoom out to see its outline.</p>}
        <div className="crop-actions">
          <button className="btn ghost" onClick={() => { setOpen(false); document.getElementById('compare-images')?.focus(); }}>Cancel</button>
          <button className="btn primary" onClick={() => {
            cancelAnimations();
            router.push(comparisonUrl(useNav.getState(), size));
          }}>Find images</button>
        </div>
      </section>
    </>}
  </>;
}
