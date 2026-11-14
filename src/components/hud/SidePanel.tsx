'use client';

/** Details for a selected pin, or the locked SkyTarget handed to the image pipeline. */
import { useState } from 'react';
import { type Pin, useNav } from '@/lib/store';
import { flyTo } from '@/lib/navigation';
import { formatDec, formatDegrees, formatRA, formatUncertainty, formatAngle } from '@/lib/sky/format';
import type { SkyTarget } from '@/lib/sky/target';

function CopyButton({ label, text }: { label: string; text: () => string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      className="btn ghost"
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
          <p className="eyebrow">{pin.kind === 'host' ? 'Exoplanet host star' : pin.targetKind?.replace('-', ' ')}</p>
          <h2>{pin.name}</h2>
        </div>
        <button className="icon-btn" onClick={close} aria-label="Close details">
          ×
        </button>
      </header>
      {pin.description && <p>{pin.description}</p>}
      <dl className="facts">
        <dt>RA / Dec</dt>
        <dd className="mono">
          {formatRA(pin.ra, 1)} {formatDec(pin.dec, 1)}
        </dd>
        {pin.kind === 'host' && (
          <>
            <dt>Planets</dt>
            <dd>
              {pin.planetCount ?? pin.planets?.length}: {pin.planets?.slice(0, 6).join(', ')}
              {(pin.planets?.length ?? 0) > 6 ? '…' : ''}
            </dd>
            {pin.distPc != null && (
              <>
                <dt>Distance</dt>
                <dd>
                  {pin.distPc.toLocaleString('en-US')} pc ({(pin.distPc * 3.26156).toLocaleString('en-US', { maximumFractionDigits: 1 })} light-years)
                </dd>
              </>
            )}
            {pin.kmag != null && (
              <>
                <dt>Ks magnitude</dt>
                <dd>{pin.kmag}</dd>
              </>
            )}
            {pin.firstDiscovery != null && (
              <>
                <dt>First discovery</dt>
                <dd>
                  {pin.firstDiscovery}
                  {pin.facilities?.length ? `, ${pin.facilities.slice(0, 2).join('; ')}` : ''}
                </dd>
              </>
            )}
          </>
        )}
        <dt>Source</dt>
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
        <button className="btn primary" onClick={() => flyTo(pin.vec, pin.fov, 'pin')}>
          Fly here
        </button>
        <button className="btn ghost" onClick={close}>
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
          <p className="eyebrow">Target locked · ICRS</p>
          <h2 className="mono">
            {formatRA(target.ra, u)} {formatDec(target.dec, u)}
          </h2>
        </div>
        <button className="icon-btn" onClick={() => useNav.setState({ locked: null })} aria-label="Release target">
          ×
        </button>
      </header>
      <dl className="facts">
        <dt>Decimal</dt>
        <dd className="mono">
          {formatDegrees(target.ra, u)}°, {formatDegrees(target.dec, u)}°
        </dd>
        <dt>Galactic</dt>
        <dd className="mono">
          l {formatDegrees(target.galactic.l, u)}°, b {formatDegrees(target.galactic.b, u)}°
        </dd>
        <dt>Uncertainty</dt>
        <dd>{formatUncertainty(u)}</dd>
        <dt>Field of view</dt>
        <dd>{formatAngle(target.fovDeg)}</dd>
        <dt>HEALPix</dt>
        <dd className="mono">
          order {target.healpix.order}, nested {target.healpix.ipix}
        </dd>
        <dt>Layer</dt>
        <dd>
          {target.layer.survey}
          {target.layer.wavelengthUm ? ` at ${target.layer.wavelengthUm} µm` : ''}
        </dd>
        <dt>Origin</dt>
        <dd>{target.origin}</dd>
      </dl>
      <p className="muted small">Ready for the image pipeline: this target selects the cutouts compared across SPHEREx, NEOWISE, WISE and 2MASS.</p>
      <div className="row">
        <CopyButton label="Copy JSON" text={() => JSON.stringify(target, null, 2)} />
        <CopyButton label="Copy link" text={() => window.location.href} />
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
