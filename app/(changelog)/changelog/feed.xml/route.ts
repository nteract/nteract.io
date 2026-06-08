import { getAllEntries } from "@/lib/changelog";
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
  const entries = await getAllEntries();

  const items = entries
    .map((entry) => {
      const link = absoluteUrl(`/changelog/${entry.version}`);
      const description = [entry.summary, ...entry.highlights]
        .filter(Boolean)
        .join(" — ");
      return `
        <item>
          <title>${escapeXml(`nteract ${entry.version} — ${entry.title}`)}</title>
          <description>${escapeXml(description)}</description>
          <link>${link}</link>
          <guid>${link}</guid>
          <pubDate>${new Date(entry.date).toUTCString()}</pubDate>
        </item>`;
    })
    .join("");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
    <rss version="2.0">
      <channel>
        <title>${escapeXml(`${siteConfig.name} Changelog`)}</title>
        <description>${escapeXml("Every nteract stable release, in human terms.")}</description>
        <link>${absoluteUrl("/changelog")}</link>
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
