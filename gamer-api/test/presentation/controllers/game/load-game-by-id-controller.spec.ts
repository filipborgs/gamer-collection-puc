import { LoadGameById } from '@/domain/usecases/game'
import { LoadGameByIdController } from '@/presentation/controllers'
import { NotFound } from '@/presentation/errors'
import { notFound, ok, serverError } from '@/presentation/helpers/http'
import { HttpRequest } from '@/presentation/protocols'
import { mockLoadGameById } from '@/test/domain/usecases/mocks'
import { mock, MockProxy } from 'jest-mock-extended'

describe('LoadGameByIdController', () => {
  let sut: LoadGameByIdController
  let loadGameUsecase: MockProxy<LoadGameById>
  let httpRequest: HttpRequest

  beforeEach(() => {
    jest.useFakeTimers()
    loadGameUsecase = mock()
    loadGameUsecase.loadById.mockResolvedValue(mockLoadGameById())
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
    expect(response).toEqual(ok(mockLoadGameById()))
  })

  it('Should return 404 LoadGameById returns null', async () => {
    loadGameUsecase.loadById.mockResolvedValueOnce(null)
    const response = await sut.handle(httpRequest)
    expect(response).toEqual(notFound(new NotFound('Game')))
  })
})
