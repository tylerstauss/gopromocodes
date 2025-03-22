import { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import Image from 'next/image'
import NewsletterSignup from '@/components/NewsletterSignup'
import TrackablePromoLink from '@/components/TrackablePromoLink'
import { PromoCode, Store, Category } from '@prisma/client'

export const metadata: Metadata = {
  title: 'Newest Promo Codes | GoPromoCodes',
  description: 'Browse our most recently added promo codes and coupon codes from top online retailers.',
}

interface RawPromoCode extends Omit<PromoCode, 'store'> {
  storeName: string;
  storeSlug: string;
  weighted_clicks: number;
  total_clicks: number;
  recent_clicks: number;
}

export default async function NewestCodesPage() {
  const [promoCodes, topStores, categories, stats] = await Promise.all([
    // Get newest promo codes with click stats
    prisma.$queryRaw<RawPromoCode[]>`
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
        ORDER BY p."createdAt" DESC
        LIMIT 200
      )
      SELECT *
      FROM PromoCodeClicks
    `,

    // Get top stores
    prisma.$queryRaw<Array<{
      id: number;
      name: string;
      slug: string;
      clickStats: {
        total: number;
        recent: number;
        weighted: number;
      };
    }>>`
      WITH StoreClicks AS (
        SELECT 
          s.id,
          s.name,
          s.slug,
          COUNT(c.id) as total_clicks,
          COUNT(CASE WHEN c.date >= CURRENT_DATE - INTERVAL '7 days' THEN 1 END) as recent_clicks,
          COALESCE(SUM(
            CASE 
              WHEN c.date >= CURRENT_DATE - INTERVAL '7 days' THEN 2
              WHEN c.date >= CURRENT_DATE - INTERVAL '30 days' THEN 1
              ELSE 0
            END
          ), 0) as weighted_clicks
        FROM "Store" s
        LEFT JOIN "ClickLog" c ON s.id = c."storeId"
        GROUP BY s.id, s.name, s.slug
        ORDER BY weighted_clicks DESC
        LIMIT 10
      )
      SELECT 
        id,
        name,
        slug,
        json_build_object(
          'total', total_clicks,
          'recent', recent_clicks,
          'weighted', weighted_clicks
        ) as "clickStats"
      FROM StoreClicks
    `,

    // Get categories
    prisma.category.findMany({
      orderBy: {
        name: 'asc'
      }
    }),

    // Get stats
    prisma.$queryRaw<Array<{
      total_stores: number;
      total_codes: number;
      total_categories: number;
    }>>`
      SELECT 
        (SELECT COUNT(*) FROM "Store") as total_stores,
        (SELECT COUNT(*) FROM "PromoCode" WHERE approved = true) as total_codes,
        (SELECT COUNT(*) FROM "Category") as total_categories
    `
  ]);

  // Transform the promo codes to include click stats
  const transformedPromoCodes = promoCodes.map((code: RawPromoCode) => ({
    ...code,
    store: {
      id: code.storeId,
      name: code.storeName,
      slug: code.storeSlug
    },
    clickStats: {
      total: Number(code.total_clicks) || 0,
      recent: Number(code.recent_clicks) || 0,
      weighted: Number(code.weighted_clicks) || 0
    }
  }));

  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Main Content - Left Column (8/12) */}
          <div className="md:w-8/12">
            {/* Header Section */}
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                Newest Promo Codes
              </h1>
              <p className="mt-2 text-sm text-gray-500 sm:text-base md:mt-3 md:text-lg">
                Browse our most recently added promo codes and coupon codes from top online retailers.
              </p>
            </div>

            {/* Promo Codes List */}
            <div className="mb-8">
              <div className="bg-red-600 text-white py-3 px-4 rounded-t-lg">
                <h2 className="text-xl font-semibold">Recently Added Promo Codes</h2>
              </div>
              <div className="bg-white rounded-b-lg shadow divide-y divide-gray-200">
                {transformedPromoCodes.map((code) => (
                  <div key={code.id} className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-lg font-medium">
                          <span className="font-semibold">{code.store.name}: </span>
                          <TrackablePromoLink 
                            href={`/promocodes/${code.id}`}
                            promoCodeId={code.id}
                            storeId={code.store.id}
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
                                storeId={code.store.id}
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
  );
} 