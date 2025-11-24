"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Check, ChevronRight } from "lucide-react"
import { courseData } from "@/lib/course-data"
import { useProgress } from "@/hooks/use-progress"
import { getChapterProgress } from "@/lib/progress"
import { ThemeSwitcher } from "@/components/theme-switcher"
import { FontSizeControl } from "@/components/font-size-control"
import {WebinyLogo} from "@/components/webiny-logo";
import {ChapterCoverIcon} from "@/components/chapter-cover";
import { ChapterIcon } from "@/lib/chapter-icons"

export default function CoursePage() {
  const { progress, mounted } = useProgress()

  // Sort chapters by number to ensure correct order
  const sortedChapters = [...courseData.chapters].sort((a, b) => a.number - b.number)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-10">
        <div className="container mx-auto flex max-w-5xl items-center justify-between px-4 h-16 flex items-center">
          <Link href="/" className="flex items-center gap-2 font-semibold text-lg">
            <WebinyLogo/>
            <span>Webiny</span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              {mounted ? `${progress.completedLessons.length} lessons completed` : "Loading..."}
            </span>
            <FontSizeControl />
            <ThemeSwitcher />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Course Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">{courseData.title}</h1>
          <p className="text-lg text-muted-foreground text-pretty">{courseData.description}</p>
        </div>

        {/* Chapters Grid */}
        <div className="grid gap-0 md:grid-cols-2 mb-12">
          {sortedChapters.map((chapter) => {
            const progressPercent = mounted ? getChapterProgress(chapter.id, chapter.lessons) : 0
            const isComplete = progressPercent === 100

            return (
              <Card key={chapter.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="mt-4  mr-5 ml-2 w-12 h-12 bg-secondary flex items-center justify-center text-2xl">
                        <ChapterCoverIcon icon={<ChapterIcon type={chapter.icon} size={32} />}/>
                      </div>
                      <div>
                        <CardTitle className="text-lg font-extrabold">
                          {chapter.number}. {chapter.title}
                        </CardTitle>
                        <CardDescription className="text-sm mt-1">
                          {chapter.lessons.length} {chapter.lessons.length === 1 ? "lesson" : "lessons"}
                        </CardDescription>
                      </div>
                    </div>
                    {isComplete && (
                        <div className="w-6 h-6 rounded-full bg-foreground mt-2 flex items-center justify-center dark:bg-foreground">
                          <Check className="w-4 h-4 text-accent-foreground dark:text-background" />
                        </div>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{chapter.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">{progressPercent}%</span>
                    </div>
                    <Progress value={progressPercent} className="h-2" />
                    {chapter.lessons.length > 0 ? (
                      <Button asChild variant={progressPercent > 0 ? "default" : "outline"} className="w-full">
                        <Link href={`/course/${chapter.lessons[0].slug}`}>
                          {progressPercent > 0 ? "Continue" : "Start Chapter"}
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    ) : (
                      <Button disabled className="w-full">
                        Coming Soon
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* All Lessons List */}
        <div>
          <h2 className="text-2xl font-bold mb-6">All Lessons</h2>
          <div className="space-y-6">
            {sortedChapters.filter(chapter => chapter.lessons.length > 0).map((chapter) => (
              <div key={chapter.id}>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <span className="text-2xl">
                    <ChapterIcon type={chapter.icon} size={24} />
                  </span>
                  <span>
                    Chapter {chapter.number}: {chapter.title}
                  </span>
                </h3>
                <div className="space-y-2 ml-10">
                  {chapter.lessons.map((lesson, index) => {
                    const isComplete = mounted && progress.completedLessons.includes(lesson.slug)

                    return (
                      <Link
                        key={lesson.id}
                        href={`/course/${lesson.slug}`}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary/50 transition-colors group"
                      >
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium ${
                            isComplete ? "bg-foreground text-white dark:bg-foreground" : "bg-secondary text-muted-foreground"
                          }`}
                        >
                          {isComplete ? <Check className="w-4 h-4 text-accent-foreground dark:text-background" /> : index + 1}
                        </div>
                        <span className="flex-1 group-hover:text-foreground transition-colors">{lesson.title}</span>
                        <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                      </Link>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
