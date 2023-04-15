import { ItemType, PurchaseState } from '@/domain/entities'

export interface AddPlatfromItemParamsRepo {
  id: string
  itemId: number
  userId: string
  type: ItemType
  name: string
  purchasePrice?: number
  purchaseState?: PurchaseState
  purchaseDate?: Date
  manual?: boolean
  box?: boolean
  sealed?: boolean
  cables?: boolean
  joysticks?: number
}

export interface AddPlatformItemToCollectionRepository {
  addPlatform: (data: AddPlatfromItemParamsRepo) => Promise<void>
}
