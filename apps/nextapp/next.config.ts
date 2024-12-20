// apps/nextapp/next.config.ts

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true,
      },
    ];
  },

  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/api/auth/:path*',
          destination: '/api/auth/:path*',
        },
      ],
    };
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;