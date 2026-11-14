'use client';

import { Banner } from '@astryxdesign/core/Banner';
import { Button } from '@astryxdesign/core/Button';
import type { Resolution } from '@/lib/resolve';
import { watchHref } from '@/lib/resolve';
import { COMPASS_WORDS, S } from '@/lib/strings';

/** "It moved" banner. `here` = already showing the mission, so no jump button. */
export function MoverBanner({ res, here = false }: { res: Resolution; here?: boolean }) {
  const best = res.hits[0];
  if (!best) return null;
  const name = res.name ?? best.mover.name;
  const more = res.hits.length > 1 ? ` ${S.otherMovers(res.hits.length - 1)}` : '';

  if (res.moved) {
    const href = res.mission ? watchHref(res.mission.id, res.ra, res.dec) : watchHref(null, best.nowRa, best.nowDec);
    return (
      <Banner
        status="warning"
        title={S.movedTitle(name)}
        description={S.movedBody(String(Math.round(best.year)), best.nowSepArcsec, COMPASS_WORDS[best.nowDirection]) + more}
        endContent={here ? undefined : <Button label={S.jumpToIt} variant="primary" href={href} />}
      />
    );
  }
  return (
    <Banner
      status="info"
      title={S.hereTitle(name)}
      description={S.hereBody(name, best.nowSepArcsec.toFixed(1)) + more}
      endContent={here || !res.mission ? undefined : <Button label={S.openMission} variant="primary" href={watchHref(res.mission.id, res.ra, res.dec)} />}
    />
  );
}
