import { CollectionItem } from './collection-item'

export interface PlatfromCollectionItem extends CollectionItem {
  manual?: boolean
  box?: boolean
  sealed?: boolean
  cables?: boolean
  joysticks: number
}
