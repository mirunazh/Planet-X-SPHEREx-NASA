'use client';

import { useId } from 'react';
import { COLOR_STOPS, nearestStop } from '@/lib/sky/colorStops';
import { SPHEREX_FRAMES, SPHEREX_PRESETS, nearestUsableFrame } from '@/lib/sky/surveys';
import { Ruler, type RulerTick } from './Ruler';
import { useFrameDraft } from './useFrameDraft';
import styles from './tools.module.css';

const FIRST = SPHEREX_FRAMES[0];
const LAST = SPHEREX_FRAMES[SPHEREX_FRAMES.length - 1];
const STOP_FRAMES = new Set(COLOR_STOPS.map((stop) => stop.frame));

/** One tick per channel: tallest at the color stops, taller where a detector band starts, faint at blank channels. */
const TICKS: RulerTick[] = SPHEREX_FRAMES.map((f) => ({
  at: f.index,
  kind: f.blank ? 'gap' : STOP_FRAMES.has(f.index) ? 'major' : f.channel === 1 ? 'mid' : 'minor',
}));

/** The chips keep the expert presets' wavelength labels and hover hints. */
const CHIPS = COLOR_STOPS.map((stop) => {
  const preset = SPHEREX_PRESETS.find((p) => p.frame === stop.frame);
  return {
    stop,
    label: preset?.label ?? `${SPHEREX_FRAMES[stop.frame].wavelengthUm.toFixed(2)} µm`,
    hint: preset?.hint,
  };
});

/** The SPHEREx wavelength picker: one ruler tick per channel, named color stops as chips. */
export function ColorTool() {
  const { draft, move, jump } = useFrameDraft();
  const id = useId();
  const shownIndex = nearestUsableFrame(draft);
  const shown = SPHEREX_FRAMES[shownIndex];
  const stop = nearestStop(shownIndex);
  const onStop = stop.frame === shownIndex;
  const stopLabel = CHIPS.find((chip) => chip.stop.frame === stop.frame)?.label;
  const um = shown.wavelengthUm.toFixed(3);

  return (
    <div className={styles.color}>
      <label className={styles.eyebrow} htmlFor={`${id}-ruler`}>
        Infrared color<span className="sr-only"> (SPHEREx wavelength)</span>
      </label>
      {/* Between stops the name and description belong to the nearest stop, and say so. */}
      <p className={styles.stopName}>
        {stop.name}
        {!onStop && <span className={styles.nearest}> nearest stop · {stopLabel}</span>}
      </p>
      <p className={styles.stopDetail} id={`${id}-detail`}>{stop.detail}</p>
      {/* The value text already reads out the numbers; the description adds the plain words. */}
      <Ruler id={`${id}-ruler`} min={0} max={SPHEREX_FRAMES.length - 1} step={1} value={draft}
        ticks={TICKS} onChange={move} describedBy={`${id}-detail ${id}-skip`}
        valueText={`${um} micrometres, band ${shown.band}, channel ${shown.channel}, ${onStop ? stop.name : `nearest stop ${stop.name}`}`} />
      <div className={styles.axis} aria-hidden="true">
        <span>{FIRST.wavelengthUm.toFixed(3)} µm · shorter</span>
        <span>longer · {LAST.wavelengthUm.toFixed(3)} µm</span>
      </div>
      <p className={styles.exact}>
        {um} µm · band {shown.band}, channel {shown.channel} · <span id={`${id}-skip`}>blank channels are skipped</span>
      </p>
      <div className={styles.chips} role="group" aria-label="Color stops">
        {CHIPS.map(({ stop: chipStop, label, hint }) => (
          <button key={chipStop.frame} type="button" className={styles.chip} aria-pressed={chipStop.frame === shownIndex}
            title={hint} onClick={() => jump(chipStop.frame)}>
            <span className={styles.chipName}>{chipStop.name}</span>
            <span className={styles.chipValue}>{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
