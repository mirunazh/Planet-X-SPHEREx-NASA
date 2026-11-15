'use client';

/**
 * The figurine dock: one patch per tool. Unlocked figurines open their panel;
 * locked ones stay focusable and explain how to find them. The parent places
 * the dock on the page; it only needs room to scroll sideways on small screens.
 */
import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { FIGURINES, FIGURINE_ORDER, type FigurineId } from '@/lib/game/figurines';
import { isUnlocked, useGame } from '@/lib/game/store';
import { Patch, PatchReveal, REVEAL_MS } from './Patch';
import styles from './FigurineDock.module.css';

const HINT_MS = 3500;
const BUBBLE_HALF_WIDTH = 120;

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches === true;

export function FigurineDock({ onOpen, active }: { onOpen: (id: FigurineId) => void; active?: FigurineId | null }) {
  const unlocked = useGame((s) => s.unlocked);
  const hydrated = useGame((s) => s.hydrated);
  const [revealing, setRevealing] = useState<FigurineId[]>([]);
  const [hint, setHint] = useState<{ id: FigurineId; left: number; caret: number } | null>(null);
  const [tabStop, setTabStop] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const seen = useRef<{ hydrated: boolean; unlocked: FigurineId[] } | null>(null);
  const timers = useRef<number[]>([]);

  // Animate unlocks that happen while the dock is on screen, never progress loaded from storage.
  useEffect(() => {
    const before = seen.current;
    seen.current = { hydrated, unlocked };
    if (!before?.hydrated || !hydrated || prefersReducedMotion()) return;
    const fresh = unlocked.filter((id) => !isUnlocked(id, before.unlocked));
    if (!fresh.length) return;
    setRevealing((list) => [...list, ...fresh.filter((id) => !list.includes(id))]);
    timers.current.push(window.setTimeout(() => setRevealing((list) => list.filter((id) => !fresh.includes(id))), REVEAL_MS + 80));
  }, [unlocked, hydrated]);

  useEffect(() => {
    const pending = timers.current;
    return () => pending.forEach((timer) => window.clearTimeout(timer));
  }, []);

  useEffect(() => {
    if (!hint) return;
    const timer = window.setTimeout(() => setHint(null), HINT_MS);
    return () => window.clearTimeout(timer);
  }, [hint]);

  // A figurine that unlocks while its hint is showing no longer needs the hint.
  useEffect(() => {
    if (hint && isUnlocked(hint.id, unlocked)) setHint(null);
  }, [hint, unlocked]);

  const showHint = (id: FigurineId, index: number) => {
    const wrap = wrapRef.current?.getBoundingClientRect();
    const button = buttons.current[index]?.getBoundingClientRect();
    if (!wrap || !button) return setHint({ id, left: 0, caret: 0 });
    const caret = button.left + button.width / 2 - wrap.left;
    const half = Math.min(BUBBLE_HALF_WIDTH, wrap.width / 2);
    setHint({ id, caret, left: Math.min(Math.max(caret, half), wrap.width - half) });
  };

  // Toolbar pattern: one tab stop, arrow keys move between figurines.
  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape' && hint) {
      // Only close the bubble; the sky's own Escape would also clear the selected pin.
      event.stopPropagation();
      setHint(null);
      return;
    }
    const step = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0;
    if (!step) return;
    event.preventDefault();
    event.stopPropagation();
    const count = Math.max(1, buttons.current.filter(Boolean).length);
    const next = (tabStop + step + count) % count;
    setTabStop(next);
    buttons.current[next]?.focus();
  };

  const hintFigurine = hint ? FIGURINES[hint.id] : null;
  // Locked figurines stay out of the dock until found: an unlock adds a new tool instead of crowding the dock.
  const visible = FIGURINE_ORDER.filter((id) => isUnlocked(id, unlocked));
  // After "Reset my progress" fewer figurines remain; the remembered stop must still land on one,
  // or none of them could be reached with Tab.
  const stop = Math.min(tabStop, Math.max(0, visible.length - 1));

  return (
    <div className={styles.wrap} ref={wrapRef}>
      <div className={styles.strip} role="toolbar" aria-label="Figurines" onKeyDown={onKeyDown} onScroll={() => setHint(null)}>
        {visible.map((id, index) => {
          const figurine = FIGURINES[id];
          const open = isUnlocked(id, unlocked);
          return (
            <button
              key={id}
              ref={(node) => {
                buttons.current[index] = node;
              }}
              type="button"
              className={`${styles.button} ${open ? '' : styles.locked}`}
              data-tour={`dock-${id}`}
              tabIndex={index === stop ? 0 : -1}
              aria-label={open ? figurine.label : `${figurine.label}, locked. ${figurine.unlockHint}`}
              aria-pressed={open ? active === id : undefined}
              aria-disabled={open ? undefined : 'true'}
              onFocus={() => setTabStop(index)}
              onClick={() => (open ? onOpen(id) : showHint(id, index))}
            >
              {revealing.includes(id) && open ? <PatchReveal id={id} size={56} /> : <Patch id={id} locked={!open} size={56} />}
              <span className={styles.label}>
                {figurine.label}
              </span>
            </button>
          );
        })}
      </div>
      <div className={styles.hintRegion} role="status" aria-live="polite">
        {hint && hintFigurine && (
          <>
            <p className={styles.bubble} style={{ left: hint.left }}>
              {hintFigurine.label} is locked. {hintFigurine.unlockHint} to find it.
            </p>
            <span className={styles.caret} style={{ left: hint.caret }} aria-hidden="true" />
          </>
        )}
      </div>
    </div>
  );
}
