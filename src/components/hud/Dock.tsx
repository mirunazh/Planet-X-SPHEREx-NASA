'use client';

import { useNav } from '@/lib/store';
import { canLock, lockTarget, resetView, zoomAt } from '@/lib/navigation';
import { LOCK_MAX_FOV } from '@/lib/sky/view';
import { MiniMap } from './MiniMap';

export function Dock() {
  // Re-render when the lock condition can change.
  useNav((s) => s.fov);
  useNav((s) => s.allskyStatus);
  useNav((s) => s.displayedLayer);
  const lockable = canLock();
  const zoomedIn = useNav((s) => s.fov <= LOCK_MAX_FOV);

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
        <button className="btn ghost" onClick={resetView} title="Reset panoramic view (Home)">
          Reset
        </button>
      </div>
      <button
        className="btn primary lock"
        disabled={!lockable}
        onClick={lockTarget}
        title={lockable ? 'Lock these coordinates (Enter)' : zoomedIn ? 'Load the selected sky layer before locking' : `Zoom in below ${LOCK_MAX_FOV}° to lock`}
      >
        {lockable ? 'Lock target' : zoomedIn ? 'Load selected layer to lock' : `Zoom below ${LOCK_MAX_FOV}° to lock`}
      </button>
    </section>
  );
}
