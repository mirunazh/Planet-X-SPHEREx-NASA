'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { isWeeklyChallenge, type WeeklyChallenge as Challenge } from '@/lib/comparison/types';
import { WhatYoureSeeingButton } from './CompareGuide';
import { Slideshow } from './Slideshow';
import styles from './CompareGuide.module.css';

/** The challenge always returns to M101; its name titles the comparison page it links to. */
const CHALLENGE_PLACE = 'Pinwheel Galaxy (M101)';

function date(value: string) {
  return new Date(value).toLocaleDateString(undefined, { timeZone: 'UTC', day: 'numeric', month: 'short', year: 'numeric' });
}

export function WeeklyChallenge() {
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [retry, setRetry] = useState(0);
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    const controller = new AbortController();
    let timer: ReturnType<typeof setTimeout>;
    const load = async () => {
      try {
        const response = await fetch('/api/comparison/challenge', { signal: controller.signal, cache: 'no-store' });
        const data: unknown = await response.json();
        controller.signal.throwIfAborted();
        if (!response.ok || !isWeeklyChallenge(data)) throw new Error('The weekly challenge could not be loaded. Retry in a moment.');
        setChallenge(data); setError(null);
      } catch (failure) {
        if (controller.signal.aborted) return;
        setError(failure instanceof Error ? failure.message : 'The challenge is unavailable. Retry.');
      }
      timer = setTimeout(() => { void load(); }, 15_000);
    };
    void load();
    return () => { controller.abort(); clearTimeout(timer); };
  }, [retry]);

  const version = challenge ? `${challenge.id}:${challenge.frames.map((f) => f.previewId).join(':')}` : '';
  const page = useMemo(() => challenge && challenge.frames.length ? {
    products: challenge.frames.map((f) => f.product), total: challenge.frames.length, nextCursor: null,
    status: 'complete' as const, truncated: false, warnings: [], retrievedAt: challenge.checkedAt ?? challenge.startsAt,
    searchId: 'weekly-challenge', version,
  } : null, [version]); // Keep playback stable while background status checks run.
  const prepared = useMemo(() => Object.fromEntries(challenge?.frames.map((f) => [f.product.id, f.previewId]) ?? []), [version]);
  const fullUrl = challenge ? `/compare?${new URLSearchParams({ ...Object.fromEntries(Object.entries(challenge.region).map(([key, value]) => [key, String(value)])), name: CHALLENGE_PLACE })}` : '/compare';
  const exploreUrl = `/compare?${new URLSearchParams({ ra: '210.80227', dec: '54.34895', size: '6', name: CHALLENGE_PLACE })}`;
  const contextLine = challenge ? `Right now: ${challenge.title} · week ${challenge.id} · ${challenge.ready} of ${challenge.target} photos ready` : undefined;

  return <main className={`comparison-page challenge-page ${styles.page}`}>
    <header className="comparison-header"><div><Link className={styles.back} href="/">← Back to the sky</Link><h1>Weekly sky challenge</h1>
      <p className="muted">One patch of sky. A new week of looking closer.</p></div>
      <div className={styles.headActions}><WhatYoureSeeingButton screen="challenge" contextLine={contextLine} /><Link className="btn" href={exploreUrl}>Explore this region</Link></div></header>
    {error && <p className="comparison-error" role="status">{error} <button className="btn" onClick={() => setRetry((value) => value + 1)}>Retry challenge</button></p>}
    {!challenge && !error && <p role="status">Loading this week’s challenge…</p>}
    {challenge && <>
      <section className="challenge-brief" aria-labelledby="challenge-title">
        <div><h2 id="challenge-title">{challenge.title}</h2><p className="small muted">{date(challenge.startsAt)} – {date(new Date(Date.parse(challenge.endsAt) - 1).toISOString())} · {challenge.id}</p>
          <p>{challenge.prompt}</p><p className="small muted">We return to the same region each week. The prepared set spans observation dates within {challenge.band ?? 'one detector range'}.</p>
          <p className="mono small">ICRS {challenge.region.ra.toFixed(5)}°, {challenge.region.dec.toFixed(5)}° · {challenge.region.size}′ square</p></div>
        <div className="challenge-cache" aria-live="polite" data-tour="challenge-status">
          <p><strong>{challenge.ready} / {challenge.target} images cached</strong></p>
          <p className="small muted">{challenge.state === 'preparing' ? 'Preparing images in the background. Ready frames can be viewed now.' : challenge.ready ? 'Prepared on the server and shared by everyone opening this challenge.' : 'Waiting for available archive images. This page updates automatically.'}</p>
          <p className="small">{challenge.newThisWeek} newly found in this region this week</p>
          {challenge.checkedAt && <p className="small muted">Archive checked {new Date(challenge.checkedAt).toLocaleString()}</p>}
          {challenge.latestObservation && <p className="small muted">Latest observation found: {date(challenge.latestObservation)}</p>}
          {challenge.inventoryStatus && challenge.inventoryStatus !== 'complete' && <p className="small comparison-warning">Archive coverage could only be checked partially.</p>}
          {challenge.error && <p className="small comparison-warning">{challenge.error}</p>}
        </div>
      </section>
      <div data-tour="challenge-viewer">
        <Slideshow page={page} prepared={prepared} searching={challenge.state === 'preparing'} status="Images are prepared automatically when the archive is available."
          activeId={active} onSelect={setActive} onLoadMore={async () => {}} loadingMore={false} onRetrySearch={() => setRetry((value) => value + 1)} />
      </div>
      <footer className="challenge-notes"><p className="small muted">SPHEREx QR3 data arrive approximately weekly. We check IRSA every six hours; a release may contain no new coverage here. “Newly found” counts archive products first seen by this app, rather than observations taken this week. The first check establishes a baseline.</p>
        <div className="challenge-links"><Link className="btn" href={fullUrl} data-tour="challenge-browse">Browse all {challenge.found || ''} exposures</Link><a href="https://irsa.ipac.caltech.edu/spherex-archive-documentation/spherex-data-releases/" target="_blank" rel="noreferrer">About SPHEREx releases ↗</a></div>
      </footer>
    </>}
  </main>;
}
