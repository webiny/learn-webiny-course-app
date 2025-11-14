"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Check, ArrowRight, Trophy } from "lucide-react"
import type { Chapter } from "@/lib/course-data"

interface ChapterCompletionProps {
  completedChapter: Chapter
  nextChapter: Chapter | null
}

export function ChapterCompletion({ completedChapter, nextChapter }: ChapterCompletionProps) {
  return (
    <div className="flex flex-col items-center gap-8 py-12 mt-8 border-t">
      {/* Chapter number badge with checkmark */}
      <div className="relative">
        <div className="w-32 h-32 rounded-full bg-gray-100 dark:bg-gray-100 flex items-center justify-center">
          <span className="text-6xl font-bold text-gray-600 dark:text-gray-400">{completedChapter.number}</span>
        </div>
        <div className="absolute -bottom-2 -right-2 w-12 h-12 rounded-full bg-gray-600 dark:bg-gray-500 flex items-center justify-center border-4 border-background">
          <Check className="w-6 h-6 text-white" />
        </div>
      </div>

      {/* Completion message */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold">You've Completed Chapter {completedChapter.number}</h2>
        <p className="text-lg text-muted-foreground max-w-2xl">{completedChapter.description}</p>
      </div>

      {/* Next chapter or course completion */}
      {nextChapter ? (
        <div className="w-full max-w-2xl border rounded-lg p-8 space-y-6 bg-card">
          <div className="text-center space-y-4">
            <p className="text-sm text-muted-foreground font-medium">Next Up</p>
            <h3 className="text-2xl font-bold">
              {nextChapter.number}: {nextChapter.title}
            </h3>
            <p className="text-muted-foreground">{nextChapter.description}</p>
          </div>

          <div className="flex justify-center">
            <Button asChild size="lg" className="gap-2">
              <Link href={`/course/${nextChapter.lessons[0].slug}`}>
                Start Chapter {nextChapter.number}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      ) : (
        <div className="w-full max-w-2xl border rounded-lg p-8 space-y-6 bg-card">
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="w-16 h-16 rounded-full bg-yellow-100 dark:bg-yellow-950 flex items-center justify-center">
                <Trophy className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
              </div>
            </div>
            <h3 className="text-2xl font-bold">Congratulations!</h3>
            <p className="text-muted-foreground">
              You've completed the entire course. You now have the skills to build amazing Next.js applications!
            </p>
          </div>

          <div className="flex justify-center">
            <Button asChild size="lg" variant="outline">
              <Link href="/course">Back to Course Overview</Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
