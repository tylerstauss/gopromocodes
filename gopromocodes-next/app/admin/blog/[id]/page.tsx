import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { authOptions } from '@/lib/auth'
import BlogPostForm from '@/components/admin/BlogPostForm'

type Props = {
  params: { id: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await prisma.blog.findUnique({
    where: { id: params.id },
    select: { title: true }
  })

  return {
    title: post ? `Edit ${post.title} | Admin | GoPromoCodes` : 'New Blog Post | Admin | GoPromoCodes',
    description: 'Edit or create a blog post on GoPromoCodes.',
  }
}

export default async function BlogPostEditorPage({ params }: Props) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.isAdmin) {
    redirect('/')
  }

  const post = params.id === 'new' ? null : await prisma.blog.findUnique({
    where: { id: params.id },
    include: {
      store: {
        select: {
          id: true,
          name: true
        }
      }
    }
  })

  const stores = await prisma.store.findMany({
    where: { active: true },
    select: {
      id: true,
      name: true
    },
    orderBy: {
      name: 'asc'
    }
  })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">
            {post ? 'Edit Blog Post' : 'New Blog Post'}
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            {post
              ? 'Edit the blog post details below.'
              : 'Fill in the details to create a new blog post.'}
          </p>
        </div>
      </div>

      <div className="mt-8">
        <BlogPostForm post={post} stores={stores} />
      </div>
    </div>
  )
} 