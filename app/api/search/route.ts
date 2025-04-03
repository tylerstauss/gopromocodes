import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('q')
  const limit = parseInt(searchParams.get('limit') || '10')

  if (!query) {
    return NextResponse.json([])
  }

  // Find stores matching the query
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
    select: {
      id: true,
      name: true,
      slug: true
    },
    orderBy: { name: 'asc' },
    take: limit
  })

  // Find promo codes matching the query
  const promoCodes = await prisma.promoCode.findMany({
    where: {
      OR: [
        { title: { contains: query, mode: 'insensitive' } },
        { description: { contains: query, mode: 'insensitive' } },
        { code: { contains: query, mode: 'insensitive' } }
      ]
    },
    select: {
      id: true,
      title: true,
      code: true,
      storeId: true,
      store: {
        select: {
          name: true,
          slug: true
        }
      }
    },
    orderBy: { createdAt: 'desc' },
    take: limit
  })

  // Combine and transform results
  const storeResults = stores.map(store => ({
    type: 'store' as const,
    id: store.id,
    name: store.name,
    slug: store.slug
  }))

  const promoCodeResults = promoCodes.map(code => ({
    type: 'promoCode' as const,
    id: code.id,
    title: code.title,
    code: code.code,
    storeId: code.storeId,
    storeName: code.store.name,
    storeSlug: code.store.slug
  }))

  // Combine results, alternating between types and respecting overall limit
  const combined = []
  const maxPerType = Math.ceil(limit / 2)
  
  for (let i = 0; i < Math.max(storeResults.length, promoCodeResults.length); i++) {
    if (i < storeResults.length && storeResults.length <= maxPerType) {
      combined.push(storeResults[i])
    }
    
    if (i < promoCodeResults.length && promoCodeResults.length <= maxPerType) {
      combined.push(promoCodeResults[i])
    }
  }

  // If we still have space, add more results from whichever type has more
  if (combined.length < limit) {
    if (storeResults.length > maxPerType) {
      const remaining = storeResults.slice(maxPerType, limit - combined.length + maxPerType)
      combined.push(...remaining)
    } else if (promoCodeResults.length > maxPerType) {
      const remaining = promoCodeResults.slice(maxPerType, limit - combined.length + maxPerType)
      combined.push(...remaining)
    }
  }

  return NextResponse.json(combined.slice(0, limit))
} 