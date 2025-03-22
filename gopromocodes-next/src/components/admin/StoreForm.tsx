'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Store, Category } from '@prisma/client'

interface StoreFormProps {
  store: Store | null
  categories: { id: number; name: string }[]
}

export default function StoreForm({ store, categories }: StoreFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const [formData, setFormData] = useState({
    name: store?.name || '',
    url: store?.url || '',
    description: store?.description || '',
    active: store?.active ?? true,
    categoryId: store?.categoryId || undefined,
    slug: store?.slug || '',
    topStore: store?.topStore ?? false,
    networkId: store?.networkId || '',
    network: store?.network || '',
    domain: store?.domain || '',
    metaTitle: store?.metaTitle || '',
    metaDescription: store?.metaDescription || '',
    metaKeywords: store?.metaKeywords || '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    
    if (type === 'checkbox') {
      const target = e.target as HTMLInputElement
      setFormData({
        ...formData,
        [name]: target.checked,
      })
    } else if (name === 'categoryId') {
      setFormData({
        ...formData,
        [name]: value === '' ? undefined : parseInt(value, 10),
      })
    } else {
      setFormData({
        ...formData,
        [name]: value,
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      const url = store
        ? `/api/admin/stores/${store.id}`
        : '/api/admin/stores'
      
      const method = store ? 'PATCH' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Something went wrong')
      }

      router.push('/admin/stores')
      router.refresh()
    } catch (error) {
      console.error('Error submitting store:', error)
      setError(error instanceof Error ? error.message : 'Failed to save store')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 divide-y divide-gray-200">
      <div className="space-y-8 divide-y divide-gray-200">
        <div>
          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900">Store Information</h3>
            <p className="mt-1 text-sm text-gray-500">
              Basic information about the store.
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name *
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="slug" className="block text-sm font-medium text-gray-700">
                Slug *
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="slug"
                  id="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  required
                  pattern="[a-z0-9-]+"
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              <p className="mt-2 text-sm text-gray-500">
                URL-friendly identifier (lowercase, no spaces, use hyphens)
              </p>
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="url" className="block text-sm font-medium text-gray-700">
                Website URL *
              </label>
              <div className="mt-1">
                <input
                  type="url"
                  name="url"
                  id="url"
                  value={formData.url}
                  onChange={handleChange}
                  required
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="domain" className="block text-sm font-medium text-gray-700">
                Domain
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="domain"
                  id="domain"
                  value={formData.domain}
                  onChange={handleChange}
                  placeholder="example.com"
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <div className="mt-1">
                <select
                  id="categoryId"
                  name="categoryId"
                  value={formData.categoryId || ''}
                  onChange={handleChange}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                >
                  <option value="">-- Select Category --</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="sm:col-span-6">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <div className="mt-1">
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  value={formData.description || ''}
                  onChange={handleChange}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="network" className="block text-sm font-medium text-gray-700">
                Affiliate Network
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="network"
                  id="network"
                  value={formData.network || ''}
                  onChange={handleChange}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="networkId" className="block text-sm font-medium text-gray-700">
                Network ID
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="networkId"
                  id="networkId"
                  value={formData.networkId || ''}
                  onChange={handleChange}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="sm:col-span-6">
              <div className="flex items-center">
                <input
                  id="active"
                  name="active"
                  type="checkbox"
                  checked={formData.active}
                  onChange={handleChange}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="active" className="ml-2 block text-sm text-gray-900">
                  Active
                </label>
              </div>
            </div>

            <div className="sm:col-span-6">
              <div className="flex items-center">
                <input
                  id="topStore"
                  name="topStore"
                  type="checkbox"
                  checked={formData.topStore}
                  onChange={handleChange}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="topStore" className="ml-2 block text-sm text-gray-900">
                  Feature as Top Store
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8">
          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900">SEO Information</h3>
            <p className="mt-1 text-sm text-gray-500">
              Search engine optimization details.
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-6">
              <label htmlFor="metaTitle" className="block text-sm font-medium text-gray-700">
                Meta Title
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="metaTitle"
                  id="metaTitle"
                  value={formData.metaTitle || ''}
                  onChange={handleChange}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="sm:col-span-6">
              <label htmlFor="metaDescription" className="block text-sm font-medium text-gray-700">
                Meta Description
              </label>
              <div className="mt-1">
                <textarea
                  id="metaDescription"
                  name="metaDescription"
                  rows={3}
                  value={formData.metaDescription || ''}
                  onChange={handleChange}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="sm:col-span-6">
              <label htmlFor="metaKeywords" className="block text-sm font-medium text-gray-700">
                Meta Keywords
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="metaKeywords"
                  id="metaKeywords"
                  value={formData.metaKeywords || ''}
                  onChange={handleChange}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Comma-separated keywords
              </p>
            </div>
          </div>
        </div>
      </div>

      {error && (
        <div className="my-4 p-4 bg-red-50 text-red-700 rounded-md">
          {error}
        </div>
      )}

      <div className="pt-5">
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => router.push('/admin/stores')}
            className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {isSubmitting ? 'Saving...' : (store ? 'Update Store' : 'Create Store')}
          </button>
        </div>
      </div>
    </form>
  )
} 