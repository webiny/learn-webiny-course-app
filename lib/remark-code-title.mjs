import { visit } from "unist-util-visit";

/**
 * Remark plugin to transform code blocks with title metadata into CodeBlock components.
 * Converts markdown: ```typescript title="file.ts" into <CodeBlock language="typescript" filename="file.ts" code="..."/>
 */
export default function remarkCodeTitle() {
  return tree => {
    visit(tree, "code", (node, index, parent) => {
      // Extract title from meta string (e.g., title="filename.ts")
      const meta = node.meta || "";
      const titleMatch = meta.match(/title="([^"]+)"|title=(\S+)/);
      const title = titleMatch ? titleMatch[1] || titleMatch[2] : null;

      if (!title) {
        return;
      }

      // Transform into CodeBlock JSX component
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
          },
          {
            type: "mdxJsxAttribute",
            name: "code",
            value: node.value // Indentation is preserved in node.value
          }
        ],
        children: []
      };

      // Replace the code node with the CodeBlock component
      parent.children[index] = codeBlockNode;
    });
  };
}
