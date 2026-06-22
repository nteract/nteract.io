import { renderPlaceholder } from "fumadocs-core/mdx-plugins/remark-llms.runtime";
import matter from "gray-matter";

import { formatAuthorNames } from "@/lib/authors";
import { getAllSlugs, getPostBySlug } from "@/lib/blog";
import { resolveBlogPlaceholders } from "@/lib/blog-md";

export const dynamic = "force-static";
export const dynamicParams = false;

const isDev = process.env.NODE_ENV === "development";

export async function generateStaticParams() {
  const slugs = await getAllSlugs({ includeUnpublished: isDev });
  return slugs.map((slug) => ({ slug }));
}

type RouteContext = {
  params: Promise<{ slug: string }>;
};

export async function GET(_request: Request, { params }: RouteContext) {
  const { slug } = await params;
  const post = await getPostBySlug(slug, { includeUnpublished: isDev });

  if (!post) {
    return new Response("Not found", { status: 404 });
  }

  const { _markdown } = await import(`@/content/blog/${slug}.mdx`);
  const { content } = matter(_markdown);

  const md = await renderPlaceholder(content, resolveBlogPlaceholders);
  const header = [
    `# ${post.title}`,
    "",
    `Description: ${post.description}`,
    `Date: ${post.date}`,
    ...(post.authors.length > 0
      ? [`Author: ${formatAuthorNames(post.authors)}`]
      : []),
    "",
  ].join("\n");

  return new Response(`${header}\n${md.trimStart()}`, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
