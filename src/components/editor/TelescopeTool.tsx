'use client';

import { useId } from 'react';
import { useNav } from '@/lib/store';
import { SPHEREX_FRAMES, SURVEYS, SURVEY_ORDER, type SurveyId } from '@/lib/sky/surveys';
import { CheckIcon } from './icons';
import styles from './tools.module.css';

/** What each telescope is best at, in plain words. */
const STRENGTH: Record<SurveyId, string> = {
  spherex: `${SPHEREX_FRAMES.length} infrared colors`,
  twomass: 'Sharpest detail',
  allwise: 'Longest infrared, warm dust',
};

const THUMB: Record<SurveyId, string> = {
  spherex: styles.thumbSpherex,
  twomass: styles.thumbTwomass,
  allwise: styles.thumbAllwise,
};

/** '2025-04-24 → 2026-05-14' → '2025–26', '2010–2011' → '2010–11', '1997–2001' stays. */
export function shortYears(epoch: string): string {
  const years = epoch.match(/\b\d{4}\b/g);
  if (!years) return epoch;
  const first = years[0];
  const last = years[years.length - 1];
  if (first === last) return first;
  return first.slice(0, 2) === last.slice(0, 2) ? `${first}–${last.slice(2)}` : `${first}–${last}`;
}

/** Three big cards, like the filter thumbnails in the iOS Photos editor. */
export function TelescopeTool() {
  const surveyId = useNav((s) => s.surveyId);
  const id = useId();

  return (
    <div className={styles.cards} role="radiogroup" aria-label="Choose a telescope">
      {SURVEY_ORDER.map((sid) => {
        const survey = SURVEYS[sid];
        const on = sid === surveyId;
        return (
          <label key={sid} className={`${styles.card} ${on ? styles.cardOn : ''}`}>
            <input type="radio" className="sr-only" name={`${id}-telescope`} value={sid} checked={on}
              aria-labelledby={`${id}-${sid}-name`} aria-describedby={`${id}-${sid}-strength ${id}-${sid}-bands`}
              onChange={() => useNav.getState().setSurvey(sid)} />
            <span className={`${styles.thumb} ${THUMB[sid]}`} aria-hidden="true">
              {on && <span className={styles.check}><CheckIcon width={14} height={14} /></span>}
            </span>
            <span className={styles.cardName} id={`${id}-${sid}-name`}>{survey.shortName}</span>
            <span className={styles.cardStrength} id={`${id}-${sid}-strength`}>
              {STRENGTH[sid]} · <span className={styles.years}>{shortYears(survey.epoch)}</span>
            </span>
            <span className={styles.cardBands} id={`${id}-${sid}-bands`}>{survey.wavelength}</span>
          </label>
        );
      })}
    </div>
  );
}
