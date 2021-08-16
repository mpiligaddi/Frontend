const withPlugins = require('next-compose-plugins');
const withTM = require('next-transpile-modules')([
  '@material-ui/core',
  '@material-ui/icons'
]);
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
});

module.exports = withPlugins([[withBundleAnalyzer], [withTM]], {
  async rewrites() {
    return {
      fallback: [
        {
          source: '/api/:path*',
          destination: `${process.env.NEXT_PUBLIC_API_URL}/:path*`
        }
      ]
    };
  },
  transpileModules: ['@material-ui/core', '@material-ui/icons'],
  images: {
    domains: ['firebasestorage.googleapis.com', 'localhost', 'e.undervolt.io']
  },
  webpack(config) {
    config.module.rules.push({
      test: /jspdf/,
      use: 'null-loader'
    });

    return config;
  }
});
