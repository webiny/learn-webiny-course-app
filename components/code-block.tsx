"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { BundledLanguage } from "shiki";

// Import dynamically to avoid build errors if shiki is not installed
let codeToHtml: any;

interface CodeBlockProps {
    code?: string;
    language:
        | BundledLanguage
        | "javascript"
        | "typescript"
        | "tsx"
        | "jsx"
        | "css"
        | "html"
        | "json"
        | "bash"
        | "shell";
    filename?: string;
    highlightLines?: number[];
    showLineNumbers?: boolean;
    children?: string;
}

const FileCodeIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
        />
    </svg>
);

const FileTextIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
    </svg>
);

const TerminalIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
    </svg>
);

const fileIcons = {
    javascript: { icon: FileCodeIcon, label: "JS", color: "bg-yellow-500" },
    typescript: { icon: FileCodeIcon, label: "TS", color: "bg-blue-500" },
    tsx: { icon: FileCodeIcon, label: "TSX", color: "bg-blue-500" },
    jsx: { icon: FileCodeIcon, label: "JSX", color: "bg-yellow-500" },
    css: { icon: FileTextIcon, label: "CSS", color: "bg-purple-500" },
    html: { icon: FileTextIcon, label: "HTML", color: "bg-orange-500" },
    json: { icon: FileTextIcon, label: "JSON", color: "bg-green-500" },
    bash: { icon: TerminalIcon, label: "BASH", color: "bg-gray-500" },
    shell: { icon: TerminalIcon, label: "SH", color: "bg-gray-500" }
};

export function CodeBlock({
    code: codeProp,
    language,
    filename,
    highlightLines = [],
    showLineNumbers = true,
    children
}: CodeBlockProps) {
    const [copied, setCopied] = useState(false);
    const [highlightedCode, setHighlightedCode] = useState<string>("");
    const [isLoading, setIsLoading] = useState(true);
    const [mounted, setMounted] = useState(false);
    const { resolvedTheme } = useTheme();

    // Support both code prop and children
    const code = codeProp || children || "";

    // Handle client-side mounting
    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        // Don't run until mounted
        if (!mounted) return;

        async function highlight() {
            // Wait for theme to be available
            if (!code || resolvedTheme === undefined) {
                return;
            }

            setIsLoading(true);

            try {
                // Dynamically import shiki to handle cases where it's not installed
                if (!codeToHtml) {
                    const shiki = await import("shiki");
                    codeToHtml = shiki.codeToHtml;
                }

                const isDark = resolvedTheme === "dark";

                const html = await codeToHtml(code, {
                    lang: language as BundledLanguage,
                    theme: isDark ? "github-dark" : "github-light",
                    transformers: [
                        {
                            line(node: any, line: number) {
                                // Add line highlighting
                                if (highlightLines.includes(line)) {
                                    if (!node.properties) node.properties = {};
                                    if (!node.properties.class) node.properties.class = "";
                                    node.properties.class += " highlighted-line";
                                }
                                // Add line numbers if enabled
                                if (showLineNumbers) {
                                    if (!node.properties) node.properties = {};
                                    if (!node.properties.class) node.properties.class = "";
                                    node.properties.class += " line-with-number";
                                    node.properties["data-line"] = line;
                                }
                            }
                        }
                    ]
                });
                setHighlightedCode(html);
            } catch (error) {
                console.error("Error highlighting code:", error);
                // Fallback to plain text
                setHighlightedCode(`<pre class="shiki"><code>${escapeHtml(code)}</code></pre>`);
            } finally {
                setIsLoading(false);
            }
        }

        highlight();
    }, [code, language, resolvedTheme, mounted]);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (!code) {
        return (
            <div className="my-6 rounded-lg border border-border overflow-hidden bg-muted/30 p-4">
                <p className="text-sm text-muted-foreground">No code provided</p>
            </div>
        );
    }

    const fileInfo = fileIcons[language as keyof typeof fileIcons] || fileIcons.typescript;

    return (
        <div className="my-6 rounded-lg border border-border overflow-hidden bg-muted/30">
            {/* Header */}
            {filename && (
                <div className="flex items-center justify-between px-4 py-3 bg-muted/50 border-b border-border">
                    <div className="flex items-center gap-2">
                        <div
                            className={cn(
                                "flex items-center justify-center w-6 h-6 rounded text-white",
                                fileInfo.color
                            )}
                        >
                            <fileInfo.icon />
                        </div>
                        <span className="text-sm font-mono text-foreground">{filename}</span>
                    </div>
                    <Button variant="ghost" size="sm" onClick={handleCopy} className="h-8 w-8 p-0">
                        {copied ? (
                            <svg
                                className="h-4 w-4 text-green-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                        ) : (
                            <svg
                                className="h-4 w-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                                />
                            </svg>
                        )}
                    </Button>
                </div>
            )}

            {/* Code Content */}
            <div className="relative overflow-x-auto">
                {!mounted || isLoading ? (
                    <div className="p-4 text-sm text-muted-foreground">Loading...</div>
                ) : (
                    <div
                        className="shiki-wrapper"
                        dangerouslySetInnerHTML={{ __html: highlightedCode }}
                    />
                )}
            </div>

            {/* Custom Styles */}
            <style jsx>{`
                .shiki-wrapper :global(pre) {
                    margin: 0;
                    padding: 1rem;
                    background: transparent !important;
                    overflow-x: auto;
                }

                .shiki-wrapper :global(code) {
                    font-family: "Menlo", "Monaco", "Courier New", monospace;
                    font-size: 0.875rem;
                    line-height: 0.2;
                    counter-reset: line;
                }

                .shiki-wrapper :global(.line) {
                    display: block;
                }

                .shiki-wrapper :global(.line),
                .shiki-wrapper :global(.line span) {
                    background: transparent !important;
                }

                .shiki-wrapper :global(.line-with-number) {
                    padding-left: 3.5rem;
                    position: relative;
                }

                .shiki-wrapper :global(.line-with-number::before) {
                    content: attr(data-line);
                    position: absolute;
                    left: 0;
                    width: 2.5rem;
                    text-align: right;
                    padding-right: 1rem;
                    color: hsl(var(--muted-foreground));
                    opacity: 0.5;
                    user-select: none;
                }

                .shiki-wrapper :global(.highlighted-line) {
                    background: rgba(59, 130, 246, 0.1);
                    border-left: 3px solid rgb(59, 130, 246);
                    padding-left: calc(3.5rem - 3px);
                }

                .shiki-wrapper :global(.highlighted-line::before) {
                    left: 3px;
                }
            `}</style>
        </div>
    );
}

function escapeHtml(text: string): string {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}
