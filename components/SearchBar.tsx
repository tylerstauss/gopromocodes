'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useDebounce } from '@/hooks/useDebounce'

type Props = {
  className?: string
  placeholder?: string
}

type SearchResult = {
  type: 'store'
  data: {
    id: string
    name: string
    slug: string
    description: string | null
    _count?: {
      promoCodes: number
    }
  }
  relevance: number
}

export default function SearchBar({ className = '', placeholder = 'Search for stores or promo codes...' }: Props) {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const debouncedQuery = useDebounce(query, 300)

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

  // Search function
  useEffect(() => {
    if (!debouncedQuery || debouncedQuery.length < 2) {
      setResults([])
      return
    }

    setIsLoading(true)
    fetch(`/api/search?q=${encodeURIComponent(debouncedQuery)}`)
      .then(res => res.json())
      .then(data => {
        // Filter to only show store results
        const storeResults = data
          .filter((result: SearchResult) => result.type === 'store')
          .slice(0, 5)
        setResults(storeResults)
        setIsOpen(true)
      })
      .catch(err => {
        console.error('Error searching:', err)
        setResults([])
      })
      .finally(() => setIsLoading(false))
  }, [debouncedQuery])

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
                  key={result.data.id}
                  href={`/stores/${result.data.slug}`}
                  onClick={() => {
                    setIsOpen(false)
                    setQuery(result.data.name)
                  }}
                  className="block px-4 py-3 hover:bg-gray-50"
                >
                  <div className="flex items-center justify-between">
                    <div className="font-medium text-gray-900">{result.data.name}</div>
                    <div className="text-sm text-gray-500">
                      {result.data._count?.promoCodes || 0} offer{result.data._count?.promoCodes === 1 ? '' : 's'}
                    </div>
                  </div>
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