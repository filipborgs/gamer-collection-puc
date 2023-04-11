import { PurchaseState, type ItemType } from '../../../../domain/entities'
import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity('game_collection_item')
export class GameCollectionItemTypeOrm {
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
    disk?: boolean

  @Column({ default: null, nullable: true })
    cover?: boolean

  @Column({ default: null, nullable: true })
    sealed?: boolean
}
