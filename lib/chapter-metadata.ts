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
    number: 1,
    title: 'Foundation',
    description: 'Overview of Webiny fundamentals.',
    icon: 'crown'
  },
  'getting-started': {
    number: 2,
    title: 'Getting Started',
    description: 'Learn how to install and deploy Webiny.',
    icon: 'rocket_launch'
  },
  'developing': {
    number: 3,
    title: 'Developing with Webiny',
    description: 'How to customize, extend and build with Webiny.',
    icon: 'code_blocks'
  },
  'headless-cms': {
    number: 4,
    title: 'Working with Webiny Headless CMS',
    description: 'Learn how to manage content, create content models, and use the Headless CMS API.',
    icon: 'wysiwyg'
  },
  'website-builder': {
    number: 5,
    title: 'Working with Webiny Website Builder',
    description: 'Learn how to create and manage websites using Webiny Website Builder.',
    icon: 'table_chart'
  },
  'multi-tenancy': {
    number: 6,
    title: 'Multi-Tenancy Basics',
    description: 'Learn how multi-tenancy works in Webiny and how to set it up.',
    icon: 'table_chart'
  },
  'devops-best-practices': {
    number: 7,
    title: 'DevOps Best Practices',
    description: 'Learn the devops practices for managing Webiny projects.',
    icon: 'manufacturing'
  },
  'webiny-control-panel': {
      number: 8,
      title: 'Webiny Control Panel',
      description: 'Learn how to manage and upgrade your project\'s license.',
      icon: 'license'
   },
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

