const http = require('http');
const httpProxy = require('http-proxy');

const proxy = httpProxy.createProxyServer({ changeOrigin: true });

http.createServer(function(req, res) {
  proxy.web(req, res, { target: 'https://nteract.github.io' });
}).listen(80);
