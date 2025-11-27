"use client"

import Link from "next/link"
import { Check, ChevronRight } from "lucide-react"
import { courseData } from "@/lib/course-data"
import { useProgress } from "@/hooks/use-progress"
import { ChapterIcon } from "@/lib/chapter-icons"

export function CourseLessonList() {
    const { progress, mounted } = useProgress()

    // Sort chapters by number to ensure correct order
    const sortedChapters = [...courseData.chapters].sort((a, b) => a.number - b.number)

    return (
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
    )
}
