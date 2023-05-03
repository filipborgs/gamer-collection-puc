import { LoadPlatformCollectionItemsRepository } from '@/data/protocols/repo/collection'
import { PlatfromCollectionItem } from '@/domain/entities'
import { LoadPlatformCollectionItems } from '@/domain/usecases/collection'

export class DbLoadPlatformCollectionItems implements LoadPlatformCollectionItems {
  constructor (
    private readonly collectionRepo: LoadPlatformCollectionItemsRepository
  ) {}

  async loadByUser ({ userId }): Promise<PlatfromCollectionItem[]> {
    return await this.collectionRepo.loadByUser({ userId })
  }
}
