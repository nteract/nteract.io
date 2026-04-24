import type { PlaceholderData } from "fumadocs-core/mdx-plugins/remark-llms.runtime";

import { OptOut } from "@/components/telemetry/opt-out";
import { pingPreviewToMarkdown } from "@/components/telemetry/ping-preview.md";
import { Receipt } from "@/components/telemetry/receipt";
import { Rights } from "@/components/telemetry/rights";

/**
 * Placeholder renderers for /telemetry/llms.txt.
 *
 * Convention for components referenced from content/telemetry.mdx:
 *
 *   Server component (default): attach `Component.toMarkdown` in the
 *     same .tsx file. Resolver entry: `<Name>: <Name>.toMarkdown`.
 *
 *   "use client" component: define `<name>ToMarkdown` in a sibling
 *     `<component>.md.ts` file. Static methods on a client component
 *     are unreachable from server code (the import becomes a client
 *     reference), so the markdown form must live in a non-client
 *     module. Resolver entry: `<Name>: <name>ToMarkdown`.
 *
 * Both renderers MUST read from the same data; never duplicate content
 * between the JSX view and the markdown view.
 */
export const resolveTelemetryPlaceholders: Record<
  string,
  (data: PlaceholderData) => string
> = {
  PingPreview: pingPreviewToMarkdown,
  Rights: Rights.toMarkdown,
  OptOut: OptOut.toMarkdown,
  Receipt: Receipt.toMarkdown,
};
