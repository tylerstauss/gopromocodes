import { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { CategoryWithRelations } from '@/types/prisma'

type Props = {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = await prisma.category.findUnique({
    where: { slug: params.slug }
  })

  if (!category) {
    return {
      title: 'Category Not Found - GoPromoCodes',
      description: 'The requested category could not be found.'
    }
  }

  return {
    title: `${category.name} Promo Codes - GoPromoCodes`,
    description: category.metaDescription || `Find the latest ${category.name} promo codes and deals.`
  }
}

async function getCategory(slug: string): Promise<CategoryWithRelations> {
  const category = await prisma.category.findUnique({
    where: { slug },
    include: {
      stores: {
        where: { active: true },
        include: {
          _count: {
            select: { promoCodes: true }
          }
        }
      },
      promoCodes: {
        where: {
          promoCode: {
            approved: true,
            expires: {
              gte: new Date()
            }
          }
        },
        include: {
          promoCode: {
            include: {
              store: true
            }
          }
        },
        orderBy: {
          promoCode: {
            createdAt: 'desc'
          }
        }
      }
    }
  })

  if (!category) {
    notFound()
  }

  return category as CategoryWithRelations
}

export default async function CategoryPage({ params }: Props) {
  const category = await getCategory(params.slug)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{category.name}</h1>
        {category.description && (
          <p className="text-gray-600">{category.description}</p>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Latest Promo Codes</h2>
          <div className="space-y-6">
            {category.promoCodes.length === 0 ? (
              <div className="bg-white p-6 rounded-lg shadow">
                <p className="text-gray-600">No active promo codes in this category at the moment.</p>
              </div>
            ) : (
              category.promoCodes.map(({ promoCode }) => (
                <div key={promoCode.id} className="bg-white p-6 rounded-lg shadow">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{promoCode.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{promoCode.store.name}</p>
                      {promoCode.description && (
                        <p className="mt-2 text-gray-600">{promoCode.description}</p>
                      )}
                      <div className="mt-2 text-sm text-gray-500">
                        Expires: {new Date(promoCode.expires!).toLocaleDateString()}
                      </div>
                    </div>
                    <a
                      href={promoCode.link}
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

        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Stores in this Category</h2>
          <div className="space-y-4">
            {category.stores.map((store) => (
              <Link
                key={store.id}
                href={`/stores/${store.slug}`}
                className="block p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
              >
                <h3 className="text-lg font-medium text-gray-900">{store.name}</h3>
                {store.description && (
                  <p className="mt-1 text-sm text-gray-600 line-clamp-2">{store.description}</p>
                )}
                <div className="mt-2 text-sm text-gray-500">
                  {store._count.promoCodes} active codes
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 