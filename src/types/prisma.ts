import { Category, Store, PromoCode, CategoryPromoCode } from '@prisma/client'

export type CategoryWithRelations = Category & {
  stores: (Store & {
    _count: {
      promoCodes: number
    }
  })[]
  promoCodes: (CategoryPromoCode & {
    promoCode: PromoCode & {
      store: Store
    }
  })[]
}

export type StoreWithRelations = Store & {
  promoCodes: PromoCode[]
  _count: {
    promoCodes: number
  }
} 