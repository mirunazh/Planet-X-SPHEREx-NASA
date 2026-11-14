'use client';

import { useEffect, useState } from 'react';
import { useNav } from '@/lib/store';
import { SPHEREX_FRAMES, SPHEREX_PRESETS, SURVEYS, SURVEY_ORDER, nearestUsableFrame } from '@/lib/sky/surveys';
import { layerLabel, requestedLayer } from '@/lib/sky/layer';

function LayerStatus() {
  const surveyId = useNav((s) => s.surveyId);
  const frame = useNav((s) => s.frame);
  const displayed = useNav((s) => s.displayedLayer);
  const status = useNav((s) => s.allskyStatus);
  const requested = layerLabel(requestedLayer({ surveyId, frame }));
  return (
    <div className="small">
      <p role="status" aria-live="polite">
        {status === 'loading' || status === 'idle' ? `Loading ${requested}… ` : ''}
        {displayed ? `Showing ${layerLabel(displayed)}.` : 'No sky image loaded yet.'}
      </p>
      {status === 'error' && (
        <div role="alert">
          <p>Could not load {requested}. Check your connection and retry.</p>
          <button className="btn ghost" onClick={() => useNav.getState().retryLayer()}>Retry layer</button>
        </div>
      )}
    </div>
  );
}

export function LayerPanel() {
  const surveyId = useNav((s) => s.surveyId);
  const frame = useNav((s) => s.frame);
  const showGrid = useNav((s) => s.showGrid);
  const showHosts = useNav((s) => s.showHosts);
  const showTargets = useNav((s) => s.showTargets);
  const rawPixels = useNav((s) => s.rawPixels);
  const gain = useNav((s) => s.gain);
  const hostCount = useNav((s) => s.hosts.length);
  const toggle = useNav((s) => s.toggle);
  // Start collapsed on phones so the sky stays visible.
  const [collapsed, setCollapsed] = useState(() => typeof window !== 'undefined' && window.innerWidth < 760);
  const [pending, setPending] = useState(frame);
  const survey = SURVEYS[surveyId];

  useEffect(() => setPending(frame), [frame]);
  // Each wavelength is a separate download, so apply slider moves once they settle.
  useEffect(() => {
    if (pending === frame) return;
    const t = setTimeout(() => useNav.getState().setFrame(nearestUsableFrame(pending)), 250);
    return () => clearTimeout(t);
  }, [pending, frame]);

  const shown = SPHEREX_FRAMES[nearestUsableFrame(pending)];

  return (
    <section className={`panel layers ${collapsed ? 'collapsed' : ''}`} aria-label="Sky layers">
      <header className="panel-head">
        <h2>Sky layer</h2>
        <button className="icon-btn" aria-expanded={!collapsed} onClick={() => setCollapsed((c) => !c)}>
          {collapsed ? 'Show' : 'Hide'}
        </button>
      </header>
      <LayerStatus />
      {!collapsed && (
        <>
          <div className="seg" role="radiogroup" aria-label="NASA survey">
            {SURVEY_ORDER.map((id) => (
              <button
                key={id}
                role="radio"
                aria-checked={id === surveyId}
                className={id === surveyId ? 'on' : ''}
                onClick={() => useNav.getState().setSurvey(id)}
                title={SURVEYS[id].name}
              >
                <span>{SURVEYS[id].shortName}</span>
                <small>{SURVEYS[id].epoch.split(' ')[0].slice(0, 9)}</small>
              </button>
            ))}
          </div>
          <p className="muted small">
            {survey.mission} · {survey.wavelength} · {survey.epoch} · native pixel {survey.pixelScaleArcsec}″
          </p>

          {survey.isCube && (
            <div className="wavelength">
              <label htmlFor="frame-slider">
                Wavelength <strong>{shown.wavelengthUm.toFixed(3)} µm</strong>{' '}
                <small>
                  band {shown.band} · channel {shown.channel}
                </small>
              </label>
              <input
                id="frame-slider"
                type="range"
                min={0}
                max={SPHEREX_FRAMES.length - 1}
                step={1}
                value={pending}
                aria-valuetext={`${shown.wavelengthUm.toFixed(3)} micrometres`}
                onChange={(e) => setPending(Number(e.target.value))}
              />
              <div className="presets">
                {SPHEREX_PRESETS.map((p) => (
                  <button
                    key={p.frame}
                    className={p.frame === frame ? 'on' : ''}
                    title={p.hint}
                    onClick={() => {
                      setPending(p.frame);
                      useNav.getState().setFrame(p.frame);
                    }}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="wavelength">
            <label htmlFor="gain-slider">
              Display brightness <strong>×{gain.toFixed(1)}</strong> <small>display only, data unchanged</small>
            </label>
            <input
              id="gain-slider"
              type="range"
              min={0.5}
              max={6}
              step={0.1}
              value={gain}
              onChange={(e) => useNav.setState({ gain: Number(e.target.value) })}
            />
          </div>

          <fieldset className="toggles">
            <legend className="sr-only">Overlays</legend>
            <label>
              <input type="checkbox" checked={showGrid} onChange={() => toggle('showGrid')} /> Grid, ecliptic and galactic plane
            </label>
            <label>
              <input type="checkbox" checked={showTargets} onChange={() => toggle('showTargets')} /> Featured targets
            </label>
            <label>
              <input type="checkbox" checked={showHosts} onChange={() => toggle('showHosts')} /> Exoplanet host stars
              {hostCount > 0 && <span className="muted"> ({hostCount.toLocaleString('en-US')})</span>}
            </label>
            <label title="Nearest-neighbour magnification shows the survey's true pixels">
              <input type="checkbox" checked={rawPixels} onChange={() => toggle('rawPixels')} /> Show raw pixels
            </label>
          </fieldset>
        </>
      )}
    </section>
  );
}
