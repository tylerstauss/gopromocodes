import { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Categories - GoPromoCodes',
  description: 'Browse stores and promo codes by category.',
}

async function getCategories() {
  return await prisma.category.findMany({
    include: {
      _count: {
        select: { stores: true }
      }
    },
    orderBy: {
      name: 'asc'
    }
  })
}

export default async function CategoriesPage() {
  const categories = await getCategories()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Categories</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/categories/${category.slug}`}
            className="block p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-2">{category.name}</h2>
            {category.description && (
              <p className="text-gray-600 mb-4 line-clamp-2">{category.description}</p>
            )}
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>{category._count.stores} stores</span>
              <span className="text-blue-600 hover:text-blue-800">View Category →</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
} 