'use client';

import { useState } from 'react';
import Link from 'next/link';
import VoteButtons from './VoteButtons';

interface PromoCodeProps {
  id: number;
  title: string;
  code: string;
  description: string;
  expires: string | null;
  store: {
    id: number;
    name: string;
    slug: string;
  };
  link: string;
  isAdmin?: boolean;
}

const PromoCode = ({ id, title, code, description, expires, store, link, isAdmin }: PromoCodeProps) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const logClick = async () => {
    try {
      await fetch('/api/clicks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          promoCodeId: id,
          storeId: store.id,
        }),
      });
    } catch (error) {
      console.error('Error logging click:', error);
    }
  };

  const formatExpirationDate = (dateString: string | null) => {
    if (!dateString) return 'No expiration';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="single-coupon mb-4">
      <p className="coupon-title">
        <span className="coupon-store-name">
          <Link href={`/stores/${store.slug}`} className="hover:underline">
            {store.name}
          </Link>
        </span>: {title}
        {isAdmin && (
          <Link
            href={`/admin/promocodes/${id}`}
            target="_blank"
            className="ml-2 text-sm text-blue-600 hover:text-blue-800"
          >
            Edit
          </Link>
        )}
      </p>
      
      <div className="coupon-expiration">
        Expires: <span>{formatExpirationDate(expires)}</span>
      </div>
      
      <p className="text-gray-700 text-sm mb-2">{description}</p>
      
      <div className="flex flex-col sm:flex-row gap-2 mt-4">
        <div className="flex-1">
          <div className="relative">
            <input
              type="text"
              readOnly
              value={code}
              className="w-full px-3 py-2 border border-gray-300 bg-gray-100 rounded"
            />
            <button
              onClick={() => {
                copyToClipboard();
                logClick();
              }}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 px-2 py-1 bg-brand-blue text-white text-xs rounded hover:bg-brand-blue-dark"
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>
        
        <div>
          <a
            href={`/api/redirect?id=${id}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={logClick}
            className="block w-full text-center px-4 py-2 bg-brand-red text-white rounded hover:bg-red-700 transition-colors"
          >
            Use Code
          </a>
        </div>
      </div>
      
      <VoteButtons promoCodeId={id} />

      <div className="mt-4 text-right">
        <Link
          href={`/stores/${store.slug}`}
          className="text-brand-blue text-sm hover:text-brand-red hover:underline"
        >
          See more {store.name} codes
        </Link>
      </div>
    </div>
  );
};

export default PromoCode; 