import { type LoadPlatformById } from '@/domain/usecases/platforms'
import { LoadPlatformByIdController } from '@/presentation/controllers/platforms'
import { NotFound } from '@/presentation/errors'
import { notFound, ok, serverError } from '@/presentation/helpers/http'
import { type HttpRequest } from '@/presentation/protocols'
import { mockLoadPlatformById } from '@/test/domain/usecases/mocks'
import { mock, type MockProxy } from 'jest-mock-extended'

describe('LoadPlatformByIdController', () => {
  let sut: LoadPlatformByIdController
  let loadPlatformUsecase: MockProxy<LoadPlatformById>
  let httpRequest: HttpRequest

  beforeEach(() => {
    jest.useFakeTimers()
    loadPlatformUsecase = mock()
    loadPlatformUsecase.loadById.mockResolvedValue(mockLoadPlatformById())
    sut = new LoadPlatformByIdController(loadPlatformUsecase)
    httpRequest = makeHttpRequest()
  })

  const makeHttpRequest = (): HttpRequest => ({
    params: {
      platformId: 1
    }
  })

  it('Should call LoadPlatformById with id', async () => {
    await sut.handle(httpRequest)
    const { params: { platformId } } = httpRequest
    expect(loadPlatformUsecase.loadById).toHaveBeenCalledWith(platformId)
  })

  it('Should return ServerError if LoadPlatformById Throws', async () => {
    const error = new Error('any')
    loadPlatformUsecase.loadById.mockRejectedValueOnce(error)
    const response = await sut.handle(httpRequest)
    expect(response).toEqual(serverError(error))
  })

  it('Should return 200 with game if succeds', async () => {
    const response = await sut.handle(httpRequest)
    expect(response).toEqual(ok(mockLoadPlatformById()))
  })

  it('Should return 404 LoadPlatformById returns null', async () => {
    loadPlatformUsecase.loadById.mockResolvedValueOnce(null)
    const response = await sut.handle(httpRequest)
    expect(response).toEqual(notFound(new NotFound('Platform')))
  })
})
