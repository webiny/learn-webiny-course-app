"use client"

interface PaidFeatureProps {
  tier: "business" | "enterprise"
  message?: string
  children?: React.ReactNode
}

export function PaidFeature({ tier, message, children }: PaidFeatureProps) {
  const config = {
    business: {
      badge: "Business",
      icon: (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
      ),
      borderColor: "border-blue-200 dark:border-blue-800",
      bgColor: "bg-blue-50 dark:bg-blue-950",
      badgeBg: "bg-blue-600 dark:bg-blue-700",
      textColor: "text-blue-900 dark:text-blue-100",
      availability: "Business & Enterprise",
    },
    enterprise: {
      badge: "Enterprise",
      icon: (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
      ),
      borderColor: "border-purple-200 dark:border-purple-800",
      bgColor: "bg-purple-50 dark:bg-purple-950",
      badgeBg: "bg-purple-600 dark:bg-purple-700",
      textColor: "text-purple-900 dark:text-purple-100",
      availability: "Enterprise only",
    },
  }

  const currentConfig = config[tier]

  const defaultMessage = tier === "business"
    ? "This feature is available in Webiny Business and Enterprise tiers."
    : "This feature is available exclusively in Webiny Enterprise tier."

  return (
    <div
      className={`my-6 rounded-lg border-l-4 ${currentConfig.borderColor} ${currentConfig.bgColor} p-4`}
    >
      <div className="flex items-start gap-3">
        <div className={`flex-shrink-0 ${currentConfig.textColor}`}>
          {currentConfig.icon}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-white ${currentConfig.badgeBg}`}>
              💎 {currentConfig.badge}
            </span>
            <span className={`text-xs font-medium ${currentConfig.textColor}`}>
              {currentConfig.availability}
            </span>
          </div>
          <div className={`text-sm ${currentConfig.textColor}`}>
            {children || message || defaultMessage}
          </div>
        </div>
      </div>
    </div>
  )
}

