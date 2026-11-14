import { afterEach, describe, expect, it, vi } from 'vitest';
import { InventorySession, type InventoryState } from '@/lib/comparison/session';
import type { SearchProgress } from '@/lib/comparison/types';

const job = (patch: Partial<SearchProgress> = {}): SearchProgress => ({ id: 'job1', state: 'running', status: 'partial', total: 1, truncated: false,
  updatedAt: '2026-11-14T12:00:00Z', verifiedAt: '2026-11-14T12:00:00Z', stale: false, version: 'v1', queueMs: 0, collections: [], ...patch });
const product = (id: string) => ({ id, mission: 'spherex', collection: 'spherex_dr1', title: id, band: null,
  wavelengthMin: null, wavelengthMax: null, observedStart: null, observedEnd: null, kind: 'individual', coverage: 'intersects', footprint: null,
  sourceUrl: 'https://irsa.ipac.caltech.edu/SIA', accessUrl: `https://irsa.ipac.caltech.edu/${id}.fits` });
const page = (version = 'v1', ids = ['first'], nextCursor: string | null = null) => ({ version, products: ids.map(product), total: nextCursor ? 101 : ids.length, nextCursor, status: 'complete', truncated: false, warnings: [], retrievedAt: '2026-11-14T12:00:00Z' });
class Visibility extends EventTarget { hidden = false; }
const visibility = () => new Visibility() as unknown as Pick<Document, 'hidden' | 'addEventListener' | 'removeEventListener' | 'dispatchEvent'>;
const flush = async () => { for (let i = 0; i < 20; i++) await Promise.resolve(); };
let active: InventorySession | undefined;
afterEach(() => { active?.dispose(); vi.useRealTimers(); });

describe('progressive inventory browser session', () => {
  it('publishes early products, polls every two seconds and suspends when hidden', async () => {
    vi.useFakeTimers();
    const view = visibility();
    const fetcher = vi.fn().mockResolvedValueOnce(Response.json(job())).mockResolvedValueOnce(Response.json(page()))
      .mockResolvedValueOnce(Response.json(job({ state: 'finished', status: 'complete', version: 'v2' }))).mockResolvedValueOnce(Response.json(page('v2', ['second'])));
    active = new InventorySession({ ra: 0, dec: 0, size: 10 }, () => {}, fetcher, view);
    await active.start();
    expect(active.state.page?.products[0].id).toBe('first');
    expect(active.state.loading).toBe(true);
    Object.assign(view, { hidden: true });
    view.dispatchEvent(new Event('visibilitychange'));
    await vi.advanceTimersByTimeAsync(10000);
    expect(fetcher).toHaveBeenCalledTimes(2);
    Object.assign(view, { hidden: false });
    view.dispatchEvent(new Event('visibilitychange'));
    await flush();
    expect(active.state.page?.products[0].id).toBe('first');
    expect(active.state.pendingVersion).toBe('v2');
    await active.showUpdated();
    expect(active.state.page?.products[0].id).toBe('second');
    expect(active.state.loading).toBe(false);
    await vi.advanceTimersByTimeAsync(10000);
    expect(fetcher).toHaveBeenCalledTimes(4);
  });

  it('retains products on refresh failure and ignores late superseded responses', async () => {
    vi.useFakeTimers();
    let resolveLate!: (response: Response) => void;
    const fetcher = vi.fn().mockResolvedValueOnce(Response.json(job())).mockResolvedValueOnce(Response.json(page()))
      .mockImplementationOnce(() => new Promise<Response>((resolve) => { resolveLate = resolve; }))
      .mockResolvedValueOnce(Response.json({ detail: 'Service offline' }, { status: 503 }));
    const changes: InventoryState[] = [];
    active = new InventorySession({ ra: 0 }, (s) => changes.push(s), fetcher, visibility());
    await active.start();
    const oldRefresh = active.start(true);
    await flush();
    await active.start(true);
    await vi.advanceTimersByTimeAsync(5000);
    expect(active.state.error).toBe('Service offline');
    expect(fetcher).toHaveBeenCalledTimes(4);
    expect(active.state.page?.products[0].id).toBe('first');
    resolveLate(Response.json(job({ id: 'old', version: 'old' })));
    await oldRefresh;
    expect(active.state.progress?.id).toBe('job1');
    const count = changes.length;
    active.dispose();
    await flush();
    expect(changes).toHaveLength(count);
  });

  it('pins loaded pages, keeps the original search id on refresh, and offers explicit updates', async () => {
    const fetcher = vi.fn().mockResolvedValueOnce(Response.json(job())).mockResolvedValueOnce(Response.json(page('v1', ['first'], '100')))
      .mockResolvedValueOnce(Response.json(page('v1', ['second'])))
      .mockResolvedValueOnce(Response.json(job({ id: 'job2', state: 'finished', version: 'v2' })))
      .mockResolvedValueOnce(Response.json(page('v2', ['updated'])));
    active = new InventorySession({ ra: 0 }, () => {}, fetcher, visibility());
    await active.start();
    await active.nextPage();
    await active.start(true);
    expect(active.state.page?.products.map((p) => p.id)).toEqual(['first', 'second']);
    expect(active.state.pendingVersion).toBe('v2');
    expect(fetcher.mock.calls[2][0]).toContain('/job1/results?version=v1&cursor=100');
    await active.showUpdated();
    expect(active.state.page?.products.map((p) => p.id)).toEqual(['updated']);
    expect(active.state.pendingVersion).toBeNull();
  });

  it('never publishes responses from an abandoned filter session', async () => {
    let resolve!: (response: Response) => void;
    const change = vi.fn();
    const fetcher = vi.fn(() => new Promise<Response>((r) => { resolve = r; }));
    active = new InventorySession({ band: 'old' }, change, fetcher, visibility());
    const start = active.start();
    active.dispose();
    const count = change.mock.calls.length;
    resolve(Response.json(job()));
    await start;
    expect(change).toHaveBeenCalledTimes(count);
    expect(fetcher).toHaveBeenCalledTimes(1);
  });
});
