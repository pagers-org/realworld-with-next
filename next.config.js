/** @type {import('next').NextConfig} */
module.exports = {
  eslint: { ignoreDuringBuilds: true },
  poweredByHeader: false,
  swcMinify: true,
  compress: true,
  reactStrictMode: true,
  optimizeFonts: true,
  modularizeImports: {
    '@/components': {
      transform: '@/components/{{member}}',
    },
    '@/templates/?(((\\w*)?/?)*)': {
      transform: '@/templates/{{ matches.[1] }}/{{member}}',
    },
  },
  compiler: {
    emotion: true,
    reactRemoveProperties: true,
  },
  experimental: {
    optimisticClientCache: true,
    swcFileReading: true,
  },
  output: 'standalone',
  async headers() {
    return [
      {
        source: '/:all*(ttf|otf|woff|woff2|svg|png|jpg|mp4)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};
