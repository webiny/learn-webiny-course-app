"use client"

import { useSearchParams, useParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ThemeSwitcher } from "@/components/theme-switcher"
import { FontSizeControl } from "@/components/font-size-control"
import { WebinyLogo } from "@/components/webiny-logo"
import { CheckCircle2, XCircle, Download, Share2 } from "lucide-react"

const certificationLevels = {
  associate: { title: "Associate", passingScore: 70, color: "text-blue-600 dark:text-blue-400" },
  professional: { title: "Professional", passingScore: 75, color: "text-purple-600 dark:text-purple-400" },
  expert: { title: "Expert", passingScore: 80, color: "text-amber-600 dark:text-amber-400" },
}

export default function ResultPage() {
  const searchParams = useSearchParams()
  const params = useParams()
  const level = params?.level as string
  const score = parseInt(searchParams.get('score') || '0')
  const name = searchParams.get('name') || 'Candidate'

  const certInfo = certificationLevels[level as keyof typeof certificationLevels]
  const passed = score >= certInfo.passingScore

  const handlePrint = () => {
    window.print()
  }

  const handleShare = () => {
    const text = `I just ${passed ? 'passed' : 'completed'} the Webiny Certified ${certInfo.title} exam with a score of ${score}%! 🎉`
    const url = 'https://learn.webiny.com/certification'

    if (navigator.share) {
      navigator.share({
        title: 'Webiny Certification',
        text,
        url,
      }).catch(console.error)
    } else {
      // Fallback to LinkedIn share
      const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
      window.open(linkedInUrl, '_blank')
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-10 print:hidden">
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

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <Card className={`border-2 ${passed ? 'border-green-500/50' : 'border-orange-500/50'}`}>
          <CardHeader className="text-center pb-8">
            <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full mx-auto mb-4 ${
              passed ? 'bg-green-500/10' : 'bg-orange-500/10'
            }`}>
              {passed ? (
                <CheckCircle2 className="w-12 h-12 text-green-600 dark:text-green-400" />
              ) : (
                <XCircle className="w-12 h-12 text-orange-600 dark:text-orange-400" />
              )}
            </div>
            <CardTitle className="text-3xl mb-2">
              {passed ? 'Congratulations!' : 'Keep Learning!'}
            </CardTitle>
            <CardDescription className="text-lg">
              {passed
                ? `You have successfully passed the Webiny Certified ${certInfo.title} exam!`
                : `You didn't pass this time, but you can retake the exam to improve your score.`
              }
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-8">
            {/* Score Display */}
            <div className="text-center py-8 bg-muted/50 rounded-lg">
              <div className="text-6xl font-bold mb-2 text-primary">
                {score}%
              </div>
              <p className="text-muted-foreground">
                Your Score
              </p>
              <div className="mt-4">
                <Badge variant={passed ? "default" : "secondary"} className="text-sm px-4 py-1">
                  {passed ? 'PASSED' : `Need ${certInfo.passingScore}% to Pass`}
                </Badge>
              </div>
            </div>

            {/* Certificate Section - Only show if passed */}
            {passed && (
              <div className="border-2 border-dashed rounded-lg p-8 print:border-solid">
                <div className="text-center space-y-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-2">
                    <span className="material-symbols-outlined text-primary text-[40px]">
                      workspace_premium
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold">Certificate of Completion</h2>
                  <p className="text-muted-foreground">This certifies that</p>
                  <p className="text-3xl font-bold text-primary">{name}</p>
                  <p className="text-muted-foreground">has successfully completed the</p>
                  <p className="text-xl font-semibold">
                    Webiny Certified {certInfo.title}
                  </p>
                  <p className="text-muted-foreground">
                    with a score of <span className="font-semibold">{score}%</span>
                  </p>
                  <div className="pt-4 text-sm text-muted-foreground">
                    <p>{new Date().toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}</p>
                    <p className="mt-2 text-xs">Certificate ID: WEB-{level.toUpperCase()}-{Date.now()}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 print:hidden">
              {passed && (
                <>
                  <Button onClick={handlePrint} variant="outline" className="flex-1">
                    <Download className="mr-2 h-4 w-4" />
                    Print Certificate
                  </Button>
                  <Button onClick={handleShare} variant="outline" className="flex-1">
                    <Share2 className="mr-2 h-4 w-4" />
                    Share Achievement
                  </Button>
                </>
              )}
              <Button asChild className="flex-1">
                <Link href={passed ? "/certification" : `/certification/${level}/start`}>
                  {passed ? 'View All Certifications' : 'Retake Exam'}
                </Link>
              </Button>
            </div>

            {/* Next Steps */}
            <div className="pt-6 border-t">
              <h3 className="font-semibold mb-3">What's Next?</h3>
              <ul className="space-y-2 text-sm">
                {passed ? (
                  <>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-0.5" />
                      <span>Share your achievement on LinkedIn to showcase your skills</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-0.5" />
                      <span>Print your certificate and add it to your portfolio</span>
                    </li>
                    {level !== 'expert' && (
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary mt-0.5" />
                        <span>Consider pursuing the next certification level</span>
                      </li>
                    )}
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-0.5" />
                      <span>Join the Webiny community and help others learn</span>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-0.5" />
                      <span>Review the course materials again</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-0.5" />
                      <span>Practice building more Webiny projects</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-0.5" />
                      <span>You can retake the exam as many times as needed</span>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Back to Home */}
        <div className="text-center mt-8 print:hidden">
          <Button asChild variant="ghost">
            <Link href="/">
              Back to Home
            </Link>
          </Button>
        </div>
      </main>
    </div>
  )
}

