import path from "node:path";

import createMDX from "@next/mdx";
import type { NextConfig } from "next";

// MDX plugins are passed as resolvable module specifiers (not imported values)
// so Turbopack can serialize the loader rule. @next/mdx resolves these via
// Node's require.resolve relative to each MDX file's directory, so local
// plugins need absolute paths.
const projectRoot = import.meta.dirname;
const localPlugin = (relativePath: string) => path.join(projectRoot, relativePath);

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [
      "remark-frontmatter",
      "remark-gfm",
      localPlugin("lib/remark-annotate-mdx.mjs"),
      [
        localPlugin("lib/remark-llms.mjs"),
        {
          mdxAsPlaceholder: [
            "PingPreview",
            "Rights",
            "OptOut",
            "Receipt",
            "Kbd",
            "BlogCTA",
            "BlogInlineCTA",
          ],
        },
      ],
    ],
    rehypePlugins: [
      "rehype-slug",
      [
        "rehype-pretty-code",
        {
          theme: "github-dark",
          keepBackground: false,
          defaultLang: {
            block: "text",
          },
        },
      ],
    ],
  },
});

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
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

export default withMDX(nextConfig);
