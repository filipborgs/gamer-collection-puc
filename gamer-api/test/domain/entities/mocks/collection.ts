import { type GameCollectionItem, ItemType, PurchaseState } from '@/domain/entities'

export const mockGameCollectionItem = (): GameCollectionItem => ({
  id: 'bf0e13d2-0ace-4b54-93b3-5e6ea0538c43',
  itemId: 2,
  type: ItemType.GAME,
  userId: '80727abe-7d17-4706-8a90-69817cb90e93',
  name: 'game',
  purchasePrice: 200,
  purchaseState: PurchaseState.USED,
  purchaseDate: new Date(),
  createdAt: new Date(),
  updatedAt: new Date(),
  manual: true,
  disk: false,
  cover: false,
  sealed: false
})
