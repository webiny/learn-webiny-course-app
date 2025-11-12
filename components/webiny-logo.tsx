export function WebinyLogo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="20" fill="#FF5A00" />
      <path d="M12 14L15.5 26H17.5L20 17L22.5 26H24.5L28 14H26L23.5 23L21 14H19L16.5 23L14 14H12Z" fill="white" />
    </svg>
  )
}
