'use client';

import { useNav } from '@/lib/store';
import { layerLabel, requestedLayer } from '@/lib/sky/layer';

export function LayerStatus() {
  const surveyId = useNav((s) => s.surveyId);
  const frame = useNav((s) => s.frame);
  const displayed = useNav((s) => s.displayedLayer);
  const status = useNav((s) => s.allskyStatus);
  const requested = layerLabel(requestedLayer({ surveyId, frame }));
  return (
    <div className="layer-status small">
      <p role="status" aria-live="polite">
        {status === 'loading' || status === 'idle' ? `Loading ${requested}… ` : ''}
        {displayed ? `Showing ${layerLabel(displayed)}.` : 'Waiting for a sky image.'}
      </p>
      {status === 'error' && <div role="alert"><p>Could not load {requested}. Check your connection and retry.</p><button className="btn ghost" onClick={() => useNav.getState().retryLayer()}>Retry layer</button></div>}
    </div>
  );
}

