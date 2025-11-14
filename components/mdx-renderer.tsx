"use client"

import type React from "react"

import { useMemo } from "react"
import { Quiz } from "./quiz"
import { Callout } from "./callout"
import { CodeBlock } from "./code-block"
import { ChapterOverview } from "./chapter-overview"

interface MDXRendererProps {
  content: string
}

// Simple MDX-like parser for demo purposes
export function MDXRenderer({ content }: MDXRendererProps) {
  const parsedContent = useMemo(() => {
    return parseAndRenderMDX(content)
  }, [content])

  return <div className="prose prose-slate dark:prose-invert max-w-none">{parsedContent}</div>
}

function parseAndRenderMDX(content: string) {
  const components: React.ReactNode[] = []
  const lines = content.trim().split("\n")
  let currentBlock: string[] = []
  const inCodeBlock = false
  let inComponent = false
  let componentContent = ""

  const flushTextBlock = () => {
    if (currentBlock.length > 0) {
      const text = currentBlock.join("\n")
      components.push(<div key={components.length} dangerouslySetInnerHTML={{ __html: parseMarkdown(text) }} />)
      currentBlock = []
    }
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    // Handle component blocks
    if (line.startsWith("<") && !line.startsWith("</")) {
      flushTextBlock()
      inComponent = true
      componentContent = line

      // Check if it's a self-closing or single-line component
      if (line.includes("/>") || line.includes("</")) {
        try {
          const component = parseComponent(componentContent)
          if (component) {
            components.push(<div key={components.length}>{component}</div>)
          }
        } catch (e) {
          console.error("[v0] Error parsing component:", e)
        }
        inComponent = false
        componentContent = ""
      }
      continue
    }

    if (inComponent) {
      componentContent += "\n" + line
      if (line.includes("/>") || (line.includes("</") && !line.includes("</"))) {
        try {
          const component = parseComponent(componentContent)
          if (component) {
            components.push(<div key={components.length}>{component}</div>)
          }
        } catch (e) {
          console.error("[v0] Error parsing component:", e)
        }
        inComponent = false
        componentContent = ""
      }
      continue
    }

    // Regular text lines
    currentBlock.push(line)
  }

  flushTextBlock()

  return <>{components}</>
}

function parseComponent(content: string): React.ReactNode | null {
  // Parse ChapterOverview
  if (content.includes("<ChapterOverview")) {
    const itemsMatch = content.match(/items=\{(\[[\s\S]*?\])\}/)
    if (itemsMatch) {
      try {
        // eslint-disable-next-line no-eval
        const items = eval(itemsMatch[1])
        return <ChapterOverview items={items} />
      } catch (e) {
        console.error("[v0] Error parsing ChapterOverview items:", e)
      }
    }
  }

  // Parse Callout
  if (content.includes("<Callout")) {
    const typeMatch = content.match(/type="(\w+)"/)
    const textMatch = content.match(/>([^<]+)</)
    if (typeMatch && textMatch) {
      return <Callout type={typeMatch[1] as any}>{textMatch[1].trim()}</Callout>
    }
  }

  // Parse CodeBlock
  if (content.includes("<CodeBlock")) {
    const langMatch = content.match(/language="([^"]+)"/)
    const filenameMatch = content.match(/filename="([^"]+)"/)
    const codeMatch = content.match(/code=\{`([^`]+)`\}/)
    const highlightMatch = content.match(/highlightLines=\{(\[[^\]]+\])\}/)

    if (langMatch && codeMatch) {
      const highlightLines = highlightMatch ? JSON.parse(highlightMatch[1]) : undefined
      return (
        <CodeBlock
          language={langMatch[1] as any}
          filename={filenameMatch?.[1]}
          code={codeMatch[1]}
          highlightLines={highlightLines}
        />
      )
    }
  }

  // Parse Quiz
  if (content.includes("<Quiz")) {
    const questionMatch = content.match(/question="([^"]+)"/)
    const optionsMatch = content.match(/options=\{(\[[\s\S]*?\])\}/)
    const answerMatch = content.match(/correctAnswer="([^"]+)"/)
    const hintMatch = content.match(/hint="([^"]+)"/)
    const explanationMatch = content.match(/explanation="([^"]+)"/)

    if (questionMatch && optionsMatch && answerMatch) {
      try {
        // eslint-disable-next-line no-eval
        const options = eval(optionsMatch[1])
        return (
          <Quiz
            question={questionMatch[1]}
            options={options}
            correctAnswer={answerMatch[1]}
            hint={hintMatch?.[1]}
            explanation={explanationMatch?.[1]}
          />
        )
      } catch (e) {
        console.error("[v0] Error parsing Quiz:", e)
      }
    }
  }

  return null
}

function parseMarkdown(text: string): string {
  let html = text

  // Headers
  html = html.replace(/^### (.+)$/gm, "<h3>$1</h3>")
  html = html.replace(/^## (.+)$/gm, "<h2>$1</h2>")
  html = html.replace(/^# (.+)$/gm, "<h1>$1</h1>")

  // Bold
  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")

  // Inline code
  html = html.replace(/`([^`]+)`/g, "<code>$1</code>")

  // Links
  html = html.replace(/\[([^\]]+)\]$$([^)]+)$$/g, '<a href="$2">$1</a>')

  // Lists
  html = html.replace(/^- (.+)$/gm, "<li>$1</li>")
  html = html.replace(/(<li>.*<\/li>\n?)+/g, "<ul>$&</ul>")
  html = html.replace(/^(\d+)\. (.+)$/gm, "<li>$2</li>")

  // Paragraphs
  html = html.replace(/^(?!<[h|u|l|d])([ \t]*\S.*)$/gm, "<p>$1</p>")

  return html
}
