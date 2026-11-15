'use client';

import {
  useEffect,
  useEffectEvent,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent as ReactMouseEvent,
} from 'react';
import { createPortal } from 'react-dom';
import type { HelpStep } from '@/content/help';
import { placeCallout, spotlightBox, type Box, type CalloutPlacement } from './placement';
import { useIsClient } from './useIsClient';
import styles from './TourOverlay.module.css';

/** How often the page is checked for tour targets that appeared or disappeared. */
const RESCAN_MS = 250;

interface Layout {
  spot: Box | null;
  card: { top: number; left: number; placement: CalloutPlacement };
}

function isShown(node: HTMLElement): boolean {
  if (node.closest('[data-tour-overlay]')) return false;
  if (typeof node.checkVisibility === 'function' && !node.checkVisibility({ checkOpacity: true, checkVisibilityCSS: true })) {
    return false;
  }
  const rect = node.getBoundingClientRect();
  return rect.width > 0 && rect.height > 0;
}

/** The first visible element carrying `data-tour="<tour>"` (a screen may render hidden variants). */
function findTarget(tour: string): HTMLElement | null {
  const nodes = document.querySelectorAll<HTMLElement>(`[data-tour="${CSS.escape(tour)}"]`);
  for (const node of nodes) if (isShown(node)) return node;
  return null;
}

function scan(steps: HelpStep[]): boolean[] {
  return steps.map((step) => findTarget(step.tour) !== null);
}

function sameFlags(a: boolean[] | null, b: boolean[]): boolean {
  return !!a && a.length === b.length && a.every((value, i) => value === b[i]);
}

function near(a: number, b: number): boolean {
  return Math.abs(a - b) < 0.5;
}

function sameBox(a: Box | null, b: Box | null): boolean {
  if (!a || !b) return a === b;
  return near(a.top, b.top) && near(a.left, b.left) && near(a.width, b.width) && near(a.height, b.height);
}

function sameLayout(a: Layout | null, b: Layout): boolean {
  return (
    !!a &&
    sameBox(a.spot, b.spot) &&
    a.card.placement === b.card.placement &&
    near(a.card.top, b.card.top) &&
    near(a.card.left, b.card.left)
  );
}

function viewport() {
  return { width: window.innerWidth, height: window.innerHeight };
}

const FOCUSABLE = 'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])';

/**
 * Guided tour: dims the page, rings each step's `[data-tour]` element and explains it in a
 * callout card. Steps whose element is missing or hidden are skipped. Escape closes it.
 */
export function TourOverlay({ steps, open, onClose }: { steps: HelpStep[]; open: boolean; onClose: () => void }) {
  const isClient = useIsClient();
  if (!open || !isClient) return null;
  // A different list of steps starts a fresh tour.
  const key = steps.map((step) => step.tour).join(' ');
  return createPortal(<Tour key={key} steps={steps} onClose={onClose} />, document.body);
}

function Tour({ steps, onClose }: { steps: HelpStep[]; onClose: () => void }) {
  /** Which steps currently have a visible element; null until the first scan. */
  const [shown, setShown] = useState<boolean[] | null>(null);
  /** Index into `steps` of the current stop, or -1 when nothing can be shown. */
  const [index, setIndex] = useState(-1);
  const [layout, setLayout] = useState<Layout | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef(steps);
  const shownRef = useRef<boolean[] | null>(null);
  const layoutRef = useRef<Layout | null>(null);
  const titleId = useId();
  const textId = useId();
  const close = useEffectEvent(() => onClose());

  useLayoutEffect(() => {
    stepsRef.current = steps;
  });

  // First scan before the first paint, so the tour opens on its first visible step.
  useLayoutEffect(() => {
    const first = scan(stepsRef.current);
    shownRef.current = first;
    setShown(first);
    setIndex(first.indexOf(true));
  }, []);

  // When the current step's element disappears, move on to the next visible one (or back).
  useEffect(() => {
    if (!shown || (index >= 0 && shown[index])) return;
    let next = shown.findIndex((ok, i) => ok && i > index);
    if (next < 0) {
      for (let i = Math.min(index, shown.length) - 1; i >= 0; i -= 1) {
        if (shown[i]) {
          next = i;
          break;
        }
      }
    }
    setIndex(next);
  }, [shown, index]);

  // Follow the target every frame (it may move, resize or scroll) and rescan the page ~4 times a second.
  useLayoutEffect(() => {
    let frame = 0;
    let lastScan = performance.now();
    let target: HTMLElement | null = null;
    const tour = index >= 0 ? stepsRef.current[index]?.tour : undefined;

    const measure = () => {
      if (tour && (!target || !target.isConnected)) target = findTarget(tour);
      const view = viewport();
      const rect = target?.getBoundingClientRect();
      const spot = rect ? spotlightBox({ top: rect.top, left: rect.left, width: rect.width, height: rect.height }, view) : null;
      const card = cardRef.current;
      const size = card ? { width: card.offsetWidth, height: card.offsetHeight } : { width: 0, height: 0 };
      const next: Layout = { spot, card: placeCallout(spot, size, view) };
      if (!sameLayout(layoutRef.current, next)) {
        layoutRef.current = next;
        setLayout(next);
      }
    };

    const tick = (now: number) => {
      if (now - lastScan >= RESCAN_MS) {
        lastScan = now;
        const latest = scan(stepsRef.current);
        if (!sameFlags(shownRef.current, latest)) {
          shownRef.current = latest;
          setShown(latest);
        }
        if (tour) target = findTarget(tour);
      }
      measure();
      frame = requestAnimationFrame(tick);
    };

    measure();
    frame = requestAnimationFrame(tick);
    window.addEventListener('resize', measure);
    window.addEventListener('scroll', measure, true);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', measure);
      window.removeEventListener('scroll', measure, true);
    };
  }, [index]);

  // Bring a step that is scrolled out of sight into view.
  useEffect(() => {
    if (index < 0) return;
    const tour = stepsRef.current[index]?.tour;
    const target = tour ? findTarget(tour) : null;
    if (!target) return;
    const rect = target.getBoundingClientRect();
    const view = viewport();
    if (rect.top >= 0 && rect.left >= 0 && rect.bottom <= view.height && rect.right <= view.width) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    target.scrollIntoView({
      block: rect.height > view.height * 0.6 ? 'start' : 'center',
      inline: 'nearest',
      behavior: reduce ? 'auto' : 'smooth',
    });
  }, [index]);

  // Escape closes the tour from anywhere; focus returns where it was when the tour opened.
  useEffect(() => {
    const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      event.preventDefault();
      event.stopPropagation();
      close();
    };
    window.addEventListener('keydown', onKey, true);
    return () => {
      window.removeEventListener('keydown', onKey, true);
      if (previous && previous !== document.body && previous.isConnected) previous.focus({ preventScroll: true });
    };
  }, []);

  // The callout takes focus when the tour opens, and again if focus ever leaves it.
  const ready = shown !== null;
  useEffect(() => {
    const card = cardRef.current;
    if (!ready || !card || card.contains(document.activeElement)) return;
    card.focus({ preventScroll: true });
  }, [ready, index]);

  const order = shown ? shown.flatMap((ok, i) => (ok ? [i] : [])) : [];
  const position = order.indexOf(index);
  const step = position >= 0 ? steps[index] : undefined;
  const isFirst = position <= 0;
  const isLast = position === order.length - 1;

  const goBack = () => {
    if (position > 0) setIndex(order[position - 1]);
  };
  const goNext = () => {
    if (position >= 0 && position < order.length - 1) setIndex(order[position + 1]);
    else onClose();
  };

  const onKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    // While the tour is open, keys must not reach the sky's shortcuts (arrows pan, Enter locks).
    event.stopPropagation();
    if (event.key === 'ArrowRight' && step && !isLast) {
      event.preventDefault();
      goNext();
    } else if (event.key === 'ArrowLeft' && step && !isFirst) {
      event.preventDefault();
      goBack();
    } else if (event.key === 'Tab') {
      const card = cardRef.current;
      const items = card ? Array.from(card.querySelectorAll<HTMLElement>(FOCUSABLE)) : [];
      if (!card || items.length === 0) {
        event.preventDefault();
        return;
      }
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;
      if (event.shiftKey && (active === first || active === card || !card.contains(active))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (active === last || !card.contains(active))) {
        event.preventDefault();
        first.focus();
      }
    }
  };

  // Clicks on the dimmed page do nothing and must not steal focus from the callout.
  const onMouseDown = (event: ReactMouseEvent<HTMLDivElement>) => {
    if (!cardRef.current?.contains(event.target as Node)) event.preventDefault();
  };

  const centred = !layout || layout.card.placement === 'center';
  const spot = layout?.spot ?? null;

  return (
    <div className={styles.root} data-tour-overlay="" onKeyDown={onKeyDown} onMouseDown={onMouseDown}>
      {spot ? (
        <div
          className={styles.spot}
          style={{ top: spot.top, left: spot.left, width: spot.width, height: spot.height }}
          aria-hidden="true"
        />
      ) : (
        <div className={styles.dim} aria-hidden="true" />
      )}

      {ready && (
        <div
          ref={cardRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          aria-describedby={textId}
          tabIndex={-1}
          className={`${styles.card} ${centred ? styles.centred : ''}`}
          style={centred || !layout ? undefined : { top: layout.card.top, left: layout.card.left }}
        >
          {step ? (
            <>
              <div aria-live="polite" aria-atomic="true">
                <p className={styles.count}>
                  Step {position + 1} of {order.length}
                </p>
                <h2 id={titleId} className={styles.title}>
                  {step.title}
                </h2>
                <p id={textId} className={styles.text}>
                  {step.text}
                </p>
              </div>
              <div className={styles.actions}>
                <button
                  type="button"
                  className={styles.button}
                  aria-disabled={isFirst || undefined}
                  onClick={goBack}
                >
                  Back
                </button>
                <button type="button" className={`${styles.button} ${styles.primary}`} onClick={goNext}>
                  {isLast ? 'Done' : 'Next'}
                </button>
              </div>
              <button type="button" className={styles.close} aria-label="Close the tour" onClick={onClose}>
                ×
              </button>
            </>
          ) : (
            <>
              <h2 id={titleId} className={styles.title}>
                Nothing to point at yet
              </h2>
              <p id={textId} className={styles.text}>
                The parts of the screen this tour explains are not showing right now.
              </p>
              <div className={styles.actions}>
                <button type="button" className={`${styles.button} ${styles.primary}`} onClick={onClose}>
                  Close
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
