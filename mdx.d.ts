declare module "*.mdx" {
  import type { ComponentType } from "react";

  const MDXComponent: ComponentType<Record<string, unknown>>;

  export default MDXComponent;

  /** Plain-markdown export injected by remarkLLMs at build time. */
  export const _markdown: string;
}
