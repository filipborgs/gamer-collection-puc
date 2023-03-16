import { type LoadGameByIdGateway } from '@/data/protocols/api/games/load-game-by-id-gateway'
import { ApiLoadGameById } from '@/data/usecases/games'
import { type Game } from '@/domain/entities'
import { mock, type MockProxy } from 'jest-mock-extended'

describe('ApiLoadGameById', () => {
  let sut: ApiLoadGameById
  let gatewayLoadGame: MockProxy<LoadGameByIdGateway>
  let params: number

  beforeEach(() => {
    jest.useFakeTimers()
    gatewayLoadGame = mock<LoadGameByIdGateway>()
    gatewayLoadGame.loadById.mockResolvedValue(mockLoadGameById())

    params = 2

    sut = new ApiLoadGameById(gatewayLoadGame)
  })

  const mockLoadGameById = (): Game => ({
    id: 1,
    name: 'any_name',
    releaseDate: new Date(),
    platforms: [{
      id: 1,
      name: 'any_platform'
    }]
  })

  it('Should call LoadGameByIdGateway with id', async () => {
    await sut.loadById(params)
    expect(gatewayLoadGame.loadById).toBeCalledWith(params)
  })

  it('Should throw an error if LoadGameByIdGateway throws', async () => {
    const error = new Error('an error')
    gatewayLoadGame.loadById.mockRejectedValueOnce(error)
    const promise = sut.loadById(params)
    await expect(promise).rejects.toThrow(error)
  })

  it('Should return null if LoadGameByIdGateway returns null', async () => {
    gatewayLoadGame.loadById.mockReturnValueOnce(null)
    const game = await sut.loadById(params)
    expect(game).toEqual(null)
  })

  it('Should return the correct game if successful', async () => {
    const game = await sut.loadById(params)
    expect(game).toEqual(mockLoadGameById())
  })
})
