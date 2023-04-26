import { PurchaseState } from '@/domain/entities'

export interface AddGameItemParams {
  itemId: number
  userId: string
  purchasePrice: number
  purchaseState: PurchaseState
  purchaseDate: Date
  manual?: boolean
  disk?: boolean
  cover?: boolean
  sealed?: boolean
  platformId: number
}

export interface AddGameCollectionItem {
  add: (params: AddGameItemParams) => Promise<string>
}
