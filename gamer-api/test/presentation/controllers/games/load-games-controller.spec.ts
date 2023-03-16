import { type LoadGames } from '@/domain/usecases/games'
import { LoadGamesController } from '@/presentation/controllers'
import { ok, serverError } from '@/presentation/helpers/http'
import { type HttpRequest } from '@/presentation/protocols'
import { mockLoadResultGamePreview } from '@/test/domain/usecases/mocks'
import { mock, type MockProxy } from 'jest-mock-extended'

describe('LoadGamesController', () => {
  let sut: LoadGamesController
  let loadGamesUsecase: MockProxy<LoadGames>
  let httpRequest: HttpRequest

  beforeEach(() => {
    loadGamesUsecase = mock()
    loadGamesUsecase.load.mockResolvedValue(mockLoadResultGamePreview())
    sut = new LoadGamesController(loadGamesUsecase)
    httpRequest = makeHttpRequest()
  })

  const makeHttpRequest = (): HttpRequest => ({
    query: {
      search: 'any_search',
      offset: 1
    }
  })

  it('Should call LoadGames with search and offset', async () => {
    await sut.handle(httpRequest)
    const { query: { search, offset } } = httpRequest
    expect(loadGamesUsecase.load).toHaveBeenCalledWith({ search, offset })
  })

  it('Should return ServerError if LoadGames Throws', async () => {
    const error = new Error('any')
    loadGamesUsecase.load.mockRejectedValueOnce(error)
    const response = await sut.handle(httpRequest)
    expect(response).toEqual(serverError(error))
  })

  it('Should return 200 if succeds', async () => {
    const response = await sut.handle(httpRequest)
    expect(response).toEqual(ok(mockLoadResultGamePreview()))
  })
})
