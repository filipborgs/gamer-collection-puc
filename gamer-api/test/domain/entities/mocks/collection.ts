import { GameCollectionItem, ItemType, PlatfromCollectionItem, PurchaseState } from '@/domain/entities'

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

export const mockPlatformCollectionItem = (): PlatfromCollectionItem => ({
  id: 'bf0e13d2-0ace-4b54-93b3-5e6ea0538c43',
  itemId: 1,
  type: ItemType.PLATFROM,
  userId: '80727abe-7d17-4706-8a90-69817cb90e93',
  name: 'platform',
  purchasePrice: 250,
  purchaseState: PurchaseState.NEW,
  purchaseDate: new Date(),
  createdAt: new Date(),
  updatedAt: new Date(),
  manual: true,
  cables: false,
  box: false,
  sealed: false,
  joysticks: 4
})
