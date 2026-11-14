'use client';

// The main scrubber: a real time axis from the first to the last visit. Each frame is a mark at its
// date, sized by how many photos it holds; the current one is lit in the accent. One slider for
// keyboard and screen readers (arrows, Home, End), pointer down or drag picks the nearest frame.

import { useMemo, useRef, type CSSProperties, type KeyboardEvent, type PointerEvent } from 'react';
import { mjdToDate, type Frame } from '@/lib/data';
import { S } from '@/lib/strings';

const MONTH = new Intl.DateTimeFormat('en', { month: 'short', timeZone: 'UTC' });
const mid = (f: Frame) => (f.mjdStart + f.mjdEnd) / 2;
const toMjd = (d: Date) => d.getTime() / 86400000 + 40587;

interface Props {
  frames: Frame[];
  index: number;
  /** Short date shown above the current mark. */
  headLabel: string;
  isDisabled: boolean;
  onSeek: (i: number) => void;
}

export function TimeAxis({ frames, index, headLabel, isDisabled, onSeek }: Props) {
  const track = useRef<HTMLDivElement>(null);
  const n = frames.length;

  const axis = useMemo(() => {
    if (!frames.length) return null;
    const t0 = Math.min(...frames.map((f) => f.mjdStart));
    const t1 = Math.max(...frames.map((f) => f.mjdEnd));
    const span = t1 - t0 || 1;
    const kmax = Math.max(...frames.map((f) => f.exposures.length));
    const marks = frames.map((f) => ({
      p: frames.length > 1 ? (mid(f) - t0) / span : 0.5,
      size: kmax > 1 ? Math.round(6 + 12 * Math.sqrt(f.exposures.length / kmax)) : 7,
    }));
    // One tick per month; January carries its year, every third month its name.
    // ponytail: monthly ticks suit the one-year SPHEREx baseline; thin them out if a span runs to years.
    const ticks: { p: number; label: string | null }[] = [];
    const start = mjdToDate(t0);
    for (let m = 1; ; m++) {
      const d = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth() + m, 1));
      if (toMjd(d) >= t1) break;
      const month = d.getUTCMonth();
      ticks.push({ p: (toMjd(d) - t0) / span, label: month === 0 ? String(d.getUTCFullYear()) : month % 3 === 0 ? MONTH.format(d) : null });
    }
    return { t0, span, marks, ticks };
  }, [frames]);

  if (!axis) return null;
  const head = axis.marks[index]?.p ?? 0;

  const seekAt = (clientX: number) => {
    const r = track.current!.getBoundingClientRect();
    const t = axis.t0 + ((clientX - r.left) / r.width) * axis.span;
    let best = 0;
    frames.forEach((f, i) => {
      if (Math.abs(mid(f) - t) < Math.abs(mid(frames[best]) - t)) best = i;
    });
    onSeek(best);
  };

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (isDisabled) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    seekAt(e.clientX);
  };
  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.currentTarget.hasPointerCapture(e.pointerId)) seekAt(e.clientX);
  };
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const step: Record<string, number> = { ArrowRight: 1, ArrowUp: 1, ArrowLeft: -1, ArrowDown: -1, PageUp: 10, PageDown: -10 };
    const next = e.key === 'Home' ? 0 : e.key === 'End' ? n - 1 : e.key in step ? index + step[e.key] : null;
    if (next === null || isDisabled) return;
    e.preventDefault();
    onSeek(Math.max(0, Math.min(n - 1, next)));
  };

  // --p (0 to 1) slides a label's anchor from its left edge to its right edge, so it never overhangs the axis.
  const at = (p: number) => ({ left: `${p * 100}%`, '--p': p }) as CSSProperties;

  return (
    <div
      className="timeline"
      role="slider"
      tabIndex={isDisabled ? -1 : 0}
      aria-label={S.timeAxis}
      aria-valuemin={1}
      aria-valuemax={n}
      aria-valuenow={index + 1}
      aria-valuetext={S.timeAxisValue(headLabel, index + 1, n)}
      aria-disabled={isDisabled || undefined}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onKeyDown={onKeyDown}
    >
      <div className="timeline-track" ref={track}>
        <span className="timeline-line" />
        {axis.ticks.map((t) => (
          <span key={t.p} className="timeline-tick" style={at(t.p)} data-major={t.label ? '' : undefined}>
            {t.label && <span className="timeline-label data">{t.label}</span>}
          </span>
        ))}
        {axis.marks.map((m, i) => (
          <span
            key={i}
            className="timeline-mark"
            data-current={i === index ? '' : undefined}
            style={{ ...at(m.p), width: m.size, height: m.size }}
          />
        ))}
        <span className="timeline-needle" style={at(head)} />
        <span className="timeline-head data" style={at(head)}>
          {headLabel}
        </span>
      </div>
    </div>
  );
}
