'use client';

/**
 * Places, game style: the featured places as numbered levels, the weekly challenge, and
 * every featured target in a collapsed list so nothing from the full HUD is lost.
 */
import Link from 'next/link';
import { useEffect, useId, useRef } from 'react';
import { Sheet } from '@/components/ui/Sheet';
import { DEMO_TARGET_IDS } from '@/components/hud/DemoPlaces';
import { type Pin, useNav } from '@/lib/store';
import { visitPin } from '@/lib/navigation';
import { loadPins } from '@/lib/pins';
import { formatAngle } from '@/lib/sky/format';
import styles from './PlacesSheet.module.css';

const KIND_LABELS: Record<string, string> = {
  galaxy: 'Galaxy',
  star: 'Star',
  'deep-field': 'Deep field',
  reference: 'Reference point',
};

/** Plain type of a featured target, e.g. 'deep-field' → 'Deep field'. */
function plainKind(kind?: string): string {
  if (!kind) return 'Place';
  if (KIND_LABELS[kind]) return KIND_LABELS[kind];
  const words = kind.replaceAll('-', ' ');
  return words.charAt(0).toUpperCase() + words.slice(1);
}

/** First sentence only ("3.3 µm" does not end one); the full text stays in the place's details. */
function firstSentence(text: string): string {
  return text.match(/^.*?[.!?](?=\s|$)/)?.[0] ?? text;
}

function LevelCard({ pin, level, current, onFly }: { pin: Pin; level: number; current: boolean; onFly: (pin: Pin) => void }) {
  const id = useId();
  return (
    <li className={styles.level} data-current={current ? 'true' : undefined}>
      <div className={styles.levelTop}>
        <span className={styles.badge} aria-hidden="true">{level}</span>
        <span className={styles.levelLabel}>Level {level}</span>
        <span className={styles.kind}>{plainKind(pin.targetKind)}</span>
      </div>
      <h3 id={`${id}-name`} className={styles.levelName}>{pin.name}</h3>
      {pin.description && <p className={styles.levelLine}>{firstSentence(pin.description)}</p>}
      {current && <p className={styles.current}>Selected</p>}
      <button type="button" id={`${id}-fly`} className={styles.fly} aria-labelledby={`${id}-fly ${id}-name`} onClick={() => onFly(pin)}>
        Fly there
      </button>
    </li>
  );
}

export function PlacesSheet({ open, onClose, onVisited }: { open: boolean; onClose: () => void; onVisited?: () => void }) {
  const targets = useNav((s) => s.targets);
  const selected = useNav((s) => s.selected);
  const status = useNav((s) => s.dataStatus);
  const levels = DEMO_TARGET_IDS.flatMap((id) => targets.filter((pin) => pin.id === id));
  const rootRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef<HTMLDivElement>(null);
  const refocusAfterRetry = useRef(false);

  // Retry removes its own button while loading; once loading ends, focus the first action again.
  useEffect(() => {
    if (!refocusAfterRetry.current || status === 'loading' || status === 'idle') return;
    refocusAfterRetry.current = false;
    rootRef.current?.querySelector<HTMLElement>('button, summary, a[href]')?.focus();
  }, [status]);

  const fly = (pin: Pin) => {
    visitPin(pin);
    onVisited?.();
    onClose();
  };

  const retry = () => {
    refocusAfterRetry.current = true;
    stateRef.current?.focus();
    void loadPins();
  };

  return (
    <Sheet open={open} onClose={onClose} title="Places" side="bottom">
      <div ref={rootRef} className={styles.root} data-tour="places-sheet">
        {levels.length > 0 && <p className={styles.lead}>Step 1: pick a place. We fly you there, then you can compare its photos over time.</p>}
        {levels.length > 0 && (
          <ol className={styles.levels} aria-label="Featured places">
            {levels.map((pin, index) => (
              <LevelCard key={pin.id} pin={pin} level={index + 1} current={selected?.id === pin.id} onFly={fly} />
            ))}
          </ol>
        )}
        <div ref={stateRef} className={styles.state} role="status" tabIndex={-1}>
          {(status === 'idle' || status === 'loading') && <p>Loading featured places…</p>}
          {status === 'error' && <p>Featured places could not load. You can still search by coordinates.</p>}
          {status === 'ready' && targets.length === 0 && <p>No featured places available. You can still search by name or coordinates.</p>}
          {status === 'ready' && targets.length > 0 && levels.length === 0 && <p>No featured levels available. Every place is listed under All places.</p>}
        </div>
        {status === 'error' && (
          <button type="button" className={styles.retry} onClick={retry}>
            Retry places
          </button>
        )}
        {/* Close first: the sheet state outlives the page, so it would be open again on return. */}
        <Link className={styles.challenge} href="/compare?challenge=weekly" onClick={onClose}>
          <span className={styles.challengeText}>
            <span className={styles.challengeEyebrow}>Challenge</span>
            <span className={styles.challengeTitle}>Weekly sky challenge</span>
            <span className={styles.challengeSub}>Revisit M101 · prepared image slideshow</span>
          </span>
          <span className={styles.arrow} aria-hidden="true">›</span>
        </Link>
        {targets.length > 0 && (
          <details className={styles.all}>
            <summary>
              <span className={styles.chevron} aria-hidden="true">›</span>
              All places <span className={styles.count}>({targets.length})</span>
            </summary>
            <ul className={styles.allList}>
              {targets.map((pin) => (
                <li key={pin.id}>
                  <button type="button" className={styles.allItem} aria-current={selected?.id === pin.id ? 'true' : undefined} onClick={() => fly(pin)}>
                    <span className={styles.allName}>{pin.name}</span>
                    <span className={styles.allMeta}>
                      {plainKind(pin.targetKind)} · {formatAngle(pin.fov)} view
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </details>
        )}
      </div>
    </Sheet>
  );
}
