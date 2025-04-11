import { Metadata } from 'next'
import Link from 'next/link'
import NewsletterSignup from '@/components/NewsletterSignup'
import { prisma } from '@/lib/prisma'

export const metadata: Metadata = {
  title: 'Contact GoPromoCodes - Get in Touch',
  description: 'Contact the GoPromoCodes team for questions, feedback, or to report issues with promo codes.',
}

async function getSidebarData() {
  const [stores, categories] = await Promise.all([
    prisma.store.findMany({
      take: 10,
      orderBy: {
        promoCodes: {
          _count: 'desc'
        }
      },
      select: {
        id: true,
        name: true,
        slug: true,
        promoCodes: {
          select: {
            id: true
          }
        }
      }
    }),
    prisma.category.findMany({
      orderBy: {
        name: 'asc'
      },
      select: {
        id: true,
        name: true,
        slug: true
      }
    })
  ])

  return { stores, categories }
}

export default async function ContactPage() {
  const { stores, categories } = await getSidebarData()

  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Main Content - Left Column (8/12) */}
          <div className="md:w-8/12">
            {/* Header Section */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Contact GoPromoCodes</h1>
              <div className="bg-white rounded-lg shadow p-6 space-y-6">
                <div className="space-y-4">
                  <p className="text-gray-700">
                    We're here to help! Whether you have questions about our service, need to report an issue with a promo code, or want to provide feedback, we'd love to hear from you.
                  </p>

                  <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
                    <p className="text-blue-700">
                      <span className="font-semibold">Email us at:</span>{' '}
                      <a href="mailto:contact@gopromocodes.com" className="text-blue-600 hover:underline">
                        contact@gopromocodes.com
                      </a>
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-gray-900">What to Include in Your Email</h2>
                    <ul className="list-disc list-inside space-y-2 text-gray-700">
                      <li>Your name and contact information</li>
                      <li>The store name and promo code you're inquiring about</li>
                      <li>A detailed description of your question or issue</li>
                      <li>Any relevant screenshots or error messages</li>
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-gray-900">Response Time</h2>
                    <p className="text-gray-700">
                      We typically respond to all emails within 24-48 hours. For urgent matters, please include "URGENT" in your subject line.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-gray-900">Other Ways to Connect</h2>
                    <p className="text-gray-700">
                      You can also find us on social media or check out our <Link href="/about" className="text-blue-600 hover:underline">About page</Link> to learn more about our team and mission.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Right Column (4/12) */}
          <div className="md:w-4/12">
            {/* Top Stores */}
            <div className="bg-white p-4 rounded-lg shadow mb-6">
              <h2 className="text-lg font-semibold mb-3">Top Stores</h2>
              <div className="space-y-2">
                {stores.map((store) => (
                  <div key={store.id} className="flex justify-between items-center">
                    <Link 
                      href={`/stores/${store.slug}`}
                      className="text-blue-600 hover:underline truncate flex-1"
                    >
                      {store.name}
                    </Link>
                    <div className="text-right text-sm ml-2">
                      <div className="bg-gray-100 rounded px-2 py-0.5">
                        <p className="text-gray-600 text-xs">
                          {store.promoCodes.length} codes
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Newsletter Signup */}
            <NewsletterSignup />
            
            {/* Categories */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-3">Categories</h2>
              <ul className="space-y-1">
                {categories.map((category) => (
                  <li key={category.id}>
                    <Link 
                      href={`/categories/${category.slug}`}
                      className="text-blue-600 hover:underline"
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 