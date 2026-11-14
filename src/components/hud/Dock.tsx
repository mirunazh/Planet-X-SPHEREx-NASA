'use client';

import { useNav } from '@/lib/store';
import { canLock, enterSky, exitToGlobe, lockTarget, resetView, zoomAt } from '@/lib/navigation';
import { LOCK_MAX_FOV } from '@/lib/sky/view';
import { MiniMap } from './MiniMap';
import { HINT } from './hints';

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
        <button className="icon-btn" onClick={() => zoomAt(0, 0, 1 / 0.7)} aria-label="Zoom out" data-hint={HINT.zoomOut}>
          −
        </button>
        <button className="icon-btn" onClick={() => zoomAt(0, 0, 0.7)} aria-label="Zoom in" data-hint={HINT.zoomIn}>
          +
        </button>
        <button
          className="btn"
          disabled={crossing}
          onClick={() => (mode === 'globe' ? enterSky() : exitToGlobe())}
          data-hint={mode === 'globe' ? HINT.enterSky : HINT.exitSky}
        >
          {mode === 'globe' ? 'Fly inside' : 'Back to globe'}
        </button>
        <button className="btn ghost" onClick={resetView} data-hint={HINT.reset}>
          Reset
        </button>
      </div>
      {/* Disabled buttons swallow hover events, so the hint lives on a wrapper. */}
      <span className="lock-wrap" data-hint={lockable ? HINT.lock : HINT.lockDisabled}>
        <button className="btn primary lock" disabled={!lockable} onClick={lockTarget}>
          {lockable ? 'Lock target' : `Zoom below ${LOCK_MAX_FOV}° to lock`}
        </button>
      </span>
    </section>
  );
}
