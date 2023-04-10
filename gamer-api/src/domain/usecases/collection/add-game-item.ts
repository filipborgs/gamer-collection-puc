import { type PurchaseStatus } from '@/domain/entities'

export interface AddGameItemParams {
  itemId: number
  userId: string
  purchasePrice: number
  purchaseStatus: PurchaseStatus
  purchaseDate: Date
}

export interface AddGameCollectionItem {
  add: (params: AddGameItemParams) => Promise<string>
}
