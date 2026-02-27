'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface Store {
  id: number
  name: string
  domain: string | null
}

type Status = 'idle' | 'running' | 'done'

interface Result {
  storeName: string
  codesAdded: number
  skipped: boolean // not found on Honey
  error?: string
}

export default function FetchHoneyBulk({ stores }: { stores: Store[] }) {
  const [status, setStatus] = useState<Status>('idle')
  const [progress, setProgress] = useState(0)
  const [results, setResults] = useState<Result[]>([])
  const router = useRouter()

  // Only stores that have a domain can be looked up on Honey
  const eligible = stores.filter(s => s.domain)

  async function run() {
    setStatus('running')
    setProgress(0)
    setResults([])

    const newResults: Result[] = []

    for (let i = 0; i < eligible.length; i++) {
      const store = eligible[i]
      try {
        const res = await fetch('/api/admin/promocodes/honey', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ storeId: store.id }),
        })
        const data = await res.json()
        newResults.push({
          storeName: store.name,
          codesAdded: data.count ?? 0,
          skipped: res.status === 404 || data.count === 0,
          error: res.ok ? undefined : data.error,
        })
      } catch {
        newResults.push({ storeName: store.name, codesAdded: 0, skipped: false, error: 'Request failed' })
      }
      setProgress(i + 1)
      setResults([...newResults])
    }

    setStatus('done')
    router.refresh()
  }

  if (eligible.length === 0) return null

  const codesFound = results.filter(r => r.codesAdded > 0).length
  const totalCodes = results.reduce((sum, r) => sum + r.codesAdded, 0)
  const errors = results.filter(r => r.error).length

  return (
    <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="text-sm font-semibold text-blue-900">
            Fetch Honey Codes — {eligible.length} stores with descriptions
          </h3>
          <p className="text-xs text-blue-700 mt-0.5">
            Calls Honey API for each store and saves any codes found.
          </p>
        </div>
        {status === 'idle' && (
          <button
            onClick={run}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Start Fetch
          </button>
        )}
        {status === 'running' && (
          <span className="text-sm text-blue-700 font-medium">
            Processing {progress} / {eligible.length}...
          </span>
        )}
      </div>

      {status !== 'idle' && (
        <>
          {/* Progress bar */}
          <div className="w-full bg-blue-200 rounded-full h-2 mb-3">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all"
              style={{ width: `${(progress / eligible.length) * 100}%` }}
            />
          </div>

          {/* Summary */}
          {status === 'done' && (
            <p className="text-sm font-medium text-blue-900 mb-3">
              Done — {codesFound} stores got codes ({totalCodes} total codes added)
              {errors > 0 && `, ${errors} errors`}
            </p>
          )}

          {/* Results list — only show stores that got codes or had errors */}
          <div className="max-h-48 overflow-y-auto space-y-1">
            {results
              .filter(r => r.codesAdded > 0 || r.error)
              .map((r, i) => (
                <div key={i} className="flex justify-between text-xs">
                  <span className="text-gray-700 truncate">{r.storeName}</span>
                  {r.error ? (
                    <span className="text-red-600 ml-2 shrink-0">{r.error}</span>
                  ) : (
                    <span className="text-green-600 ml-2 shrink-0">+{r.codesAdded} codes</span>
                  )}
                </div>
              ))}
          </div>
        </>
      )}
    </div>
  )
}
