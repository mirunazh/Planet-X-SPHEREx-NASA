/**
 * Pure geometry for the tour spotlight, its callout card and the Hint tooltip.
 * Viewport pixels, origin at the top left. No DOM access, so it runs in Node tests.
 */
export interface Box {
  top: number;
  left: number;
  width: number;
  height: number;
}

export interface Size {
  width: number;
  height: number;
}

export type CalloutPlacement = 'below' | 'above' | 'right' | 'left' | 'top' | 'bottom' | 'center';

export interface Placed {
  top: number;
  left: number;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), Math.max(min, max));
}

/**
 * The spotlight ring: the target grown by `pad`, kept `inset` pixels inside the viewport so the
 * ring stays visible around full-screen targets. Null when no part of the target is on screen.
 */
export function spotlightBox(target: Box, viewport: Size, pad = 6, inset = 4): Box | null {
  const top = Math.max(target.top - pad, inset);
  const left = Math.max(target.left - pad, inset);
  const bottom = Math.min(target.top + target.height + pad, viewport.height - inset);
  const right = Math.min(target.left + target.width + pad, viewport.width - inset);
  if (bottom - top < 1 || right - left < 1) return null;
  return { top, left, width: right - left, height: bottom - top };
}

/**
 * Where the callout card goes: below the spotlight, else above, else beside it. When the
 * spotlight covers most of the screen (or nothing is lit), the card is centred. When nothing
 * fits, the card sits at the top or bottom edge, whichever is farther from the spotlight.
 */
export function placeCallout(
  spot: Box | null,
  card: Size,
  viewport: Size,
  gap = 14,
  margin = 12,
): Placed & { placement: CalloutPlacement } {
  const maxLeft = viewport.width - card.width - margin;
  const maxTop = viewport.height - card.height - margin;
  const centred = {
    top: clamp((viewport.height - card.height) / 2, margin, maxTop),
    left: clamp((viewport.width - card.width) / 2, margin, maxLeft),
  };
  if (!spot || spot.width * spot.height >= 0.5 * viewport.width * viewport.height) {
    return { ...centred, placement: 'center' };
  }

  const alongX = clamp(spot.left + spot.width / 2 - card.width / 2, margin, maxLeft);
  const alongY = clamp(spot.top + spot.height / 2 - card.height / 2, margin, maxTop);
  const below = spot.top + spot.height + gap;
  if (below + card.height <= viewport.height - margin) return { top: below, left: alongX, placement: 'below' };
  const above = spot.top - gap - card.height;
  if (above >= margin) return { top: above, left: alongX, placement: 'above' };
  const right = spot.left + spot.width + gap;
  if (right + card.width <= viewport.width - margin) return { top: alongY, left: right, placement: 'right' };
  const left = spot.left - gap - card.width;
  if (left >= margin) return { top: alongY, left, placement: 'left' };

  const spotMiddle = spot.top + spot.height / 2;
  return spotMiddle < viewport.height / 2
    ? { top: Math.max(margin, maxTop), left: centred.left, placement: 'bottom' }
    : { top: margin, left: centred.left, placement: 'top' };
}

/** Tooltip above its anchor, or below when there is no room above; always inside the viewport. */
export function placeTooltip(
  anchor: Box,
  tip: Size,
  viewport: Size,
  gap = 8,
  margin = 8,
): Placed & { placement: 'above' | 'below' } {
  const left = clamp(anchor.left + anchor.width / 2 - tip.width / 2, margin, viewport.width - tip.width - margin);
  const above = anchor.top - gap - tip.height;
  if (above >= margin) return { top: above, left, placement: 'above' };
  const below = anchor.top + anchor.height + gap;
  return { top: clamp(below, margin, viewport.height - tip.height - margin), left, placement: 'below' };
}
