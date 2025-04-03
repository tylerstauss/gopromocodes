'use client'

import Link from 'next/link'
import { Store, PromoCode, Category, CategoryPromoCode } from '@prisma/client'

type StoreWithCount = Store & {
  _count: {
    promoCodes: number
  }
}

type PromoCodeWithRelations = PromoCode & {
  store: Store
  categories: (CategoryPromoCode & {
    category: Category
  })[]
}

type Props = {
  query: string
  type: 'all' | 'stores' | 'codes'
  stores: StoreWithCount[]
  promoCodes: PromoCodeWithRelations[]
}

export default function SearchResults({ query, type, stores, promoCodes }: Props) {
  return (
    <div>
      {(type === 'all' || type === 'stores') && stores.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Stores</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stores.map((store) => (
              <Link
                key={store.id}
                href={`/stores/${store.slug}`}
                className="block p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{store.name}</h3>
                {store.description && (
                  <p className="text-gray-600 mb-4 line-clamp-2">{store.description}</p>
                )}
                <div className="text-sm text-gray-500">
                  {store._count.promoCodes} active codes
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {(type === 'all' || type === 'codes') && promoCodes.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Promo Codes</h2>
          <div className="space-y-6">
            {promoCodes.map((code) => (
              <div key={code.id} className="bg-white shadow rounded-lg p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{code.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Store: <Link href={`/stores/${code.store.slug}`} className="hover:text-blue-600">{code.store.name}</Link>
                    </p>
                    <p className="text-sm text-gray-600">
                      Categories: {code.categories.map(c => c.category.name).join(', ')}
                    </p>
                    {code.description && (
                      <p className="mt-2 text-gray-700">{code.description}</p>
                    )}
                    <div className="mt-2 space-y-1 text-sm text-gray-600">
                      <p>Code: {code.code}</p>
                      {code.expires && (
                        <p>Expires: {new Date(code.expires).toLocaleDateString()}</p>
                      )}
                      <p>Free Shipping: {code.freeShipping ? 'Yes' : 'No'}</p>
                    </div>
                  </div>
                  <a
                    href={code.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Get Code
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {query && stores.length === 0 && promoCodes.length === 0 && (
        <div className="bg-white shadow rounded-lg p-6">
          <p className="text-gray-600">No results found for "{query}".</p>
        </div>
      )}
    </div>
  )
} 