import { Metadata } from 'next'
import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { authOptions } from '@/lib/auth'
import InternationalStoresTable from '@/components/admin/InternationalStoresTable'

export const metadata: Metadata = {
  title: 'International Stores | Admin | GoPromoCodes',
  description: 'Review and clean up non-.com domain stores.',
}

export default async function InternationalStoresPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.isAdmin) {
    redirect('/')
  }

  const stores = await prisma.store.findMany({
    where: {
      OR: [
        { domain: { not: { endsWith: '.com' } } },
        { domain: null },
      ],
    },
    include: {
      _count: { select: { promoCodes: true } },
    },
    orderBy: [
      { promoCodes: { _count: 'asc' } },
      { name: 'asc' },
    ],
  })

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
            {stores.length} stores with non-.com or missing domains.{' '}
            <span className="text-red-600 font-medium">{withoutCodes.length} have 0 promo codes.</span>
            {' '}Deleting a store permanently redirects its URL to the homepage.
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Link
            href="/admin/stores"
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            ← All Stores
          </Link>
        </div>
      </div>

      <InternationalStoresTable withoutCodes={withoutCodes} withCodes={withCodes} />
    </div>
  )
}
