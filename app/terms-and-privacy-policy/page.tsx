import { Metadata } from 'next'
import Link from 'next/link'
import NewsletterSignup from '@/components/NewsletterSignup'
import { prisma } from '@/lib/prisma'

export const metadata: Metadata = {
  title: 'Terms of Service and Privacy Policy - GoPromoCodes',
  description: 'Read the Terms of Service and Privacy Policy for GoPromoCodes.com',
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

export default async function TermsPage() {
  const { stores, categories } = await getSidebarData()

  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Main Content - Left Column (8/12) */}
          <div className="md:w-8/12">
            {/* Header Section */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Terms of Service and Privacy Policy</h1>
              <div className="bg-white rounded-lg shadow p-6 space-y-8">
                {/* Terms of Service Section */}
                <section className="space-y-6">
                  <h2 className="text-2xl font-semibold text-gray-900">Terms of Service</h2>
                  
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-gray-900">1. Terms</h3>
                    <p className="text-gray-700">
                      By accessing this web site, you are agreeing to be bound by these web site Terms and Conditions of Use, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws. If you do not agree with any of these terms, you are prohibited from using or accessing this site. The materials contained in this web site are protected by applicable copyright and trade mark law.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-gray-900">2. Use License</h3>
                    <p className="text-gray-700">
                      Permission is granted to temporarily download one copy of the materials (information or software) on GoPromoCodes.com's web site for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-gray-700">
                      <li>modify or copy the materials</li>
                      <li>use the materials for any commercial purpose, or for any public display (commercial or non-commercial)</li>
                      <li>attempt to decompile or reverse engineer any software contained on GoPromoCodes.com's web site</li>
                      <li>remove any copyright or other proprietary notations from the materials</li>
                      <li>transfer the materials to another person or "mirror" the materials on any other server</li>
                    </ul>
                    <p className="text-gray-700">
                      This license shall automatically terminate if you violate any of these restrictions and may be terminated by GoPromoCodes.com at any time. Upon terminating your viewing of these materials or upon the termination of this license, you must destroy any downloaded materials in your possession whether in electronic or printed format.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-gray-900">3. Disclaimer</h3>
                    <p className="text-gray-700">
                      The materials on GoPromoCodes.com's web site are provided "as is". GoPromoCodes.com makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties, including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights. Further, GoPromoCodes.com does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its Internet web site or otherwise relating to such materials or on any sites linked to this site.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-gray-900">4. Limitations</h3>
                    <p className="text-gray-700">
                      In no event shall GoPromoCodes.com or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption,) arising out of the use or inability to use the materials on GoPromoCodes.com's Internet site, even if GoPromoCodes.com or a GoPromoCodes.com authorized representative has been notified orally or in writing of the possibility of such damage. Because some jurisdictions do not allow limitations on implied warranties, or limitations of liability for consequential or incidental damages, these limitations may not apply to you.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-gray-900">5. Revisions and Errata</h3>
                    <p className="text-gray-700">
                      The materials appearing on GoPromoCodes.com's web site could include technical, typographical, or photographic errors. GoPromoCodes.com does not warrant that any of the materials on its web site are accurate, complete, or current. GoPromoCodes.com may make changes to the materials contained on its web site at any time without notice. GoPromoCodes.com does not, however, make any commitment to update the materials.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-gray-900">6. Links</h3>
                    <p className="text-gray-700">
                      GoPromoCodes.com has not reviewed all of the sites linked to its Internet web site and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by GoPromoCodes.com of the site. Use of any such linked web site is at the user's own risk.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-gray-900">7. Site Terms of Use Modifications</h3>
                    <p className="text-gray-700">
                      GoPromoCodes.com may revise these terms of use for its web site at any time without notice. By using this web site you are agreeing to be bound by the then current version of these Terms and Conditions of Use.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-gray-900">8. Governing Law</h3>
                    <p className="text-gray-700">
                      Any claim relating to GoPromoCodes.com's web site shall be governed by the laws of the State of California without regard to its conflict of law provisions. General Terms and Conditions applicable to Use of a Web Site.
                    </p>
                  </div>
                </section>

                {/* Privacy Policy Section */}
                <section className="space-y-6">
                  <h2 className="text-2xl font-semibold text-gray-900">Privacy Policy</h2>
                  <p className="text-gray-700">
                    Your privacy is very important to us. Accordingly, we have developed this Policy in order for you to understand how we collect, use, communicate and disclose and make use of personal information. The following outlines our privacy policy.
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li>Before or at the time of collecting personal information, we will identify the purposes for which information is being collected.</li>
                    <li>We will collect and use of personal information solely with the objective of fulfilling those purposes specified by us and for other compatible purposes, unless we obtain the consent of the individual concerned or as required by law.</li>
                    <li>We will only retain personal information as long as necessary for the fulfillment of those purposes.</li>
                    <li>We will collect personal information by lawful and fair means and, where appropriate, with the knowledge or consent of the individual concerned.</li>
                    <li>Personal data should be relevant to the purposes for which it is to be used, and, to the extent necessary for those purposes, should be accurate, complete, and up-to-date.</li>
                    <li>We will protect personal information by reasonable security safeguards against loss or theft, as well as unauthorized access, disclosure, copying, use or modification.</li>
                    <li>We will make readily available to customers information about our policies and practices relating to the management of personal information.</li>
                  </ul>
                  <p className="text-gray-700">
                    We are currently working with a third party website to collect non-personable information. They use this information across a network of sites to display advertising that is more relevant to your interests. Information collected could be your IP address, browser, recent search history. We are committed to conducting our business in accordance with these principles in order to ensure that the confidentiality of personal information is protected and maintained.
                  </p>
                </section>
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