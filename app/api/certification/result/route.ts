import { NextResponse } from 'next/server'

// In-memory store for validated tokens (will reset on server restart)
// In production, you'd use Redis or a database
const validTokens = new Map<string, { level: string; score: number; name: string; expiresAt: number }>()

// Cleanup expired tokens periodically
setInterval(() => {
  const now = Date.now()
  for (const [token, data] of validTokens.entries()) {
    if (now > data.expiresAt) {
      validTokens.delete(token)
    }
  }
}, 60000) // Every minute

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { token, level, score, name } = body

    if (!token || !level || score === undefined || !name) {
      return NextResponse.json({ valid: false, error: 'Missing required fields' }, { status: 400 })
    }

    // Store the token with 5 minute expiration
    const expiresAt = Date.now() + (5 * 60 * 1000)
    validTokens.set(token, { level, score, name, expiresAt })

    return NextResponse.json({ valid: true })
  } catch (error) {
    console.error('Error storing result token:', error)
    return NextResponse.json({ valid: false, error: 'Internal error' }, { status: 500 })
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const token = searchParams.get('token')
    const level = searchParams.get('level')

    if (!token || !level) {
      return NextResponse.json({ valid: false, error: 'Missing token or level' }, { status: 400 })
    }

    const data = validTokens.get(token)

    if (!data) {
      return NextResponse.json({ valid: false, error: 'Token not found or expired' }, { status: 404 })
    }

    if (data.level !== level) {
      return NextResponse.json({ valid: false, error: 'Level mismatch' }, { status: 400 })
    }

    if (Date.now() > data.expiresAt) {
      validTokens.delete(token)
      return NextResponse.json({ valid: false, error: 'Token expired' }, { status: 401 })
    }

    // Return the data and delete the token (one-time use)
    validTokens.delete(token)

    return NextResponse.json({
      valid: true,
      data: {
        level: data.level,
        score: data.score,
        name: data.name
      }
    })
  } catch (error) {
    console.error('Error validating result token:', error)
    return NextResponse.json({ valid: false, error: 'Internal error' }, { status: 500 })
  }
}

