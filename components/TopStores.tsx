import Link from 'next/link'

interface TopStoresProps {
  stores: {
    id: number
    name: string
    slug: string
    clickStats: {
      total: number
      recent: number
      weighted: number
    }
  }[]
}

export default function TopStores({ stores }: TopStoresProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Stores</h3>
      <div className="space-y-3">
        {stores.map((store) => (
          <div key={store.id} className="bg-gray-100 rounded px-3 py-1">
            <Link 
              href={`/stores/${store.slug}`}
              className="text-blue-600 hover:underline font-trebuchet"
            >
              {store.name}
            </Link>
            <p className="text-gray-600 text-sm">
              {store.clickStats.recent} in last 7 days
            </p>
          </div>
        ))}
      </div>
    </div>
  )
} 