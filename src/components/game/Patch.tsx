/**
 * Figurine faces: one shared "instrument" look (dark disc, thin cyan ring) for every figurine,
 * told apart only by its emoji. Locked: dashed ring, greyed-out emoji and a small lock.
 * Decorative: every figurine sits next to a text label, so the face is aria-hidden.
 */
import type { CSSProperties } from 'react';
import { FIGURINES, type FigurineId } from '@/lib/game/figurines';
import styles from './Patch.module.css';

function faceStyle(size: number): CSSProperties {
  return { width: size, height: size, fontSize: Math.round(size * 0.44) };
}

function LockIcon() {
  return (
    <svg className={styles.lock} viewBox="0 0 16 16" aria-hidden="true" focusable="false">
      <rect x="3.5" y="7.2" width="9" height="6.6" rx="1.6" fill="currentColor" />
      <path d="M5.6 7.2V5.6a2.4 2.4 0 0 1 4.8 0v1.6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function Patch({ id, locked = false, size = 56 }: { id: FigurineId; locked?: boolean; size?: number }) {
  return (
    <span className={`${styles.patch} ${locked ? styles.locked : ''}`} style={faceStyle(size)} aria-hidden="true">
      <span className={styles.glyph}>{FIGURINES[id].emoji}</span>
      {locked && <LockIcon />}
    </span>
  );
}

/**
 * Unlock animation (~700 ms): a cyan scan sweeps once around the ring and the emoji pops in.
 * With reduced motion the stylesheet shows the finished face straight away.
 */
export function PatchReveal({ id, size = 56 }: { id: FigurineId; size?: number }) {
  return (
    <span className={`${styles.patch} ${styles.reveal}`} style={faceStyle(size)} aria-hidden="true">
      <span className={styles.scan} />
      <span className={styles.glyph}>{FIGURINES[id].emoji}</span>
    </span>
  );
}

/** Total length of the PatchReveal animation, for callers that swap it back to <Patch>. */
export const REVEAL_MS = 700;
