import { LoadCollectionsByUserRepo } from '@/data/protocols/repo/collection'
import { DbLoadCollections } from '@/data/usecases/collection'
import { mockCollection } from '@/test/domain/entities/mocks'
import { MockProxy, mock } from 'jest-mock-extended'

describe('DbLoadCollections', () => {
  let sut: DbLoadCollections
  let collectionsRepo: MockProxy<LoadCollectionsByUserRepo>
  let params: string

  beforeEach(() => {
    collectionsRepo = mock<LoadCollectionsByUserRepo>()
    collectionsRepo.loadByUser.mockResolvedValue([mockCollection()])

    params = 'any_id'

    sut = new DbLoadCollections(collectionsRepo)
  })

  it('Should call LoadCollectionsByUserRepo with userId', async () => {
    await sut.load(params)
    expect(collectionsRepo.loadByUser).toBeCalledWith(params)
  })

  it('Should throw an error if LoadCollectionsByUserRepo throws', async () => {
    const error = new Error('an error')
    collectionsRepo.loadByUser.mockRejectedValueOnce(error)
    const promise = sut.load(params)
    await expect(promise).rejects.toThrow(error)
  })

  it('Should return null if collections is empty', async () => {
    collectionsRepo.loadByUser.mockResolvedValueOnce([])
    const list = await sut.load(params)
    expect(list).toEqual(null)
  })

  it('Should return an list of collections if successful', async () => {
    const list = await sut.load(params)
    expect(list).toEqual([mockCollection()])
  })
})
