// The app's Astryx theme: dark only, built from tokens.ts. It extends Neutral for its component
// rules (segmented control, switch, badge) and pins every colour explicitly, the accent included,
// because a seeded accent comes out inverted in dark mode (Astryx issue 4276, note 14 E3).

import { defineTheme, generateThemeCSS, type DefinedTheme } from '@astryxdesign/core/theme';
import { neutralTheme } from '@astryxdesign/theme-neutral';
import { color as c, font, marker, motion, radius, spaceUnit, type } from './tokens';

const px = (n: number) => `${n}px`;
const tint = (hex: string, alpha: number) => {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${n >> 16}, ${(n >> 8) & 255}, ${n & 255}, ${alpha})`;
};
const touch = px(44);

const statusTokens = Object.fromEntries(
  (['info', 'success', 'error'] as const).flatMap((s) => [
    [`--color-${s}`, c[s]],
    [`--color-${s}-muted`, tint(c[s], 0.14)],
    [`--color-text-${s}`, c[s]],
    [`--color-on-${s}`, c.onAccent],
    [`--color-on-${s}-muted`, c.text],
  ]),
);

const spacing = Object.fromEntries(
  [0, 0.5, 1, 1.5, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((n) => [`--spacing-${String(n).replace('.', '-')}`, px(n * spaceUnit)]),
);

/** App-only tokens, read by globals.css as var(--sb-...). */
const appTokens: Record<string, string> = {
  '--sb-bg': c.bg,
  '--sb-surface': c.surface,
  '--sb-raised': c.raised,
  '--sb-border': c.border,
  '--sb-border-strong': c.borderStrong,
  '--sb-text': c.text,
  '--sb-text-muted': c.textMuted,
  '--sb-text-faint': c.textFaint,
  '--sb-accent': c.accent,
  '--sb-accent-text': c.accentText,
  '--sb-accent-muted': c.accentMuted,
  '--sb-on-accent': c.onAccent,
  '--sb-plate': c.plate,
  '--sb-no-data': c.noData,
  '--sb-marker-predicted': marker.predicted,
  '--sb-marker-measured': marker.measured,
  '--sb-marker-input': marker.input,
  '--sb-marker-neighbour': marker.neighbour,
  '--sb-font-ui': font.ui,
  '--sb-font-data': font.data,
  ...Object.fromEntries(
    Object.entries(type).flatMap(([k, [size, lead]]) => [
      [`--sb-text-${k}`, px(size)],
      [`--sb-lead-${k}`, px(lead)],
    ]),
  ),
  '--sb-duration-blink': `${motion.blink}ms`,
  '--sb-touch': touch,
};

export const skyblinkTheme = defineTheme({
  name: 'skyblink',
  extends: neutralTheme,
  localTokens: appTokens,
  typography: {
    scale: { base: type.ui[0], ratio: 1.2 },
    body: { family: font.ui },
    heading: { family: font.ui },
    code: { family: font.data },
  },
  motion: { fast: motion.fast, medium: motion.medium, slow: motion.slow, ratio: 0.75 },
  components: {
    // The accent is reserved for the primary action and the thing that moved, so an "on" switch is a quiet light grey.
    switch: { base: { '--color-accent': c.textMuted, '--color-background-gray': 'var(--color-border-emphasized)' } },
  },
  adaptations: {
    rules: [
      {
        // Phones: every control is at least 44 px tall.
        when: { width: { below: 'sm' } },
        value: {
          tokens: { '--size-element-sm': touch, '--size-element-md': touch, '--size-element-lg': touch },
          components: {
            'segmented-control': { base: { padding: '0px' } },
            'segmented-control-item': { 'size:sm': { height: touch }, 'size:md': { height: touch } },
          },
        },
      },
    ],
  },
  tokens: {
    ...spacing,
    '--radius-inner': px(radius.inner),
    '--radius-element': px(radius.element),
    '--radius-container': px(radius.container),
    '--radius-page': px(radius.page),

    '--color-background-body': c.bg,
    '--color-background-surface': c.surface,
    '--color-background-card': c.surface,
    '--color-background-popover': c.raised,
    '--color-background-muted': c.raised,
    '--color-neutral': 'rgba(214, 224, 255, 0.08)',
    '--color-overlay': 'rgba(4, 6, 10, 0.8)',
    '--color-overlay-hover': 'rgba(214, 224, 255, 0.06)',
    '--color-overlay-pressed': 'rgba(214, 224, 255, 0.10)',
    '--color-border': c.border,
    '--color-border-emphasized': c.borderStrong,
    '--color-skeleton': c.raised,
    '--color-shadow': 'rgba(0, 0, 0, 0.5)',

    '--color-text-primary': c.text,
    '--color-text-secondary': c.textMuted,
    '--color-text-disabled': c.textFaint,
    '--color-icon-primary': c.text,
    '--color-icon-secondary': c.textMuted,
    '--color-icon-disabled': c.textFaint,

    '--color-accent': c.accent,
    '--color-accent-muted': c.accentMuted,
    '--color-text-accent': c.accentText,
    '--color-icon-accent': c.accent,
    '--color-on-accent': c.onAccent,
    '--focus-outline-color': c.accent,

    ...statusTokens,
    // The only warning in the app is "It moved", so warning wears the infrared accent.
    '--color-warning': c.accent,
    '--color-warning-muted': c.accentMuted,
    '--color-text-warning': c.accentText,
    '--color-on-warning': c.onAccent,
    '--color-on-warning-muted': '#FFC2AE',

    '--color-background-orange': c.accentMuted,
    '--color-text-orange': c.accentText,
    '--color-border-orange': c.accent,
    '--color-background-gray': c.raised,
    '--color-text-gray': c.textMuted,
    '--color-border-gray': c.borderStrong,
  },
});

/** Theme CSS marked as pre-built, so <Theme> does not inject it a second time at run time. */
export const skyblinkBuilt: DefinedTheme = { ...skyblinkTheme, __built: true };

/** The stylesheet `astryx theme build` would write, from the same generator the CLI uses. */
export function skyblinkCss(): string {
  const { prose, component } = generateThemeCSS(skyblinkTheme);
  return [
    '@layer reset, astryx-base, astryx-theme;',
    `@layer reset {\n${prose}\n}`,
    `@layer astryx-theme {\n:root { color-scheme: dark; }\n${component}\n}`,
  ].join('\n');
}
