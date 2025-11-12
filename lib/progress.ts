"use client"

const STORAGE_KEY = "learn-nextjs-progress"
const PROGRESS_EVENT = "progress-updated"

export interface Progress {
  completedLessons: string[]
  lastVisited?: string
}

export function getProgress(): Progress {
  if (typeof window === "undefined") {
    return { completedLessons: [] }
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      return JSON.parse(stored)
    }
  } catch (error) {
    console.error("Error reading progress:", error)
  }

  return { completedLessons: [] }
}

export function saveProgress(progress: Progress): void {
  if (typeof window === "undefined") return

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent(PROGRESS_EVENT, { detail: progress }))
    }, 0)
  } catch (error) {
    console.error("Error saving progress:", error)
  }
}

export function markLessonComplete(lessonSlug: string): void {
  const progress = getProgress()

  if (!progress.completedLessons.includes(lessonSlug)) {
    progress.completedLessons.push(lessonSlug)
    saveProgress(progress)
  }
}

export function isLessonComplete(lessonSlug: string): boolean {
  const progress = getProgress()
  return progress.completedLessons.includes(lessonSlug)
}

export function getChapterProgress(chapterId: string, lessons: Array<{ slug: string }>): number {
  const progress = getProgress()
  const completedCount = lessons.filter((lesson) => progress.completedLessons.includes(lesson.slug)).length

  return lessons.length > 0 ? Math.round((completedCount / lessons.length) * 100) : 0
}

export function updateLastVisited(lessonSlug: string): void {
  const progress = getProgress()
  progress.lastVisited = lessonSlug
  saveProgress(progress)
}
