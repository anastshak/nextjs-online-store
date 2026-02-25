import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  cacheComponents: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.dummyjson.com',
        pathname: '/product-images/**',
      },
      {
        protocol: 'https',
        hostname: 'dummyjson.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
