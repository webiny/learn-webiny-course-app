"use client"

import { MessageCircle, Bug, Map } from "lucide-react"
import { ExternalLink } from "./external-link"

export function SidebarFooter() {
  return (
    <div className="p-4 border-t space-y-3 text-sm">
      {/* Questions */}
      <div className="flex items-start gap-2">
        <MessageCircle className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
        <div>
          <span className="text-muted-foreground">Questions? </span>
          <ExternalLink
            href="https://www.webiny.com/slack"
            showIcon={false}
            className="text-primary hover:underline"
          >
            Find us on slack.
          </ExternalLink>
        </div>
      </div>

      {/* Bug Report */}
      <div className="flex items-start gap-2">
        <Bug className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
        <div>
          <span className="text-muted-foreground">Found a bug on the page, </span>
          <ExternalLink
            href="https://github.com/webiny/learn-webiny-course-app/issues/new"
            showIcon={false}
            className="text-primary hover:underline"
          >
            submit an issue or a PR.
          </ExternalLink>
        </div>
      </div>

      {/* Roadmap */}
      <div className="flex items-start gap-2">
        <Map className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
        <div>
          <span className="text-muted-foreground">Check out our </span>
          <ExternalLink
            href="https://www.webiny.com/roadmap"
            showIcon={false}
            className="text-primary hover:underline"
          >
            roadmap.
          </ExternalLink>
        </div>
      </div>
    </div>
  )
}

