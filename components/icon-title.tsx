"use client"

import React from "react"

interface IconTitleProps {
  icon: string // Material Icon name (e.g., "description", "edit", "code", "check_circle")
  title: string
  heading?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
}

const MaterialIcon = ({ name, size }: { name: string; size: string }) => {
  return (
    <span
      className="material-symbols-outlined select-none"
      style={{
        fontSize: size,
        fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24"
      }}
    >
      {name}
    </span>
  )
}

export function IconTitle({ icon, title, heading = "h2" }: IconTitleProps) {
  const headingStyles = {
    h1: "text-4xl font-bold mb-6",
    h2: "text-3xl font-bold mb-4",
    h3: "text-2xl font-semibold mb-3",
    h4: "text-xl font-semibold mb-3",
    h5: "text-lg font-semibold mb-2",
    h6: "text-base font-semibold mb-2",
  }

  const iconSizes = {
    h1: "40px",
    h2: "32px",
    h3: "24px",
    h4: "24px",
    h5: "20px",
    h6: "18px",
  }

  const className = `flex items-center gap-3 ${headingStyles[heading]}`
  const iconElement = (
    <span className="text-primary contents">
      <MaterialIcon name={icon} size={iconSizes[heading]} />
    </span>
  )

  switch (heading) {
    case "h1":
      return <h1 className={className}>{iconElement}<span>{title}</span></h1>
    case "h2":
      return <h2 className={className}>{iconElement}<span>{title}</span></h2>
    case "h3":
      return <h3 className={className}>{iconElement}<span>{title}</span></h3>
    case "h4":
      return <h4 className={className}>{iconElement}<span>{title}</span></h4>
    case "h5":
      return <h5 className={className}>{iconElement}<span>{title}</span></h5>
    case "h6":
      return <h6 className={className}>{iconElement}<span>{title}</span></h6>
    default:
      return <h2 className={className}>{iconElement}<span>{title}</span></h2>
  }
}

