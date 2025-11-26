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
    icon: 'crown' // Trophy/crown icon
  },
  'getting-started': {
    number: 2,
    title: 'Getting Started',
    description: 'Learn how to install and deploy Webiny.',
    icon: 'rocket_launch' // Rocket icon
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

