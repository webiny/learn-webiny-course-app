"use client"

import { WebinyLogo } from "@/components/webiny-logo"

interface CertificationImageProps {
  name: string
  level: string
  score: number
  date: string
  certificateId: string
}

export function CertificationImage({ name, level, score, date, certificateId }: CertificationImageProps) {
  const levelColors = {
    associate: { bg: 'bg-blue-600', text: 'text-blue-600', emoji: '🥉' },
    professional: { bg: 'bg-purple-600', text: 'text-purple-600', emoji: '🥈' },
    expert: { bg: 'bg-amber-600', text: 'text-amber-600', emoji: '🥇' },
  }

  const color = levelColors[level as keyof typeof levelColors] || levelColors.associate
  const levelTitle = level.charAt(0).toUpperCase() + level.slice(1)

  return (
    <div
      id="certification-image"
      className="w-[1200px] h-[630px] bg-white flex items-center justify-center p-16"
      style={{
        background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
        fontFamily: 'system-ui, -apple-system, sans-serif'
      }}
    >
      <div className="w-full h-full border-4 border-gray-900 p-12 flex flex-col justify-between">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-black rounded flex items-center justify-center">
              <WebinyLogo className="w-12 h-12 text-white" />
            </div>
            <span className="text-4xl font-bold text-gray-900">Webiny</span>
          </div>
          <div className={`px-6 py-2 ${color.bg} rounded-full`}>
            <span className="text-2xl font-semibold text-white">
              {color.emoji} {levelTitle.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Main Content */}
        <div className="text-center space-y-6">
          <div className="space-y-2">
            <p className="text-2xl text-gray-600 uppercase tracking-widest">Certificate of Completion</p>
            <div className="w-32 h-1 bg-gray-900 mx-auto" />
          </div>

          <h1 className="text-6xl font-light text-gray-900 py-4">
            {name}
          </h1>

          <div className="space-y-2">
            <p className="text-2xl text-gray-600">has successfully completed the</p>
            <h2 className="text-4xl font-semibold text-gray-900">
              Webiny Certified {levelTitle}
            </h2>
            <p className="text-2xl text-gray-600">
              with a score of <span className="font-bold text-gray-900">{score}%</span>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between text-gray-700">
          <div className="text-left">
            <p className="text-sm uppercase tracking-wider text-gray-500">Date</p>
            <p className="text-lg font-medium">{date}</p>
          </div>

          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${color.bg}`} />
            <p className="text-sm uppercase tracking-wider">learn.webiny.com</p>
          </div>

          <div className="text-right">
            <p className="text-sm uppercase tracking-wider text-gray-500">ID</p>
            <p className="text-lg font-mono font-medium">{certificateId}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

