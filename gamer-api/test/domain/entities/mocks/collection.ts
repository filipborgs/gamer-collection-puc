import { type CollectionGameItem, ItemType, PurchaseStatus } from '@/domain/entities'

export const mockGameCollectionItem = (): CollectionGameItem => ({
  id: 'bf0e13d2-0ace-4b54-93b3-5e6ea0538c43',
  itemId: 2,
  type: ItemType.GAME,
  name: 'game',
  purchasePrice: 200,
  purchaseStatus: PurchaseStatus.USED,
  purchaseDate: new Date(),
  createdAt: new Date(),
  updatedAt: new Date(),
  manual: true,
  disk: false,
  cover: false,
  sealed: false
})
