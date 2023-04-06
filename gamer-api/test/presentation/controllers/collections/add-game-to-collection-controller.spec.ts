import { type AddItemToCollection } from '@/domain/usecases/collection'
import { AddGameToCollectionController } from '@/presentation/controllers/collections'
import { NotFound } from '@/presentation/errors'
import { created, notFound, serverError } from '@/presentation/helpers/http'
import { type HttpRequest } from '@/presentation/protocols'
import { mock, type MockProxy } from 'jest-mock-extended'

describe('AddGameToCollectionController', () => {
  let sut: AddGameToCollectionController
  let addCollection: MockProxy<AddItemToCollection>
  let httpRequest: HttpRequest

  beforeEach(() => {
    addCollection = mock()
    addCollection.add.mockResolvedValue('any_id')
    sut = new AddGameToCollectionController(addCollection)
    httpRequest = makeHttpRequest()
  })

  const makeHttpRequest = (): HttpRequest => ({
    body: {
      itemId: 2,
      purchasePrice: 200,
      purchaseStatus: 'USED',
      purchaseDate: new Date().toISOString()
    }
  })

  it('Should call AddItemToCollection with user data', async () => {
    await sut.handle(httpRequest)
    const { body } = httpRequest
    expect(addCollection.add).toHaveBeenCalledWith(body)
  })

  it('Should return ServerError if AddItemToCollection Throws', async () => {
    const error = new Error('any')
    addCollection.add.mockRejectedValueOnce(error)
    const response = await sut.handle(httpRequest)
    expect(response).toEqual(serverError(error))
  })

  it('Should return 404 if AddItemToCollection returns null', async () => {
    addCollection.add.mockResolvedValueOnce(null)
    const response = await sut.handle(httpRequest)
    expect(response).toEqual(notFound(new NotFound('Game')))
  })

  it('Should return 201 with user id if succeds', async () => {
    const response = await sut.handle(httpRequest)
    expect(response).toEqual(created({ id: 'any_id' }))
  })
})
