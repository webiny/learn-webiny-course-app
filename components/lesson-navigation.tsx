"use client"

import { useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

interface LessonNavigationProps {
  currentSlug: string
  previousLesson: { chapterId: string; lessonId: string; slug: string } | null
  nextLesson: { chapterId: string; lessonId: string; slug: string } | null
  isLastLessonInChapter: boolean
  currentChapterId: string
}

export function LessonNavigation({
  currentSlug,
  previousLesson,
  nextLesson,
  isLastLessonInChapter,
  currentChapterId,
}: LessonNavigationProps) {
  const router = useRouter()

  const nextUrl = isLastLessonInChapter
    ? `/course/${currentChapterId}/complete`
    : nextLesson
      ? `/course/${nextLesson.slug}`
      : null

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Alt/Option + Arrow keys for navigation
      if (e.altKey) {
        if (e.key === "ArrowLeft" && previousLesson) {
          e.preventDefault()
          router.push(`/course/${previousLesson.slug}`)
        } else if (e.key === "ArrowRight" && nextUrl) {
          e.preventDefault()
          router.push(nextUrl)
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [previousLesson, nextUrl, router])

  return (
    <div className="flex flex-col gap-4 pt-8 mt-8 border-t mx-[-75px] px-[75px] pb-[50px]">
      <div className="text-center text-sm text-muted-foreground">
        <p>
          Use <kbd className="px-2 py-1 text-xs bg-muted rounded border">Alt</kbd> +{" "}
          <kbd className="px-2 py-1 text-xs bg-muted rounded border">←</kbd>
          {nextUrl && (
            <>
              {" "}
              / <kbd className="px-2 py-1 text-xs bg-muted rounded border">→</kbd>
            </>
          )}{" "}
          to navigate
        </p>
      </div>

      <div className="flex items-center justify-between mt-[-45px]">
        <div>
          {previousLesson ? (
            <Button asChild variant="outline">
              <Link href={`/course/${previousLesson.slug}`}>
                <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Previous
              </Link>
            </Button>
          ) : (
            <div />
          )}
        </div>

        <div>
          {nextUrl ? (
            <Button asChild>
              <Link href={nextUrl}>
                Next
                <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </Button>
          ) : (
            <Button asChild variant="outline">
              <Link href="/course">Back to Course</Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
