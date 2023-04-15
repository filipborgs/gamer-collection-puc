import { PurchaseState } from '@/domain/entities'

export interface AddPlatformItemParams {
  itemId: number
  userId: string
  purchasePrice: number
  purchaseState: PurchaseState
  purchaseDate: Date
  manual?: boolean
  box?: boolean
  sealed?: boolean
  cables?: boolean
  joysticks?: number
}

export interface AddPlatformItem {
  add: (params: AddPlatformItemParams) => Promise<string>
}
