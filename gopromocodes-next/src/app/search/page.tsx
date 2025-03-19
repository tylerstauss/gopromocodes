import { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import SearchResults from '@/components/SearchResults'
import { Store, PromoCode } from '@prisma/client'

export const metadata: Metadata = {
  title: 'Search - GoPromoCodes',
  description: 'Search for stores, promo codes, and deals.',
}

type SearchParams = {
  q?: string
  type?: 'all' | 'stores' | 'codes'
}

type StoreWithCount = Store & {
  _count: {
    promoCodes: number
  }
}

type PromoCodeWithRelations = PromoCode & {
  store: Store
  categories: {
    category: {
      id: number
      name: string
    }
  }[]
}

async function searchStores(query: string): Promise<StoreWithCount[]> {
  return await prisma.store.findMany({
    where: {
      OR: [
        { name: { contains: query, mode: 'insensitive' } },
        { description: { contains: query, mode: 'insensitive' } },
        { searchTerms: { contains: query, mode: 'insensitive' } }
      ],
      active: true
    },
    include: {
      _count: {
        select: { promoCodes: true }
      }
    },
    take: 10
  })
}

async function searchPromoCodes(query: string): Promise<PromoCodeWithRelations[]> {
  return await prisma.promoCode.findMany({
    where: {
      OR: [
        { title: { contains: query, mode: 'insensitive' } },
        { description: { contains: query, mode: 'insensitive' } },
        { code: { contains: query, mode: 'insensitive' } },
        { store: { name: { contains: query, mode: 'insensitive' } } }
      ],
      approved: true,
      expires: {
        gte: new Date()
      }
    },
    include: {
      store: true,
      categories: {
        include: {
          category: true
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    },
    take: 20
  }) as PromoCodeWithRelations[]
}

export default async function SearchPage({
  searchParams
}: {
  searchParams: SearchParams
}) {
  const query = searchParams.q || ''
  const type = searchParams.type || 'all'

  let stores: StoreWithCount[] = []
  let promoCodes: PromoCodeWithRelations[] = []

  if (query) {
    if (type === 'all' || type === 'stores') {
      stores = await searchStores(query)
    }
    if (type === 'all' || type === 'codes') {
      promoCodes = await searchPromoCodes(query)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Search Results</h1>
        {query && (
          <p className="mt-2 text-gray-600">
            Showing results for "{query}"
          </p>
        )}
      </div>

      <SearchResults
        query={query}
        type={type}
        stores={stores}
        promoCodes={promoCodes}
      />
    </div>
  )
} 