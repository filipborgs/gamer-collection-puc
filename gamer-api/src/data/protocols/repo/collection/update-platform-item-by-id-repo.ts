import { PurchaseState } from '@/domain/entities'

export interface UpdatePlatformItemByIdParams {
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

export interface UpdatePlatformItemByIdRepository {
  updateById: (params: UpdatePlatformItemByIdParams) => Promise<boolean>
}
