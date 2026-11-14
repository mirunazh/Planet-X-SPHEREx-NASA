'use client';

/**
 * Direct manipulation: grab-the-sky drag (the point under the pointer stays
 * under the pointer), zoom about the cursor, pinch, double-click to fly,
 * flick inertia, hover/click on pins and keyboard navigation.
 */
import { type RefObject, useEffect } from 'react';
import { useNav } from '@/lib/store';
import {
  cancelAnimations,
  currentView,
  enterSky,
  exitToGlobe,
  flyTo,
  lockTarget,
  panByScreen,
  resetView,
  startInertia,
  zoomAt,
} from '@/lib/navigation';
import { pickPin } from '@/lib/pins';
import { type Vec3, angularDistance, cross, normalize } from '@/lib/sky/coords';
import { effectiveFov, pickSky, solveAnchor } from '@/lib/sky/view';

interface Local {
  px: number;
  py: number;
  x: number;
  y: number;
  aspect: number;
  w: number;
  h: number;
}

interface Drag {
  anchor: Vec3 | null;
  startX: number;
  startY: number;
  lastX: number;
  lastY: number;
  moved: boolean;
  samples: { t: number; c: Vec3 }[];
}

export function useSkyControls(ref: RefObject<HTMLDivElement | null>): void {
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const el: HTMLDivElement = node;
    const pointers = new Map<number, { x: number; y: number }>();
    let drag: Drag | null = null;
    let pinchDist = 0;
    let lastHover = 0;

    const local = (clientX: number, clientY: number): Local => {
      const r = el.getBoundingClientRect();
      const px = clientX - r.left;
      const py = clientY - r.top;
      return { px, py, x: (px / r.width) * 2 - 1, y: 1 - (py / r.height) * 2, aspect: r.width / Math.max(1, r.height), w: r.width, h: r.height };
    };

    const updateHover = (p: Local) => {
      const pin = pickPin(currentView(), p.w, p.h, p.px, p.py);
      useNav.getState().setHover(pin, pin ? { x: p.px, y: p.py } : null);
      el.style.cursor = pin ? 'pointer' : '';
    };

    function onPointerDown(e: PointerEvent) {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      if (useNav.getState().crossing) return;
      el.setPointerCapture(e.pointerId);
      pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
      cancelAnimations();
      if (pointers.size === 1) {
        const p = local(e.clientX, e.clientY);
        drag = {
          anchor: pickSky(currentView(), p.aspect, p.x, p.y),
          startX: p.px,
          startY: p.py,
          lastX: p.px,
          lastY: p.py,
          moved: false,
          samples: [{ t: performance.now(), c: useNav.getState().center }],
        };
      } else if (pointers.size === 2) {
        drag = null;
        const [a, b] = [...pointers.values()];
        pinchDist = Math.hypot(a.x - b.x, a.y - b.y);
      }
    }

    function onPointerMove(e: PointerEvent) {
      if (pointers.has(e.pointerId)) pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });

      if (pointers.size >= 2) {
        const [a, b] = [...pointers.values()];
        const dist = Math.hypot(a.x - b.x, a.y - b.y);
        if (pinchDist > 0 && dist > 0) {
          const mid = local((a.x + b.x) / 2, (a.y + b.y) / 2);
          zoomAt(mid.x, mid.y, pinchDist / dist);
        }
        pinchDist = dist;
        return;
      }

      const p = local(e.clientX, e.clientY);
      if (drag) {
        if (!drag.moved && Math.hypot(p.px - drag.startX, p.py - drag.startY) > 3) {
          drag.moved = true;
          el.classList.add('dragging');
          useNav.getState().setHover(null, null);
          useNav.setState({ origin: 'navigation' });
        }
        if (!drag.moved || useNav.getState().crossing) return;
        const view = currentView();
        if (drag.anchor) {
          useNav.getState().setView({ center: solveAnchor(view, p.aspect, p.x, p.y, drag.anchor) });
        } else {
          // Dragging in empty space around the globe: rotate by the pointer delta.
          panByScreen((-(p.px - drag.lastX) / p.w) * 2, ((p.py - drag.lastY) / p.h) * 2);
        }
        drag.lastX = p.px;
        drag.lastY = p.py;
        drag.samples.push({ t: performance.now(), c: useNav.getState().center });
        if (drag.samples.length > 8) drag.samples.shift();
        return;
      }

      const now = performance.now();
      if (now - lastHover > 40) {
        lastHover = now;
        updateHover(p);
      }
    }

    function onPointerUp(e: PointerEvent) {
      pointers.delete(e.pointerId);
      if (el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId);
      if (pointers.size > 0) {
        pinchDist = 0;
        return;
      }
      const d = drag;
      drag = null;
      el.classList.remove('dragging');
      if (!d) return;
      if (!d.moved) {
        const p = local(e.clientX, e.clientY);
        const pin = pickPin(currentView(), p.w, p.h, p.px, p.py);
        if (pin) useNav.setState({ selected: pin, locked: null });
        return;
      }
      // Flick inertia from the last ~90 ms of motion.
      const now = performance.now();
      const last = d.samples[d.samples.length - 1];
      const first = d.samples.find((s) => s.t >= now - 90) ?? last;
      const dt = (last.t - first.t) / 1000;
      if (now - last.t < 60 && dt > 0.008) {
        const angle = (angularDistance(first.c, last.c) * Math.PI) / 180;
        const axis = cross(first.c, last.c);
        if (angle > 1e-6 && Math.hypot(...axis) > 1e-12) startInertia(normalize(axis), angle / dt);
      }
    }

    function onPointerLeave() {
      if (!drag) {
        useNav.getState().setHover(null, null);
        el.style.cursor = '';
      }
    }

    function onWheel(e: WheelEvent) {
      e.preventDefault();
      const p = local(e.clientX, e.clientY);
      let dy = e.deltaY;
      if (e.deltaMode === 1) dy *= 16;
      else if (e.deltaMode === 2) dy *= 400;
      if (e.ctrlKey) dy *= 2.5; // trackpad pinch
      dy = Math.max(-300, Math.min(300, dy));
      zoomAt(p.x, p.y, Math.exp(dy * 0.0016));
    }

    function onDoubleClick(e: MouseEvent) {
      const p = local(e.clientX, e.clientY);
      const target = pickSky(currentView(), p.aspect, p.x, p.y);
      if (target) flyTo(target, effectiveFov(currentView()) / 3, 'navigation');
    }

    function onKey(e: KeyboardEvent) {
      const t = e.target as HTMLElement | null;
      if (t && (['INPUT', 'TEXTAREA', 'SELECT', 'BUTTON'].includes(t.tagName) || t.isContentEditable)) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const s = useNav.getState();
      switch (e.key) {
        case 'ArrowLeft':
          panByScreen(-0.15, 0);
          break;
        case 'ArrowRight':
          panByScreen(0.15, 0);
          break;
        case 'ArrowUp':
          panByScreen(0, 0.15);
          break;
        case 'ArrowDown':
          panByScreen(0, -0.15);
          break;
        case '+':
        case '=':
          zoomAt(0, 0, 0.75);
          break;
        case '-':
        case '_':
          zoomAt(0, 0, 1 / 0.75);
          break;
        case 'Enter':
          lockTarget();
          break;
        case 'Escape':
          if (s.panel !== 'none') s.setPanel('none');
          else useNav.setState({ selected: null, locked: null });
          break;
        case 'g':
          s.toggle('showGrid');
          break;
        case 'r':
          resetView();
          break;
        case 's':
          if (s.mode === 'globe') enterSky();
          else exitToGlobe();
          break;
        default:
          return;
      }
      e.preventDefault();
    }

    el.addEventListener('pointerdown', onPointerDown);
    el.addEventListener('pointermove', onPointerMove);
    el.addEventListener('pointerup', onPointerUp);
    el.addEventListener('pointercancel', onPointerUp);
    el.addEventListener('pointerleave', onPointerLeave);
    el.addEventListener('wheel', onWheel, { passive: false });
    el.addEventListener('dblclick', onDoubleClick);
    window.addEventListener('keydown', onKey);
    return () => {
      el.removeEventListener('pointerdown', onPointerDown);
      el.removeEventListener('pointermove', onPointerMove);
      el.removeEventListener('pointerup', onPointerUp);
      el.removeEventListener('pointercancel', onPointerUp);
      el.removeEventListener('pointerleave', onPointerLeave);
      el.removeEventListener('wheel', onWheel);
      el.removeEventListener('dblclick', onDoubleClick);
      window.removeEventListener('keydown', onKey);
    };
  }, [ref]);
}
