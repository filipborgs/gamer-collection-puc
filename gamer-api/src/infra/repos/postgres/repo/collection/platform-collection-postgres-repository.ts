import { AddPlatformItemToCollectionRepository, AddPlatfromItemParamsRepo } from '@/data/protocols/repo/collection'
import { PlatformCollectionItemTypeOrm } from '@/infra/repos/postgres/entities'
import { PgRepository } from '@/infra/repos/postgres/helpers'
import { Repository } from 'typeorm'

export class PlatformCollectionPostgresRepository extends PgRepository implements AddPlatformItemToCollectionRepository {
  private readonly repo: Repository<PlatformCollectionItemTypeOrm>
  constructor () {
    super()
    this.repo = this.getRepository(PlatformCollectionItemTypeOrm)
  }

  async addPlatform (data: AddPlatfromItemParamsRepo): Promise<void> {
    await this.repo.save({
      ...data,
      createdAt: new Date(),
      updatedAt: new Date()
    })
  }
}
