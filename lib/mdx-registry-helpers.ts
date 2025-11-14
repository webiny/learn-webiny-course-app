/**
 * Helper functions for working with the MDX registry
 * These functions provide navigation and lookup functionality
 */

import { mdxRegistry, getLessonBySlug } from "./mdx-registry"
import { getChapterMetadata } from "./chapter-metadata"

/**
 * Get lesson data including chapter info (compatible with course-data.ts format)
 */
export function getLessonDataBySlug(slug: string) {
  const lesson = getLessonBySlug(slug)
  if (!lesson) return null

  const chapterLessons = mdxRegistry.filter(item => item.chapter === lesson.chapter)

  // Get chapter metadata for consistent information
  const chapterMeta = getChapterMetadata(lesson.chapter)

  return {
    lesson: {
      id: lesson.slug.split('/').pop() || lesson.slug,
      title: lesson.frontmatter.title || lesson.slug,
      slug: lesson.slug
    },
    chapter: {
      id: lesson.chapter,
      number: chapterMeta.number,
      title: chapterMeta.title,
      description: chapterMeta.description,
      icon: chapterMeta.icon,
      lessons: chapterLessons.map(l => ({
        id: l.slug.split('/').pop() || l.slug,
        title: l.frontmatter.title || l.slug,
        slug: l.slug
      }))
    }
  }
}

/**
 * Get next lesson
 */
export function getNextLesson(currentSlug: string) {
  const currentIndex = mdxRegistry.findIndex(item => item.slug === currentSlug)
  if (currentIndex === -1 || currentIndex === mdxRegistry.length - 1) return null

  const nextLesson = mdxRegistry[currentIndex + 1]
  return {
    chapterId: nextLesson.chapter,
    lessonId: nextLesson.slug.split('/').pop() || nextLesson.slug,
    slug: nextLesson.slug
  }
}

/**
 * Get previous lesson
 */
export function getPreviousLesson(currentSlug: string) {
  const currentIndex = mdxRegistry.findIndex(item => item.slug === currentSlug)
  if (currentIndex <= 0) return null

  const prevLesson = mdxRegistry[currentIndex - 1]
  return {
    chapterId: prevLesson.chapter,
    lessonId: prevLesson.slug.split('/').pop() || prevLesson.slug,
    slug: prevLesson.slug
  }
}

/**
 * Check if lesson is last in chapter
 */
export function isLastLessonInChapter(slug: string): boolean {
  const lesson = getLessonBySlug(slug)
  if (!lesson) return false

  const chapterLessons = mdxRegistry.filter(item => item.chapter === lesson.chapter)
  return chapterLessons[chapterLessons.length - 1]?.slug === slug
}

/**
 * Get lesson number within its chapter
 */
export function getLessonNumberInChapter(slug: string): number {
  const lesson = getLessonBySlug(slug)
  if (!lesson) return 0

  const chapterLessons = mdxRegistry.filter(item => item.chapter === lesson.chapter)
  return chapterLessons.findIndex(item => item.slug === slug) + 1
}

