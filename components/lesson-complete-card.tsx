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
    <Card className="p-6 my-14 mx-[-75px] px-[75px] pt-[50px] pb-[50px] rounded-lg relative overflow-hidden">
      <div className="flex items-center justify-between">
        <div>
          {completed ?
              <>
                <h3 className="font-semibold mb-1">
                  Lesson Completed
                </h3>
                <p className="text-sm text-muted-foreground">
                  Great job! You've completed this lesson."
                </p>
              </>
              :
              <>
                <span>
                  <svg className="mr-2 h-16 w-16 absolute opacity-5 top-[40px] left-[70px]" fill="black" stroke="currentColor" viewBox="0 -960 960 960">
                    <path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/>
                  </svg>
                </span>
                <h3 className="font-semibold mb-1 pl-18">
                  Complete this lesson
                </h3>
                <p className="text-sm text-muted-foreground pl-18">
                  Mark this lesson as complete to track your progress.
                </p>
              </>
          }

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
