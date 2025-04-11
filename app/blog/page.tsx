import { Metadata } from 'next'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { format } from 'date-fns'
import NewsletterSignup from '@/components/NewsletterSignup'

export const metadata: Metadata = {
  title: 'Store Blog Posts - GoPromoCodes',
  description: 'Read the latest blog posts about sales, deals and featured items from our favorite stores.',
}

async function getSidebarData() {
  const [stores, categories] = await Promise.all([
    prisma.store.findMany({
      take: 10,
      orderBy: {
        promoCodes: {
          _count: 'desc'
        }
      },
      select: {
        id: true,
        name: true,
        slug: true,
        promoCodes: {
          select: {
            id: true
          }
        }
      }
    }),
    prisma.category.findMany({
      orderBy: {
        name: 'asc'
      },
      select: {
        id: true,
        name: true,
        slug: true
      }
    })
  ])

  return { stores, categories }
}

async function getBlogs(page = 1) {
  const perPage = 20
  const skip = (page - 1) * perPage

  const [blogs, total] = await Promise.all([
    prisma.storeBlog.findMany({
      take: perPage,
      skip,
      orderBy: {
        pubDate: 'desc'
      },
      include: {
        store: {
          select: {
            name: true,
            slug: true
          }
        }
      }
    }),
    prisma.storeBlog.count()
  ])

  return {
    blogs,
    total,
    totalPages: Math.ceil(total / perPage)
  }
}

export default async function BlogPage({
  searchParams
}: {
  searchParams: { page?: string }
}) {
  const page = Number(searchParams.page) || 1
  const [{ blogs, total, totalPages }, { stores, categories }] = await Promise.all([
    getBlogs(page),
    getSidebarData()
  ])

  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Main Content - Left Column (8/12) */}
          <div className="md:w-8/12">
            {/* Header Banner */}
            <div className="bg-red-600 text-white py-3 px-4 rounded-t-lg">
              <h1 className="text-xl font-semibold">Blog Posts About Our Favorite Stores</h1>
            </div>

            {/* Description */}
            <div className="bg-white rounded-b-lg shadow p-4 mb-8">
              <h2 className="text-gray-900 text-lg font-medium mb-4">
                Timely deals, sales and featured items from stores that we love.
              </h2>
              <p className="text-gray-700 text-base">
                As we come across sales and featured products from some of our favorite stores, or any other
                pertinent information that will help you make smarter decisions while shopping, we will add them
                as a blog! You can find all of them wihin the individual store pages at the bottom, below the
                current coupons. And then we aggregate them all here for you to enjoy and start your shopping
                journey.
              </p>
            </div>

            {/* Recent Posts Banner */}
            <div className="bg-red-600 text-white py-3 px-4 rounded-t-lg">
              <h2 className="text-xl font-semibold">Recent Posts</h2>
            </div>

            {/* Blog Posts */}
            <div className="bg-white rounded-b-lg shadow divide-y divide-gray-200">
              {blogs.map((blog) => (
                <div key={blog.id} className="p-4">
                  <div className="flex items-baseline gap-1 text-sm">
                    <span className="text-gray-500">{format(blog.pubDate, 'MM/dd/yyyy')} - </span>
                    <Link 
                      href={`/stores/${blog.store.slug}`}
                      className="text-red-600 hover:underline"
                    >
                      {blog.store.name}
                    </Link>
                    <span className="text-gray-500"> - Written by: {blog.author}</span>
                  </div>
                  <div 
                    className="mt-2 text-base text-gray-900 prose max-w-none"
                    dangerouslySetInnerHTML={{ __html: blog.post }}
                  />
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex justify-center gap-4">
                {page > 1 && (
                  <Link
                    href={`/blog?page=${page - 1}`}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Previous
                  </Link>
                )}
                <span className="px-4 py-2 text-gray-700">
                  Page {page} of {totalPages}
                </span>
                {page < totalPages && (
                  <Link
                    href={`/blog?page=${page + 1}`}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Next
                  </Link>
                )}
              </div>
            )}
          </div>

          {/* Sidebar - Right Column (4/12) */}
          <div className="md:w-4/12">
            {/* Top Stores */}
            <div className="bg-white p-4 rounded-lg shadow mb-6">
              <h2 className="text-lg font-semibold mb-3">Top Stores</h2>
              <div className="space-y-2">
                {stores.map((store) => (
                  <div key={store.id} className="flex justify-between items-center">
                    <Link 
                      href={`/stores/${store.slug}`}
                      className="text-blue-600 hover:underline truncate flex-1"
                    >
                      {store.name}
                    </Link>
                    <div className="text-right text-sm ml-2">
                      <div className="bg-gray-100 rounded px-2 py-0.5">
                        <p className="text-gray-600 text-xs">
                          {store.promoCodes.length} codes
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Newsletter Signup */}
            <NewsletterSignup />
            
            {/* Categories */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-3">Categories</h2>
              <ul className="space-y-1">
                {categories.map((category) => (
                  <li key={category.id}>
                    <Link 
                      href={`/categories/${category.slug}`}
                      className="text-blue-600 hover:underline"
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 