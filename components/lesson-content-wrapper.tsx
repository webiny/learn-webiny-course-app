"use client"

import type React from "react"

import { LessonCompleteCard } from "@/components/lesson-complete-card"

interface LessonContentWrapperProps {
  lessonSlug: string
  lessonTitle: string
  chapterTitle: string
  children: React.ReactNode
}

export function LessonContentWrapper({ lessonSlug, lessonTitle, chapterTitle, children }: LessonContentWrapperProps) {
  return (
    <div className="space-y-8">
      {/* Lesson Content */}
      <div className="prose prose-slate dark:prose-invert max-w-none">
        {children}
      </div>

      {/* Mark Complete Card */}
      <LessonCompleteCard lessonSlug={lessonSlug} />
    </div>
  )
}
