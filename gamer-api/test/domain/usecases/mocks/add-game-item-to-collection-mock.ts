import { PurchaseStatus } from '@/domain/entities'
import { type AddItemParams } from '@/domain/usecases/collection'

export const mockAddGameItemParams = (): AddItemParams => ({
  itemId: 2,
  purchasePrice: 200,
  userId: '80727abe-7d17-4706-8a90-69817cb90e93',
  purchaseStatus: PurchaseStatus.USED,
  purchaseDate: new Date()
})
