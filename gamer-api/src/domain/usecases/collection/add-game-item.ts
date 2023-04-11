import { PurchaseState } from '@/domain/entities'

export interface AddGameItemParams {
  itemId: number
  userId: string
  purchasePrice: number
  purchaseState: PurchaseState
  purchaseDate: Date
}

export interface AddGameCollectionItem {
  add: (params: AddGameItemParams) => Promise<string>
}
