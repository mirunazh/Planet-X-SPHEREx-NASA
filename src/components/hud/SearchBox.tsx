'use client';

/**
 * The escape hatch next to visual navigation: typed coordinates, local NASA
 * pins (featured targets, exoplanet hosts) and NED for galaxy names.
 */
import { useId, useMemo, useState } from 'react';
import { type Pin, useNav } from '@/lib/store';
import { flyTo } from '@/lib/navigation';
import { searchPins } from '@/lib/pins';
import { parseCoordinates } from '@/lib/sky/parse';
import { radecToVec } from '@/lib/sky/coords';
import { formatDec, formatRA } from '@/lib/sky/format';

interface ResolveResponse {
  ok: boolean;
  name?: string;
  ra?: number;
  dec?: number;
  message?: string;
}

export function SearchBox() {
  const listId = useId();
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [status, setStatus] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const targets = useNav((s) => s.targets);
  const hosts = useNav((s) => s.hosts);
  const suggestions = useMemo(() => (parseCoordinates(query) ? [] : searchPins(query, targets, hosts)), [query, targets, hosts]);

  const goToPin = (pin: Pin) => {
    flyTo(pin.vec, pin.fov, 'pin');
    useNav.setState({ selected: pin });
    setStatus(`${pin.name}: position from ${pin.source?.service ?? 'NASA data'}`);
    setOpen(false);
  };

  async function submit(choice?: Pin) {
    if (choice) return goToPin(choice);
    const q = query.trim();
    if (!q) return;
    const coords = parseCoordinates(q);
    if (coords) {
      flyTo(radecToVec(coords.ra, coords.dec), 0.5, 'search');
      setStatus(`Flying to ${formatRA(coords.ra, 1)}  ${formatDec(coords.dec, 1)}`);
      setOpen(false);
      return;
    }
    if (suggestions.length) return goToPin(suggestions[Math.min(active, suggestions.length - 1)]);
    if (q.length < 2) return;
    setBusy(true);
    setStatus('Asking NED (NASA/IPAC Extragalactic Database)…');
    try {
      const res = await fetch(`/api/resolve?name=${encodeURIComponent(q)}`);
      const json = (await res.json()) as ResolveResponse;
      if (!res.ok || !json.ok || json.ra === undefined || json.dec === undefined) {
        setStatus(json.message ?? 'Not found.');
        return;
      }
      flyTo(radecToVec(json.ra, json.dec), 0.5, 'search');
      setStatus(`${json.name}: position from NED`);
      setOpen(false);
    } catch {
      setStatus('NED lookup failed. Check the connection and try again.');
    } finally {
      setBusy(false);
    }
  }

  const showList = open && suggestions.length > 0;

  return (
    <div className="search" role="search">
      <label className="sr-only" htmlFor={`${listId}-input`}>
        Search the sky
      </label>
      <input
        id={`${listId}-input`}
        type="search"
        role="combobox"
        aria-expanded={showList}
        aria-controls={listId}
        aria-autocomplete="list"
        aria-activedescendant={showList ? `${listId}-${active}` : undefined}
        autoComplete="off"
        spellCheck={false}
        maxLength={64}
        placeholder="M31, Teegarden's Star, 10.68 41.27, 00 42 44 +41 16 09"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
          setActive(0);
          setStatus(null);
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        onKeyDown={(e) => {
          if (e.key === 'ArrowDown') {
            e.preventDefault();
            setActive((a) => Math.min(a + 1, suggestions.length - 1));
          } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setActive((a) => Math.max(a - 1, 0));
          } else if (e.key === 'Enter') {
            e.preventDefault();
            void submit();
          } else if (e.key === 'Escape') {
            setOpen(false);
          }
        }}
      />
      {busy && <span className="search-spinner" aria-hidden="true" />}
      {showList && (
        <ul id={listId} role="listbox" className="search-list">
          {suggestions.map((pin, i) => (
            <li
              key={pin.id}
              id={`${listId}-${i}`}
              role="option"
              aria-selected={i === active}
              className={i === active ? 'active' : ''}
              onMouseDown={(e) => {
                e.preventDefault();
                void submit(pin);
              }}
              onMouseEnter={() => setActive(i)}
            >
              <span className={`dot ${pin.kind}`} aria-hidden="true" />
              <span className="name">{pin.name}</span>
              <span className="kind">{pin.kind === 'host' ? `${pin.planetCount ?? '?'} planet${pin.planetCount === 1 ? '' : 's'}` : pin.targetKind}</span>
            </li>
          ))}
        </ul>
      )}
      {status && (
        <p className="search-status" role="status">
          {status}
        </p>
      )}
    </div>
  );
}
