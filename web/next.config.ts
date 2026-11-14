import path from 'node:path';
import type { NextConfig } from 'next';

// The root is set explicitly: a package-lock.json higher up the tree would otherwise be taken
// as the workspace root. It is the repository root, not web/, so that the linked
// ../packages/spherex-core and ../packages/missions-core (TypeScript source) can be compiled.
const repoRoot = path.join(__dirname, '..');

const nextConfig: NextConfig = {
  reactStrictMode: true,
  turbopack: {
    root: repoRoot,
    rules: {
      '*.ts': {
        condition: { path: /packages\/(spherex|missions)-core\/src\// },
        loaders: ['./scripts/strip-js-ext-loader.cjs'],
        as: '*.ts',
      },
    },
  },
  outputFileTracingRoot: repoRoot,
  transpilePackages: ['spherex-core', 'missions-core'],
  // Next 16 otherwise writes an AGENTS.md into the app folder on `next dev`.
  agentRules: false,
  devIndicators: false,
};

export default nextConfig;
