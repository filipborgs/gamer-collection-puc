import { LoadGameCollectionItems } from '@/domain/usecases/collection'
import { LoadGameCollectionItemController } from '@/presentation/controllers/collection'
import { noContent, ok, serverError } from '@/presentation/helpers/http'
import { HttpRequest } from '@/presentation/protocols'
import { mockLoadGameCollectionItems } from '@/test/domain/usecases/mocks'
import { MockProxy, mock } from 'jest-mock-extended'

describe('LoadGameCollectionItemController', () => {
  let sut: LoadGameCollectionItemController
  let loadItemsUsecase: MockProxy<LoadGameCollectionItems>
  let httpRequest: HttpRequest

  beforeEach(() => {
    jest.useFakeTimers()
    loadItemsUsecase = mock()
    loadItemsUsecase.loadByUser.mockResolvedValue(mockLoadGameCollectionItems())
    sut = new LoadGameCollectionItemController(loadItemsUsecase)
    httpRequest = makeHttpRequest()
  })

  const makeHttpRequest = (): HttpRequest => ({
    params: {
      userId: 'any_id'
    },
    query: {
      platformId: 'any_platform_id'
    }
  })

  it('Should call LoadGameCollectionItems with userId and platformId', async () => {
    await sut.handle(httpRequest)
    const { params: { userId }, query: { platformId } } = httpRequest
    expect(loadItemsUsecase.loadByUser).toHaveBeenCalledWith({ userId, platformId })
  })

  it('Should return ServerError if LoadGameCollectionItems Throws', async () => {
    const error = new Error('any')
    loadItemsUsecase.loadByUser.mockRejectedValueOnce(error)
    const response = await sut.handle(httpRequest)
    expect(response).toEqual(serverError(error))
  })

  it('Should return 204 if LoadGameCollectionItems returns an empty array', async () => {
    loadItemsUsecase.loadByUser.mockResolvedValueOnce([])
    const response = await sut.handle(httpRequest)
    expect(response).toEqual(noContent())
  })

  it('Should return 200 if succeds', async () => {
    const response = await sut.handle(httpRequest)
    expect(response).toEqual(ok(mockLoadGameCollectionItems()))
  })
})
