'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface PromoCodeAdminActionsProps {
  promoCodeId: number;
  url?: string;
}

export default function PromoCodeAdminActions({ promoCodeId, url }: PromoCodeAdminActionsProps) {
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this promo code?')) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/promocodes/${promoCodeId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete promo code');
      }

      router.refresh();
    } catch (error) {
      console.error('Error deleting promo code:', error);
      alert('Failed to delete promo code. Please try again.');
    }
  };

  return (
    <>
      {url && (
        <p className="mt-1 text-sm text-gray-500">
          URL: {url}
        </p>
      )}
      <div className="mt-2 flex space-x-2">
        <Link
          href={`/admin/promocodes/${promoCodeId}`}
          className="inline-flex items-center px-2 py-1 text-sm border border-indigo-600 text-indigo-600 hover:bg-indigo-50 rounded-md"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          Edit
        </Link>
        <button
          onClick={handleDelete}
          className="inline-flex items-center px-2 py-1 text-sm border border-red-600 text-red-600 hover:bg-red-50 rounded-md"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          Delete
        </button>
      </div>
    </>
  );
} 