import { type LoadPlatforms } from '@/domain/usecases/platform'
import { LoadPlatformsController } from '@/presentation/controllers/platforms'
import { ok, serverError } from '@/presentation/helpers/http'
import { type HttpRequest } from '@/presentation/protocols'
import { mockLoadPlatforms } from '@/test/domain/usecases/mocks'
import { mock, type MockProxy } from 'jest-mock-extended'

describe('LoadPlatformsController', () => {
  let sut: LoadPlatformsController
  let loadPlatformsUsecase: MockProxy<LoadPlatforms>
  let httpRequest: HttpRequest

  beforeEach(() => {
    loadPlatformsUsecase = mock()
    loadPlatformsUsecase.load.mockResolvedValue(mockLoadPlatforms())
    sut = new LoadPlatformsController(loadPlatformsUsecase)
    httpRequest = makeHttpRequest()
  })

  const makeHttpRequest = (): HttpRequest => ({
    query: {
      search: 'any_search',
      offset: 1
    }
  })

  it('Should call LoadPlatforms with search and offset', async () => {
    await sut.handle(httpRequest)
    const { query: { search, offset } } = httpRequest
    expect(loadPlatformsUsecase.load).toHaveBeenCalledWith({ search, offset })
  })

  it('Should return ServerError if LoadPlatforms Throws', async () => {
    const error = new Error('any')
    loadPlatformsUsecase.load.mockRejectedValueOnce(error)
    const response = await sut.handle(httpRequest)
    expect(response).toEqual(serverError(error))
  })

  it('Should return 200 if succeds', async () => {
    const response = await sut.handle(httpRequest)
    expect(response).toEqual(ok(mockLoadPlatforms()))
  })
})
