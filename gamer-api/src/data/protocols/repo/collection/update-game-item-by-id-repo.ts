import { PurchaseState } from '@/domain/entities'

export interface UpdateGameItemByIdParams {
  id: string
  purchasePrice: number
  purchaseState: PurchaseState
  purchaseDate: Date
  manual?: boolean
  disk?: boolean
  cover?: boolean
  sealed?: boolean
}

export interface UpdateGameItemByIdRepository {
  updateById: (params: UpdateGameItemByIdParams) => Promise<boolean>
}
