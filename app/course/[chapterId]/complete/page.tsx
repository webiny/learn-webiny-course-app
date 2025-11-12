import { notFound } from "next/navigation"
import { CourseSidebar } from "@/components/course-sidebar"
import { LessonHeader } from "@/components/lesson-header"
import { ChapterCompletion } from "@/components/chapter-completion"
import { getChapterById, getNextChapter } from "@/lib/course-data"

interface ChapterCompletePageProps {
  params: Promise<{
    chapterId: string
  }>
}

export default async function ChapterCompletePage({ params }: ChapterCompletePageProps) {
  const { chapterId } = await params

  const chapter = getChapterById(chapterId)

  if (!chapter) {
    notFound()
  }

  const nextChapter = getNextChapter(chapter.lessons[chapter.lessons.length - 1].slug)

  return (
    <div className="flex min-h-screen">
      <CourseSidebar />

      <div className="flex-1 flex flex-col">
        <LessonHeader title="Chapter Complete" chapterTitle={chapter.title} />

        <main className="flex-1">
          <div className="container mx-auto px-4 py-8 max-w-4xl">
            <ChapterCompletion completedChapter={chapter} nextChapter={nextChapter} />
          </div>
        </main>
      </div>
    </div>
  )
}
