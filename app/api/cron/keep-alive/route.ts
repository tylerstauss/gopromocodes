import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  // Verify the request is from Vercel Cron
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    await prisma.$queryRaw`SELECT 1`
    return NextResponse.json({ ok: true, timestamp: new Date().toISOString() })
  } catch (error) {
    console.error('Keep-alive ping failed:', error)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
