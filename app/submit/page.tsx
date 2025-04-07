import { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import SubmitForm from '@/components/SubmitForm'

export const metadata: Metadata = {
  title: 'Submit a Promo Code - GoPromoCodes',
  description: 'Submit a new promo code or deal to share with our community.',
}

async function getCategories() {
  return await prisma.category.findMany({
    orderBy: { name: 'asc' }
  })
}

export default async function SubmitPage() {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    redirect('/signin?callbackUrl=/submit')
  }

  const categories = await getCategories()

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Submit a Promo Code</h1>
        <p className="mt-2 text-gray-600">
          Share a promo code or deal with our community. Your submission will be reviewed by our team.
        </p>
      </div>

      <SubmitForm stores={[]} categories={categories} />
    </div>
  )
} 