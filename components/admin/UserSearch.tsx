'use client'

import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useDebounce } from '@/hooks/useDebounce'

interface UserSearchProps {
  initialSearch?: string
}

export default function UserSearch({ initialSearch = '' }: UserSearchProps) {
  const [searchQuery, setSearchQuery] = useState(initialSearch)
  const debouncedSearchQuery = useDebounce(searchQuery, 300)
  const router = useRouter()
  const pathname = usePathname()

  // Update the URL when the debounced search query changes
  useEffect(() => {
    const params = new URLSearchParams()
    if (debouncedSearchQuery) {
      params.set('search', debouncedSearchQuery)
    }
    
    router.push(`${pathname}${debouncedSearchQuery ? `?${params.toString()}` : ''}`)
  }, [debouncedSearchQuery, pathname, router])

  const handleClear = () => {
    setSearchQuery('')
  }

  return (
    <div className="w-full sm:max-w-xs">
      <div className="flex rounded-md shadow-sm">
        <div className="relative flex grow items-stretch focus-within:z-10">
          <input
            type="text"
            name="search"
            id="search"
            className="block w-full rounded-none rounded-l-md border-0 py-1.5 pl-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        {searchQuery && (
          <button
            type="button"
            onClick={handleClear}
            className="relative -ml-px inline-flex items-center gap-x-1.5 rounded-none px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            Clear
          </button>
        )}
      </div>
    </div>
  )
} 