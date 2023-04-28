import { GameCollectionItemTypeOrm } from '@/infra/repos/postgres/entities'
import { PostgresHelper } from '@/infra/repos/postgres/helpers'
import { CollectionPostgresRepository } from '@/infra/repos/postgres/repo/collection'
import { mockGameCollectionItem } from '@/test/domain/entities/mocks'
import { makeFakeDb } from '@/test/infra/repo/postgres/mocks'
import { IBackup } from 'pg-mem'
import { Repository } from 'typeorm'

describe('CollectionPostgresRepository', () => {
  let sut: CollectionPostgresRepository
  let connection: PostgresHelper
  let pgGameCollectionRepo: Repository<GameCollectionItemTypeOrm>
  let backup: IBackup

  beforeAll(async () => {
    const fakeDb = await makeFakeDb()
    connection = fakeDb.connection
    await PostgresHelper.getInstance().connect()
    backup = fakeDb.db.backup()
    pgGameCollectionRepo = connection.getRepository(GameCollectionItemTypeOrm)
  })

  beforeEach(() => {
    backup.restore()
    sut = new CollectionPostgresRepository()
  })

  describe('LoadCollectionsByUserRepo', () => {
    it('Should return the correct collections item on success', async () => {
      const data = mockGameCollectionItem()
      await pgGameCollectionRepo.insert(data)
      const result = await sut.loadByUser('80727abe-7d17-4706-8a90-69817cb90e93')
      expect(result).toEqual([{
        count: 1,
        id: 1,
        name: 'teste'
      }])
    })

    it('Should return an empty array if dont have collections', async () => {
      const result = await sut.loadByUser('any_id')
      expect(result).toEqual([])
    })
  })
})
