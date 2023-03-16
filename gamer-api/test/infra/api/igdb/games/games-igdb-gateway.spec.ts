/* eslint-disable @typescript-eslint/dot-notation */
import { GamesIgdbGateway } from '@/infra/api/igdb/games/games-igdb-gateway'
import { type HttpClient } from '@/infra/gateway'
import { mockLoadGameByIdIgdbResponse, mockLoadGamesIgdbResponse } from '@/test/infra/api/igdb/mocks'
import { mock, type MockProxy } from 'jest-mock-extended'

describe('GamesIgdbGateway', () => {
  let sut: GamesIgdbGateway
  let httpClientMock: MockProxy<HttpClient>
  const clientId = 'any_id'
  const secret = 'any_secret'
  const twitchAuthUrl = 'any_auth_url'
  const igdbUrl = 'any_igdb_url'

  describe('LoadGamesGateway', () => {
    let search: string
    let offset: number
    const limit: number = 10
    let authSpy

    beforeEach(() => {
      jest.resetAllMocks()
      httpClientMock = mock()
      httpClientMock.post.mockResolvedValue(mockLoadGamesIgdbResponse())

      sut = new GamesIgdbGateway(
        httpClientMock,
        clientId,
        secret,
        twitchAuthUrl,
        igdbUrl)

      authSpy = jest.spyOn(GamesIgdbGateway.prototype as any, 'auth')
      authSpy.mockReturnValue('token')

      search = 'any_search'
      offset = 0
    })

    it('Should call auth request', async () => {
      await sut.load(search, offset)
      expect(authSpy).toHaveBeenCalledTimes(1)
    })

    it('Should make load request with correct query', async () => {
      const searchClean: string = search.replace(/\s/g, '-').replace(/:/g, '')
      const where = `(slug = "${searchClean}" | slug ~ *"${searchClean}"* | alternative_names.name ~ *"${search}"*) & platforms != null & version_parent = null;`
      const data = `query games/count "count" {w ${where}}; query games "games" {f name,platforms.id,platforms.name,cover.image_id; sort rating desc; w ${where} limit ${limit}; offset ${offset};};`

      const config = {
        url: `${igdbUrl}/v4/multiquery`,
        headers: {
          'Client-ID': clientId,
          Authorization: 'Bearer token',
          Accept: 'application/json',
          'Content-Type': 'text/plain'
        },
        data
      }
      await sut.load(search, offset)
      expect(httpClientMock.post).toBeCalledWith(config)
    })

    it('Should return correct LoadResult with GamePreview', async () => {
      const loadResult = await sut.load(search, offset)
      const [count, result] = mockLoadGamesIgdbResponse()
      expect(loadResult).toEqual({
        count: count.count,
        items: result.result.map(({ cover, ...gameData }) => ({ ...gameData, cover: cover ? { code: cover.image_id } : undefined })),
        limit,
        offset
      })
    })
  })

  describe('LoadGameByIdGateway', () => {
    let id: number
    let authSpy

    beforeEach(() => {
      jest.resetAllMocks()
      httpClientMock = mock()
      httpClientMock.post.mockResolvedValue(mockLoadGameByIdIgdbResponse())

      sut = new GamesIgdbGateway(
        httpClientMock,
        clientId,
        secret,
        twitchAuthUrl,
        igdbUrl)

      authSpy = jest.spyOn(GamesIgdbGateway.prototype as any, 'auth')
      authSpy.mockReturnValue('token')

      id = 1
    })

    it('Should call auth request', async () => {
      await sut.loadById(id)
      expect(authSpy).toHaveBeenCalledTimes(1)
    })

    it('Should make load game by id request with correct query', async () => {
      const data = `fields name,platforms.id,platforms.name,cover.image_id,first_release_date; where id = ${id};`

      const config = {
        url: `${igdbUrl}/v4/games`,
        headers: {
          'Client-ID': clientId,
          Authorization: 'Bearer token',
          Accept: 'application/json',
          'Content-Type': 'text/plain'
        },
        data
      }
      await sut.loadById(id)
      expect(httpClientMock.post).toBeCalledWith(config)
    })

    it('Should return correct game if succeeds', async () => {
      const game = await sut.loadById(id)
      const [gameResponse] = mockLoadGameByIdIgdbResponse()
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const { cover, first_release_date, ...gameData } = gameResponse
      expect(game).toEqual({
        ...gameData,
        cover: {
          code: cover.image_id
        },
        releaseDate: new Date(first_release_date * 1000)
      })
    })

    it('Should return correct game if succeeds without cover', async () => {
      const [{ cover: _cover, ...gameResponse }] = mockLoadGameByIdIgdbResponse()
      httpClientMock.post.mockResolvedValue([gameResponse])

      const game = await sut.loadById(id)
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const { first_release_date, ...gameData } = gameResponse
      expect(game).toEqual({
        ...gameData,
        releaseDate: new Date(first_release_date * 1000)
      })
    })

    it('Should return null if the request return the wrong game', async () => {
      const game = await sut.loadById(2)
      expect(game).toBeNull()
    })
  })
})
