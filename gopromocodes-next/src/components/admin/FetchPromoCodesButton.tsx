'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface FetchPromoCodesButtonProps {
  storeId: number
  storeName: string
}

export default function FetchPromoCodesButton({ storeId, storeName }: FetchPromoCodesButtonProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null)

  const fetchPromoCodes = async () => {
    setLoading(true)
    setResult(null)

    try {
      const response = await fetch('/api/admin/promocodes/honey', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          storeId,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch promo codes')
      }

      setResult({
        success: true,
        message: data.message || `Successfully fetched promo codes. Created ${data.count} new codes out of ${data.couponsFound} found.`,
      })

      // Refresh the page to show the new promo codes
      router.refresh()
    } catch (error) {
      setResult({
        success: false,
        message: error instanceof Error ? error.message : 'An unknown error occurred',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mt-2">
      <button
        type="button"
        onClick={fetchPromoCodes}
        disabled={loading}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
      >
        {loading ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Fetching...
          </>
        ) : (
          <>Get {storeName} Promo Codes</>
        )}
      </button>

      {result && (
        <div
          className={`mt-3 p-3 rounded-md ${
            result.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
          }`}
        >
          {result.message}
        </div>
      )}
    </div>
  )
} 