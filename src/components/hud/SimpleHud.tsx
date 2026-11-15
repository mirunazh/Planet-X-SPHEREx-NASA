'use client';

import { useEffect, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { useNav } from '@/lib/store';
import { useUi, type SheetId } from '@/lib/ui';
import { resetView } from '@/lib/navigation';
import { describeView } from '@/lib/caption';
import { HELP } from '@/content/help';
import type { FigurineId } from '@/lib/game/figurines';
import { useGame } from '@/lib/game/store';
import { useGameEvents } from '@/lib/game/useGameEvents';
import { FigurineDock } from '@/components/game/FigurineDock';
import { UnlockToast } from '@/components/game/UnlockToast';
import { FieldGuideSheet } from '@/components/game/FieldGuideSheet';
import { SkyEditor } from '@/components/editor/SkyEditor';
import { PlacesSheet } from '@/components/sheets/PlacesSheet';
import { SettingsSheet } from '@/components/sheets/SettingsSheet';
import { WhatYoureSeeing } from '@/components/help/WhatYoureSeeing';
import { TourOverlay } from '@/components/help/TourOverlay';
import { CropSelector } from '@/components/comparison/CropSelector';
import { CompareArea, NextStep, compareSize, isFlying, useJourney } from '@/components/journey/NextStep';
import { comparisonUrl } from '@/lib/comparison/region';
import { SearchBox } from './SearchBox';
import { SidePanel } from './SidePanel';
import { LayerStatus } from './LayerStatus';
import { Caption } from './Caption';
import { PositionAnnouncer } from './CoordinateReadout';
import { HoverTooltip, Reticle, SkyLabels, StatusLine } from './Overlays';
import { Dialogs } from './Dialogs';
import styles from './SimpleHud.module.css';

const SHEET_FOR: Partial<Record<FigurineId, SheetId>> = {
  places: 'places',
  telescope: 'telescope',
  explain: 'explain',
  guide: 'guide',
};

const FIGURINE_FOR: Partial<Record<SheetId, FigurineId>> = {
  places: 'places',
  telescope: 'telescope',
  explain: 'explain',
  guide: 'guide',
};

/** Shown only while a sky layer is loading or failed, so errors and Retry stay visible. */
function LayerAlert() {
  const status = useNav((s) => s.allskyStatus);
  if (status === 'ready') return null;
  return <div className={styles.status}><LayerStatus /></div>;
}

/** Snapshot of what is on screen, for the top of the "What you're seeing" panel. */
function currentContextLine(): string {
  const s = useNav.getState();
  const view = describeView({ center: s.center, fov: s.fov, surveyId: s.displayedLayer?.surveyId ?? s.surveyId, targets: s.targets });
  return `Right now: ${view.place} · ${view.telescope}`;
}

export function SimpleHud({ onReplayIntro }: { onReplayIntro: () => void }) {
  useGameEvents();
  const router = useRouter();
  const sheet = useUi((s) => s.sheet);
  const tourOpen = useUi((s) => s.tourOpen);
  const cropOpen = useUi((s) => s.cropOpen);
  const selected = useNav((s) => s.selected);
  const locked = useNav((s) => s.locked);
  const ui = useUi.getState();
  const { step, place, flying, destination } = useJourney();
  /** True from the Compare click until the Compare page is on screen (seconds when the archive is slow). */
  const [opening, startOpening] = useTransition();

  // Step 3 links back here with ?sheet=places to start over at step 1.
  useEffect(() => {
    if (new URLSearchParams(window.location.search).get('sheet') === 'places') useUi.getState().openSheet('places');
  }, []);

  const choosePlace = () => ui.openSheet('places');

  /** Step 3: straight to every SPHEREx photo of the square in the middle of the screen. */
  const goCompare = () => {
    // Mid-flight the square is not on the place yet; the button is disabled then, and so is this path.
    if (isFlying()) return;
    ui.closeSheet();
    const url = comparisonUrl(useNav.getState(), compareSize());
    startOpening(() => router.push(place ? `${url}&name=${encodeURIComponent(place)}` : url));
  };

  const openFigurine = (id: FigurineId) => {
    if (id === 'compare') {
      if (step === 2) goCompare();
      else choosePlace();
      return;
    }
    if (id === 'challenge') {
      router.push('/compare?challenge=weekly');
      return;
    }
    const target = SHEET_FOR[id];
    if (target) ui.toggleSheet(target);
  };

  const startTour = () => {
    ui.closeSheet();
    ui.setTourOpen(true);
  };

  // The details card would duplicate the Settings sheet's target section and sit under right-hand sheets.
  const showDetails = (selected || locked) && sheet !== 'settings' && sheet !== 'explain' && sheet !== 'guide';

  return (
    <div className={`hud ${styles.root}`}>
      <SkyLabels /><Reticle /><HoverTooltip />
      <header className={styles.topBar}>
        <div className={styles.brand}>
          <span className="brand-mark" aria-hidden="true" />
          <h1>SPHEREx Sky Navigator</h1>
        </div>
        <div className={styles.search} data-tour="search">
          <SearchBox hint="Try a name like Andromeda or M101." />
        </div>
        <div className={styles.actions}>
          <button type="button" className={styles.pill} data-tour="settings" aria-pressed={sheet === 'settings'}
            aria-label="Settings and details" onClick={() => ui.toggleSheet('settings')}>
            <span className={styles.emoji} aria-hidden="true">⚙️</span><span className={styles.pillText}>Settings</span>
          </button>
        </div>
      </header>

      {showDetails && <div className={styles.details}><SidePanel /></div>}

      {step === 2 && !cropOpen && <CompareArea />}
      {/* Stays up during the guided tour: its "next step" stop points at this card. */}
      {!sheet && !cropOpen && (
        <NextStep step={step} place={place} flying={flying} opening={opening} destination={destination} onChoosePlace={choosePlace} onCompare={goCompare}
          onTelescope={() => ui.openSheet('telescope')} onAdjust={() => ui.setCropOpen(true)} />
      )}

      <div className={styles.bottom}>
        <LayerAlert />
        <Caption />
        <div className={styles.dockRow}>
          <FigurineDock onOpen={openFigurine} active={sheet ? FIGURINE_FOR[sheet] ?? null : null} />
          <button type="button" className={styles.home} data-tour="home" onClick={resetView}
            aria-label="Back to the start view" title="Back to the start view (Home)">
            <span className={styles.emoji} aria-hidden="true">🏠</span><span className={styles.homeLabel}>Home</span>
          </button>
        </div>
      </div>

      <PlacesSheet open={sheet === 'places'} onClose={ui.closeSheet} />
      <SkyEditor open={sheet === 'telescope'} onClose={ui.closeSheet} />
      <WhatYoureSeeing screen="navigator" open={sheet === 'explain'} onClose={ui.closeSheet} onStartTour={startTour}
        contextLine={sheet === 'explain' ? currentContextLine() : undefined} />
      <FieldGuideSheet open={sheet === 'guide'} onClose={ui.closeSheet} />
      <SettingsSheet open={sheet === 'settings'} onClose={ui.closeSheet}
        onUnlockAll={() => useGame.getState().unlockAll()}
        onResetProgress={() => useGame.getState().reset()}
        onReplayIntro={onReplayIntro} />
      <CropSelector showButton={false} />
      <UnlockToast onTry={openFigurine} />
      <TourOverlay steps={HELP.navigator.steps} open={tourOpen} onClose={() => ui.setTourOpen(false)} />
      <StatusLine /><PositionAnnouncer /><Dialogs />
    </div>
  );
}
