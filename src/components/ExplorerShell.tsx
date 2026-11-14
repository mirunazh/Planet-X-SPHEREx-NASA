'use client';

import dynamic from 'next/dynamic';

const SkyExplorer = dynamic(() => import('./SkyExplorer'), {
  ssr: false,
  loading: () => (
    <div className="boot" role="status">
      <div className="boot-ring" aria-hidden="true" />
      <p>Loading the infrared sky from NASA/IPAC IRSA…</p>
    </div>
  ),
});

export default function ExplorerShell() {
  return <SkyExplorer />;
}
