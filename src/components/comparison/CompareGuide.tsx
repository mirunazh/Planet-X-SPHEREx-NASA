'use client';

/* Step 3 in plain words: how many photos, when they were taken, what to press and what a
   one-photo dot may mean. The color line says which detector the flipbook shows and why. */
import { useEffect, useId, useRef, useState } from 'react';
import { TourOverlay } from '@/components/help/TourOverlay';
import { WhatYoureSeeing } from '@/components/help/WhatYoureSeeing';
import { HELP, type HelpScreenId } from '@/content/help';
import type { ImageProduct, InventoryPage } from '@/lib/comparison/types';
import styles from './CompareGuide.module.css';

/** The page opens on one detector, so every frame of the flipbook shows the same infrared colors. */
export const DEFAULT_BAND = 'SPHEREx-D3';
const DEFAULT_RANGE = '1.6–2.4 µm';

/** one: the default detector · custom: the visitor's own color filters · fallback: no default-detector photos here · all: every detector. */
export type ColorMode = 'one' | 'custom' | 'fallback' | 'all';

export function isDefaultBand(band: string): boolean {
  return band.trim().toLowerCase() === DEFAULT_BAND.toLowerCase();
}

function day(iso: string): string {
  return new Date(iso).toLocaleDateString(undefined, { timeZone: 'UTC', day: 'numeric', month: 'short', year: 'numeric' });
}

interface Summary {
  text: string;
  /** False when there is nothing to flip through, so the how-to sentences would not apply. */
  comparable: boolean;
}

/** The first guide sentence, from the inventory as it is right now. */
function summarize(size: number, products: ImageProduct[], total: number, more: boolean, loading: boolean,
  status: InventoryPage['status'] | null, filtered: boolean): Summary {
  const square = `this ${size}′ square`;
  if (!products.length) {
    if (loading) return { text: `Looking up the SPHEREx photos of ${square}, taken on different dates…`, comparable: true };
    if (status === 'empty') return { text: filtered ? `No SPHEREx photos of ${square} match these filters.` : `No SPHEREx photos of ${square} were found in the archive.`, comparable: false };
    if (status === 'partial') return { text: `No SPHEREx photos of ${square} were found in the part of the archive that answered.`, comparable: false };
    return { text: `The list of SPHEREx photos of ${square} could not be loaded yet.`, comparable: false };
  }
  // Products arrive in date order, so the loaded ones span the earliest dates when more pages remain.
  const dates = products.map((p) => p.observedStart ?? p.observedEnd).filter((d): d is string => !!d).sort();
  const first = dates.length ? day(dates[0]) : null;
  const last = dates.length ? day(dates[dates.length - 1]) : null;
  const when = !first ? '' : first === last ? `on ${first}` : `${first} to ${last}`;
  const count = Math.max(total, products.length);
  const photos = `${count} SPHEREx photo${count === 1 ? '' : 's'} of ${square}`;
  if (more) return { text: `${photos}. The first ${products.length}${when ? `, taken ${when},` : ''} are loaded.`, comparable: true };
  if (loading) return { text: `${photos} found so far${when ? `, taken ${when}` : ''}.`, comparable: true };
  if (count === 1) return { text: `${photos}${when ? `, taken ${when}` : ''}. Comparing needs at least two photos.`, comparable: false };
  return { text: `${photos}${when ? `, taken ${when}` : ''}.`, comparable: true };
}

const COLOR_TEXT: Record<ColorMode, string> = {
  one: `Showing one color (${DEFAULT_BAND}, ${DEFAULT_RANGE}) so the photos are comparable.`,
  custom: 'Showing only the colors chosen in the filters.',
  fallback: `No ${DEFAULT_BAND} (${DEFAULT_RANGE}) photos of this square were found, so all colors are shown. A photo can look different just because it was taken in another color.`,
  all: 'Showing all colors, from all 6 detectors. A photo can look different just because it was taken in another color.',
};

/**
 * "What you're seeing" for a comparison screen: the help sheet, and its guided tour once the
 * visitor asks for it. Focus comes back to this button when either one closes.
 */
export function WhatYoureSeeingButton({ screen, contextLine }: { screen: HelpScreenId; contextLine?: string }) {
  const [open, setOpen] = useState(false);
  const [touring, setTouring] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  const returnFocus = useRef(false);
  // Runs after the sheet or the tour has left the page (and after the tour's own focus cleanup).
  useEffect(() => {
    if (open || touring || !returnFocus.current) return;
    returnFocus.current = false;
    button.current?.focus();
  }, [open, touring]);
  return <>
    <button ref={button} type="button" className={styles.help} aria-haspopup="dialog" aria-expanded={open}
      onClick={() => setOpen((value) => !value)}>
      <span className={styles.helpIcon} aria-hidden="true">i</span>What you’re seeing
    </button>
    <WhatYoureSeeing screen={screen} open={open} contextLine={open ? contextLine : undefined}
      onClose={() => { returnFocus.current = true; setOpen(false); }}
      onStartTour={() => { setOpen(false); setTouring(true); }} />
    <TourOverlay steps={HELP[screen].steps} open={touring} onClose={() => { returnFocus.current = true; setTouring(false); }} />
  </>;
}

interface Props {
  size: number;
  products: ImageProduct[];
  /** Photos in the displayed inventory, loaded or not. */
  total: number;
  more: boolean;
  loading: boolean;
  status: InventoryPage['status'] | null;
  /** Whether any filter narrows the search, so "no photos" can say why. */
  filtered: boolean;
  color: ColorMode;
  onShowAllColors: () => void;
  onShowOneColor: () => void;
  contextLine?: string;
}

export function CompareGuide({ size, products, total, more, loading, status, filtered, color, onShowAllColors, onShowOneColor, contextLine }: Props) {
  const titleId = useId();
  const summary = summarize(size, products, total, more, loading, status, filtered);
  const action = color === 'all' ? { label: 'Show one color', run: onShowOneColor }
    : color === 'fallback' ? null : { label: 'Show all colors', run: onShowAllColors };
  return <section className={styles.guide} aria-labelledby={titleId}>
    <div className={styles.head}>
      <h2 id={titleId} className={styles.title}>How to compare</h2>
      <WhatYoureSeeingButton screen="compare" contextLine={contextLine} />
    </div>
    <p className={styles.text}>
      {summary.text}
      {summary.comparable && <> Press <strong>Play</strong> to flip through them like a flipbook. A dot that shows up in only one photo may have moved, or may be a glitch: check its date and color.</>}
    </p>
    <div className={styles.color}>
      <p className={styles.colorText} role="status">{COLOR_TEXT[color]}</p>
      {action && <button type="button" className={styles.action} onClick={action.run}>{action.label}</button>}
    </div>
  </section>;
}
