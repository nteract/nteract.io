/**
 * This file exists so that certain IDE's (webstorm)
 * that can read webpack configs can resolve
 * aliases for our folder structure.
 * ---
 * This is imported into next.config.js
 */

const path = require('path');

module.exports = {
  resolve: {
    alias: {
      '@pages': path.resolve(__dirname, 'pages'),
      '@components': path.resolve(__dirname, 'components'),
      '@lib': path.resolve(__dirname, 'common/lib'),
      '@common': path.resolve(__dirname, 'common'),
      '@static': path.resolve(__dirname, 'static')
    }
  }
};
