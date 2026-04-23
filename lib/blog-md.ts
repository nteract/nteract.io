import type { PlaceholderData } from "fumadocs-core/mdx-plugins/remark-llms.runtime";

/**
 * Placeholder renderers for blog MDX components.
 *
 * Used by the /blog/[slug]/raw.md route to resolve remarkLLMs
 * placeholders into plain markdown at build time.
 */
export const resolveBlogPlaceholders: Record<
  string,
  (data: PlaceholderData) => string
> = {
  Kbd({ children }) {
    return `\`${children}\``;
  },

  BlogCTA() {
    return [
      "---",
      "",
      "[Download nteract](https://github.com/nteract/desktop/releases) · [Star on GitHub](https://github.com/nteract/desktop)",
    ].join("\n");
  },

  BlogInlineCTA({ attributes, children }) {
    const href = (attributes.href as string) ?? "";
    const lead = (attributes.lead as string) ?? "";
    const prefix = lead ? `${lead} ` : "";
    return `${prefix}[${children}](${href})`;
  },
};
