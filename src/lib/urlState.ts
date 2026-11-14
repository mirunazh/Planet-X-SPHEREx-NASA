/**
 * Deep links: the view lives in the URL so every view can be shared.
 *   ?ra=10.68479&dec=41.26907&mode=sky&fov=0.5&survey=spherex&f=46
 */
import { useNav } from './store';
import { radecToVec, vecToRadec } from './sky/coords';
import { GLOBE_MAX_DISTANCE, GLOBE_MIN_DISTANCE, SKY_MAX_FOV, SKY_MIN_FOV, clampCenter } from './sky/view';
import { SURVEYS, isSurveyId, nearestUsableFrame } from './sky/surveys';

const finite = (v: string | null) => (v !== null && v.trim() !== '' && Number.isFinite(Number(v)) ? Number(v) : null);
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

export function applyUrlState(): void {
  if (typeof window === 'undefined') return;
  const p = new URLSearchParams(window.location.search);
  const patch: Partial<ReturnType<typeof useNav.getState>> = {};

  const ra = finite(p.get('ra'));
  const dec = finite(p.get('dec'));
  if (ra !== null && dec !== null && ra >= 0 && ra < 360 && dec >= -90 && dec <= 90) {
    patch.center = clampCenter(radecToVec(ra, dec));
    patch.origin = 'deeplink';
  }

  const survey = p.get('survey');
  if (isSurveyId(survey)) patch.surveyId = survey;
  const frame = finite(p.get('f'));
  if (frame !== null) patch.frame = nearestUsableFrame(frame);

  const fov = finite(p.get('fov'));
  const distance = finite(p.get('d'));
  if (p.get('mode') === 'sky' || (p.get('mode') === null && fov !== null)) {
    patch.mode = 'sky';
    patch.fov = clamp(fov ?? 30, SKY_MIN_FOV, SKY_MAX_FOV);
  } else if (p.get('mode') === 'globe' && distance !== null) {
    patch.mode = 'globe';
    patch.distance = clamp(distance, GLOBE_MIN_DISTANCE, GLOBE_MAX_DISTANCE);
  }
  useNav.setState(patch);
}

function writeUrl(): void {
  const s = useNav.getState();
  const { ra, dec } = vecToRadec(s.center);
  const p = new URLSearchParams();
  p.set('ra', ra.toFixed(5));
  p.set('dec', dec.toFixed(5));
  p.set('mode', s.mode);
  if (s.mode === 'sky') p.set('fov', Number(s.fov.toPrecision(4)).toString());
  else p.set('d', s.distance.toFixed(2));
  p.set('survey', s.surveyId);
  if (SURVEYS[s.surveyId].isCube) p.set('f', String(s.frame));
  window.history.replaceState(window.history.state, '', `${window.location.pathname}?${p.toString()}`);
}

/** Mirrors the view into the URL, debounced so it settles after motion stops. */
export function startUrlSync(): () => void {
  let timer: ReturnType<typeof setTimeout> | undefined;
  const unsubscribe = useNav.subscribe((s, prev) => {
    if (
      s.center === prev.center &&
      s.fov === prev.fov &&
      s.distance === prev.distance &&
      s.mode === prev.mode &&
      s.surveyId === prev.surveyId &&
      s.frame === prev.frame
    ) {
      return;
    }
    clearTimeout(timer);
    timer = setTimeout(writeUrl, 450);
  });
  return () => {
    unsubscribe();
    clearTimeout(timer);
  };
}
