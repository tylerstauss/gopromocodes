import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { authOptions } from '@/lib/auth'
import PromoCodeList from '@/components/admin/PromoCodeList'

export const metadata: Metadata = {
  title: 'Manage Promo Codes - Admin - GoPromoCodes',
  description: 'Admin interface for managing promo codes.',
}

async function getPromoCodes() {
  return await prisma.promoCode.findMany({
    where: {
      userSubmit: true,
      approved: false
    },
    include: {
      store: true,
      categories: {
        include: {
          category: true
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  })
}

export default async function AdminPromoCodesPage() {
  const session = await getServerSession(authOptions)
  
  if (!session?.user?.isAdmin) {
    redirect('/')
  }

  const promoCodes = await getPromoCodes()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Manage Promo Codes</h1>
        <p className="mt-2 text-gray-600">
          Review and approve user-submitted promo codes.
        </p>
      </div>

      <PromoCodeList promoCodes={promoCodes} />
    </div>
  )
} 