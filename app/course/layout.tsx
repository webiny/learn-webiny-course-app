import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Course Overview",
  description: "Browse all chapters and lessons in the Webiny course. Track your progress and continue your learning journey from beginner to expert.",
}

export default function CourseLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

