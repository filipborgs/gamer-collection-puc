import { Uuid } from '@/data/protocols/datatype'
import { AddPlatformItemToCollectionRepository } from '@/data/protocols/repo/collection'
import { LoadPlatformByIdGateway } from '@/data/protocols/repo/platform'
import { DbAddPlatformItem } from '@/data/usecases/collection'
import { ItemType } from '@/domain/entities'
import { AddPlatformItemParams } from '@/domain/usecases/collection'
import { mockAddPlatformItemParams, mockLoadPlatformById } from '@/test/domain/usecases/mocks'
import { MockProxy, mock } from 'jest-mock-extended'

describe('DbAddPlatformItem', () => {
  let sut: DbAddPlatformItem
  let uuid: MockProxy<Uuid>
  let collectionRepo: MockProxy<AddPlatformItemToCollectionRepository>
  let gatewayPlatform: MockProxy<LoadPlatformByIdGateway>
  let params: AddPlatformItemParams

  beforeEach(() => {
    uuid = mock()
    uuid.generate.mockReturnValue('any_uuid')

    collectionRepo = mock()
    collectionRepo.addPlatform.mockResolvedValue()

    gatewayPlatform = mock<LoadPlatformByIdGateway>()
    gatewayPlatform.loadById.mockResolvedValue(mockLoadPlatformById())

    sut = new DbAddPlatformItem(gatewayPlatform, collectionRepo, uuid)
    params = mockAddPlatformItemParams()
  })

  test('Should call LoadPlatformByIdGateway with correct itemId', async () => {
    await sut.add(params)
    expect(gatewayPlatform.loadById).toHaveBeenCalledWith(params.itemId)
  })

  test('Should return null if LoadPlatformByIdGateway returns null', async () => {
    gatewayPlatform.loadById.mockResolvedValueOnce(null)
    const response = await sut.add(params)
    expect(response).toBeNull()
  })

  test('Should throw if LoadPlatformByIdGateway throws', async () => {
    const error = new Error('an error')
    gatewayPlatform.loadById.mockRejectedValueOnce(error)
    const promise = sut.add(params)
    await expect(promise).rejects.toThrow(error)
  })

  it('Should call Uuid with no values', async () => {
    await sut.add(params)
    expect(uuid.generate).toBeCalledWith()
  })

  it('Should throw if Uuid throws', async () => {
    const error = new Error('an error')
    uuid.generate.mockImplementationOnce(() => { throw error })
    const promise = sut.add(params)
    await expect(promise).rejects.toThrow(error)
  })

  it('Should throw if AddPlatformItemToCollectionRepository throws', async () => {
    const error = new Error('an error')
    collectionRepo.addPlatform.mockRejectedValueOnce(error)
    const promise = sut.add(params)
    await expect(promise).rejects.toThrow(error)
  })

  it('Should call call AddPlatformItemToCollectionRepository with correct data', async () => {
    const { name } = mockLoadPlatformById()
    await sut.add(params)
    expect(collectionRepo.addPlatform).toBeCalledWith({
      ...params,
      name,
      type: ItemType.GAME,
      id: 'any_uuid'
    })
  })

  it('Should return collection id on success', async () => {
    const id = await sut.add(params)
    expect(id).toEqual('any_uuid')
  })
})
