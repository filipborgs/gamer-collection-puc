import { type CollectionItem } from './collection-item'

export interface CollectionGameItem extends CollectionItem {
  manual?: boolean
  disk?: boolean
  cover?: boolean
  sealed?: boolean
}
