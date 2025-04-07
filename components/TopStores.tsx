import Link from 'next/link'

interface Store {
  id: number;
  name: string;
  slug: string;
  clickStats: {
    total: number;
    recent: number;
    weighted: number;
  };
}

interface TopStoresProps {
  stores: Store[];
}

export default function TopStores({ stores }: TopStoresProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Top Stores</h2>
      <div className="space-y-3">
        {stores.map((store) => (
          <div key={store.id} className="flex justify-between items-center">
            <Link 
              href={`/stores/${store.slug}`}
              className="text-blue-600 hover:underline truncate flex-1"
            >
              {store.name}
            </Link>
            <div className="text-right text-sm ml-2">
              <div className="bg-gray-100 rounded px-3 py-1">
                <p className="text-gray-600">
                  {store.clickStats.total} uses
                </p>
                {store.clickStats.recent > 0 && (
                  <p className="text-green-600 text-xs">
                    {store.clickStats.recent} in last 7 days
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 