'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { PromoCode, Store, Category, CategoryPromoCode } from '@prisma/client'
import Link from 'next/link'

type PromoCodeWithRelations = PromoCode & {
  store: Store
  categories: (CategoryPromoCode & {
    category: Category
  })[]
}

type Status = 'approved' | 'pending' | 'rejected'

type Props = {
  promoCodes: PromoCodeWithRelations[]
}

export default function PromoCodeList({ promoCodes }: Props) {
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState<Record<number, boolean>>({})
  const [error, setError] = useState<string | null>(null)

  async function handleAction(promoCodeId: number, action: 'approve' | 'reject') {
    setIsProcessing(prev => ({ ...prev, [promoCodeId]: true }))
    setError(null)

    try {
      const response = await fetch(`/api/promocodes/${promoCodeId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || `Failed to ${action} promo code`)
      }

      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : `Failed to ${action} promo code`)
    } finally {
      setIsProcessing(prev => ({ ...prev, [promoCodeId]: false }))
    }
  }

  // Format date for display
  const formatDate = (date: Date | null | undefined) => {
    if (!date) return 'N/A'
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  // Helper to determine status
  const getStatus = (promoCode: PromoCodeWithRelations): Status => {
    if (promoCode.approved) return 'approved'
    // For now, just returning pending for all non-approved codes
    // We might need to update schema to add a 'rejected' field if needed
    return 'pending'
  }

  if (promoCodes.length === 0) {
    return (
      <div className="bg-white shadow rounded-lg p-6">
        <p className="text-gray-600">No promo codes found matching your criteria.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {promoCodes.map((promoCode) => {
        const status = getStatus(promoCode)
        
        return (
          <div key={promoCode.id} className="bg-white shadow rounded-lg p-6">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  <Link href={`/admin/promocodes/${promoCode.id}`} className="hover:text-indigo-600">
                    {promoCode.title}
                  </Link>
                </h2>
                <div className="flex items-center mt-1 space-x-2">
                  <p className="text-sm text-gray-600">Store: {promoCode.store.name}</p>
                  <span className="text-gray-400">•</span>
                  <p className="text-sm">
                    <span 
                      className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                        status === 'approved' 
                          ? 'bg-green-100 text-green-800' 
                          : status === 'rejected'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </span>
                  </p>
                </div>
                <p className="text-sm text-gray-600">
                  Categories: {promoCode.categories.map(c => c.category.name).join(', ')}
                </p>
                {promoCode.description && (
                  <p className="mt-2 text-gray-700">{promoCode.description}</p>
                )}
                <div className="mt-2 space-y-1 text-sm text-gray-600">
                  <p>Code: <span className="font-mono bg-gray-100 px-1">{promoCode.code}</span></p>
                  <p>Link: <a href={promoCode.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">{promoCode.link}</a></p>
                  <p>Expires: {promoCode.expires ? formatDate(promoCode.expires) : 'No expiration'}</p>
                  <p>Free Shipping: {promoCode.freeShipping ? 'Yes' : 'No'}</p>
                  <p>Added: {formatDate(promoCode.createdAt)}</p>
                  <p>User Submitted: {promoCode.userSubmit ? 'Yes' : 'No'}</p>
                </div>
              </div>
              <div className="flex space-x-3">
                {!promoCode.approved && (
                  <>
                    <button
                      onClick={() => handleAction(promoCode.id, 'approve')}
                      disabled={isProcessing[promoCode.id]}
                      className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
                    >
                      {isProcessing[promoCode.id] ? 'Processing...' : 'Approve'}
                    </button>
                    <button
                      onClick={() => handleAction(promoCode.id, 'reject')}
                      disabled={isProcessing[promoCode.id]}
                      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
                    >
                      {isProcessing[promoCode.id] ? 'Processing...' : 'Reject'}
                    </button>
                  </>
                )}
                <Link
                  href={`/admin/promocodes/${promoCode.id}`}
                  className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Edit
                </Link>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
} 