import { LoadPlatformCollectionItems } from '@/domain/usecases/collection'
import { LoadPlatformCollectionItemController } from '@/presentation/controllers/collection'
import { NotFound } from '@/presentation/errors'
import { notFound, ok, serverError } from '@/presentation/helpers/http'
import { HttpRequest } from '@/presentation/protocols'
import { mockLoadPlatformCollectionItems } from '@/test/domain/usecases/mocks'
import { MockProxy, mock } from 'jest-mock-extended'

describe('LoadPlatformCollectionItemController', () => {
  let sut: LoadPlatformCollectionItemController
  let loadItemsUsecase: MockProxy<LoadPlatformCollectionItems>
  let httpRequest: HttpRequest

  beforeEach(() => {
    jest.useFakeTimers()
    loadItemsUsecase = mock()
    loadItemsUsecase.loadByUser.mockResolvedValue(mockLoadPlatformCollectionItems())
    sut = new LoadPlatformCollectionItemController(loadItemsUsecase)
    httpRequest = makeHttpRequest()
  })

  const makeHttpRequest = (): HttpRequest => ({
    params: {
      userId: 'any_id'
    }
  })

  it('Should call LoadPlatformCollectionItems with userId', async () => {
    await sut.handle(httpRequest)
    const { params: { userId } } = httpRequest
    expect(loadItemsUsecase.loadByUser).toHaveBeenCalledWith({ userId })
  })

  it('Should return ServerError if LoadPlatformCollectionItems Throws', async () => {
    const error = new Error('any')
    loadItemsUsecase.loadByUser.mockRejectedValueOnce(error)
    const response = await sut.handle(httpRequest)
    expect(response).toEqual(serverError(error))
  })

  it('Should return 404 if LoadPlatformCollectionItems returns an empty array', async () => {
    loadItemsUsecase.loadByUser.mockResolvedValueOnce([])
    const response = await sut.handle(httpRequest)
    expect(response).toEqual(notFound(new NotFound('Platform collection item')))
  })

  it('Should return 200 if succeds', async () => {
    const response = await sut.handle(httpRequest)
    expect(response).toEqual(ok(mockLoadPlatformCollectionItems()))
  })
})
