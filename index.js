const httpProxy = require("http-proxy");
const express = require("express");
const next = require("next");

const proxy = httpProxy.createProxyServer({ changeOrigin: true });

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const passthrough = (req, res) => handle(req, res);

app.prepare().then(() => {
  const server = express();

  // Next in development mode
  server.get("__webpack_hmr*", passthrough);
  server.get("/_next*", passthrough);
  server.get("/static*", passthrough);

  // Let next handle /kernels, /kernels/python, etc.
  server.get("/kernels*", passthrough);

  server.get("*", (req, res) => {
    return proxy.web(req, res, { target: "https://nteract.github.io" });
  });

  server.listen(3000, err => {
    if (err) throw err;
    console.log("> Ready on http://localhost:3000");
  });
});
