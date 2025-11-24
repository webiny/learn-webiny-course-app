import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { CourseSidebar } from "@/components/course-sidebar"
import { LessonHeader } from "@/components/lesson-header"
import { LessonContentWrapper } from "@/components/lesson-content-wrapper"
import { LessonNavigation } from "@/components/lesson-navigation"
import { getLessonDataBySlug, getNextLesson, getPreviousLesson, isLastLessonInChapter, getLessonNumberInChapter } from "@/lib/mdx-registry-helpers"
import { loadMDXContent } from "@/lib/mdx-loader"

interface LessonPageProps {
  params: Promise<{
    slug: string[]
  }>
}

export async function generateMetadata({ params }: LessonPageProps): Promise<Metadata> {
  const { slug } = await params
  const lessonSlug = slug.join("/")

  const lessonData = getLessonDataBySlug(lessonSlug)

  if (!lessonData) {
    return {
      title: "Lesson Not Found - Learn Webiny",
      description: "The requested lesson could not be found.",
    }
  }

  const { chapter, lesson } = lessonData
  const mdxContent = await loadMDXContent(lessonSlug)
  const displayTitle = mdxContent?.frontmatter?.title || lesson.title
  const description = mdxContent?.frontmatter?.description || `Learn ${displayTitle} in Chapter ${chapter.number}: ${chapter.title}`

  return {
    title: `${displayTitle} - ${chapter.title} - Learn Webiny`,
    description: description,
  }
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { slug } = await params
  const lessonSlug = slug.join("/")

  console.log("[v0] Loading lesson page for slug:", lessonSlug)

  const lessonData = getLessonDataBySlug(lessonSlug)

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
          <div className="container mx-auto py-8 max-w-4xl 2xl:px-4 md:px-24 ">
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
