'use client';

/**
 * The coordinate deduction, made visible: RA/Dec of the view centre in ICRS,
 * galactic l/b, field of view, and an honest uncertainty that sets how many
 * digits are shown (the larger of one screen pixel and one survey pixel).
 */
import { useEffect, useState } from 'react';
import { useNav } from '@/lib/store';
import { radecToGalactic, vecToRadec } from '@/lib/sky/coords';
import { formatAngle, formatDec, formatDegrees, formatRA, formatUncertainty } from '@/lib/sky/format';
import { SPHEREX_FRAMES, SURVEYS } from '@/lib/sky/surveys';
import { effectiveFov, pixelScaleDeg } from '@/lib/sky/view';

function useReadout() {
  const mode = useNav((s) => s.mode);
  const center = useNav((s) => s.center);
  const fov = useNav((s) => s.fov);
  const distance = useNav((s) => s.distance);
  const surveyId = useNav((s) => s.surveyId);
  const frame = useNav((s) => s.frame);
  const viewport = useNav((s) => s.viewport);
  const order = useNav((s) => s.activeOrder);

  const survey = SURVEYS[surveyId];
  const view = { mode, center, fov, distance };
  const cssPixelArcsec = pixelScaleDeg(view, Math.max(1, viewport.height)) * 3600;
  const devicePixelDeg = pixelScaleDeg(view, Math.max(1, viewport.height * viewport.dpr));
  const uncertainty = Math.max(cssPixelArcsec, survey.pixelScaleArcsec);
  const magnification = survey.pixelScaleArcsec / (devicePixelDeg * 3600);
  const { ra, dec } = vecToRadec(center);
  const { l, b } = radecToGalactic(ra, dec);
  return {
    mode,
    survey,
    frame: survey.isCube ? SPHEREX_FRAMES[frame] : null,
    ra,
    dec,
    l,
    b,
    fov: effectiveFov(view),
    uncertainty,
    detail: order === null ? 'preview' : magnification > 1.5 ? 'magnified' : 'native',
    magnification,
  };
}

export function CoordinateReadout() {
  const r = useReadout();
  return (
    <section className="readout panel" aria-label="Coordinates of the view centre">
      <div className="readout-main">
        <span className="coord">
          <abbr title="Right ascension (ICRS)">RA</abbr>
          <output>{formatRA(r.ra, r.uncertainty)}</output>
        </span>
        <span className="coord">
          <abbr title="Declination (ICRS)">Dec</abbr>
          <output>{formatDec(r.dec, r.uncertainty)}</output>
        </span>
      </div>
      <div className="readout-sub">
        <span title="Galactic longitude and latitude">
          l {formatDegrees(r.l, r.uncertainty)}° · b {formatDegrees(r.b, r.uncertainty)}°
        </span>
        <span title="Vertical field of view">FOV {formatAngle(r.fov)}</span>
        <span title="Positional uncertainty: the larger of one screen pixel and one survey pixel">
          {formatUncertainty(r.uncertainty)}
        </span>
        <span
          className={`chip ${r.detail === 'magnified' ? 'chip-warn' : ''}`}
          title={`${r.survey.shortName} native pixel: ${r.survey.pixelScaleArcsec}″`}
        >
          {r.detail === 'preview'
            ? 'Whole-sky preview'
            : r.detail === 'magnified'
              ? `Beyond native resolution ×${r.magnification.toFixed(1)}`
              : 'Native resolution'}
        </span>
      </div>
      <p className="readout-mode">
        {`Sky view: true orientation, north up, east left${r.frame ? ` · ${r.survey.shortName} λ ${r.frame.wavelengthUm.toFixed(3)} µm` : ` · ${r.survey.shortName}`}`}
      </p>
    </section>
  );
}

/** Announces the position to screen readers once the view settles (not every frame). */
export function PositionAnnouncer() {
  const center = useNav((s) => s.center);
  const [text, setText] = useState('');
  useEffect(() => {
    const t = setTimeout(() => {
      const { ra, dec } = vecToRadec(center);
      setText(`Sky view centred on right ascension ${formatRA(ra, 60)}, declination ${formatDec(dec, 60)}`);
    }, 900);
    return () => clearTimeout(t);
  }, [center]);
  return (
    <div className="sr-only" aria-live="polite">
      {text}
    </div>
  );
}
