const withTM = require('next-transpile-modules')([
  '@material-ui/core',
  '@material-ui/icons'
]);

module.exports = withTM({
  transpileModules: ['@material-ui/core', '@material-ui/icons'],
  images: {
    domains: ['firebasestorage.googleapis.com']
  }
});
