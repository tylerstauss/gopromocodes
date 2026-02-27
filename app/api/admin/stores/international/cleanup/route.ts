import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'
import { authOptions } from '@/lib/auth'

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { dryRun } = await request.json().catch(() => ({ dryRun: false }))

  // Find all international stores with 0 promo codes and no description
  const stores = await prisma.store.findMany({
    where: {
      OR: [
        { domain: { not: { endsWith: '.com' } } },
        { domain: null },
      ],
      description: null,
      promoCodes: { none: {} },
    },
    select: { id: true, name: true, slug: true },
  })

  if (dryRun) {
    return NextResponse.json({ count: stores.length, stores })
  }

  const storeIds = stores.map(s => s.id)

  // Cascade delete
  await prisma.clickLog.deleteMany({ where: { storeId: { in: storeIds } } })
  await prisma.storeBlog.deleteMany({ where: { storeId: { in: storeIds } } })
  await prisma.blog.updateMany({ where: { storeId: { in: storeIds } }, data: { storeId: null } })
  await prisma.store.deleteMany({ where: { id: { in: storeIds } } })

  return NextResponse.json({ deleted: stores.length, stores })
}
