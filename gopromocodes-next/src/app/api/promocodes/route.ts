import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'
import { authOptions } from '@/lib/auth'

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json(
        { message: 'You must be logged in to submit a promo code' },
        { status: 401 }
      )
    }

    const data = await request.json()
    const {
      storeId,
      categoryId,
      title,
      description,
      code,
      link,
      expires,
      freeShipping
    } = data

    // Validate required fields
    if (!storeId || !categoryId || !title || !code || !link) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create the promo code
    const promoCode = await prisma.promoCode.create({
      data: {
        storeId,
        title,
        description,
        code,
        link,
        expires: expires ? new Date(expires) : null,
        freeShipping,
        userSubmit: true,
        approved: false, // Require admin approval
        starts: new Date(),
        categories: {
          create: {
            categoryId,
            storeId
          }
        }
      }
    })

    return NextResponse.json(promoCode)
  } catch (error) {
    console.error('Error creating promo code:', error)
    return NextResponse.json(
      { message: 'Failed to create promo code' },
      { status: 500 }
    )
  }
} 