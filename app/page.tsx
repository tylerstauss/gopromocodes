import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import Image from 'next/image'
import NewsletterSignup from '@/components/NewsletterSignup'
import TrackablePromoLink from '@/components/TrackablePromoLink'
import { PromoCode, Store, Category } from '@prisma/client'

interface RawPromoCode extends Omit<PromoCode, 'store'> {
  storeName: string;
  storeSlug: string;
  weighted_clicks: number;
  total_clicks: number;
  recent_clicks: number;
}

interface RawStore extends Omit<Store, 'clickStats'> {
  weighted_clicks: number;
  total_clicks: number;
  recent_clicks: number;
  clickStats: {
    total: number;
    recent: number;
    weighted: number;
  };
}

async function getPromoCodes() {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  // Get promo codes with click stats
  const promoCodesWithClicks = await prisma.$queryRaw<RawPromoCode[]>`
    WITH PromoCodeClicks AS (
      SELECT 
        p.*,
        s.name as "storeName",
        s.slug as "storeSlug",
        COALESCE(SUM(
          CASE 
            WHEN c.date >= CURRENT_DATE - INTERVAL '7 days' THEN 2  -- Recent clicks count double
            WHEN c.date >= CURRENT_DATE - INTERVAL '30 days' THEN 1  -- Older clicks count once
            ELSE 0
          END
        ), 0) as weighted_clicks,
        COUNT(c.id) as total_clicks,
        COUNT(CASE WHEN c.date >= CURRENT_DATE - INTERVAL '7 days' THEN 1 END) as recent_clicks
      FROM "PromoCode" p
      JOIN "Store" s ON p."storeId" = s.id
      LEFT JOIN "ClickLog" c ON p.id = c."promoCodeId"
      WHERE 
        p.approved = true 
        AND (p.expires IS NULL OR p.expires >= CURRENT_DATE)
      GROUP BY p.id, s.name, s.slug
    )
    SELECT *
    FROM PromoCodeClicks
    ORDER BY 
      weighted_clicks DESC,
      CASE WHEN weighted_clicks = 0 THEN "createdAt" END DESC NULLS LAST
    LIMIT 50
  `;

  // Transform the raw query results to match the expected format
  return promoCodesWithClicks.map((code: RawPromoCode) => ({
    ...code,
    store: {
      name: code.storeName,
      slug: code.storeSlug
    },
    clickStats: {
      total: Number(code.total_clicks) || 0,
      recent: Number(code.recent_clicks) || 0,
      weighted: Number(code.weighted_clicks) || 0
    }
  }));
}

async function getTopStores() {
  const storesWithClicks = await prisma.$queryRaw<RawStore[]>`
    WITH StoreClicks AS (
      SELECT 
        s.id,
        s.name,
        s.slug,
        s."createdAt",
        COALESCE(SUM(
          CASE 
            WHEN c.date >= CURRENT_DATE - INTERVAL '7 days' THEN 2  -- Recent clicks count double
            WHEN c.date >= CURRENT_DATE - INTERVAL '30 days' THEN 1  -- Older clicks count once
            ELSE 0
          END
        ), 0) as weighted_clicks,
        COUNT(c.id) as total_clicks,
        COUNT(CASE WHEN c.date >= CURRENT_DATE - INTERVAL '7 days' THEN 1 END) as recent_clicks
      FROM "Store" s
      LEFT JOIN "PromoCode" p ON s.id = p."storeId"
      LEFT JOIN "ClickLog" c ON p.id = c."promoCodeId"
      WHERE s.active = true
      GROUP BY s.id, s.name, s.slug, s."createdAt"
    )
    SELECT *
    FROM StoreClicks
    ORDER BY 
      weighted_clicks DESC,
      CASE WHEN weighted_clicks = 0 THEN "createdAt" END DESC NULLS LAST,
      name ASC
    LIMIT 10
  `;

  return storesWithClicks.map(store => ({
    ...store,
    clickStats: {
      total: Number(store.total_clicks) || 0,
      recent: Number(store.recent_clicks) || 0,
      weighted: Number(store.weighted_clicks) || 0
    }
  }));
}

async function getCategories() {
  return await prisma.category.findMany({
    orderBy: {
      name: 'asc'
    }
  })
}

async function getStats() {
  const totalStores = await prisma.store.count({
    where: { active: true }
  })
  
  const totalPromoCodes = await prisma.promoCode.count({
    where: { approved: true }
  })
  
  const totalValidOffers = await prisma.promoCode.count({
    where: { 
      approved: true,
      expires: {
        gte: new Date()
      }
    }
  })
  
  const totalFreeShipping = await prisma.promoCode.count({
    where: { 
      approved: true,
      freeShipping: true,
      expires: {
        gte: new Date()
      }
    }
  })
  
  return {
    totalStores,
    totalPromoCodes,
    totalValidOffers,
    totalFreeShipping
  }
}

export default async function Home() {
  const [promoCodes, topStores, categories, stats] = await Promise.all([
    getPromoCodes(),
    getTopStores(),
    getCategories(),
    getStats()
  ])

  return (
    <div className="bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Main Content - Left Column (8/12) */}
          <div className="md:w-8/12">
            {/* Stats Banner */}
            <div className="mb-8">
              <div className="bg-red-600 text-white py-3 px-4 rounded-t-lg">
                <h2 className="text-xl font-semibold">GoPromoCodes Discounts by The Numbers</h2>
              </div>
              <div className="bg-white p-4 rounded-b-lg shadow">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-700">Total Stores: <span className="font-bold">{stats.totalStores.toLocaleString()}</span></p>
                  </div>
                  <div>
                    <p className="text-gray-700">Total Valid Offers: <span className="font-bold">{stats.totalValidOffers.toLocaleString()}</span></p>
                  </div>
                  <div>
                    <p className="text-gray-700">Total Promo Codes: <span className="font-bold">{stats.totalPromoCodes.toLocaleString()}</span></p>
                  </div>
                  <div>
                    <p className="text-gray-700">Free Shipping Offers: <span className="font-bold">{stats.totalFreeShipping.toLocaleString()}</span></p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Promo Codes List */}
            <div className="mb-8">
              <div className="bg-red-600 text-white py-3 px-4 rounded-t-lg">
                <h1 className="text-xl font-semibold">Popular Promo Codes and Coupon Codes</h1>
              </div>
              <div className="bg-white rounded-b-lg shadow divide-y divide-gray-200">
                {promoCodes.map((code) => (
                  <div key={code.id} className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-lg font-medium">
                          <span className="font-semibold">{code.store.name}: </span>
                          <TrackablePromoLink 
                            href={`/promocodes/${code.id}`} 
                            promoCodeId={code.id}
                            storeId={code.storeId}
                            className="text-blue-600 hover:underline"
                          >
                            {code.title}
                          </TrackablePromoLink>
                        </p>
                        
                        {code.description && code.description !== 'NULL' && (
                          <p className="mt-2 text-gray-600">{code.description}</p>
                        )}
                        
                        <p className="mt-2 text-sm text-gray-500">
                          See more <Link href={`/stores/${code.store.slug}`} className="text-blue-600 hover:underline">
                            {code.store.name} promo codes
                          </Link>
                        </p>
                        
                        <p className="mt-2 font-medium">
                          {!code.code || code.code === 'NULL' || code.code === 'n/a' ? (
                            <span>No Code Needed</span>
                          ) : (
                            <span>
                              Use code: <TrackablePromoLink 
                                href={`/promocodes/${code.id}`}
                                promoCodeId={code.id}
                                storeId={code.storeId}
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
          </div>
          
          {/* Sidebar - Right Column (4/12) */}
          <div className="md:w-4/12">
            {/* Top Stores */}
            <div className="bg-white p-4 rounded-lg shadow mb-6">
              <h2 className="text-lg font-semibold mb-3">Top Stores</h2>
              <div className="space-y-2">
                {topStores.map((store) => (
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
                          {store.clickStats.total} uses
                        </p>
                        {store.clickStats.recent > 0 && (
                          <p className="text-green-600 text-xs">
                            {store.clickStats.recent} recent
                          </p>
                        )}
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
      </main>
    </div>
  )
} 