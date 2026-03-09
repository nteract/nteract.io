/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/desktop",
        destination: "/",
        permanent: false,
      },
      {
        source: "/about",
        destination: "/",
        permanent: false,
      },
      {
        source: "/applications",
        destination: "/",
        permanent: false,
      },
      {
        source: "/atom",
        destination: "https://zed.dev/docs/repl",
        permanent: false,
      },
      {
        source: "/kernels",
        destination: "https://github.com/runtimed/kernel-testbed",
        permanent: false,
      },
      {
        source: "/kernels/:slug",
        destination: "https://github.com/runtimed/kernel-testbed",
        permanent: false,
      },
      {
        source: "/libraries",
        destination: "https://github.com/runtimed/runtimed",
        permanent: false,
      },
      {
        source: "/sdk",
        destination: "https://nteract-elements.vercel.app/docs",
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
