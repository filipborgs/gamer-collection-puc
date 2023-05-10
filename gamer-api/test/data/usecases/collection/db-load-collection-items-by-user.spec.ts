import { LoadGameCollectionItemsRepository } from '@/data/protocols/repo/collection'
import { DbLoadGameCollectionItems } from '@/data/usecases/collection'
import { LoadGameCollectionItemsParams } from '@/domain/usecases/collection'
import { mockGameCollectionItem } from '@/test/domain/entities/mocks'
import { MockProxy, mock } from 'jest-mock-extended'

describe('DbLoadGameCollectionItems', () => {
  let sut: DbLoadGameCollectionItems
  let collectionsRepo: MockProxy<LoadGameCollectionItemsRepository>
  let params: LoadGameCollectionItemsParams

  beforeEach(() => {
    jest.useFakeTimers()
    collectionsRepo = mock<LoadGameCollectionItemsRepository>()
    collectionsRepo.loadByUser.mockResolvedValue([mockGameCollectionItem()])

    params = {
      userId: 'any_id',
      platformId: 2
    }

    sut = new DbLoadGameCollectionItems(collectionsRepo)
  })

  it('Should call LoadGameCollectionItemsRepository with userId and platformID', async () => {
    await sut.loadByUser(params)
    const { platformId, userId } = params
    expect(collectionsRepo.loadByUser).toBeCalledWith({ platformId, userId })
  })

  it('Should throw an error if LoadGameCollectionItemsRepository throws', async () => {
    const error = new Error('an error')
    collectionsRepo.loadByUser.mockRejectedValueOnce(error)
    const promise = sut.loadByUser(params)
    await expect(promise).rejects.toThrow(error)
  })

  it('Should return an list of collections if successful', async () => {
    const list = await sut.loadByUser(params)
    expect(list).toEqual([mockGameCollectionItem()])
  })
})
