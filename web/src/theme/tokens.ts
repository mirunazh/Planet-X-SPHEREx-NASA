// Design tokens: the one source for colour, type, spacing, radius and motion. They feed the Astryx
// theme (skyblink.ts) and, as --sb-* custom properties, the app's own CSS (globals.css) and canvas.
//
// Contrast (WCAG 2 ratio, computed): on bg / on surface. Marker colours are measured against a
// typical sky pixel, #262626 (grey 38/255 = the median of the per-visit median pixel over all five
// targets after the display stretch); each marker also has a dark outline and its own shape.
// Okabe-Ito hexes checked against Okabe & Ito, "Color Universal Design", fig. 16
// (jfly.uni-koeln.de/color/): sky blue 86,180,233; yellow 240,228,66; reddish purple 204,121,167;
// bluish green 0,158,115.

export const color = {
  bg: '#080B12', // the night sky
  surface: '#0E1422', // instrument panels
  raised: '#161D30', // tracks, hover
  border: 'rgba(214, 224, 255, 0.10)',
  borderStrong: '#3A4666',
  text: '#E8ECF6', // 16.7 / 15.6
  textMuted: '#A3AEC9', // 8.9 / 8.3
  textFaint: '#5B6786', // 3.5 / 3.3: disabled and decoration only, never body text
  accent: '#FF6A3D', // infrared: the primary action and the thing that moved. 6.9 / 6.5
  accentText: '#FF8A63', // the accent as small text, 8.5 / 7.9
  accentMuted: 'rgba(255, 106, 61, 0.16)',
  onAccent: '#10121A', // text on an accent fill, 6.6
  plate: '#04060A', // behind the sky image
  noData: '#6E1830', // blank pixels (no data, or a saturated core)
  info: '#6FB3FF',
  success: '#3DDC97',
  warning: '#F0C24B',
  error: '#FF5C7A',
} as const;

export const marker = {
  predicted: '#56B4E9', // Okabe-Ito sky blue, ring. 6.6 on a sky pixel
  measured: '#F0E442', // Okabe-Ito yellow, cross. 11.4
  input: '#CC79A7', // Okabe-Ito reddish purple, diamond. 4.9
  neighbour: '#009E73', // Okabe-Ito bluish green, dashed square. 4.4
  outline: 'rgba(0, 0, 0, 0.85)',
} as const;

/** CSS variables set by next/font in layout.tsx (self-hosted, no font CDN at run time). */
export const font = {
  ui: 'var(--font-inter), system-ui, -apple-system, "Segoe UI", sans-serif',
  data: 'var(--font-mono), ui-monospace, "SF Mono", Menlo, monospace',
} as const;

/** [size, line height] in px. */
export const type = {
  caption: [12, 16],
  ui: [14, 20],
  body: [16, 24],
  title: [20, 28],
  heading: [28, 34],
  display: [104, 100],
} as const;

/** 4 px grid; Astryx --spacing-N is N x 4 px. */
export const spaceUnit = 4;

export const radius = { inner: 4, element: 6, container: 10, page: 16 } as const;

/** ms */
export const motion = { fast: 120, medium: 200, slow: 400, blink: 1200 } as const;

// Breakpoints (CSS media queries cannot read variables, so globals.css repeats these numbers):
// below 640 px (Astryx 'sm') every control is 44 px tall; below 960 px /watch stacks into one column.
