import { LoadCollectionsByUserRepo } from '@/data/protocols/repo/collection'
import { Collection } from '@/domain/entities'
import { Repository } from 'typeorm'
import { CollectionTypeOrm } from '../../entities'
import { PgRepository } from '../../helpers'

export class CollectionPostgresRepository extends PgRepository implements LoadCollectionsByUserRepo {
  private readonly repo: Repository<CollectionTypeOrm>
  constructor () {
    super()
    this.repo = this.getRepository(CollectionTypeOrm)
  }

  async loadByUser (userId: string): Promise<Collection[]> {
    return await this.repo.find({
      select: {
        id: true,
        count: true,
        name: true
      },
      where: {
        userId
      }
    })
  }
}
