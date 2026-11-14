'use client';

import { useEffect, useState } from 'react';
import { Badge } from '@astryxdesign/core/Badge';
import { ClickableCard } from '@astryxdesign/core/ClickableCard';
import { loadIndex, missionUrl, type MissionIndex } from '@/lib/data';
import { watchHref } from '@/lib/resolve';
import { S } from '@/lib/strings';

export function TargetCards() {
  const [index, setIndex] = useState<MissionIndex | null>(null);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    loadIndex().then(setIndex, (e) => setError(String(e)));
  }, []);

  return (
    <section className="targets" aria-labelledby="targets">
      <h2 id="targets">{S.targetsHeading}</h2>
      <p className="targets-intro">{S.targetsIntro}</p>
      {error && <p className="muted">{`${S.loadFailed} ${error}`}</p>}
      <div className="cards">
        {index?.missions.map((m) => {
          const g = m.groups[0];
          return (
            <ClickableCard key={m.id} className="target-card" label={S.openTarget(m.name)} href={watchHref(m.id)} padding={0}>
              {/* Preview naming from pipeline/README.md: stacks/<group>_p<k>.png. Hover or focus blinks first and last visit. */}
              <div className="card-plate">
                <img src={missionUrl(m.id, `stacks/${g}_p0.png`)} alt="" width={121} height={121} />
                <img className="blink" src={missionUrl(m.id, `stacks/${g}_p${m.nPasses[g] - 1}.png`)} alt="" width={121} height={121} loading="lazy" />
              </div>
              <div className="card-text">
                <h3>{m.name}</h3>
                <div className="card-meta">
                  <Badge label={m.kind === 'mover' ? S.kindMover : S.kindVariable} variant={m.kind === 'mover' ? 'orange' : 'neutral'} />
                  <span className="muted">{S.passesCount(m.nPasses[g])}</span>
                </div>
                <p>{m.summary}</p>
              </div>
            </ClickableCard>
          );
        })}
      </div>
    </section>
  );
}
