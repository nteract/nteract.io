import { formatPostAsMarkdown, getAllSlugs, getPostBySlug } from "@/lib/blog";

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

  return new Response(formatPostAsMarkdown(post), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
