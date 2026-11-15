/**
 * Deep links: the view lives in the URL so every view can be shared.
 *   ?ra=10.68479&dec=41.26907&mode=sky&fov=0.5&survey=spherex&f=46
 */
import { INITIAL_VIEW, useNav } from './store';
import { radecToVec, vecToRadec } from './sky/coords';
import { SKY_MAX_FOV, SKY_MIN_FOV, clampCenter } from './sky/view';
import { SURVEYS, isSurveyId, nearestUsableFrame, type SurveyId } from './sky/surveys';
import type { Vec3 } from './sky/coords';
import type { SkyTarget } from './sky/target';

const finite = (v: string | null) => (v !== null && v.trim() !== '' && Number.isFinite(Number(v)) ? Number(v) : null);
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

/**
 * Applies a deep link to the view. Pass the search params of the route being rendered: during a
 * client-side navigation (for example back from Compare), Next updates the address bar only after
 * the new page commits, so `window.location` still holds the previous page while this one renders.
 */
export function applyUrlState(search?: string | URLSearchParams): void {
  if (typeof window === 'undefined') return;
  const p = new URLSearchParams(search ?? window.location.search);
  const patch: Partial<ReturnType<typeof useNav.getState>> = { mode: 'sky', fov: INITIAL_VIEW.fov };

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
  // Old globe links retain their RA/Dec direction; camera distance no longer
  // controls navigation. Any explicit field of view uses panoramic limits.
  if (fov !== null) patch.fov = clamp(fov, SKY_MIN_FOV, SKY_MAX_FOV);
  useNav.setState(patch);
}

type ShareView = { center: Vec3; fov: number; surveyId: SurveyId; frame: number };

/** Serialize current state synchronously, independently of the address-bar debounce. */
export function viewQuery(s: ShareView): string {
  const { ra, dec } = vecToRadec(s.center);
  const p = new URLSearchParams();
  p.set('ra', (Number(ra.toFixed(5)) % 360).toFixed(5));
  p.set('dec', dec.toFixed(5));
  p.set('mode', 'sky');
  p.set('fov', Number(s.fov.toPrecision(4)).toString());
  p.set('survey', s.surveyId);
  if (SURVEYS[s.surveyId].isCube) p.set('f', String(nearestUsableFrame(s.frame)));
  return p.toString();
}

export function buildViewUrl(s: ShareView, baseUrl: string): string {
  const url = new URL(baseUrl);
  url.search = viewQuery(s);
  url.hash = '';
  return url.toString();
}

export function buildTargetUrl(target: SkyTarget, baseUrl: string): string {
  if (!isSurveyId(target.layer.survey)) throw new Error('Unknown target survey');
  return buildViewUrl({
    center: radecToVec(target.ra, target.dec), fov: target.fovDeg,
    surveyId: target.layer.survey, frame: target.layer.frames?.[0] ?? 0,
  }, baseUrl);
}

function writeUrl(): void {
  // Only the sky page mirrors its view. A debounced write that fires just after leaving it (for
  // Compare) must not replace that page's own query.
  if (window.location.pathname !== '/') return;
  window.history.replaceState(window.history.state, '', `${window.location.pathname}?${viewQuery(useNav.getState())}`);
}

/** Mirrors the view into the URL, debounced so it settles after motion stops. */
export function startUrlSync(): () => void {
  writeUrl();
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
