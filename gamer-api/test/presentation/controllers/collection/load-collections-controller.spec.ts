import { LoadCollections } from '@/domain/usecases/collection'
import { LoadCollectionsController } from '@/presentation/controllers/collection'
import { noContent, ok, serverError } from '@/presentation/helpers/http'
import { HttpRequest } from '@/presentation/protocols'
import { mockLoadCollections } from '@/test/domain/usecases/mocks'
import { MockProxy, mock } from 'jest-mock-extended'

describe('LoadCollectionsController', () => {
  let sut: LoadCollectionsController
  let loadGamesUsecase: MockProxy<LoadCollections>
  let httpRequest: HttpRequest

  beforeEach(() => {
    loadGamesUsecase = mock()
    loadGamesUsecase.load.mockResolvedValue(mockLoadCollections())
    sut = new LoadCollectionsController(loadGamesUsecase)
    httpRequest = makeHttpRequest()
  })

  const makeHttpRequest = (): HttpRequest => ({
    params: {
      userId: 'any_id'
    }
  })

  it('Should call LoadCollections with userId', async () => {
    await sut.handle(httpRequest)
    const { params: { userId } } = httpRequest
    expect(loadGamesUsecase.load).toHaveBeenCalledWith(userId)
  })

  it('Should return ServerError if LoadCollections Throws', async () => {
    const error = new Error('any')
    loadGamesUsecase.load.mockRejectedValueOnce(error)
    const response = await sut.handle(httpRequest)
    expect(response).toEqual(serverError(error))
  })

  it('Should return 204 if LoadCollections returns null', async () => {
    loadGamesUsecase.load.mockResolvedValueOnce(null)
    const response = await sut.handle(httpRequest)
    expect(response).toEqual(noContent())
  })

  it('Should return 200 if succeds', async () => {
    const response = await sut.handle(httpRequest)
    expect(response).toEqual(ok(mockLoadCollections()))
  })
})
