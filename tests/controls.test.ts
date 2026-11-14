import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useSkyControls } from '@/components/useSkyControls';
import { INITIAL_VIEW, useNav } from '@/lib/store';
import { currentView, flyTo, runAnimations, startInertia } from '@/lib/navigation';
import { angularDistance, radecToVec } from '@/lib/sky/coords';

const effects = vi.hoisted(() => ({ cleanup: undefined as (() => void) | undefined }));
vi.mock('react', async (importOriginal) => ({
  ...await importOriginal<typeof import('react')>(),
  useEffect: (effect: () => (() => void) | void) => { effects.cleanup = effect() || undefined; },
}));

let keyboard: EventTarget;
let stage: EventTarget;

function key(value: string, tagName = 'DIV') {
  const event = new Event('keydown', { cancelable: true });
  Object.defineProperties(event, {
    key: { value },
    target: { value: { tagName } },
  });
  keyboard.dispatchEvent(event);
  return event;
}

beforeEach(() => {
  useNav.setState({ ...useNav.getInitialState(), anim: [], viewport: { width: 1600, height: 900, dpr: 1 } });
  keyboard = new EventTarget();
  stage = Object.assign(new EventTarget(), {
    getBoundingClientRect: () => ({ left: 0, top: 0, width: 1600, height: 900 }),
  });
  vi.stubGlobal('window', keyboard);
  useSkyControls({ current: stage as HTMLDivElement });
});

afterEach(() => {
  effects.cleanup?.();
  effects.cleanup = undefined;
  vi.unstubAllGlobals();
});

describe('panoramic controls', () => {
  it('clamps wheel zoom at the panoramic limits', () => {
    const wheel = (deltaY: number) => {
      const event = new Event('wheel', { cancelable: true });
      Object.assign(event, { clientX: 800, clientY: 450, deltaY, deltaMode: 0 });
      stage.dispatchEvent(event);
      expect(event.defaultPrevented).toBe(true);
    };
    for (let i = 0; i < 30; i++) wheel(-300);
    expect(useNav.getState().fov).toBe(0.05);
    for (let i = 0; i < 30; i++) wheel(300);
    expect(useNav.getState().fov).toBe(100);
    expect(useNav.getState().mode).toBe('sky');
    expect(useNav.getState().anim).toHaveLength(0);
  });

  it('keeps keyboard zoom and the former S shortcut inside the panorama', () => {
    for (let i = 0; i < 30; i++) key('+');
    expect(useNav.getState().fov).toBe(0.05);
    for (let i = 0; i < 40; i++) key('-');
    expect(useNav.getState().fov).toBe(100);
    key('s');
    expect(useNav.getState().mode).toBe('sky');
    expect(useNav.getState().anim).toHaveLength(0);
  });

  it.each(['DIV', 'BUTTON'])('resets with Home when a %s has focus', (tagName) => {
    useNav.setState({ center: radecToVec(10, 40), fov: 0.05 });
    expect(key('Home', tagName).defaultPrevented).toBe(true);
    runAnimations(0);
    runAnimations(4000);
    expect(angularDistance(useNav.getState().center, INITIAL_VIEW.center)).toBeLessThan(1e-6);
    expect(useNav.getState().fov).toBe(60);
    expect(useNav.getState().mode).toBe('sky');
  });

  it('preserves Home text editing and native button activation', () => {
    expect(key('Home', 'INPUT').defaultPrevented).toBe(false);
    expect(key('Enter', 'BUTTON').defaultPrevented).toBe(false);
    expect(useNav.getState().anim).toHaveLength(0);
  });

  it.each(['A', 'SUMMARY'])('preserves native keyboard activation for %s', (tagName) => {
    expect(key('Enter', tagName).defaultPrevented).toBe(false);
    expect(key('Home', tagName).defaultPrevented).toBe(false);
  });

  it('keeps navigation shortcuts from moving the sky behind an open dialog', () => {
    useNav.setState({ panel: 'help' });
    const view = currentView();
    for (const value of ['ArrowLeft', '+', 'Home', 'r', 'g']) key(value);
    expect(currentView()).toEqual(view);
    expect(useNav.getState().anim).toHaveLength(0);
    expect(useNav.getState().showGrid).toBe(false);
  });

  it.each(['DIV', 'BUTTON', 'INPUT'])('stops a flight with Escape when a %s has focus', (tagName) => {
    flyTo(radecToVec(10, 40), 0.05);
    runAnimations(0);
    runAnimations(100);
    const stopped = currentView();
    key('Escape', tagName);
    runAnimations(4000);
    expect(currentView()).toEqual(stopped);
    expect(useNav.getState().busy).toBe(false);
  });

  it('stops inertia and closes an open panel with Escape', () => {
    useNav.setState({ panel: 'help' });
    startInertia([0, 0, 1], 1);
    runAnimations(0);
    runAnimations(100);
    const stopped = currentView();
    key('Escape');
    runAnimations(4000);
    expect(currentView()).toEqual(stopped);
    expect(useNav.getState().panel).toBe('none');
  });

  it('removes keyboard listeners on cleanup', () => {
    effects.cleanup?.();
    key('Home');
    expect(useNav.getState().anim).toHaveLength(0);
  });
});
