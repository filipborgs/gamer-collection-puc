import { LoadCollectionsByUserRepo } from '@/data/protocols/repo/collection'
import { Collection } from '@/domain/entities'
import { LoadCollections } from '@/domain/usecases/collection'

export class DbLoadCollections implements LoadCollections {
  constructor (
    private readonly collectionRepo: LoadCollectionsByUserRepo
  ) {}

  async load (userId: string): Promise<Collection[]> {
    const collections = await this.collectionRepo.loadByUser(userId)
    return collections.length ? collections : null
  }
}
