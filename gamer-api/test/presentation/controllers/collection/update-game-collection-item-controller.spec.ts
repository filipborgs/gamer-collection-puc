import { UpdateGameCollectionItem } from '@/domain/usecases/collection'
import { UpdateGameCollectionItemController } from '@/presentation/controllers/collection'
import { conflict, noContent, serverError } from '@/presentation/helpers/http'
import { HttpRequest } from '@/presentation/protocols'
import { MockProxy, mock } from 'jest-mock-extended'

describe('UpdateGameCollectionItemController', () => {
  let sut: UpdateGameCollectionItemController
  let updateCollection: MockProxy<UpdateGameCollectionItem>
  let httpRequest: HttpRequest

  beforeEach(() => {
    updateCollection = mock()
    updateCollection.update.mockResolvedValue(true)
    sut = new UpdateGameCollectionItemController(updateCollection)
    httpRequest = makeHttpRequest()
  })

  const makeHttpRequest = (): HttpRequest => ({
    headers: {
      user: {
        id: '80727abe-7d17-4706-8a90-69817cb90e93'
      }
    },
    body: {
      id: 'ea2a407a-5e12-47c9-a6d9-df2b13b57bd1',
      manual: true,
      disk: false,
      cover: true,
      sealed: true,
      purchasePrice: 200,
      purchaseState: 'USED',
      purchaseDate: new Date().toISOString()
    }
  })

  it('Should call UpdateGameCollectionItem with collection data', async () => {
    await sut.handle(httpRequest)
    const { body, headers: { user: { id } } } = httpRequest
    expect(updateCollection.update).toHaveBeenCalledWith({ ...body, userId: id })
  })

  it('Should return ServerError if UpdateGameCollectionItem Throws', async () => {
    const error = new Error('any')
    updateCollection.update.mockRejectedValueOnce(error)
    const response = await sut.handle(httpRequest)
    expect(response).toEqual(serverError(error))
  })

  it('Should return 409 if UpdateGameCollectionItem returns null', async () => {
    updateCollection.update.mockResolvedValueOnce(null)
    const response = await sut.handle(httpRequest)
    expect(response).toEqual(conflict())
  })

  it('Should return 204 if succeds', async () => {
    const response = await sut.handle(httpRequest)
    expect(response).toEqual(noContent())
  })
})
