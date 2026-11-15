'use client';

/**
 * Turns navigator activity into game events. Call once, in the component that
 * owns the simple HUD. It only reads useNav; it never changes the view.
 */
import { useEffect, useLayoutEffect } from 'react';
import { useNav } from '@/lib/store';
import { LOCK_MAX_FOV } from '@/lib/sky/view';
import { type GameEvent, useGame } from './store';
import { withPlanetData } from './fieldGuide';

/**
 * Deep links and first-frame setup move the view and set the color by themselves;
 * ignore that as "looking around" or "picking a color" (which finishes a quest).
 */
const SETTLE_MS = 1500;

/** Layout effect in the browser so saved progress is in place before the first paint. */
const useBrowserLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

export function useGameEvents(): void {
  useBrowserLayoutEffect(() => {
    const record = (event: GameEvent) => useGame.getState().record(event);
    useGame.getState().hydrate();
    record({ type: 'usedSurvey', surveyId: useNav.getState().surveyId });
    const settledAt = performance.now() + SETTLE_MS;

    const stopNav = useNav.subscribe((s, prev) => {
      // Only user motion counts: flights and inertia run through the animation queue.
      if (s.center !== prev.center && useNav.getState().anim.length === 0 && performance.now() >= settledAt) {
        record({ type: 'lookedAround' });
      }
      if (s.selected !== prev.selected) {
        if (s.selected) {
          const pin = withPlanetData(s.selected, s.hosts);
          record(pin.kind === 'target'
            ? { type: 'visitedPlace', pin, surveyId: s.surveyId }
            : { type: 'selectedPin', pin, surveyId: s.surveyId });
        } else {
          useGame.getState().endVisit();
        }
      }
      if (s.surveyId !== prev.surveyId) record({ type: 'usedSurvey', surveyId: s.surveyId });
      if (s.frame !== prev.frame && performance.now() >= settledAt) record({ type: 'changedColor' });
      if (s.fov !== prev.fov && s.fov <= LOCK_MAX_FOV) record({ type: 'zoomedClose' });
    });

    // After "start over", the telescope on screen counts as used again.
    const stopGame = useGame.subscribe((g, prev) => {
      if (g.surveysUsed.length === 0 && prev.surveysUsed.length > 0) record({ type: 'usedSurvey', surveyId: useNav.getState().surveyId });
    });

    return () => {
      stopNav();
      stopGame();
    };
  }, []);
}
