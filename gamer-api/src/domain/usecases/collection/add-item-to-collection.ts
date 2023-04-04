import { type PurchaseStatus } from '@/domain/entities'

export interface AddItemParams {
  itemId: number
  purchasePrice: number
  purchaseStatus: PurchaseStatus
  purchaseDate: Date
}

export interface AddItemToCollection {
  add: (params: AddItemParams) => Promise<string>
}
