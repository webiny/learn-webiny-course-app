"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, CheckCircle2 } from "lucide-react"
import { ThemeSwitcher } from "@/components/theme-switcher"
import { FontSizeControl } from "@/components/font-size-control"
import { WebinyLogo } from "@/components/webiny-logo"

const certificationLevels = [
  {
    id: "associate",
    title: "Webiny Certified Associate",
    icon: "badge",
    color: "from-blue-500/20 to-cyan-500/20",
    borderColor: "border-blue-500/50",
    iconColor: "text-blue-600 dark:text-blue-400",
    level: "Beginner",
    description: "Demonstrate fundamental knowledge of Webiny and serverless development",
    requirements: [
      "Complete all Foundation chapter lessons",
      "Complete Getting Started chapter",
      "Pass the Associate certification quiz (70% or higher)",
      "Build a basic Webiny project following course guidelines"
    ],
    skills: [
      "Understanding of Webiny architecture",
      "Basic setup and configuration",
      "Working with the Admin app",
      "Understanding serverless concepts"
    ],
    estimatedTime: "15-20 hours of study"
  },
  {
    id: "professional",
    title: "Webiny Certified Professional",
    icon: "military_tech",
    color: "from-purple-500/20 to-pink-500/20",
    borderColor: "border-purple-500/50",
    iconColor: "text-purple-600 dark:text-purple-400",
    level: "Intermediate",
    description: "Prove your ability to build production-ready applications with Webiny",
    requirements: [
      "Hold Webiny Certified Associate certification",
      "Complete Headless CMS and Website Builder chapters",
      "Complete Serverless chapter",
      "Pass the Professional certification quiz (75% or higher)",
      "Build and deploy a full-featured Webiny application",
      "Implement custom content models and page elements"
    ],
    skills: [
      "Advanced content modeling",
      "Custom page builder elements",
      "GraphQL API integration",
      "AWS deployment and configuration",
      "Performance optimization basics"
    ],
    estimatedTime: "30-40 hours of study"
  },
  {
    id: "expert",
    title: "Webiny Certified Expert",
    icon: "workspace_premium",
    color: "from-amber-500/20 to-orange-500/20",
    borderColor: "border-amber-500/50",
    iconColor: "text-amber-600 dark:text-amber-400",
    level: "Advanced",
    description: "Master-level certification for experienced Webiny developers",
    requirements: [
      "Hold Webiny Certified Professional certification",
      "Complete all course chapters including Best Practices",
      "Pass the Expert certification quiz (80% or higher)",
      "Build a complex, production-ready application",
      "Demonstrate advanced customization and extension",
      "Contribute to the Webiny community (forum help, blog post, or open source contribution)"
    ],
    skills: [
      "Advanced architecture patterns",
      "Custom plugins and extensions",
      "Security best practices",
      "Performance optimization",
      "Multi-tenancy implementations",
      "CI/CD pipeline setup"
    ],
    estimatedTime: "50-60 hours of study"
  }
]

export default function CertificationPage() {
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

      <main className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Back Button */}
        <div className="mb-6">
          <Button asChild variant="ghost" size="sm">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-4">
            <span className="material-symbols-outlined text-primary text-[48px]">
              workspace_premium
            </span>
          </div>
          <h1 className="text-4xl font-bold mb-4">Webiny Certification Program</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Validate your Webiny expertise and advance your career with official certifications.
            Choose the level that matches your experience and goals.
          </p>
        </div>

        {/* Certification Levels */}
        <div className="space-y-8">
          {certificationLevels.map((cert, index) => (
            <Card key={cert.id} className={`border-2 ${cert.borderColor} relative overflow-hidden`}>
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${cert.color} opacity-50`} />

              <CardHeader className="relative">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-lg bg-background border-2 flex items-center justify-center flex-shrink-0">
                      <span className={`material-symbols-outlined ${cert.iconColor} text-[32px]`}>
                        {cert.icon}
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary">{cert.level}</Badge>
                        <Badge variant="outline">Level {index + 1}</Badge>
                      </div>
                      <CardTitle className="text-2xl mb-2">{cert.title}</CardTitle>
                      <CardDescription className="text-base">{cert.description}</CardDescription>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="relative space-y-6">
                {/* Requirements */}
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <span className="material-symbols-outlined text-[20px]">
                      checklist
                    </span>
                    Requirements
                  </h3>
                  <ul className="space-y-2">
                    {cert.requirements.map((req, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Skills Covered */}
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <span className="material-symbols-outlined text-[20px]">
                      psychology
                    </span>
                    Skills Covered
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {cert.skills.map((skill, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Estimated Time */}
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="material-symbols-outlined text-[18px]">
                      schedule
                    </span>
                    <span>{cert.estimatedTime}</span>
                  </div>
                  <Button asChild>
                    <Link href={`/certification/${cert.id}/start`}>
                      Take Certification Exam
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* How to Get Certified */}
        <Card className="mt-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[24px]">
                help
              </span>
              How to Get Certified
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                  <span className="font-bold text-primary">1</span>
                </div>
                <h3 className="font-semibold">Complete the Course</h3>
                <p className="text-sm text-muted-foreground">
                  Work through all required chapters and lessons for your desired certification level.
                </p>
              </div>
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                  <span className="font-bold text-primary">2</span>
                </div>
                <h3 className="font-semibold">Build Projects</h3>
                <p className="text-sm text-muted-foreground">
                  Apply your knowledge by building the required projects and demonstrating your skills.
                </p>
              </div>
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                  <span className="font-bold text-primary">3</span>
                </div>
                <h3 className="font-semibold">Pass the Exam</h3>
                <p className="text-sm text-muted-foreground">
                  Take and pass the certification quiz with the required score to earn your certificate.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button asChild size="lg">
            <Link href="/course">
              Begin Your Certification Journey
            </Link>
          </Button>
        </div>
      </main>
    </div>
  )
}

