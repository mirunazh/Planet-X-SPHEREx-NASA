/**
 * Drawing rules for the intro orrery. Only the directions are physical (true heliocentric
 * longitudes from src/lib/sky/planets.ts); radii and sizes are display choices, labelled
 * "not to scale" on screen.
 */
import { PLANETS, PLANET_ORDER, type PlanetId } from '@/lib/sky/planets';

export interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface Circle {
  x: number;
  y: number;
  r: number;
}

export interface OrreryLayout {
  /** Size of the drawing surface (the whole overlay), px. */
  width: number;
  height: number;
  /** The Sun's position and the radius given to Neptune's orbit, px. */
  cx: number;
  cy: number;
  radius: number;
  sunRadius: number;
  orbit: Record<PlanetId, number>;
  dot: Record<PlanetId, number>;
  earthRing: number;
  fontSize: number;
  /** Area labels must stay inside. */
  bounds: Rect;
}

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

const A_MIN = PLANETS.mercury.elements.a;
const A_MAX = PLANETS.neptune.elements.a;
/** Mercury's orbit sits at this fraction of Neptune's, leaving room for the Sun. */
const INNER_FRACTION = 0.17;

/**
 * Orbit radius as a fraction of Neptune's: logarithmic in the semi-major axis. Real distances span
 * a factor of 78 from Mercury to Neptune; a square-root scale would still squeeze the four inner
 * orbits into the middle fifth of a phone screen, so the log keeps them apart while preserving order.
 */
export function orbitFraction(a: number): number {
  return INNER_FRACTION + ((1 - INNER_FRACTION) * Math.log(a / A_MIN)) / Math.log(A_MAX / A_MIN);
}

/**
 * Dot radius, px: a small floor plus a term in the square root of the planet's real radius. It rises
 * strictly with the real radius, so the order (Jupiter > Saturn > Uranus > Neptune > Earth > Venus >
 * Mars > Mercury) survives at every screen size while every planet stays visible. True sizes would be
 * far below one pixel at this scale.
 */
export function dotRadius(radiusKm: number, drawingRadius: number): number {
  // Slightly larger than a plain dot would need, so each planet's colour reads at a glance.
  const k = clamp(drawingRadius * 0.011, 1.8, 4.6);
  return 1.4 + k * Math.sqrt(radiusKm / PLANETS.earth.radiusKm);
}

export function computeLayout(width: number, height: number, slot: Rect): OrreryLayout {
  const radius = Math.max(40, Math.min(slot.w, slot.h) / 2 - 14);
  const orbit = {} as Record<PlanetId, number>;
  const dot = {} as Record<PlanetId, number>;
  for (const id of PLANET_ORDER) {
    orbit[id] = radius * orbitFraction(PLANETS[id].elements.a);
    dot[id] = dotRadius(PLANETS[id].radiusKm, radius);
  }
  return {
    width,
    height,
    cx: slot.x + slot.w / 2,
    cy: slot.y + slot.h / 2,
    radius,
    sunRadius: clamp(radius * 0.06, 6, 18),
    orbit,
    dot,
    earthRing: dot.earth + clamp(radius * 0.012, 3, 6),
    fontSize: radius < 220 ? 12 : 13,
    bounds: slot,
  };
}

/**
 * Drawn width (= height) of the square sky backdrop, px. It is centred on the Sun, because the
 * south ecliptic pole sits right behind it in a view from above the Solar System, and must reach
 * every corner of the overlay. Its angular scale is a display choice: about five orrery radii keeps
 * the Milky Way just outside Neptune's orbit on every screen.
 */
export function backdropSize(layout: OrreryLayout): number {
  const { width: w, height: h, cx, cy } = layout;
  const corner = Math.max(Math.hypot(cx, cy), Math.hypot(w - cx, cy), Math.hypot(cx, h - cy), Math.hypot(w - cx, h - cy));
  return Math.ceil(Math.max(2 * corner + 4, 5 * layout.radius));
}

/** Screen position of a planet on its (circular, compressed) orbit at a heliocentric longitude. */
export function orbitPoint(layout: OrreryLayout, id: PlanetId, longitudeDeg: number): { x: number; y: number; ux: number; uy: number } {
  const lon = (longitudeDeg * Math.PI) / 180;
  // Seen from the north ecliptic pole with the March equinox to the right: longitude grows
  // anticlockwise, and screen y points down.
  const ux = Math.cos(lon);
  const uy = -Math.sin(lon);
  const r = layout.orbit[id];
  return { x: layout.cx + r * ux, y: layout.cy + r * uy, ux, uy };
}

export interface LabelRequest {
  /** Thing being labelled (centre and radius to keep clear of). */
  anchor: Circle;
  /** Preferred direction from the anchor (unit vector, screen axes). */
  ux: number;
  uy: number;
  w: number;
  h: number;
}

/**
 * Outward first, then along the orbit (ahead, behind), then inward, then the diagonals. Along-the-orbit
 * spots keep a crowded inner planet's label on its own orbit instead of next to a neighbour's.
 */
const TURNS = [0, -Math.PI / 2, Math.PI / 2, Math.PI, -Math.PI / 4, Math.PI / 4, (-3 * Math.PI) / 4, (3 * Math.PI) / 4];
const GAP = 4;
const CLEARANCE = 2;

const boxHitsCircle = (b: Rect, c: Circle) => {
  const nx = clamp(c.x, b.x, b.x + b.w);
  const ny = clamp(c.y, b.y, b.y + b.h);
  const r = c.r + CLEARANCE;
  return (nx - c.x) ** 2 + (ny - c.y) ** 2 < r * r;
};
const boxesOverlap = (a: Rect, b: Rect) => a.x < b.x + b.w && b.x < a.x + a.w && a.y < b.y + b.h && b.y < a.y + a.h;
const inside = (b: Rect, area: Rect) => b.x >= area.x && b.y >= area.y && b.x + b.w <= area.x + area.w && b.y + b.h <= area.y + area.h;

export interface LabelSpot {
  /** Centre of the label. */
  x: number;
  y: number;
  /** False when every spot would cover an earlier label: better hidden than garbled. */
  visible: boolean;
}

/**
 * Greedy label placement, in priority order: each label takes the first candidate spot that stays
 * inside `bounds` and clears every dot and every label placed before it, else the least bad spot.
 */
export function placeLabels(requests: LabelRequest[], obstacles: Circle[], bounds: Rect): LabelSpot[] {
  const placed: Rect[] = [];
  return requests.map(({ anchor, ux, uy, w, h }) => {
    let best: Rect | null = null;
    let bestPenalty = Infinity;
    let bestCoversLabel = false;
    for (const turn of TURNS) {
      const c = Math.cos(turn);
      const s = Math.sin(turn);
      const dx = ux * c - uy * s;
      const dy = ux * s + uy * c;
      // Push the box out until it just clears the anchor in this direction.
      const reach = anchor.r + GAP + (Math.abs(dx) * w) / 2 + (Math.abs(dy) * h) / 2;
      const box = { x: anchor.x + dx * reach - w / 2, y: anchor.y + dy * reach - h / 2, w, h };
      let penalty = inside(box, bounds) ? 0 : 4;
      for (const o of obstacles) if (o !== anchor && boxHitsCircle(box, o)) penalty += 2;
      let coversLabel = false;
      for (const p of placed) {
        if (boxesOverlap(box, p)) {
          penalty += 3;
          coversLabel = true;
        }
      }
      if (penalty < bestPenalty) {
        best = box;
        bestPenalty = penalty;
        bestCoversLabel = coversLabel;
        if (penalty === 0) break;
      }
    }
    const chosen = best as Rect;
    if (!bestCoversLabel) placed.push(chosen);
    return { x: chosen.x + w / 2, y: chosen.y + h / 2, visible: !bestCoversLabel };
  });
}
