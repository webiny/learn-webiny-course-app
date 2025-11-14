"use client"

import { useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useProgress } from "@/hooks/use-progress"

interface LessonCompleteCardProps {
  lessonSlug: string
}

export function LessonCompleteCard({ lessonSlug }: LessonCompleteCardProps) {
  const { markComplete, isComplete, updateLastVisited, mounted } = useProgress()
  const completed = mounted && isComplete(lessonSlug)

  useEffect(() => {
    updateLastVisited(lessonSlug)
  }, [lessonSlug, updateLastVisited])

  const handleMarkComplete = () => {
    markComplete(lessonSlug)
  }

  if (!mounted) {
    return null
  }

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold mb-1">{completed ? "Lesson Completed!" : "Complete this lesson"}</h3>
          <p className="text-sm text-muted-foreground">
            {completed
              ? "Great job! You've completed this lesson."
              : "Mark this lesson as complete to track your progress."}
          </p>
        </div>
        <Button
          onClick={handleMarkComplete}
          disabled={completed}
          variant={completed ? "outline" : "default"}
          className={completed ? "ml-4" : "ml-4 cursor-pointer"}
        >
          {completed ? (
            <>
              <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Completed
            </>
          ) : (
            "Mark Complete"
          )}
        </Button>
      </div>
    </Card>
  )
}
