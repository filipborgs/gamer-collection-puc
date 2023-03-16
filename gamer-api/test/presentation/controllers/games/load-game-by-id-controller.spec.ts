import { type LoadGameById } from '@/domain/usecases/games'
import { LoadGameByIdController } from '@/presentation/controllers'
import { NotFound } from '@/presentation/errors'
import { notFound, ok, serverError } from '@/presentation/helpers/http'
import { type HttpRequest } from '@/presentation/protocols'
import { mock, type MockProxy } from 'jest-mock-extended'

describe('LoadGameByIdController', () => {
  let sut: LoadGameByIdController
  let loadGameUsecase: MockProxy<LoadGameById>
  let httpRequest: HttpRequest

  beforeEach(() => {
    loadGameUsecase = mock()
    loadGameUsecase.loadById.mockResolvedValue({} as any)
    sut = new LoadGameByIdController(loadGameUsecase)
    httpRequest = makeHttpRequest()
  })

  const makeHttpRequest = (): HttpRequest => ({
    params: {
      gameId: 1
    }
  })

  it('Should call LoadGameById with id', async () => {
    await sut.handle(httpRequest)
    const { params: { gameId } } = httpRequest
    expect(loadGameUsecase.loadById).toHaveBeenCalledWith(gameId)
  })

  it('Should return ServerError if LoadGameById Throws', async () => {
    const error = new Error('any')
    loadGameUsecase.loadById.mockRejectedValueOnce(error)
    const response = await sut.handle(httpRequest)
    expect(response).toEqual(serverError(error))
  })

  it('Should return 200 with game if succeds', async () => {
    const response = await sut.handle(httpRequest)
    expect(response).toEqual(ok({}))
  })

  it('Should return 404 LoadGameById returns null', async () => {
    loadGameUsecase.loadById.mockResolvedValueOnce(null)
    const response = await sut.handle(httpRequest)
    expect(response).toEqual(notFound(new NotFound('Game')))
  })
})
