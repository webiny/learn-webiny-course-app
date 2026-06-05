"use client"

import { Suspense, type ReactNode } from "react"
import { TelemetryProvider, useTrackPageView } from "@webiny/wts-client/react"
import { usePathname, useSearchParams } from "next/navigation"

function PageViewTracker() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const search = searchParams.toString()
  const path = search ? `${pathname}?${search}` : pathname
  useTrackPageView(path)
  return null
}

/**
 * Wraps the app in the WTS telemetry provider and auto-tracks page-view events
 * on every route change. Posts to t.webiny.com.
 *
 * The PageViewTracker is wrapped in <Suspense> because `useSearchParams()`
 * triggers a client-side bailout for the whole route otherwise.
 */
export function Telemetry({ children }: { children: ReactNode }) {
  return (
    <TelemetryProvider
      source="learn"
      sessionRecording={{
        posthogKey: process.env.NEXT_PUBLIC_POSTHOG_KEY!,
        apiHost: "https://s.webiny.com",
        loadPostHog: () => import("posthog-js")
      }}
    >
      <Suspense fallback={null}>
        <PageViewTracker />
      </Suspense>
      {children}
    </TelemetryProvider>
  )
}
