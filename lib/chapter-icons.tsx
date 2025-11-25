import React from 'react'

export interface ChapterIconProps {
  className?: string
  size?: number
}

// Material Icon component
const MaterialIcon = ({ name, className, size = 24 }: { name: string; className?: string; size?: number }) => {
  return (
    <span
      className={`material-symbols-outlined select-none ${className || ''}`}
      style={{
        fontSize: `${size}px`,
        fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24",
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {name}
    </span>
  )
}

// Type for all available Material Icon names
// You can use any icon from https://fonts.google.com/icons
export type ChapterIconType = string

// Generic component to render any Material Icon
export function ChapterIcon({ type, className, size = 24 }: { type: ChapterIconType } & ChapterIconProps) {
  return <MaterialIcon name={type} className={className} size={size} />
}

