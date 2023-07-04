import { PurchaseState } from '@/domain/entities'

export interface UpdateGameItemParams {
  id: string
  userId: string
  purchasePrice: number
  purchaseState: PurchaseState
  purchaseDate: Date
  manual?: boolean
  disk?: boolean
  cover?: boolean
  sealed?: boolean
}

export interface UpdateGameCollectionItem {
  update: (params: UpdateGameItemParams) => Promise<boolean | null>
}
