"use client"

import { useState, useEffect, useCallback } from "react"
import { getProgress, saveProgress, type Progress } from "@/lib/progress"

export function useProgress() {
  const [progress, setProgress] = useState<Progress>({ completedLessons: [] })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setProgress(getProgress())

    const handleProgressUpdate = (event: Event) => {
      const customEvent = event as CustomEvent<Progress>
      setProgress(customEvent.detail)
    }

    window.addEventListener("progress-updated", handleProgressUpdate)

    return () => {
      window.removeEventListener("progress-updated", handleProgressUpdate)
    }
  }, [])

  const markComplete = useCallback((lessonSlug: string) => {
    setProgress((prev) => {
      const newProgress = {
        ...prev,
        completedLessons: prev.completedLessons.includes(lessonSlug)
          ? prev.completedLessons
          : [...prev.completedLessons, lessonSlug],
      }
      saveProgress(newProgress)
      return newProgress
    })
  }, [])

  const isComplete = useCallback(
    (lessonSlug: string) => {
      return progress.completedLessons.includes(lessonSlug)
    },
    [progress.completedLessons],
  )

  const updateLastVisited = useCallback((lessonSlug: string) => {
    setProgress((prev) => {
      const newProgress = {
        ...prev,
        lastVisited: lessonSlug,
      }
      saveProgress(newProgress)
      return newProgress
    })
  }, [])

  return {
    progress,
    markComplete,
    isComplete,
    updateLastVisited,
    mounted,
  }
}
