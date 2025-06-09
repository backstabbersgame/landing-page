/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  reactStrictMode: false,
  output: 'export',
  basePath: '/landing-page',
  assetPrefix: '/landing-page/',
};

module.exports = nextConfig;
