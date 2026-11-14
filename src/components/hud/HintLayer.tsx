'use client';

/**
 * One tooltip for the whole interface. Any element with a `data-hint`
 * attribute explains itself on mouse hover (after a short delay) or on keyboard
 * focus. Add `data-hint-nofocus` to skip the focus trigger, e.g. on the search
 * box where the hint would cover the suggestions.
 *
 * Accessibility: the hovered or focused element gets aria-describedby pointing
 * at the tooltip, so screen readers read the same text.
 */
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

const SHOW_DELAY_MS = 250;
const GAP = 8;
const MARGIN = 8;

interface Active {
  text: string;
  rect: DOMRect;
}

function hinted(target: EventTarget | null): HTMLElement | null {
  let node: HTMLElement | null = target instanceof HTMLElement ? target : target instanceof Element ? target.parentElement : null;
  while (node) {
    if (node.dataset.hint) return node;
    node = node.parentElement;
  }
  return null;
}

export function HintLayer() {
  const [active, setActive] = useState<Active | null>(null);
  const [pos, setPos] = useState<{ left: number; top: number } | null>(null);
  const tip = useRef<HTMLDivElement>(null);
  const current = useRef<HTMLElement | null>(null);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;

    const show = (el: HTMLElement) => {
      const text = el.dataset.hint;
      if (!text) return;
      if (current.current && current.current !== el) current.current.removeAttribute('aria-describedby');
      current.current = el;
      el.setAttribute('aria-describedby', 'ui-hint');
      setActive({ text, rect: el.getBoundingClientRect() });
    };

    const hide = () => {
      clearTimeout(timer);
      current.current?.removeAttribute('aria-describedby');
      current.current = null;
      setActive(null);
    };

    const onOver = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
      const el = hinted(e.target);
      if (el === current.current) return;
      clearTimeout(timer);
      if (!el) {
        if (current.current) hide();
        return;
      }
      // Moving between hinted elements switches immediately; a first hint waits a moment.
      if (current.current) show(el);
      else timer = setTimeout(() => show(el), SHOW_DELAY_MS);
    };

    const onOut = (e: PointerEvent) => {
      if (!e.relatedTarget) hide();
    };

    const onFocus = (e: FocusEvent) => {
      const el = hinted(e.target);
      const target = e.target as Element | null;
      if (!el || 'hintNofocus' in el.dataset || !target?.matches?.(':focus-visible')) return;
      clearTimeout(timer);
      show(el);
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') hide();
    };

    document.addEventListener('pointerover', onOver);
    document.addEventListener('pointerout', onOut);
    document.addEventListener('pointerdown', hide, true);
    document.addEventListener('wheel', hide, { passive: true });
    document.addEventListener('focusin', onFocus);
    document.addEventListener('focusout', hide);
    document.addEventListener('keydown', onKey);
    window.addEventListener('blur', hide);
    return () => {
      clearTimeout(timer);
      document.removeEventListener('pointerover', onOver);
      document.removeEventListener('pointerout', onOut);
      document.removeEventListener('pointerdown', hide, true);
      document.removeEventListener('wheel', hide);
      document.removeEventListener('focusin', onFocus);
      document.removeEventListener('focusout', hide);
      document.removeEventListener('keydown', onKey);
      window.removeEventListener('blur', hide);
    };
  }, []);

  // Place the tooltip next to the element: below if it fits, otherwise above, kept on screen.
  useLayoutEffect(() => {
    const el = tip.current;
    if (!active || !el) {
      setPos(null);
      return;
    }
    const { width, height } = el.getBoundingClientRect();
    const r = active.rect;
    const fitsBelow = r.bottom + GAP + height <= window.innerHeight - MARGIN;
    const top = fitsBelow || r.top - GAP - height < MARGIN ? r.bottom + GAP : r.top - GAP - height;
    const left = Math.min(window.innerWidth - width - MARGIN, Math.max(MARGIN, r.left + r.width / 2 - width / 2));
    setPos({ left, top });
  }, [active]);

  return (
    <div
      id="ui-hint"
      ref={tip}
      role="tooltip"
      className={`hint ${active && pos ? 'show' : ''}`}
      style={pos ? { left: pos.left, top: pos.top } : undefined}
    >
      {active?.text}
    </div>
  );
}
