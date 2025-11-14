"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { getChaptersWithLessons } from "@/lib/mdx-registry";
import { useProgress } from "@/hooks/use-progress"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { ChapterIcon } from "@/lib/chapter-icons"
import { WebinyLogo } from "@/components/webiny-logo"
import { getChapterMetadata } from "@/lib/chapter-metadata"

export function CourseSidebar() {
  const pathname = usePathname()
  const { progress, mounted } = useProgress()
  const [isOpen, setIsOpen] = useState(false)

  const currentSlug = pathname.replace("/course/", "")

  const isOnLessonPage = pathname.startsWith("/course/") && pathname !== "/course"
  const chaptersMap = getChaptersWithLessons();

  // Get current chapter from the slug (e.g., "getting-started/setup" -> "getting-started")
  const currentChapterId = currentSlug.split('/')[0]

  // Build all chapters data
  const allChapters = Object.entries(chaptersMap).map(([chapterId, lessons]) => {
    // Get chapter metadata (title, icon, number, description)
    const metadata = getChapterMetadata(chapterId)

    return {
      id: chapterId,
      lessons,
      title: metadata.title,
      description: metadata.description,
      icon: metadata.icon,
      number: metadata.number,
    }
  });

  // Show only current chapter when on a lesson page, all chapters on course overview
  const chaptersToShow = isOnLessonPage
    ? allChapters.filter(chapter => chapter.id === currentChapterId)
    : allChapters;

  const sidebarContent = (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b">
        <Link href="/course" className="flex items-center gap-2 font-semibold text-lg">
          <WebinyLogo/>
          <span>Webiny</span>
        </Link>
      </div>

      {isOnLessonPage && (
        <div className="p-4 border-b">
          <Button asChild variant="ghost" className="w-full justify-start -ml-2">
            <Link href="/course">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              All Chapters
            </Link>
          </Button>
        </div>
      )}

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-6">
          {chaptersToShow.map((chapter) => {
            const completedLessons = chapter.lessons.filter(
              (lesson) => mounted && progress.completedLessons.includes(lesson.slug),
            ).length
            const totalLessons = chapter.lessons.length
            const isChapterComplete = completedLessons === totalLessons

            return (
              <div key={chapter.id}>
                <div className="flex items-center gap-2 mb-3">
                  <div
                    className={"w-8 h-8 rounded-lg flex items-center justify-center text-lg bg-secondary"}
                  >
                    <ChapterIcon type={chapter.icon} size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-sm truncate">
                      {chapter.number}. {chapter.title}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {completedLessons}/{totalLessons} Lessons
                    </p>
                  </div>
                  {isChapterComplete && (
                    <svg
                      className="w-4 h-4 text-foreground flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>

                <div className="space-y-1 ml-10">
                  {chapter.lessons.map((lesson, index) => {
                    const isActive = currentSlug === lesson.slug
                    const isComplete = mounted && progress.completedLessons.includes(lesson.slug)

                    return (
                      <Link
                        key={lesson.slug}
                        href={`/course/${lesson.slug}`}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors",
                          isActive
                            ? "bg-foreground text-accent-foreground font-medium dark:text-black"
                            : "hover:bg-secondary/50 text-muted-foreground hover:text-foreground",
                        )}
                      >
                        <div
                          className={cn(
                            "w-5 h-5 rounded-full flex items-center justify-center text-xs flex-shrink-0",
                            isComplete
                              ? "bg-accent-foreground/50 dark:text-background"
                              : isActive
                                ? "bg-accent-foreground/20"
                                : "bg-secondary",
                          )}
                        >
                          {isComplete ? (
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          ) : (
                            index + 1
                          )}
                        </div>
                        <span className="flex-1 truncate">{lesson.frontmatter.title}</span>
                      </Link>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </ScrollArea>

      {!isOnLessonPage && (
        <div className="p-4 border-t">
          <Button asChild variant="outline" className="w-full bg-transparent">
            <Link href="/course">View All Chapters</Link>
          </Button>
        </div>
      )}
    </div>
  )

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12M6 12h12" />
          </svg>
        ) : (
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </Button>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 h-full w-90 bg-background border-r z-40 transition-transform duration-300 lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {sidebarContent}
      </aside>

      {/* Desktop Sidebar Spacer */}
      <div className="hidden lg:block w-80 flex-shrink-0" />
    </>
  )
}
