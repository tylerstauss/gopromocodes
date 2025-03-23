import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
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

    // Check if slug is unique
    const existingPost = await prisma.blog.findUnique({
      where: { slug },
    })

    if (existingPost) {
      return NextResponse.json(
        { error: 'A blog post with this slug already exists' },
        { status: 400 }
      )
    }

    const now = new Date()

    // Create the blog post
    const post = await prisma.blog.create({
      data: {
        title,
        slug,
        content,
        excerpt,
        published,
        publishedAt: publishedAt ? new Date(publishedAt) : null,
        authorId: parseInt(session.user.id),
        storeId: storeId ? parseInt(storeId) : null,
        createdAt: now,
        updatedAt: now
      }
    })

    // Fetch the post with relations
    const postWithRelations = await prisma.blog.findUnique({
      where: { id: post.id },
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

    if (!postWithRelations) {
      throw new Error('Failed to fetch created post')
    }

    // Convert IDs to strings for the response
    return NextResponse.json({
      ...postWithRelations,
      id: postWithRelations.id.toString(),
      authorId: postWithRelations.authorId.toString(),
      storeId: postWithRelations.storeId?.toString(),
      Store: postWithRelations.Store ? {
        id: postWithRelations.Store.id.toString(),
        name: postWithRelations.Store.name
      } : null,
      User: {
        id: postWithRelations.User.id.toString(),
        username: postWithRelations.User.username
      }
    })
  } catch (error) {
    console.error('Error creating blog post:', error)
    return NextResponse.json(
      { error: 'Failed to create blog post' },
      { status: 500 }
    )
  }
} 