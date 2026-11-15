'use client';

import styles from './JourneyBar.module.css';

export type JourneyStep = 1 | 2 | 3;

export const JOURNEY_STEPS: { step: JourneyStep; title: string }[] = [
  { step: 1, title: 'Choose a place' },
  { step: 2, title: 'Look closer' },
  { step: 3, title: 'Compare its photos' },
];

/**
 * The three steps of the product, shown on every screen so a visitor always knows
 * where they are and what comes next. Steps can be clickable shortcuts.
 */
export function JourneyBar({ step, onSelect }: { step: JourneyStep; onSelect?: (step: JourneyStep) => void }) {
  return (
    <nav className={styles.bar} aria-label="Your journey">
      <ol className={styles.list}>
        {JOURNEY_STEPS.map((item, index) => {
          const state = item.step < step ? 'done' : item.step === step ? 'current' : 'next';
          const content = (
            <>
              <span className={styles.dot} aria-hidden="true">{state === 'done' ? '✓' : item.step}</span>
              <span className={styles.title}>{item.title}</span>
              {state === 'done' && <span className="sr-only"> (done)</span>}
            </>
          );
          return (
            <li key={item.step} className={`${styles.item} ${styles[state]}`} aria-current={state === 'current' ? 'step' : undefined}>
              {index > 0 && <span className={styles.line} aria-hidden="true" />}
              {onSelect && item.step !== step
                ? <button type="button" className={styles.button} onClick={() => onSelect(item.step)}>{content}</button>
                : <span className={styles.button}>{content}</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
