import { getServerSession } from 'next-auth'
import { redirect, notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { authOptions } from '@/lib/auth'
import PromoCodeForm from '@/components/admin/PromoCodeForm'

interface Props {
  params: { id: string }
}

export default async function EditPromoCodePage({ params }: Props) {
  const session = await getServerSession(authOptions)
  
  if (!session?.user?.isAdmin) {
    redirect('/')
  }

  const promoCode = await prisma.promoCode.findUnique({
    where: { id: parseInt(params.id) },
    include: {
      store: true,
      categories: {
        include: {
          category: true
        }
      }
    }
  })

  if (!promoCode) {
    notFound()
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Edit Promo Code</h1>
      <PromoCodeForm promoCode={promoCode} />
    </div>
  )
} 