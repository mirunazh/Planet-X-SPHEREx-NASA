'use client';

import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Banner } from '@astryxdesign/core/Banner';
import { Link } from '@astryxdesign/core/Link';
import { resolvePosition, type Resolution } from '@/lib/resolve';
import { formatDec, formatRa } from '@/lib/sky';
import { S } from '@/lib/strings';
import { parseView, serializeView, useView, viewOf } from '@/lib/viewState';
import { MissionView } from './MissionView';
import { MoverBanner } from './MoverBanner';
import { TargetCards } from './TargetCards';
import { TopBar } from './TopBar';

export function WatchPage() {
  const search = useSearchParams().toString();
  const written = useRef<string | null>(null);
  const [nav, setNav] = useState<{ id: number; autoplay: boolean } | null>(null);
  const [res, setRes] = useState<Resolution | null>(null);
  const [error, setError] = useState<string | null>(null);
  const mission = useView((s) => s.mission);
  const ra = useView((s) => s.ra);
  const dec = useView((s) => s.dec);

  // A navigation (first load or a link) re-reads the URL; the strings this page writes itself are ignored.
  useEffect(() => {
    if (search === written.current) return;
    const { view, hasFrame } = parseView(search);
    useView.setState({ ...view, playing: false });
    setRes(null);
    setError(null);
    setNav((n) => ({ id: (n?.id ?? 0) + 1, autoplay: !hasFrame }));
  }, [search]);

  // Keep the URL in sync (debounced, and not while playing: browsers throttle replaceState).
  useEffect(() => {
    let t: ReturnType<typeof setTimeout> | undefined;
    const unsub = useView.subscribe((s) => {
      clearTimeout(t);
      if (s.playing) return;
      t = setTimeout(() => {
        written.current = serializeView(viewOf(s));
        window.history.replaceState(null, '', `?${written.current}`);
      }, 250);
    });
    return () => {
      clearTimeout(t);
      unsub();
    };
  }, []);

  useEffect(() => {
    if (nav === null || ra === null || dec === null) return;
    let alive = true;
    resolvePosition(ra, dec).then(
      (r) => {
        if (!alive) return;
        setRes(r);
        if (!useView.getState().mission && r.mission) useView.getState().set({ mission: r.mission.id });
      },
      (e) => alive && setError(String(e)),
    );
    return () => {
      alive = false;
    };
  }, [nav, ra, dec]);

  if (nav === null) return null;
  return (
    <>
      <TopBar>
        <Link href="/">{S.backHome}</Link>
      </TopBar>
      <main className="watch-page">
        {error && <Banner status="error" title={S.loadFailed} description={error} />}
        {mission ? (
          <MissionView key={`${nav.id}-${mission}`} autoplay={nav.autoplay} resolution={res} />
        ) : ra !== null && dec !== null ? (
          res ? (
            <div className="placeholder">
              <MoverBanner res={res} />
              <section className="empty-plate">
                <h1>{S.placeholderTitle}</h1>
                <p>
                  {S.placeholderPosition} <span className="data">{formatRa(ra)} {formatDec(dec)}</span>{' '}
                  <span className="data muted">
                    ({ra.toFixed(6)} {dec.toFixed(6)})
                  </span>
                </p>
                <p className="muted">{S.placeholderBody}</p>
              </section>
              <TargetCards />
            </div>
          ) : (
            <p className="muted">{S.searching}</p>
          )
        ) : (
          <TargetCards />
        )}
      </main>
    </>
  );
}
