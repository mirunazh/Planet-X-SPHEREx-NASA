/**
 * Plain-words caption for the simple navigator: where the view points and which
 * telescope took the picture. Pure (no DOM, no store), covered by tests/caption.test.ts.
 */
import type { Pin } from './store';
import { type Vec3, angularDistance, eqToGal, vecToRadec } from './sky/coords';
import { SURVEYS, type SurveyId } from './sky/surveys';

export interface CaptionInput {
  /** Equatorial unit vector of the view centre. */
  center: Vec3;
  /** Vertical field of view, degrees. */
  fov: number;
  surveyId: SurveyId;
  /** Featured targets (the store's `targets`). */
  targets: readonly Pin[];
}

export interface ViewCaption {
  place: string;
  telescope: string;
}

/** A featured target names the view within this radius, or a quarter of the field of view if larger. */
const NEAR_MIN_DEG = 0.5;
const NEAR_FOV_FRACTION = 0.25;
/** Galactic latitude band, either side of the plane, described as "along the Milky Way". */
const MILKY_WAY_HALF_WIDTH_DEG = 10;

/** '2025-04-24 → 2026-05-14' → '2025–2026'; a single year stays as it is. Full dates remain in the credits. */
function epochYears(epoch: string): string {
  const years = epoch.match(/\d{4}/g);
  if (!years) return epoch;
  const first = years[0];
  const last = years[years.length - 1];
  return first === last ? first : `${first}–${last}`;
}

function placeName(center: Vec3, fov: number, targets: readonly Pin[]): string {
  const radius = Math.max(NEAR_MIN_DEG, Number.isFinite(fov) ? fov * NEAR_FOV_FRACTION : 0);
  let best: Pin | null = null;
  let bestDistance = Infinity;
  for (const pin of targets) {
    const distance = angularDistance(center, pin.vec);
    if (distance <= radius && distance < bestDistance) {
      best = pin;
      bestDistance = distance;
    }
  }
  if (best) return best.name;
  const { dec: b } = vecToRadec(eqToGal(center));
  return Math.abs(b) < MILKY_WAY_HALF_WIDTH_DEG ? 'Along the Milky Way' : 'Away from the Milky Way';
}

/** SPHEREx is the only survey, and it is a NASA mission. */
function telescopeName(surveyId: SurveyId): string {
  const survey = SURVEYS[surveyId];
  return `NASA ${survey.shortName} · infrared, ${epochYears(survey.epoch)}`;
}

/** Describes the view in plain words, for example "Andromeda Galaxy (M31)" and "NASA SPHEREx · infrared, 2025–2026". */
export function describeView({ center, fov, surveyId, targets }: CaptionInput): ViewCaption {
  return { place: placeName(center, fov, targets), telescope: telescopeName(surveyId) };
}
