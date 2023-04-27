import {
  InvalidParamError,
  UnexpectedError
} from '../../models/errors'

export class ApiSingUp {
  constructor(url, httpClient) {
    this.httpClient = httpClient
    this.url = url
  }

  async singup(user) {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'post',
      body: user
    })
    switch (httpResponse.statusCode) {
      case 201:
        return httpResponse.body
      case 400:
        throw new InvalidParamError()
      default:
        throw new UnexpectedError()
    }
  }
}
