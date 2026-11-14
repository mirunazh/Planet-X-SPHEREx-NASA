'use client';

import { useNav } from '@/lib/store';
import { canLock, enterSky, exitToGlobe, lockTarget, resetView, zoomAt } from '@/lib/navigation';
import { LOCK_MAX_FOV } from '@/lib/sky/view';
import { MiniMap } from './MiniMap';

export function Dock() {
  const mode = useNav((s) => s.mode);
  const crossing = useNav((s) => s.crossing);
  // Re-render when the lock condition can change.
  useNav((s) => s.fov);
  const lockable = canLock();

  return (
    <section className="dock panel" aria-label="Navigation">
      <MiniMap />
      <div className="toolbar" role="toolbar" aria-label="View controls">
        <button className="icon-btn" onClick={() => zoomAt(0, 0, 1 / 0.7)} aria-label="Zoom out" title="Zoom out (−)">
          −
        </button>
        <button className="icon-btn" onClick={() => zoomAt(0, 0, 0.7)} aria-label="Zoom in" title="Zoom in (+)">
          +
        </button>
        <button
          className="btn"
          disabled={crossing}
          onClick={() => (mode === 'globe' ? enterSky() : exitToGlobe())}
          title="Toggle globe / sky (S)"
        >
          {mode === 'globe' ? 'Fly inside' : 'Back to globe'}
        </button>
        <button className="btn ghost" onClick={resetView} title="Reset view (R)">
          Reset
        </button>
      </div>
      <button
        className="btn primary lock"
        disabled={!lockable}
        onClick={lockTarget}
        title={lockable ? 'Lock these coordinates (Enter)' : `Zoom in below ${LOCK_MAX_FOV}° in sky view to lock`}
      >
        {lockable ? 'Lock target' : `Zoom below ${LOCK_MAX_FOV}° to lock`}
      </button>
    </section>
  );
}
