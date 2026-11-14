import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { INITIAL_VIEW, useNav } from '@/lib/store';
import { applyUrlState, startUrlSync } from '@/lib/urlState';
import { angularDistance, radecToVec } from '@/lib/sky/coords';

const replaceState = vi.fn();

function location(search: string) {
  vi.stubGlobal('window', { location: { search, pathname: '/' }, history: { state: null, replaceState } });
}

beforeEach(() => {
  useNav.setState({ ...useNav.getInitialState(), anim: [] });
  replaceState.mockClear();
});

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

describe('panoramic deep links', () => {
  it.each(['?mode=globe&d=3.2', '?mode=globe', '?mode=sky', '', '?mode=unknown&d=8'])(
    'opens legacy or incomplete links in the panorama: %s', (query) => {
      location(query + (query ? '&' : '?') + 'ra=10.68479&dec=41.26907&survey=allwise');
      applyUrlState();
      const s = useNav.getState();
      expect(s.mode).toBe('sky');
      expect(s.fov).toBe(INITIAL_VIEW.fov);
      expect(angularDistance(s.center, radecToVec(10.68479, 41.26907))).toBeLessThan(1e-6);
      expect(s.origin).toBe('deeplink');
      expect(s.surveyId).toBe('allwise');
    },
  );

  it.each([['0.001', 0.05], ['140', 100], ['1.5', 1.5], ['NaN', 60], ['', 60]])(
    'validates and clamps the field of view %s', (fov, expected) => {
      location(`?ra=359.9&dec=-40&fov=${fov}`);
      applyUrlState();
      expect(useNav.getState().fov).toBe(expected);
      expect(useNav.getState().mode).toBe('sky');
    },
  );

  it('keeps survey and wavelength settings from legacy links', () => {
    location('?mode=globe&d=8&ra=10&dec=20&survey=spherex&f=46');
    applyUrlState();
    expect(useNav.getState().surveyId).toBe('spherex');
    expect(useNav.getState().frame).toBe(46);
  });

  it('canonicalizes old links and writes only sky field of view after navigation', () => {
    vi.useFakeTimers();
    location('?mode=globe&d=3&ra=10&dec=20');
    applyUrlState();
    const stop = startUrlSync();
    try {
      const first = new URL(replaceState.mock.lastCall![2], 'http://localhost').searchParams;
      expect(first.get('mode')).toBe('sky');
      expect(first.get('d')).toBeNull();
      expect(first.get('fov')).toBe('60');
      useNav.getState().setView({ center: radecToVec(40, -10), fov: 0.05 });
      vi.advanceTimersByTime(450);
      const next = new URL(replaceState.mock.lastCall![2], 'http://localhost').searchParams;
      expect(next.get('mode')).toBe('sky');
      expect(next.get('fov')).toBe('0.05');
      expect(Number(next.get('ra'))).toBeCloseTo(40, 5);
      expect(Number(next.get('dec'))).toBeCloseTo(-10, 5);
      expect(next.get('d')).toBeNull();
    } finally {
      stop();
    }
  });
});
