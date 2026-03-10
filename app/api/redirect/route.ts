import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const promoCodeId = searchParams.get('id')

  if (!promoCodeId) {
    return NextResponse.json(
      { error: 'Promo code ID is required' },
      { status: 400 }
    )
  }

  try {
    // Fetch the promo code details
    const promoCode = await prisma.promoCode.findUnique({
      where: { id: parseInt(promoCodeId) },
      select: {
        link: true,
      },
    })

    if (!promoCode) {
      return NextResponse.json(
        { error: 'Promo code not found' },
        { status: 404 }
      )
    }

    // Construct the Viglink redirect URL
    const viglinkUrl = new URL('https://redirect.viglink.com')
    viglinkUrl.searchParams.append('u', promoCode.link)
    viglinkUrl.searchParams.append('key', process.env.VIGLINK_API_KEY!)
    viglinkUrl.searchParams.append('cuid', promoCodeId)

    // Redirect to the Viglink URL
    return NextResponse.redirect(viglinkUrl.toString())
  } catch (error) {
    console.error('Redirect error:', error)
    return NextResponse.json(
      { error: 'An error occurred while processing the redirect' },
      { status: 500 }
    )
  }
} 