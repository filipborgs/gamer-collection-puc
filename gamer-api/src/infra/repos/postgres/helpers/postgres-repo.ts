
import { PostgresHelper } from '@/infra/repos/postgres/helpers'

import { ObjectType, Repository } from 'typeorm'

export abstract class PgRepository {
  constructor (
    private readonly connection: PostgresHelper = PostgresHelper.getInstance()
  ) {}

  getRepository<Entity> (entity: ObjectType<Entity>): Repository<Entity> {
    return this.connection.getRepository(entity)
  }
}
