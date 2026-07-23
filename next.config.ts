import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactCompiler: true,
  async rewrites() {
    return [
      {
        source: '/api/blogs/search',
        destination: '/api/blogs',
      },
    ];
  },
};

export default nextConfig;
