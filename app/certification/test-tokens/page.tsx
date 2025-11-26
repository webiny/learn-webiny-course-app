"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ThemeSwitcher } from "@/components/theme-switcher"
import { WebinyLogo } from "@/components/webiny-logo"

const testTokens = [
  {
    level: 'associate',
    levelTitle: 'Associate',
    passingScore: 70,
    tests: [
      { token: 'test-pass-associate', score: 85, status: 'pass', name: 'Test User (Pass)' },
      { token: 'test-fail-associate', score: 65, status: 'fail', name: 'Test User (Fail)' },
    ]
  },
  {
    level: 'professional',
    levelTitle: 'Professional',
    passingScore: 75,
    tests: [
      { token: 'test-pass-professional', score: 90, status: 'pass', name: 'Test User (Pass)' },
      { token: 'test-fail-professional', score: 70, status: 'fail', name: 'Test User (Fail)' },
    ]
  },
  {
    level: 'expert',
    levelTitle: 'Expert',
    passingScore: 80,
    tests: [
      { token: 'test-pass-expert', score: 95, status: 'pass', name: 'Test User (Pass)' },
      { token: 'test-fail-expert', score: 75, status: 'fail', name: 'Test User (Fail)' },
    ]
  },
]

export default function TestTokensPage() {
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
            <ThemeSwitcher />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8">
          <Badge variant="outline" className="mb-4">Development Only</Badge>
          <h1 className="text-4xl font-bold mb-4">Certification Test Tokens</h1>
          <p className="text-lg text-muted-foreground">
            Use these test URLs to preview certification results without completing the exam.
          </p>
        </div>

        <div className="space-y-6">
          {testTokens.map((cert) => (
            <Card key={cert.level}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{cert.levelTitle} Certification</span>
                  <Badge variant="secondary">Pass: {cert.passingScore}%</Badge>
                </CardTitle>
                <CardDescription>
                  Test both passing and failing scenarios
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {cert.tests.map((test) => (
                  <div
                    key={test.token}
                    className={`p-4 rounded-lg border ${
                      test.status === 'pass' 
                        ? 'border-green-500/50 bg-green-500/5' 
                        : 'border-orange-500/50 bg-orange-500/5'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <Badge
                          variant={test.status === 'pass' ? 'default' : 'secondary'}
                          className={test.status === 'pass' ? 'bg-green-600' : 'bg-orange-600'}
                        >
                          {test.status === 'pass' ? '✓ PASS' : '✗ FAIL'}
                        </Badge>
                        <span className="font-medium">{test.score}%</span>
                        <span className="text-sm text-muted-foreground">{test.name}</span>
                      </div>
                      <Button asChild size="sm">
                        <Link href={`/certification/${cert.level}/result?token=${test.token}`}>
                          View Result
                        </Link>
                      </Button>
                    </div>
                    <div className="text-xs font-mono text-muted-foreground bg-muted/50 p-2 rounded">
                      /certification/{cert.level}/result?token={test.token}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-8 border-orange-500/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="material-symbols-outlined text-orange-600">
                warning
              </span>
              Important Notes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>These test tokens are for development purposes only</li>
              <li>They bypass all security validation checks</li>
              <li>Test tokens should be removed or disabled in production</li>
              <li>Use for UI testing, design review, and screenshots</li>
              <li>Test tokens don't send Slack notifications</li>
              <li>Test results can't be printed or shared (they'll show test data)</li>
            </ul>
          </CardContent>
        </Card>

        <div className="mt-8 flex gap-4">
          <Button asChild variant="outline">
            <Link href="/certification">
              View All Certifications
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/">
              Back to Home
            </Link>
          </Button>
        </div>
      </main>
    </div>
  )
}

