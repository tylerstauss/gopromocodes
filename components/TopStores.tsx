import Link from 'next/link'

interface Store {
  id: number;
  name: string;
  slug: string;
  clickStats?: {
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
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Stores</h3>
      <ul className="space-y-2">
        {stores.map((store) => (
          <li key={store.id}>
            <Link href={`/stores/${store.slug}`} className="text-blue-600 hover:underline">
              {store.name}
            </Link>
            {store.clickStats && (
              <span className="text-sm text-gray-500 ml-2">
                ({store.clickStats.total} clicks)
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
} 