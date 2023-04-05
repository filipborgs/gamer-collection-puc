import { PurchaseStatus } from '@/domain/entities'
import { type AddItemParams } from '@/domain/usecases/collection'

export const mockAddGameItemParams = (): AddItemParams => ({
  itemId: 2,
  purchasePrice: 200,
  purchaseStatus: PurchaseStatus.USED,
  purchaseDate: new Date()
})
