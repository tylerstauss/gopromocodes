import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // Get the count of active stores
    const count = await prisma.store.count({
      where: { active: true }
    })

    return NextResponse.json({ count }, { status: 200 })
  } catch (error) {
    console.error('Error getting store count:', error)
    return NextResponse.json(
      { error: 'Failed to get store count' },
      { status: 500 }
    )
  }
} 