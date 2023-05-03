import { LoadGameCollectionItemsRepository } from '@/data/protocols/repo/collection'
import { GameCollectionItem } from '@/domain/entities'
import { LoadGameCollectionItems } from '@/domain/usecases/collection'

export class DbLoadGameCollectionItems implements LoadGameCollectionItems {
  constructor (
    private readonly collectionRepo: LoadGameCollectionItemsRepository
  ) {}

  async loadByUser ({ userId, platformId }): Promise<GameCollectionItem[]> {
    return await this.collectionRepo.loadByUser({ userId, platformId })
  }
}
