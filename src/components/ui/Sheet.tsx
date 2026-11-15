'use client';

import { useEffect, useId, useRef, type ReactNode } from 'react';
import styles from './Sheet.module.css';

/**
 * Shared panel for the simple navigator: a bottom sheet (like iOS) or a right-hand side sheet.
 * Non-modal: the sky stays usable while it is open. Escape closes it.
 */
export function Sheet({
  open,
  onClose,
  title,
  side = 'bottom',
  children,
  footer,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  side?: 'bottom' | 'right';
  children: ReactNode;
  footer?: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const titleId = useId();
  // Latest onClose without re-running effects: an inline arrow from the parent must not steal focus.
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  });

  useEffect(() => {
    if (!open) return;
    const opener = document.activeElement instanceof HTMLElement && document.activeElement !== document.body ? document.activeElement : null;
    ref.current?.focus();
    return () => {
      // Closing removes the focused sheet; send focus back to what opened it (for example after
      // "Fly there"), unless the visitor has already moved it somewhere else.
      const active = document.activeElement;
      if (opener?.isConnected && (!active || active === document.body)) opener.focus({ preventScroll: true });
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      // A modal (help, credits) or the guided tour above the sheet handles its own Escape first.
      if (document.querySelector('dialog[open], [data-tour-overlay]')) return;
      event.stopPropagation();
      onCloseRef.current();
    };
    window.addEventListener('keydown', onKey, true);
    return () => window.removeEventListener('keydown', onKey, true);
  }, [open]);

  if (!open) return null;
  return (
    <section ref={ref} tabIndex={-1} role="dialog" aria-modal="false" aria-labelledby={titleId}
      className={`${styles.sheet} ${side === 'right' ? styles.right : styles.bottom}`}>
      <header className={styles.head}>
        <h2 id={titleId}>{title}</h2>
        <button type="button" className={styles.close} onClick={() => onCloseRef.current()} aria-label={`Close ${title}`}>×</button>
      </header>
      <div className={styles.body}>{children}</div>
      {footer && <footer className={styles.footer}>{footer}</footer>}
    </section>
  );
}
