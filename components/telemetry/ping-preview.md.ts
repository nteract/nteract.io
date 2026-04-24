import type { PlaceholderData } from "fumadocs-core/mdx-plugins/remark-llms.runtime";

import { FIELDS } from "@/lib/telemetry-data";

/**
 * Sibling markdown view of `<PingPreview />`. Lives in a non-client
 * file so the server-side llms.txt resolver can call it directly.
 * (Static methods on a `"use client"` component are unreachable from
 * server code because the import becomes a client reference.)
 */
export const pingPreviewToMarkdown = (_data: PlaceholderData): string => {
  const lines = ["```", "{"];
  for (const f of FIELDS) {
    lines.push(`  "${f.name}": "${f.example}",`);
  }
  lines.push("}", "```");
  return lines.join("\n");
};
