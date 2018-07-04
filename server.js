const express = require('express');
const next = require('next');
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dir: '.', dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  if (!dev) {
    /**
     * Static Files
     */
    server.get('/robots.txt', (req, res) => {
      return res.sendFile('/static/robots.txt');
    });
    server.get('/sitemap.xml', (req, res) => {
      return res.sendFile('/static/sitemap.xm');
    });
  }

  /**
   * Kernels
   */
  server.get('/kernels/:slug', (req, res) => {
    const queryParams = { slug: req.params.slug };
    return app.render(req, res, '/kernels', queryParams);
  });

  /**
   * Catch all
   */
  server.get('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(8080, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:8080');
  });
});
