import { CollectionItem } from './collection-item'

export interface PlatfromCollectionItem extends CollectionItem {
  box?: boolean
  sealed?: boolean
  cables?: boolean
  joysticks?: number
}
