import {
  InvalidCredentialsError,
  UnexpectedError
} from '../../models/errors'

export class ApiAuthentication {
  constructor(url, httpClient) {
    this.httpClient = httpClient
    this.url = url
  }

  async auth(user) {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'post',
      body: user
    })
    switch (httpResponse.statusCode) {
      case 200:
        return httpResponse.body
      case 401:
        throw new InvalidCredentialsError()
      default:
        throw new UnexpectedError()
    }
  }
}
