// Example: Using getAllLessonSlugs() for static path generation
// This file demonstrates how to use the utility function in the future

import { getAllLessonSlugs } from "@/lib/mdx-loader"

/**
 * Example: Generate static paths for all lessons
 * This would be used in a page.tsx file with generateStaticParams
 */
export function generateStaticParams() {
  const slugs = getAllLessonSlugs()

  return slugs.map(slug => ({
    slug: slug.split('/')
  }))
}

/**
 * Example output:
 * [
 *   { slug: ["introduction"] },
 *   { slug: ["getting-started", "setup"] },
 *   { slug: ["getting-started", "project-structure"] },
 *   { slug: ["headless-cms", "content-models"] },
 *   // ... etc
 * ]
 */

// You could also use it to generate a sitemap, index page, etc.
export async function generateSitemap() {
  const slugs = getAllLessonSlugs()

  return slugs.map(slug => ({
    url: `https://example.com/course/${slug}`,
    lastModified: new Date(),
  }))
}

