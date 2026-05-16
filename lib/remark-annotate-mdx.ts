import { visit } from "unist-util-visit";

type MdxJsxNode = {
  type: string;
  data?: Record<string, unknown>;
  children?: unknown[];
};

/**
 * Pre-annotates MDX JSX nodes for fumadocs-core's remarkLLMs stringifier:
 * elements with children keep the children and drop the wrapper, empty
 * elements are suppressed. Set on node.data._stringify before remarkLLMs runs.
 */
export default function remarkAnnotateMdx() {
  return (tree: unknown) => {
    visit(
      tree as never,
      ["mdxJsxFlowElement", "mdxJsxTextElement"],
      (node: MdxJsxNode) => {
        if (node.data && "_stringify" in node.data) return;
        const hasChildren =
          Array.isArray(node.children) && node.children.length > 0;
        node.data = {
          ...node.data,
          _stringify: hasChildren ? "children-only" : { text: "" },
        };
      },
    );
  };
}
