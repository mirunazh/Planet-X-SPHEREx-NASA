'use client';

import { useEffect, useState } from 'react';
import { useNav } from '@/lib/store';
import { describeView } from '@/lib/caption';
import { cropPixels, initialCropSize } from '@/lib/comparison/region';
import { JourneyBar, type JourneyStep } from './JourneyBar';
import styles from './NextStep.module.css';

/** Zoomed in this far (degrees of sky on screen), a view counts as "looking closer". */
export const LOOK_CLOSER_FOV = 5;

const UNNAMED = new Set(['Along the Milky Way', 'Away from the Milky Way']);

/**
 * True while a fly-to runs: the square is not on its target yet, so comparing must wait. The spin
 * that continues after a flick shares the animation queue but is not a flight.
 */
export function isFlying(): boolean {
  return useNav.getState().anim.some((step) => step.kind === 'flight');
}

/**
 * Step 1 until a place is chosen or the view is zoomed in on a spot; then step 2.
 * `place` names what is really in the middle of the screen (never a place still being flown to).
 */
export function useJourney(): { step: 1 | 2; place: string | null; flying: boolean; destination: string | null } {
  const selectedName = useNav((s) => s.selected?.name ?? null);
  /** Only a place picked from the list or search is "the destination"; other flights keep an old selection. */
  const toPlace = useNav((s) => s.origin === 'pin');
  const zoomed = useNav((s) => s.fov <= LOOK_CLOSER_FOV);
  const [nearest, setNearest] = useState<string | null>(null);
  const [flying, setFlying] = useState(false);

  useEffect(() => {
    const update = () => {
      const s = useNav.getState();
      const { place } = describeView({ center: s.center, fov: s.fov, surveyId: s.surveyId, targets: s.targets });
      const named = UNNAMED.has(place) ? null : place;
      setNearest((previous) => (previous === named ? previous : named));
      // The animation queue is mutated in place (never rendered), so it is polled here.
      setFlying(isFlying());
    };
    update();
    const timer = window.setInterval(update, 250);
    return () => window.clearInterval(timer);
  }, []);

  const step = selectedName || zoomed ? 2 : 1;
  return { step, place: flying ? null : nearest, flying, destination: toPlace ? selectedName : null };
}

/** Size of the square that "Compare its photos" will use for the current view, in arcminutes. */
export function compareSize(): number {
  const { fov, viewport } = useNav.getState();
  return initialCropSize(fov, viewport.width / Math.max(1, viewport.height));
}

/** The patch of sky that will be compared, drawn at its true size in the middle of the screen. */
export function CompareArea() {
  const fov = useNav((s) => s.fov);
  const viewport = useNav((s) => s.viewport);
  const size = initialCropSize(fov, viewport.width / Math.max(1, viewport.height));
  const pixels = cropPixels(size, fov, viewport.height);
  return (
    <>
      <div className="comparison-crop" aria-hidden="true" style={{ width: pixels, height: pixels }} />
      <span className={styles.areaLabel} aria-hidden="true" style={{ top: `calc(50% + ${pixels / 2 + 8}px)` }}>
        Compare area · {size >= 1 ? size.toFixed(0) : size.toFixed(1)}′
      </span>
    </>
  );
}

/**
 * The one thing to do next, always in the same place: the journey bar, one sentence
 * and one primary button (plus a quieter alternative).
 */
export function NextStep({ step, place, flying = false, opening = false, destination = null, onChoosePlace, onCompare, onTelescope, onAdjust }: {
  step: 1 | 2;
  place: string | null;
  flying?: boolean;
  /** The Compare page is loading. */
  opening?: boolean;
  destination?: string | null;
  onChoosePlace: () => void;
  onCompare: () => void;
  onTelescope: () => void;
  onAdjust: () => void;
}) {
  const onSelect = (target: JourneyStep) => {
    if (target === 3 && step === 2) {
      if (!flying && !opening) onCompare();
    } else onChoosePlace();
  };
  return (
    <section className={styles.card} aria-label={`Step ${step} of 3`} data-tour="next-step">
      <JourneyBar step={step} onSelect={onSelect} />
      {step === 1 ? (
        <div className={styles.row}>
          <p className={styles.text}>You are looking out from Earth, in infrared light. Pick a place to visit, or drag the sky to explore.</p>
          <div className={styles.actions}>
            <button type="button" className={styles.primary} onClick={onChoosePlace}>
              <span className={styles.emoji} aria-hidden="true">🧭</span> Choose a place
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.row}>
          <p className={styles.text} aria-live="polite">
            {flying
              ? destination ? <>Flying to <strong>{destination}</strong>…</> : <>Flying there…</>
              : opening
                ? <>Opening the photos of <strong>{place ?? 'this spot'}</strong>…</>
                : <><strong>{place ?? 'This spot'}</strong> is inside the square. Look around, try other telescopes, then compare its photos.</>}
          </p>
          <div className={styles.actions}>
            <button type="button" className={styles.secondary} onClick={onTelescope}>
              <span className={styles.emoji} aria-hidden="true">🔭</span> Other telescopes
            </button>
            <button type="button" className={styles.primary} onClick={onCompare} disabled={flying || opening} aria-busy={opening || undefined}>
              <span className={styles.emoji} aria-hidden="true">🎞️</span> {flying ? 'Flying there…' : opening ? 'Opening photos…' : 'Compare its photos →'}
            </button>
          </div>
          <button type="button" className={styles.link} onClick={onAdjust}>Change the square</button>
        </div>
      )}
    </section>
  );
}
