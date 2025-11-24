import type React from "react"
import type { Metadata } from "next"
import { Inter, Geist, Geist_Mono } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

const _inter = Inter({ subsets: ["latin"] })
const _geis = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL('https://learn.webiny.com'),
  title: {
    template: '%s | Learn Webiny',
    default: 'Learn Webiny - Master Webiny from Beginner to Expert',
  },
  description:
    "Go from beginner to expert by learning the foundations of Webiny and building a fully functional serverless application.",
  keywords: ['Webiny', 'Serverless', 'Headless CMS', 'AWS', 'React', 'GraphQL', 'Page Builder', 'Tutorial', 'Course'],
  authors: [{ name: 'Webiny' }],
  creator: 'Webiny',
  publisher: 'Webiny',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://learn.webiny.com',
    title: 'Learn Webiny - Master Webiny from Beginner to Expert',
    description: 'Go from beginner to expert by learning the foundations of Webiny and building a fully functional serverless application.',
    siteName: 'Learn Webiny',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Learn Webiny - Master Webiny from Beginner to Expert',
    description: 'Go from beginner to expert by learning the foundations of Webiny and building a fully functional serverless application.',
    creator: '@WebinyCMS',
  },
  icons: {
    icon: [
      {
        url: "/favicon.ico",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/favicon.ico",
        media: "(prefers-color-scheme: dark)",
      },
    ],
    apple: "/favicon.ico",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
      </head>
      <body className={`font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
