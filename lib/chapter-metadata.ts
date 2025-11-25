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
  'foundation': {
    number: 0,
    title: 'Foundation',
    description: 'Learn the fundamentals of Webiny',
    icon: 'emoji_events' // Trophy/crown icon
  },
  'introduction': {
    number: 1,
    title: 'Introduction',
    description: 'Dive into the course materials',
    icon: 'menu_book' // Book icon
  },
  'getting-started': {
    number: 2,
    title: 'Getting Started',
    description: 'Learn how to create a Webiny application and run your local development server.',
    icon: 'rocket_launch' // Rocket icon
  },
  'website-builder': {
    number: 3,
    title: 'Website Builder',
    description: "Learn how to build pages with Webiny's visual website builder.",
    icon: 'palette' // Palette icon
  },
  'headless-cms': {
    number: 4,
    title: 'Headless CMS',
    description: "Learn how to use Webiny's Headless CMS to manage your content.",
    icon: 'edit' // Edit icon
  },
  'serverless': {
    number: 5,
    title: 'Serverless',
    description: 'Learn about the serverless architecture that powers Webiny.',
    icon: 'cloud' // Cloud icon
  },
  'best-practices': {
    number: 6,
    title: 'Best Practices',
    description: 'Learn best practices for building production-ready Webiny applications.',
    icon: 'bolt' // Lightning/zap icon
  },
  'webiny-foundations': {
    number: 7,
    title: 'Webiny Foundations',
    description: 'Deep dive into Webiny foundations.',
    icon: 'foundation' // Foundation icon
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
    icon: 'menu_book' // Default book icon
  }
}

