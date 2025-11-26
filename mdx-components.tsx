import type { MDXComponents } from "mdx/types"
import { Quiz } from "@/components/quiz"
import { Callout } from "@/components/callout"
import { CodeBlock } from "@/components/code-block"
import { ChapterOverview } from "@/components/chapter-overview"
import { LessonH1 } from "@/components/lesson-h1"
import { ImageComponent } from "@/components/image"
import { ExternalLink } from "@/components/external-link"
import { IconTitle } from "@/components/icon-title"
import { PaidFeature } from "@/components/paid-feature"

export const mdxComponents: MDXComponents = {
  // Custom components available in MDX
  Quiz,
  Callout,
  CodeBlock,
  ChapterOverview,
  IconTitle,
  PaidFeature,
  Image: ImageComponent,
  ExternalLink,
  // Override default HTML elements with custom styling
  h1: LessonH1,
  h2: (props) => <h2 className="text-3xl font-bold mt-6 mb-3" {...props} />,
  h3: (props) => <h3 className="text-2xl font-semibold mt-4 mb-2" {...props} />,
  p: (props) => <p className="mb-4 leading-7" {...props} />,
  ul: (props) => <ul className="list-disc pl-6 mb-4 space-y-2" {...props} />,
  ol: (props) => <ol className="list-decimal pl-6 mb-4 space-y-2" {...props} />,
  li: (props) => <li className="leading-7" {...props} />,
  a: (props) => (
    <a
      className="text-primary hover:underline inline-flex items-center gap-1"
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    />
  ),
  code: (props) => <code className="bg-muted px-1.5 py-0.5 rounded text-sm" {...props} />,
  pre: (props) => <pre className="bg-muted p-4 rounded-lg overflow-x-auto mb-4" {...props} />,
  hr: (props) => <hr className="my-8 border-border" {...props} />,
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...mdxComponents,
    ...components,
  }
}
