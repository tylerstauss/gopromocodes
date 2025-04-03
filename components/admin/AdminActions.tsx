'use client'

import FetchPromoCodesButton from './FetchPromoCodesButton'

interface AdminActionsProps {
  storeId: number
  storeName: string
}

export default function AdminActions({ storeId, storeName }: AdminActionsProps) {
  return (
    <div>
      <FetchPromoCodesButton storeId={storeId} storeName={storeName} />
    </div>
  )
} 