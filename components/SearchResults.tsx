'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import PageLayout from '@/components/PageLayout'

interface SearchResult {
  type: 'store' | 'promocode'
  data: any
  relevance: number
}

interface Props {
  query: string
  popularStores: Array<{
    id: number
    name: string
    slug: string
  }>
  popularCategories: Array<{
    id: number
    name: string
    slug: string
  }>
}

export default function SearchResults({ query, popularStores, popularCategories }: Props) {
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) return
      
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
        const data = await response.json()
        setResults(data)
      } catch (error) {
        console.error('Error fetching search results:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchResults()
  }, [query])

  if (loading) {
    return (
      <PageLayout popularStores={popularStores} popularCategories={popularCategories}>
        <div className="text-center">Loading search results...</div>
      </PageLayout>
    )
  }

  return (
    <PageLayout popularStores={popularStores} popularCategories={popularCategories}>
      <h1 className="text-2xl font-bold mb-6">
        Search Results for "{query}"
      </h1>

      {results.length === 0 ? (
        <div className="text-center text-gray-500">
          No results found for "{query}"
        </div>
      ) : (
        <div className="space-y-6">
          {/* Store Results */}
          {results
            .filter(result => result.type === 'store')
            .map((result, index) => (
              <div key={index} className="bg-white rounded-lg shadow p-4">
                <Link href={`/stores/${result.data.slug}`}>
                  <h2 className="text-xl font-semibold text-blue-600 hover:text-blue-800">
                    {result.data.name}
                  </h2>
                </Link>
                <p className="text-gray-600 mt-2">{result.data.description}</p>
              </div>
            ))}

          {/* Promocode Results */}
          {results
            .filter(result => result.type === 'promocode')
            .map((result, index) => (
              <div key={index} className="bg-white rounded-lg shadow p-4">
                <Link href={`/stores/${result.data.storeSlug}`}>
                  <h2 className="text-xl font-semibold text-blue-600 hover:text-blue-800">
                    {result.data.title}
                  </h2>
                </Link>
                <p className="text-gray-600 mt-2">{result.data.description}</p>
                <div className="mt-2">
                  <span className="bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded">
                    {result.data.code}
                  </span>
                </div>
              </div>
            ))}
        </div>
      )}
    </PageLayout>
  )
} 