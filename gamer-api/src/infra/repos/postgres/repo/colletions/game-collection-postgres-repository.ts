import { type AddGameItemParamsRepo, type AddGameItemToCollectionRepository } from '@/data/protocols/repo/collections'
import { type Repository } from 'typeorm'
import { CollectionGameItemTypeOrm } from '../../entities/collection-game-item-typeorm'
import { PgRepository } from '../../helpers'

export class GameCollectionPostgresRepository extends PgRepository implements AddGameItemToCollectionRepository {
  private readonly repo: Repository<CollectionGameItemTypeOrm>
  constructor () {
    super()
    this.repo = this.getRepository(CollectionGameItemTypeOrm)
  }

  async addGameItem (data: AddGameItemParamsRepo): Promise<void> {
    await this.repo.save({
      ...data,
      createdAt: new Date(),
      updatedAt: new Date()
    })
  }
}
