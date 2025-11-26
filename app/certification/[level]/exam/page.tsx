"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import Link from "next/link"
import { examQuestions } from "@/lib/exam-questions"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { ThemeSwitcher } from "@/components/theme-switcher"
import { FontSizeControl } from "@/components/font-size-control"
import { WebinyLogo } from "@/components/webiny-logo"
import { ArrowLeft } from "lucide-react"

export default function ExamPage() {
  const router = useRouter()
  const params = useParams()
  const level = params?.level as string
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [userInfo, setUserInfo] = useState<any>(null)
  const [submitting, setSubmitting] = useState(false)

  const questions = examQuestions[level as keyof typeof examQuestions]

  useEffect(() => {
    const stored = sessionStorage.getItem('certUserInfo')
    if (!stored) {
      router.push(`/certification/${level}/start`)
      return
    }
    setUserInfo(JSON.parse(stored))
  }, [level, router])

  const handleSubmit = async () => {
    setSubmitting(true)

    const correctAnswers = questions.filter(q => answers[q.id] === q.correctAnswer).length
    const score = Math.round((correctAnswers / questions.length) * 100)

    // Send to Slack
    try {
      await fetch('/api/certification/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: userInfo.name,
          company: userInfo.company,
          email: userInfo.email,
          level: level,
          score,
          totalQuestions: questions.length,
          correctAnswers
        })
      })
    } catch (error) {
      console.error('Failed to send notification:', error)
    }

    // Clear user info
    sessionStorage.removeItem('certUserInfo')

    // Navigate to results
    router.push(`/certification/${level}/result?score=${score}&name=${encodeURIComponent(userInfo.name)}`)
  }

  if (!userInfo) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading exam...</p>
        </div>
      </div>
    )
  }

  const progress = (Object.keys(answers).length / questions.length) * 100

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
            <span className="text-sm text-muted-foreground">
              {Object.keys(answers).length} / {questions.length} answered
            </span>
            <FontSizeControl />
            <ThemeSwitcher />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-6">
          <Button asChild variant="ghost" size="sm">
            <Link href={`/certification/${level}/start`}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Link>
          </Button>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-3xl font-bold">
              {level.charAt(0).toUpperCase() + level.slice(1)} Certification Exam
            </h1>
          </div>
          <Progress value={progress} className="h-2 mb-2" />
          <p className="text-sm text-muted-foreground">
            Answer all questions honestly. This is an honor-system certification.
          </p>
        </div>

        <div className="space-y-6 mb-8">
          {questions.map((q, idx) => (
            <Card key={q.id} className={answers[q.id] !== undefined ? "border-primary/50" : ""}>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-bold">
                    {idx + 1}
                  </span>
                  Question {idx + 1}
                </CardTitle>
                <CardDescription className="text-base font-normal text-foreground">
                  {q.question}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  onValueChange={(val) => setAnswers({ ...answers, [q.id]: parseInt(val) })}
                  value={answers[q.id]?.toString()}
                >
                  {q.options.map((option, optIdx) => (
                    <div key={optIdx} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                      <RadioGroupItem value={optIdx.toString()} id={`${q.id}-${optIdx}`} className="mt-0.5" />
                      <Label htmlFor={`${q.id}-${optIdx}`} className="cursor-pointer flex-1 leading-relaxed">
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="sticky bottom-4 bg-background/95 backdrop-blur border rounded-lg p-4 shadow-lg">
          <div className="flex items-center justify-between gap-4">
            <div className="text-sm">
              <span className="font-medium">{Object.keys(answers).length}</span> of{' '}
              <span className="font-medium">{questions.length}</span> questions answered
            </div>
            <Button
              onClick={handleSubmit}
              disabled={Object.keys(answers).length !== questions.length || submitting}
              size="lg"
            >
              {submitting ? 'Submitting...' : 'Submit Exam'}
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}

