import { _markdown } from "@/content/telemetry.mdx";
import { renderPlaceholder } from "fumadocs-core/mdx-plugins/remark-llms.runtime";
import { FIELDS } from "@/lib/telemetry-data";

/**
 * Resolve the remarkLLMs markdown export from telemetry.mdx,
 * replacing component placeholders with their static markdown form.
 *
 * Shared by /telemetry/raw.md and /telemetry/llms.txt routes.
 */
export function resolveTelemetryMarkdown(): Promise<string> {
  return renderPlaceholder(_markdown, {
    PingPreview() {
      const lines = ["```", "{"];
      for (const f of FIELDS) {
        lines.push(`  "${f.name}": "${f.example}",`);
      }
      lines.push("}", "```");
      return lines.join("\n");
    },
  });
}
