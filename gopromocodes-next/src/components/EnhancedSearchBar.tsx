'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Store, PromoCode } from '@prisma/client'

type Props = {
  className?: string
  placeholder?: string
}

type SearchResult = {
  type: 'store' | 'promoCode'
  id: number
  name: string
  slug?: string
  title?: string
  storeId?: number
  storeName?: string
  storeSlug?: string
  code?: string
}

export default function EnhancedSearchBar({ className = '', placeholder = 'Search for stores or promo codes...' }: Props) {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Debounce search function
  useEffect(() => {
    if (!query || query.length < 2) {
      setResults([])
      return
    }

    const timer = setTimeout(() => {
      setIsLoading(true)
      fetch(`/api/stores/search?q=${encodeURIComponent(query)}`)
        .then(res => res.json())
        .then(data => {
          // Transform store data into our standard search result format
          const storeResults = data.map((store: any) => ({
            type: 'store' as const,
            id: store.id,
            name: store.name,
            slug: store.slug
          }))
          setResults(storeResults)
          setIsOpen(true)
        })
        .catch(err => console.error('Error searching:', err))
        .finally(() => setIsLoading(false))
    }, 300)

    return () => clearTimeout(timer)
  }, [query])

  const handleSearch = () => {
    if (!query.trim()) return
    
    router.push(`/search?q=${encodeURIComponent(query.trim())}&type=all`)
    setIsOpen(false)
  }
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => query.length >= 2 && setIsOpen(true)}
          placeholder={placeholder}
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 pr-10 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <button
          type="button"
          onClick={handleSearch}
          className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-gray-700"
        >
          {isLoading ? (
            <div className="animate-spin h-5 w-5 border-2 border-blue-500 rounded-full border-t-transparent"></div>
          ) : (
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          )}
        </button>
      </div>

      {isOpen && results.length > 0 && (
        <div className="absolute z-20 mt-1 w-full bg-white shadow-lg rounded-md overflow-hidden border border-gray-200">
          <div className="max-h-60 overflow-auto">
            <div className="divide-y divide-gray-100">
              {results.map((result) => (
                <Link
                  key={`${result.type}-${result.id}`}
                  href={
                    result.type === 'store' 
                      ? `/stores/${result.slug}` 
                      : `/stores/${result.storeSlug}#code-${result.id}`
                  }
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 hover:bg-gray-50"
                >
                  {result.type === 'store' ? (
                    <div>
                      <span className="font-medium text-gray-900">{result.name}</span>
                      <span className="ml-2 text-xs px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full">Store</span>
                    </div>
                  ) : (
                    <div>
                      <span className="font-medium text-gray-900">{result.title}</span>
                      <span className="ml-2 text-xs px-2 py-0.5 bg-green-100 text-green-800 rounded-full">Code</span>
                      <div className="text-sm text-gray-500 mt-1">
                        <span>Store: {result.storeName}</span>
                        {result.code && <span className="ml-2">Code: {result.code}</span>}
                      </div>
                    </div>
                  )}
                </Link>
              ))}
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-2 border-t border-gray-100">
            <Link
              href={`/search?q=${encodeURIComponent(query)}&type=all`}
              onClick={() => setIsOpen(false)}
              className="block text-center text-sm text-blue-600 hover:text-blue-800"
            >
              View all results
            </Link>
          </div>
        </div>
      )}
    </div>
  )
} 