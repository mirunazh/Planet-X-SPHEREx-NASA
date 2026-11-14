/** Bound stalled image transfers, including reading the response body. A timeout
 * belongs to this attempt; it must not invalidate the cache entry's identity.
 */
export const IMAGE_TIMEOUT_MS = 30_000;

export async function downloadImage(url: string, signal: AbortSignal, allowMissing = false): Promise<Blob | null> {
  const controller = new AbortController();
  const abort = () => controller.abort(signal.reason);
  if (signal.aborted) abort();
  else signal.addEventListener('abort', abort, { once: true });
  const timeout = setTimeout(() => controller.abort(new Error('Image download timed out')), IMAGE_TIMEOUT_MS);
  try {
    const response = await fetch(url, { mode: 'cors', signal: controller.signal });
    controller.signal.throwIfAborted();
    if (allowMissing && response.status === 404) return null;
    if (!response.ok) throw new Error(`HTTP ${response.status} loading ${url}`);
    const blob = await response.blob();
    controller.signal.throwIfAborted();
    return blob;
  } finally {
    clearTimeout(timeout);
    signal.removeEventListener('abort', abort);
  }
}
