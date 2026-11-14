'use client';

// Draws one 121 x 121 float32 frame with the manifest stretch, crisp pixels, zoom and pan, and the
// position markers. Pixel (x, y) is a 0-based pixel centre; (cx, cy) is the pixel shown at the centre.

import { useEffect, useMemo, useRef, useState } from 'react';
import type { DisplayHint } from '@/lib/data';
import { stretch } from '@/lib/sky';
import { S } from '@/lib/strings';
import { ZOOM_MAX, ZOOM_MIN } from '@/lib/viewState';
import { color, marker } from '@/theme/tokens';

export interface Marker {
  x: number;
  y: number;
}

export interface SkyCanvasProps {
  data: Float32Array | null;
  display: DisplayHint;
  size: number;
  scaleArcsec: number;
  zoom: number;
  cx: number;
  cy: number;
  predicted: Marker | null;
  measured: Marker | null;
  input: Marker | null;
  /** A static star the measurement picked up instead of the target (pass.blendedWith). */
  neighbour: Marker | null;
  label: string;
  onView: (v: { zoom?: number; cx?: number; cy?: number }) => void;
}

const rgb = (hex: string) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16)) as [number, number, number];
const NAN_RGB = rgb(color.noData);

function renderImage(data: Float32Array, display: DisplayHint, size: number): HTMLCanvasElement {
  const c = document.createElement('canvas');
  c.width = size;
  c.height = size;
  const ctx = c.getContext('2d')!;
  const img = ctx.createImageData(size, size);
  for (let i = 0; i < data.length; i++) {
    const s = stretch(data[i], display);
    const o = i * 4;
    if (Number.isNaN(s)) {
      [img.data[o], img.data[o + 1], img.data[o + 2]] = NAN_RGB;
    } else {
      const g = Math.round(s * 255);
      img.data[o] = img.data[o + 1] = img.data[o + 2] = g;
    }
    img.data[o + 3] = 255;
  }
  ctx.putImageData(img, 0, 0);
  return c;
}

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

export function SkyCanvas(p: SkyCanvasProps) {
  const ref = useRef<HTMLCanvasElement>(null);
  const [cssW, setCssW] = useState(0);
  const image = useMemo(() => (p.data ? renderImage(p.data, p.display, p.size) : null), [p.data, p.display, p.size]);
  const viewRef = useRef(p);
  viewRef.current = p;

  useEffect(() => {
    const el = ref.current!;
    const ro = new ResizeObserver(([e]) => setCssW(e.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || !cssW) return;
    const dpr = window.devicePixelRatio || 1;
    el.width = Math.round(cssW * dpr);
    el.height = Math.round(cssW * dpr);
    const ctx = el.getContext('2d')!;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.fillStyle = color.plate;
    ctx.fillRect(0, 0, cssW, cssW);
    const scale = (cssW / p.size) * p.zoom; // css px per sky pixel
    const toCss = (x: number, y: number) => [(x - p.cx) * scale + cssW / 2, (y - p.cy) * scale + cssW / 2] as const;

    if (image) {
      ctx.imageSmoothingEnabled = false;
      const [left, top] = toCss(-0.5, -0.5);
      ctx.drawImage(image, left, top, p.size * scale, p.size * scale);
    }

    const stroke = (hue: string, w: number, path: () => void) => {
      for (const [c, lw] of [[marker.outline, w + 2.5], [hue, w]] as const) {
        ctx.beginPath();
        path();
        ctx.strokeStyle = c;
        ctx.lineWidth = lw;
        ctx.stroke();
      }
    };
    if (p.predicted) {
      const [x, y] = toCss(p.predicted.x, p.predicted.y);
      const r = Math.max(2.2 * scale, 9);
      stroke(marker.predicted, 1.8, () => ctx.arc(x, y, r, 0, Math.PI * 2));
    }
    if (p.neighbour) {
      const [x, y] = toCss(p.neighbour.x, p.neighbour.y);
      const a = Math.max(1.8 * scale, 8);
      ctx.setLineDash([4, 3]);
      stroke(marker.neighbour, 1.5, () => ctx.rect(x - a, y - a, 2 * a, 2 * a));
      ctx.setLineDash([]);
    }
    if (p.measured) {
      const [x, y] = toCss(p.measured.x, p.measured.y);
      const a = Math.max(1.2 * scale, 6);
      stroke(marker.measured, 1.8, () => {
        ctx.moveTo(x - a, y);
        ctx.lineTo(x + a, y);
        ctx.moveTo(x, y - a);
        ctx.lineTo(x, y + a);
      });
    }
    if (p.input) {
      const [x, y] = toCss(p.input.x, p.input.y);
      const a = Math.max(1.6 * scale, 8);
      stroke(marker.input, 1.8, () => {
        ctx.moveTo(x, y - a);
        ctx.lineTo(x + a, y);
        ctx.lineTo(x, y + a);
        ctx.lineTo(x - a, y);
        ctx.closePath();
      });
    }

    // Compass (north up, east left) and a scale bar.
    ctx.font = `500 12px ${getComputedStyle(el).fontFamily}`;
    ctx.fillStyle = color.text;
    ctx.strokeStyle = color.text;
    ctx.lineWidth = 1.5;
    ctx.shadowColor = 'rgba(0, 0, 0, 0.9)';
    ctx.shadowBlur = 3;
    const ox = cssW - 18;
    const oy = 46;
    ctx.beginPath();
    ctx.moveTo(ox, oy);
    ctx.lineTo(ox, oy - 26);
    ctx.moveTo(ox, oy);
    ctx.lineTo(ox - 26, oy);
    ctx.stroke();
    ctx.textAlign = 'center';
    ctx.fillText(S.compassNorth, ox, oy - 31);
    ctx.textAlign = 'right';
    ctx.fillText(S.compassEast, ox - 30, oy + 4);
    const arcsec = [5, 10, 15, 30, 60, 120].find((a) => (a / p.scaleArcsec) * scale >= 50) ?? 120;
    const len = (arcsec / p.scaleArcsec) * scale;
    ctx.beginPath();
    ctx.moveTo(12, cssW - 14);
    ctx.lineTo(12 + len, cssW - 14);
    ctx.stroke();
    ctx.textAlign = 'left';
    ctx.fillText(S.scaleBar(arcsec), 12, cssW - 20);
    ctx.shadowBlur = 0;
  }, [cssW, image, p.zoom, p.cx, p.cy, p.predicted, p.measured, p.input, p.neighbour, p.size, p.scaleArcsec]);

  // Pan by dragging, zoom with the wheel about the cursor.
  useEffect(() => {
    const el = ref.current!;
    let drag: { x: number; y: number; cx: number; cy: number } | null = null;
    const scale = () => (el.clientWidth / viewRef.current.size) * viewRef.current.zoom;
    const max = () => viewRef.current.size - 1;
    const down = (e: PointerEvent) => {
      el.setPointerCapture(e.pointerId);
      drag = { x: e.clientX, y: e.clientY, cx: viewRef.current.cx, cy: viewRef.current.cy };
    };
    const move = (e: PointerEvent) => {
      if (!drag) return;
      const s = scale();
      viewRef.current.onView({
        cx: clamp(drag.cx - (e.clientX - drag.x) / s, 0, max()),
        cy: clamp(drag.cy - (e.clientY - drag.y) / s, 0, max()),
      });
    };
    const up = () => (drag = null);
    const wheel = (e: WheelEvent) => {
      e.preventDefault();
      const v = viewRef.current;
      const rect = el.getBoundingClientRect();
      const s = scale();
      const px = e.clientX - rect.left - rect.width / 2;
      const py = e.clientY - rect.top - rect.height / 2;
      const zoom = clamp(v.zoom * Math.exp(-e.deltaY * 0.0015), ZOOM_MIN, ZOOM_MAX);
      const s2 = (el.clientWidth / v.size) * zoom;
      const dx = v.cx + px / s;
      const dy = v.cy + py / s;
      v.onView({ zoom, cx: clamp(dx - px / s2, 0, max()), cy: clamp(dy - py / s2, 0, max()) });
    };
    el.addEventListener('pointerdown', down);
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerup', up);
    el.addEventListener('pointercancel', up);
    el.addEventListener('wheel', wheel, { passive: false });
    return () => {
      el.removeEventListener('pointerdown', down);
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerup', up);
      el.removeEventListener('pointercancel', up);
      el.removeEventListener('wheel', wheel);
    };
  }, []);

  return <canvas ref={ref} className="sky-canvas" role="img" aria-label={p.label} />;
}

/** Legend swatch: the same shape and colour the canvas draws for each marker. */
export function MarkerSwatch({ kind }: { kind: 'predicted' | 'measured' | 'input' | 'neighbour' | 'noData' }) {
  const shape = {
    predicted: <circle cx="9" cy="9" r="6" />,
    measured: <path d="M3 9h12M9 3v12" />,
    input: <path d="M9 2.5 15.5 9 9 15.5 2.5 9Z" />,
    neighbour: <rect x="3" y="3" width="12" height="12" strokeDasharray="3 2.4" />,
    noData: <rect x="3" y="3" width="12" height="12" fill={color.noData} stroke="none" />,
  }[kind];
  return (
    <svg className="swatch" width="18" height="18" viewBox="0 0 18 18" aria-hidden="true" fill="none" stroke={kind === 'noData' ? undefined : marker[kind]} strokeWidth="2">
      {shape}
    </svg>
  );
}
