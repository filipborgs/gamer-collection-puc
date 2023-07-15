import { PurchaseState } from '@/domain/entities'

export interface UpdatePlatformItemParams {
  id: string
  purchasePrice: number
  purchaseState: PurchaseState
  purchaseDate: Date
  manual?: boolean
  box?: boolean
  sealed?: boolean
  cables?: boolean
  joysticks?: number
}

export interface UpdatePlatformCollectionItem {
  update: (params: UpdatePlatformItemParams) => Promise<boolean | null>
}
