import { CollectionItem } from './collection-item'

export interface GameCollectionItem extends CollectionItem {
  disk?: boolean
  cover?: boolean
  sealed?: boolean
  platform: {
    id: number
    name: string
  }
}
