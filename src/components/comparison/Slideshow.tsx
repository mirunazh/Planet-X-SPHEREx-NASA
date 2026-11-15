'use client';

import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { PreviewLoader, type LoadedPreview } from '@/lib/comparison/previews';
import type { ImageProduct, InventoryPage, PreviewProgress } from '@/lib/comparison/types';

type Page = InventoryPage & { version: string; searchId: string };
interface Props {
  page: Page | null;
  prepared?: Record<string, string>;
  searching: boolean;
  status: string;
  activeId: string | null;
  onSelect: (id: string) => void;
  onLoadMore: () => Promise<void>;
  loadingMore: boolean;
  onRetrySearch: () => void;
  emptyTitle?: string;
  emptyActions?: ReactNode;
  /** data-tour ids for the guided tour: the photo and its Previous / Play / Next buttons. */
  tour?: { viewer: string; controls: string };
}

function observation(product: ImageProduct) {
  const date = product.observedStart ?? product.observedEnd;
  return date ? new Date(date).toLocaleString(undefined, { timeZone: 'UTC', dateStyle: 'medium', timeStyle: 'medium' }) + ' UTC' : 'Observation time unknown';
}

export function Slideshow({ page, prepared, searching, status, activeId, onSelect, onLoadMore, loadingMore, onRetrySearch, emptyTitle, emptyActions, tour }: Props) {
  const products = useMemo(() => [...(page?.products ?? [])].sort((a, b) =>
    (a.observedStart ?? a.observedEnd ?? '9999').localeCompare(b.observedStart ?? b.observedEnd ?? '9999') || a.id.localeCompare(b.id)), [page?.products]);
  const index = Math.max(0, products.findIndex((p) => p.id === activeId));
  const product = products[index];
  const [playing, setPlaying] = useState(false);
  const [intervalSeconds, setIntervalSeconds] = useState('3');
  const [progress, setProgress] = useState<PreviewProgress | null>(null);
  const [loaded, setLoaded] = useState<(LoadedPreview & { productId: string }) | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [retry, setRetry] = useState(0);
  const [skipped, setSkipped] = useState(0);
  const hasShownImage = useRef(false);
  const loader = useRef<PreviewLoader | null>(null);
  const stage = useRef<HTMLDivElement>(null);
  const pendingAdvance = useRef(false);
  const retryProduct = useRef<string | null>(null);
  const lastScroll = useRef(0);

  useEffect(() => {
    setPlaying(false); setSkipped(0); setError(null); setLoaded(null); setImageLoaded(false);
    hasShownImage.current = false; pendingAdvance.current = false;
    if (!page) return;
    const instance = new PreviewLoader(page.searchId, page.version, undefined, undefined, undefined, prepared);
    loader.current = instance;
    return () => { instance.dispose(); loader.current = null; };
  }, [page?.searchId, page?.version]);

  useEffect(() => {
    if (!product) return;
    if (pendingAdvance.current && index < products.length - 1) {
      pendingAdvance.current = false;
      onSelect(products[index + 1].id);
    } else if (!activeId || !products.some((p) => p.id === activeId)) onSelect(product.id);
  }, [products, product, activeId, index, onSelect]);

  useEffect(() => {
    const current = loader.current;
    if (!product || !current) return;
    const controller = new AbortController();
    setLoaded(null); setImageLoaded(false); setError(null); setProgress(null);
    const shouldRetry = retryProduct.current === product.id;
    retryProduct.current = null;
    void current.load(product.id, controller.signal, (value) => {
      if (!controller.signal.aborted) setProgress(value);
    }, shouldRetry).then((value) => { if (!controller.signal.aborted) setLoaded({ ...value, productId: product.id }); })
      .catch((failure: unknown) => {
        if (controller.signal.aborted) return;
        setError(failure instanceof Error ? failure.message : 'Image unavailable. Retry.'); setPlaying(false);
      });
    return () => controller.abort();
  }, [product?.id, page?.searchId, page?.version, retry]);

  const tryingNext = !!error && !hasShownImage.current && skipped < 4 && index < products.length - 1;
  useEffect(() => {
    if (!tryingNext) return;
    const timer = setTimeout(() => { setSkipped((value) => value + 1); onSelect(products[index + 1].id); }, 1500);
    return () => clearTimeout(timer);
  }, [tryingNext, product?.id, products, index, onSelect]);

  // Fetch just one successor after the displayed image has actually decoded.
  useEffect(() => {
    const next = products[index + 1];
    const current = loader.current;
    if (!imageLoaded || !next || !current || loaded?.productId !== product?.id) return;
    const controller = new AbortController();
    void current.load(next.id, controller.signal).catch(() => {});
    return () => controller.abort();
  }, [imageLoaded, loaded, product?.id, products, index, page?.searchId, page?.version]);

  const next = useCallback(() => {
    if (index < products.length - 1) onSelect(products[index + 1].id);
    else if (page?.nextCursor && !loadingMore) { pendingAdvance.current = true; void onLoadMore(); }
    else if (!page?.nextCursor) setPlaying(false);
  }, [index, products, page?.nextCursor, loadingMore, onLoadMore, onSelect]);
  const previous = useCallback(() => { if (index > 0) onSelect(products[index - 1].id); }, [index, products, onSelect]);

  useEffect(() => {
    if (!playing || !imageLoaded || error || loadingMore || document.hidden) return;
    const timer = setTimeout(next, Number(intervalSeconds) * 1000);
    const hide = () => { if (document.hidden) { clearTimeout(timer); setPlaying(false); } };
    document.addEventListener('visibilitychange', hide);
    return () => { clearTimeout(timer); document.removeEventListener('visibilitychange', hide); };
  }, [playing, imageLoaded, error, loadingMore, intervalSeconds, next]);

  useEffect(() => {
    const node = stage.current;
    if (!node || !product) return;
    const scroll = (event: WheelEvent) => {
      if (event.ctrlKey || Math.abs(event.deltaY) < 15) return;
      const canMove = event.deltaY > 0 ? index < products.length - 1 || !!page?.nextCursor : index > 0;
      if (!canMove) return;
      event.preventDefault();
      if (Date.now() - lastScroll.current < 600) return;
      lastScroll.current = Date.now(); setPlaying(false);
      if (event.deltaY > 0) next(); else previous();
    };
    node.addEventListener('wheel', scroll, { passive: false });
    return () => node.removeEventListener('wheel', scroll);
  }, [product, index, products.length, page?.nextCursor, next, previous]);

  const loadingLabel = prepared ? 'Loading the cached sky image…' : progress?.state === 'rendering' ? 'Preparing the sky image…' : progress?.state === 'queued' ? 'Waiting to load this exposure…' : 'Loading this exposure from IRSA…';
  const canNext = !!product && (index < products.length - 1 || !!page?.nextCursor);

  return <section className="slideshow" aria-label="SPHEREx image slideshow">
    <div className="slideshow-heading"><h2>SPHEREx slideshow</h2><span className="small muted">{product ? `Photo ${index + 1} of ${products.length}${page?.nextCursor ? ` loaded · ${page.total} found` : ''}` : 'DR1 + QR3 exposures'}</span></div>
    <div ref={stage} className="slideshow-stage" role="group" aria-label="Image viewer. Use left and right arrow keys or scroll to change images." tabIndex={0} data-tour={tour?.viewer}
      onKeyDown={(event) => {
        if (event.key === 'ArrowRight') { event.preventDefault(); setPlaying(false); next(); }
        if (event.key === 'ArrowLeft') { event.preventDefault(); setPlaying(false); previous(); }
      }}>
      {loaded && loaded.productId === product?.id && <img className="slideshow-image" src={loaded.url} alt={`SPHEREx exposure of the selected sky region, ${product ? observation(product) : ''}`}
        onLoad={() => { hasShownImage.current = true; setImageLoaded(true); }} onError={() => { setError('The browser could not display this image. Retry.'); setPlaying(false); }} />}
      {(!loaded || loaded.productId !== product?.id || !imageLoaded || error) && <div className="slideshow-placeholder" role="status">
        <p>{error ? 'This exposure could not be displayed' : product ? loadingLabel : searching ? 'Searching the SPHEREx archive…' : emptyTitle ?? 'No exposures available yet'}</p>
        <p className={`small ${error ? 'comparison-error' : 'muted'}`}>{error ?? (product ? 'You can move to another image while this one loads.' : status)}</p>
        {tryingNext && <p className="small muted">Trying the next available exposure…</p>}
        {error && <button className="btn" onClick={() => { retryProduct.current = product?.id ?? null; setRetry((value) => value + 1); }}>Retry image</button>}
        {!product && !searching && <button className="btn" onClick={onRetrySearch}>Retry search</button>}
        {!product && !searching && emptyActions}
      </div>}
    </div>
    <div className="slideshow-controls" aria-label="Slideshow controls">
      <div className="slideshow-navigation" data-tour={tour?.controls}><button className="btn" disabled={!product || index === 0} onClick={() => { setPlaying(false); previous(); }}>Previous</button>
        <button className="btn primary" disabled={!product || !canNext || !!error} aria-pressed={playing} onClick={() => setPlaying((value) => !value)}>{playing ? 'Pause' : 'Play'}</button>
        <button className="btn" disabled={!canNext || loadingMore} onClick={() => { setPlaying(false); next(); }}>{loadingMore ? 'Loading more…' : 'Next'}</button></div>
      <label className="slideshow-speed small">Time per photo <select value={intervalSeconds} onChange={(event) => setIntervalSeconds(event.target.value)}><option value="1">1 second</option><option value="3">3 seconds</option><option value="5">5 seconds</option><option value="10">10 seconds</option></select></label>
    </div>
    {product && <div className="slideshow-caption" aria-live="polite"><p><strong>{observation(product)}</strong></p><p className="small muted">{product.collection} · {product.band ?? 'Detector unknown'}{product.wavelengthMin !== null && product.wavelengthMax !== null ? ` · ${product.wavelengthMin.toPrecision(3)}–${product.wavelengthMax.toPrecision(3)} µm detector range` : ''}</p><p className="small muted product-title">{product.title}</p>{loaded && loaded.progress.coverageFraction !== undefined && loaded.progress.coverageFraction < .98 && <p className="small comparison-warning">This exposure covers part of the crop.</p>}</div>}
    {skipped > 0 && <p className="small muted">{skipped} unavailable exposure{skipped === 1 ? ' was' : 's were'} skipped at the start.</p>}
    <p className="small muted slideshow-hint">Scroll over the image or use the arrow keys to browse. North is up; east is left. Contrast is adjusted per image; brightness and wavelength differences are not evidence of a change over time.</p>
  </section>;
}
