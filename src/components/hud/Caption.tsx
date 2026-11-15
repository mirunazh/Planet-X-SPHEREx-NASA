'use client';

/**
 * One plain-words line about the view: where it points and which telescope took the picture.
 * Not a live region (the PositionAnnouncer speaks the position). The integrator positions it.
 */
import { useEffect, useState } from 'react';
import { type ViewCaption, describeView } from '@/lib/caption';
import { type NavState, useNav } from '@/lib/store';
import styles from './Caption.module.css';

const REFRESH_MS = 300;

/** The telescope follows the image on screen (as image sources do), the request until one arrives. */
function captionOf(s: NavState): ViewCaption {
  return describeView({ center: s.center, fov: s.fov, surveyId: s.displayedLayer?.surveyId ?? s.surveyId, targets: s.targets });
}

export function Caption() {
  const [caption, setCaption] = useState(() => captionOf(useNav.getState()));

  // Subscribe outside React rendering so flights (one store update per frame) cost at most one render per 300 ms.
  useEffect(() => {
    let last = 0;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const refresh = () => {
      timer = undefined;
      last = Date.now();
      const next = captionOf(useNav.getState());
      setCaption((prev) => (prev.place === next.place && prev.telescope === next.telescope ? prev : next));
    };
    refresh();
    const unsubscribe = useNav.subscribe((s, prev) => {
      if (
        s.center === prev.center &&
        s.fov === prev.fov &&
        s.surveyId === prev.surveyId &&
        s.displayedLayer === prev.displayedLayer &&
        s.targets === prev.targets
      ) {
        return;
      }
      if (timer === undefined) timer = setTimeout(refresh, Math.max(0, REFRESH_MS - (Date.now() - last)));
    });
    return () => {
      unsubscribe();
      clearTimeout(timer);
    };
  }, []);

  return (
    <p className={styles.caption} data-tour="caption">
      <span className={styles.place}>{caption.place}</span>
      {' · '}
      <span className={styles.telescope}>{caption.telescope}</span>
    </p>
  );
}
