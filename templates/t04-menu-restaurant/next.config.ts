import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Xedo product/collection media (cover + gallery).
      { protocol: 'https', hostname: 'api.minio.xedoapp.com' },
      { protocol: 'https', hostname: 'cdn.xedoapp.com' },
      { protocol: 'https', hostname: 'systems.xedoapp.com' },
    ],
  },
};

export default nextConfig;
