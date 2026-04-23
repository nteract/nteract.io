import createMDX from "@next/mdx";
import type { NextConfig } from "next";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import { remarkLLMs } from "fumadocs-core/mdx-plugins/remark-llms";

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [
      remarkFrontmatter,
      remarkGfm,
      [
        remarkLLMs,
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
          // Annotate non-placeholder nodes so the stringifier strips them cleanly.
          // node.data._stringify is checked after this callback — { text: '' }
          // suppresses the node, 'children-only' keeps children and drops the wrapper.
          stringify(node: {
            type: string;
            name?: string;
            children?: unknown[];
            data?: Record<string, unknown>;
          }) {
            if (
              node.type === "mdxJsxFlowElement" ||
              node.type === "mdxJsxTextElement"
            ) {
              if (node.children && node.children.length > 0) {
                node.data = { ...node.data, _stringify: "children-only" };
              } else {
                node.data = { ...node.data, _stringify: { text: "" } };
              }
              return;
            }
          },
        },
      ],
    ],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypePrettyCode,
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
