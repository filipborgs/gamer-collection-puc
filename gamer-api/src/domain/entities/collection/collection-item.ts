export interface CollectionItem {
  id: string
  itemId: number
  userId: string
  type: ItemType
  name: string
  purchasePrice?: number
  purchaseStatus?: PurchaseStatus
  purchaseDate?: Date
  createdAt: Date
  updatedAt: Date
}

export enum ItemType {
  GAME = 'GAME',
  PLATFROM = 'PLATFORM'
}

export enum PurchaseStatus {
  NEW = 'NEW',
  USED = 'USED'
}
