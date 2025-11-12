/**
 * @deprecated This file is NO LONGER USED
 *
 * MDX content is now loaded dynamically from the filesystem using lib/mdx-loader.ts
 *
 * This file can be safely deleted.
 */

import type React from "react"

import IntroductionLesson from "@/content/lessons/introduction"
import SetupLesson from "@/content/lessons/getting-started/setup"

// Registry mapping slugs to lesson components
export const mdxRegistry: Record<string, React.ComponentType> = {
  introduction: IntroductionLesson,
  "getting-started/setup": SetupLesson,
  // "getting-started/project-structure": ProjectStructure,
  // "headless-cms/content-models": ContentModels,
  // "headless-cms/graphql-api": GraphqlApi,
  // "page-builder/creating-pages": CreatingPages,
  // "page-builder/custom-elements": CustomElements,
  // "serverless/architecture": Architecture,
  // "serverless/deployment": Deployment,
  // "best-practices/performance": Performance,
  // "best-practices/security": Security,
}

export function getMDXComponent(slug: string): React.ComponentType | null {
  console.log("[v0] getMDXComponent called with slug:", slug)
  console.log("[v0] Available slugs:", Object.keys(mdxRegistry))

  const component = mdxRegistry[slug]

  if (!component) {
    console.error(`[v0] MDX component not found for slug: ${slug}`)
    return null
  }

  console.log("[v0] MDX component found for slug:", slug)
  return component
}
