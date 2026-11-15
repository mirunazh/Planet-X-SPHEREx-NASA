'use client';

import { useEffect } from 'react';

/** A render error anywhere below the root layout lands here instead of leaving a blank page. */
export default function Error({ error, retry }: { error: unknown; retry: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="boot" role="alert">
      <p>Something went wrong while drawing this page.</p>
      <p>
        <button type="button" className="btn" onClick={() => retry()}>
          Try again
        </button>{' '}
        {/* A full reload, not a client navigation: it also clears whatever state broke. */}
        <a className="btn" href="/">
          Back to the sky
        </a>
      </p>
    </main>
  );
}
