import { type ItemType, type PurchaseStatus } from '@/domain/entities'

export interface AddGameItemParamsRepo {
  id: string
  itemId: number
  type: ItemType
  name: string
  purchasePrice?: number
  purchaseStatus?: PurchaseStatus
  purchaseDate?: Date
  manual?: boolean
  disk?: boolean
  cover?: boolean
  sealed?: boolean
}

export interface AddGameItemToCollectionRepository {
  addGameItem: (data: AddGameItemParamsRepo) => Promise<void>
}
