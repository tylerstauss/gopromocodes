import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'
import { authOptions } from '@/lib/auth'

type Props = {
  params: { id: string }
}

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

    const store = await prisma.store.findUnique({
      where: { id: storeId },
      include: { promoCodes: { select: { id: true } } }
    })

    if (!store) {
      return NextResponse.json({ error: 'Store not found' }, { status: 404 })
    }

    const promoCodeIds = store.promoCodes.map(p => p.id)

    // Cascade delete in dependency order
    if (promoCodeIds.length > 0) {
      await prisma.promoCodeVote.deleteMany({ where: { promoCodeId: { in: promoCodeIds } } })
      await prisma.clickLog.deleteMany({ where: { promoCodeId: { in: promoCodeIds } } })
      await prisma.categoryPromoCode.deleteMany({ where: { promoCodeId: { in: promoCodeIds } } })
      await prisma.promoCode.deleteMany({ where: { storeId } })
    }

    await prisma.clickLog.deleteMany({ where: { storeId } })
    await prisma.storeBlog.deleteMany({ where: { storeId } })
    await prisma.blog.updateMany({ where: { storeId }, data: { storeId: null } })
    await prisma.store.delete({ where: { id: storeId } })

    return NextResponse.json({ success: true, slug: store.slug })
  } catch (error) {
    console.error('Error deleting international store:', error)
    return NextResponse.json({ error: 'Failed to delete store' }, { status: 500 })
  }
}
