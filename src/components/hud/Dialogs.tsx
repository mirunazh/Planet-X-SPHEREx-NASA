'use client';

import { type ReactNode, useCallback, useEffect, useRef } from 'react';
import { useNav } from '@/lib/store';
import { PLATFORM_CREDITS, SURVEYS, SURVEY_ORDER } from '@/lib/sky/surveys';
import { PLANET_SOURCES } from '@/lib/sky/planets';
import { INTRO_IMAGE_SOURCES } from '@/components/intro/imagery';

function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const dialog = dialogRef.current;
    dialog?.showModal();
    return () => {
      dialog?.close();
      previous?.focus?.();
    };
  }, []);
  return (
    <dialog ref={dialogRef} className="modal panel" aria-labelledby="modal-title" onCancel={(e) => { e.preventDefault(); onClose(); }} onClick={(e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      if (e.target === e.currentTarget && (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom)) onClose();
    }}>
      <header className="panel-head">
        <h2 id="modal-title">{title}</h2>
        <button autoFocus className="icon-btn" onClick={onClose} aria-label="Close dialog">
          ×
        </button>
      </header>
      <div className="modal-body">{children}</div>
    </dialog>
  );
}

function Credits() {
  const retrievedAt = useNav((s) => s.dataRetrievedAt);
  return (
    <>
      <p>
        Sky images stream from NASA/IPAC IRSA. Featured places and exoplanet hosts use bundled position snapshots; other galaxy names are looked up in NED.
        Reference directions use the coordinate definitions recorded with each target.
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
      <h3>Solar System intro</h3>
      {[...PLANET_SOURCES, ...INTRO_IMAGE_SOURCES].map((c) => (
        <p key={c.label}>
          <strong>{c.label}.</strong> {c.text}{' '}
          <a href={c.url} target="_blank" rel="noreferrer">
            Link
          </a>
        </p>
      ))}
      <h3>Software</h3>
      <p className="muted small">Next.js, React, three.js, React Three Fiber, @hscmap/healpix, zustand (all MIT licensed).</p>
      <p className="muted small">NASA does not endorse this project. NASA data is used under NASA&apos;s media and data use guidelines.</p>
    </>
  );
}

function Help() {
  return (
    <>
      <h3>Moving around</h3>
      <ul>
        <li>
          <strong>Drag</strong> to pan around the sky. The point you grab stays under your pointer.
        </li>
        <li>
          <strong>Scroll</strong> on a mouse or trackpad, or <strong>pinch with two fingers</strong> on a touch screen to zoom. The field of view stays between 0.05° and 100°.
        </li>
        <li>
          <strong>Double-click</strong> to fly to a point. <strong>Click a pin</strong> for details.
        </li>
        <li>
          Keys: arrows pan, <kbd>+</kbd>/<kbd>−</kbd> zoom, <kbd>Enter</kbd> lock, <kbd>G</kbd> grid, <kbd>Home</kbd> (or <kbd>R</kbd>) reset,{' '}
          <kbd>Esc</kbd> stop motion and close details or help.
        </li>
      </ul>
      <h3>Try an exploration</h3>
      <ol>
        <li>Open <strong>Places</strong> and choose Andromeda, or search for <strong>M31</strong>. On desktop, featured places are in the left rail.</li>
        <li>Open <strong>Layers</strong> and compare SPHEREx wavelengths, then try the 2MASS or AllWISE colour composites.</li>
        <li>The loading message names the requested layer and the image still on screen. Image sources follow the layer actually displayed.</li>
        <li>Use <strong>Share view</strong> to copy the current coordinates, zoom and selected layer. The link reopens the view; it does not restore a target lock.</li>
      </ol>
      <h3>Search formats</h3>
      <p>Search featured places or host stars by name. Other galaxy names use NED. Enter ICRS coordinates as decimal degrees, for example <code>10.68, +41.27</code>, or hours and degrees: <code>00 42 44 +41 16 09</code>.</p>
      <details>
        <summary>How positions and precision work</summary>
        <h3>Coordinates</h3>
        <p>
          The view-centre coordinate is calculated from your viewing direction. Named targets use catalogue positions. You sit at the centre of a sphere aligned with the ICRS sky frame, and the direction you look at is converted
          directly into right ascension and declination: RA = atan2(y, x), Dec = asin(z). NASA&apos;s images are already registered to the same
          frame, and each HiPS tile&apos;s file name is its HEALPix sky address, so every image lands exactly where it belongs.
        </p>
        <h3>Panoramic sky</h3>
        <p>
          You always look out from inside the sky, with north up and east to the left. Reset returns to the opening direction at a 60° field of
          view. The coordinate grid starts hidden; press <kbd>G</kbd> to toggle it.
        </p>
        <h3>Precision</h3>
        <p>
          Digits follow the real uncertainty: the larger of one screen pixel and one survey pixel (SPHEREx 12.9″, AllWISE 1.6″, 2MASS 0.8″). Lock
          becomes available at a 1° field of view or closer, once the selected sky layer is ready.
        </p>
      </details>
    </>
  );
}

export function Dialogs() {
  const panel = useNav((s) => s.panel);
  const close = useCallback(() => useNav.getState().setPanel('none'), []);
  if (panel === 'credits')
    return (
      <Modal title="Data and credits" onClose={close}>
        <Credits />
      </Modal>
    );
  if (panel === 'help')
    return (
      <Modal title="Explore the sky" onClose={close}>
        <Help />
      </Modal>
    );
  return null;
}
