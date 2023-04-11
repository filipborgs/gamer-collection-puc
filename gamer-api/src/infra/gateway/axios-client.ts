
import { HttpClientParams, HttpClient } from '@/infra/gateway'
import axios from 'axios'

export class AxiosHttpClient implements HttpClient {
  async post (request: HttpClientParams): Promise<any> {
    console.log(request)
    const { url, data, headers } = request
    const result = await axios.post(url, data, { headers })
    console.log(result.data)
    return result.data
  }
}
