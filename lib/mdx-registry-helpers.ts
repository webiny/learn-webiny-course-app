/**
 * Helper functions for working with the MDX registry
 * These functions provide navigation and lookup functionality
 */

import { getLessonBySlug, getChaptersWithLessons } from "./mdx-registry"
import { getChapterMetadata } from "./chapter-metadata"

/**
 * Get lesson data including chapter info (compatible with course-data.ts format)
 */
export function getLessonDataBySlug(slug: string) {
  const lesson = getLessonBySlug(slug)
  if (!lesson) return null

  const chapters = getChaptersWithLessons()
  const chapterLessons = chapters[lesson.chapter] || []

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
 * Get next lesson (respects order field within chapters)
 */
export function getNextLesson(currentSlug: string) {
  const currentLesson = getLessonBySlug(currentSlug)
  if (!currentLesson) return null

  const chapters = getChaptersWithLessons()
  const currentChapterLessons = chapters[currentLesson.chapter] || []
  const currentIndexInChapter = currentChapterLessons.findIndex(item => item.slug === currentSlug)

  // Check if there's a next lesson in the same chapter
  if (currentIndexInChapter !== -1 && currentIndexInChapter < currentChapterLessons.length - 1) {
    const nextLesson = currentChapterLessons[currentIndexInChapter + 1]
    return {
      chapterId: nextLesson.chapter,
      lessonId: nextLesson.slug.split('/').pop() || nextLesson.slug,
      slug: nextLesson.slug
    }
  }

  // If last lesson in chapter, try to get first lesson from next chapter
  const chapterKeys = Object.keys(chapters).sort()
  const currentChapterIndex = chapterKeys.indexOf(currentLesson.chapter)

  if (currentChapterIndex !== -1 && currentChapterIndex < chapterKeys.length - 1) {
    const nextChapterKey = chapterKeys[currentChapterIndex + 1]
    const nextChapterLessons = chapters[nextChapterKey]
    if (nextChapterLessons && nextChapterLessons.length > 0) {
      const nextLesson = nextChapterLessons[0]
      return {
        chapterId: nextLesson.chapter,
        lessonId: nextLesson.slug.split('/').pop() || nextLesson.slug,
        slug: nextLesson.slug
      }
    }
  }

  return null
}

/**
 * Get previous lesson (respects order field within chapters)
 */
export function getPreviousLesson(currentSlug: string) {
  const currentLesson = getLessonBySlug(currentSlug)
  if (!currentLesson) return null

  const chapters = getChaptersWithLessons()
  const currentChapterLessons = chapters[currentLesson.chapter] || []
  const currentIndexInChapter = currentChapterLessons.findIndex(item => item.slug === currentSlug)

  // Check if there's a previous lesson in the same chapter
  if (currentIndexInChapter > 0) {
    const prevLesson = currentChapterLessons[currentIndexInChapter - 1]
    return {
      chapterId: prevLesson.chapter,
      lessonId: prevLesson.slug.split('/').pop() || prevLesson.slug,
      slug: prevLesson.slug
    }
  }

  // If first lesson in chapter, try to get last lesson from previous chapter
  const chapterKeys = Object.keys(chapters).sort()
  const currentChapterIndex = chapterKeys.indexOf(currentLesson.chapter)

  if (currentChapterIndex > 0) {
    const prevChapterKey = chapterKeys[currentChapterIndex - 1]
    const prevChapterLessons = chapters[prevChapterKey]
    if (prevChapterLessons && prevChapterLessons.length > 0) {
      const prevLesson = prevChapterLessons[prevChapterLessons.length - 1]
      return {
        chapterId: prevLesson.chapter,
        lessonId: prevLesson.slug.split('/').pop() || prevLesson.slug,
        slug: prevLesson.slug
      }
    }
  }

  return null
}

/**
 * Check if lesson is last in chapter
 */
export function isLastLessonInChapter(slug: string): boolean {
  const lesson = getLessonBySlug(slug)
  if (!lesson) return false

  const chapters = getChaptersWithLessons()
  const chapterLessons = chapters[lesson.chapter] || []
  return chapterLessons[chapterLessons.length - 1]?.slug === slug
}

/**
 * Get lesson number within its chapter
 */
export function getLessonNumberInChapter(slug: string): number {
  const lesson = getLessonBySlug(slug)
  if (!lesson) return 0

  const chapters = getChaptersWithLessons()
  const chapterLessons = chapters[lesson.chapter] || []
  return chapterLessons.findIndex(item => item.slug === slug) + 1
}

/**
 * Get the first lesson of a chapter (respects order field)
 */
export function getFirstLessonInChapter(chapterId: string): string | null {
  const chapters = getChaptersWithLessons()
  const chapterLessons = chapters[chapterId]

  if (!chapterLessons || chapterLessons.length === 0) {
    return null
  }

  // Lessons are already sorted by order in getChaptersWithLessons()
  return chapterLessons[0].slug
}





