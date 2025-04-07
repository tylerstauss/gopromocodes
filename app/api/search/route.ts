import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

interface StoreResult {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  _count?: {
    promoCodes: number;
  };
}

interface PromocodeResult {
  id: string;
  title: string;
  description: string | null;
  code: string;
  store: {
    slug: string;
  };
}

type SearchResult = {
  type: 'store';
  data: StoreResult;
  relevance: number;
}

function calculateRelevance(query: string, text: string): number {
  const normalizedQuery = query.toLowerCase().trim()
  const normalizedText = text.toLowerCase().trim()
  
  // Exact match gets highest relevance
  if (normalizedText === normalizedQuery) return 1.0
  
  // Starts with query gets high relevance
  if (normalizedText.startsWith(normalizedQuery)) return 0.9
  
  // Contains query as whole word gets medium-high relevance
  const wholeWordRegex = new RegExp(`\\b${normalizedQuery}\\b`, 'i')
  if (wholeWordRegex.test(normalizedText)) return 0.8
  
  // Contains query as substring at word boundary
  const partialWordRegex = new RegExp(`\\b${normalizedQuery}`, 'i')
  if (partialWordRegex.test(normalizedText)) return 0.7
  
  // Contains query as substring (only for longer queries)
  if (normalizedQuery.length >= 4 && normalizedText.includes(normalizedQuery)) return 0.5
  
  return 0
}

export async function GET(request: NextRequest) {
  console.log('Search API called')
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('q')
  console.log('Search query:', query)

  if (!query || query.length < 2) {
    console.log('Query rejected - too short or empty')
    return NextResponse.json([])
  }

  try {
    // Search for stores with promo code count
    const storeResults = await prisma.store.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } },
        ],
      },
      select: {
        id: true,
        name: true,
        slug: true,
        description: true,
        _count: {
          select: {
            promoCodes: true
          }
        }
      },
    })

    console.log('Found stores:', storeResults.length)

    // Calculate relevance for stores only
    const results = storeResults
      .map((store: StoreResult) => {
        const nameRelevance = calculateRelevance(query, store.name)
        // Only consider description if it's a longer query and no name match
        const descriptionRelevance = (!nameRelevance && query.length >= 4 && store.description)
          ? calculateRelevance(query, store.description) * 0.05
          : 0

        return {
          type: 'store' as const,
          data: store,
          relevance: Math.max(nameRelevance, descriptionRelevance)
        }
      })
      .filter(result => result.relevance >= 0.5)
      .sort((a: SearchResult, b: SearchResult) => {
        // First sort by relevance
        const relevanceDiff = b.relevance - a.relevance
        if (relevanceDiff !== 0) return relevanceDiff
        
        // If same relevance, sort by promo code count (more codes first)
        const countDiff = (b.data._count?.promoCodes || 0) - (a.data._count?.promoCodes || 0)
        if (countDiff !== 0) return countDiff

        // Finally, sort by name length
        return a.data.name.length - b.data.name.length
      })

    console.log('Filtered and sorted results:', results.length)
    console.log('Top results:', results.slice(0, 2).map(r => ({ 
      name: r.data.name, 
      relevance: r.relevance,
      promoCount: r.data._count?.promoCodes
    })))

    return NextResponse.json(results)
  } catch (error) {
    console.error('Search error:', error)
    return NextResponse.json(
      { error: 'An error occurred while searching' },
      { status: 500 }
    )
  }
} 