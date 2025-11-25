"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

interface ImageComponentProps {
  src: string
  alt?: string
  title?: string
  width?: number
  height?: number
  className?: string
}

/**
 * MDX Image component with click-to-fullscreen functionality
 *
 * Usage in MDX:
 * <Image src="/images/example.png" alt="Example" title="Click to enlarge" />
 */
export function ImageComponent({
  src,
  alt = "",
  title,
  width = 800,
  height = 600,
  className
}: ImageComponentProps) {
  const [isFullscreen, setIsFullscreen] = useState(false)

  const handleClick = () => {
    setIsFullscreen(true)
  }

  const handleClose = () => {
    setIsFullscreen(false)
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setIsFullscreen(false)
    }
  }

  // Handle ESC key press
  useEffect(() => {
    if (!isFullscreen) return

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsFullscreen(false)
      }
    }

    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [isFullscreen])

  // Prevent body scroll when fullscreen is open
  useEffect(() => {
    if (isFullscreen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [isFullscreen])

    if(!alt && title){
        alt = title
    }

  return (
    <>
      {/* Regular Image */}
      <figure className={cn("my-6", className)}>
        <div
          className="relative rounded-lg overflow-hidden border border-border cursor-pointer hover:opacity-90 transition-opacity bg-gray-100"
          onClick={handleClick}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              handleClick()
            }
          }}
          aria-label="Click to view fullscreen"
        >
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            className="w-full h-auto p-2"
            style={{ objectFit: "contain" }}
          />
          {/* Zoom indicator */}
          <div className="absolute top-2 right-2 bg-black/60 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
            </svg>
            <span>Click to enlarge</span>
          </div>
        </div>
        {title && (
          <figcaption className="text-sm text-muted-foreground text-center mt-2 italic">
            {title}
          </figcaption>
        )}
      </figure>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={handleBackdropClick}
          role="dialog"
          aria-modal="true"
          aria-label="Fullscreen image viewer"
        >
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-white hover:bg-white/10 rounded-full p-2 transition-colors"
            aria-label="Close fullscreen"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Fullscreen Image */}
          <div className="relative max-w-[95vw] max-h-[95vh]">
            <Image
              src={src}
              alt={alt}
              width={1920}
              height={1080}
              className="max-w-full max-h-[95vh] w-auto h-auto object-contain"
              quality={100}
            />
            {title && (
              <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white px-4 py-2 text-center">
                {title}
              </div>
            )}
          </div>

          {/* Instructions */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-sm">
            Press ESC or click outside to close
          </div>
        </div>
      )}
    </>
  )
}

