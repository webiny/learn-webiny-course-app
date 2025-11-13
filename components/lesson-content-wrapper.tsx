"use client"

import type React from "react"

import { LessonCompleteCard } from "@/components/lesson-complete-card"
import { LessonProvider } from "@/components/lesson-context"

interface LessonContentWrapperProps {
  lessonSlug: string
  lessonTitle: string
  chapterTitle: string
  chapterNumber: number
  lessonNumber: number
  children: React.ReactNode
}

export function LessonContentWrapper({ lessonSlug, lessonTitle, chapterTitle, chapterNumber, lessonNumber, children }: LessonContentWrapperProps) {
  return (
    <LessonProvider chapterNumber={chapterNumber} chapterTitle={chapterTitle} lessonNumber={lessonNumber}>
      <div className="space-y-8">
        {/* Lesson Content */}
        <div className="prose prose-slate dark:prose-invert max-w-none">
          {children}
        </div>

        {/* Mark Complete Card */}
        <LessonCompleteCard lessonSlug={lessonSlug} />
      </div>
    </LessonProvider>
  )
}
