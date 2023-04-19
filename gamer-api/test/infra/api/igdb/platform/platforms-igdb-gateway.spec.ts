/* eslint-disable @typescript-eslint/dot-notation */
import { PlatformCategory } from '@/domain/entities'
import { PlatformsIgdbGateway } from '@/infra/api/igdb'
import { HttpClient } from '@/infra/gateway'
import { mockLoadPlatformByIdIgdbResponse, mockLoadPlatformsIgdbResponse } from '@/test/infra/api/igdb/mocks'
import { mock, MockProxy } from 'jest-mock-extended'

describe('PlatformsIgdbGateway', () => {
  let sut: PlatformsIgdbGateway
  let httpClientMock: MockProxy<HttpClient>
  const clientId = 'any_id'
  const secret = 'any_secret'
  const twitchAuthUrl = 'any_auth_url'
  const igdbUrl = 'any_igdb_url'
  let authSpy

  describe('LoadPlatformsGateway', () => {
    let search: string
    let offset: number
    const limit: number = 20

    beforeEach(() => {
      jest.resetAllMocks()
      httpClientMock = mock()
      httpClientMock.post.mockResolvedValue(mockLoadPlatformsIgdbResponse())

      sut = new PlatformsIgdbGateway(
        httpClientMock,
        clientId,
        secret,
        twitchAuthUrl,
        igdbUrl
      )

      authSpy = jest.spyOn(PlatformsIgdbGateway.prototype as any, 'auth')
      authSpy.mockReturnValue('token')

      search = 'any_search'
      offset = 0
    })

    it('Should call auth request', async () => {
      await sut.load(search, offset)
      expect(authSpy).toHaveBeenCalledTimes(1)
    })

    it('Should make load platforms request with correct query', async () => {
      const searchClean: string = search.replace(/\s/g, '-').replace(/:/g, '')
      const where = `(name = "${searchClean}" | name ~ *"${searchClean}"* | abbreviation ~ *"${search}"*);`
      const data = `query platforms/count "count" {w ${where}}; query platforms "platforms" {f name, abbreviation; sort rating desc; w ${where} limit ${limit}; offset ${offset};};`

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

    it('Should return correct LoadResult with PlatformsPreview', async () => {
      const loadResult = await sut.load(search, offset)
      const [count, result] = mockLoadPlatformsIgdbResponse()
      expect(loadResult).toEqual({
        count: count.count,
        items: result.result,
        limit,
        offset
      })
    })
  })

  describe('LoadPlatformById', () => {
    let id: number

    beforeEach(() => {
      jest.resetAllMocks()
      httpClientMock = mock()
      httpClientMock.post.mockResolvedValue(mockLoadPlatformByIdIgdbResponse())

      sut = new PlatformsIgdbGateway(
        httpClientMock,
        clientId,
        secret,
        twitchAuthUrl,
        igdbUrl)

      authSpy = jest.spyOn(PlatformsIgdbGateway.prototype as any, 'auth')
      authSpy.mockReturnValue('token')

      id = 48
    })

    it('Should call auth request', async () => {
      await sut.loadById(id)
      expect(authSpy).toHaveBeenCalledTimes(1)
    })

    it('Should make load platform by id request with correct query', async () => {
      const data = `fields name,abbreviation,category,generation,alternative_name; where id = ${id};`

      const config = {
        url: `${igdbUrl}/v4/platforms`,
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

    it('Should return correct platform if succeeds', async () => {
      const platform = await sut.loadById(id)
      const [platformResponse] = mockLoadPlatformByIdIgdbResponse()
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const { category, alternative_name, ...platformData } = platformResponse

      expect(platform).toEqual({
        ...platformData,
        alternativeName: alternative_name,
        category: PlatformsIgdbGateway.parseCategory(category)
      })
    })

    it('Should return null if the request return the wrong platform', async () => {
      const game = await sut.loadById(2)
      expect(game).toBeNull()
    })
  })

  describe('parseCategory', () => {
    it('Should parse values to correct PlatformCategory enum', () => {
      expect(PlatformsIgdbGateway.parseCategory(1)).toEqual(PlatformCategory.CONSOLE)
      expect(PlatformsIgdbGateway.parseCategory(2)).toEqual(PlatformCategory.ARCADE)
      expect(PlatformsIgdbGateway.parseCategory(3)).toEqual(PlatformCategory.PLATFORM)
      expect(PlatformsIgdbGateway.parseCategory(4)).toEqual(PlatformCategory.OPERATION_SYSTEM)
      expect(PlatformsIgdbGateway.parseCategory(5)).toEqual(PlatformCategory.PORTABLE_CONSOLE)
      expect(PlatformsIgdbGateway.parseCategory(6)).toEqual(PlatformCategory.COMPUTER)
      expect(PlatformsIgdbGateway.parseCategory(10)).toBeNull()
    })
  })
})
