'use client'

import { useState, useEffect, useRef } from 'react'
import { Store } from '@prisma/client'

type Props = {
  onStoreSelect: (store: Store) => void
  initialSelectedStore?: Store | null
}

export default function StoreSearch({ onStoreSelect, initialSelectedStore }: Props) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Store[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [selectedStore, setSelectedStore] = useState<Store | null>(initialSelectedStore || null)
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
    if (!query) {
      setResults([])
      return
    }

    const timer = setTimeout(() => {
      setIsLoading(true)
      fetch(`/api/stores/search?q=${encodeURIComponent(query)}`)
        .then(res => res.json())
        .then(data => {
          setResults(data)
          setIsOpen(true)
        })
        .catch(err => console.error('Error searching stores:', err))
        .finally(() => setIsLoading(false))
    }, 300)

    return () => clearTimeout(timer)
  }, [query])

  const handleSelect = (store: Store) => {
    setSelectedStore(store)
    setQuery('')
    setIsOpen(false)
    onStoreSelect(store)
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="flex items-center space-x-2">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Search for a store..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => query && setIsOpen(true)}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {isLoading && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <div className="animate-spin h-5 w-5 border-2 border-blue-500 rounded-full border-t-transparent"></div>
            </div>
          )}
        </div>
      </div>

      {selectedStore && (
        <div className="mt-2 flex items-center justify-between p-2 bg-blue-50 border border-blue-200 rounded-md">
          <span className="text-sm font-medium text-blue-800">{selectedStore.name}</span>
          <button
            type="button"
            onClick={() => {
              setSelectedStore(null)
              onStoreSelect(null as any) // Inform parent component store was deselected
            }}
            className="text-blue-500 hover:text-blue-700 focus:outline-none"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      {isOpen && results.length > 0 && (
        <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md max-h-60 overflow-auto border border-gray-200">
          <ul className="py-1">
            {results.map((store) => (
              <li
                key={store.id}
                onClick={() => handleSelect(store)}
                className="px-3 py-2 cursor-pointer hover:bg-gray-100"
              >
                <div className="flex flex-col">
                  <span className="font-medium">{store.name}</span>
                  {store.domain && (
                    <span className="text-xs text-gray-500">{store.domain}</span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {isOpen && query && results.length === 0 && !isLoading && (
        <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md border border-gray-200 p-3 text-sm text-gray-500">
          No stores found matching "{query}"
        </div>
      )}
    </div>
  )
} 