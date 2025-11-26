import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { CourseSidebar } from "@/components/course-sidebar"
import { LessonHeader } from "@/components/lesson-header"
import { getChapterQuiz } from "@/lib/chapter-quizzes"
import { getChapterMetadata } from "@/lib/chapter-metadata"
import { ChapterQuizClient } from "@/components/chapter-quiz-client"

interface ChapterQuizPageProps {
  params: Promise<{
    chapterId: string
  }>
}

export async function generateMetadata({ params }: ChapterQuizPageProps): Promise<Metadata> {
  const { chapterId } = await params
  const quiz = getChapterQuiz(chapterId)
  const chapterMeta = getChapterMetadata(chapterId)

  if (!quiz) {
    return {
      title: "Quiz Not Found - Learn Webiny",
      description: "The requested quiz could not be found.",
    }
  }

  return {
    title: `${chapterMeta.title} Quiz - Learn Webiny`,
    description: `Test your knowledge of ${chapterMeta.title} with this comprehensive quiz.`,
  }
}

export default async function ChapterQuizPage({ params }: ChapterQuizPageProps) {
  const { chapterId } = await params
  const quiz = getChapterQuiz(chapterId)
  const chapterMeta = getChapterMetadata(chapterId)

  if (!quiz) {
    notFound()
  }

  return (
    <div className="flex min-h-screen">
      <CourseSidebar />

      <div className="flex-1 flex flex-col">
        <LessonHeader title="Chapter Quiz" chapterTitle={chapterMeta.title} />

        <main className="flex-1">
          <div className="container mx-auto px-4 py-8 max-w-4xl">
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold mb-2">Test Your Knowledge</h1>
              <p className="text-muted-foreground">
                Complete this quiz to demonstrate your understanding of {chapterMeta.title}.
                You need {quiz.passingScore}% to pass.
              </p>
            </div>

            <ChapterQuizClient
              chapterId={quiz.chapterId}
              chapterTitle={quiz.chapterTitle}
              questions={quiz.questions}
              passingScore={quiz.passingScore}
            />
          </div>
        </main>
      </div>
    </div>
  )
}

