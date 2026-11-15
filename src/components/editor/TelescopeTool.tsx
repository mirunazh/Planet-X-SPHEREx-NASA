'use client';

import { SPHEREX_FRAMES, SURVEYS } from '@/lib/sky/surveys';
import styles from './tools.module.css';

/** The observing dates of the SPHEREx map, in a compact form. */
export function shortYears(epoch: string): string {
  const years = epoch.match(/\b\d{4}\b/g);
  if (!years) return epoch;
  const first = years[0];
  const last = years[years.length - 1];
  return first === last ? first : first.slice(0, 2) === last.slice(0, 2) ? `${first}–${last.slice(2)}` : `${first}–${last}`;
}

export function TelescopeTool() {
  const survey = SURVEYS.spherex;
  return <div className={styles.cards}>
    <section className={`${styles.card} ${styles.cardOn}`} aria-label="SPHEREx telescope">
      <span className={`${styles.thumb} ${styles.thumbSpherex}`} aria-hidden="true" />
      <h3 className={styles.cardName}>{survey.shortName}</h3>
      <p className={styles.cardStrength}>{SPHEREX_FRAMES.length} infrared channels · {shortYears(survey.epoch)}</p>
      <p className={styles.cardBands}>{survey.wavelength}</p>
      <p className="small muted">Choose Color to explore SPHEREx wavelengths.</p>
    </section>
  </div>;
}
