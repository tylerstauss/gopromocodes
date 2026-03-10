import { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'All Stores - GoPromoCodes',
  description: 'Browse all stores with active promo codes and deals.',
}

async function getStores(page: number, pageSize: number) {
  // Get stores with pagination
  const stores = await prisma.store.findMany({
    where: { active: true },
    include: {
      _count: {
        select: { promoCodes: true }
      }
    },
    orderBy: {
      name: 'asc'
    },
    skip: (page - 1) * pageSize,
    take: pageSize
  })

  // Get total count for pagination
  const totalStores = await prisma.store.count({
    where: { active: true }
  })

  return {
    stores,
    totalPages: Math.ceil(totalStores / pageSize)
  }
}

type SearchParams = {
  page?: string
}

export default async function StoresPage({
  searchParams
}: {
  searchParams: SearchParams
}) {
  const currentPage = parseInt(searchParams.page || '1')
  const pageSize = 200
  const { stores, totalPages } = await getStores(currentPage, pageSize)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">All Stores</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
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

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center space-x-2 mt-8">
          {currentPage > 1 && (
            <Link
              href={`/stores?page=${currentPage - 1}`}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Previous
            </Link>
          )}

          <div className="flex items-center space-x-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(page => {
                // Show first and last pages
                if (page === 1 || page === totalPages) return true;
                // Show pages around current page
                if (page >= currentPage - 2 && page <= currentPage + 2) return true;
                return false;
              })
              .map((page, i, filteredPages) => {
                // Add ellipsis
                if (i > 0 && filteredPages[i - 1] !== page - 1) {
                  return (
                    <span key={`ellipsis-${page}`} className="px-4 py-2 text-gray-500">
                      ...
                    </span>
                  );
                }

                return (
                  <Link
                    key={page}
                    href={`/stores?page=${page}`}
                    className={`inline-flex items-center px-4 py-2 border ${
                      currentPage === page
                        ? 'border-blue-500 bg-blue-50 text-blue-600'
                        : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                    } rounded-md text-sm font-medium`}
                  >
                    {page}
                  </Link>
                );
              })}
          </div>

          {currentPage < totalPages && (
            <Link
              href={`/stores?page=${currentPage + 1}`}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Next
            </Link>
          )}
        </div>
      )}
    </div>
  )
} 