
import { type HttpClientParams, type HttpClient } from '@/infra/gateway'
import axios from 'axios'

export class AxiosHttpClient implements HttpClient {
  async post ({ url, data, headers }: HttpClientParams): Promise<any> {
    const result = await axios.post(url, data, { headers })
    return result.data
  }
}
