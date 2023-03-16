import { type HttpClient } from '@/infra/gateway'
import { GamesIgdbGateway } from '@/infra/api/games/games-igdb-gateway'
import { mock, type MockProxy } from 'jest-mock-extended'

describe('GamesIgdbGateway', () => {
  let sut: GamesIgdbGateway
  let httpClientMock: MockProxy<HttpClient>
  const clientId = 'any_id'
  const secret = 'any_secret'

  describe('LoadGamesGateway', () => {
    let search: string
    let offset: number
    const limit: number = 10
    beforeEach(() => {
      httpClientMock = mock()
      httpClientMock.post.mockResolvedValue([{ count: 1 }, { result: [] }])
      sut = new GamesIgdbGateway(httpClientMock, clientId, secret)
      search = 'any_search'
      offset = 0
    })

    it('Should make load request with correct query', async () => {
      const searchClean: string = search.replace(/\s/g, '-').replace(/:/g, '')
      const where = `(slug = "${searchClean}" | slug ~ *"${searchClean}"* | alternative_names.name ~ *"${search}"*) & platforms != null & version_parent = null;`
      const data = `query games/count "count" {w ${where}}; query games "games" {f alternative_names.name, checksum, platforms.name, name, version_parent, slug; sort rating desc; w ${where} limit ${limit}; offset ${offset};};`

      const config = {
        url: 'https://api.igdb.com/v4/multiquery',
        headers: {
          'Client-ID': clientId,
          Authorization: 'Bearer 15edshp49fk42q4vb5whzqol9w98rf',
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
      expect(loadResult).toEqual({
        count: 1,
        items: [],
        limit,
        offset
      })
    })
  })
})
