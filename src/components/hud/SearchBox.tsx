'use client';

import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { type Pin, useNav } from '@/lib/store';
import { cancelAnimations, flyTo, visitPin } from '@/lib/navigation';
import { searchPins } from '@/lib/pins';
import { NameLookup, searchIntent } from '@/lib/search';
import { parseCoordinates } from '@/lib/sky/parse';
import { radecToVec } from '@/lib/sky/coords';
import { formatDec, formatRA } from '@/lib/sky/format';

const EXPERT_HINT = 'Name or ICRS RA, Dec in degrees. Other galaxy names use NED.';

/** `hint` lets the simple layout speak plainly; the expert layout keeps the precise wording. */
export function SearchBox({ onNavigate, hint = EXPERT_HINT }: { onNavigate?: () => void; hint?: string }) {
  const listId = useId();
  const lookup = useRef(new NameLookup());
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [status, setStatus] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const targets = useNav((s) => s.targets);
  const hosts = useNav((s) => s.hosts);
  const suggestions = useMemo(() => (parseCoordinates(query) ? [] : searchPins(query, targets, hosts)), [query, targets, hosts]);
  const activeIndex = Math.min(active, Math.max(0, suggestions.length - 1));
  useEffect(() => {
    const request = lookup.current;
    const stopWatching = request.watchNavigation(() => { setBusy(false); setStatus(null); });
    return () => { stopWatching(); request.cancel(); };
  }, []);

  const goToPin = (pin: Pin) => {
    lookup.current.cancel();
    setBusy(false);
    visitPin(pin);
    onNavigate?.();
    setQuery(pin.name);
    setStatus(`${pin.name}. Position: ${pin.source?.service ?? 'featured target snapshot'}.`);
    setOpen(false);
  };

  async function submit(choice?: Pin) {
    if (choice) return goToPin(choice);
    lookup.current.cancel();
    setBusy(false);
    const intent = searchIntent(query, targets, hosts, activeIndex);
    if (intent.kind === 'pin') return goToPin(intent.pin);
    if (intent.kind === 'error') { setStatus(intent.message); return; }
    if (intent.kind === 'coordinates') {
      flyTo(radecToVec(intent.coords.ra, intent.coords.dec), 0.5, 'search');
      useNav.setState({ selected: null });
      setStatus(`Flying to ${formatRA(intent.coords.ra, 1)} ${formatDec(intent.coords.dec, 1)}.`);
      setOpen(false);
      return;
    }
    cancelAnimations();
    setBusy(true);
    setOpen(false);
    setStatus('Checking NASA’s galaxy database (NED)… Press Esc to cancel.');
    const result = await lookup.current.resolve(intent.text);
    if (result.kind === 'cancelled') return;
    setBusy(false);
    if (result.kind === 'found') goToPin(result.pin);
    else setStatus(result.message);
  }

  const showList = open && suggestions.length > 0;
  return (
    <form className="search" role="search" onSubmit={(e) => { e.preventDefault(); void submit(); }} onBlur={(e) => {
      if (!e.currentTarget.contains(e.relatedTarget)) setOpen(false);
    }}>
      <label htmlFor={`${listId}-input`}>Find a place or coordinates</label>
      <div className="search-entry">
        <input
          id={`${listId}-input`}
          type="search"
          role="combobox"
          aria-expanded={showList}
          aria-controls={showList ? listId : undefined}
          aria-autocomplete="list"
          aria-activedescendant={showList ? `${listId}-${activeIndex}` : undefined}
          aria-describedby={`${listId}-hint`}
          autoComplete="off"
          spellCheck={false}
          maxLength={64}
          placeholder="M31 or 10.68, +41.27"
          value={query}
          onChange={(e) => {
            lookup.current.cancel(); setBusy(false);
            setQuery(e.target.value); setOpen(true); setActive(0); setStatus(null);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={(e) => {
            if (e.key === 'ArrowDown') {
              e.preventDefault(); setActive((a) => Math.min(a + 1, Math.max(0, suggestions.length - 1)));
            } else if (e.key === 'ArrowUp') {
              e.preventDefault(); setActive((a) => Math.max(a - 1, 0));
            } else if (e.key === 'Escape') {
              lookup.current.cancel(); setBusy(false); setStatus(null); setOpen(false);
            }
          }}
        />
        <button type="submit" className="btn" disabled={busy}>{busy ? 'Finding…' : 'Go'}</button>
      </div>
      <p className="search-hint" id={`${listId}-hint`}>{hint}</p>
      {showList && (
        <ul id={listId} role="listbox" aria-label="Matching sky objects" className="search-list">
          {suggestions.map((pin, i) => (
            <li key={pin.id} id={`${listId}-${i}`} role="option" aria-selected={i === activeIndex}
              className={i === activeIndex ? 'active' : ''}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => void submit(pin)}
              onMouseEnter={() => setActive(i)}>
              <span className={`dot ${pin.kind}`} aria-hidden="true" />
              <span className="name">{pin.name}</span>
              <span className="kind">{pin.kind === 'host' ? 'host star' : pin.targetKind?.replaceAll('-', ' ')}</span>
            </li>
          ))}
        </ul>
      )}
      {status && <p className="search-status" role="status" aria-live="polite">{status}</p>}
    </form>
  );
}
