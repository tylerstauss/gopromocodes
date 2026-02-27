import { Metadata } from 'next'
import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { authOptions } from '@/lib/auth'
import InternationalStoresTable from '@/components/admin/InternationalStoresTable'
import DeleteAllEmptyStores from '@/components/admin/DeleteAllEmptyStores'

export const metadata: Metadata = {
  title: 'International Stores | Admin | GoPromoCodes',
  description: 'Review and clean up non-.com domain stores.',
}

const PAGE_SIZE = 100

const where = {
  OR: [
    { domain: { not: { endsWith: '.com' } } },
    { domain: null },
  ],
}

export default async function InternationalStoresPage({
  searchParams,
}: {
  searchParams: { page?: string }
}) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.isAdmin) {
    redirect('/')
  }

  const page = Math.max(1, parseInt(searchParams.page || '1', 10))
  const skip = (page - 1) * PAGE_SIZE

  const cleanupWhere = {
    OR: [
      { domain: { not: { endsWith: '.com' } } },
      { domain: null },
    ],
    AND: [
      { OR: [{ description: null }, { description: '' }] },
      { promoCodes: { none: {} } },
    ],
  }

  const [stores, totalCount, cleanupCount] = await Promise.all([
    prisma.store.findMany({
      where,
      include: { _count: { select: { promoCodes: true } } },
      orderBy: [
        { promoCodes: { _count: 'asc' } },
        { name: 'asc' },
      ],
      skip,
      take: PAGE_SIZE,
    }),
    prisma.store.count({ where }),
    prisma.store.count({ where: cleanupWhere }),
  ])

  const totalPages = Math.ceil(totalCount / PAGE_SIZE)

  const mapped = stores.map(s => ({
    id: s.id,
    name: s.name,
    slug: s.slug,
    domain: s.domain,
    description: s.description,
    promoCodeCount: s._count.promoCodes,
  }))

  const withoutCodes = mapped.filter(s => s.promoCodeCount === 0)
  const withCodes = mapped.filter(s => s.promoCodeCount > 0)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="sm:flex sm:items-center mb-8">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">International / Non-.com Stores</h1>
          <p className="mt-2 text-sm text-gray-700">
            {totalCount} total stores with non-.com or missing domains.
            {' '}Showing {skip + 1}–{Math.min(skip + stores.length, totalCount)} of {totalCount}.
            {' '}Deleting a store permanently redirects its URL to the homepage.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center gap-3">
          <DeleteAllEmptyStores count={cleanupCount} />
          <Link
            href="/admin/stores"
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            ← All Stores
          </Link>
        </div>
      </div>

      <InternationalStoresTable withoutCodes={withoutCodes} withCodes={withCodes} />

      {totalPages > 1 && (
        <div className="mt-8 flex items-center justify-between">
          <p className="text-sm text-gray-700">
            Page {page} of {totalPages}
          </p>
          <div className="flex gap-2">
            {page > 1 && (
              <Link
                href={`?page=${page - 1}`}
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                ← Previous
              </Link>
            )}
            {page < totalPages && (
              <Link
                href={`?page=${page + 1}`}
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Next →
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
