'use client';

import { useEffect, useRef, useState } from 'react';
import { useNav } from '@/lib/store';
import { radecToVec, vecToRadec } from '@/lib/sky/coords';
import { cameraBasis, projectWithBasis } from '@/lib/sky/view';
import { tileStore } from '../sky/TileStore';

/** The burst of light when the camera passes through the celestial sphere. */
export function FlashOverlay() {
  const flash = useNav((s) => s.flash);
  return <div className="flash" style={{ opacity: flash }} aria-hidden="true" />;
}

export function Reticle() {
  const mode = useNav((s) => s.mode);
  if (mode !== 'sky') return null;
  return (
    <svg className="reticle" width="44" height="44" viewBox="0 0 44 44" aria-hidden="true">
      <circle cx="22" cy="22" r="9" fill="none" stroke="currentColor" strokeWidth="1" />
      <path d="M22 0v9M22 35v9M0 22h9M35 22h9" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

export function HoverTooltip() {
  const hovered = useNav((s) => s.hovered);
  const pos = useNav((s) => s.hoverPos);
  if (!hovered || !pos) return null;
  return (
    <div className="tooltip" style={{ transform: `translate(${pos.x + 14}px, ${pos.y + 14}px)` }} role="tooltip">
      <strong>{hovered.name}</strong>
      <span>
        {hovered.kind === 'host'
          ? `${hovered.planetCount ?? '?'} planet${hovered.planetCount === 1 ? '' : 's'} · NASA Exoplanet Archive`
          : hovered.description}
      </span>
    </div>
  );
}

/** Grid and target labels, positioned every frame without React re-renders. */
export function SkyLabels() {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const nodes = new Map<string, HTMLSpanElement>();
    let raf = 0;
    const loop = () => {
      raf = requestAnimationFrame(loop);
      const el = root.current;
      if (!el) return;
      const st = useNav.getState();
      const { width: w, height: h } = st.viewport;
      const view = { mode: st.mode, center: st.center, fov: st.fov, distance: st.distance };
      const basis = cameraBasis(view);
      const aspect = w / Math.max(1, h);
      const used = new Set<string>();
      const place = (key: string, text: string, vec: ReturnType<typeof radecToVec>, cls: string, dx = 0, dy = 0) => {
        const p = projectWithBasis(view, basis, aspect, vec);
        if (!p || Math.abs(p.x) > 0.97 || Math.abs(p.y) > 0.95) return;
        let node = nodes.get(key);
        if (!node) {
          node = document.createElement('span');
          el.appendChild(node);
          nodes.set(key, node);
        }
        if (node.textContent !== text) node.textContent = text;
        if (node.className !== cls) node.className = cls;
        node.style.transform = `translate(${((p.x + 1) / 2) * w + dx}px, ${((1 - p.y) / 2) * h + dy}px)`;
        node.style.display = '';
        used.add(key);
      };
      if (st.showGrid && (st.mode === 'globe' || st.fov > 4)) {
        for (let hr = 0; hr < 24; hr++) place(`ra${hr}`, `${hr}h`, radecToVec(hr * 15, 0), 'label grid');
        const ra = vecToRadec(st.center).ra;
        for (let dec = -80; dec <= 80; dec += 10) {
          if (dec !== 0) place(`dec${dec}`, `${dec > 0 ? '+' : '−'}${Math.abs(dec)}°`, radecToVec(ra, dec), 'label grid');
        }
      }
      if (st.showTargets) {
        for (const t of st.targets) place(`t-${t.id}`, t.name, t.vec, 'label target', 0, 16);
      }
      for (const [key, node] of nodes) if (!used.has(key)) node.style.display = 'none';
    };
    loop();
    return () => cancelAnimationFrame(raf);
  }, []);
  return <div ref={root} className="labels" aria-hidden="true" />;
}

/** Loading and error state for the NASA data connections. */
export function StatusLine() {
  const allsky = useNav((s) => s.allskyStatus);
  const data = useNav((s) => s.dataStatus);
  const [tiles, setTiles] = useState({ pending: 0, failed: 0, loaded: 0 });
  useEffect(() => {
    const t = setInterval(() => setTiles(tileStore.stats()), 400);
    return () => clearInterval(t);
  }, []);
  const messages: { text: string; tone: 'info' | 'warn' }[] = [];
  if (allsky === 'loading') messages.push({ text: 'Loading the whole-sky preview from IRSA…', tone: 'info' });
  if (allsky === 'error') messages.push({ text: 'Could not reach NASA/IPAC IRSA. Check the network and reload.', tone: 'warn' });
  if (tiles.pending > 0) messages.push({ text: `Streaming ${tiles.pending} sky tile${tiles.pending === 1 ? '' : 's'} from IRSA…`, tone: 'info' });
  if (tiles.failed > 0) messages.push({ text: `${tiles.failed} tile${tiles.failed === 1 ? '' : 's'} unavailable, showing the coarser layer`, tone: 'warn' });
  if (data === 'error') messages.push({ text: 'Pins unavailable: run "npm run data" to build the NASA data snapshot.', tone: 'warn' });
  if (!messages.length) return null;
  return (
    <div className="status" role="status" aria-live="polite">
      {messages.map((m) => (
        <span key={m.text} className={m.tone}>
          {m.text}
        </span>
      ))}
    </div>
  );
}
