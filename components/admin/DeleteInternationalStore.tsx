'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function DeleteInternationalStore({
  storeId,
  storeName,
}: {
  storeId: number
  storeName: string
}) {
  const [confirming, setConfirming] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleDelete() {
    setLoading(true)
    try {
      const res = await fetch(`/api/admin/stores/international/${storeId}`, {
        method: 'DELETE',
      })
      if (!res.ok) {
        const data = await res.json()
        alert(`Error: ${data.error}`)
        return
      }
      router.refresh()
    } catch {
      alert('Failed to delete store')
    } finally {
      setLoading(false)
      setConfirming(false)
    }
  }

  if (confirming) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-700">Delete "{storeName}"?</span>
        <button
          onClick={handleDelete}
          disabled={loading}
          className="inline-flex items-center px-2 py-1 text-xs font-medium text-white bg-red-600 rounded hover:bg-red-700 disabled:opacity-50"
        >
          {loading ? 'Deleting...' : 'Confirm'}
        </button>
        <button
          onClick={() => setConfirming(false)}
          disabled={loading}
          className="inline-flex items-center px-2 py-1 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50"
        >
          Cancel
        </button>
      </div>
    )
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-white bg-red-600 rounded hover:bg-red-700"
    >
      Delete
    </button>
  )
}
