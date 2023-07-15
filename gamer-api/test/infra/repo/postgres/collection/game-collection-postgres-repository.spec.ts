import { PurchaseState } from '@/domain/entities'
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

  describe('LoadGameCollectionItemsRepository', () => {
    it('Should return the correct game items list on success', async () => {
      const colMock = mockGameCollectionItem()
      await pgCollectionRepo.save(colMock)
      const result = await sut.loadByUser({
        userId: colMock.userId,
        platformId: colMock.platform.id
      })
      expect(result).toEqual([colMock])
    })
  })

  describe('RemoveCollectionItemByIdRepository', () => {
    it('Should return true on success', async () => {
      const colMock = mockGameCollectionItem()
      await pgCollectionRepo.save(colMock)
      const id = colMock.id
      const result = await sut.removeById(id)
      console.log(id)
      const itemRemoved = await pgCollectionRepo.findOne({ where: { id } })
      expect(result).toBeTruthy()
      expect(itemRemoved).toBeFalsy()
    })

    it('Should return false if failed', async () => {
      const colMock = mockGameCollectionItem()
      const result = await sut.removeById(colMock.id)
      expect(result).toBeFalsy()
    })
  })

  describe('UpdateGameItemByIdRepository', () => {
    it('Should return true on success and update correct data', async () => {
      const colMock = mockGameCollectionItem()
      await pgCollectionRepo.save(colMock)

      const id = colMock.id
      const updateData = {
        id,
        purchaseDate: new Date(),
        purchasePrice: 444,
        purchaseState: PurchaseState.NEW
      }
      const result = await sut.updateById(updateData)
      const item = await pgCollectionRepo.findOne({ where: { id } })
      expect(result).toBeTruthy()
      expect(item.purchaseDate).toEqual(updateData.purchaseDate)
      expect(item.purchasePrice).toEqual(updateData.purchasePrice)
      expect(item.purchaseState).toEqual(updateData.purchaseState)
    })

    it('Should return false if update failed', async () => {
      const colMock = mockGameCollectionItem()
      await pgCollectionRepo.save(colMock)

      const id = colMock.id
      const updateData = {
        id: 'any_id',
        purchaseDate: new Date(),
        purchasePrice: 444,
        purchaseState: PurchaseState.USED
      }
      const result = await sut.updateById(updateData)
      const item = await pgCollectionRepo.findOne({ where: { id } })
      expect(result).toBeFalsy()
      expect(item.purchaseDate).toEqual(item.purchaseDate)
      expect(item.purchasePrice).toEqual(item.purchasePrice)
      expect(item.purchaseState).toEqual(item.purchaseState)
    })
  })
})
