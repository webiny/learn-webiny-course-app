"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ChapterQuizQuestion } from "@/lib/chapter-quizzes"
import { CheckCircle2, XCircle, ChevronRight } from "lucide-react"

interface ChapterQuizClientProps {
  chapterId: string
  chapterTitle: string
  questions: ChapterQuizQuestion[]
  passingScore: number
}

export function ChapterQuizClient({ chapterId, chapterTitle, questions, passingScore }: ChapterQuizClientProps) {
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [showResults, setShowResults] = useState(false)
  const [score, setScore] = useState(0)

  const isAnswered = currentQuestion in answers
  const isLastQuestion = currentQuestion === questions.length - 1

  const handleAnswer = (answerIndex: number) => {
    setAnswers({ ...answers, [currentQuestion]: answerIndex })
  }

  const handleNext = () => {
    if (isLastQuestion) {
      // Calculate score
      let correct = 0
      questions.forEach((question, index) => {
        if (answers[index] === question.correctAnswer) {
          correct++
        }
      })
      const percentage = Math.round((correct / questions.length) * 100)
      setScore(percentage)
      setShowResults(true)
    } else {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const handleRetake = () => {
    setCurrentQuestion(0)
    setAnswers({})
    setShowResults(false)
    setScore(0)
  }

  const handleContinue = () => {
    // Navigate to complete page
    router.push(`/course/${chapterId}/complete`)
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100
  const currentQ = questions[currentQuestion]
  const passed = score >= passingScore

  if (showResults) {
    return (
      <div className="max-w-2xl mx-auto">
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
              {passed ? 'Quiz Passed!' : 'Keep Learning!'}
            </CardTitle>
            <CardDescription className="text-lg">
              {passed
                ? `Great job! You've demonstrated strong understanding of ${chapterTitle}.`
                : `You scored below the passing threshold. Review the material and try again.`
              }
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Score Display */}
            <div className="text-center py-8 bg-muted/50 rounded-lg">
              <div className="text-6xl font-bold mb-2 text-primary">
                {score}%
              </div>
              <p className="text-muted-foreground mb-4">
                Your Score
              </p>
              <Badge variant={passed ? "default" : "secondary"} className="text-sm px-4 py-1">
                {passed ? 'PASSED' : `Need ${passingScore}% to Pass`}
              </Badge>
              <p className="text-sm text-muted-foreground mt-4">
                {Object.values(answers).filter((answer, index) => answer === questions[index].correctAnswer).length} / {questions.length} correct
              </p>
            </div>

            {/* Review Answers */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Review Your Answers</h3>
              {questions.map((question, index) => {
                const userAnswer = answers[index]
                const isCorrect = userAnswer === question.correctAnswer

                return (
                  <div key={question.id} className={`p-4 rounded-lg border ${
                    isCorrect ? 'border-green-500/30 bg-green-500/5' : 'border-orange-500/30 bg-orange-500/5'
                  }`}>
                    <div className="flex items-start gap-3 mb-2">
                      <div className="flex-shrink-0 mt-1">
                        {isCorrect ? (
                          <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
                        ) : (
                          <XCircle className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium mb-2">{question.question}</p>
                        <p className="text-sm text-muted-foreground">
                          Your answer: <span className={isCorrect ? 'text-green-600 dark:text-green-400' : 'text-orange-600 dark:text-orange-400'}>
                            {question.options[userAnswer]}
                          </span>
                        </p>
                        {!isCorrect && (
                          <p className="text-sm text-muted-foreground mt-1">
                            Correct answer: <span className="text-green-600 dark:text-green-400">
                              {question.options[question.correctAnswer]}
                            </span>
                          </p>
                        )}
                        <p className="text-sm text-muted-foreground mt-2 italic">
                          {question.explanation}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button onClick={handleRetake} variant="outline" className="flex-1">
                Retake Quiz
              </Button>
              {passed && (
                <Button onClick={handleContinue} className="flex-1">
                  Continue to Chapter Complete
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Progress */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">
            Question {currentQuestion + 1} of {questions.length}
          </span>
          <span className="text-sm font-medium">
            {Math.round(progress)}%
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Question Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">
            {currentQ.question}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {currentQ.options.map((option, index) => {
            const isSelected = answers[currentQuestion] === index

            return (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                  isSelected
                    ? 'border-primary bg-primary/10'
                    : 'border-border hover:border-primary/50 hover:bg-muted/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    isSelected ? 'border-primary bg-primary' : 'border-muted-foreground'
                  }`}>
                    {isSelected && (
                      <div className="w-3 h-3 rounded-full bg-white" />
                    )}
                  </div>
                  <span className={isSelected ? 'font-medium' : ''}>
                    {option}
                  </span>
                </div>
              </button>
            )
          })}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
          disabled={currentQuestion === 0}
        >
          Previous
        </Button>

        <Button
          onClick={handleNext}
          disabled={!isAnswered}
        >
          {isLastQuestion ? 'View Results' : 'Next'}
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

