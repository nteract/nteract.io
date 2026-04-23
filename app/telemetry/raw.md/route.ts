import { renderTelemetryMarkdown } from "@/lib/telemetry-markdown";

export const dynamic = "force-static";

export async function GET() {
  return new Response(renderTelemetryMarkdown(), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
