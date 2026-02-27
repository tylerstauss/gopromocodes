'use client'

import { useState } from 'react'

export function DuplicateRemovalTool() {
  const [isLoading, setIsLoading] = useState(false)
  const [selectedDatabase, setSelectedDatabase] = useState('local')

  const handleRemoveDuplicates = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/admin/remove-duplicates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ databaseType: selectedDatabase })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to remove duplicates')
      }

      alert(data.message)
    } catch (error) {
      console.error('Error removing duplicates:', error)
      alert(error instanceof Error ? error.message : 'Failed to remove duplicates')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-4 p-4 border rounded-lg">
      <h2 className="text-lg font-semibold">Remove Duplicate Promo Codes</h2>
      <div className="flex items-center space-x-4">
        <select
          value={selectedDatabase}
          onChange={(e) => setSelectedDatabase(e.target.value)}
          className="px-3 py-2 border rounded-md"
        >
          <option value="local">Local Database</option>
          <option value="production">Production Database</option>
        </select>
        <button
          onClick={handleRemoveDuplicates}
          disabled={isLoading}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 disabled:opacity-50"
        >
          {isLoading ? 'Removing...' : 'Remove Duplicates'}
        </button>
      </div>
      <p className="text-sm text-gray-500">
        This will remove duplicate promo codes based on store ID, code, and title, keeping the most recent version.
      </p>
    </div>
  )
} 