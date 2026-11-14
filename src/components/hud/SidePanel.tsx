'use client';

/** Details for a selected pin, or the locked SkyTarget handed to the image pipeline. */
import { useState } from 'react';
import { type Pin, useNav } from '@/lib/store';
import { flyTo } from '@/lib/navigation';
import { formatAngle, formatDec, formatDegrees, formatRA, formatUncertainty } from '@/lib/sky/format';
import type { SkyTarget } from '@/lib/sky/target';
import { HINT } from './hints';

function CopyButton({ label, hint, text }: { label: string; hint: string; text: () => string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      className="btn ghost"
      data-hint={hint}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text());
          setDone(true);
          setTimeout(() => setDone(false), 1500);
        } catch {
          setDone(false);
        }
      }}
    >
      {done ? 'Copied' : label}
    </button>
  );
}

function PinCard({ pin }: { pin: Pin }) {
  const close = () => useNav.setState({ selected: null });
  return (
    <section className="side panel" aria-label={`Details: ${pin.name}`}>
      <header className="panel-head">
        <div>
          <p className="eyebrow" data-hint={HINT.kind}>
            {pin.kind === 'host' ? 'Exoplanet host star' : pin.targetKind?.replace('-', ' ')}
          </p>
          <h2>{pin.name}</h2>
        </div>
        <button className="icon-btn" onClick={close} aria-label="Close details" data-hint={HINT.close}>
          ×
        </button>
      </header>
      {pin.description && <p>{pin.description}</p>}
      <dl className="facts">
        <dt data-hint={HINT.position}>RA / Dec</dt>
        <dd className="mono">
          {formatRA(pin.ra, 1)} {formatDec(pin.dec, 1)}
        </dd>
        {pin.kind === 'host' && (
          <>
            <dt data-hint={HINT.planets}>Planets</dt>
            <dd>
              {pin.planetCount ?? pin.planets?.length}: {pin.planets?.slice(0, 6).join(', ')}
              {(pin.planets?.length ?? 0) > 6 ? '…' : ''}
            </dd>
            {pin.distPc != null && (
              <>
                <dt data-hint={HINT.distance}>Distance</dt>
                <dd>
                  {pin.distPc.toLocaleString('en-US')} pc ({(pin.distPc * 3.26156).toLocaleString('en-US', { maximumFractionDigits: 1 })} light-years)
                </dd>
              </>
            )}
            {pin.kmag != null && (
              <>
                <dt data-hint={HINT.kmag}>Ks magnitude</dt>
                <dd>{pin.kmag}</dd>
              </>
            )}
            {pin.firstDiscovery != null && (
              <>
                <dt data-hint={HINT.discovery}>First discovery</dt>
                <dd>
                  {pin.firstDiscovery}
                  {pin.facilities?.length ? `, ${pin.facilities.slice(0, 2).join('; ')}` : ''}
                </dd>
              </>
            )}
          </>
        )}
        <dt data-hint={HINT.source}>Source</dt>
        <dd>
          {pin.source?.url ? (
            <a href={pin.source.url} target="_blank" rel="noreferrer">
              {pin.source.service}
            </a>
          ) : (
            pin.source?.service
          )}
          {pin.source?.resolvedName ? ` (${pin.source.resolvedName})` : ''}
        </dd>
      </dl>
      <div className="row">
        <button className="btn primary" onClick={() => flyTo(pin.vec, pin.fov, 'pin')} data-hint={HINT.flyHere}>
          Fly here
        </button>
        <button className="btn ghost" onClick={close} data-hint={HINT.close}>
          Close
        </button>
      </div>
    </section>
  );
}

function LockedCard({ target }: { target: SkyTarget }) {
  const u = target.uncertaintyArcsec;
  return (
    <section className="side panel locked" aria-label="Locked target">
      <header className="panel-head">
        <div>
          <p className="eyebrow" data-hint={HINT.locked}>
            Target locked · ICRS
          </p>
          <h2 className="mono">
            {formatRA(target.ra, u)} {formatDec(target.dec, u)}
          </h2>
        </div>
        <button className="icon-btn" onClick={() => useNav.setState({ locked: null })} aria-label="Release target" data-hint={HINT.release}>
          ×
        </button>
      </header>
      <dl className="facts">
        <dt data-hint={HINT.decimal}>Decimal</dt>
        <dd className="mono">
          {formatDegrees(target.ra, u)}°, {formatDegrees(target.dec, u)}°
        </dd>
        <dt data-hint={HINT.galactic}>Galactic</dt>
        <dd className="mono">
          l {formatDegrees(target.galactic.l, u)}°, b {formatDegrees(target.galactic.b, u)}°
        </dd>
        <dt data-hint={HINT.uncertainty}>Uncertainty</dt>
        <dd>{formatUncertainty(u)}</dd>
        <dt data-hint={HINT.fov}>Field of view</dt>
        <dd>{formatAngle(target.fovDeg)}</dd>
        <dt data-hint={HINT.healpix}>HEALPix</dt>
        <dd className="mono">
          order {target.healpix.order}, nested {target.healpix.ipix}
        </dd>
        <dt data-hint={HINT.layer}>Layer</dt>
        <dd>
          {target.layer.survey}
          {target.layer.wavelengthUm ? ` at ${target.layer.wavelengthUm} µm` : ''}
        </dd>
        <dt data-hint={HINT.origin}>Origin</dt>
        <dd>{target.origin}</dd>
      </dl>
      <p className="muted small">Ready for the image pipeline: this target selects the cutouts compared across SPHEREx, NEOWISE, WISE and 2MASS.</p>
      <div className="row">
        <CopyButton label="Copy JSON" hint={HINT.copyJson} text={() => JSON.stringify(target, null, 2)} />
        <CopyButton label="Copy link" hint={HINT.copyLink} text={() => window.location.href} />
      </div>
    </section>
  );
}

export function SidePanel() {
  const selected = useNav((s) => s.selected);
  const locked = useNav((s) => s.locked);
  if (locked) return <LockedCard target={locked} />;
  if (selected) return <PinCard pin={selected} />;
  return null;
}
