import { LoadPlatformCollectionItemsRepository } from '@/data/protocols/repo/collection'
import { DbLoadPlatformCollectionItems } from '@/data/usecases/collection'
import { LoadPlatformCollectionItemsParams } from '@/domain/usecases/collection'
import { mockPlatformCollectionItem } from '@/test/domain/entities/mocks'
import { MockProxy, mock } from 'jest-mock-extended'

describe('DbLoadPlatformCollectionItems', () => {
  let sut: DbLoadPlatformCollectionItems
  let collectionsRepo: MockProxy<LoadPlatformCollectionItemsRepository>
  let params: LoadPlatformCollectionItemsParams

  beforeEach(() => {
    jest.useFakeTimers()
    collectionsRepo = mock<LoadPlatformCollectionItemsRepository>()
    collectionsRepo.loadByUser.mockResolvedValue([mockPlatformCollectionItem()])

    params = {
      userId: 'any_id'
    }

    sut = new DbLoadPlatformCollectionItems(collectionsRepo)
  })

  it('Should call LoadPlatformCollectionItemsRepository with userId and platformID', async () => {
    await sut.loadByUser(params)
    const { userId } = params
    expect(collectionsRepo.loadByUser).toBeCalledWith({ userId })
  })

  it('Should throw an error if LoadPlatformCollectionItemsRepository throws', async () => {
    const error = new Error('an error')
    collectionsRepo.loadByUser.mockRejectedValueOnce(error)
    const promise = sut.loadByUser(params)
    await expect(promise).rejects.toThrow(error)
  })

  it('Should return an list of collections if successful', async () => {
    const list = await sut.loadByUser(params)
    expect(list).toEqual([mockPlatformCollectionItem()])
  })
})
