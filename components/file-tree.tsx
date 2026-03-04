"use client";

import { File, Folder } from "lucide-react";
import { cn } from "@/lib/utils";

interface FileTreeProps {
  tree?: string;
  children?: string;
  className?: string;
}

type FileTreeNodeType = "file" | "folder";

interface FileTreeNode {
  id: string;
  name: string;
  depth: number;
  type: FileTreeNodeType;
  comment?: string;
}

interface RenderNode extends FileTreeNode {
  isLastSibling: boolean;
  ancestorContinuations: boolean[];
}

function parseTreeLine(rawLine: string) {
  const line = rawLine.replace(/\t/g, "  ");
  const leadingWhitespace = line.match(/^\s*/)?.[0] ?? "";
  const content = line.trim();

  // Support inline comments via " # comment" while keeping names readable.
  const commentMatch = content.match(/^(.*?)(?:\s+#\s*(.+))?$/);
  const label = (commentMatch?.[1] ?? "").trim();
  const comment = commentMatch?.[2]?.trim();

  return {
    label,
    comment,
    leadingSpaces: leadingWhitespace.length,
  };
}

function parseTree(tree: string): FileTreeNode[] {
  const lines = tree
    .split("\n")
    .map((line) => line.replace(/\r/g, ""))
    .filter((line) => line.trim().length > 0);

  if (lines.length === 0) {
    return [];
  }

  const parsed = lines.map(parseTreeLine).filter((line) => line.label.length > 0);
  const indentedLevels = parsed
    .map((line) => line.leadingSpaces)
    .filter((spaces) => spaces > 0)
    .sort((a, b) => a - b);

  const indentUnit = indentedLevels[0] ?? 2;
  let previousDepth = 0;

  return parsed.map((line, index) => {
    const rawDepth = Math.max(0, Math.round(line.leadingSpaces / indentUnit));
    const depth = Math.min(rawDepth, previousDepth + 1);
    previousDepth = depth;

    const isFolder = line.label.endsWith("/");
    const name = isFolder ? line.label.slice(0, -1) : line.label;

    return {
      id: `${depth}-${name}-${index}`,
      depth,
      name,
      type: isFolder ? "folder" : "file",
      comment: line.comment,
    };
  });
}

function buildRenderNodes(nodes: FileTreeNode[]): RenderNode[] {
  const parentByIndex: number[] = [];
  const lastSeenByDepth: number[] = [];

  nodes.forEach((node, index) => {
    parentByIndex[index] = node.depth > 0 ? (lastSeenByDepth[node.depth - 1] ?? -1) : -1;
    lastSeenByDepth[node.depth] = index;
    lastSeenByDepth.length = node.depth + 1;
  });

  const isLastSiblingByIndex = nodes.map((node, index) => {
    for (let next = index + 1; next < nodes.length; next += 1) {
      const nextNode = nodes[next];
      if (nextNode.depth < node.depth) {
        break;
      }
      if (nextNode.depth === node.depth) {
        return false;
      }
    }
    return true;
  });

  return nodes.map((node, index) => {
    const ancestorContinuations: boolean[] = [];
    let parentIndex = parentByIndex[index];

    while (parentIndex >= 0) {
      const parentNode = nodes[parentIndex];
      ancestorContinuations[parentNode.depth] = !isLastSiblingByIndex[parentIndex];
      parentIndex = parentByIndex[parentIndex];
    }

    return {
      ...node,
      isLastSibling: isLastSiblingByIndex[index],
      ancestorContinuations,
    };
  });
}

export function FileTree({ tree, children, className }: FileTreeProps) {
  const input = tree ?? children ?? "";
  const nodes = parseTree(input);
  const renderNodes = buildRenderNodes(nodes);

  if (renderNodes.length === 0) {
    return null;
  }

  return (
    <div className={cn("my-6 rounded-lg border bg-card p-3", className)}>
      <div className="space-y-1">
        {renderNodes.map((node) => {
          const Icon = node.type === "folder" ? Folder : File;
          const ancestorPrefix = Array.from({ length: node.depth })
            .map((_, depthIndex) => (node.ancestorContinuations[depthIndex] ? "│   " : "    "))
            .join("");
          const branch = node.depth > 0 ? (node.isLastSibling ? "└── " : "├── ") : "";

          return (
            <div
              key={node.id}
              className="flex items-center gap-1 rounded px-2 py-1.5 font-mono text-sm hover:bg-muted/60"
            >
              {(ancestorPrefix || branch) && (
                <span className="whitespace-pre text-muted-foreground/50">{ancestorPrefix}{branch}</span>
              )}
              <Icon className={cn("h-4 w-4 shrink-0", node.type === "folder" && "text-amber-500")} />
              <span className="truncate">{node.name}</span>
              {node.comment ? (
                <span className="ml-auto text-xs text-muted-foreground"># {node.comment}</span>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
