'use client';

import { type ReactNode, useEffect, useRef } from 'react';
import { useNav } from '@/lib/store';
import { PLATFORM_CREDITS, SURVEYS, SURVEY_ORDER } from '@/lib/sky/surveys';
import { FIELD_GUIDE } from './hints';

function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: ReactNode }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose();
      }
    };
    window.addEventListener('keydown', onKey, true);
    return () => {
      window.removeEventListener('keydown', onKey, true);
      previous?.focus?.();
    };
  }, [onClose]);
  return (
    <div className="modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal panel" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <header className="panel-head">
          <h2 id="modal-title">{title}</h2>
          <button ref={closeRef} className="icon-btn" onClick={onClose} aria-label="Close">
            ×
          </button>
        </header>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}

function Credits() {
  const retrievedAt = useNav((s) => s.dataRetrievedAt);
  return (
    <>
      <p>
        Everything you see is NASA data, loaded live from NASA archives: sky images from the NASA/IPAC Infrared Science Archive (IRSA), pins from
        the NASA Exoplanet Archive, galaxy names from NED.
      </p>
      <h3>Sky surveys</h3>
      {SURVEY_ORDER.map((id) => (
        <article key={id} className="credit">
          <h4>
            {SURVEYS[id].name} <span className="muted">({SURVEYS[id].mission}, {SURVEYS[id].epoch})</span>
          </h4>
          {SURVEYS[id].credits.map((c) => (
            <p key={c.label}>
              {c.text}{' '}
              {c.doi && (
                <>
                  DOI{' '}
                  <a href={`https://doi.org/${c.doi}`} target="_blank" rel="noreferrer">
                    {c.doi}
                  </a>
                  .{' '}
                </>
              )}
              <a href={c.url} target="_blank" rel="noreferrer">
                Source
              </a>
            </p>
          ))}
        </article>
      ))}
      <h3>Archives and standards</h3>
      {PLATFORM_CREDITS.map((c) => (
        <p key={c.label}>
          <strong>{c.label}.</strong> {c.text}{' '}
          <a href={c.url} target="_blank" rel="noreferrer">
            Link
          </a>
        </p>
      ))}
      {retrievedAt && <p className="muted small">Pin data snapshot retrieved {new Date(retrievedAt).toUTCString()}.</p>}
      <h3>Software</h3>
      <p className="muted small">Next.js, React, three.js, React Three Fiber, @hscmap/healpix, zustand (all MIT licensed).</p>
      <p className="muted small">NASA does not endorse this project. NASA data is used under NASA&apos;s media and data use guidelines.</p>
    </>
  );
}

function FieldGuide() {
  return (
    <>
      <h3>Field guide</h3>
      <p className="muted small">On a computer, hover over any element for the same short explanation.</p>
      {FIELD_GUIDE.map((section) => (
        <section key={section.title} className="guide-section">
          <h4>{section.title}</h4>
          <dl className="guide">
            {section.items.map(([term, text]) => (
              <div key={term} className="guide-row">
                <dt>{term}</dt>
                <dd>{text}</dd>
              </div>
            ))}
          </dl>
        </section>
      ))}
    </>
  );
}

function Help() {
  return (
    <>
      <FieldGuide />
      <h3>Moving around</h3>
      <ul>
        <li>
          <strong>Drag</strong> to turn the globe or the sky. The point you grab stays under your pointer.
        </li>
        <li>
          <strong>Scroll or pinch</strong> to zoom around the pointer. Zoom into the globe to fly inside the sky.
        </li>
        <li>
          <strong>Double-click</strong> to fly to a point. <strong>Click a pin</strong> for details.
        </li>
        <li>
          Keys: arrows pan, <kbd>+</kbd>/<kbd>−</kbd> zoom, <kbd>S</kbd> globe/sky, <kbd>Enter</kbd> lock, <kbd>G</kbd> grid, <kbd>R</kbd> reset,{' '}
          <kbd>Esc</kbd> close.
        </li>
      </ul>
      <h3>Where the coordinates come from</h3>
      <p>
        No coordinate is looked up. You sit at the centre of a sphere aligned with the ICRS sky frame, and the direction you look at is converted
        directly into right ascension and declination: RA = atan2(y, x), Dec = asin(z). NASA&apos;s images are already registered to the same
        frame, and each HiPS tile&apos;s file name is its HEALPix sky address, so every image lands exactly where it belongs.
      </p>
      <h3>Why the globe looks mirrored</h3>
      <p>
        From outside, a celestial globe shows the sky mirror-reversed. When you fly inside, the view flips to the true sky: north up, east to the
        left.
      </p>
      <h3>Precision</h3>
      <p>
        Digits follow the real uncertainty: the larger of one screen pixel and one survey pixel (SPHEREx 12.9″, AllWISE 1.6″, 2MASS 0.8″). Lock
        becomes available below a 1° field of view.
      </p>
    </>
  );
}

export function Dialogs() {
  const panel = useNav((s) => s.panel);
  const close = () => useNav.getState().setPanel('none');
  if (panel === 'credits')
    return (
      <Modal title="Data and credits" onClose={close}>
        <Credits />
      </Modal>
    );
  if (panel === 'help')
    return (
      <Modal title="How it works and field guide" onClose={close}>
        <Help />
      </Modal>
    );
  return null;
}
