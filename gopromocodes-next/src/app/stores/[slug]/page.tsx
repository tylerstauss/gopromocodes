import { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'

type Props = {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const store = await prisma.store.findUnique({
    where: { slug: params.slug }
  })

  if (!store) {
    return {
      title: 'Store Not Found - GoPromoCodes',
      description: 'The requested store could not be found.'
    }
  }

  return {
    title: `${store.name} Promo Codes - GoPromoCodes`,
    description: store.metaDescription || `Find the latest ${store.name} promo codes and deals.`
  }
}

async function getStore(slug: string) {
  const store = await prisma.store.findUnique({
    where: { slug },
    include: {
      promoCodes: {
        where: {
          approved: true,
          expires: {
            gte: new Date()
          }
        },
        orderBy: {
          createdAt: 'desc'
        }
      }
    }
  })

  if (!store) {
    notFound()
  }

  return store
}

export default async function StorePage({ params }: Props) {
  const store = await getStore(params.slug)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{store.name}</h1>
        {store.description && (
          <p className="text-gray-600">{store.description}</p>
        )}
      </div>

      <div className="space-y-6">
        {store.promoCodes.length === 0 ? (
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-600">No active promo codes at the moment. Check back soon!</p>
          </div>
        ) : (
          store.promoCodes.map((code) => (
            <div key={code.id} className="bg-white p-6 rounded-lg shadow">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">{code.title}</h2>
                  {code.description && (
                    <p className="mt-2 text-gray-600">{code.description}</p>
                  )}
                  <div className="mt-2 text-sm text-gray-500">
                    Expires: {new Date(code.expires!).toLocaleDateString()}
                  </div>
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
            </div>
          ))
        )}
      </div>
    </div>
  )
} 