import { ChapterIconType } from "./chapter-icons"

export interface Lesson {
  id: string
  title: string
  slug: string
}

export interface Chapter {
  id: string
  number: number
  title: string
  description: string
  icon: ChapterIconType
  lessons: Lesson[]
}

export interface Course {
  id: string
  title: string
  description: string
  chapters: Chapter[]
}

export const courseData: Course = {
  id: "learn-webiny",
  title: "Learn Webiny",
  description:
    "Go from beginner to expert by learning the foundations of Webiny and building a fully functional serverless application that uses all the latest features.",
  chapters: [
    {
      id: "introduction",
      number: 1,
      title: "Introduction",
      description: "Dive into the course materials",
      icon: "book",
      lessons: [
        {
          id: "intro",
          title: "Introduction",
          slug: "introduction",
        },
      ],
    },
    {
      id: "getting-started",
      number: 2,
      title: "Getting Started",
      description: "Learn how to create a Webiny application and run your local development server.",
      icon: "rocket",
      lessons: [
        {
          id: "setup",
          title: "Setting Up Your Project",
          slug: "getting-started/setup",
        },
        {
          id: "project-structure",
          title: "Project Structure",
          slug: "getting-started/project-structure",
        },
      ],
    },
    {
      id: "website-builder",
      number: 3,
      title: "Website Builder",
      description: "Learn how to build pages with Webiny's visual website builder.",
      icon: "palette",
      lessons: [
        {
          id: "creating-pages",
          title: "Creating Pages",
          slug: "page-builder/creating-pages",
        },
        {
          id: "custom-elements",
          title: "Custom Page Elements",
          slug: "page-builder/custom-elements",
        },
      ],
    },
    {
      id: "headless-cms",
      number: 4,
      title: "Headless CMS",
      description: "Learn how to use Webiny's Headless CMS to manage your content.",
      icon: "edit",
      lessons: [
        {
          id: "content-models",
          title: "Creating Content Models",
          slug: "headless-cms/content-models",
        },
        {
          id: "graphql-api",
          title: "Using the GraphQL API",
          slug: "headless-cms/graphql-api",
        },
      ],
    },
    {
      id: "serverless",
      number: 5,
      title: "Serverless Architecture",
      description: "Learn about Webiny's serverless architecture and deployment.",
      icon: "cloud",
      lessons: [
        {
          id: "architecture",
          title: "Understanding the Architecture",
          slug: "serverless/architecture",
        },
        {
          id: "deployment",
          title: "Deploying to AWS",
          slug: "serverless/deployment",
        },
      ],
    },
    {
      id: "best-practices",
      number: 6,
      title: "Best Practices",
      description: "Learn best practices for performance and security in Webiny.",
      icon: "zap",
      lessons: [
        {
          id: "performance",
          title: "Performance Optimization",
          slug: "best-practices/performance",
        },
        {
          id: "security",
          title: "Security Best Practices",
          slug: "best-practices/security",
        },
      ],
    },
  ],
}

export function getAllLessons(): Array<{ chapterId: string; lessonId: string; slug: string }> {
  const lessons: Array<{ chapterId: string; lessonId: string; slug: string }> = []

  courseData.chapters.forEach((chapter) => {
    chapter.lessons.forEach((lesson) => {
      lessons.push({
        chapterId: chapter.id,
        lessonId: lesson.id,
        slug: lesson.slug,
      })
    })
  })

  return lessons
}

export function getNextLesson(currentSlug: string): { chapterId: string; lessonId: string; slug: string } | null {
  const allLessons = getAllLessons()
  const currentIndex = allLessons.findIndex((l) => l.slug === currentSlug)

  if (currentIndex === -1 || currentIndex === allLessons.length - 1) {
    return null
  }

  return allLessons[currentIndex + 1]
}

export function getPreviousLesson(currentSlug: string): { chapterId: string; lessonId: string; slug: string } | null {
  const allLessons = getAllLessons()
  const currentIndex = allLessons.findIndex((l) => l.slug === currentSlug)

  if (currentIndex <= 0) {
    return null
  }

  return allLessons[currentIndex - 1]
}

export function getLessonBySlug(slug: string) {
  for (const chapter of courseData.chapters) {
    const lesson = chapter.lessons.find((l) => l.slug === slug)
    if (lesson) {
      return { chapter, lesson }
    }
  }
  return null
}

export function isLastLessonInChapter(slug: string): boolean {
  const result = getLessonBySlug(slug)
  if (!result) return false

  const { chapter, lesson } = result
  const lessonIndex = chapter.lessons.findIndex((l) => l.id === lesson.id)
  return lessonIndex === chapter.lessons.length - 1
}

export function getNextChapter(currentSlug: string): Chapter | null {
  const result = getLessonBySlug(currentSlug)
  if (!result) return null

  const { chapter } = result
  const chapterIndex = courseData.chapters.findIndex((c) => c.id === chapter.id)

  if (chapterIndex === -1 || chapterIndex === courseData.chapters.length - 1) {
    return null
  }

  return courseData.chapters[chapterIndex + 1]
}

export function getChapterById(chapterId: string): Chapter | null {
  return courseData.chapters.find((c) => c.id === chapterId) || null
}

export function getLessonNumber(slug: string): number {
  const allLessons = getAllLessons()
  const index = allLessons.findIndex((l) => l.slug === slug)
  return index !== -1 ? index + 1 : 0
}

export function getLessonNumberInChapter(slug: string): number {
  const result = getLessonBySlug(slug)
  if (!result) return 0

  const { chapter, lesson } = result
  const lessonIndex = chapter.lessons.findIndex((l) => l.id === lesson.id)
  return lessonIndex !== -1 ? lessonIndex + 1 : 0
}

