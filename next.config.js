/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable standalone output for Docker deployment
  output: 'standalone',
  typescript: {
    // In production, type errors should be fixed before deployment
    ignoreBuildErrors: process.env.NODE_ENV === 'development',
  },
  eslint: {
    // In production, ESLint errors should be fixed before deployment
    ignoreDuringBuilds: process.env.NODE_ENV === 'development',
  },
  // Image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    unoptimized: true, // For better compatibility with AWS
  },
  // Compression
  compress: true,
  // Bundle analyzer
  ...(process.env.ANALYZE === 'true' && {
    webpack: (config, { isServer }) => {
      if (!isServer) {
        const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
        config.plugins.push(
          new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            openAnalyzer: false,
          })
        );
      }
      return config;
    },
  }),
  // Fix for localStorage SSR issues
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Don't resolve fs on client side to prevent localStorage conflicts
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
      };
    }
    return config;
  },
  // Fix localStorage injection issues
  serverExternalPackages: ['@prisma/client'],
}

module.exports = nextConfig 