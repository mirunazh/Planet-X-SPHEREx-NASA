/**
 * Navigation actions: panoramic zoom, pan, fly-to, inertia and
 * target lock. Animations are queued steps run once per frame by <Navigator>.
 */
import { type AnimStep, type Pin, INITIAL_VIEW, useNav } from './store';
import { type FlyPath, flyPath } from './sky/flyto';
import {
  type Vec3,
  applyQuat,
  normalize,
  quatFromAxisAngle,
} from './sky/coords';
import {
  LOCK_MAX_FOV,
  SKY_MAX_FOV,
  SKY_MIN_FOV,
  type View,
  clampCenter,
  pickSky,
  pixelScaleDeg,
  solveAnchor,
} from './sky/view';
import { SPHEREX_FRAMES, SURVEYS } from './sky/surveys';
import { type TargetOrigin, buildSkyTarget } from './sky/target';
import { requestedLayer, sameLayer } from './sky/layer';

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
const reducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches === true;
const dur = (ms: number) => (reducedMotion() ? 0 : ms);

export function currentView(): View {
  const s = useNav.getState();
  return { mode: s.mode, center: s.center, fov: s.fov, distance: s.distance };
}

export function viewportAspect(): number {
  const { width, height } = useNav.getState().viewport;
  return width / Math.max(1, height);
}

// ---------------------------------------------------------------------------
// Animation queue
// ---------------------------------------------------------------------------

/** Stops flights and inertia at the current panoramic view. */
export function cancelAnimations(): void {
  const s = useNav.getState();
  s.anim.length = 0;
  useNav.setState({ busy: false, navigationRevision: s.navigationRevision + 1 });
}

function enqueue(steps: AnimStep[]): void {
  if (!steps.length) return;
  useNav.getState().anim.push(...steps);
  useNav.setState({ busy: true });
}

export function runAnimations(now: number): void {
  const q = useNav.getState().anim;
  for (let guard = 0; q.length && guard < 6; guard++) {
    const step = q[0];
    if (step.start === undefined) {
      step.start = now;
      step.init?.();
    }
    const t = step.duration > 0 ? Math.min(1, (now - step.start) / step.duration) : 1;
    step.update(t);
    if (t < 1) return;
    q.shift();
    step.done?.();
  }
  if (!q.length && useNav.getState().busy) useNav.setState({ busy: false });
}

// ---------------------------------------------------------------------------
// Flights
// ---------------------------------------------------------------------------

function skyFlight(goal: Vec3, fovGoal: number): AnimStep {
  let path: FlyPath | null = null;
  const step: AnimStep = {
    duration: 1000,
    init: () => {
      const st = useNav.getState();
      path = flyPath(st.center, st.fov, goal, fovGoal);
      step.duration = dur(path.duration);
    },
    update: (t) => {
      if (!path) return;
      const p = path.at(t);
      useNav.setState({ center: clampCenter(p.center), fov: clamp(p.fov, SKY_MIN_FOV, SKY_MAX_FOV) });
    },
  };
  return step;
}

/** Flies to a sky position and field of view without leaving the panorama. */
export function flyTo(target: Vec3, fovTarget: number, origin: TargetOrigin = 'navigation'): void {
  const goal = clampCenter(normalize(target));
  const fovGoal = clamp(fovTarget, SKY_MIN_FOV, SKY_MAX_FOV);
  cancelAnimations();
  useNav.setState({ origin, locked: null });
  enqueue([skyFlight(goal, fovGoal)]);
}

/** Featured places and search suggestions share the same navigation/details flow. */
export function visitPin(pin: Pin): void {
  flyTo(pin.vec, pin.fov, 'pin');
  useNav.setState({ selected: pin });
}

export function resetView(): void {
  cancelAnimations();
  useNav.setState({ origin: 'navigation', locked: null, selected: null });
  enqueue([skyFlight(INITIAL_VIEW.center, INITIAL_VIEW.fov)]);
}

// ---------------------------------------------------------------------------
// Direct manipulation
// ---------------------------------------------------------------------------

/** Zooms about a screen point (NDC) so the sky under it stays put. factor < 1 zooms in. */
export function zoomAt(ndcX: number, ndcY: number, factor: number): void {
  const s = useNav.getState();
  cancelAnimations();
  const aspect = viewportAspect();
  const view = currentView();
  const anchor = pickSky(view, aspect, ndcX, ndcY);
  const fov = clamp(s.fov * factor, SKY_MIN_FOV, SKY_MAX_FOV);
  const center = anchor ? solveAnchor({ ...view, fov }, aspect, ndcX, ndcY, anchor) : s.center;
  s.setView({ fov, center });
}

/** Brings the sky at a screen offset (NDC) to the centre: positive x looks right, positive y looks up. */
export function panByScreen(dx: number, dy: number): void {
  const s = useNav.getState();
  cancelAnimations();
  const view = currentView();
  const aspect = viewportAspect();
  let anchor = pickSky(view, aspect, dx, dy);
  for (let k = 0.7; !anchor && k > 0.05; k *= 0.7) anchor = pickSky(view, aspect, dx * k, dy * k);
  if (!anchor) return;
  s.setView({ center: solveAnchor(view, aspect, 0, 0, anchor) });
}

/** Keeps the sky spinning after a flick, decaying exponentially. */
export function startInertia(axis: Vec3, omegaRadPerSec: number): void {
  if (!Number.isFinite(omegaRadPerSec) || omegaRadPerSec < 0.08 || reducedMotion()) return;
  const tau = 0.32;
  const total = 4 * tau;
  let applied = 0;
  enqueue([
    {
      duration: total * 1000,
      update: (t) => {
        const swept = omegaRadPerSec * tau * (1 - Math.exp(-(t * total) / tau));
        const delta = swept - applied;
        applied = swept;
        const st = useNav.getState();
        useNav.setState({ center: clampCenter(normalize(applyQuat(quatFromAxisAngle(axis, delta), st.center))) });
      },
    },
  ]);
}

// ---------------------------------------------------------------------------
// Lock: hand the coordinate to the image pipeline
// ---------------------------------------------------------------------------

export function canLock(): boolean {
  const s = useNav.getState();
  return s.fov <= LOCK_MAX_FOV && s.allskyStatus === 'ready' && sameLayer(s.displayedLayer, requestedLayer(s));
}

export function lockTarget(): void {
  if (!canLock()) return;
  const s = useNav.getState();
  const layer = s.displayedLayer!;
  const survey = SURVEYS[layer.surveyId];
  const screenArcsec = pixelScaleDeg(currentView(), Math.max(1, s.viewport.height)) * 3600;
  const target = buildSkyTarget({
    center: s.center,
    fovDeg: s.fov,
    uncertaintyArcsec: Math.max(screenArcsec, survey.pixelScaleArcsec),
    survey: survey.id,
    hipsUrl: survey.baseUrl,
    frames: survey.isCube ? [layer.frame] : undefined,
    wavelengthUm: survey.isCube ? SPHEREX_FRAMES[layer.frame].wavelengthUm : undefined,
    origin: s.origin,
  });
  useNav.setState({ locked: target, selected: null });
}
