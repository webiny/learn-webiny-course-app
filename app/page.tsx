"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Play } from "lucide-react"
import {ChapterCover} from "@/components/chapter-cover";
import { courseData, getLessonBySlug } from "@/lib/course-data"
import { getProgress } from "@/lib/progress"
import { ThemeSwitcher } from "@/components/theme-switcher"
import { FontSizeControl } from "@/components/font-size-control"
import { WebinyLogo } from "@/components/webiny-logo"

export default function HomePage() {
  const [lastVisited, setLastVisited] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const progress = getProgress()
    setLastVisited(progress.lastVisited || null)
  }, [])

  const lastVisitedLesson = lastVisited ? getLessonBySlug(lastVisited) : null

  return (
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
        {/* Header */}
        <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container mx-auto flex max-w-5xl items-center justify-between px-4 h-16 flex items-center">
            <Link href="/" className="flex items-center gap-2 font-semibold text-lg">
              <WebinyLogo className="w-8 h-8" />
              <span>Webiny</span>
            </Link>
            <nav className="flex items-center gap-6">
              <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Home
              </Link>
              <Link href="/docs" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Docs
              </Link>

              <FontSizeControl />
              <ThemeSwitcher />
            </nav>
          </div>
        </header>

        {/* Hero Section */}
        <main className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center mb-24">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-balance">Start building with Webiny</h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 text-pretty">{courseData.description}</p>
          </div>

          {/* Main Course Card */}
          <div className="max-w-2xl mx-auto mb-16">
            <Card className="border-2 shadow-lg">
              <CardHeader className="text-center pb-8">
                <ChapterCover/>
                <CardTitle className="text-2xl mb-2">Learn Webiny</CardTitle>
                <CardDescription className="text-base">
                  {courseData.chapters.length} chapters that take you from beginner to Webiny expert.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border rounded-lg p-4 bg-muted/30">
                  {(mounted && lastVisitedLesson) ?
                      <div className="flex items-start gap-3">
                        <div
                            className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-sm font-medium">{lastVisitedLesson.chapter.number}</span>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Chapter {lastVisitedLesson.chapter.number}: {lastVisitedLesson.chapter.title}</p>
                          <p className="font-medium">{lastVisitedLesson.lesson.title}</p>
                        </div>
                      </div>
                      :
                      <div className="flex items-start gap-3">
                        <div
                            className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-sm font-medium">0</span>
                        </div>
                        <div>
                          <h3 className="font-medium mb-1">Chapter 1: Introduction</h3>
                          <p className="text-sm text-muted-foreground">Dive into the course materials</p>
                        </div>
                      </div>
                  }
                </div>

                <div className="pt-4">
                  <Button asChild className="w-full" size="lg">
                    {(mounted && lastVisitedLesson) ?
                        <Link href={`/course/${lastVisited}`}>
                          Continue Learning
                          <ArrowRight className="ml-2 h-4 w-4"/>
                        </Link>
                        :
                        <Link href="/course">
                          Start Learning
                          <ArrowRight className="ml-2 h-4 w-4"/>
                        </Link>
                    }
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Additional Courses */}
          <div className="max-w-2xl mx-auto space-y-4">
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-[#FF5A00]/10 flex items-center justify-center">
                      <span className="text-2xl">📝</span>
                    </div>
                    <div>
                      <CardTitle className="text-lg">Headless CMS Foundations</CardTitle>
                      <CardDescription>
                        New to headless CMS? Learn the foundational concepts of content modeling and API-first
                        architecture.
                      </CardDescription>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/course">
                      Start
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-[#FF5A00]/10 flex items-center justify-center">
                      <span className="text-2xl">☁️</span>
                    </div>
                    <div>
                      <CardTitle className="text-lg">Serverless Architecture</CardTitle>
                      <CardDescription>
                        Learn how to build and deploy serverless applications with Webiny on AWS.
                      </CardDescription>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/course">
                      Start
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardHeader>
            </Card>
          </div>
        </main>
      </div>
  )
}
