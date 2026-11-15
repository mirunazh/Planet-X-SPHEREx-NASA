'use client';

/** Progress at a glance: figurines found, a friendly rank and the three sky quests. No streaks, timers or pressure. */
import { useId } from 'react';
import { FIGURINE_ORDER, rankFor } from '@/lib/game/figurines';
import { QUESTS, QUEST_ORDER } from '@/lib/game/quests';
import { isUnlocked, useGame } from '@/lib/game/store';
import styles from './SkyPassport.module.css';

export function SkyPassport() {
  const unlocked = useGame((s) => s.unlocked);
  const quests = useGame((s) => s.quests);
  const titleId = useId();
  const found = FIGURINE_ORDER.filter((id) => isUnlocked(id, unlocked)).length;

  return (
    <section className={styles.passport} aria-labelledby={titleId}>
      <h3 id={titleId} className={styles.title}>
        Sky passport · {found} of {FIGURINE_ORDER.length} figurines found
      </h3>
      <ul className={styles.dots} aria-hidden="true">
        {FIGURINE_ORDER.map((id) => (
          <li
            key={id}
            className={`${styles.dot} ${isUnlocked(id, unlocked) ? styles.found : ''}`}
          />
        ))}
      </ul>
      <p className={styles.rank}>
        Rank: <strong>{rankFor(found)}</strong>
      </p>

      <h4 className={styles.questsTitle}>Sky quests</h4>
      <ul className={styles.quests}>
        {QUEST_ORDER.map((id) => {
          const done = quests[id] === true;
          return (
            <li key={id} className={`${styles.quest} ${done ? styles.done : ''}`}>
              <span className={styles.check} aria-hidden="true">
                {done && (
                  <svg width="12" height="12" viewBox="0 0 12 12" focusable="false">
                    <path d="M2.2 6.3 4.8 8.8 9.8 3.4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </span>
              <div>
                <p className={styles.questTitle}>
                  {QUESTS[id].title}
                  <span className={styles.srOnly}>{done ? ' (done)' : ' (not done yet)'}</span>
                </p>
                <p className={styles.questText}>{done ? QUESTS[id].takeaway : QUESTS[id].task}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
