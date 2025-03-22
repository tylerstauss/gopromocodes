import { Metadata } from 'next'
import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import dynamic from 'next/dynamic'

const DataMigration = dynamic(() => import('@/components/admin/DataMigration'), {
  ssr: false,
  loading: () => <div className="animate-pulse bg-gray-200 h-32 rounded"></div>
})

export const metadata: Metadata = {
  title: 'Admin Dashboard | GoPromoCodes',
  description: 'Admin dashboard for GoPromoCodes.',
}

const adminLinks = [
  {
    title: 'Stores',
    description: 'Manage stores and their details',
    href: '/admin/stores',
  },
  {
    title: 'Categories',
    description: 'Manage store categories',
    href: '/admin/categories',
  },
  {
    title: 'Promo Codes',
    description: 'Review and manage promo codes',
    href: '/admin/promocodes',
  },
  {
    title: 'Blog',
    description: 'Manage blog posts',
    href: '/admin/blog',
  },
  {
    title: 'Users',
    description: 'Manage user accounts',
    href: '/admin/users',
  },
]

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.isAdmin) {
    redirect('/')
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="mt-2 text-lg text-gray-600">
          Welcome to the GoPromoCodes admin area. Select a section to manage.
        </p>
      </div>

      <div className="mt-12 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {adminLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="block p-6 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-50"
          >
            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">
              {link.title}
            </h5>
            <p className="text-gray-600">
              {link.description}
            </p>
          </Link>
        ))}
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Database Management</h2>
        <DataMigration />
      </div>
    </div>
  )
} 