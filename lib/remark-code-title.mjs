import { visit } from "unist-util-visit";

/**
 * Remark plugin to extract code block metadata (like title) and pass it as JSX props
 */
export default function remarkCodeTitle() {
  return tree => {
    visit(tree, "code", (node, index, parent) => {
      // Extract metadata from meta string (e.g., title="filename.ts")
      const meta = node.meta || "";
      const titleMatch = meta.match(/title="([^"]+)"|title=(\S+)/);
      const title = titleMatch ? titleMatch[1] || titleMatch[2] : null;

      if (!title) {
        return;
      }

      // Create a JSX node that wraps the code in our CodeBlock component
      // Pass code as children instead of a prop to avoid escaping issues
      const codeBlockNode = {
        type: "mdxJsxFlowElement",
        name: "CodeBlock",
        attributes: [
          {
            type: "mdxJsxAttribute",
            name: "language",
            value: node.lang || "text"
          },
          {
            type: "mdxJsxAttribute",
            name: "filename",
            value: title
          }
        ],
        children: [
          {
            type: "text",
            value: node.value
          }
        ]
      };

      // Replace the code node with our custom JSX node
      parent.children[index] = codeBlockNode;
    });
  };
}
