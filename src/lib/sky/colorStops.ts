import { SPHEREX_FRAMES } from './surveys';

/**
 * A named point on the SPHEREx wavelength axis, described in plain words for the
 * simple navigator. The frames are the same as SPHEREX_PRESETS.
 */
export interface ColorStop {
  /** Index into SPHEREX_FRAMES. */
  frame: number;
  name: string;
  detail: string;
}

export const COLOR_STOPS: ColorStop[] = [
  { frame: 0, name: 'Near red', detail: 'Just beyond red light; mostly starlight' },
  { frame: 22, name: 'Starlight', detail: 'Mostly starlight; thick dust still dims it' },
  { frame: 46, name: 'Through dust', detail: 'Starlight that gets through much of the dust' },
  { frame: 62, name: 'Glowing dust', detail: 'Carbon-rich dust molecules (PAHs) glow here' },
  { frame: 80, name: 'CO₂ ice', detail: 'Where carbon dioxide ice absorbs light' },
  { frame: 90, name: 'Hot dust', detail: 'Starlight and hot dust' },
];

function wavelengthAt(frame: number): number {
  const index = Math.max(0, Math.min(SPHEREX_FRAMES.length - 1, Math.round(frame)));
  return SPHEREX_FRAMES[index].wavelengthUm;
}

/**
 * The stop closest to `frame` along the slider (distance in frames). When two stops
 * are equally far, the one closer in wavelength wins, so the result is always defined.
 */
export function nearestStop(frame: number): ColorStop {
  const at = Number.isFinite(frame) ? frame : 0;
  const um = wavelengthAt(at);
  let best = COLOR_STOPS[0];
  let bestFrames = Infinity;
  let bestUm = Infinity;
  for (const stop of COLOR_STOPS) {
    const frames = Math.abs(stop.frame - at);
    const gapUm = Math.abs(wavelengthAt(stop.frame) - um);
    if (frames < bestFrames || (frames === bestFrames && gapUm < bestUm)) {
      best = stop;
      bestFrames = frames;
      bestUm = gapUm;
    }
  }
  return best;
}
