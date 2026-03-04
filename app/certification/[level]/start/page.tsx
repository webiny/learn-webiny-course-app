"use client"

import { useState } from "react"
import { useRouter, useParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft } from "lucide-react"
import { ThemeSwitcher } from "@/components/theme-switcher"
import { FontSizeControl } from "@/components/font-size-control"
import { WebinyLogo } from "@/components/webiny-logo"
import { examQuestions } from "@/lib/exam-questions"

const certificationInfo = {
  associate: {
    title: "Associate",
    description: "Fundamental knowledge of Webiny and serverless development",
    duration: "45 minutes",
    questions: examQuestions.associate.length,
    passingScore: 70,
  },
  professional: {
    title: "Professional",
    description: "Build production-ready applications with Webiny",
    duration: "60 minutes",
    questions: examQuestions.professional.length,
    passingScore: 75,
  },
  expert: {
    title: "Expert",
    description: "Master-level certification for experienced developers",
    duration: "90 minutes",
    questions: examQuestions.expert.length,
    passingScore: 80,
  },
}

export default function ExamStartPage() {
  const router = useRouter()
  const params = useParams()
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: ""
  })

  const level = (params?.level as string) as keyof typeof certificationInfo
  const info = certificationInfo[level]

  if (!info) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Invalid certification level</h1>
          <p className="text-muted-foreground mb-4">Received level: "{params?.level}"</p>
          <p className="text-sm text-muted-foreground mb-4">
            Valid levels: {Object.keys(certificationInfo).join(', ')}
          </p>
          <Button asChild>
            <Link href="/certification">Back to Certifications</Link>
          </Button>
        </div>
      </div>
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Store user info in sessionStorage
    sessionStorage.setItem('certUserInfo', JSON.stringify(formData))
    // Navigate to exam
    router.push(`/certification/${level}/exam`)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-10">
        <div className="container mx-auto flex max-w-5xl items-center justify-between px-4 h-16">
          <Link href="/" className="flex items-center gap-2 font-semibold text-lg">
            <WebinyLogo />
            <span>Webiny</span>
          </Link>
          <div className="flex items-center gap-4">
            <FontSizeControl />
            <ThemeSwitcher />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="mb-6">
          <Button asChild variant="ghost" size="sm">
            <Link href="/certification">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Certifications
            </Link>
          </Button>
        </div>

        <Card className={"rounded-lg"}>
          <CardHeader>
            <CardTitle className="text-2xl">
              Webiny Certified {info.title}
            </CardTitle>
            <CardDescription>
              {info.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Exam Information */}
            <div className="grid md:grid-cols-3 gap-4 p-4 bg-muted/50 rounded-lg">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{info.questions}</div>
                <div className="text-sm text-muted-foreground">Questions</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{info.duration}</div>
                <div className="text-sm text-muted-foreground">Duration</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{info.passingScore}%</div>
                <div className="text-sm text-muted-foreground">Passing Score</div>
              </div>
            </div>

            {/* User Information Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="John Doe"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="company">Company Name</Label>
                <Input
                  id="company"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="Acme Corp (optional)"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="john@example.com"
                />
              </div>

              <div className="pt-4 space-y-4">
                <div className="text-sm text-muted-foreground space-y-2">
                  <p className="font-medium text-foreground">Before you start:</p>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    <li>This is an honor-system certification</li>
                    <li>Please answer questions honestly to get maximum value</li>
                    <li>Your results will be submitted to Webiny for record-keeping</li>
                    <li>You can take the exam multiple times if needed</li>
                  </ul>
                </div>

                <Button type="submit" className="w-full" size="lg">
                  Start Exam
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

