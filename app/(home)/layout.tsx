import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Start Building with Webiny",
  description: "Master Webiny from beginner to expert. Learn headless CMS, serverless architecture, and build fully functional applications with comprehensive tutorials and hands-on projects.",
}

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

