import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'

type Props = {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await prisma.blog.findUnique({
    where: { slug: params.slug },
    select: {
      title: true,
      excerpt: true,
      author: {
        select: {
          name: true
        }
      }
    }
  })

  if (!post) {
    return {
      title: 'Blog Post Not Found',
      description: 'The requested blog post could not be found.'
    }
  }

  return {
    title: `${post.title} | GoPromoCodes Blog`,
    description: post.excerpt || `Read ${post.title} by ${post.author.name} on GoPromoCodes.`
  }
}

export default async function BlogPostPage({ params }: Props) {
  const post = await prisma.blog.findUnique({
    where: {
      slug: params.slug,
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
    }
  })

  if (!post) {
    notFound()
  }

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
          {post.title}
        </h1>

        <div className="mt-6 flex items-center justify-center space-x-4">
          {post.author.image && (
            <img
              src={post.author.image}
              alt={post.author.name || 'Author'}
              className="h-10 w-10 rounded-full"
            />
          )}
          <div className="text-left">
            <p className="text-sm font-medium text-gray-900">
              {post.author.name}
            </p>
            <p className="text-sm text-gray-500">
              {new Date(post.publishedAt!).toLocaleDateString()}
            </p>
          </div>
        </div>

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
      </header>

      <div className="mt-12 prose prose-lg mx-auto">
        {post.content.split('\n').map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>

      <div className="mt-12 pt-8 border-t border-gray-200">
        <Link
          href="/blog"
          className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
        >
          ← Back to Blog
        </Link>
      </div>
    </article>
  )
} 