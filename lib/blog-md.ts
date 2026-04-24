import type { PlaceholderData } from "fumadocs-core/mdx-plugins/remark-llms.runtime";

import { blogCtaToMarkdown } from "@/components/blog/cta.md";
import { BlogInlineCTA } from "@/components/blog/inline-cta";
import { kbdToMarkdown } from "@/components/kbd.md";

/**
 * Placeholder renderers for /blog/[slug]/llms.txt.
 *
 * Convention for components referenced from blog MDX files:
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
export const resolveBlogPlaceholders: Record<
  string,
  (data: PlaceholderData) => string
> = {
  Kbd: kbdToMarkdown,
  BlogCTA: blogCtaToMarkdown,
  BlogInlineCTA: BlogInlineCTA.toMarkdown,
};
