import { AddGameItemParamsRepo, AddGameItemToCollectionRepository, LoadGameCollectionItemsRepository, LoadGameCollectionItemsRepositoryParams, RemoveCollectionItemByIdRepository } from '@/data/protocols/repo/collection'
import { Repository } from 'typeorm'
import { GameCollectionItemTypeOrm } from '../../entities/collection-game-item-typeorm'
import { PgRepository } from '../../helpers'
import { GameCollectionItem } from '@/domain/entities'

export class GameCollectionPostgresRepository extends PgRepository implements AddGameItemToCollectionRepository, LoadGameCollectionItemsRepository, RemoveCollectionItemByIdRepository {
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

  async loadByUser ({ userId, platformId }: LoadGameCollectionItemsRepositoryParams): Promise<GameCollectionItem[]> {
    return await this.repo.find({
      where: {
        userId,
        platform: {
          id: platformId
        }
      }
    })
  }

  async removeById (id: string): Promise<boolean> {
    const result = await this.repo.delete(id)
    return !!result.affected
  }
}
