/** @type {import('next').NextConfig} */

// Force clean build - v1 [timestamp: ${new Date().toISOString()}]
const nextConfig = {
  // Environment variables are loaded from .env automatically
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    domains: ['images.unsplash.com'], // Add any image domains you're using
  },
  distDir: '.next',
  // Ensure CSS processing is enabled
  optimizeFonts: true,
  compiler: {
    // Enables the styled-components plugin
    styledComponents: true,
  },
  experimental: {
    // Optimize CSS loading
    optimizeCss: true,
    // Force full CSS optimization
    optimizeServerReact: true,
    // Clear module cache between builds
    incrementalCacheHandlerPath: false
  },
  // Enable static exports if needed
  // output: 'export',
  // Configure redirects if needed
  // async redirects() {
  //   return [
  //     {
  //       source: '/old-path',
  //       destination: '/new-path',
  //       permanent: true,
  //     },
  //   ]
  // },
  // Ensure CSS is properly handled
  webpack: (config, { dev, isServer }) => {
    // Only run CSS optimization in production and client builds
    if (!dev && !isServer) {
      config.optimization.splitChunks.cacheGroups.styles = {
        name: 'styles',
        test: /\.(css|scss)$/,
        chunks: 'all',
        enforce: true,
        reuseExistingChunk: false // Disable chunk reuse
      };
    }
    return config;
  },
}

module.exports = nextConfig 