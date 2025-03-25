/** @type {import('next').NextConfig} */
const nextConfig = {
  // Environment variables are loaded from .env automatically
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    domains: ['images.unsplash.com'], // Add any image domains you're using
  },
  // Specify the source directory
  experimental: {
    appDir: true
  },
  distDir: '.next',
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
}

module.exports = nextConfig 