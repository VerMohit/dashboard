import bundleAnalyzer from '@next/bundle-analyzer';
import { config } from 'dotenv';

config();

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

export default withBundleAnalyzer({
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
  },
  env: {
    DATABASE_URL: process.env.DATABASE_URL,  // Make sure DATABASE_URL is passed here
  },
});
