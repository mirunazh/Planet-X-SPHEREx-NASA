import { type Pin, useNav } from './store';
import { searchPins } from './pins';
import { parseCoordinates } from './sky/parse';
import { radecToVec } from './sky/coords';

export function searchIntent(query: string, targets: Pin[], hosts: Pin[], active = 0) {
  const text = query.trim();
  const coords = parseCoordinates(text);
  if (coords) return { kind: 'coordinates' as const, coords };
  const matches = searchPins(text, targets, hosts);
  if (matches.length) return { kind: 'pin' as const, pin: matches[Math.max(0, Math.min(active, matches.length - 1))] };
  if (text.length < 2) return { kind: 'error' as const, message: 'Enter at least two characters or a pair of coordinates.' };
  if (/^[+\-\d]/.test(text) && /^[\d\s.,:+\-hmsd°'′″"−–]+$/i.test(text)) {
    return { kind: 'error' as const, message: 'Check the coordinates: RA 0–360°, Dec −90° to +90°. For example: 10.68, +41.27.' };
  }
  return { kind: 'name' as const, text };
}

type LookupResult = { kind: 'found'; pin: Pin } | { kind: 'error'; message: string } | { kind: 'cancelled' };

/** Ignore late responses even when a fetch implementation does not honor abort. */
export class NameLookup {
  private revision = 0;
  private controller: AbortController | null = null;

  cancel(): void { this.revision++; this.controller?.abort(); this.controller = null; }

  /** Choosing a different destination or moving the sky supersedes a lookup. */
  watchNavigation(onCancel: () => void): () => void {
    return useNav.subscribe((state, previous) => {
      if (this.controller && (state.center !== previous.center || state.fov !== previous.fov ||
        state.navigationRevision !== previous.navigationRevision || state.busy !== previous.busy ||
        state.selected !== previous.selected || state.locked !== previous.locked)) {
        this.cancel();
        onCancel();
      }
    });
  }

  async resolve(name: string): Promise<LookupResult> {
    this.cancel();
    const revision = this.revision;
    const controller = new AbortController();
    this.controller = controller;
    const current = () => this.revision === revision && !controller.signal.aborted;
    try {
      const res = await fetch(`/api/resolve?name=${encodeURIComponent(name)}`, { signal: controller.signal });
      const json = await res.json() as { ok: boolean; name?: string; ra?: number; dec?: number; message?: string };
      if (!current()) return { kind: 'cancelled' };
      if (!res.ok || json.ok !== true) return { kind: 'error', message: typeof json.message === 'string' && json.message.trim() ? json.message : 'No result in NED. Try a featured place or coordinates.' };
      if (typeof json.ra !== 'number' || typeof json.dec !== 'number' || !Number.isFinite(json.ra) || !Number.isFinite(json.dec) ||
        json.ra < 0 || json.ra >= 360 || Math.abs(json.dec) > 90) {
        return { kind: 'error', message: 'The lookup returned an invalid position. Try coordinates or a featured place.' };
      }
      return { kind: 'found', pin: {
        id: `ned-${name}`, kind: 'target', targetKind: 'resolved object', name: typeof json.name === 'string' && json.name.trim() ? json.name.trim() : name,
        ra: json.ra, dec: json.dec, vec: radecToVec(json.ra, json.dec), fov: 0.5,
        source: { service: 'NED (NASA/IPAC Extragalactic Database)', url: `https://ned.ipac.caltech.edu/srs/ObjectLookup?name=${encodeURIComponent(name)}` },
      } };
    } catch {
      return current() ? { kind: 'error', message: 'Name lookup failed. Check your connection and retry, or choose a featured place.' } : { kind: 'cancelled' };
    } finally {
      if (this.revision === revision) this.controller = null;
    }
  }
}
