"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [storeCount, setStoreCount] = useState<number>(0);

  useEffect(() => {
    // Fetch store count from API
    const fetchStoreCount = async () => {
      try {
        const response = await fetch('/api/stores/count');
        const data = await response.json();
        setStoreCount(data.count);
      } catch (error) {
        console.error('Error fetching store count:', error);
        // Set a fallback number if fetching fails
        setStoreCount(1000);
      }
    };

    fetchStoreCount();
  }, []);

  return (
    <footer className="bg-brand-gray text-gray-800 pt-8 mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-6">
          {/* About Us Column */}
          <div className="side-bar-element">
            <h4 className="font-bold text-lg mb-4 text-brand-red">About Us</h4>
            <p className="mb-4">
              GoPromoCodes.com is a simple, easy to use online shopping website that offers thousands of promotional codes and deals for {storeCount} unique stores, including big name stores such as Target, AT&T, Macy's, and Travelocity.
            </p>
            <p className="mb-4">
              If you are a retailer with a promotional code or deal you would like to list on GoPromoCodes, contact us now or submit a deal!
            </p>
            <ul className="grid grid-cols-2 gap-1">
              <li>
                <Link href="/about" className="text-brand-blue hover:text-brand-red hover:underline">
                  About
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-brand-blue hover:text-brand-red hover:underline">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-brand-blue hover:text-brand-red hover:underline">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-brand-blue hover:text-brand-red hover:underline">
                  Terms & Privacy
                </Link>
              </li>
              <li>
                <Link href="/articles" className="text-brand-blue hover:text-brand-red hover:underline">
                  Articles
                </Link>
              </li>
            </ul>
          </div>

          {/* About Online Promo Codes Column */}
          <div className="side-bar-element">
            <h4 className="font-bold text-lg mb-4 text-brand-red">About Online Promo Codes</h4>
            <p>
              According to Compete.com, more than 57% of consumers who used a coupon code during their last online purchase would not have completed the order without the discount. Ninety One percent of coupon redeemers will shop at a retailer again after being offered a coupon. Users of promo codes spent over 75% more on their last online order compared to those who didn't use an online promotion code.
            </p>
          </div>
        </div>

        {/* Bottom Footer with Copyright and Social */}
        <div className="blue-banner py-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <p className="uppercase text-sm text-white">Copyright © {currentYear} GoPromoCodes.com</p>
            </div>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="https://www.facebook.com/gopromocodes" target="_blank" rel="noopener noreferrer" className="text-white hover:text-brand-highlight">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-facebook" viewBox="0 0 16 16">
                  <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                </svg>
              </a>
              <a href="https://twitter.com/gopromocodes" target="_blank" rel="noopener noreferrer" className="text-white hover:text-brand-highlight">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-twitter" viewBox="0 0 16 16">
                  <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 