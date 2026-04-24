import type { PlaceholderData } from "fumadocs-core/mdx-plugins/remark-llms.runtime";

/**
 * Sibling markdown view of `<BlogCTA />`. Lives in a non-client file
 * so the server-side llms.txt resolver can call it. (Static methods
 * on a `"use client"` component are unreachable from server code
 * because the import becomes a client reference.)
 */
export const blogCtaToMarkdown = (_data: PlaceholderData): string =>
  [
    "---",
    "",
    "[Download nteract](https://github.com/nteract/desktop/releases) · [Star on GitHub](https://github.com/nteract/desktop)",
  ].join("\n");
