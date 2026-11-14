import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { searchPins } from '@/lib/pins';
import { NameLookup, searchIntent } from '@/lib/search';
import { type Pin, useNav } from '@/lib/store';
import { resetView, visitPin, zoomAt } from '@/lib/navigation';
import { radecToVec } from '@/lib/sky/coords';
import snapshot from '../public/data/targets.json';

const targets: Pin[] = snapshot.targets.map((pin) => ({ ...pin, kind: 'target', targetKind: pin.kind, vec: radecToVec(pin.ra, pin.dec) }));
const host: Pin = { id: 'host-1', kind: 'host', name: 'TRAPPIST-1', ra: 10, dec: 20, vec: radecToVec(10, 20), fov: 0.25 };
const reply = (name: string, ra = 12, dec = 34) => ({ ok: true, json: async () => ({ ok: true, name, ra, dec }) }) as Response;
function deferred<T>() {
  let resolve!: (value: T) => void;
  let reject!: (error: Error) => void;
  const promise = new Promise<T>((yes, no) => { resolve = yes; reject = no; });
  return { resolve, reject, promise };
}
beforeEach(() => { useNav.setState({ ...useNav.getInitialState(), anim: [] }); });
afterEach(() => { vi.unstubAllGlobals(); });

describe('demonstration search flow', () => {
  it('returns no unrelated featured pins, allowing unknown names to reach NED', () => {
    expect(searchPins('NGC 999999', targets, [host])).toEqual([]);
    expect(searchIntent('NGC 999999', targets, [host])).toEqual({ kind: 'name', text: 'NGC 999999' });
    expect(searchPins('M31', targets, [host])[0].id).toBe('m31');
    expect(searchPins('trappist', targets, [host])[0]).toBe(host);
    expect(searchPins('zxy-not-an-object', targets, [host])).toEqual([]);
  });

  it('uses coordinates and selected local suggestions before a name lookup', () => {
    expect(searchIntent('10.68, +41.27', targets, [])).toEqual({ kind: 'coordinates', coords: { ra: 10.68, dec: 41.27 } });
    expect(searchIntent('00 42 44 +41 16 09', targets, []).kind).toBe('coordinates');
    expect(searchIntent('M31', targets, []).kind).toBe('pin');
    expect(searchIntent('galaxy', targets, [], 100).kind).toBe('pin');
    expect(searchIntent('M31', targets, [], -1).kind).toBe('pin');
  });

  it('reports malformed coordinate input and short queries without a remote request', () => {
    expect(searchIntent('10.68, +100', targets, []).kind).toBe('error');
    expect(searchIntent('400, 10', targets, []).kind).toBe('error');
    expect(searchIntent('', targets, []).kind).toBe('error');
    expect(searchIntent('x', targets, []).kind).toBe('error');
    expect(searchIntent('2MASS J12345', targets, []).kind).toBe('name');
  });

  it('creates a sourced pin from a valid NED response', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => reply('NGC 123')));
    const result = await new NameLookup().resolve('NGC 123');
    expect(result).toMatchObject({ kind: 'found', pin: { name: 'NGC 123', ra: 12, dec: 34, fov: 0.5, source: { service: 'NED (NASA/IPAC Extragalactic Database)' } } });
    expect(vi.mocked(fetch).mock.calls[0][0]).toBe('/api/resolve?name=NGC%20123');
  });

  it.each([{}, [], '', '   '])('keeps malformed response labels out of target rendering (%j)', async (name) => {
    vi.stubGlobal('fetch', vi.fn(async () => Response.json({ ok: true, name, ra: 12, dec: 34 })));
    expect(await new NameLookup().resolve('NGC 123')).toMatchObject({ kind: 'found', pin: { name: 'NGC 123' } });
  });

  it('does not render a malformed remote error message or accept a non-boolean success flag', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => Response.json({ ok: 'false', message: {}, ra: 12, dec: 34 })));
    expect(await new NameLookup().resolve('NGC 123')).toEqual({ kind: 'error', message: 'No result in NED. Try a featured place or coordinates.' });
  });

  it('ignores older successes/errors and keeps a newer request alive even when abort is ignored', async () => {
    const first = deferred<Response>(); const second = deferred<Response>(); const third = deferred<Response>();
    vi.stubGlobal('fetch', vi.fn().mockReturnValueOnce(first.promise).mockReturnValueOnce(second.promise).mockReturnValueOnce(third.promise));
    const lookup = new NameLookup();
    const a = lookup.resolve('first'); const b = lookup.resolve('second');
    first.resolve(reply('obsolete')); expect(await a).toEqual({ kind: 'cancelled' });
    expect(vi.mocked(fetch).mock.calls[0][1]!.signal!.aborted).toBe(true);
    const c = lookup.resolve('third');
    second.reject(new Error('obsolete failure')); expect(await b).toEqual({ kind: 'cancelled' });
    third.resolve(reply('latest')); expect(await c).toMatchObject({ kind: 'found', pin: { name: 'latest' } });
  });

  it('supports explicit cancellation for query edits and unmount', async () => {
    const pending = deferred<Response>();
    vi.stubGlobal('fetch', vi.fn(() => pending.promise));
    const lookup = new NameLookup(); const result = lookup.resolve('pending'); lookup.cancel();
    pending.resolve(reply('late')); expect(await result).toEqual({ kind: 'cancelled' });
  });

  it.each(['place', 'reset', 'zoom limit'] as const)('invalidates a lookup at the actual %s action before an animation frame runs', async (action) => {
    const pending = deferred<Response>();
    vi.stubGlobal('fetch', vi.fn(() => pending.promise));
    const lookup = new NameLookup(); const cancelled = vi.fn();
    const stop = lookup.watchNavigation(cancelled);
    if (action === 'zoom limit') useNav.setState({ fov: 0.05 });
    const result = lookup.resolve('slow remote galaxy');
    const before = useNav.getState().navigationRevision;
    if (action === 'place') visitPin(targets.find((pin) => pin.id === 'm31')!);
    else if (action === 'reset') resetView();
    else zoomAt(0, 0, 0.5);
    expect(cancelled).toHaveBeenCalledOnce();
    expect(useNav.getState().navigationRevision).toBeGreaterThan(before);
    pending.resolve(reply('obsolete galaxy'));
    expect(await result).toEqual({ kind: 'cancelled' });
    stop();
  });

  it('supports failure recovery and refuses invalid positions', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValueOnce(new Error('offline')).mockResolvedValueOnce(reply('bad', NaN)).mockResolvedValueOnce(reply('good')));
    const lookup = new NameLookup();
    expect(await lookup.resolve('retry')).toMatchObject({ kind: 'error', message: expect.stringContaining('connection') });
    expect(await lookup.resolve('retry')).toMatchObject({ kind: 'error', message: expect.stringContaining('invalid position') });
    expect(await lookup.resolve('retry')).toMatchObject({ kind: 'found' });
  });

  it('passes through a useful not-found/rate-limit message', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => ({ ok: false, json: async () => ({ ok: false, message: 'Too many lookups. Please wait a moment.' }) })));
    expect(await new NameLookup().resolve('unknown')).toEqual({ kind: 'error', message: 'Too many lookups. Please wait a moment.' });
  });
});
