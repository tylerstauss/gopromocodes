import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { redirect, notFound } from 'next/navigation'
import prisma from '../../../../lib/prisma-client'
import { authOptions } from '../../../../lib/auth'
import StoreForm from '@/components/admin/StoreForm'
import FetchPromoCodesButton from '@/components/admin/FetchPromoCodesButton'
import Link from 'next/link'

type Props = {
  params: { id: string }
}

export const metadata: Metadata = {
  title: 'Store Editor | Admin | GoPromoCodes',
  description: 'Add or edit a store on GoPromoCodes.',
}

export default async function StoreEditorPage({ params }: Props) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.isAdmin) {
    redirect('/')
  }

  const isNew = params.id === 'new'
  
  // Fetch existing store if editing
  let store = null
  if (!isNew) {
    store = await prisma.store.findUnique({
      where: { id: parseInt(params.id, 10) },
      include: {
        promoCodes: {
          where: {
            approved: true,
            expires: {
              gte: new Date()
            }
          }
        }
      }
    })
    
    if (!store) {
      notFound()
    }
  }

  // Fetch categories for dropdown
  const categories = await prisma.category.findMany({
    select: {
      id: true,
      name: true
    },
    orderBy: {
      name: 'asc'
    }
  })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">
            {isNew ? 'Add New Store' : `Edit Store: ${store?.name}`}
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            {isNew
              ? 'Fill in the details to create a new store.'
              : 'Edit the store details below.'}
          </p>
        </div>
      </div>

      {!isNew && store && (
        <div className="mt-6 bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-medium text-gray-900">Store Actions</h2>
              <p className="mt-1 text-sm text-gray-500">
                Manage promo codes for this store
              </p>
            </div>
            <Link 
              href={`/stores/${store.slug}`} 
              target="_blank"
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              View Store Page →
            </Link>
          </div>
          
          <div className="mt-4">
            <p className="text-sm text-gray-600 mb-1">
              Current active promo codes: <span className="font-semibold">{store.promoCodes.length}</span>
            </p>
            <FetchPromoCodesButton storeId={store.id} storeName={store.name} />
            <p className="mt-2 text-xs text-gray-500">
              This will fetch promo codes from Honey and save them to the database.
            </p>
          </div>
        </div>
      )}

      <div className="mt-8">
        <StoreForm store={store} categories={categories} />
      </div>
    </div>
  )
} 