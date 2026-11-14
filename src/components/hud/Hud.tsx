'use client';

import { useNav } from '@/lib/store';
import { CoordinateReadout, PositionAnnouncer } from './CoordinateReadout';
import { SearchBox } from './SearchBox';
import { LayerPanel } from './LayerPanel';
import { Dock } from './Dock';
import { SidePanel } from './SidePanel';
import { HoverTooltip, Reticle, SkyLabels, StatusLine } from './Overlays';
import { Dialogs } from './Dialogs';

function TopBar() {
  const setPanel = useNav((s) => s.setPanel);
  return (
    <header className="topbar">
      <div className="brand panel">
        <span className="brand-mark" aria-hidden="true" />
        <div>
          <h1>SPHEREx Sky Navigator</h1>
          <p>Infrared sky · NASA data only</p>
        </div>
      </div>
      <SearchBox />
      <nav className="top-actions" aria-label="Information">
        <button className="btn ghost panel" onClick={() => setPanel('help')}>
          How it works
        </button>
        <button className="btn ghost panel" onClick={() => setPanel('credits')}>
          Data &amp; credits
        </button>
      </nav>
    </header>
  );
}

export function Hud() {
  return (
    <div className="hud">
      <SkyLabels />
      <Reticle />
      <HoverTooltip />
      <TopBar />
      <SidePanel />
      <LayerPanel />
      <CoordinateReadout />
      <Dock />
      <StatusLine />
      <PositionAnnouncer />
      <Dialogs />
    </div>
  );
}
