import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'
import { authOptions } from '@/lib/auth'

type Props = {
  params: { id: string }
}

// GET handler to fetch a single store
export async function GET(req: NextRequest, { params }: Props) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const storeId = parseInt(params.id, 10)

    if (isNaN(storeId)) {
      return NextResponse.json({ error: 'Invalid store ID' }, { status: 400 })
    }

    const store = await prisma.store.findUnique({
      where: { id: storeId },
      include: {
        category: {
          select: { id: true, name: true }
        }
      }
    })

    if (!store) {
      return NextResponse.json({ error: 'Store not found' }, { status: 404 })
    }

    return NextResponse.json(store)
  } catch (error) {
    console.error('Error fetching store:', error)
    return NextResponse.json(
      { error: 'Failed to fetch store' },
      { status: 500 }
    )
  }
}

// PATCH handler to update a store
export async function PATCH(req: NextRequest, { params }: Props) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const storeId = parseInt(params.id, 10)

    if (isNaN(storeId)) {
      return NextResponse.json({ error: 'Invalid store ID' }, { status: 400 })
    }

    const storeData = await req.json()

    // Validate required fields
    if (!storeData.name || !storeData.url || !storeData.slug) {
      return NextResponse.json(
        { error: 'Name, URL, and slug are required' },
        { status: 400 }
      )
    }

    // Check if the store exists
    const existingStore = await prisma.store.findUnique({
      where: { id: storeId }
    })

    if (!existingStore) {
      return NextResponse.json({ error: 'Store not found' }, { status: 404 })
    }

    // Check if slug is already in use by another store
    if (storeData.slug !== existingStore.slug) {
      const slugExists = await prisma.store.findUnique({
        where: { slug: storeData.slug }
      })

      if (slugExists) {
        return NextResponse.json(
          { error: 'A store with this slug already exists' },
          { status: 400 }
        )
      }
    }

    // Update the store
    const updatedStore = await prisma.store.update({
      where: { id: storeId },
      data: {
        name: storeData.name,
        url: storeData.url,
        slug: storeData.slug,
        description: storeData.description || null,
        active: storeData.active ?? true,
        categoryId: storeData.categoryId || null,
        topStore: storeData.topStore ?? false,
        networkId: storeData.networkId || null,
        network: storeData.network || null,
        domain: storeData.domain || null,
        metaTitle: storeData.metaTitle || null,
        metaDescription: storeData.metaDescription || null,
        metaKeywords: storeData.metaKeywords || null,
      }
    })

    return NextResponse.json(updatedStore)
  } catch (error) {
    console.error('Error updating store:', error)
    return NextResponse.json(
      { error: 'Failed to update store' },
      { status: 500 }
    )
  }
}

// DELETE handler to delete a store
export async function DELETE(req: NextRequest, { params }: Props) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const storeId = parseInt(params.id, 10)

    if (isNaN(storeId)) {
      return NextResponse.json({ error: 'Invalid store ID' }, { status: 400 })
    }

    // Check if the store exists
    const existingStore = await prisma.store.findUnique({
      where: { id: storeId },
      include: {
        promoCodes: true
      }
    })

    if (!existingStore) {
      return NextResponse.json({ error: 'Store not found' }, { status: 404 })
    }

    // Check if store has promocodes (can't delete if it does)
    if (existingStore.promoCodes.length > 0) {
      return NextResponse.json(
        { error: 'Cannot delete store with existing promo codes' },
        { status: 400 }
      )
    }

    // Delete the store
    await prisma.store.delete({
      where: { id: storeId }
    })

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error('Error deleting store:', error)
    return NextResponse.json(
      { error: 'Failed to delete store' },
      { status: 500 }
    )
  }
} 