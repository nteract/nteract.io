const webpack = require("./webpack.config");

module.exports = {
  webpack: (config, { dev }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      ...webpack.resolve.alias
    };
    return config;
  },
  target: "serverless"
};
