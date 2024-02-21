const webpack = require("./webpack.config");

module.exports = {
  webpack: (config, { }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      ...webpack.resolve.alias
    };
    return config;
  },
  compiler: {
    styledComponents: true
  }
};
