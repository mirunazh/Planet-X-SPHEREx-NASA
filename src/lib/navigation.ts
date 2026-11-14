/**
 * Navigation actions: zoom, pan, fly-to, the globe ↔ sky crossing, inertia and
 * target lock. Animations are queued steps run once per frame by <Navigator>.
 */
import { type AnimStep, INITIAL_VIEW, useNav } from './store';
import { type FlyPath, flyPath } from './sky/flyto';
import {
  type Vec3,
  angularDistance,
  applyQuat,
  normalize,
  quatFromAxisAngle,
  slerp,
} from './sky/coords';
import {
  GLOBE_MAX_DISTANCE,
  GLOBE_MIN_DISTANCE,
  LOCK_MAX_FOV,
  SKY_MAX_FOV,
  SKY_MIN_FOV,
  type View,
  clampCenter,
  distanceForSkyFov,
  equivalentSkyFov,
  pickSky,
  pixelScaleDeg,
  solveAnchor,
} from './sky/view';
import { SPHEREX_FRAMES, SURVEYS } from './sky/surveys';
import { type TargetOrigin, buildSkyTarget } from './sky/target';

const DIVE_DISTANCE = 1.6;
const EXIT_FOV = 110;
const GLOBE_REST_DISTANCE = 3.2;

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
const easeInCubic = (t: number) => t * t * t;
const easeOutCubic = (t: number) => 1 - (1 - t) ** 3;
const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);

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

/** Stops flights and inertia. The globe ↔ sky crossing is never interrupted. */
export function cancelAnimations(): void {
  const s = useNav.getState();
  if (s.crossing || s.anim.length === 0) return;
  s.anim.length = 0;
  useNav.setState({ busy: false, flash: 0 });
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
// The crossing: globe (outside) ↔ sky (inside)
// ---------------------------------------------------------------------------

function crossIntoSkySteps(): AnimStep[] {
  let d0 = GLOBE_MIN_DISTANCE;
  return [
    {
      duration: dur(300),
      init: () => {
        d0 = useNav.getState().distance;
        useNav.setState({ crossing: true });
      },
      update: (t) => useNav.setState({ distance: lerp(d0, DIVE_DISTANCE, easeInCubic(t)), flash: 0.85 * t }),
    },
    {
      duration: 0,
      update: () => useNav.setState({ mode: 'sky', fov: equivalentSkyFov(DIVE_DISTANCE), distance: GLOBE_MIN_DISTANCE }),
    },
    {
      duration: dur(420),
      update: (t) => useNav.setState({ flash: 0.85 * (1 - easeOutCubic(t)) }),
      done: () => useNav.setState({ crossing: false, flash: 0 }),
    },
  ];
}

function exitToGlobeSteps(endDistance = GLOBE_REST_DISTANCE): AnimStep[] {
  let f0 = SKY_MAX_FOV;
  const dStart = distanceForSkyFov(EXIT_FOV);
  return [
    {
      duration: dur(260),
      init: () => {
        f0 = useNav.getState().fov;
        useNav.setState({ crossing: true });
      },
      update: (t) => useNav.setState({ fov: lerp(f0, EXIT_FOV, easeInCubic(t)), flash: 0.85 * t }),
    },
    { duration: 0, update: () => useNav.setState({ mode: 'globe', distance: dStart }) },
    {
      duration: dur(520),
      update: (t) =>
        useNav.setState({ distance: lerp(dStart, endDistance, easeOutCubic(t)), flash: 0.85 * (1 - easeOutCubic(t)) }),
      done: () => useNav.setState({ crossing: false, flash: 0 }),
    },
  ];
}

export function enterSky(): void {
  const s = useNav.getState();
  if (s.mode !== 'globe' || s.crossing) return;
  cancelAnimations();
  enqueue(crossIntoSkySteps());
}

export function exitToGlobe(): void {
  const s = useNav.getState();
  if (s.mode !== 'sky' || s.crossing) return;
  cancelAnimations();
  // From a deep zoom, pull back smoothly before passing through the sphere wall.
  const steps: AnimStep[] = s.fov < 50 ? [skyFlight(s.center, 70)] : [];
  enqueue([...steps, ...exitToGlobeSteps()]);
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
      useNav.setState({ center: clampCenter(p.center), fov: p.fov });
    },
  };
  return step;
}

function globeRotation(goal: Vec3, distanceGoal: number): AnimStep {
  let c0 = goal;
  let d0 = distanceGoal;
  const step: AnimStep = {
    duration: 800,
    init: () => {
      const st = useNav.getState();
      c0 = st.center;
      d0 = st.distance;
      step.duration = dur(450 + angularDistance(c0, goal) * 7);
    },
    update: (t) => {
      const e = easeInOutCubic(t);
      useNav.setState({ center: clampCenter(slerp(c0, goal, e)), distance: lerp(d0, distanceGoal, e) });
    },
  };
  return step;
}

function planFlight(goal: Vec3, fovGoal: number): AnimStep[] {
  const s = useNav.getState();
  if (s.mode === 'globe') {
    const crossFov = equivalentSkyFov(GLOBE_MIN_DISTANCE);
    if (fovGoal < crossFov) return [globeRotation(goal, 2.3), ...crossIntoSkySteps(), skyFlight(goal, fovGoal)];
    return [globeRotation(goal, clamp(distanceForSkyFov(fovGoal), GLOBE_MIN_DISTANCE, GLOBE_MAX_DISTANCE))];
  }
  return [skyFlight(goal, fovGoal)];
}

/** Flies to a sky position and field of view, crossing into sky mode if needed. */
export function flyTo(target: Vec3, fovTarget: number, origin: TargetOrigin = 'navigation'): void {
  const goal = clampCenter(normalize(target));
  const fovGoal = clamp(fovTarget, SKY_MIN_FOV, SKY_MAX_FOV);
  cancelAnimations();
  useNav.setState({ origin, locked: null });
  // A planning step runs when it reaches the head of the queue, so a flight
  // requested during a crossing starts from the post-crossing state.
  const planner: AnimStep = {
    duration: 0,
    init: () => {
      const q = useNav.getState().anim;
      q.splice(1, 0, ...planFlight(goal, fovGoal));
    },
    update: () => {},
  };
  enqueue([planner]);
}

export function resetView(): void {
  const s = useNav.getState();
  if (s.crossing) return;
  cancelAnimations();
  const steps: AnimStep[] = [];
  if (s.mode === 'sky') {
    if (s.fov < 50) steps.push(skyFlight(s.center, 70));
    steps.push(...exitToGlobeSteps());
  }
  steps.push(globeRotation(INITIAL_VIEW.center, INITIAL_VIEW.distance));
  useNav.setState({ origin: 'navigation', locked: null, selected: null });
  enqueue(steps);
}

// ---------------------------------------------------------------------------
// Direct manipulation
// ---------------------------------------------------------------------------

/** Zooms about a screen point (NDC) so the sky under it stays put. factor < 1 zooms in. */
export function zoomAt(ndcX: number, ndcY: number, factor: number): void {
  const s = useNav.getState();
  if (s.crossing) return;
  cancelAnimations();
  const aspect = viewportAspect();
  const view = currentView();
  const anchor = pickSky(view, aspect, ndcX, ndcY);
  if (s.mode === 'sky') {
    const fov = s.fov * factor;
    if (fov > SKY_MAX_FOV) {
      if (factor > 1) enqueue(exitToGlobeSteps(Math.max(GLOBE_REST_DISTANCE, 2.9)));
      return;
    }
    const f = Math.max(SKY_MIN_FOV, fov);
    const center = anchor ? solveAnchor({ ...view, fov: f }, aspect, ndcX, ndcY, anchor) : s.center;
    s.setView({ fov: f, center });
    return;
  }
  const distance = 1 + (s.distance - 1) * factor;
  if (distance < GLOBE_MIN_DISTANCE) {
    if (factor < 1) enqueue(crossIntoSkySteps());
    return;
  }
  const d = Math.min(GLOBE_MAX_DISTANCE, distance);
  const center = anchor ? solveAnchor({ ...view, distance: d }, aspect, ndcX, ndcY, anchor) : s.center;
  s.setView({ distance: d, center });
}

/** Brings the sky at a screen offset (NDC) to the centre: positive x looks right, positive y looks up. */
export function panByScreen(dx: number, dy: number): void {
  const s = useNav.getState();
  if (s.crossing) return;
  cancelAnimations();
  const view = currentView();
  const aspect = viewportAspect();
  let anchor = pickSky(view, aspect, dx, dy);
  for (let k = 0.7; !anchor && k > 0.05; k *= 0.7) anchor = pickSky(view, aspect, dx * k, dy * k);
  if (!anchor) return;
  s.setView({ center: solveAnchor(view, aspect, 0, 0, anchor) });
}

/** Keeps the globe or sky spinning after a flick, decaying exponentially. */
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
  return s.mode === 'sky' && s.fov <= LOCK_MAX_FOV && !s.crossing;
}

export function lockTarget(): void {
  if (!canLock()) return;
  const s = useNav.getState();
  const survey = SURVEYS[s.surveyId];
  const screenArcsec = pixelScaleDeg(currentView(), Math.max(1, s.viewport.height)) * 3600;
  const target = buildSkyTarget({
    center: s.center,
    fovDeg: s.fov,
    uncertaintyArcsec: Math.max(screenArcsec, survey.pixelScaleArcsec),
    survey: survey.id,
    hipsUrl: survey.baseUrl,
    frames: survey.isCube ? [s.frame] : undefined,
    wavelengthUm: survey.isCube ? SPHEREX_FRAMES[s.frame].wavelengthUm : undefined,
    origin: s.origin,
  });
  useNav.setState({ locked: target, selected: null });
}
