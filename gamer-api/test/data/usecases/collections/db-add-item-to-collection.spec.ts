import { Uuid } from '@/data/protocols/datatype'
import { AddGameItemToCollectionRepository } from '@/data/protocols/repo/collections'
import { LoadGameByIdGateway } from '@/data/protocols/repo/games'
import { DbAddGameItem } from '@/data/usecases/collection'
import { ItemType } from '@/domain/entities'
import { AddGameItemParams } from '@/domain/usecases/collection'
import { mockAddGameItemParams, mockLoadGameById } from '@/test/domain/usecases/mocks'
import { mock, MockProxy } from 'jest-mock-extended'

describe('DbAddGameItem', () => {
  let sut: DbAddGameItem
  let uuid: MockProxy<Uuid>
  let collectionRepo: MockProxy<AddGameItemToCollectionRepository>
  let gatewayLoadGame: MockProxy<LoadGameByIdGateway>
  let params: AddGameItemParams

  beforeEach(() => {
    uuid = mock()
    uuid.generate.mockReturnValue('any_uuid')

    collectionRepo = mock()
    collectionRepo.addGameItem.mockResolvedValue()

    gatewayLoadGame = mock<LoadGameByIdGateway>()
    gatewayLoadGame.loadById.mockResolvedValue(mockLoadGameById())

    sut = new DbAddGameItem(gatewayLoadGame, collectionRepo, uuid)
    params = mockAddGameItemParams()
  })

  test('Should call LoadGameByIdGateway with correct itemId', async () => {
    await sut.add(params)
    expect(gatewayLoadGame.loadById).toHaveBeenCalledWith(params.itemId)
  })

  test('Should return null if LoadGameByIdGateway returns null', async () => {
    gatewayLoadGame.loadById.mockResolvedValueOnce(null)
    const response = await sut.add(params)
    expect(response).toBeNull()
  })

  test('Should throw if LoadGameByIdGateway throws', async () => {
    const error = new Error('an error')
    gatewayLoadGame.loadById.mockRejectedValueOnce(error)
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

  it('Should throw if AddGameItemToCollectionRepository throws', async () => {
    const error = new Error('an error')
    collectionRepo.addGameItem.mockRejectedValueOnce(error)
    const promise = sut.add(params)
    await expect(promise).rejects.toThrow(error)
  })

  it('Should call call AddGameItemToCollectionRepository with correct data', async () => {
    const { name } = mockLoadGameById()
    await sut.add(params)
    expect(collectionRepo.addGameItem).toBeCalledWith({
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
