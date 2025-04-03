import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import DataMigration from '@/components/admin/DataMigration'

export const metadata: Metadata = {
  title: 'Data Migration - Admin Dashboard',
  description: 'Manage data migration between databases.',
}

export default async function MigrationPage() {
  const session = await getServerSession(authOptions)
  
  if (!session?.user?.isAdmin) {
    redirect('/')
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Data Migration</h1>
      <DataMigration />
    </div>
  )
} 