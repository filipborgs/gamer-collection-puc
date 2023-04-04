import { PurchaseStatus, type ItemType } from '../../../../domain/entities'
import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity('game_collection_item')
export class CollectionGameItemTypeOrm {
  @PrimaryColumn()
    id: string

  @Column({ name: 'item_id' })
    itemId: number

  @Column()
    type: ItemType

  @Column()
    name: string

  @Column({ name: 'purchase_price' })
    purchasePrice?: number

  @Column({ name: 'purchase_status' })
    purchaseStatus?: PurchaseStatus

  @Column({ name: 'purchase_date' })
    purchaseDate?: Date

  @Column({ name: 'created_at' })
    createdAt: Date

  @Column({ name: 'updated_at' })
    updatedAt: Date

  @Column()
    manual?: boolean

  @Column()
    disk?: boolean

  @Column()
    cover?: boolean

  @Column()
    sealed?: boolean
}
