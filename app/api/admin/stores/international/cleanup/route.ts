import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'
import { authOptions } from '@/lib/auth'

export const maxDuration = 60

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
      return NextResponse.json({ count: stores.length })
    }

    const ids = stores.map(s => s.id)

    if (ids.length === 0) {
      return NextResponse.json({ deleted: 0 })
    }

    await prisma.categoryPromoCode.deleteMany({ where: { storeId: { in: ids } } })
    await prisma.clickLog.deleteMany({ where: { storeId: { in: ids } } })
    await prisma.storeBlog.deleteMany({ where: { storeId: { in: ids } } })
    await prisma.blog.updateMany({ where: { storeId: { in: ids } }, data: { storeId: null } })
    await prisma.store.deleteMany({ where: { id: { in: ids } } })

    return NextResponse.json({ deleted: ids.length })
  } catch (error) {
    console.error('Cleanup failed:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Cleanup failed' },
      { status: 500 }
    )
  }
}
