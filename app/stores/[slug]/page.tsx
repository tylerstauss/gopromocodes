import { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import TrackablePromoLink from '@/components/TrackablePromoLink'
import NewsletterSignup from '@/components/NewsletterSignup'
import TopStores from '@/components/TopStores'
import Categories from '@/components/Categories'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { ErrorBoundary } from 'react-error-boundary'
import LoadingSpinner from '@/components/LoadingSpinner'
import ErrorFallback from '@/components/ErrorFallback'
import { Suspense } from 'react'
import StorePageWrapper from '@/components/StorePageWrapper'

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

interface StoreContentProps {
  store: {
    id: number;
    name: string;
    description: string;
    url: string;
    userSubmit: boolean;
    promoCodes: Array<{
      id: number;
      title: string;
      description: string | null;
      code: string;
      link: string;
      freeShipping: boolean;
      storeId: number;
      clickStats: {
        total: number;
        recent: number;
        weighted: number;
      };
    }>;
    blogs: Array<{
      id: number;
      publishDate: string;
      post: string;
    }>;
  };
  topStores: Array<{
    id: number;
    name: string;
    slug: string;
    clickStats?: {
      total: number;
      recent: number;
      weighted: number;
    };
  }>;
  categories: Array<{
    id: number;
    name: string;
    slug: string;
  }>;
  session: any; // Using any for session as it's from next-auth
}

// Validate and sanitize slug
function validateSlug(slug: string | undefined): string {
  if (!slug || typeof slug !== 'string') {
    throw new Error('Invalid store slug');
  }
  return slug.toLowerCase().trim();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const slug = validateSlug(params.slug);
    const store = await prisma.store.findUnique({
      where: { slug }
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
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Error - GoPromoCodes',
      description: 'An error occurred while loading the store page.'
    }
  }
}

async function getStore(slug: string) {
  try {
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
      promoCodes: promoCodesWithClicks.map((code: RawPromoCode) => ({
        ...code,
        clickStats: {
          total: Number(code.total_clicks) || 0,
          recent: Number(code.recent_clicks) || 0,
          weighted: Number(code.weighted_clicks) || 0
        }
      }))
    }
  } catch (error) {
    console.error('Error fetching store:', error);
    throw new Error('Failed to fetch store data');
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

  return storesWithClicks.map((store: RawStore) => ({
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

// Separate component for the main store content
async function StoreContent({ store, topStores, categories, session }: StoreContentProps) {
  const freeShippingCount = store.promoCodes.filter((code: { freeShipping: boolean }) => code.freeShipping).length;

  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Main Content Column */}
      <div className="md:w-2/3">
        {/* Store Info */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
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
        <div className="bg-brand-red text-white py-3 px-4 rounded-t-lg">
          <h2 className="text-xl font-semibold">Current Codes</h2>
        </div>
        <div className="bg-white rounded-b-lg shadow-sm divide-y divide-gray-200">
          {store.promoCodes.length === 0 ? (
            <div className="p-4">
              <p>No active promo codes at the moment. Check back soon!</p>
            </div>
          ) : (
            store.promoCodes.map((code: any) => (
              <div key={code.id} className="bg-white rounded-lg shadow-sm p-6 mb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-brand-red font-trebuchet text-lg">
                      <TrackablePromoLink 
                        href={code.link} 
                        promoCodeId={code.id}
                        storeId={code.storeId}
                        className="text-brand-red hover:underline"
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
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* User Submission Form */}
        {store.userSubmit && (
          <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
            <p>
              Do you have a promotion code for {store.name}?
              Add your {store.name} promo code here for others' benefit.
            </p>
            <p className="mt-4 text-sm text-gray-500">
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
        <div className="bg-red-600 text-white py-3 px-4 rounded-t-lg mt-6">
          <h2 className="text-xl font-semibold">Learn more about how to save the most at {store.name}</h2>
        </div>
        <div className="bg-white rounded-b-lg shadow divide-y divide-gray-200">
          {store.blogs.map((blog: any) => (
            <div key={blog.id} className="p-4">
              <span className="text-sm text-gray-500">{blog.publishDate}</span>
              <div className="mt-2 text-base font-medium text-gray-900">
                <div dangerouslySetInnerHTML={{ __html: blog.post }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sidebar */}
      <div className="md:w-1/3">
        {/* Store Stats */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Store Statistics</h3>
          <table className="w-full">
            <tbody>
              <tr className="border-b border-gray-200">
                <td className="py-2 text-gray-600">Total Promo Codes</td>
                <td className="py-2 font-medium">{store.promoCodes.length}</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-2 text-gray-600">Free Shipping Offers</td>
                <td className="py-2 font-medium">{freeShippingCount}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Newsletter Signup */}
        <NewsletterSignup />

        {/* Top Stores */}
        <TopStores stores={topStores} />

        {/* Categories */}
        <Categories categories={categories} />
      </div>
    </div>
  );
}

// Server component
export default async function StorePage({ params }: Props) {
  try {
    const slug = validateSlug(params.slug);
    const [store, topStores, categories, session] = await Promise.all([
      getStore(slug),
      getTopStores(),
      getCategories(),
      getServerSession(authOptions)
    ]);

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <StorePageWrapper>
          <Suspense fallback={<LoadingSpinner />}>
            <StoreContent 
              store={store} 
              topStores={topStores} 
              categories={categories} 
              session={session} 
            />
          </Suspense>
        </StorePageWrapper>
      </div>
    );
  } catch (error) {
    console.error('Error in StorePage:', error);
    notFound();
  }
} 