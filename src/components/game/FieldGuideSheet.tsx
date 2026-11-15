'use client';

/**
 * Field guide: the sky passport, then one card per place the player visited,
 * newest first, with plain facts from the NASA data snapshot and their SPHEREx observations.
 */
import { useMemo } from 'react';
import { Sheet } from '@/components/ui/Sheet';
import { useNav } from '@/lib/store';
import { SURVEYS } from '@/lib/sky/surveys';
import { type VisitedPlace, useGame } from '@/lib/game/store';
import {
  type PinIndex,
  buildPinIndex,
  distanceLabel,
  fieldGuideEntries,
  placeTypeLabel,
  planetHostFor,
  planetLabel,
  resolvePin,
  sourceHref,
} from '@/lib/game/fieldGuide';
import { SkyPassport } from './SkyPassport';
import styles from './FieldGuideSheet.module.css';

function PlaceCard({ id, place, index }: { id: string; place: VisitedPlace; index: PinIndex | null }) {
  const pin = index ? resolvePin(id, place, index) : null;
  const host = index ? planetHostFor(pin, place, index) : null;
  const facts = [
    placeTypeLabel(place, host !== null),
    distanceLabel(pin?.distPc ?? host?.distPc),
    planetLabel(host?.planetCount),
  ].filter(Boolean);
  const source = pin?.source;
  const href = sourceHref(source?.url);

  return (
    <li className={styles.card}>
      <h4 className={styles.name}>{place.name}</h4>
      <p className={styles.facts}>{facts.join(' · ')}</p>
      {place.surveys.length > 0 && (
        <div className={styles.stamps}>
          <span className={styles.stampLabel}>Seen with</span>
          <ul className={styles.stampList}>
            {place.surveys.map((surveyId) => (
              <li key={surveyId} className={styles.stamp}>
                {SURVEYS[surveyId]?.shortName ?? surveyId}
              </li>
            ))}
          </ul>
        </div>
      )}
      {source?.service && (
        <p className={styles.source}>
          Source:{' '}
          {href ? (
            <a href={href} target="_blank" rel="noreferrer">
              {source.service}
              <span className={styles.srOnly}> (opens in a new tab)</span>
            </a>
          ) : (
            source.service
          )}
        </p>
      )}
    </li>
  );
}

export function FieldGuideSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const visited = useGame((s) => s.visited);
  const targets = useNav((s) => s.targets);
  const hosts = useNav((s) => s.hosts);
  const index = useMemo(() => (open ? buildPinIndex(targets, hosts) : null), [open, targets, hosts]);
  const entries = useMemo(() => fieldGuideEntries(visited), [visited]);

  return (
    <Sheet open={open} onClose={onClose} side="right" title="Field guide">
      <SkyPassport />
      <h3 className={styles.heading}>Places you visited</h3>
      {entries.length === 0 ? (
        <p className={styles.empty}>Visit a place to start your field guide.</p>
      ) : (
        <ol className={styles.cards}>
          {entries.map(({ id, place }) => (
            <PlaceCard key={id} id={id} place={place} index={index} />
          ))}
        </ol>
      )}
    </Sheet>
  );
}
