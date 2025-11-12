"use client"

interface ChapterTopic {
  icon: "file" | "pencil" | "code" | "check" | "alert" | "info"
  text: string
}

interface ChapterOverviewProps {
  topics: ChapterTopic[]
}

const IconSVG = ({ type }: { type: string }) => {
  const icons = {
    file: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
    ),
    pencil: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
        />
      </svg>
    ),
    code: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    check: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    alert: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
      </svg>
    ),
    info: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  }
  return icons[type as keyof typeof icons] || icons.info
}

export function ChapterOverview({ topics }: ChapterOverviewProps) {
  if (!topics || !Array.isArray(topics)) {
    return null
  }

  return (
    <div className="my-8 rounded-lg bg-muted/30 p-8">
      <h2 className="text-2xl font-bold mb-2">In this chapter...</h2>
      <p className="text-muted-foreground mb-6">Here are the topics we'll cover</p>

      <div className="bg-background rounded-lg border divide-y">
        {topics.map((topic, index) => (
          <div key={index} className="flex items-start gap-4 p-4">
            <div className="text-muted-foreground flex-shrink-0 mt-0.5">
              <IconSVG type={topic.icon} />
            </div>
            <p className="text-base leading-relaxed" dangerouslySetInnerHTML={{ __html: topic.text }} />
          </div>
        ))}
      </div>
    </div>
  )
}
