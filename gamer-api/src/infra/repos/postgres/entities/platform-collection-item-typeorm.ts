import { PurchaseState, ItemType } from '../../../../domain/entities'
import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity('platfrom_collection_item')
export class PlatformCollectionItemTypeOrm {
  @PrimaryColumn()
    id: string

  @Column({ name: 'item_id' })
    itemId: number

  @Column({ name: 'user_id' })
    userId: string

  @Column()
    type: ItemType

  @Column()
    name: string

  @Column({ name: 'purchase_price', default: null, nullable: true })
    purchasePrice?: number

  @Column({ name: 'purchase_state', default: null, nullable: true })
    purchaseState?: PurchaseState

  @Column({ name: 'purchase_date', default: null, nullable: true })
    purchaseDate?: Date

  @Column({ name: 'created_at' })
    createdAt: Date

  @Column({ name: 'updated_at' })
    updatedAt: Date

  @Column({ default: null, nullable: true })
    manual?: boolean

  @Column({ default: null, nullable: true })
    box?: boolean

  @Column({ default: null, nullable: true })
    cables?: boolean

  @Column({ default: null, nullable: true })
    sealed?: boolean

  @Column({ default: null, nullable: true })
    joysticks?: number
}
