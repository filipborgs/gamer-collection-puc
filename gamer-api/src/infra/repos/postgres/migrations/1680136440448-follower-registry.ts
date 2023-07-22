import { Table, MigrationInterface, QueryRunner } from 'typeorm'

export class follower_registry1680136440448 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'follower_registry',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true
        },
        {
          name: 'follower_id',
          type: 'uuid',
          isPrimary: true
        },
        {
          name: 'followed_id',
          type: 'uuid',
          isPrimary: true
        },
        {
          name: 'created_at',
          type: 'date'
        }
      ]
    }))
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('follower_registry')
  }
}
