import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, company, email, level, score, totalQuestions, correctAnswers, certificateId } = body

    const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL

    if (!slackWebhookUrl) {
      console.error('SLACK_WEBHOOK_URL not configured')
      return NextResponse.json({ success: false, error: 'Slack not configured' }, { status: 500 })
    }

    const passed = score >= 70
    const emoji = passed ? ':trophy:' : ':memo:'
    const status = passed ? 'PASSED ✅' : 'DID NOT PASS ❌'
    const levelEmoji = level === 'associate' ? '🥉' : level === 'professional' ? '🥈' : '🥇'

    const slackMessage = {
      blocks: [
        {
          type: "header",
          text: {
            type: "plain_text",
            text: `${emoji} Certification Exam Submitted`,
            emoji: true
          }
        },
        {
          type: "section",
          fields: [
            {
              type: "mrkdwn",
              text: `*Name:*\n${name}`
            },
            {
              type: "mrkdwn",
              text: `*Email:*\n${email}`
            },
            {
              type: "mrkdwn",
              text: `*Company:*\n${company || 'Not provided'}`
            },
            {
              type: "mrkdwn",
              text: `*Level:*\n${levelEmoji} ${level.toUpperCase()}`
            },
            {
              type: "mrkdwn",
              text: `*Score:*\n${score}% (${correctAnswers}/${totalQuestions} correct)`
            },
            {
              type: "mrkdwn",
              text: `*Status:*\n${status}`
            }
          ]
        },
        ...(passed && certificateId ? [{
          type: "section",
          fields: [
            {
              type: "mrkdwn",
              text: `*Certificate ID:*\n\`${certificateId}\``
            }
          ]
        }] : []),
        {
          type: "context",
          elements: [
            {
              type: "mrkdwn",
              text: `Submitted at ${new Date().toLocaleString('en-US', { 
                dateStyle: 'full', 
                timeStyle: 'short',
                timeZone: 'America/New_York'
              })}`
            }
          ]
        }
      ]
    }

    const response = await fetch(slackWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(slackMessage),
    })

    if (!response.ok) {
      throw new Error('Failed to send Slack notification')
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error sending Slack notification:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to send notification' },
      { status: 500 }
    )
  }
}

