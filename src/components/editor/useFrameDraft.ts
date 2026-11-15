'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useNav } from '@/lib/store';
import { nearestUsableFrame } from '@/lib/sky/surveys';

/** Same pause as the expert layer panel: a new SPHEREx frame is requested once the slider rests. */
const SETTLE_MS = 250;

export interface FrameDraft {
  /** Slider position; may sit on a blank channel until it settles. */
  draft: number;
  /** Move the slider; the nearest usable frame is committed after the pause. */
  move: (frame: number) => void;
  /** Commit a frame at once (color stop chips). */
  jump: (frame: number) => void;
}

export function useFrameDraft(): FrameDraft {
  const frame = useNav((s) => s.frame);
  const [draft, setDraft] = useState(frame);
  const [synced, setSynced] = useState(frame);
  const latest = useRef(frame);

  // Follow frame changes made elsewhere (expert panel, shared link, a chip).
  if (synced !== frame) {
    setSynced(frame);
    setDraft(frame);
  }

  useEffect(() => {
    latest.current = draft;
  }, [draft]);

  useEffect(() => {
    if (draft === frame) return;
    const timer = setTimeout(() => {
      const next = nearestUsableFrame(draft);
      useNav.getState().setFrame(next);
      setDraft(next);
    }, SETTLE_MS);
    return () => clearTimeout(timer);
  }, [draft, frame]);

  // Keep a move that is still waiting when the control goes away (sheet closed, survey switched).
  useEffect(
    () => () => {
      const state = useNav.getState();
      if (latest.current !== state.frame) state.setFrame(nearestUsableFrame(latest.current));
    },
    [],
  );

  const move = useCallback((next: number) => setDraft(next), []);
  const jump = useCallback((next: number) => {
    setDraft(next);
    useNav.getState().setFrame(next);
  }, []);

  return { draft, move, jump };
}
