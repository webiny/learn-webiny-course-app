"use client"

import { useLessonContext } from "@/components/lesson-context"

export function LessonH1({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  const { lessonNumber } = useLessonContext()

  return (
    <div className="flex gap-8 items-start mb-12 mt-8">
      {/* Large Lesson Number */}
      <div className="flex-shrink-0">
        <div className="text-[100px] leading-none font-bold text-muted-foreground/15 select-none">
          {lessonNumber}
        </div>
      </div>

      {/* Chapter Title and Lesson Title */}
      <div className="flex-1 pt-3">
        <div className="text-sm text-muted-foreground mb-2 font-medium tracking-wide">
          Lesson {lessonNumber}
        </div>
        <h1 className="m-0 -mt-2 text-5xl font-bold leading-tight tracking-tight" {...props}>
          {children}
        </h1>
      </div>
    </div>
  )
}

