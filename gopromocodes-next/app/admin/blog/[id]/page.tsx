import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { prisma, authOptions } from '@/lib'
import BlogPostForm from '@/components/admin/BlogPostForm'
import { notFound } from 'next/navigation'

type Props = {
  params: { id: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await prisma.blog.findUnique({
    where: { id: parseInt(params.id) },
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
    where: { id: parseInt(params.id) },
    include: {
      Store: {
        select: {
          id: true,
          name: true
        }
      },
      User: {
        select: {
          id: true,
          username: true
        }
      }
    }
  })

  if (params.id !== 'new' && !post) {
    notFound()
  }

  const stores = await prisma.store.findMany({
    select: {
      id: true,
      name: true
    },
    orderBy: {
      name: 'asc'
    }
  })

  const formattedStores = stores.map(store => ({
    id: store.id,
    name: store.name
  }))

  const formattedPost = post ? {
    ...post,
    Store: post.Store ? {
      id: post.Store.id,
      name: post.Store.name
    } : null,
    User: {
      id: post.User.id,
      username: post.User.username
    }
  } : null

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900">
        {params.id === 'new' ? 'Create New Blog Post' : 'Edit Blog Post'}
      </h1>
      <div className="mt-8">
        <BlogPostForm post={formattedPost} stores={formattedStores} />
      </div>
    </div>
  )
} 