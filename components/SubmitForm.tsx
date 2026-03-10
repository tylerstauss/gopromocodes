'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Store, Category } from '@prisma/client'
import StoreSearch from '@/components/StoreSearch'

type Props = {
  stores: Store[] // We'll keep this for type compatibility but won't use it directly
  categories: Category[]
}

export default function SubmitForm({ stores, categories }: Props) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [selectedStore, setSelectedStore] = useState<Store | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    if (!selectedStore) {
      setError('Please select a store')
      setIsSubmitting(false)
      return
    }

    const formData = new FormData(e.currentTarget)
    const data = {
      storeId: selectedStore.id,
      categoryId: parseInt(formData.get('categoryId') as string),
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      code: formData.get('code') as string,
      link: formData.get('link') as string,
      expires: formData.get('expires') ? new Date(formData.get('expires') as string) : null,
      freeShipping: formData.get('freeShipping') === 'true'
    }

    try {
      const response = await fetch('/api/promocodes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Failed to submit promo code')
      }

      router.push('/submit/success')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit promo code')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="store-search" className="block text-sm font-medium text-gray-700">
          Store
        </label>
        <div className="mt-1">
          <StoreSearch onStoreSelect={(store) => setSelectedStore(store)} />
          <input 
            type="hidden" 
            name="storeId" 
            value={selectedStore?.id || ''} 
          />
        </div>
      </div>

      <div>
        <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700">
          Category
        </label>
        <select
          id="categoryId"
          name="categoryId"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="code" className="block text-sm font-medium text-gray-700">
          Promo Code
        </label>
        <input
          type="text"
          id="code"
          name="code"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="link" className="block text-sm font-medium text-gray-700">
          Affiliate Link
        </label>
        <input
          type="url"
          id="link"
          name="link"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="expires" className="block text-sm font-medium text-gray-700">
          Expiration Date
        </label>
        <input
          type="date"
          id="expires"
          name="expires"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="freeShipping"
          name="freeShipping"
          value="true"
          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <label htmlFor="freeShipping" className="ml-2 block text-sm text-gray-700">
          Free Shipping
        </label>
      </div>

      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Promo Code'}
        </button>
      </div>
    </form>
  )
} 