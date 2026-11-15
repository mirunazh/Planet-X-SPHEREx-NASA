'use client';

/* Extension of the navigator: its dark panels, cyan actions, and measurement typography.
   The inventory leads this stage; A/B selections reserve the aligned-image workspace.
   On small screens the filters collapse and each product stays readable as a row. */
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { navigatorUrl, parseRegion } from '@/lib/comparison/region';
import { MISSION_NAMES, type ImageProduct } from '@/lib/comparison/types';
import { InventorySession, type InventoryState } from '@/lib/comparison/session';
import { Slideshow } from './Slideshow';

const initialState: InventoryState = { progress: null, page: null, error: null, loading: true, loadingPage: false, pendingVersion: null };
type Filters = { band: string; wave_min: string; wave_max: string; start: string; end: string; kind: string };
const initialFilters: Filters = { band: '', wave_min: '', wave_max: '', start: '', end: '', kind: 'all' };

function spectralLabel(product: ImageProduct) {
  const range = product.wavelengthMin !== null && product.wavelengthMax !== null
    ? `${product.wavelengthMin.toPrecision(3)}–${product.wavelengthMax.toPrecision(3)} µm` : 'Spectral range unavailable';
  return `${product.band ? `${product.band} · ` : ''}${range}${product.mission === 'spherex' ? ' (detector range)' : ''}`;
}

function dateLabel(product: ImageProduct) {
  if (!product.observedStart && !product.observedEnd) return 'Observation date unknown';
  const start = product.observedStart?.slice(0, 10);
  const end = product.observedEnd?.slice(0, 10);
  return start && end && start !== end ? `${start} → ${end}` : start ?? end;
}

export function ComparisonInventory() {
  const params = useSearchParams();
  const region = parseRegion(new URLSearchParams(params.toString()));
  const regionKey = region ? `${region.ra},${region.dec},${region.size}` : '';
  const [draft, setDraft] = useState<Filters>(initialFilters);
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [state, setState] = useState<InventoryState>(initialState);
  const [selection, setSelection] = useState<{ A: ImageProduct | null; B: ImageProduct | null }>({ A: null, B: null });
  const session = useRef<InventorySession | null>(null);
  const [activeSlide, setActiveSlide] = useState<string | null>(null);
  const loadMore = useCallback(async () => { await session.current?.nextPage(); }, []);
  const retrySearch = useCallback(() => { void session.current?.start(true); }, []);

  useEffect(() => {
    setState(initialState);
    setActiveSlide(null);
    setSelection({ A: null, B: null });
    if (!region) return;
    const values: Record<string, string | number> = { ra: region.ra, dec: region.dec, size: region.size };
    for (const [key, value] of Object.entries(filters)) {
      if (value) values[key] = key === 'wave_min' || key === 'wave_max' ? Number(value) : value;
    }
    const active = new InventorySession(values, setState);
    session.current = active;
    void active.start();
    return () => { active.dispose(); session.current = null; };
    // A session owns one exact region/filter set; refresh keeps its inventory and A/B.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [regionKey, filters]);

  if (!region) return <main className="comparison-page"><h1>Choose a comparison region</h1><p>This link needs valid ICRS coordinates and a crop width between 0.5 and 30 arcminutes.</p><Link className="btn" href="/">Open sky navigator</Link></main>;
  const products = state.page?.products ?? [];
  const loading = state.loading;
  const progress = state.progress;
  const finished = progress?.collections.filter((c) => ['complete', 'partial', 'error', 'suspended', 'interrupted'].includes(c.state)).length ?? 0;
  const statusLabel = loading ? `${products.length ? 'Partial results · ' : ''}${progress?.state === 'queued' ? 'Waiting to search IRSA' : 'Searching IRSA'}… ${finished}/${progress?.collections.length ?? 2} collections checked`
    : state.error ? 'Search request failed · retained results stay available'
    : progress?.status === 'empty' ? 'Search complete · No matching coverage for these filters'
    : progress?.status === 'complete' ? `Search complete · ${progress.total} products`
    : progress?.status === 'partial' ? `Partial results · ${progress.total} products · some coverage could not be verified`
    : 'Archive unavailable · coverage could not be checked';
  const field = (key: keyof Filters, label: string, type = 'text') => <label>{label}<input type={type} value={draft[key]} step={type === 'number' ? 'any' : undefined} min={type === 'number' ? '0.001' : undefined} max={type === 'number' ? '1000' : undefined} onChange={(event) => setDraft((value) => ({ ...value, [key]: event.target.value }))} /></label>;

  return <main className="comparison-page">
    <header className="comparison-header">
      <div><Link href={navigatorUrl(new URLSearchParams(params.toString()))}>← Back to navigator</Link><h1>Compare images</h1><p className="mono small">ICRS {region.ra.toFixed(5)}°, {region.dec.toFixed(5)}° · {region.size}′ square</p></div>
      <p className="muted small">SPHEREx image inventory · NASA/IPAC IRSA<br />Browse exposures from DR1 and QR3, directly here.</p>
    </header>
    <p className="comparison-challenge-link"><Link href="/compare?challenge=weekly">Join the weekly sky challenge →</Link><span className="small muted">Revisit M101 with images prepared in advance.</span></p>
    <div className="comparison-layout">
      <aside className="comparison-filters panel">
        <details open><summary>Filter the inventory</summary>
          <form onSubmit={(event) => { event.preventDefault(); setFilters({ ...draft }); }}>
            {field('band', 'Detector band contains (e.g. SPHEREx-D2)')}
            <div className="filter-pair">{field('wave_min', 'From µm', 'number')}{field('wave_max', 'To µm', 'number')}</div>
            {field('start', 'Observed from', 'date')}{field('end', 'Observed through', 'date')}
            <label>Product<select value={draft.kind} onChange={(event) => setDraft((value) => ({ ...value, kind: event.target.value }))}><option value="all">All products</option><option value="individual">Individual exposure</option><option value="combined">Combined / mosaic</option></select></label>
            <button className="btn primary" type="submit">Apply filters</button>
            <button className="btn ghost" type="button" onClick={() => { setDraft(initialFilters); setFilters({ ...initialFilters }); }}>Clear filters</button>
          </form>
        </details>
        <p className="muted small">Date filters use observation intervals. Products with unknown dates appear when no date filter is set.</p>
        <p className="muted small">SPHEREx wavelengths describe the detector range. The exact wavelength at this position requires processing the selected image.</p>
      </aside>
      <section className="comparison-results" aria-label="Image inventory">
        <Slideshow page={state.page} searching={loading} status={statusLabel} activeId={activeSlide} onSelect={setActiveSlide}
          onLoadMore={loadMore} loadingMore={state.loadingPage} onRetrySearch={retrySearch} />
        <details className="saved-comparison"><summary>Saved comparison selections</summary>
        <div className="comparison-workspace" aria-label="Comparison selections">
          {(['A', 'B'] as const).map((slot) => <section className="comparison-slot panel" key={slot}><h2>Image {slot}</h2>{selection[slot] ? <><p>{MISSION_NAMES[selection[slot]!.mission]} · {spectralLabel(selection[slot]!)}</p><p className="small muted">{dateLabel(selection[slot]!)}</p><a href={selection[slot]!.sourceUrl} target="_blank" rel="noreferrer">View IRSA record ↗</a></> : <p className="muted">Choose an image from the inventory below.</p>}<p className="small muted">Saved for a later comparison.</p></section>)}
        </div>
        </details>
        <div className="inventory-heading"><h2>Available images <span className="muted">({products.length} loaded)</span></h2><button className="btn ghost" disabled={loading} onClick={() => void session.current?.start(true)}>Refresh search</button></div>
        <details className="inventory-drawer" open><summary>Show or hide image inventory</summary>
        <div className="spherex-status" aria-live="polite" aria-atomic="true">
          <div className="mission-status">
            <strong>SPHEREx</strong>
            <span className={state.error || progress?.status === 'error' && !loading ? 'comparison-error' : 'muted'}>{statusLabel}</span>
            {state.page?.verifiedAt && <p className={`small ${state.page.stale ? 'comparison-warning' : 'muted'}`}>{state.page.stale ? 'Older inventory · ' : ''}Displayed inventory verified {new Date(state.page.verifiedAt).toLocaleString()}{loading ? ' · Refreshing in the background' : ''}</p>}
            {state.error && <p className="small comparison-error">{state.error}</p>}
            {progress?.state === 'interrupted' && <p className="small comparison-warning">The search was interrupted by a service restart. Retained results are available; retry to check the remaining collections.</p>}
            {progress?.state === 'timed_out' && <p className="small comparison-warning">The search reached its time budget. Retry to check the remaining collections.</p>}
            {progress?.truncated && <p className="small comparison-warning">Results truncated. Restrict your search using the filters.</p>}
            {(state.error || progress?.status === 'error' || progress?.status === 'partial') && !loading && <button className="btn ghost" onClick={() => void session.current?.start(true)}>Retry remaining collections</button>}
          </div>
        </div>
        {progress && <details className="collection-details"><summary>Collection details · {finished}/{progress.collections.length} checked</summary><ul>{progress.collections.map((c) => <li key={c.name}><strong>{c.name}</strong> · {c.state}{c.attempts > 0 ? ` · ${c.attempts} attempt${c.attempts === 1 ? '' : 's'}` : ''}{c.resultCount !== undefined ? ` · ${c.resultCount} products` : ''}{c.error && <p className="small comparison-warning">{c.error}</p>}{c.verifiedAt && <p className="small muted">Last verified {new Date(c.verifiedAt).toLocaleString()}</p>}</li>)}</ul></details>}
        {state.pendingVersion && <p className="inventory-update small">Updated inventory is available. Your loaded pages stay fixed. <button className="btn ghost" onClick={() => void session.current?.showUpdated()}>Show updated inventory</button></p>}
        {!products.length && !loading && <p className="inventory-empty">{progress?.status === 'empty' ? 'Try broader filters or another sky region.' : 'No images loaded yet. Retry when the archive is available; this does not mean there is no coverage.'}</p>}
        <ol className="inventory-list">
          {products.map((product) => <li className="inventory-product" key={product.id}>
            <div><strong>{MISSION_NAMES[product.mission]}</strong><span className="product-kind">{product.kind === 'combined' ? 'Combined' : product.kind === 'individual' ? 'Exposure' : 'Type unknown'}</span><p>{spectralLabel(product)}</p><p className="small muted">Observed {dateLabel(product)}</p></div>
            <div className="product-provenance"><p className="small">{product.collection}</p><p className="small muted product-title">{product.title}</p><p className="small muted">{product.coverage}</p><a className="small" href={product.sourceUrl} target="_blank" rel="noreferrer">IRSA metadata ↗</a> · <a className="small" href={product.accessUrl} target="_blank" rel="noreferrer">Original FITS ↗</a></div>
            <div className="product-actions"><button className="btn primary" aria-pressed={activeSlide === product.id} onClick={() => { setActiveSlide(product.id); document.querySelector('.slideshow')?.scrollIntoView({ block: 'start' }); }}>View image</button>{(['A', 'B'] as const).map((slot) => <button className="btn" key={slot} aria-label={`Use ${product.title} as image ${slot}`} aria-pressed={selection[slot]?.id === product.id} onClick={() => setSelection((value) => ({ ...value, [slot]: product }))}>Use as {slot}</button>)}</div>
          </li>)}
        </ol>
        <div className="inventory-pages">{state.page?.nextCursor && <button className="btn" disabled={state.loadingPage} onClick={() => void session.current?.nextPage()}>{state.loadingPage ? 'Loading…' : 'Load next 100 · SPHEREx'}</button>}</div>
        </details>
      </section>
    </div>
  </main>;
}
