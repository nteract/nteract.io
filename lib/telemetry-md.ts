import { _markdown } from "@/content/telemetry.mdx";
import { renderPlaceholder } from "fumadocs-core/mdx-plugins/remark-llms.runtime";

import { OptOut } from "@/components/telemetry/opt-out";
import { pingPreviewToMarkdown } from "@/components/telemetry/ping-preview.md";
import { Receipt } from "@/components/telemetry/receipt";
import { Rights } from "@/components/telemetry/rights";

/**
 * Resolve the remarkLLMs markdown export from telemetry.mdx,
 * replacing component placeholders with their static markdown form.
 *
 * Used by the /telemetry/llms.txt route.
 */
export function resolveTelemetryMarkdown(): Promise<string> {
  return renderPlaceholder(_markdown, {
    PingPreview: pingPreviewToMarkdown,
    Rights: Rights.toMarkdown,
    OptOut: OptOut.toMarkdown,
    Receipt: Receipt.toMarkdown,
  });
}
