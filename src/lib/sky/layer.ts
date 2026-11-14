import { type SurveyId, SPHEREX_FRAMES, SURVEYS, nearestUsableFrame } from './surveys';

export interface SkyLayer {
  surveyId: SurveyId;
  frame: number;
}

/** Non-cube surveys have one image, independent of the remembered cube frame. */
export function requestedLayer(state: SkyLayer): SkyLayer {
  return { surveyId: state.surveyId, frame: SURVEYS[state.surveyId].isCube ? nearestUsableFrame(state.frame) : 0 };
}

export function layerKey(layer: SkyLayer): string {
  return `${layer.surveyId}|${layer.frame}|`;
}

export function sameLayer(a: SkyLayer | null, b: SkyLayer | null): boolean {
  return a === b || (a !== null && b !== null && layerKey(a) === layerKey(b));
}

export function layerLabel(layer: SkyLayer): string {
  const survey = SURVEYS[layer.surveyId];
  return survey.isCube ? `${survey.shortName} · ${SPHEREX_FRAMES[layer.frame].wavelengthUm.toFixed(3)} µm` : survey.shortName;
}
