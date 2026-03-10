'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function DeleteAllEmptyStores({ count }: { count: number }) {
  const [step, setStep] = useState<'idle' | 'confirm' | 'deleting' | 'done'>('idle')
  const [deleted, setDeleted] = useState(0)
  const router = useRouter()

  async function handleDelete() {
    setStep('deleting')
    try {
      const res = await fetch('/api/admin/stores/international/cleanup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dryRun: false }),
      })
      const text = await res.text()
      let data: any
      try {
        data = JSON.parse(text)
      } catch {
        alert(`Server error (status ${res.status}). Check Vercel logs for details.`)
        setStep('idle')
        return
      }
      if (!res.ok) {
        alert(`Error: ${data.error}`)
        setStep('idle')
        return
      }
      setDeleted(data.deleted)
      setStep('done')
      router.refresh()
    } catch (error) {
      alert(`Deletion failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
      setStep('idle')
    }
  }

  if (count === 0) return null

  if (step === 'done') {
    return (
      <span className="text-sm text-green-600 font-medium">
        ✓ Deleted {deleted} stores
      </span>
    )
  }

  if (step === 'confirm') {
    return (
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-700">
          Delete all <strong>{count}</strong> stores with 0 codes and no description?
        </span>
        <button
          onClick={handleDelete}
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
        >
          Yes, delete all
        </button>
        <button
          onClick={() => setStep('idle')}
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Cancel
        </button>
      </div>
    )
  }

  if (step === 'deleting') {
    return (
      <span className="text-sm text-gray-500">Deleting {count} stores...</span>
    )
  }

  return (
    <button
      onClick={() => setStep('confirm')}
      className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
    >
      Delete all empty ({count})
    </button>
  )
}
