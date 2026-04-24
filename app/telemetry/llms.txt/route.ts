import { renderPlaceholder } from "fumadocs-core/mdx-plugins/remark-llms.runtime";

import { _markdown } from "@/content/telemetry.mdx";
import { resolveTelemetryPlaceholders } from "@/lib/telemetry-md";

export const dynamic = "force-static";

export async function GET() {
  const md = await renderPlaceholder(_markdown, resolveTelemetryPlaceholders);

  return new Response(md, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
