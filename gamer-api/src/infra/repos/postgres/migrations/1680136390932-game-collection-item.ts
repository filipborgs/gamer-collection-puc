import { Table, type MigrationInterface, type QueryRunner } from 'typeorm'

export class gameCollectionItem1680136390932 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'game_collection_item',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true
        },
        {
          name: 'item_id',
          type: 'numeric'
        },
        {
          name: 'name',
          type: 'varchar'
        },
        {
          name: 'purchase_price',
          type: 'numeric',
          isNullable: true
        },
        {
          name: 'purchase_status',
          type: 'enum',
          isNullable: true,
          enum: [
            'NEW',
            'USED'
          ]
        },
        {
          name: 'type',
          type: 'enum',
          enum: ['GAME']
        },
        {
          name: 'purchase_date',
          type: 'date',
          isNullable: true
        },
        {
          name: 'created_at',
          type: 'date'
        },
        {
          name: 'updated_at',
          type: 'date'
        },
        {
          name: 'manual',
          type: 'boolean',
          isNullable: true
        },
        {
          name: 'disk',
          type: 'boolean',
          isNullable: true
        },
        {
          name: 'cover',
          type: 'boolean',
          isNullable: true
        },
        {
          name: 'sealed',
          type: 'boolean',
          isNullable: true
        }
      ]
    }))
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('game_collection_item')
  }
}