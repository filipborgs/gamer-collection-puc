import { PurchaseState } from '@/domain/entities'
import { PlatformCollectionItemTypeOrm } from '@/infra/repos/postgres/entities'
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

  describe('LoadPlatformCollectionItemsRepository', () => {
    it('Should return the correct platform items list on success', async () => {
      const colMock = mockPlatformCollectionItem()
      await pgCollectionRepo.save(colMock)
      const result = await sut.loadByUser({
        userId: colMock.userId
      })
      expect(result).toEqual([colMock])
    })
  })

  describe('RemoveCollectionItemByIdRepository', () => {
    it('Should return true on success', async () => {
      const colMock = mockPlatformCollectionItem()
      await pgCollectionRepo.save(colMock)
      const id = colMock.id
      const result = await sut.removeById(id)
      const itemRemoved = await pgCollectionRepo.findOne({ where: { id } })
      expect(result).toBeTruthy()
      expect(itemRemoved).toBeFalsy()
    })

    it('Should return false if failed', async () => {
      const colMock = mockPlatformCollectionItem()
      const result = await sut.removeById(colMock.id)
      expect(result).toBeFalsy()
    })
  })

  describe('UpdatePlatformItemByIdRepository', () => {
    it('Should return true on success and update correct data', async () => {
      const colMock = mockPlatformCollectionItem()
      await pgCollectionRepo.save(colMock)

      const id = colMock.id
      const updateData = {
        id,
        purchaseDate: new Date(),
        purchasePrice: 444,
        purchaseState: PurchaseState.USED
      }
      const result = await sut.updateById(updateData)
      const item = await pgCollectionRepo.findOne({ where: { id } })
      expect(result).toBeTruthy()
      expect(item.purchaseDate).toEqual(updateData.purchaseDate)
      expect(item.purchasePrice).toEqual(updateData.purchasePrice)
      expect(item.purchaseState).toEqual(updateData.purchaseState)
    })
  })

  it('Should return false if update failed', async () => {
    const colMock = mockPlatformCollectionItem()
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
