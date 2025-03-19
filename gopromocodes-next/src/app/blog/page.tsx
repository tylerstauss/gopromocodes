import { Metadata } from 'next'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'

export const metadata: Metadata = {
  title: 'Blog | GoPromoCodes',
  description: 'Read our latest articles about shopping deals, promo codes, and money-saving tips.',
}

export default async function BlogPage() {
  const posts = await prisma.blog.findMany({
    where: {
      published: true,
      publishedAt: {
        lte: new Date()
      }
    },
    include: {
      author: {
        select: {
          name: true,
          image: true
        }
      },
      store: {
        select: {
          name: true,
          slug: true
        }
      }
    },
    orderBy: {
      publishedAt: 'desc'
    }
  })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
          Blog
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          Latest articles about shopping deals, promo codes, and money-saving tips.
        </p>
      </div>

      <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <article
            key={post.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <div className="p-6">
              <div className="flex items-center space-x-4">
                {post.author.image && (
                  <img
                    src={post.author.image}
                    alt={post.author.name || 'Author'}
                    className="h-10 w-10 rounded-full"
                  />
                )}
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {post.author.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(post.publishedAt!).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <h2 className="mt-4 text-xl font-semibold text-gray-900">
                <Link href={`/blog/${post.slug}`} className="hover:text-indigo-600">
                  {post.title}
                </Link>
              </h2>

              {post.excerpt && (
                <p className="mt-2 text-gray-600 line-clamp-3">
                  {post.excerpt}
                </p>
              )}

              {post.store && (
                <div className="mt-4">
                  <Link
                    href={`/stores/${post.store.slug}`}
                    className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    {post.store.name}
                  </Link>
                </div>
              )}
            </div>
          </article>
        ))}
      </div>

      {posts.length === 0 && (
        <div className="text-center mt-12">
          <p className="text-gray-500">No blog posts found.</p>
        </div>
      )}
    </div>
  )
} 