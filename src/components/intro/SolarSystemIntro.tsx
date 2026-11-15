'use client';

import { type KeyboardEvent, useCallback, useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { ELEMENTS_VALID_YEARS, PLANETS, PLANET_ORDER, eclipticLongitudeDeg, type PlanetId } from '@/lib/sky/planets';
import { WhatYoureSeeingButton } from '@/components/help/WhatYoureSeeingButton';
import { markIntroPending } from '@/lib/ui';
import { usePageHidden, useReducedMotion } from './hooks';
import { BODY_SHAPES, INTRO_CREDIT_LINE, SATURN_RINGS, SATURN_RINGS_INNER, SKY_BACKDROP } from './imagery';
import { type Circle, type OrreryLayout, type Rect, backdropSize, computeLayout, orbitPoint, placeLabels } from './orrery';
import styles from './SolarSystemIntro.module.css';

/** Time-lapse speed: one second on screen is 20 days for the planets. */
const DAYS_PER_SECOND = 20;
const SIM_MS_PER_REAL_MS = (DAYS_PER_SECOND * 86_400_000) / 1000;
const CAPTION_MS = 5000;
const ZOOM_MS = 1200;
/** The JPL elements are valid until 2050; a time-lapse left running that long starts again from today. */
const VALID_UNTIL_MS = Date.UTC(ELEMENTS_VALID_YEARS.to, 0, 1);

const CAPTIONS = [
  'The Sun and planets, where they are today.',
  'Behind them is the real sky, mapped by SPHEREx. The planets move; distant stars stay put.',
  'Thousands more planets circle other stars. In the sky map, orange dots mark those stars.',
];
const SWATCH_AFTER = 'orange dots';

type LabelId = PlanetId | 'sun';
/** Earth is placed first so its label always gets the best spot. */
const LABEL_PRIORITY: LabelId[] = ['earth', 'sun', 'mercury', 'venus', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune'];
const labelText = (id: LabelId) => (id === 'sun' ? 'Sun' : PLANETS[id].name);

/** "15 Nov 2026" in the viewer's time zone; fixed three-letter months keep the ticking clock steady. */
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const formatDay = (d: Date) => `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
const pad = (n: number) => String(n).padStart(2, '0');
const isoDay = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

const FOCUSABLE = 'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

interface Geometry {
  width: number;
  height: number;
  slot: Rect;
}

const sameGeometry = (a: Geometry, b: Geometry) =>
  a.width === b.width && a.height === b.height && a.slot.x === b.slot.x && a.slot.y === b.slot.y && a.slot.w === b.slot.w && a.slot.h === b.slot.h;

function CaptionText({ text }: { text: string }) {
  const at = text.indexOf(SWATCH_AFTER);
  if (at < 0) return text;
  const end = at + SWATCH_AFTER.length;
  return (
    <>
      {text.slice(0, end)}
      <span className={styles.swatch} />
      {text.slice(end)}
    </>
  );
}

const RAD_TO_DEG = 180 / Math.PI;

/**
 * About 20 seconds of context before the sky map: a top-down orrery with the planets at today's
 * real heliocentric longitudes (JPL approximate elements), then a 1 s = 20 days time-lapse, and a
 * zoom into Earth — the vantage point of SPHEREx — before handing over. The only picture is SPHEREx
 * data: the sky that lies behind the Sun in this view (see ./imagery). The Sun and planets are drawn
 * as coloured discs, each lit from the Sun's side (the project's scope is SPHEREx only, so no other
 * mission's photos). Decides nothing about when it shows;
 * `onDone` fires once, on skip, Escape or the end of the zoom.
 */
export function SolarSystemIntro({ onDone }: { onDone: () => void }) {
  const reducedMotion = useReducedMotion();
  const pageHidden = usePageHidden();
  const titleId = useId();
  const captionId = useId();
  /** Prefix for ids inside the drawing (clip path, gradient); useId's punctuation is not safe in url(#…). */
  const svgId = `intro${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;

  const [geometry, setGeometry] = useState<Geometry | null>(null);
  const [step, setStep] = useState(0);
  const [autoAdvance, setAutoAdvance] = useState(true);
  const [paused, setPaused] = useState(false);
  const [zooming, setZooming] = useState(false);
  const [skyLoaded, setSkyLoaded] = useState(false);

  const rootRef = useRef<HTMLDivElement>(null);
  const slotRef = useRef<HTMLDivElement>(null);
  const worldRef = useRef<SVGGElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const dateRef = useRef<HTMLTimeElement>(null);
  const planetEls = useRef<Partial<Record<PlanetId, SVGGElement | null>>>({});
  const nightEls = useRef<Partial<Record<PlanetId, SVGCircleElement | null>>>({});
  const labelEls = useRef<Partial<Record<LabelId, SVGTextElement | null>>>({});
  const labelWidths = useRef<Partial<Record<LabelId, number>>>({});
  const layoutRef = useRef<OrreryLayout | null>(null);
  const startMs = useRef(0);
  const simMs = useRef(0);
  const earthAt = useRef<{ x: number; y: number } | null>(null);
  const shownDate = useRef('');
  const done = useRef(false);
  const onDoneRef = useRef(onDone);

  const layout = useMemo(() => (geometry ? computeLayout(geometry.width, geometry.height, geometry.slot) : null), [geometry]);
  /** The time-lapse runs from the second caption on; the first one holds today's positions. */
  const lapse = !reducedMotion && step > 0;
  const running = layout !== null && lapse && !paused && !pageHidden && !zooming;

  useEffect(() => {
    onDoneRef.current = onDone;
  }, [onDone]);

  const finish = useCallback(() => {
    if (done.current) return;
    done.current = true;
    if (rootRef.current) rootRef.current.dataset.done = 'true';
    onDoneRef.current();
  }, []);

  /** Moves the planets, their labels and the clock to an instant. Writes the DOM directly: no re-render per frame. */
  const drawAt = useCallback((ms: number) => {
    const L = layoutRef.current;
    if (!L) return;
    const date = new Date(ms);
    const circles = { sun: { x: L.cx, y: L.cy, r: L.sunRadius * BODY_SHAPES.sun.reach } } as Record<LabelId, Circle>;
    const directions = { sun: { ux: 0, uy: 1 } } as Record<LabelId, { ux: number; uy: number }>;
    for (const id of PLANET_ORDER) {
      const p = orbitPoint(L, id, eclipticLongitudeDeg(id, date));
      planetEls.current[id]?.setAttribute('transform', `translate(${p.x.toFixed(2)} ${p.y.toFixed(2)})`);
      // Night side away from the Sun: seen from above, every planet is half lit.
      nightEls.current[id]?.setAttribute('transform', `rotate(${(Math.atan2(p.uy, p.ux) * RAD_TO_DEG).toFixed(1)})`);
      circles[id] = { x: p.x, y: p.y, r: id === 'earth' ? L.earthRing : L.dot[id] * BODY_SHAPES[id].reach };
      directions[id] = { ux: p.ux, uy: p.uy };
    }
    earthAt.current = { x: circles.earth.x, y: circles.earth.y };

    const height = L.fontSize * 1.25;
    const spots = placeLabels(
      LABEL_PRIORITY.map((id) => ({
        anchor: circles[id],
        ...directions[id],
        w: (labelWidths.current[id] ?? labelText(id).length * L.fontSize * 0.6) + 2,
        h: height,
      })),
      Object.values(circles),
      L.bounds,
    );
    spots.forEach((spot, i) => {
      const el = labelEls.current[LABEL_PRIORITY[i]];
      if (!el) return;
      el.setAttribute('x', spot.x.toFixed(1));
      el.setAttribute('y', spot.y.toFixed(1));
      el.setAttribute('visibility', spot.visible ? 'visible' : 'hidden');
    });

    const text = formatDay(date);
    if (dateRef.current && text !== shownDate.current) {
      shownDate.current = text;
      dateRef.current.textContent = text;
      dateRef.current.dateTime = isoDay(date);
    }
  }, []);

  // Today, read once when the intro opens.
  useLayoutEffect(() => {
    startMs.current = Date.now();
    simMs.current = startMs.current;
  }, []);

  // A reload before the intro ends must show it again, even though the sky page has already
  // written its start view (a "deep link") into the address bar.
  useEffect(() => {
    markIntroPending();
  }, []);

  // Measure the overlay and the free slot the drawing is centred in.
  useLayoutEffect(() => {
    const root = rootRef.current;
    const slot = slotRef.current;
    if (!root || !slot) return;
    const measure = () => {
      const r = root.getBoundingClientRect();
      const s = slot.getBoundingClientRect();
      const next: Geometry = {
        width: Math.round(r.width),
        height: Math.round(r.height),
        slot: { x: Math.round(s.left - r.left), y: Math.round(s.top - r.top), w: Math.round(s.width), h: Math.round(s.height) },
      };
      setGeometry((prev) => (prev && sameGeometry(prev, next) ? prev : next));
    };
    measure();
    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', measure);
      return () => window.removeEventListener('resize', measure);
    }
    const observer = new ResizeObserver(measure);
    observer.observe(root);
    observer.observe(slot);
    return () => observer.disconnect();
  }, []);

  // Redraw on layout or mode changes. Outside the time-lapse, the planets sit at today's positions.
  useLayoutEffect(() => {
    layoutRef.current = layout;
    if (!layout) return;
    for (const id of LABEL_PRIORITY) {
      const width = labelEls.current[id]?.getComputedTextLength?.() ?? 0;
      labelWidths.current[id] = width > 0 ? width : undefined;
    }
    if (!lapse) simMs.current = startMs.current;
    drawAt(simMs.current);
  }, [layout, lapse, drawAt]);

  // The time-lapse. Stops while paused, hidden, zooming or with reduced motion.
  useEffect(() => {
    if (!running) return;
    let frame = 0;
    let last: number | null = null;
    const tick = (now: number) => {
      if (last !== null) {
        let ms = simMs.current + Math.min(now - last, 100) * SIM_MS_PER_REAL_MS;
        if (ms >= VALID_UNTIL_MS && startMs.current < VALID_UNTIL_MS) ms = startMs.current;
        simMs.current = ms;
        drawAt(ms);
      }
      last = now;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [running, drawAt]);

  // Captions advance every five seconds until the viewer picks one.
  useEffect(() => {
    if (!autoAdvance || paused || pageHidden || zooming || step >= CAPTIONS.length - 1) return;
    const timer = window.setTimeout(() => setStep((s) => Math.min(s + 1, CAPTIONS.length - 1)), CAPTION_MS);
    return () => window.clearTimeout(timer);
  }, [autoAdvance, paused, pageHidden, zooming, step]);

  // Focus the main action on open; hand focus back on close unless someone else has taken it.
  useEffect(() => {
    const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    ctaRef.current?.focus({ preventScroll: true });
    return () => {
      const active = document.activeElement;
      if (previous && previous !== document.body && previous.isConnected && (!active || active === document.body)) {
        previous.focus({ preventScroll: true });
      }
    };
  }, []);

  // Escape skips, even when focus has left the dialog (keys from inside are handled below).
  useEffect(() => {
    const onKey = (event: globalThis.KeyboardEvent) => {
      if (event.key !== 'Escape' || event.defaultPrevented) return;
      event.preventDefault();
      finish();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [finish]);

  // Safety net in case transitionend never arrives (for example in a background tab).
  useEffect(() => {
    if (!zooming) return;
    const timer = window.setTimeout(finish, ZOOM_MS + 150);
    return () => window.clearTimeout(timer);
  }, [zooming, finish]);

  const lookOut = () => {
    if (done.current || zooming) return;
    const L = layoutRef.current;
    const earth = earthAt.current;
    const world = worldRef.current;
    if (reducedMotion || !L || !earth || !world) {
      finish();
      return;
    }
    // Fly Earth to the centre of the screen while scaling up, so its ring fills about a third of it.
    const zoom = Math.min(60, Math.max(8, (0.35 * Math.min(L.width, L.height)) / L.earthRing));
    const tx = L.width / 2 - zoom * earth.x;
    const ty = L.height / 2 - zoom * earth.y;
    world.style.transform = `translate(${tx.toFixed(1)}px, ${ty.toFixed(1)}px) scale(${zoom.toFixed(3)})`;
    setZooming(true);
  };

  const pickCaption = (index: number) => {
    setAutoAdvance(false);
    setStep(index);
  };

  const skySize = layout ? backdropSize(layout) : 0;
  /** Soft glare around the Sun, wide enough to cover the backdrop's no-data disc behind it. */
  const glareR = layout ? Math.max(3.4 * layout.sunRadius, (1.6 * SKY_BACKDROP.holeRadiusPx * skySize) / SKY_BACKDROP.size) : 0;

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    // A modal: the sky map's own shortcuts must not act behind it.
    event.stopPropagation();
    if (event.key === 'Escape') {
      event.preventDefault();
      finish();
      return;
    }
    if (event.key !== 'Tab') return;
    const root = event.currentTarget;
    const items = Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
      (el) => el.getClientRects().length > 0 && getComputedStyle(el).visibility !== 'hidden',
    );
    if (items.length === 0) return;
    const first = items[0];
    const last = items[items.length - 1];
    const active = document.activeElement;
    if (event.shiftKey ? active === first || active === root : active === last || active === root) {
      event.preventDefault();
      (event.shiftKey ? last : first).focus();
    }
  };

  return (
    <div
      ref={rootRef}
      className={styles.root}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      aria-describedby={captionId}
      tabIndex={-1}
      onKeyDown={onKeyDown}
      data-zooming={zooming || undefined}
    >
      {layout && (
        // Real sky behind the Sun; it stays put during the zoom, as stars at infinity would.
        <img
          className={styles.sky}
          src={SKY_BACKDROP.src}
          alt=""
          aria-hidden="true"
          decoding="async"
          draggable={false}
          data-loaded={skyLoaded || undefined}
          onLoad={() => setSkyLoaded(true)}
          style={{ left: layout.cx - skySize / 2, top: layout.cy - skySize / 2, width: skySize, height: skySize }}
        />
      )}
      <div className={styles.shade} aria-hidden="true" />
      <svg
        className={styles.drawing}
        viewBox={layout ? `0 0 ${layout.width} ${layout.height}` : undefined}
        role="img"
        aria-label="Top-down diagram of the Sun and the eight planets, at their positions on the date shown, with Earth highlighted, in front of the real sky in that direction. Sizes enlarged, distances compressed, not to scale."
      >
        {layout && (
          <>
            <defs>
              {/* Lit towards the Sun (left of the gradient), dark away from it; rotated per planet. */}
              <linearGradient id={`${svgId}-night`}>
                <stop offset="0.36" stopColor="#000" stopOpacity="0" />
                <stop offset="0.64" stopColor="#000" stopOpacity="0.72" />
                <stop offset="1" stopColor="#000" stopOpacity="0.88" />
              </linearGradient>
              <radialGradient id={`${svgId}-glare`}>
                <stop offset="0" stopColor="#ffd9a0" stopOpacity="0.5" />
                <stop offset="0.3" stopColor="#ffd9a0" stopOpacity="0.2" />
                <stop offset="0.62" stopColor="#ffd9a0" stopOpacity="0.06" />
                <stop offset="1" stopColor="#ffd9a0" stopOpacity="0" />
              </radialGradient>
            </defs>
            <g
              ref={worldRef}
              className={styles.world}
              onTransitionEnd={(event) => {
                if (event.target === event.currentTarget && event.propertyName === 'transform') finish();
              }}
            >
              <g data-tour="intro-orbits">
                {PLANET_ORDER.map((id) => (
                  <circle key={id} className={id === 'earth' ? styles.earthOrbit : styles.orbit} cx={layout.cx} cy={layout.cy} r={layout.orbit[id]} />
                ))}
              </g>
              <circle cx={layout.cx} cy={layout.cy} r={glareR} fill={`url(#${svgId}-glare)`} />
              {/* Drawn discs, not photographs: the only picture in the intro is the SPHEREx sky. */}
              <circle className={styles.sun} cx={layout.cx} cy={layout.cy} r={layout.sunRadius} />
              {PLANET_ORDER.map((id) => {
                const r = layout.dot[id];
                return (
                  <g
                    key={id}
                    ref={(el) => {
                      planetEls.current[id] = el;
                    }}
                  >
                    {id === 'earth' && <circle className={styles.earthRing} r={layout.earthRing} />}
                    {id === 'saturn' && (
                      // Rings seen from above: C ring inner edge to A ring outer edge.
                      <circle
                        className={styles.rings}
                        r={(r * (SATURN_RINGS + SATURN_RINGS_INNER)) / 2}
                        strokeWidth={r * (SATURN_RINGS - SATURN_RINGS_INNER)}
                        stroke={PLANETS.saturn.color}
                      />
                    )}
                    <circle className={id === 'earth' ? styles.earthDot : undefined} r={r} fill={id === 'earth' ? undefined : PLANETS[id].color} />
                    <circle
                      ref={(el) => {
                        nightEls.current[id] = el;
                      }}
                      r={r}
                      fill={`url(#${svgId}-night)`}
                    />
                  </g>
                );
              })}
            </g>
            <g className={styles.labels} fontSize={layout.fontSize}>
              {LABEL_PRIORITY.map((id) => (
                <text
                  key={id}
                  ref={(el) => {
                    labelEls.current[id] = el;
                  }}
                  className={id === 'earth' ? `${styles.label} ${styles.earthLabel}` : styles.label}
                  textAnchor="middle"
                  dy="0.35em"
                >
                  {labelText(id)}
                </text>
              ))}
            </g>
          </>
        )}
      </svg>

      <div className={`${styles.top} ${styles.fade}`}>
        <h2 id={titleId} className={styles.title}>
          Our Solar System
        </h2>
        <div className={styles.topActions}>
          <WhatYoureSeeingButton screen="intro" compact />
          <button type="button" className={styles.skip} onClick={finish}>
            Skip intro
          </button>
        </div>
      </div>

      <div className={`${styles.clock} ${styles.fade}`}>
        <p className={styles.clockText}>
          <span className={styles.clockLabel}>{lapse ? 'Animation date' : 'Today'}</span>
          <time ref={dateRef} className={styles.date} />
          <span className={styles.speed}>{lapse ? `1 second = ${DAYS_PER_SECOND} days` : 'Positions on this date'}</span>
        </p>
        {!reducedMotion && (
          <button
            type="button"
            className={lapse ? styles.pause : `${styles.pause} ${styles.invisible}`}
            onClick={() => setPaused((p) => !p)}
            aria-label={paused ? 'Play the time-lapse' : 'Pause the time-lapse'}
          >
            <svg viewBox="0 0 16 16" aria-hidden="true">
              {paused ? <path d="M4 2.5v11l9-5.5z" /> : <path d="M3.5 2.5h3v11h-3zM9.5 2.5h3v11h-3z" />}
            </svg>
            {paused ? 'Play' : 'Pause'}
          </button>
        )}
      </div>

      <div ref={slotRef} className={styles.slot} />

      <div className={`${styles.notes} ${styles.fade}`}>
        <p className={styles.scale} data-tour="intro-scale">
          Sizes enlarged, distances compressed — not to scale
        </p>
        <p className={styles.credit}>{INTRO_CREDIT_LINE}</p>
      </div>

      <div className={`${styles.panel} ${styles.fade}`}>
        <div className={styles.captions} aria-hidden="true">
          {CAPTIONS.map((text, i) => (
            <p key={text} className={styles.caption} data-active={i === step}>
              <CaptionText text={text} />
            </p>
          ))}
        </div>
        <p id={captionId} className={styles.srOnly} aria-live="polite" aria-atomic="true">
          {CAPTIONS[step]}
        </p>
        <div className={styles.dots} role="group" aria-label="Captions">
          {CAPTIONS.map((text, i) => (
            <button
              key={text}
              type="button"
              className={styles.dot}
              aria-label={`Caption ${i + 1} of ${CAPTIONS.length}`}
              aria-current={i === step ? 'step' : undefined}
              onClick={() => pickCaption(i)}
            >
              <span />
            </button>
          ))}
        </div>
        <p className={styles.bridge}>
          Next, look out from Earth. NASA&apos;s SPHEREx telescope orbits Earth and maps the whole sky in infrared light.
          You start looking toward the center of our Milky Way.
        </p>
        <button ref={ctaRef} type="button" className={styles.cta} data-tour="intro-cta" onClick={lookOut}>
          Look out from Earth with SPHEREx
        </button>
      </div>
    </div>
  );
}
