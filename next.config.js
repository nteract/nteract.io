const webpack = require('./webpack.config');

module.exports = {
  webpack: (config, { dev }) => {
    config.resolve = webpack.resolve;
    return config;
  },
};
