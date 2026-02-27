'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import FetchHoneyBulk from './FetchHoneyBulk'

interface Store {
  id: number
  name: string
  slug: string
  domain: string | null
  description: string | null
  promoCodeCount: number
}

interface Props {
  stores: Store[]
  title: string
}

function StoresTable({ stores, title }: Props) {
  const [selected, setSelected] = useState<Set<number>>(new Set())
  const [deleting, setDeleting] = useState(false)
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const allChecked = stores.length > 0 && selected.size === stores.length
  const someChecked = selected.size > 0 && selected.size < stores.length

  function toggleAll() {
    if (allChecked) {
      setSelected(new Set())
    } else {
      setSelected(new Set(stores.map(s => s.id)))
    }
  }

  function toggleOne(id: number) {
    setSelected(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  async function deleteSelected() {
    if (selected.size === 0) return
    setDeleting(true)
    try {
      await Promise.all(
        Array.from(selected).map(id =>
          fetch(`/api/admin/stores/international/${id}`, { method: 'DELETE' })
        )
      )
      setSelected(new Set())
      startTransition(() => router.refresh())
    } catch {
      alert('One or more deletions failed. Please refresh and try again.')
    } finally {
      setDeleting(false)
    }
  }

  async function deleteSingle(id: number, name: string) {
    if (!confirm(`Delete "${name}"?`)) return
    try {
      const res = await fetch(`/api/admin/stores/international/${id}`, { method: 'DELETE' })
      if (!res.ok) {
        const data = await res.json()
        alert(`Error: ${data.error}`)
        return
      }
      startTransition(() => router.refresh())
    } catch {
      alert('Failed to delete store')
    }
  }

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold text-gray-900">{title} ({stores.length})</h2>
        {selected.size > 0 && (
          <button
            onClick={deleteSelected}
            disabled={deleting}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 disabled:opacity-50"
          >
            {deleting ? 'Deleting...' : `Delete ${selected.size} selected`}
          </button>
        )}
      </div>

      <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3.5 pl-4 pr-3 sm:pl-6 w-8">
                <input
                  type="checkbox"
                  checked={allChecked}
                  ref={el => { if (el) el.indeterminate = someChecked }}
                  onChange={toggleAll}
                  className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                />
              </th>
              <th className="py-3.5 pr-3 text-left text-sm font-semibold text-gray-900">Store</th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Domain</th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Description</th>
              <th className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">Codes</th>
              <th className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900 pr-6">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {stores.map((store) => (
              <tr
                key={store.id}
                className={`hover:bg-gray-50 ${selected.has(store.id) ? 'bg-red-50' : ''}`}
              >
                <td className="py-4 pl-4 pr-3 sm:pl-6">
                  <input
                    type="checkbox"
                    checked={selected.has(store.id)}
                    onChange={() => toggleOne(store.id)}
                    className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                  />
                </td>
                <td className="py-4 pr-3 text-sm font-medium text-gray-900">
                  <Link href={`/stores/${store.slug}`} target="_blank" className="text-blue-600 hover:underline">
                    {store.name}
                  </Link>
                </td>
                <td className="px-3 py-4 text-sm text-gray-500">
                  {store.domain || <span className="text-red-400 italic">none</span>}
                </td>
                <td className="px-3 py-4 text-sm text-gray-500 max-w-xs">
                  {store.description
                    ? <span className="line-clamp-2">{store.description}</span>
                    : <span className="text-red-400 italic">no description</span>
                  }
                </td>
                <td className="px-3 py-4 text-sm text-center text-gray-500">
                  {store.promoCodeCount}
                </td>
                <td className="px-3 py-4 text-right pr-6">
                  <button
                    onClick={() => deleteSingle(store.id, store.name)}
                    className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-white bg-red-600 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {stores.length === 0 && (
              <tr>
                <td colSpan={6} className="py-8 text-center text-sm text-gray-500">
                  No stores.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default function InternationalStoresTable({
  withoutCodes,
  withCodes,
}: {
  withoutCodes: Store[]
  withCodes: Store[]
}) {
  const storesWithDescriptions = withoutCodes.filter(s => s.description)

  return (
    <>
      <FetchHoneyBulk stores={storesWithDescriptions} />
      <StoresTable stores={withoutCodes} title="0 Promo Codes" />
      {withCodes.length > 0 && (
        <StoresTable stores={withCodes} title="Has Promo Codes" />
      )}
    </>
  )
}
