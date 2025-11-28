"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface FAQItem {
  question: string
  answer: string
}

interface FAQProps {
  items: FAQItem[]
  defaultOpen?: number | null
}

/**
 * FAQ component for MDX files
 * Creates an accordion-style FAQ section
 *
 * Usage in MDX:
 * <FAQ
 *   items={[
 *     { question: "What is Webiny?", answer: "Webiny is a serverless CMS..." },
 *     { question: "How do I deploy?", answer: "You can deploy using..." }
 *   ]}
 * />
 */
export function FAQ({ items, defaultOpen = null }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpen)

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="my-8 space-y-4">
      {items.map((item, index) => (
        <div
          key={index}
          className="border border-border rounded-lg overflow-hidden bg-card"
        >
          <button
            onClick={() => toggleItem(index)}
            className={"w-full flex items-center justify-between p-4 text-left hover:bg-muted/50 transition-colors cursor-pointer "+(openIndex === index && " bg-muted/50")}
            aria-expanded={openIndex === index}
          >
            <span className="font-semibold text-base pr-4">{item.question}</span>
            <ChevronDown
              className={cn(
                "h-5 w-5 text-muted-foreground flex-shrink-0 transition-transform duration-200",
                openIndex === index && "transform rotate-180"
              )}
            />
          </button>
          <div
            className={cn(
              "overflow-hidden transition-all duration-200 ease-in-out",
              openIndex === index ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
            )}
          >
            <div className="p-4 pt-4 text-muted-foreground">
              {item.answer}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

