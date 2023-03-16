import { type LoadGamesGateway } from '@/data/protocols/api/games'
import { ApiLoadGames } from '@/data/usecases/games'
import { type GamePreview, type LoadResult } from '@/domain/entities'
import { type LoadGamesParams } from '@/domain/usecases/games'
import { type MockProxy, mock } from 'jest-mock-extended'

describe('ApiLoadGames', () => {
  let sut: ApiLoadGames
  let gatewayLoadGames: MockProxy<LoadGamesGateway>
  let params: LoadGamesParams

  beforeEach(() => {
    gatewayLoadGames = mock<LoadGamesGateway>()
    gatewayLoadGames.load.mockResolvedValue(mockLoadResultGamePreview())

    params = {
      search: 'any_query',
      offset: 0
    }

    sut = new ApiLoadGames(gatewayLoadGames)
  })

  const mockLoadResultGamePreview = (): LoadResult<GamePreview> => ({
    items: [mockGamePreview()],
    limit: 10,
    count: 10,
    offset: 0
  })

  const mockGamePreview = (): GamePreview => ({
    id: 1,
    name: 'any_name',
    platforms: [{
      id: 1,
      name: 'any_platform'
    }]
  })

  it('Should call LoadGamesGateway with query', async () => {
    await sut.load(params)
    const { search, offset } = params
    expect(gatewayLoadGames.load).toBeCalledWith(search, offset)
  })

  it('Should call LoadGamesGateway with empty string if search is null', async () => {
    await sut.load({
      search: null,
      offset: 1
    })
    expect(gatewayLoadGames.load).toBeCalledWith('', 1)
  })

  it('Should call LoadGamesGateway with 0 if offset is null', async () => {
    await sut.load({
      search: 'query',
      offset: null
    })
    expect(gatewayLoadGames.load).toBeCalledWith('query', 0)
  })

  it('Should throw an error if LoadGamesGateway throws', async () => {
    const error = new Error('an error')
    gatewayLoadGames.load.mockRejectedValueOnce(error)
    const promise = sut.load(params)
    await expect(promise).rejects.toThrow(error)
  })

  it('Should return a list of games if successful', async () => {
    const list = await sut.load(params)
    expect(list).toEqual(mockLoadResultGamePreview())
  })
})
