import { RemoveCollectionItemByIdRepository } from '@/data/protocols/repo/collection'
import { DbRemoveGameCollectionItem } from '@/data/usecases/collection'
import { DeleteError } from '@/domain/entities'
import { MockProxy, mock } from 'jest-mock-extended'

describe('DbRemoveGameCollectionItem', () => {
  let sut: DbRemoveGameCollectionItem
  let collectionsRepo: MockProxy<RemoveCollectionItemByIdRepository>
  let params: string

  beforeEach(() => {
    jest.useFakeTimers()
    collectionsRepo = mock<RemoveCollectionItemByIdRepository>()
    collectionsRepo.removeById.mockResolvedValue(true)

    params = 'any_id'

    sut = new DbRemoveGameCollectionItem(collectionsRepo)
  })

  it('Should call RemoveCollectionItemByIdRepository with id', async () => {
    await sut.remove(params)
    expect(collectionsRepo.removeById).toBeCalledWith(params)
  })

  it('Should throw an error if RemoveCollectionItemByIdRepository throws', async () => {
    const error = new Error('an error')
    collectionsRepo.removeById.mockRejectedValueOnce(error)
    const promise = sut.remove(params)
    await expect(promise).rejects.toThrow(error)
  })

  it('Should throw an error if RemoveCollectionItemByIdRepository returns false', async () => {
    const error = new DeleteError()
    collectionsRepo.removeById.mockResolvedValueOnce(false)
    const promise = sut.remove(params)
    await expect(promise).rejects.toThrow(error)
  })

  it('Should return an list of collections if successful', async () => {
    const promise = sut.remove(params)
    await expect(promise).resolves.not.toThrow()
  })
})
