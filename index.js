const httpProxy = require("http-proxy");
const express = require("express");
const next = require("next");

const proxy = httpProxy.createProxyServer({ changeOrigin: true });

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.get("/kernels", (req, res) => {
    return app.render(req, res, "/kernels", req.query);
  });

  server.get("*", (req, res) => {
    return proxy.web(req, res, { target: "https://nteract.github.io" });
  });

  server.listen(3000, err => {
    if (err) throw err;
    console.log("> Ready on http://localhost:3000");
  });
});
