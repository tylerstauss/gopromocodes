/** @type {import('next').NextConfig} */
const path = require('path')

const nextConfig = {
  // Environment variables are loaded from .env automatically
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    domains: ['images.unsplash.com'], // Add any image domains you're using
  },
  distDir: '.next',
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client', 'bcrypt']
  },
  transpilePackages: ['@prisma/client'],
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
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals = [...(config.externals || []), '@prisma/client']
    }
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname),
      '@/lib': path.resolve(__dirname, 'lib'),
      '@/components': path.resolve(__dirname, 'components'),
      'lib': path.resolve(__dirname, 'lib'),
      'components': path.resolve(__dirname, 'components')
    }
    return config
  }
}

module.exports = nextConfig 