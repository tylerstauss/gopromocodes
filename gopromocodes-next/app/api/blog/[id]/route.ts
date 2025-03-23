import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const data = await request.json()
    const { title, slug, content, excerpt, published, storeId, publishedAt } = data

    // Validate required fields
    if (!title || !slug || !content) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Check if slug is unique (excluding current post)
    const existingPost = await prisma.blog.findFirst({
      where: {
        slug,
        NOT: {
          id: parseInt(params.id),
        },
      },
    })

    if (existingPost) {
      return NextResponse.json(
        { error: 'A blog post with this slug already exists' },
        { status: 400 }
      )
    }

    // Update the blog post
    const post = await prisma.blog.update({
      where: { id: parseInt(params.id) },
      data: {
        title,
        slug,
        content,
        excerpt,
        published,
        publishedAt: publishedAt ? new Date(publishedAt) : null,
        storeId: storeId ? parseInt(storeId) : null,
      },
      include: {
        Store: {
          select: {
            id: true,
            name: true,
          },
        },
        User: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    })

    // Convert IDs to strings for the response
    return NextResponse.json({
      ...post,
      id: post.id.toString(),
      storeId: post.storeId?.toString(),
      Store: post.Store ? {
        id: post.Store.id.toString(),
        name: post.Store.name
      } : null,
      User: {
        id: post.User.id.toString(),
        username: post.User.username
      }
    })
  } catch (error) {
    console.error('Error updating blog post:', error)
    return NextResponse.json(
      { error: 'Failed to update blog post' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Delete the blog post
    await prisma.blog.delete({
      where: { id: parseInt(params.id) },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting blog post:', error)
    return NextResponse.json(
      { error: 'Failed to delete blog post' },
      { status: 500 }
    )
  }
}