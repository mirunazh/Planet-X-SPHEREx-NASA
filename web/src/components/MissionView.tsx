'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Badge } from '@astryxdesign/core/Badge';
import { Banner } from '@astryxdesign/core/Banner';
import { Button } from '@astryxdesign/core/Button';
import { SegmentedControl, SegmentedControlItem } from '@astryxdesign/core/SegmentedControl';
import { Switch } from '@astryxdesign/core/Switch';
import { framesFor, loadFrame, loadManifest, mjdToDate, type Frame, type Manifest, type Mode } from '@/lib/data';
import type { Resolution } from '@/lib/resolve';
import { skyToPixel } from '@/lib/sky';
import { plainNote, S } from '@/lib/strings';
import { FPS_STEPS, useView, ZOOM_MAX, ZOOM_MIN, type Overlays } from '@/lib/viewState';
import { MarkerSwatch, SkyCanvas } from './SkyCanvas';
import { MoverBanner } from './MoverBanner';
import { TimeAxis } from './TimeAxis';

const day = (mjd: number) => mjdToDate(mjd).toISOString().slice(0, 10);
const dateTime = (mjd: number) => mjdToDate(mjd).toISOString().slice(0, 16).replace('T', ' ') + ' UTC';
const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function MissionView({ autoplay, resolution }: { autoplay: boolean; resolution: Resolution | null }) {
  const v = useView();
  const set = v.set;
  const [manifest, setManifest] = useState<Manifest | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!v.mission) return;
    loadManifest(v.mission).then(setManifest, (e) => setError(String(e)));
  }, [v.mission]);

  const group = manifest
    ? manifest.groups.find((g) => g.id === v.group) ?? manifest.groups.find((g) => g.id === manifest.truth.group) ?? manifest.groups[0]
    : null;
  useEffect(() => {
    if (group && group.id !== v.group) set({ group: group.id });
  }, [group, v.group, set]);

  const frames = useMemo(() => (manifest && group ? framesFor(manifest, group, v.mode) : []), [manifest, group, v.mode]);
  const n = frames.length;
  const idx = Math.min(v.frame, Math.max(0, n - 1));
  useEffect(() => {
    if (n && v.frame > n - 1) set({ frame: n - 1 });
  }, [n, v.frame, set]);

  // Prefetch the whole sequence so playback is smooth.
  const [loaded, setLoaded] = useState(0);
  useEffect(() => {
    let alive = true;
    let count = 0;
    setLoaded(0);
    for (const f of frames)
      loadFrame(f.url).then(
        () => alive && setLoaded(++count),
        (e) => alive && setError(String(e)),
      );
    return () => {
      alive = false;
    };
  }, [frames]);

  // The image and its readout always describe the same frame.
  const [shown, setShown] = useState<{ frame: Frame; data: Float32Array; index: number } | null>(null);
  useEffect(() => {
    const f = frames[idx];
    if (!f) return;
    let alive = true;
    loadFrame(f.url).then(
      (data) => alive && setShown({ frame: f, data, index: idx }),
      (e) => alive && setError(String(e)),
    );
    return () => {
      alive = false;
    };
  }, [frames, idx]);

  const autoplayed = useRef(false);
  useEffect(() => {
    if (autoplay && !autoplayed.current && n > 1 && loaded === n && !reducedMotion()) {
      autoplayed.current = true;
      set({ playing: true });
    }
  }, [autoplay, loaded, n, set]);

  useEffect(() => {
    if (!v.playing || n < 2) return;
    const id = setInterval(() => {
      const s = useView.getState();
      let next = s.frame + 1;
      if (next >= n) {
        if (!s.loop) return s.set({ playing: false });
        next = 0;
      }
      s.set({ frame: next });
    }, 1000 / v.fps);
    return () => clearInterval(id);
  }, [v.playing, v.fps, n]);

  const togglePlay = useCallback(() => {
    const s = useView.getState();
    if (!s.playing && !s.loop && s.frame >= n - 1) s.set({ frame: 0 });
    s.set({ playing: !s.playing });
  }, [n]);
  const step = useCallback(
    (d: number) => {
      const s = useView.getState();
      if (n) s.set({ playing: false, frame: (Math.min(s.frame, n - 1) + d + n) % n });
    },
    [n],
  );
  const zoomBy = useCallback((f: number) => {
    const s = useView.getState();
    s.set({ zoom: Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, s.zoom * f)) });
  }, []);
  const fit = useCallback(() => set({ zoom: 1, cx: 60, cy: 60 }), [set]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const t = e.target instanceof Element ? e.target : document.body;
      if (t.closest('input, textarea, select, [contenteditable="true"]')) return;
      if (e.key === ' ') {
        if (t.closest('button, a, [role="button"], [role="radio"], [role="switch"], [role="slider"]')) return;
        e.preventDefault();
        togglePlay();
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        if (t.closest('[role="slider"], [role="radio"], [role="radiogroup"]')) return;
        e.preventDefault();
        step(e.key === 'ArrowRight' ? 1 : -1);
      } else if (e.key === '+' || e.key === '=') zoomBy(1.5);
      else if (e.key === '-') zoomBy(1 / 1.5);
      else if (e.key === '0') fit();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [togglePlay, step, zoomBy, fit]);

  const setMode = (mode: Mode) => {
    if (!manifest || !group || mode === v.mode) return;
    const pass = frames[idx]?.pass.index ?? 0;
    const target = framesFor(manifest, group, mode);
    set({ mode, frame: Math.max(0, target.findIndex((f) => f.pass.index === pass)) });
  };
  const setGroup = (id: string) => {
    if (!manifest) return;
    const g = manifest.groups.find((x) => x.id === id)!;
    const pass = frames[idx]?.pass.index ?? 0;
    set({ group: id, frame: Math.max(0, framesFor(manifest, g, v.mode).findIndex((f) => f.pass.index === pass)) });
  };
  const toggleOverlay = (k: keyof Overlays, on: boolean) => set({ overlays: { ...v.overlays, [k]: on } });

  if (error) return <Banner status="error" title={S.loadFailed} description={error} />;
  if (!manifest || !group) return <p className="muted">{S.loadingFrames(0, 1)}</p>;

  const f = shown?.frame ?? null;
  const pass = f?.pass ?? null;
  const typed = v.ra !== null && v.dec !== null ? skyToPixel(manifest.grid, v.ra, v.dec) : null;
  const inputMarker = typed ?? (manifest.challengeInput ? { x: manifest.challengeInput.x, y: manifest.challengeInput.y } : null);
  const releases = manifest.provenance.releases;
  const neighbour = pass?.blendedWith ? skyToPixel(manifest.grid, pass.blendedWith.ra, pass.blendedWith.dec) : null;
  const when = (fr: Frame) => (v.mode === 'stack' ? fr.pass.label : day(fr.mjdStart));
  const detail =
    pass &&
    [
      pass.detected && pass.saturationRadiusPx
        ? S.saturated
        : pass.detected && pass.snr !== null
          ? S.detected(pass.snr.toFixed(pass.snr < 100 ? 1 : 0))
          : S.notDetected,
      pass.blendedWith ? S.blended(pass.blendedWith.name) : null,
      v.mode === 'exp' ? S.fromPassStack(pass.label) : null,
    ]
      .filter(Boolean)
      .join(' ');
  const kindBadge = <Badge label={manifest.kind === 'mover' ? S.kindMover : S.kindVariable} variant={manifest.kind === 'mover' ? 'orange' : 'neutral'} />;

  return (
    <div className="watch">
      <section className="viewer" aria-label={manifest.name}>
        <div className="plate">
          <SkyCanvas
            data={shown?.data ?? null}
            display={f?.display ?? group.display}
            size={manifest.grid.width}
            scaleArcsec={manifest.grid.scaleArcsec}
            zoom={v.zoom}
            cx={v.cx}
            cy={v.cy}
            predicted={v.overlays.pred && pass ? pass.predicted : null}
            measured={v.overlays.meas && pass?.measured ? pass.measured : null}
            input={v.overlays.input ? inputMarker : null}
            neighbour={v.overlays.meas && neighbour ? neighbour : null}
            label={`${manifest.name}, ${pass?.label ?? ''}, ${f ? S.wavelengthRange(f.wavelengthUmMin, f.wavelengthUmMax) : ''}`}
            onView={set}
          />
          <div className="plate-stamp data" aria-hidden="true">
            {loaded < n ? S.loadingFrames(loaded, n) : f ? (v.mode === 'stack' ? pass?.label : dateTime(f.mjdStart)) : ''}
          </div>
        </div>

        <TimeAxis frames={frames} index={idx} headLabel={frames[idx] ? when(frames[idx]) : ''} isDisabled={n < 2} onSeek={(x) => set({ playing: false, frame: x })} />

        <div className="transport" role="group" aria-label={S.playbackLabel}>
          <Button label={S.stepBack} icon={<Glyph d="M7 3v10M14 3 8 8l6 5Z" />} isIconOnly onClick={() => step(-1)} isDisabled={n < 2} />
          <Button
            label={v.playing ? S.pause : S.play}
            icon={<Glyph d={v.playing ? 'M4.5 3h2.5v10H4.5zM9.5 3H12v10H9.5z' : 'M4.5 2.5v11l9-5.5Z'} />}
            variant="primary"
            onClick={togglePlay}
            isDisabled={n < 2}
          />
          <Button label={S.stepForward} icon={<Glyph d="M9 3v10M2 3l6 5-6 5Z" />} isIconOnly onClick={() => step(1)} isDisabled={n < 2} />
          <span className="counter data" aria-live="off">
            {S.frameOf(idx + 1, n)}
          </span>
          <span className="zoom">
            <Button label={S.zoomOut} icon={<Glyph d="M3 8h10" />} isIconOnly onClick={() => zoomBy(1 / 1.5)} isDisabled={v.zoom <= ZOOM_MIN} />
            <Button label={S.zoomIn} icon={<Glyph d="M3 8h10M8 3v10" />} isIconOnly onClick={() => zoomBy(1.5)} isDisabled={v.zoom >= ZOOM_MAX} />
            <Button label={S.zoomReset} onClick={fit} />
            <span className="data muted">{S.zoomValue(v.zoom)}</span>
          </span>
        </div>
      </section>

      <aside className="rail">
        {resolution && <MoverBanner res={resolution} here />}

        <header className="target-head">
          <h1>{manifest.name}</h1>
          {kindBadge}
          <p>{manifest.summary}</p>
        </header>

        {f && pass && (
          <dl className="readout" aria-live="polite">
            <dt>{S.readoutDate}</dt>
            <dd>
              {v.mode === 'stack' ? (
                <>
                  {pass.label} <span className="data muted">{S.dateRange(day(f.mjdStart), day(f.mjdEnd))}</span>
                </>
              ) : (
                <span className="data">{dateTime(f.mjdStart)}</span>
              )}
            </dd>
            <dt>{S.readoutWavelength}</dt>
            <dd className="data">{S.wavelengthRange(f.wavelengthUmMin, f.wavelengthUmMax)}</dd>
            <dt>{S.readoutExposures}</dt>
            <dd className="data">{f.exposures.length}</dd>
            <dt>{S.readoutGroup}</dt>
            <dd className="data">{(v.mode === 'exp' ? [f.exposures[0].detector] : pass.detectors).join(' + ')}</dd>
            <dt>{S.readoutDetection}</dt>
            <dd>{detail}</dd>
          </dl>
        )}

        <div className="control">
          <span className="control-label">{S.overlaysLabel}</span>
          <div className="legend-row">
            <MarkerSwatch kind="predicted" />
            <Switch label={S.overlayPredicted} value={v.overlays.pred} onChange={(on) => toggleOverlay('pred', on)} />
          </div>
          <div className="legend-row">
            <MarkerSwatch kind="measured" />
            <Switch label={S.overlayMeasured} value={v.overlays.meas} onChange={(on) => toggleOverlay('meas', on)} />
          </div>
          {inputMarker && (
            <div className="legend-row">
              <MarkerSwatch kind="input" />
              <Switch label={typed ? S.overlayInput : S.overlayInputChallenge} value={v.overlays.input} onChange={(on) => toggleOverlay('input', on)} />
            </div>
          )}
          {neighbour && v.overlays.meas && (
            <p className="legend-row legend-note">
              <MarkerSwatch kind="neighbour" />
              {S.overlayNeighbour}
            </p>
          )}
          <p className="legend-row legend-note">
            <MarkerSwatch kind="noData" />
            {S.noData}
          </p>
        </div>

        <div className="control">
          <span className="control-label">
            {S.modeLabel}
          </span>
          <SegmentedControl label={S.modeLabel} value={v.mode} onChange={(x) => setMode(x as Mode)}>
            <SegmentedControlItem value="stack" label={S.modeStack} />
            <SegmentedControlItem value="exp" label={S.modeExp} />
          </SegmentedControl>
          <p className="hint">{v.mode === 'exp' ? S.modeExpHint : S.modeStackHint}</p>
        </div>

        {manifest.groups.length > 1 && (
          <div className="control">
            <span className="control-label">{S.groupLabel}</span>
            <SegmentedControl label={S.groupLabel} value={group.id} onChange={setGroup}>
              {manifest.groups.map((g) => (
                <SegmentedControlItem key={g.id} value={g.id} label={g.detectors.join(' + ')} />
              ))}
            </SegmentedControl>
            <p className="hint">{group.label}</p>
          </div>
        )}

        <div className="control">
          <span className="control-label">{S.speed}</span>
          <div className="control-row">
            <SegmentedControl label={S.speed} size="sm" value={String(v.fps)} onChange={(x) => set({ fps: Number(x) })}>
              {FPS_STEPS.map((fps) => (
                <SegmentedControlItem key={fps} value={String(fps)} label={S.speedValue(fps)} />
              ))}
            </SegmentedControl>
            <Switch label={S.loop} value={v.loop} onChange={(on) => set({ loop: on })} />
          </div>
        </div>

        <p className="hint keys">
          <kbd>Space</kbd> <kbd>{'←'}</kbd> <kbd>{'→'}</kbd> {S.keyboardHint}
        </p>

        <details className="notes">
          <summary>{S.notesHeading}</summary>
          {f && (
            <section>
              <h2>
                {S.provenanceHeading} <span className="data muted">({f.exposures.length})</span>
              </h2>
              <ul className="files">
                {f.exposures.map((e) => (
                  <li key={e.id}>
                    <a className="data" href={e.uri} rel="noreferrer">
                      {e.id}
                    </a>{' '}
                    <span className="muted">
                      {e.detector}, <span className="data">{e.wavelengthUm.toFixed(3)}</span> micron, {e.release}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          )}
          <section>
            <h2>{S.releasesHeading}</h2>
            <ul>
              {releases.map((r) => (
                <li key={r.release}>
                  {S.provenanceRelease(r.release, '')}
                  <a className="data" href={`https://doi.org/${r.doi}`} rel="noreferrer">
                    {r.doi}
                  </a>
                </li>
              ))}
            </ul>
          </section>
          <section>
            <h2>{S.caveatsHeading}</h2>
            <ul>
              {manifest.caveats.map((c) => (
                <li key={c}>{plainNote(c)}</li>
              ))}
              {manifest.challengeInput && !typed && <li>{plainNote(manifest.challengeInput.note)}</li>}
            </ul>
          </section>
        </details>
      </aside>
    </div>
  );
}

/** 16 px transport glyph; the button's label stays the accessible name. */
function Glyph({ d }: { d: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" fill="currentColor" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round">
      <path d={d} />
    </svg>
  );
}
