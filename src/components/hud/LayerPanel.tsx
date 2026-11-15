'use client';

import { useEffect, useState } from 'react';
import { useNav } from '@/lib/store';
import { SPHEREX_FRAMES, SPHEREX_PRESETS, SURVEYS, SURVEY_ORDER, nearestUsableFrame } from '@/lib/sky/surveys';
import { LayerStatus } from './LayerStatus';

export function LayerPanel() {
  const surveyId = useNav((s) => s.surveyId);
  const frame = useNav((s) => s.frame);
  const displayed = useNav((s) => s.displayedLayer);
  const showGrid = useNav((s) => s.showGrid);
  const showTargets = useNav((s) => s.showTargets);
  const rawPixels = useNav((s) => s.rawPixels);
  const gain = useNav((s) => s.gain);
  const toggle = useNav((s) => s.toggle);
  const [pending, setPending] = useState(frame);
  const survey = SURVEYS[surveyId];
  const imageSurvey = displayed ? SURVEYS[displayed.surveyId] : null;

  useEffect(() => setPending(frame), [frame]);
  useEffect(() => {
    if (pending === frame || !survey.isCube) return;
    const t = setTimeout(() => useNav.getState().setFrame(nearestUsableFrame(pending)), 250);
    return () => clearTimeout(t);
  }, [pending, frame, survey.isCube]);
  const shown = SPHEREX_FRAMES[nearestUsableFrame(pending)];

  return (
    <section className="panel layers" id="layers-panel" aria-labelledby="layers-title">
      <h2 id="layers-title">Sky layers</h2>
      <fieldset className="survey-picker">
        <legend className="sr-only">Image survey</legend>
        <div className="seg">
          {SURVEY_ORDER.map((id) => (
            <label key={id} className={id === surveyId ? 'on' : ''}>
              <input className="sr-only" type="radio" name="sky-survey" value={id} checked={id === surveyId} onChange={() => useNav.getState().setSurvey(id)} />
              <span>{SURVEYS[id].shortName}</span>
            </label>
          ))}
        </div>
      </fieldset>
      {survey.isCube ? (
        <div className="wavelength">
          <label htmlFor="frame-slider">SPHEREx wavelength <output htmlFor="frame-slider">{shown.wavelengthUm.toFixed(3)} µm</output></label>
          <input id="frame-slider" type="range" min={0} max={SPHEREX_FRAMES.length - 1} step={1} value={pending}
            aria-valuetext={`${shown.wavelengthUm.toFixed(3)} micrometres, band ${shown.band}, channel ${shown.channel}`}
            aria-describedby="spectral-hint" onChange={(e) => setPending(Number(e.target.value))} />
          <div className="spectral-axis" aria-hidden="true"><span>0.753 µm · shorter</span><span>longer · 4.988 µm</span></div>
          <p className="small muted" id="spectral-hint">Band {shown.band} · channel {shown.channel}. Blank channels are skipped.</p>
          <div className="presets" role="group" aria-label="Wavelength presets">
            {SPHEREX_PRESETS.map((p) => (
              <button key={p.frame} className={p.frame === frame ? 'on' : ''} aria-pressed={p.frame === frame} title={p.hint}
                onClick={() => { setPending(p.frame); useNav.getState().setFrame(p.frame); }}>{p.label}</button>
            ))}
          </div>
        </div>
      ) : <p className="small muted">Colour composite · {survey.wavelength}. Choose SPHEREx to explore individual wavelengths.</p>}
      <LayerStatus />
      {imageSurvey && (
        <div className="image-source small">
          <p>Images: <a href={imageSurvey.credits[0].url} target="_blank" rel="noreferrer">{imageSurvey.shortName}</a> via <a href="https://irsa.ipac.caltech.edu/" target="_blank" rel="noreferrer">NASA/IPAC IRSA</a></p>
          <p className="muted">Observed {imageSurvey.epoch} · map pixel {imageSurvey.pixelScaleArcsec}″</p>
        </div>
      )}
      <details className="display-options">
        <summary>Display &amp; overlays</summary>
        <div className="wavelength">
          <label htmlFor="gain-slider">Brightness <output htmlFor="gain-slider">×{gain.toFixed(1)}</output></label>
          <input id="gain-slider" type="range" min={0.5} max={6} step={0.1} value={gain} onChange={(e) => useNav.setState({ gain: Number(e.target.value) })} />
          <p className="small muted">Display adjustment only; survey data is unchanged.</p>
        </div>
        <fieldset className="toggles">
          <legend className="sr-only">Overlays</legend>
          <label><input type="checkbox" checked={showGrid} onChange={() => toggle('showGrid')} /> Coordinate grid and sky planes</label>
          <label><input type="checkbox" checked={showTargets} onChange={() => toggle('showTargets')} /> Featured targets</label>
          <label><input type="checkbox" checked={rawPixels} onChange={() => toggle('rawPixels')} /> Show raw pixels</label>
        </fieldset>
      </details>
    </section>
  );
}
