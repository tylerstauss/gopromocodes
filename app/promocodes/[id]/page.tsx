import { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import { notFound, redirect } from 'next/navigation'
import Link from 'next/link'

type Props = {
  params: { id: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const promoCode = await prisma.promoCode.findUnique({
    where: { id: parseInt(params.id) },
    include: { store: true }
  })

  if (!promoCode) {
    return {
      title: 'Promo Code Not Found - GoPromoCodes',
      description: 'The requested promo code could not be found.'
    }
  }

  return {
    title: `${promoCode.store.name} - ${promoCode.title} - GoPromoCodes`,
    description: promoCode.description || `Use this ${promoCode.store.name} promo code to save on your purchase.`,
    alternates: {
      canonical: `https://www.gopromocodes.com/promocodes/${promoCode.id}`
    }
  }
}

async function getPromoCode(id: string) {
  const promoCode = await prisma.promoCode.findUnique({
    where: { id: parseInt(id) },
    include: { store: true }
  })

  if (!promoCode) {
    notFound()
  }

  return promoCode
}

export default async function PromoCodePage({ params }: Props) {
  const promoCode = await getPromoCode(params.id)
  
  // Create Viglink redirect URL
  const viglinkKey = '4313102406607fd73ededb923cc8e1e5'
  const encodedUrl = encodeURIComponent(promoCode.link)
  const viglinkUrl = `https://redirect.viglink.com/?u=${encodedUrl}&key=${viglinkKey}&cuid=com_${promoCode.id}`
  
  // Redirect to Viglink URL
  return redirect(viglinkUrl)
} 