const withPlugins = require('next-compose-plugins');
const withTM = require('next-transpile-modules')([
  '@material-ui/core',
  '@material-ui/icons'
]);
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
});

module.exports = withPlugins([[withBundleAnalyzer], [withTM]], {
  transpileModules: ['@material-ui/core', '@material-ui/icons'],
  images: {
    domains: ['firebasestorage.googleapis.com']
  }
});
