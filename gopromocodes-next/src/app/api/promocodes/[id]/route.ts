import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'
import { authOptions } from '@/lib/auth'

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.isAdmin) {
      return NextResponse.json(
        { message: 'You must be an admin to perform this action' },
        { status: 401 }
      )
    }

    const { action } = await request.json()
    const promoCodeId = parseInt(params.id)

    if (!['approve', 'reject'].includes(action)) {
      return NextResponse.json(
        { message: 'Invalid action' },
        { status: 400 }
      )
    }

    if (action === 'approve') {
      const promoCode = await prisma.promoCode.update({
        where: { id: promoCodeId },
        data: { approved: true }
      })
      return NextResponse.json(promoCode)
    } else {
      await prisma.promoCode.delete({
        where: { id: promoCodeId }
      })
      return NextResponse.json({ message: 'Promo code rejected and deleted' })
    }
  } catch (error) {
    console.error('Error updating promo code:', error)
    return NextResponse.json(
      { message: 'Failed to update promo code' },
      { status: 500 }
    )
  }
} 