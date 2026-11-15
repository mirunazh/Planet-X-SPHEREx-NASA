'use client';

import { useId, type ReactNode } from 'react';
import { useNav } from '@/lib/store';
import styles from './tools.module.css';

type OverlayKey = 'showTargets' | 'showHosts' | 'showGrid' | 'rawPixels';

export function LayersTool() {
  const hostCount = useNav((s) => s.hosts.length);

  return (
    <div className={styles.switches}>
      <SwitchRow field="showTargets" title="Famous places" detail="Named pins for well-known galaxies, stars and sky landmarks" />
      <SwitchRow field="showHosts" title="Stars with planets"
        extra={hostCount > 0 && <span className={styles.count}> ({hostCount.toLocaleString('en-US')})</span>}
        detail="Pins for stars with confirmed planets, from the NASA Exoplanet Archive" />
      <SwitchRow field="showGrid" title="Coordinate grid"
        detail="Coordinate lines, the sky's equator, the Sun's path and the Milky Way's plane" />
      <SwitchRow field="rawPixels" title="Raw pixels" detail="Show the image pixels without smoothing" />
    </div>
  );
}

function SwitchRow({ field, title, detail, extra }: { field: OverlayKey; title: string; detail: string; extra?: ReactNode }) {
  const on = useNav((s) => s[field]);
  const id = useId();

  return (
    <label className={styles.switchRow}>
      <span className={styles.switchText}>
        <span className={styles.switchTitle} id={`${id}-title`}>{title}{extra}</span>
        <span className={styles.switchDetail} id={`${id}-detail`}>{detail}</span>
      </span>
      <span className={styles.switch}>
        <input type="checkbox" role="switch" className={styles.switchInput} checked={on}
          aria-labelledby={`${id}-title`} aria-describedby={`${id}-detail`} onChange={() => useNav.getState().toggle(field)} />
        <span className={styles.track} aria-hidden="true" />
      </span>
    </label>
  );
}
