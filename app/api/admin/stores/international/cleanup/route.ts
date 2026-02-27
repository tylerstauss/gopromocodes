import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'
import { authOptions } from '@/lib/auth'

const CHUNK_SIZE = 200

function chunk<T>(arr: T[], size: number): T[][] {
  const chunks: T[][] = []
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size))
  }
  return chunks
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { dryRun } = await request.json().catch(() => ({ dryRun: false }))

  try {
    const stores = await prisma.store.findMany({
      where: {
        OR: [
          { domain: { not: { endsWith: '.com' } } },
          { domain: null },
        ],
        AND: [
          { OR: [{ description: null }, { description: '' }] },
          { promoCodes: { none: {} } },
        ],
      },
      select: { id: true, name: true, slug: true },
    })

    if (dryRun) {
      return NextResponse.json({ count: stores.length, stores })
    }

    const storeIds = stores.map(s => s.id)
    const chunks = chunk(storeIds, CHUNK_SIZE)

    for (const ids of chunks) {
      await prisma.categoryPromoCode.deleteMany({ where: { storeId: { in: ids } } })
      await prisma.clickLog.deleteMany({ where: { storeId: { in: ids } } })
      await prisma.storeBlog.deleteMany({ where: { storeId: { in: ids } } })
      await prisma.blog.updateMany({ where: { storeId: { in: ids } }, data: { storeId: null } })
      await prisma.store.deleteMany({ where: { id: { in: ids } } })
    }

    return NextResponse.json({ deleted: stores.length })
  } catch (error) {
    console.error('Cleanup failed:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Cleanup failed' },
      { status: 500 }
    )
  }
}
