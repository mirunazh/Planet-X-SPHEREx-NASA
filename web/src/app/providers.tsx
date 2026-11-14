'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Theme } from '@astryxdesign/core/theme';
import { LinkProvider } from '@astryxdesign/core/Link';
import { skyblinkBuilt, skyblinkCss } from '@/theme/skyblink';

const STYLE_ID = 'skyblink-theme';

// The theme CSS is generated during the server render and shipped in the HTML, so the first paint is
// already themed. (defineTheme is client-only code, so a server component cannot do this.) The
// browser reuses the shipped text instead of generating it a second time.
function ThemeStyle() {
  const [css] = useState(() => (typeof document === 'undefined' ? null : document.getElementById(STYLE_ID)?.textContent) ?? skyblinkCss());
  return <style id={STYLE_ID} dangerouslySetInnerHTML={{ __html: css }} />;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Theme theme={skyblinkBuilt} mode="dark">
      <ThemeStyle />
      <LinkProvider component={Link}>{children}</LinkProvider>
    </Theme>
  );
}
