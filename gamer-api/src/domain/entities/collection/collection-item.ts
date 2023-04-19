export interface CollectionItem {
  id: string
  itemId: number
  userId: string
  type: ItemType
  name: string
  purchasePrice?: number
  purchaseState?: PurchaseState
  manual?: boolean
  purchaseDate?: Date
  createdAt: Date
  updatedAt: Date
}

export enum ItemType {
  GAME = 'GAME',
  PLATFROM = 'PLATFORM'
}

export enum PurchaseState {
  NEW = 'NEW',
  USED = 'USED'
}
