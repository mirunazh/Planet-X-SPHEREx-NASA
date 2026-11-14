import { isInventoryPage, isSearchProgress, type InventoryPage, type SearchProgress } from './types';

export interface InventoryState {
  progress: SearchProgress | null;
  page: (InventoryPage & { version: string; searchId: string }) | null;
  error: string | null;
  loading: boolean;
  loadingPage: boolean;
  pendingVersion: string | null;
}

/** Owns a filter generation. Aborting a session invalidates even non-cooperative fetches. */
export class InventorySession {
  state: InventoryState = { progress: null, page: null, error: null, loading: true, loadingPage: false, pendingVersion: null };
  private generation = 0;
  private controllers = new Set<AbortController>();
  private timer: ReturnType<typeof setTimeout> | undefined;
  private pinned = false;
  private pageRequest = 0;
  private disposed = false;
  private tracking = false;

  constructor(private filters: Record<string, string | number | boolean>, private change: (state: InventoryState) => void,
    private fetcher: typeof fetch = (...args) => fetch(...args), private visibility: Pick<Document, 'hidden' | 'addEventListener' | 'removeEventListener'> = document) {
    visibility.addEventListener('visibilitychange', this.onVisibility);
  }

  private update(patch: Partial<InventoryState>) {
    this.state = { ...this.state, ...patch };
    this.change(this.state);
  }

  private onVisibility = () => {
    clearTimeout(this.timer);
    if (this.tracking && !this.visibility.hidden && this.state.progress) void this.poll(this.generation);
  };

  private async request(path: string, generation: number, body?: object): Promise<unknown> {
    const controller = new AbortController();
    this.controllers.add(controller);
    try {
      const response = await this.fetcher(`/api/comparison/searches${path}`, {
        signal: controller.signal, cache: 'no-store', ...(body ? { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) } : {}),
      });
      const data: unknown = await response.json();
      if (generation !== this.generation || this.disposed || controller.signal.aborted) throw new DOMException('Superseded', 'AbortError');
      if (!response.ok) throw new Error(data && typeof data === 'object' && 'detail' in data && typeof data.detail === 'string' ? data.detail : 'The search could not be completed. Check the filters and retry.');
      return data;
    } finally { this.controllers.delete(controller); }
  }

  private cancelRequests() {
    clearTimeout(this.timer);
    for (const controller of this.controllers) controller.abort();
    this.controllers.clear();
    this.generation++;
    this.pageRequest++;
  }

  async start(refresh = false) {
    this.cancelRequests();
    this.tracking = false;
    const generation = this.generation;
    this.update({ loading: true, loadingPage: false, error: null });
    try {
      const value = await this.request('', generation, { ...this.filters, refresh });
      this.tracking = isSearchProgress(value);
      await this.accept(value, generation);
    } catch (error) { this.failure(error, generation); }
    this.schedule(generation);
  }

  private failure(error: unknown, generation: number) {
    if (generation !== this.generation || this.disposed || error instanceof Error && error.name === 'AbortError') return;
    this.update({ loading: false, loadingPage: false, error: error instanceof Error ? error.message : 'Inventory request failed. Retry.' });
  }

  private async accept(value: unknown, generation: number) {
    if (!isSearchProgress(value)) throw new Error('Invalid inventory progress. Retry.');
    if (this.state.progress?.id === value.id && this.state.progress.updatedAt > value.updatedAt) return;
    this.update({ progress: value, loading: ['queued', 'running'].includes(value.state), error: null });
    if (value.version && value.version !== this.state.page?.version) {
      if (this.pinned || this.state.page?.products.length) this.update({ pendingVersion: value.version });
      else await this.page(value.id, value.version, '', generation);
    }
  }

  private schedule(generation: number) {
    clearTimeout(this.timer);
    if (this.tracking && !this.disposed && generation === this.generation && !this.visibility.hidden && this.state.progress
      && (['queued', 'running'].includes(this.state.progress.state) || this.state.error)) {
      this.timer = setTimeout(() => void this.poll(generation), 2000);
    }
  }

  private async poll(generation: number) {
    if (this.disposed || this.visibility.hidden || generation !== this.generation || !this.state.progress) return;
    try { await this.accept(await this.request(`/${this.state.progress.id}`, generation), generation); }
    catch (error) { this.failure(error, generation); }
    this.schedule(generation);
  }

  private async page(id: string, version: string, cursor: string, generation: number) {
    const serial = ++this.pageRequest;
    const data = await this.request(`/${id}/results?${new URLSearchParams({ version, cursor })}`, generation);
    if (serial !== this.pageRequest) return;
    if (!isInventoryPage(data) || !('version' in data) || data.version !== version) throw new Error('Invalid inventory page. Retry.');
    const products = cursor ? [...(this.state.page?.products ?? []), ...data.products] : data.products;
    this.update({ page: { ...data, version, searchId: id, products: [...new Map(products.map((p) => [p.id, p])).values()] }, loadingPage: false, pendingVersion: this.state.pendingVersion === version ? null : this.state.pendingVersion });
  }

  async nextPage() {
    const { page, progress } = this.state;
    if (!page?.nextCursor || !progress || this.state.loadingPage) return;
    this.pinned = true;
    this.update({ loadingPage: true, error: null });
    const generation = this.generation;
    try { await this.page(page.searchId, page.version, page.nextCursor, generation); }
    catch (error) { this.failure(error, generation); }
  }

  async showUpdated() {
    const { pendingVersion, progress } = this.state;
    if (!pendingVersion || !progress) return;
    this.pinned = false;
    const generation = this.generation;
    try { await this.page(progress.id, pendingVersion, '', generation); }
    catch (error) { this.failure(error, generation); }
  }

  dispose() {
    this.disposed = true;
    this.cancelRequests();
    this.visibility.removeEventListener('visibilitychange', this.onVisibility);
  }
}
