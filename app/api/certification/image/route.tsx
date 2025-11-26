import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const name = searchParams.get('name') || 'Certificate Holder'
    const level = searchParams.get('level') || 'associate'
    const score = searchParams.get('score') || '0'
    const certificateId = searchParams.get('id') || '00000000'
    const date = searchParams.get('date') || new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })

    const levelColors = {
      associate: { dot: '#3b82f6' },
      professional: { dot: '#a855f7' },
      expert: { dot: '#f59e0b' },
    }

    const color = levelColors[level as keyof typeof levelColors] || levelColors.associate
    const levelTitle = level.charAt(0).toUpperCase() + level.slice(1)

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'white',
            padding: '25px',
          }}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              padding: '25px 70px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              background: 'white',
            }}
          >
            {/* Header - Logo and Title */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '24px',
              }}
            >
              {/* Webiny Logo SVG */}
              <svg width="50" height="56" viewBox="0 0 113 126" xmlns="http://www.w3.org/2000/svg">
                <path fill="#FA5A28" d="M106.337016,98.7997963 L63.0899545,123.570655 C58.9970198,125.91444 53.9546983,125.91444 49.861857,123.570655 L6.61395537,98.7997963 C2.52111405,96.4552699 0,92.1236493 0,87.4353375 L0,37.8936199 C0,33.2053081 2.52111405,28.873039 6.61395537,26.5292537 L49.861857,1.75839485 C53.9546983,-0.586131618 58.9970198,-0.586131618 63.0899545,1.75839485 L106.337016,26.5292537 C110.42995,28.873039 112.951064,33.2053081 112.951064,37.8936199 L112.951064,87.4353375 C112.951064,92.1236493 110.42995,96.4552699 106.337016,98.7997963 Z M82.6150471,41.7683515 C79.3715736,50.8470221 76.1049397,59.9486691 72.8391463,69.0602294 L71.8026281,69.0602294 C68.5476678,59.9265265 65.281781,50.8027368 62.0268207,41.6911765 L51.872043,41.6911765 C48.5723496,50.9027956 45.3065562,60.0257515 42.0407628,69.1602882 L41.0927769,69.1602882 C37.7823438,59.9371809 34.4719107,50.7148147 31.2722364,41.8126368 L19.1446281,41.8126368 C25.0417339,58.5659118 30.7933405,74.8990324 36.5448537,91.2321529 L46.554786,91.2321529 L56.4646992,63.5972029 L57.4680645,63.5972029 C60.7784975,72.8645956 64.0781909,82.1427353 67.3216645,91.2099176 L77.3540099,91.2099176 C83.127843,74.8103691 88.8794496,58.4665941 94.7542355,41.7683515 L82.6150471,41.7683515 Z"/>
              </svg>

              {/* Title */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                <p
                  style={{
                    fontSize: '16px',
                    color: '#6b7280',
                    letterSpacing: '0.3em',
                    textTransform: 'uppercase',
                    fontWeight: '300',
                    margin: 0,
                  }}
                >
                  Certificate of Completion
                </p>
                <div style={{ width: '70px', height: '1px', background: '#000' }} />
              </div>
            </div>

            {/* Main Content */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '32px',
                padding: '20px 0',
              }}
            >
              <p style={{ fontSize: '18px', color: '#6b7280', margin: 0 }}>
                This is to certify that
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                <h1
                  style={{
                    fontSize: '48px',
                    fontWeight: '300',
                    color: '#000',
                    margin: 0,
                    letterSpacing: '-0.02em',
                  }}
                >
                  {name}
                </h1>
                <div style={{ width: '180px', height: '1px', background: '#e5e7eb' }} />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                <p style={{ fontSize: '18px', color: '#6b7280', margin: 0 }}>
                  has successfully completed the
                </p>

                <h2 style={{ fontSize: '28px', fontWeight: '500', color: '#000', margin: 0 }}>
                  Webiny Certified {levelTitle}
                </h2>

                <p style={{ fontSize: '18px', color: '#6b7280', margin: 0 }}>
                  with a score of &nbsp;<span style={{ fontWeight: '600', color: '#000' }}>{score}%</span>
                </p>
              </div>
            </div>

            {/* Footer */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                borderTop: '1px solid #e5e7eb',
                paddingTop: '36px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <p
                    style={{
                      fontSize: '11px',
                      color: '#9ca3af',
                      letterSpacing: '0.05em',
                      textTransform: 'uppercase',
                      margin: 0,
                    }}
                  >
                    Date
                  </p>
                  <p style={{ fontSize: '14px', fontWeight: '500', color: '#000', margin: 0 }}>
                    {date}
                  </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                    <p
                        style={{
                            fontSize: '11px',
                            color: '#9ca3af',
                            letterSpacing: '0.05em',
                            textTransform: 'uppercase',
                            margin: 0,
                        }}
                    >
                        Level
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '4px' }}>
                        <div
                            style={{
                                width: '8px',
                                height: '8px',
                                borderRadius: '50%',
                                background: color.dot,
                            }}
                        />
                        <p
                            style={{
                                fontSize: '11px',
                                color: '#000000',
                                letterSpacing: '0.05em',
                                textTransform: 'uppercase',
                                margin: 0,
                            }}
                        >
                            {levelTitle} Certification
                        </p>
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
                  <p
                    style={{
                      fontSize: '11px',
                      color: '#9ca3af',
                      letterSpacing: '0.05em',
                      textTransform: 'uppercase',
                      margin: 0,
                    }}
                  >
                    CERTIFICATE ID
                  </p>
                  <p
                    style={{
                      fontSize: '13px',
                      fontWeight: '500',
                      color: '#000',
                      margin: 0,
                      fontFamily: 'monospace',
                    }}
                  >
                    {certificateId}
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    )
  } catch (e: any) {
    console.error('Error generating image:', e)
    return new Response(`Failed to generate image: ${e.message}`, {
      status: 500,
    })
  }
}

