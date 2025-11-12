"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, ArrowRight, Play } from "lucide-react"
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
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-semibold text-lg">
            <WebinyLogo className="w-8 h-8" />
            <span>webiny</span>
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Showcase
            </Link>
            <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Docs
            </Link>
            <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Blog
            <FontSizeControl />
            </Link>
            <ThemeSwitcher />
            <Button size="sm" asChild className="bg-[#FF5A00] hover:bg-[#E54F00] text-white">
              <Link href="/course">Learn</Link>
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">Start building with Webiny</h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 text-pretty">{courseData.description}</p>
        </div>

        {mounted && lastVisitedLesson && (
          <div className="max-w-2xl mx-auto mb-8">
            <Card className="border-2 border-accent/50 shadow-lg bg-accent/5">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                    <Play className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Continue Learning</CardTitle>
                    <CardDescription>Pick up where you left off</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{lastVisitedLesson.chapter.title}</p>
                    <p className="font-medium">{lastVisitedLesson.lesson.title}</p>
                  </div>
                  <Button asChild>
                    <Link href={`/course/${lastVisited}`}>
                      Continue
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Main Course Card */}
        <div className="max-w-2xl mx-auto mb-16">
          <Card className="border-2 shadow-lg">
            <CardHeader className="text-center pb-8">
              <div className="mx-auto mb-4 w-24 h-24 rounded-2xl bg-[#FF5A00]/10 flex items-center justify-center">
                <BookOpen className="w-12 h-12 text-[#FF5A00]" />
              </div>
              <CardTitle className="text-2xl mb-2">Learn Webiny</CardTitle>
              <CardDescription className="text-base">
                {courseData.chapters.length} chapters that take you from beginner to Webiny expert.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border rounded-lg p-4 bg-muted/30">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-sm font-medium">0</span>
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Chapter 0: Introduction</h3>
                    <p className="text-sm text-muted-foreground">Dive into the course materials</p>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Button asChild className="w-full" size="lg">
                  <Link href="/course">
                    Start Learning
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
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
