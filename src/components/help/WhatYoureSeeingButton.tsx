'use client';

import { useEffect, useRef, useState } from 'react';
import { HELP, type HelpScreenId } from '@/content/help';
import { TourOverlay } from './TourOverlay';
import { WhatYoureSeeing } from './WhatYoureSeeing';
import styles from './WhatYoureSeeingButton.module.css';

/**
 * "What you're seeing" for a screen without its own sheet manager: the help sheet, and its guided
 * tour once the visitor asks for it. Focus comes back to this button when either one closes.
 * `compact` drops the visible label on narrow screens (the button keeps its accessible name).
 */
export function WhatYoureSeeingButton({ screen, contextLine, compact = false }: { screen: HelpScreenId; contextLine?: string; compact?: boolean }) {
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
      aria-label={compact ? 'What you’re seeing' : undefined} onClick={() => setOpen((value) => !value)}>
      <span className={styles.icon} aria-hidden="true">i</span>
      <span className={compact ? styles.optionalLabel : undefined}>What you’re seeing</span>
    </button>
    <WhatYoureSeeing screen={screen} open={open} contextLine={open ? contextLine : undefined}
      onClose={() => { returnFocus.current = true; setOpen(false); }}
      onStartTour={() => { setOpen(false); setTouring(true); }} />
    <TourOverlay steps={HELP[screen].steps} open={touring} onClose={() => { returnFocus.current = true; setTouring(false); }} />
  </>;
}
