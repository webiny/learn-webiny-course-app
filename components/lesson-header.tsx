"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { useProgress } from "@/hooks/use-progress"
import { courseData } from "@/lib/course-data"
import { useMemo } from "react"
import { ThemeSwitcher } from "@/components/theme-switcher"
import { FontSizeControl } from "@/components/font-size-control"

interface LessonHeaderProps {
  title: string
  chapterTitle: string
}

export function LessonHeader({ title, chapterTitle }: LessonHeaderProps) {
  const { progress, mounted } = useProgress()

  const overallProgress = useMemo(() => {
    if (!mounted) return 0
    const totalLessons = courseData.chapters.reduce((acc, chapter) => acc + chapter.lessons.length, 0)
    const completedCount = progress.completedLessons.length
    return totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0
  }, [progress.completedLessons.length, mounted])

  return (
    <header className="sticky top-0 z-30 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center justify-between pl-14 pr-4 h-16">
        <div className="flex items-center gap-4 min-w-0 flex-1">
          <Button variant="ghost" size="icon" className="lg:hidden flex-shrink-0">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </Button>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-0.5">
              <Link href="/course" className="hover:text-foreground transition-colors flex-shrink-0">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
              <span className="truncate">{chapterTitle}</span>
            </div>
            <h1 className="font-semibold truncate">{title}</h1>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {mounted && (
            <div className="hidden md:flex items-center gap-3">
              <div className="w-32">
                <Progress value={overallProgress} className="h-2" />
              </div>
              <span className="text-sm text-muted-foreground whitespace-nowrap">{overallProgress}% Complete</span>
            </div>
          )}
          <FontSizeControl />
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  )
}
