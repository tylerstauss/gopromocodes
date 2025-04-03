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
    <div className="space-y-6">
      {/* Newsletter Signup */}
      <div className="mb-6 side-bar-element p-4">
        <h2 className="sidebar-header text-lg font-bold mb-3">Newsletter</h2>
        <p className="text-sm mb-3">Subscribe to get the latest promo codes and deals delivered to your inbox.</p>
        <NewsletterSignup />
      </div>
      
      {/* Popular Stores */}
      {popularStores.length > 0 && (
        <div className="side-bar-element p-4">
          <h2 className="sidebar-header text-lg font-bold mb-3">Popular Stores</h2>
          <ul className="space-y-3">
            {popularStores.map(store => (
              <li key={store.id} className="border-b border-gray-100 pb-2 last:border-0">
                <Link 
                  href={`/stores/${store.slug}`}
                  className="block hover:text-brand-blue"
                >
                  <span className="font-medium">{store.name}</span>
                  {store.clickStats && (
                    <div className="text-sm text-gray-600 mt-1">
                      <span>{store.clickStats.total} uses</span>
                      {store.clickStats.recent > 0 && (
                        <span className="ml-2 text-green-600">
                          ({store.clickStats.recent} recent)
                        </span>
                      )}
                    </div>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {/* Popular Categories */}
      {popularCategories.length > 0 && (
        <div className="side-bar-element p-4">
          <h2 className="sidebar-header text-lg font-bold mb-2">Popular Categories</h2>
          <ul className="space-y-2">
            {popularCategories.map(category => (
              <li key={category.id}>
                <Link 
                  href={`/categories/${category.slug}`}
                  className="hover:text-brand-blue"
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {/* How to use promo codes */}
      <div className="side-bar-element">
        <h2 className="sidebar-header text-lg font-bold mb-2">How to Use Promo Codes</h2>
        <p>
          Just click on the code to copy it, then paste it during checkout at the retailer's website.
        </p>
      </div>
      
      {/* About Us */}
      <div className="side-bar-element">
        <h2 className="sidebar-header text-lg font-bold mb-2">About Us</h2>
        <p>
          GoPromoCodes.com offers the latest promotional codes and deals from thousands of online retailers, helping you save money on your online purchases.
        </p>
        <p className="mt-2">
          <Link 
            href="/about" 
            className="text-brand-blue hover:text-brand-red hover:underline"
          >
            Learn more
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Sidebar; 