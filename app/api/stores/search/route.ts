import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('q')

  if (!query) {
    return NextResponse.json([])
  }

  const stores = await prisma.store.findMany({
    where: {
      AND: [
        { active: true },
        {
          OR: [
            { name: { contains: query, mode: 'insensitive' } },
            { description: { contains: query, mode: 'insensitive' } }
          ]
        }
      ]
    },
    orderBy: { name: 'asc' },
    take: 10
  })

  return NextResponse.json(stores)
} 