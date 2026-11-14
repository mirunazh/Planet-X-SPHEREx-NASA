import { isPreviewProgress, type PreviewProgress } from './types';

export interface LoadedPreview { progress: PreviewProgress; url: string }

function wait(signal: AbortSignal) {
  return new Promise<void>((resolve, reject) => {
    const abort = () => { clearTimeout(timer); reject(new DOMException('Cancelled', 'AbortError')); };
    const timer = setTimeout(() => { signal.removeEventListener('abort', abort); resolve(); }, 1000);
    if (signal.aborted) abort();
    else signal.addEventListener('abort', abort, { once: true });
  });
}

/** Six decoded responses at most; only the current image and one successor are requested. */
export class PreviewLoader {
  private cache = new Map<string, LoadedPreview>();
  constructor(private searchId: string, private version: string,
    private fetcher: typeof fetch = (...args) => fetch(...args),
    private createUrl = (blob: Blob) => URL.createObjectURL(blob), private revokeUrl = (url: string) => URL.revokeObjectURL(url)) {}

  private async json(path: string, signal: AbortSignal, body?: object): Promise<PreviewProgress> {
    const response = await this.fetcher(`/api/comparison/${path}`, {
      signal, cache: 'no-store', ...(body ? { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) } : {}),
    });
    const data: unknown = await response.json();
    signal.throwIfAborted();
    if (!response.ok) throw new Error(data && typeof data === 'object' && 'detail' in data && typeof data.detail === 'string' ? data.detail : 'Image service unavailable. Retry the image.');
    if (!isPreviewProgress(data)) throw new Error('Invalid image response. Retry the image.');
    return data;
  }

  async load(productId: string, signal: AbortSignal, onProgress: (value: PreviewProgress) => void = () => {}, retry = false): Promise<LoadedPreview> {
    signal.throwIfAborted();
    const cached = this.cache.get(productId);
    if (cached && !retry) {
      this.cache.delete(productId); this.cache.set(productId, cached);
      return cached;
    }
    let progress = await this.json(`searches/${this.searchId}/previews`, signal, { version: this.version, productId, retry });
    onProgress(progress);
    while (progress.state !== 'ready' && progress.state !== 'error') {
      await wait(signal);
      progress = await this.json(`previews/${progress.id}`, signal);
      onProgress(progress);
    }
    if (progress.state === 'error') throw new Error(progress.error ?? 'The exposure could not be loaded. Retry or choose another image.');
    const response = await this.fetcher(`/api/comparison/previews/${progress.id}/image`, { signal });
    if (!response.ok || !response.headers.get('content-type')?.includes('image/png')) throw new Error('The rendered image is unavailable. Retry the image.');
    const blob = await response.blob();
    signal.throwIfAborted();
    const loaded = { progress, url: this.createUrl(blob) };
    const previous = this.cache.get(productId);
    if (previous) this.revokeUrl(previous.url);
    this.cache.delete(productId);
    this.cache.set(productId, loaded);
    while (this.cache.size > 6) {
      const key = this.cache.keys().next().value!;
      this.revokeUrl(this.cache.get(key)!.url); this.cache.delete(key);
    }
    return loaded;
  }

  dispose() {
    for (const value of this.cache.values()) this.revokeUrl(value.url);
    this.cache.clear();
  }
}
