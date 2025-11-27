"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export interface QuizData {
  question: string
  options: string[]
  correctAnswer: number
  hint?: string
  explanation?: string
}

interface QuizProps {
  quiz?: QuizData
  question?: string
  options?: string[]
  correctAnswer?: number
  hint?: string
  explanation?: string
}

export function Quiz({ quiz, question, options, correctAnswer, hint, explanation }: QuizProps) {
  const quizData = quiz || {
    question: question || "",
    options: options || [],
    correctAnswer: correctAnswer || 0,
    hint,
    explanation,
  }

  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [hasAnswered, setHasAnswered] = useState(false)

  const isCorrect = selectedAnswer === (quizData.correctAnswer-1)

  const handleCheckAnswer = () => {
    if (selectedAnswer!==null) {
      setShowResult(true)
      setHasAnswered(true)
    }
  }

  const handleTryAgain = () => {
    setSelectedAnswer(null)
    setShowResult(false)
    setHasAnswered(false)
  }

  const handleSelectOption = (optionId: number) => {
    if (!hasAnswered) {
      setSelectedAnswer(optionId)
    }
  }

  return (
    <Card className="p-8 my-8 bg-muted/30 rounded-lg mx-[-75px] px-[75px] pt-[75px] pb-[50px] mb-16">
      {/* Quiz Header */}
      <div className="flex flex-col items-center mb-8">
        <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mb-4">
          <span className="text-3xl text-primary-foreground">?</span>
        </div>
        <h3 className="text-2xl font-bold mb-2">It's time to take a quiz!</h3>
        <p className="text-muted-foreground text-center">Test your knowledge and see what you've just learned.</p>
      </div>

      {/* Quiz Content */}
      <Card className="p-6 bg-background">
        <h4 className="text-lg font-semibold mb-6 text-center">{quizData.question}</h4>

        {/* Options */}
        <div className="space-y-3 mb-6">
          {quizData.options.map((option, index) => {
            const isSelected = selectedAnswer === index
            const showCorrect = showResult && isSelected && isCorrect
            const showIncorrect = showResult && isSelected && !isCorrect

            return (
              <button
                key={index}
                onClick={() => handleSelectOption(index)}
                disabled={hasAnswered}
                className={cn(
                  "w-full cursor-pointer p-4 rounded-lg border-1 transition-all text-left flex items-start gap-3",
                  "hover:border-primary/50 disabled:cursor-not-allowed",
                  isSelected && !showResult && "border-primary bg-primary/5",
                  showCorrect && "border-green-500 bg-green-50 dark:bg-green-950/20",
                  showIncorrect && "border-red-500 bg-red-50 dark:bg-red-950/20",
                  !isSelected && !showCorrect && !showIncorrect && "border-border hover:bg-gray-50",
                )}
              >
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-semibold text-sm",
                    isSelected && !showResult && "bg-primary text-primary-foreground",
                    showCorrect && "bg-green-500 text-white",
                    showIncorrect && "bg-red-500 text-white",
                    !isSelected && !showCorrect && !showIncorrect && "bg-muted text-muted-foreground",
                  )}
                >
                  {index+1}
                </div>
                <span className="flex-1 pt-1">{option}</span>
              </button>
            )
          })}
        </div>

        {/* Result Feedback */}
        {showResult && (
          <div className="mb-6">
            <div
              className={cn(
                "inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-3",
                isCorrect
                  ? "bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-200"
                  : "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-200",
              )}
            >
              {isCorrect ? (
                <>
                  <span>✓</span>
                  Correct
                </>
              ) : (
                <>
                  <span>✗</span>
                  Not Quite
                </>
              )}
            </div>

            {/* Hint or Explanation */}
            {!isCorrect && quizData.hint && (
              <p className="text-sm text-muted-foreground">
                <strong>Hint:</strong> {quizData.hint}
              </p>
            )}

            {isCorrect && quizData.explanation && (
              <p className="text-sm text-muted-foreground">{quizData.explanation}</p>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-end">
          {!showResult ? (
            <Button onClick={handleCheckAnswer} disabled={selectedAnswer===null} size="lg" className="cursor-pointer min-w-[140px]">
              Check Answer
            </Button>
          ) : !isCorrect ? (
            <Button onClick={handleTryAgain} variant="outline" size="lg" className="cursor-pointer min-w-[140px] bg-transparent">
              Try Again
            </Button>
          ) : null}
        </div>
      </Card>
    </Card>
  )
}
