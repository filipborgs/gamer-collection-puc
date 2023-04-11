import { PurchaseState } from '@/domain/entities'
import { type AddGameItemParams } from '@/domain/usecases/collection'

export const mockAddGameItemParams = (): AddGameItemParams => ({
  itemId: 2,
  purchasePrice: 200,
  userId: '80727abe-7d17-4706-8a90-69817cb90e93',
  purchaseState: PurchaseState.USED,
  purchaseDate: new Date()
})
