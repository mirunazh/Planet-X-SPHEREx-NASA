'use client';

import { useEffect, useId, useRef } from 'react';
import { markIntroPending } from '@/lib/ui';
import { WhatYoureSeeingButton } from '@/components/help/WhatYoureSeeingButton';
import { INTRO_CREDIT_LINE, SKY_BACKDROP } from './imagery';
import styles from './SpherexIntro.module.css';

/** An introduction using only the existing SPHEREx sky projection. */
export function SpherexIntro({ onDone }: { onDone: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const enter = useRef<HTMLButtonElement>(null);
  const title = useId();
  const description = useId();
  useEffect(() => {
    markIntroPending();
    enter.current?.focus();
  }, []);

  return <div ref={root} className={styles.root} role="dialog" aria-modal="true" aria-labelledby={title} aria-describedby={description}
    onKeyDown={(event) => {
      if (event.key === 'Escape') { event.preventDefault(); event.stopPropagation(); onDone(); }
      if (event.key !== 'Tab') return;
      const nodes = root.current?.querySelectorAll<HTMLElement>('button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), summary, [tabindex]');
      const focusable = [...(nodes ?? [])].filter((node) => node.tabIndex >= 0 && !node.closest('[inert]') && node.getClientRects().length > 0);
      const first = focusable[0]; const last = focusable.at(-1);
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    }}>
    <header className={styles.header}>
      <strong>SPHEREx Sky Navigator</strong>
      <button className="btn ghost" onClick={onDone}>Skip intro</button>
    </header>
    <div className={styles.content}>
      <img className={styles.image} data-tour="intro-sky" src={SKY_BACKDROP.src}
        alt="SPHEREx infrared sky around the south ecliptic pole, at 2.19 micrometres" width={SKY_BACKDROP.size} height={SKY_BACKDROP.size} />
      <section className={styles.copy}>
        <h1 id={title}>Explore the sky through SPHEREx</h1>
        <p id={description}>See stars, dust and galaxies in infrared light. Choose a region and browse its SPHEREx observations, one exposure at a time.</p>
        <p className="small muted">This SPHEREx DR1 sky projection shows the 2.19 µm channel around the south ecliptic pole. A small gap is filled with the local sky level for display.</p>
        <div className={styles.actions}>
          <button className="btn primary" ref={enter} data-tour="intro-cta" onClick={onDone}>Explore SPHEREx</button>
          <WhatYoureSeeingButton screen="intro" />
        </div>
      </section>
    </div>
    <p className="small muted">{INTRO_CREDIT_LINE}</p>
  </div>;
}
