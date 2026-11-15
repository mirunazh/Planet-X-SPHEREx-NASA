'use client';

/**
 * Announces the first queued game toast: a new figurine (with "Try it") or a
 * finished quest. A small card at the bottom that never covers the middle of the
 * sky (the place being looked at). Closes itself after 5 s, paused while hovered or focused.
 * The live region stays mounted so screen readers hear each new toast.
 */
import { useEffect, useRef, useState, type FocusEvent, type KeyboardEvent } from 'react';
import { FIGURINES, type FigurineId } from '@/lib/game/figurines';
import { QUESTS } from '@/lib/game/quests';
import { useGame } from '@/lib/game/store';
import { Patch } from './Patch';
import styles from './UnlockToast.module.css';

const AUTO_DISMISS_MS = 5000;

function QuestBadge() {
  return (
    <svg className={styles.badge} width="32" height="32" viewBox="0 0 64 64" aria-hidden="true" focusable="false">
      <circle cx="32" cy="32" r="31" fill="#ffb547" />
      <circle cx="32" cy="32" r="27.6" fill="none" stroke="#94661f" strokeWidth="1.7" strokeDasharray="3 2.2" strokeLinecap="round" />
      <circle cx="32" cy="32" r="23.4" fill="#f4f1e8" stroke="#94661f" strokeWidth="1.3" />
      <path d="M22.5 32.5 29 39 42 25.5" fill="none" stroke="#9a5b00" strokeWidth="4.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function UnlockToast({ onTry }: { onTry: (id: FigurineId) => void }) {
  const toast = useGame((s) => s.toasts[0] ?? null);
  const dismiss = useGame((s) => s.dismissToast);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const remaining = useRef(AUTO_DISMISS_MS);
  const returnFocus = useRef<HTMLElement | null>(null);

  // Every toast gets the full time; hover and focus are re-read because the card can outlive a toast.
  useEffect(() => {
    remaining.current = AUTO_DISMISS_MS;
    const card = cardRef.current;
    setHovered(card?.matches(':hover') ?? false);
    setFocused(card?.contains(document.activeElement) ?? false);
  }, [toast]);

  const paused = hovered || focused;
  useEffect(() => {
    if (!toast || paused) return;
    const started = performance.now();
    const timer = window.setTimeout(dismiss, remaining.current);
    return () => {
      window.clearTimeout(timer);
      remaining.current = Math.max(0, remaining.current - (performance.now() - started));
    };
  }, [toast, paused, dismiss]);

  const close = () => {
    const hadFocus = cardRef.current?.contains(document.activeElement) ?? false;
    const back = returnFocus.current;
    dismiss();
    // The close button stays for the next toast; give focus back only when the queue is empty.
    if (hadFocus && useGame.getState().toasts.length === 0 && back?.isConnected) back.focus();
  };

  const onFocus = (event: FocusEvent<HTMLDivElement>) => {
    const from = event.relatedTarget;
    if (!(from instanceof Node && event.currentTarget.contains(from))) returnFocus.current = from instanceof HTMLElement ? from : null;
    setFocused(true);
  };

  const onBlur = (event: FocusEvent<HTMLDivElement>) => {
    const to = event.relatedTarget;
    if (!(to instanceof Node && event.currentTarget.contains(to))) setFocused(false);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Escape') return;
    event.stopPropagation();
    close();
  };

  const figurine = toast?.kind === 'figurine' ? FIGURINES[toast.id] : null;
  const quest = toast?.kind === 'quest' ? QUESTS[toast.id] : null;

  return (
    <div className={styles.region} role="status" aria-live="polite">
      {toast && (figurine || quest) && (
        <div
          ref={cardRef}
          className={styles.toast}
          style={{ borderTopColor: 'var(--accent)' }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onFocus={onFocus}
          onBlur={onBlur}
          onKeyDown={onKeyDown}
        >
          <div key={`${toast.kind}:${toast.id}`} className={styles.content}>
            {toast.kind === 'figurine' && figurine ? (
              <>
                <Patch id={toast.id} size={32} />
                <div className={styles.text}>
                  <p className={styles.eyebrow}>New figurine found</p>
                  <p className={styles.title}>{figurine.label}</p>
                  <p className={styles.body}>{figurine.tip}</p>
                  <button
                    type="button"
                    className={styles.try}
                    onClick={() => {
                      onTry(toast.id);
                      dismiss();
                    }}
                  >
                    Try it
                  </button>
                </div>
              </>
            ) : (
              quest && (
                <>
                  <QuestBadge />
                  <div className={styles.text}>
                    <p className={styles.eyebrow}>Quest complete</p>
                    <p className={styles.title}>{quest.title}</p>
                    <p className={styles.body}>{quest.takeaway}</p>
                  </div>
                </>
              )
            )}
          </div>
          <button type="button" className={styles.close} aria-label="Close message" onClick={close}>
            <span aria-hidden="true">×</span>
          </button>
        </div>
      )}
    </div>
  );
}
