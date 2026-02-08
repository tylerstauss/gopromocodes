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
import VoteButtons from '@/components/VoteButtons'

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
  description: string | null;
  url: string;
  userSubmit: boolean;
  metaDescription: string | null;
  weighted_clicks: number;
  total_clicks: number;
  recent_clicks: number;
}

interface StoreContentProps {
  store: {
    id: number;
    name: string;
    description: string | null;
    url: string;
    userSubmit: boolean;
    metaDescription: string | null;
    promoCodes: Array<{
      id: number;
      title: string;
      description: string | null;
      code: string;
      link: string;
      expires: Date | null;
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
      post: string | null;
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
  session: any;
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
              WHEN c.date >= (CURRENT_DATE AT TIME ZONE 'UTC') - INTERVAL '7 days' THEN 2
              WHEN c.date >= (CURRENT_DATE AT TIME ZONE 'UTC') - INTERVAL '30 days' THEN 1
              ELSE 0
            END
          ), 0) as weighted_clicks,
          COUNT(c.id) as total_clicks,
          COUNT(CASE WHEN c.date >= (CURRENT_DATE AT TIME ZONE 'UTC') - INTERVAL '7 days' THEN 1 END) as recent_clicks
        FROM "PromoCode" p
        LEFT JOIN "ClickLog" c ON p.id = c."promoCodeId"
        WHERE 
          p."storeId" = ${store.id}
          AND p.approved = true 
          AND (p.expires IS NULL OR p.expires >= (CURRENT_DATE AT TIME ZONE 'UTC'))
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
      <div className="w-full md:w-2/3 space-y-8">
        {/* Store Info Card */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{store.name} Promo Codes & Discounts</h1>
              <h2 className="text-lg text-gray-600 mt-2">
                There are currently {store.promoCodes.length} {store.name} Promotion Codes and {store.name} Coupons.
              </h2>
            </div>
            {session?.user && (
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
            Store located at:{' '}
            <TrackablePromoLink
              href={store.url}
              promoCodeId={store.id}
              storeId={store.id}
              className="text-blue-600 hover:underline"
            >
              {store.url}
            </TrackablePromoLink>
          </p>
        </div>

        {/* Promo Codes Section */}
        <div>
          <div className="bg-brand-red text-white py-3 px-4 rounded-t-lg">
            <h2 className="text-xl font-semibold">Current Codes</h2>
          </div>
          <div className="bg-white rounded-b-lg shadow-sm divide-y divide-gray-200">
            {store.promoCodes.map((code) => (
              <div key={code.id} className="p-4">
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
                      {session?.user?.isAdmin && (
                        <Link
                          href={`/admin/promocodes/${code.id}`}
                          target="_blank"
                          className="ml-2 text-sm text-blue-600 hover:text-blue-800"
                        >
                          Edit
                        </Link>
                      )}
                    </p>
                    <p className="mt-2 text-gray-600">{code.description}</p>
                    <p className="mt-2 font-medium">
                      <span>Use code: </span>
                      <TrackablePromoLink
                        href={code.link}
                        promoCodeId={code.id}
                        storeId={code.storeId}
                        className="text-blue-600 hover:underline"
                      >
                        {code.code}
                      </TrackablePromoLink>
                    </p>
                    {code.expires && (
                      <p className="mt-2 text-sm text-gray-500">
                        Expires: {new Date(code.expires).toLocaleDateString()}
                      </p>
                    )}
                    <VoteButtons promoCodeId={code.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Blog Section */}
        {store.blogs.length > 0 && (
          <div>
            <div className="bg-red-600 text-white py-3 px-4 rounded-t-lg">
              <h2 className="text-xl font-semibold">
                Learn more about how to save the most at {store.name}
              </h2>
            </div>
            <div className="bg-white rounded-b-lg shadow divide-y divide-gray-200">
              {store.blogs.map((blog) => (
                <div key={blog.id} className="p-4">
                  <span className="text-sm text-gray-500">
                    {new Date(blog.publishDate).toLocaleDateString()}
                  </span>
                  <div 
                    className="mt-2 text-base font-medium text-gray-900"
                    dangerouslySetInnerHTML={{ __html: blog.post || '' }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Sidebar Column */}
      <div className="w-full md:w-1/3 space-y-6">
        {/* Store Stats */}
        <div className="bg-white rounded-lg shadow-sm p-6">
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
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Stores</h3>
          <ul className="space-y-2">
            {topStores.map((store) => (
              <li key={store.id}>
                <Link 
                  href={`/stores/${store.slug}`}
                  className="text-blue-600 hover:underline"
                >
                  {store.name}
                </Link>
                <span className="text-sm text-gray-500 ml-2">
                  ({store.clickStats?.total || 0} clicks)
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Categories */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
          <ul className="space-y-1">
            {categories.map((category) => (
              <li key={category.id} className="bg-white rounded">
                <Link
                  href={`/categories/${category.slug}`}
                  className="block px-3 py-2 text-blue-600 hover:underline font-trebuchet"
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

// Server component
export default async function StorePage({ params }: Props) {
  const session = await getServerSession(authOptions);
  console.log('Session in StorePage:', session);
  console.log('Database URL:', process.env.DATABASE_URL);
  console.log('Production Database URL:', process.env.PROD_DATABASE_URL);

  try {
    const slug = validateSlug(params.slug);
    const [store, topStores, categories] = await Promise.all([
      getStore(slug),
      getTopStores(),
      getCategories()
    ]);

    return (
      <StorePageWrapper>
        <StoreContent 
          store={store} 
          topStores={topStores} 
          categories={categories} 
          session={session} 
        />
      </StorePageWrapper>
    );
  } catch (error) {
    console.error('Error in StorePage:', error);
    throw error;
  }
} 