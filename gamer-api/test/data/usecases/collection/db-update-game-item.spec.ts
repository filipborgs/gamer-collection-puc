import { UpdateGameItemByIdRepository } from '@/data/protocols/repo/collection'
import { DbUpdateGameCollectionItem } from '@/data/usecases/collection'
import { UpdateGameItemParams } from '@/domain/usecases/collection'
import { mockUpdateGameItemParams } from '@/test/domain/usecases/mocks'
import { MockProxy, mock } from 'jest-mock-extended'

describe('DbUpdateGameCollectionItem', () => {
  let sut: DbUpdateGameCollectionItem
  let collectionRepo: MockProxy<UpdateGameItemByIdRepository>
  let params: UpdateGameItemParams

  beforeEach(() => {
    collectionRepo = mock()
    collectionRepo.updateById.mockResolvedValue(true)

    sut = new DbUpdateGameCollectionItem(collectionRepo)
    params = mockUpdateGameItemParams()
  })

  it('Should throw if UpdateGameItemByIdRepository throws', async () => {
    const error = new Error('an error')
    collectionRepo.updateById.mockRejectedValueOnce(error)
    const promise = sut.update(params)
    await expect(promise).rejects.toThrow(error)
  })

  it('Should call UpdateGameItemByIdRepository with correct data', async () => {
    await sut.update(params)
    const { id, userId, purchaseDate, purchaseState, purchasePrice, manual, disk, cover, sealed } = params
    expect(collectionRepo.updateById).toBeCalledWith({
      id,
      purchaseDate,
      purchasePrice,
      userId,
      manual,
      disk,
      cover,
      sealed,
      purchaseState
    })
  })

  it('Should return false if UpdateGameItemByIdRepository returns false', async () => {
    collectionRepo.updateById.mockResolvedValueOnce(false)
    const result = await sut.update(params)
    expect(result).toBeFalsy()
  })

  it('Should return true on success', async () => {
    const result = await sut.update(params)
    expect(result).toBeTruthy()
  })
})
