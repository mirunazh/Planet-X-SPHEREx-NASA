'use client';

/* Step 3 of the journey: every SPHEREx photo of one small square of sky, in date order.
   The journey bar and the guide say where the visitor is and what to do; the flipbook opens on
   one detector so its frames compare like with like. The dark panels, cyan actions and
   measurement typography extend the navigator. On small screens the layout stacks and each
   product stays readable as a row. */
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { JourneyBar, type JourneyStep } from '@/components/journey/JourneyBar';
import { navigatorUrl, parseRegion } from '@/lib/comparison/region';
import { MISSION_NAMES, type ImageProduct } from '@/lib/comparison/types';
import { InventorySession, type InventoryState } from '@/lib/comparison/session';
import { CompareGuide, DEFAULT_BAND, isDefaultBand, type ColorMode } from './CompareGuide';
import { Slideshow } from './Slideshow';
import styles from './CompareGuide.module.css';

const initialState: InventoryState = { progress: null, page: null, error: null, loading: true, loadingPage: false, pendingVersion: null };
type Filters = { band: string; wave_min: string; wave_max: string; start: string; end: string; kind: string };
const emptyFilters: Filters = { band: '', wave_min: '', wave_max: '', start: '', end: '', kind: 'all' };
/** The page's own starting filter, shown in the detector field. Only this exact object may fall back to all colors. */
const defaultFilters: Filters = { ...emptyFilters, band: DEFAULT_BAND };
const COMPARE_TOUR = { viewer: 'compare-viewer', controls: 'compare-controls' };

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

/** The place name the navigator passes along (?name=), as plain text of a sensible length. */
function placeName(value: string | null): string | null {
  // eslint-disable-next-line no-control-regex
  const name = value?.replace(/[\u0000-\u001f\u007f]/g, '').trim().slice(0, 80);
  return name || null;
}

/** Adds one query parameter to a same-site path such as "/?ra=1" or "/". */
function withParam(url: string, key: string, value: string): string {
  const at = url.indexOf('?');
  const query = new URLSearchParams(at < 0 ? '' : url.slice(at + 1));
  query.set(key, value);
  return `${at < 0 ? url : url.slice(0, at)}?${query}`;
}

export function ComparisonInventory() {
  const params = useSearchParams();
  const router = useRouter();
  const region = parseRegion(new URLSearchParams(params.toString()));
  const regionKey = region ? `${region.ra},${region.dec},${region.size}` : '';
  const name = placeName(params.get('name'));
  const skyUrl = navigatorUrl(new URLSearchParams(params.toString()));
  const bandHint = useId();
  const [draft, setDraft] = useState<Filters>(defaultFilters);
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  /** True after the page found no default-detector photos and switched itself to all colors. */
  const [fellBack, setFellBack] = useState(false);
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
    // A finished search with no default-detector photos switches to all colors, once. A detector the
    // visitor chose stays applied, even with no photos. An archive failure is not "no photos": it keeps the filter.
    let canFallBack = filters === defaultFilters;
    const active = new InventorySession(values, (next) => {
      setState(next);
      const progress = next.progress;
      if (!canFallBack || next.loading || next.error || progress?.state !== 'finished' || progress.total > 0
        || (progress.status !== 'empty' && progress.status !== 'partial')) return;
      canFallBack = false;
      setFellBack(true);
      setFilters({ ...defaultFilters, band: '' });
      setDraft((value) => (isDefaultBand(value.band) ? { ...value, band: '' } : value));
    });
    session.current = active;
    void active.start();
    return () => { active.dispose(); session.current = null; };
    // A session owns one exact region/filter set; refresh keeps its inventory and A/B.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [regionKey, filters]);

  const onJourney = (step: JourneyStep) => {
    if (step === 1) router.push(withParam(skyUrl, 'sheet', 'places'));
    else if (step === 2) router.push(skyUrl);
  };

  if (!region) return <main className={`comparison-page ${styles.page}`}>
    <div className={styles.top}><JourneyBar step={3} onSelect={onJourney} /></div>
    <h1>Choose a comparison region</h1>
    <p>This link needs valid ICRS coordinates and a crop width between 0.5 and 30 arcminutes.</p>
    <Link className="btn" href="/">Open sky navigator</Link>
  </main>;

  const products = state.page?.products ?? [];
  const loading = state.loading;
  const progress = state.progress;
  const finished = progress?.collections.filter((c) => ['complete', 'partial', 'error', 'suspended', 'interrupted'].includes(c.state)).length ?? 0;
  const statusLabel = loading ? `${products.length ? 'Partial results · ' : ''}${progress?.state === 'queued' ? 'Waiting to search IRSA' : 'Searching IRSA'}… ${finished}/${progress?.collections.length ?? 2} collections checked`
    : state.error ? 'Search request failed · retained results stay available'
    : progress?.status === 'empty' ? 'Search complete · No matching coverage for these filters'
    : progress?.status === 'complete' ? `Search complete · ${progress.total} photos`
    : progress?.status === 'partial' ? `Partial results · ${progress.total} photos · some coverage could not be verified`
    : 'Archive unavailable · coverage could not be checked';

  const band = filters.band.trim();
  const filtered = Object.entries(filters).some(([key, value]) => (key === 'kind' ? value !== 'all' : !!value.trim()));
  const color: ColorMode = band ? (isDefaultBand(band) ? 'one' : 'custom')
    : filters.wave_min || filters.wave_max ? 'custom' : fellBack ? 'fallback' : 'all';
  const showAllColors = () => {
    setFellBack(false);
    setFilters((value) => ({ ...value, band: '', wave_min: '', wave_max: '' }));
    setDraft((value) => ({ ...value, band: '', wave_min: '', wave_max: '' }));
  };
  const showOneColor = () => {
    setFellBack(false);
    setFilters((value) => ({ ...value, band: DEFAULT_BAND }));
    setDraft((value) => ({ ...value, band: DEFAULT_BAND }));
  };
  const photosLine = state.page ? `${state.page.total} photo${state.page.total === 1 ? '' : 's'}` : 'photos loading';
  const colorLine = color === 'one' ? `one detector (${DEFAULT_BAND})` : color === 'custom' ? 'colors chosen in the filters' : 'all detectors';
  const contextLine = `Right now: ${name ?? `RA ${region.ra.toFixed(3)}°, Dec ${region.dec.toFixed(3)}°`} · ${photosLine} · ${colorLine}`;

  const field = (key: keyof Filters, label: string, type = 'text', describedBy?: string) => <label>{label}<input type={type} value={draft[key]} step={type === 'number' ? 'any' : undefined} min={type === 'number' ? '0.001' : undefined} max={type === 'number' ? '1000' : undefined} aria-describedby={describedBy} onChange={(event) => setDraft((value) => ({ ...value, [key]: event.target.value }))} /></label>;

  return <main className={`comparison-page ${styles.page}`}>
    <div className={styles.top}>
      <Link className={styles.back} href={skyUrl}>← Back to the sky</Link>
      <JourneyBar step={3} onSelect={onJourney} />
    </div>
    <header className="comparison-header">
      <div><h1>{name ? `Photos of ${name} over time` : 'Photos of this spot over time'}</h1><p className="mono small">ICRS {region.ra.toFixed(5)}°, {region.dec.toFixed(5)}° · {region.size}′ square</p></div>
      <div className={styles.side}>
        <p className="muted small">SPHEREx image inventory · NASA/IPAC IRSA<br />Browse exposures from DR1 and QR3, directly here.</p>
        <p className={`${styles.challenge} small`}><Link href="/compare?challenge=weekly">Join the weekly sky challenge →</Link><span className="muted">Revisit M101 with images prepared in advance.</span></p>
      </div>
    </header>
    <CompareGuide size={region.size} products={products} total={state.page?.total ?? 0} more={!!state.page?.nextCursor}
      loading={loading} status={progress?.status ?? null} filtered={filtered} color={color} onShowAllColors={showAllColors} onShowOneColor={showOneColor}
      contextLine={contextLine} />
    <div className="comparison-layout">
      <aside className="comparison-filters panel" data-tour="compare-filters">
        <details open><summary>Filter the photos</summary>
          <form onSubmit={(event) => { event.preventDefault(); setFellBack(false); setFilters({ ...draft }); }}>
            <div>
              {field('band', 'Detector (color)', 'text', bandHint)}
              <p id={bandHint} className={`${styles.hint} small muted`}>Name contains, e.g. SPHEREx-D2. Leave empty for all 6 detectors.</p>
            </div>
            <div className="filter-pair">{field('wave_min', 'From µm', 'number')}{field('wave_max', 'To µm', 'number')}</div>
            {field('start', 'Taken from', 'date')}{field('end', 'Taken through', 'date')}
            <label>Type of photo<select value={draft.kind} onChange={(event) => setDraft((value) => ({ ...value, kind: event.target.value }))}><option value="all">All types</option><option value="individual">Single exposures</option><option value="combined">Combined / mosaic</option></select></label>
            <button className="btn primary" type="submit">Apply filters</button>
            <button className="btn ghost" type="button" onClick={() => { setFellBack(false); setDraft(emptyFilters); setFilters({ ...emptyFilters }); }}>Clear filters</button>
          </form>
        </details>
        <p className="muted small">Date filters use observation intervals. Photos with unknown dates appear when no date filter is set.</p>
        <p className="muted small">SPHEREx wavelengths describe the detector range. The exact wavelength at this position requires processing the selected image.</p>
      </aside>
      <section className="comparison-results" aria-label="Photos of this square">
        <Slideshow page={state.page} searching={loading} status={statusLabel} activeId={activeSlide} onSelect={setActiveSlide}
          onLoadMore={loadMore} loadingMore={state.loadingPage} onRetrySearch={retrySearch} tour={COMPARE_TOUR} />
        <details className="saved-comparison"><summary>Saved comparison selections (A and B)</summary>
        <div className="comparison-workspace" aria-label="Comparison selections">
          {(['A', 'B'] as const).map((slot) => <section className="comparison-slot panel" key={slot}><h2>Image {slot}</h2>{selection[slot] ? <><p>{MISSION_NAMES[selection[slot]!.mission]} · {spectralLabel(selection[slot]!)}</p><p className="small muted">{dateLabel(selection[slot]!)}</p><a href={selection[slot]!.sourceUrl} target="_blank" rel="noreferrer">View IRSA record ↗</a></> : <p className="muted">Choose an image from the list below.</p>}<p className="small muted">Saved for a later comparison.</p></section>)}
        </div>
        </details>
        <div className="inventory-heading"><h2>All photos of this square <span className="muted">({products.length} loaded)</span></h2><button className="btn ghost" disabled={loading} onClick={() => void session.current?.start(true)}>Refresh search</button></div>
        <details className="inventory-drawer" open><summary>Show or hide the photo list</summary>
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
        <ol className="inventory-list" data-tour="compare-list">
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
