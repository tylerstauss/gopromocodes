import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { redirect, notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { authOptions } from '@/lib/auth'
import UserForm from '@/components/admin/UserForm'
import Link from 'next/link'

type Props = {
  params: { id: string }
}

export const metadata: Metadata = {
  title: 'User Editor | Admin | GoPromoCodes',
  description: 'Add or edit a user on GoPromoCodes.',
}

export default async function UserEditorPage({ params }: Props) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.isAdmin) {
    redirect('/')
  }

  const isNew = params.id === 'new'
  
  // Fetch existing user if editing
  let user = null
  if (!isNew) {
    user = await prisma.user.findUnique({
      where: { id: parseInt(params.id, 10) }
    })
    
    if (!user) {
      notFound()
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            {isNew ? 'Add New User' : `Edit User: ${user?.username}`}
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            {isNew
              ? 'Fill in the details to create a new user.'
              : 'Edit the user details below.'}
          </p>
        </div>
        <Link
          href="/admin/users"
          className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
        >
          Back to Users
        </Link>
      </div>

      <div className="mt-8">
        <UserForm user={user} />
      </div>
    </div>
  )
} 