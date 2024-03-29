import { AddPlatformItemToCollectionRepository, AddPlatfromItemParamsRepo, LoadPlatformCollectionItemsRepository, LoadPlatformCollectionItemsRepositoryParams, RemoveCollectionItemByIdRepository, UpdatePlatformItemByIdParams, UpdatePlatformItemByIdRepository } from '@/data/protocols/repo/collection'
import { PlatfromCollectionItem } from '@/domain/entities'
import { PlatformCollectionItemTypeOrm } from '@/infra/repos/postgres/entities'
import { PgRepository } from '@/infra/repos/postgres/helpers'
import { Repository } from 'typeorm'

export class PlatformCollectionPostgresRepository extends PgRepository implements AddPlatformItemToCollectionRepository,
  LoadPlatformCollectionItemsRepository,
  RemoveCollectionItemByIdRepository,
  UpdatePlatformItemByIdRepository {
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

  async updateById (params: UpdatePlatformItemByIdParams): Promise<boolean> {
    const { id, ...data } = params
    const { affected } = await this.repo.update(id, data)
    return !!affected
  }

  async loadByUser ({ userId }: LoadPlatformCollectionItemsRepositoryParams): Promise<PlatfromCollectionItem[]> {
    return await this.repo.find({
      where: {
        userId
      }
    })
  }

  async removeById (id: string): Promise<boolean> {
    const result = await this.repo.delete(id)
    return !!result.affected
  }
}
