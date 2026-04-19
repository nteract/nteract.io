import { getAllPosts } from "@/lib/blog";
import { absoluteUrl, siteConfig } from "@/lib/site";

export const dynamic = "force-static";

export async function GET() {
  const posts = await getAllPosts();

  const lines = [
    `# ${siteConfig.name}`,
    "",
    `> ${siteConfig.description}`,
    "",
    "## Blog",
    "",
    ...posts.map(
      (post) =>
        `- [${post.title}](${absoluteUrl(`/blog/${post.slug}/index.md`)}): ${post.description}`,
    ),
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
