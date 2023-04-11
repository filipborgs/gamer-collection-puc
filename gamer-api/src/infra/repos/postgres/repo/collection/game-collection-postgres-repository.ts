import { AddGameItemParamsRepo, AddGameItemToCollectionRepository } from '@/data/protocols/repo/collections'
import { Repository } from 'typeorm'
import { GameCollectionItemTypeOrm } from '../../entities/collection-game-item-typeorm'
import { PgRepository } from '../../helpers'

export class GameCollectionPostgresRepository extends PgRepository implements AddGameItemToCollectionRepository {
  private readonly repo: Repository<GameCollectionItemTypeOrm>
  constructor () {
    super()
    this.repo = this.getRepository(GameCollectionItemTypeOrm)
  }

  async addGameItem (data: AddGameItemParamsRepo): Promise<void> {
    await this.repo.save({
      ...data,
      createdAt: new Date(),
      updatedAt: new Date()
    })
  }
}
