"use client"

import { useSearchParams, useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ThemeSwitcher } from "@/components/theme-switcher"
import { FontSizeControl } from "@/components/font-size-control"
import { WebinyLogo } from "@/components/webiny-logo"
import { CheckCircle2, XCircle, Download, Share2, AlertTriangle } from "lucide-react"
import { CertificationImage } from "@/components/certification-image"

const certificationLevels = {
  associate: { title: "Associate", passingScore: 70, color: "text-blue-600 dark:text-blue-400" },
  professional: { title: "Professional", passingScore: 75, color: "text-purple-600 dark:text-purple-400" },
  expert: { title: "Expert", passingScore: 80, color: "text-amber-600 dark:text-amber-400" },
}

// Test tokens for development/testing
const TEST_TOKENS = {
  'test-pass-associate': {
    level: 'associate',
    score: 85,
    name: 'Test User (Pass)',
    certificateId: '12345678',
  },
  'test-fail-associate': {
    level: 'associate',
    score: 65,
    name: 'Test User (Fail)',
    certificateId: '12345679',
  },
  'test-pass-professional': {
    level: 'professional',
    score: 90,
    name: 'Test User (Pass)',
    certificateId: '23456789',
  },
  'test-fail-professional': {
    level: 'professional',
    score: 70,
    name: 'Test User (Fail)',
    certificateId: '23456790',
  },
  'test-pass-expert': {
    level: 'expert',
    score: 95,
    name: 'Test User (Pass)',
    certificateId: '34567890',
  },
  'test-fail-expert': {
    level: 'expert',
    score: 75,
    name: 'Test User (Fail)',
    certificateId: '34567891',
  },
}

export default function ResultPage() {
  const searchParams = useSearchParams()
  const params = useParams()
  const router = useRouter()
  const level = params?.level as string
  const token = searchParams.get('token')

  const [validationState, setValidationState] = useState<'loading' | 'valid' | 'invalid'>('loading')
  const [resultData, setResultData] = useState<any>(null)
  const [errorReason, setErrorReason] = useState<string>('')

  useEffect(() => {
    // Validate the result access
    const validateAccess = async () => {
      if (!token) {
        console.log('No token in URL')
        setErrorReason('No token provided in URL')
        setValidationState('invalid')
        return
      }

      // Check if it's a test token
      if (token.startsWith('test-')) {
        const testData = TEST_TOKENS[token as keyof typeof TEST_TOKENS]
        if (testData && testData.level === level) {
          console.log('Using test token:', token)
          setResultData(testData)
          setValidationState('valid')
          return
        } else if (testData) {
          setErrorReason('Test token level mismatch')
          setValidationState('invalid')
          return
        }
        // If no matching test token, fall through to normal validation
      }

      try {
        // First, check sessionStorage for immediate validation
        const storedData = sessionStorage.getItem('examResult')
        if (!storedData) {
          console.log('No stored data in sessionStorage')
          setErrorReason('No exam result found in session. Did you complete the exam?')
          setValidationState('invalid')
          return
        }

        const data = JSON.parse(storedData)
        console.log('Stored data:', data)
        console.log('URL token:', token)
        console.log('URL level:', level)

        // Check if token matches
        if (data.token !== token) {
          console.log('Token mismatch')
          setErrorReason('Token mismatch. The URL may have been modified.')
          setValidationState('invalid')
          return
        }

        // Check if level matches
        if (data.level !== level) {
          console.log('Level mismatch')
          setErrorReason('Certification level mismatch')
          setValidationState('invalid')
          return
        }

        // Check if token has expired (5 minutes)
        if (Date.now() > data.expiresAt) {
          console.log('Token expired')
          setErrorReason('Session expired (5 minute limit)')
          setValidationState('invalid')
          sessionStorage.removeItem('examResult')
          return
        }

        // At this point, sessionStorage validation passed
        // Set the result data first
        setResultData(data)

        // Secondary validation: Check with API (optional, don't fail if it doesn't work)
        try {
          const apiResponse = await fetch(`/api/certification/result?token=${token}&level=${level}`)
          const apiData = await apiResponse.json()

          console.log('API validation response:', apiData)

          if (apiData.valid && apiData.data) {
            // Use data from API if available
            setResultData(apiData.data)
          }
          // If API says invalid but sessionStorage was valid, still show results
          // This handles cases where API might be down or token already consumed
        } catch (apiError) {
          // If API check fails, still allow if sessionStorage is valid
          console.warn('API validation failed, using sessionStorage:', apiError)
          // Data is already set from sessionStorage above
        }

        // Mark as valid - we have data from sessionStorage at minimum
        setValidationState('valid')

        // Clear the token after successful validation (one-time use)
        // Do this after a small delay to ensure state is updated
        setTimeout(() => {
          sessionStorage.removeItem('examResult')
        }, 100)
      } catch (error) {
        console.error('Validation error:', error)
        setErrorReason(`Validation error: ${error}`)
        setValidationState('invalid')
      }
    }

    validateAccess()
  }, [token, level])

  // Loading state
  if (validationState === 'loading') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Validating your results...</p>
        </div>
      </div>
    )
  }

  // Invalid access state
  if (validationState === 'invalid' || !resultData) {
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

        <main className="container mx-auto px-4 py-8 max-w-4xl">
          <Card className="border-2 border-orange-500/50">
            <CardHeader className="text-center pb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-orange-500/10 mx-auto mb-4">
                <AlertTriangle className="w-12 h-12 text-orange-600 dark:text-orange-400" />
              </div>
              <CardTitle className="text-3xl mb-2">
                Invalid Access
              </CardTitle>
              <CardDescription className="text-lg">
                This result page cannot be accessed directly or the session has expired.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="text-center py-4 bg-muted/50 rounded-lg">
                {errorReason && (
                  <div className="mb-4 p-3 bg-orange-500/10 border border-orange-500/20 rounded">
                    <p className="text-sm font-medium text-orange-600 dark:text-orange-400">
                      Error: {errorReason}
                    </p>
                  </div>
                )}
                <p className="text-sm text-muted-foreground mb-4">
                  To view your certification results, you must complete the exam through the proper flow.
                </p>
                <div className="text-sm space-y-2">
                  <p className="font-medium">Possible reasons for this error:</p>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>You tried to access the URL directly</li>
                    <li>Your session has expired (results are valid for 5 minutes)</li>
                    <li>You've already viewed this result page</li>
                    <li>The URL was modified or tampered with</li>
                  </ul>
                </div>

                <div className="mt-4 p-3 bg-muted/30 rounded text-left">
                  <p className="text-xs font-mono text-muted-foreground">
                    Debug Info:<br/>
                    Token present: {token ? 'Yes' : 'No'}<br/>
                    Level: {level}
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild className="flex-1">
                  <Link href={`/certification/${level}/start`}>
                    Take the Exam
                  </Link>
                </Button>
                <Button asChild variant="outline" className="flex-1">
                  <Link href="/certification">
                    View All Certifications
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    )
  }

  const score = resultData.score
  const name = resultData.name
  const certificateId = resultData.certificateId || Date.now().toString().slice(-8) // Fallback for test tokens
  const certInfo = certificationLevels[level as keyof typeof certificationLevels]
  const passed = score >= certInfo.passingScore

  const handlePrint = () => {
    window.print()
  }

  const handleShare = async () => {
    const certInfo = certificationLevels[level as keyof typeof certificationLevels]
    const levelTitle = certInfo.title

    // Generate full image URL (absolute URL for LinkedIn)
    const baseUrl = window.location.origin
    const imageUrl = `${baseUrl}/api/certification/image?name=${encodeURIComponent(name)}&level=${level}&score=${score}&id=${certificateId}&date=${encodeURIComponent(new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }))}`

    // LinkedIn sharing with certification details
    const shareText = `I'm excited to share that I've earned the Webiny Certified ${levelTitle} certification with a score of ${score}%! 🎉

This certification validates my expertise in building serverless applications with @Webiny - a modern content platform built on AWS.

View my certification: ${imageUrl}

#WebinyCertified #Serverless #AWS #WebDevelopment #CloudComputing`

    // Use LinkedIn's share URL with pre-populated text and URL
    const linkedInShareUrl = `https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(shareText)}`

    // Automatically download the image
    try {
      const response = await fetch(imageUrl)
      const blob = await response.blob()
      const blobUrl = URL.createObjectURL(blob)

      const link = document.createElement('a')
      link.href = blobUrl
      link.download = `webiny-certified-${level}-${name.replace(/\s+/g, '-').toLowerCase()}.png`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      // Clean up the blob URL
      setTimeout(() => URL.revokeObjectURL(blobUrl), 100)

      // Show success message
      const notification = document.createElement('div')
      notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #10b981;
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        z-index: 9999;
        font-family: system-ui;
        animation: slideIn 0.3s ease-out;
      `
      notification.textContent = '✓ Certificate image downloaded! Opening LinkedIn...'
      document.body.appendChild(notification)

      setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out'
        setTimeout(() => document.body.removeChild(notification), 300)
      }, 3000)
    } catch (error) {
      console.error('Failed to download image:', error)
    }

    // Open LinkedIn in new tab with pre-populated text
    setTimeout(() => {
      window.open(linkedInShareUrl, '_blank')
    }, 500)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          @page {
            size: A4 portrait;
            margin: 0;
          }
          
          body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
          
          * {
            box-shadow: none !important;
            text-shadow: none !important;
            color: #000 !important;
            background: transparent !important;
          }
          
          .print\\:bg-white {
            background: white !important;
          }
          
          .print\\:fixed {
            position: fixed !important;
          }
          
          .print\\:inset-0 {
            inset: 0 !important;
          }
          
          /* Preserve specific colors for branding */
          .bg-blue-500,
          .bg-purple-500,
          .bg-amber-500 {
            print-color-adjust: exact !important;
            -webkit-print-color-adjust: exact !important;
          }
        }
        
        @keyframes slideIn {
          from {
            transform: translateX(400px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        @keyframes slideOut {
          from {
            transform: translateX(0);
            opacity: 1;
          }
          to {
            transform: translateX(400px);
            opacity: 0;
          }
        }
      `}</style>

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

      <main className="container mx-auto px-4 py-8 max-w-4xl print:p-0 print:m-0 print:max-w-none">
        <Card className={`border-2 ${passed ? 'border-green-500/50' : 'border-orange-500/50'} print:border-0 print:shadow-none`}>
          <CardHeader className="text-center pb-8 print:hidden">
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
            <div className="text-center py-8 bg-muted/50 rounded-lg print:hidden">
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
              <div className="print:fixed print:inset-0 print:flex print:items-center print:justify-center print:bg-white">
                <div className="border rounded-lg p-8 print:border-0 print:w-[210mm] print:h-[297mm] print:p-20 print:flex print:flex-col print:justify-center bg-white dark:bg-background print:bg-white">

                  {/* Simple elegant certificate */}
                  <div className="max-w-2xl mx-auto space-y-8 print:space-y-12">

                    {/* Header - Logo and Title */}
                    <div className="text-center space-y-6 print:space-y-8">
                      <div className="flex justify-center">
                        <WebinyLogo className="w-10 h-10 print:w-14 print:h-14 text-foreground" />
                      </div>

                      <div className="space-y-2">
                        <h2 className="text-sm print:text-base uppercase tracking-[0.3em] text-muted-foreground font-light">
                          Certificate of Completion
                        </h2>
                        <div className="w-16 h-px bg-foreground mx-auto" />
                      </div>
                    </div>

                    {/* Main Content */}
                    <div className="text-center space-y-8 print:space-y-12 py-6 print:py-12">
                      <p className="text-sm print:text-lg text-muted-foreground">
                        This is to certify that
                      </p>

                      <div className="space-y-3 print:space-y-4">
                        <h1 className="text-3xl print:text-5xl font-light tracking-tight">
                          {name}
                        </h1>
                        <div className="w-32 print:w-48 h-px bg-foreground/20 mx-auto" />
                      </div>

                      <div className="space-y-3 print:space-y-4">
                        <p className="text-sm print:text-lg text-muted-foreground">
                          has successfully completed the
                        </p>

                        <div className="space-y-2">
                          <h3 className="text-xl print:text-3xl font-medium">
                            Webiny Certified {certInfo.title}
                          </h3>
                          <p className="text-sm print:text-base text-muted-foreground">
                            with a score of <span className="font-semibold text-foreground">{score}%</span>
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="border-t pt-8 print:pt-10 space-y-6">
                      <div className="flex items-start justify-between text-sm print:text-base">
                        <div className="text-left space-y-1">
                          <p className="text-xs print:text-sm text-muted-foreground uppercase tracking-wider">
                            Date
                          </p>
                          <p className="font-medium">
                            {new Date().toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </p>
                        </div>

                        <div className="text-center space-y-1 print:hidden">
                          <div className="flex items-center gap-2">
                            <WebinyLogo className="w-5 h-5 print:w-6 print:h-6" />
                            <span className="font-semibold text-sm print:text-base">Webiny</span>
                          </div>
                          <p className="text-xs text-muted-foreground">learn.webiny.com</p>
                        </div>

                        <div className="text-right space-y-1">
                          <p className="text-xs print:text-sm text-muted-foreground uppercase tracking-wider">
                            CERTIFICATE ID
                          </p>
                          <p className="font-mono text-xs print:text-sm font-medium">
                            {certificateId}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-center gap-2 pt-4">
                        <div className={`w-2 h-2 rounded-full ${
                          level === 'associate' ? 'bg-blue-500' : 
                          level === 'professional' ? 'bg-purple-500' : 
                          'bg-amber-500'
                        }`} />
                        <p className="text-xs print:text-sm text-muted-foreground uppercase tracking-wider">
                          {certInfo.title} Certification
                        </p>
                      </div>
                    </div>

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
                    Share on LinkedIn
                  </Button>
                </>
              )}
              <Button asChild className="flex-1">
                <Link href={passed ? "/certification" : `/certification/${level}/start`}>
                  {passed ? 'View All Certifications' : 'Retake Exam'}
                </Link>
              </Button>
            </div>

            {/* Hidden certification image for sharing (LinkedIn optimized 1200x630) */}
            {passed && (
              <div className="hidden">
                <CertificationImage
                  name={name}
                  level={level}
                  score={score}
                  date={new Date().toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                  certificateId={certificateId}
                />
              </div>
            )}

            {/* Next Steps */}
            <div className="pt-6 border-t print:hidden">
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

