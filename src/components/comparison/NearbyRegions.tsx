'use client';

import { useEffect, useRef, useState } from 'react';
import { NEARBY_RADII, nearbyRegions, nearbySearchFilters } from '@/lib/comparison/nearby';
import type { Region } from '@/lib/comparison/region';
import { InventorySession, type InventoryState } from '@/lib/comparison/session';

interface Props {
  region: Region;
  filters: Record<string, string | number>;
  onChoose: (region: Region) => void;
}

export function NearbyRegions({ region, filters, onChoose }: Props) {
  const [radius, setRadius] = useState<number | null>(null);
  const [state, setState] = useState<InventoryState | null>(null);
  const session = useRef<InventorySession | null>(null);

  useEffect(() => {
    if (radius === null) return;
    const active = new InventorySession(nearbySearchFilters(region, filters, radius), setState);
    session.current = active;
    void active.start();
    return () => { active.dispose(); session.current = null; };
    // The parent keys this component to the exact region/filter generation.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [radius]);

  // Nearby suggestions adopt the final inventory so an early collection cannot win over a closer one.
  useEffect(() => {
    if (state?.pendingVersion) void session.current?.showUpdated();
  }, [state?.pendingVersion]);

  const busy = !!state && !state.error && (state.loading || !!state.pendingVersion || !!state.progress?.version && state.page?.version !== state.progress.version);
  const candidates = radius === null || busy ? [] : nearbyRegions(state?.page?.products ?? [], region, radius);
  const complete = !state?.error && state?.progress?.state === 'finished' && state.progress.status !== 'error';
  const verifiedEmpty = complete && state?.progress?.status === 'empty';
  const limited = state?.progress?.truncated || state?.progress?.status === 'partial';
  const nextRadius = NEARBY_RADII.find((value) => radius === null || value > radius);
  const search = (value: number) => { setState(null); setRadius(value); };

  return <div className="nearby-search">
    {radius === null ? <>
      <p className="small muted">Look around this position for another region with SPHEREx photos. Your current filters stay applied.</p>
      <button className="btn primary" onClick={() => search(NEARBY_RADII[0])}>Find nearby photos · within 1°</button>
    </> : <>
      <div role="status" aria-live="polite" aria-atomic="true">
        {(!state || busy) ? <p>Searching within {radius}° of your original position…</p>
          : candidates.length ? <p>Nearby regions found · closest returned image centres first</p>
          : !complete ? <p>Nearby search could not finish. Coverage is still unknown.</p>
          : <p>{verifiedEmpty ? `No matching photos found within ${radius}°.` : `No image centres could be located within ${radius}° in the returned results.`}</p>}
      </div>
      {(!state || busy) && <button className="btn ghost" onClick={() => { setRadius(null); setState(null); }}>Cancel nearby search</button>}
      {!!candidates.length && <ol className="nearby-regions" aria-label="Nearby comparison regions">
        {candidates.map(({ product, region: target, distance }, index) => <li key={product.id}>
          <div><strong>{index === 0 ? 'Closest returned region' : 'Another nearby region'} · {(distance * 60).toFixed(1)}′ away</strong>
            <p className="small muted">ICRS {target.ra.toFixed(5)}°, {target.dec.toFixed(5)}° · {target.size}′ square</p></div>
          <button className="btn primary" onClick={() => onChoose(target)}>View photos here</button>
        </li>)}
      </ol>}
      {state && !busy && <>
        {state.error && <p className="small comparison-error">{state.error}</p>}
        {limited && <p className="small comparison-warning">Some results are missing or limited. A closer region may exist.</p>}
        {!!candidates.length && <p className="small muted">Distances are to image centres. Opening a region moves the comparison crop; it does not show photos of your original position.</p>}
        <div className="nearby-actions">
          {!complete && <button className="btn" onClick={() => void session.current?.start(true)}>Retry nearby search</button>}
          {complete && nextRadius && <button className="btn" onClick={() => search(nextRadius)}>Expand to {nextRadius}°</button>}
          {complete && !nextRadius && <p className="small muted">Search limit reached: 5°. Choose another position in the sky navigator.</p>}
        </div>
      </>}
    </>}
  </div>;
}
