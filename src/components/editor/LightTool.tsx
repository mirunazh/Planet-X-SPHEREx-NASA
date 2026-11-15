'use client';

import { useId } from 'react';
import { useNav } from '@/lib/store';
import { Ruler, type RulerTick } from './Ruler';
import styles from './tools.module.css';

const GAIN_MIN = 0.5;
const GAIN_MAX = 6;
const GAIN_STEP = 0.1;

/** A tick every 0.1, taller at whole numbers, tallest at ×1 (the image as served). */
const GAIN_TICKS: RulerTick[] = Array.from({ length: Math.round((GAIN_MAX - GAIN_MIN) / GAIN_STEP) + 1 }, (_, i) => {
  const at = (GAIN_MIN * 10 + i) / 10;
  return { at, kind: at === 1 ? 'major' : Number.isInteger(at) ? 'mid' : 'minor' };
});

/** Brightness, like the Exposure control in the iOS Photos editor. */
export function LightTool() {
  const gain = useNav((s) => s.gain);
  const id = useId();
  const shown = gain.toFixed(1);

  return (
    <div className={styles.light}>
      <div className={styles.readoutHead}>
        <label className={styles.eyebrow} htmlFor={`${id}-gain`}>Brightness</label>
        <span className={styles.bigValue}>×{shown}</span>
      </div>
      <Ruler id={`${id}-gain`} min={GAIN_MIN} max={GAIN_MAX} step={GAIN_STEP} value={gain} ticks={GAIN_TICKS}
        valueText={`${shown} times`} describedBy={`${id}-note`} onChange={(value) => useNav.setState({ gain: value })} />
      <div className={styles.axis} aria-hidden="true">
        <span>×{GAIN_MIN.toFixed(1)} · dimmer</span>
        <span>brighter · ×{GAIN_MAX.toFixed(1)}</span>
      </div>
      <div className={styles.lightFoot}>
        <p className={styles.note} id={`${id}-note`}>Display adjustment only; the data is unchanged.</p>
        <button type="button" className={styles.button} aria-label="Reset brightness" onClick={() => useNav.setState({ gain: 1 })}>
          Reset
        </button>
      </div>
    </div>
  );
}
