import { GameCollectionItemTypeOrm, PlatformCollectionItemTypeOrm } from '@/infra/repos/postgres/entities'
import { PostgresHelper } from '@/infra/repos/postgres/helpers'
import { PlatformCollectionPostgresRepository } from '@/infra/repos/postgres/repo/collection'
import { mockPlatformCollectionItem } from '@/test/domain/entities/mocks'
import { makeFakeDb } from '@/test/infra/repo/postgres/mocks'
import { IBackup } from 'pg-mem'
import { Repository } from 'typeorm'

describe('PlatformCollectionPostgresRepository', () => {
  let sut: PlatformCollectionPostgresRepository
  let connection: PostgresHelper
  let pgCollectionRepo: Repository<PlatformCollectionItemTypeOrm>
  let backup: IBackup

  beforeAll(async () => {
    const fakeDb = await makeFakeDb()
    connection = fakeDb.connection
    await PostgresHelper.getInstance().connect()
    backup = fakeDb.db.backup()
    pgCollectionRepo = connection.getRepository(PlatformCollectionItemTypeOrm)
  })

  beforeEach(() => {
    backup.restore()
    sut = new PlatformCollectionPostgresRepository()
  })

  describe('AddPlatformItemToCollectionRepository', () => {
    it('Should add a platform collection item on success', async () => {
      const colMock = mockPlatformCollectionItem()
      try {
        await sut.addPlatform(colMock)
      } catch (e) {
        console.log(e)
      }
      const collection = await pgCollectionRepo.find()
      console.log(collection)
      expect(collection.length).toBe(1)
      expect(collection[0].id).toBe(colMock.id)
    })
  })
})
