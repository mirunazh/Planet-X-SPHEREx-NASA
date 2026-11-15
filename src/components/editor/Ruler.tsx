'use client';

import { memo, type Ref } from 'react';
import styles from './Ruler.module.css';

export type TickKind = 'minor' | 'mid' | 'major' | 'gap';

export interface RulerTick {
  /** Slider value the tick marks. */
  at: number;
  kind: TickKind;
}

const TICK_CLASS: Record<TickKind, string> = {
  minor: styles.tick,
  mid: `${styles.tick} ${styles.mid}`,
  major: `${styles.tick} ${styles.major}`,
  gap: `${styles.tick} ${styles.gap}`,
};

/** The tick marks never change, so they render once and stay out of slider updates. */
const Scale = memo(function Scale({ min, max, ticks }: { min: number; max: number; ticks: readonly RulerTick[] }) {
  return (
    <div className={styles.scale} aria-hidden="true">
      {ticks.map((tick) => (
        <span key={tick.at} className={TICK_CLASS[tick.kind]} style={{ left: `${((tick.at - min) / (max - min)) * 100}%` }} />
      ))}
    </div>
  );
});

/**
 * A ruler-style slider, like the adjustment ruler in the iOS Photos editor. It is a
 * native range input (keyboard, touch and screen readers work as usual) drawn over a
 * tick scale whose marks line up with the needle.
 */
export function Ruler({
  id,
  min,
  max,
  step,
  value,
  onChange,
  ticks,
  valueText,
  describedBy,
  inputRef,
}: {
  id: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
  ticks: readonly RulerTick[];
  valueText: string;
  describedBy?: string;
  inputRef?: Ref<HTMLInputElement>;
}) {
  return (
    <div className={styles.ruler}>
      <Scale min={min} max={max} ticks={ticks} />
      <input ref={inputRef} id={id} className={styles.input} type="range" min={min} max={max} step={step} value={value}
        aria-valuetext={valueText} aria-describedby={describedBy} onChange={(e) => onChange(Number(e.target.value))} />
    </div>
  );
}
