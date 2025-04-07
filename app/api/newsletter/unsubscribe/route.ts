import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const { email, token } = await request.json()

    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // Check if subscriber exists
    const subscriber = await prisma.subscriber.findUnique({
      where: { email }
    })

    if (!subscriber) {
      return NextResponse.json(
        { error: 'Email not found in our subscriber list' },
        { status: 404 }
      )
    }

    // If token is provided, validate it
    // This would be for a secure unsubscribe link
    // TODO: Implement token validation when needed

    // Update subscriber to inactive
    await prisma.subscriber.update({
      where: { email },
      data: { active: false }
    })

    return NextResponse.json(
      { message: 'Successfully unsubscribed' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Newsletter unsubscribe error:', error)
    return NextResponse.json(
      { error: 'Failed to unsubscribe' },
      { status: 500 }
    )
  }
} 