'use client';

import Link from 'next/link';
import NewsletterSignup from './NewsletterSignup';

interface SidebarProps {
  popularStores?: Array<{
    id: number;
    name: string;
    slug: string;
    clickStats?: {
      total: number;
      recent: number;
      weighted: number;
    };
  }>;
  popularCategories?: Array<{
    id: number;
    name: string;
    slug: string;
  }>;
}

const Sidebar = ({ popularStores = [], popularCategories = [] }: SidebarProps) => {
  return (
    <div className="md:w-4/12">
      {/* Top Stores */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h2 className="text-lg font-semibold mb-3">Top Stores</h2>
        <div className="space-y-2">
          {popularStores.map((store) => (
            <div key={store.id} className="flex justify-between items-center">
              <Link 
                href={`/stores/${store.slug}`}
                className="text-blue-600 hover:underline truncate flex-1"
              >
                {store.name}
              </Link>
              {store.clickStats && (
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
              )}
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
            <img src="/images/mailbox.svg" alt="Mailbox" width={32} height={32} />
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
          {popularCategories.map((category) => (
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
  );
};

export default Sidebar; 