'use client';

import { useEffect, useState } from 'react';
import { useNav } from '@/lib/store';
import { buildViewUrl } from '@/lib/urlState';
import { loadUiPreferences, markIntroSeen, shouldShowIntro, useUi } from '@/lib/ui';
import { SpherexIntro } from '@/components/intro/SpherexIntro';
import { CoordinateReadout, PositionAnnouncer } from './CoordinateReadout';
import { SearchBox } from './SearchBox';
import { LayerPanel } from './LayerPanel';
import { LayerStatus } from './LayerStatus';
import { DemoPlaces } from './DemoPlaces';
import { CopyButton } from './CopyButton';
import { Dock } from './Dock';
import { SidePanel } from './SidePanel';
import { HoverTooltip, Reticle, SkyLabels, StatusLine } from './Overlays';
import { Dialogs } from './Dialogs';
import { SimpleHud } from './SimpleHud';
import { CropSelector } from '@/components/comparison/CropSelector';

type MobilePanel = 'layers' | 'places' | 'details';

function TopBar({ onNavigate }: { onNavigate: () => void }) {
  const setPanel = useNav((s) => s.setPanel);
  return (
    <header className="topbar">
      <div className="brand panel">
        <span className="brand-mark" aria-hidden="true" />
        <div><h1>SPHEREx Sky Navigator</h1><p>Explore the infrared sky</p></div>
      </div>
      <SearchBox onNavigate={onNavigate} />
      <nav className="top-actions" aria-label="Information and sharing">
        <CropSelector />
        <CopyButton label="Share view" text={() => buildViewUrl(useNav.getState(), window.location.href)} />
        <button className="btn ghost" onClick={() => setPanel('help')}>Help</button>
        <button className="btn ghost" onClick={() => setPanel('credits')}>Sources</button>
        <button className="btn" onClick={() => useUi.getState().setExpertLayout(false)}>Simple view</button>
      </nav>
    </header>
  );
}

/** Dominic's original full layout: every control at once. Reached from Settings → Expert layout. */
function ExpertHud() {
  const [mobilePanel, setMobilePanel] = useState<MobilePanel | null>(null);
  const selected = useNav((s) => s.selected);
  const locked = useNav((s) => s.locked);
  useEffect(() => {
    if (selected || locked) setMobilePanel('details');
    else setMobilePanel((current) => current === 'details' ? null : current);
  }, [selected, locked]);
  const showDetails = () => setMobilePanel('details');
  const closePanel = () => {
    setMobilePanel(null);
    document.getElementById(`toggle-${mobilePanel}`)?.focus();
  };
  return (
    <div className={`hud mobile-${mobilePanel ?? 'none'}`}>
      <SkyLabels /><Reticle /><HoverTooltip />
      <TopBar onNavigate={showDetails} />
      <aside className="hud-rail left-rail" aria-label="Layers and featured places">
        <LayerPanel /><DemoPlaces onVisit={showDetails} />
      </aside>
      <aside className="hud-rail right-rail" aria-label="Target and navigation">
        <SidePanel /><Dock />
      </aside>
      {mobilePanel && <div className="mobile-panel-close"><button className="btn" onClick={closePanel}>Back to sky</button></div>}
      <div className="view-summary">
        <CoordinateReadout />
        <div className="mobile-layer-status panel"><LayerStatus /></div>
      </div>
      <nav className="mobile-controls panel" aria-label="Sky panels">
        {(['layers', 'places', 'details'] as const).map((panel) => (
          <button key={panel} id={`toggle-${panel}`} className="btn ghost" aria-expanded={mobilePanel === panel}
            aria-controls={panel === 'details' && !selected && !locked ? undefined : `${panel}-panel`}
            disabled={panel === 'details' && !selected && !locked}
            onClick={() => setMobilePanel((current) => current === panel ? null : panel)}>
            {panel === 'layers' ? 'Layers' : panel === 'places' ? 'Places' : 'Details'}
          </button>
        ))}
      </nav>
      <StatusLine /><PositionAnnouncer /><Dialogs />
    </div>
  );
}

export function Hud() {
  const expert = useUi((s) => s.expertLayout);
  const introOpen = useUi((s) => s.introOpen);

  useEffect(() => {
    loadUiPreferences();
    if (shouldShowIntro()) useUi.getState().setIntroOpen(true);
  }, []);

  const finishIntro = () => {
    markIntroSeen();
    useUi.getState().setIntroOpen(false);
    document.querySelector<HTMLElement>('[data-tour="sky"]')?.focus();
  };

  return (
    <>
      {expert ? <ExpertHud /> : <SimpleHud onReplayIntro={() => useUi.getState().setIntroOpen(true)} />}
      {introOpen && <SpherexIntro onDone={finishIntro} />}
    </>
  );
}
