import type { NextConfig } from 'next';

const isProduction = process.env.NODE_ENV === 'production';

// Images and tiles come only from NASA/IPAC IRSA; everything else is same-origin.
const contentSecurityPolicy = [
  "default-src 'self'",
  "img-src 'self' data: blob: https://irsa.ipac.caltech.edu",
  "connect-src 'self' https://irsa.ipac.caltech.edu",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "worker-src 'self' blob:",
  "font-src 'self' data:",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join('; ');

const nextConfig: NextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  poweredByHeader: false,
  async headers() {
    const headers = [
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
      { key: 'X-Frame-Options', value: 'DENY' },
    ];
    if (isProduction) headers.push({ key: 'Content-Security-Policy', value: contentSecurityPolicy });
    return [{ source: '/:path*', headers }];
  },
};

export default nextConfig;
