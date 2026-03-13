import { getAllPosts } from "@/lib/blog";
import { absoluteUrl, siteConfig } from "@/lib/site";

export const dynamic = "force-static";

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export async function GET() {
  const posts = await getAllPosts();

  const items = posts
    .map(
      (post) => `
        <item>
          <title>${escapeXml(post.title)}</title>
          <description>${escapeXml(post.description)}</description>
          <link>${absoluteUrl(`/blog/${post.slug}`)}</link>
          <guid>${absoluteUrl(`/blog/${post.slug}`)}</guid>
          <pubDate>${new Date(post.date).toUTCString()}</pubDate>
        </item>`
    )
    .join("");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
    <rss version="2.0">
      <channel>
        <title>${escapeXml(`${siteConfig.name} Blog`)}</title>
        <description>${escapeXml(siteConfig.blogDescription)}</description>
        <link>${absoluteUrl("/blog")}</link>
        <language>en-us</language>
        ${items}
      </channel>
    </rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
