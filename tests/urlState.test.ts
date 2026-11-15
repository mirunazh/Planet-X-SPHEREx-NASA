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

  it('applies the route being rendered, not a stale address bar (back from Compare)', () => {
    // While Next renders the sky page, the address bar still shows the Compare page.
    location('?ra=10.68479&dec=41.26907&size=10&return=x');
    applyUrlState('ra=210.80227&dec=54.34895&mode=sky&fov=0.6&survey=spherex&f=46');
    const s = useNav.getState();
    expect(s.fov).toBe(0.6);
    expect(angularDistance(s.center, radecToVec(210.80227, 54.34895))).toBeLessThan(0.00001);
  });

  it('never rewrites another page’s address with a late debounced write', () => {
    vi.useFakeTimers();
    location('?ra=10&dec=20&fov=1');
    const stop = startUrlSync();
    try {
      replaceState.mockClear();
      useNav.getState().setView({ fov: 0.5 });
      vi.stubGlobal('window', { location: { search: '?ra=10&dec=20&size=10', pathname: '/compare' }, history: { state: null, replaceState } });
      vi.advanceTimersByTime(450);
      expect(replaceState).not.toHaveBeenCalled();
    } finally {
      stop();
    }
  });
});

describe('shareable demonstration views', () => {
  it.each(['spherex', 'twomass', 'allwise'] as const)('round trips position, zoom and the selected %s layer without waiting for address-bar sync', async (surveyId) => {
    const { buildViewUrl } = await import('@/lib/urlState');
    useNav.setState({ center: radecToVec(12.34567, -56.78901), fov: 0.05, surveyId, frame: 90 });
    const shared = new URL(buildViewUrl(useNav.getState(), 'https://example.com/explore?old=value#outdated'));
    expect(shared.pathname).toBe('/explore'); expect(shared.hash).toBe(''); expect(shared.searchParams.get('old')).toBeNull();
    expect(shared.searchParams.get('f')).toBe(surveyId === 'spherex' ? '90' : null);
    useNav.setState({ ...useNav.getInitialState(), anim: [] }); location(shared.search); applyUrlState();
    const restored = useNav.getState();
    expect(angularDistance(restored.center, radecToVec(12.34567, -56.78901))).toBeLessThan(0.00001);
    expect(restored.fov).toBe(0.05); expect(restored.surveyId).toBe(surveyId);
    if (surveyId === 'spherex') expect(restored.frame).toBe(90);
  });

  it('normalizes rounded RA at the 360-degree boundary', async () => {
    const { buildViewUrl } = await import('@/lib/urlState');
    const url = new URL(buildViewUrl({ ...useNav.getState(), center: radecToVec(359.9999999, 20) }, 'https://example.com/'));
    expect(url.searchParams.get('ra')).toBe('0.00000');
    location(url.search); applyUrlState();
    expect(angularDistance(useNav.getState().center, radecToVec(0, 20))).toBeLessThan(0.00001);
  });

  it('shares locked target coordinates and layer even after the current view moves elsewhere', async () => {
    const { buildTargetUrl } = await import('@/lib/urlState');
    const { buildSkyTarget } = await import('@/lib/sky/target');
    const target = buildSkyTarget({ center: radecToVec(10.68, 41.27), fovDeg: 0.5, uncertaintyArcsec: 13, survey: 'spherex', hipsUrl: 'https://irsa.ipac.caltech.edu/', frames: [46], origin: 'pin' });
    useNav.setState({ center: radecToVec(200, -20), fov: 10, surveyId: 'allwise' });
    const url = new URL(buildTargetUrl(target, 'https://example.com/explore'));
    location(url.search); applyUrlState();
    expect(angularDistance(useNav.getState().center, radecToVec(target.ra, target.dec))).toBeLessThan(0.00001);
    expect(useNav.getState()).toMatchObject({ surveyId: 'spherex', frame: 46, fov: 0.5, locked: null });
  });
});
