import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const { email, name } = await request.json()

    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // Check if subscriber already exists
    const existingSubscriber = await prisma.subscriber.findUnique({
      where: { email }
    })

    if (existingSubscriber) {
      if (!existingSubscriber.active) {
        // Reactivate existing subscriber
        await prisma.subscriber.update({
          where: { email },
          data: { active: true }
        })
      }
      return NextResponse.json(
        { message: 'Already subscribed' },
        { status: 200 }
      )
    }

    // Create new subscriber
    await prisma.subscriber.create({
      data: {
        email,
        name: name || null,
        active: true
      }
    })

    return NextResponse.json(
      { message: 'Successfully subscribed' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return NextResponse.json(
      { error: 'Failed to subscribe' },
      { status: 500 }
    )
  }
} 