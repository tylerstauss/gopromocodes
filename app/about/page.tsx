import { Metadata } from 'next'
import Link from 'next/link'
import NewsletterSignup from '@/components/NewsletterSignup'
import { prisma } from '@/lib/prisma'

export const metadata: Metadata = {
  title: 'About GoPromoCodes - Your Source for Savings',
  description: 'Learn about GoPromoCodes.com, your trusted source for promotional codes and deals from over 3,500 stores.',
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

export default async function AboutPage() {
  const { stores, categories } = await getSidebarData()

  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Main Content - Left Column (8/12) */}
          <div className="md:w-8/12">
            {/* Header Section */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">About GoPromoCodes</h1>
              <div className="bg-white rounded-lg shadow p-6 space-y-6">
                <p className="text-gray-700">
                  GoPromoCodes.com is a simple, easy to use online shopping website that offers thousands of promotional codes and deals on over 3,500 unique stores, including big name stores such as Target, AT&T, Macy's, and Travelocity. Codes are rated and ranked by popularity to ensure users get easy access to the best discounts. Our stores feature a wide range of products-- everything from auto insurance to flowers to computer software. Go online today and start saving!
                </p>

                <p className="text-gray-700">
                  We have over 100 different categories of coupons and add dozens of new coupons each day to the site. We are a leading destination for holiday shopping coupons, especially on Black Friday and Cyber Monday. Users can save up to 50% just by using a promo code at GoPromoCodes.com. The average coupon provides a 15-20% discount on your order.
                </p>

                <p className="text-gray-700">
                  Many of our retailer pages contain blog entries written by the owners and caretakers of this site. Reading these blogs can provide you with special insight into the coupons and discounting trends of certain retailers. We also use these blog posts to help bring to light special or unusual sales or discounts that you may want to take advantage of.
                </p>

                <p className="text-gray-700">
                  If you are a retailer with coupons featured on GoPromoCodes.com and you have a question for us, the best way to reach us is through the email address provided via the affiliate network that we are working with. If that doesn't work, please contact us using our online form. If you would like to submit a new coupon for your page, you can do so by searching for your store in the search bar at the top of the website. Then, scroll down your retailer's page and enter the information for your new coupon in the fields provided. GoPromoCodes.com will approve the deal prior to it going live on the site.
                </p>

                <p className="text-gray-700">
                  For all of GoPromoCodes.com users, because we allow users and retailers to submit coupons to our site, we cannot guarantee the accuracy or validity of all of the coupon codes listed at GoPromoCodes.com. We try our best to make sure that only valid codes are listed on each retailer page, but it is a nearly impossible job for 2 people to maintain 3,500 retailer pages and the hundreds of new and expiring coupons each day, so please bear with us. If you notice that a coupon is expired, please let us know. If you have a new coupon that we don't have listed, pretty pretty please share it! Thanks!
                </p>

                <p className="text-gray-700">
                  We have also started writing informative articles on a wide range of subjects, not always about coupons or savings. Mostly just to keep our writing abilities and because some people do find them interesting. If you are here just for saving money, which a majority of people are, then you can ignore these articles. You can view the GoPromoCodes.com <Link href="/sitemap" className="text-blue-600 hover:underline">sitemap</Link> by clicking this link. Also, please be sure to check out our <Link href="/terms" className="text-blue-600 hover:underline">terms and conditions</Link> as well as our <Link href="/privacy" className="text-blue-600 hover:underline">privacy policy</Link>.
                </p>

                <p className="text-gray-700">
                  GoPromoCodes is managed by Tyler and Zoe.
                </p>

                <p className="text-gray-700">
                  Thank you!
                </p>

                <p className="text-gray-700 font-semibold">
                  GoPromoCodes.com
                </p>
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