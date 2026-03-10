import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { authOptions } from '@/lib/auth'
import PromoCodeList from '@/components/admin/PromoCodeList'
import PromoCodeSearch from '@/components/admin/PromoCodeSearch'
import { Prisma } from '@prisma/client'

export const metadata: Metadata = {
  title: 'Manage Promo Codes - Admin - GoPromoCodes',
  description: 'Admin interface for managing promo codes.',
}

type SearchParams = {
  page?: string;
  search?: string;
}

export default async function AdminPromoCodesPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const session = await getServerSession(authOptions)
  
  if (!session?.user?.isAdmin) {
    redirect('/')
  }

  const page = parseInt(searchParams.page || '1', 10);
  const search = searchParams.search || '';
  const pageSize = 20;
  const skip = (page - 1) * pageSize;

  // Build the where clause for search
  let where: Prisma.PromoCodeWhereInput = {};
  
  if (search) {
    where = {
      OR: [
        { title: { contains: search, mode: 'insensitive' as Prisma.QueryMode } },
        { code: { contains: search, mode: 'insensitive' as Prisma.QueryMode } },
        { description: { contains: search, mode: 'insensitive' as Prisma.QueryMode } },
        { store: { name: { contains: search, mode: 'insensitive' as Prisma.QueryMode } } },
      ],
    };
  }

  // Get total count for pagination
  const totalPromoCodes = await prisma.promoCode.count({ where });
  const totalPages = Math.ceil(totalPromoCodes / pageSize);

  const promoCodes = await prisma.promoCode.findMany({
    where,
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
    skip,
    take: pageSize,
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Manage Promo Codes</h1>
        <p className="mt-2 text-gray-600">
          View and manage all promo codes
        </p>
      </div>

      {/* Search and pagination stats */}
      <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <PromoCodeSearch initialSearch={search} />
        <div className="text-sm text-gray-500">
          Showing {promoCodes.length} of {totalPromoCodes} promo codes
          {search && <span> matching "<strong>{search}</strong>"</span>}
        </div>
      </div>

      <PromoCodeList promoCodes={promoCodes} />

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-between">
          <div className="flex-1 flex justify-between sm:hidden">
            {page > 1 && (
              <a
                href={`/admin/promocodes?page=${page - 1}${search ? `&search=${encodeURIComponent(search)}` : ''}`}
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Previous
              </a>
            )}
            {page < totalPages && (
              <a
                href={`/admin/promocodes?page=${page + 1}${search ? `&search=${encodeURIComponent(search)}` : ''}`}
                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Next
              </a>
            )}
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{promoCodes.length > 0 ? skip + 1 : 0}</span> to{' '}
                <span className="font-medium">{Math.min(skip + promoCodes.length, totalPromoCodes)}</span> of{' '}
                <span className="font-medium">{totalPromoCodes}</span> promo codes
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                {page > 1 && (
                  <a
                    href={`/admin/promocodes?page=${page - 1}${search ? `&search=${encodeURIComponent(search)}` : ''}`}
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <span className="sr-only">Previous</span>
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </a>
                )}
                
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  // For simplicity, show 5 pages centered around current page
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (page <= 3) {
                    pageNum = i + 1;
                  } else if (page >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = page - 2 + i;
                  }
                  
                  return (
                    <a
                      key={pageNum}
                      href={`/admin/promocodes?page=${pageNum}${search ? `&search=${encodeURIComponent(search)}` : ''}`}
                      className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                        page === pageNum
                          ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                          : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                      }`}
                    >
                      {pageNum}
                    </a>
                  );
                })}
                
                {page < totalPages && (
                  <a
                    href={`/admin/promocodes?page=${page + 1}${search ? `&search=${encodeURIComponent(search)}` : ''}`}
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <span className="sr-only">Next</span>
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </a>
                )}
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 