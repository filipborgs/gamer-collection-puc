import { UpdatePlatformItemByIdRepository } from '@/data/protocols/repo/collection'
import { DbUpdatePlatformCollectionItem } from '@/data/usecases/collection'
import { UpdatePlatformItemParams } from '@/domain/usecases/collection'
import { mockUpdatePlatformItemParams } from '@/test/domain/usecases/mocks'
import { MockProxy, mock } from 'jest-mock-extended'

describe('DbUpdatePlatformCollectionItem', () => {
  let sut: DbUpdatePlatformCollectionItem
  let collectionRepo: MockProxy<UpdatePlatformItemByIdRepository>
  let params: UpdatePlatformItemParams

  beforeEach(() => {
    collectionRepo = mock()
    collectionRepo.updateById.mockResolvedValue(true)

    sut = new DbUpdatePlatformCollectionItem(collectionRepo)
    params = mockUpdatePlatformItemParams()
  })

  it('Should throw if UpdatePlatformItemByIdRepository throws', async () => {
    const error = new Error('an error')
    collectionRepo.updateById.mockRejectedValueOnce(error)
    const promise = sut.update(params)
    await expect(promise).rejects.toThrow(error)
  })

  it('Should call UpdatePlatformItemByIdRepository with correct data', async () => {
    await sut.update(params)
    const { id, purchaseDate, purchaseState, purchasePrice, manual, sealed, box, cables, joysticks } = params
    expect(collectionRepo.updateById).toBeCalledWith({
      id,
      purchaseDate,
      purchasePrice,
      manual,
      sealed,
      purchaseState,
      box,
      cables,
      joysticks
    })
  })

  it('Should return false if UpdatePlatformItemByIdRepository returns false', async () => {
    collectionRepo.updateById.mockResolvedValueOnce(false)
    const result = await sut.update(params)
    expect(result).toBeFalsy()
  })

  it('Should return true on success', async () => {
    const result = await sut.update(params)
    expect(result).toBeTruthy()
  })
})
