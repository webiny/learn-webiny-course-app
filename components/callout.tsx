"use client"

import type React from "react"

interface CalloutProps {
  type: "hint" | "warning" | "info" | "success"
  title?: string
  children: React.ReactNode
}

const icons = {
  hint: (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
      />
    </svg>
  ),
  warning: (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
      />
    </svg>
  ),
  info: (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
  success: (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
}

export function Callout({ type, title, children }: CalloutProps) {
  const config = {
    hint: {
      icon: icons.hint,
      borderColor: "border-gray-200",
      titleColor: "text-gray-900",
      textColor: "text-gray-700",
      defaultTitle: "Tip:",
    },
    warning: {
      icon: icons.warning,
      borderColor: "border-orange-200",
      titleColor: "text-gray-900",
      textColor: "text-gray-700",
      defaultTitle: "Warning:",
    },
    info: {
      icon: icons.info,
      borderColor: "border-blue-200",
      titleColor: "text-gray-900",
      textColor: "text-gray-700",
      defaultTitle: "Info:",
    },
    success: {
      icon: icons.success,
      borderColor: "border-green-200",
      titleColor: "text-gray-900",
      textColor: "text-gray-700",
      defaultTitle: "Success:",
    },
  }

  const { icon, borderColor, titleColor, textColor, defaultTitle } = config[type]

  return (
    <div className={`${borderColor} border rounded-lg px-4 py-3 my-6 bg-white`}>
      <div className="flex gap-3">
        <div className={`flex-shrink-0 mt-0.5 ${textColor}`}>{icon}</div>
        <div className="flex-1">
          <div className="text-sm leading-relaxed">
            <span className={`font-semibold ${titleColor}`}>{title || defaultTitle}</span>{" "}
            <span className={textColor}>{children}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
