"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface CodeBlockProps {
  code: string
  language: "javascript" | "typescript" | "tsx" | "jsx" | "css" | "html"
  filename?: string
  highlightLines?: number[]
  showLineNumbers?: boolean
}

const fileIcons = {
  javascript: { icon: "FileCode", label: "JS", color: "bg-yellow-500" },
  typescript: { icon: "FileCode", label: "TS", color: "bg-blue-500" },
  tsx: { icon: "FileCode", label: "TS", color: "bg-blue-500" },
  jsx: { icon: "FileCode", label: "JS", color: "bg-yellow-500" },
  css: { icon: "FileText", label: "CSS", color: "bg-purple-500" },
  html: { icon: "FileText", label: "HTML", color: "bg-orange-500" },
}

export function CodeBlock({ code, language, filename, highlightLines = [], showLineNumbers = false }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (!code) {
    return (
      <div className="my-6 rounded-lg border border-border overflow-hidden bg-muted/30 p-4">
        <p className="text-sm text-muted-foreground">No code provided</p>
      </div>
    )
  }

  const fileInfo = fileIcons[language] || fileIcons.typescript
  const lines = code.split("\n")

  return (
    <div className="my-6 rounded-lg border border-border overflow-hidden bg-muted/30">
      {/* Header */}
      {filename && (
        <div className="flex items-center justify-between px-4 py-3 bg-muted/50 border-b border-border">
          <div className="flex items-center gap-2">
            <div
              className={cn(
                "flex items-center justify-center w-6 h-6 rounded text-xs font-bold text-white",
                fileInfo.color,
              )}
            >
              {fileInfo.label}
            </div>
            <span className="text-sm font-mono text-foreground">{filename}</span>
          </div>
          <Button variant="ghost" size="sm" onClick={handleCopy} className="h-8 w-8 p-0">
            {copied ? (
              <svg className="h-4 w-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
        <pre className="p-4 text-sm font-mono leading-relaxed">
          <code>
            {lines.map((line, index) => {
              const lineNumber = index + 1
              const isHighlighted = highlightLines.includes(lineNumber)

              return (
                <div key={index} className={cn("relative", isHighlighted && "bg-blue-500/10")}>
                  {isHighlighted && <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500" />}
                  <div className={cn("flex", isHighlighted && "pl-3")}>
                    {showLineNumbers && (
                      <span className="inline-block w-8 text-right mr-4 text-muted-foreground select-none">
                        {lineNumber}
                      </span>
                    )}
                    <span
                      className="flex-1"
                      dangerouslySetInnerHTML={{
                        __html: highlightSyntax(line, language),
                      }}
                    />
                  </div>
                </div>
              )
            })}
          </code>
        </pre>
      </div>
    </div>
  )
}

function highlightSyntax(line: string, language: string): string {
  // Escape HTML first
  let escaped = line
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")

  if (language === "typescript" || language === "tsx" || language === "javascript" || language === "jsx") {
    // Use a placeholder-based approach to avoid regex conflicts
    const tokens: Array<{ text: string; color?: string }> = []
    let current = 0

    // Process the line character by character to extract tokens
    while (current < escaped.length) {
      const remaining = escaped.slice(current)

      // Check for strings (single or double quotes)
      const stringMatch = remaining.match(/^(['"`])(?:\\.|(?!\1).)*\1/)
      if (stringMatch) {
        tokens.push({ text: stringMatch[0], color: "#16a34a" })
        current += stringMatch[0].length
        continue
      }

      // Check for comments
      if (remaining.startsWith("//")) {
        tokens.push({ text: remaining, color: "#6b7280" })
        break
      }

      // Check for keywords
      const keywordMatch = remaining.match(/^(import|export|default|function|const|let|var|return|if|else|for|while|class|interface|type|async|await|from|as|new|this|extends|implements|enum|namespace|declare|public|private|protected|readonly|static)\b/)
      if (keywordMatch) {
        tokens.push({ text: keywordMatch[0], color: "#d946ef" })
        current += keywordMatch[0].length
        continue
      }

      // Check for numbers
      const numberMatch = remaining.match(/^\d+(\.\d+)?/)
      if (numberMatch) {
        tokens.push({ text: numberMatch[0], color: "#f97316" })
        current += numberMatch[0].length
        continue
      }

      // Check for identifiers followed by parentheses (function calls)
      const functionMatch = remaining.match(/^([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\(/)
      if (functionMatch) {
        tokens.push({ text: functionMatch[1], color: "#3b82f6" })
        current += functionMatch[1].length
        continue
      }

      // Otherwise, just take the next character
      tokens.push({ text: escaped[current] })
      current++
    }

    // Build the highlighted HTML
    return tokens.map(token => {
      if (token.color) {
        return `<span style="color: ${token.color};">${token.text}</span>`
      }
      return token.text
    }).join("")
  } else if (language === "css") {
    // Simple CSS highlighting
    if (escaped.match(/^\s*[.#]?[a-zA-Z-]+\s*{/)) {
      return escaped.replace(/([.#]?[a-zA-Z-]+)/, '<span style="color: #a855f7;">$1</span>')
    }
    if (escaped.match(/:\s*[^;]+;/)) {
      return escaped.replace(/([a-zA-Z-]+)(:)/, '<span style="color: #3b82f6;">$1</span>$2')
    }
  }

  return escaped
}
