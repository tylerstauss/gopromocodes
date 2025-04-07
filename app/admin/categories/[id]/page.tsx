import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { redirect, notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { authOptions } from '../../../../lib/auth'
import CategoryForm from '@/components/admin/CategoryForm'

type Props = {
  params: { id: string }
}

export const metadata: Metadata = {
  title: 'Category Editor | Admin | GoPromoCodes',
  description: 'Add or edit a category on GoPromoCodes.',
}

export default async function CategoryEditorPage({ params }: Props) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.isAdmin) {
    redirect('/')
  }

  const isNew = params.id === 'new'
  
  // Fetch existing category if editing
  let category = null
  if (!isNew) {
    category = await prisma.category.findUnique({
      where: { id: parseInt(params.id, 10) },
    })
    
    if (!category) {
      notFound()
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">
            {isNew ? 'Add New Category' : `Edit Category: ${category?.name}`}
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            {isNew
              ? 'Fill in the details to create a new category.'
              : 'Edit the category details below.'}
          </p>
        </div>
      </div>

      <div className="mt-8">
        <CategoryForm category={category} />
      </div>
    </div>
  )
} 