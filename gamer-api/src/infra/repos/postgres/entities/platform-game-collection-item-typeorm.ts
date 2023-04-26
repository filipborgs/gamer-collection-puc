import { Column } from 'typeorm'

export class PlatformGameCollectionItem {
  @Column({ name: '_id' })
    id: number

  @Column({ name: '_name' })
    name: string
}
