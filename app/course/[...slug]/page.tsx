import { notFound } from "next/navigation"
import { CourseSidebar } from "@/components/course-sidebar"
import { LessonHeader } from "@/components/lesson-header"
import { LessonContentWrapper } from "@/components/lesson-content-wrapper"
import { LessonNavigation } from "@/components/lesson-navigation"
import { getLessonBySlug, getNextLesson, getPreviousLesson, isLastLessonInChapter, getLessonNumberInChapter } from "@/lib/course-data"
import { loadMDXContent } from "@/lib/mdx-loader"

interface LessonPageProps {
  params: Promise<{
    slug: string[]
  }>
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { slug } = await params
  const lessonSlug = slug.join("/")

  console.log("[v0] Loading lesson page for slug:", lessonSlug)

  const lessonData = getLessonBySlug(lessonSlug)

  if (!lessonData) {
    console.log("[v0] Lesson data not found for slug:", lessonSlug)
    notFound()
  }

  const { chapter, lesson } = lessonData
  console.log("[v0] Found lesson:", lesson.title, "in chapter:", chapter.title)

  const nextLesson = getNextLesson(lessonSlug)
  const previousLesson = getPreviousLesson(lessonSlug)
  const isLastLesson = isLastLessonInChapter(lessonSlug)
  const lessonNumber = getLessonNumberInChapter(lessonSlug)

  const mdxContent = await loadMDXContent(lessonSlug)

  if (!mdxContent) {
    console.log("[v0] MDX component not found, calling notFound()")
    notFound()
  }

  const { Component: MDXComponent, frontmatter } = mdxContent
  console.log("[v0] MDX component loaded successfully", { frontmatter })

  // Use frontmatter title if available, otherwise fall back to lesson title
  const displayTitle = frontmatter.title || lesson.title

  return (
    <div className="flex min-h-screen">
      <CourseSidebar />

      <div className="flex-1 flex flex-col">
        <LessonHeader title={displayTitle} chapterTitle={chapter.title} />

        <main className="flex-1">
          <div className="container mx-auto px-4 py-8 max-w-4xl">
            <LessonContentWrapper
              lessonSlug={lessonSlug}
              lessonTitle={displayTitle}
              chapterTitle={chapter.title}
              chapterNumber={chapter.number}
              lessonNumber={lessonNumber}
            >
              <MDXComponent />
            </LessonContentWrapper>

            <LessonNavigation
              currentSlug={lessonSlug}
              previousLesson={previousLesson}
              nextLesson={nextLesson}
              isLastLessonInChapter={isLastLesson}
              currentChapterId={chapter.id}
            />
          </div>
        </main>
      </div>
    </div>
  )
}
