"use client"

interface TodoPointerProps {
  title: string
  message: string
}

export function TodoPointer({ title, message }: TodoPointerProps) {
  // Only render in development
  if (process.env.NODE_ENV !== 'development') {
    return null
  }

  return (
    <div className="my-6 rounded-lg border-4 border-red-500 bg-red-50 dark:bg-red-950/30 p-6 shadow-lg">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500 text-white">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold text-white bg-red-600 uppercase tracking-wider">
              🚨 TODO
            </span>
            <span className="text-xs font-medium text-red-700 dark:text-red-400 uppercase tracking-wider">
              Development Mode Only
            </span>
          </div>
          <h3 className="text-xl font-bold text-red-900 dark:text-red-100 mb-2">
            {title}
          </h3>
          <p className="text-sm text-red-800 dark:text-red-200 leading-relaxed">
            {message}
          </p>
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-red-200 dark:border-red-800">
        <p className="text-xs text-red-600 dark:text-red-400 font-medium">
          ⚠️ This component will not appear in production builds.
        </p>
      </div>
    </div>
  )
}

