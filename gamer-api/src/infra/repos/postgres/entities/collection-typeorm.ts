import { ViewColumn, ViewEntity } from 'typeorm'

@ViewEntity({
  expression:
   `SELECT gci.platform_id   AS id,
      gci.user_id,
      gci.platform_name AS name,
      Count(*)          AS count
    FROM   game_collection_item gci
    GROUP  BY gci.platform_id,
     gci.user_id,
     gci.platform_name
`
})
export class CollectionTypeOrm {
  @ViewColumn()
    id: number

  @ViewColumn()
    count: number

  @ViewColumn()
    name: string

  @ViewColumn({ name: 'user_id' })
    userId: string
}
