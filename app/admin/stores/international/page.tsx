import { Metadata } from 'next'
import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { authOptions } from '@/lib/auth'
import DeleteInternationalStore from '@/components/admin/DeleteInternationalStore'

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
      _count: {
        select: { promoCodes: true },
      },
    },
    orderBy: [
      { promoCodes: { _count: 'asc' } },
      { name: 'asc' },
    ],
  })

  const withCodes = stores.filter(s => s._count.promoCodes > 0)
  const withoutCodes = stores.filter(s => s._count.promoCodes === 0)

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

      {/* Stores with 0 codes — primary cleanup targets */}
      <section className="mb-12">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">
          0 Promo Codes ({withoutCodes.length})
        </h2>
        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Store</th>
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Domain</th>
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Description</th>
                <th className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">Codes</th>
                <th className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900 pr-6">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {withoutCodes.map((store) => (
                <tr key={store.id} className="hover:bg-gray-50">
                  <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                    <Link href={`/stores/${store.slug}`} target="_blank" className="text-blue-600 hover:underline">
                      {store.name}
                    </Link>
                  </td>
                  <td className="px-3 py-4 text-sm text-gray-500">
                    {store.domain || <span className="text-red-400 italic">none</span>}
                  </td>
                  <td className="px-3 py-4 text-sm text-gray-500 max-w-xs">
                    {store.description
                      ? <span className="line-clamp-2">{store.description}</span>
                      : <span className="text-red-400 italic">no description</span>
                    }
                  </td>
                  <td className="px-3 py-4 text-sm text-center text-gray-500">0</td>
                  <td className="px-3 py-4 text-right pr-6">
                    <DeleteInternationalStore storeId={store.id} storeName={store.name} />
                  </td>
                </tr>
              ))}
              {withoutCodes.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-sm text-gray-500">
                    No stores with 0 promo codes.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Stores with codes — review before deleting */}
      {withCodes.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            Has Promo Codes ({withCodes.length})
          </h2>
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Store</th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Domain</th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Description</th>
                  <th className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">Codes</th>
                  <th className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900 pr-6">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {withCodes.map((store) => (
                  <tr key={store.id} className="hover:bg-gray-50">
                    <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                      <Link href={`/stores/${store.slug}`} target="_blank" className="text-blue-600 hover:underline">
                        {store.name}
                      </Link>
                    </td>
                    <td className="px-3 py-4 text-sm text-gray-500">
                      {store.domain || <span className="text-red-400 italic">none</span>}
                    </td>
                    <td className="px-3 py-4 text-sm text-gray-500 max-w-xs">
                      {store.description
                        ? <span className="line-clamp-2">{store.description}</span>
                        : <span className="text-red-400 italic">no description</span>
                      }
                    </td>
                    <td className="px-3 py-4 text-sm text-center font-medium text-gray-900">
                      {store._count.promoCodes}
                    </td>
                    <td className="px-3 py-4 text-right pr-6">
                      <DeleteInternationalStore storeId={store.id} storeName={store.name} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  )
}
