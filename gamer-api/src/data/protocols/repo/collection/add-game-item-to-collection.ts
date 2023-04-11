import { ItemType, PurchaseState } from '@/domain/entities'

export interface AddGameItemParamsRepo {
  id: string
  itemId: number
  userId: string
  type: ItemType
  name: string
  purchasePrice?: number
  purchaseState?: PurchaseState
  purchaseDate?: Date
  manual?: boolean
  disk?: boolean
  cover?: boolean
  sealed?: boolean
}

export interface AddGameItemToCollectionRepository {
  addGameItem: (data: AddGameItemParamsRepo) => Promise<void>
}
