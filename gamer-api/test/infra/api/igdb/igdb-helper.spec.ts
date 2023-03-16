/* eslint-disable @typescript-eslint/dot-notation */
import { GamesIgdbGateway } from '@/infra/api/igdb/games/games-igdb-gateway'
import { IgdbHelper } from '@/infra/api/igdb/igdb-helper'
import { type HttpClient } from '@/infra/gateway'
import { mockAuthIgdbResponse } from '@/test/infra/api/igdb/mocks'
import { mock, type MockProxy } from 'jest-mock-extended'

describe('GamesIgdbGateway', () => {
  class IgdbHelperStub extends IgdbHelper {}

  let sut: IgdbHelperStub
  let httpClientMock: MockProxy<HttpClient>
  const clientId = 'any_id'
  const secret = 'any_secret'
  const twitchAuthUrl = 'any_auth_url'
  const igdbUrl = 'any_igdb_url'

  describe('auth', () => {
    beforeEach(() => {
      httpClientMock = mock()
      httpClientMock.post.mockResolvedValue(mockAuthIgdbResponse())

      sut = new GamesIgdbGateway(
        httpClientMock,
        clientId,
        secret,
        twitchAuthUrl,
        igdbUrl)
    })

    it('Should make auth request with correct values', async () => {
      await sut['auth']()
      const config = {
        url: `${twitchAuthUrl}?client_id=${clientId}&client_secret=${secret}&grant_type=client_credentials`
      }
      expect(httpClientMock.post).toBeCalledWith(config)
    })

    it('Should return a token string on succeds', async () => {
      const token = await sut['auth']()
      expect(token).toEqual('token')
    })
  })
})
