import Link from 'next/link';
import { S } from '@/lib/strings';

/** Instrument header: the product mark (links home) and an optional link on the right. */
export function TopBar({ children }: { children?: React.ReactNode }) {
  return (
    <header className="topbar">
      <Link href="/" className="brand" aria-label={`${S.appName}, ${S.home}`}>
        <svg width="28" height="28" viewBox="0 0 32 32" aria-hidden="true">
          <rect x="0.5" y="0.5" width="31" height="31" rx="6.5" fill="var(--sb-surface)" stroke="var(--sb-border-strong)" />
          <circle cx="9.5" cy="20" r="2.8" fill="var(--sb-text-faint)" />
          <circle cx="19.5" cy="13" r="3.4" fill="var(--sb-text)" />
          <circle cx="19.5" cy="13" r="7.6" fill="none" stroke="var(--sb-accent)" strokeWidth="2" />
        </svg>
        <span>{S.appName}</span>
      </Link>
      {children}
    </header>
  );
}
