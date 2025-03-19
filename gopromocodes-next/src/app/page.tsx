import Header from '@/components/Header'
import { prisma } from '@/lib/prisma'

async function getFeaturedStores() {
  return await prisma.store.findMany({
    where: { 
      active: true,
      topStore: true 
    },
    take: 12,
    orderBy: {
      updatedAt: 'desc'
    }
  })
}

async function getLatestCodes() {
  return await prisma.promoCode.findMany({
    where: { 
      approved: true,
      expires: {
        gte: new Date()
      }
    },
    include: {
      store: true
    },
    take: 10,
    orderBy: {
      createdAt: 'desc'
    }
  })
}

export default async function Home() {
  const [featuredStores, latestCodes] = await Promise.all([
    getFeaturedStores(),
    getLatestCodes()
  ])

  return (
    <div>
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Stores</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredStores.map((store) => (
              <a
                key={store.id}
                href={`/stores/${store.slug}`}
                className="block p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
              >
                <h3 className="text-lg font-medium text-gray-900">{store.name}</h3>
                {store.description && (
                  <p className="mt-2 text-sm text-gray-600 line-clamp-2">{store.description}</p>
                )}
              </a>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Latest Promo Codes</h2>
          <div className="space-y-4">
            {latestCodes.map((code) => (
              <div
                key={code.id}
                className="p-4 bg-white rounded-lg shadow"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{code.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{code.store.name}</p>
                  </div>
                  <a
                    href={code.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Get Code
                  </a>
                </div>
                {code.description && (
                  <p className="mt-2 text-sm text-gray-600">{code.description}</p>
                )}
                <div className="mt-2 text-sm text-gray-500">
                  Expires: {new Date(code.expires!).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
} 