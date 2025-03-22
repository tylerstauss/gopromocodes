import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'
import { authOptions } from '@/lib/auth'

// GET handler to fetch all stores
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const stores = await prisma.store.findMany({
      orderBy: {
        name: 'asc',
      },
    })

    return NextResponse.json(stores)
  } catch (error) {
    console.error('Error fetching stores:', error)
    return NextResponse.json(
      { error: 'Failed to fetch stores' },
      { status: 500 }
    )
  }
}

// POST handler to create a new store
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const storeData = await req.json()

    // Validate required fields
    if (!storeData.name || !storeData.url || !storeData.slug) {
      return NextResponse.json(
        { error: 'Name, URL, and slug are required' },
        { status: 400 }
      )
    }

    // Check if slug is already in use
    const existingStore = await prisma.store.findUnique({
      where: { slug: storeData.slug },
    })

    if (existingStore) {
      return NextResponse.json(
        { error: 'A store with this slug already exists' },
        { status: 400 }
      )
    }

    // Create the store
    const store = await prisma.store.create({
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
      },
    })

    return NextResponse.json(store, { status: 201 })
  } catch (error) {
    console.error('Error creating store:', error)
    return NextResponse.json(
      { error: 'Failed to create store' },
      { status: 500 }
    )
  }
} 