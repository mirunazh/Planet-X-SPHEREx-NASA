import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { Footer } from '@/components/Footer';
import { S } from '@/lib/strings';
import { color } from '@/theme/tokens';

// next/font downloads the files at build time and serves them from this site: no font CDN at run time.
const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' });

export const metadata: Metadata = { title: S.pageTitle, description: S.pageDescription };
export const viewport: Viewport = { themeColor: color.bg, colorScheme: 'dark' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" data-astryx-theme="skyblink" className={`${inter.variable} ${mono.variable}`}>
      <body>
        <Providers>
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
