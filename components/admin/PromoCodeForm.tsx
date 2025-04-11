'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { PromoCode, Store, Category, CategoryPromoCode } from '@prisma/client'

interface PromoCodeWithRelations extends PromoCode {
  store: Store
  categories: (CategoryPromoCode & {
    category: Category
  })[]
}

interface PromoCodeFormProps {
  promoCode: PromoCodeWithRelations
}

export default function PromoCodeForm({ promoCode }: PromoCodeFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    title: promoCode.title,
    description: promoCode.description || '',
    code: promoCode.code,
    link: promoCode.link,
    expires: promoCode.expires ? new Date(promoCode.expires).toISOString().split('T')[0] : '',
    freeShipping: promoCode.freeShipping,
    approved: promoCode.approved
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/admin/promocodes/${promoCode.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          expires: formData.expires ? new Date(formData.expires) : null
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to update promo code')
      }

      router.refresh()
      router.push('/admin/promocodes')
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          required
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={3}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
      </div>

      <div>
        <label htmlFor="code" className="block text-sm font-medium text-gray-700">
          Promo Code
        </label>
        <input
          type="text"
          id="code"
          value={formData.code}
          onChange={(e) => setFormData({ ...formData, code: e.target.value })}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          required
        />
      </div>

      <div>
        <label htmlFor="link" className="block text-sm font-medium text-gray-700">
          Link
        </label>
        <input
          type="url"
          id="link"
          value={formData.link}
          onChange={(e) => setFormData({ ...formData, link: e.target.value })}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          required
        />
      </div>

      <div>
        <label htmlFor="expires" className="block text-sm font-medium text-gray-700">
          Expiration Date
        </label>
        <input
          type="date"
          id="expires"
          value={formData.expires}
          onChange={(e) => setFormData({ ...formData, expires: e.target.value })}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="freeShipping"
          checked={formData.freeShipping}
          onChange={(e) => setFormData({ ...formData, freeShipping: e.target.checked })}
          className="h-4 w-4 text-blue-600 border-gray-300 rounded"
        />
        <label htmlFor="freeShipping" className="ml-2 block text-sm text-gray-700">
          Free Shipping
        </label>
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="approved"
          checked={formData.approved}
          onChange={(e) => setFormData({ ...formData, approved: e.target.checked })}
          className="h-4 w-4 text-blue-600 border-gray-300 rounded"
        />
        <label htmlFor="approved" className="ml-2 block text-sm text-gray-700">
          Approved
        </label>
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </form>
  )
} 