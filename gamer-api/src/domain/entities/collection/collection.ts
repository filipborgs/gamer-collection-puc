import { ItemType } from './collection-item'

export interface Collection {
  id: number
  name: string
  type?: ItemType
  count: number
}
