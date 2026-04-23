import { _markdown } from "@/content/telemetry.mdx";
import { renderPlaceholder } from "fumadocs-core/mdx-plugins/remark-llms.runtime";
import { FIELDS } from "@/lib/telemetry-data";

export const dynamic = "force-static";

export async function GET() {
  const md = await renderPlaceholder(_markdown, {
    PingPreview() {
      const lines = ["```", "{"];
      for (const f of FIELDS) {
        lines.push(`  "${f.name}": "${f.example}",`);
      }
      lines.push("}", "```");
      return lines.join("\n");
    },
  });

  return new Response(md, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
