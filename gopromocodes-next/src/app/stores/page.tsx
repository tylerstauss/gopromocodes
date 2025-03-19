import { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'All Stores - GoPromoCodes',
  description: 'Browse all stores with active promo codes and deals.',
}

async function getStores() {
  return await prisma.store.findMany({
    where: { active: true },
    include: {
      _count: {
        select: { promoCodes: true }
      }
    },
    orderBy: {
      name: 'asc'
    }
  })
}

export default async function StoresPage() {
  const stores = await getStores()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">All Stores</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stores.map((store) => (
          <Link
            key={store.id}
            href={`/stores/${store.slug}`}
            className="block p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-2">{store.name}</h2>
            {store.description && (
              <p className="text-gray-600 mb-4 line-clamp-2">{store.description}</p>
            )}
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>{store._count.promoCodes} active codes</span>
              <span className="text-blue-600 hover:text-blue-800">View Store →</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
} 