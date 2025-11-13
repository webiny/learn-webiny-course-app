"use client"

import { createContext, useContext } from "react"

interface LessonContextType {
  chapterNumber: number
  chapterTitle: string
  lessonNumber: number
}

const LessonContext = createContext<LessonContextType | null>(null)

export function LessonProvider({
  children,
  chapterNumber,
  chapterTitle,
  lessonNumber,
}: {
  children: React.ReactNode
  chapterNumber: number
  chapterTitle: string
  lessonNumber: number
}) {
  return (
    <LessonContext.Provider value={{ chapterNumber, chapterTitle, lessonNumber }}>
      {children}
    </LessonContext.Provider>
  )
}

export function useLessonContext() {
  const context = useContext(LessonContext)
  if (!context) {
    throw new Error("useLessonContext must be used within a LessonProvider")
  }
  return context
}

