import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // A package-lock.json higher up the tree would otherwise be taken as the workspace root.
  turbopack: { root: __dirname },
  // Next 16 otherwise writes an AGENTS.md into the app folder on `next dev`.
  agentRules: false,
  devIndicators: false,
};

export default nextConfig;
