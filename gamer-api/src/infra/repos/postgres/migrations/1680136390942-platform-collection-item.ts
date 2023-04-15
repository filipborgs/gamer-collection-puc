import { Table, MigrationInterface, QueryRunner } from 'typeorm'

export class platformCollectionItem1680136390942 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'platfrom_collection_item',
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
          name: 'user_id',
          type: 'varchar'
        },
        {
          name: 'purchase_price',
          type: 'numeric',
          isNullable: true
        },
        {
          name: 'purchase_state',
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
          name: 'box',
          type: 'boolean',
          isNullable: true
        },
        {
          name: 'cables',
          type: 'boolean',
          isNullable: true
        },
        {
          name: 'sealed',
          type: 'boolean',
          isNullable: true
        },
        {
          name: 'joysticks',
          type: 'numeric',
          isNullable: true
        }
      ]
    }))
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('platfrom_collection_item')
  }
}
