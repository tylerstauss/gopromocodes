import { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import NewsletterSignup from '@/components/NewsletterSignup'
import AdminActions from '@/components/admin/AdminActions'
import TrackablePromoLink from '@/components/TrackablePromoLink'
import PromoCodeAdminActions from '@/components/admin/PromoCodeAdminActions'
import { PromoCode } from '@prisma/client'

interface PromoCodeWithClicks extends PromoCode {
  weighted_clicks: number;
  total_clicks: number;
  recent_clicks: number;
  clickStats: {
    total: number;
    recent: number;
    weighted: number;
  };
  url?: string;
}

type Props = {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const store = await prisma.store.findUnique({
    where: { slug: params.slug }
  })

  if (!store) {
    return {
      title: 'Store Not Found - GoPromoCodes',
      description: 'The requested store could not be found.'
    }
  }

  // Match the META tags pattern from the Ruby ERB file
  return {
    title: store.metaTitle || `${store.name} promo codes, coupons and discounts`,
    description: store.metaDescription || `Use ${store.name} promo codes & coupons to save money at ${store.domain || store.name}.`,
    keywords: store.metaKeywords || `${store.name}, promo codes, coupon codes, discounts, promotion codes, savings codes`,
    alternates: {
      canonical: `https://www.gopromocodes.com/stores/${store.slug}`
    }
  }
}

async function getStore(slug: string) {
  const store = await prisma.store.findUnique({
    where: { slug },
    include: {
      category: true
    }
  });

  if (!store) {
    notFound();
  }

  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  // Get active promo codes with click stats
  const activePromoCodes = await prisma.$queryRaw<PromoCodeWithClicks[]>`
    WITH PromoCodeClicks AS (
      SELECT 
        p.*,
        COALESCE(SUM(
          CASE 
            WHEN c.date >= ${sevenDaysAgo} THEN 2  -- Recent clicks count double
            WHEN c.date >= ${thirtyDaysAgo} THEN 1  -- Older clicks count once
            ELSE 0
          END
        ), 0) as weighted_clicks,
        COUNT(c.id) as total_clicks,
        COUNT(CASE WHEN c.date >= ${sevenDaysAgo} THEN 1 END) as recent_clicks
      FROM "PromoCode" p
      LEFT JOIN "ClickLog" c ON p.id = c."promoCodeId"
      WHERE 
        p."storeId" = ${store.id}
        AND p.approved = true 
        AND (p.expires IS NULL OR p.expires >= ${new Date()})
      GROUP BY p.id
    )
    SELECT *
    FROM PromoCodeClicks
    ORDER BY 
      weighted_clicks DESC,
      CASE WHEN weighted_clicks = 0 THEN "createdAt" END DESC NULLS LAST
  `;

  // Transform the promo codes to include click stats
  const transformedPromoCodes = activePromoCodes.map((code: PromoCodeWithClicks) => ({
    ...code,
    clickStats: {
      total: Number(code.total_clicks) || 0,
      recent: Number(code.recent_clicks) || 0,
      weighted: Number(code.weighted_clicks) || 0
    }
  }));

  return {
    ...store,
    promoCodes: transformedPromoCodes
  };
}

async function getTopStores() {
  return await prisma.store.findMany({
    where: { 
      active: true,
      topStore: true 
    },
    take: 12,
    orderBy: {
      name: 'asc'
    }
  })
}

async function getCategories() {
  return await prisma.category.findMany({
    orderBy: {
      name: 'asc'
    }
  })
}

async function getExpiredPromoCodes(storeId: number) {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const expiredCodes = await prisma.$queryRaw<PromoCodeWithClicks[]>`
    WITH ExpiredPromoCodeClicks AS (
      SELECT 
        p.*,
        COALESCE(SUM(
          CASE 
            WHEN c.date >= ${sevenDaysAgo} THEN 2  -- Recent clicks count double
            WHEN c.date >= ${thirtyDaysAgo} THEN 1  -- Older clicks count once
            ELSE 0
          END
        ), 0) as weighted_clicks,
        COUNT(c.id) as total_clicks,
        COUNT(CASE WHEN c.date >= ${sevenDaysAgo} THEN 1 END) as recent_clicks
      FROM "PromoCode" p
      LEFT JOIN "ClickLog" c ON p.id = c."promoCodeId"
      WHERE 
        p."storeId" = ${storeId}
        AND p.approved = true 
        AND p.expires < ${new Date()}
      GROUP BY p.id
    )
    SELECT *
    FROM ExpiredPromoCodeClicks
    ORDER BY 
      weighted_clicks DESC,
      expires DESC NULLS LAST
    LIMIT 5
  `;

  return expiredCodes.map((code: PromoCodeWithClicks) => ({
    ...code,
    clickStats: {
      total: Number(code.total_clicks) || 0,
      recent: Number(code.recent_clicks) || 0,
      weighted: Number(code.weighted_clicks) || 0
    }
  }));
}

async function getStoreBlogs(storeId: number) {
  return await prisma.storeBlog.findMany({
    where: {
      storeId
    },
    orderBy: {
      pubDate: 'desc'
    }
  })
}

export default async function StorePage({ params }: Props) {
  const store = await getStore(params.slug)
  const topStores = await getTopStores()
  const categories = await getCategories()
  const expiredPromoCodes = await getExpiredPromoCodes(store.id)
  const storeBlogs = await getStoreBlogs(store.id)
  const session = await getServerSession(authOptions)
  
  // Stats
  const activeCodes = store.promoCodes.filter(code => new Date(code.expires || '') >= new Date())
  const freeShippingCodes = activeCodes.filter(code => code.freeShipping)
  
  // Format date for display
  const formatDate = (date: Date | null | undefined) => {
    if (!date) return 'N/A'
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Main Content - Left Column (8/12) */}
          <div className="md:w-8/12">
            {/* Store Info Section */}
            <div className="bg-white p-6 rounded-lg shadow mb-6">
              {/* Breadcrumbs */}
              <nav className="flex text-sm text-gray-500 mb-4" aria-label="Breadcrumb">
                <ol className="flex items-center space-x-1">
                  <li>
                    <Link href="/" className="hover:text-gray-700">
                      Home
                    </Link>
                  </li>
                  <li>&gt;</li>
                  <li>
                    <Link href="/stores" className="hover:text-gray-700">
                      Stores
                    </Link>
                  </li>
                  <li>&gt;</li>
                  <li>
                    <span className="text-gray-900">{store.name}</span>
                  </li>
                </ol>
              </nav>
              
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{store.name} Promo Codes & Discounts</h1>
                  <h2 className="text-lg text-gray-700 mb-4">
                    There are currently {activeCodes.length} {store.name} Promotion Codes and {store.name} Coupons.
                  </h2>
                </div>
                
                {/* Admin Actions */}
                {session?.user?.isAdmin && (
                  <div className="flex space-x-2">
                    <Link
                      href={`/admin/stores/${store.id}`}
                      className="inline-flex items-center px-3 py-1.5 border border-indigo-600 text-indigo-600 hover:bg-indigo-50 rounded-md"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit
                    </Link>
                    <AdminActions storeId={store.id} storeName={store.name} />
                  </div>
                )}
              </div>
              
              {store.description && (
                <p className="text-gray-600 mb-4">{store.description}</p>
              )}
              
              <p className="text-gray-600">
                Store located at: <a href={store.url} target="_blank" rel="nofollow" className="text-blue-600 hover:underline">{store.url}</a>
              </p>
            </div>
            
            {/* Current Codes Section */}
            <div className="mb-6">
              <div className="bg-red-600 text-white py-3 px-4 rounded-t-lg">
                <h2 className="text-xl font-semibold">Current Codes</h2>
              </div>
              <div className="bg-white rounded-b-lg shadow">
                {activeCodes.length === 0 ? (
                  <div className="p-6">
                    <p className="text-gray-600">No active promo codes at the moment. Check back soon!</p>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-200">
                    {activeCodes.map((code) => (
                      <div key={code.id} className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-lg font-medium">
                              <span className="font-semibold">{store.name}: </span>
                              <TrackablePromoLink 
                                href={`/promocodes/${code.id}`}
                                promoCodeId={code.id}
                                storeId={store.id}
                                className="text-blue-600 hover:underline"
                              >
                                {code.title}
                              </TrackablePromoLink>
                            </p>
                            
                            {code.description && code.description !== 'NULL' && (
                              <p className="mt-2 text-gray-600">{code.description}</p>
                            )}
                            
                            <p className="mt-2 font-medium">
                              {!code.code || code.code === 'NULL' || code.code === 'n/a' ? (
                                <span>No Code Needed</span>
                              ) : (
                                <span>
                                  Use code: <TrackablePromoLink 
                                    href={`/promocodes/${code.id}`}
                                    promoCodeId={code.id}
                                    storeId={store.id}
                                    className="text-blue-600 hover:underline"
                                  >
                                    {code.code}
                                  </TrackablePromoLink>
                                </span>
                              )}
                            </p>
                            
                            <p className="mt-1 text-sm text-gray-500">
                              Expires: {code.expires && code.expires.toString() !== '2099-12-31' 
                                ? new Date(code.expires).toLocaleDateString() 
                                : 'on-going'}
                            </p>
                            
                            {session?.user?.isAdmin && (
                              <div className="mt-2 flex items-center gap-2">
                                <span className="text-xs text-gray-500">ID: {code.id}</span>
                                <PromoCodeAdminActions promoCodeId={code.id} url={code.url} />
                              </div>
                            )}
                          </div>
                          
                          <div className="text-right text-sm">
                            <div className="bg-gray-100 rounded px-3 py-1">
                              <p className="text-gray-600">
                                {code.clickStats.total} uses
                              </p>
                              {code.clickStats.recent > 0 && (
                                <p className="text-green-600 text-xs">
                                  {code.clickStats.recent} in last 7 days
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            {/* Store Blogs Section */}
            {storeBlogs.length > 0 && (
              <div className="mb-6">
                <div className="bg-red-600 text-white py-3 px-4 rounded-t-lg">
                  <h2 className="text-xl font-semibold">Learn more about how to save the most at {store.name}</h2>
                </div>
                <div className="bg-white p-6 rounded-b-lg shadow">
                  {storeBlogs.map((blog) => (
                    <div key={blog.id} className="mb-6">
                      <p className="text-sm text-gray-500 mb-2">{blog.publishDate}</p>
                      <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: blog.post }} />
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Expired Codes Section */}
            {expiredPromoCodes.length > 0 && (
              <div className="mb-6">
                <div className="bg-red-600 text-white py-3 px-4 rounded-t-lg">
                  <h2 className="text-xl font-semibold">Recently Expired {store.name} Coupon Codes</h2>
                </div>
                <div className="bg-white rounded-b-lg shadow divide-y divide-gray-200">
                  {expiredPromoCodes.map((code) => (
                    <div key={code.id} className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-lg font-medium">
                            <span className="font-semibold">{store.name}: </span>
                            <TrackablePromoLink 
                              href={`/promocodes/${code.id}`}
                              promoCodeId={code.id}
                              storeId={store.id}
                              className="text-blue-600 hover:underline"
                            >
                              {code.title}
                            </TrackablePromoLink>
                          </p>
                          
                          {code.description && code.description !== 'NULL' && (
                            <p className="mt-2 text-gray-600">{code.description}</p>
                          )}
                          
                          <p className="mt-2 font-medium">
                            {!code.code || code.code === 'NULL' || code.code === 'n/a' ? (
                              <span>No Code Needed</span>
                            ) : (
                              <span>
                                Use code: <TrackablePromoLink 
                                  href={`/promocodes/${code.id}`}
                                  promoCodeId={code.id}
                                  storeId={store.id}
                                  className="text-blue-600 hover:underline"
                                >
                                  {code.code}
                                </TrackablePromoLink>
                              </span>
                            )}
                          </p>
                          
                          <p className="mt-1 text-sm text-gray-500">
                            Expired: {formatDate(code.expires)}
                          </p>
                          
                          {session?.user?.isAdmin && (
                            <PromoCodeAdminActions promoCodeId={code.id} url={code.url} />
                          )}
                        </div>
                        
                        <div className="text-right text-sm">
                          <div className="bg-gray-100 rounded px-3 py-1">
                            <p className="text-gray-600">
                              {code.clickStats.total} uses
                            </p>
                            {code.clickStats.recent > 0 && (
                              <p className="text-green-600 text-xs">
                                {code.clickStats.recent} in last 7 days
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Sidebar - Right Column (4/12) */}
          <div className="md:w-4/12">
            {/* Store Stats */}
            <div className="bg-white p-4 rounded-lg shadow mb-6">
              <h2 className="text-lg font-semibold mb-3">{store.name} Offer Data</h2>
              <table className="w-full">
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="py-2">Total Valid Offers:</td>
                    <td className="py-2 font-medium text-right">{activeCodes.length}</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-2">Free Shipping Offers:</td>
                    <td className="py-2 font-medium text-right">{freeShippingCodes.length}</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-2">Last Offer Added:</td>
                    <td className="py-2 font-medium text-right">
                      {activeCodes.length > 0 
                        ? formatDate(activeCodes[0].createdAt) 
                        : 'N/A'}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2">Expired Deals:</td>
                    <td className="py-2 font-medium text-right">{expiredPromoCodes.length}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            {/* Top Stores */}
            <div className="bg-white p-4 rounded-lg shadow mb-6">
              <h2 className="text-lg font-semibold mb-3">Top Stores</h2>
              <div className="grid grid-cols-2 gap-2">
                {topStores.map((topStore) => (
                  <Link 
                    key={topStore.id} 
                    href={`/stores/${topStore.slug}`}
                    className="text-blue-600 hover:underline truncate"
                  >
                    {topStore.name}
                  </Link>
                ))}
              </div>
            </div>
            
            {/* Newsletter Signup */}
            <div className="bg-white p-4 rounded-lg shadow mb-6">
              <h3 className="text-lg font-semibold mb-3">Get Our Newsletter</h3>
              <NewsletterSignup />
              <div className="flex items-center mt-3">
                <div className="mr-2">
                  <Image src="/images/mailbox.svg" alt="Mailbox" width={32} height={32} />
                </div>
                <p className="text-sm text-gray-600">
                  Our most popular coupons sent directly to your inbox!
                </p>
              </div>
              <div className="mt-2 text-xs text-right">
                <Link href="/newsletter/manage" className="text-blue-600 hover:underline">
                  Manage subscription
                </Link>
              </div>
            </div>
            
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