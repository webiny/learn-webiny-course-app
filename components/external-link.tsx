"use client"

import { ExternalLink as ExternalLinkIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface ExternalLinkProps {
  href: string
  children: React.ReactNode
  className?: string
  showIcon?: boolean
}

/**
 * External link component for MDX
 * Opens links in a new tab with proper security attributes
 *
 * Usage in MDX:
 * <ExternalLink href="https://example.com">Visit Example</ExternalLink>
 */
export function ExternalLink({
  href,
  children,
  className,
  showIcon = true
}: ExternalLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center gap-1 text-accent hover:underline transition-colors",
        "hover:text-primary/80",
        className
      )}
    >
      {children}
      {showIcon && (
        <ExternalLinkIcon className="w-3.5 h-3.5 inline-block" />
      )}
    </a>
  )
}

