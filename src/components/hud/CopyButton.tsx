'use client';

import { useEffect, useRef, useState } from 'react';

/** Clipboard denial leaves a selectable value instead of silent failure. */
export function CopyButton({ label, text }: { label: string; text: () => string }) {
  const [state, setState] = useState<'idle' | 'copied' | 'manual'>('idle');
  const [value, setValue] = useState('');
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const mounted = useRef(true);
  const revision = useRef(0);
  useEffect(() => {
    mounted.current = true;
    return () => { mounted.current = false; revision.current++; clearTimeout(timer.current); };
  }, []);
  return (
    <div className="copy-control">
      <button className="btn ghost" onClick={async () => {
        clearTimeout(timer.current);
        const request = ++revision.current;
        const copy = text();
        setValue(copy);
        try {
          await navigator.clipboard.writeText(copy);
          if (!mounted.current || request !== revision.current) return;
          setState('copied');
          timer.current = setTimeout(() => setState('idle'), 1800);
        } catch { if (mounted.current && request === revision.current) setState('manual'); }
      }}>
        {state === 'copied' ? 'Copied' : label}
      </button>
      <span className="sr-only" role="status">{state === 'copied' ? `${label}: copied to clipboard.` : ''}</span>
      {state === 'manual' && (
        <div className="copy-fallback panel">
          <label>
            Copy this text
            <textarea aria-label={`${label}: select and copy`} readOnly value={value} onFocus={(e) => e.currentTarget.select()} />
          </label>
          <p className="small muted" role="status">Clipboard access is unavailable. Select the text and copy it.</p>
          <button className="btn ghost" onClick={() => setState('idle')}>Close</button>
        </div>
      )}
    </div>
  );
}
