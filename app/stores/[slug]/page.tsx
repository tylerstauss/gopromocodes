import { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import TrackablePromoLink from '@/components/TrackablePromoLink'
import NewsletterSignup from '@/components/NewsletterSignup'
import styles from '@/styles/store.module.css'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

type Props = {
  params: { slug: string }
}

interface RawPromoCode {
  id: number;
  title: string;
  description: string | null;
  code: string;
  link: string;
  expires: Date | null;
  freeShipping: boolean;
  storeId: number;
  createdAt: Date;
  weighted_clicks: number;
  total_clicks: number;
  recent_clicks: number;
}

interface RawStore {
  id: number;
  name: string;
  slug: string;
  weighted_clicks: number;
  total_clicks: number;
  recent_clicks: number;
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

  return {
    title: `${store.name} Promo Codes - GoPromoCodes`,
    description: store.metaDescription || `Find the latest ${store.name} promo codes and deals.`
  }
}

async function getStore(slug: string) {
  const store = await prisma.store.findUnique({
    where: { slug },
    include: {
      blogs: {
        orderBy: {
          pubDate: 'desc'
        }
      }
    }
  })

  if (!store) {
    notFound()
  }

  // Get promo codes with click stats
  const promoCodesWithClicks = await prisma.$queryRaw<RawPromoCode[]>`
    WITH PromoCodeClicks AS (
      SELECT 
        p.*,
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
      LEFT JOIN "ClickLog" c ON p.id = c."promoCodeId"
      WHERE 
        p."storeId" = ${store.id}
        AND p.approved = true 
        AND (p.expires IS NULL OR p.expires >= CURRENT_DATE)
      GROUP BY p.id
    )
    SELECT *
    FROM PromoCodeClicks
    ORDER BY 
      weighted_clicks DESC,
      CASE WHEN weighted_clicks = 0 THEN "createdAt" END DESC NULLS LAST
  `;

  return {
    ...store,
    promoCodes: promoCodesWithClicks.map(code => ({
      ...code,
      clickStats: {
        total: Number(code.total_clicks) || 0,
        recent: Number(code.recent_clicks) || 0,
        weighted: Number(code.weighted_clicks) || 0
      }
    }))
  }
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

export default async function StorePage({ params }: Props) {
  const [store, topStores, categories, session] = await Promise.all([
    getStore(params.slug),
    getTopStores(),
    getCategories(),
    getServerSession(authOptions)
  ])
  
  const freeShippingCount = store.promoCodes.filter(code => code.freeShipping).length

  return (
    <div className={styles.storeContainer}>
      <div className="flex flex-col md:flex-row gap-8">
        {/* Main Content Column */}
        <div className="md:w-2/3">
          {/* Store Info */}
          <div className={styles.storeInfo}>
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{store.name} Promo Codes & Discounts</h1>
                <h2 className="text-lg text-gray-600 mt-2">There are currently {store.promoCodes.length} {store.name} Promotion Codes and {store.name} Coupons.</h2>
              </div>
              {session?.user?.isAdmin && (
                <Link
                  href={`/admin/stores/${store.id}`}
                  className="inline-flex items-center px-3 py-1.5 border border-indigo-600 text-indigo-600 hover:bg-indigo-50 rounded-md"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Edit Store
                </Link>
              )}
            </div>
            <p className="mt-4 text-gray-600">
              {store.description}
              <br />
              Store located at: <a href={store.url} target="_blank" rel="nofollow" className="text-blue-600 hover:underline">{store.url}</a>
            </p>
          </div>

          {/* Current Codes */}
          <div className={styles.redBanner}>
            <h2>Current Codes</h2>
          </div>
          <div className={styles.couponList}>
            {store.promoCodes.length === 0 ? (
              <div className={styles.singleCoupon}>
                <p>No active promo codes at the moment. Check back soon!</p>
              </div>
            ) : (
              store.promoCodes.map((code) => (
                <div key={code.id} className={styles.singleCoupon}>
                  <div className="flex justify-between items-start">
                    <div>
                      <p className={styles.couponTitle}>
                        <TrackablePromoLink 
                          href={code.link} 
                          promoCodeId={code.id}
                          storeId={code.storeId}
                          className="text-blue-600 hover:underline"
                        >
                          {code.title}
                        </TrackablePromoLink>
                      </p>
                      
                      {code.description && code.description !== 'NULL' && (
                        <p className={styles.couponDescription}>{code.description}</p>
                      )}
                      
                      <p className="mt-2 font-medium">
                        {!code.code || code.code === 'NULL' || code.code === 'n/a' ? (
                          <span>No Code Needed</span>
                        ) : (
                          <span>
                            Use code: <TrackablePromoLink 
                              href={code.link}
                              promoCodeId={code.id}
                              storeId={code.storeId}
                              className="text-blue-600 hover:underline"
                            >
                              {code.code}
                            </TrackablePromoLink>
                          </span>
                        )}
                      </p>
                      
                      {code.expires && (
                        <p className={styles.couponExpiration}>
                          Expires: {new Date(code.expires).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                    <div className={styles.couponStats}>
                      <p>{code.clickStats.total} uses</p>
                      {code.clickStats.recent > 0 && (
                        <p className={styles.recent}>{code.clickStats.recent} in last 7 days</p>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* User Submission Form */}
          {store.userSubmit && (
            <div className={styles.storeInfo}>
              <p>
                Do you have a promotion code for {store.name}?
                Add your {store.name} promo code here for others' benefit.
              </p>
              {/* TODO: Add user submission form */}
              <p className={styles.disclaimer}>
                To signup for {store.name} coupon codes, please enter your email address in the Newsletter box on the right side of the page.
                <br /><br />
                The {store.name} promotional codes listed above are available because GoPromoCodes.com is an affiliate of {store.name}. 
                Tyler Stauss and Zoe Stauss manage this partnership. 
                Meet <a href="https://plus.google.com/u/0/114616733302009885635?rel=author" rel="nofollow">Tyler</a>! 
                Meet <a href="/zoe" rel="nofollow">Zoe!</a>
                <br /><br />
                Since this site allows users to submit content, we cannot guarantee the accuracy of the content.
              </p>
            </div>
          )}

          {/* Store Blogs */}
          <div className={styles.redBanner}>
            <h2>Learn more about how to save the most at {store.name}</h2>
          </div>
          <div className={styles.storeBlogs}>
            {store.blogs.map((blog) => (
              <div key={blog.id} className={styles.blogPost}>
                <span>{blog.publishDate}</span>
                <div dangerouslySetInnerHTML={{ __html: blog.post }} />
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar Column */}
        <div className="md:w-1/3">
          {/* Store Offer Data */}
          <div className={styles.sidebarElement}>
            <h2 className={styles.sidebarHeader}>{store.name} Offer Data</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Valid Offers:</span>
                <span className="font-medium">{store.promoCodes.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Free Shipping Offers:</span>
                <span className="font-medium">{freeShippingCount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Last Offer Added:</span>
                <span className="font-medium">{store.promoCodes[0]?.createdAt.toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          {/* Top Stores */}
          <div className={styles.sidebarElement}>
            <h2 className={styles.sidebarHeader}>Top Stores</h2>
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
          <div className={styles.emailSignup}>
            <h3>Get Our Newsletter</h3>
            <NewsletterSignup />
            <div className="flex items-center mt-3">
              <div className={styles.mailboxImage}>
                <Image src="/images/mailbox.svg" alt="Mailbox" width={32} height={32} />
              </div>
              <p>Our most popular coupons sent directly to your inbox!</p>
            </div>
            <div className="mt-2 text-xs text-right">
              <Link href="/newsletter/manage" className="text-blue-600 hover:underline">
                Manage subscription
              </Link>
            </div>
          </div>
          
          {/* Categories */}
          <div className={styles.sidebarElement}>
            <h2 className={styles.sidebarHeader}>Categories</h2>
            <ul>
              {categories.map((category) => (
                <li key={category.id}>
                  <Link href={`/categories/${category.slug}`} className="text-blue-600 hover:underline">
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
} 