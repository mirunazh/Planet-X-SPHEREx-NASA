import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import './globals.css';

export const metadata: Metadata = {
  title: 'SPHEREx Sky Navigator',
  description:
    'Fly around the infrared sky seen by NASA SPHEREx and pick any position without typing coordinates. Built only on NASA data.',
};

export const viewport: Viewport = {
  themeColor: '#03050b',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
