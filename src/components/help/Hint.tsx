'use client';

import {
  cloneElement,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type FocusEvent,
  type MouseEvent,
  type PointerEvent,
  type ReactElement,
} from 'react';
import { createPortal } from 'react-dom';
import { placeTooltip } from './placement';
import { useIsClient } from './useIsClient';
import styles from './Hint.module.css';

const HOVER_DELAY_MS = 300;
const HIDE_DELAY_MS = 120;
const LONG_PRESS_MS = 500;
const TOUCH_VISIBLE_MS = 3000;
const MOVE_TOLERANCE_PX = 10;
/** After a long-press, the click the browser may still send is swallowed for this long. */
const CLICK_GUARD_MS = 600;

type Handler<E> = ((event: E) => void) | undefined;

/** The props Hint adds to its child. The child must pass them on to its DOM element. */
interface TriggerProps {
  'aria-describedby'?: string;
  onPointerEnter?: Handler<PointerEvent<HTMLElement>>;
  onPointerLeave?: Handler<PointerEvent<HTMLElement>>;
  onPointerDown?: Handler<PointerEvent<HTMLElement>>;
  onPointerMove?: Handler<PointerEvent<HTMLElement>>;
  onPointerUp?: Handler<PointerEvent<HTMLElement>>;
  onPointerCancel?: Handler<PointerEvent<HTMLElement>>;
  onFocus?: Handler<FocusEvent<HTMLElement>>;
  onBlur?: Handler<FocusEvent<HTMLElement>>;
  onClick?: Handler<MouseEvent<HTMLElement>>;
  onContextMenu?: Handler<MouseEvent<HTMLElement>>;
}

function focusVisible(node: Element): boolean {
  try {
    return node.matches(':focus-visible');
  } catch {
    return true;
  }
}

/**
 * Short tooltip for one control: on hover, on keyboard focus, and on a ~500 ms long-press on
 * touch screens. Wires aria-describedby onto the child, which must be a single element that
 * passes event props to the DOM (a button, a link). Escape hides it. Avoid a `title` on the child,
 * and prefer aria-disabled to `disabled`: disabled buttons get no pointer or focus events.
 */
export function Hint({ text, children }: { text: string; children: ReactElement }) {
  const id = useId();
  const isClient = useIsClient();
  const [visible, setVisible] = useState(false);
  const anchorRef = useRef<HTMLElement | null>(null);
  const tipRef = useRef<HTMLDivElement>(null);
  const showTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const press = useRef<{ x: number; y: number; timer: ReturnType<typeof setTimeout> } | null>(null);
  /** True from the moment a long-press shows the hint until that finger lifts. */
  const longPressed = useRef(false);
  const swallowClickUntil = useRef(0);

  const child = children as ReactElement<TriggerProps>;
  const own = child.props;

  const show = (anchor: HTMLElement, delay = 0, hideAfter = 0) => {
    anchorRef.current = anchor;
    clearTimeout(showTimer.current);
    clearTimeout(hideTimer.current);
    const reveal = () => {
      setVisible(true);
      if (hideAfter) hideTimer.current = setTimeout(() => setVisible(false), hideAfter);
    };
    if (delay) showTimer.current = setTimeout(reveal, delay);
    else reveal();
  };

  const hide = (delay = 0) => {
    clearTimeout(showTimer.current);
    clearTimeout(hideTimer.current);
    if (delay) hideTimer.current = setTimeout(() => setVisible(false), delay);
    else setVisible(false);
  };

  const cancelPress = () => {
    if (press.current) clearTimeout(press.current.timer);
    press.current = null;
  };

  useEffect(
    () => () => {
      clearTimeout(showTimer.current);
      clearTimeout(hideTimer.current);
      if (press.current) clearTimeout(press.current.timer);
    },
    [],
  );

  // Place the tooltip above its control before it paints, and keep it there while visible.
  useLayoutEffect(() => {
    if (!visible) return;
    const place = () => {
      const anchor = anchorRef.current;
      const tip = tipRef.current;
      if (!anchor || !tip) return;
      if (!anchor.isConnected) {
        setVisible(false);
        return;
      }
      const rect = anchor.getBoundingClientRect();
      const { top, left, placement } = placeTooltip(
        { top: rect.top, left: rect.left, width: rect.width, height: rect.height },
        { width: tip.offsetWidth, height: tip.offsetHeight },
        { width: window.innerWidth, height: window.innerHeight },
      );
      tip.style.top = `${Math.round(top)}px`;
      tip.style.left = `${Math.round(left)}px`;
      tip.dataset.placement = placement;
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setVisible(false);
    };
    const onOutside = (event: Event) => {
      const target = event.target as Node | null;
      if (target && (anchorRef.current?.contains(target) || tipRef.current?.contains(target))) return;
      setVisible(false);
    };
    place();
    window.addEventListener('resize', place);
    window.addEventListener('scroll', place, true);
    window.addEventListener('keydown', onKey, true);
    document.addEventListener('pointerdown', onOutside, true);
    return () => {
      window.removeEventListener('resize', place);
      window.removeEventListener('scroll', place, true);
      window.removeEventListener('keydown', onKey, true);
      document.removeEventListener('pointerdown', onOutside, true);
    };
  }, [visible, text]);

  const describedBy = [own['aria-describedby'], isClient ? id : undefined].filter(Boolean).join(' ') || undefined;

  const trigger = cloneElement(child, {
    'aria-describedby': describedBy,
    onPointerEnter: (event: PointerEvent<HTMLElement>) => {
      own.onPointerEnter?.(event);
      if (event.pointerType !== 'touch') show(event.currentTarget, HOVER_DELAY_MS);
    },
    onPointerLeave: (event: PointerEvent<HTMLElement>) => {
      own.onPointerLeave?.(event);
      if (event.pointerType !== 'touch') hide(HIDE_DELAY_MS);
    },
    onFocus: (event: FocusEvent<HTMLElement>) => {
      own.onFocus?.(event);
      // Keyboard focus only: a tap or click also focuses the control but should not pop the hint.
      if (focusVisible(event.currentTarget)) show(event.currentTarget);
    },
    onBlur: (event: FocusEvent<HTMLElement>) => {
      own.onBlur?.(event);
      hide();
    },
    onPointerDown: (event: PointerEvent<HTMLElement>) => {
      own.onPointerDown?.(event);
      if (event.pointerType !== 'touch') {
        hide();
        return;
      }
      cancelPress();
      longPressed.current = false;
      const anchor = event.currentTarget;
      press.current = {
        x: event.clientX,
        y: event.clientY,
        timer: setTimeout(() => {
          press.current = null;
          longPressed.current = true;
          show(anchor, 0, TOUCH_VISIBLE_MS);
        }, LONG_PRESS_MS),
      };
    },
    onPointerMove: (event: PointerEvent<HTMLElement>) => {
      own.onPointerMove?.(event);
      const start = press.current;
      if (start && Math.hypot(event.clientX - start.x, event.clientY - start.y) > MOVE_TOLERANCE_PX) cancelPress();
    },
    onPointerUp: (event: PointerEvent<HTMLElement>) => {
      own.onPointerUp?.(event);
      if (longPressed.current) swallowClickUntil.current = Date.now() + CLICK_GUARD_MS;
      longPressed.current = false;
      cancelPress();
    },
    onPointerCancel: (event: PointerEvent<HTMLElement>) => {
      own.onPointerCancel?.(event);
      longPressed.current = false;
      cancelPress();
    },
    onContextMenu: (event: MouseEvent<HTMLElement>) => {
      // A long-press shows the hint instead of the browser's menu.
      if (press.current || longPressed.current) event.preventDefault();
      own.onContextMenu?.(event);
    },
    onClick: (event: MouseEvent<HTMLElement>) => {
      if (Date.now() < swallowClickUntil.current) {
        // The finger lifted after a long-press: that was a request for the hint, not a tap.
        swallowClickUntil.current = 0;
        event.preventDefault();
        event.stopPropagation();
        return;
      }
      swallowClickUntil.current = 0;
      own.onClick?.(event);
    },
  });

  return (
    <>
      {trigger}
      {isClient &&
        createPortal(
          <div
            ref={tipRef}
            id={id}
            role="tooltip"
            hidden={!visible}
            className={styles.tip}
            onPointerEnter={() => clearTimeout(hideTimer.current)}
            onPointerLeave={(event) => {
              if (event.pointerType !== 'touch') hide(HIDE_DELAY_MS);
            }}
          >
            {text}
          </div>,
          document.body,
        )}
    </>
  );
}
