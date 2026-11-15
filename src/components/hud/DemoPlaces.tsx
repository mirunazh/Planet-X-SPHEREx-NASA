'use client';

import Link from 'next/link';
import { useNav } from '@/lib/store';
import { visitPin } from '@/lib/navigation';
import { loadPins } from '@/lib/pins';
import { formatAngle } from '@/lib/sky/format';

export const DEMO_TARGET_IDS = ['m31', 'm101', 'spherex-deep-north', 'teegardens-star'] as const;

export function DemoPlaces({ onVisit }: { onVisit?: () => void }) {
  const targets = useNav((s) => s.targets);
  const selected = useNav((s) => s.selected);
  const status = useNav((s) => s.dataStatus);
  const places = DEMO_TARGET_IDS.flatMap((id) => targets.filter((pin) => pin.id === id));
  return (
    <section className="places panel" id="places-panel" aria-labelledby="places-title">
      <h2 id="places-title">Explore a place</h2>
      <p className="small muted">Choose a target, then compare sky layers.</p>
      <Link className="place-link challenge-entry" href="/compare?challenge=weekly"><span>Weekly sky challenge</span><small>Revisit M101 · prepared image slideshow</small></Link>
      <div className="place-list">
        {places.map((pin) => (
          <button key={pin.id} className="place-link" aria-pressed={selected?.id === pin.id} onClick={() => { visitPin(pin); onVisit?.(); }}>
            <span>{pin.name}</span>
            <small>{pin.targetKind?.replaceAll('-', ' ')} · {formatAngle(pin.fov)} view</small>
          </button>
        ))}
      </div>
      {(status === 'idle' || status === 'loading') && <p className="small" role="status">Loading featured places…</p>}
      {status === 'error' && <div role="status"><p className="small">Featured places could not load. You can still search by coordinates.</p><button className="btn ghost" onClick={() => void loadPins()}>Retry places</button></div>}
      {status === 'ready' && places.length === 0 && <p className="small">No featured places available. Search by name or coordinates above.</p>}
    </section>
  );
}
