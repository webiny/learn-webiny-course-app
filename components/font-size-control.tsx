"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Type } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type FontSize = "small" | "medium" | "large"

const fontSizeMap = {
  small: "14px",
  medium: "16px",
  large: "18px",
}

export function FontSizeControl() {
  const [fontSize, setFontSize] = useState<FontSize>("medium")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Check for saved font size preference or default to medium
    const savedFontSize = localStorage.getItem("fontSize") as FontSize | null
    const initialFontSize = savedFontSize || "medium"

    setFontSize(initialFontSize)
    document.documentElement.style.fontSize = fontSizeMap[initialFontSize]
  }, [])

  const changeFontSize = (newSize: FontSize) => {
    setFontSize(newSize)
    localStorage.setItem("fontSize", newSize)
    document.documentElement.style.fontSize = fontSizeMap[newSize]
  }

  // Avoid hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="h-9 w-9">
        <div className="h-5 w-5" />
      </Button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-9 w-9" aria-label="Change font size">
          <Type className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => changeFontSize("small")} className="cursor-pointer">
          <span className={fontSize === "small" ? "font-semibold" : ""}>
            Small (14px)
          </span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeFontSize("medium")} className="cursor-pointer">
          <span className={fontSize === "medium" ? "font-semibold" : ""}>
            Medium (16px)
          </span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeFontSize("large")} className="cursor-pointer">
          <span className={fontSize === "large" ? "font-semibold" : ""}>
            Large (18px)
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

