import { Metadata } from 'next'
import { prisma } from '@/lib/prisma'

export const metadata: Metadata = {
  title: 'About Us | GoPromoCodes',
  description: 'Learn about GoPromoCodes - your trusted source for the best online shopping deals and promo codes.',
}

export default async function AboutPage() {
  const stats = await prisma.$transaction([
    prisma.promoCode.count({
      where: {
        approved: true,
        OR: [
          { expires: { gt: new Date() } },
          { expires: null }
        ]
      }
    }),
    prisma.store.count({
      where: { active: true }
    }),
    prisma.promoCode.count({
      where: {
        approved: true,
        code: { not: null },
        OR: [
          { expires: { gt: new Date() } },
          { expires: null }
        ]
      }
    }),
    prisma.promoCode.count({
      where: {
        approved: true,
        freeShipping: true,
        OR: [
          { expires: { gt: new Date() } },
          { expires: null }
        ]
      }
    })
  ])

  const [totalCodes, totalStores, activeCodes, freeShippingCodes] = stats

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
          About GoPromoCodes
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          Your trusted source for the best online shopping deals and promo codes.
        </p>
      </div>

      <div className="mt-16">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">
                Total Active Codes
              </dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">
                {totalCodes}
              </dd>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">
                Active Stores
              </dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">
                {totalStores}
              </dd>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">
                Valid Promo Codes
              </dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">
                {activeCodes}
              </dd>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">
                Free Shipping Offers
              </dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">
                {freeShippingCodes}
              </dd>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16 prose prose-lg mx-auto">
        <h2>Our Mission</h2>
        <p>
          At GoPromoCodes, we're dedicated to helping you save money on your online shopping.
          We curate and verify the best promo codes, deals, and discounts from thousands of
          online retailers to ensure you get the most value for your money.
        </p>

        <h2>What We Offer</h2>
        <ul>
          <li>Verified promo codes and discounts</li>
          <li>Free shipping offers</li>
          <li>Exclusive deals from top retailers</li>
          <li>Daily updates on new promotions</li>
          <li>User-submitted deals and codes</li>
        </ul>

        <h2>How We Work</h2>
        <p>
          Our team works tirelessly to verify and test every promo code before publishing.
          We partner with leading retailers and maintain a strict verification process to
          ensure all codes are valid and working as advertised.
        </p>

        <h2>Community Driven</h2>
        <p>
          We believe in the power of community. Our users can submit their own promo codes
          and deals, helping others save money. Every submission is reviewed by our team
          to maintain quality and reliability.
        </p>
      </div>
    </div>
  )
} 