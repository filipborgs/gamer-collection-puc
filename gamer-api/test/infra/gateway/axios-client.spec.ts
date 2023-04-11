import { AxiosHttpClient, HttpClientParams } from '@/infra/gateway'

import axios from 'axios'

jest.mock('axios')

describe('AxiosHttpClient', () => {
  let sut: AxiosHttpClient
  let fakeAxios: jest.Mocked<typeof axios>
  let params: HttpClientParams

  beforeAll(() => {
    params = { url: 'url', headers: { any: 'any' }, data: { any: 'any' } }
    fakeAxios = axios as jest.Mocked<typeof axios>
    fakeAxios.post.mockResolvedValue({
      status: 200,
      data: 'any_data'
    })
  })

  beforeEach(() => {
    sut = new AxiosHttpClient()
  })

  describe('post', () => {
    it('should call post with correct input', async () => {
      await sut.post(params)
      const { url, data, headers } = params

      expect(fakeAxios.post).toHaveBeenCalledWith(url, data, { headers })
      expect(fakeAxios.post).toHaveBeenCalledTimes(1)
    })

    it('should return data on success', async () => {
      const result = await sut.post(params)

      expect(result).toEqual('any_data')
    })

    it('should rethrow if post throws', async () => {
      fakeAxios.post.mockRejectedValueOnce(new Error('http_error'))

      const promise = sut.post(params)

      await expect(promise).rejects.toThrow(new Error('http_error'))
    })
  })
})
