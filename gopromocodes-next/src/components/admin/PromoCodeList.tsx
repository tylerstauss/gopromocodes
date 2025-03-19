'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { PromoCode, Store, Category, CategoryPromoCode } from '@prisma/client'

type PromoCodeWithRelations = PromoCode & {
  store: Store
  categories: (CategoryPromoCode & {
    category: Category
  })[]
}

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

  if (promoCodes.length === 0) {
    return (
      <div className="bg-white shadow rounded-lg p-6">
        <p className="text-gray-600">No promo codes pending approval.</p>
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

      {promoCodes.map((promoCode) => (
        <div key={promoCode.id} className="bg-white shadow rounded-lg p-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{promoCode.title}</h2>
              <p className="text-sm text-gray-600 mt-1">Store: {promoCode.store.name}</p>
              <p className="text-sm text-gray-600">
                Categories: {promoCode.categories.map(c => c.category.name).join(', ')}
              </p>
              {promoCode.description && (
                <p className="mt-2 text-gray-700">{promoCode.description}</p>
              )}
              <div className="mt-2 space-y-1 text-sm text-gray-600">
                <p>Code: {promoCode.code}</p>
                <p>Link: <a href={promoCode.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">{promoCode.link}</a></p>
                {promoCode.expires && (
                  <p>Expires: {new Date(promoCode.expires).toLocaleDateString()}</p>
                )}
                <p>Free Shipping: {promoCode.freeShipping ? 'Yes' : 'No'}</p>
                <p>Submitted: {new Date(promoCode.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="flex space-x-3">
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
            </div>
          </div>
        </div>
      ))}
    </div>
  )
} 