import { GameCollectionItemTypeOrm } from '@/infra/repos/postgres/entities'
import { PostgresHelper } from '@/infra/repos/postgres/helpers'
import { GameCollectionPostgresRepository } from '@/infra/repos/postgres/repo/collection'
import { mockGameCollectionItem } from '@/test/domain/entities/mocks'
import { makeFakeDb } from '@/test/infra/repo/postgres/mocks'
import { IBackup } from 'pg-mem'
import { Repository } from 'typeorm'

describe('GameCollectionPostgresRepository', () => {
  let sut: GameCollectionPostgresRepository
  let connection: PostgresHelper
  let pgCollectionRepo: Repository<GameCollectionItemTypeOrm>
  let backup: IBackup

  beforeAll(async () => {
    const fakeDb = await makeFakeDb()
    connection = fakeDb.connection
    await PostgresHelper.getInstance().connect()
    backup = fakeDb.db.backup()
    pgCollectionRepo = connection.getRepository(GameCollectionItemTypeOrm)
  })

  beforeEach(() => {
    backup.restore()
    sut = new GameCollectionPostgresRepository()
  })

  describe('AddGameItemToCollectionRepository', () => {
    it('Should add a game collection item on success', async () => {
      const colMock = mockGameCollectionItem()
      await sut.addGameItem(colMock)
      const collection = await pgCollectionRepo.find()
      expect(collection.length).toBe(1)
      expect(collection[0].id).toBe(colMock.id)
    })
  })
})
