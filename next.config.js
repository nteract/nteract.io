const webpack = require("./webpack.config");

module.exports = {
  webpack: (config, { dev }) => {
    config.resolve = webpack.resolve;
    return config;
  },
  target: "serverless",
  exportPathMap: async function(defaultPathMap) {
    return {
      "/kernels/python": { page: "/kernels", query: { slug: "python" } },
      "/kernels/node": { page: "/kernels", query: { slug: "node" } },
      "/kernels/r": { page: "/kernels", query: { slug: "r" } },
      "/kernels/julia": { page: "/kernels", query: { slug: "julia" } },
      "/kernels/cplusplus": { page: "/kernels", query: { slug: "cplusplus" } },
      "/kernels/scala": { page: "/kernels", query: { slug: "scala" } }
    };
  }
};
