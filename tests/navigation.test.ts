import { beforeEach, describe, expect, it } from 'vitest';
import { INITIAL_VIEW, useNav } from '@/lib/store';
import { cancelAnimations, currentView, flyTo, panByScreen, resetView, runAnimations, startInertia, zoomAt } from '@/lib/navigation';
import { angularDistance, radecToVec } from '@/lib/sky/coords';
import { cameraBasis, pickSky, SKY_MAX_FOV, SKY_MIN_FOV } from '@/lib/sky/view';
import { flyPath } from '@/lib/sky/flyto';

beforeEach(() => {
  useNav.setState({ ...useNav.getInitialState(), anim: [], viewport: { width: 1600, height: 900, dpr: 1 } });
});

function finishFlight() {
  for (let now = 0; now <= 4000; now += 16) {
    runAnimations(now);
    const view = currentView();
    expect(view.mode).toBe('sky');
    expect(view.fov).toBeGreaterThanOrEqual(SKY_MIN_FOV);
    expect(view.fov).toBeLessThanOrEqual(SKY_MAX_FOV);
    expect(cameraBasis(view).position).toEqual([0, 0, 0]);
  }
}

describe('panoramic navigation', () => {
  it('opens inside the sky at 60 degrees with the grid hidden', () => {
    expect(useNav.getState().mode).toBe('sky');
    expect(useNav.getState().fov).toBe(60);
    expect(useNav.getState().showGrid).toBe(false);
    expect(cameraBasis(currentView()).position).toEqual([0, 0, 0]);
  });

  it('clamps repeated zooms at both limits without queuing a transition', () => {
    for (let i = 0; i < 80; i++) zoomAt(0, 0, 0.7);
    expect(useNav.getState().fov).toBe(0.05);
    for (let i = 0; i < 80; i++) zoomAt(0, 0, 1 / 0.7);
    expect(useNav.getState().fov).toBe(100);
    expect(useNav.getState().mode).toBe('sky');
    expect(useNav.getState().anim).toHaveLength(0);
  });

  it('preserves the off-centre sky anchor when zoom reaches either limit', () => {
    const aspect = 1600 / 900;
    for (const [fov, factor] of [[99, 2], [0.06, 0.1]]) {
      useNav.setState({ ...INITIAL_VIEW, fov });
      const anchor = pickSky(currentView(), aspect, 0.2, -0.1)!;
      zoomAt(0.2, -0.1, factor);
      expect(angularDistance(pickSky(currentView(), aspect, 0.2, -0.1)!, anchor)).toBeLessThan(1e-5);
    }
  });

  it('pans and flies to a searched target while staying within panoramic limits', () => {
    panByScreen(0.15, -0.15);
    expect(angularDistance(useNav.getState().center, INITIAL_VIEW.center)).toBeGreaterThan(1);
    const target = radecToVec(10.68479, 41.26907);
    flyTo(target, 0.001, 'search');
    finishFlight();
    expect(angularDistance(useNav.getState().center, target)).toBeLessThan(1e-6);
    expect(useNav.getState().fov).toBe(SKY_MIN_FOV);
    expect(useNav.getState().origin).toBe('search');
  });

  it('resets from a deep zoom to the opening panorama', () => {
    useNav.setState({ center: radecToVec(10, 40), fov: SKY_MIN_FOV });
    resetView();
    finishFlight();
    expect(angularDistance(useNav.getState().center, INITIAL_VIEW.center)).toBeLessThan(1e-6);
    expect(useNav.getState().fov).toBe(60);
    expect(useNav.getState().busy).toBe(false);
  });

  it('cancels a flight or inertia at the current position', () => {
    for (const start of [() => flyTo(radecToVec(10, 40), 0.1), () => startInertia([0, 0, 1], 1)]) {
      start();
      runAnimations(0);
      runAnimations(100);
      const stopped = currentView();
      cancelAnimations();
      runAnimations(4000);
      expect(currentView()).toEqual(stopped);
      expect(useNav.getState().busy).toBe(false);
      expect(useNav.getState().anim).toHaveLength(0);
    }
  });

  it('bounds the entire flight path for widely separated deep zoom targets', () => {
    const path = flyPath(radecToVec(0, 0), SKY_MIN_FOV, radecToVec(179, 0), SKY_MIN_FOV);
    for (let i = 0; i <= 100; i++) {
      const point = path.at(i / 100);
      expect(point.fov).toBeGreaterThanOrEqual(SKY_MIN_FOV);
      expect(point.fov).toBeLessThanOrEqual(SKY_MAX_FOV);
      expect(point.center.every(Number.isFinite)).toBe(true);
    }
  });
});
