/**
 * Chapter metadata configuration
 * This defines the display information for each chapter
 */

import type { ChapterIconType } from "./chapter-icons"

export interface ChapterMetadata {
  number: number
  title: string
  description: string
  icon: ChapterIconType
}

/**
 * Chapter metadata mapping
 * Maps chapter slugs to their display information
 */
export const chapterMetadata: Record<string, ChapterMetadata> = {
  'introduction': {
    number: 1,
    title: 'Introduction',
    description: 'Dive into the course materials',
    icon: 'book'
  },
  'getting-started': {
    number: 2,
    title: 'Getting Started',
    description: 'Learn how to create a Webiny application and run your local development server.',
    icon: 'rocket'
  },
  'website-builder': {
    number: 3,
    title: 'Website Builder',
    description: "Learn how to build pages with Webiny's visual website builder.",
    icon: 'palette'
  },
  'headless-cms': {
    number: 4,
    title: 'Headless CMS',
    description: "Learn how to use Webiny's Headless CMS to manage your content.",
    icon: 'edit'
  },
  'serverless': {
    number: 5,
    title: 'Serverless',
    description: 'Learn about the serverless architecture that powers Webiny.',
    icon: 'cloud'
  },
  'best-practices': {
    number: 6,
    title: 'Best Practices',
    description: 'Learn best practices for building production-ready Webiny applications.',
    icon: 'zap'
  }
}

/**
 * Get chapter metadata by slug with fallback to generated title
 */
export function getChapterMetadata(slug: string): ChapterMetadata {
  const metadata = chapterMetadata[slug]

  if (metadata) {
    return metadata
  }

  // Fallback: generate title from slug
  const title = slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

  return {
    number: 999,
    title,
    description: `Learn about ${slug.replace(/-/g, ' ')}`,
    icon: 'book'
  }
}

