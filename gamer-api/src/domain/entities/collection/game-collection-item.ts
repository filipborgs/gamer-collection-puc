import { CollectionItem } from './collection-item'

export interface GameCollectionItem extends CollectionItem {
  manual?: boolean
  disk?: boolean
  cover?: boolean
  sealed?: boolean
}
