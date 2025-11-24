"use client"

interface ChapterTopic {
  icon: string // Now accepts any Material Icon name (e.g., "description", "edit", "code", "check_circle", "warning", "info")
  text: string
}

interface ChapterOverviewProps {
  topics?: ChapterTopic[]
  items?: ChapterTopic[]
}

const MaterialIcon = ({ name }: { name: string }) => {
  return (
    <span
      className="material-symbols-outlined text-[20px] select-none"
      style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 20" }}
    >
      {name}
    </span>
  )
}

export function ChapterOverview({ topics, items }: ChapterOverviewProps) {
  // Support both 'topics' and 'items' prop names
  const displayItems = topics || items

  if (!displayItems || !Array.isArray(displayItems)) {
    return null
  }

  return (
    <div className="my-8 rounded-lg bg-muted/50 mx-[-75px] px-[75px] py-[75px] mb-16">
      <h2 className="text-2xl font-bold mb-2">In this chapter...</h2>
      <p className="text-muted-foreground mb-6">Here are the topics we'll cover</p>

      <div className="bg-background rounded-lg border divide-y">
        {displayItems.map((topic, index) => (
          <div key={index} className="flex items-start gap-4 p-4">
            <div className="text-muted-foreground flex-shrink-0 mt-0.5">
              <MaterialIcon name={topic.icon} />
            </div>
            <p className="text-base leading-relaxed" dangerouslySetInnerHTML={{ __html: topic.text }} />
          </div>
        ))}
      </div>
    </div>
  )
}
